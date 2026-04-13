import { db } from "@/shared/lib/db";
import { toPublicUser, type PublicUser } from "../model/types";

export async function findUserByUsername(username: string) {
  return db.user.findUnique({ where: { username } });
}

export async function listIamUsers(): Promise<PublicUser[]> {
  const users = await db.user.findMany({
    where: { role: "IAM" },
    orderBy: { createdAt: "desc" },
  });
  return users.map(toPublicUser);
}

export async function findUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}
