import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ScenariosSection from "@/components/landing/ScenariosSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import OfferSection from "@/components/landing/OfferSection";
import UrgencySection from "@/components/landing/UrgencySection";
import TrustSection from "@/components/landing/TrustSection";
import ServicePlansSection from "@/components/landing/ServicePlansSection";
import FranchiseSection from "@/components/landing/FranchiseSection";
import FloatingCTA from "@/components/landing/FloatingCTA";

const Index = () => {
  const scrollToOffer = () => {
    document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="pb-20">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <FeaturesSection />
      <ScenariosSection />
      <TestimonialsSection />
      <OfferSection />
      <ServicePlansSection />
      <UrgencySection />
      <TrustSection />
      <FranchiseSection />
      <FloatingCTA onBuyClick={scrollToOffer} />
    </main>
  );
};

export default Index;
