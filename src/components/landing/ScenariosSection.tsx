import { motion } from "framer-motion";
import { Car, Eye, Users } from "lucide-react";
import vehiclesImg from "@/assets/vehicles-types.png";

const scenarios = [
  { icon: Car, title: "Robo en estacionamiento", desc: "Recibes alerta al instante. Ubicas tu auto. Actúas antes de que sea tarde.", color: "bg-destructive/10 text-destructive" },
  { icon: Eye, title: "Monitoreo de flotillas", desc: "Controla todos tus vehículos de trabajo desde una sola app.", color: "bg-primary/10 text-primary" },
  { icon: Users, title: "Seguridad familiar", desc: "Sabe cuándo tu hijo llegó a la escuela o tu pareja al trabajo.", color: "bg-accent/20 text-accent-foreground" },
];

const ScenariosSection = () => (
  <section className="px-5 py-16 max-w-lg mx-auto">
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <h2 className="text-3xl font-black text-center mb-10">
        Imagina estos escenarios…
      </h2>
      <div className="space-y-5 mb-10">
        {scenarios.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-6 border shadow-sm"
          >
            <div className={`w-12 h-12 rounded-full ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-muted-foreground mb-4">Compatible con todo tipo de vehículos</p>
        <img src={vehiclesImg} alt="Compatible con carros, motos y camiones" loading="lazy" width={1024} height={512} className="mx-auto max-w-[320px]" />
      </div>
    </motion.div>
  </section>
);

export default ScenariosSection;
