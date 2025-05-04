import React from "react";
import { motion } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint.js";

/**
 * SectionHeader component
 * Provides consistent styling for section titles with animations
 */
export default function SectionHeader({ title, subtitle }) {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  return (
    <motion.div 
      className="mb-6 md:mb-10 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-white drop-shadow-md tracking-tight`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          className={`${isMobile ? 'text-base' : 'text-lg'} mt-2 text-purple-300 font-medium max-w-2xl mx-auto`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
} 