import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../../utils/animation';

/**
 * MagneticButton - Interactive button with magnetic hover effect
 * Tracks cursor position and moves slightly toward it for enhanced interactivity
 */
const MagneticButton = ({ children, className, onClick, strength = 0.2 }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = prefersReducedMotion();
  
  // Skip effect if reduced motion is preferred
  if (reducedMotion) {
    return (
      <motion.button
        className={className}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.button>
    );
  }
  
  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x: x * strength, y: y * strength });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  const buttonStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`
  };
  
  return (
    <motion.button
      ref={buttonRef}
      className={className}
      style={buttonStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton; 