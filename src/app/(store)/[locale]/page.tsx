import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAstroContent } from "@/lib/astro-content";
import Reveal from "@/components/Reveal";
import KundaliArt from "@/components/KundaliArt";
import type { Locale } from "@/i18n/routing";

/** Línea ornamental tradicional entre secciones — página de un libro antiguo. */
function Ornament() {
  return (
    <div aria-hidden className="mx-auto mt-24 flex max-w-xs items-center gap-4 px-6 md:mt-32">
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs text-gold">✦</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getAstroContent(locale as Locale);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Carta védica gigante al 4% — se siente antes de verse */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center text-foreground">
          <KundaliArt className="manuscript-wheel h-[880px] w-[880px] shrink-0 opacity-[0.05]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 text-gold-light/40">
          <span className="star-whisper absolute left-[12%] top-[18%] text-xs">✦</span>
          <span className="star-whisper delay-star-1 absolute right-[18%] top-[26%] text-[10px]">✦</span>
          <span className="star-whisper delay-star-2 absolute left-[24%] top-[64%] text-[9px]">✦</span>
          <span className="star-whisper delay-star-3 absolute right-[10%] top-[58%] text-sm">✦</span>
          <span className="star-whisper delay-star-4 absolute left-[46%] top-[12%] text-[8px]">✦</span>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-24 text-center md:pb-28 md:pt-36">
          <p className="animate-fade-up text-xs uppercase tracking-[0.3em] text-gold">{c.hero.eyebrow}</p>
          <h1 className="animate-fade-up delay-100 mx-auto mt-7 max-w-3xl text-balance font-serif text-5xl font-medium leading-[1.06] tracking-tight md:text-7xl">
            {c.hero.title}
          </h1>
          <p className="animate-fade-up delay-200 mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted">
            {c.hero.subtitle}
          </p>
          <div className="animate-fade-up delay-300 mt-12 flex flex-wrap justify-center gap-3">
            <Link
              href="/order"
              className="premium-button rounded-full bg-accent px-10 py-4 text-sm font-medium text-accent-foreground"
            >
              {c.hero.cta}
            </Link>
            <Link
              href="/#how"
              className="premium-button rounded-full border border-line px-10 py-4 text-sm hover:border-accent hover:text-accent"
            >
              {c.hero.secondary}
            </Link>
          </div>
          {/* Indicadores de confianza junto al CTA */}
          <ul className="trust-ledger animate-fade-up delay-300 mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center border-y border-line/80 py-4">
            {c.heroTrust.map((item) => (
              <li key={item} className="flex items-center px-4 py-1 text-[11px] tracking-wide text-muted">
                <span aria-hidden className="mr-2 text-[7px] text-gold">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Qué es la Astrología Védica ───────────────────────────── */}
      <section id="what" className="manuscript-section border-y border-line bg-surface/70">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-24 md:grid-cols-[1.08fr_0.92fr] md:gap-20 md:py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{c.intro.kicker}</p>
            <h2 className="mt-5 text-balance font-serif text-3xl font-medium tracking-tight md:text-4xl">
              {c.intro.title}
            </h2>
            {c.intro.body.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120} className="md:border-l md:border-line md:pl-16">
            <p aria-hidden className="mb-7 font-serif text-4xl leading-none text-gold/45">01</p>
            <h3 className="font-serif text-2xl font-medium">{c.intro.diffTitle}</h3>
            <ul className="mt-6 space-y-4">
              {c.intro.diffs.map((d) => (
                <li key={d.slice(0, 24)} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1 shrink-0 text-gold">✦</span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Lo que puede revelar ──────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <Reveal>
          <h2 className="text-center font-serif text-3xl font-medium tracking-tight md:text-4xl">{c.discover.title}</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {c.discover.items.map((item) => (
              <span key={item} className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-muted">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <Ornament />

      {/* ── Why Choose Us ─────────────────────────────────────────── */}
      <section id="why" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:pt-32">
        <Reveal>
          <h2 className="text-xs uppercase tracking-[0.3em] text-gold">{c.why.title}</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.why.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="authority-card h-full border-t border-line bg-transparent pb-2 pt-7">
                <p aria-hidden className="mb-5 font-serif text-sm text-gold/70">0{i + 1}</p>
                <p className="font-serif text-lg font-medium">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── How It Works (bloque oscuro) ──────────────────────────── */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:pt-32">
        <Reveal>
          <div className="rounded-3xl bg-foreground px-8 py-16 text-background md:px-16 md:py-20">
            <h2 className="text-center font-serif text-3xl font-medium tracking-tight md:text-4xl">{c.how.title}</h2>
            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-4 md:divide-x md:divide-background/15">
              {c.how.steps.map((step, i) => (
                <div key={step.title} className="relative text-center md:px-6 md:text-left first:md:pl-0 last:md:pr-0">
                  <p className="font-serif text-4xl text-gold-light">{i + 1}</p>
                  <p className="mt-3 text-sm font-medium">{step.title}</p>
                  <p className="mt-2 text-xs leading-relaxed opacity-60">{step.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-14 text-center">
              <Link
                href="/order"
                className="premium-button inline-block rounded-full bg-background px-10 py-4 text-sm font-medium text-foreground hover:opacity-90"
              >
                {c.hero.cta}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── What You'll Receive ───────────────────────────────────── */}
      <section id="receive" className="mx-auto max-w-4xl scroll-mt-24 px-6 pt-24 md:pt-32">
        <Reveal>
          <h2 className="text-center font-serif text-3xl font-medium tracking-tight md:text-4xl">{c.receive.title}</h2>
          <p className="mt-4 text-center text-sm text-muted">{c.receive.note}</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 rounded-3xl border border-line bg-surface p-8 md:p-12">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
              {c.receive.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 shrink-0 text-gold">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <Ornament />

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-2xl scroll-mt-24 px-6 pt-24 md:pt-32">
        <Reveal>
          <h2 className="text-center font-serif text-3xl font-medium tracking-tight md:text-4xl">{c.faq.title}</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {c.faq.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="text-gold transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pt-24 md:pt-32">
        <Reveal>
          <div className="rounded-3xl border border-gold/30 bg-surface px-8 py-16 text-center md:py-20">
            <p className="text-gold">✦ ✦ ✦</p>
            <h2 className="mx-auto mt-6 max-w-xl text-balance font-serif text-3xl font-medium tracking-tight md:text-4xl">
              {c.cta.title}
            </h2>
            <p className="mt-4 text-sm text-muted">{c.cta.body}</p>
            <Link
              href="/order"
              className="premium-button mt-10 inline-block rounded-full bg-accent px-10 py-4 text-sm font-medium text-accent-foreground hover:bg-accent-hover"
            >
              {c.cta.button}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
