import { cookies } from "next/headers";
import { DEFAULT_THEME, THEME_COOKIE, type Theme } from "../model/types";

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const value = cookieStore.get(THEME_COOKIE)?.value;
  return value === "dark" ? "dark" : DEFAULT_THEME;
}
