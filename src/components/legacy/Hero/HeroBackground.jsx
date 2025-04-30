import React from 'react';
import { IMAGES } from '../../utils/assets';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Abstract gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#1A1A2E] opacity-90"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]"></div>
      
      {/* Animated gradient orb - top right */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
      
      {/* Animated gradient orb - bottom left */}
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      
      {/* Background grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.07]" 
        style={{ 
          backgroundImage: `url(${IMAGES.SVG.GRID_PATTERN})`, 
          backgroundSize: '40px 40px' 
        }}
      ></div>
    </div>
  );
};

export default HeroBackground; 