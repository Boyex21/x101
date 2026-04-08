import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Carlos M.", msg: "Lo instalé yo solo en 5 minutos. Ahora sé dónde está mi camioneta todo el tiempo. ¡Increíble! 🙌", stars: 5 },
  { name: "María L.", msg: "Me robaron el auto hace un año. Con America GPS lo hubiera recuperado. Ahora lo tengo en mis 2 carros.", stars: 5 },
  { name: "Roberto S.", msg: "Tengo una flotilla de 8 vehículos. America GPS me ahorra dinero y dolores de cabeza.", stars: 5 },
];

const whatsappMsgs = [
  { name: "Ana G.", msg: "¡Amiga! Me acabo de comprar el GPS de America GPS que viste en Facebook. Es buenísimo 😍" },
  { name: "Pedro R.", msg: "Hermano, ya lo instalé. Literal 3 minutos y ya estoy rastreando desde el celular 🔥" },
];

const TestimonialsSection = () => (
  <section className="section-dark px-5 py-16">
    <div className="max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-black text-center mb-2">
          +2,500 personas ya confían en <span className="text-primary">America GPS</span>
        </h2>
        <p className="text-center text-dark-section-foreground/60 mb-10">
          Y no paran de recomendarlo
        </p>
        <div className="space-y-4 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/5 border border-dark-section-foreground/10 rounded-xl p-5"
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm mb-2">"{t.msg}"</p>
              <span className="text-xs text-dark-section-foreground/50 font-semibold">— {t.name}</span>
            </motion.div>
          ))}
        </div>
        <h3 className="font-bold text-center mb-4 text-lg">Lo que dicen en WhatsApp:</h3>
        <div className="space-y-4">
          {whatsappMsgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="whatsapp-bubble">
                <span className="font-bold text-xs text-primary block mb-1">{m.name}</span>
                {m.msg}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;
