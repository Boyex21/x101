import { motion } from "framer-motion";
import { Heart, Smartphone, Users, Siren } from "lucide-react";
import desktopMobile from "@/assets/desktop-mobile-tracking.png";

const benefits = [
  { icon: Heart, title: "Tranquilidad total", desc: "Duerme tranquilo sabiendo dónde está tu vehículo" },
  { icon: Smartphone, title: "Control total", desc: "Rastrea desde tu celular o computadora en tiempo real" },
  { icon: Users, title: "Protege a tu familia", desc: "Monitorea los viajes de tus seres queridos" },
  { icon: Siren, title: "Reacción inmediata", desc: "Detecta robos al segundo y actúa rápido" },
];

const BenefitsSection = () => (
  <section className="px-5 py-16 max-w-lg mx-auto">
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <h2 className="text-3xl font-black text-center mb-2">
        No solo rastreo. <span className="text-primary">Paz mental.</span>
      </h2>
      <p className="text-center text-muted-foreground text-sm mb-10">Con America GPS, siempre sabrás dónde está tu vehículo</p>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-5 border text-center shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <b.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-sm mb-1">{b.title}</h3>
            <p className="text-muted-foreground text-xs">{b.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground font-semibold mb-3">Controla desde cualquier dispositivo</p>
        <img src={desktopMobile} alt="Rastreo desde computadora y celular - America GPS" loading="lazy" width={1024} height={640} className="mx-auto max-w-full rounded-xl" />
      </div>
    </motion.div>
  </section>
);

export default BenefitsSection;
