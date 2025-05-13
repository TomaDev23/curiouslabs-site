import { useState, useEffect } from 'react';

export const metadata = {
  id: 'use_celestial_performance',
  scs: 'SCS3',
  type: 'hook',
  doc: 'contract_celestial_hooks.md'
};

export function useCelestialPerformance() {
  const [fps, setFps] = useState(60);
  const [shouldRender, setShouldRender] = useState(true);
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
  
  useEffect(() => {
    // Detect device capabilities
    const checkPerformance = () => {
      // Mobile detection
      const isMobile = window.innerWidth <= 768;
      // Simple FPS counter
      let frameCount = 0;
      let lastTime = performance.now();
      
      const countFrames = () => {
        const now = performance.now();
        frameCount++;
        
        if (now - lastTime >= 1000) {
          setFps(frameCount);
          // Always render celestial bodies for now
          setShouldRender(true);
          setIsLowPerfDevice(frameCount < 40 || isMobile);
          frameCount = 0;
          lastTime = now;
        }
        
        requestAnimationFrame(countFrames);
      };
      
      const frameId = requestAnimationFrame(countFrames);
      return () => cancelAnimationFrame(frameId);
    };
    
    const cleanup = checkPerformance();
    return cleanup;
  }, []);
  
  return {
    fps,
    shouldRender: true,
    isLowPerfDevice
  };
} 