import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Security headers applied to every response.
 * CSP allows Stripe (checkout) and supplier CDNs (product images).
 * 'unsafe-inline' for scripts is required by Next.js unless a nonce-based
 * CSP is configured; 'unsafe-eval' is only enabled in development (HMR).
 */
function securityHeaders(res: NextResponse): NextResponse {
  const dev = process.env.NODE_ENV !== "production";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""} https://js.stripe.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' https: data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.stripe.com",
    "frame-src https://js.stripe.com https://hooks.stripe.com",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(self)");
  return res;
}

/** Constant-time string comparison (edge-safe, no node:crypto). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * HTTP Basic auth gate for /admin. This is a bootstrap gate — replace with a
 * full auth provider (Auth.js + role-based access) before opening the admin
 * to more than one operator. Credentials come from ADMIN_USER / ADMIN_PASSWORD.
 */
function adminGate(req: NextRequest): NextResponse | null {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) {
    return new NextResponse("Admin credentials not configured (set ADMIN_USER / ADMIN_PASSWORD).", { status: 503 });
  }
  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const [u, p] = atob(header.slice(6)).split(":");
      if (safeEqual(u ?? "", user) && safeEqual(p ?? "", pass)) return null;
    } catch {
      /* malformed header → fall through to 401 */
    }
  }
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Tulsi Admin", charset="UTF-8"' },
  });
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const denied = adminGate(req);
    if (denied) return securityHeaders(denied);
    return securityHeaders(NextResponse.next());
  }

  if (pathname.startsWith("/api")) {
    return securityHeaders(NextResponse.next());
  }

  return securityHeaders(intlMiddleware(req));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|products/|robots.txt|sitemap.xml|.*\\..*).*)", "/api/:path*"],
};
