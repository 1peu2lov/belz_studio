export type ServiceItem = {
  id: string;
  label: string;
  tone: "petrol" | "deep" | "mist" | "ember" | "slate" | "grove" | "ink";
};

/** Liste courte pour la home (hover showcase). */
export const services: ServiceItem[] = [
  {
    id: "identite-visuelle",
    label: "Identité visuelle",
    tone: "petrol",
  },
  {
    id: "strategie-de-marque",
    label: "Stratégie de marque",
    tone: "deep",
  },
  {
    id: "design-ui",
    label: "Design UI",
    tone: "mist",
  },
  {
    id: "sites-web",
    label: "Sites web",
    tone: "ember",
  },
  {
    id: "direction-artistique",
    label: "Direction artistique",
    tone: "slate",
  },
  {
    id: "contenu-digital",
    label: "Contenu digital",
    tone: "grove",
  },
  {
    id: "accompagnement",
    label: "Accompagnement",
    tone: "ink",
  },
];

export type ServiceDomain = {
  id: string;
  label: string;
  description: string;
};

/** Domaines présentés sur la page Services. */
export const serviceDomains: ServiceDomain[] = [
  {
    id: "sites-vitrine",
    label: "Sites vitrine",
    description:
      "Des sites clairs, rapides et soignés pour présenter ton activité sans superflu.",
  },
  {
    id: "web-design",
    label: "Web design",
    description:
      "Interfaces nettes, hiérarchie lisible, expérience pensée pour tes clients.",
  },
  {
    id: "identite-visuelle",
    label: "Identité visuelle",
    description:
      "Logo, couleurs, typo et bases de marque pour être crédible dès le premier regard.",
  },
  {
    id: "direction-artistique",
    label: "Direction artistique",
    description:
      "Une ligne visuelle cohérente pour ton site, tes supports et ta communication.",
  },
  {
    id: "accompagnement",
    label: "Accompagnement",
    description:
      "Conseils concrets pour avancer vite, sans jargon ni process d’agence lourds.",
  },
];

export type ServiceFormula = {
  id: string;
  name: string;
  summary: string;
  priceLabel: string;
  includes: string[];
};

/** Formules — détails et tarifs à préciser plus tard. */
export const serviceFormulas: ServiceFormula[] = [
  {
    id: "vitrine",
    name: "Site vitrine",
    summary:
      "L’offre phare pour démarrer : un site simple, pro et efficace.",
    priceLabel: "Tarif à venir",
    includes: [
      "Structure & maquettes",
      "Intégration responsive",
      "Mise en ligne",
      "Bases SEO",
    ],
  },
  {
    id: "identite-site",
    name: "Identité + site",
    summary:
      "Marque et présence web alignées, pour une image cohérente de bout en bout.",
    priceLabel: "Tarif à venir",
    includes: [
      "Identité de base",
      "Site vitrine",
      "Déclinaisons clés",
      "Livrables prêts à l’emploi",
    ],
  },
  {
    id: "accompagnement",
    name: "Accompagnement",
    summary:
      "Un suivi ponctuel ou régulier pour t’aider à décider et avancer.",
    priceLabel: "Tarif à venir",
    includes: [
      "Sessions conseil",
      "Relectures & retours",
      "Priorisation claire",
      "Recommandations actionnables",
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
    title: "Échange",
    description:
      "On clarifie ton besoin, ta cible et ton budget. Court, franc, sans formulaire à rallonge.",
  },
  {
    step: 2,
    title: "Direction",
    description:
      "Je pose une direction visuelle et une structure. Tu valides avant qu’on construise.",
  },
  {
    step: 3,
    title: "Conception",
    description:
      "Design puis intégration. On itère sur l’essentiel, pas sur 40 versions inutiles.",
  },
  {
    step: 4,
    title: "Livraison",
    description:
      "Mise en ligne, prises en main, et un site prêt à servir ton activité.",
  },
];
