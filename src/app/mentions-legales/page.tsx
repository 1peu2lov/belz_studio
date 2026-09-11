import Link from "next/link";

import { LegalPage } from "@/components/Legal/LegalPage";
import legalStyles from "@/components/Legal/LegalPage.module.css";
import { createPageMetadata } from "@/lib/metadata";
import {
  legalAddressLabel,
  legalConfig,
  siteConfig,
  siretLabel,
} from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name}, édité par ${legalConfig.publisherName}.`,
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales." headingId="mentions-title">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site {siteConfig.name} est édité par {legalConfig.publisherName},{" "}
          {legalConfig.activity}, sous le nom commercial {legalConfig.tradeName}.
        </p>
        <dl className={legalStyles.dl}>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Nom commercial</dt>
            <dd className={legalStyles.dd}>{legalConfig.tradeName}</dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Éditeur</dt>
            <dd className={legalStyles.dd}>{legalConfig.publisherName}</dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Statut</dt>
            <dd className={legalStyles.dd}>{legalConfig.legalForm}</dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>SIRET</dt>
            <dd className={legalStyles.dd}>{siretLabel()}</dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Localisation</dt>
            <dd className={legalStyles.dd}>{legalAddressLabel()}</dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Email</dt>
            <dd className={legalStyles.dd}>
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Téléphone</dt>
            <dd className={legalStyles.dd}>
              <a href={`tel:${siteConfig.contact.phone}`}>
                {siteConfig.contact.phoneDisplay}
              </a>
            </dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Directeur de la publication</dt>
            <dd className={legalStyles.dd}>{legalConfig.publicationDirector}</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2>Hébergement</h2>
        <dl className={legalStyles.dl}>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Hébergeur</dt>
            <dd className={legalStyles.dd}>{legalConfig.hosting.name}</dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Adresse</dt>
            <dd className={legalStyles.dd}>{legalConfig.hosting.address}</dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Immatriculation</dt>
            <dd className={legalStyles.dd}>{legalConfig.hosting.extra}</dd>
          </div>
          <div className={legalStyles.row}>
            <dt className={legalStyles.dt}>Site</dt>
            <dd className={legalStyles.dd}>
              <a
                href={legalConfig.hosting.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {legalConfig.hosting.url.replace(/^https?:\/\//, "")}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus présents sur ce site (textes, visuels,
          identités, code) est, sauf mention contraire, la propriété de{" "}
          {legalConfig.tradeName} ou utilisé avec l’autorisation de ses
          clients. Toute reproduction non autorisée est interdite.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question, rendez-vous sur la{" "}
          <Link href="/contact">page contact</Link> ou écrivez à{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
