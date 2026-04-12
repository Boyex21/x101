import { motion } from "framer-motion";
import { Check, Clock, Shield, Phone, MapPin, Radio, Bell, Headphones, Eye } from "lucide-react";
import { type Currency, formatPrice } from "@/lib/currencies";

interface ServicePlansSectionProps {
  currency?: Currency;
}

const ServicePlansSection = ({ currency }: ServicePlansSectionProps) => {
  const fp = (usd: number) => {
    if (!currency) return `$${usd}`;
    return formatPrice(usd, currency);
  };

  return (
    <section className="px-5 py-16 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-black text-center mb-2">
          ¿Qué incluye el <span className="text-primary">servicio anual</span>?
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">
          Conoce en detalle lo que obtienes con tu plan
        </p>

        <div className="space-y-5">
          {/* Plan base */}
          <div className="border-2 border-primary rounded-2xl p-6 bg-primary/5 relative">
            <div className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              INCLUIDO EN TU PLAN
            </div>
            <h3 className="font-black text-lg mt-2 mb-1">Servicio Anual GPS</h3>
            <p className="text-2xl font-black text-primary mb-4">{fp(89)}<span className="text-sm font-medium text-muted-foreground">/año</span></p>
            <div className="space-y-3">
              {[
                { icon: Headphones, text: "Asistencia y soporte técnico en horario laboral × 1 año" },
                { icon: Shield, text: "Soporte en configuración del dispositivo × 1 año" },
                { icon: Clock, text: "Coordinación de mantenimientos físicos × 1 año" },
                { icon: Check, text: "Solución en caso de novedades × 1 año" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complemento 1 */}
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-2xl p-6 bg-muted/30 relative opacity-80">
            <div className="absolute -top-3 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
              PRÓXIMAMENTE
            </div>
            <div className="flex items-center justify-between mt-2 mb-4">
              <h3 className="font-black text-lg">Complemento #1</h3>
              <span className="text-xl font-black text-accent">+{fp(40)}<span className="text-xs font-medium text-muted-foreground">/año</span></span>
            </div>
            <div className="space-y-3">
              {[
                { icon: Phone, text: "Asistencia telefónica para emergencias 24/7 × 1 año" },
                { icon: MapPin, text: "Asistencia en búsqueda y recuperación vehicular × 1 año" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-3.5 h-3.5 text-accent-foreground" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complemento 2 */}
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-2xl p-6 bg-muted/30 relative opacity-80">
            <div className="absolute -top-3 left-4 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
              PRÓXIMAMENTE
            </div>
            <div className="flex items-center justify-between mt-2 mb-4">
              <h3 className="font-black text-lg">Complemento #2</h3>
              <span className="text-xl font-black text-secondary">+{fp(60)}<span className="text-xs font-medium text-muted-foreground">/año</span></span>
            </div>
            <div className="space-y-3">
              {[
                { icon: Headphones, text: "Asistencia por call center 24/7" },
                { icon: Eye, text: "Monitoreo de rutas" },
                { icon: Bell, text: "Monitoreo de alertas" },
                { icon: Radio, text: "Central de monitoreo" },
                { icon: Phone, text: "Llamadas por alertas" },
                { icon: MapPin, text: "Asistencia en búsqueda y recuperación vehicular × 1 año" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServicePlansSection;
