import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Contact",
  description: `Contactez ${siteConfig.name} pour un projet de site web, d'identité visuelle ou de design. Basé à ${siteConfig.location.city}, disponible à distance.`,
  path: "/contact",
});

const contactRows = [
  {
    id: "instagram",
    label: "Instagram",
    value: siteConfig.contact.instagram.handle,
    href: siteConfig.contact.instagram.url,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    external: false,
  },
  {
    id: "phone",
    label: "Téléphone",
    value: siteConfig.contact.phoneDisplay,
    href: `tel:${siteConfig.contact.phone}`,
    external: false,
  },
] as const;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section} aria-labelledby="contact-title">
        <div className={styles.container}>
          <h1 id="contact-title" className={styles.title}>
            Disons bonjour.
          </h1>

          <ul className={styles.list}>
            {contactRows.map((row) => (
              <li key={row.id} className={styles.row}>
                <span className={styles.label}>{row.label}</span>
                <a
                  className={styles.value}
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {row.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
