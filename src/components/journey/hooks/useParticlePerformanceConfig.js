import { useState, useEffect, useRef } from 'react';

/**
 * Hook to manage particle configuration with performance optimization
 * Adjusts parameters based on device capabilities and current scene
 * 
 * @param {string} currentScene - Key of the current active scene
 * @return {Object} Optimized particle configuration
 */
export function useParticlePerformanceConfig(currentScene) {
  const isMobile = useRef(window.innerWidth <= 768);
  const [config, setConfig] = useState({
    density: 115,   // Number of particles
    speed: 1,       // Animation speed multiplier
    fps: 15,        // Target FPS for throttling
    hue: 0,         // Base color hue (using white stars now)
    glow: 0.8       // Glow intensity (0-1)
  });
  
  useEffect(() => {
    // Update configuration based on current scene and device capabilities
    switch(currentScene) {
      case 'dormant':
        setConfig({
          density: isMobile.current ? 100 : 115,
          speed: 1,
          fps: isMobile.current ? 12 : 15,
          hue: 0,
          glow: 0.8
        });
        break;
      case 'awakening':
        setConfig({
          density: isMobile.current ? 80 : 95,
          speed: 1,
          fps: isMobile.current ? 8 : 10,
          hue: 0,
          glow: 0.8
        });
        break;
      case 'cosmicReveal':
        setConfig({
          density: isMobile.current ? 15 : 20,
          speed: 1,
          fps: isMobile.current ? 8 : 10,
          hue: 0,
          glow: 0.8
        });
        break;
      case 'cosmicFlight':
        setConfig({
          density: isMobile.current ? 30 : 40,
          speed: isMobile.current ? 2 : 3,
          fps: isMobile.current ? 24 : 30,
          hue: 0,
          glow: isMobile.current ? 0.6 : 0.8
        });
        break;
      case 'sunApproach':
        setConfig({
          density: isMobile.current ? 120 : 150,
          speed: 1,
          fps: isMobile.current ? 12 : 15,
          hue: 0,
          glow: 1.5
        });
        break;
      case 'sunLanding':
        setConfig({
          density: isMobile.current ? 25 : 30,
          speed: 2,
          fps: isMobile.current ? 20 : 24,
          hue: 0,
          glow: 1.0
        });
        break;
      default:
        // Default configuration
        setConfig({
          density: isMobile.current ? 100 : 115,
          speed: 1,
          fps: isMobile.current ? 12 : 15,
          hue: 0,
          glow: 0.8
        });
    }
  }, [currentScene]);

  return config;
} 