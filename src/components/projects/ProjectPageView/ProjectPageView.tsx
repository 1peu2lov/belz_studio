"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

import {
  ProjectFullBleed,
  ProjectMediaGrid,
  ProjectPair,
  ProjectPortraitRow,
  ProjectTextMedia,
  ProjectVideo,
} from "@/components/projects/ProjectBlocks/ProjectBlocks";
import { ContactCTA } from "@/components/sections/ContactCTA/ContactCTA";
import { Button } from "@/components/ui/Button/Button";
import {
  getProjectMetaFields,
  type Project,
  type ProjectSection,
} from "@/data/projects";
import { encodePublicPath } from "@/lib/assets";
import { createScrollReveal } from "@/lib/scrollReveal";

import styles from "./ProjectPageView.module.css";

type ProjectPageViewProps = {
  project: Project;
};

function revealBlock(block: HTMLElement) {
  return createScrollReveal({
    trigger: block,
    targets: block,
  });
}

function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = ref.current;
    if (!block) {
      return;
    }
    return revealBlock(block);
  }, []);

  return (
    <div ref={ref} className={styles.reveal}>
      {children}
    </div>
  );
}

function renderSection(project: Project, section: ProjectSection, index: number) {
  switch (section.type) {
    case "intro":
      return (
        <header key={`intro-${index}`} className={styles.intro}>
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>Projet</p>
            <h1 id="project-title" className={styles.title}>
              {section.title}
            </h1>
            <p className={styles.presentation}>{section.presentation}</p>
          </div>
          <ProjectFullBleed
            media={section.visual}
            priority
            fit={section.visual.fit}
          />
        </header>
      );

    case "meta": {
      const fields = getProjectMetaFields(project);
      if (fields.length === 0) {
        return null;
      }

      return (
        <section
          key={`meta-${index}`}
          className={styles.meta}
          aria-label="Fiche projet"
        >
          <dl className={styles.metaList}>
            {fields.map((field) => (
              <div key={field.label} className={styles.metaRow}>
                <dt className={styles.metaLabel}>{field.label}</dt>
                <dd className={styles.metaValue}>
                  {field.href ? (
                    <a
                      href={field.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {field.value}
                    </a>
                  ) : (
                    field.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      );
    }

    case "split-text":
      return (
        <section
          key={`split-${index}`}
          className={styles.splitText}
          aria-labelledby={`split-title-${index}`}
        >
          <h2 id={`split-title-${index}`} className={styles.splitTitle}>
            {section.title}
          </h2>
          <p className={styles.splitBody}>{section.body}</p>
        </section>
      );

    case "full-bleed":
      return (
        <ProjectFullBleed
          key={`full-${index}`}
          title={section.title}
          body={section.body}
          media={section.media}
          fit={section.media.fit}
        />
      );

    case "pair":
      return <ProjectPair key={`pair-${index}`} media={section.media} />;

    case "text-media":
      return (
        <ProjectTextMedia
          key={`text-media-${index}`}
          title={section.title}
          body={section.body}
          media={section.media}
          mediaSide={section.mediaSide}
        />
      );

    case "grid":
      if (section.media.length === 0) {
        return null;
      }
      return (
        <ProjectMediaGrid
          key={`grid-${index}`}
          title={section.title}
          body={section.body}
          media={section.media}
          variant={section.variant}
        />
      );

    case "video":
      return (
        <ProjectVideo
          key={`video-${index}`}
          title={section.title}
          body={section.body}
          src={section.src}
          poster={section.poster}
          alt={section.alt}
          autoplay={section.autoplay ?? true}
          aspect={section.aspect}
        />
      );

    case "portrait-row":
      return (
        <ProjectPortraitRow
          key={`portrait-${index}`}
          title={section.title}
          body={section.body}
          video={section.video}
          sideMedia={section.sideMedia}
        />
      );

    case "outcome":
      return (
        <section
          key={`outcome-${index}`}
          className={styles.outcome}
          aria-labelledby={
            section.title ? `outcome-title-${index}` : undefined
          }
        >
          {section.title ? (
            <h2 id={`outcome-title-${index}`} className={styles.outcomeTitle}>
              {section.title}
            </h2>
          ) : null}
          <figure className={styles.outcomeVideo}>
            <video
              className={styles.outcomePlayer}
              src={encodePublicPath(section.video.src)}
              poster={
                section.video.poster
                  ? encodePublicPath(section.video.poster)
                  : undefined
              }
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              aria-label={
                section.video.alt ?? "Vidéo de navigation du projet"
              }
            >
              Votre navigateur ne prend pas en charge la lecture vidéo.
            </video>
          </figure>
          {section.siteUrl ? (
            <div className={styles.outcomeActions}>
              <Button
                href={section.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.siteButton}
              >
                {section.siteLabel ?? "Voir le site"}
              </Button>
            </div>
          ) : null}
        </section>
      );

    case "contact":
      // CTA global unique — rendu via <ContactCTA /> hors sections projet.
      return null;

    default:
      return null;
  }
}

export function ProjectPageView({ project }: ProjectPageViewProps) {
  const sections = project.sections;
  const status = project.status ?? "ready";
  const isInProgress =
    status === "in-progress" || project.tags.includes("en-cours");

  if (!sections || sections.length === 0) {
    return (
      <>
        <div className={styles.page}>
          <div className={styles.container}>
            <Reveal>
              <section
                className={styles.fallback}
                aria-labelledby="project-title"
              >
                <p className={styles.eyebrow}>
                  {isInProgress ? "En cours" : "Projet"}
                </p>
                <h1 id="project-title" className={styles.title}>
                  {project.title}
                </h1>
                <p className={styles.presentation}>
                  {isInProgress ? "Projet en cours." : project.subtitle}
                </p>
                {!isInProgress ? (
                  <p className={styles.splitBody}>Contenu à venir.</p>
                ) : null}
                <Link href="/projets" className={styles.back}>
                  Retour aux projets
                </Link>
              </section>
            </Reveal>
          </div>
        </div>
        <ContactCTA />
      </>
    );
  }

  const contentSections = sections.filter(
    (section) => section.type !== "contact",
  );

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          {contentSections.map((section, index) => {
            const content = renderSection(project, section, index);
            if (!content) {
              return null;
            }

            return <Reveal key={`${section.type}-${index}`}>{content}</Reveal>;
          })}
          <Reveal>
            <Link href="/projets" className={styles.back}>
              Retour aux projets
            </Link>
          </Reveal>
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
