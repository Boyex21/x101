import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Bell, Wifi, Battery, Route, Lock, Radio } from "lucide-react";

const features = [
  { icon: MapPin, label: "Tiempo real" },
  { icon: ShieldCheck, label: "Anti-jammer" },
  { icon: Bell, label: "Alertas inteligentes" },
  { icon: Wifi, label: "Red 4G + 2G" },
  { icon: Battery, label: "Batería respaldo" },
  { icon: Route, label: "Historial rutas" },
  { icon: Lock, label: "Bloqueo remoto" },
  { icon: Radio, label: "Alta precisión" },
];

const FeaturesSection = () => (
  <section className="section-blue px-5 py-16">
    <div className="max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-black text-center mb-10">
          Tecnología que <span className="text-accent">protege de verdad</span>
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4"
            >
              <f.icon className="w-6 h-6 text-accent flex-shrink-0" />
              <span className="font-semibold text-sm">{f.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
