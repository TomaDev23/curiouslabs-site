import { useState, useEffect } from "react";

/**
 * Custom hook to track scroll progress (0-1) throughout the page
 * Used for scroll-based animations and transitions
 * @returns {number} - Normalized scroll progress (0-1)
 */
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.min(1, scrollY / (documentHeight - windowHeight));
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return scrollProgress;
}

export default useScrollProgress; 