import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Returns the singleton Prisma client, or null when DATABASE_URL is not set.
 * Callers (see lib/catalog.ts) fall back to the seed catalog in that case,
 * so the storefront stays functional in local development without Postgres.
 */
export function getPrisma(): PrismaClient | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: url }),
    });
  }
  return globalForPrisma.prisma;
}
