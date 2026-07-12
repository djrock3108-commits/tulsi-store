import type { Locale } from "@/i18n/routing";

/**
 * Contenido editorial de la home (rediseño premium 2026-07-12).
 * Los bloques narrativos referencian productos reales por slug; las imágenes
 * salen del catálogo en tiempo de render. Nada inventado: beneficios tomados
 * de las fichas verificadas del proveedor (data/cj-verification.json).
 */

export interface HomeContent {
  trust: { title: string; body: string }[];
  editorial: { slug: string; kicker: string; title: string; body: string; benefits: string[] }[];
  why: { title: string; body: string; principles: { title: string; body: string }[] };
  faqTitle: string;
  faq: { q: string; a: string }[];
  newsletter: { title: string; note: string; placeholder: string; button: string; ok: string; err: string; consent: string };
}

type HomeEntry = Partial<Record<Locale, HomeContent>> & { en: HomeContent };

export const HOME: HomeEntry = {
  en: {
    trust: [
      { title: "Secure payment", body: "Card data handled by Stripe, never by us." },
      { title: "Tracked shipping", body: "A tracking link with every order." },
      { title: "30-day returns", body: "Changed your mind? Send it back." },
      { title: "2-year warranty", body: "EU consumer protection on everything." },
    ],
    editorial: [
      {
        slug: "car-handheld-vacuum",
        kicker: "Clean, anywhere",
        title: "Less mess in your day.",
        body: "16,000 Pa of brushless suction in a tool that lives in the glovebox — and ships from our EU warehouse in days, not weeks.",
        benefits: ["Vacuum, blower and air pump in one", "Seven precision nozzles included", "EU warehouse · 4–8 day delivery"],
      },
      {
        slug: "smart-pet-fountain",
        kicker: "For the quiet drinkers",
        title: "Fresh water, zero effort.",
        body: "Food-grade SUS 304 stainless steel and four-layer filtration keep the bowl clean so you don't have to think about it.",
        benefits: ["3.2L — about a week of water", "Two replacement filters in the box", "Whisper-quiet pump"],
      },
    ],
    why: {
      title: "We choose less, but better.",
      body: "Before a product enters Tulsi we review its usefulness, design, materials and availability — and we walk away from most of them.",
      principles: [
        { title: "Real usefulness", body: "It has to solve something you actually feel." },
        { title: "Honest specs", body: "We verify what the maker claims before we sell it." },
        { title: "Considered design", body: "Objects you don't need to hide in a drawer." },
        { title: "Simple buying", body: "Clear prices, tracked shipping, easy returns." },
      ],
    },
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Where do you ship?", a: "Across the European Union — free shipping on every order." },
      { q: "How long does delivery take?", a: "Products in our EU warehouses arrive in 4–8 working days; items from our international warehouse take 8–18 working days. Each product page shows its estimate." },
      { q: "How do I track my order?", a: "You'll receive a tracking link by email as soon as your order ships." },
      { q: "Which payment methods do you accept?", a: "Cards, Apple Pay, Google Pay, iDEAL, Bancontact and PayPal — all processed securely by Stripe." },
      { q: "How do returns work?", a: "You have 30 days from delivery. Write to hello@tulsi.store with your order number and we'll take care of it." },
      { q: "Do prices include tax?", a: "Yes — every price you see includes VAT." },
    ],
    newsletter: {
      title: "New products, useful ideas. No noise.",
      note: "Occasional emails about new arrivals and honest deals. Unsubscribe anytime.",
      placeholder: "Your email",
      button: "Subscribe",
      ok: "You're in. Thank you.",
      err: "That didn't work — try again.",
      consent: "I agree to receive emails from Tulsi. See our privacy policy.",
    },
  },
  es: {
    trust: [
      { title: "Pago seguro", body: "Los datos de tarjeta los gestiona Stripe, nunca nosotros." },
      { title: "Envío con seguimiento", body: "Un enlace de tracking con cada pedido." },
      { title: "30 días de devolución", body: "¿Cambias de idea? Devuélvelo." },
      { title: "2 años de garantía", body: "Protección europea del consumidor en todo." },
    ],
    editorial: [
      {
        slug: "car-handheld-vacuum",
        kicker: "Limpieza, en cualquier lugar",
        title: "Menos desorden en tu día.",
        body: "16.000 Pa de succión brushless en una herramienta que vive en la guantera — y sale de nuestro almacén europeo en días, no semanas.",
        benefits: ["Aspirador, soplador e inflador en uno", "Siete boquillas de precisión incluidas", "Almacén UE · entrega en 4–8 días"],
      },
      {
        slug: "smart-pet-fountain",
        kicker: "Para los que beben en silencio",
        title: "Agua fresca, cero esfuerzo.",
        body: "Acero inoxidable SUS 304 de grado alimentario y filtración de cuatro capas mantienen el agua limpia sin que tengas que pensarlo.",
        benefits: ["3,2 L — una semana de agua", "Dos filtros de recambio en la caja", "Bomba silenciosa"],
      },
    ],
    why: {
      title: "Elegimos menos, pero mejor.",
      body: "Antes de que un producto entre en Tulsi revisamos su utilidad, diseño, materiales y disponibilidad — y descartamos la mayoría.",
      principles: [
        { title: "Utilidad real", body: "Tiene que resolver algo que de verdad notes." },
        { title: "Specs honestas", body: "Verificamos lo que promete el fabricante antes de venderlo." },
        { title: "Diseño meditado", body: "Objetos que no necesitas esconder en un cajón." },
        { title: "Compra sencilla", body: "Precios claros, envío con seguimiento, devolución fácil." },
      ],
    },
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿A dónde enviáis?", a: "A toda la Unión Europea — envío gratis en todos los pedidos." },
      { q: "¿Cuánto tarda la entrega?", a: "Los productos en almacenes europeos llegan en 4–8 días laborables; los del almacén internacional, en 8–18. Cada ficha muestra su estimación." },
      { q: "¿Cómo sigo mi pedido?", a: "Recibirás un enlace de seguimiento por email en cuanto salga tu pedido." },
      { q: "¿Qué métodos de pago aceptáis?", a: "Tarjetas, Apple Pay, Google Pay, iDEAL, Bancontact y PayPal — todo procesado de forma segura por Stripe." },
      { q: "¿Cómo funcionan las devoluciones?", a: "Tienes 30 días desde la entrega. Escribe a hello@tulsi.store con tu número de pedido y nos encargamos." },
      { q: "¿Los precios incluyen impuestos?", a: "Sí — todos los precios que ves incluyen IVA." },
    ],
    newsletter: {
      title: "Productos nuevos, ideas útiles. Sin ruido.",
      note: "Emails puntuales sobre novedades y ofertas honestas. Date de baja cuando quieras.",
      placeholder: "Tu email",
      button: "Suscribirme",
      ok: "Dentro. Gracias.",
      err: "Algo falló — inténtalo de nuevo.",
      consent: "Acepto recibir emails de Tulsi. Ver política de privacidad.",
    },
  },
  nl: {
    trust: [
      { title: "Veilig betalen", body: "Kaartgegevens worden door Stripe verwerkt, nooit door ons." },
      { title: "Verzending met tracking", body: "Een track & trace-link bij elke bestelling." },
      { title: "30 dagen retour", body: "Van gedachten veranderd? Stuur het terug." },
      { title: "2 jaar garantie", body: "Europese consumentenbescherming op alles." },
    ],
    editorial: [
      {
        slug: "car-handheld-vacuum",
        kicker: "Schoon, overal",
        title: "Minder rommel in je dag.",
        body: "16.000 Pa borstelloze zuigkracht in een tool die in het dashboardkastje past — verzonden vanuit ons EU-magazijn in dagen, niet weken.",
        benefits: ["Stofzuiger, blazer en luchtpomp in één", "Zeven precisiemondstukken inbegrepen", "EU-magazijn · levering in 4–8 dagen"],
      },
      {
        slug: "smart-pet-fountain",
        kicker: "Voor de stille drinkers",
        title: "Vers water, nul moeite.",
        body: "Voedselveilig SUS 304 roestvrij staal en vierlaagse filtratie houden het water schoon zonder dat jij eraan hoeft te denken.",
        benefits: ["3,2 L — ongeveer een week water", "Twee vervangingsfilters in de doos", "Fluisterstille pomp"],
      },
    ],
    why: {
      title: "Wij kiezen minder, maar beter.",
      body: "Voordat een product bij Tulsi komt, beoordelen we nut, ontwerp, materialen en beschikbaarheid — en de meeste halen het niet.",
      principles: [
        { title: "Echt nut", body: "Het moet iets oplossen dat je echt merkt." },
        { title: "Eerlijke specs", body: "We verifiëren wat de maker belooft voordat we het verkopen." },
        { title: "Doordacht design", body: "Objecten die je niet in een la hoeft te verstoppen." },
        { title: "Simpel kopen", body: "Duidelijke prijzen, tracking, makkelijk retourneren." },
      ],
    },
    faqTitle: "Veelgestelde vragen",
    faq: [
      { q: "Waar leveren jullie?", a: "In de hele Europese Unie — gratis verzending bij elke bestelling." },
      { q: "Hoe lang duurt de levering?", a: "Producten uit onze EU-magazijnen komen in 4–8 werkdagen; items uit het internationale magazijn in 8–18 werkdagen. Elke productpagina toont de schatting." },
      { q: "Hoe volg ik mijn bestelling?", a: "Je ontvangt een trackinglink per e-mail zodra je bestelling verzonden is." },
      { q: "Welke betaalmethoden accepteren jullie?", a: "Kaarten, Apple Pay, Google Pay, iDEAL, Bancontact en PayPal — veilig verwerkt door Stripe." },
      { q: "Hoe werken retouren?", a: "Je hebt 30 dagen vanaf levering. Mail hello@tulsi.store met je bestelnummer en wij regelen het." },
      { q: "Zijn prijzen inclusief btw?", a: "Ja — elke prijs die je ziet is inclusief btw." },
    ],
    newsletter: {
      title: "Nieuwe producten, nuttige ideeën. Geen ruis.",
      note: "Af en toe een e-mail over nieuwe producten en eerlijke deals. Altijd uitschrijfbaar.",
      placeholder: "Je e-mail",
      button: "Aanmelden",
      ok: "Je staat erop. Dank je.",
      err: "Dat lukte niet — probeer opnieuw.",
      consent: "Ik ga akkoord met e-mails van Tulsi. Zie ons privacybeleid.",
    },
  },
  de: {
    trust: [
      { title: "Sichere Zahlung", body: "Kartendaten verarbeitet Stripe, niemals wir." },
      { title: "Versand mit Tracking", body: "Ein Sendungslink bei jeder Bestellung." },
      { title: "30 Tage Rückgabe", body: "Meinung geändert? Schick es zurück." },
      { title: "2 Jahre Garantie", body: "EU-Verbraucherschutz auf alles." },
    ],
    editorial: [
      {
        slug: "car-handheld-vacuum",
        kicker: "Sauber, überall",
        title: "Weniger Chaos in deinem Tag.",
        body: "16.000 Pa bürstenlose Saugkraft in einem Werkzeug fürs Handschuhfach — versendet aus unserem EU-Lager in Tagen, nicht Wochen.",
        benefits: ["Sauger, Gebläse und Luftpumpe in einem", "Sieben Präzisionsdüsen inklusive", "EU-Lager · Lieferung in 4–8 Tagen"],
      },
      {
        slug: "smart-pet-fountain",
        kicker: "Für die leisen Trinker",
        title: "Frisches Wasser, null Aufwand.",
        body: "Lebensmittelechter SUS-304-Edelstahl und vierstufige Filtration halten das Wasser sauber, ohne dass du daran denken musst.",
        benefits: ["3,2 L — etwa eine Woche Wasser", "Zwei Ersatzfilter in der Box", "Flüsterleise Pumpe"],
      },
    ],
    why: {
      title: "Wir wählen weniger, aber besser.",
      body: "Bevor ein Produkt zu Tulsi kommt, prüfen wir Nutzen, Design, Materialien und Verfügbarkeit — die meisten schaffen es nicht.",
      principles: [
        { title: "Echter Nutzen", body: "Es muss etwas lösen, das du wirklich spürst." },
        { title: "Ehrliche Specs", body: "Wir prüfen die Herstellerangaben, bevor wir verkaufen." },
        { title: "Durchdachtes Design", body: "Objekte, die du nicht in der Schublade verstecken musst." },
        { title: "Einfacher Kauf", body: "Klare Preise, Tracking, einfache Rückgabe." },
      ],
    },
    faqTitle: "Häufige Fragen",
    faq: [
      { q: "Wohin liefert ihr?", a: "In die gesamte EU — kostenloser Versand bei jeder Bestellung." },
      { q: "Wie lange dauert die Lieferung?", a: "Produkte aus EU-Lagern kommen in 4–8 Werktagen; Artikel aus dem internationalen Lager in 8–18 Werktagen. Jede Produktseite zeigt die Schätzung." },
      { q: "Wie verfolge ich meine Bestellung?", a: "Du erhältst einen Trackinglink per E-Mail, sobald deine Bestellung verschickt wird." },
      { q: "Welche Zahlungsmethoden akzeptiert ihr?", a: "Karten, Apple Pay, Google Pay, iDEAL, Bancontact und PayPal — sicher verarbeitet über Stripe." },
      { q: "Wie funktioniert die Rückgabe?", a: "30 Tage ab Lieferung. Schreib an hello@tulsi.store mit deiner Bestellnummer und wir kümmern uns." },
      { q: "Enthalten die Preise Steuern?", a: "Ja — jeder Preis enthält die MwSt." },
    ],
    newsletter: {
      title: "Neue Produkte, nützliche Ideen. Kein Lärm.",
      note: "Gelegentliche E-Mails zu Neuheiten und ehrlichen Angeboten. Jederzeit abbestellbar.",
      placeholder: "Deine E-Mail",
      button: "Abonnieren",
      ok: "Du bist dabei. Danke.",
      err: "Hat nicht geklappt — versuch es erneut.",
      consent: "Ich stimme E-Mails von Tulsi zu. Siehe Datenschutzerklärung.",
    },
  },
  fr: {
    trust: [
      { title: "Paiement sécurisé", body: "Les données bancaires sont gérées par Stripe, jamais par nous." },
      { title: "Livraison suivie", body: "Un lien de suivi avec chaque commande." },
      { title: "Retours 30 jours", body: "Vous changez d'avis ? Renvoyez-le." },
      { title: "Garantie 2 ans", body: "Protection européenne du consommateur sur tout." },
    ],
    editorial: [
      {
        slug: "car-handheld-vacuum",
        kicker: "Propre, partout",
        title: "Moins de désordre dans votre journée.",
        body: "16 000 Pa d'aspiration brushless dans un outil qui vit dans la boîte à gants — expédié depuis notre entrepôt européen en quelques jours.",
        benefits: ["Aspirateur, souffleur et pompe en un", "Sept embouts de précision inclus", "Entrepôt UE · livraison en 4–8 jours"],
      },
      {
        slug: "smart-pet-fountain",
        kicker: "Pour ceux qui boivent en silence",
        title: "De l'eau fraîche, zéro effort.",
        body: "Acier inoxydable SUS 304 alimentaire et filtration quatre couches : l'eau reste propre sans que vous y pensiez.",
        benefits: ["3,2 L — environ une semaine d'eau", "Deux filtres de rechange inclus", "Pompe silencieuse"],
      },
    ],
    why: {
      title: "Nous choisissons moins, mais mieux.",
      body: "Avant qu'un produit entre chez Tulsi, nous examinons son utilité, son design, ses matériaux et sa disponibilité — la plupart sont écartés.",
      principles: [
        { title: "Utilité réelle", body: "Il doit résoudre quelque chose que vous ressentez vraiment." },
        { title: "Specs honnêtes", body: "Nous vérifions les promesses du fabricant avant de vendre." },
        { title: "Design réfléchi", body: "Des objets que vous n'avez pas besoin de cacher." },
        { title: "Achat simple", body: "Prix clairs, suivi, retours faciles." },
      ],
    },
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Où livrez-vous ?", a: "Dans toute l'Union européenne — livraison offerte sur chaque commande." },
      { q: "Quels sont les délais ?", a: "Les produits en entrepôt européen arrivent en 4–8 jours ouvrés ; ceux de l'entrepôt international en 8–18 jours. Chaque fiche produit affiche son estimation." },
      { q: "Comment suivre ma commande ?", a: "Vous recevez un lien de suivi par e-mail dès l'expédition." },
      { q: "Quels moyens de paiement acceptez-vous ?", a: "Cartes, Apple Pay, Google Pay, iDEAL, Bancontact et PayPal — traités en toute sécurité par Stripe." },
      { q: "Comment fonctionnent les retours ?", a: "30 jours après livraison. Écrivez à hello@tulsi.store avec votre numéro de commande." },
      { q: "Les prix incluent-ils les taxes ?", a: "Oui — tous les prix affichés incluent la TVA." },
    ],
    newsletter: {
      title: "Nouveaux produits, idées utiles. Sans bruit.",
      note: "Des e-mails occasionnels sur les nouveautés et les offres honnêtes. Désinscription à tout moment.",
      placeholder: "Votre e-mail",
      button: "S'abonner",
      ok: "C'est noté. Merci.",
      err: "Ça n'a pas fonctionné — réessayez.",
      consent: "J'accepte de recevoir des e-mails de Tulsi. Voir la politique de confidentialité.",
    },
  },
  it: {
    trust: [
      { title: "Pagamento sicuro", body: "I dati della carta sono gestiti da Stripe, mai da noi." },
      { title: "Spedizione tracciata", body: "Un link di tracciamento con ogni ordine." },
      { title: "Resi in 30 giorni", body: "Hai cambiato idea? Rispediscilo." },
      { title: "Garanzia 2 anni", body: "Tutela europea del consumatore su tutto." },
    ],
    editorial: [
      {
        slug: "car-handheld-vacuum",
        kicker: "Pulito, ovunque",
        title: "Meno disordine nella tua giornata.",
        body: "16.000 Pa di aspirazione brushless in uno strumento che vive nel vano portaoggetti — spedito dal nostro magazzino europeo in giorni, non settimane.",
        benefits: ["Aspirapolvere, soffiatore e pompa in uno", "Sette ugelli di precisione inclusi", "Magazzino UE · consegna in 4–8 giorni"],
      },
      {
        slug: "smart-pet-fountain",
        kicker: "Per chi beve in silenzio",
        title: "Acqua fresca, zero sforzo.",
        body: "Acciaio inox SUS 304 alimentare e filtrazione a quattro strati mantengono l'acqua pulita senza che tu debba pensarci.",
        benefits: ["3,2 L — circa una settimana d'acqua", "Due filtri di ricambio inclusi", "Pompa silenziosissima"],
      },
    ],
    why: {
      title: "Scegliamo meno, ma meglio.",
      body: "Prima che un prodotto entri in Tulsi valutiamo utilità, design, materiali e disponibilità — e la maggior parte non passa.",
      principles: [
        { title: "Utilità vera", body: "Deve risolvere qualcosa che senti davvero." },
        { title: "Specifiche oneste", body: "Verifichiamo le promesse del produttore prima di vendere." },
        { title: "Design ragionato", body: "Oggetti che non devi nascondere in un cassetto." },
        { title: "Acquisto semplice", body: "Prezzi chiari, tracciamento, resi facili." },
      ],
    },
    faqTitle: "Domande frequenti",
    faq: [
      { q: "Dove spedite?", a: "In tutta l'Unione Europea — spedizione gratuita su ogni ordine." },
      { q: "Quanto impiega la consegna?", a: "I prodotti nei magazzini europei arrivano in 4–8 giorni lavorativi; quelli dal magazzino internazionale in 8–18. Ogni scheda mostra la stima." },
      { q: "Come traccio il mio ordine?", a: "Riceverai un link di tracciamento via email alla spedizione." },
      { q: "Quali metodi di pagamento accettate?", a: "Carte, Apple Pay, Google Pay, iDEAL, Bancontact e PayPal — elaborati in sicurezza da Stripe." },
      { q: "Come funzionano i resi?", a: "30 giorni dalla consegna. Scrivi a hello@tulsi.store con il numero d'ordine e ci pensiamo noi." },
      { q: "I prezzi includono le tasse?", a: "Sì — ogni prezzo che vedi include l'IVA." },
    ],
    newsletter: {
      title: "Nuovi prodotti, idee utili. Zero rumore.",
      note: "Email occasionali su novità e offerte oneste. Disiscriviti quando vuoi.",
      placeholder: "La tua email",
      button: "Iscrivimi",
      ok: "Ci sei. Grazie.",
      err: "Non ha funzionato — riprova.",
      consent: "Accetto di ricevere email da Tulsi. Vedi l'informativa privacy.",
    },
  },
};

export function getHomeContent(locale: Locale): HomeContent {
  return HOME[locale] ?? HOME.en;
}
