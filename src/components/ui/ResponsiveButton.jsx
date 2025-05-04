import React from 'react';
import { motion } from 'framer-motion';
import { useBreakpoint } from '../../hooks/useBreakpoint.js';
import { getTouchTargetClass } from '../../utils/responsive';

/**
 * ResponsiveButton - Button component with responsive sizing and touch targets
 * Features:
 * - Adapts to viewport size for optimal UX
 * - Properly sized touch targets for mobile users (44px minimum)
 * - Maintains visual consistency across breakpoints
 * - Includes animation effects from MagneticButton when appropriate
 */
const ResponsiveButton = ({
  children,
  className = '',
  onClick,
  primary = false,
  size = 'md',
  fullWidth = false,
  icon,
  disabled = false,
  type = 'button',
  ariaLabel,
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  // Calculate size classes based on the desired size and viewport
  const getSizeClasses = () => {
    if (isMobile) {
      // Mobile sizes with appropriate touch targets
      switch (size) {
        case 'xs': return 'px-3 py-2 text-xs';
        case 'sm': return 'px-4 py-2 text-sm';
        case 'lg': return 'px-6 py-3 text-lg';
        case 'xl': return 'px-7 py-4 text-xl';
        default: return 'px-5 py-2.5 text-base'; // md - default
      }
    } else {
      // Desktop sizes
      switch (size) {
        case 'xs': return 'px-2.5 py-1.5 text-xs';
        case 'sm': return 'px-3 py-2 text-sm';
        case 'lg': return 'px-5 py-3 text-lg';
        case 'xl': return 'px-6 py-3.5 text-xl';
        default: return 'px-4 py-2.5 text-base'; // md - default
      }
    }
  };
  
  // Get style classes based on type (primary/secondary)
  const getStyleClasses = () => {
    if (primary) {
      return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900';
    }
    return 'border border-purple-400 text-white hover:bg-purple-500/10 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900';
  };
  
  // Combine all button classes
  const buttonClasses = `
    ${getSizeClasses()}
    ${getStyleClasses()}
    ${fullWidth ? 'w-full' : ''}
    rounded-xl font-medium transition-all duration-200
    inline-flex items-center justify-center
    ${getTouchTargetClass(isMobile)}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel || undefined}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default ResponsiveButton; 