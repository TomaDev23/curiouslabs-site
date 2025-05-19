/**
 * @metadata
 * @component CosmicBackgroundSystemV6
 * @description Manages background layers including gradients, starfield, nebula imagery and grid overlay
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { useState, useEffect } from 'react';
import { useScene } from './SceneControllerV6';
import StarfieldCanvasV6 from './StarfieldCanvasV6';
import GridOverlayV6 from './GridOverlayV6';

// Define design system color and gradient constants
const colors = {
  void: '#080808',
  deepSpace: '#0F0F12',
  cosmic: '#0D1527',
  cosmicDeep: '#0A0F1D',
  lime: {
    primary: '#84cc16',
    light: '#a3e635',
    glow: '#bef264',
  },
  nebula: {
    blue: '#2563eb',
    purple: '#7e22ce',
    teal: '#0d9488',
  }
};

const gradients = {
  heroVoid: 'radial-gradient(circle at 50% 50%, rgb(15, 15, 18) 0%, rgb(8, 8, 8) 100%)',
  cosmicBlue: 'linear-gradient(135deg, rgb(13, 21, 39) 0%, rgb(30, 41, 59) 100%)',
  nebulaPurple: 'linear-gradient(135deg, rgb(76, 29, 149) 0%, rgb(30, 27, 75) 100%)',
  nebulaBlend: 'linear-gradient(135deg, rgb(30, 27, 75) 0%, rgb(13, 21, 39) 50%, rgb(4, 47, 46) 100%)',
};

const CosmicBackgroundSystemV6 = () => {
  const { scenePhase, deviceCapabilities } = useScene();
  
  // State for background elements
  const [backgroundGradient, setBackgroundGradient] = useState(gradients.heroVoid);
  const [gridOpacity, setGridOpacity] = useState(0.02);
  const [nebulaState, setNebulaState] = useState({
    show: false,
    variant: 'blue',
    opacity: 0
  });
  
  // Update background elements based on scene phase
  useEffect(() => {
    const { performanceTier, prefersReducedMotion } = deviceCapabilities;
    
    // Set appropriate visual properties based on current phase
    switch(scenePhase) {
      case 'void':
        setBackgroundGradient(gradients.heroVoid);
        setGridOpacity(prefersReducedMotion ? 0.05 : 0.02);
        setNebulaState({ show: false, variant: 'blue', opacity: 0 });
        break;
        
      case 'emergence':
        setBackgroundGradient(gradients.cosmicBlue);
        setGridOpacity(prefersReducedMotion ? 0.08 : 0.05);
        setNebulaState({ 
          show: performanceTier !== 'minimal', 
          variant: 'blue', 
          opacity: prefersReducedMotion ? 0.3 : 0.2 
        });
        break;
        
      case 'activation':
        setBackgroundGradient(gradients.nebulaBlend);
        setGridOpacity(prefersReducedMotion ? 0.1 : 0.08);
        setNebulaState({ 
          show: performanceTier !== 'minimal', 
          variant: 'purple', 
          opacity: prefersReducedMotion ? 0.5 : 0.4 
        });
        break;
        
      default:
        break;
    }
  }, [scenePhase, deviceCapabilities]);
  
  // Determine starfield density based on performance tier
  const getStarfieldDensity = () => {
    const { performanceTier } = deviceCapabilities;
    
    switch(performanceTier) {
      case 'high':
        return 1.0;
      case 'medium':
        return 0.7;
      case 'low':
        return 0.4;
      case 'minimal':
        return 0.2;
      default:
        return 0.5;
    }
  };
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: backgroundGradient }}
        aria-hidden="true"
      />
      
      {/* Starfield layer */}
      <StarfieldCanvasV6 density={getStarfieldDensity()} />
      
      {/* Nebula imagery layer - conditionally rendered */}
      {nebulaState.show && (
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            nebulaState.variant === 'purple' ? 'bg-nebula-purple' : 'bg-nebula-blue'
          }`}
          style={{ 
            opacity: nebulaState.opacity,
            backgroundImage: `url(/images/nebula-${nebulaState.variant}.jpg)`,
            mixBlendMode: 'screen'
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Grid overlay */}
      <GridOverlayV6 opacity={gridOpacity} />
      
      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{ 
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default CosmicBackgroundSystemV6;