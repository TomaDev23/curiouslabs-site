/**
 * @metadata
 * @component AegisPlanetV6
 * @description Central AEGIS planet visualization with 3D and fallback implementations
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { Suspense } from 'react';
import { useScene } from './SceneControllerV6';

// Lazy load the 3D implementation to reduce initial bundle size
const AegisPlanet3D = React.lazy(() => import('./AegisPlanet3DV6'));

// CSS/SVG fallback implementation for the AEGIS planet
const AegisPlanet2D = ({ phase }) => {
  // Calculate scale and opacity based on phase
  const getScaleAndOpacity = () => {
    switch (phase) {
      case 'void':
        return { scale: 0.1, opacity: 0 };
      case 'emergence':
        return { scale: 0.7, opacity: 0.8 };
      case 'activation':
      default:
        return { scale: 1, opacity: 1 };
    }
  };
  
  const { scale, opacity } = getScaleAndOpacity();
  
  return (
    <div 
      className="relative transition-all duration-1000 ease-out"
      style={{ 
        transform: `scale(${scale})`,
        opacity: opacity,
        width: '300px',
        height: '300px',
        margin: '0 auto'
      }}
      aria-label="AEGIS core visualization"
    >
      {/* Main planet sphere with gradient */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 shadow-xl"
      >
        {/* Surface texture overlay */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: 'url(/images/planet-texture.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        {/* Highlight reflection */}
        <div 
          className="absolute w-1/3 h-1/3 rounded-full bg-white opacity-20 blur-sm"
          style={{ top: '15%', left: '15%' }}
        ></div>
        
        {/* Core glow */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(132, 204, 22, 0.4) 0%, rgba(0, 0, 0, 0) 70%)'
          }}
        ></div>
      </div>
      
      {/* Atmosphere glow */}
      <div 
        className="absolute -inset-4 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.3) 0%, rgba(0, 0, 0, 0) 70%)'
        }}
      ></div>
      
      {/* Orbit rings - only visible in activation phase */}
      {phase === 'activation' && (
        <>
          <div 
            className="absolute inset-0 rounded-full border border-lime-500 opacity-20 animate-pulse"
            style={{ transform: 'scale(1.2)' }}
          ></div>
          <div 
            className="absolute inset-0 rounded-full border border-blue-500 opacity-15"
            style={{ transform: 'scale(1.4)' }}
          ></div>
          <div 
            className="absolute inset-0 rounded-full border border-purple-500 opacity-10"
            style={{ transform: 'scale(1.6)' }}
          ></div>
        </>
      )}
    </div>
  );
};

// Loading placeholder
const PlanetLoader = () => (
  <div 
    className="relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse"
    aria-label="Loading AEGIS visualization"
  >
    <div className="absolute inset-0 rounded-full bg-lime-500 opacity-10 animate-ping"></div>
  </div>
);

// Main component that decides which implementation to use
const AegisPlanetV6 = () => {
  const { scenePhase, deviceCapabilities } = useScene();
  
  // Determine if we should use the 3D implementation
  const use3D = ['high', 'medium'].includes(deviceCapabilities.performanceTier) && 
                !deviceCapabilities.prefersReducedMotion;
                
  return (
    <div className="relative flex items-center justify-center">
      {use3D ? (
        <Suspense fallback={<PlanetLoader />}>
          <AegisPlanet3D phase={scenePhase} />
        </Suspense>
      ) : (
        <AegisPlanet2D phase={scenePhase} />
      )}
    </div>
  );
};

export default AegisPlanetV6;

