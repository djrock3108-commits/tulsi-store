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
 * CJdropshipping API 2.0 adapter — https://developers.cjdropshipping.com
 * Auth: access token obtained from email + API key; tokens are valid for
 * ~15 days, cached in-memory and refreshed on demand.
 * Private label: CJ supports custom packaging/logo per-product; once the
 * account is upgraded, pass `podProperties` in createOrder — the adapter
 * surface already isolates that change to this file.
 */
const BASE = "https://developers.cjdropshipping.com/api2.0/v1";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const email = process.env.CJ_EMAIL;
  const apiKey = process.env.CJ_API_KEY;
  if (!email || !apiKey) throw new Error("CJ_EMAIL / CJ_API_KEY not configured");
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.token;

  const res = await fetch(`${BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: apiKey }),
  });
  const data = (await res.json()) as { result: boolean; data?: { accessToken: string }; message?: string };
  if (!data.result || !data.data?.accessToken) {
    await log("cj", "error", "CJ authentication failed", { message: data.message });
    throw new Error("CJ authentication failed");
  }
  cachedToken = { token: data.data.accessToken, expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 10 };
  return cachedToken.token;
}

async function cjFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "CJ-Access-Token": token, "Content-Type": "application/json", ...init?.headers },
  });
  const data = (await res.json()) as { result: boolean; data: T; message?: string };
  if (!data.result) {
    await log("cj", "error", `CJ ${init?.method ?? "GET"} ${path} failed`, { message: data.message });
    throw new Error(`CJ API error: ${data.message ?? "unknown"}`);
  }
  return data.data;
}

export const cjdropshipping: SupplierAdapter = {
  code: "CJDROPSHIPPING",

  isConfigured() {
    return Boolean(process.env.CJ_EMAIL && process.env.CJ_API_KEY);
  },

  // supplierProductId es el VID de variante CJ — el identificador que aceptan
  // createOrderV2, stock/queryByVid y variant/queryByVid (queryByPid no existe
  // en API 2.0; verificado empíricamente el 2026-07-11).
  async fetchProducts(supplierProductIds: string[]): Promise<SupplierProduct[]> {
    const out: SupplierProduct[] = [];
    for (const vid of supplierProductIds) {
      const v = await cjFetch<{
        vid: string;
        variantNameEn?: string;
        variantSellPrice?: string | number;
        variantImage?: string;
      }>(`/product/variant/queryByVid?vid=${encodeURIComponent(vid)}`);
      const stocks = await cjFetch<
        { totalInventoryNum?: number; storageNum?: number; countryCode?: string }[]
      >(`/product/stock/queryByVid?vid=${encodeURIComponent(vid)}`);
      out.push({
        supplierProductId: vid,
        name: v.variantNameEn ?? "",
        costCents: Math.round(Number(v.variantSellPrice ?? 0) * 100),
        stock: Array.isArray(stocks)
          ? stocks.reduce((s, x) => s + Number(x.totalInventoryNum ?? x.storageNum ?? 0), 0)
          : 0,
        images: v.variantImage ? [v.variantImage] : [],
      });
    }
    return out;
  },

  async placeOrder(
    reference: string,
    address: ShippingAddress,
    lines: SupplierOrderLine[],
  ): Promise<PlacedSupplierOrder> {
    const created = await cjFetch<{ orderId: string }>(`/shopping/order/createOrderV2`, {
      method: "POST",
      body: JSON.stringify({
        orderNumber: reference,
        shippingCountryCode: address.countryCode,
        shippingProvince: "",
        shippingCity: address.city,
        shippingAddress: [address.line1, address.line2].filter(Boolean).join(", "),
        shippingCustomerName: address.name,
        shippingZip: address.postalCode,
        shippingPhone: address.phone ?? "",
        email: address.email,
        logisticName: "CJPacket Ordinary", // EU-wide default; per-country logistics can be mapped later
        fromCountryCode: "CN",
        products: lines.map((l) => ({ vid: l.supplierProductId, quantity: l.quantity })),
      }),
    });
    await log("cj", "info", `Order placed at CJ: ${created.orderId} (ref ${reference})`);
    return { externalOrderId: created.orderId, raw: created };
  },

  async getTracking(externalOrderId: string): Promise<TrackingInfo | null> {
    const detail = await cjFetch<{ trackNumber?: string; orderStatus?: string }>(
      `/shopping/order/getOrderDetail?orderId=${encodeURIComponent(externalOrderId)}`,
    );
    if (!detail.trackNumber) return null;
    return {
      trackingNumber: detail.trackNumber,
      trackingUrl: `https://www.cjpacket.com/?trackNumber=${detail.trackNumber}`,
      status: detail.orderStatus ?? "in_transit",
    };
  },
};
