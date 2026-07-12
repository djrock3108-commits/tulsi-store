import type { Locale } from "@/i18n/routing";

/**
 * Contenido legal por idioma. Versiones concisas y honestas para el
 * lanzamiento; ampliar con asesoría legal al activar el modo live
 * (añadir razón social y nº KVK cuando existan).
 */

export type LegalTopic = "privacy" | "terms" | "shipping-returns";

interface LegalDoc {
  title: string;
  paragraphs: string[];
}

type LegalEntry = Partial<Record<Locale, LegalDoc>> & { en: LegalDoc };

export const LEGAL_TOPICS: LegalTopic[] = ["privacy", "terms", "shipping-returns"];

export const LEGAL: Record<LegalTopic, LegalEntry> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      paragraphs: [
        "Tulsi.store processes only the data needed to fulfil your order: your name, shipping address and email. Payments are handled entirely by Stripe — we never see or store your card details.",
        "Your order data is shared only with the logistics partner that ships your product, and is kept for as long as tax law requires. We do not sell or rent personal data to anyone.",
        "We use privacy-friendly, cookie-less analytics to understand aggregate traffic. No advertising trackers, no cross-site profiles.",
        "Under the GDPR you can request access, correction or deletion of your data at any time by writing to hello@tulsi.store. You may also lodge a complaint with your national data-protection authority.",
      ],
    },
    es: {
      title: "Política de Privacidad",
      paragraphs: [
        "Tulsi.store trata únicamente los datos necesarios para completar tu pedido: nombre, dirección de envío y email. Los pagos los gestiona íntegramente Stripe — nunca vemos ni guardamos los datos de tu tarjeta.",
        "Los datos del pedido se comparten solo con el socio logístico que envía tu producto, y se conservan el tiempo que exige la normativa fiscal. No vendemos ni cedemos datos personales a nadie.",
        "Usamos analítica respetuosa con la privacidad y sin cookies para entender el tráfico agregado. Sin rastreadores publicitarios ni perfiles entre sitios.",
        "Bajo el RGPD puedes solicitar acceso, corrección o eliminación de tus datos en cualquier momento escribiendo a hello@tulsi.store. También puedes reclamar ante tu autoridad de protección de datos.",
      ],
    },
    nl: {
      title: "Privacybeleid",
      paragraphs: [
        "Tulsi.store verwerkt alleen de gegevens die nodig zijn voor je bestelling: naam, verzendadres en e-mail. Betalingen verlopen volledig via Stripe — wij zien of bewaren je kaartgegevens nooit.",
        "Je bestelgegevens worden alleen gedeeld met de logistieke partner die je product verzendt, en worden bewaard zolang de belastingwet dat vereist. We verkopen of verhuren geen persoonsgegevens.",
        "We gebruiken privacyvriendelijke analytics zonder cookies. Geen advertentietrackers, geen profielen.",
        "Onder de AVG kun je op elk moment inzage, correctie of verwijdering van je gegevens aanvragen via hello@tulsi.store. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.",
      ],
    },
    de: {
      title: "Datenschutzerklärung",
      paragraphs: [
        "Tulsi.store verarbeitet nur die Daten, die für deine Bestellung nötig sind: Name, Lieferadresse und E-Mail. Zahlungen laufen vollständig über Stripe — wir sehen oder speichern deine Kartendaten nie.",
        "Bestelldaten werden nur mit dem Logistikpartner geteilt, der dein Produkt versendet, und so lange aufbewahrt, wie es das Steuerrecht verlangt. Wir verkaufen keine personenbezogenen Daten.",
        "Wir nutzen datenschutzfreundliche Analytik ohne Cookies. Keine Werbetracker, keine Profile.",
        "Nach der DSGVO kannst du jederzeit Auskunft, Berichtigung oder Löschung deiner Daten verlangen: hello@tulsi.store. Du kannst dich auch bei deiner Datenschutzbehörde beschweren.",
      ],
    },
    fr: {
      title: "Politique de Confidentialité",
      paragraphs: [
        "Tulsi.store ne traite que les données nécessaires à votre commande : nom, adresse de livraison et e-mail. Les paiements sont entièrement gérés par Stripe — nous ne voyons ni ne stockons jamais vos données bancaires.",
        "Les données de commande ne sont partagées qu'avec le partenaire logistique qui expédie votre produit, et conservées le temps exigé par la loi fiscale. Nous ne vendons aucune donnée personnelle.",
        "Nous utilisons une analytique respectueuse de la vie privée, sans cookies. Aucun traqueur publicitaire.",
        "En vertu du RGPD, vous pouvez demander l'accès, la rectification ou la suppression de vos données à tout moment : hello@tulsi.store. Vous pouvez aussi saisir la CNIL.",
      ],
    },
    it: {
      title: "Informativa sulla Privacy",
      paragraphs: [
        "Tulsi.store tratta solo i dati necessari per completare il tuo ordine: nome, indirizzo di spedizione ed email. I pagamenti sono gestiti interamente da Stripe — non vediamo né conserviamo mai i dati della tua carta.",
        "I dati dell'ordine sono condivisi solo con il partner logistico che spedisce il prodotto e conservati per il tempo richiesto dalla normativa fiscale. Non vendiamo dati personali.",
        "Utilizziamo analisi rispettose della privacy, senza cookie. Nessun tracker pubblicitario.",
        "Ai sensi del GDPR puoi richiedere accesso, rettifica o cancellazione dei tuoi dati in qualsiasi momento: hello@tulsi.store. Puoi anche presentare reclamo al Garante.",
      ],
    },
  },
  terms: {
    en: {
      title: "Terms & Conditions",
      paragraphs: [
        "Tulsi.store sells premium everyday technology to consumers in the European Union. By placing an order you accept these terms.",
        "Prices include VAT. Payment is processed by Stripe at checkout; your order is confirmed by email once payment succeeds.",
        "All products carry the 2-year legal conformity warranty under EU consumer law. If a product is defective, contact hello@tulsi.store and we will repair, replace or refund it.",
        "You have the right to withdraw from your purchase within 30 days of delivery, without giving a reason — see Shipping & Returns.",
        "These terms are governed by Dutch law. Nothing in them limits your statutory rights as a consumer.",
      ],
    },
    es: {
      title: "Términos y Condiciones",
      paragraphs: [
        "Tulsi.store vende tecnología premium para el día a día a consumidores de la Unión Europea. Al hacer un pedido aceptas estas condiciones.",
        "Los precios incluyen IVA. El pago se procesa mediante Stripe al finalizar la compra; el pedido se confirma por email cuando el pago se completa.",
        "Todos los productos tienen la garantía legal de conformidad de 2 años del derecho de consumo europeo. Si un producto es defectuoso, escribe a hello@tulsi.store y lo repararemos, sustituiremos o reembolsaremos.",
        "Tienes derecho a desistir de tu compra en los 30 días siguientes a la entrega, sin dar motivos — ver Envíos y Devoluciones.",
        "Estas condiciones se rigen por el derecho neerlandés. Nada en ellas limita tus derechos legales como consumidor.",
      ],
    },
    nl: {
      title: "Algemene Voorwaarden",
      paragraphs: [
        "Tulsi.store verkoopt premium technologie aan consumenten in de Europese Unie. Door te bestellen accepteer je deze voorwaarden.",
        "Prijzen zijn inclusief btw. Betaling verloopt via Stripe; je bestelling wordt per e-mail bevestigd zodra de betaling is gelukt.",
        "Alle producten vallen onder de wettelijke conformiteitsgarantie van 2 jaar. Is een product defect, mail hello@tulsi.store en we repareren, vervangen of vergoeden het.",
        "Je hebt het recht om binnen 30 dagen na levering zonder opgave van reden af te zien van je aankoop — zie Verzending & Retouren.",
        "Op deze voorwaarden is Nederlands recht van toepassing. Niets hierin beperkt je wettelijke consumentenrechten.",
      ],
    },
    de: {
      title: "Allgemeine Geschäftsbedingungen",
      paragraphs: [
        "Tulsi.store verkauft Premium-Technologie an Verbraucher in der Europäischen Union. Mit deiner Bestellung akzeptierst du diese Bedingungen.",
        "Preise inklusive MwSt. Die Zahlung erfolgt über Stripe; deine Bestellung wird nach erfolgreicher Zahlung per E-Mail bestätigt.",
        "Alle Produkte haben die gesetzliche Gewährleistung von 2 Jahren. Bei einem Defekt schreibe an hello@tulsi.store — wir reparieren, ersetzen oder erstatten.",
        "Du kannst innerhalb von 30 Tagen nach Lieferung ohne Angabe von Gründen vom Kauf zurücktreten — siehe Versand & Rückgabe.",
        "Es gilt niederländisches Recht. Deine gesetzlichen Verbraucherrechte bleiben unberührt.",
      ],
    },
    fr: {
      title: "Conditions Générales",
      paragraphs: [
        "Tulsi.store vend de la technologie premium aux consommateurs de l'Union européenne. En commandant, vous acceptez ces conditions.",
        "Les prix incluent la TVA. Le paiement est traité par Stripe ; votre commande est confirmée par e-mail dès que le paiement aboutit.",
        "Tous les produits bénéficient de la garantie légale de conformité de 2 ans. En cas de défaut, écrivez à hello@tulsi.store — réparation, remplacement ou remboursement.",
        "Vous disposez d'un droit de rétractation de 30 jours après livraison, sans motif — voir Livraison & Retours.",
        "Ces conditions sont régies par le droit néerlandais. Vos droits légaux de consommateur restent intacts.",
      ],
    },
    it: {
      title: "Termini e Condizioni",
      paragraphs: [
        "Tulsi.store vende tecnologia premium ai consumatori dell'Unione Europea. Effettuando un ordine accetti questi termini.",
        "I prezzi includono l'IVA. Il pagamento è gestito da Stripe; l'ordine è confermato via email a pagamento riuscito.",
        "Tutti i prodotti godono della garanzia legale di conformità di 2 anni. In caso di difetto scrivi a hello@tulsi.store — ripariamo, sostituiamo o rimborsiamo.",
        "Hai diritto di recesso entro 30 giorni dalla consegna, senza motivazione — vedi Spedizioni e Resi.",
        "Si applica il diritto olandese. I tuoi diritti di consumatore restano impregiudicati.",
      ],
    },
  },
  "shipping-returns": {
    en: {
      title: "Shipping & Returns",
      paragraphs: [
        "We ship across the European Union with free shipping on every order. Products stocked in our EU warehouses arrive in 4–8 working days; items shipped from our international warehouse take 8–18 working days. You receive a tracking link by email as soon as your order ships.",
        "Returns: you have 30 days from delivery to return any product, no questions asked. Write to hello@tulsi.store with your order number and we'll send you instructions. The product should be unused and in its original packaging.",
        "Refunds are issued to your original payment method within 14 days of us receiving the return.",
        "Warranty: every product is covered by the 2-year EU legal conformity warranty. It covers manufacturing and functional defects — motor, battery, pump, electronics, seams — with repair, replacement or refund at no cost to you.",
        "What the warranty does not cover: damage caused by use (drops, knocks, liquids on non-waterproof products), normal wear and tear, and products opened or modified. Transport damage: report it with photos within 48 hours of delivery and we resolve it immediately.",
      ],
    },
    es: {
      title: "Envíos y Devoluciones",
      paragraphs: [
        "Enviamos a toda la Unión Europea con envío gratis en todos los pedidos. Los productos con stock en nuestros almacenes europeos llegan en 4–8 días laborables; los enviados desde el almacén internacional tardan 8–18 días laborables. Recibirás el enlace de seguimiento por email en cuanto salga tu pedido.",
        "Devoluciones: tienes 30 días desde la entrega para devolver cualquier producto, sin preguntas. Escribe a hello@tulsi.store con tu número de pedido y te enviaremos las instrucciones. El producto debe estar sin usar y en su embalaje original.",
        "Los reembolsos se emiten a tu método de pago original en un máximo de 14 días desde que recibimos la devolución.",
        "Garantía: todos los productos están cubiertos por la garantía legal europea de conformidad de 2 años. Cubre defectos de fabricación y funcionamiento — motor, batería, bomba, electrónica, costuras — con reparación, sustitución o reembolso sin coste.",
        "Qué no cubre la garantía: daños causados por el uso (caídas, golpes, líquidos en productos no resistentes al agua), el desgaste normal, y productos abiertos o modificados. Daños de transporte: repórtalos con fotos en las 48 horas siguientes a la entrega y lo resolvemos de inmediato.",
      ],
    },
    nl: {
      title: "Verzending & Retouren",
      paragraphs: [
        "We verzenden door de hele EU, gratis bij elke bestelling. Producten uit onze Europese magazijnen komen in 4–8 werkdagen aan; items uit het internationale magazijn in 8–18 werkdagen. Je ontvangt een track & trace-link per e-mail zodra je bestelling onderweg is.",
        "Retouren: je hebt 30 dagen na levering om elk product terug te sturen, zonder vragen. Mail hello@tulsi.store met je bestelnummer en we sturen instructies. Het product moet ongebruikt en in de originele verpakking zijn.",
        "Terugbetalingen volgen binnen 14 dagen na ontvangst van de retour, via je oorspronkelijke betaalmethode.",
        "Garantie: elk product valt onder de wettelijke EU-conformiteitsgarantie van 2 jaar. Deze dekt fabricage- en functionele defecten — motor, batterij, pomp, elektronica, naden — met gratis reparatie, vervanging of terugbetaling.",
        "Wat de garantie niet dekt: schade door gebruik (vallen, stoten, vloeistoffen op niet-waterdichte producten), normale slijtage, en geopende of aangepaste producten. Transportschade: meld het met foto's binnen 48 uur na levering en we lossen het direct op.",
      ],
    },
    de: {
      title: "Versand & Rückgabe",
      paragraphs: [
        "Wir versenden EU-weit kostenlos. Produkte aus unseren EU-Lagern kommen in 4–8 Werktagen an; Artikel aus dem internationalen Lager in 8–18 Werktagen. Den Sendungsverfolgungslink erhältst du per E-Mail, sobald deine Bestellung unterwegs ist.",
        "Rückgabe: 30 Tage ab Lieferung, ohne Fragen. Schreibe an hello@tulsi.store mit deiner Bestellnummer und du erhältst die Anleitung. Das Produkt sollte unbenutzt und originalverpackt sein.",
        "Erstattungen erfolgen innerhalb von 14 Tagen nach Eingang der Rücksendung auf dein ursprüngliches Zahlungsmittel.",
        "Garantie: Jedes Produkt hat die gesetzliche EU-Gewährleistung von 2 Jahren. Sie deckt Herstellungs- und Funktionsfehler — Motor, Akku, Pumpe, Elektronik, Nähte — mit kostenloser Reparatur, Ersatz oder Erstattung.",
        "Nicht abgedeckt: Schäden durch Gebrauch (Stürze, Stöße, Flüssigkeiten bei nicht wasserdichten Produkten), normale Abnutzung sowie geöffnete oder veränderte Produkte. Transportschäden: mit Fotos innerhalb von 48 Stunden nach Lieferung melden — wir lösen es sofort.",
      ],
    },
    fr: {
      title: "Livraison & Retours",
      paragraphs: [
        "Nous livrons dans toute l'UE, gratuitement sur chaque commande. Les produits stockés dans nos entrepôts européens arrivent en 4–8 jours ouvrés ; ceux expédiés de l'entrepôt international en 8–18 jours ouvrés. Vous recevez un lien de suivi par e-mail dès l'expédition.",
        "Retours : 30 jours après livraison, sans justification. Écrivez à hello@tulsi.store avec votre numéro de commande et nous vous enverrons les instructions. Le produit doit être inutilisé, dans son emballage d'origine.",
        "Les remboursements sont effectués sous 14 jours après réception du retour, sur votre moyen de paiement initial.",
        "Garantie : chaque produit est couvert par la garantie légale européenne de conformité de 2 ans. Elle couvre les défauts de fabrication et de fonctionnement — moteur, batterie, pompe, électronique, coutures — avec réparation, remplacement ou remboursement sans frais.",
        "Ce que la garantie ne couvre pas : les dommages liés à l'usage (chutes, chocs, liquides sur produits non étanches), l'usure normale, et les produits ouverts ou modifiés. Dommages de transport : signalez-les avec photos sous 48 heures après livraison, nous réglons cela immédiatement.",
      ],
    },
    it: {
      title: "Spedizioni e Resi",
      paragraphs: [
        "Spediamo in tutta l'UE, gratuitamente su ogni ordine. I prodotti nei nostri magazzini europei arrivano in 4–8 giorni lavorativi; quelli dal magazzino internazionale in 8–18 giorni lavorativi. Riceverai il link di tracciamento via email alla spedizione.",
        "Resi: 30 giorni dalla consegna, senza domande. Scrivi a hello@tulsi.store con il numero d'ordine e ti invieremo le istruzioni. Il prodotto deve essere inutilizzato e nella confezione originale.",
        "I rimborsi avvengono entro 14 giorni dal ricevimento del reso, sul metodo di pagamento originale.",
        "Garanzia: ogni prodotto è coperto dalla garanzia legale europea di conformità di 2 anni. Copre i difetti di fabbricazione e funzionamento — motore, batteria, pompa, elettronica, cuciture — con riparazione, sostituzione o rimborso senza costi.",
        "Cosa non copre la garanzia: danni causati dall'uso (cadute, urti, liquidi su prodotti non impermeabili), la normale usura, e prodotti aperti o modificati. Danni da trasporto: segnalali con foto entro 48 ore dalla consegna e risolviamo subito.",
      ],
    },
  },
};
