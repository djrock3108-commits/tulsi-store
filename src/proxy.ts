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

/**
 * Maintenance mode: the storefront is closed until the business registration
 * (KvK) is complete. Flip MAINTENANCE_MODE to false and redeploy to reopen.
 * (A build-time constant, not an env var: Vercel sensitive env vars are not
 * readable from Edge Middleware.) Serves a branded "opening soon" page with
 * HTTP 503 + Retry-After so search engines treat it as temporary. /admin
 * stays reachable (behind its gate) and Stripe webhooks / cron keep running
 * for orders that already exist; only checkout is refused.
 */
// 2026-07-12: plataforma de Astrología Védica en vivo — el flujo no cobra en
// la web (enlace PayPal manual), así que no depende del KvK para publicarse.
const MAINTENANCE_MODE = false;
const MAINTENANCE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Tulsi — Opening soon</title>
<style>
  body{margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;
    background:#faf6ee;color:#1b1a16;font-family:Georgia,'Times New Roman',serif;
    -webkit-font-smoothing:antialiased;text-align:center}
  main{padding:3rem 1.5rem;max-width:34rem}
  .logo{font-size:1.1rem;font-weight:600;letter-spacing:.35em;margin:0}
  .kicker{margin:2.5rem 0 0;font-family:system-ui,sans-serif;font-size:.7rem;
    letter-spacing:.3em;text-transform:uppercase;color:#8f7434}
  h1{margin:1.25rem 0 0;font-size:2.4rem;font-weight:500;letter-spacing:-.01em;line-height:1.1}
  p.body{margin:1.5rem auto 0;max-width:26rem;font-family:system-ui,sans-serif;
    font-size:.9rem;line-height:1.6;color:#6e6857}
  .rule{margin:2.5rem auto 0;width:3rem;height:1px;background:#2e5339}
</style>
</head>
<body>
<main>
  <p class="logo">TULSI</p>
  <p class="kicker">Opening soon</p>
  <h1>We are preparing the store.</h1>
  <p class="body">Tulsi is putting the final pieces in place and will open its doors very soon. Thank you for your patience.</p>
  <div class="rule"></div>
</main>
</body>
</html>`;

function maintenanceResponse(): NextResponse {
  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "86400",
      "Cache-Control": "no-store",
    },
  });
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const maintenance = MAINTENANCE_MODE;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const denied = adminGate(req);
    if (denied) return securityHeaders(denied);
    return securityHeaders(NextResponse.next());
  }

  if (pathname.startsWith("/api")) {
    return securityHeaders(NextResponse.next());
  }

  if (maintenance) {
    return securityHeaders(maintenanceResponse());
  }

  return securityHeaders(intlMiddleware(req));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|products/|robots.txt|sitemap.xml|.*\\..*).*)", "/api/:path*"],
};
