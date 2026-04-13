export type UserRole = "ROOT" | "IAM";

export type User = {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicUser = Omit<User, "passwordHash">;

export function toPublicUser(user: User): PublicUser {
  const { passwordHash: _passwordHash, ...rest } = user;
  return rest;
}

export function isRoot(user: Pick<User, "role"> | null | undefined): boolean {
  return user?.role === "ROOT";
}
