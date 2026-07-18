import type { Locale } from "@/i18n/routing";
import type { AstroContent } from "./astro-content";

/** NL / DE / FR / IT — contenido completo de la plataforma védica. */
export const ASTRO_EXTRA: Partial<Record<Locale, AstroContent>> = {
  nl: {
    hero: {
      eyebrow: "Authentieke Jyotish · Sinds mensenheugenis",
      title: "De hemel onthield het moment waarop je werd geboren",
      subtitle: "Een persoonlijke geboortehoroscoop in de authentieke Jyotish-traditie — geleverd binnen 24 uur na betaling.",
      cta: "Bestel mijn horoscoop",
      secondary: "Hoe het werkt",
    },
    heroTrust: ["Authentieke Vedische traditie", "Elke lezing individueel voorbereid", "Privé & vertrouwelijk", "Geleverd binnen 24 uur"],
    intro: {
      kicker: "Wat is Vedische astrologie?",
      title: "De wetenschap van het licht, ouder dan de geschiedenis.",
      body: [
        "Jyotish — \"de wetenschap van het licht\" — is de astrologie van het oude India, een van de zes ledematen van de Veda's. Al duizenden jaren leest zij het karma van de ziel in de kaart van de hemel op het exacte geboortemoment.",
        "Je geboortehoroscoop is geen vermaak. Het is een precieze spiegel van je neigingen, talenten, uitdagingen en timing — het instrument waarmee wijzen al millennia de belangrijkste beslissingen van het leven begeleiden.",
      ],
      diffTitle: "Hoe verschilt zij van westerse astrologie?",
      diffs: [
        "Zij gebruikt de siderische dierenriem — de werkelijke positie van de sterrenbeelden. De meeste mensen ontdekken dat hun Vedische teken verschilt van hun westerse.",
        "Zij leest drie pijlers, niet één: je ascendant (lagna), je maanteken en je geboortester (nakshatra) — 27 maanhuizen die de westerse astrologie niet kent.",
        "Zij voorspelt via planeetperioden (dasha's): een precies timingsysteem dat niet alleen wát zegt, maar wanneer.",
        "Zij biedt traditionele remedies — edelstenen, mantra's en observanties — om bewust met je kaart te werken.",
      ],
    },
    discover: {
      title: "Wat je horoscoop kan onthullen",
      items: ["Persoonlijkheid en innerlijke aard", "Levensdoel", "Talenten en krachten", "Uitdagingen en hoe ze te dragen", "Relaties", "Huwelijk", "Carrière en roeping", "Rijkdom en voorspoed", "Gezondheidsneigingen", "Planeetperioden — jouw timing", "Traditionele aanbevelingen"],
    },
    why: {
      title: "Waarom Tulsi",
      items: [
        { title: "Authentieke traditie", body: "Analyse geworteld in de klassieke teksten — Brihat Parashara Hora Shastra, Phala Dipika, Brihat Jataka — geciteerd in je rapport." },
        { title: "Elke kaart is uniek", body: "Je lezing wordt specifiek opgesteld op basis van je exacte geboortegegevens — nooit vanuit een sjabloon." },
        { title: "Een levende traditie", body: "Jyotish begeleidt zoekers al duizenden jaren; elke Tulsi-lezing werkt binnen die ononderbroken traditie." },
        { title: "Werkelijk persoonlijk", body: "Geen sjablonen. Je rapport wordt voor jou en over jou geschreven — tot en met de persoonlijke slotbrief." },
        { title: "Geleverd binnen 24 uur", body: "Je volledige rapport komt als PDF per e-mail binnen 24 uur na betalingsbevestiging." },
        { title: "Volledig vertrouwelijk", body: "Je geboortegegevens en je lezing blijven strikt privé, altijd." },
      ],
    },
    how: {
      title: "Hoe het werkt",
      steps: [
        { title: "Deel je geboortegegevens", body: "Vul het formulier in met je datum, exacte tijd en geboorteplaats. Twee minuten." },
        { title: "Ontvang je betaallink", body: "Binnen enkele uren sturen we je per e-mail een veilige PayPal-betaallink." },
        { title: "Je lezing wordt voorbereid", body: "Na betalingsbevestiging wordt je volledige lezing opgesteld op basis van je exacte geboortegegevens." },
        { title: "Ontvang je rapport", body: "Binnen 24 uur landt je persoonlijke horoscoop als PDF in je inbox." },
      ],
    },
    receive: {
      title: "Wat je ontvangt",
      note: "Een volledige Life Management Reading — doorgaans 15–25 pagina's, in klassieke stijl.",
      items: ["Je ascendant (Lagna) — met klassieke citaten", "Je maanteken en zijn waardigheden", "Je Nakshatra (geboortester), godheid en symbool", "Alle negen planeten, huis voor huis", "Je planeetcombinaties (Yoga's)", "Sade Sati — Saturnus' grote cycli, gedateerd", "Vimshottari Dasha — de grote perioden van je leven", "De komende tien jaar, periode voor periode", "Carrière, relaties en huwelijk", "Krachten, uitdagingen en levensdoel", "Traditionele remedies voor jou gekozen", "Een persoonlijke slotbrief"],
    },
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Hoe wordt mijn horoscoop voorbereid?", a: "Individueel, op basis van je exacte geboortegegevens en volgens de klassieke teksten van de Jyotish-traditie. Geen twee lezingen zijn gelijk." },
        { q: "Hoe lang duurt het?", a: "Je rapport wordt binnen 24 uur na betalingsbevestiging geleverd." },
        { q: "Wat als ik mijn geboortetijd niet weet?", a: "Vermeld het in het formulier — we beoordelen je geval individueel. De ascendant verandert elke twee uur; we kunnen vanuit je maankaart werken of rectificatie bespreken." },
        { q: "Hoe betaal ik?", a: "Na het versturen van het formulier mailen we je een veilige PayPal-betaallink. Op deze site wordt niets afgerekend." },
        { q: "Zijn mijn gegevens privé?", a: "Ja. Je geboortegegevens en lezing blijven volledig vertrouwelijk." },
        { q: "Welke traditie volgen jullie?", a: "Klassieke Parashari Jyotish met de Lahiri-ayanamsha, in de devotionele lijn van de Vedische traditie." },
      ],
    },
    cta: {
      title: "Je horoscoop wacht al sinds het moment van je geboorte.",
      body: "Een diepgaande, persoonlijke lezing in de authentieke Vedische traditie.",
      button: "Bestel mijn Vedische horoscoop",
    },
    form: {
      title: "Bestel je persoonlijke Vedische horoscoop",
      subtitle: "Vul hieronder je geboortegegevens in. We mailen je binnen enkele uren een veilige PayPal-betaallink — je lezing begint na betalingsbevestiging.",
      name: "Volledige naam", email: "E-mailadres", birthDate: "Geboortedatum", birthTime: "Exacte geboortetijd",
      timeUnknown: "Ik weet mijn exacte geboortetijd niet", city: "Geboorteplaats", country: "Geboorteland",
      comments: "Opmerkingen (optioneel)", commentsHint: "Alles wat je astroloog moet weten — specifieke vragen, aandachtsgebieden…",
      consent: "Ik ga akkoord met de verwerking van mijn gegevens voor mijn horoscoop. Zie het privacybeleid.",
      submit: "Vraag mijn horoscoop aan", sending: "Versturen…", error: "Er ging iets mis — probeer opnieuw.",
      thanksTitle: "Dank je.",
      thanksBody: "Je gegevens zijn ontvangen. Binnen enkele uren ontvang je per e-mail een veilige PayPal-betaallink. Na betalingsbevestiging begint de voorbereiding van je persoonlijke horoscoop. Levering: binnen 24 uur na betaling.",
    },
  },
  de: {
    hero: {
      eyebrow: "Authentisches Jyotish · Seit undenklichen Zeiten",
      title: "Der Himmel erinnerte sich an den Moment deiner Geburt",
      subtitle: "Eine persönliche Geburtshoroskop-Analyse in der authentischen Jyotish-Tradition — geliefert innerhalb von 24 Stunden nach Zahlung.",
      cta: "Mein Horoskop bestellen",
      secondary: "So funktioniert es",
    },
    heroTrust: ["Authentische vedische Tradition", "Jede Deutung individuell erstellt", "Privat & vertraulich", "Lieferung in 24 Stunden"],
    intro: {
      kicker: "Was ist vedische Astrologie?",
      title: "Die Wissenschaft des Lichts, älter als die Geschichte.",
      body: [
        "Jyotish — \"die Wissenschaft des Lichts\" — ist die Astrologie des alten Indien, eines der sechs Glieder der Veden. Seit Jahrtausenden liest sie das Karma der Seele in der Himmelskarte des exakten Geburtsmoments.",
        "Dein Geburtshoroskop ist keine Unterhaltung. Es ist ein präziser Spiegel deiner Neigungen, Talente, Herausforderungen und Zeiten — das Werkzeug, mit dem Weise seit Jahrtausenden die wichtigsten Entscheidungen des Lebens begleiten.",
      ],
      diffTitle: "Worin unterscheidet sie sich von der westlichen Astrologie?",
      diffs: [
        "Sie nutzt den siderischen Tierkreis — die reale Position der Sternbilder. Die meisten entdecken, dass ihr vedisches Zeichen vom westlichen abweicht.",
        "Sie liest drei Säulen statt einer: Aszendent (Lagna), Mondzeichen und Geburtsstern (Nakshatra) — 27 Mondhäuser, die die westliche Astrologie nicht kennt.",
        "Sie prognostiziert über Planetenperioden (Dashas): ein präzises Timing-System, das nicht nur was, sondern wann sagt.",
        "Sie bietet traditionelle Heilmittel — Edelsteine, Mantras, Observanzen — um bewusst mit dem eigenen Horoskop zu arbeiten.",
      ],
    },
    discover: {
      title: "Was dein Horoskop offenbaren kann",
      items: ["Persönlichkeit und inneres Wesen", "Lebenszweck", "Talente und Stärken", "Herausforderungen und ihr Umgang", "Beziehungen", "Ehe", "Beruf und Berufung", "Wohlstand", "Gesundheitliche Neigungen", "Planetenperioden — dein Timing", "Traditionelle Empfehlungen"],
    },
    why: {
      title: "Warum Tulsi",
      items: [
        { title: "Authentische Tradition", body: "Analyse verwurzelt in den klassischen Texten — Brihat Parashara Hora Shastra, Phala Dipika, Brihat Jataka — zitiert in deinem Report." },
        { title: "Jedes Horoskop ist einzigartig", body: "Deine Deutung wird speziell aus deinen exakten Geburtsdaten erstellt — niemals aus einer Vorlage." },
        { title: "Eine lebendige Tradition", body: "Jyotish begleitet Suchende seit Jahrtausenden; jede Tulsi-Deutung arbeitet in dieser ununterbrochenen Tradition." },
        { title: "Wahrhaft persönlich", body: "Keine Vorlagen. Dein Report wird für dich und über dich geschrieben — bis hin zum persönlichen Schlussbrief." },
        { title: "Lieferung in 24 Stunden", body: "Dein vollständiger Report kommt als PDF per E-Mail innerhalb von 24 Stunden nach Zahlungsbestätigung." },
        { title: "Völlig vertraulich", body: "Deine Geburtsdaten und deine Deutung bleiben streng privat, immer." },
      ],
    },
    how: {
      title: "So funktioniert es",
      steps: [
        { title: "Teile deine Geburtsdaten", body: "Fülle das Formular mit Datum, exakter Uhrzeit und Geburtsort aus. Zwei Minuten." },
        { title: "Erhalte deinen Zahlungslink", body: "Innerhalb weniger Stunden senden wir dir per E-Mail einen sicheren PayPal-Zahlungslink." },
        { title: "Deine Deutung wird erstellt", body: "Nach Zahlungsbestätigung wird deine vollständige Deutung aus deinen exakten Geburtsdaten erstellt." },
        { title: "Erhalte deinen Report", body: "Innerhalb von 24 Stunden landet dein persönliches Horoskop als PDF in deinem Postfach." },
      ],
    },
    receive: {
      title: "Was du erhältst",
      note: "Eine vollständige Life-Management-Lesung — üblicherweise 15–25 Seiten, im klassischen Stil.",
      items: ["Dein Aszendent (Lagna) — mit klassischen Zitaten", "Dein Mondzeichen und seine Würden", "Dein Nakshatra (Geburtsstern), Gottheit und Symbol", "Alle neun Planeten, Haus für Haus", "Deine Planetenkombinationen (Yogas)", "Sade Sati — Saturns große Zyklen, datiert", "Vimshottari Dasha — die großen Perioden deines Lebens", "Die nächsten zehn Jahre, Periode für Periode", "Beruf, Beziehungen und Ehe", "Stärken, Herausforderungen und Lebenszweck", "Traditionelle Heilmittel, für dich gewählt", "Ein persönlicher Schlussbrief"],
    },
    faq: {
      title: "Häufige Fragen",
      items: [
        { q: "Wie wird mein Horoskop erstellt?", a: "Individuell, aus deinen exakten Geburtsdaten und nach den klassischen Texten der Jyotish-Tradition. Keine zwei Deutungen gleichen sich." },
        { q: "Wie lange dauert es?", a: "Dein Report wird innerhalb von 24 Stunden nach Zahlungsbestätigung geliefert." },
        { q: "Was, wenn ich meine Geburtszeit nicht kenne?", a: "Vermerke es im Formular — wir prüfen deinen Fall individuell. Der Aszendent wechselt alle zwei Stunden; wir arbeiten ggf. von der Mondkarte aus oder besprechen eine Rektifikation." },
        { q: "Wie bezahle ich?", a: "Nach dem Absenden des Formulars mailen wir dir einen sicheren PayPal-Zahlungslink. Auf dieser Website wird nichts abgebucht." },
        { q: "Sind meine Daten privat?", a: "Ja. Deine Geburtsdaten und deine Deutung bleiben vollständig vertraulich." },
        { q: "Welcher Tradition folgt ihr?", a: "Klassisches Parashari-Jyotish mit Lahiri-Ayanamsha, in der devotionalen Linie der vedischen Tradition." },
      ],
    },
    cta: {
      title: "Dein Horoskop wartet seit dem Moment deiner Geburt.",
      body: "Eine tiefgründige, persönliche Deutung in der authentischen vedischen Tradition.",
      button: "Mein vedisches Horoskop bestellen",
    },
    form: {
      title: "Bestelle dein persönliches vedisches Horoskop",
      subtitle: "Fülle unten deine Geburtsdaten aus. Wir mailen dir innerhalb weniger Stunden einen sicheren PayPal-Zahlungslink — deine Lesung beginnt nach Zahlungsbestätigung.",
      name: "Vollständiger Name", email: "E-Mail-Adresse", birthDate: "Geburtsdatum", birthTime: "Exakte Geburtszeit",
      timeUnknown: "Ich kenne meine exakte Geburtszeit nicht", city: "Geburtsstadt", country: "Geburtsland",
      comments: "Anmerkungen (optional)", commentsHint: "Alles, was dein Astrologe wissen sollte — konkrete Fragen, Schwerpunkte…",
      consent: "Ich stimme der Verarbeitung meiner Daten zur Erstellung meines Horoskops zu. Siehe Datenschutzerklärung.",
      submit: "Mein Horoskop anfordern", sending: "Wird gesendet…", error: "Etwas ging schief — bitte erneut versuchen.",
      thanksTitle: "Danke.",
      thanksBody: "Deine Angaben sind eingegangen. Innerhalb weniger Stunden erhältst du per E-Mail einen sicheren PayPal-Zahlungslink. Nach Zahlungsbestätigung beginnt die Erstellung deines persönlichen Horoskops. Lieferung: innerhalb von 24 Stunden nach Zahlung.",
    },
  },
  fr: {
    hero: {
      eyebrow: "Jyotish authentique · Depuis des temps immémoriaux",
      title: "Le ciel s'est souvenu de l'instant de votre naissance",
      subtitle: "Une analyse personnalisée de votre thème natal dans l'authentique tradition du Jyotish — livrée sous 24 heures après paiement.",
      cta: "Commander mon horoscope",
      secondary: "Comment ça marche",
    },
    heroTrust: ["Tradition védique authentique", "Chaque lecture préparée individuellement", "Privé & confidentiel", "Livré sous 24 heures"],
    intro: {
      kicker: "Qu'est-ce que l'astrologie védique ?",
      title: "La science de la lumière, plus ancienne que l'histoire.",
      body: [
        "Le Jyotish — « la science de la lumière » — est l'astrologie de l'Inde ancienne, l'un des six membres des Védas. Depuis des millénaires, il lit le karma de l'âme dans la carte du ciel à l'instant exact de la naissance.",
        "Votre thème natal n'est pas un divertissement. C'est un miroir précis de vos tendances, talents, défis et rythmes — l'outil que les sages utilisent depuis des millénaires pour guider les décisions les plus importantes de la vie.",
      ],
      diffTitle: "En quoi diffère-t-elle de l'astrologie occidentale ?",
      diffs: [
        "Elle utilise le zodiaque sidéral — la position réelle des constellations. La plupart découvrent que leur signe védique diffère de leur signe occidental.",
        "Elle lit trois piliers, pas un : votre ascendant (lagna), votre signe lunaire et votre étoile natale (nakshatra) — 27 demeures lunaires inconnues de l'astrologie occidentale.",
        "Elle prédit par périodes planétaires (dashas) : un système de timing précis qui dit non seulement quoi, mais quand.",
        "Elle offre des remèdes traditionnels — gemmes, mantras, observances — pour travailler consciemment avec votre thème.",
      ],
    },
    discover: {
      title: "Ce que votre thème peut révéler",
      items: ["Personnalité et nature intérieure", "But de vie", "Talents et forces", "Défis et comment les traverser", "Relations", "Mariage", "Carrière et vocation", "Richesse et prospérité", "Tendances de santé", "Périodes planétaires — vos rythmes", "Recommandations traditionnelles"],
    },
    why: {
      title: "Pourquoi choisir Tulsi",
      items: [
        { title: "Tradition authentique", body: "Analyse enracinée dans les textes classiques — Brihat Parashara Hora Shastra, Phala Dipika, Brihat Jataka — cités dans votre rapport." },
        { title: "Chaque thème est unique", body: "Votre lecture est préparée spécifiquement à partir de vos données de naissance exactes — jamais à partir d'un modèle." },
        { title: "Une tradition vivante", body: "Le Jyotish guide les chercheurs depuis des millénaires ; chaque lecture Tulsi s'inscrit dans cette tradition ininterrompue." },
        { title: "Véritablement personnel", body: "Aucun modèle. Votre rapport est écrit pour vous et sur vous — jusqu'à sa lettre personnelle de clôture." },
        { title: "Livré sous 24 heures", body: "Votre rapport complet arrive en PDF par e-mail sous 24 heures après confirmation du paiement." },
        { title: "Totalement confidentiel", body: "Vos données de naissance et votre lecture restent strictement privées, toujours." },
      ],
    },
    how: {
      title: "Comment ça marche",
      steps: [
        { title: "Partagez vos données de naissance", body: "Remplissez le formulaire avec votre date, heure exacte et lieu de naissance. Deux minutes." },
        { title: "Recevez votre lien de paiement", body: "Sous quelques heures, nous vous envoyons par e-mail un lien de paiement PayPal sécurisé." },
        { title: "Votre lecture est préparée", body: "Paiement confirmé, votre lecture complète est préparée à partir de vos données de naissance exactes." },
        { title: "Recevez votre rapport", body: "Sous 24 heures, votre horoscope personnalisé arrive en PDF dans votre boîte mail." },
      ],
    },
    receive: {
      title: "Ce que vous recevrez",
      note: "Une lecture complète de gestion de vie — généralement 15 à 25 pages, dans le style classique.",
      items: ["Votre ascendant (Lagna) — avec citations classiques", "Votre signe lunaire et ses dignités", "Votre Nakshatra (étoile natale), divinité et symbole", "Les neuf planètes, maison par maison", "Vos combinaisons planétaires (Yogas)", "Sade Sati — les grands cycles de Saturne, datés", "Vimshottari Dasha — les grandes périodes de votre vie", "Les dix prochaines années, période par période", "Carrière, relations et mariage", "Forces, défis et but de vie", "Remèdes traditionnels choisis pour vous", "Une lettre personnelle de clôture"],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Comment mon horoscope est-il préparé ?", a: "Individuellement, à partir de vos données de naissance exactes et selon les textes classiques de la tradition Jyotish. Il n'existe pas deux lectures identiques." },
        { q: "Combien de temps cela prend-il ?", a: "Votre rapport est livré sous 24 heures après confirmation du paiement." },
        { q: "Et si je ne connais pas mon heure de naissance ?", a: "Indiquez-le dans le formulaire — nous évaluons votre cas individuellement. L'ascendant change toutes les deux heures ; nous pouvons travailler depuis votre carte lunaire ou envisager une rectification." },
        { q: "Comment payer ?", a: "Après l'envoi du formulaire, nous vous envoyons par e-mail un lien de paiement PayPal sécurisé. Rien n'est débité sur ce site." },
        { q: "Mes informations sont-elles privées ?", a: "Oui. Vos données de naissance et votre lecture restent totalement confidentielles." },
        { q: "Quelle tradition suivez-vous ?", a: "Le Jyotish classique Parashari avec l'ayanamsha Lahiri, dans la lignée dévotionnelle de la tradition védique." },
      ],
    },
    cta: {
      title: "Votre thème attend depuis l'instant de votre naissance.",
      body: "Une lecture profonde et personnelle dans l'authentique tradition védique.",
      button: "Commander mon horoscope védique",
    },
    form: {
      title: "Commandez votre horoscope védique personnalisé",
      subtitle: "Complétez vos données de naissance ci-dessous. Nous vous enverrons un lien de paiement PayPal sécurisé sous quelques heures — votre lecture commence après confirmation du paiement.",
      name: "Nom complet", email: "Adresse e-mail", birthDate: "Date de naissance", birthTime: "Heure exacte de naissance",
      timeUnknown: "Je ne connais pas mon heure exacte de naissance", city: "Ville de naissance", country: "Pays de naissance",
      comments: "Commentaires (facultatif)", commentsHint: "Tout ce que votre astrologue devrait savoir — questions précises, domaines d'intérêt…",
      consent: "J'accepte le traitement de mes données pour préparer mon horoscope. Voir la politique de confidentialité.",
      submit: "Demander mon horoscope", sending: "Envoi…", error: "Une erreur est survenue — réessayez.",
      thanksTitle: "Merci.",
      thanksBody: "Vos informations ont bien été reçues. Sous quelques heures, vous recevrez par e-mail un lien de paiement PayPal sécurisé. Une fois le paiement confirmé, la préparation de votre horoscope personnalisé commencera. Livraison : sous 24 heures après paiement.",
    },
  },
  it: {
    hero: {
      eyebrow: "Jyotish autentico · Da tempo immemorabile",
      title: "Il cielo ha ricordato il momento in cui sei nato",
      subtitle: "Un'analisi personalizzata del tuo tema natale nell'autentica tradizione del Jyotish — consegnata entro 24 ore dal pagamento.",
      cta: "Ordina il mio oroscopo",
      secondary: "Come funziona",
    },
    heroTrust: ["Tradizione vedica autentica", "Ogni lettura preparata individualmente", "Privato e riservato", "Consegna in 24 ore"],
    intro: {
      kicker: "Cos'è l'astrologia vedica?",
      title: "La scienza della luce, più antica della storia.",
      body: [
        "Il Jyotish — «la scienza della luce» — è l'astrologia dell'India antica, uno dei sei rami dei Veda. Da millenni legge il karma dell'anima nella mappa del cielo dell'istante esatto della nascita.",
        "Il tuo tema natale non è intrattenimento. È uno specchio preciso delle tue tendenze, talenti, sfide e tempi — lo strumento con cui i saggi guidano da millenni le decisioni più importanti della vita.",
      ],
      diffTitle: "In cosa differisce dall'astrologia occidentale?",
      diffs: [
        "Usa lo zodiaco siderale — la posizione reale delle costellazioni. La maggior parte scopre che il proprio segno vedico differisce da quello occidentale.",
        "Legge tre pilastri, non uno: l'ascendente (lagna), il segno lunare e la stella natale (nakshatra) — 27 dimore lunari sconosciute all'astrologia occidentale.",
        "Predice tramite periodi planetari (dasha): un sistema di tempi preciso che dice non solo cosa, ma quando.",
        "Offre rimedi tradizionali — gemme, mantra e osservanze — per lavorare consapevolmente con il proprio tema.",
      ],
    },
    discover: {
      title: "Cosa può rivelare il tuo tema",
      items: ["Personalità e natura interiore", "Scopo della vita", "Talenti e punti di forza", "Sfide e come affrontarle", "Relazioni", "Matrimonio", "Carriera e vocazione", "Ricchezza e prosperità", "Tendenze di salute", "Periodi planetari — i tuoi tempi", "Raccomandazioni tradizionali"],
    },
    why: {
      title: "Perché scegliere Tulsi",
      items: [
        { title: "Tradizione autentica", body: "Analisi radicata nei testi classici — Brihat Parashara Hora Shastra, Phala Dipika, Brihat Jataka — citati nel tuo rapporto." },
        { title: "Ogni tema è unico", body: "La tua lettura è preparata specificamente dai tuoi dati di nascita esatti — mai da un modello." },
        { title: "Una tradizione vivente", body: "Il Jyotish guida i cercatori da millenni; ogni lettura Tulsi opera in quella tradizione ininterrotta." },
        { title: "Davvero personale", body: "Nessun modello. Il tuo rapporto è scritto per te e su di te — fino alla lettera personale di chiusura." },
        { title: "Consegna in 24 ore", body: "Il tuo rapporto completo arriva in PDF via email entro 24 ore dalla conferma del pagamento." },
        { title: "Totalmente riservato", body: "I tuoi dati di nascita e la tua lettura restano strettamente privati, sempre." },
      ],
    },
    how: {
      title: "Come funziona",
      steps: [
        { title: "Condividi i tuoi dati di nascita", body: "Compila il modulo con data, ora esatta e luogo di nascita. Due minuti." },
        { title: "Ricevi il link di pagamento", body: "Entro poche ore ti inviamo via email un link di pagamento PayPal sicuro." },
        { title: "La tua lettura viene preparata", body: "Confermato il pagamento, la tua lettura completa viene preparata dai tuoi dati di nascita esatti." },
        { title: "Ricevi il tuo rapporto", body: "Entro 24 ore, il tuo oroscopo personalizzato arriva in PDF nella tua casella." },
      ],
    },
    receive: {
      title: "Cosa riceverai",
      note: "Una lettura completa di gestione della vita — di norma 15–25 pagine, in stile classico.",
      items: ["Il tuo ascendente (Lagna) — con citazioni classiche", "Il tuo segno lunare e le sue dignità", "Il tuo Nakshatra (stella natale), divinità e simbolo", "I nove pianeti, casa per casa", "Le tue combinazioni planetarie (Yoga)", "Sade Sati — i grandi cicli di Saturno, datati", "Vimshottari Dasha — i grandi periodi della tua vita", "I prossimi dieci anni, periodo per periodo", "Carriera, relazioni e matrimonio", "Punti di forza, sfide e scopo di vita", "Rimedi tradizionali scelti per te", "Una lettera personale di chiusura"],
    },
    faq: {
      title: "Domande frequenti",
      items: [
        { q: "Come viene preparato il mio oroscopo?", a: "Individualmente, dai tuoi dati di nascita esatti e secondo i testi classici della tradizione Jyotish. Non esistono due letture uguali." },
        { q: "Quanto tempo richiede?", a: "Il rapporto è consegnato entro 24 ore dalla conferma del pagamento." },
        { q: "E se non conosco la mia ora di nascita?", a: "Indicalo nel modulo — valutiamo il tuo caso individualmente. L'ascendente cambia ogni due ore; possiamo lavorare dalla carta lunare o valutare una rettifica." },
        { q: "Come pago?", a: "Dopo l'invio del modulo ti mandiamo via email un link di pagamento PayPal sicuro. Su questo sito non viene addebitato nulla." },
        { q: "I miei dati sono privati?", a: "Sì. I tuoi dati di nascita e la tua lettura restano completamente riservati." },
        { q: "Quale tradizione seguite?", a: "Jyotish classico Parashari con ayanamsha Lahiri, nella linea devozionale della tradizione vedica." },
      ],
    },
    cta: {
      title: "Il tuo tema aspetta dal momento in cui sei nato.",
      body: "Una lettura profonda e personale nell'autentica tradizione vedica.",
      button: "Ordina il mio oroscopo vedico",
    },
    form: {
      title: "Ordina il tuo oroscopo vedico personalizzato",
      subtitle: "Completa i tuoi dati di nascita qui sotto. Ti invieremo un link di pagamento PayPal sicuro entro poche ore — la tua lettura inizia alla conferma del pagamento.",
      name: "Nome completo", email: "Indirizzo email", birthDate: "Data di nascita", birthTime: "Ora esatta di nascita",
      timeUnknown: "Non conosco la mia ora esatta di nascita", city: "Città di nascita", country: "Paese di nascita",
      comments: "Commenti (facoltativo)", commentsHint: "Tutto ciò che il tuo astrologo dovrebbe sapere — domande specifiche, aree di interesse…",
      consent: "Accetto il trattamento dei miei dati per preparare il mio oroscopo. Vedi l'informativa privacy.",
      submit: "Richiedi il mio oroscopo", sending: "Invio…", error: "Qualcosa è andato storto — riprova.",
      thanksTitle: "Grazie.",
      thanksBody: "Le tue informazioni sono state ricevute. Entro poche ore riceverai via email un link di pagamento PayPal sicuro. Confermato il pagamento, inizierà la preparazione del tuo oroscopo personalizzato. Consegna: entro 24 ore dal pagamento.",
    },
  },
};
