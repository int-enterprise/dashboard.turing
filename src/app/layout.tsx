import type { Metadata } from "next";
import { getTheme } from "@/features/theme/api/get-theme";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "turing · Dashboard",
  description: "사내 AI Agent 퍼포먼스 모니터링 콘솔",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = await getTheme();

  return (
    <html
      lang="ko"
      className={`${theme === "dark" ? "dark" : ""} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
