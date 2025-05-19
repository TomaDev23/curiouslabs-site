/**
 * @component SceneControllerV6
 * @description Provides scene phase and device capabilities context for V6 components
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - SceneControllerV6 passes LEGIT protocol
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
interface DeviceCapabilities {
  isMobile: boolean;
  performanceTier: 'high' | 'medium' | 'low';
  prefersReducedMotion: boolean;
}

interface SceneContextType {
  scenePhase: string;
  deviceCapabilities: DeviceCapabilities;
  setScenePhase: (phase: string) => void;
}

// Create context
const SceneContext = createContext<SceneContextType | undefined>(undefined);

// Hook for using scene context
export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};

// Provider component
export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scenePhase, setScenePhase] = useState('initial');
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    performanceTier: 'medium',
    prefersReducedMotion: false,
  });

  useEffect(() => {
    // Detect device capabilities
    const detectCapabilities = () => {
      const isMobile = window.innerWidth <= 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Simple performance detection
      const performanceEntry = performance.now();
      let performanceTier: 'high' | 'medium' | 'low' = 'medium';
      
      // Run a simple performance test
      const testPerformance = () => {
        const iterations = 10000;
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
          Math.sqrt(i);
        }
        const duration = performance.now() - start;
        
        if (duration < 5) {
          return 'high';
        } else if (duration < 15) {
          return 'medium';
        }
        return 'low';
      };

      performanceTier = testPerformance();

      setDeviceCapabilities({
        isMobile,
        performanceTier,
        prefersReducedMotion,
      });
    };

    detectCapabilities();

    // Add resize listener
    window.addEventListener('resize', detectCapabilities);
    return () => window.removeEventListener('resize', detectCapabilities);
  }, []);

  const value = {
    scenePhase,
    deviceCapabilities,
    setScenePhase,
  };

  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  );
};

export default SceneProvider; 