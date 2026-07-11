import type { Locale } from "@/i18n/routing";

/**
 * Catálogo de lanzamiento — 6 productos VERIFICADOS del catálogo real de
 * CJdropshipping (2026-07-11, ver PRODUCT_SELECTION_REPORT.md y
 * data/cj-verification.json). `supplierProductId` es el VID de variante CJ:
 * es el identificador que usan createOrderV2 (pedidos) y stock/queryByVid
 * (sincronización). Las imágenes son las oficiales del proveedor (CDN CJ).
 *
 * Retirados tras verificación: lámpara smart (sin candidato Tuya/Alexa con
 * envío UE en CJ) y robot aspirador (pendiente de decisión de precio del
 * propietario — ver informe).
 */

export type SupplierCode = "BIGBUY" | "CJDROPSHIPPING";

export interface SeedCategory {
  slug: string;
  sortOrder: number;
  names: Record<Locale, string>;
}

export interface SeedProductI18n {
  name: string;
  tagline: string;
  description: string;
}

export interface SeedProduct {
  slug: string;
  sku: string;
  supplier: SupplierCode;
  supplierProductId: string; // CJ variant VID
  categorySlug: string;
  priceCents: number;
  compareAtCents?: number;
  costCents: number; // coste CJ aprox. en céntimos EUR (se refresca por sync)
  stock: number;
  images: string[];
  i18n: Partial<Record<Locale, SeedProductI18n>> & { en: SeedProductI18n };
}

export const SEED_CATEGORIES: SeedCategory[] = [
  { slug: "smart-home", sortOrder: 1, names: { en: "Smart Home", es: "Hogar Inteligente", nl: "Smart Home", de: "Smart Home", fr: "Maison Connectée", it: "Casa Intelligente" } },
  { slug: "pet-care", sortOrder: 2, names: { en: "Pet Care", es: "Mascotas", nl: "Huisdierverzorging", de: "Haustierpflege", fr: "Animaux", it: "Cura degli Animali" } },
  { slug: "car-accessories", sortOrder: 3, names: { en: "Car Accessories", es: "Accesorios de Coche", nl: "Auto-accessoires", de: "Autozubehör", fr: "Accessoires Auto", it: "Accessori Auto" } },
  { slug: "mobile-accessories", sortOrder: 4, names: { en: "Mobile Accessories", es: "Accesorios Móvil", nl: "Mobiele Accessoires", de: "Handy-Zubehör", fr: "Accessoires Mobiles", it: "Accessori Mobile" } },
  { slug: "health-wellness", sortOrder: 5, names: { en: "Health & Wellness", es: "Salud y Bienestar", nl: "Gezondheid & Welzijn", de: "Gesundheit & Wellness", fr: "Santé & Bien-être", it: "Salute e Benessere" } },
  { slug: "travel", sortOrder: 6, names: { en: "Travel", es: "Viaje", nl: "Reizen", de: "Reisen", fr: "Voyage", it: "Viaggio" } },
];

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    // CJ pid 2075157496968089602 · CJ SKU CJDT2977063 · verificado: SUS304,
    // 3.2L, filtración 4 capas + 2 filtros de recambio, silenciosa, ventana LED
    slug: "smart-pet-fountain",
    sku: "TLS-PET-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "2075157497051975681",
    categorySlug: "pet-care",
    priceCents: 4995,
    compareAtCents: 5995,
    costCents: 1400,
    stock: 14772,
    images: [
      "https://cf.cjdropshipping.com/d9127d71-7bf2-4eff-8a66-217c3dd25c29.png",
      "https://cf.cjdropshipping.com/eb773499-08ce-4637-bf09-ac8c14c02793.png",
      "https://cf.cjdropshipping.com/2ac4be44-a11a-4e90-83c1-49402a39d51f.png",
    ],
    i18n: {
      en: { name: "Aqua Pet Fountain", tagline: "Fresh, filtered water. Always flowing.", description: "A whisper-quiet 3.2L fountain in food-grade SUS 304 stainless steel. Four-layer filtration with activated carbon keeps water clean and odour-free — two replacement filters included. An illuminated water-level window tells you when to refill, and the whole bowl is dishwasher safe." },
      es: { name: "Fuente Aqua para Mascotas", tagline: "Agua fresca y filtrada. Siempre en movimiento.", description: "Fuente silenciosa de 3,2 L en acero inoxidable SUS 304 de grado alimentario. Filtración de cuatro capas con carbón activado que mantiene el agua limpia y sin olores — incluye dos filtros de recambio. Ventana de nivel iluminada para saber cuándo rellenar, y apta para lavavajillas." },
    },
  },
  {
    // CJ pid 2064224453881335810 · CJ SKU CJFU2927338 · verificado: 16000 Pa,
    // motor brushless, 3 niveles, 7 boquillas, 4 modos · ALMACÉN FRANCIA (GLS 4-8d)
    slug: "car-handheld-vacuum",
    sku: "TLS-CAR-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "2064224454011359234",
    categorySlug: "car-accessories",
    priceCents: 4495,
    compareAtCents: 5495,
    costCents: 1670,
    stock: 10,
    images: [
      "https://cf.cjdropshipping.com/06a313a6-439a-4c5b-b5eb-251023d2a8a6.png",
      "https://cf.cjdropshipping.com/a7b1c1f4-c7cf-46ce-a1f1-155f073f52ba.png",
      "https://cf.cjdropshipping.com/eddfa88c-00ed-48c1-ae58-e8f37dffa038.png",
    ],
    i18n: {
      en: { name: "Dash Handheld Vacuum", tagline: "16,000 Pa of detail-clean, anywhere.", description: "A brushless 16,000 Pa handheld vacuum with a straight air-duct design that cuts air resistance by 80%. Four modes in one tool — vacuum, blower, air pump and vacuum-bag extraction — with seven precision nozzles and three suction levels. Ships from our EU warehouse." },
      es: { name: "Aspirador de Mano Dash", tagline: "16.000 Pa de limpieza de detalle, en cualquier lugar.", description: "Aspirador de mano brushless de 16.000 Pa con conducto de aire recto que reduce la resistencia un 80%. Cuatro modos en una herramienta — aspirado, soplado, inflado y extracción de bolsas de vacío — con siete boquillas de precisión y tres niveles de succión. Envío desde almacén europeo." },
    },
  },
  {
    // CJ pid 2607020907151614100 · CJ SKU CJJT2964609 · verificado: 6 niveles,
    // 7 cabezales (incl. térmico), 1200 mAh, 28 W, formato mini · variante Black
    slug: "massage-gun",
    sku: "TLS-WELL-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "2607020907151615600",
    categorySlug: "health-wellness",
    priceCents: 5995,
    compareAtCents: 7995,
    costCents: 3050,
    stock: 9934,
    images: [
      "https://oss-cf.cjdropshipping.com/product/2026/07/02/09/27e8c31e-439c-4f05-8f25-2bc16c637125.jpg",
      "https://oss-cf.cjdropshipping.com/product/2026/07/02/09/24101b1f-ad5d-4955-b264-ef71187c15af.jpg",
      "https://oss-cf.cjdropshipping.com/product/2026/07/02/09/34d8e537-7db6-4af2-bfe4-3e5ca4f44ff2.jpg",
    ],
    i18n: {
      en: { name: "Pulse Mini Massage Gun", tagline: "Recovery that fits in your bag.", description: "Percussive deep-tissue therapy in a truly compact body. Six intensity levels and seven interchangeable heads — including a self-heating head for warm-up — driven by a 28W motor with a rechargeable 1200 mAh battery. Small enough for the gym bag, strong enough for leg day." },
      es: { name: "Pistola de Masaje Pulse Mini", tagline: "Recuperación que cabe en tu bolsa.", description: "Terapia percusiva de tejido profundo en un cuerpo realmente compacto. Seis niveles de intensidad y siete cabezales intercambiables — incluido uno térmico para calentar — con motor de 28 W y batería recargable de 1200 mAh. Cabe en la bolsa del gimnasio y puede con el día de pierna." },
    },
  },
  {
    // CJ pid 2605170708381632700 · CJ SKU CJYD2893876 · verificado: 10.000 mAh,
    // magnético, carga inalámbrica, carga rápida 9V · variante Silver 10000
    slug: "magsafe-power-bank",
    sku: "TLS-MOB-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "2605170708381633300",
    categorySlug: "mobile-accessories",
    priceCents: 4495,
    costCents: 1300,
    stock: 9430,
    images: [
      "https://oss-cf.cjdropshipping.com/product/2026/05/17/07/f4e548a3-c1c4-4b4a-b0f9-5c72f982bf6c.jpg",
    ],
    i18n: {
      en: { name: "Snap Power Bank", tagline: "Power that clicks into place.", description: "A 10,000 mAh magnetic power bank with fast wireless charging. Snaps onto MagSafe-compatible iPhones and stays put — no cables, no fumbling. Slim 165-gram body that disappears into a pocket." },
      es: { name: "Power Bank Snap", tagline: "Energía que encaja al instante.", description: "Batería magnética de 10.000 mAh con carga inalámbrica rápida. Se acopla a iPhones compatibles con MagSafe y no se mueve: sin cables, sin complicaciones. Cuerpo fino de 165 gramos que desaparece en el bolsillo." },
    },
  },
  {
    // CJ pid 2070126026522157058 · CJ SKU CJTF2954902 · verificado: 22L roll-top
    // expandible, funda acolchada 15,6", impermeable, costuras reforzadas ·
    // ALMACÉN ALEMANIA (24 uds — vigilar reposición)
    slug: "anti-theft-backpack",
    sku: "TLS-TRAV-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "2070126026828341250",
    categorySlug: "travel",
    priceCents: 4995,
    compareAtCents: 6495,
    costCents: 2530,
    stock: 24,
    images: [
      "https://cf.cjdropshipping.com/17823456/11e0ddea-5da8-4c19-b249-b402f9b6dded.jpg",
    ],
    i18n: {
      en: { name: "Vault Backpack", tagline: "Everything with you. Nothing exposed.", description: "A 22-litre roll-top backpack that expands to 26L when you need it. Padded 15.6\" laptop sleeve, waterproof fabric, reinforced stitching and a smart multi-pocket layout that keeps valuables tucked away from wandering hands. Ships from our EU warehouse." },
      es: { name: "Mochila Vault", tagline: "Todo contigo. Nada expuesto.", description: "Mochila roll-top de 22 litros ampliable a 26 L cuando lo necesitas. Funda acolchada para portátil de 15,6\", tejido impermeable, costuras reforzadas y una distribución multibolsillo pensada para mantener lo valioso lejos de manos ajenas. Envío desde almacén europeo." },
    },
  },
  {
    // CJ pid 2604270537031604100 · CJ SKU CJYD2855805 · verificado: 1080p NATIVO
    // (1920×1080), Android 11, WiFi, 450 g · variante Android 11 EU
    slug: "mini-projector",
    sku: "TLS-HOME-002",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "2604270537031604700",
    categorySlug: "smart-home",
    priceCents: 12900,
    compareAtCents: 15900,
    costCents: 3130,
    stock: 5168,
    images: [
      "https://oss-cf.cjdropshipping.com/product/2026/04/27/06/99a83745-6c78-467c-9555-c02febc114f5_fine.jpeg",
      "https://oss-cf.cjdropshipping.com/product/2026/04/27/05/9c5760cb-ae3a-42af-9ff4-29fc17cdfa77.jpg",
      "https://oss-cf.cjdropshipping.com/product/2026/04/27/05/ea729105-feca-4ec7-a0ae-02a94e8aec8c.jpg",
    ],
    i18n: {
      en: { name: "Beam Mini Projector", tagline: "A cinema that fits in one hand.", description: "Native 1080p (1920×1080) resolution with Android 11 built in — your streaming apps live right on the projector, no dongle needed. Wi-Fi, compact 450-gram body and an EU plug in the box. Movie night, anywhere there's a wall." },
      es: { name: "Mini Proyector Beam", tagline: "Un cine que cabe en una mano.", description: "Resolución nativa 1080p (1920×1080) con Android 11 integrado: tus apps de streaming viven en el propio proyector, sin dongles. Wi-Fi, cuerpo compacto de 450 gramos y enchufe europeo incluido. Cine en cualquier pared." },
    },
  },
];
