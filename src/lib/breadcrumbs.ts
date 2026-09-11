import { mainNavigation } from "@/data/navigation";
import { getProjectBySlug, getProjectStatus } from "@/data/projects";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

const segmentLabels: Record<string, string> = {
  projets: "Projets",
  services: "Services",
  "le-studio": "Le studio",
  contact: "Contact",
  "mentions-legales": "Mentions légales",
  confidentialite: "Confidentialité",
};

for (const item of mainNavigation) {
  const key = item.href.replace(/^\//, "");
  if (key) {
    segmentLabels[key] = item.label;
  }
}

function labelForSegment(segment: string, index: number, parts: string[]): string {
  if (parts[0] === "projets" && index === 1) {
    return getProjectBySlug(segment)?.title ?? segment;
  }

  return segmentLabels[segment] ?? decodeURIComponent(segment).replace(/-/g, " ");
}

function isKnownPath(pathname: string): boolean {
  const first = pathname.split("/").filter(Boolean)[0];
  if (!first || !(first in segmentLabels)) {
    return false;
  }

  if (pathname === `/${first}`) {
    return true;
  }

  if (first === "projets") {
    const slug = pathname.slice("/projets/".length);
    if (!slug || slug.includes("/")) {
      return false;
    }

    const project = getProjectBySlug(slug);
    return Boolean(project && getProjectStatus(project) !== "teaser");
  }

  return false;
}

/** Construit le fil d’Ariane depuis un pathname. Vide sur l’accueil. */
export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (!normalized || normalized === "/" || !isKnownPath(normalized)) {
    return [];
  }

  const parts = normalized.split("/").filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: "Accueil", href: "/" }];

  parts.forEach((segment, index) => {
    const href = `/${parts.slice(0, index + 1).join("/")}`;
    const label = labelForSegment(segment, index, parts);
    const isLast = index === parts.length - 1;

    crumbs.push(isLast ? { label } : { label, href });
  });

  return crumbs;
}
