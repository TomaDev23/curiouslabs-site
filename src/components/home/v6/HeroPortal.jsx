/**
 * @component HeroPortal
 * @description Hero section with cosmic styling for CuriousLabs V6
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - HeroPortal passes LEGIT protocol
 */

import React, { useEffect, useRef } from 'react';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

// Floating animation keyframes
const floatingAnimation = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
.floating {
  animation: float 6s ease-in-out infinite;
}
`;

const HeroPortal = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const visualRef = useRef(null);
  const sphereRef = useRef(null);
  
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

      // Add floating animation to sphere
      if (sphereRef.current) {
        sphereRef.current.classList.add('floating');
      }
    } else {
      // If reduced motion is preferred, set everything to visible without animation
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (visualRef.current) visualRef.current.style.opacity = '1';
      if (sphereRef.current) sphereRef.current.classList.remove('floating');
    }
  }, []);
  
  return (
    <>
      <style jsx>{floatingAnimation}</style>
      <section 
        id="hero" 
        ref={heroRef}
        className="relative min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-visible"
      >
        {/* Visual Content - Right Side */}
        <div 
          ref={visualRef}
          className="w-full md:w-2/3 flex justify-end items-center mt-12 md:mt-0 z-10 md:mr-[-120px] lg:mr-[-180px]"
        >
          {/* Cosmic sphere/planet visualization */}
          <div className="relative md:mr-8 lg:mr-12">
            {/* Circles representing cosmic sphere with subtle glow */}
            <div className="absolute inset-0 rounded-full bg-lime-400 opacity-10 filter blur-xl"></div>
            <div 
              ref={sphereRef}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative overflow-hidden border border-gray-700"
            >
              {/* Subtle surface details */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent to-white opacity-10"></div>
                <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent to-white opacity-10"></div>
                <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-transparent to-white opacity-5"></div>
              </div>
              
              {/* Highlight reflection */}
              <div className="absolute top-4 left-4 w-1/5 h-1/5 rounded-full bg-white opacity-20 blur-sm"></div>
              
              {/* Orbit paths */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border border-gray-500 rounded-full opacity-10 transform rotate-45"></div>
                <div className="absolute w-3/4 h-3/4 border border-gray-400 rounded-full opacity-20 transform -rotate-12"></div>
              </div>
            </div>
            
            {/* Text labels */}
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

        {/* Text Content - Bottom Left */}
        <div className="absolute bottom-16 left-8 md:left-16 z-10 max-w-lg">
          <h1 
            ref={titleRef}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
          >
            Curious<span className="text-lime-400">Labs</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light"
          >
            Transforming development through AI innovation and community collaboration
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroPortal;