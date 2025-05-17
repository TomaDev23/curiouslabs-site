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
  
  // Dormant scene color palette - darker colors closer to black
  const dormantColors = {
    background: {
      core: '#010512', // Darkened further from '#020924'
      mid: '#01040f', // Darkened further from '#01071d'
      outer: '#000309', // Darkened further from '#010212'
      edge: '#000004'  // Darkened further from '#000108'
    },
    nebula: {
      core: 'rgba(80, 100, 225, 0.03)', // Reduced opacity further from 0.05
      mid: 'rgba(60, 80, 200, 0.02)',  // Reduced opacity further from 0.04
      outer: 'rgba(40, 60, 160, 0.01)', // Reduced opacity further from 0.02
      edge: 'rgba(15, 25, 80, 0.005)',  // Reduced opacity further from 0.01
      fade: 'rgba(5, 5, 25, 0)'
    },
    celestialBodies: {
      hue: 180, // Base hue for celestial bodies
      variation: 60 // Hue variation range
    },
    moon: {
      glow: 'rgba(200,205,230,0.45)' // Enhanced glow opacity from original 0.35
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
            width: '8.84vw',
            height: '8.84vw',
            top: '12%',
            left: '15%',
            background: `
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.75) 75%, rgba(255,255,255,0.0) 100%),
              radial-gradient(ellipse at 85% 55%, rgba(0,0,0,0.38) 40%, rgba(0,0,0,0.0) 70%),
              url('/assets/images/planets/4k/moonmap2kSmall.jpg')
            `,
            backgroundSize: '180%',
            backgroundPosition: 'center 0%',
            filter: 'brightness(1.36) contrast(1.12)',
            boxShadow: `
              0 0 100px 30px rgba(255,255,255,0.55),
              0 0 120px 30px rgba(220,225,255,0.18)
            `,
            animation: 'moonGlow 15s infinite alternate ease-in-out',
            willChange: 'opacity, filter, transform'
          }}
        >
          {/* Milky/frosted surface texture */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 35% 35%, rgba(255,255,250,0.3) 0%, rgba(255,255,250,0.1) 40%, transparent 70%),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")
              `,
              filter: 'contrast(1.05) brightness(1.02)'
            }}
          ></div>
          
          {/* Subtle shadow curve */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.07) 75%, rgba(0,0,0,0.12) 100%)'
            }}
          ></div>
          
          {/* Milky frost layer */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 40%),
                radial-gradient(ellipse at 50% 70%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 40%, rgba(255,255,255,0.1) 0%, transparent 30%)
              `,
              filter: 'blur(1px) brightness(1.02)'
            }}
          ></div>
        </div>
      </div>
      
      {/* Moon light cast on floor/robot - enhanced with subtle animation */}
      <div 
        className="absolute inset-0 w-full h-full z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 15% 14%, rgba(230,230,220,0.15) 0%, rgba(220,225,235,0.08) 30%, rgba(180,195,255,0.05) 50%, transparent 75%)',
          mixBlendMode: 'screen',
          animation: 'moonLightPulse 20s infinite alternate ease-in-out',
        }}
      />
      
      {/* Enhanced keyframe animations */}
      <style jsx>{`
        @keyframes moonGlow {
          0% { opacity: 0.95; filter: blur(0.5px) brightness(0.98); transform: scale(1.0); }
          33% { opacity: 0.98; filter: blur(0.2px) brightness(1.0); transform: scale(1.005); }
          66% { opacity: 1; filter: blur(0px) brightness(1.02); transform: scale(1.01); }
          100% { opacity: 0.97; filter: blur(0.3px) brightness(0.99); transform: scale(1.0); }
        }
        
        @keyframes moonLightPulse {
          0% { opacity: 0.85; }
          33% { opacity: 0.92; }
          66% { opacity: 1; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
} 