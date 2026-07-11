import { getPrisma } from "../prisma";
import { log } from "../log";
import { sendEmail, shippingUpdateHtml } from "../email";
import { bigbuy } from "./bigbuy";
import { cjdropshipping } from "./cjdropshipping";
import type { ShippingAddress, SupplierAdapter } from "./types";

export const ADAPTERS: Record<"BIGBUY" | "CJDROPSHIPPING", SupplierAdapter> = {
  BIGBUY: bigbuy,
  CJDROPSHIPPING: cjdropshipping,
};

/**
 * Order fan-out: after payment, split the order's items by supplier and
 * place one fulfilment order per supplier. Each leg is persisted as a
 * SupplierOrder row; failures are recorded (never swallowed) so the admin
 * panel can retry them — a paid customer order is never lost.
 */
export async function forwardOrderToSuppliers(orderId: string): Promise<void> {
  const prisma = getPrisma();
  if (!prisma) {
    await log("system", "warn", `Cannot forward order ${orderId}: no database configured`);
    return;
  }
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });
  if (!order) throw new Error(`Order ${orderId} not found`);

  const address: ShippingAddress = {
    name: order.shippingName ?? "",
    line1: order.shippingLine1 ?? "",
    line2: order.shippingLine2 ?? undefined,
    city: order.shippingCity ?? "",
    postalCode: order.shippingPostal ?? "",
    countryCode: order.shippingCountry ?? "NL",
    email: order.email,
  };

  const bySupplier = new Map<"BIGBUY" | "CJDROPSHIPPING", { supplierProductId: string; quantity: number }[]>();
  for (const item of order.items) {
    const key = item.product.supplier as "BIGBUY" | "CJDROPSHIPPING";
    const lines = bySupplier.get(key) ?? [];
    lines.push({ supplierProductId: item.product.supplierProductId, quantity: item.quantity });
    bySupplier.set(key, lines);
  }

  for (const [supplier, lines] of bySupplier) {
    const leg = await prisma.supplierOrder.create({
      data: { orderId: order.id, supplier, status: "QUEUED" },
    });
    const adapter = ADAPTERS[supplier];
    if (!adapter.isConfigured()) {
      await prisma.supplierOrder.update({
        where: { id: leg.id },
        data: { status: "FAILED", lastError: `${supplier} API credentials not configured` },
      });
      await log("system", "warn", `Order ${order.number}: ${supplier} not configured, leg queued as FAILED for manual retry`);
      continue;
    }
    try {
      const placed = await adapter.placeOrder(`${order.number}-${supplier}`, address, lines);
      await prisma.supplierOrder.update({
        where: { id: leg.id },
        data: {
          status: "PLACED",
          externalOrderId: placed.externalOrderId,
          raw: JSON.parse(JSON.stringify(placed.raw ?? null)),
        },
      });
    } catch (err) {
      await prisma.supplierOrder.update({
        where: { id: leg.id },
        data: { status: "FAILED", lastError: err instanceof Error ? err.message : String(err) },
      });
      await log("system", "error", `Order ${order.number}: failed to place at ${supplier}`, {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const legs = await prisma.supplierOrder.findMany({ where: { orderId: order.id } });
  const allPlaced = legs.every((l) => l.status === "PLACED");
  await prisma.order.update({
    where: { id: order.id },
    data: { status: allPlaced ? "FORWARDED_TO_SUPPLIER" : order.status },
  });
}

/**
 * Tracking poll (called by /api/cron/sync-tracking): for every PLACED leg,
 * ask the supplier for tracking; when found, persist it, mark the leg
 * SHIPPED and email the customer.
 */
export async function syncTracking(): Promise<{ updated: number }> {
  const prisma = getPrisma();
  if (!prisma) return { updated: 0 };
  const legs = await prisma.supplierOrder.findMany({
    where: { status: { in: ["PLACED", "ACCEPTED"] }, externalOrderId: { not: null } },
    include: { order: true },
  });
  let updated = 0;
  for (const leg of legs) {
    const adapter = ADAPTERS[leg.supplier as "BIGBUY" | "CJDROPSHIPPING"];
    if (!adapter.isConfigured()) continue;
    try {
      const tracking = await adapter.getTracking(leg.externalOrderId!);
      if (tracking) {
        await prisma.supplierOrder.update({
          where: { id: leg.id },
          data: {
            status: "SHIPPED",
            trackingNumber: tracking.trackingNumber,
            trackingUrl: tracking.trackingUrl,
          },
        });
        await prisma.order.update({ where: { id: leg.orderId }, data: { status: "SHIPPED" } });
        await sendEmail(
          leg.order.email,
          `Your Tulsi order ${leg.order.number} has shipped`,
          shippingUpdateHtml(leg.order.number, tracking.trackingNumber, tracking.trackingUrl),
        );
        updated++;
      }
    } catch (err) {
      await log("system", "warn", `Tracking sync failed for leg ${leg.id}`, {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
  return { updated };
}

/**
 * Catalog sync (called by /api/cron/sync-suppliers): refresh stock and cost
 * for every active product from its supplier.
 */
export async function syncCatalog(): Promise<{ synced: number; skipped: number }> {
  const prisma = getPrisma();
  if (!prisma) return { synced: 0, skipped: 0 };
  const products = await prisma.product.findMany({ where: { active: true } });
  let synced = 0;
  let skipped = 0;
  for (const product of products) {
    const adapter = ADAPTERS[product.supplier as "BIGBUY" | "CJDROPSHIPPING"];
    if (!adapter.isConfigured() || product.supplierProductId.includes("PENDING-MAP")) {
      skipped++;
      continue;
    }
    try {
      const [remote] = await adapter.fetchProducts([product.supplierProductId]);
      if (remote) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            stock: remote.stock,
            costCents: remote.costCents || product.costCents,
            images: remote.images.length ? remote.images : product.images,
          },
        });
        synced++;
      }
    } catch (err) {
      await log("system", "warn", `Catalog sync failed for ${product.sku}`, {
        error: err instanceof Error ? err.message : String(err),
      });
      skipped++;
    }
  }
  await log("system", "info", `Catalog sync complete: ${synced} synced, ${skipped} skipped`);
  return { synced, skipped };
}
