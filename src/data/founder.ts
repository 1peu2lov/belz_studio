export const founderIntro = {
  eyebrow: "Le fondateur",
  title: "Pourquoi j’ai créé Belz Studio",
  paragraphs: [
    "Je suis designer et développeur. J’ai lancé Belz Studio pour une raison simple : les petites entreprises et auto-entrepreneurs méritent un site propre, moderne et clair — sans le prix ni la complexité d’une grosse agence.",
    "Trop souvent, on propose des solutions surdimensionnées à des structures qui ont surtout besoin d’être visibles, crédibles et efficaces. Belz Studio, c’est l’inverse : des offres simples (comme un site vitrine), une direction jeune et pro, et des tarifs pensés pour ta réalité.",
    "Basé à Bordeaux, je travaille aussi à distance. L’idée : t’accompagner franchement, livrer quelque chose de soigné, et te laisser un outil digital qui sert vraiment ton activité.",
  ],
  highlights: [
    {
      id: "expertise",
      label: "Expertise",
      icon: "spark" as const,
    },
    {
      id: "approche",
      label: "Approche simple",
      icon: "layers" as const,
    },
    {
      id: "prix",
      label: "Prix adaptés",
      icon: "tag" as const,
    },
    {
      id: "reactivite",
      label: "Réactivité",
      icon: "bolt" as const,
    },
    {
      id: "accompagnement",
      label: "Accompagnement",
      icon: "handshake" as const,
    },
    {
      id: "qualite",
      label: "Qualité pro",
      icon: "check" as const,
    },
  ],
  /** Remplace par ta photo (jpg/png) si besoin */
  portraitSrc: "/about/portrait.svg",
  portraitAlt: "Portrait du fondateur de Belz Studio",
} as const;

export type FounderHighlightIcon = (typeof founderIntro.highlights)[number]["icon"];
