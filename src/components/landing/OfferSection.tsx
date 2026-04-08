import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const included = [
  "GPS vehicular Plug & Play",
  "SIM con 1 año de servicio",
  "App móvil completa",
  "Alertas ilimitadas",
  "Soporte técnico",
  "Batería de respaldo",
];

const OfferSection = () => (
  <section id="comprar" className="px-5 py-16 max-w-lg mx-auto">
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <h2 className="text-3xl font-black text-center mb-10">
        Todo incluido. <span className="text-primary">Un solo precio.</span>
      </h2>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-muted rounded-xl p-5 text-center">
          <h4 className="font-bold text-sm mb-2 text-muted-foreground">GPS Tradicional</h4>
          <p className="text-2xl font-black text-muted-foreground line-through">$250+</p>
          <ul className="text-xs text-muted-foreground mt-3 space-y-1.5 text-left">
            <li className="flex items-center gap-1"><X className="w-3 h-3 text-destructive" /> Necesita técnico</li>
            <li className="flex items-center gap-1"><X className="w-3 h-3 text-destructive" /> Instalación cara</li>
            <li className="flex items-center gap-1"><X className="w-3 h-3 text-destructive" /> Semanas de espera</li>
          </ul>
        </div>
        <div className="bg-primary rounded-xl p-5 text-center text-primary-foreground border-2 border-accent shadow-lg">
          <h4 className="font-bold text-sm mb-2">Nuestro GPS</h4>
          <p className="text-3xl font-black">$125</p>
          <ul className="text-xs mt-3 space-y-1.5 text-left">
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-accent" /> Plug & Play</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-accent" /> Todo incluido</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-accent" /> Listo en minutos</li>
          </ul>
        </div>
      </div>

      {/* What's included */}
      <div className="bg-card border rounded-xl p-6 mb-8">
        <h3 className="font-bold text-lg mb-4 text-center">Incluye:</h3>
        <div className="space-y-3">
          {included.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-xs mt-4">
          Renovación: solo $70/año después del primer año
        </p>
      </div>

      <a href="#comprar" className="btn-cta w-full block text-center text-xl">
        🛡️ Comprar ahora — $125
      </a>
    </motion.div>
  </section>
);

export default OfferSection;
