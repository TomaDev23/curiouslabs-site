import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for revealing elements when they enter the viewport
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin (CSS-style string)
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @returns {Array} [ref, isVisible] - Ref to attach to element and visibility state
 */
export default function useScrollReveal({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true
} = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const wasTriggeredRef = useRef(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If element is visible
          if (entry.isIntersecting) {
            // If we only want to trigger once and it's already been triggered, do nothing
            if (triggerOnce && wasTriggeredRef.current) return;
            
            setIsVisible(true);
            wasTriggeredRef.current = true;
            
            // If we only want to trigger once, we can disconnect the observer
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            // If it's not visible and we want to trigger multiple times
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isVisible];
} 