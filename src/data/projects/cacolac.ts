import type { Project } from "@/data/projectTypes";

const DIR = "/Projets/Cacolac";

/**
 * Contenu éditorial du projet Cacolac.
 * Modifie ce fichier pour ajuster textes, médias et ordre des sections.
 */
export const cacolacProject: Project = {
  slug: "cacolac",
  title: "Cacolac",
  subtitle:
    "Une identité packaging renouvelée pour la marque iconique du lait chocolaté.",
  cardDescription:
    "Une identité packaging renouvelée pour la marque iconique du lait chocolaté.",
  cardServices: "Packaging · Identité visuelle · Direction artistique",
  tags: ["packaging", "identite-visuelle", "direction-artistique", "branding"],
  tone: "deep",
  completedAt: null,
  seoDescription:
    "Refonte packaging et identité visuelle Cacolac — gammes Original, menthe, noisette et lait-fraise.",
  card: {
    image: {
      src: `${DIR}/Logo_cacolac.jpg`,
      alt: "Identité visuelle Cacolac",
    },
    hoverVideo: `${DIR}/cacola_site_video.mp4`,
  },
  sections: [
    {
      type: "intro",
      title: "Cacolac",
      presentation:
        "Une direction artistique et un packaging renouvelés pour faire rayonner la marque autour de ses saveurs et de son héritage.",
      visual: {
        src: `${DIR}/Logo_cacolac.jpg`,
        alt: "Logo et univers graphique Cacolac",
      },
    },
    {
      type: "meta",
      fields: [
        { label: "Marque", value: "Cacolac" },
        {
          label: "Activité",
          value: "Boissons lactées et lait chocolaté",
        },
        {
          label: "Prestations",
          value:
            "Direction artistique, identité visuelle, packaging et supports digitaux",
        },
        {
          label: "Livrables",
          value:
            "Logo, déclinaisons packaging (canettes), posts réseaux sociaux et site",
        },
      ],
    },
    {
      type: "split-text",
      title: "Contexte et objectif",
      body: "Cacolac devait retrouver une présence nette et gourmande, fidèle à son identité chocolatée tout en modernisant le packaging. Le travail porte sur une direction artistique cohérente — typographie, motifs liquides et déclinaisons de saveurs — pour un univers reconnaissable en rayon comme en ligne.",
    },
    {
      type: "full-bleed",
      title: "Identité visuelle",
      body: "Le logo et les motifs fluides ancrent la marque dans un univers chocolaté, chaleureux et immédiatement identifiable.",
      media: {
        src: `${DIR}/Logo_cacolac.jpg`,
        alt: "Logo Cacolac sur fond motif chocolaté",
        fit: "contain",
      },
    },
    {
      type: "grid",
      title: "Packaging",
      body: "Quatre déclinaisons de canettes pour la gamme : Original, menthe, noisette et lait-fraise.",
      variant: "products",
      media: [
        {
          src: `${DIR}/canette_principal.png`,
          alt: "Canette Cacolac Original",
          fit: "contain",
        },
        {
          src: `${DIR}/canette_menthe.png`,
          alt: "Canette Cacolac Menthe",
          fit: "contain",
        },
        {
          src: `${DIR}/canette_noisette.png`,
          alt: "Canette Cacolac Noisette",
          fit: "contain",
        },
        {
          src: `${DIR}/canette_lait-fraise.png`,
          alt: "Canette Cacolac Lait-fraise",
          fit: "contain",
        },
      ],
    },
    {
      type: "grid",
      title: "Supports de communication",
      body: "Posts réseaux sociaux pour prolonger l’univers de la marque au quotidien.",
      media: [
        {
          src: `${DIR}/post_1.jpg`,
          alt: "Post Instagram Cacolac — visuel 1",
          fit: "cover",
        },
        {
          src: `${DIR}/post_2.jpg`,
          alt: "Post Instagram Cacolac — visuel 2",
          fit: "cover",
        },
        {
          src: `${DIR}/post_3.jpg`,
          alt: "Post Instagram Cacolac — visuel 3",
          fit: "cover",
        },
      ],
    },
    {
      type: "outcome",
      title: "Le site web",
      video: {
        src: `${DIR}/cacola_site_video.mp4`,
        poster: `${DIR}/Logo_cacolac.jpg`,
        alt: "Vidéo de navigation du site Cacolac",
      },
      siteUrl: "https://1peu2lov-cacolacsite.vercel.app/",
      siteLabel: "Voir le site",
    },
    {
      type: "contact",
      title: "Un projet à faire grandir ?",
      buttonLabel: "Parlons de votre projet",
      href: "/contact",
    },
  ],
};
