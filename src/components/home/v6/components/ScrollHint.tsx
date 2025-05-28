/**
 * @component ScrollHint
 * @description Displays a blinking scroll indicator during idle phase
 */

import React from 'react';
import { motion } from 'framer-motion';

export const ScrollHint: React.FC = () => {
  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60 pointer-events-none select-none z-[240]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-white/60"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className="text-sm font-light tracking-wider uppercase">
        Scroll to enter
      </span>
    </motion.div>
  );
};

export default ScrollHint; 