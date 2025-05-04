import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for lazy loading images and components
 * Only renders/loads content when it's about to enter the viewport
 * 
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} - [ref, isVisible] to attach ref and check visibility
 */
export function useLazyLoad(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element is about to enter viewport, set visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to keep observing
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { 
        // Default to 10% visibility and 100px margin
        threshold: 0.1, 
        rootMargin: '100px',
        ...options 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
} 