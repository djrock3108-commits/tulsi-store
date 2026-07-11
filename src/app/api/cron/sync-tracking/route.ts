import { NextResponse } from "next/server";
import { syncTracking } from "@/lib/suppliers/router";

export const maxDuration = 300;

/**
 * Tracking poll: pulls tracking numbers for placed supplier orders and
 * emails customers automatically. Schedule every 2 hours.
 * Protected by CRON_SECRET.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await syncTracking();
  return NextResponse.json(result);
}
