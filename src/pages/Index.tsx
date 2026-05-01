import { useState, useCallback, useEffect } from "react";
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
import { detectCurrencyByIP } from "@/lib/geolocation";

const Index = () => {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [total, setTotal] = useState(139);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [geoCurrencyDetected, setGeoCurrencyDetected] = useState(false);

  // Auto-detect currency by IP on first load
  useEffect(() => {
    if (!geoCurrencyDetected) {
      detectCurrencyByIP().then((detected) => {
        if (detected) {
          setCurrency(detected);
          setGeoCurrencyDetected(true);
        }
      });
    }
  }, [geoCurrencyDetected]);

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
        initialCurrency={currency}
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
