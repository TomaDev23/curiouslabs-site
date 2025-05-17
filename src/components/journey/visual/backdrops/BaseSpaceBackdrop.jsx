import { useRef, useEffect, useState } from 'react';

// LEGIT-compliant metadata
export const metadata = {
  id: 'base_space_backdrop',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_cosmic_backdrop.md'
};

/**
 * BaseSpaceBackdrop - Core foundation for all cosmic scenes
 * 
 * @param {Object} props
 * @param {number} props.progress - Animation progress from 0 to 1
 * @param {boolean} props.enableMouseParallax - Whether to enable mouse-based parallax
 * @param {Object} props.colors - Color palette for the scene
 * @param {Function} props.onInit - Callback when the component is initialized
 * @param {string} props.sceneKey - Current scene identifier
 */
export default function BaseSpaceBackdrop({ 
  progress = 0, 
  enableMouseParallax = true,
  colors = {
    background: {
      core: '#040c36',
      mid: '#030928',
      outer: '#02051c',
      edge: '#01020f'
    },
    nebula: {
      core: 'rgba(100, 120, 255, 0.08)',
      mid: 'rgba(80, 100, 220, 0.06)',
      outer: 'rgba(50, 70, 180, 0.04)',
      edge: 'rgba(20, 30, 100, 0.02)',
      fade: 'rgba(10, 10, 50, 0)'
    },
    celestialBodies: {
      hue: 180,
      variation: 60
    }
  },
  onInit = () => {},
  sceneKey = "dormant" 
}) {
  // Only keep moon layer reference
  const moonLayerRef = useRef(null);
  
  // Mouse position state for moon parallax only
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Tracking initialization
  const [initialized, setInitialized] = useState(false);
  
  // Initialize callback
  useEffect(() => {
    if (!initialized && moonLayerRef.current) {
      setInitialized(true);
      onInit();
    }
  }, [initialized, onInit]);
  
  // Track mouse movement ONLY for moon layer parallax
  useEffect(() => {
    // Only track mouse if parallax is enabled
    if (!enableMouseParallax) return;
    
    const handleMouseMove = (e) => {
      // Reduced sensitivity
      const x = (e.clientX / window.innerWidth - 0.5) * 0.5; 
      const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableMouseParallax]);
  
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Fixed Background Layer (z-index: 0) */}
      <div className="absolute inset-0 w-full h-full z-1 bg-[radial-gradient(ellipse_at_center,_rgba(15,15,35,0.65)_0%,_rgba(0,0,0,0.8)_70%,_transparent_100%)]" />
      
      {/* ONLY moon layer keeps mouse parallax */}
      <div 
        ref={moonLayerRef}
        className="absolute inset-0 w-full h-full z-30 moon-layer"
        style={{
          transform: enableMouseParallax 
            ? `translate3d(${mousePosition.x * -10}px, ${mousePosition.y * -10}px, 0)` 
            : 'none',
          transition: 'transform 0.3s ease-out',
          willChange: 'transform'
        }}
      >
        {/* This space is reserved for child components to add scene-specific elements */}
      </div>
    </div>
  );
} 