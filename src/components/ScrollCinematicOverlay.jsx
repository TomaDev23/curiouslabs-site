import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { StarSkyReveal } from './StarSkyReveal.jsx';

// A minimal overlay component that adds cinematic effects on scroll
// without modifying any existing components
const ScrollCinematicOverlay = () => {
  // Track scroll position
  const { scrollY } = useScroll();
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  
  // Track mouse position for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Check if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Setup scroll monitor
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30 && !hasScrolledOnce) {
        setHasScrolledOnce(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledOnce]);
  
  // Setup mouse position tracking for parallax
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Opacity transforms based on scroll
  const overlayOpacity = useTransform(scrollY, [0, 200], [0, 0.75]);
  const heroFadeOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  // Affect only the hero section height - fade out as we approach next section
  const fadeOutBeforeNextSection = useTransform(
    scrollY, 
    [0, 400, 600, 700], 
    [0, 0.6, 0.3, 0]
  );
  
  return (
    <>
      {/* Fixed overlay with starfield - confined to hero area with negative z-index */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          opacity: fadeOutBeforeNextSection,
          visibility: hasScrolledOnce ? 'visible' : 'hidden',
          zIndex: -1,
          height: '100vh' // Limit to first viewport only
        }}
      >
        <StarSkyReveal 
          mouseX={mouseX}
          mouseY={mouseY}
          prefersReducedMotion={prefersReducedMotion}
          hasScrolledOnce={hasScrolledOnce}
        />
      </motion.div>
      
      {/* Dim overlay for hero content - reduced opacity and limited to first viewport */}
      <motion.div 
        className="fixed pointer-events-none bg-black"
        style={{ 
          opacity: useTransform(scrollY, [0, 200, 600], [0, 0.3, 0]),
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100vh' // Limit to first viewport only
        }}
      />
    </>
  );
};

export default ScrollCinematicOverlay; 