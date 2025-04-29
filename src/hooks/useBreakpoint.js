import { useState, useEffect } from 'react';

/**
 * Hook to detect current breakpoint based on Tailwind's breakpoint system
 * @returns {Object} breakpoints - Object with boolean values for each breakpoint
 */
export default function useBreakpoint() {
  // Initial state based on window width
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,    // < 640px
    isSm: false,        // >= 640px
    isMd: false,        // >= 768px
    isLg: false,        // >= 1024px
    isXl: false,        // >= 1280px
    is2xl: false,       // >= 1536px
  });

  useEffect(() => {
    // Function to update breakpoints based on window size
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      setBreakpoints({
        isMobile: width < 640,
        isSm: width >= 640,
        isMd: width >= 768, 
        isLg: width >= 1024,
        isXl: width >= 1280,
        is2xl: width >= 1536,
      });
    };

    // Run once on mount
    updateBreakpoints();

    // Add event listener
    window.addEventListener('resize', updateBreakpoints);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
} 