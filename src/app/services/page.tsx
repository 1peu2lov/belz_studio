import { ServicesPageContent } from "@/app/services/ServicesPageContent";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Offres et tarifs : sites codés à la main (Présence, Vitrine, Univers, Signature), identité visuelle, maintenance. Rapide, sans extensions, vous possédez votre site.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
