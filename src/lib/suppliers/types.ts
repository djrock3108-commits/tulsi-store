/**
 * Supplier abstraction. Every dropshipping provider is integrated behind
 * this interface so the order pipeline, stock sync and admin panel are
 * provider-agnostic. Adding a supplier = one new adapter file.
 */

export interface SupplierProduct {
  supplierProductId: string;
  name: string;
  costCents: number;
  stock: number;
  images: string[];
  ean?: string;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  countryCode: string; // ISO 3166-1 alpha-2
  email: string;
  phone?: string;
}

export interface SupplierOrderLine {
  supplierProductId: string;
  quantity: number;
}

export interface PlacedSupplierOrder {
  externalOrderId: string;
  raw: unknown;
}

export interface TrackingInfo {
  trackingNumber: string;
  trackingUrl: string;
  status: string;
}

export interface SupplierAdapter {
  readonly code: "BIGBUY" | "CJDROPSHIPPING";
  /** True when API credentials are configured. */
  isConfigured(): boolean;
  /** Fetch current stock + cost for the given supplier product IDs. */
  fetchProducts(supplierProductIds: string[]): Promise<SupplierProduct[]>;
  /** Place a fulfilment order at the supplier. */
  placeOrder(reference: string, address: ShippingAddress, lines: SupplierOrderLine[]): Promise<PlacedSupplierOrder>;
  /** Poll tracking for a previously placed order. */
  getTracking(externalOrderId: string): Promise<TrackingInfo | null>;
}
