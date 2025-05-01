import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import HeroMainParts from './HeroMainParts';

// This component orchestrates scroll-driven animations for the hero section
export default function HeroDissolveController({ prefersReducedMotion = false, hasScrolledOnce = false }) {
  const { scrollY, scrollYProgress } = useScroll();
  
  // Create motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Track mouse position for parallax effects
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to the center of the screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);
  
  // Define scroll-based transforms for different hero elements
  
  // Title animations (staggered exit)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);
  const titleRotate = useTransform(scrollYProgress, [0, 0.15], [0, -5]);
  
  // Subtitle animations (different timing)
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.18], [0, -60]);
  const subtitleScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.95]);
  
  // Button animations (stay a bit longer)
  const buttonsOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const buttonsY = useTransform(scrollYProgress, [0, 0.22], [0, -40]);
  const buttonsScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.9]);
  
  // Logo animations (special transition toward center)
  const logoOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);
  const logoRotate = useTransform(scrollYProgress, [0, 0.25], [0, 10]);
  
  return (
    <HeroMainParts
      mouseX={mouseX}
      mouseY={mouseY}
      titleOpacity={titleOpacity}
      titleY={titleY}
      titleRotate={titleRotate}
      subtitleOpacity={subtitleOpacity}
      subtitleY={subtitleY}
      subtitleScale={subtitleScale}
      buttonsOpacity={buttonsOpacity}
      buttonsY={buttonsY}
      buttonsScale={buttonsScale}
      logoOpacity={logoOpacity}
      logoScale={logoScale}
      logoRotate={logoRotate}
      prefersReducedMotion={prefersReducedMotion}
      hasScrolledOnce={hasScrolledOnce} // Pass the trigger to HeroMainParts
    />
  );
} 