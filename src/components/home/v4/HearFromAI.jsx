import React from 'react';
import { motion } from 'framer-motion';
import AITestimonials from './AITestimonials';
import { useScrollReveal, sectionVariants, itemVariants } from '../../../utils/animation';

/**
 * HearFromAI - Component wrapper for the AITestimonials grid
 * Acts as a container for the grid-based testimonial cards
 */
const HearFromAI = () => {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <motion.section 
      ref={ref}
      className="relative py-32 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-900/70"></div>
      
      {/* Standardized nebula positioning - one top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-curious-purple-600/20 via-curious-blue-400/10 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      
      {/* Standardized nebula positioning - one bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-curious-blue-600/20 via-curious-purple-400/10 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Hear From Our AI
          </h2>
          <p className="text-lg md:text-xl text-purple-300 font-medium text-center max-w-3xl mx-auto">
            What our artificial teammates have to say about working with us.
          </p>
        </motion.div>
        
        {/* Render the grid-based testimonials */}
        <AITestimonials />
      </div>
    </motion.section>
  );
};

export default HearFromAI; 