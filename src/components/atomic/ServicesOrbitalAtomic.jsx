/**
 * @component ServicesOrbitalAtomic
 * @description Self-contained services section with orbital visualization
 * @version 1.0.0
 * @type atomic
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'services_orbital_atomic',
  scs: 'SCS-SERVICE-COSMIC',
  type: 'atomic',
  doc: 'contract_services_orbital_atomic.md'
};

// Self-contained services data
const SERVICES = [
  {
    id: 'ai',
    title: 'AI Development',
    description: 'Advanced artificial intelligence solutions with multi-agent systems, LLMs, and knowledge graph integration.',
    color: '#84cc16', // lime
    gradient: 'from-lime-500/20 to-emerald-700/20',
    orbitColor: 'bg-lime-400'
  },
  {
    id: 'product',
    title: 'Product Launches',
    description: 'We take your product from zero to launch with design, development, and branding strategies.',
    color: '#0d9488', // teal
    gradient: 'from-teal-500/20 to-cyan-700/20',
    orbitColor: 'bg-teal-400'
  },
  {
    id: 'saas',
    title: 'SaaS Platforms',
    description: 'Fully managed platforms with DevOps, UX design, growth funnels, and continuous optimization.',
    color: '#7e22ce', // purple
    gradient: 'from-purple-500/20 to-violet-700/20',
    orbitColor: 'bg-purple-400'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    description: 'We advise founders on strategy, design, and technical direction to accelerate growth and innovation.',
    color: '#d97706', // amber
    gradient: 'from-amber-500/20 to-orange-700/20',
    orbitColor: 'bg-amber-400'
  }
];

const ServicesOrbitalAtomic = () => {
  // Self-contained state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Current active service
  const activeService = SERVICES[activeIndex];
  
  // Handle responsive behavior and reduced motion preference
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
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
  
  // Auto-rotate services (disabled when hovering or reduced motion is preferred)
  useEffect(() => {
    if (prefersReducedMotion || isHovering) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SERVICES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHovering]);
  
  // Animation variants
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
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.3 }
    }
  };
  
  return (
    <motion.section 
      id="services" 
      className="min-h-screen relative flex items-center justify-center py-24 px-4 md:px-8 bg-curious-dark-900 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      variants={containerVariants}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label="Our Services"
    >
      {/* Cosmic background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-curious-dark-900 via-curious-dark-950 to-black opacity-80"></div>
      
      {/* Orbital background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {SERVICES.map((_, index) => (
          <motion.div
            key={`orbit-${index}`}
            className={`absolute border rounded-full transition-all duration-700
              ${index === activeIndex ? 'border-opacity-40' : 'border-opacity-20'}`}
            style={{
              width: `${(index + 2) * (isMobile ? 20 : 25)}%`,
              height: `${(index + 2) * (isMobile ? 20 : 25)}%`,
              borderColor: SERVICES[index].color,
              transform: `rotate(${index * 45}deg)`,
            }}
            animate={{
              rotate: prefersReducedMotion ? 0 : [index * 45, index * 45 + 360],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 120 - index * 20,
                ease: "linear"
              }
            }}
          />
        ))}
      </div>
      
      {/* Central "cosmic core" */}
      <motion.div 
        className="absolute z-0"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${activeService.color}30 0%, ${activeService.color}10 50%, transparent 80%)`,
            boxShadow: `0 0 60px ${activeService.color}20`
          }}
        ></div>
      </motion.div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions tailored to your unique challenges
          </p>
        </motion.div>
        
        {/* Services content - flex layout changes based on screen size */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between`}>
          {/* Left side: Service cards */}
          <motion.div 
            className={`relative ${isMobile ? 'w-full mb-12' : 'w-1/2'} h-[300px] md:h-[350px]`}
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className="absolute top-0 left-0 w-full"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={cardVariants}
              >
                <div className={`p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br ${activeService.gradient}
                  border border-gray-700/50 shadow-lg`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full ${activeService.orbitColor} mr-3`} />
                    <span className="text-sm text-gray-400">0{activeIndex + 1}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{activeService.title}</h3>
                  <p className="text-gray-300">{activeService.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Right side: Navigation pills */}
          <motion.div 
            className={`${isMobile ? 'w-full' : 'w-1/3'}`}
            variants={itemVariants}
          >
            <div className="space-y-4">
              {SERVICES.map((service, index) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300
                    ${index === activeIndex ? 'bg-gray-800/50 backdrop-blur-sm' : 'hover:bg-gray-800/30'}`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  aria-pressed={index === activeIndex}
                >
                  <div className="flex items-center">
                    <motion.div 
                      className={`w-2 h-2 rounded-full ${service.orbitColor} mr-3`}
                      animate={{
                        scale: index === activeIndex ? [1, 1.5, 1] : 1,
                      }}
                      transition={{
                        repeat: index === activeIndex ? Infinity : 0,
                        duration: 2,
                      }}
                    />
                    <span className={`${index === activeIndex ? 'text-white' : 'text-gray-400'}`}>
                      {service.title}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Floating service nodes - Only visible on larger screens */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            {SERVICES.map((service, index) => (
              <motion.div
                key={`node-${service.id}`}
                className="absolute"
                style={{
                  left: `${50 + 35 * Math.cos(Math.PI * 2 * (index / SERVICES.length))}%`,
                  top: `${50 + 35 * Math.sin(Math.PI * 2 * (index / SERVICES.length))}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: index === activeIndex ? 1 : 0.4,
                }}
                animate={{
                  scale: index === activeIndex ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  repeat: index === activeIndex ? Infinity : 0,
                  duration: 2,
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: service.color }}
                ></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ServicesOrbitalAtomic; 