"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { notifyAdminFromBrowser } from "@/lib/notify-client";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent";

export default function ContactForm({ nameLabel, emailLabel }: { nameLabel: string; emailLabel: string }) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          locale,
        }),
      });
      if (res.ok) {
        notifyAdminFromBrowser(`✉️ Mensaje de contacto — ${fd.get("name")}`, {
          Nombre: String(fd.get("name") ?? ""),
          Email: String(fd.get("email") ?? ""),
          Idioma: locale,
          Mensaje: String(fd.get("message") ?? ""),
        });
      }
      setState(res.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  }

  if (state === "ok") {
    return (
      <div className="animate-fade-up rounded-3xl border border-line bg-surface p-10 text-center">
        <p className="text-2xl text-gold">✦</p>
        <p className="mx-auto mt-4 max-w-sm text-pretty text-sm leading-relaxed">{t("ok")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-surface p-6 md:p-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{nameLabel}</span>
          <input name="name" required minLength={2} maxLength={120} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{emailLabel}</span>
          <input name="email" type="email" required maxLength={200} className={inputCls} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-muted">{t("message")}</span>
          <textarea name="message" required minLength={5} maxLength={3000} rows={6} className={inputCls} />
        </label>
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="premium-button mt-8 w-full rounded-full bg-accent py-4 text-sm font-medium text-accent-foreground hover:bg-accent-hover disabled:opacity-40"
      >
        {state === "sending" ? t("sending") : t("submit")}
      </button>
      {state === "err" && <p className="mt-3 text-center text-xs text-error">{t("err")}</p>}
    </form>
  );
}
