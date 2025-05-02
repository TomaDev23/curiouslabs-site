import { motion } from "framer-motion";
import HeroContent from "./HeroContent";
import SimpleStarfield from "./SimpleStarfield";
import useScrollProgress from "../../hooks/useScrollProgress";

/**
 * Main Hero component for the homepage
 * Combines starfield background with content and scroll-based animations
 */
export default function Hero() {
  const scrollProgress = useScrollProgress();
  
  // Calculate opacity and offset based on scroll progress
  const opacity = 1 - Math.min(1, scrollProgress * 3);
  const yOffset = scrollProgress * 200;
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900/10 to-black overflow-hidden">
      <SimpleStarfield />
      
      <motion.div
        className="relative z-10"
        style={{ 
          opacity: opacity,
          transform: `translateY(-${yOffset}px)`
        }}
      >
        <HeroContent />
      </motion.div>
    </section>
  );
} 