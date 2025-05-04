import { useState, useEffect, useRef } from 'react';
import { useBreakpoint } from './useBreakpoint';

/**
 * Enhanced useParallaxMotion hook with optimized performance
 * Creates smooth parallax effects based on scroll position with
 * performance optimizations and respect for accessibility preferences
 * 
 * @param {Object} options - Parallax configuration options
 * @param {number} options.speed - Vertical movement speed (default: 0.15)
 * @param {number} options.xSpeed - Horizontal movement speed (default: 0)
 * @param {boolean} options.reverse - Reverse the direction (default: false)
 * @param {number} options.maxMovement - Maximum movement in pixels (default: 100)
 * @param {boolean} options.enableOnMobile - Whether to enable on mobile (default: false)
 * @param {Function} options.transformFn - Custom transform function
 * @returns {Object} - Ref to attach and style object
 */
export function useParallaxMotion({
  speed = 0.15, 
  xSpeed = 0,
  reverse = false,
  maxMovement = 100,
  enableOnMobile = false,
  transformFn = null
} = {}) {
  const [style, setStyle] = useState({});
  const ref = useRef(null);
  const frameRef = useRef(null);
  const lastScrollY = useRef(0);
  const isMobile = useBreakpoint('md');
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  // Skip effect if motion is reduced or on mobile (unless enabled)
  const skipEffect = prefersReducedMotion || (isMobile && !enableOnMobile);

  useEffect(() => {
    // Return early if we should skip the effect
    if (skipEffect) {
      setStyle({});
      return () => {};
    }

    // Get initial position of the element
    const element = ref.current;
    if (!element) return;

    // Calculate initial position
    const rect = element.getBoundingClientRect();
    const initialY = rect.top + window.scrollY;

    const calculateParallax = () => {
      // Skip if no longer connected to DOM
      if (!element.isConnected) return;
      
      // Performance optimization: only update when scroll changed
      if (lastScrollY.current === window.scrollY) {
        frameRef.current = requestAnimationFrame(calculateParallax);
        return;
      }
      
      lastScrollY.current = window.scrollY;
      
      // Calculate how far element is from the viewport center
      const viewportHeight = window.innerHeight;
      const elementMiddle = initialY + rect.height / 2;
      const scrollCenter = window.scrollY + viewportHeight / 2;
      const distance = scrollCenter - elementMiddle;
      
      // Calculate parallax offsets with direction control
      const directionMod = reverse ? -1 : 1;
      let yOffset = distance * speed * directionMod;
      let xOffset = distance * xSpeed * directionMod;
      
      // Limit maximum movement
      yOffset = Math.max(Math.min(yOffset, maxMovement), -maxMovement);
      xOffset = Math.max(Math.min(xOffset, maxMovement), -maxMovement);
      
      // Apply transform (using custom function if provided)
      if (typeof transformFn === 'function') {
        setStyle(transformFn(xOffset, yOffset));
      } else {
        setStyle({
          transform: `translate3D(${xOffset}px, ${yOffset}px, 0)`,
          transition: 'transform 0.1s linear'
        });
      }
      
      frameRef.current = requestAnimationFrame(calculateParallax);
    };

    // Start animation frame and calculate initial position
    frameRef.current = requestAnimationFrame(calculateParallax);
    
    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', calculateParallax, { passive: true });
    window.addEventListener('resize', calculateParallax, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', calculateParallax);
      window.removeEventListener('resize', calculateParallax);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [speed, xSpeed, reverse, maxMovement, skipEffect, transformFn]);

  return { ref, style };
} 