"use server";

import { redirect } from "next/navigation";
import { findUserByUsername } from "@/entities/user";
import { verifyPassword } from "@/shared/lib/password";
import { createSession } from "@/shared/lib/session";
import { loginSchema, type LoginState } from "../model/schema";

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다" };
  }

  const user = await findUserByUsername(parsed.data.username);
  if (!user) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다" };
  }

  const ok = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!ok) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다" };
  }

  await createSession(user.id);
  redirect("/projects");
}
