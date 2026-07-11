/**
 * CJdropshipping sourcing v2 — Director de Compras.
 * Correcciones sobre v1: filtro estricto por nombre (la búsqueda del API es
 * difusa y devuelve ruido), paginación hasta reunir candidatos válidos,
 * stock vía /product/stock/queryByVid (queryByPid no existe) y guardado
 * incremental para poder reanudar.
 *
 * Solo LEE del API. No importa productos ni toca la tienda.
 * Uso: node scripts/cj-sourcing.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const TOKEN_CACHE = "data/cj-token.json";
const OUT = "data/cj-sourcing-results.json";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    }),
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getToken() {
  if (existsSync(TOKEN_CACHE)) {
    const cached = JSON.parse(readFileSync(TOKEN_CACHE, "utf8"));
    if (cached.expiresAt > Date.now()) return cached.token;
  }
  const res = await fetch(`${BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: env.CJ_EMAIL, password: env.CJ_API_KEY }),
  });
  const data = await res.json();
  if (!data.result) throw new Error(`CJ auth failed: ${data.message}`);
  mkdirSync("data", { recursive: true });
  writeFileSync(TOKEN_CACHE, JSON.stringify({ token: data.data.accessToken, expiresAt: Date.now() + 9 * 24 * 3600e3 }));
  return data.data.accessToken;
}

let TOKEN;
async function cj(path, init, tries = 3) {
  await sleep(1100);
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: { "CJ-Access-Token": TOKEN, "Content-Type": "application/json", ...init?.headers },
    });
  } catch (e) {
    // fallo de red transitorio → reintenta
    if (tries > 0) {
      await sleep(8000);
      return cj(path, init, tries - 1);
    }
    return { __error: `network: ${e.message}`, __path: path };
  }
  let data;
  try {
    data = await res.json();
  } catch {
    data = { result: false, message: `HTTP ${res.status}` };
  }
  if (!data.result) {
    if (tries > 0 && /frequent|too many|later|busy/i.test(data.message ?? "")) {
      await sleep(6000);
      return cj(path, init, tries - 1);
    }
    return { __error: data.message ?? "unknown", __path: path };
  }
  return data.data;
}

const PRODUCTS = [
  {
    key: "1-pet-fountain",
    search: "cat water fountain",
    must: [/fountain|water dispenser/i],
    mustNot: /bottle|cup|bowl(?!.*fountain)/i,
    nice: [/stainless|304|steel/i, /\b[2-9]\s*\.?\s*[05]?\s*l\b|2000ml|2\.5|automatic/i, /quiet|mute|silent/i, /filter/i],
  },
  {
    key: "2-robot-vacuum",
    searches: ["robot vacuum cleaner", "sweeping robot", "robot vacuum mop"],
    must: [/robot/i, /vacuum|sweep|mop/i, /clean|vacuum/i],
    mustNot: /toy|rc\b|window|cabinet|detergent|storage|drawer|tv |cover|accessor|filter for|replacement/i,
    nice: [/lidar|laser|lds|navigation/i, /mop/i, /[3-9]\d{3}\s*pa|\d{5}\s*pa/i, /app|wifi|smart|alexa|tuya/i],
  },
  {
    key: "3-car-vacuum",
    searches: ["car vacuum cleaner handheld", "handheld vacuum cordless", "portable car vacuum"],
    must: [/vacuum/i, /clean/i],
    mustNot: /robot|part|filter only|accessor|bag|stand|phone|tyre|tire|scraping|adsorpt|sealer|storage/i,
    nice: [/1[2-9]\d{3}|[2-9]\d{4}\s*pa|\d{4,5}\s*pa/i, /type\s*-?\s*c|usb\s*-?\s*c|usb/i, /cordless|wireless|handheld/i, /car/i],
  },
  {
    key: "4-massage-gun",
    search: "fascial massage gun",
    must: [/gun/i, /massag|fascia|muscle/i],
    mustNot: /toy|water gun/i,
    nice: [/quiet|silent|brushless/i, /([4-9]|\d{2})\s*head/i, /speed|gear|adjust/i, /lcd|touch|display/i],
  },
  {
    key: "5-smart-lamp",
    searches: ["smart bulb alexa", "wifi rgb bulb", "smart table lamp rgb"],
    must: [/bulb|lamp/i, /smart|wifi|rgb|alexa|app/i],
    mustNot: /bed|sofa|fan|cabinet|pool|car|dmx|christmas|cable|toy|humidifier|rc |ground|aroma|projector/i,
    nice: [/alexa|google/i, /rgb|color|dimm/i, /wifi|app|smart|tuya/i, /e27|e26|remote/i],
  },
  {
    key: "6-power-bank",
    searches: ["magnetic wireless power bank", "magsafe power bank"],
    must: [/power\s*bank|powerbank/i, /magnetic|magsafe|wireless/i],
    mustNot: /solar|case|holder|fan|bucket|misting/i,
    nice: [/10000|20000|10,000|5000/i, /magsafe|magnetic/i, /pd|fast|22\.5|quick/i, /type\s*-?\s*c|usb\s*-?\s*c|wireless/i],
  },
  {
    key: "7-backpack",
    search: "anti-theft laptop backpack",
    must: [/backpack/i],
    mustNot: /kids|child|school bag cartoon/i,
    nice: [/waterproof|water\s*resist/i, /15\.?6|laptop|17/i, /usb/i, /anti\s*-?\s*theft|hidden|lock/i],
  },
  {
    key: "8-projector",
    searches: ["mini projector 1080p wifi", "portable projector home theater", "projector android wifi bluetooth"],
    must: [/projector/i],
    mustNot: /lamp only|bracket|screen|stand|bulb|hud|headlight|fog|car|galaxy|star(?!.*movie)/i,
    nice: [/1080|full\s*hd|4k/i, /wifi/i, /bluetooth|bt5|android/i, /hdmi|portable/i],
  },
];

const DEST_COUNTRIES = ["NL", "BE", "DE", "FR", "ES", "IT", "PT", "AT", "PL"];
const EU = ["DE", "FR", "ES", "IT", "PL", "CZ", "NL", "BE"];

async function searchStrict(spec) {
  const found = new Map();
  const terms = spec.searches ?? [spec.search];
  for (const term of terms) {
    if (found.size >= 10) break;
    for (let page = 1; page <= 3 && found.size < 10; page++) {
      const data = await cj(
        `/product/list?pageNum=${page}&pageSize=100&productNameEn=${encodeURIComponent(term)}`,
      );
      if (data.__error) {
        console.error(`  list "${term}" p${page} ERROR: ${data.__error}`);
        break;
      }
      const list = data.list ?? [];
      if (!list.length) break;
      for (const p of list) {
        const name = p.productNameEn ?? "";
        if (spec.must.every((re) => re.test(name)) && !(spec.mustNot && spec.mustNot.test(name))) {
          const matches = spec.nice.filter((re) => re.test(name)).length;
          if (!found.has(p.pid)) found.set(p.pid, { ...p, __matches: matches });
        }
      }
      console.log(`  "${term}" p${page}: ${list.length} resultados, ${found.size} válidos`);
    }
  }
  return [...found.values()].sort((a, b) => b.__matches - a.__matches).slice(0, 5);
}

function parseImages(detail) {
  const s = detail?.productImageSet ?? detail?.productImage ?? [];
  if (Array.isArray(s)) return s.slice(0, 6);
  try {
    const arr = JSON.parse(s);
    return Array.isArray(arr) ? arr.slice(0, 6) : [String(s)];
  } catch {
    return [String(s)];
  }
}

async function enrich(c) {
  const detail = await cj(`/product/query?pid=${encodeURIComponent(c.pid)}`);
  const vid = detail?.variants?.[0]?.vid ?? null;
  let stockRows = [];
  if (vid) {
    const st = await cj(`/product/stock/queryByVid?vid=${encodeURIComponent(vid)}`);
    if (Array.isArray(st)) stockRows = st;
  }
  const rows = stockRows.map((r) => ({
    area: r.areaEn ?? "?",
    country: r.countryCode ?? "?",
    num: Number(r.totalInventoryNum ?? r.storageNum ?? 0),
  }));
  const euRow = rows.filter((r) => EU.includes(r.country) && r.num > 0).sort((a, b) => b.num - a.num)[0];
  const anyRow = rows.filter((r) => r.num > 0).sort((a, b) => b.num - a.num)[0];
  const warehouse = euRow ?? anyRow ?? null;

  let freightNL = null;
  if (vid) {
    const fr = await cj(`/logistic/freightCalculate`, {
      method: "POST",
      body: JSON.stringify({
        startCountryCode: warehouse?.country && warehouse.country !== "?" ? warehouse.country : "CN",
        endCountryCode: "NL",
        products: [{ quantity: 1, vid }],
      }),
    });
    if (Array.isArray(fr) && fr.length) {
      freightNL = fr
        .map((o) => ({ name: o.logisticName, price: Number(o.logisticPrice), days: o.logisticAging }))
        .sort((a, b) => a.price - b.price)
        .slice(0, 3);
    } else if (fr?.__error) freightNL = { error: fr.__error };
  }

  return {
    pid: c.pid,
    name: c.productNameEn,
    sku: detail?.productSku ?? c.productSku ?? null,
    matches: c.__matches,
    sellPrice: detail?.sellPrice ?? c.sellPrice ?? null,
    weightGr: detail?.productWeight ?? null,
    material: detail?.materialNameEn ?? null,
    category: detail?.categoryName ?? c.categoryName ?? null,
    variantsCount: detail?.variants?.length ?? 0,
    firstVid: vid,
    images: parseImages(detail),
    url: `https://cjdropshipping.com/product/-p-${c.pid}.html`,
    warehouse,
    stockAll: rows,
    freightNL,
  };
}

function scoreCandidate(c) {
  const freight = Array.isArray(c.freightNL) ? (c.freightNL[0]?.price ?? 25) : 25;
  const stockNum = c.warehouse?.num ?? 0;
  let s = 0;
  s += c.matches * 10; // calidad specs (máx 40)
  s += c.warehouse && EU.includes(c.warehouse.country) ? 20 : 0; // almacén EU
  s += stockNum > 500 ? 10 : stockNum > 50 ? 6 : stockNum > 0 ? 3 : 0; // stock
  s += Math.max(0, 15 - freight); // envío barato
  const price = Number(String(c.sellPrice ?? "0").split("--")[0]) || 0;
  s += price > 3 && price < 80 ? 10 : 0; // rango de precio sano para margen premium
  return Math.round(s);
}

async function main() {
  TOKEN = await getToken();
  console.log("token OK");
  const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { products: {} };
  out.generatedAt = new Date().toISOString();
  out.version = 2;

  // Productos cuya pasada v2 dio candidatos correctos — no se repiten.
  const KEEP_V2 = new Set(["1-pet-fountain", "4-massage-gun", "7-backpack"]);
  for (const spec of PRODUCTS) {
    const existing = out.products[spec.key];
    const done =
      (existing?.version >= 3 || (existing?.version === 2 && KEEP_V2.has(spec.key))) &&
      existing.candidates?.length >= 3;
    if (done) {
      console.log(`\n=== ${spec.key}: ya completado, salto`);
      continue;
    }
    console.log(`\n=== ${spec.key}: buscando ${JSON.stringify(spec.searches ?? [spec.search])}`);
    const candidates = await searchStrict(spec);
    console.log(`  → ${candidates.length} candidatos estrictos`);
    const enriched = [];
    for (const c of candidates) {
      enriched.push(await enrich(c));
      console.log(`  ✓ ${String(c.productNameEn).slice(0, 65)} [${c.__matches}]`);
    }
    for (const e of enriched) e.tulsiScore = scoreCandidate(e);
    enriched.sort((a, b) => b.tulsiScore - a.tulsiScore);
    out.products[spec.key] = { version: 3, search: (spec.searches ?? [spec.search]).join(" | "), candidates: enriched };
    writeFileSync(OUT, JSON.stringify(out, null, 2)); // guardado incremental
  }

  // Envíos 9 países para el mejor de cada producto
  for (const [key, data] of Object.entries(out.products)) {
    const winner = data.candidates?.[0];
    if (!winner?.firstVid) continue;
    winner.freightByCountry ??= {};
    const missing = DEST_COUNTRIES.filter((cc) => !winner.freightByCountry[cc]);
    if (!missing.length) continue;
    console.log(`\n>>> envíos ${missing.length} países: ${key} → ${String(winner.name).slice(0, 55)}`);
    for (const cc of missing) {
      const fr = await cj(`/logistic/freightCalculate`, {
        method: "POST",
        body: JSON.stringify({
          startCountryCode:
            winner.warehouse?.country && winner.warehouse.country !== "?" ? winner.warehouse.country : "CN",
          endCountryCode: cc,
          products: [{ quantity: 1, vid: winner.firstVid }],
        }),
      });
      winner.freightByCountry[cc] = Array.isArray(fr)
        ? fr.map((o) => ({ name: o.logisticName, price: Number(o.logisticPrice), days: o.logisticAging }))
            .sort((a, b) => a.price - b.price)[0] ?? null
        : { error: fr?.__error };
      console.log(`  ${cc}: ${JSON.stringify(winner.freightByCountry[cc])}`);
    }
    writeFileSync(OUT, JSON.stringify(out, null, 2));
  }

  console.log("\nOK → " + OUT);
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
