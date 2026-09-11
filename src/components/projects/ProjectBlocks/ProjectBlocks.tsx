import Image from "next/image";

import type { ProjectMedia } from "@/data/projects";
import { encodePublicPath } from "@/lib/assets";
import { cn } from "@/utils/cn";

import styles from "./ProjectBlocks.module.css";

type FullBleedProps = {
  media: ProjectMedia;
  title?: string;
  body?: string;
  priority?: boolean;
  className?: string;
  /** `contain` pour mockups / collages à ne pas recadrer. */
  fit?: "cover" | "contain";
};

export function ProjectFullBleed({
  media,
  title,
  body,
  priority,
  className,
  fit = "cover",
}: FullBleedProps) {
  const maxWidthClass =
    media.maxWidth === "sm"
      ? styles.fullBleedMaxSm
      : media.maxWidth === "md"
        ? styles.fullBleedMaxMd
        : media.maxWidth === "lg"
          ? styles.fullBleedMaxLg
          : null;

  return (
    <section className={cn(styles.fullBleedSection, className)} aria-label={title}>
      {(title || body) && (
        <div className={styles.fullBleedIntro}>
          {title ? <h2 className={styles.blockTitle}>{title}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>
      )}
      <figure className={cn(styles.fullBleed, maxWidthClass)}>
        <div
          className={cn(
            styles.fullBleedFrame,
            fit === "contain" && styles.fullBleedContain,
          )}
        >
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority={priority}
            sizes="100vw"
            unoptimized={media.src.toLowerCase().endsWith(".svg")}
            className={cn(
              styles.mediaCover,
              fit === "contain" && styles.mediaContain,
            )}
          />
        </div>
      </figure>
    </section>
  );
}

type PairProps = {
  media: [ProjectMedia, ProjectMedia];
};

export function ProjectPair({ media }: PairProps) {
  return (
    <div className={styles.pair}>
      {media.map((item) => (
        <figure key={item.src} className={styles.pairItem}>
          <div className={styles.pairFrame}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 48rem) 100vw, 50vw"
              className={cn(
                styles.mediaCover,
                item.fit === "contain" && styles.mediaContain,
              )}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

type TextMediaProps = {
  title?: string;
  body: string;
  media: ProjectMedia;
  mediaSide?: "left" | "right";
};

export function ProjectTextMedia({
  title,
  body,
  media,
  mediaSide = "right",
}: TextMediaProps) {
  return (
    <section
      className={cn(
        styles.textMedia,
        mediaSide === "left" && styles.textMediaMediaFirst,
      )}
      aria-label={title}
    >
      <div className={styles.textMediaCopy}>
        {title ? <h2 className={styles.blockTitle}>{title}</h2> : null}
        <p className={styles.body}>{body}</p>
      </div>
      <figure className={styles.textMediaFigure}>
        <div className={styles.textMediaFrame}>
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 48rem) 100vw, 50vw"
            className={cn(
              styles.mediaCover,
              media.fit === "contain" && styles.mediaContain,
            )}
          />
        </div>
      </figure>
    </section>
  );
}

type GridProps = {
  title?: string;
  body?: string;
  media: ProjectMedia[];
  variant?: "default" | "products";
};

export function ProjectMediaGrid({
  title,
  body,
  media,
  variant = "default",
}: GridProps) {
  if (media.length === 0) {
    return null;
  }

  return (
    <section className={styles.gridSection} aria-label={title}>
      {(title || body) && (
        <div className={styles.gridIntro}>
          {title ? <h2 className={styles.blockTitle}>{title}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>
      )}
      <div
        className={cn(
          styles.grid,
          variant === "products" && styles.gridProducts,
        )}
      >
        {media.map((item) => (
          <figure
            key={item.src}
            className={cn(
              styles.gridItem,
              variant === "products" && styles.gridItemProduct,
            )}
          >
            {variant === "products" ? (
              <Image
                src={item.src}
                alt={item.alt}
                width={480}
                height={1200}
                sizes="(max-width: 47.9375rem) 40vw, 12vw"
                className={styles.productImage}
              />
            ) : (
              <div className={styles.gridFrame}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 48rem) 100vw, 33vw"
                  className={cn(
                    styles.mediaCover,
                    item.fit === "contain" && styles.mediaContain,
                  )}
                />
              </div>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

type VideoProps = {
  title?: string;
  body?: string;
  src: string;
  poster?: string;
  alt?: string;
  /** Défaut true : autoplay muet en boucle, sans contrôles. */
  autoplay?: boolean;
  aspect?: "landscape" | "portrait";
};

export function ProjectVideo({
  title,
  body,
  src,
  poster,
  alt,
  autoplay = true,
  aspect = "landscape",
}: VideoProps) {
  return (
    <section className={styles.videoSection} aria-label={title ?? alt}>
      {(title || body) && (
        <div className={styles.videoIntro}>
          {title ? <h2 className={styles.blockTitle}>{title}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>
      )}
      <figure
        className={cn(
          styles.videoFigure,
          aspect === "portrait" && styles.videoFigurePortrait,
        )}
      >
        <video
          className={cn(
            styles.videoPlayer,
            aspect === "portrait" && styles.videoPlayerPortrait,
            autoplay && styles.videoAuto,
          )}
          src={encodePublicPath(src)}
          poster={poster ? encodePublicPath(poster) : undefined}
          autoPlay={autoplay}
          muted={autoplay}
          loop={autoplay}
          playsInline
          preload={autoplay ? "auto" : "metadata"}
          controls={!autoplay}
          disablePictureInPicture={autoplay}
          disableRemotePlayback={autoplay}
          aria-label={alt ?? title ?? "Vidéo du projet"}
        >
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      </figure>
    </section>
  );
}

type PortraitRowProps = {
  title?: string;
  body?: string;
  video: {
    src: string;
    poster?: string;
    alt?: string;
    autoplay?: boolean;
  };
  sideMedia?: ProjectMedia[];
};

export function ProjectPortraitRow({
  title,
  body,
  video,
  sideMedia = [],
}: PortraitRowProps) {
  const autoplay = video.autoplay ?? true;
  const images = sideMedia.slice(0, 2);
  const showTextBeside = Boolean(body) && images.length === 0;

  return (
    <section className={styles.portraitRow} aria-label={title}>
      {(title || (body && images.length > 0)) && (
        <div className={styles.portraitIntro}>
          {title ? <h2 className={styles.blockTitle}>{title}</h2> : null}
          {body && images.length > 0 ? (
            <p className={styles.body}>{body}</p>
          ) : null}
        </div>
      )}

      <div className={styles.portraitLayout}>
        <figure className={styles.portraitVideoWrap}>
          <video
            className={cn(styles.portraitVideo, autoplay && styles.videoAuto)}
            src={encodePublicPath(video.src)}
            poster={
              video.poster ? encodePublicPath(video.poster) : undefined
            }
            autoPlay={autoplay}
            muted={autoplay}
            loop={autoplay}
            playsInline
            preload={autoplay ? "auto" : "metadata"}
            controls={!autoplay}
            disablePictureInPicture={autoplay}
            disableRemotePlayback={autoplay}
            aria-label={video.alt ?? title ?? "Vidéo du projet"}
          >
            Votre navigateur ne prend pas en charge la lecture vidéo.
          </video>
        </figure>

        <div className={styles.portraitSide}>
          {showTextBeside && body ? (
            <div className={styles.portraitSideCopy}>
              <p className={styles.body}>{body}</p>
            </div>
          ) : null}

          {images.map((item) => (
            <figure key={item.src} className={styles.portraitSideFigure}>
              <div
                className={cn(
                  styles.portraitSideFrame,
                  item.fit === "contain" && styles.portraitSideFrameContain,
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 48rem) 100vw, 50vw"
                  className={cn(
                    styles.mediaCover,
                    item.fit === "contain" && styles.mediaContain,
                  )}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
