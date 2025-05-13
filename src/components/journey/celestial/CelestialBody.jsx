import { useRef, useEffect, useContext } from 'react';
import { CelestialContext } from './CelestialContext';
import { useCelestialParallax } from './hooks/useCelestialParallax';
import { useCelestialPerformance } from './hooks/useCelestialPerformance';

export const metadata = {
  id: 'celestial_body',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function CelestialBody({
  size = 100, // base size in pixels or viewport units
  position = { x: 0, y: 0 },
  zIndex = 15, // Increased default z-index
  parallaxFactor = 1,
  parallaxStyle = '3d', // '3d' or 'dripping'
  children,
  glowColor = 'rgba(255,255,255,0.2)',
  glowSize = 20,
  sceneType = 'auto', // Default to auto for scene detection from context
  ...props
}) {
  // Get scene type from context if available
  const context = useContext(CelestialContext);
  const contextSceneType = context?.sceneType;
  
  // Use context scene type if available and sceneType is 'auto', otherwise use prop
  const effectiveSceneType = (sceneType === 'auto' && contextSceneType) ? contextSceneType : sceneType;
  
  console.log('[DEBUG] Reached: CelestialBody component');
  console.log('[DEBUG] CelestialBody - size:', size);
  console.log('[DEBUG] CelestialBody - position:', position);
  console.log('[DEBUG] CelestialBody - sceneType:', effectiveSceneType);
  console.log('[DEBUG] CelestialBody - contextSceneType:', contextSceneType);
  
  const bodyRef = useRef(null);
  const { position: parallaxPosition } = useCelestialParallax(
    parallaxFactor, 
    parallaxStyle, 
    effectiveSceneType
  );
  const { shouldRender, isLowPerfDevice } = useCelestialPerformance();

  // Add performance-based rendering
  useEffect(() => {
    const element = bodyRef.current;
    if (!element) return;
    
    // Performance optimizations
    if (isLowPerfDevice) {
      // Simplify effects for low-performance devices
      element.classList.add('low-perf-mode');
      
      // Disable some animations
      element.querySelectorAll('.animated-layer').forEach(el => {
        el.style.animation = 'none';
      });
      
      // Reduce shadow blur
      element.style.filter = 'blur(0px)';
      
      // Remove some effects
      element.querySelectorAll('.fx-layer').forEach(el => {
        el.style.opacity = '0';
      });
    } else {
      // Full effects for high-performance devices
      element.classList.remove('low-perf-mode');
    }
  }, [isLowPerfDevice]);

  // Always render regardless of performance
  return (
    <div 
      ref={bodyRef}
      className="absolute rounded-full overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate3d(${parallaxPosition.x}px, ${parallaxPosition.y}px, 0) translate(-50%, -50%)`,
        transition: 'transform 0.2s ease-out',
        zIndex: zIndex,
        boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${glowColor}`,
        willChange: 'transform',
        pointerEvents: 'none',
        ...props.style
      }}
    >
      {children}
    </div>
  );
} 