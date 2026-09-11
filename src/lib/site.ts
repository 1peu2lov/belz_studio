function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

export const productionSiteUrl = "https://www.belzstudio.fr";

export const siteConfig = {
  name: "Belz Studio",
  shortName: "Belz Studio",
  description:
    "Studio créatif à Bordeaux spécialisé en création de sites web sur mesure, identité visuelle et design pour entrepreneurs et indépendants. Accompagnement aussi à distance.",
  locale: "fr_FR",
  language: "fr",
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl,
  ),
  location: {
    city: "Bordeaux",
    remote: true,
  },
  activity:
    "Studio créatif spécialisé en création de sites web, identité visuelle et design",
  audience: "Entrepreneurs et indépendants",
  founder: {
    name: "Freddy Belz",
    role: "Développeur web & designer freelance",
  },
  contact: {
    email: "contact@belzstudio.fr",
    phone: "+33611245069",
    phoneDisplay: "06 11 24 50 69",
    instagram: {
      handle: "@belz_studio",
      url: "https://instagram.com/belz_studio",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Identité légale — le SIRET et l’adresse complète se renseignent ici une fois obtenus. */
export const legalConfig = {
  publisherName: "Freddy Belz",
  tradeName: "Belz Studio",
  activity: "Développeur web et designer freelance",
  legalForm: "Entrepreneur individuel",
  siret: null as string | null,
  publicationDirector: "Freddy Belz",
  city: "Bordeaux",
  country: "France",
  streetAddress: null as string | null,
  hosting: {
    name: "OVH SAS",
    address: "2 rue Kellermann, 59100 Roubaix, France",
    extra: "RCS Lille Métropole 424 761 419",
    url: "https://www.ovhcloud.com",
  },
};

export function siretLabel(): string {
  return legalConfig.siret ?? "Immatriculation en cours";
}

export function legalAddressLabel(): string {
  if (legalConfig.streetAddress) {
    return `${legalConfig.streetAddress}, ${legalConfig.city}, ${legalConfig.country}`;
  }

  return `${legalConfig.city}, ${legalConfig.country}`;
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}
