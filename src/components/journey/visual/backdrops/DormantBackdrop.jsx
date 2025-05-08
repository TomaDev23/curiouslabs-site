import { useRef, useEffect, useState } from 'react';
import BaseSpaceBackdrop from './BaseSpaceBackdrop';

// LEGIT metadata export
const metadata = {
  id: 'dormant_backdrop',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_cosmic_backdrop.md'
};

/**
 * DormantBackdrop - The sleeping cosmic state
 * Extends BaseSpaceBackdrop with specific dormant scene elements
 */
export default function DormantBackdrop({ progress = 0 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Moon references
  const moonLayerRef = useRef(null);
  
  // Track mouse movement for moon parallax - with further reduced sensitivity
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.35; // Further reduced by 50% (was 0.7)
      const y = (e.clientY / window.innerHeight - 0.5) * 0.35; // Further reduced by 50% (was 0.7)
      
      // Apply smoothing using requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Dormant scene color palette
  const dormantColors = {
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
      hue: 180, // Base hue for celestial bodies
      variation: 60 // Hue variation range
    },
    moon: {
      glow: 'rgba(180,200,255,0.5)'
    }
  };
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Base cosmic scene with minimized parallax */}
      <BaseSpaceBackdrop 
        progress={progress}
        enableMouseParallax={false} // Disable mouse parallax in base component
        colors={dormantColors}
      />
      
      {/* Moon layer with subtle parallax - only this layer moves with mouse */}
      <div 
        ref={moonLayerRef}
        className="absolute inset-0 w-full h-full z-40 pointer-events-none"
        style={{
          transform: `translate3d(${mousePosition.x * -15}px, ${mousePosition.y * -15}px, 0)`, // Reduced from -25
          transition: 'transform 0.3s ease-out', // Smoother transition
          willChange: 'transform' // Added GPU hint
        }}
      >
        {/* Moon with prominent glow */}
        <div 
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '13.5vw',
            height: '13.5vw',
            top: '8%',
            left: '15%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(240,245,255,0.85) 40%, rgba(220,235,255,0.8) 70%, rgba(200,220,255,0.7) 90%)',
            boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.2), 0 0 100px 30px ${dormantColors.moon.glow}`,
            animation: 'moonGlow 15s infinite alternate ease-in-out',
            willChange: 'opacity, filter, transform' // Added GPU hint
          }}
        >
          {/* Moon texture overlay */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(
                circle at 30% 35%,
                rgba(255,255,255,0.9) 0%,
                transparent 20%,
                rgba(255,255,255,0.8) 30%,
                transparent 40%,
                rgba(255,255,255,0.7) 50%,
                transparent 60%,
                rgba(220,225,255,0.6) 80%
              )`,
            }}
          ></div>
        </div>
      </div>
      
      {/* Moon light cast on floor/robot */}
      <div 
        className="absolute inset-0 w-full h-full z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 15% 10%, rgba(220,225,255,0.15) 0%, rgba(220,225,255,0.08) 30%, rgba(180,200,255,0.05) 50%, transparent 75%)',
          mixBlendMode: 'screen',
          animation: 'moonLightPulse 20s infinite alternate ease-in-out',
        }}
      ></div>
      
      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes moonGlow {
          0% { opacity: 0.95; filter: blur(0.5px); transform: scale(1.0); }
          33% { opacity: 0.98; filter: blur(0.3px); transform: scale(1.01); }
          66% { opacity: 1; filter: blur(0px); transform: scale(1.02); }
          100% { opacity: 0.97; filter: blur(0.2px); transform: scale(1.0); }
        }
        
        @keyframes moonLightPulse {
          0% { opacity: 0.85; }
          50% { opacity: 1; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
} 