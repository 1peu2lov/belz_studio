export type ProjectTone = "petrol" | "deep" | "mist";

export type ProjectTag =
  | "site-web"
  | "web-design"
  | "branding"
  | "identite-visuelle"
  | "direction-artistique"
  | "refonte"
  | "packaging"
  | "editorial"
  | "en-cours";

/** `teaser` = placeholder non cliquable (????). */
export type ProjectStatus = "ready" | "in-progress" | "teaser";

export type ProjectMedia = {
  src: string;
  alt: string;
  /** Affichage image : cover (défaut) ou contain pour mockups. */
  fit?: "cover" | "contain";
  /** Largeur max centrée (utile pour collages type phones). */
  maxWidth?: "sm" | "md" | "lg";
};

export type ProjectCardMedia = {
  image: ProjectMedia;
  /** Vidéo au survol (desktop). Préchargée uniquement au hover. */
  hoverVideo?: string;
};

export type ProjectMetaField = {
  label: string;
  value: string;
  /** Lien optionnel (ex. profil Instagram collaborateur). */
  href?: string;
};

export type ProjectSection =
  | {
      type: "intro";
      title: string;
      presentation: string;
      visual: ProjectMedia;
    }
  | {
      type: "meta";
      fields: ProjectMetaField[];
    }
  | {
      type: "split-text";
      title: string;
      body: string;
    }
  | {
      type: "full-bleed";
      title?: string;
      body?: string;
      media: ProjectMedia;
    }
  | {
      type: "pair";
      media: [ProjectMedia, ProjectMedia];
    }
  | {
      type: "text-media";
      title?: string;
      body: string;
      media: ProjectMedia;
      mediaSide?: "left" | "right";
    }
  | {
      type: "grid";
      title?: string;
      body?: string;
      media: ProjectMedia[];
      /** `products` : 2 colonnes mobile, 4 desktop (ex. canettes). */
      variant?: "default" | "products";
    }
  | {
      type: "video";
      title?: string;
      body?: string;
      src: string;
      poster?: string;
      alt?: string;
      /** Défaut : autoplay muet en boucle, sans contrôles. */
      autoplay?: boolean;
      /** Format d’affichage. Défaut landscape. */
      aspect?: "landscape" | "portrait";
    }
  | {
      /**
       * Vidéo portrait (mobile) à côté de texte et/ou d’images.
       * Idéal pour les formats 9:16.
       */
      type: "portrait-row";
      title?: string;
      body?: string;
      video: {
        src: string;
        poster?: string;
        alt?: string;
        autoplay?: boolean;
      };
      /** Jusqu’à 2 images à côté de la vidéo. */
      sideMedia?: ProjectMedia[];
    }
  | {
      type: "outcome";
      title?: string;
      video: {
        src: string;
        poster?: string;
        alt?: string;
      };
      siteUrl?: string;
      siteLabel?: string;
    }
  | {
      type: "contact";
      title?: string;
      buttonLabel?: string;
      href?: string;
    };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tags: ProjectTag[];
  tone: ProjectTone;
  /**
   * Statut éditorial.
   * - ready (défaut)
   * - in-progress : projet annoncé, page minimale
   * - teaser : placeholder ???? non cliquable
   */
  status?: ProjectStatus;
  /** Description courte pour la card (si absente → subtitle). */
  cardDescription?: string;
  /** Ligne prestations affichée sur la card. */
  cardServices?: string;
  card?: ProjectCardMedia;
  /**
   * Date de réalisation.
   * Absente ou `null` = champ masqué sur la page publique.
   * Format libre (ex. « Mars 2025 »).
   */
  completedAt?: string | null;
  seoDescription?: string;
  /** Blocs de page détail, dans l’ordre voulu. */
  sections?: ProjectSection[];
};
