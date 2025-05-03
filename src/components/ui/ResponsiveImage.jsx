import React, { useState, useEffect } from 'react';
import useBreakpoint from '../../hooks/useBreakpoint';

/**
 * ResponsiveImage - Component for optimized responsive images
 * Features:
 * - Serves different image sizes based on viewport
 * - Implements lazy loading for better performance
 * - Handles aspect ratio preservation
 * - Supports fallback for loading states
 */
const ResponsiveImage = ({
  src,
  alt,
  className = '',
  mobileSrc,
  tabletSrc,
  desktopSrc,
  aspectRatio = '16/9',
  objectFit = 'cover',
  objectPosition = 'center',
  width,
  height,
  priority = false,
  fallback,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isMobile, isMd, isLg } = useBreakpoint();
  const [imageSrc, setImageSrc] = useState('');
  
  // Determine the correct image source based on the current viewport
  useEffect(() => {
    if (mobileSrc && isMobile) {
      setImageSrc(mobileSrc);
    } else if (tabletSrc && isMd) {
      setImageSrc(tabletSrc);
    } else if (desktopSrc && isLg) {
      setImageSrc(desktopSrc);
    } else {
      setImageSrc(src);
    }
  }, [src, mobileSrc, tabletSrc, desktopSrc, isMobile, isMd, isLg]);
  
  // Set up aspect ratio style if needed
  const aspectRatioStyle = aspectRatio ? { aspectRatio } : {};
  
  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  // Handle image load error
  const handleImageError = () => {
    console.error(`Failed to load image: ${imageSrc}`);
    setIsLoaded(false);
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={aspectRatioStyle}
    >
      {/* Show fallback until image is loaded */}
      {!isLoaded && fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          {typeof fallback === 'string' ? (
            <span className="text-gray-400">{fallback}</span>
          ) : (
            fallback
          )}
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleImageLoad}
        onError={handleImageError}
        width={width}
        height={height}
        style={{ 
          objectFit, 
          objectPosition,
          width: '100%',
          height: aspectRatio ? '100%' : 'auto'
        }}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default ResponsiveImage; 