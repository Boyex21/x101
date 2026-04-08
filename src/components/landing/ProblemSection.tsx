import { motion } from "framer-motion";
import { AlertTriangle, Clock, Wrench, ShieldOff } from "lucide-react";

const problems = [
  { icon: AlertTriangle, title: "Robo de vehículos", desc: "Cada 15 minutos roban un auto. ¿El tuyo está protegido?" },
  { icon: ShieldOff, title: "Sin control", desc: "No sabes dónde está tu vehículo cuando lo necesitas." },
  { icon: Wrench, title: "Instalaciones costosas", desc: "Técnicos que cobran de más y tardan días." },
  { icon: Clock, title: "Reacción tardía", desc: "Cuando te enteras del robo, ya es demasiado tarde." },
];

const ProblemSection = () => (
  <section className="px-5 py-16 max-w-lg mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-black text-center mb-2">
        ¿Sabías que…?
      </h2>
      <p className="text-center text-muted-foreground mb-10 text-lg">
        Miles de personas pierden su vehículo cada día
      </p>
      <div className="space-y-4">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 bg-card rounded-xl p-5 shadow-sm border"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <p.icon className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default ProblemSection;
