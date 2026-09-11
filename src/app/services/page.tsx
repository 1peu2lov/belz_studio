import { ServicesPageContent } from "@/app/services/ServicesPageContent";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Du premier logo à la mise en ligne : sites web, identité visuelle et accompagnement pour petites entreprises et auto-entrepreneurs.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
