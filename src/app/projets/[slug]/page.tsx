import { notFound } from "next/navigation";

import { ProjectPageView } from "@/components/projects/ProjectPageView/ProjectPageView";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({
      title: "Projet introuvable",
      description: "Ce projet n’existe pas ou n’est plus disponible.",
      path: `/projets/${slug}`,
    });
  }

  return createPageMetadata({
    title: project.title,
    description:
      project.seoDescription ??
      `${project.title} — ${project.subtitle}. Projet Belz Studio.`,
    path: `/projets/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageView project={project} />;
}
