"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HomeContent } from "@/lib/home-content";

export default function NewsletterForm({ t }: { t: HomeContent["newsletter"] }) {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || !email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, consent: true }),
      });
      setState(res.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  }

  if (state === "ok") {
    return <p className="text-sm font-medium">{t.ok}</p>;
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          className="min-w-0 flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm outline-none transition-colors focus:border-foreground"
        />
        <button
          type="submit"
          disabled={state === "loading" || !consent}
          className="shrink-0 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-40"
        >
          {t.button}
        </button>
      </div>
      <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-current"
        />
        <span>
          {t.consent.split(".")[0]}.{" "}
          <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-foreground">
            {t.consent.split(". ")[1] ?? "Privacy"}
          </Link>
        </span>
      </label>
      {state === "err" && <p className="mt-2 text-xs text-red-600">{t.err}</p>}
    </form>
  );
}
