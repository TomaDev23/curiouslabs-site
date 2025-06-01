/**
 * @component ProcessLegacyAtomic
 * @description Self-contained process section with orbital connections and cosmic theming
 * @version 2.0.0
 * @type atomic
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'process_legacy_atomic',
  scs: 'SCS-PROCESS-ORBITAL',
  type: 'atomic',
  doc: 'contract_process_legacy_atomic.md'
};

// Enhanced process steps data with cosmic theming
const PROCESS_STEPS = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    subtitle: 'Cosmic Reconnaissance',
    description: 'We map the unknown territories of your vision, identifying opportunities and challenges across the digital cosmos.',
    longDescription: 'Deep exploration of your business landscape, user needs, and market opportunities through strategic research and analysis.',
    color: 'lime',
    icon: '🔭',
    coordinates: 'SECTOR-ALPHA',
    status: 'SCANNING'
  },
  {
    id: 'create',
    number: '02',
    title: 'Create',
    subtitle: 'Design Synthesis',
    description: 'Transforming insights into elegant wireframes and prototypes that bridge imagination with reality.',
    longDescription: 'Iterative design process combining user experience research with cutting-edge interface design principles.',
    color: 'yellow',
    icon: '⚡',
    coordinates: 'SECTOR-BETA',
    status: 'DESIGNING'
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    subtitle: 'Code Architecture',
    description: 'Crafting robust, scalable systems with precision engineering and performance optimization.',
    longDescription: 'Full-stack development using modern frameworks, AI integration, and enterprise-grade architecture.',
    color: 'blue',
    icon: '🚀',
    coordinates: 'SECTOR-GAMMA',
    status: 'BUILDING'
  },
  {
    id: 'launch',
    number: '04',
    title: 'Launch',
    subtitle: 'Mission Control',
    description: 'Orchestrating seamless deployment with continuous monitoring and optimization protocols.',
    longDescription: 'DevOps excellence ensuring flawless journey from development to production with ongoing support.',
    color: 'purple',
    icon: '🌟',
    coordinates: 'SECTOR-DELTA',
    status: 'DEPLOYING'
  }
];

// Enhanced orbital connection system
const OrbitalConnections = ({ activeStep, isMobile, prefersReducedMotion }) => {
  if (isMobile || prefersReducedMotion) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <svg className="w-full h-full max-w-6xl" viewBox="0 0 1000 400" fill="none">
        {/* Main orbital path */}
        <motion.path
          d="M150,200 Q350,80 500,200 T850,200"
          stroke="url(#orbitalGradient)"
          strokeWidth="2"
          strokeDasharray="8,12"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Energy pulses */}
        <motion.circle
          r="4"
          fill="url(#pulseGradient)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            offsetDistance: ["0%", "100%"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            offsetPath: "path('M150,200 Q350,80 500,200 T850,200')"
          }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#facc15" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="pulseGradient">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

// Enhanced process step card
const ProcessStepCard = ({ step, index, isActive, onActivate, isMobile, prefersReducedMotion }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-20%" });
  
  // Get color classes
  const getColorClass = (color, element) => {
    const colorMap = {
      lime: {
        bg: 'bg-lime-400',
        text: 'text-lime-400',
        border: 'border-lime-400',
        gradient: 'from-lime-400/20 to-green-600/20',
        glow: 'shadow-lime-400/50'
      },
      yellow: {
        bg: 'bg-yellow-400',
        text: 'text-yellow-400',
        border: 'border-yellow-400',
        gradient: 'from-yellow-400/20 to-amber-600/20',
        glow: 'shadow-yellow-400/50'
      },
      blue: {
        bg: 'bg-blue-400',
        text: 'text-blue-400',
        border: 'border-blue-400',
        gradient: 'from-blue-400/20 to-indigo-600/20',
        glow: 'shadow-blue-400/50'
      },
      purple: {
        bg: 'bg-purple-400',
        text: 'text-purple-400',
        border: 'border-purple-400',
        gradient: 'from-purple-400/20 to-violet-600/20',
        glow: 'shadow-purple-400/50'
      }
    };
    return colorMap[color]?.[element] || '';
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer ${
        isMobile ? 'w-full mb-8' : 'w-72 mx-6'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        delay: prefersReducedMotion ? 0 : index * 0.2,
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: prefersReducedMotion ? 1 : 1.02,
        transition: { duration: 0.2 }
      }}
      onClick={() => onActivate(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card background with cosmic gradient */}
      <div className={`
        relative p-8 rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm
        ${isActive ? 
          `${getColorClass(step.color, 'border')} bg-gradient-to-br ${getColorClass(step.color, 'gradient')} shadow-2xl ${getColorClass(step.color, 'glow')}` :
          'border-gray-700 bg-gray-900/50 hover:border-gray-600'
        }
      `}>
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? getColorClass(step.color, 'bg') : 'bg-gray-600'}`} />
          <span className={`text-xs font-mono ${isActive ? getColorClass(step.color, 'text') : 'text-gray-400'}`}>
            {step.status}
          </span>
        </div>
        
        {/* Step number with enhanced styling */}
        <div className="flex items-center justify-center mb-6">
          <div className={`
            relative w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300
            ${isActive ? 
              `${getColorClass(step.color, 'border')} ${getColorClass(step.color, 'bg')} shadow-lg ${getColorClass(step.color, 'glow')}` :
              'border-gray-600 bg-gray-800'
            }
          `}>
            <span className={`font-mono text-2xl font-bold ${isActive ? 'text-black' : getColorClass(step.color, 'text')}`}>
              {step.number}
            </span>
            
            {/* Orbital ring */}
            {isActive && !prefersReducedMotion && (
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${getColorClass(step.color, 'border')} opacity-50`}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transform: 'scale(1.3)' }}
              />
            )}
            
            {/* Icon overlay */}
            <div className="absolute -top-2 -right-2 text-2xl">
              {step.icon}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center space-y-4">
          <div>
            <h3 className={`text-2xl font-bold mb-1 ${isActive ? getColorClass(step.color, 'text') : 'text-white'}`}>
              {step.title}
            </h3>
            <p className={`text-sm font-mono ${isActive ? getColorClass(step.color, 'text') : 'text-gray-400'}`}>
              {step.subtitle}
            </p>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            {isHovered && !isMobile ? step.longDescription : step.description}
          </p>
          
          {/* Coordinates */}
          <div className="pt-4 border-t border-gray-700">
            <span className={`text-xs font-mono ${getColorClass(step.color, 'text')}`}>
              {step.coordinates}
            </span>
          </div>
        </div>
        
        {/* Hover glow effect */}
        {isHovered && !prefersReducedMotion && (
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getColorClass(step.color, 'gradient')} opacity-20`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

const ProcessLegacyAtomic = () => {
  // Enhanced state management
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  // Handle responsive behavior and reduced motion preference
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    const checkMotionPreference = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    };
    
    checkResponsive();
    checkMotionPreference();
    
    window.addEventListener('resize', checkResponsive);
    
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);
  
  // Auto-advance steps
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % PROCESS_STEPS.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, prefersReducedMotion]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.8,
        when: "beforeChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.6 }
    }
  };
  
  return (
    <motion.section
      ref={sectionRef}
      id="process"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      aria-label="Our Development Process"
    >
      {/* Section Header */}
      <motion.div 
        className="relative z-10 text-center mb-20 max-w-4xl mx-auto" 
        variants={headerVariants}
      >
        <motion.div
          className="inline-block mb-4 px-4 py-2 border border-cyan-400/30 rounded-full bg-cyan-400/10 backdrop-blur-sm"
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
        >
          <span className="text-cyan-400 text-sm font-mono">MISSION PROTOCOL</span>
        </motion.div>
        
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
          Our <span className="text-lime-400">Process</span>
        </h2>
        
        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          A systematic approach to transforming your vision into reality.
          Each phase is carefully orchestrated for maximum impact and precision.
        </p>
        
        {/* Mission status */}
        <div className="mt-8 flex items-center justify-center space-x-6 text-sm font-mono">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400">SYSTEMS OPERATIONAL</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span className="text-cyan-400">PHASE {activeStep + 1}/4</span>
          </div>
        </div>
      </motion.div>
      
      {/* Process Steps */}
      <div className={`relative z-10 ${
        isMobile 
          ? 'flex flex-col items-center w-full max-w-md mx-auto' 
          : 'flex flex-wrap justify-center items-start'
      }`}>
        {PROCESS_STEPS.map((step, index) => (
          <ProcessStepCard
            key={step.id}
            step={step}
            index={index}
            isActive={index === activeStep}
            onActivate={setActiveStep}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
      
      {/* Navigation dots */}
      <motion.div 
        className="relative z-10 flex items-center justify-center space-x-4 mt-16"
        variants={headerVariants}
      >
        {PROCESS_STEPS.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeStep 
                ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            onClick={() => setActiveStep(index)}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </motion.div>
      
      {/* Bottom CTA */}
      <motion.div className="relative z-10 mt-20" variants={headerVariants}>
        <motion.a
          href="#contact"
          className="inline-flex items-center px-8 py-4 border-2 border-cyan-400/50 rounded-full text-lg font-medium text-white bg-cyan-400/10 hover:bg-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
          whileHover={{ 
            scale: prefersReducedMotion ? 1 : 1.05,
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)"
          }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
          aria-label="Start your mission with us"
        >
          <span className="mr-3">🚀</span>
          Ready to launch your mission?
          <svg className="ml-3 h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.a>
      </motion.div>
      
      {/* Orbital connections */}
      <OrbitalConnections activeStep={activeStep} isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
    </motion.section>
  );
};

export default ProcessLegacyAtomic; 