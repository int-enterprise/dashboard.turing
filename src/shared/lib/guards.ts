import { redirect } from "next/navigation";
import { getCurrentUser } from "./current-user";
import { isRoot } from "@/entities/user";

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRoot() {
  const user = await requireAuth();
  if (!isRoot(user)) redirect("/projects");
  return user;
}
