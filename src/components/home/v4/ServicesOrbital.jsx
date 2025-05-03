import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, sectionVariants, itemVariants } from '../../../utils/animation';
import MagneticButton from '../../ui/MagneticButton';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import useBreakpoint from '../../../hooks/useBreakpoint';

/**
 * ServicesOrbital - Services section with orbiting service cards
 * Features interactive orbital system with animated service details
 */
const ServicesOrbital = () => {
  const [activeService, setActiveService] = useState(0);
  const [isAutorotating, setIsAutorotating] = useState(true);
  const { ref, inView } = useScrollReveal(0.2);
  const { isMobile, isMd, isLg } = useBreakpoint();
  
  // Services data
  const services = [
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
  ];
  
  // Auto-rotate services
  useEffect(() => {
    if (!isAutorotating || !inView) return;
    
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutorotating, services.length, inView]);
  
  // Stop auto-rotate when user interacts
  const handleServiceClick = (index) => {
    setActiveService(index);
    setIsAutorotating(false);
  };
  
  // Calculate radius based on screen size
  const radius = isMobile ? 140 : 200;
  
  // Calculate the center point for SVG coordinates based on screen size
  const centerPoint = isMobile ? 175 : 250;
  
  return (
    <motion.section 
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gray-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-purple-900/10 to-gray-900/0"></div>
      
      {/* Subtle noise texture */}
      <CosmicNoiseOverlay opacity={0.01} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Orbital System - Left side */}
          <motion.div 
            className="relative order-2 lg:order-1"
            variants={itemVariants}
          >
            <div className="aspect-square max-w-sm md:max-w-lg mx-auto relative">
              {/* Central core */}
              <motion.div 
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[80px] h-[80px]' : 'w-[120px] h-[120px]'} rounded-full bg-gradient-to-br from-purple-900/80 to-blue-900/80 border border-purple-500/50 backdrop-blur-md z-20 flex items-center justify-center cosmic-subtle-glow`}
                animate={{ 
                  boxShadow: ['0 0 20px 5px rgba(124, 58, 237, 0.3)', '0 0 30px 10px rgba(124, 58, 237, 0.4)', '0 0 20px 5px rgba(124, 58, 237, 0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-3xl">🧠</div>
                <div className="absolute w-full h-full rounded-full border-2 border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '20s' }}></div>
              </motion.div>
              
              {/* Orbital paths */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-gray-500/20 cosmic-subtle-glow"></div>
              
              {/* Service orbitals */}
              {services.map((service, index) => {
                const angle = (index / services.length) * Math.PI * 2;
                const isActive = activeService === index;
                
                const orbitX = Math.cos(angle) * radius;
                const orbitY = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={service.id}
                    className={`absolute top-1/2 left-1/2 ${isMobile ? 'w-10 h-10 -ml-5 -mt-5' : 'w-14 h-14 -ml-7 -mt-7'} flex items-center justify-center rounded-full cursor-pointer z-10 ${isActive ? 'z-30' : 'z-10'}`}
                    style={{ 
                      x: orbitX, 
                      y: orbitY 
                    }}
                    onClick={() => handleServiceClick(index)}
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      boxShadow: isActive ? `0 0 20px 5px ${service.shadowColor}` : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  >
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
                );
              })}
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full z-0">
                {services.map((service, index) => {
                  const angle = (index / services.length) * Math.PI * 2;
                  const x = Math.cos(angle) * radius + centerPoint;
                  const y = Math.sin(angle) * radius + centerPoint;
                  
                  return (
                    <motion.line
                      key={`line-${service.id}`}
                      x1={centerPoint.toString()}
                      y1={centerPoint.toString()}
                      x2={x}
                      y2={y}
                      stroke={`url(#gradient-${service.id})`}
                      strokeWidth={activeService === index ? "2" : "1"}
                      strokeDasharray={activeService === index ? "0" : "5,5"}
                      animate={{ 
                        opacity: activeService === index ? 0.8 : 0.3,
                        strokeWidth: activeService === index ? 2 : 1
                      }}
                    />
                  );
                })}
                
                {/* Gradients for lines */}
                <defs>
                  {services.map((service) => (
                    <linearGradient key={`gradient-${service.id}`} id={`gradient-${service.id}`} gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.8" />
                    </linearGradient>
                  ))}
                </defs>
              </svg>
            </div>
          </motion.div>
          
          {/* Service Details - Right side */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            {isMobile && (
              <h3 className="text-xl font-bold text-center mb-4 cosmic-text-glow">
                {services[activeService].title}
              </h3>
            )}
          
            <motion.div
              key={services[activeService].id}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4 md:p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full bg-gradient-to-br ${services[activeService].color} flex items-center justify-center ${isMobile ? 'text-2xl' : 'text-3xl'} mr-4 shadow-lg`} style={{ boxShadow: `0 10px 25px -5px ${services[activeService].shadowColor}` }}>
                  {services[activeService].icon}
                </div>
                <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold cosmic-text-glow`}>{services[activeService].title}</h3>
              </div>
              
              <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-lg'} mb-4 md:mb-6 leading-relaxed`}>
                {services[activeService].description}
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                {['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js'].map((tech) => (
                  <span key={tech} className={`px-2 md:px-3 py-1 bg-gray-700/50 rounded-full ${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
                    {tech}
                  </span>
                ))}
              </div>
              
              <MagneticButton
                className={`px-6 py-3 bg-gradient-to-r ${services[activeService].color} rounded-lg text-white font-medium ${isMobile ? 'w-full text-center' : ''}`}
              >
                Request Service
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesOrbital; 