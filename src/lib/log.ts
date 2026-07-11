import { getPrisma } from "./prisma";

type Level = "info" | "warn" | "error";

/**
 * Operational log: persisted to ApiLog (surfaced in /admin/logs) and mirrored
 * to the console. Never throws — logging must not break the order flow.
 */
export async function log(
  source: "bigbuy" | "cj" | "stripe" | "system",
  level: Level,
  message: string,
  meta?: Record<string, unknown>,
): Promise<void> {
  const line = `[${source}] ${message}`;
  if (level === "error") console.error(line, meta ?? "");
  else if (level === "warn") console.warn(line, meta ?? "");
  else console.log(line, meta ?? "");

  try {
    const prisma = getPrisma();
    if (prisma) {
      await prisma.apiLog.create({
        data: { source, level, message, meta: meta ? JSON.parse(JSON.stringify(meta)) : undefined },
      });
    }
  } catch {
    // DB unavailable — console output above is the fallback.
  }
}
