export type ServiceItem = {
  id: string;
  label: string;
  tone: "petrol" | "deep" | "mist" | "ember" | "slate" | "grove" | "ink";
  /** Visuel hover (PNG transparent recommandé). */
  image?: {
    src: string;
    alt: string;
  };
};

/** Liste courte pour la home (hover showcase). */
export const services: ServiceItem[] = [
  {
    id: "sites-web",
    label: "Sites web sur mesure",
    tone: "ember",
    image: {
      src: "/services/sitewebs_image.png",
      alt: "Mockup responsive — sites web sur mesure",
    },
  },
  {
    id: "web-design",
    label: "Web design",
    tone: "mist",
    image: {
      src: "/services/webdesign_image.jpg",
      alt: "Direction web design — maquettes et interface",
    },
  },
  {
    id: "identite-visuelle",
    label: "Identité visuelle",
    tone: "petrol",
    image: {
      src: "/services/identite_visuelle_image.jpg",
      alt: "Identité visuelle — logo et univers de marque",
    },
  },
  {
    id: "supports-communication",
    label: "Supports de communication",
    tone: "slate",
    image: {
      src: "/services/Communication_image.png",
      alt: "Supports de communication — print et digital",
    },
  },
  {
    id: "maintenance-accompagnement",
    label: "Maintenance & accompagnement",
    tone: "ink",
    image: {
      src: "/services/maintenance.jpg",
      alt: "Maintenance et accompagnement — suivi de projet",
    },
  },
];

export const servicesPage = {
  title: "Services",
  lead:
    "Des sites codés à la main pour les indépendants et les petites entreprises. Je conçois votre identité et votre site, du premier croquis à la mise en ligne.",
  domainsTitle: "Votre savoir-faire mérite de se voir.",
  formulasTitle: "Offres et tarifs",
  formulasLead:
    "Des forfaits clairs et adaptés aux TPE, avec des prix \"à partir de\". L’offre de lancement est réservée aux 5 premiers clients, en échange d’un témoignage et d’un avis Google.",
  processTitle: "De l’idée à la mise en ligne.",
} as const;

export type ServiceDomain = {
  id: string;
  label: string;
  description: string;
};

/** Domaines présentés sur la page Services. */
export const serviceDomains: ServiceDomain[] = [
  {
    id: "sites-web",
    label: "Sites web sur mesure",
    description:
      "Un site qui donne envie de découvrir votre activité et facilite la prise de contact. Je conçois et développe votre site autour de vos contenus, de votre identité et des besoins de vos visiteurs, sur ordinateur comme sur mobile.",
  },
  {
    id: "web-design",
    label: "Web design",
    description:
      "Donner du caractère à votre site tout en rendant la navigation naturelle. Je travaille les maquettes, l’organisation des contenus et les interactions pour que vos visiteurs trouvent facilement ce qu’ils cherchent.",
  },
  {
    id: "identite-visuelle",
    label: "Identité visuelle",
    description:
      "Mettre une image sur ce qui rend votre projet unique. Logo, couleurs, typographies : je crée un univers visuel que vous pouvez vous approprier et faire vivre sur tous vos supports.",
  },
  {
    id: "supports-communication",
    label: "Supports de communication",
    description:
      "Prolonger votre univers au‑delà du site. Templates Instagram, cartes de visite, flyers ou visuels numériques : des supports cohérents avec votre identité, pensés pour vos usages au quotidien.",
  },
  {
    id: "maintenance-accompagnement",
    label: "Maintenance & accompagnement",
    description:
      "Un projet continue de vivre après sa mise en ligne. Je peux vous aider à entretenir votre site, faire évoluer ses contenus ou ajouter de nouvelles pages selon vos besoins.",
  },
];

export type ServiceFormula = {
  id: string;
  name: string;
  summary: string;
  priceLabel: string;
  includes: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

/** Formules principales — affichées avec des prix publics. */
export const serviceFormulas: ServiceFormula[] = [
  {
    id: "presence",
    name: "Présence",
    summary:
      "One‑page codée, claire et efficace pour être trouvé sur Google et réservé en un clic.",
    priceLabel: "1 190 – 1 400 € HT (lancement : 990 €)",
    includes: [
      "Sections essentielles (horaires, tarifs, carte, avis, contact)",
      "Intégration d’un outil de réservation (Planity, Cal.com…)",
      "Création/optimisation de la fiche Google Business Profile",
      "SEO local technique, mentions légales, mise en ligne",
      "1 série de retours + 1 ajustement final",
    ],
    ctaLabel: "Demander Présence",
    ctaHref: "/contact?offre=presence",
  },
  {
    id: "vitrine",
    name: "Vitrine",
    summary:
      "4 à 6 pages sur mesure, avec une interface simple pour mettre à jour vos contenus.",
    priceLabel: "2 200 – 2 800 € HT (lancement : 1 890 €)",
    includes: [
      "Maquette personnalisée (1 direction, 2 séries de retours)",
      "4 à 6 pages (services/tarifs, à propos, réalisations, contact…) ",
      "Interface d’édition (horaires, tarifs, actus, galerie)",
      "1 h de formation, SEO local par page",
    ],
    ctaLabel: "Demander Vitrine",
    ctaHref: "/contact?offre=vitrine",
  },
  {
    id: "univers",
    name: "Univers",
    summary:
      "Identité visuelle essentielle + Vitrine, avec 5 templates Instagram et une carte de visite.",
    priceLabel: "3 900 – 4 800 € HT (lancement : 3 400 €)",
    includes: [
      "Logo + variantes, palette, typos, mini‑guide PDF",
      "Site Vitrine (cf. ci‑dessus)",
      "5 templates Instagram et carte de visite (fichiers prêts à imprimer)",
    ],
    ctaLabel: "Demander Univers",
    ctaHref: "/contact?offre=univers",
  },
  {
    id: "signature",
    name: "Signature",
    summary:
      "Sur‑mesure créatif : direction artistique poussée, motion, 3D/WebGL, vidéo. E‑commerce codé possible.",
    priceLabel: "À partir de 6 000 € HT",
    includes: [
      "Conception créative avancée (motion, micro‑interactions, 3D selon besoin)",
      "Développement Next.js + CMS",
      "Fonctionnalités spécifiques sur devis (ex. e‑commerce headless)",
    ],
    ctaLabel: "Parler de Signature",
    ctaHref: "/contact?offre=signature",
  },
];

export type ServiceProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const serviceProcess: ServiceProcessStep[] = [
  {
    step: 1,
    title: "On parle de votre projet",
    description:
      "Vous me présentez votre activité, vos envies et ce que vous souhaitez améliorer. On définit ensemble les priorités, le budget et les contours du projet.",
  },
  {
    step: 2,
    title: "Je donne forme aux idées",
    description:
      "Je vous propose une direction visuelle et, pour un site, une organisation des pages. On échange sur ces premières pistes pour valider les bases avant d’aller plus loin.",
  },
  {
    step: 3,
    title: "Le projet prend vie",
    description:
      "Je crée les supports ou développe le site à partir de la direction validée. Vous suivez les avancées et on planifie des retours pour affiner le résultat ensemble.",
  },
  {
    step: 4,
    title: "À toi de le faire vivre",
    description:
      "Je vous remets les fichiers, mets votre site en ligne et vous explique comment utiliser ce qui a été prévu pour vous. On peut ensuite poursuivre avec un accompagnement adapté à vos besoins.",
  },
];

export type MaintenancePlan = {
  id: string;
  name: string;
  priceLabel: string;
  includes: string[];
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: "hebergement-veille",
    name: "Hébergement & veille",
    priceLabel: "29 € HT / mois",
    includes: [
      "Hébergement sur l’équipe Vercel Pro",
      "HTTPS, surveillance de disponibilité",
      "Sauvegarde via Git, test mensuel du formulaire",
      "Mises à jour de sécurité trimestrielles",
      "Petite correction (≤ 15 min)",
    ],
  },
  {
    id: "serenite",
    name: "Sérénité",
    priceLabel: "59 € HT / mois",
    includes: [
      "Tout Hébergement & veille",
      "Jusqu’à 1 h de modifications par mois",
      "1 publication Google Business Profile / mois",
      "Intervention sous 48 h ouvrées",
    ],
  },
  {
    id: "croissance",
    name: "Croissance",
    priceLabel: "119 € HT / mois",
    includes: [
      "Tout Sérénité",
      "3 h de modifications par mois",
      "2 publications Google Business Profile / mois",
      "Point trimestriel",
    ],
  },
  {
    id: "a-la-demande",
    name: "À la demande",
    priceLabel: "60 € HT / h (pack 5 h : 270 €)",
    includes: ["Pour les clients sans abonnement"],
  },
];

export const maintenanceNote =
  "Engagement de 3 mois minimum, puis résiliable chaque mois. Les heures non utilisées ne sont pas reportées. Frais tiers (domaine, Planity, Cal.com…) à la charge du client et à son nom.";

export type IdentityOption = {
  id: string;
  name: string;
  priceLabel: string;
  summary: string;
};

export const identityOptions: IdentityOption[] = [
  {
    id: "identite-essentielle",
    name: "Identité essentielle",
    priceLabel: "1 000 – 1 400 € HT",
    summary:
      "Logo + variantes, palette, typos, mini‑guide PDF, exports (SVG, PNG, PDF).",
  },
  {
    id: "identite-complete",
    name: "Identité complète",
    priceLabel: "1 600 – 2 400 € HT",
    summary:
      "Essentielle + charte détaillée, iconographie/photo, 3 déclinaisons (ex. carte, signature mail, flyer).",
  },
];

export const launchOfferNote =
  "Offre de lancement : prix réduits pour les 5 premiers projets signés, en échange d’un témoignage et d’un avis Google. TVA non applicable, art. 293 B du CGI.";
