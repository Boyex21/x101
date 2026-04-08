import { motion } from "framer-motion";
import { ShieldCheck, Headphones, ThumbsUp } from "lucide-react";

const trusts = [
  { icon: ShieldCheck, title: "Producto garantizado", desc: "Si no funciona, te lo cambiamos sin preguntas." },
  { icon: Headphones, title: "Soporte dedicado", desc: "Te ayudamos a instalarlo y configurarlo." },
  { icon: ThumbsUp, title: "Fácil de usar", desc: "Si usas un celular, puedes usar nuestro GPS." },
];

const TrustSection = () => (
  <section className="px-5 py-16 max-w-lg mx-auto">
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <h2 className="text-3xl font-black text-center mb-10">
        Compra sin riesgo
      </h2>
      <div className="space-y-4 mb-10">
        {trusts.map((t, i) => (
          <div key={i} className="flex items-start gap-4 bg-card rounded-xl p-5 border">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <t.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold">{t.title}</h3>
              <p className="text-muted-foreground text-sm">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="#comprar" className="btn-cta w-full block text-center text-xl">
        ✅ Proteger mi vehículo — $125
      </a>
      <p className="text-center text-muted-foreground text-xs mt-4">
        Compra segura • Envío inmediato • Soporte 24/7
      </p>
    </motion.div>
  </section>
);

export default TrustSection;
