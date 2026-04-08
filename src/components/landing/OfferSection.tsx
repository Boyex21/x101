import { motion } from "framer-motion";
import { Check, X, Truck, Bluetooth, Wrench, Plus, AlertCircle } from "lucide-react";
import { useState } from "react";

const included = [
  "GPS vehicular Plug & Play",
  "SIM con 1 año de servicio incluido",
  "App móvil completa",
  "Alertas ilimitadas",
  "Soporte técnico",
  "Batería de respaldo",
  "Envío incluido",
  "Renovación: solo $79/año (desde el 2do año)",
];

const OfferSection = () => {
  const [addRelay, setAddRelay] = useState(false);
  const total = addRelay ? 169 : 139;

  return (
    <section id="comprar" className="px-5 py-16 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-black text-center mb-2">
          Todo incluido. <span className="text-primary">Un solo precio.</span>
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">
          America GPS — protección sin complicaciones
        </p>

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
            <h4 className="font-bold text-sm mb-2">America GPS</h4>
            <p className="text-3xl font-black">$139</p>
            <ul className="text-xs mt-3 space-y-1.5 text-left">
              <li className="flex items-center gap-1"><Check className="w-3 h-3 text-accent" /> Plug & Play</li>
              <li className="flex items-center gap-1"><Check className="w-3 h-3 text-accent" /> Todo incluido</li>
              <li className="flex items-center gap-1"><Check className="w-3 h-3 text-accent" /> Envío gratis</li>
            </ul>
          </div>
        </div>

        {/* What's included */}
        <div className="bg-card border rounded-xl p-6 mb-6">
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
            Compatible con carros, motos y camiones · Renovación anual: $79 (a partir del 2do año)
          </p>
        </div>

        {/* Optional: Relay module */}
        <div
          onClick={() => setAddRelay(!addRelay)}
          className={`border-2 rounded-xl p-5 mb-8 cursor-pointer transition-all ${
            addRelay
              ? "border-green-500 bg-green-500/10 shadow-md shadow-green-500/20"
              : "border-border bg-card hover:border-green-400/40"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              addRelay ? "bg-green-500 text-white" : "bg-secondary/10 text-secondary"
            }`}>
              <Plus className={`w-5 h-5 transition-transform ${addRelay ? "rotate-45" : ""}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-sm">Módulo cortacorriente inalámbrico</h4>
                <span className="font-black text-primary text-lg">+$30</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Bloquea el motor de tu vehículo desde la app. Se conecta vía Bluetooth al GPS — sin cables entre módulos.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] bg-secondary/10 text-secondary rounded-full px-2 py-0.5 font-semibold">
                  <Bluetooth className="w-3 h-3" /> Conexión Bluetooth
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-secondary/10 text-secondary rounded-full px-2 py-0.5 font-semibold">
                  <Wrench className="w-3 h-3" /> Requiere instalación
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-secondary/10 text-secondary rounded-full px-2 py-0.5 font-semibold">
                  <Truck className="w-3 h-3" /> Envío incluido
                </span>
              </div>
              <div className="flex items-start gap-1.5 bg-accent/10 rounded-lg p-2">
                <AlertCircle className="w-3.5 h-3.5 text-accent-foreground mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-muted-foreground">
                  <strong>Nota:</strong> El precio del módulo ($30) incluye envío pero <strong>no incluye el costo de instalación</strong> del técnico. Contamos con una red de +300 técnicos en Ecuador y Colombia para la instalación.
                </p>
              </div>
            </div>
          </div>
        </div>

        <a href="#comprar" className="btn-cta w-full block text-center text-xl">
          🛡️ Comprar ahora — ${total}
        </a>
        {addRelay && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            GPS $139 + Módulo cortacorriente $30 (instalación no incluida)
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default OfferSection;
