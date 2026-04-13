import { db } from "@/shared/lib/db";
import { hashPassword } from "@/shared/lib/password";
import { toPublicUser, type PublicUser } from "../model/types";

export async function createIamUser(input: {
  username: string;
  password: string;
}): Promise<PublicUser> {
  const passwordHash = await hashPassword(input.password);
  const user = await db.user.create({
    data: { username: input.username, passwordHash, role: "IAM" },
  });
  return toPublicUser(user);
}

export async function updateIamPassword(
  userId: string,
  newPassword: string,
): Promise<void> {
  const passwordHash = await hashPassword(newPassword);
  await db.user.update({ where: { id: userId }, data: { passwordHash } });
}

export async function deleteIamUser(userId: string): Promise<void> {
  await db.user.delete({ where: { id: userId } });
}
