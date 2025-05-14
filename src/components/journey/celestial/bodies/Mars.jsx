import React, { useEffect, useState } from 'react';
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
  
  // Scene-specific styling
  const [sceneStyles, setSceneStyles] = useState({
    opacity: 0.7,
    scale: 1,
    glowIntensity: 0.25,
    glowColor: "rgba(210, 120, 70, 0.25)"
  });
  
  // Update styles based on scene
  useEffect(() => {
    switch(sceneType) {
      case 'dormant':
        setSceneStyles({
          opacity: 0.7,
          scale: 1,
          glowIntensity: 0.25,
          glowColor: "rgba(210, 120, 70, 0.25)"
        });
        break;
      case 'awakening':
        setSceneStyles({
          opacity: 0.85,
          scale: 1.1,
          glowIntensity: 0.4,
          glowColor: "rgba(230, 140, 90, 0.35)"
        });
        break;
      case 'cosmicReveal':
        setSceneStyles({
          opacity: 1,
          scale: 1.2,
          glowIntensity: 0.6,
          glowColor: "rgba(250, 160, 100, 0.45)"
        });
        break;
      case 'cosmicFlight':
        setSceneStyles({
          opacity: 1,
          scale: 1.3,
          glowIntensity: 0.8,
          glowColor: "rgba(255, 180, 120, 0.55)"
        });
        break;
      default:
        setSceneStyles({
          opacity: 0.7,
          scale: 1,
          glowIntensity: 0.25,
          glowColor: "rgba(210, 120, 70, 0.25)"
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
      zIndex={25}
      style={{ 
        visibility: 'visible', 
        opacity: sceneStyles.opacity,
        transition: 'opacity 0.5s ease, transform 0.5s ease'
      }}
      sceneType={sceneType}
      {...props}
    >
      {/* Base planet with reddish-orange color */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(210,140,120,1) 0%, rgba(190,95,60,1) 50%, rgba(160,65,45,1) 100%)',
          transition: 'all 0.5s ease'
        }}
      ></div>
      
      {/* Surface features with darker patches/craters */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(130,50,40,0.4) 0%, rgba(130,50,40,0) 25%),
            radial-gradient(circle at 75% 30%, rgba(130,50,40,0.4) 0%, rgba(130,50,40,0) 20%),
            radial-gradient(circle at 35% 65%, rgba(130,50,40,0.5) 0%, rgba(130,50,40,0) 25%),
            radial-gradient(circle at 65% 70%, rgba(130,50,40,0.3) 0%, rgba(130,50,40,0) 15%)
          `,
          transition: 'all 0.5s ease'
        }}
      ></div>
      
      {/* Polar ice caps */}
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: '80%',
          height: '30%',
          top: '5%',
          left: '10%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)',
          transition: 'all 0.5s ease'
        }}
      ></div>
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: '70%',
          height: '25%',
          bottom: '5%',
          left: '15%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 75%)',
          transition: 'all 0.5s ease'
        }}
      ></div>
      
      {/* Scene-specific effects */}
      {sceneType === 'cosmicReveal' || sceneType === 'cosmicFlight' ? (
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,180,120,${sceneType === 'cosmicFlight' ? 0.4 : 0.2}) 0%, rgba(255,180,120,0) 60%)`,
            opacity: sceneType === 'cosmicFlight' ? 0.8 : 0.4,
            transition: 'all 0.8s ease'
          }}
        ></div>
      ) : null}
    </CelestialBody>
  );
} 