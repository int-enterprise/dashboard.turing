import { cache } from "react";
import { db } from "./db";
import { getSessionId } from "./session";
import type { User } from "@/entities/user/model/types";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const sessionId = await getSessionId();
  if (!sessionId) return null;

  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return session.user;
});
