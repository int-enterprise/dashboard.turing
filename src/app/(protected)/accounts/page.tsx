import { requireRoot } from "@/shared/lib/guards";
import { AccountsPage } from "@/views/accounts/ui/AccountsPage";

export const metadata = { title: "계정 관리 · Int Dashboard" };

export default async function Page() {
  await requireRoot();
  return <AccountsPage />;
}
