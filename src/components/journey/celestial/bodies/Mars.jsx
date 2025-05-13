import React, { useEffect, useState, useRef } from 'react';
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'mars',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Mars({ 
  size = 70, 
  position = { x: 30, y: 25 }, 
  sceneType = 'auto',
  ...props 
}) {
  console.log('[DEBUG] Reached: Mars component');
  console.log('[DEBUG] Mars - size:', size);
  console.log('[DEBUG] Mars - position:', position);
  console.log('[DEBUG] Mars - scene:', sceneType);
  
  // Animation refs
  const animationRef = useRef(null);
  const dustPositionRef = useRef({ x: 50, y: 50 });
  
  // Scene-specific styling
  const [sceneStyles, setSceneStyles] = useState({
    opacity: 0.7,
    scale: 1,
    glowIntensity: 0.25,
    glowColor: "rgba(255, 100, 50, 0.3)"
  });
  
  // Dust storm animation
  const [dustPosition, setDustPosition] = useState({ x: 50, y: 50 });
  
  // Update dust storm position
  useEffect(() => {
    const animateDust = () => {
      const time = Date.now() / 3000;
      dustPositionRef.current = {
        x: 50 + Math.sin(time) * 20,
        y: 50 + Math.cos(time) * 20
      };
      setDustPosition(dustPositionRef.current);
      animationRef.current = requestAnimationFrame(animateDust);
    };
    
    animationRef.current = requestAnimationFrame(animateDust);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Update styles based on scene
  useEffect(() => {
    switch(sceneType) {
      case 'dormant':
        setSceneStyles({
          opacity: 0.7,
          scale: 1,
          glowIntensity: 0.25,
          glowColor: "rgba(255, 100, 50, 0.3)"
        });
        break;
      case 'awakening':
        setSceneStyles({
          opacity: 0.85,
          scale: 1.1,
          glowIntensity: 0.4,
          glowColor: "rgba(255, 120, 70, 0.35)"
        });
        break;
      case 'cosmicReveal':
        setSceneStyles({
          opacity: 1,
          scale: 1.2,
          glowIntensity: 0.6,
          glowColor: "rgba(255, 140, 80, 0.45)"
        });
        break;
      case 'cosmicFlight':
        setSceneStyles({
          opacity: 1,
          scale: 1.3,
          glowIntensity: 0.8,
          glowColor: "rgba(255, 160, 100, 0.55)"
        });
        break;
      default:
        setSceneStyles({
          opacity: 0.7,
          scale: 1,
          glowIntensity: 0.25,
          glowColor: "rgba(255, 100, 50, 0.3)"
        });
    }
  }, [sceneType]);
  
  // Calculate actual size based on scene scale
  const actualSize = size * sceneStyles.scale;
  const glowSize = actualSize * 0.35 * sceneStyles.glowIntensity;
  
  return (
    <CelestialBody
      size={actualSize}
      position={position}
      glowColor={sceneStyles.glowColor}
      glowSize={glowSize}
      zIndex={25}
      style={{ 
        visibility: 'visible', 
        opacity: sceneStyles.opacity,
        transition: 'opacity 0.5s ease, transform 0.5s ease'
      }}
      sceneType={sceneType}
      {...props}
    >
      {/* Base planet with enhanced reddish-orange color */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(230,150,120,1) 0%, rgba(200,90,50,1) 50%, rgba(170,60,30,1) 100%)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
        }}
      ></div>
      
      {/* Enhanced surface features with more detailed texturing */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(140,50,30,0.6) 0%, rgba(140,50,30,0) 30%),
            radial-gradient(circle at 75% 30%, rgba(150,60,30,0.5) 0%, rgba(150,60,30,0) 25%),
            radial-gradient(circle at 35% 65%, rgba(130,40,20,0.7) 0%, rgba(130,40,20,0) 35%),
            radial-gradient(circle at 65% 70%, rgba(160,70,40,0.4) 0%, rgba(160,70,40,0) 20%)
          `,
          mixBlendMode: 'soft-light'
        }}
      ></div>
      
      {/* More detailed polar ice caps with highlights */}
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: '85%',
          height: '35%',
          top: '3%',
          left: '8%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(240,240,255,0.4) 50%, rgba(255,255,255,0) 80%)',
          boxShadow: 'inset 0 3px 5px rgba(255,255,255,0.3)'
        }}
      ></div>
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: '75%',
          height: '30%',
          bottom: '3%',
          left: '13%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(240,240,255,0.3) 50%, rgba(255,255,255,0) 75%)',
          boxShadow: 'inset 0 -3px 5px rgba(255,255,255,0.2)'
        }}
      ></div>
      
      {/* Animated dust storms */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden animated-layer"
        style={{
          backgroundImage: `
            radial-gradient(circle at ${dustPosition.x}% ${dustPosition.y}%, 
            rgba(210,170,140,0.3) 0%, rgba(210,170,140,0) 40%)
          `,
          transition: 'background-position 0.5s ease-out'
        }}
      ></div>
      
      {/* Valles Marineris-like canyon feature */}
      <div 
        className="absolute"
        style={{
          width: '60%',
          height: '8%',
          top: '45%',
          left: '20%',
          background: 'linear-gradient(90deg, rgba(130,40,20,0) 0%, rgba(130,40,20,0.7) 20%, rgba(130,40,20,0.7) 80%, rgba(130,40,20,0) 100%)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), inset 0 -1px 3px rgba(0,0,0,0.5)',
          borderRadius: '100%',
          transform: 'rotate(-15deg)'
        }}
      ></div>
      
      {/* Surface highlights to add dimension */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)',
          mixBlendMode: 'overlay'
        }}
      ></div>
      
      {/* Scene-specific effects */}
      {sceneType === 'cosmicReveal' || sceneType === 'cosmicFlight' ? (
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,180,120,${sceneType === 'cosmicFlight' ? 0.4 : 0.2}) 0%, rgba(255,180,120,0) 60%)`,
            opacity: sceneType === 'cosmicFlight' ? 0.8 : 0.4,
            transition: 'all 0.8s ease',
            mixBlendMode: 'screen'
          }}
        ></div>
      ) : null}
      
      {/* Subtle rotation animation */}
      <style jsx>{`
        @keyframes mars-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animated-layer {
          animation: mars-rotate 120s infinite linear;
        }
      `}</style>
    </CelestialBody>
  );
} 