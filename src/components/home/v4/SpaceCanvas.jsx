import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import ErrorBoundary from '../../ui/ErrorBoundary';
import { startComponentRender, endComponentRender } from '../../../utils/performanceMonitor';
import useAccessibilityCheck from '../../../hooks/useAccessibilityCheck';

/**
 * SpaceCanvas - Enhanced space-themed background for cosmic components
 * Provides an extended starfield background with density gradients and animated nebula effects
 */
const SpaceCanvas = () => {
  // Performance monitoring
  const renderStartTime = startComponentRender('SpaceCanvas');
  
  // Accessibility checks
  const { ref: accessibilityRef } = useAccessibilityCheck('SpaceCanvas', {
    checkContrast: true,
    checkFocus: false, // No interactive elements
    checkAria: false  // No interactive elements
  });
  
  // Create stars with density gradient (more at top, fewer at bottom)
  const createStars = (count, densityFactor = 1) => {
    return Array.from({ length: count }).map((_, i) => {
      // Calculate vertical density gradient - more stars at top, fewer at bottom
      const verticalPosition = Math.random() * Math.random() * 300; // squared random for top-heavy distribution
      
      return {
        id: i,
        x: Math.random() * 100,
        y: verticalPosition,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3 * densityFactor,
        animationDuration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      };
    });
  };
  
  // Generate different star layers with increased density
  const staticStars = useMemo(() => createStars(250, 1), []);
  const animatedStars = useMemo(() => createStars(80, 1.2), []);
  const distantStars = useMemo(() => createStars(150, 0.7), []);
  
  // Generate floating particles
  const floatingParticles = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: 50 + Math.random() * 50,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10
    })), 
  []);
  
  // Log render duration when component renders
  useEffect(() => {
    endComponentRender('SpaceCanvas', renderStartTime);
  }, [renderStartTime]);

  return (
    <ErrorBoundary 
      componentName="SpaceCanvas"
      fallback={<div className="fixed inset-0 z-0 overflow-hidden bg-black"></div>}
    >
      <div ref={accessibilityRef} className="fixed inset-0 z-0 overflow-hidden bg-black">
        {/* Extended height to 300vh for scrolling effect with smooth fade to dark */}
        <div className="absolute top-0 left-0 w-full h-[300vh]">
          {/* Enhanced background gradient with more purple */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
          
          {/* Fade-out gradient at 150vh to transition smoothly to solid color */}
          <div className="absolute inset-x-0 h-[100vh]" style={{ 
            top: '150vh',
            background: 'linear-gradient(to bottom, transparent, #0d0d12)'
          }}></div>
          
          {/* Cosmic noise overlay */}
          <CosmicNoiseOverlay opacity={0.03} blendMode="soft-light" />
          
          {/* Static stars with density gradient */}
          {staticStars.map((star) => (
            <div
              key={`static-star-${star.id}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: `${star.y}%`,
                left: `${star.x}%`,
                opacity: star.opacity,
                boxShadow: star.size > 1.8 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.4)` : 'none'
              }}
            />
          ))}
          
          {/* Distant smaller stars */}
          {distantStars.map((star) => (
            <div
              key={`distant-star-${star.id}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${star.size * 0.6}px`,
                height: `${star.size * 0.6}px`,
                top: `${star.y}%`,
                left: `${star.x}%`,
                opacity: star.opacity * 0.6,
              }}
            />
          ))}
          
          {/* Animated stars with enhanced twinkling effect */}
          {animatedStars.map((star) => (
            <motion.div
              key={`animated-star-${star.id}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${star.size * 1.2}px`,
                height: `${star.size * 1.2}px`,
                top: `${star.y}%`,
                left: `${star.x}%`,
                opacity: star.opacity * 0.5, // Start with lower opacity
              }}
              animate={{
                opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0px rgba(255, 255, 255, 0)',
                  `0 0 ${star.size * 4}px rgba(255, 255, 255, 0.4)`,
                  '0 0 0px rgba(255, 255, 255, 0)'
                ]
              }}
              transition={{
                duration: star.animationDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: star.delay
              }}
            />
          ))}
          
          {/* Enhanced nebula effects - larger and more vibrant */}
          <motion.div 
            className="absolute top-1/4 left-1/3 w-2/3 h-2/3 rounded-full opacity-10 blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(30, 64, 175, 0.1) 50%, transparent 80%)' }}
            animate={{ 
              opacity: [0.06, 0.1, 0.06],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute bottom-[40%] right-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(91, 33, 182, 0.1) 60%, transparent 80%)' }}
            animate={{ 
              opacity: [0.06, 0.12, 0.06],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          />
          
          {/* New nebula cloud for additional depth */}
          <motion.div 
            className="absolute top-[60%] left-1/5 w-1/3 h-1/3 rounded-full opacity-10 blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(216, 180, 254, 0.3) 0%, rgba(129, 140, 248, 0.1) 60%, transparent 80%)' }}
            animate={{ 
              opacity: [0.05, 0.09, 0.05],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          />
          
          {/* Floating particles that move slowly upward */}
          {floatingParticles.map((particle) => (
            <motion.div
              key={`floating-particle-${particle.id}`}
              className="absolute rounded-full bg-purple-400/20"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay
              }}
            />
          ))}
          
          {/* Light beams for dramatic effect */}
          <motion.div 
            className="absolute top-[10%] left-[20%] h-[600px] w-2 rotate-[30deg] blur-[30px] opacity-5"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0), rgba(139, 92, 246, 0.4), rgba(139, 92, 246, 0))'
            }}
            animate={{ 
              opacity: [0.03, 0.06, 0.03],
              scale: [0.9, 1, 0.9]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute top-[30%] right-[30%] h-[400px] w-1 rotate-[-20deg] blur-[20px] opacity-5"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0), rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0))'
            }}
            animate={{ 
              opacity: [0.02, 0.05, 0.02],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

// Export without memo to ensure animations work properly
export default SpaceCanvas; 