import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7: the CLI reads the connection URL from here (not the schema),
// and .env is not auto-loaded — dotenv above provides DATABASE_URL.
// The placeholder keeps `prisma generate` working before a DB is provisioned.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://placeholder:5432/tulsi",
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
});
