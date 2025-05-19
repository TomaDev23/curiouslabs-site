import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMission } from '../mission/MissionTracker';

export type ScenePhase = 'initial' | 'hero-intro' | 'planet-reveal' | 'text-reveal' | 'interactive';
export type PerformanceTier = 'high' | 'medium' | 'low';
export type DeviceCapability = {
  webgl2: boolean;
  webgl1: boolean;
  canvas2d: boolean;
  performanceTier: PerformanceTier;
  devicePixelRatio: number;
  isTouchDevice: boolean;
  prefersReducedMotion: boolean;
};

interface SceneContextType {
  phase: ScenePhase;
  progress: number;
  isTransitioning: boolean;
  deviceCapabilities: DeviceCapability;
  performanceTier: PerformanceTier;
  advancePhase: () => void;
  resetScene: () => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};

const PHASE_SEQUENCE: ScenePhase[] = ['initial', 'hero-intro', 'planet-reveal', 'text-reveal', 'interactive'];
const PHASE_DURATIONS = {
  'initial': 1000,
  'hero-intro': 2500,
  'planet-reveal': 3000,
  'text-reveal': 2000,
  'interactive': 0,
};

// Performance benchmarking function
const measurePerformance = (): Promise<PerformanceTier> => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    let counter = 0;
    
    const benchmark = () => {
      if (counter < 1000) {
        // Simple math operations to stress test
        Math.sqrt(Math.random() * 10000);
        Math.cos(Math.random() * 360);
        counter++;
        requestAnimationFrame(benchmark);
      } else {
        const duration = performance.now() - startTime;
        // Determine performance tier based on benchmark duration
        if (duration < 50) {
          resolve('high');
        } else if (duration < 100) {
          resolve('medium');
        } else {
          resolve('low');
        }
      }
    };
    
    requestAnimationFrame(benchmark);
  });
};

// Device capability detection
const detectDeviceCapabilities = async (): Promise<DeviceCapability> => {
  // Check WebGL support
  const canvas = document.createElement('canvas');
  const webgl2 = !!canvas.getContext('webgl2');
  const webgl1 = !!canvas.getContext('webgl') || !!canvas.getContext('experimental-webgl');
  const canvas2d = !!canvas.getContext('2d');
  
  // Measure performance
  const performanceTier = await measurePerformance();
  
  // Check device characteristics
  const devicePixelRatio = window.devicePixelRatio || 1;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    webgl2,
    webgl1,
    canvas2d,
    performanceTier,
    devicePixelRatio,
    isTouchDevice,
    prefersReducedMotion
  };
};

export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<ScenePhase>('initial');
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapability>({
    webgl2: false,
    webgl1: false,
    canvas2d: false,
    performanceTier: 'low',
    devicePixelRatio: 1,
    isTouchDevice: false,
    prefersReducedMotion: false
  });
  const { updateTaskStatus, updateSubtaskStatus } = useMission();

  // Initialize device capabilities
  useEffect(() => {
    const initCapabilities = async () => {
      try {
        const capabilities = await detectDeviceCapabilities();
        setDeviceCapabilities(capabilities);
        
        // Update mission progress
        updateSubtaskStatus('tile-a', 'a1', true); // Device Capability Detection
        if (capabilities.performanceTier !== 'low') {
          updateSubtaskStatus('tile-a', 'a2', true); // Performance Optimization
        }
      } catch (error) {
        console.error('Failed to detect device capabilities:', error);
      }
    };
    
    initCapabilities();
  }, [updateSubtaskStatus]);

  const advancePhase = () => {
    const currentIndex = PHASE_SEQUENCE.indexOf(phase);
    if (currentIndex < PHASE_SEQUENCE.length - 1) {
      setIsTransitioning(true);
      const nextPhase = PHASE_SEQUENCE[currentIndex + 1];
      
      // Update mission progress based on phase completion
      if (phase === 'hero-intro') {
        updateTaskStatus('tile-c', true);
      } else if (phase === 'planet-reveal') {
        updateTaskStatus('tile-b', true);
      }

      // Adjust transition duration based on performance tier
      const transitionDuration = deviceCapabilities.performanceTier === 'low' 
        ? PHASE_DURATIONS[phase] * 0.5  // Reduce animation time for low-end devices
        : PHASE_DURATIONS[phase];

      setTimeout(() => {
        setPhase(nextPhase);
        setIsTransitioning(false);
      }, transitionDuration);
    }
  };

  const resetScene = () => {
    setPhase('initial');
    setProgress(0);
    setIsTransitioning(false);
  };

  useEffect(() => {
    // Update progress based on current phase
    const currentIndex = PHASE_SEQUENCE.indexOf(phase);
    const newProgress = ((currentIndex + 1) / PHASE_SEQUENCE.length) * 100;
    setProgress(newProgress);
  }, [phase]);

  // Update mission progress for core foundation
  useEffect(() => {
    if (deviceCapabilities.performanceTier !== 'low') {
      updateTaskStatus('tile-a', true); // Mark Core Foundation as complete
    }
  }, [deviceCapabilities, updateTaskStatus]);

  return (
    <SceneContext.Provider 
      value={{ 
        phase, 
        progress, 
        isTransitioning,
        deviceCapabilities,
        performanceTier: deviceCapabilities.performanceTier,
        advancePhase, 
        resetScene 
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export default SceneProvider; 