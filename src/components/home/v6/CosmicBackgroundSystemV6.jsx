/**
 * @component CosmicBackgroundSystemV6
 * @description Manages all background layers including starfield, grid, and nebula effects
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - CosmicBackgroundSystemV6 passes LEGIT protocol
 */

import React from 'react';
import { useScene } from './SceneControllerV6';
import StarfieldCanvasV6 from './StarfieldCanvasV6';
// import GridOverlayV6 from './GridOverlayV6'; // REMOVED: Grid overlay

const CosmicBackgroundSystemV6 = () => {
  const { deviceCapabilities, scenePhase } = useScene();
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Base gradient background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900 transition-opacity duration-1000
          ${scenePhase === 'void' ? 'opacity-100' : 'opacity-80'}`}
      />
      
      {/* Starfield layer */}
      <div className={`transition-opacity duration-1000 ${scenePhase === 'void' ? 'opacity-0' : 'opacity-100'}`}>
        <StarfieldCanvasV6 />
      </div>
      
      {/* Grid overlay - REMOVED */}
      {/* <div className={`transition-opacity duration-1000 ${scenePhase === 'void' ? 'opacity-0' : 'opacity-100'}`}>
        <GridOverlayV6 />
      </div> */}
      
      {/* Nebula effect - only show on high performance devices */}
      {deviceCapabilities.performanceTier === 'high' && (
        <div 
          className={`absolute inset-0 mix-blend-screen opacity-30 transition-opacity duration-1000
            ${scenePhase === 'void' ? 'opacity-0' : 'opacity-30'}`}
          style={{
            backgroundImage: 'url("/images/nebula-texture.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)'
          }}
        />
      )}
    </div>
  );
};

export default CosmicBackgroundSystemV6;