import { NextResponse } from "next/server";
import { cjdropshipping, cjRequest } from "@/lib/suppliers/cjdropshipping";
import { log } from "@/lib/log";

export const maxDuration = 60;

/**
 * Scout diario de producto (directiva del propietario, 2026-07-11):
 * rastrea el catálogo de CJ buscando candidatos premium nuevos por categoría,
 * priorizando almacén europeo. SOLO INFORMA — nunca publica ni importa.
 * Los hallazgos se devuelven en la respuesta y se registran en ApiLog
 * (visibles en /admin/logs); la importación siempre requiere aprobación.
 * Programado en vercel.json (07:00 UTC). Protegido por CRON_SECRET.
 */

interface CjListItem {
  pid: string;
  productNameEn?: string;
  sellPrice?: string | number;
  productImage?: string;
}

/** PIDs ya evaluados (catálogo actual + respaldos + rechazados) — no re-proponer. */
const KNOWN_PIDS = new Set([
  "2075157496968089602", // fuente (importada)
  "2072593659523276802", // fuente respaldo
  "2064224453881335810", // aspirador coche (importado)
  "2606291147131621000", // aspirador coche respaldo CN
  "2607020907151614100", // pistola masaje (importada)
  "2606030907281600200", // pistola rechazada
  "2605170708381632700", // power bank (importado)
  "2070126026522157058", // mochila (importada)
  "2070736998999437314", // mochila respaldo DE
  "2607080203021634300", // mochila rechazada
  "2604270537031604100", // proyector (importado)
  "2604180131321638500", // proyector rechazado (720p)
  "2049432588934295553", // robot rechazado (sin specs)
  "2047623493035405314", // robot L21m (pospuesto por precio)
  "2051940397933158402", // robot intermedio (pospuesto)
]);

const JUNK =
  /cover|spare|part|replacement|sticker|toy|kids|cartoon|bracket|holder only|filter only|cabinet|drawer|shelf|wardrobe|tv |table|sofa|bed/i;

interface ScoutQuery {
  category: string;
  term: string;
  must: RegExp[];
  mustNot?: RegExp;
  price: readonly [number, number];
}

const SCOUT_QUERIES: ScoutQuery[] = [
  { category: "pet-care", term: "pet water fountain stainless", must: [/fountain/i, /water/i], mustNot: /bottle|cup/i, price: [8, 60] },
  { category: "smart-home", term: "robot vacuum lidar", must: [/robot/i, /vacuum|sweep|mop/i, /clean/i], mustNot: /window|detergent|storage|capable|suitable/i, price: [80, 350] },
  { category: "car-accessories", term: "car vacuum cleaner cordless", must: [/vacuum/i, /clean/i], mustNot: /robot|bag|stand|tyre|tire|adsorpt|sealer/i, price: [8, 60] },
  { category: "health-wellness", term: "fascial massage gun", must: [/gun/i, /massag|fascia|muscle/i], mustNot: /pressure|washer|water|spray/i, price: [15, 90] },
  { category: "mobile-accessories", term: "magsafe power bank", must: [/power\s*bank/i, /magnetic|magsafe|wireless/i], mustNot: /solar|case|fan/i, price: [8, 50] },
  { category: "travel", term: "anti theft laptop backpack", must: [/backpack/i], mustNot: /hiking|army|camouflage|school/i, price: [15, 60] },
];

interface Finding {
  category: string;
  pid: string;
  name: string;
  price: string;
  euWarehouse: boolean;
  url: string;
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!cjdropshipping.isConfigured()) {
    return NextResponse.json({ error: "CJ credentials not configured" }, { status: 503 });
  }

  const findings: Finding[] = [];
  const errors: string[] = [];
  for (const q of SCOUT_QUERIES) {
    // Pasada 1: solo almacén alemán (logística premium); pasada 2: global.
    for (const country of ["DE", ""]) {
      await new Promise((r) => setTimeout(r, 1200)); // respeto del QPS de CJ
      try {
        const data = await cjRequest<{ list?: CjListItem[] }>(
          `/product/list?pageNum=1&pageSize=100${country ? `&countryCode=${country}` : ""}&productNameEn=${encodeURIComponent(q.term)}`,
        );
        for (const p of data.list ?? []) {
          const name = p.productNameEn ?? "";
          const price = Number(String(p.sellPrice ?? "0").split("--")[0]);
          if (
            q.must.every((re) => re.test(name)) &&
            !q.mustNot?.test(name) &&
            !JUNK.test(name) &&
            price >= q.price[0] &&
            price <= q.price[1] &&
            !KNOWN_PIDS.has(p.pid) &&
            !findings.some((f) => f.pid === p.pid)
          ) {
            findings.push({
              category: q.category,
              pid: p.pid,
              name,
              price: String(p.sellPrice),
              euWarehouse: country !== "",
              url: `https://cjdropshipping.com/product/-p-${p.pid}.html`,
            });
          }
        }
      } catch (e) {
        // una consulta fallida no aborta el scout, pero queda registrada
        errors.push(`${q.term}/${country || "global"}: ${e instanceof Error ? e.message : String(e)}`);
      }
      // presupuesto de tiempo: máx 3 hallazgos por categoría
      if (findings.filter((f) => f.category === q.category).length >= 3) break;
    }
  }

  const top = findings.slice(0, 18);
  await log("system", "info", `Scout diario CJ: ${top.length} candidatos nuevos (pendientes de aprobación del propietario)`, {
    findings: top,
  });

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    policy: "report-only — nada se publica sin aprobación",
    count: top.length,
    findings: top,
    errors: errors.length ? errors : undefined,
  });
}
