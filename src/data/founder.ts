export const founderIntro = {
  eyebrow: "Le fondateur",
  title: "Pourquoi j’ai créé Belz Studio",
  paragraphs: [
    "Je suis Freddy, développeur web et directeur artistique indépendant. J’ai créé Belz Studio avec une idée en tête : une petite entreprise peut avoir une grande personnalité, et ça doit se voir.",
    "Les indépendants et les petites entreprises portent des projets qui méritent d’être connus. Mon envie, c’est de leur donner les moyens de se démarquer, avec une identité qui leur ressemble et un site qui donne envie de découvrir ce qu’ils font. Belz Studio, c’est là que je réunis le design et le développement pour donner forme à ces ambitions. Des projets pensés ensemble, adaptés à tes moyens et à ce que tu veux construire.",
    "Basé à Bordeaux, je t’accompagne ici ou à distance, avec la même envie : créer quelque chose dont tu seras fier et qui aidera ton activité à grandir."
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
  /** Photo de profil */
  portraitSrc: "/Profil/profil3.jpg",
  portraitAlt: "Portrait du fondateur de Belz Studio",
} as const;

export type FounderHighlightIcon = (typeof founderIntro.highlights)[number]["icon"];
