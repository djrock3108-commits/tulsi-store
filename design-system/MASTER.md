# Tulsi — Design System

> **Profile:** `Tulsi` · **Brief:** premium minimalist e-commerce, luxury lifestyle brand
> Persisted design system. Single source of truth for the visual layer of tulsi.store.
> Scope: visual only — never encodes cart logic, Stripe, Prisma, routing or i18n behavior.

---

## 1. Brand direction

Quiet luxury. The page should feel like a printed lookbook: warm paper, ink-dark
text, one deep botanical green that owns every call to action, and gold used the
way a bookbinder uses foil — small, rare, deliberate. Whitespace is the main
layout material; typography does the talking.

**Keywords:** editorial · warm · unhurried · botanical · precise

---

## 2. Color

All colors live as CSS custom properties in `src/app/globals.css` and are exposed
to Tailwind 4 via `@theme inline`. Components must use token utilities
(`bg-background`, `text-muted`, `bg-accent`, …) — never raw hex in JSX.

| Token | Hex | Role |
|---|---|---|
| `--background` | `#FAF6EE` | Warm cream page background |
| `--foreground` | `#1B1A16` | Near-black warm ink — body & headlines |
| `--muted` | `#6E6857` | Secondary text, warm gray-olive |
| `--line` | `#E7DFCE` | Hairlines, borders, dividers |
| `--surface` | `#FFFBF2` | Cards, elevated panels (warm white) |
| `--surface-2` | `#F1EADB` | Image wells, placeholders |
| `--accent` | `#2E5339` | Deep tulsi green — primary CTAs, active states |
| `--accent-hover` | `#24422D` | Green hover/pressed |
| `--accent-foreground` | `#FAF6EE` | Text on green |
| `--gold` | `#8F7434` | Gold accents: kickers, numerals, small flourishes |
| `--gold-light` | `#CFA85E` | Gold on dark/green surfaces (numerals in the "why" block) |
| `--error` | `#9C3B2E` | Form/checkout error text — muted terracotta, never bright red |

Rules:
- Green is the **only** CTA color. One primary green button per view section.
- Gold is decorative seasoning: eyebrows/kickers, index numerals, never large
  fills, never body text below `text-xs`.
- **No bright red anywhere** — discounts show the old price small, gray, struck
  through; error states use `--error` (muted terracotta).
- Dark hero-block sections use `--accent` (deep green), not near-black.

## 3. Typography

| Role | Font | Usage |
|---|---|---|
| Display / headlines | **Fraunces** (`--font-serif`, next/font, variable) | h1–h3, section titles, logotype, prices on PDP |
| Body / UI | **Geist** (`--font-sans`) | body copy, buttons, nav, forms, captions |

Scale (generous, editorial):

| Step | Classes | Use |
|---|---|---|
| Display | `font-serif text-5xl md:text-7xl` | Hero headline |
| H1 | `font-serif text-4xl md:text-5xl` | Page titles, PDP name |
| H2 | `font-serif text-3xl md:text-4xl` | Section titles, editorial blocks |
| H3 | `font-serif text-2xl` | Sub-blocks, newsletter |
| Kicker | `text-xs uppercase tracking-[0.3em] text-gold` | Eyebrows above headings |
| Body | `text-sm/base leading-relaxed` | Paragraphs (muted) |
| Caption | `text-xs text-muted` | Meta, legal, helper text |

Rules:
- Headlines: Fraunces, `font-medium` (500) or `font-semibold`, `tracking-tight`,
  `leading-[1.05]` on display sizes. Serif never used for buttons or nav.
- Kickers are sans, letterspaced, gold (or muted inside dark sections).

## 4. Spacing & layout

- Container: `max-w-6xl px-6` (unchanged). Reading column: `max-w-2xl`.
- Section rhythm: `pt-28 md:pt-36` between home sections; page shells `py-16 md:py-24`.
- Hero: dramatic — `pt-20 pb-24 md:pt-36 md:pb-40`, headline dominates the fold.
- Cards: `rounded-2xl`; feature imagery & panels: `rounded-3xl`.
- Whitespace beats dividers: prefer space over extra hairlines.

## 5. Motion

- Hover micro-interactions: **200–300 ms**, `ease-out`/default easing.
  Buttons `duration-200`, cards `duration-300`.
- Card hover: `-translate-y-1` + soft shadow, image `scale-[1.03]` (500–700 ms is
  acceptable for image zoom only).
- Scroll entrance: `Reveal` component (IntersectionObserver) → `.reveal` fade-up,
  0.8 s cubic-bezier(0.22, 1, 0.36, 1).
- Everything respects `prefers-reduced-motion`.

## 6. Components

**Primary button** — pill, deep green:
`rounded-full bg-accent px-9 py-4 text-sm font-medium text-accent-foreground transition-colors duration-200 hover:bg-accent-hover active:scale-[0.98]`

**Secondary button** — pill, hairline:
`rounded-full border border-line px-9 py-4 text-sm transition-colors duration-200 hover:border-accent hover:text-accent`

**Product card** — `bg-surface`, hairline border, hover lift 300 ms, second image
cross-fades in. Price sans-semibold; compare-at price `text-xs text-muted line-through` (never red).

**FAQ item** — `<details>` with chevron SVG (stroke `currentColor`, 1.5), rotates
180° in 300 ms on open. Never a "+" glyph.

**Inputs** — pill, `bg-surface border-line`, focus ring: `focus:border-accent`.

**Badge (cart count)** — tiny green pill `bg-accent text-accent-foreground`.

## 7. Don'ts

- No red, no urgency banners, no countdown timers.
- No serif in UI chrome (buttons, nav, forms).
- No pure white `#FFFFFF` or pure black `#000000` surfaces.
- No new hex values in components — extend the tokens instead.
- Never touch: cart logic, Stripe, Prisma, routes, translations (EN/ES/NL/DE/FR/IT).
