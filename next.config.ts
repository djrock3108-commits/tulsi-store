import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Supplier CDNs — product images are served from BigBuy / CJdropshipping.
      { protocol: "https", hostname: "*.bigbuy.eu" },
      { protocol: "https", hostname: "*.cjdropshipping.com" },
      { protocol: "https", hostname: "cbu01.alicdn.com" },
      { protocol: "https", hostname: "oss-cf.cjdropshipping.com" },
    ],
  },
  poweredByHeader: false,
  compress: true,
};

export default withNextIntl(nextConfig);
