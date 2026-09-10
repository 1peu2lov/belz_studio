import { ProjectsIndex } from "@/components/projects/ProjectsIndex/ProjectsIndex";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Projets",
  description:
    "Sélection de projets Belz Studio : sites web, identité visuelle et design pour entrepreneurs et indépendants.",
  path: "/projets",
});

export default function ProjetsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section} aria-labelledby="projets-title">
        <div className={styles.container}>
          <ProjectsIndex />
        </div>
      </section>
    </div>
  );
}
