import ky, { type KyInstance } from "ky";

type Options = {
  baseUrl: string;
  apiKey?: string;
  timeoutMs?: number;
};

export function createClient({ baseUrl, apiKey, timeoutMs = 15000 }: Options): KyInstance {
  return ky.create({
    baseUrl,
    timeout: timeoutMs,
    retry: { limit: 1 },
    headers: apiKey ? { "x-api-key": apiKey, Authorization: `Bearer ${apiKey}` } : undefined,
  });
}
