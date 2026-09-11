import { StudioPageContent } from "@/app/le-studio/StudioPageContent";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Le studio",
  description:
    "Un studio indépendant à Bordeaux pour les petites entreprises et auto-entrepreneurs — identité visuelle, design et sites web sur mesure.",
  path: "/le-studio",
});

export default function LeStudioPage() {
  return <StudioPageContent />;
}
