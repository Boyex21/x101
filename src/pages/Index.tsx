import { useState, useCallback } from "react";
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
import { type Currency, CURRENCIES } from "@/lib/currencies";

const Index = () => {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [total, setTotal] = useState(139);
  const [openCheckout, setOpenCheckout] = useState(false);

  const handleFloatingCTAClick = useCallback(() => {
    document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" });
    // Small delay so user sees the section before modal opens
    setTimeout(() => setOpenCheckout(true), 600);
  }, []);

  return (
    <main className="pb-20">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <FeaturesSection />
      <ScenariosSection />
      <TestimonialsSection />
      <OfferSection
        onCurrencyChange={setCurrency}
        onPriceChange={setTotal}
        externalCheckoutOpen={openCheckout}
        onExternalCheckoutChange={setOpenCheckout}
      />
      <ServicePlansSection currency={currency} />
      <UrgencySection />
      <TrustSection />
      <FranchiseSection />
      <FloatingCTA onBuyClick={handleFloatingCTAClick} total={total} currency={currency} />
    </main>
  );
};

export default Index;
