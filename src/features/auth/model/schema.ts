import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력해 주세요").max(64),
  password: z.string().min(1, "비밀번호를 입력해 주세요").max(128),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type LoginState = {
  error?: string;
};
