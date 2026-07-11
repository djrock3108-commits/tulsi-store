import { log } from "./log";

/**
 * Transactional email via the Resend HTTP API (no SDK dependency).
 * No-ops with a warning when RESEND_API_KEY is missing so the order
 * pipeline never fails because of email.
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Tulsi <orders@tulsi.store>";
  if (!key) {
    await log("system", "warn", `Email skipped (RESEND_API_KEY not set): "${subject}" → ${to}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    await log("system", "error", `Email failed (${res.status}): "${subject}" → ${to}`, {
      body: await res.text(),
    });
  }
}

export function orderConfirmationHtml(orderNumber: string, totalFormatted: string): string {
  return `
  <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111">
    <h1 style="font-size:20px;letter-spacing:-0.02em">TULSI</h1>
    <p style="font-size:16px">Thank you — your order <strong>${orderNumber}</strong> is confirmed.</p>
    <p style="font-size:14px;color:#555">Total: <strong>${totalFormatted}</strong></p>
    <p style="font-size:14px;color:#555">We'll email you tracking details as soon as your order ships.</p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
    <p style="font-size:12px;color:#999">Tulsi.store — premium everyday technology.</p>
  </div>`;
}

export function shippingUpdateHtml(orderNumber: string, trackingNumber: string, trackingUrl: string): string {
  return `
  <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111">
    <h1 style="font-size:20px;letter-spacing:-0.02em">TULSI</h1>
    <p style="font-size:16px">Your order <strong>${orderNumber}</strong> is on its way.</p>
    <p style="font-size:14px;color:#555">Tracking: <a href="${trackingUrl}" style="color:#111">${trackingNumber}</a></p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
    <p style="font-size:12px;color:#999">Tulsi.store — premium everyday technology.</p>
  </div>`;
}
