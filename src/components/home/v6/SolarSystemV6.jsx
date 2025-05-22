import React from 'react';
import { motion } from 'framer-motion';

/**
 * SolarSystemV6 - A collection of animated space-themed visual effects
 * Adapted from elements previously in v4/MissionStatement.jsx
 */

export const metadata = {
  id: 'solar_system_v6',
  scs: 'SCS-VISUAL-FX-COMPLEX', // Security Compliance String
  type: 'visual', // Component type: visual, ui, core, layout, etc.
  doc: 'contract_solar_system_v6.md' // Placeholder for future contract document
};

const SolarSystemV6 = () => {
  // Note: The original v4 component used useScrollReveal for the section.
  // This component will rely on its parent for scroll-based activation if needed,
  // or elements can use whileInView individually as some do.

  return (
    <motion.div className="relative w-full h-full isolate"> {/* Using isolate for stacking context for children */}
      
      {/* Green Nebula 1 (Top-Right from v4) */}
      <motion.div 
        className="absolute top-[10%] right-0 w-[30rem] h-[20rem] rounded-full filter blur-[80px]"
        initial={{ 
          opacity: 0.4,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(74, 222, 128, 0.35), rgba(22, 163, 74, 0.2) 40%, transparent 80%)'
        }}
        animate={{ 
          opacity: 0.4,
          background: [
            'radial-gradient(ellipse at 60% 40%, rgba(74, 222, 128, 0.35), rgba(22, 163, 74, 0.2) 40%, transparent 80%)',
            'radial-gradient(ellipse at 62% 38%, rgba(74, 222, 128, 0.32), rgba(249, 115, 22, 0.18) 45%, transparent 82%)', // Orange hint from original
            'radial-gradient(ellipse at 61% 39%, rgba(74, 222, 128, 0.35), rgba(22, 163, 74, 0.2) 40%, transparent 80%)'
          ]
        }}
        style={{
          transform: 'rotate(-15deg)'
          // Consider z-index if layering with other elements in SolarSystemV6
        }}
        transition={{ 
          background: {
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: [0.45, 0.05, 0.55, 0.95]
          }
        }}
      />
      
      {/* Green Nebula 2 (Bottom-Left from v4) */}
      <motion.div 
        className="absolute bottom-[10%] left-0 w-[30rem] h-[20rem] rounded-full filter blur-[80px]"
        initial={{ 
          opacity: 0.4,
          background: 'radial-gradient(ellipse at 30% 70%, rgba(22, 163, 74, 0.35), rgba(74, 222, 128, 0.2) 45%, transparent 85%)'
        }}
        animate={{ 
          opacity: 0.4,
          background: [
            'radial-gradient(ellipse at 30% 70%, rgba(22, 163, 74, 0.35), rgba(74, 222, 128, 0.2) 45%, transparent 85%)',
            'radial-gradient(ellipse at 32% 68%, rgba(249, 115, 22, 0.18), rgba(74, 222, 128, 0.32) 50%, transparent 82%)', // Orange hint
            'radial-gradient(ellipse at 30% 70%, rgba(22, 163, 74, 0.35), rgba(74, 222, 128, 0.2) 45%, transparent 85%)'
          ]
        }}
        style={{
          transform: 'rotate(15deg)'
          // Consider z-index
        }}
        transition={{ 
          background: {
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 3
          }
        }}
      />
      
      {/* Modified Positioning Wrapper for Burst and Station */}
      <div 
        className="absolute inset-0 flex justify-center items-center" // Kept flex center
      >
        {/* Red Star Burst from v4 - Positioned left of center */}
        <motion.div 
          className="relative h-0" 
          style={{ marginRight: '150px', zIndex: 10 }} // Added zIndex: 10
          initial={{ opacity: 0, scale: 0.5 }} // Re-enabled animation
          whileInView={{ opacity: 0.35, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="w-[1px] h-[1px] relative"> {/* Origin for lines */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={`starburst-line-${i}`} 
                className="absolute w-[450px] h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
                style={{ transform: `rotate(${i * 22.5}deg)` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Space Station / Orbital System from v4 - Positioned right of center */}
        <motion.div 
          className="relative" 
          style={{ zIndex: 20 }} // Added zIndex: 20
        >
          <div className="relative aspect-square w-[240px] h-[240px] md:w-[320px] md:h-[320px]">
            {/* Space station design using CSS */}
            <div className="absolute inset-0 bg-gray-900/70 rounded-full border border-gray-700 backdrop-blur-md"></div>
            
            {/* Orbital rings */}
            <motion.div 
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-curious-purple-500/30 rounded-full"></div>
            </motion.div>
            
            <motion.div 
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border border-curious-blue-500/30 rounded-full"></div>
            </motion.div>
            
            {/* Central hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-gradient-to-br from-curious-purple-900/80 to-gray-900/80 rounded-full border border-curious-purple-500/50 backdrop-blur-md">
              {/* Pulsing core */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-gradient-to-br from-curious-purple-500 to-curious-blue-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
            </div>
            
            {/* Orbital satellites */}
            <motion.div 
              className="absolute top-[10%] left-[10%] w-4 h-4 bg-curious-blue-500 rounded-full shadow-lg shadow-curious-blue-500/50" // Assuming curious-blue-500 is defined
              animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 10px 2px rgba(59, 130, 246, 0.5)", "0 0 20px 4px rgba(59, 130, 246, 0.7)", "0 0 10px 2px rgba(59, 130, 246, 0.5)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            
            <motion.div 
              className="absolute bottom-[20%] right-[15%] w-6 h-6 bg-curious-purple-500 rounded-full shadow-lg shadow-curious-purple-500/50"
              animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 10px 2px rgba(147, 51, 234, 0.5)", "0 0 20px 4px rgba(147, 51, 234, 0.7)", "0 0 10px 2px rgba(147, 51, 234, 0.5)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            
            <motion.div 
              className="absolute top-[60%] left-[20%] w-5 h-5 bg-curious-green-500 rounded-full shadow-lg shadow-curious-green-500/50" // Assuming curious-green-500 is defined
              animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 10px 2px rgba(16, 185, 129, 0.5)", "0 0 20px 4px rgba(16, 185, 129, 0.7)", "0 0 10px 2px rgba(16, 185, 129, 0.5)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default SolarSystemV6; 