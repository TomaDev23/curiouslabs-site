/**
 * @metadata
 * @component TextRevealBlock
 * @description Text reveal animation with character-by-character animation
 * @version 1.0.0
 * @legit true
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TextRevealBlock = ({ className = '', scenePhase }) => {
  // Force complete state for testing
  const forcedPhase = 'complete';

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
  
  // Paragraph animation variant
  const paragraphVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };
  
  // Button animation variant
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" 
      }
    }
  };
  
  // Determine if elements should be visible based on phase
  const isHeaderVisible = forcedPhase !== 'void';
  const isParagraphVisible = forcedPhase === 'activation' || forcedPhase === 'complete';
  const isButtonVisible = forcedPhase === 'complete';
  
  // Split header text into characters for animation
  const headerText = "We bring you a universe of solutions";
  const headerCharacters = headerText.split("");

  return (
    <div className={`flex flex-col items-start max-w-md ${className}`} style={{ width: "38vw" }}>
      {/* Animated header with letter-by-letter animation */}
      <motion.h1 
        className="text-5xl font-bold mb-6 text-white"
        variants={headerTextVariants}
        initial="hidden"
        animate={isHeaderVisible ? "visible" : "hidden"}
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
        variants={paragraphVariants}
        initial="hidden"
        animate={isParagraphVisible ? "visible" : "hidden"}
      >
        We're building next-generation digital experiences powered by cutting-edge AI technology. Join us in shaping tomorrow's web.
      </motion.p>
      
      {/* Animated call-to-action button */}
      <motion.button
        className="px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-curious-dark-900 font-medium rounded-full hover:shadow-lg hover:shadow-lime-400/20 transition-shadow"
        variants={buttonVariants}
        initial="hidden"
        animate={isButtonVisible ? "visible" : "hidden"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Explore Our Universe
      </motion.button>
    </div>
  );
};

export default TextRevealBlock; 