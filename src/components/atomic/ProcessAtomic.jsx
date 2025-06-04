/**
 * @component ProcessAtomic
 * @description Atomic implementation of the process cards section
 * @version 1.0.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useResponsive, useDeviceCapabilities } from '../../hooks/useBreakpoint';

// Self-contained data - no external imports
const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Plan',
    desc: 'Define the goal and map the system to achieve it.',
    color: 'text-lime-400',
    bgColor: 'bg-lime-400/10',
    borderColor: 'border-lime-400/30',
    shadowColor: 'shadow-lime-400/20',
  },
  {
    id: 2,
    title: 'Build',
    desc: 'Develop, test, and iterate until stable.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    shadowColor: 'shadow-blue-400/20',
  },
  {
    id: 3,
    title: 'Integrate',
    desc: 'Connect parts and begin first usage loops.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    shadowColor: 'shadow-cyan-400/20',
  },
  {
    id: 4,
    title: 'Deploy',
    desc: 'Launch confidently with visibility and fallback.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/30',
    shadowColor: 'shadow-pink-400/20',
  },
];

const ProcessAtomic = () => {
  // Use unified responsive and capability hooks (replacing individual state)
  const { isMobile } = useResponsive();
  const { prefersReducedMotion } = useDeviceCapabilities();
  
  return (
    <section className="min-h-screen bg-curious-dark-900 py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Section background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-curious-dark-900 to-curious-dark-800 opacity-50"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A systematic approach to building sophisticated AI solutions that deliver real value.
          </p>
        </div>
        
        {/* Process steps - Z-pattern on desktop, stacked on mobile */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-12'}`}>
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              className={`
                p-6 rounded-xl backdrop-blur-sm border 
                ${step.borderColor} ${step.bgColor}
                transition-all duration-300 hover:scale-105
                ${step.shadowColor} shadow-lg
                ${!isMobile && index % 2 !== 0 ? 'justify-self-start' : ''}
                ${!isMobile && index % 2 === 0 ? 'justify-self-end' : ''}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: prefersReducedMotion ? 0.1 : 0.5, 
                delay: prefersReducedMotion ? 0 : index * 0.1 
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            >
              <div className="flex items-start gap-4">
                <div className={`text-3xl font-bold ${step.color}`}>
                  {step.id.toString().padStart(2, '0')}
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${step.color}`}>
                    {step.title}
                  </h3>
                  <p className="text-white/80">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Optional: Connection lines between cards on desktop */}
        {!isMobile && (
          <div className="absolute left-1/2 top-1/2 w-0.5 h-3/4 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-blue-500/20 via-cyan-400/20 to-pink-400/20 z-0"></div>
        )}
      </div>
    </section>
  );
};

export default ProcessAtomic; 