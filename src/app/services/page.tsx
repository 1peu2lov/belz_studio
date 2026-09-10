import { ServicesPageContent } from "@/app/services/ServicesPageContent";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Services",
  description: `Domaines, formules et méthode de ${siteConfig.name} : sites vitrine, identité visuelle et accompagnement pour TPE et auto-entrepreneurs.`,
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
