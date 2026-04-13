import { z } from "zod";

const USERNAME_RULE = z
  .string()
  .min(3, "아이디는 최소 3자 이상이어야 합니다")
  .max(64, "아이디는 최대 64자까지 가능합니다")
  .regex(/^[a-zA-Z0-9._-]+$/, "영문, 숫자, . _ - 만 사용할 수 있습니다");

const PASSWORD_RULE = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
  .max(128, "비밀번호는 최대 128자까지 가능합니다");

export const createAccountSchema = z.object({
  username: USERNAME_RULE,
  password: PASSWORD_RULE,
});

export const updatePasswordSchema = z.object({
  userId: z.string().min(1),
  password: PASSWORD_RULE,
});

export const deleteAccountSchema = z.object({
  userId: z.string().min(1),
});

export type AccountActionState = {
  error?: string;
  ok?: boolean;
};
