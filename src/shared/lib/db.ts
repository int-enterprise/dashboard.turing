import { hashPassword } from "./password";
import type { User, UserRole } from "@/entities/user/model/types";

type Session = { id: string; userId: string; expiresAt: Date; createdAt: Date };

const globalStore = globalThis as unknown as {
  __memUsers?: Map<string, User>;
  __memSessions?: Map<string, Session>;
  __memRootSeed?: Promise<void>;
};

const users = (globalStore.__memUsers ??= new Map<string, User>());
const sessions = (globalStore.__memSessions ??= new Map<string, Session>());

const ROOT_USERNAME = process.env.ROOT_USERNAME ?? "int";
const ROOT_PASSWORD =
  process.env.ROOT_PASSWORD ?? "UcBBKoZBZ0lDeoIBgGRawg!Aa1";

function genId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

async function seedRoot(): Promise<void> {
  if (Array.from(users.values()).some((u) => u.role === "ROOT")) return;
  const now = new Date();
  users.set("root", {
    id: "root",
    username: ROOT_USERNAME,
    passwordHash: await hashPassword(ROOT_PASSWORD),
    role: "ROOT",
    createdAt: now,
    updatedAt: now,
  });
}

function ensureSeeded(): Promise<void> {
  return (globalStore.__memRootSeed ??= seedRoot());
}

export const db = {
  user: {
    async findUnique(args: {
      where: { username?: string; id?: string };
    }): Promise<User | null> {
      await ensureSeeded();
      for (const u of users.values()) {
        if (args.where.id && u.id === args.where.id) return u;
        if (args.where.username && u.username === args.where.username) return u;
      }
      return null;
    },

    async findMany(args: {
      where?: { role?: UserRole };
      orderBy?: { createdAt?: "asc" | "desc" };
    }): Promise<User[]> {
      await ensureSeeded();
      let list = Array.from(users.values());
      if (args.where?.role) list = list.filter((u) => u.role === args.where!.role);
      if (args.orderBy?.createdAt === "desc")
        list.sort((a, b) => +b.createdAt - +a.createdAt);
      else if (args.orderBy?.createdAt === "asc")
        list.sort((a, b) => +a.createdAt - +b.createdAt);
      return list;
    },

    async create(args: {
      data: { username: string; passwordHash: string; role: UserRole };
    }): Promise<User> {
      await ensureSeeded();
      const now = new Date();
      const user: User = {
        id: genId(),
        ...args.data,
        createdAt: now,
        updatedAt: now,
      };
      users.set(user.id, user);
      return user;
    },

    async update(args: {
      where: { id: string };
      data: Partial<Pick<User, "passwordHash">>;
    }): Promise<User> {
      const u = users.get(args.where.id);
      if (!u) throw new Error("User not found");
      const updated: User = { ...u, ...args.data, updatedAt: new Date() };
      users.set(u.id, updated);
      return updated;
    },

    async delete(args: { where: { id: string } }): Promise<User> {
      const u = users.get(args.where.id);
      if (!u) throw new Error("User not found");
      users.delete(u.id);
      for (const [sid, s] of sessions) if (s.userId === u.id) sessions.delete(sid);
      return u;
    },
  },

  session: {
    async create(args: {
      data: { userId: string; expiresAt: Date };
    }): Promise<Session> {
      const s: Session = {
        id: genId(),
        userId: args.data.userId,
        expiresAt: args.data.expiresAt,
        createdAt: new Date(),
      };
      sessions.set(s.id, s);
      return s;
    },

    async findUnique<I extends { user: true } | undefined = undefined>(args: {
      where: { id: string };
      include?: I;
    }): Promise<
      | (I extends { user: true } ? Session & { user: User | null } : Session)
      | null
    > {
      const s = sessions.get(args.where.id);
      if (!s) return null;
      if (args.include?.user) {
        await ensureSeeded();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return { ...s, user: users.get(s.userId) ?? null } as any;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return s as any;
    },

    async delete(args: { where: { id: string } }): Promise<Session | null> {
      const s = sessions.get(args.where.id);
      if (!s) return null;
      sessions.delete(s.id);
      return s;
    },

    async deleteMany(args: { where: { id: string } }): Promise<{ count: number }> {
      return { count: sessions.delete(args.where.id) ? 1 : 0 };
    },
  },
};
