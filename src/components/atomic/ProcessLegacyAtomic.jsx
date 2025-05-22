/**
 * @component ProcessLegacyAtomic
 * @description Self-contained process section with orbital connections - legacy visual style
 * @version 1.0.0
 * @type atomic
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'process_legacy_atomic',
  scs: 'SCS-PROCESS-ORBITAL',
  type: 'atomic',
  doc: 'contract_process_legacy_atomic.md'
};

// Self-contained process steps data - maintains original content
const PROCESS_STEPS = [
  {
    id: 'discover',
    number: '1,034',
    title: 'Discover',
    description: 'Brainwaves about space design—usually on the bus or in the shower.',
    color: 'lime'
  },
  {
    id: 'create',
    number: '2',
    title: 'Create',
    description: 'Hours playing around with wireframes, until I realized it was more efficient to ideate on canvas.',
    color: 'yellow'
  },
  {
    id: 'build',
    number: '3',
    title: 'Build',
    description: 'Crafting elegant code that brings the vision to life with precision and performance.',
    color: 'blue'
  },
  {
    id: 'launch',
    number: '4',
    title: 'Launch',
    description: 'Mission control for deployment, ensuring a flawless journey from development to production.',
    color: 'purple'
  }
];

const ProcessLegacyAtomic = () => {
  // Self-contained responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Handle responsive behavior and reduced motion preference
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkMotionPreference = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Listen for changes
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    };
    
    // Initial checks
    checkResponsive();
    checkMotionPreference();
    
    // Add resize listener
    window.addEventListener('resize', checkResponsive);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);
  
  // Get color class based on color name - maintains original color mapping
  const getColorClass = (color, element) => {
    const colorMap = {
      lime: {
        bg: 'bg-lime-400',
        text: 'text-lime-400',
        border: 'border-lime-400',
        gradient: 'from-lime-400 to-green-600'
      },
      yellow: {
        bg: 'bg-yellow-400',
        text: 'text-yellow-400',
        border: 'border-yellow-400',
        gradient: 'from-yellow-400 to-amber-600'
      },
      blue: {
        bg: 'bg-blue-400',
        text: 'text-blue-400',
        border: 'border-blue-400',
        gradient: 'from-blue-400 to-indigo-600'
      },
      purple: {
        bg: 'bg-purple-400',
        text: 'text-purple-400',
        border: 'border-purple-400',
        gradient: 'from-purple-400 to-violet-600'
      }
    };
    
    return colorMap[color]?.[element] || '';
  };
  
  // Animation variants - respects reduced motion preference
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.7,
        when: "beforeChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.5 }
    }
  };
  
  return (
    <motion.section
      id="process"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-curious-dark-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      variants={containerVariants}
      aria-label="Our Process"
    >
      {/* Section Header */}
      <motion.div className="text-center mb-16 max-w-2xl mx-auto" variants={itemVariants}>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Our <span className="text-lime-400">Process</span>
        </h2>
        <p className="text-lg text-gray-300">
          A thoughtful approach to bringing your vision to life.
          Each step in our journey is designed for clarity, efficiency, and excellence.
        </p>
      </motion.div>
      
      {/* Process Timeline */}
      <div className={`relative ${isMobile ? 'space-y-16' : 'flex flex-wrap justify-center'}`}>
        {/* Connect the dots with orbital path (desktop only) */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100,100 C250,20 550,180 700,100"
                stroke="url(#processGradient)"
                strokeWidth="2"
                strokeDasharray="6,6"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="33%" stopColor="#facc15" />
                  <stop offset="66%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        
        {/* Step Cards */}
        {PROCESS_STEPS.map((step, index) => (
          <motion.div
            key={step.id}
            className={`process-card ${
              isMobile 
                ? 'w-full' 
                : 'w-56 mx-8 transform'
            }`}
            variants={itemVariants}
            whileHover={{ 
              scale: prefersReducedMotion ? 1 : 1.05,
              transition: { duration: 0.2 } 
            }}
          >
            {/* Number with accent color */}
            <div className="flex items-center justify-center mb-4">
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${getColorClass(step.color, 'border')} relative`}
                role="presentation"
              >
                <span className={`font-serif text-xl font-bold ${getColorClass(step.color, 'text')}`}>
                  {step.number}
                </span>
                
                {/* Star accent */}
                <div className={`absolute -top-1 -right-1 w-4 h-4 ${getColorClass(step.color, 'text')}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 1L15 9H23L17 15L19 23L12 19L5 23L7 15L1 9H9L12 1Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="text-center">
              <h3 className={`text-xl font-medium mb-2 ${getColorClass(step.color, 'text')}`}>
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {step.description}
              </p>
            </div>
            
            {/* Orbital dot connector (mobile only) */}
            {isMobile && index < PROCESS_STEPS.length - 1 && (
              <div className="flex justify-center mt-6 opacity-70">
                <div className="h-12 border-l border-dashed border-gray-600"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Bottom CTA */}
      <motion.div className="mt-20" variants={itemVariants}>
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 border border-gray-700 rounded-full text-base font-medium text-white hover:bg-black hover:bg-opacity-50 transition-colors duration-150"
          aria-label="Contact us to start your journey"
        >
          Ready to start your journey?
          <svg className="ml-2 h-5 w-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default ProcessLegacyAtomic; 