import { useEffect, useState } from 'react';

/**
 * Hook to detect when scrolling past a certain threshold of the page
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Scroll threshold (0-1) to trigger (default: 0.85)
 * @param {boolean} options.once - If true, only triggers once (default: true)
 * @returns {boolean} isTriggered - Whether the threshold has been reached
 */
export default function useScrollTrigger(options = {}) {
  const { 
    threshold = 0.85, 
    once = true 
  } = options;
  
  const [isTriggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > threshold && (once ? !isTriggered : true)) {
        setTriggered(true);
      } else if (!once && scrolled <= threshold) {
        setTriggered(false);
      }
    };
    
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [threshold, once, isTriggered]);

  return isTriggered;
} 