/**
 * @component CosmicHorizonFade
 * @description Smooth vertical dissolve gradient for cosmic backgrounds
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - CosmicHorizonFade passes LEGIT protocol
 */

import React from 'react';
import { motion } from 'framer-motion';

const CosmicHorizonFade = ({ className = "", style = {}, direction = "bottom", ...props }) => {
  // Determine gradient direction
  let gradientStyle = {};
  
  if (direction === "bottom") {
    gradientStyle = {
      background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0) 0%, #0f172a 100%)'
    };
  } else if (direction === "top") {
    gradientStyle = {
      background: 'linear-gradient(to top, rgba(15, 23, 42, 0) 0%, #0f172a 100%)'
    };
  } else if (direction === "both") {
    gradientStyle = {
      background: 'linear-gradient(to bottom, #0f172a 0%, rgba(15, 23, 42, 0) 40%, rgba(15, 23, 42, 0) 60%, #0f172a 100%)'
    };
  }
  
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        ...gradientStyle,
        zIndex: 35,
        ...style
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      {...props}
    />
  );
};

export default CosmicHorizonFade; 