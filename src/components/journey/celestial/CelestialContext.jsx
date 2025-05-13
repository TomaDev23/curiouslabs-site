import { createContext } from 'react';

export const metadata = {
  id: 'celestial_context',
  scs: 'SCS3',
  type: 'context',
  doc: 'contract_celestial_controller.md'
};

// Create context for global celestial system settings
export const CelestialContext = createContext({
  performanceMode: false,
  parallaxStyle: '3d', // '3d' or 'dripping'
  sceneType: 'dormant', // Current scene: dormant, awakening, cosmicReveal, cosmicFlight
  scrollProgress: 0,
  setParallaxStyle: () => {},
  setPerformanceMode: () => {},
  setSceneType: () => {},
}); 