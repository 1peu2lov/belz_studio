import { absoluteUrl, siteConfig } from "@/lib/site";

export function JsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;
  const studioId = `${siteConfig.url}/#studio`;

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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
