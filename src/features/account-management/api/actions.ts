"use server";

import { revalidatePath } from "next/cache";
import {
  createIamUser,
  deleteIamUser,
  findUserByUsername,
  updateIamPassword,
} from "@/entities/user";
import { requireRoot } from "@/shared/lib/guards";
import {
  createAccountSchema,
  deleteAccountSchema,
  updatePasswordSchema,
  type AccountActionState,
} from "../model/schema";

const EMPTY: AccountActionState = {};

export async function createAccountAction(
  _prev: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  await requireRoot();

  const parsed = createAccountSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다" };
  }

  const exists = await findUserByUsername(parsed.data.username);
  if (exists) return { error: "이미 사용 중인 아이디입니다" };

  await createIamUser(parsed.data);
  revalidatePath("/accounts");
  return { ok: true };
}

export async function updatePasswordAction(
  _prev: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  await requireRoot();

  const parsed = updatePasswordSchema.safeParse({
    userId: formData.get("userId"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다" };
  }

  await updateIamPassword(parsed.data.userId, parsed.data.password);
  revalidatePath("/accounts");
  return { ok: true };
}

export async function deleteAccountAction(formData: FormData): Promise<void> {
  await requireRoot();
  const parsed = deleteAccountSchema.safeParse({ userId: formData.get("userId") });
  if (!parsed.success) return;
  await deleteIamUser(parsed.data.userId);
  revalidatePath("/accounts");
}

void EMPTY;
