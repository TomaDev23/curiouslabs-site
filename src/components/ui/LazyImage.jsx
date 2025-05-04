import React from 'react';
import { motion } from 'framer-motion';
import { useLazyLoad } from '../../hooks/useLazyLoad';

/**
 * LazyImage - Only loads the image when it's about to enter the viewport
 * With optional fade-in animation
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string} className - Additional CSS classes
 * @param {string} placeholderColor - Background color while loading
 * @param {number|string} width - Image width
 * @param {number|string} height - Image height
 * @param {boolean} animate - Whether to animate the image in
 * @param {Object} props - Additional props to pass to the container
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderColor = 'bg-gray-900',
  width,
  height,
  animate = true,
  ...props
}) => {
  const [ref, isVisible] = useLazyLoad({ rootMargin: '200px' });
  
  return (
    <div
      ref={ref}
      className={`overflow-hidden ${placeholderColor} ${className}`}
      style={{ width, height }}
      {...props}
    >
      {isVisible && (
        <motion.img
          src={src}
          alt={alt || ''}
          className="w-full h-full object-cover"
          initial={animate ? { opacity: 0 } : { opacity: 1 }}
          animate={animate ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.5 }}
          loading="lazy" // Native browser lazy loading as backup
        />
      )}
    </div>
  );
};

export default LazyImage; 