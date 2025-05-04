import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLazyLoad } from '../../hooks/useLazyLoad';

/**
 * LazyLoadWrapper component that lazily loads content when it enters viewport
 * with optional animation effects and fallback placeholder
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.height - Height of the wrapper (default: 'auto')
 * @param {string} props.width - Width of the wrapper (default: '100%') 
 * @param {boolean} props.animate - Whether to animate the content on load (default: true)
 * @param {Object} props.variants - Framer motion variants for animation
 * @param {React.ReactNode} props.fallback - Fallback component when loading (default: skeleton loader)
 * @param {Object} props.options - IntersectionObserver options for lazy loading
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
const LazyLoadWrapper = ({
  children,
  height = 'auto',
  width = '100%',
  animate = true,
  variants = defaultVariants,
  fallback = <DefaultFallback />,
  options = {},
  className = '',
}) => {
  const [ref, isVisible] = useLazyLoad({
    threshold: 0.1,
    rootMargin: '200px',
    ...options
  });

  return (
    <div 
      ref={ref}
      className={`lazy-load-wrapper ${className}`}
      style={{ 
        minHeight: height, 
        width,
        overflow: 'hidden'
      }}
    >
      {isVisible ? (
        animate ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        ) : (
          children
        )
      ) : (
        fallback
      )}
    </div>
  );
};

// Default animation variants
const defaultVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth entry
    }
  }
};

// Default fallback component (minimal skeleton)
const DefaultFallback = ({ height = '100%', width = '100%' }) => (
  <div 
    className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md"
    style={{ height, width }}
    aria-hidden="true"
  />
);

export default LazyLoadWrapper; 