import { useState, useEffect } from 'react';

/**
 * Hook to detect current breakpoint based on screen width
 * @returns {string} Current breakpoint ('mobile', 'tablet', or 'desktop')
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('desktop');

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) return setBreakpoint('mobile');
      if (width < 1024) return setBreakpoint('tablet');
      return setBreakpoint('desktop');
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return breakpoint;
}

/**
 * Legacy hook for compatibility with existing code
 * @returns {Object} Object with boolean values for each breakpoint
 */
export function useLegacyBreakpoint() {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,    // < 640px
    isSm: false,        // >= 640px
    isMd: false,        // >= 768px
    isLg: false,        // >= 1024px
    isXl: false,        // >= 1280px
    is2xl: false,       // >= 1536px
  });

  useEffect(() => {
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

    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
} 