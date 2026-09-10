"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/ProjectCard/ProjectCard";
import {
  allProjectTags,
  filterProjects,
  projectTagLabels,
  type ProjectTag,
} from "@/data/projects";

import styles from "./ProjectsIndex.module.css";

export function ProjectsIndex() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<ProjectTag | null>(null);

  const filtered = useMemo(
    () => filterProjects({ query, tag: activeTag }),
    [query, activeTag],
  );

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 id="projets-title" className={styles.title}>
          Projets
        </h1>
        <p className={styles.lead}>
          Une sélection de réalisations — filtre par discipline ou cherche un projet.
        </p>
      </header>

      <div className={styles.controls}>
        <label className={styles.searchLabel} htmlFor="projects-search">
          Rechercher
        </label>
        <input
          id="projects-search"
          className={styles.search}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Site web, branding, atelier…"
          autoComplete="off"
        />

        <div className={styles.tags} role="group" aria-label="Filtrer par catégorie">
          <button
            type="button"
            className={`${styles.tag} ${activeTag === null ? styles.tagActive : ""}`}
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
          >
            Tous
          </button>
          {allProjectTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.tag} ${activeTag === tag ? styles.tagActive : ""}`}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              aria-pressed={activeTag === tag}
            >
              {projectTagLabels[tag]}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.count} aria-live="polite">
        {filtered.length} projet{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <p className={styles.empty}>
          Aucun projet ne correspond à ta recherche. Essaie un autre mot ou tag.
        </p>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} variant="index" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
