/**
 * @file ObservatoryHooks.js
 * @description Custom hooks for Observatory Card System V2
 * @version 2.0.0
 * @author CuriousLabs
 */

import { useState, useEffect, useCallback } from 'react';

// Reduced motion hook for accessibility
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// ThoughtTrails event dispatcher hook
export const useThoughtTrailsEvents = () => {
  const dispatchHover = useCallback((cardId, bounds, color) => {
    window.dispatchEvent(new CustomEvent('thoughtTrailsHover', {
      detail: { cardId, bounds, color }
    }));
  }, []);

  const dispatchHoverEnd = useCallback(() => {
    window.dispatchEvent(new CustomEvent('thoughtTrailsHoverEnd'));
  }, []);

  const dispatchSelect = useCallback((cardId, color) => {
    window.dispatchEvent(new CustomEvent('thoughtTrailsSelect', {
      detail: { cardId, color }
    }));
  }, []);

  const dispatchDeepDive = useCallback((productId) => {
    window.dispatchEvent(new CustomEvent('openDeepDiveModal', {
      detail: { productId }
    }));
  }, []);

  return {
    dispatchHover,
    dispatchHoverEnd,
    dispatchSelect,
    dispatchDeepDive
  };
};

// Animation variants for Observatory Cards
export const observatoryVariants = {
  card: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } }, // Reduced scale to prevent layout shifts
  },
  text: {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }, // Reduced delay from 0.3 to 0.1
    }),
  },
  supportingCard: {
    hidden: { opacity: 0.5, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.1 }
    }),
  }
};

// Feature flag hook for easy switching between systems
export const useObservatoryFeatureFlag = () => {
  const [useObservatoryV2, setUseObservatoryV2] = useState(true); // Default to new system
  
  // Allow runtime switching via console for testing
  useEffect(() => {
    window.toggleObservatoryV2 = () => {
      setUseObservatoryV2(prev => {
        const newValue = !prev;
        console.log(`🌌 Observatory V2: ${newValue ? 'ENABLED' : 'DISABLED'}`);
        return newValue;
      });
    };
    
    return () => {
      delete window.toggleObservatoryV2;
    };
  }, []);

  return useObservatoryV2;
}; 