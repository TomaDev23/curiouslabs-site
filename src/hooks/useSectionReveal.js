import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for detecting when an element enters the viewport
 * Used to trigger section reveal animations
 * 
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - Object containing ref to attach and visibility state
 */
export function useSectionReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create observer with threshold option or default to 20%
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set visible if not already visible (no toggling back)
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, ...options }
    );

    // Start observing the ref element if available
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Clean up observer on unmount
    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [ref, options, isVisible]);

  return { ref, isVisible };
} 