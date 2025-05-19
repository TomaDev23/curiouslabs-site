// src/components/home/v6/ServicesOrbital.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

/**
 * @component ServicesOrbital
 * @description Services section with celestial object visuals and card stack
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - ServicesOrbital passes LEGIT protocol
 */
const ServicesOrbital = () => {
  const [activeService, setActiveService] = useState(0);
  const { isMobile } = useBreakpoint();
  const sectionRef = useRef(null);
  
  // Services data
  const services = [
    {
      id: 'ai-development',
      title: 'AI Development',
      description: 'Harness intelligent agents to solve complex coding challenges with speed and precision.',
      color: 'from-blue-600 to-indigo-900',
      icon: 'planet-blue'
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Create stunning, responsive websites with cutting-edge technologies and optimal performance.',
      color: 'from-green-600 to-teal-900',
      icon: 'planet-green'
    },
    {
      id: 'code-optimization',
      title: 'Code Optimization',
      description: 'Transform legacy systems and improve codebase efficiency with our expert optimization services.',
      color: 'from-yellow-500 to-orange-800',
      icon: 'planet-yellow'
    },
    {
      id: 'tech-consultation',
      title: 'Tech Consultation',
      description: 'Strategic technology guidance to help your business navigate the digital universe.',
      color: 'from-purple-500 to-indigo-900',
      icon: 'planet-purple'
    }
  ];
  
  // Intersection Observer for section entry animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Handle card navigation
  const handleCardChange = (index) => {
    setActiveService(index);
  };
  
  // Auto-rotate services (can be disabled or made an option)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      const interval = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 8000); // Change card every 8 seconds
      
      return () => clearInterval(interval);
    }
  }, [services.length]);
  
  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen flex flex-col md:flex-row items-center opacity-0 translate-y-10 transition-all duration-1000 ease-out px-4 sm:px-6 lg:px-8"
    >
      {/* Text Content - Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center py-16 md:py-0 z-10">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
          Our <span className="text-lime-400">Services</span>
        </h2>
        
        <p className="text-lg text-gray-300 max-w-md mb-12">
          A constellation of solutions to power your development workflow.
          Navigate our service offerings to find the perfect match for your project needs.
        </p>
        
        {/* Service Navigation Pills */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleCardChange(index)}
              className={`flex items-center space-x-3 py-3 px-4 rounded-full transition-all duration-300 w-full max-w-sm text-left ${
                activeService === index
                  ? 'bg-black bg-opacity-50 border border-gray-700'
                  : 'hover:bg-black hover:bg-opacity-30'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full ${
                  activeService === index 
                    ? 'bg-lime-400' 
                    : 'bg-gray-600'
                }`}
              />
              <span 
                className={`text-lg font-medium ${
                  activeService === index 
                    ? 'text-white' 
                    : 'text-gray-400'
                }`}
              >
                {service.title}
              </span>
              
              {activeService === index && (
                <svg className="w-5 h-5 ml-auto text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Visual Content - Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative z-10 h-[500px] md:h-auto">
        {/* Service Cards Stack */}
        <div className="relative">
          {services.map((service, index) => {
            // Calculate offset for inactive cards
            const isActive = activeService === index;
            const offset = isMobile 
              ? Math.abs(activeService - index) * 15 
              : Math.abs(activeService - index) * 20;
              
            // Cards before active card are positioned above, cards after below
            const isAfterActive = index > activeService;
            const translateY = isActive 
              ? 0 
              : isAfterActive 
                ? offset 
                : -offset;
                
            // Inactive cards get increasingly transparent
            const opacity = isActive 
              ? 1 
              : 1 - Math.abs(activeService - index) * 0.2;
              
            return (
              <div
                key={service.id}
                className={`absolute top-0 left-0 w-72 sm:w-80 md:w-96 rounded-xl overflow-hidden transition-all duration-500 ease-out ${
                  isActive ? 'z-10' : 'z-0'
                }`}
                style={{
                  transform: `translateY(${translateY}px) scale(${isActive ? 1 : 0.95})`,
                  opacity
                }}
              >
                {/* Card Background */}
                <div className={`bg-gradient-to-br ${service.color} p-6 rounded-xl`}>
                  {/* Card Header with Number + Title */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-xl font-medium">{service.title}</h3>
                    <div className="text-white text-opacity-70 text-lg font-mono">
                      0{index + 1}
                    </div>
                  </div>
                  
                  {/* Card Body - Planet Visualization */}
                  <div className="relative h-48 flex justify-center items-center mb-6">
                    {/* Placeholder for planet visual - would be replaced with your actual component */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-gray-300 relative overflow-hidden">
                      {/* Surface details simulation */}
                      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent to-white opacity-20"></div>
                        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent to-white opacity-20"></div>
                      </div>
                      
                      {/* Highlight */}
                      <div className="absolute top-2 left-2 w-1/4 h-1/4 rounded-full bg-white opacity-40"></div>
                    </div>
                    
                    {/* Orbit Lines */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border border-white border-opacity-20 rounded-full"></div>
                      <div className="absolute w-56 h-56 border border-white border-opacity-10 rounded-full"></div>
                    </div>
                    
                    {/* Small Satellite */}
                    <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-white opacity-80"></div>
                  </div>
                  
                  {/* Card Footer - Description */}
                  <p className="text-white text-opacity-90 text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Orbital Connection Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,200 C100,150 150,100 200,100 C250,100 300,150 300,200 C300,250 250,300 200,300 C150,300 100,250 100,200 Z" 
              stroke="url(#orbitalGradient)" 
              strokeWidth="1" 
              strokeDasharray="5,5"
              fill="none"
            />
            
            <path d="M80,200 C80,130 130,80 200,80 C270,80 320,130 320,200 C320,270 270,320 200,320 C130,320 80,270 80,200 Z" 
              stroke="url(#orbitalGradient)" 
              strokeWidth="1"
              strokeDasharray="3,8"
              fill="none"
            />
            
            <defs>
              <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ServicesOrbital;

// Update to index.jsx to include ServicesOrbital

// import React from 'react';
// import LayoutWrapper from '../components/home/v6/LayoutWrapper';
// import HeroPortal from '../components/home/v6/HeroPortal';
// import ServicesOrbital from '../components/home/v6/ServicesOrbital';
// 
// const HomePage = () => {
//   return (
//     <LayoutWrapper>
//       <HeroPortal />
//       <ServicesOrbital />
//       
//       {/* Placeholder sections */}
//       <section id="process" className="min-h-screen flex items-center justify-center">
//         <h2 className="text-3xl font-serif">Process Section (Coming Soon)</h2>
//       </section>
//       
//       <section id="contact" className="min-h-screen flex items-center justify-center">
//         <h2 className="text-3xl font-serif">Contact Section (Coming Soon)</h2>
//       </section>
//     </LayoutWrapper>
//   );
// };
// 
// export default HomePage;