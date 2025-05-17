import React, { useEffect, useState } from 'react';
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'moon',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body_moon.md'
};

export default function Moon({ 
  size = 80, 
  position = { x: 50, y: 30 }, 
  sceneType = 'auto',
  parallaxFactor = 1.2,
  parallaxStyle = 'combined',
  ...props 
}) {
  console.log('[DEBUG] Reached: Moon component');
  console.log('[DEBUG] Moon - size:', size);
  console.log('[DEBUG] Moon - position:', position);
  console.log('[DEBUG] Moon - scene:', sceneType);
  console.log('[DEBUG] Moon - parallaxStyle:', parallaxStyle);
  
  // Scene-specific styling
  const [sceneStyles, setSceneStyles] = useState({
    opacity: 0.9,
    scale: 1.0,
    glowIntensity: 0.4,
    glowColor: "rgba(200, 200, 220, 0.4)"
  });
  
  // Update styles based on scene
  useEffect(() => {
    switch(sceneType) {
      case 'dormant':
        setSceneStyles({
          opacity: 0.9,
          scale: 1.0,
          glowIntensity: 0.4,
          glowColor: "rgba(200, 200, 220, 0.4)"
        });
        break;
      case 'awakening':
        setSceneStyles({
          opacity: 1.0,
          scale: 1.05,
          glowIntensity: 0.5,
          glowColor: "rgba(210, 210, 230, 0.5)"
        });
        break;
      case 'cosmicReveal':
        setSceneStyles({
          opacity: 1.0,
          scale: 1.1,
          glowIntensity: 0.7,
          glowColor: "rgba(220, 220, 240, 0.6)"
        });
        break;
      case 'cosmicFlight':
        setSceneStyles({
          opacity: 1.0,
          scale: 1.2,
          glowIntensity: 0.9,
          glowColor: "rgba(230, 230, 255, 0.7)"
        });
        break;
      default:
        setSceneStyles({
          opacity: 0.9,
          scale: 1.0,
          glowIntensity: 0.4,
          glowColor: "rgba(200, 200, 220, 0.4)"
        });
    }
  }, [sceneType]);
  
  // Calculate actual size based on scene scale
  const actualSize = size * sceneStyles.scale;
  const glowSize = actualSize * 0.3 * sceneStyles.glowIntensity * 2;
  
  return (
    <CelestialBody
      size={actualSize}
      position={position}
      glowColor={sceneStyles.glowColor}
      glowSize={glowSize}
      zIndex={35}
      parallaxFactor={parallaxFactor}
      parallaxStyle={parallaxStyle}
      style={{ 
        visibility: 'visible', 
        opacity: sceneStyles.opacity,
        transition: 'opacity 0.5s ease, transform 0.5s ease'
      }}
      sceneType={sceneType}
      {...props}
    >
      {/* Base lunar surface with grayscale gradient */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(230,230,230,1) 0%, rgba(190,190,190,1) 50%, rgba(160,160,160,1) 100%)',
          transition: 'all 0.5s ease'
        }}
      ></div>
      
      {/* Crater features with darker patches */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, rgba(100,100,100,0.4) 0%, rgba(100,100,100,0) 15%),
            radial-gradient(circle at 70% 30%, rgba(100,100,100,0.3) 0%, rgba(100,100,100,0) 10%),
            radial-gradient(circle at 45% 65%, rgba(100,100,100,0.4) 0%, rgba(100,100,100,0) 12%),
            radial-gradient(circle at 60% 75%, rgba(100,100,100,0.3) 0%, rgba(100,100,100,0) 8%)
          `,
          transition: 'all 0.5s ease'
        }}
      ></div>
      
      {/* Optional terminator (day/night boundary) */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, transparent 65%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.4) 100%)',
          filter: 'blur(15px)',
          transition: 'all 0.5s ease'
        }}
      ></div>
      
      {/* Scene-specific effects */}
      {(sceneType === 'cosmicReveal' || sceneType === 'cosmicFlight') && (
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(220,220,240,${sceneType === 'cosmicFlight' ? 0.4 : 0.2}) 0%, rgba(220,220,240,0) 60%)`,
            opacity: sceneType === 'cosmicFlight' ? 0.8 : 0.4,
            transition: 'all 0.8s ease'
          }}
        ></div>
      )}
    </CelestialBody>
  );
} 