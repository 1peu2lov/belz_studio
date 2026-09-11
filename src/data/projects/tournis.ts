import type { Project } from "@/data/projectTypes";

const DIR = "/Projets/Tournis";

/**
 * Contenu éditorial du projet Tournis.
 * Modifie ce fichier pour ajuster textes, médias et ordre des sections.
 */
export const tournisProject: Project = {
  slug: "tournis",
  title: "Tournis",
  subtitle:
    "Refonte graphique et site web pour une joaillerie bordelaise — projet fictif.",
  cardDescription:
    "UX/UI et développement web pour la refonte d’une joaillerie bordelaise, en collaboration sur l’identité visuelle.",
  cardServices: "UX/UI · Développement web · Identité visuelle (collab.)",
  tags: ["web-design", "site-web", "identite-visuelle", "refonte"],
  tone: "deep",
  completedAt: null,
  seoDescription:
    "Tournis — refonte UX/UI et site web d’une joaillerie à Bordeaux, en collaboration avec LP Design sur l’identité visuelle. Projet fictif.",
  card: {
    image: {
      src: `${DIR}/Brandboard.png`,
      alt: "Brandboard Tournis — identité visuelle",
    },
    hoverVideo: `${DIR}/siteweb_tournis_video.mp4`,
  },
  sections: [
    {
      type: "intro",
      title: "Tournis",
      presentation:
        "Une refonte graphique pour Tournis, joaillerie située à Bordeaux : identité visuelle soignée, supports print, expérience digitale et site web. Projet fictif.",
      visual: {
        src: `${DIR}/logo-entier.svg`,
        alt: "Logo Tournis Joaillerie — depuis 1896",
        fit: "contain",
        maxWidth: "sm",
      },
    },
    {
      type: "meta",
      fields: [
        { label: "Marque", value: "Tournis" },
        {
          label: "Activité",
          value: "Joaillerie — Bordeaux",
        },
        {
          label: "Nature",
          value: "Projet fictif — refonte graphique",
        },
        {
          label: "Rôle Belz Studio",
          value: "Design UX/UI · Développement web",
        },
        {
          label: "Collaboration",
          value:
            "LP Design (@lp.designn) — design graphique, logo, identité visuelle",
          href: "https://www.instagram.com/lp.designn/",
        },
        {
          label: "Prestations",
          value: "Identité visuelle · Supports print · UX/UI · Site web",
        },
        {
          label: "Livrables",
          value:
            "Logo, brandboard, papeterie, brochure, présence Pinterest et site web",
        },
      ],
    },
    {
      type: "split-text",
      title: "Contexte et objectif",
      body: "Tournis est une maison de joaillerie imaginaire située à Bordeaux. Le brief : poser une refonte graphique complète — de l’identité à la présence digitale — dans un univers élégant, intemporel et affirmé. Le projet s’est construit à deux. LP Design a porté la conception du logo, du brandboard et de l’identité visuelle. Belz Studio a pris en charge le design UX/UI et le développement du site web, pour traduire cette identité en expérience navigable.",
    },
    {
      type: "full-bleed",
      title: "Identité visuelle",
      body: "Logo, typographie, palette marine et or, motif et applications : le brandboard pose le langage de la marque. Conception identité visuelle : LP Design (@lp.designn). Ce socle a servi de base aux supports print, au design d’interface et au développement du site.",
      media: {
        src: `${DIR}/Brandboard.png`,
        alt: "Brandboard Tournis — logo, typo, couleurs, mockups et pattern",
        fit: "contain",
      },
    },
    {
      type: "pair",
      media: [
        {
          src: `${DIR}/mockup-cartedevisite.png`,
          alt: "Cartes de visite Tournis — recto logo et verso coordonnées Bordeaux",
          fit: "cover",
        },
        {
          src: `${DIR}/mockup-invitation.png`,
          alt: "Papeterie Maison Tournis — chemise, invitation et lettre",
          fit: "cover",
        },
      ],
    },
    {
      type: "full-bleed",
      title: "Brochure",
      body: "Un livret dépliable pour raconter la maison, le savoir-faire et les créations — du geste de l’atelier aux pièces joaillières.",
      media: {
        src: `${DIR}/mockup-brochure.jpg`,
        alt: "Brochure dépliable Tournis Joaillerie",
        fit: "contain",
      },
    },
    {
      type: "full-bleed",
      title: "Présence digitale",
      body: "L’identité se prolonge sur Pinterest : boards, ton éditorial et univers visuel pour prolonger la maison au quotidien.",
      media: {
        src: `${DIR}/mockup-pinterest.png`,
        alt: "Profil Pinterest Tournis — boards et identité digitale",
        fit: "contain",
      },
    },
    {
      type: "split-text",
      title: "UX / UI et développement web",
      body: "À partir de cette identité, le travail UX/UI a structuré le parcours : présenter la maison, les collections et le contact dans une interface claire, calme et premium. Le développement web a ensuite matérialisé ces écrans — pour que le site porte la même exigence que le bijou : lisibilité, rythme et finition.",
    },
    {
      type: "outcome",
      title: "Le site web",
      video: {
        src: `${DIR}/siteweb_tournis_video.mp4`,
        poster: `${DIR}/Brandboard.png`,
        alt: "Parcours du site web Tournis",
      },
      siteUrl: "https://tournis.netlify.app/",
      siteLabel: "Voir le site",
    },
    {
      type: "contact",
      title: "Un projet joaillerie, branding ou site web ?",
      buttonLabel: "Parlons de votre projet",
      href: "/contact",
    },
  ],
};
