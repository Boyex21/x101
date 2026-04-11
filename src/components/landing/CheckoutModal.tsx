import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

const WA_NUMBER = "593997776222";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comboLabel: string;
  total: number;
  addRelay: boolean;
  relayLabel: string;
}

const CheckoutModal = ({ open, onOpenChange, comboLabel, total, addRelay, relayLabel }: CheckoutModalProps) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [celular, setCelular] = useState("");
  const [usarOtrosFactura, setUsarOtrosFactura] = useState(false);
  const [facturaNombre, setFacturaNombre] = useState("");
  const [facturaId, setFacturaId] = useState("");
  const [facturaDireccion, setFacturaDireccion] = useState("");

  const handleSubmit = () => {
    if (!nombre.trim() || !apellido.trim() || !direccion.trim() || !ciudad.trim() || !pais.trim() || !celular.trim()) return;
    if (usarOtrosFactura && (!facturaNombre.trim() || !facturaId.trim() || !facturaDireccion.trim())) return;

    const lines = [
      "📋 *NUEVA ORDEN — America GPS*",
      "━━━━━━━━━━━━━━━━━━━━━",
      "",
      "🛒 *PRODUCTO*",
      `▸ ${comboLabel}`,
      ...(addRelay ? [`▸ ${relayLabel}`] : []),
      `▸ *Total: $${total}*`,
      "",
      "━━━━━━━━━━━━━━━━━━━━━",
      "📦 *DATOS DE ENVÍO*",
      `▸ Nombre: ${nombre.trim()} ${apellido.trim()}`,
      `▸ Dirección: ${direccion.trim()}`,
      `▸ Ciudad: ${ciudad.trim()}`,
      `▸ País: ${pais.trim()}`,
      `▸ Celular: ${celular.trim()}`,
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

    lines.push("", "━━━━━━━━━━━━━━━━━━━━━", "Enviado desde: x101.lovable.app");

    const message = lines.join("\n");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isValid =
    nombre.trim() && apellido.trim() && direccion.trim() && ciudad.trim() && pais.trim() && celular.trim() &&
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
              <Input placeholder="Ecuador" value={pais} onChange={(e) => setPais(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Número de celular</label>
            <Input placeholder="+593 999 999 999" value={celular} onChange={(e) => setCelular(e.target.value)} />
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
            <p className="font-black text-lg text-primary mt-1">Total: ${total}</p>
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
