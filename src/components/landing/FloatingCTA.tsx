import { motion } from "framer-motion";

const WA_NUMBER = "593997776222";
const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, quiero comprar el GPS America x101. Vi la oferta en su página web.")}`;

const FloatingCTA = () => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ delay: 2, type: "spring" }}
    className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card/95 backdrop-blur-md border-t shadow-2xl"
  >
    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-cta w-full block text-center">
      🛒 Comprar ahora — $139 · Envío gratis
    </a>
  </motion.div>
);

export default FloatingCTA;
