import Link from "next/link";

import { LegalPage } from "@/components/Legal/LegalPage";
import { createPageMetadata } from "@/lib/metadata";
import { legalConfig, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Politique de confidentialité",
  description: `Politique de confidentialité de ${siteConfig.name} : quelles données sont collectées et comment les exercer.`,
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Confidentialité." headingId="privacy-title">
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {legalConfig.publisherName}, exerçant sous le nom {legalConfig.tradeName},
          est responsable des données personnelles collectées via ce site.
        </p>
        <p>
          Contact :{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Données collectées</h2>
        <p>
          Ce site n’a pas de formulaire. Si tu écris par email, téléphone ou
          Instagram, les données éventuellement reçues sont celles que tu
          choisis d’envoyer : nom, email, numéro, contenu du message, et toute
          pièce jointe.
        </p>
        <p>
          Aucune donnée n’est vendue, ni utilisée à des fins publicitaires.
        </p>
      </section>

      <section>
        <h2>Pourquoi ces données</h2>
        <p>
          Uniquement pour répondre à ta demande, échanger sur un projet, et
          assurer le suivi de la relation professionnelle. La base légale est
          l’intérêt légitime et, le cas échéant, les mesures précontractuelles
          ou contractuelles.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>
          Les échanges sont conservés le temps nécessaire au traitement de ta
          demande, puis archivés si une obligation légale ou comptable
          l’impose (par exemple une facture, une fois l’activité immatriculée).
        </p>
      </section>

      <section>
        <h2>Destinataires</h2>
        <p>
          Les messages sont lus par {legalConfig.publisherName}. Selon le canal
          choisi, ils transitent aussi par le prestataire concerné (messagerie
          email, opérateur téléphonique, Instagram).
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Aucun cookie publicitaire, de mesure d’audience ou de tracking n’est
          déposé pour le moment. Des cookies ou stockages techniques peuvent
          être utilisés par l’hébergeur ou le navigateur pour le bon
          fonctionnement du site.
        </p>
      </section>

      <section>
        <h2>Tes droits</h2>
        <p>
          Tu peux demander l’accès, la rectification ou la suppression de tes
          données, ainsi que limiter ou t’opposer à leur traitement, en
          écrivant à{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          . Tu peux aussi introduire une réclamation auprès de la{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            CNIL
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Mentions légales</h2>
        <p>
          L’identité de l’éditeur est détaillée dans les{" "}
          <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
