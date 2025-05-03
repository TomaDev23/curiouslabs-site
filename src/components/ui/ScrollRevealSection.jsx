import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, sectionVariants } from '../../utils/animation';

/**
 * ScrollRevealSection - Reusable wrapper for scroll-triggered reveals
 * Uses IntersectionObserver through useScrollReveal to trigger animations when element enters viewport
 */
const ScrollRevealSection = ({ 
  children, 
  className, 
  threshold = 0.1,
  customVariants = null,
  ...props 
}) => {
  const { ref, inView } = useScrollReveal(threshold);
  
  return (
    <motion.section 
      ref={ref}
      className={className}
      variants={customVariants || sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default ScrollRevealSection; 