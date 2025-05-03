import React from 'react';
import { motion } from 'framer-motion';
import SpaceCanvas from './SpaceCanvas';

/**
 * HeroPortal - Space-themed hero section
 * Features animated portal effect and particle systems
 */
const HeroPortal = () => {
  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* SpaceCanvas integration */}
      <SpaceCanvas />
      
      {/* Background bloom effect */}
      <div className="absolute z-10 w-80 h-80 rounded-full bg-gradient-to-bl from-purple-500/30 to-blue-500/30 blur-3xl animate-pulse top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-30 text-white text-center px-4 py-32 space-y-6"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg"
          animate={{ y: [0, -8, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut"
          }}
        >
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Curious
          </span>
          <span className="inline-block ml-4 text-white">Labs</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 z-20 relative"
        >
          Explore the frontiers of code with our AI-powered development missions
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 z-40 relative"
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold shadow-lg shadow-purple-600/20"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Mission
          </motion.button>
          
          <motion.button
            className="px-8 py-3 border border-purple-500/30 rounded-full text-white font-medium hover:bg-purple-500/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Projects
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop" 
        }}
      >
        <p className="text-gray-400 mb-2 text-sm">Scroll to explore</p>
        <svg 
          className="w-6 h-6 text-gray-400" 
          fill="none" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default HeroPortal; 