import { log } from "../log";
import type {
  PlacedSupplierOrder,
  ShippingAddress,
  SupplierAdapter,
  SupplierOrderLine,
  SupplierProduct,
  TrackingInfo,
} from "./types";

/**
 * BigBuy REST API adapter — https://api.bigbuy.eu/doc
 * Auth: Bearer API key (BIGBUY_API_KEY). BIGBUY_ENV=sandbox uses the
 * sandbox host so order placement can be tested without real fulfilment.
 */
const HOSTS = {
  production: "https://api.bigbuy.eu",
  sandbox: "https://api.sandbox.bigbuy.eu",
} as const;

function baseUrl(): string {
  return process.env.BIGBUY_ENV === "production" ? HOSTS.production : HOSTS.sandbox;
}

async function bigbuyFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const key = process.env.BIGBUY_API_KEY;
  if (!key) throw new Error("BIGBUY_API_KEY is not configured");
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    await log("bigbuy", "error", `BigBuy ${init?.method ?? "GET"} ${path} → ${res.status}`, { body });
    throw new Error(`BigBuy API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const bigbuy: SupplierAdapter = {
  code: "BIGBUY",

  isConfigured() {
    return Boolean(process.env.BIGBUY_API_KEY);
  },

  async fetchProducts(supplierProductIds: string[]): Promise<SupplierProduct[]> {
    // Stock: GET /rest/catalog/productsstockbyreference.json (POST variant for batches)
    // Product info: GET /rest/catalog/productinformation.json?isoCode=en
    const out: SupplierProduct[] = [];
    for (const id of supplierProductIds) {
      const info = await bigbuyFetch<{
        id: number;
        name?: string;
        wholesalePrice?: number;
        images?: { url: string }[];
        ean13?: string;
      }>(`/rest/catalog/productinformation/${id}.json?isoCode=en`);
      const stock = await bigbuyFetch<{ stocks?: { quantity: number }[] }>(
        `/rest/catalog/productstock/${id}.json`,
      );
      out.push({
        supplierProductId: String(id),
        name: info.name ?? "",
        costCents: Math.round((info.wholesalePrice ?? 0) * 100),
        stock: stock.stocks?.reduce((s, x) => s + x.quantity, 0) ?? 0,
        images: info.images?.map((i) => i.url) ?? [],
        ean: info.ean13,
      });
    }
    return out;
  },

  async placeOrder(
    reference: string,
    address: ShippingAddress,
    lines: SupplierOrderLine[],
  ): Promise<PlacedSupplierOrder> {
    const payload = {
      order: {
        internalReference: reference,
        cashOnDelivery: false,
        language: "en",
        paymentMethod: "moneybox",
        shippingAddress: {
          firstName: address.name.split(" ")[0],
          lastName: address.name.split(" ").slice(1).join(" ") || "-",
          country: address.countryCode,
          postcode: address.postalCode,
          town: address.city,
          address: [address.line1, address.line2].filter(Boolean).join(", "),
          phone: address.phone ?? "",
          email: address.email,
        },
        products: lines.map((l) => ({ reference: l.supplierProductId, quantity: l.quantity })),
      },
    };
    // Two-step flow recommended by BigBuy: /rest/order/check.json then /rest/order/create.json
    await bigbuyFetch("/rest/order/check.json", { method: "POST", body: JSON.stringify(payload) });
    const created = await bigbuyFetch<{ order_id?: number; id?: number }>("/rest/order/create.json", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const externalOrderId = String(created.order_id ?? created.id ?? "");
    await log("bigbuy", "info", `Order placed at BigBuy: ${externalOrderId} (ref ${reference})`);
    return { externalOrderId, raw: created };
  },

  async getTracking(externalOrderId: string): Promise<TrackingInfo | null> {
    const data = await bigbuyFetch<{
      trackings?: { trackingNumber: string; statusDescription?: string; carrier?: { name?: string } }[];
    }>(`/rest/tracking/order/${externalOrderId}.json`);
    const t = data.trackings?.[0];
    if (!t?.trackingNumber) return null;
    return {
      trackingNumber: t.trackingNumber,
      trackingUrl: `https://t.17track.net/en#nums=${t.trackingNumber}`,
      status: t.statusDescription ?? "in_transit",
    };
  },
};
