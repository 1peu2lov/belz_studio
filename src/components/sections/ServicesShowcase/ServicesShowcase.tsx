"use client";

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
            {services.map((service) => (
              <div
                key={service.id}
                className={`${styles.mediaPanel} ${styles[service.tone]} ${
                  service.id === activeId ? styles.mediaPanelActive : ""
                }`}
              >
                <span className={styles.mediaLabel}>{service.label}</span>
              </div>
            ))}
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
                      if (!event.currentTarget.closest(`.${styles.list}`)?.contains(event.relatedTarget as Node | null)) {
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
