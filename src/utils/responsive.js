/**
 * RESPONSIVE EXCELLENCE UTILITY
 * 
 * This utility provides responsive configuration and dynamic spacing
 * for components across all breakpoints.
 */

// Tailwind breakpoints in pixels for reference
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Hook to get current screen size for responsive logic
 * Ensures consistent behavior across viewport sizes
 */
export const useBreakpoint = () => {
  // On server-side rendering, default to mobile
  if (typeof window === 'undefined') {
    return {
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      isLargeDesktop: false,
      breakpoint: 'sm'
    };
  }
  
  const width = window.innerWidth;
  
  return {
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg && width < breakpoints.xl,
    isLargeDesktop: width >= breakpoints.xl,
    breakpoint: width < breakpoints.sm ? 'xs' :
               width < breakpoints.md ? 'sm' :
               width < breakpoints.lg ? 'md' :
               width < breakpoints.xl ? 'lg' : 'xl'
  };
};

/**
 * Get responsive configuration based on breakpoint
 * Allows components to define different settings per viewport size
 */
export const responsiveConfig = (options) => {
  const { xs = {}, sm = {}, md = {}, lg = {}, xl = {}, ...defaults } = options;
  
  // On server-side rendering, return defaults merged with mobile config
  if (typeof window === 'undefined') {
    return { ...defaults, ...xs };
  }
  
  const width = window.innerWidth;
  
  // Return appropriate config based on current viewport
  if (width < breakpoints.sm) return { ...defaults, ...xs };
  if (width < breakpoints.md) return { ...defaults, ...sm };
  if (width < breakpoints.lg) return { ...defaults, ...md };
  if (width < breakpoints.xl) return { ...defaults, ...lg };
  return { ...defaults, ...xl };
};

/**
 * Responsive spacing values
 * Ensures consistent spacing across the application
 */
export const spacing = {
  section: {
    padding: {
      xs: 'py-16',
      sm: 'py-20',
      md: 'py-24',
      lg: 'py-28',
      xl: 'py-32'
    },
    margin: {
      xs: 'my-12',
      sm: 'my-16',
      md: 'my-20',
      lg: 'my-24',
      xl: 'my-28'
    }
  },
  container: {
    padding: {
      xs: 'px-4',
      sm: 'px-6',
      md: 'px-8',
      lg: 'px-8',
      xl: 'px-8'
    }
  },
  element: {
    gap: {
      xs: 'gap-4',
      sm: 'gap-6',
      md: 'gap-8',
      lg: 'gap-10',
      xl: 'gap-12'
    },
    margin: {
      xs: 'mb-6',
      sm: 'mb-8',
      md: 'mb-10',
      lg: 'mb-12',
      xl: 'mb-16'
    }
  }
};

/**
 * Get responsive spacing class for a specific element type and breakpoint
 */
export const getResponsiveSpacing = (type, property, breakpoint = 'md') => {
  if (!spacing[type] || !spacing[type][property]) return '';
  return spacing[type][property][breakpoint] || spacing[type][property].md;
};

/**
 * Touch target utility - ensures minimum size for interactive elements on mobile
 */
export const getTouchTargetClass = (isMobile) => {
  return isMobile ? 'min-h-[44px] min-w-[44px]' : '';
}; 