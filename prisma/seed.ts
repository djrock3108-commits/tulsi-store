import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "../src/lib/catalog/seed-data";
import { LOCALES } from "../src/i18n/routing";

/**
 * Idempotent seed: upserts the 7 launch categories and 8 launch products
 * with translations for all 6 locales (missing locales fall back to English).
 * Run: npx prisma db seed
 */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required to seed");
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

  for (const cat of SEED_CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { sortOrder: cat.sortOrder },
      create: { slug: cat.slug, sortOrder: cat.sortOrder },
    });
    for (const locale of LOCALES) {
      await prisma.categoryTranslation.upsert({
        where: { categoryId_locale: { categoryId: category.id, locale } },
        update: { name: cat.names[locale] },
        create: { categoryId: category.id, locale, name: cat.names[locale] },
      });
    }
  }

  for (const p of SEED_PRODUCTS) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: p.categorySlug } });
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        priceCents: p.priceCents,
        compareAtCents: p.compareAtCents ?? null,
        costCents: p.costCents,
      },
      create: {
        slug: p.slug,
        sku: p.sku,
        supplier: p.supplier,
        supplierProductId: p.supplierProductId,
        categoryId: category.id,
        priceCents: p.priceCents,
        compareAtCents: p.compareAtCents ?? null,
        costCents: p.costCents,
        stock: p.stock,
        images: p.images,
      },
    });
    for (const locale of LOCALES) {
      const t = p.i18n[locale] ?? p.i18n.en;
      await prisma.productTranslation.upsert({
        where: { productId_locale: { productId: product.id, locale } },
        update: t,
        create: { productId: product.id, locale, ...t },
      });
    }
  }

  console.log(`Seeded ${SEED_CATEGORIES.length} categories, ${SEED_PRODUCTS.length} products.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
