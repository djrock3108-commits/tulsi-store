import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tulsi.store";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/*/cart", "/*/order"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
