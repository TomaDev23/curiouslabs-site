/**
 * @component HeroAtomic
 * @description Self-contained hero section with planet visual and animated headline
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroVisualPlanet from './HeroVisualPlanet';
import BackgroundLayerAtomic from './BackgroundLayerAtomic';

// Export metadata for LEGIT compliance
export const metadata = {
  id: 'hero_atomic',
  scs: 'SCS-HERO-AEGIS',
  type: 'atomic',
  doc: 'contract_heroAtomic.md'
};

const HeroAtomic = () => {
  // Internal phase state management
  const [phase, setPhase] = useState('void');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes to the prefers-reduced-motion media query
    const handleMediaChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);
  
  // Automatic phase progression
  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      setPhase('activation');
      return;
    }
    
    // Phase timing (in milliseconds)
    const emergenceDelay = 1000;
    const activationDelay = 2500;
    
    // Schedule phase transitions
    const emergenceTimer = setTimeout(() => {
      setPhase('emergence');
    }, emergenceDelay);
    
    const activationTimer = setTimeout(() => {
      setPhase('activation');
    }, activationDelay);
    
    // Clean up timers on unmount
    return () => {
      clearTimeout(emergenceTimer);
      clearTimeout(activationTimer);
    };
  }, [prefersReducedMotion]);
  
  // Header text animation variant
  const headerTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      }
    }
  };
  
  // Character animation variant
  const characterVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Split header text into characters for animation
  const headerText = "We bring you a universe of solutions";
  const headerCharacters = headerText.split("");
  
  // Determine if elements should be visible based on phase
  const isHeaderVisible = phase !== 'void';
  
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background layer */}
      <BackgroundLayerAtomic phase={phase} />
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 py-16">
        {/* Left side: Planet visualization */}
        <div className="relative w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <HeroVisualPlanet 
            phase={phase} 
            className="w-[45vmin] h-[45vmin] md:w-[50vmin] md:h-[50vmin]"
            size={400}
          />
        </div>
        
        {/* Right side: Text content */}
        <div className="w-full md:w-1/2 flex flex-col items-start max-w-md">
          {/* Animated header with letter-by-letter animation */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            variants={headerTextVariants}
            initial="hidden"
            animate={isHeaderVisible ? "visible" : "hidden"}
            role="heading"
            aria-level={1}
          >
            {headerCharacters.map((char, index) => (
              <motion.span 
                key={`char-${index}`} 
                variants={characterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Animated paragraph */}
          <motion.p 
            className="text-xl text-white/80 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: phase === 'activation' ? 1 : 0, 
              y: phase === 'activation' ? 0 : 15 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            We're building next-generation digital experiences powered by cutting-edge AI technology. Join us in shaping tomorrow's web.
          </motion.p>
          
          {/* Animated call-to-action button */}
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-curious-dark-900 font-medium rounded-full hover:shadow-lg hover:shadow-lime-400/20 transition-shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: phase === 'activation' ? 1 : 0, 
              scale: phase === 'activation' ? 1 : 0.9 
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Our Universe
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroAtomic; 