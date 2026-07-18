"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AstroContent } from "@/lib/astro-content";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent";

export default function HoroscopeForm({ t }: { t: AstroContent["form"] }) {
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [consent, setConsent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setState("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/horoscope-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fd.get("fullName"),
          email: fd.get("email"),
          birthDate: fd.get("birthDate"),
          birthTime: timeUnknown ? null : fd.get("birthTime") || null,
          timeUnknown,
          city: fd.get("city"),
          country: fd.get("country"),
          comments: fd.get("comments") || "",
          locale,
          consent: true,
        }),
      });
      setState(res.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  }

  if (state === "ok") {
    return (
      <div className="animate-fade-up rounded-3xl border border-line bg-surface p-10 text-center md:p-14">
        <p className="text-3xl">🕉</p>
        <h2 className="mt-5 font-serif text-3xl font-medium tracking-tight">{t.thanksTitle}</h2>
        <p className="mx-auto mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted">{t.thanksBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-surface p-6 md:p-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-muted">{t.name}</span>
          <input name="fullName" required minLength={2} maxLength={120} className={inputCls} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-muted">{t.email}</span>
          <input name="email" type="email" required maxLength={200} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{t.birthDate}</span>
          <input name="birthDate" type="date" required className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{t.birthTime}</span>
          <input name="birthTime" type="time" required={!timeUnknown} disabled={timeUnknown} className={`${inputCls} disabled:opacity-40`} />
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted md:col-span-2">
          <input type="checkbox" checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)} className="accent-current" />
          {t.timeUnknown}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{t.city}</span>
          <input name="city" required maxLength={120} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{t.country}</span>
          <input name="country" required maxLength={90} className={inputCls} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-muted">{t.comments}</span>
          <textarea name="comments" rows={3} maxLength={2000} placeholder={t.commentsHint} className={inputCls} />
        </label>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-2 text-xs text-muted">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-current" required />
        <span>
          {t.consent.split(".")[0]}.{" "}
          <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-foreground">
            Privacy
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={state === "sending" || !consent}
        className="mt-8 w-full rounded-full bg-accent py-4 text-sm font-medium text-accent-foreground transition-colors duration-200 hover:bg-accent-hover disabled:opacity-40"
      >
        {state === "sending" ? t.sending : t.submit}
      </button>
      {state === "err" && <p className="mt-3 text-center text-xs text-error">{t.error}</p>}
    </form>
  );
}
