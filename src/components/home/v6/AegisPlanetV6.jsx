/**
 * @component AegisPlanetV6
 * @description Adaptive planet component with 3D and fallback implementations
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - AegisPlanetV6 passes LEGIT protocol
 */

import React, { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScene } from './SceneControllerV6';

// Lazy load 3D implementation
const AegisPlanet3DV6 = lazy(() => import('./AegisPlanet3DV6'));

// Loading placeholder for 3D component
const LoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Fallback 2D implementation using CSS/SVG
const PlanetFallback = ({ className = '' }) => {
  const { scenePhase } = useScene();
  
  return (
    <div 
      className={`relative w-full h-full ${className} ${
        scenePhase === 'void' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
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
      {scenePhase === 'activation' && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-lime-500/20 transform scale-[1.4] rotate-12" />
          <div className="absolute inset-0 rounded-full border border-blue-500/15 transform scale-[1.6] -rotate-6" />
        </>
      )}
    </div>
  );
};

const AegisPlanetV6 = ({ className = '', size = 300 }) => {
  const { deviceCapabilities } = useScene();
  const use3D = deviceCapabilities.performanceTier !== 'minimal';
  
  if (use3D) {
    return (
      <div style={{ width: size, height: size }} className={className}>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <AegisPlanet3DV6 />
          </Suspense>
        </Canvas>
      </div>
    );
  }
  
  return (
    <div style={{ width: size, height: size }} className={className}>
      <PlanetFallback />
    </div>
  );
};

export default AegisPlanetV6;

