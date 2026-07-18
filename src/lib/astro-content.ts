import type { Locale } from "@/i18n/routing";
import { ASTRO_EXTRA } from "./astro-content-locales";

/**
 * Contenido de la plataforma de Astrología Védica (pivote 2026-07).
 * Fundamento erudito: docs/JYOTISH_KNOWLEDGE.md (informes reales del Bhrigu
 * Project). Regla de la casa: nada inventado, nada fatalista, tono digno.
 * EN y ES aquí; NL/DE/FR/IT en astro-content-locales.ts.
 */

export interface AstroContent {
  hero: { eyebrow: string; title: string; subtitle: string; cta: string; secondary: string };
  heroTrust: string[];
  intro: { kicker: string; title: string; body: string[]; diffTitle: string; diffs: string[] };
  discover: { title: string; items: string[] };
  why: { title: string; items: { title: string; body: string }[] };
  how: { title: string; steps: { title: string; body: string }[] };
  receive: { title: string; note: string; items: string[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; body: string; button: string };
  form: {
    title: string; subtitle: string;
    name: string; email: string; birthDate: string; birthTime: string;
    timeUnknown: string; city: string; country: string; comments: string; commentsHint: string;
    consent: string; submit: string; sending: string; error: string;
    thanksTitle: string; thanksBody: string;
  };
}

type Entry = Partial<Record<Locale, AstroContent>> & { en: AstroContent };

const BASE: Entry = {
  en: {
    hero: {
      eyebrow: "Authentic Jyotish · Since time immemorial",
      title: "The Sky Remembered the Moment You Were Born",
      subtitle: "A personalized birth chart analysis in the authentic Jyotish tradition — delivered within 24 hours of payment.",
      cta: "Order My Horoscope",
      secondary: "How it works",
    },
    heroTrust: ["Authentic Vedic tradition", "Each reading individually prepared", "Private & confidential", "Delivered within 24 hours"],
    intro: {
      kicker: "What is Vedic Astrology?",
      title: "The science of light, older than history.",
      body: [
        "Jyotish — \"the science of light\" — is the astrology of ancient India, one of the six limbs of the Vedas. For thousands of years it has read the karma of the soul in the map of the sky at the exact moment of birth.",
        "Your birth chart is not entertainment. It is a precise mirror of your tendencies, talents, challenges and timing — a tool that sages have used for millennia to guide life's most important decisions.",
      ],
      diffTitle: "How is it different from Western astrology?",
      diffs: [
        "It uses the sidereal zodiac — the real position of the constellations. Most people discover their true Vedic sign differs from their Western one.",
        "It reads three pillars, not one: your ascendant (lagna), your Moon sign and your birth star (nakshatra) — 27 lunar mansions unknown to Western astrology.",
        "It predicts through planetary periods (dashas): a precise timing system that tells you not only what, but when.",
        "It offers traditional remedies — gemstones, mantras and observances — to work consciously with your chart.",
      ],
    },
    discover: {
      title: "What your chart can reveal",
      items: ["Personality & inner nature", "Life purpose", "Talents & strengths", "Challenges & how to meet them", "Relationships", "Marriage", "Career & vocation", "Wealth & prosperity", "Health tendencies", "Planetary periods — your timing in life", "Traditional recommendations"],
    },
    why: {
      title: "Why choose Tulsi",
      items: [
        { title: "Authentic tradition", body: "Analysis rooted in the classical texts — Brihat Parashara Hora Shastra, Phala Dipika, Brihat Jataka — cited in your report." },
        { title: "Every chart is unique", body: "Your reading is prepared specifically from your exact birth data — never from a template." },
        { title: "A living tradition", body: "Jyotish has guided seekers for thousands of years; every Tulsi reading works within that unbroken tradition." },
        { title: "Truly personal", body: "No templates. Your report is written for you, about you — down to its personal closing letter." },
        { title: "Delivered in 24 hours", body: "Your complete report arrives as a PDF by email within 24 hours of payment confirmation." },
        { title: "Completely confidential", body: "Your birth data and your reading remain strictly private, always." },
      ],
    },
    how: {
      title: "How it works",
      steps: [
        { title: "Share your birth details", body: "Complete the form with your date, exact time and place of birth. Two minutes." },
        { title: "Receive your payment link", body: "Within a few hours we send you a secure PayPal payment link by email." },
        { title: "Your reading is prepared", body: "Once payment is confirmed, your complete reading is prepared from your exact birth details." },
        { title: "Receive your report", body: "Within 24 hours, your personalized horoscope arrives as a PDF in your inbox." },
      ],
    },
    receive: {
      title: "What you'll receive",
      note: "A complete Life Management Reading — typically 15–25 pages, prepared in the classical style.",
      items: [
        "Your Ascendant (Lagna) — with classical citations",
        "Your Moon sign & its dignities",
        "Your Nakshatra (birth star), deity & symbol",
        "All nine planets, house by house",
        "Your planetary combinations (Yogas)",
        "Sade Sati — Saturn's great cycles, dated",
        "Vimshottari Dasha — your life's major periods",
        "The next ten years, period by period",
        "Career, relationships & marriage",
        "Strengths, challenges & life purpose",
        "Traditional remedies chosen for you",
        "A personal closing letter",
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "How is my horoscope prepared?", a: "Individually, from your exact birth data, following the classical texts of the Jyotish tradition. No two readings are alike." },
        { q: "How long does it take?", a: "Your report is delivered within 24 hours after payment confirmation." },
        { q: "What if I don't know my exact birth time?", a: "Mention it in the form — we evaluate your case individually. The ascendant changes every two hours, so we may work from your Moon chart or discuss rectification." },
        { q: "How do I pay?", a: "After you submit the form, we email you a secure PayPal payment link. Nothing is charged on this website." },
        { q: "Is my information private?", a: "Yes. Your birth data and reading remain completely confidential and are never shared." },
        { q: "What tradition do you follow?", a: "Classical Parashari Jyotish with the Lahiri ayanamsha, in the devotional lineage of the Vedic tradition." },
      ],
    },
    cta: {
      title: "Your chart has been waiting since the moment you were born.",
      body: "A deep, personal reading in the authentic Vedic tradition.",
      button: "Order My Vedic Horoscope",
    },
    form: {
      title: "Order your Personal Vedic Horoscope",
      subtitle: "Complete your birth details below. We'll email you a secure PayPal payment link within a few hours — your reading begins after payment is confirmed.",
      name: "Full name",
      email: "Email address",
      birthDate: "Date of birth",
      birthTime: "Exact time of birth",
      timeUnknown: "I don't know my exact birth time",
      city: "City of birth",
      country: "Country of birth",
      comments: "Comments (optional)",
      commentsHint: "Anything you'd like your astrologer to know — specific questions, areas of focus…",
      consent: "I agree to the processing of my data to prepare my horoscope. See the privacy policy.",
      submit: "Request My Horoscope",
      sending: "Sending…",
      error: "Something went wrong — please try again.",
      thanksTitle: "Thank you.",
      thanksBody: "Your information has been received. Within a few hours you will receive a secure PayPal payment link by email. Once payment is confirmed, the preparation of your personalized horoscope will begin. Delivery: within 24 hours after payment.",
    },
  },
  es: {
    hero: {
      eyebrow: "Jyotish auténtico · Desde tiempo inmemorial",
      title: "El cielo recordó el momento en que naciste",
      subtitle: "Un análisis personalizado de tu carta natal en la auténtica tradición del Jyotish — entregado en menos de 24 horas tras el pago.",
      cta: "Pedir mi horóscopo",
      secondary: "Cómo funciona",
    },
    heroTrust: ["Tradición védica auténtica", "Cada lectura se prepara individualmente", "Privado y confidencial", "Entrega en 24 horas"],
    intro: {
      kicker: "¿Qué es la Astrología Védica?",
      title: "La ciencia de la luz, más antigua que la historia.",
      body: [
        "El Jyotish — \"la ciencia de la luz\" — es la astrología de la India antigua, uno de los seis miembros de los Vedas. Durante miles de años ha leído el karma del alma en el mapa del cielo del instante exacto del nacimiento.",
        "Tu carta natal no es entretenimiento. Es un espejo preciso de tus tendencias, talentos, desafíos y tiempos — la herramienta que los sabios han usado durante milenios para guiar las decisiones más importantes de la vida.",
      ],
      diffTitle: "¿En qué se diferencia de la astrología occidental?",
      diffs: [
        "Usa el zodiaco sideral — la posición real de las constelaciones. La mayoría descubre que su verdadero signo védico no coincide con el occidental.",
        "Lee tres pilares, no uno: tu ascendente (lagna), tu signo lunar y tu estrella natal (nakshatra) — 27 mansiones lunares que la astrología occidental desconoce.",
        "Predice mediante periodos planetarios (dashas): un sistema de tiempos preciso que dice no solo qué, sino cuándo.",
        "Ofrece remedios tradicionales — gemas, mantras y observancias — para trabajar conscientemente con tu carta.",
      ],
    },
    discover: {
      title: "Lo que tu carta puede revelar",
      items: ["Personalidad y naturaleza interior", "Propósito de vida", "Talentos y fortalezas", "Desafíos y cómo afrontarlos", "Relaciones", "Matrimonio", "Carrera y vocación", "Riqueza y prosperidad", "Tendencias de salud", "Periodos planetarios — tus tiempos en la vida", "Recomendaciones tradicionales"],
    },
    why: {
      title: "Por qué elegir Tulsi",
      items: [
        { title: "Tradición auténtica", body: "Análisis enraizado en los textos clásicos — Brihat Parashara Hora Shastra, Phala Dipika, Brihat Jataka — citados en tu informe." },
        { title: "Cada carta es única", body: "Tu lectura se prepara específicamente a partir de tus datos exactos de nacimiento — nunca desde una plantilla." },
        { title: "Una tradición viva", body: "El Jyotish guía a los buscadores desde hace miles de años; cada lectura de Tulsi trabaja dentro de esa tradición ininterrumpida." },
        { title: "Verdaderamente personal", body: "Sin plantillas. Tu informe se escribe para ti y sobre ti — hasta su carta personal de cierre." },
        { title: "Entrega en 24 horas", body: "Tu informe completo llega en PDF por email en menos de 24 horas tras confirmarse el pago." },
        { title: "Confidencialidad total", body: "Tus datos de nacimiento y tu lectura permanecen estrictamente privados, siempre." },
      ],
    },
    how: {
      title: "Cómo funciona",
      steps: [
        { title: "Comparte tus datos de nacimiento", body: "Completa el formulario con tu fecha, hora exacta y lugar de nacimiento. Dos minutos." },
        { title: "Recibe tu enlace de pago", body: "En pocas horas te enviamos por email un enlace seguro de pago de PayPal." },
        { title: "Tu lectura se prepara", body: "Confirmado el pago, tu lectura completa se prepara a partir de tus datos exactos de nacimiento." },
        { title: "Recibe tu informe", body: "En menos de 24 horas, tu horóscopo personalizado llega en PDF a tu correo." },
      ],
    },
    receive: {
      title: "Lo que recibirás",
      note: "Una Lectura de Gestión de Vida completa — normalmente 15–25 páginas, preparada al estilo clásico.",
      items: [
        "Tu Ascendente (Lagna) — con citas clásicas",
        "Tu signo lunar y sus dignidades",
        "Tu Nakshatra (estrella natal), deidad y símbolo",
        "Los nueve planetas, casa por casa",
        "Tus combinaciones planetarias (Yogas)",
        "Sade Sati — los grandes ciclos de Saturno, con fechas",
        "Vimshottari Dasha — los grandes periodos de tu vida",
        "Los próximos diez años, periodo a periodo",
        "Carrera, relaciones y matrimonio",
        "Fortalezas, desafíos y propósito de vida",
        "Remedios tradicionales elegidos para ti",
        "Una carta personal de cierre",
      ],
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Cómo se prepara mi horóscopo?", a: "De forma individual, a partir de tus datos exactos de nacimiento y siguiendo los textos clásicos de la tradición Jyotish. No hay dos lecturas iguales." },
        { q: "¿Cuánto tarda?", a: "Tu informe se entrega en menos de 24 horas tras la confirmación del pago." },
        { q: "¿Y si no sé mi hora exacta de nacimiento?", a: "Indícalo en el formulario — evaluamos tu caso individualmente. El ascendente cambia cada dos horas, así que podemos trabajar desde tu carta lunar o valorar una rectificación." },
        { q: "¿Cómo pago?", a: "Tras enviar el formulario, te mandamos por email un enlace seguro de pago de PayPal. En esta web no se cobra nada." },
        { q: "¿Mis datos son privados?", a: "Sí. Tus datos de nacimiento y tu lectura son completamente confidenciales y nunca se comparten." },
        { q: "¿Qué tradición seguís?", a: "Jyotish clásico Parashari con ayanamsha Lahiri, en el linaje devocional de la tradición védica." },
      ],
    },
    cta: {
      title: "Tu carta espera desde el momento en que naciste.",
      body: "Una lectura profunda y personal en la auténtica tradición védica.",
      button: "Pedir mi Horóscopo Védico",
    },
    form: {
      title: "Pide tu Horóscopo Védico Personalizado",
      subtitle: "Completa tus datos de nacimiento. Te enviaremos por email un enlace seguro de pago de PayPal en pocas horas — tu lectura comienza al confirmarse el pago.",
      name: "Nombre completo",
      email: "Correo electrónico",
      birthDate: "Fecha de nacimiento",
      birthTime: "Hora exacta de nacimiento",
      timeUnknown: "No conozco mi hora exacta de nacimiento",
      city: "Ciudad de nacimiento",
      country: "País de nacimiento",
      comments: "Comentarios (opcional)",
      commentsHint: "Lo que quieras que sepa tu astrólogo — preguntas concretas, áreas de interés…",
      consent: "Acepto el tratamiento de mis datos para elaborar mi horóscopo. Ver la política de privacidad.",
      submit: "Solicitar mi horóscopo",
      sending: "Enviando…",
      error: "Algo falló — inténtalo de nuevo.",
      thanksTitle: "Gracias.",
      thanksBody: "Hemos recibido tu información. En pocas horas recibirás por email un enlace seguro de pago de PayPal. Una vez confirmado el pago, comenzará la preparación de tu horóscopo personalizado. Entrega: en menos de 24 horas tras el pago.",
    },
  },
};

export function getAstroContent(locale: Locale): AstroContent {
  return BASE[locale] ?? ASTRO_EXTRA[locale] ?? BASE.en;
}
