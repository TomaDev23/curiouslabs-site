// EclipseContainerV6.jsx
import React from 'react';

const EclipseContainerV6 = ({ children, size = 'md', className = '' }) => {
  // Size mappings
  const sizeClasses = {
    sm: 'w-64 h-64',
    md: 'w-80 h-80',
    lg: 'w-96 h-96',
    xl: 'w-[32rem] h-[32rem]'
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow layers - multiple layers for realistic effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl bg-white"
           style={{ 
             width: '150%', 
             height: '150%', 
             filter: 'blur(60px)'
           }}
      ></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl bg-white"
           style={{ 
             width: '140%', 
             height: '140%', 
             filter: 'blur(40px)'
           }}
      ></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-xl bg-white"
           style={{ 
             width: '130%', 
             height: '130%', 
             filter: 'blur(20px)'
           }}
      ></div>
      
      {/* Sharp edge glow (creates the crisp edge) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
           style={{ 
             width: '105%', 
             height: '105%',
             boxShadow: '0 0 40px 5px rgba(255, 255, 255, 0.7)',
             filter: 'blur(2px)'
           }}
      ></div>
      
      {/* Main content container (black circle) */}
      <div className={`relative ${sizeClasses[size]} rounded-full bg-black flex items-center justify-center overflow-hidden z-10`}>
        <div className="absolute inset-0 bg-black rounded-full"></div>
        <div className="relative z-10 p-8 text-white w-full h-full flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EclipseContainerV6;



nebula
// NebulaBackgroundV6.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const NebulaBackgroundV6 = ({ children, image, overlayOpacity = 0.5 }) => {
  const containerRef = useRef(null);
  
  // Optional parallax effect on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      const { width, height } = container.getBoundingClientRect();
      mouseX = (e.clientX / width) - 0.5;
      mouseY = (e.clientY / height) - 0.5;
      
      // Apply subtle parallax effect
      const nebulaElement = container.querySelector('.nebula-image');
      if (nebulaElement) {
        nebulaElement.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Base black background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Nebula background image with smooth scale in */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 nebula-image overflow-hidden"
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            filter: 'saturate(1.2) contrast(1.1)'
          }}
        ></div>
      </motion.div>
      
      {/* Color adjustment layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
          mixBlendMode: 'multiply'
        }}
      ></div>
      
      {/* Grid overlay with subtle animation */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(100,100,100,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,100,100,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default NebulaBackgroundV6;


✨ CSS Techniques Used to Achieve These Effects

Eclipse Glow Effect:

Multiple layered divs with varying blur amounts
CSS filter: blur() combined with opacity
Box-shadow with large blur radius


Nebula Background:

Blend modes (mix-blend-mode: multiply)
Radial gradients for vignette
Subtle parallax effect using mouse position


UI Glow Effects:

Dynamic box-shadows based on color
Framer Motion animations for hover/click states
CSS transitions for smooth color changes



🔄 Integration Into Your Project
To integrate these components into your CuriousLabs V6 implementation:

Add these new components to your /src/components/home/v6/ directory
Update your tailwind.config.js to include blur utilities if needed:

js// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      blur: {
        '2xl': '40px',
        '3xl': '60px',
      },
    },
  },
  plugins: [],
}

Add the nebula images to your /public/images/ directory
Update your HeroSequenceV6.jsx to use EnhancedHeroV6 or directly integrate these visual effects