import "server-only";
import { createClient } from "@/shared/api/ky";
import { DONKEY_CONFIG } from "@/shared/config/donkey";

let cached: ReturnType<typeof createClient> | null = null;

export function donkeyClient() {
  if (!cached) {
    cached = createClient({
      baseUrl: DONKEY_CONFIG.baseUrl,
      apiKey: DONKEY_CONFIG.apiKey,
      timeoutMs: 15000,
    });
  }
  return cached;
}
