import React from 'react';

/**
 * SkeletonLoader - Provides loading placeholders
 * Used to improve perceived performance during async loading
 * 
 * @param {Object} props
 * @param {string} props.type - Type of skeleton: 'text', 'card', 'image', 'button', 'avatar'
 * @param {number} props.lines - Number of text lines (for text type)
 * @param {string} props.width - Width of the skeleton
 * @param {string} props.height - Height of the skeleton
 * @param {string} props.className - Additional CSS classes
 */
const SkeletonLoader = ({
  type = 'text',
  lines = 1,
  width = 'auto',
  height = 'auto',
  className = '',
  baseColor = 'bg-gray-700'
}) => {
  // Shared styles
  const baseClasses = `${baseColor} rounded-md overflow-hidden ${className} animate-pulse`;
  
  // Helper to render text lines
  const renderTextLines = () => {
    return Array.from({ length: lines }).map((_, index) => {
      // Make last line shorter if multiple lines
      const lineWidth = index === lines - 1 && lines > 1 
        ? `${70 + Math.random() * 20}%` 
        : width;
        
      return (
        <div
          key={`text-line-${index}`}
          className={`${baseClasses} h-4 mb-2`}
          style={{ width: lineWidth }}
        />
      );
    });
  };
  
  // Render different types of skeletons
  switch (type) {
    case 'text':
      return <div>{renderTextLines()}</div>;
      
    case 'card':
      return (
        <div 
          className={`${baseClasses}`}
          style={{ width, height: height || '200px' }}
        >
          {/* Card header */}
          <div className="p-4">
            <div className={`${baseColor} h-6 rounded-md w-3/4 mb-4`} />
            <div className={`${baseColor} h-4 rounded-md w-full mb-2`} />
            <div className={`${baseColor} h-4 rounded-md w-5/6`} />
          </div>
        </div>
      );
      
    case 'image':
      return (
        <div 
          className={`${baseClasses} flex items-center justify-center`}
          style={{ width, height: height || '200px' }}
        >
          <svg 
            className="w-12 h-12 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      );
      
    case 'button':
      return (
        <div 
          className={`${baseClasses} h-10 rounded-lg`}
          style={{ width: width || '120px' }}
        />
      );
      
    case 'avatar':
      return (
        <div 
          className={`${baseClasses} rounded-full`}
          style={{ 
            width: width || '40px', 
            height: height || width || '40px' 
          }}
        />
      );
      
    default:
      return <div>Invalid skeleton type</div>;
  }
};

export default SkeletonLoader; 