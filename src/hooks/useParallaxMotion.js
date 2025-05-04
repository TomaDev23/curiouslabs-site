import { useEffect, useState } from 'react';
import { useScroll } from '../context/ScrollContext';
import useBreakpoint from './useBreakpoint';

/**
 * Custom hook for creating parallax motion effects
 * Uses the scroll position to create subtle movement
 * Optimized for performance with requestAnimationFrame
 * Respects reduced motion preferences and disables on mobile
 * 
 * @param {number} speed - Speed multiplier for the parallax effect
 * @param {boolean} horizontal - Whether to apply horizontal parallax
 * @returns {Object} - Style object with transform property
 */
export function useParallaxMotion(speed = 0.2, horizontal = false) {
  const { scrollY } = useScroll();
  const [transform, setTransform] = useState('');
  const breakpoints = useBreakpoint();
  
  // Skip parallax on mobile for performance
  const isMobile = !breakpoints.isMd;
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || isMobile) {
      setTransform('');
      return;
    }
    
    // Use requestAnimationFrame for smoother animation
    let rafId;
    
    const updateTransform = () => {
      if (horizontal) {
        setTransform(`translateX(${scrollY * speed}px)`);
      } else {
        setTransform(`translateY(${scrollY * speed}px)`);
      }
      rafId = requestAnimationFrame(updateTransform);
    };
    
    rafId = requestAnimationFrame(updateTransform);
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [scrollY, speed, horizontal, isMobile]);
  
  if (isMobile) {
    return { style: {} };
  }
  
  return {
    style: transform ? { transform } : {}
  };
} 