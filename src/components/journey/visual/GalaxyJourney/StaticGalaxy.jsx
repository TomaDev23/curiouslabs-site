import React, { useRef, useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';

// Lazy-load the renderer component
const GalaxyRenderer = lazy(() => import('./GalaxyRenderer'));

// LEGIT metadata declaration
export const metadata = {
  id: 'static_galaxy_journey',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_galaxy_journey.md'
};

/**
 * StaticGalaxy - Non-scroll version of GalaxyJourney
 * Directly accepts scene and progress props instead of using scroll position
 * 
 * @typedef {Object} StaticGalaxyProps
 * @property {string} scene - Current scene name (dormant, awakening, cosmicReveal, cosmicFlight)
 * @property {number} progress - Progress within the scene (0-1)
 * @property {boolean} [isDebug] - Enable debug overlay and controls
 * @property {Object} [options] - Override default visual parameters
 * @property {number} [options.starCount] - Number of background stars
 * @property {number} [options.galaxyCount] - Number of galaxy particles
 * @property {number} [options.cameraDistance] - Camera distance from center
 * @property {number} [options.rotation] - Galaxy rotation in degrees
 * @property {number} [options.brightness] - Overall brightness multiplier
 * @property {number} [options.colorShift] - Color hue shift
 * @property {boolean} [options.cameraMovementEnabled] - Whether camera movement is enabled
 * 
 * @param {StaticGalaxyProps} props
 */
export default function StaticGalaxy({ 
  scene = 'cosmicReveal',
  progress = 0.5,
  isDebug = false,
  options = {}
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Process and normalize options with defaults
  const processedOptions = {
    starCount: options.starCount || 3000,
    galaxyCount: options.galaxyCount || 15000,
    trailCount: options.trailCount || 5000,
    cameraDistance: options.cameraDistance || 30,
    rotation: options.rotation || 0,
    brightness: options.brightness || 1.0,
    colorShift: options.colorShift || 0,
    cameraMovementEnabled: options.cameraMovementEnabled !== undefined ? options.cameraMovementEnabled : true
  };
  
  // Generate sceneData from props instead of scroll
  const sceneData = {
    scene: scene,
    progress: progress,
    isExploding: scene === 'cosmicReveal' && progress >= 0.15 && progress <= 0.25,
    explosionProgress: scene === 'cosmicReveal' && progress >= 0.15 && progress <= 0.25 
      ? (progress - 0.15) / 0.1 
      : (progress < 0.15 ? 0 : 1),
    scrollPosition: 0, // Not used but required by the renderer
    cameraOptions: {
      distance: processedOptions.cameraDistance,
      rotation: processedOptions.rotation * (Math.PI / 180), // Convert to radians
    },
    visualOptions: {
      brightness: processedOptions.brightness,
      colorShift: processedOptions.colorShift * (Math.PI / 180), // Convert to radians
    }
  };
  
  // Calculate fake scrollProgress based on scene for global effects
  const scrollProgress = (() => {
    switch(scene) {
      case 'dormant': return progress * 0.05;
      case 'awakening': return 0.05 + (progress * 0.1);
      case 'cosmicReveal': return 0.15 + (progress * 0.15);
      case 'cosmicFlight': return 0.3 + (progress * 0.5);
      default: return 0.5;
    }
  })();
  
  // Handle resize to update dimensions
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Debug overlay component
  const DebugOverlay = () => {
    if (!isDebug) return null;
    
    return (
      <div className="fixed top-4 right-4 z-[9999] bg-black/80 p-4 rounded-lg text-xs text-white font-mono">
        <div className="mb-1">Scene: <span className="text-green-400">{scene}</span></div>
        <div className="mb-1">Progress: {(progress * 100).toFixed(2)}%</div>
        <div className="mb-1">Camera: {processedOptions.cameraDistance}, {processedOptions.rotation}°</div>
        <div className="mb-1">Visual: {processedOptions.brightness.toFixed(1)}x, {processedOptions.colorShift}°</div>
        <div className="mb-1">Camera Movement: {processedOptions.cameraMovementEnabled ? 'ON' : 'OFF'}</div>
        {sceneData.isExploding && (
          <div className="text-yellow-300">Explosion: {(sceneData.explosionProgress * 100).toFixed(2)}%</div>
        )}
        
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="text-xs text-gray-400">Static Mode</div>
        </div>
      </div>
    );
  };
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full z-0"
      aria-hidden="true" // Accessibility: mark as decorative
    >
      {dimensions.width > 0 && (
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <GalaxyRenderer 
            width={dimensions.width}
            height={dimensions.height}
            sceneData={sceneData}
            scrollProgress={scrollProgress}
            options={processedOptions}
          />
        </Suspense>
      )}
      
      <DebugOverlay />
    </div>
  );
} 