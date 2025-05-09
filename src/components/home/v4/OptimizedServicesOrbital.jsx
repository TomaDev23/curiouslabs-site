import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, sectionVariants, itemVariants } from '../../../utils/animation';
import MagneticButton from '../../ui/MagneticButton';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { startComponentRender, endComponentRender } from '../../../utils/performanceMonitor';
import { useLazyLoad } from '../../../hooks/useLazyLoad';
import { useParallaxMotion } from '../../../hooks/useParallaxMotion';
import LazyLoadWrapper from '../../ui/LazyLoadWrapper';
import SkeletonLoader from '../../ui/SkeletonLoader';

/**
 * OptimizedServicesOrbital - Enhanced services section with orbiting service cards
 * Features improved orbital system with glow effects, connection trails, and animated service details
 * Optimized with useLazyLoad and useParallaxMotion for better performance
 * Implements progressive loading and animations for better UX and performance
 */
const OptimizedServicesOrbital = () => {
  // Performance monitoring
  const renderStartTime = startComponentRender('OptimizedServicesOrbital');
  
  const [activeService, setActiveService] = useState(0);
  const [isAutorotating, setIsAutorotating] = useState(true);
  const { ref, inView } = useScrollReveal(0.2);
  const isMobile = !useBreakpoint('md');
  const prevServiceRef = useRef(0);
  
  // Apply parallax effect to the ambient particles
  const particlesParallax = useParallaxMotion({
    speed: 0.05,
    reverse: true,
    maxMovement: 30,
    enableOnMobile: false
  });
  
  // Apply subtle parallax effect to the orbital system
  const orbitalParallax = useParallaxMotion({
    speed: 0.02,
    maxMovement: 15,
    enableOnMobile: false
  });
  
  // Services data - memoized to prevent recreation on each render
  const services = useMemo(() => [
    {
      id: 1,
      title: 'Bug Resolution',
      icon: '🐛',
      color: 'from-purple-600 to-blue-600',
      shadowColor: 'rgba(124, 58, 237, 0.5)',
      description: "Submit your bugs and we'll debug, trace, and fix them with detailed documentation of the solution process."
    },
    {
      id: 2,
      title: 'Test Generation',
      icon: '🧪',
      color: 'from-blue-600 to-cyan-600',
      shadowColor: 'rgba(37, 99, 235, 0.5)',
      description: 'Get comprehensive test suites generated for your codebase, improving coverage and preventing regressions.'
    },
    {
      id: 3,
      title: 'Code Refactoring',
      icon: '🔄',
      color: 'from-green-600 to-teal-600',
      shadowColor: 'rgba(5, 150, 105, 0.5)',
      description: 'Transform legacy code into clean, maintainable, and efficient implementations with modern best practices.'
    },
    {
      id: 4,
      title: 'CLI Automation',
      icon: '⚡',
      color: 'from-amber-600 to-orange-600',
      shadowColor: 'rgba(245, 158, 11, 0.5)',
      description: 'Automate repetitive tasks with custom command-line tools tailored to your workflow needs.'
    },
    {
      id: 5,
      title: 'Architecture Design',
      icon: '🏗️',
      color: 'from-red-600 to-pink-600',
      shadowColor: 'rgba(225, 29, 72, 0.5)',
      description: 'Get expert advice and implementation plans for complex system architectures and infrastructure.'
    }
  ], []);
  
  // Auto-rotate services
  useEffect(() => {
    if (!isAutorotating || !inView) return;
    
    const interval = setInterval(() => {
      setActiveService((prev) => {
        prevServiceRef.current = prev;
        return (prev + 1) % services.length;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutorotating, services.length, inView]);
  
  // Stop auto-rotate when user interacts - using useCallback for optimization
  const handleServiceClick = useCallback((index) => {
    prevServiceRef.current = activeService;
    setActiveService(index);
    setIsAutorotating(false);
  }, [activeService]);
  
  // Calculate radius based on screen size - memoized
  const radius = useMemo(() => isMobile ? 140 : 200, [isMobile]);
  
  // Calculate the center point for SVG coordinates based on screen size - memoized
  const centerPoint = useMemo(() => isMobile ? 175 : 250, [isMobile]);
  
  // Create orbital glow effect style - memoized
  const createOrbitalGlow = useCallback((color) => {
    return {
      boxShadow: `
        0 0 30px ${color}30,
        0 0 60px ${color}20,
        inset 0 0 20px ${color}10
      `
    };
  }, []);
  
  // Calculate coordinates for the current and previous service - optimized with useCallback
  const getServicePosition = useCallback((index) => {
    const angle = (index / services.length) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius + centerPoint,
      y: Math.sin(angle) * radius + centerPoint,
      angle
    };
  }, [services.length, radius, centerPoint]);
  
  // Current and previous service positions - memoized
  const currentPos = useMemo(() => getServicePosition(activeService), [getServicePosition, activeService]);
  const prevPos = useMemo(() => getServicePosition(prevServiceRef.current), [getServicePosition]);
  
  // Performance monitoring
  useEffect(() => {
    endComponentRender('OptimizedServicesOrbital', renderStartTime);
    
    // Cleanup function
    return () => {
      // Any additional cleanup if needed
    };
  }, [renderStartTime]);
  
  return (
    <motion.section 
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true }}
    >
      {/* Enhanced background gradients with more atmospheric effect */}
      <div className="absolute inset-0 bg-gray-900/90"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-purple-900/20 to-gray-900/0"></div>
      
      {/* Ambient floating particles with parallax effect */}
      <div ref={particlesParallax.ref} style={particlesParallax.style}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`ambient-particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-purple-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Enhanced noise texture */}
      <CosmicNoiseOverlay opacity={0.02} blendMode="overlay" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Orbital System - Left side */}
          <motion.div 
            className="relative order-2 lg:order-1 h-[500px] md:h-[600px]"
            variants={itemVariants}
          >
            <LazyLoadWrapper 
              height="100%" 
              fallback={<SkeletonLoader type="orbital" height="100%" className="mx-auto" />}
              options={{ threshold: 0.1, rootMargin: '200px' }}
            >
              <div 
                ref={orbitalParallax.ref} 
                style={{...orbitalParallax.style, height: '100%'}} 
                className="aspect-square max-w-sm md:max-w-lg mx-auto relative"
              >
                {/* Enhanced central core with improved glow */}
                <motion.div 
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[90px] h-[90px]' : 'w-[120px] h-[120px]'} rounded-full bg-gradient-to-br from-purple-900/80 to-blue-900/80 border border-purple-500/50 backdrop-blur-md z-20 flex items-center justify-center`}
                  animate={{ 
                    boxShadow: [
                      '0 0 20px 5px rgba(124, 58, 237, 0.3)', 
                      '0 0 40px 15px rgba(124, 58, 237, 0.4)', 
                      '0 0 20px 5px rgba(124, 58, 237, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-3xl">🧠</div>
                  <motion.div 
                    className="absolute w-full h-full rounded-full border-2 border-dashed border-purple-500/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  
                  {/* Core inner glow */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-purple-500/10"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                </motion.div>
                
                {/* Enhanced orbital paths with inner and outer glow */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-gray-500/30"
                  style={createOrbitalGlow('rgba(124, 58, 237, ')}
                  animate={{
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                
                {/* Secondary orbital path for depth */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/10"
                  style={{ 
                    width: '85%', 
                    height: '85%',
                    boxShadow: 'inset 0 0 20px rgba(124, 58, 237, 0.1)'
                  }}
                ></motion.div>
                
                {/* Pulsing rings emanating from center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-purple-500/5"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-purple-500/5"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 1
                    }}
                  />
                </div>
                
                {/* Enhanced service orbitals with trails */}
                {services.map((service, index) => {
                  const angle = (index / services.length) * Math.PI * 2;
                  const isActive = activeService === index;
                  
                  const orbitX = Math.cos(angle) * radius;
                  const orbitY = Math.sin(angle) * radius;
                  
                  return (
                    <React.Fragment key={service.id}>
                      {/* Enhanced service orbital with glow effect */}
                      <motion.div
                        className={`absolute top-1/2 left-1/2 ${isMobile ? 'w-10 h-10 -ml-5 -mt-5' : 'w-14 h-14 -ml-7 -mt-7'} flex items-center justify-center rounded-full cursor-pointer z-10 ${isActive ? 'z-30' : 'z-10'}`}
                        style={{ 
                          x: orbitX, 
                          y: orbitY 
                        }}
                        onClick={() => handleServiceClick(index)}
                        whileHover={{ scale: 1.2 }}
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          boxShadow: isActive ? `0 0 25px 8px ${service.shadowColor}` : 'none',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated light trail following the active service */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `radial-gradient(circle, ${service.shadowColor} 0%, transparent 70%)`,
                            }}
                            animate={{
                              opacity: [0.6, 0.8, 0.6]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        
                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center ${isMobile ? 'text-base' : 'text-xl'} shadow-lg`}>
                          <span>{service.icon}</span>
                        </div>
                        
                        {isActive && !isMobile && (
                          <motion.span 
                            className="absolute -top-8 whitespace-nowrap font-medium text-white cosmic-text-glow"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            {service.title}
                          </motion.span>
                        )}
                      </motion.div>
                    </React.Fragment>
                  );
                })}
                
                {/* Connection lines with enhanced gradients */}
                <svg className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
                  {/* Single rotating connection line that moves between services */}
                  <motion.line
                    key="rotating-connection-line"
                    x1={centerPoint}
                    y1={centerPoint}
                    x2={currentPos.x}
                    y2={currentPos.y}
                    stroke="url(#line-gradient)"
                    strokeWidth="2"
                    initial={{ opacity: 0.9 }}
                    animate={{ 
                      x2: currentPos.x,
                      y2: currentPos.y,
                      opacity: 0.9
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 60,
                      damping: 15,
                      mass: 1
                    }}
                  />

                  {/* Jolting lights that travel along the active connection line */}
                  {[...Array(3)].map((_, i) => (
                    <motion.circle
                      key={`jolt-${i}`}
                      r={3 - i * 0.5}
                      fill={i === 0 ? "#a855f7" : i === 1 ? "#818cf8" : "#38bdf8"}
                      initial={{ 
                        cx: centerPoint,
                        cy: centerPoint,
                        opacity: 0
                      }}
                      animate={{
                        cx: [centerPoint, currentPos.x],
                        cy: [centerPoint, currentPos.y],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 1 + (i * 0.2),
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.2 * i,
                        delay: 0.1 * i
                      }}
                    />
                  ))}
                  
                  {/* Enhanced gradients for lines */}
                  <defs>
                    {/* Main gradient for the rotating line */}
                    <linearGradient id="line-gradient" gradientUnits="userSpaceOnUse"
                      x1={centerPoint} y1={centerPoint} x2={currentPos.x} y2={currentPos.y}>
                      <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.8" />
                    </linearGradient>
                    
                    {/* Service-specific gradients */}
                    {services.map((service) => (
                      <linearGradient key={`gradient-${service.id}`} id={`gradient-${service.id}`} gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.8" />
                      </linearGradient>
                    ))}
                  </defs>
                </svg>
              </div>
            </LazyLoadWrapper>
          </motion.div>
          
          {/* Service Details - Right side */}
          <motion.div className="order-1 lg:order-2" variants={itemVariants}>
            <LazyLoadWrapper 
              height="auto" 
              options={{ threshold: 0.1, rootMargin: '100px' }}
              fallback={
                <div className="space-y-4">
                  <SkeletonLoader type="text" lines={1} className="h-8 w-3/4" />
                  <SkeletonLoader type="text" lines={3} className="mt-6" />
                  <SkeletonLoader type="button" className="mt-8" />
                </div>
              }
            >
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-text-glow">Our Services</h2>
                <p className="text-gray-300 max-w-xl mx-auto lg:mx-0">
                  Select a service to learn more about how we can enhance your development workflow.
                </p>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`service-content-${activeService}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6 mb-6 shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${services[activeService].color} flex items-center justify-center text-2xl mr-4`}>
                      <span>{services[activeService].icon}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold cosmic-text-glow">
                      {services[activeService].title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    {services[activeService].description}
                  </p>
                  <MagneticButton
                    text="Learn More"
                    href={`/services#${services[activeService].title.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`bg-gradient-to-r ${services[activeService].color} text-white`}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Mobile service selector */}
              {isMobile && (
                <div className="flex justify-center space-x-2 mt-6">
                  {services.map((service, index) => (
                    <button
                      key={`mobile-selector-${service.id}`}
                      onClick={() => handleServiceClick(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeService === index 
                          ? `bg-gradient-to-r ${service.color}` 
                          : 'bg-gray-600'
                      }`}
                      aria-label={`Select ${service.title}`}
                    />
                  ))}
                </div>
              )}
            </LazyLoadWrapper>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(OptimizedServicesOrbital); 