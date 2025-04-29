import { useState, useEffect } from 'react';

/**
 * Hook to create parallax scrolling effects
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Parallax speed multiplier (default: 0.25)
 * @param {boolean} options.isMobile - Whether the device is mobile (default: false)
 * @returns {Object} - Object containing transform style and current scrollY value
 */
export default function useParallax(options = {}) {
  const { speed = 0.25, isMobile = false } = options;
  
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // For mobile, round the value to improve performance
  const transform = `translateY(${isMobile ? Math.round(scrollY * speed) : scrollY * speed}px)`;
  
  return { transform, scrollY };
} 