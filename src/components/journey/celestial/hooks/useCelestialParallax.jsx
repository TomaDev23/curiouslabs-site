import { useState, useEffect, useRef } from 'react';
import useParallax from '../../../../hooks/useParallax';
import useScrollProgress from '../../../../hooks/useScrollProgress';
import useSceneTypeFromScroll from './useSceneTypeFromScroll';

export const metadata = {
  id: 'use_celestial_parallax',
  scs: 'SCS3',
  type: 'hook',
  doc: 'contract_celestial_hooks.md'
};

export function useCelestialParallax(factor = 1, style = '3d', scene = 'dormant') {
  const ref = useRef(null);
  const scrollProgress = useScrollProgress();
  const parallax = useParallax({ speed: factor * 0.1 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Get scene type from scroll if scene is 'auto'
  const autoSceneType = useSceneTypeFromScroll(scrollProgress);
  const effectiveScene = scene === 'auto' ? autoSceneType : scene;
  
  console.log('[DEBUG] useCelestialParallax - factor:', factor);
  console.log('[DEBUG] useCelestialParallax - style:', style);
  console.log('[DEBUG] useCelestialParallax - scene:', effectiveScene);
  console.log('[DEBUG] useCelestialParallax - scrollY:', parallax.scrollY);
  
  // Extract scrollY from parallax
  const { scrollY } = parallax;
  
  // Add mouse tracking for ALL styles, not just combined
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to center of viewport
      const x = (e.clientX - window.innerWidth / 2) * factor * 0.05;
      const y = (e.clientY - window.innerHeight / 2) * factor * 0.05;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [factor]);
  
  // Calculate position based on style and scene
  useEffect(() => {
    // Apply scene-specific animations
    let xOffset = 0;
    let yOffset = 0;
    
    // Base scroll effects
    switch(effectiveScene) {
      case 'dormant':
        // Subtle movement in dormant scene
        xOffset = parallax.scrollY * factor * 0.05;
        yOffset = parallax.scrollY * factor * 0.03;
        break;
        
      case 'awakening':
        // Slightly more movement with some scroll influence
        xOffset = parallax.scrollY * factor * 0.08;
        yOffset = parallax.scrollY * factor * 0.2;
        break;
        
      case 'cosmicReveal':
        // 3D space travel effect for cosmic reveal
        if (style === '3d') {
          xOffset = parallax.scrollY * factor * 0.15;
          yOffset = parallax.scrollY * factor * 0.8;
        } else {
          xOffset = parallax.scrollY * factor * 0.1;
          yOffset = parallax.scrollY * factor * 0.8;
        }
        break;
        
      case 'cosmicFlight':
        // Dripping effect for cosmic flight (unless using 3D style)
        if (style === '3d') {
          xOffset = parallax.scrollY * factor * 0.12;
          yOffset = parallax.scrollY * factor * 0.5;
        } else {
          xOffset = parallax.scrollY * factor * 0.1;
          yOffset = parallax.scrollY * factor * 0.8;
        }
        break;
        
      default:
        // Default behavior
        xOffset = parallax.scrollY * factor * 0.1;
        yOffset = parallax.scrollY * factor * 0.1;
    }
    
    // Apply mouse position based on style
    let mouseIntensity;
    if (style === 'combined') {
      mouseIntensity = 1.0; // Full intensity
    } else if (style === '3d') {
      mouseIntensity = 0.8; // Strong but not full
    } else {
      mouseIntensity = 0.4; // Subtle
    }
    
    // Add mouse position influence to all styles
    xOffset += mousePosition.x * mouseIntensity;
    yOffset += mousePosition.y * mouseIntensity;
    
    setPosition({
      x: xOffset,
      y: yOffset
    });
    
    console.log('[DEBUG] useCelestialParallax - calculated position:', {
      x: xOffset,
      y: yOffset
    });
    
  }, [scrollY, factor, style, effectiveScene, parallax, mousePosition]);
  
  return { position, ref, scrollProgress, sceneType: effectiveScene };
} 