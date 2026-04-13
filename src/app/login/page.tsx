import { redirect } from "next/navigation";
import { getCurrentUser } from "@/shared/lib/current-user";
import { LoginPage } from "@/views/login/ui/LoginPage";

export const metadata = { title: "로그인 · Int Dashboard" };

export default async function Page() {
  const user = await getCurrentUser();
  if (user) redirect("/projects");
  return <LoginPage />;
}
