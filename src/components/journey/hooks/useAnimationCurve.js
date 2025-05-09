import { useMemo } from 'react';

/**
 * Hook to create smooth animation curves that span scene boundaries
 * Provides various interpolation and easing functions for animations
 * 
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @param {Array} scenes - Array of scene ranges
 * @returns {Object} Various animation curves and helper functions
 */
export function useAnimationCurve(scrollProgress, scenes) {
  return useMemo(() => {
    // Find the current scene based on scroll position
    const currentScene = scenes.find(
      scene => scrollProgress >= scene.range[0] && scrollProgress <= scene.range[1]
    ) || scenes[0];
    
    // Calculate progress within the current scene (0-1)
    const sceneProgress = currentScene 
      ? (scrollProgress - currentScene.range[0]) / (currentScene.range[1] - currentScene.range[0])
      : 0;
    
    // Convert scene progress (0-1) to various easing curves
    const easing = {
      // Linear interpolation (no easing)
      linear: sceneProgress,
      
      // Sine-based easing functions
      easeInSine: 1 - Math.cos(sceneProgress * Math.PI / 2),
      easeOutSine: Math.sin(sceneProgress * Math.PI / 2),
      easeInOutSine: -(Math.cos(Math.PI * sceneProgress) - 1) / 2,
      
      // Cubic easing functions
      easeInCubic: sceneProgress * sceneProgress * sceneProgress,
      easeOutCubic: 1 - Math.pow(1 - sceneProgress, 3),
      easeInOutCubic: sceneProgress < 0.5
        ? 4 * sceneProgress * sceneProgress * sceneProgress
        : 1 - Math.pow(-2 * sceneProgress + 2, 3) / 2,
      
      // Elastic bounce (good for emphasis)
      elastic: sceneProgress === 0 ? 0 : sceneProgress === 1 ? 1 :
        sceneProgress < 0.5
          ? 0.5 * Math.sin(13 * Math.PI/2 * 2 * sceneProgress) * Math.pow(2, 10 * (2 * sceneProgress - 1))
          : 0.5 * Math.sin(-13 * Math.PI/2 * ((2 * sceneProgress - 1) + 1)) * Math.pow(2, -10 * (2 * sceneProgress - 1)) + 1
    };
    
    // Helper functions for animations
    const helpers = {
      // Linear interpolation between two values
      lerp: (start, end, t = sceneProgress) => start + (end - start) * t,
      
      // Color mixing (RGB)
      mixColor: (color1, color2, t = sceneProgress) => {
        // Parse colors (support hex, rgb, or rgba)
        const parseColor = (color) => {
          if (typeof color === 'string') {
            // Parse hex format (#RRGGBB or #RGB)
            if (color.startsWith('#')) {
              let hex = color.substring(1);
              if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
              }
              return {
                r: parseInt(hex.substring(0, 2), 16),
                g: parseInt(hex.substring(2, 4), 16),
                b: parseInt(hex.substring(4, 6), 16),
                a: 1
              };
            }
            
            // Parse rgb/rgba format
            const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
            if (rgbMatch) {
              return {
                r: parseInt(rgbMatch[1], 10),
                g: parseInt(rgbMatch[2], 10),
                b: parseInt(rgbMatch[3], 10),
                a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1
              };
            }
          }
          return { r: 0, g: 0, b: 0, a: 1 }; // Default fallback
        };
        
        const c1 = parseColor(color1);
        const c2 = parseColor(color2);
        
        // Interpolate between colors
        return `rgba(${
          Math.round(c1.r + (c2.r - c1.r) * t)
        }, ${
          Math.round(c1.g + (c2.g - c1.g) * t)
        }, ${
          Math.round(c1.b + (c2.b - c1.b) * t)
        }, ${
          c1.a + (c2.a - c1.a) * t
        })`;
      },
      
      // Map a value from one range to another
      map: (value, inMin, inMax, outMin, outMax) => {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
      },
      
      // Clamp a value between min and max
      clamp: (value, min, max) => Math.min(Math.max(value, min), max)
    };
    
    return {
      // Raw scene data
      currentScene,
      sceneProgress,
      
      // Easing curves
      ...easing,
      
      // Helper functions
      ...helpers
    };
  }, [scrollProgress, scenes]);
} 