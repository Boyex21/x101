import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, X, Truck, Bluetooth, Wrench, Plus, AlertCircle, Gift, Calendar } from "lucide-react";
import CheckoutModal from "./CheckoutModal";

const WA_NUMBER = "593997776222";

const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const included = [
  "GPS vehicular Plug & Play",
  "SIM con 1 año de servicio incluido",
  "App móvil completa",
  "Alertas ilimitadas",
  "Soporte técnico",
  "Batería de respaldo",
  "Envío incluido",
  "Renovación: solo $89/año (desde el 2do año)",
];

type ComboType = "single" | "2years" | "duo";

interface OfferSectionProps {
  onPriceChange?: (total: number) => void;
}

const OfferSection = ({ onPriceChange }: OfferSectionProps) => {
  const [addRelay, setAddRelay] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<ComboType>("single");
  const [showCheckout, setShowCheckout] = useState(false);

  const basePrice = selectedCombo === "single" ? 139 : selectedCombo === "2years" ? 200 : 250;
  const relayPrice = selectedCombo === "duo" ? 60 : 30;
  const total = addRelay ? basePrice + relayPrice : basePrice;

  useEffect(() => {
    onPriceChange?.(total);
  }, [total, onPriceChange]);


  const comboLabels: Record<ComboType, string> = {
    single: "GPS America x101 — 1 dispositivo, 1 año de servicio",
    "2years": "GPS America x101 — 1 dispositivo, 2 años de servicio (24 meses)",
    duo: "GPS America x101 — 2 dispositivos, 1 año de servicio cada uno",
  };

  const waMessage = addRelay
    ? `Hola, quiero comprar: ${comboLabels[selectedCombo]} + Módulo cortacorriente inalámbrico. Total: $${total}`
    : `Hola, quiero comprar: ${comboLabels[selectedCombo]}. Total: $${total}`;

  const waUrl = buildWhatsAppUrl(waMessage);

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
            Compatible con carros, motos y camiones · Renovación anual: $89 (a partir del 2do año)
          </p>
        </div>

        {/* Combo selector */}
        <h3 className="font-bold text-lg mb-3 text-center">Elige tu plan:</h3>
        <div className="space-y-3 mb-6">
          {/* Single */}
          <div
            onClick={() => setSelectedCombo("single")}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
              selectedCombo === "single"
                ? "border-primary bg-primary/10 shadow-md shadow-primary/20"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedCombo === "single" ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {selectedCombo === "single" && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm">1 GPS · 1 año de servicio</h4>
                  <p className="text-xs text-muted-foreground">Plan estándar — todo incluido</p>
                </div>
              </div>
              <span className="font-black text-xl text-primary">$139</span>
            </div>
          </div>

          {/* 2 Years */}
          <div
            onClick={() => setSelectedCombo("2years")}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden ${
              selectedCombo === "2years"
                ? "border-accent bg-accent/10 shadow-md shadow-accent/20"
                : "border-border bg-card hover:border-accent/40"
            }`}
          >
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
              AHORRA $28
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedCombo === "2years" ? "border-accent bg-accent" : "border-muted-foreground"
                }`}>
                  {selectedCombo === "2years" && <Check className="w-3 h-3 text-accent-foreground" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <h4 className="font-bold text-sm">1 GPS · 2 años de servicio</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">24 meses consecutivos — sin renovación intermedia</p>
                </div>
              </div>
              <span className="font-black text-xl text-accent">$200</span>
            </div>
          </div>

          {/* Duo */}
          <div
            onClick={() => setSelectedCombo("duo")}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden ${
              selectedCombo === "duo"
                ? "border-green-500 bg-green-500/10 shadow-md shadow-green-500/20"
                : "border-border bg-card hover:border-green-400/40"
            }`}
          >
            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
              MEJOR VALOR
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedCombo === "duo" ? "border-green-500 bg-green-500" : "border-muted-foreground"
                }`}>
                  {selectedCombo === "duo" && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-green-500" />
                    <h4 className="font-bold text-sm">2 GPS · 1 año de servicio c/u</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Para tu familiar, amigo o segundo vehículo</p>
                </div>
              </div>
              <span className="font-black text-xl text-green-500">$250</span>
            </div>
          </div>
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
                <span className="font-black text-primary text-lg">
                  +${relayPrice}{selectedCombo === "duo" && <span className="text-xs font-medium text-muted-foreground ml-1">(x2)</span>}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Bloquea el motor de tu vehículo desde la app. Se conecta vía Bluetooth al GPS — sin cables entre módulos.
                {selectedCombo === "duo" && " (incluye 2 módulos)"}
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
                  <strong>Nota:</strong> El precio del módulo incluye envío pero <strong>no incluye el costo de instalación</strong> del técnico. Contamos con una red de +300 técnicos en Ecuador y Colombia.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => setShowCheckout(true)} className="btn-cta w-full block text-center text-xl">
          🛡️ Comprar ahora — ${total}
        </button>
        <p className="text-center text-xs text-muted-foreground mt-2">
          {selectedCombo === "single" && !addRelay && "GPS x101 · 1 año de servicio · envío incluido"}
          {selectedCombo === "single" && addRelay && `GPS $139 + Módulo cortacorriente $30 (instalación no incluida)`}
          {selectedCombo === "2years" && !addRelay && "GPS x101 · 2 años de servicio (24 meses) · envío incluido"}
          {selectedCombo === "2years" && addRelay && `GPS 2 años $200 + Módulo cortacorriente $30 (instalación no incluida)`}
          {selectedCombo === "duo" && !addRelay && "2x GPS x101 · 1 año de servicio c/u · envío incluido"}
          {selectedCombo === "duo" && addRelay && `2x GPS $250 + 2x Módulo cortacorriente $60 (instalación no incluida)`}
        </p>

        <CheckoutModal
          open={showCheckout}
          onOpenChange={setShowCheckout}
          comboLabel={comboLabels[selectedCombo]}
          total={total}
          addRelay={addRelay}
          relayLabel={selectedCombo === "duo" ? "2x Módulo cortacorriente inalámbrico ($60)" : "Módulo cortacorriente inalámbrico ($30)"}
        />
      </motion.div>
    </section>
  );
};

export default OfferSection;
