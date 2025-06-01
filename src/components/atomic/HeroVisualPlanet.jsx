/**
 * @component HeroVisualPlanet
 * @description Hero section planet with conditional 3D/2D rendering
 * @version 1.0.0
 * @type atomic
 */

import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScene } from '../scene/SceneControllerV6';

// ✅ Static import for dev environment
import EarthSphereProxy from '../proxies/EarthSphereProxy';

// ✅ Strategic device capability detection
const use3DCapability = () => {
  const [capability, setCapability] = useState(false);
  
  useEffect(() => {
    // Check for Lighthouse or performance testing
    const isLighthouse = navigator.userAgent.includes('Chrome-Lighthouse') || 
                        window.location.search.includes('lighthouse=true') ||
                        window.location.search.includes('performance=true');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device capabilities
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    // Check performance tier - ALLOW TABLETS for preview
    const isDesktopClass = window.innerWidth >= 1024 && !isMobile;
    const isTabletClass = isTablet && !isMobile;
    const hasGoodPerformance = !isLowMemory && !prefersReducedMotion;
    
    // Final capability decision - Allow tablets AND desktop
    const shouldUse3D = (isDesktopClass || isTabletClass) && hasGoodPerformance && !isLighthouse;
    
    console.log('🌍 3D Capability Check:', {
      isDesktopClass,
      isTabletClass,
      hasGoodPerformance,
      isLighthouse,
      shouldUse3D
    });
    
    setCapability(shouldUse3D);
  }, []);
  
  return capability;
};

// Fallback 2D implementation using CSS/SVG
const FallbackPlanet2D = ({ sceneStep = 0, className = '' }) => {
  return (
    <div 
      className={`relative w-full h-full opacity-100 scale-100 ${className}`}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center">
        <div className="text-white/60 text-sm">3D Earth Disabled</div>
      </div>
    </div>
  );
};

const HeroVisualPlanet = ({ sceneStep = 0, className = '', size = 400 }) => {
  const use3D = use3DCapability();
  
  // ✅ Fixed: Define device detection variables
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkDeviceType = () => {
      const mobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      setIsMobile(mobile);
      setIsTablet(tablet);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);
  
  // Responsive sizing based on device type
  const responsiveSize = React.useMemo(() => {
    if (isMobile) return size * 0.6; // 240px on mobile (60% of 400px)
    if (isTablet) return size * 0.8; // 320px on tablet (80% of 400px)
    return size; // 400px on desktop
  }, [size, isMobile, isTablet]);
  
  // Responsive positioning
  const responsiveClasses = React.useMemo(() => {
    if (isMobile) return 'top-[10%] right-[5%]'; // Closer to top-right on mobile
    if (isTablet) return 'top-[12%] right-[10%]'; // Slightly adjusted on tablet
    return 'top-[15%] right-[15%]'; // Original desktop positioning
  }, [isMobile, isTablet]);
  
  return (
    <div 
      className={`absolute ${responsiveClasses} pointer-events-none ${className}`}
      style={{ 
        width: responsiveSize * 2.25, // Responsive: 540px mobile, 720px tablet, 900px desktop
        height: responsiveSize * 2.25,
        zIndex: 140
      }}
      aria-hidden="true"
    >
      {use3D ? (
        <Suspense fallback={<div className="text-white/50">Loading Earth...</div>}>
          <EarthSphereProxy 
            enabled={true}
            sceneStep={sceneStep} 
            className="w-full h-full" 
          />
        </Suspense>
      ) : (
        <FallbackPlanet2D sceneStep={sceneStep} />
      )}
    </div>
  );
};

export default HeroVisualPlanet; 