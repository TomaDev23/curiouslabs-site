/**
 * @metadata
 * @component HeroSequenceV6
 * @description Main hero section that orchestrates header, planet, and CTA elements
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useScene } from './SceneControllerV6';
import AegisPlanetV6 from './AegisPlanetV6';

// Logo component for the header
const LogoTypeV6 = () => {
  return (
    <motion.div 
      className="text-2xl md:text-3xl font-serif tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-bold">Curious</span>
      <span className="text-lime-400">Labs</span>
    </motion.div>
  );
};

// Animated headline component with staggered reveal
const AnimatedHeadlineV6 = ({ children, delay = 0 }) => {
  const { deviceCapabilities } = useScene();
  const { performanceTier, prefersReducedMotion } = deviceCapabilities;
  
  // Simple animation for reduced motion or low-performance devices
  if (prefersReducedMotion || performanceTier === 'minimal') {
    return (
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium max-w-4xl mx-auto leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
      >
        {children}
      </motion.h1>
    );
  }
  
  // Split text into words for staggered animation
  const words = children.split(' ');
  
  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium max-w-4xl mx-auto leading-tight">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: delay + i * 0.1, 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

// Subtitle component with fade-in animation
const SubtitleV6 = ({ children, delay = 0 }) => {
  return (
    <motion.p
      className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.p>
  );
};

// CTA button with glow effect
const CTAButtonV6 = ({ children, delay = 0, href = "#" }) => {
  return (
    <motion.a
      href={href}
      className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-lime-500 to-lime-600 text-black font-medium hover:shadow-glow-lime transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.a>
  );
};

// Horizontal scroll indicator
const ExploreIndicatorV6 = () => {
  return (
    <motion.div
      className="inline-flex items-center text-sm text-gray-400"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <span className="mr-2">Explore Universe</span>
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

// Main hero sequence component
const HeroSequenceV6 = () => {
  const { scenePhase } = useScene();
  
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col">
      {/* Main content area (grows to fill available space) */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Central planet visualization */}
        <div className="relative mb-8">
          <AegisPlanetV6 />
        </div>
        
        {/* Text content - only appears in activation phase */}
        {scenePhase === 'activation' && (
          <div className="text-center space-y-6">
            <AnimatedHeadlineV6 delay={0.2}>
              Universe of Solutions
            </AnimatedHeadlineV6>
            
            <SubtitleV6 delay={0.6}>
              Powered by AEGIS, our runtime that empowers everything we build
            </SubtitleV6>
            
            <div className="mt-8">
              <CTAButtonV6 delay={0.8} href="#products">
                Explore Our Universe
              </CTAButtonV6>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom bar with logo and scroll indicator */}
      <div className="h-20 w-full px-8 flex justify-between items-center">
        {/* Logo in bottom left */}
        <LogoTypeV6 />
        
        {/* Scroll indicator in bottom right - only in activation phase */}
        {scenePhase === 'activation' && (
          <ExploreIndicatorV6 />
        )}
      </div>
    </section>
  );
};

export default HeroSequenceV6;