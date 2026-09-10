export const siteConfig = {
  name: "Belz Studio",
  shortName: "Belz Studio",
  description:
    "Studio créatif à Bordeaux spécialisé en création de sites web sur mesure, identité visuelle et design pour entrepreneurs et indépendants. Accompagnement aussi à distance.",
  locale: "fr_FR",
  language: "fr",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: {
    city: "Bordeaux",
    remote: true,
  },
  activity:
    "Studio créatif spécialisé en création de sites web, identité visuelle et design",
  audience: "Entrepreneurs et indépendants",
  contact: {
    email: "contact@belz-studio.fr",
    phone: "+33600000000",
    phoneDisplay: "06 00 00 00 00",
    instagram: {
      handle: "@belz_studio",
      url: "https://instagram.com/belz_studio",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
