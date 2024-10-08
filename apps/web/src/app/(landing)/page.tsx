import { LandingFeaturesSection } from "@/components/modules/landing/features";
import { LandingHeroSection } from "@/components/modules/landing/hero";
import { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const AboutPage = () => {
  return (
    <main>
      <LandingHeroSection />
      <LandingFeaturesSection />
    </main>
  );
};

export default AboutPage;
