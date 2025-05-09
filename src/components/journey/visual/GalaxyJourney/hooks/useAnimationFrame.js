import { useRef, useEffect } from 'react';

// LEGIT metadata declaration
export const metadata = {
  id: 'use_animation_frame_hook',
  scs: 'SCS5',
  type: 'hook',
  doc: 'contract_galaxy_journey.md'
};

/**
 * Custom hook to create an animation loop with deltaTime calculation
 * Enhanced for LEGIT compliance with proper cleanup and safety checks
 * 
 * @param {Function} callback - Animation callback function that receives (deltaTime, time)
 * @param {boolean} [active=true] - Whether the animation should be active
 * @param {number} [fps=0] - Optional FPS limitation (0 = no limit, runs at display refresh rate)
 * @returns {Object} Animation state and control methods
 */
const useAnimationFrame = (callback, active = true, fps = 0) => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const fpsIntervalRef = useRef(null);
  const isActiveRef = useRef(active);
  
  // Calculate FPS interval in ms
  useEffect(() => {
    isActiveRef.current = active;
    
    if (fps > 0) {
      fpsIntervalRef.current = 1000 / fps;
    } else {
      fpsIntervalRef.current = null;
    }
  }, [active, fps]);
  
  useEffect(() => {
    let lastFpsUpdate = 0;
    
    const animate = (time) => {
      // Safety check: ensure callback exists
      if (typeof callback !== 'function') {
        console.warn('useAnimationFrame received a non-function callback');
        return;
      }
      
      // Check if animation should run based on active state
      if (!isActiveRef.current) {
        previousTimeRef.current = null;
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Handle FPS limiting
      if (fpsIntervalRef.current) {
        const now = time;
        const elapsed = now - lastFpsUpdate;
        
        if (elapsed < fpsIntervalRef.current) {
          requestRef.current = requestAnimationFrame(animate);
          return;
        }
        
        // Adjust last update time to maintain consistent timing
        lastFpsUpdate = now - (elapsed % fpsIntervalRef.current);
      }
      
      // Calculate delta time
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        
        // Execute callback with deltaTime and timestamp
        callback(deltaTime, time);
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup function - cancel animation frame
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]); // Intentionally only reacting to callback changes
  
  return {
    isActive: isActiveRef.current,
    // Additional controls could be added here for future expansion
  };
};

export default useAnimationFrame; 