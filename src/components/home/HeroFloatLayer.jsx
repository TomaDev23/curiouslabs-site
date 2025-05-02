import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';

/**
 * Hero Float Layer Component - Phase 2 Implementation
 * Floating content with staggered animations
 * Enhanced with Tile 1 branding
 */
const HeroFloatLayer = ({ scrollProgress = 0, isLoaded = false, isLowPerf = false, isReducedMotion = false }) => {
  // Calculate opacity based on scroll position to fade out as user scrolls down
  const heroOpacity = Math.max(0, 1 - scrollProgress * 2);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: isReducedMotion ? 0.3 : 0.8,
        staggerChildren: isReducedMotion ? 0.1 : 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: isReducedMotion ? 10 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: isReducedMotion ? 0.3 : 0.5 }
    }
  };
  
  return (
    <div 
      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      style={{ opacity: heroOpacity }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Enhanced hero content with Tile 1 branding */}
          <HeroContent />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroFloatLayer; 