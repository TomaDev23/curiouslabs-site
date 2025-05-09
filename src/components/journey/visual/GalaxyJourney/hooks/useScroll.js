import { useState, useEffect } from 'react';

// LEGIT metadata declaration
export const metadata = {
  id: 'use_scroll_hook',
  scs: 'SCS5',
  type: 'hook',
  doc: 'contract_galaxy_journey.md'
};

/**
 * Custom hook for tracking scroll position, direction, and velocity
 * Enhanced for LEGIT compliance with proper cleanup and safeguards
 * 
 * @returns {Object} Scroll state including progress, raw position, direction and velocity
 */
const useScroll = () => {
  const [scrollState, setScrollState] = useState({
    scrollProgress: 0,
    rawScroll: 0,
    direction: 'none',
    velocity: 0
  });
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTimestamp = performance.now();
    let rafId = null;
    
    const calculateScroll = () => {
      const scrollY = window.scrollY;
      const timestamp = performance.now();
      const delta = scrollY - lastScrollY;
      const timeDelta = timestamp - lastTimestamp;
      
      // Calculate scroll height (document height minus viewport height)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Safeguard against potential division by zero
      if (scrollHeight <= 0) {
        lastScrollY = scrollY;
        lastTimestamp = timestamp;
        rafId = requestAnimationFrame(calculateScroll);
        return;
      }
      
      // Calculate normalized scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, scrollY / scrollHeight));
      
      // Calculate scroll velocity (px/ms)
      const velocity = timeDelta > 0 ? delta / timeDelta : 0;
      
      // Determine scroll direction
      const direction = delta > 0 ? 'down' : delta < 0 ? 'up' : 'none';
      
      setScrollState({
        scrollProgress,
        rawScroll: scrollY,
        direction,
        velocity
      });
      
      lastScrollY = scrollY;
      lastTimestamp = timestamp;
      
      rafId = requestAnimationFrame(calculateScroll);
    };
    
    // Start the animation frame loop
    rafId = requestAnimationFrame(calculateScroll);
    
    // Cleanup function
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
  
  return scrollState;
};

export default useScroll; 