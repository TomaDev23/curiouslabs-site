// src/components/home/v6/HeroPortal.jsx

import React, { useEffect, useRef } from 'react';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

/**
 * @component HeroPortal
 * @description Hero section with cosmic styling for CuriousLabs V6
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - HeroPortal passes LEGIT protocol
 */
const HeroPortal = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const visualRef = useRef(null);
  
  // Animation on component mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      // Title animation
      if (titleRef.current) {
        titleRef.current.style.opacity = '0';
        titleRef.current.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          titleRef.current.style.transition = 'opacity 0.8s ease-out, transform 1s ease-out';
          titleRef.current.style.opacity = '1';
          titleRef.current.style.transform = 'translateY(0)';
        }, 300);
      }
      
      // Subtitle animation with delay
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '0';
        subtitleRef.current.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          subtitleRef.current.style.transition = 'opacity 0.8s ease-out, transform 1s ease-out';
          subtitleRef.current.style.opacity = '1';
          subtitleRef.current.style.transform = 'translateY(0)';
        }, 800);
      }
      
      // Visual element animation
      if (visualRef.current) {
        visualRef.current.style.opacity = '0';
        visualRef.current.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          visualRef.current.style.transition = 'opacity 1.2s ease-out, transform 1.5s ease-out';
          visualRef.current.style.opacity = '1';
          visualRef.current.style.transform = 'scale(1)';
        }, 400);
      }
    } else {
      // If reduced motion is preferred, set everything to visible without animation
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (visualRef.current) visualRef.current.style.opacity = '1';
    }
  }, []);
  
  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Text Content - Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 z-10">
        <h1 
          ref={titleRef}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
        >
          Curious<span className="text-lime-400">Labs</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl sm:text-2xl lg:text-3xl max-w-md text-gray-300 font-light"
        >
          Transforming development through AI innovation and community collaboration
        </p>
        
        {/* CTA Button */}
        <div className="pt-4">
          <a 
            href="#services"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-lime-400 hover:bg-lime-300 transition-colors duration-150"
          >
            Explore Services
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Visual Content - Right Side */}
      <div 
        ref={visualRef}
        className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 z-10"
      >
        {/* Placeholder for the cosmic sphere/planet 
           This would be replaced with your actual visual component */}
        <div className="relative">
          {/* Circles representing your cosmic sphere with subtle glow */}
          <div className="absolute inset-0 rounded-full bg-lime-400 opacity-10 filter blur-xl"></div>
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative overflow-hidden border border-gray-700">
            {/* Subtle surface details */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent to-white opacity-10"></div>
              <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent to-white opacity-10"></div>
              <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-transparent to-white opacity-5"></div>
            </div>
            
            {/* Highlight reflection */}
            <div className="absolute top-4 left-4 w-1/5 h-1/5 rounded-full bg-white opacity-20 blur-sm"></div>
            
            {/* Placeholder for orbit paths */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border border-gray-500 rounded-full opacity-10 transform rotate-45"></div>
              <div className="absolute w-3/4 h-3/4 border border-gray-400 rounded-full opacity-20 transform -rotate-12"></div>
            </div>
          </div>
          
          {/* Subtle text labels */}
          <div className="absolute top-1/4 right-0 transform translate-x-12 flex items-center">
            <div className="w-12 h-px bg-lime-400 opacity-70"></div>
            <div className="ml-2 text-xs text-lime-400">EXPLORE</div>
          </div>
          
          <div className="absolute bottom-1/4 left-0 transform -translate-x-12 flex items-center">
            <div className="text-xs text-lime-400 text-right">DISCOVER</div>
            <div className="ml-2 w-12 h-px bg-lime-400 opacity-70"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse">
        <span className="text-xs text-gray-400 mb-2">Scroll to explore</span>
        <svg className="w-6 h-6 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroPortal;

// src/pages/index.jsx - Home Page Entry

import React from 'react';
import LayoutWrapper from '../components/home/v6/LayoutWrapper';
import HeroPortal from '../components/home/v6/HeroPortal';

/**
 * @component HomePage
 * @description Main home page for CuriousLabs V6
 */
const HomePage = () => {
  return (
    <LayoutWrapper>
      <HeroPortal />
      
      {/* Future sections will be added here:
        <ServicesOrbital />
        <ProcessCards />
        <ContactTerminal />
      */}
      
      {/* Placeholder sections to ensure scrolling works for navigation testing */}
      <section id="services" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-serif">Services Section (Coming Soon)</h2>
      </section>
      
      <section id="process" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-serif">Process Section (Coming Soon)</h2>
      </section>
      
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-serif">Contact Section (Coming Soon)</h2>
      </section>
    </LayoutWrapper>
  );
};

export default HomePage;