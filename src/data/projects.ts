import { cacolacProject } from "@/data/projects/cacolac";
import { nadsProject } from "@/data/projects/nads";
import { poesieDeLameProject } from "@/data/projects/poesie-de-lame";
import { tournisProject } from "@/data/projects/tournis";
import type {
  Project,
  ProjectMetaField,
  ProjectStatus,
  ProjectTag,
} from "@/data/projectTypes";

export type {
  Project,
  ProjectCardMedia,
  ProjectMedia,
  ProjectMetaField,
  ProjectSection,
  ProjectStatus,
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
  "en-cours": "En cours",
};

const teaserTones = ["petrol", "deep", "mist", "petrol"] as const;

/** Placeholders anonymes — arrivent bientôt. */
const teaserProjects: Project[] = teaserTones.map((tone, index) => ({
  slug: `a-venir-${index + 1}`,
  title: "????",
  subtitle: "À venir",
  cardDescription: "À venir",
  tags: [],
  status: "teaser" as ProjectStatus,
  tone,
}));

export const projects: Project[] = [
  poesieDeLameProject,
  cacolacProject,
  tournisProject,
  nadsProject,
  ...teaserProjects,
];

/** Tags affichés dans les filtres (hors placeholders). */
export const allProjectTags: ProjectTag[] = [
  "site-web",
  "web-design",
  "branding",
  "identite-visuelle",
  "direction-artistique",
  "refonte",
  "packaging",
  "editorial",
  "en-cours",
];

export function getProjectStatus(project: Project): ProjectStatus {
  return project.status ?? "ready";
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects
    .filter((project) => getProjectStatus(project) !== "teaser")
    .map((project) => project.slug);
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
