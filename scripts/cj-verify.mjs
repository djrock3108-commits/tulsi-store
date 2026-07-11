/**
 * Verificación de finalistas + segunda búsqueda de lámpara smart (Tuya/Alexa).
 * Extrae ficha completa de cada PID finalista: descripción (specs), vídeo,
 * variantes, imágenes, menciones CE/FCC/RoHS. Solo LECTURA.
 * Salida: data/cj-verification.json
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const TOKEN = JSON.parse(readFileSync("data/cj-token.json", "utf8")).token;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cj(path, init, tries = 3) {
  await sleep(1100);
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: { "CJ-Access-Token": TOKEN, "Content-Type": "application/json", ...init?.headers },
    });
  } catch (e) {
    if (tries > 0) {
      await sleep(8000);
      return cj(path, init, tries - 1);
    }
    return { __error: `network: ${e.message}` };
  }
  const data = await res.json().catch(() => ({ result: false, message: `HTTP ${res.status}` }));
  if (!data.result) {
    if (tries > 0 && /frequent|too many|later|busy/i.test(data.message ?? "")) {
      await sleep(6000);
      return cj(path, init, tries - 1);
    }
    return { __error: data.message ?? "unknown" };
  }
  return data.data;
}

const FINALISTS = [
  { key: "1-pet-fountain", pid: "2075157496968089602", role: "ganador" },
  { key: "1-pet-fountain", pid: "2072593659523276802", role: "respaldo" },
  { key: "2-robot-vacuum", pid: "2049432588934295553", role: "ganador" },
  { key: "3-car-vacuum", pid: "2064224453881335810", role: "ganador (FR)" },
  { key: "3-car-vacuum", pid: "2606291147131621000", role: "respaldo (CN)" },
  { key: "4-massage-gun", pid: "2607020907151614100", role: "finalista A" },
  { key: "4-massage-gun", pid: "2606030907281600200", role: "finalista B multi-head" },
  { key: "6-power-bank", pid: "2605170708381632700", role: "ganador" },
  { key: "7-backpack", pid: "2607080203021634300", role: "ganador" },
  { key: "8-projector", pid: "2604180131321638500", role: "finalista creíble 1080p" },
  { key: "8-projector", pid: "2604270537031604100", role: "finalista barato" },
];

const stripHtml = (s) =>
  String(s ?? "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&amp;|&quot;|&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

async function verifyPid(entry) {
  const d = await cj(`/product/query?pid=${encodeURIComponent(entry.pid)}`);
  if (d.__error) return { ...entry, error: d.__error };
  const desc = stripHtml(d.description);
  const certs = [...new Set((desc.match(/\bCE\b|FCC|RoHS|UKCA|EMC|LVD|UL\b/gi) ?? []).map((x) => x.toUpperCase()))];
  return {
    ...entry,
    name: d.productNameEn,
    sku: d.productSku,
    sellPrice: d.sellPrice,
    weightGr: d.productWeight,
    material: d.materialNameEn ?? null,
    packing: d.packingNameEn ?? null,
    video: d.productVideo || d.video || null,
    imagesCount: (() => { try { const a = typeof d.productImageSet === "string" ? JSON.parse(d.productImageSet) : d.productImageSet; return Array.isArray(a) ? a.length : 0; } catch { return 0; } })(),
    images: (() => { try { const a = typeof d.productImageSet === "string" ? JSON.parse(d.productImageSet) : d.productImageSet; return Array.isArray(a) ? a : []; } catch { return []; } })(),
    variants: (d.variants ?? []).slice(0, 12).map((v) => ({
      vid: v.vid,
      sku: v.variantSku,
      name: v.variantNameEn ?? v.variantKey,
      price: v.variantSellPrice,
      weight: v.variantWeight,
    })),
    certsMentioned: certs,
    descExcerpt: desc.slice(0, 2200),
  };
}

// Segunda pasada lámpara smart
const LAMP_SEARCHES = [
  "tuya smart bulb",
  "smart life bulb wifi",
  "alexa smart bulb rgb",
  "tuya wifi lamp",
  "smart bulb google home",
  "wifi led strip alexa tuya",
];
const LAMP_MUST = [/bulb|lamp|light|strip/i, /tuya|smart\s*life|alexa|google|wifi/i];
const LAMP_MUSTNOT = /camera|bed|sofa|fan|cabinet|pool|dmx|christmas|cable|toy|humidifier|rc |aroma|projector|solar|switch|socket only/i;

async function lampSearch() {
  const found = new Map();
  for (const term of LAMP_SEARCHES) {
    for (let page = 1; page <= 2 && found.size < 12; page++) {
      const data = await cj(`/product/list?pageNum=${page}&pageSize=100&productNameEn=${encodeURIComponent(term)}`);
      if (data.__error) break;
      const list = data.list ?? [];
      if (!list.length) break;
      for (const p of list) {
        const name = p.productNameEn ?? "";
        if (LAMP_MUST.every((re) => re.test(name)) && !LAMP_MUSTNOT.test(name)) {
          if (!found.has(p.pid)) found.set(p.pid, { pid: p.pid, name, sku: p.productSku, sellPrice: p.sellPrice });
        }
      }
      console.log(`  lamp "${term}" p${page}: ${found.size} válidos`);
    }
  }
  return [...found.values()];
}

async function main() {
  const out = { generatedAt: new Date().toISOString(), finalists: [], lampCandidates: [] };

  console.log("== verificando finalistas");
  for (const f of FINALISTS) {
    const v = await verifyPid(f);
    out.finalists.push(v);
    console.log(`✓ ${f.key} (${f.role}): ${v.name?.slice(0, 60) ?? v.error} | imgs=${v.imagesCount} video=${v.video ? "SÍ" : "no"} certs=${v.certsMentioned?.join(",") || "-"}`);
  }

  console.log("\n== segunda pasada lámpara smart");
  const lamps = await lampSearch();
  console.log(`  ${lamps.length} candidatos de nombre válido; verificando fichas y stock…`);
  for (const l of lamps.slice(0, 8)) {
    const v = await verifyPid({ key: "5-smart-lamp", pid: l.pid, role: "candidato v2" });
    // stock del primer variant para saber almacén
    let warehouse = null;
    if (v.variants?.[0]?.vid) {
      const st = await cj(`/product/stock/queryByVid?vid=${encodeURIComponent(v.variants[0].vid)}`);
      if (Array.isArray(st)) {
        warehouse = st.map((r) => `${r.countryCode}:${r.totalInventoryNum}`).join(" ");
      }
    }
    v.warehouse = warehouse;
    out.lampCandidates.push(v);
    console.log(`  ✓ ${v.name?.slice(0, 65)} | $${v.sellPrice} | wh=${warehouse} | tuya/alexa en desc: ${/tuya|alexa|google/i.test(v.descExcerpt ?? "") ? "SÍ" : "no"}`);
  }

  writeFileSync("data/cj-verification.json", JSON.stringify(out, null, 2));
  console.log("\nOK → data/cj-verification.json");
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
