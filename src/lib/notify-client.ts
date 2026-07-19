"use client";

/**
 * Aviso al administrador desde el NAVEGADOR del visitante vía Web3Forms
 * (su plan gratuito solo admite envíos client-side; los servidores requieren
 * plan de pago — verificado 2026-07-19). La clave es pública por diseño y NO
 * revela la dirección de destino. Es un aviso best-effort: la fuente de
 * verdad es siempre la base de datos (/admin/requests).
 */
const WEB3FORMS_KEY = "53761186-d9df-4912-bdd8-52da408777ff";

export function notifyAdminFromBrowser(subject: string, fields: Record<string, string>): void {
  try {
    void fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, ...fields }),
      keepalive: true, // sobrevive a la navegación posterior
    });
  } catch {
    // el registro en la base de datos ya está hecho; el email es opcional
  }
}
