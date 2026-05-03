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
import Footer from "@/components/landing/Footer";
import { type Currency, CURRENCIES } from "@/lib/currencies";
import { detectCurrencyByIP, type GeoResult } from "@/lib/geolocation";

const Index = () => {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [total, setTotal] = useState(139);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [geoCurrencyDetected, setGeoCurrencyDetected] = useState(false);
  const [geoData, setGeoData] = useState<GeoResult | null>(null);

  // Auto-detect currency by IP on first load
  useEffect(() => {
    if (!geoCurrencyDetected) {
      detectCurrencyByIP().then((result) => {
        if (result) {
          setCurrency(result.currency);
          setGeoData(result);
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
        geoData={geoData}
      />
      <ServicePlansSection currency={currency} />
      <UrgencySection />
      <TrustSection />
      <FranchiseSection />
      <FloatingCTA onBuyClick={handleFloatingCTAClick} total={total} currency={currency} />
      <Footer />
    </main>
  );
};

export default Index;
