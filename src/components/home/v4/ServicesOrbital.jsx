import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * ServicesOrbital - Services section with orbiting service cards
 * Features interactive orbital system with animated service details
 */
const ServicesOrbital = () => {
  const [activeService, setActiveService] = useState(0);
  const [isAutorotating, setIsAutorotating] = useState(true);
  
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
    if (!isAutorotating) return;
    
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutorotating, services.length]);
  
  // Stop auto-rotate when user interacts
  const handleServiceClick = (index) => {
    setActiveService(index);
    setIsAutorotating(false);
  };
  
  return (
    <motion.section 
      className="relative py-24 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gray-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-purple-900/10 to-gray-900/0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-4">Our Services Orbit</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our range of specialized services designed to elevate your development process.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Orbital System - Left side */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-square max-w-lg mx-auto relative">
              {/* Central core */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-gradient-to-br from-purple-900/80 to-blue-900/80 border border-purple-500/50 backdrop-blur-md z-20 flex items-center justify-center"
                animate={{ 
                  boxShadow: ['0 0 20px 5px rgba(124, 58, 237, 0.3)', '0 0 30px 10px rgba(124, 58, 237, 0.4)', '0 0 20px 5px rgba(124, 58, 237, 0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-3xl">🧠</div>
                <div className="absolute w-full h-full rounded-full border-2 border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '20s' }}></div>
              </motion.div>
              
              {/* Orbital paths */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-gray-500/20"></div>
              
              {/* Service orbitals */}
              {services.map((service, index) => {
                const angle = (index / services.length) * Math.PI * 2;
                const isActive = activeService === index;
                const radius = 200; // Orbit radius
                
                const orbitX = Math.cos(angle) * radius;
                const orbitY = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={service.id}
                    className={`absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 flex items-center justify-center rounded-full cursor-pointer z-10 ${isActive ? 'z-30' : 'z-10'}`}
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
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-xl shadow-lg`}>
                      <span>{service.icon}</span>
                    </div>
                    
                    {isActive && (
                      <motion.span 
                        className="absolute -top-8 whitespace-nowrap font-medium text-white"
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
                  const radius = 200;
                  const x = Math.cos(angle) * radius + 250;
                  const y = Math.sin(angle) * radius + 250;
                  
                  return (
                    <motion.line
                      key={`line-${service.id}`}
                      x1="250"
                      y1="250"
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
          <div>
            <motion.div
              key={services[activeService].id}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${services[activeService].color} flex items-center justify-center text-3xl mr-4 shadow-lg`} style={{ boxShadow: `0 10px 25px -5px ${services[activeService].shadowColor}` }}>
                  {services[activeService].icon}
                </div>
                <h3 className="text-2xl font-bold">{services[activeService].title}</h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {services[activeService].description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
              
              <motion.button
                className={`px-6 py-3 bg-gradient-to-r ${services[activeService].color} rounded-lg text-white font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Request Service
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesOrbital; 