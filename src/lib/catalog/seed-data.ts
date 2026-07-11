import type { Locale } from "@/i18n/routing";

/**
 * Launch catalog — the 8 initial products and 7 categories.
 * This is the single source of truth for `prisma/seed.ts` and the fallback
 * catalog served when DATABASE_URL is not configured (local development).
 * Real stock, cost and images are overwritten by the supplier sync
 * (/api/cron/sync-suppliers) once BigBuy / CJ API keys are configured.
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
  supplierProductId: string; // placeholder until mapped to the live supplier catalog
  categorySlug: string;
  priceCents: number;
  compareAtCents?: number;
  costCents: number;
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
  { slug: "lighting", sortOrder: 7, names: { en: "Lighting", es: "Iluminación", nl: "Verlichting", de: "Beleuchtung", fr: "Éclairage", it: "Illuminazione" } },
];

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    slug: "smart-pet-fountain",
    sku: "TLS-PET-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "CJ-PENDING-MAP",
    categorySlug: "pet-care",
    priceCents: 3995,
    compareAtCents: 4995,
    costCents: 1420,
    stock: 120,
    images: ["/products/smart-pet-fountain.svg"],
    i18n: {
      en: { name: "Aqua Pet Fountain", tagline: "Fresh, filtered water. Always flowing.", description: "A whisper-quiet smart fountain that keeps your pet hydrated with continuously filtered water. Triple filtration, 2.5L capacity and an ultra-low-power pump designed to run around the clock." },
      es: { name: "Fuente Inteligente Aqua", tagline: "Agua fresca y filtrada. Siempre en movimiento.", description: "Una fuente inteligente silenciosa que mantiene a tu mascota hidratada con agua filtrada continuamente. Triple filtración, 2,5 L de capacidad y una bomba de bajo consumo diseñada para funcionar sin descanso." },
    },
  },
  {
    slug: "robot-vacuum",
    sku: "TLS-HOME-001",
    supplier: "BIGBUY",
    supplierProductId: "BB-PENDING-MAP",
    categorySlug: "smart-home",
    priceCents: 19900,
    compareAtCents: 24900,
    costCents: 11200,
    stock: 45,
    images: ["/products/robot-vacuum.svg"],
    i18n: {
      en: { name: "Orbit Robot Vacuum", tagline: "Your floors, handled.", description: "Laser-guided navigation, 2700 Pa suction and self-docking charging. Orbit maps your home and cleans on your schedule — hard floors, carpet and everything between." },
      es: { name: "Robot Aspirador Orbit", tagline: "Tus suelos, resueltos.", description: "Navegación láser, 2700 Pa de succión y carga automática. Orbit mapea tu hogar y limpia según tu horario: suelos duros, alfombras y todo lo demás." },
    },
  },
  {
    slug: "car-handheld-vacuum",
    sku: "TLS-CAR-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "CJ-PENDING-MAP",
    categorySlug: "car-accessories",
    priceCents: 3495,
    costCents: 1180,
    stock: 200,
    images: ["/products/car-handheld-vacuum.svg"],
    i18n: {
      en: { name: "Dash Handheld Vacuum", tagline: "Detail-clean, anywhere.", description: "A cordless 120W handheld vacuum small enough for the glovebox. USB-C fast charging, washable HEPA filter and three precision nozzles for seams, seats and vents." },
      es: { name: "Aspirador de Mano Dash", tagline: "Limpieza de detalle, en cualquier lugar.", description: "Aspirador de mano inalámbrico de 120 W que cabe en la guantera. Carga rápida USB-C, filtro HEPA lavable y tres boquillas de precisión para juntas, asientos y rejillas." },
    },
  },
  {
    slug: "massage-gun",
    sku: "TLS-WELL-001",
    supplier: "BIGBUY",
    supplierProductId: "BB-PENDING-MAP",
    categorySlug: "health-wellness",
    priceCents: 5995,
    compareAtCents: 7995,
    costCents: 2700,
    stock: 80,
    images: ["/products/massage-gun.svg"],
    i18n: {
      en: { name: "Pulse Massage Gun", tagline: "Recovery, on your terms.", description: "Percussive deep-tissue therapy with five intensities and four heads, under 45 dB. Aircraft-grade aluminium body with a 6-hour battery for weeks of sessions per charge." },
      es: { name: "Pistola de Masaje Pulse", tagline: "Recuperación, a tu manera.", description: "Terapia percusiva de tejido profundo con cinco intensidades y cuatro cabezales, por debajo de 45 dB. Cuerpo de aluminio de grado aeronáutico y batería de 6 horas." },
    },
  },
  {
    slug: "smart-led-lamp",
    sku: "TLS-LIGHT-001",
    supplier: "BIGBUY",
    supplierProductId: "BB-PENDING-MAP",
    categorySlug: "lighting",
    priceCents: 2995,
    costCents: 1240,
    stock: 150,
    images: ["/products/smart-led-lamp.svg"],
    i18n: {
      en: { name: "Halo Smart Lamp", tagline: "Light that reads the room.", description: "16 million colours, warm-to-cool white and app or voice control. Halo shifts with your day — crisp light for focus, amber calm for winding down." },
      es: { name: "Lámpara Inteligente Halo", tagline: "Luz que entiende el momento.", description: "16 millones de colores, blanco cálido a frío y control por app o voz. Halo acompaña tu día: luz nítida para concentrarte, calma ámbar para desconectar." },
    },
  },
  {
    slug: "magsafe-power-bank",
    sku: "TLS-MOB-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "CJ-PENDING-MAP",
    categorySlug: "mobile-accessories",
    priceCents: 4495,
    costCents: 1690,
    stock: 180,
    images: ["/products/magsafe-power-bank.svg"],
    i18n: {
      en: { name: "Snap Power Bank", tagline: "Power that clicks into place.", description: "A 10,000 mAh magnetic power bank with 15W wireless charging and USB-C PD passthrough. Snaps to MagSafe iPhones and stays put — no cables, no fumbling." },
      es: { name: "Power Bank Snap", tagline: "Energía que encaja al instante.", description: "Batería magnética de 10.000 mAh con carga inalámbrica de 15 W y USB-C PD. Se acopla a iPhones MagSafe y no se mueve: sin cables, sin complicaciones." },
    },
  },
  {
    slug: "anti-theft-backpack",
    sku: "TLS-TRAV-001",
    supplier: "CJDROPSHIPPING",
    supplierProductId: "CJ-PENDING-MAP",
    categorySlug: "travel",
    priceCents: 4995,
    compareAtCents: 6495,
    costCents: 1850,
    stock: 90,
    images: ["/products/anti-theft-backpack.svg"],
    i18n: {
      en: { name: "Vault Backpack", tagline: "Everything with you. Nothing exposed.", description: "Hidden zippers, cut-resistant fabric and an integrated USB pass-through. Fits a 15.6\" laptop with a weight-diffusing back panel for all-day comfort." },
      es: { name: "Mochila Vault", tagline: "Todo contigo. Nada expuesto.", description: "Cremalleras ocultas, tejido anticorte y puerto USB integrado. Cabe un portátil de 15,6\" con panel trasero que distribuye el peso para llevarla todo el día." },
    },
  },
  {
    slug: "mini-projector",
    sku: "TLS-HOME-002",
    supplier: "BIGBUY",
    supplierProductId: "BB-PENDING-MAP",
    categorySlug: "smart-home",
    priceCents: 12900,
    compareAtCents: 15900,
    costCents: 6400,
    stock: 60,
    images: ["/products/mini-projector.svg"],
    i18n: {
      en: { name: "Beam Mini Projector", tagline: "A cinema that fits in one hand.", description: "1080p native resolution, auto keystone and a 120\" picture from three metres. Wi-Fi casting, HDMI and a built-in speaker — movie night, anywhere there's a wall." },
      es: { name: "Mini Proyector Beam", tagline: "Un cine que cabe en una mano.", description: "Resolución nativa 1080p, corrección automática y 120\" de imagen a tres metros. Wi-Fi, HDMI y altavoz integrado: cine en cualquier pared." },
    },
  },
];
