/**
 * @metadata
 * @component SceneController
 * @description Root orchestrator that manages scroll, animation phasing, and performance detection
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define types for scene phases and performance tiers
export const ScenePhases = {
  VOID: 'void',
  EMERGENCE: 'emergence',
  ACTIVATION: 'activation'
};

export const PerformanceTiers = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  MINIMAL: 'minimal'
};

// Create the context with default values
export const SceneContext = createContext({
  scenePhase: ScenePhases.VOID,
  deviceCapabilities: {
    performanceTier: PerformanceTiers.HIGH,
    prefersReducedMotion: false,
    isMobile: false,
    isTablet: false,
    devicePixelRatio: 1
  },
  scrollPosition: 0,
  horizontalScroll: 0,
  handleHorizontalScroll: () => {},
  advancePhase: () => {},
  setPhase: () => {}
});

// Custom hook for accessing scene context
export const useScene = () => useContext(SceneContext);

const SceneControllerV6 = ({ children }) => {
  // Core state for scene management
  const [scenePhase, setScenePhase] = useState(ScenePhases.VOID);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [horizontalScroll, setHorizontalScroll] = useState(0);
  
  // Device capabilities state
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    performanceTier: PerformanceTiers.HIGH,
    prefersReducedMotion: false,
    isMobile: false,
    isTablet: false,
    devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
  });

  // Detect device capabilities on component mount
  useEffect(() => {
    const detectCapabilities = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check device type
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      
      // Get device pixel ratio
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Try to detect memory (not supported in all browsers)
      const memory = navigator.deviceMemory || 8; // Default to 8GB if not available
      
      // Determine performance tier based on device capabilities
      let performanceTier = PerformanceTiers.HIGH;
      
      if (prefersReducedMotion) {
        performanceTier = PerformanceTiers.MINIMAL;
      } else if (isMobile && memory <= 2) {
        performanceTier = PerformanceTiers.MINIMAL;
      } else if (isMobile || (memory <= 4)) {
        performanceTier = PerformanceTiers.LOW;
      } else if (isTablet || (memory <= 6)) {
        performanceTier = PerformanceTiers.MEDIUM;
      }
      
      // Update device capabilities state
      setDeviceCapabilities({
        performanceTier,
        prefersReducedMotion,
        isMobile,
        isTablet,
        devicePixelRatio
      });
    };
    
    // Detect capabilities initially
    detectCapabilities();
    
    // Re-detect on window resize
    window.addEventListener('resize', detectCapabilities);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', detectCapabilities);
    };
  }, []);

  // Handle automatic phase progression with appropriate timing
  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (deviceCapabilities.prefersReducedMotion) {
      setScenePhase(ScenePhases.ACTIVATION);
      return;
    }
    
    // Phase timing (in milliseconds)
    const phaseTiming = {
      [ScenePhases.VOID]: 1800,
      [ScenePhases.EMERGENCE]: 2200
    };
    
    // Only set timer if not already in final phase
    if (scenePhase !== ScenePhases.ACTIVATION) {
      const timer = setTimeout(() => {
        // Advance to next phase
        setScenePhase(prevPhase => {
          switch (prevPhase) {
            case ScenePhases.VOID:
              return ScenePhases.EMERGENCE;
            case ScenePhases.EMERGENCE:
              return ScenePhases.ACTIVATION;
            default:
              return prevPhase;
          }
        });
      }, phaseTiming[scenePhase]);
      
      return () => clearTimeout(timer);
    }
  }, [scenePhase, deviceCapabilities.prefersReducedMotion]);

  // Handle scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      const newScrollPosition = window.scrollY;
      setScrollPosition(newScrollPosition);
      
      // Handle scroll-based phase progression
      // This provides a fallback for users who scroll before animations complete
      if (newScrollPosition > 100 && scenePhase === ScenePhases.VOID) {
        setScenePhase(ScenePhases.EMERGENCE);
      } else if (newScrollPosition > 300 && scenePhase === ScenePhases.EMERGENCE) {
        setScenePhase(ScenePhases.ACTIVATION);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scenePhase]);
  
  // Function to advance to the next phase
  const advancePhase = useCallback(() => {
    setScenePhase(prevPhase => {
      switch (prevPhase) {
        case ScenePhases.VOID:
          return ScenePhases.EMERGENCE;
        case ScenePhases.EMERGENCE:
          return ScenePhases.ACTIVATION;
        default:
          return prevPhase;
      }
    });
  }, []);
  
  // Function to set phase directly
  const setPhase = useCallback((phase) => {
    if (Object.values(ScenePhases).includes(phase)) {
      setScenePhase(phase);
    } else {
      console.warn(`Invalid scene phase: ${phase}`);
    }
  }, []);
  
  // Handle horizontal scroll for product sections
  const handleHorizontalScroll = useCallback((scrollPosition) => {
    setHorizontalScroll(scrollPosition);
  }, []);
  
  // Create context value
  const contextValue = {
    scenePhase,
    deviceCapabilities,
    scrollPosition,
    horizontalScroll,
    handleHorizontalScroll,
    advancePhase,
    setPhase
  };
  
  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
};

export default SceneControllerV6;