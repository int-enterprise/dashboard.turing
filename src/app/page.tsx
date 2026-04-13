import { redirect } from "next/navigation";
import { getCurrentUser } from "@/shared/lib/current-user";

export default async function Page() {
  const user = await getCurrentUser();
  redirect(user ? "/projects" : "/login");
}
