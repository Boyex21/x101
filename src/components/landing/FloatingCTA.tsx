import { motion } from "framer-motion";

interface FloatingCTAProps {
  onBuyClick: () => void;
}

const FloatingCTA = ({ onBuyClick }: FloatingCTAProps) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, type: "spring" }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card/95 backdrop-blur-md border-t shadow-2xl"
    >
      <button onClick={onBuyClick} className="btn-cta w-full block text-center">
        🛒 Ordenar ahora · Envío gratis
      </button>
    </motion.div>
  );
};

export default FloatingCTA;
