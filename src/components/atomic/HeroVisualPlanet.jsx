/**
 * @component HeroVisualPlanet
 * @description Self-contained planet visualization with 3D and 2D implementations
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

// Lazy load 3D implementation
const AegisPlanet3DV6 = lazy(() => import('../home/v6/AegisPlanet3DV6'));

// Internal performance detection
const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    performanceTier: 'high',
    prefersReducedMotion: false,
    isMobile: false,
    isTablet: false
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check device type
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      
      // Try to detect memory (not supported in all browsers)
      const memory = navigator.deviceMemory || 8; // Default to 8GB if not available
      
      // Determine performance tier based on device capabilities
      let performanceTier = 'high';
      
      if (prefersReducedMotion) {
        performanceTier = 'minimal';
      } else if (isMobile && memory <= 2) {
        performanceTier = 'minimal';
      } else if (isMobile || (memory <= 4)) {
        performanceTier = 'low';
      } else if (isTablet || (memory <= 6)) {
        performanceTier = 'medium';
      }
      
      setCapabilities({
        performanceTier,
        prefersReducedMotion,
        isMobile,
        isTablet
      });
    };
    
    detectCapabilities();
    window.addEventListener('resize', detectCapabilities);
    
    return () => {
      window.removeEventListener('resize', detectCapabilities);
    };
  }, []);

  return capabilities;
};

// Loading placeholder for 3D component
const LoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Fallback 2D implementation using CSS/SVG
const FallbackPlanet2D = ({ phase = 'void', className = '' }) => {
  return (
    <div 
      className={`relative w-full h-full ${className} ${
        phase === 'void' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
      } transition-all duration-1000`}
    >
      {/* Base planet circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl" />
      
      {/* Atmospheric glow */}
      <div className="absolute inset-0 rounded-full bg-lime-500 opacity-20 blur-xl transform scale-110" />
      
      {/* Surface details */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 opacity-80" />
      </div>
      
      {/* Orbital rings */}
      {phase === 'activation' && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-lime-500/20 transform scale-[1.4] rotate-12" />
          <div className="absolute inset-0 rounded-full border border-blue-500/15 transform scale-[1.6] -rotate-6" />
        </>
      )}
    </div>
  );
};

// Export metadata for LEGIT compliance
export const metadata = {
  id: 'hero_visual_planet',
  scs: 'SCS-HERO-PLANET',
  type: 'atomic',
  doc: 'contract_hero_visual_planet.md'
};

const HeroVisualPlanet = ({ phase = 'void', className = '', size = 400 }) => {
  const { performanceTier, prefersReducedMotion } = useDeviceCapabilities();
  const use3D = performanceTier !== 'minimal' && !prefersReducedMotion;
  
  const scaleClass = phase === 'void' 
    ? 'scale-50 opacity-0' 
    : phase === 'emergence' 
      ? 'scale-90 opacity-80' 
      : 'scale-100 opacity-100';
  
  return (
    <div 
      className={`transform-gpu transition-all duration-1000 ${scaleClass} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {use3D ? (
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <AegisPlanet3DV6 />
          </Suspense>
        </Canvas>
      ) : (
        <FallbackPlanet2D phase={phase} />
      )}
      
      {/* Orbit rings - static positioning */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          top: '0',
          left: '0'
        }}
      >
        {/* First orbit ring */}
        <div className="absolute inset-0 rounded-full border-2 border-lime-500/20 transform scale-[1.4]" />
        
        {/* Second orbit ring */}
        <div className="absolute inset-0 rounded-full border border-blue-500/15 transform scale-[1.6] rotate-[30deg]" />
        
        {/* Third orbit ring */}
        <div className="absolute inset-0 rounded-full border border-purple-500/10 transform scale-[1.8] rotate-[60deg]" />
      </div>
    </div>
  );
};

export default HeroVisualPlanet; 