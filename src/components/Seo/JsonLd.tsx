import { absoluteUrl, siteConfig } from "@/lib/site";

export function JsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;
  const studioId = `${siteConfig.url}/#studio`;
  const servicesBaseId = `${siteConfig.url}/#service`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        logo: absoluteUrl("/logo/belz-studio.svg"),
        sameAs: [siteConfig.contact.instagram.url],
        founder: {
          "@type": "Person",
          name: siteConfig.founder.name,
          jobTitle: siteConfig.founder.role,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": studioId,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        image: absoluteUrl("/logo/belz-studio.svg"),
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        parentOrganization: { "@id": organizationId },
        founder: {
          "@type": "Person",
          name: siteConfig.founder.name,
          jobTitle: siteConfig.founder.role,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressCountry: "FR",
        },
        areaServed: [
          { "@type": "City", name: siteConfig.location.city },
          { "@type": "Country", name: "France" },
        ],
        knowsAbout: [
          "Création de sites web",
          "Identité visuelle",
          "Web design",
          "Direction artistique",
        ],
      },
      {
        "@type": "Service",
        "@id": `${servicesBaseId}-presence`,
        name: "Présence — one‑page codée",
        provider: { "@id": studioId },
        areaServed: [{ "@type": "Country", name: "France" }],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: 1190,
          highPrice: 1400,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Service",
        "@id": `${servicesBaseId}-vitrine`,
        name: "Vitrine — 4 à 6 pages",
        provider: { "@id": studioId },
        areaServed: [{ "@type": "Country", name: "France" }],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: 2200,
          highPrice: 2800,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Service",
        "@id": `${servicesBaseId}-univers`,
        name: "Univers — identité + site",
        provider: { "@id": studioId },
        areaServed: [{ "@type": "Country", name: "France" }],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: 3900,
          highPrice: 4800,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Service",
        "@id": `${servicesBaseId}-signature`,
        name: "Signature — sur‑mesure créatif",
        provider: { "@id": studioId },
        areaServed: [{ "@type": "Country", name: "France" }],
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: 6000,
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            minPrice: 6000,
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
