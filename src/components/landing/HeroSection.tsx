import { motion } from "framer-motion";
import { Shield, MapPin, Zap, Truck, Car, Bike } from "lucide-react";
import gpsDevice from "@/assets/gps-device-clean.png";
import logo from "@/assets/logo-america-gps.svg";

const HeroSection = () => (
  <section className="section-blue relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
    </div>
    <div className="relative z-10 px-5 pt-10 pb-10 max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={logo} alt="America GPS" className="h-16 md:h-24 mx-auto mb-6 brightness-0 invert" />
        <span className="badge-urgency mb-4 inline-block">🔥 Oferta limitada</span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mt-4 mb-4">
          Tu vehículo protegido <span className="text-accent">24/7</span> desde tu celular
        </h1>
        <p className="text-lg opacity-90 mb-2 font-medium">
          Compra, conecta y rastrea en minutos. Sin técnicos. Sin complicaciones.
        </p>
        <p className="text-sm opacity-70 mb-6 flex items-center justify-center gap-2">
          <Car className="w-4 h-4" /> Carros
          <span className="opacity-50">•</span>
          <Bike className="w-4 h-4" /> Motos
          <span className="opacity-50">•</span>
          <Truck className="w-4 h-4" /> Camiones
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <img src={gpsDevice} alt="GPS vehicular America GPS Plug & Play" width={280} height={400} className="mx-auto drop-shadow-2xl max-h-[320px] object-contain" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <a href="#comprar" className="btn-cta w-full block text-center text-xl">
          🛒 Ver planes y comprar — $139
        </a>
        <div className="flex items-center justify-center gap-1 text-xs opacity-80">
          <Truck className="w-3.5 h-3.5" />
          <span>Envío incluido</span>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm opacity-80">
          <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Garantizado</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Tiempo real</span>
          <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Plug & Play</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
