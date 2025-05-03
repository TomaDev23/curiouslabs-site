import React from 'react';
import useBreakpoint from '../../hooks/useBreakpoint';

/**
 * ResponsiveTypography - Component for responsive text sizing
 * Features:
 * - Automatic font size adjustments based on viewport
 * - Consistent typography scale across the site
 * - Mobile-first with desktop enhancements
 * - Support for all standard text elements (h1-h6, p, span)
 */
const ResponsiveTypography = ({
  children,
  variant = 'body',
  className = '',
  color = 'text-white',
  align = 'left',
  glow = false,
  gradient = false,
  as: Component = 'p',
  ...props
}) => {
  const { isMobile } = useBreakpoint();
  
  // Define responsive font size classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'h1':
        return isMobile
          ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'
          : 'text-4xl md:text-5xl lg:text-6xl font-bold';
      case 'h2':
        return isMobile
          ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'
          : 'text-3xl md:text-4xl lg:text-5xl font-bold';
      case 'h3':
        return isMobile
          ? 'text-xl sm:text-2xl md:text-3xl font-bold'
          : 'text-2xl md:text-3xl font-bold';
      case 'h4':
        return isMobile
          ? 'text-lg sm:text-xl md:text-2xl font-bold'
          : 'text-xl md:text-2xl font-bold';
      case 'subtitle':
        return isMobile
          ? 'text-lg md:text-xl font-medium'
          : 'text-xl md:text-2xl font-medium';
      case 'body-lg':
        return isMobile
          ? 'text-base md:text-lg'
          : 'text-lg md:text-xl';
      case 'body-sm':
        return isMobile
          ? 'text-sm md:text-base'
          : 'text-base';
      case 'caption':
        return 'text-xs md:text-sm';
      default: // body
        return isMobile
          ? 'text-sm md:text-base'
          : 'text-base md:text-lg';
    }
  };
  
  // Text alignment classes
  const getAlignmentClass = () => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };
  
  // Get gradient and glow classes if needed
  const getSpecialEffects = () => {
    let classes = '';
    
    if (gradient) {
      classes += ' cosmic-gradient-text-primary';
    }
    
    if (glow) {
      classes += gradient ? ' glow-text' : ' cosmic-text-glow';
    }
    
    return classes;
  };
  
  // Combine all classes
  const combinedClasses = `
    ${getVariantClasses()}
    ${getAlignmentClass()}
    ${getSpecialEffects()}
    ${color}
    ${className}
  `.trim();
  
  return (
    <Component className={combinedClasses} {...props}>
      {children}
    </Component>
  );
};

export default ResponsiveTypography; 