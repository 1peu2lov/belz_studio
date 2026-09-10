import { StudioPageContent } from "@/app/le-studio/StudioPageContent";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Le studio",
  description: `Découvrez ${siteConfig.name}, studio créatif basé à ${siteConfig.location.city} : approche, méthode et accompagnement pour entrepreneurs et indépendants.`,
  path: "/le-studio",
});

export default function LeStudioPage() {
  return <StudioPageContent />;
}
