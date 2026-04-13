import { requireAuth } from "@/shared/lib/guards";
import { getTheme } from "@/features/theme/api/get-theme";
import { AppSidebar } from "@/widgets/app-sidebar/ui/AppSidebar";
import { AppHeader } from "@/widgets/app-header/ui/AppHeader";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, theme] = await Promise.all([requireAuth(), getTheme()]);

  return (
    <div className="flex h-full min-h-screen bg-[var(--color-bg)]">
      <AppSidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader theme={theme} />
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
