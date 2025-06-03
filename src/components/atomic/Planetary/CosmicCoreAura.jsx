/**
 * @component CosmicCoreAura
 * @description Radial gradient glow centered around the moon
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - CosmicCoreAura passes LEGIT protocol
 */

import React from 'react';
import { motion } from 'framer-motion';

const CosmicCoreAura = ({ className = "", style = {}, ...props }) => {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 30% 70%, rgba(120,255,180,0.01), transparent 80%)',
        filter: 'blur(100px)',
        mixBlendMode: 'screen',
        zIndex: 30,
        ...style
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      {...props}
    />
  );
};

export default CosmicCoreAura; 