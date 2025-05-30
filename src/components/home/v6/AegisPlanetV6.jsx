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
// import { Canvas } from '@react-three/fiber'; // REMOVED: Unused import causing Three.js contamination
import { useScene } from './SceneControllerV6';
// import EarthSphere from '../../atomic/Planetary/EarthSphere';

// Lazy load EarthSphere to prevent Three.js contamination
const EarthSphere = lazy(() => import('../../atomic/Planetary/EarthSphere'));

// TEMPORARY: Using fallback only until EarthSphere integration
// const AegisPlanet3DV6 = lazy(() => import('./AegisPlanet3DV6'));

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
      className={`relative w-full h-full ${className} opacity-0 transition-all duration-1000`}
    >
      {/* TEMPORARY: Completely hidden until EarthSphere integration */}
      {/* <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/10" /> */}
      
      {/* Orbital rings - COMMENTED OUT */}
      {/*
      {scenePhase === 'activation' && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-lime-500/20 transform scale-[1.4] rotate-12" />
          <div className="absolute inset-0 rounded-full border border-blue-500/15 transform scale-[1.6] -rotate-6" />
        </>
      )}
      */}
    </div>
  );
};

const AegisPlanetV6 = ({ className = '', size = 300 }) => {
  const { deviceCapabilities } = useScene();
  // Enable 3D based on performance tier
  const use3D = deviceCapabilities.performanceTier !== 'minimal';
  
  if (use3D) {
    return (
      <div style={{ width: size, height: size }} className={className}>
        <Suspense fallback={<LoadingPlaceholder />}>
          <EarthSphere className="w-full h-full" />
        </Suspense>
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

