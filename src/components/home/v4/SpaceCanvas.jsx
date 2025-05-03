import React from 'react';
import { motion } from 'framer-motion';

/**
 * SpaceCanvas - Space-themed background for cosmic components
 * Provides the starfield background with pure CSS/React
 */
const SpaceCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black"></div>
      
      {/* Static stars */}
      {[...Array(100)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
      
      {/* Animated stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`animated-star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Nebula effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 bg-blue-500/5 blur-3xl rounded-full"></div>
    </div>
  );
};

export default SpaceCanvas; 