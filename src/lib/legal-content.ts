import type { Locale } from "@/i18n/routing";

/**
 * Contenido legal de la plataforma de Astrología Védica (pivote 2026-07).
 * Añadir razón social y nº KVK cuando existan.
 */

export type LegalTopic = "privacy" | "terms";

interface LegalDoc {
  title: string;
  paragraphs: string[];
}

type LegalEntry = Partial<Record<Locale, LegalDoc>> & { en: LegalDoc };

export const LEGAL_TOPICS: LegalTopic[] = ["privacy", "terms"];

export const LEGAL: Record<LegalTopic, LegalEntry> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      paragraphs: [
        "Tulsi processes only the data needed to prepare your Vedic horoscope: your name, email address, date, time and place of birth, and any comments you choose to share. This is sensitive, personal information — we treat it that way.",
        "Your birth data is shared exclusively with the astrologer preparing your reading, and with no one else. Your reading itself is strictly confidential and is delivered only to your email address.",
        "Payments are handled entirely through PayPal via a payment link we send you — we never see or store payment details on this website.",
        "We use privacy-friendly, cookie-less analytics for aggregate traffic only. No advertising trackers.",
        "Under the GDPR you may request access, correction or deletion of your data at any time at hello@tulsi.store. You may also lodge a complaint with your data-protection authority.",
      ],
    },
    es: {
      title: "Política de Privacidad",
      paragraphs: [
        "Tulsi trata únicamente los datos necesarios para elaborar tu horóscopo védico: nombre, email, fecha, hora y lugar de nacimiento, y los comentarios que decidas compartir. Es información personal sensible — y la tratamos como tal.",
        "Tus datos natales se comparten exclusivamente con el astrólogo que prepara tu lectura, y con nadie más. Tu lectura es estrictamente confidencial y se entrega solo a tu dirección de email.",
        "Los pagos se gestionan íntegramente a través de PayPal mediante un enlace que te enviamos — en esta web nunca vemos ni guardamos datos de pago.",
        "Usamos analítica sin cookies y respetuosa con la privacidad, solo para tráfico agregado. Sin rastreadores publicitarios.",
        "Bajo el RGPD puedes solicitar acceso, corrección o eliminación de tus datos en cualquier momento en hello@tulsi.store. También puedes reclamar ante tu autoridad de protección de datos.",
      ],
    },
    nl: {
      title: "Privacybeleid",
      paragraphs: [
        "Tulsi verwerkt alleen de gegevens die nodig zijn voor je Vedische horoscoop: naam, e-mail, geboortedatum, -tijd en -plaats, en de opmerkingen die je deelt. Dit is gevoelige, persoonlijke informatie — en zo behandelen we die ook.",
        "Je geboortegegevens worden uitsluitend gedeeld met de astroloog die je lezing voorbereidt, en met niemand anders. Je lezing is strikt vertrouwelijk en wordt alleen aan jouw e-mailadres geleverd.",
        "Betalingen verlopen volledig via PayPal met een betaallink die we je sturen — op deze website zien of bewaren we nooit betaalgegevens.",
        "We gebruiken privacyvriendelijke analytics zonder cookies, alleen voor geaggregeerd verkeer. Geen advertentietrackers.",
        "Onder de AVG kun je op elk moment inzage, correctie of verwijdering van je gegevens aanvragen via hello@tulsi.store.",
      ],
    },
    de: {
      title: "Datenschutzerklärung",
      paragraphs: [
        "Tulsi verarbeitet nur die Daten, die für dein vedisches Horoskop nötig sind: Name, E-Mail, Geburtsdatum, -zeit und -ort sowie deine Anmerkungen. Das sind sensible, persönliche Informationen — und so behandeln wir sie.",
        "Deine Geburtsdaten werden ausschließlich mit dem Astrologen geteilt, der deine Deutung erstellt — mit niemandem sonst. Deine Deutung ist streng vertraulich und wird nur an deine E-Mail-Adresse geliefert.",
        "Zahlungen laufen vollständig über PayPal per Zahlungslink — auf dieser Website sehen oder speichern wir niemals Zahlungsdaten.",
        "Wir nutzen datenschutzfreundliche Analytik ohne Cookies, nur für aggregierten Traffic. Keine Werbetracker.",
        "Nach der DSGVO kannst du jederzeit Auskunft, Berichtigung oder Löschung deiner Daten verlangen: hello@tulsi.store.",
      ],
    },
    fr: {
      title: "Politique de Confidentialité",
      paragraphs: [
        "Tulsi ne traite que les données nécessaires à votre horoscope védique : nom, e-mail, date, heure et lieu de naissance, et vos commentaires éventuels. Ce sont des informations personnelles sensibles — nous les traitons comme telles.",
        "Vos données de naissance sont partagées exclusivement avec l'astrologue qui prépare votre lecture, et avec personne d'autre. Votre lecture est strictement confidentielle et n'est livrée qu'à votre adresse e-mail.",
        "Les paiements sont gérés entièrement via PayPal par un lien de paiement — nous ne voyons ni ne stockons jamais de données de paiement sur ce site.",
        "Nous utilisons une analytique sans cookies, uniquement pour le trafic agrégé. Aucun traqueur publicitaire.",
        "En vertu du RGPD, vous pouvez demander l'accès, la rectification ou la suppression de vos données à tout moment : hello@tulsi.store.",
      ],
    },
    it: {
      title: "Informativa sulla Privacy",
      paragraphs: [
        "Tulsi tratta solo i dati necessari per il tuo oroscopo vedico: nome, email, data, ora e luogo di nascita, e i commenti che condividi. Sono informazioni personali sensibili — e le trattiamo come tali.",
        "I tuoi dati di nascita sono condivisi esclusivamente con l'astrologo che prepara la tua lettura, e con nessun altro. La tua lettura è strettamente riservata e viene consegnata solo al tuo indirizzo email.",
        "I pagamenti sono gestiti interamente tramite PayPal con un link di pagamento — su questo sito non vediamo né conserviamo mai dati di pagamento.",
        "Utilizziamo analisi senza cookie, solo per traffico aggregato. Nessun tracker pubblicitario.",
        "Ai sensi del GDPR puoi richiedere accesso, rettifica o cancellazione dei tuoi dati in qualsiasi momento: hello@tulsi.store.",
      ],
    },
  },
  terms: {
    en: {
      title: "Terms & Conditions",
      paragraphs: [
        "Tulsi provides personalized Vedic astrology readings, prepared by hand by experienced Jyotish scholars. By submitting a request you accept these terms.",
        "The process: you submit your birth details; we email you a PayPal payment link; once payment is confirmed, our scholars prepare your reading; you receive it as a PDF by email within 24 hours of payment.",
        "Because every reading is a fully personalized service created specifically for you, the EU right of withdrawal no longer applies once preparation of your reading has begun with your consent. If you wish to cancel before payment or before work has started, simply write to hello@tulsi.store — nothing is owed.",
        "Important: a Vedic astrology reading offers traditional guidance and self-knowledge. It is not a substitute for professional medical, psychological, legal or financial advice, and no specific life outcome is guaranteed.",
        "These terms are governed by Dutch law. Nothing in them limits your statutory rights.",
      ],
    },
    es: {
      title: "Términos y Condiciones",
      paragraphs: [
        "Tulsi ofrece lecturas personalizadas de astrología védica, elaboradas a mano por eruditos experimentados del Jyotish. Al enviar una solicitud aceptas estas condiciones.",
        "El proceso: envías tus datos de nacimiento; te mandamos por email un enlace de pago de PayPal; confirmado el pago, nuestros eruditos preparan tu lectura; la recibes en PDF por email en menos de 24 horas tras el pago.",
        "Al ser cada lectura un servicio totalmente personalizado creado específicamente para ti, el derecho de desistimiento de la UE deja de aplicarse una vez comenzada su elaboración con tu consentimiento. Si deseas cancelar antes del pago o antes de que empiece el trabajo, escribe a hello@tulsi.store — no se debe nada.",
        "Importante: una lectura de astrología védica ofrece orientación tradicional y autoconocimiento. No sustituye el consejo profesional médico, psicológico, legal o financiero, y no se garantiza ningún resultado vital concreto.",
        "Estas condiciones se rigen por el derecho neerlandés. Nada en ellas limita tus derechos legales.",
      ],
    },
    nl: {
      title: "Algemene Voorwaarden",
      paragraphs: [
        "Tulsi levert persoonlijke Vedische astrologielezingen, met de hand opgesteld door ervaren Jyotish-geleerden. Door een aanvraag in te dienen accepteer je deze voorwaarden.",
        "Het proces: je stuurt je geboortegegevens; wij mailen je een PayPal-betaallink; na betalingsbevestiging bereiden onze geleerden je lezing voor; je ontvangt haar als PDF per e-mail binnen 24 uur na betaling.",
        "Omdat elke lezing een volledig gepersonaliseerde dienst is, vervalt het EU-herroepingsrecht zodra de voorbereiding met jouw instemming is begonnen. Wil je annuleren vóór betaling of vóór aanvang van het werk, mail dan hello@tulsi.store — je bent niets verschuldigd.",
        "Belangrijk: een Vedische lezing biedt traditionele begeleiding en zelfkennis. Zij vervangt geen professioneel medisch, psychologisch, juridisch of financieel advies, en er wordt geen specifieke levensuitkomst gegarandeerd.",
        "Op deze voorwaarden is Nederlands recht van toepassing.",
      ],
    },
    de: {
      title: "Allgemeine Geschäftsbedingungen",
      paragraphs: [
        "Tulsi bietet persönliche vedische Astrologie-Deutungen, von Hand erstellt von erfahrenen Jyotish-Gelehrten. Mit deiner Anfrage akzeptierst du diese Bedingungen.",
        "Der Ablauf: du sendest deine Geburtsdaten; wir mailen dir einen PayPal-Zahlungslink; nach Zahlungsbestätigung erstellen unsere Gelehrten deine Deutung; du erhältst sie als PDF per E-Mail innerhalb von 24 Stunden nach Zahlung.",
        "Da jede Deutung eine vollständig personalisierte Leistung ist, erlischt das EU-Widerrufsrecht, sobald die Erstellung mit deiner Zustimmung begonnen hat. Möchtest du vor Zahlung oder Arbeitsbeginn stornieren, schreibe an hello@tulsi.store — es entstehen keine Kosten.",
        "Wichtig: Eine vedische Deutung bietet traditionelle Orientierung und Selbsterkenntnis. Sie ersetzt keine professionelle medizinische, psychologische, rechtliche oder finanzielle Beratung, und kein bestimmtes Lebensergebnis wird garantiert.",
        "Es gilt niederländisches Recht.",
      ],
    },
    fr: {
      title: "Conditions Générales",
      paragraphs: [
        "Tulsi propose des lectures personnalisées d'astrologie védique, réalisées à la main par des érudits expérimentés du Jyotish. En soumettant une demande, vous acceptez ces conditions.",
        "Le processus : vous envoyez vos données de naissance ; nous vous adressons un lien de paiement PayPal ; une fois le paiement confirmé, nos érudits préparent votre lecture ; vous la recevez en PDF par e-mail sous 24 heures après paiement.",
        "Chaque lecture étant un service entièrement personnalisé, le droit de rétractation de l'UE cesse de s'appliquer dès que la préparation a commencé avec votre accord. Pour annuler avant paiement ou avant le début du travail, écrivez à hello@tulsi.store — rien n'est dû.",
        "Important : une lecture védique offre une orientation traditionnelle et une connaissance de soi. Elle ne remplace pas un avis professionnel médical, psychologique, juridique ou financier, et aucun résultat de vie spécifique n'est garanti.",
        "Ces conditions sont régies par le droit néerlandais.",
      ],
    },
    it: {
      title: "Termini e Condizioni",
      paragraphs: [
        "Tulsi offre letture personalizzate di astrologia vedica, elaborate a mano da eruditi esperti di Jyotish. Inviando una richiesta accetti questi termini.",
        "Il processo: invii i tuoi dati di nascita; ti mandiamo via email un link di pagamento PayPal; confermato il pagamento, i nostri eruditi preparano la tua lettura; la ricevi in PDF via email entro 24 ore dal pagamento.",
        "Essendo ogni lettura un servizio interamente personalizzato, il diritto di recesso UE cessa di applicarsi una volta iniziata la preparazione con il tuo consenso. Per annullare prima del pagamento o dell'inizio del lavoro, scrivi a hello@tulsi.store — nulla è dovuto.",
        "Importante: una lettura vedica offre orientamento tradizionale e conoscenza di sé. Non sostituisce il parere professionale medico, psicologico, legale o finanziario, e nessun esito di vita specifico è garantito.",
        "Si applica il diritto olandese.",
      ],
    },
  },
};
