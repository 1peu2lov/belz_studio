import type { Project } from "@/data/projectTypes";

const DIR = "/Projets/NADS";

/**
 * Projet NADS — en cours.
 * Contenu volontairement minimal jusqu’à livraison.
 */
export const nadsProject: Project = {
  slug: "nads",
  title: "NADS",
  subtitle: "Projet en cours.",
  cardDescription: "Projet en cours.",
  cardServices: "En cours",
  tags: ["en-cours"],
  status: "in-progress",
  tone: "deep",
  completedAt: null,
  seoDescription: "NADS — projet Belz Studio en cours.",
  card: {
    image: {
      src: `${DIR}/NADS_card.svg`,
      alt: "NADS — projet en cours",
    },
  },
};
