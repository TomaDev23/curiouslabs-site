import { useState, useEffect, useRef } from 'react';
import { useBreakpoint } from './useBreakpoint.js';

/**
 * Custom hook for creating parallax motion effects based on scroll position
 * @param {Object} options - Configuration options for the parallax effect
 * @param {number} options.speed - Speed of the parallax effect (default: 0.5)
 * @param {boolean} options.horizontal - Whether to apply parallax horizontally (default: false)
 * @param {boolean} options.reverse - Whether to reverse the direction of the parallax effect (default: false)
 * @param {number} options.xRange - Range of horizontal movement in pixels (default: 20)
 * @param {number} options.yRange - Range of vertical movement in pixels (default: 20)
 * @param {string} options.easing - CSS easing function to use (default: 'cubic-bezier(0.5, 0, 0.5, 1)')
 * @param {boolean} options.disabled - Whether to disable the parallax effect (default: false)
 * @param {boolean} options.debug - Whether to enable debug mode (default: false)
 * @returns {Object} - The style object to apply to the element and ref to attach
 */
export function useParallaxMotion({
  speed = 0.5,
  horizontal = false,
  reverse = false,
  xRange = 20,
  yRange = 20,
  easing = 'cubic-bezier(0.5, 0, 0.5, 1)',
  disabled = false,
  debug = false,
} = {}) {
  const [style, setStyle] = useState({});
  const [debugInfo, setDebugInfo] = useState(null);
  const frameRef = useRef(null);
  const elementRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const lastSuccessfulRect = useRef(null);
  const ticking = useRef(false);
  
  // Get current breakpoint
  const breakpoint = useBreakpoint();
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Disable on mobile and for users who prefer reduced motion
  const isDisabled = disabled || prefersReducedMotion || breakpoint === 'mobile';

  useEffect(() => {
    if (isDisabled) {
      setStyle({});
      return;
    }

    const handleScroll = () => {
      // Throttle scroll events for performance
      if (ticking.current) return;
      ticking.current = true;
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        try {
          if (!elementRef.current) {
            ticking.current = false;
            return;
          }

          const scrollY = window.scrollY;
          
          // Safely get element rect with fallback to last successful measurement
          let rect;
          try {
            rect = elementRef.current.getBoundingClientRect();
            // Store successful rect for future fallback
            lastSuccessfulRect.current = { ...rect };
          } catch (err) {
            console.warn('Error getting element rect, using fallback', err);
            // Use last successful rect as fallback or empty rect
            rect = lastSuccessfulRect.current || { top: 0, height: 0 };
          }
          
          const scrollPosition = rect.top + scrollY;
          const windowHeight = window.innerHeight;
          
          // Calculate how far the element is from the center of the viewport
          const distanceFromCenter = scrollPosition - scrollY - windowHeight / 2 + rect.height / 2;
          
          // Normalize the distance to a value between -1 and 1
          const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / (windowHeight / 2)));
          
          // Apply the parallax effect with the specified speed and direction
          const moveDirection = reverse ? -1 : 1;
          const translateY = horizontal ? 0 : normalizedDistance * yRange * speed * moveDirection;
          const translateX = horizontal ? normalizedDistance * xRange * speed * moveDirection : 0;

          // Set debug info if debug mode is enabled
          if (debug) {
            setDebugInfo({
              rect: {
                top: rect.top.toFixed(2),
                height: rect.height.toFixed(2),
              },
              scrollY: scrollY.toFixed(2),
              distanceFromCenter: distanceFromCenter.toFixed(2),
              normalizedDistance: normalizedDistance.toFixed(2),
              translateX: translateX.toFixed(2),
              translateY: translateY.toFixed(2),
            });
          }

          setStyle({
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            transition: `transform 0.2s ${easing}`,
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          });

          lastScrollY.current = scrollY;
          ticking.current = false;
        } catch (err) {
          console.error('Error in parallax calculation:', err);
          ticking.current = false;
        }
      });
    };

    const handleResize = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      ticking.current = false;
      frameRef.current = requestAnimationFrame(handleScroll);
    };

    // Initial calculation
    handleScroll();

    // Add event listeners with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed, horizontal, reverse, isDisabled, xRange, yRange, easing, debug]);

  return {
    style,
    ref: elementRef,
    debug: debugInfo
  };
}

export default useParallaxMotion; 