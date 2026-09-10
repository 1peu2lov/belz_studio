import { AboutShowcase } from "@/components/sections/AboutShowcase/AboutShowcase";
import { ContactCTA } from "@/components/sections/ContactCTA/ContactCTA";
import { CreativeStatement } from "@/components/sections/CreativeStatement/CreativeStatement";
import { FounderIntro } from "@/components/sections/FounderIntro/FounderIntro";
import { Hero } from "@/components/sections/Hero/Hero";
import { ProjectGallery } from "@/components/sections/ProjectGallery/ProjectGallery";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase/ServicesShowcase";
import { StudioAudience } from "@/components/sections/StudioAudience/StudioAudience";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = {
  ...createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    absolute: siteConfig.name,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CreativeStatement />
      <ProjectGallery />
      <StudioAudience />
      <ServicesShowcase />
      <AboutShowcase />
      <FounderIntro />
      <ContactCTA />
    </>
  );
}
