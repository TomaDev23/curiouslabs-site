import React from 'react';
import PropTypes from 'prop-types';

/**
 * SkeletonLoader - Displays placeholder loading states for different content types
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of skeleton to display (text, card, image, etc.)
 * @param {string} props.width - Width of the skeleton
 * @param {string} props.height - Height of the skeleton
 * @param {number} props.lines - Number of lines for text skeleton
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.animated - Whether to animate the skeleton
 * @param {string} props.color - Base color for the skeleton
 */
const SkeletonLoader = ({
  type = 'text',
  width = '100%',
  height,
  lines = 3,
  className = '',
  animated = true,
  color = 'bg-gray-200 dark:bg-gray-700'
}) => {
  const animationClass = animated ? 'animate-pulse' : '';
  
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className={`${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
              <div 
                key={i}
                className={`${color} rounded-md my-2 ${animationClass}`}
                style={{ 
                  height: '1rem',
                  width: i === lines - 1 && lines > 1 ? '75%' : '100%'
                }}
              />
            ))}
          </div>
        );
        
      case 'card':
        return (
          <div 
            className={`${color} ${animationClass} rounded-lg overflow-hidden ${className}`}
            style={{ width, height: height || '12rem' }}
          >
            <div className="bg-gray-300 dark:bg-gray-600" style={{ height: '60%' }} />
            <div className="p-4">
              <div className="bg-gray-300 dark:bg-gray-600 rounded h-4 mb-2 w-3/4" />
              <div className="bg-gray-300 dark:bg-gray-600 rounded h-3 mb-2" />
              <div className="bg-gray-300 dark:bg-gray-600 rounded h-3 w-1/2" />
            </div>
          </div>
        );
        
      case 'image':
        return (
          <div 
            className={`${color} ${animationClass} rounded-md ${className}`}
            style={{ width, height: height || '200px' }}
            aria-hidden="true"
          />
        );
        
      case 'avatar':
        const size = height || '3rem';
        return (
          <div 
            className={`${color} ${animationClass} rounded-full ${className}`}
            style={{ width: size, height: size }}
            aria-hidden="true"
          />
        );
        
      case 'button':
        return (
          <div 
            className={`${color} ${animationClass} rounded-md ${className}`}
            style={{ width: width || '100px', height: height || '40px' }}
            aria-hidden="true"
          />
        );
        
      case 'orbital':
        // Special skeleton for the ServicesOrbital component
        return (
          <div 
            className={`${className} relative ${animationClass}`}
            style={{ width, height: height || '500px' }}
          >
            {/* Center core */}
            <div className={`absolute ${color} rounded-full`} 
              style={{ 
                width: '80px', 
                height: '80px',
                left: 'calc(50% - 40px)',
                top: 'calc(50% - 40px)'
              }} 
            />
            
            {/* Orbital rings */}
            {[120, 200, 280].map((size, i) => (
              <div 
                key={i}
                className={`absolute border-2 ${color} opacity-25 rounded-full`}
                style={{ 
                  width: `${size}px`, 
                  height: `${size}px`,
                  left: `calc(50% - ${size/2}px)`,
                  top: `calc(50% - ${size/2}px)`,
                }} 
              />
            ))}
            
            {/* Orbital points */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i * 60) % 360;
              const radius = 100 + (i % 3) * 80;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div 
                  key={i}
                  className={`absolute ${color} rounded-full`}
                  style={{ 
                    width: '30px', 
                    height: '30px',
                    left: `calc(50% + ${x - 15}px)`,
                    top: `calc(50% + ${y - 15}px)`,
                  }} 
                />
              );
            })}
          </div>
        );
        
      default:
        return (
          <div 
            className={`${color} ${animationClass} ${className}`}
            style={{ width, height }}
            aria-hidden="true"
          />
        );
    }
  };
  
  return (
    <div aria-label="Loading" role="status" aria-live="polite">
      {renderSkeleton()}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(['text', 'card', 'image', 'avatar', 'button', 'orbital']),
  width: PropTypes.string,
  height: PropTypes.string,
  lines: PropTypes.number,
  className: PropTypes.string,
  animated: PropTypes.bool,
  color: PropTypes.string
};

export default SkeletonLoader; 