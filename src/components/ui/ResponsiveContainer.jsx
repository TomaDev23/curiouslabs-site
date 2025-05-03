import React, { useEffect, useState } from 'react';
import { spacing, breakpoints } from '../../utils/responsive';

/**
 * ResponsiveContainer - Wrapper component that applies responsive spacing
 * Features:
 * - Dynamically adjusts padding/margins based on viewport
 * - Maintains consistent spacing system across components
 * - Improves maintainability by centralizing responsive layout logic
 */
const ResponsiveContainer = ({ 
  children, 
  as = 'div',
  className = '', 
  type = 'section', 
  paddingY = true,
  paddingX = false,
  centerContent = true,
  maxWidth = 'max-w-7xl',
}) => {
  const [responsiveClasses, setResponsiveClasses] = useState('');
  
  // Calculate responsive classes based on viewport
  useEffect(() => {
    const updateClasses = () => {
      // Get current breakpoint based on window width
      const width = window.innerWidth;
      let breakpoint = 'xs';
      
      if (width >= breakpoints['2xl']) breakpoint = 'xl';
      else if (width >= breakpoints.xl) breakpoint = 'xl';
      else if (width >= breakpoints.lg) breakpoint = 'lg';
      else if (width >= breakpoints.md) breakpoint = 'md';
      else if (width >= breakpoints.sm) breakpoint = 'sm';
      
      // Get appropriate spacing classes
      let classes = '';
      
      if (paddingY && spacing[type] && spacing[type].padding) {
        classes += ` ${spacing[type].padding[breakpoint]}`;
      }
      
      if (paddingX) {
        classes += ` ${spacing.container.padding[breakpoint]}`;
      } else if (centerContent) {
        classes += ` mx-auto ${spacing.container.padding[breakpoint]}`;
      }
      
      setResponsiveClasses(classes);
    };
    
    // Update on mount and on resize
    updateClasses();
    window.addEventListener('resize', updateClasses);
    
    return () => window.removeEventListener('resize', updateClasses);
  }, [type, paddingY, paddingX, centerContent]);
  
  // Render the container using the specified element type
  const Container = as;
  
  return (
    <Container className={`${className} ${responsiveClasses} ${maxWidth}`}>
      {children}
    </Container>
  );
};

export default ResponsiveContainer; 