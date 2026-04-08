import { motion } from "framer-motion";
import { Clock, TrendingUp, Package } from "lucide-react";

const UrgencySection = () => (
  <section className="section-dark px-5 py-16">
    <div className="max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="bg-destructive/20 border border-destructive/30 rounded-2xl p-8">
          <span className="badge-urgency mb-4 inline-block">⚠️ Atención</span>
          <h2 className="text-3xl font-black mt-4 mb-3">
            Stock limitado
          </h2>
          <p className="text-dark-section-foreground/70 mb-6">
            Esta promoción puede terminar en cualquier momento. No esperes a que sea demasiado tarde.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-dark-section rounded-xl p-3">
              <Package className="w-6 h-6 text-accent mx-auto mb-1" />
              <p className="text-xs font-semibold">Últimas unidades</p>
            </div>
            <div className="bg-dark-section rounded-xl p-3">
              <TrendingUp className="w-6 h-6 text-accent mx-auto mb-1" />
              <p className="text-xs font-semibold">Alta demanda</p>
            </div>
            <div className="bg-dark-section rounded-xl p-3">
              <Clock className="w-6 h-6 text-accent mx-auto mb-1" />
              <p className="text-xs font-semibold">Precio promo</p>
            </div>
          </div>
          <a href="#comprar" className="btn-cta w-full block text-center text-lg">
            🔒 Asegurar mi GPS ahora
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default UrgencySection;
