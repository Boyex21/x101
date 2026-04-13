import { useState } from "react";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const WA_NUMBER = "593981624431";

const FranchiseSection = () => {
  const [open, setOpen] = useState(false);

  const handleContact = () => {
    const message = "Hola, he visitado su landing page y me interesa conocer más sobre la oportunidad de ser socio capitalista o franquiciado de America GPS. Me gustaría agendar una reunión para conocer los montos de inversión y el plan de negocio.";
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section className="section-dark px-5 py-16">
        <div className="max-w-lg mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Handshake className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-3">
              ¿Te gustó nuestra marca y propuesta de valor?
            </h2>
            <p className="text-dark-section-foreground/70 text-sm mb-6">
              Si estás interesado en una franquicia o en ser socio de America GPS, queremos conocerte.
            </p>
            <button onClick={() => setOpen(true)} className="btn-cta text-base">
              🤝 Quiero ser socio · Contáctame
            </button>
          </motion.div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">🤝 Oportunidad de negocio</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Únete a la red de socios de America GPS
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
              <p className="text-sm leading-relaxed">
                Si has llegado aquí es porque te han interesado los servicios que oferta <strong>America GPS</strong> a sus clientes, enfocada en <strong>precios cómodos con productos de calidad</strong>.
              </p>
            </div>

            <p className="text-sm leading-relaxed">
              <strong>¡Hay buenas noticias!</strong> Tenemos una propuesta comercial ya diseñada para que te conviertas en un <strong>socio capitalista de America GPS</strong> y la marca cumpla su propósito de expansión en toda América.
            </p>

            <p className="text-sm text-muted-foreground">
              Solicita una reunión con uno de nuestros asesores dando clic al botón para conocer los montos de inversión y el plan de negocio.
            </p>

            <button onClick={handleContact} className="btn-cta w-full block text-center text-base">
              📩 Solicitar reunión vía WhatsApp
            </button>
            <p className="text-center text-[10px] text-muted-foreground">
              Serás redirigido a WhatsApp con un asesor
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FranchiseSection;
