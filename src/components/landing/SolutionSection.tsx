import { motion } from "framer-motion";
import { ShoppingCart, Plug, Smartphone } from "lucide-react";

const steps = [
  { icon: ShoppingCart, num: "1", title: "Compra", desc: "Recibe tu GPS en la puerta de tu casa" },
  { icon: Plug, num: "2", title: "Conecta", desc: "Conéctalo directo a la batería. Sin herramientas." },
  { icon: Smartphone, num: "3", title: "Rastrea", desc: "Abre la app y monitorea en tiempo real" },
];

const SolutionSection = () => (
  <section className="section-dark px-5 py-16">
    <div className="max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-black mb-2">
          Tan fácil como <span className="text-accent">1, 2, 3</span>
        </h2>
        <p className="text-dark-section-foreground/70 mb-10 text-lg">
          Sin técnicos. Sin citas. Sin esperas.
        </p>
      </motion.div>
      <div className="space-y-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-5"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
              <s.icon className="w-8 h-8 text-accent-foreground" />
            </div>
            <div className="text-left">
              <span className="text-accent font-black text-sm">PASO {s.num}</span>
              <h3 className="font-bold text-xl">{s.title}</h3>
              <p className="text-dark-section-foreground/60 text-sm">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <a href="#comprar" className="btn-cta mt-10 inline-block">
        ¡Quiero proteger mi vehículo!
      </a>
    </div>
  </section>
);

export default SolutionSection;
