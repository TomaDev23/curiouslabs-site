/**
 * @component ServicesOrbitalAtomic
 * @description Self-contained services section with enhanced orbital visualization and cosmic theming
 * @version 2.0.0
 * @type atomic
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useResponsive, useDeviceCapabilities } from '../../hooks/useBreakpoint';

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'services_orbital_atomic',
  scs: 'SCS-SERVICE-COSMIC',
  type: 'atomic',
  doc: 'contract_services_orbital_atomic.md'
};

// Enhanced services data with cosmic theming
const SERVICES = [
  {
    id: 'ai',
    title: 'AI Development',
    subtitle: 'Neural Architecture',
    description: 'Advanced artificial intelligence solutions with multi-agent systems, LLMs, and knowledge graph integration.',
    longDescription: 'Cutting-edge AI development featuring autonomous agents, large language models, neural networks, and sophisticated knowledge graphs for enterprise-grade intelligence systems.',
    color: '#84cc16', // lime
    gradient: 'from-lime-500/20 to-emerald-700/20',
    orbitColor: 'bg-lime-400',
    glowColor: 'shadow-lime-400/50',
    coordinates: 'AI-SECTOR-01',
    status: 'ACTIVE',
    icon: '🧠'
  },
  {
    id: 'product',
    title: 'Product Launches',
    subtitle: 'Mission Deployment',
    description: 'We take your product from zero to launch with design, development, and branding strategies.',
    longDescription: 'Complete product lifecycle management from concept to market launch, including strategic planning, design systems, development, and go-to-market execution.',
    color: '#0d9488', // teal
    gradient: 'from-teal-500/20 to-cyan-700/20',
    orbitColor: 'bg-teal-400',
    glowColor: 'shadow-teal-400/50',
    coordinates: 'LAUNCH-SECTOR-02',
    status: 'DEPLOYING',
    icon: '🚀'
  },
  {
    id: 'saas',
    title: 'SaaS Platforms',
    subtitle: 'Cloud Infrastructure',
    description: 'Fully managed platforms with DevOps, UX design, growth funnels, and continuous optimization.',
    longDescription: 'Enterprise-grade SaaS platform development with scalable cloud architecture, automated DevOps pipelines, and comprehensive user experience optimization.',
    color: '#7e22ce', // purple
    gradient: 'from-purple-500/20 to-violet-700/20',
    orbitColor: 'bg-purple-400',
    glowColor: 'shadow-purple-400/50',
    coordinates: 'CLOUD-SECTOR-03',
    status: 'SCALING',
    icon: '☁️'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    subtitle: 'Strategic Command',
    description: 'We advise founders on strategy, design, and technical direction to accelerate growth and innovation.',
    longDescription: 'Executive-level strategic consulting for technology leaders, covering business strategy, technical architecture, team scaling, and innovation roadmaps.',
    color: '#d97706', // amber
    gradient: 'from-amber-500/20 to-orange-700/20',
    orbitColor: 'bg-amber-400',
    glowColor: 'shadow-amber-400/50',
    coordinates: 'STRATEGY-SECTOR-04',
    status: 'ADVISING',
    icon: '⚡'
  }
];

// Enhanced cosmic particle system
const CosmicParticles = ({ activeService, prefersReducedMotion }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        duration: Math.random() * 8 + 12,
        color: activeService.color
      }));
      setParticles(newParticles);
    };
    
    generateParticles();
    const interval = setInterval(generateParticles, 6000);
    
    return () => clearInterval(interval);
  }, [activeService.color, prefersReducedMotion]);
  
  if (prefersReducedMotion) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0],
            y: [0, -60, -120],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Enhanced service card component
const ServiceCard = ({ service, isActive, prefersReducedMotion, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute top-0 left-0 w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: prefersReducedMotion ? 0.1 : 0.5, ease: "easeOut" }
        },
        exit: { 
          opacity: 0, 
          y: -20, 
          scale: 0.95,
          transition: { duration: prefersReducedMotion ? 0.1 : 0.3 }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br ${service.gradient}
        border-2 transition-all duration-500 ${
          isActive ? `border-[${service.color}]/50 ${service.glowColor} shadow-2xl` : 'border-gray-700/50'
        }`}>
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <motion.div 
            className={`w-2 h-2 rounded-full ${service.orbitColor}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-mono text-gray-400">{service.status}</span>
        </div>
        
        {/* Service number and icon */}
        <div className="flex items-center mb-6">
          <div className={`w-4 h-4 rounded-full ${service.orbitColor} mr-4`} />
          <span className="text-sm font-mono text-gray-400 mr-4">
            {service.coordinates}
          </span>
          <span className="text-2xl">{service.icon}</span>
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              {service.title}
            </h3>
            <p className="text-lg font-mono" style={{ color: service.color }}>
              {service.subtitle}
            </p>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            {isHovered && !isMobile ? service.longDescription : service.description}
          </p>
        </div>
        
        {/* Enhanced glow effect on hover */}
        {isHovered && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{ 
              background: `radial-gradient(circle at center, ${service.color}40 0%, transparent 70%)`,
              boxShadow: `0 0 40px ${service.color}30`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Enhanced navigation button
const ServiceNavButton = ({ service, index, isActive, onClick, prefersReducedMotion }) => {
  return (
    <motion.button
      onClick={() => onClick(index)}
      className={`w-full text-left p-6 rounded-xl transition-all duration-300 group
        ${isActive ? 'bg-gray-800/60 backdrop-blur-sm border-2' : 'hover:bg-gray-800/30 border-2 border-transparent'}`}
      style={{
        borderColor: isActive ? `${service.color}50` : 'transparent'
      }}
      whileHover={{ x: prefersReducedMotion ? 0 : 8, scale: prefersReducedMotion ? 1 : 1.02 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
      aria-pressed={isActive}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <motion.div 
            className={`w-3 h-3 rounded-full ${service.orbitColor} mr-4`}
            animate={{
              scale: isActive ? [1, 1.3, 1] : 1,
              boxShadow: isActive ? [`0 0 0px ${service.color}`, `0 0 20px ${service.color}`, `0 0 0px ${service.color}`] : 'none'
            }}
            transition={{
              repeat: isActive ? Infinity : 0,
              duration: 2,
            }}
          />
          <div>
            <span className={`text-lg font-medium transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
            }`}>
              {service.title}
            </span>
            <p className="text-sm font-mono" style={{ color: isActive ? service.color : '#6b7280' }}>
              {service.subtitle}
            </p>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="text-right">
          <span className="text-xs font-mono text-gray-500">{service.coordinates}</span>
        </div>
      </div>
    </motion.button>
  );
};

const ServicesOrbitalAtomic = () => {
  // Enhanced state management with unified hooks
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  // Use unified responsive and capability hooks (replacing individual state)
  const { isMobile, isTablet } = useResponsive();
  const { prefersReducedMotion } = useDeviceCapabilities();
  
  // Current active service
  const activeService = SERVICES[activeIndex];
  
  // Auto-rotate services (disabled when hovering or reduced motion is preferred)
  useEffect(() => {
    if (prefersReducedMotion || isHovering) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SERVICES.length);
    }, 6000); // Increased from 5000 to 6000 for better readability
    
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHovering]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.8,
        when: "beforeChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.15
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
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.5 }
    }
  };
  
  return (
    <motion.section 
      ref={sectionRef}
      id="services" 
      className="relative min-h-screen flex items-center justify-center py-32 px-4 md:px-8 bg-curious-dark-900 overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label="Our Services"
    >
      {/* Enhanced cosmic background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-curious-dark-900 via-curious-dark-950 to-black opacity-90" />
      
      {/* Cosmic particles */}
      <CosmicParticles activeService={activeService} prefersReducedMotion={prefersReducedMotion} />
      
      {/* PRESERVED: Enhanced orbital background rings with kinetic effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {SERVICES.map((service, index) => (
          <motion.div
            key={`orbit-${index}`}
            className={`absolute border rounded-full transition-all duration-1000
              ${index === activeIndex ? 'border-opacity-60' : 'border-opacity-25'}`}
            style={{
              width: `${(index + 2) * (isMobile ? 22 : 28)}%`,
              height: `${(index + 2) * (isMobile ? 22 : 28)}%`,
              borderColor: service.color,
              borderWidth: index === activeIndex ? '2px' : '1px',
              transform: `rotate(${index * 45}deg)`,
              boxShadow: index === activeIndex ? `0 0 30px ${service.color}30` : 'none'
            }}
            animate={{
              rotate: prefersReducedMotion ? 0 : [index * 45, index * 45 + 360],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 140 - index * 25, // Slightly slower for more elegance
                ease: "linear"
              }
            }}
          />
        ))}
        
        {/* Additional orbital accent rings */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute border border-cyan-400/20 rounded-full"
              style={{
                width: '90%',
                height: '90%',
              }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 200,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute border border-purple-400/15 rounded-full"
              style={{
                width: '110%',
                height: '110%',
              }}
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 250,
                ease: "linear"
              }}
            />
          </>
        )}
      </div>
      
      {/* Enhanced central "cosmic core" */}
      <motion.div 
        className="absolute z-0"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${activeService.color}40 0%, ${activeService.color}15 50%, transparent 80%)`,
            boxShadow: `0 0 80px ${activeService.color}25, inset 0 0 40px ${activeService.color}20`
          }}
        />
      </motion.div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Enhanced section header */}
        <motion.div className="text-center mb-20" variants={headerVariants}>
          <motion.div
            className="inline-block mb-6 px-6 py-3 border border-cyan-400/30 rounded-full bg-cyan-400/10 backdrop-blur-sm"
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          >
            <span className="text-cyan-400 text-sm font-mono">SERVICE MATRIX</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to your unique challenges
          </p>
          
          {/* Service status indicator */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeService.color }} />
              <span style={{ color: activeService.color }}>
                {activeService.coordinates}
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Services content - enhanced layout */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between gap-12`}>
          {/* Left side: Enhanced service cards */}
          <motion.div 
            className={`relative ${isMobile ? 'w-full mb-12' : 'w-1/2'} h-[400px] md:h-[450px]`}
            variants={contentVariants}
          >
            <AnimatePresence mode="wait">
              <ServiceCard
                key={activeService.id}
                service={activeService}
                isActive={true}
                prefersReducedMotion={prefersReducedMotion}
                isMobile={isMobile}
              />
            </AnimatePresence>
          </motion.div>
          
          {/* Right side: Enhanced navigation */}
          <motion.div 
            className={`${isMobile ? 'w-full' : 'w-2/5'}`}
            variants={contentVariants}
          >
            <div className="space-y-4">
              {SERVICES.map((service, index) => (
                <ServiceNavButton
                  key={service.id}
                  service={service}
                  index={index}
                  isActive={index === activeIndex}
                  onClick={setActiveIndex}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced floating service nodes - Only visible on larger screens */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            {SERVICES.map((service, index) => (
              <motion.div
                key={`node-${service.id}`}
                className="absolute"
                style={{
                  left: `${50 + 40 * Math.cos(Math.PI * 2 * (index / SERVICES.length))}%`,
                  top: `${50 + 40 * Math.sin(Math.PI * 2 * (index / SERVICES.length))}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: index === activeIndex ? 1 : 0.5,
                }}
                animate={{
                  scale: index === activeIndex ? [1, 1.3, 1] : [1, 1.1, 1],
                  boxShadow: index === activeIndex ? 
                    [`0 0 0px ${service.color}`, `0 0 25px ${service.color}`, `0 0 0px ${service.color}`] :
                    [`0 0 0px ${service.color}`, `0 0 10px ${service.color}`, `0 0 0px ${service.color}`]
                }}
                transition={{
                  repeat: Infinity,
                  duration: index === activeIndex ? 2 : 3,
                }}
              >
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white/20"
                  style={{ 
                    backgroundColor: service.color,
                    boxShadow: `0 0 15px ${service.color}50`
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ServicesOrbitalAtomic; 