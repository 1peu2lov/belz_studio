import type { Project } from "@/data/projectTypes";

const DIR = "/Projets/PoésieDeLâme";

/**
 * Contenu éditorial du projet Poésie de l’Âme.
 * Modifie ce fichier pour ajuster textes, médias et ordre des sections.
 */
export const poesieDeLameProject: Project = {
  slug: "poesie-de-lame",
  title: "Poésie de l’Âme",
  subtitle: "Un univers dédié au yoga, à la diététique et au bien-être.",
  cardDescription:
    "Un univers dédié au yoga, à la diététique et au bien-être.",
  cardServices: "Identité visuelle · Webdesign · Développement",
  tags: ["identite-visuelle", "web-design", "site-web", "direction-artistique"],
  tone: "mist",
  completedAt: null,
  seoDescription:
    "Identité visuelle et site web pour Poésie de l’Âme — yoga, diététique et bien-être par Cindy Belz.",
  card: {
    image: {
      src: `${DIR}/Poesie_de_lame_card.jpg`,
      alt: "Aperçu du projet Poésie de l’Âme",
    },
    hoverVideo: `${DIR}/video_site_navigation.mp4`,
  },
  sections: [
    {
      type: "intro",
      title: "Poésie de l’Âme",
      presentation:
        "Une identité et une expérience web pour réunir les pratiques de yoga, de diététique et de bien-être de Cindy Belz.",
      visual: {
        src: `${DIR}/Poesie_de_lame_card.jpg`,
        alt: "Visuel principal du projet Poésie de l’Âme",
      },
    },
    {
      type: "meta",
      fields: [
        { label: "Cliente", value: "Cindy Belz" },
        {
          label: "Activité",
          value: "Professeure de yoga et diététicienne",
        },
        {
          label: "Prestations",
          value:
            "Identité visuelle, direction artistique, webdesign et développement",
        },
        {
          label: "Livrables",
          value: "Logo, charte graphique, site web et templates Instagram",
        },
      ],
    },
    {
      type: "split-text",
      title: "Contexte et objectif",
      body: "Cindy Belz souhaitait réunir ses différentes pratiques sous un même univers. Poésie de l’Âme est née de cette volonté de donner une identité commune à ses activités et de présenter clairement ses cours, ateliers et retraites. Le projet associe la création d’une identité visuelle à la conception d’un site qui facilite la découverte de son offre.",
    },
    {
      type: "portrait-row",
      title: "Identité visuelle",
      body: "L’identité repose sur un équilibre entre structure et fluidité. Les lignes droites et ondulées, les teintes douces et les choix typographiques composent un univers pensé pour relier les différentes pratiques de la marque.",
      video: {
        src: `${DIR}/Composition 1_5.mp4`,
        poster: `${DIR}/Mockup.png`,
        alt: "Animation de l’identité visuelle Poésie de l’Âme",
        autoplay: true,
      },
      sideMedia: [
        {
          src: `${DIR}/Mockup.png`,
          alt: "Cartes de visite Poésie de l’Âme — logo PA et charte visuelle",
          fit: "contain",
        },
      ],
    },
    {
      type: "split-text",
      title: "Expérience web",
      body: "Le site prolonge cet univers et organise les différentes activités pour aider les visiteurs à découvrir les pratiques proposées, consulter les informations et accéder aux possibilités de réservation.",
    },
    {
      type: "full-bleed",
      title: "Supports de communication",
      body: "Templates Instagram et déclinaisons pour accompagner le lancement et la présence de la marque au quotidien.",
      media: {
        src: `${DIR}/phones.png`,
        alt: "Templates Instagram Poésie de l’Âme — stories et publication",
        fit: "contain",
        maxWidth: "md",
      },
    },
    {
      type: "outcome",
      title: "Le site web",
      video: {
        src: `${DIR}/video_site_navigation.mp4`,
        poster: `${DIR}/Poesie_de_lame_card.jpg`,
        alt: "Vidéo de navigation du site Poésie de l’Âme",
      },
      siteUrl: "https://www.poesiedelame.com/",
      siteLabel: "Voir le site",
    },
  ],
};
