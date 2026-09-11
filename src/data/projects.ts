import { cacolacProject } from "@/data/projects/cacolac";
import { poesieDeLameProject } from "@/data/projects/poesie-de-lame";
import { tournisProject } from "@/data/projects/tournis";
import type {
  Project,
  ProjectMetaField,
  ProjectTag,
} from "@/data/projectTypes";

export type {
  Project,
  ProjectCardMedia,
  ProjectMedia,
  ProjectMetaField,
  ProjectSection,
  ProjectTag,
  ProjectTone,
} from "@/data/projectTypes";

export const projectTagLabels: Record<ProjectTag, string> = {
  "site-web": "Site web",
  "web-design": "Web design",
  branding: "Branding",
  "identite-visuelle": "Identité visuelle",
  "direction-artistique": "Direction artistique",
  refonte: "Refonte",
  packaging: "Packaging",
  editorial: "Éditorial",
};

export const projects: Project[] = [
  poesieDeLameProject,
  cacolacProject,
  tournisProject,
  {
    slug: "atelier-nord",
    title: "Atelier Nord",
    subtitle: "Identité & site",
    tags: ["identite-visuelle", "site-web", "branding"],
    tone: "petrol",
  },
  {
    slug: "maison-lumen",
    title: "Maison Lumen",
    subtitle: "Site vitrine",
    tags: ["site-web", "web-design"],
    tone: "deep",
  },
  {
    slug: "studio-rivage",
    title: "Studio Rivage",
    subtitle: "Direction artistique",
    tags: ["direction-artistique", "branding"],
    tone: "mist",
  },
  {
    slug: "cabinet-echo",
    title: "Cabinet Echo",
    subtitle: "Identité visuelle",
    tags: ["identite-visuelle", "branding"],
    tone: "petrol",
  },
  {
    slug: "ferme-brume",
    title: "Ferme Brume",
    subtitle: "Site & packaging",
    tags: ["site-web", "packaging", "branding"],
    tone: "deep",
  },
  {
    slug: "agence-solaire",
    title: "Agence Solaire",
    subtitle: "Refonte web",
    tags: ["refonte", "web-design", "site-web"],
    tone: "mist",
  },
  {
    slug: "atelier-sel",
    title: "Atelier Sel",
    subtitle: "Marque & digital",
    tags: ["branding", "web-design", "identite-visuelle"],
    tone: "petrol",
  },
  {
    slug: "villa-horizon",
    title: "Villa Horizon",
    subtitle: "Site éditorial",
    tags: ["editorial", "site-web", "web-design"],
    tone: "deep",
  },
  {
    slug: "labo-nuance",
    title: "Labo Nuance",
    subtitle: "Direction artistique",
    tags: ["direction-artistique", "identite-visuelle"],
    tone: "mist",
  },
];

export const allProjectTags: ProjectTag[] = [
  "site-web",
  "web-design",
  "branding",
  "identite-visuelle",
  "direction-artistique",
  "refonte",
  "packaging",
  "editorial",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function filterProjects({
  query = "",
  tag = null,
}: {
  query?: string;
  tag?: ProjectTag | null;
}): Project[] {
  const normalizedQuery = query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesTag = tag ? project.tags.includes(tag) : true;
    if (!matchesTag) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      project.title,
      project.subtitle,
      project.cardDescription,
      project.cardServices,
      ...project.tags.map((item) => projectTagLabels[item]),
      ...project.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

/** Construit les champs méta affichés, en masquant la date si absente. */
export function getProjectMetaFields(project: Project): ProjectMetaField[] {
  const fromSections = project.sections?.find(
    (section) => section.type === "meta",
  );

  const fields =
    fromSections && fromSections.type === "meta"
      ? [...fromSections.fields]
      : [];

  if (project.completedAt) {
    const withoutDate = fields.filter(
      (field) => field.label.toLowerCase() !== "date de réalisation",
    );
    return [
      ...withoutDate.slice(0, 2),
      { label: "Date de réalisation", value: project.completedAt },
      ...withoutDate.slice(2),
    ];
  }

  return fields.filter(
    (field) => field.label.toLowerCase() !== "date de réalisation",
  );
}
