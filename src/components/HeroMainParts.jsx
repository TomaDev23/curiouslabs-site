import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StarSkyReveal } from './StarSkyReveal';

// This component breaks down the hero into independently animated parts
export default function HeroMainParts({
  mouseX,
  mouseY,
  titleOpacity,
  titleY,
  titleRotate,
  subtitleOpacity,
  subtitleY,
  subtitleScale,
  buttonsOpacity,
  buttonsY,
  buttonsScale,
  logoOpacity,
  logoScale,
  logoRotate,
  prefersReducedMotion = false,
  hasScrolledOnce = false // New prop for scroll-triggered animations
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background starfield with parallax effects */}
      <StarSkyReveal 
        mouseX={mouseX} 
        mouseY={mouseY} 
        prefersReducedMotion={prefersReducedMotion} 
        hasScrolledOnce={hasScrolledOnce} // Pass the trigger to StarSkyReveal
      />
      
      {/* Main content container with scroll-triggered animation */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10"
        animate={{
          opacity: hasScrolledOnce ? 0 : 1,
          y: hasScrolledOnce ? -100 : 0,
          scale: hasScrolledOnce ? 0.95 : 1
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Hero title with animation */}
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4"
          style={{
            opacity: titleOpacity,
            y: titleY,
            rotateZ: titleRotate
          }}
        >
          Explore the <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">Universe</span>
        </motion.h1>
        
        {/* Subtitle with different animation timing */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 max-w-2xl text-center mb-8"
          style={{
            opacity: subtitleOpacity,
            y: subtitleY,
            scale: subtitleScale
          }}
        >
          Experience the beauty of space with our interactive cosmic platform
        </motion.p>
        
        {/* Buttons container */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-12"
          style={{
            opacity: buttonsOpacity,
            y: buttonsY,
            scale: buttonsScale
          }}
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-md font-semibold shadow-lg transition-all">
            Get Started
          </button>
          <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-md font-semibold transition-all">
            Learn More
          </button>
        </motion.div>
        
        {/* Logo or badge with special animation */}
        <motion.div
          className="absolute bottom-12 right-12 sm:right-16 h-16 w-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
          style={{
            opacity: logoOpacity,
            scale: logoScale,
            rotate: logoRotate
          }}
          animate={hasScrolledOnce ? {
            opacity: 0,
            scale: 0.5,
            y: -50,
            x: -100,
          } : {}}
          transition={{ 
            duration: 1.2,
            ease: "easeInOut"
          }}
        >
          <span className="text-white font-bold text-xl">A1</span>
        </motion.div>
      </motion.div>
    </div>
  );
} 