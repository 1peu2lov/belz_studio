"use client";

import Image from "next/image";
import { useState } from "react";

import { services } from "@/data/services";

import styles from "./ServicesShowcase.module.css";

export function ServicesShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      className={styles.section}
      aria-labelledby="services-showcase-title"
    >
      <div className={styles.container}>
        <h2 id="services-showcase-title" className={styles.heading}>
          Services
        </h2>

        <div className={styles.layout}>
          <div
            className={`${styles.media} ${activeId ? styles.mediaVisible : ""}`}
            aria-hidden="true"
          >
            {services.map((service) => {
              const isActive = service.id === activeId;
              const hasImage = Boolean(service.image);

              return (
                <div
                  key={service.id}
                  className={`${styles.mediaPanel} ${
                    hasImage ? styles.mediaPanelImage : styles[service.tone]
                  } ${isActive ? styles.mediaPanelActive : ""}`}
                >
                  {service.image ? (
                    <div
                      className={`${styles.mediaImageWrap} ${
                        !service.image.src.toLowerCase().endsWith(".png")
                          ? styles.mediaImageWrapRounded
                          : ""
                      }`}
                    >
                      <Image
                        className={styles.mediaImage}
                        src={service.image.src}
                        alt=""
                        fill
                        sizes="(max-width: 48rem) 100vw, 40vw"
                        priority={service.id === "sites-web"}
                      />
                    </div>
                  ) : (
                    <span className={styles.mediaLabel}>{service.label}</span>
                  )}
                </div>
              );
            })}
          </div>

          <ul className={styles.list} onMouseLeave={() => setActiveId(null)}>
            {services.map((service) => {
              const isActive = service.id === activeId;

              return (
                <li
                  key={service.id}
                  className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
                  onMouseEnter={() => setActiveId(service.id)}
                >
                  <button
                    type="button"
                    className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                    onFocus={() => setActiveId(service.id)}
                    onBlur={(event) => {
                      if (
                        !event.currentTarget
                          .closest(`.${styles.list}`)
                          ?.contains(event.relatedTarget as Node | null)
                      ) {
                        setActiveId(null);
                      }
                    }}
                    aria-pressed={isActive}
                  >
                    {service.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
