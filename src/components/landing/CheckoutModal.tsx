import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { type Currency, formatPrice } from "@/lib/currencies";

const WA_NUMBER = "593981624431";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comboLabel: string;
  total: number;
  addRelay: boolean;
  relayLabel: string;
  currency: Currency;
}

const COUNTRIES = [
  { name: "Ecuador", code: "EC", prefix: "+593", flag: "🇪🇨", currencyCode: "USD" },
  { name: "Colombia", code: "CO", prefix: "+57", flag: "🇨🇴", currencyCode: "COP" },
  { name: "México", code: "MX", prefix: "+52", flag: "🇲🇽", currencyCode: "MXN" },
  { name: "Perú", code: "PE", prefix: "+51", flag: "🇵🇪", currencyCode: "PEN" },
  { name: "Chile", code: "CL", prefix: "+56", flag: "🇨🇱", currencyCode: "CLP" },
  { name: "Argentina", code: "AR", prefix: "+54", flag: "🇦🇷", currencyCode: "ARS" },
  { name: "Bolivia", code: "BO", prefix: "+591", flag: "🇧🇴", currencyCode: "BOB" },
  { name: "Brasil", code: "BR", prefix: "+55", flag: "🇧🇷", currencyCode: "BRL" },
  { name: "Costa Rica", code: "CR", prefix: "+506", flag: "🇨🇷", currencyCode: "" },
  { name: "El Salvador", code: "SV", prefix: "+503", flag: "🇸🇻", currencyCode: "" },
  { name: "Guatemala", code: "GT", prefix: "+502", flag: "🇬🇹", currencyCode: "" },
  { name: "Honduras", code: "HN", prefix: "+504", flag: "🇭🇳", currencyCode: "" },
  { name: "Nicaragua", code: "NI", prefix: "+505", flag: "🇳🇮", currencyCode: "" },
  { name: "Panamá", code: "PA", prefix: "+507", flag: "🇵🇦", currencyCode: "" },
  { name: "Paraguay", code: "PY", prefix: "+595", flag: "🇵🇾", currencyCode: "" },
  { name: "Rep. Dominicana", code: "DO", prefix: "+1", flag: "🇩🇴", currencyCode: "" },
  { name: "Uruguay", code: "UY", prefix: "+598", flag: "🇺🇾", currencyCode: "" },
  { name: "Venezuela", code: "VE", prefix: "+58", flag: "🇻🇪", currencyCode: "" },
];

const getDefaultCountry = (currency: Currency) => {
  const match = COUNTRIES.find(c => c.currencyCode === currency.code);
  return match || COUNTRIES[0]; // default Ecuador
};

const CheckoutModal = ({ open, onOpenChange, comboLabel, total, addRelay, relayLabel, currency }: CheckoutModalProps) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+593");
  const [celular, setCelular] = useState("");
  const [usarOtrosFactura, setUsarOtrosFactura] = useState(false);
  const [facturaNombre, setFacturaNombre] = useState("");
  const [facturaId, setFacturaId] = useState("");
  const [facturaDireccion, setFacturaDireccion] = useState("");

  // Auto-select country and phone prefix based on currency
  useEffect(() => {
    if (open) {
      const defaultCountry = getDefaultCountry(currency);
      setPais(defaultCountry.name);
      setPhonePrefix(defaultCountry.prefix);
    }
  }, [open, currency]);

  const selectedPrefixCountry = COUNTRIES.find(c => c.prefix === phonePrefix);
  const formattedTotal = formatPrice(total, currency);

  const handleSubmit = () => {
    if (!nombre.trim() || !apellido.trim() || !direccion.trim() || !ciudad.trim() || !pais || !celular.trim()) return;
    if (usarOtrosFactura && (!facturaNombre.trim() || !facturaId.trim() || !facturaDireccion.trim())) return;

    const fullPhone = `${phonePrefix} ${celular.trim()}`;
    const lines = [
      "📋 *NUEVA ORDEN — America GPS*",
      "━━━━━━━━━━━━━━━━━━━━━",
      "",
      "🛒 *PRODUCTO*",
      `▸ ${comboLabel}`,
      ...(addRelay ? [`▸ ${relayLabel}`] : []),
      `▸ *Total: ${formattedTotal} ${currency.code}*`,
      "",
      "━━━━━━━━━━━━━━━━━━━━━",
      "📦 *DATOS DE ENVÍO*",
      `▸ Nombre: ${nombre.trim()} ${apellido.trim()}`,
      `▸ Dirección: ${direccion.trim()}`,
      `▸ Ciudad: ${ciudad.trim()}`,
      `▸ País: ${pais}`,
      `▸ Celular: ${fullPhone}`,
    ];

    if (usarOtrosFactura) {
      lines.push(
        "",
        "━━━━━━━━━━━━━━━━━━━━━",
        "🧾 *DATOS DE FACTURACIÓN*",
        `▸ Nombre/Razón social: ${facturaNombre.trim()}`,
        `▸ Identificación: ${facturaId.trim()}`,
        `▸ Dirección: ${facturaDireccion.trim()}`
      );
    }

    lines.push("", "━━━━━━━━━━━━━━━━━━━━━", `Moneda seleccionada: ${currency.code}`, "Enviado desde el sitio web oficial de AmericaGPS");

    const message = lines.join("\n");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isValid =
    nombre.trim() && apellido.trim() && direccion.trim() && ciudad.trim() && pais && celular.trim() &&
    (!usarOtrosFactura || (facturaNombre.trim() && facturaId.trim() && facturaDireccion.trim()));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">📦 Datos de envío</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Completa tus datos para finalizar la orden
          </DialogDescription>
          <div className="bg-accent/30 border border-accent rounded-xl p-3 mt-2 text-left">
            <p className="text-sm text-accent-foreground font-medium leading-relaxed">
              🎉 <strong>¡Felicidades!</strong> Has decidido transformar la seguridad de tu vehículo. Llena los siguientes datos para que recibas el dispositivo en la puerta de tu casa. La orden y el pago lo procesaremos vía WhatsApp con uno de nuestros asesores.
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nombres</label>
              <Input placeholder="Juan" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Apellidos</label>
              <Input placeholder="Pérez" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Dirección exacta</label>
            <Input placeholder="Av. Principal 123, Edificio Sol, Piso 2" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Ciudad</label>
              <Input placeholder="Quito" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">País</label>
              <Select value={pais} onValueChange={setPais}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {COUNTRIES.map(c => (
                    <SelectItem key={c.code} value={c.name}>
                      {c.flag} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Número de celular</label>
            <div className="flex gap-2">
              <Select value={phonePrefix} onValueChange={setPhonePrefix}>
                <SelectTrigger className="w-[130px] shrink-0">
                  <SelectValue>
                    {selectedPrefixCountry ? `${selectedPrefixCountry.flag} ${selectedPrefixCountry.prefix}` : phonePrefix}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {COUNTRIES.map(c => (
                    <SelectItem key={`ph-${c.code}`} value={c.prefix}>
                      {c.flag} {c.name} ({c.prefix})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="999 999 999" value={celular} onChange={(e) => setCelular(e.target.value)} className="flex-1" />
            </div>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Checkbox
              id="billing"
              checked={usarOtrosFactura}
              onCheckedChange={(v) => setUsarOtrosFactura(v === true)}
            />
            <label htmlFor="billing" className="text-sm font-medium cursor-pointer">
              Usar otros datos para facturación
            </label>
          </div>

          {usarOtrosFactura && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3 bg-muted/50 rounded-xl p-4"
            >
              <h4 className="font-bold text-sm">🧾 Datos de facturación</h4>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nombre / Razón social</label>
                <Input placeholder="Empresa S.A." value={facturaNombre} onChange={(e) => setFacturaNombre(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Identificación (CI / RUC)</label>
                <Input placeholder="1712345678001" value={facturaId} onChange={(e) => setFacturaId(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Dirección de facturación</label>
                <Input placeholder="Av. Amazonas N32-12" value={facturaDireccion} onChange={(e) => setFacturaDireccion(e.target.value)} />
              </div>
            </motion.div>
          )}

          {/* Order summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-2">
            <h4 className="font-bold text-sm mb-2">🛒 Resumen de tu orden</h4>
            <p className="text-xs text-muted-foreground">{comboLabel}</p>
            {addRelay && <p className="text-xs text-muted-foreground">{relayLabel}</p>}
            <p className="font-black text-lg text-primary mt-1">Total: {formattedTotal} {currency.code}</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="btn-cta w-full block text-center text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
          >
            ✅ Finalizar mi orden vía WhatsApp
          </button>
          <p className="text-center text-[10px] text-muted-foreground">
            Serás redirigido a WhatsApp con tu orden lista
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
