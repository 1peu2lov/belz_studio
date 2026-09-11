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
    "Du premier logo à la mise en ligne, je t’aide à donner forme à ton projet. Du design et du développement web pour les petites entreprises et les auto-entrepreneurs qui veulent affirmer leur présence.",
  domainsTitle: "Ton savoir-faire mérite de se voir.",
  formulasTitle: "À chaque projet, son point de départ.",
  formulasLead:
    "Tu lances ton activité, tu repenses ton image ou tu souhaites améliorer l’existant ? Voici trois façons de travailler ensemble. Chaque projet est chiffré sur devis, après un premier échange sur tes besoins et ton budget.",
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
      "Un site qui donne envie de découvrir ton activité et facilite la prise de contact. Je conçois et développe ton site autour de ton contenu, de ton identité et des besoins de tes visiteurs, sur ordinateur comme sur mobile.",
  },
  {
    id: "web-design",
    label: "Web design",
    description:
      "Donner du caractère à ton site tout en rendant la navigation naturelle. Je travaille les maquettes, l’organisation des contenus et les interactions pour que tes visiteurs trouvent facilement ce qu’ils cherchent.",
  },
  {
    id: "identite-visuelle",
    label: "Identité visuelle",
    description:
      "Mettre une image sur ce qui rend ton projet unique. Logo, couleurs, typographies : je crée un univers visuel que tu peux t’approprier et faire vivre sur tous tes supports.",
  },
  {
    id: "supports-communication",
    label: "Supports de communication",
    description:
      "Prolonger ton univers au-delà du site. Templates Instagram, cartes de visite, flyers ou visuels numériques : des supports cohérents avec ton identité, pensés pour tes usages au quotidien.",
  },
  {
    id: "maintenance-accompagnement",
    label: "Maintenance & accompagnement",
    description:
      "Un projet continue de vivre après sa mise en ligne. Je peux t’aider à entretenir ton site, faire évoluer ses contenus ou ajouter de nouvelles pages selon tes besoins.",
  },
];

export type ServiceFormula = {
  id: string;
  name: string;
  summary: string;
  priceLabel: string;
  includes: string[];
};

/** Formules — chaque projet est chiffré sur devis. */
export const serviceFormulas: ServiceFormula[] = [
  {
    id: "activite-en-ligne",
    name: "Ton activité en ligne",
    summary:
      "Pour présenter ce que tu fais, valoriser ton savoir-faire et permettre à tes futurs clients de te contacter.",
    priceLabel: "Site vitrine · Sur devis",
    includes: [
      "Organisation des pages et des contenus",
      "Maquettes personnalisées",
      "Développement adapté aux mobiles et aux ordinateurs",
      "Bases du référencement naturel",
      "Mise en ligne et prise en main",
    ],
  },
  {
    id: "univers-a-toi",
    name: "Un univers à toi",
    summary:
      "Pour lancer ton projet ou lui donner un nouveau départ, avec une identité reconnaissable et un site qui la prolonge.",
    priceLabel: "Identité visuelle + site · Sur devis",
    includes: [
      "Création du logo et de ses déclinaisons",
      "Palette de couleurs et sélection typographique",
      "Guide d’utilisation de ton identité",
      "Conception et développement du site vitrine",
      "Fichiers prêts à utiliser pour ta communication",
    ],
  },
  {
    id: "suite-projet",
    name: "La suite de ton projet",
    summary:
      "Pour garder ton site à jour et faire évoluer ta communication au rythme de ton activité. Une intervention ponctuelle ou un suivi régulier, selon ce dont tu as besoin.",
    priceLabel: "Maintenance & accompagnement · Sur devis",
    includes: [
      "Maintenance technique du site selon son environnement",
      "Mise à jour des contenus et des visuels",
      "Ajout de pages ou de fonctionnalités sur devis",
      "Création de supports et de templates pour les réseaux sociaux",
      "Conseils pour préparer les prochaines évolutions",
    ],
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
    title: "On parle de ton projet",
    description:
      "Tu me présentes ton activité, tes envies et ce que tu aimerais améliorer. On définit ensemble les priorités, le budget et les contours du projet.",
  },
  {
    step: 2,
    title: "Je donne forme aux idées",
    description:
      "Je te propose une direction visuelle et, pour un site, une organisation des pages. On échange sur ces premières pistes pour valider les bases avant d’aller plus loin.",
  },
  {
    step: 3,
    title: "Le projet prend vie",
    description:
      "Je crée les supports ou développe le site à partir de la direction validée. Tu suis les avancées et on prévoit des temps de retour pour affiner le résultat ensemble.",
  },
  {
    step: 4,
    title: "À toi de le faire vivre",
    description:
      "Je te remets les fichiers, mets ton site en ligne et t’explique comment utiliser ce qui a été prévu pour toi. On peut ensuite poursuivre avec un accompagnement adapté à tes besoins.",
  },
];
