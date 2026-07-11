import { NextResponse } from "next/server";
import { syncCatalog } from "@/lib/suppliers/router";

export const maxDuration = 300;

/**
 * Stock/cost sync from BigBuy + CJ. Schedule hourly (e.g. Vercel Cron:
 * `{"path": "/api/cron/sync-suppliers", "schedule": "0 * * * *"}`).
 * Protected by CRON_SECRET.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await syncCatalog();
  return NextResponse.json(result);
}
