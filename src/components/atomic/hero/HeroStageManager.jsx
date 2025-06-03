// @file src/components/atomic/hero/HeroStageManager.jsx
// @description Scroll-based controller for Cosmic Arrival hero scene

import { useEffect, useState } from 'react';

const HeroStageManager = ({ setSceneStep }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference using native API
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setSceneStep(8);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollRatio = scrollY / viewportHeight;
      
      if (scrollRatio < 0.1) setSceneStep(1);
      else if (scrollRatio < 0.2) setSceneStep(2);
      else if (scrollRatio < 0.3) setSceneStep(3);
      else if (scrollRatio < 0.4) setSceneStep(4);
      else if (scrollRatio < 0.5) setSceneStep(5);
      else if (scrollRatio < 0.6) setSceneStep(6);
      else if (scrollRatio < 0.7) setSceneStep(7);
      else setSceneStep(8);
    };

    // Call once immediately to set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setSceneStep, prefersReducedMotion]);

  return null;
};

export default HeroStageManager; 