export const DONKEY_CONFIG = {
  baseUrl: process.env.DONKEY_BASE_URL ?? "https://turing.donkey.ai.kr",
  apiKey: process.env.DONKEY_API_KEY ?? "",
} as const;
