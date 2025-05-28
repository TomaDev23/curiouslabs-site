/**
 * @component LayoutWrapper
 * @description Main layout container for V6 home page sections
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - Layout Wrapper passes LEGIT protocol
 */

import React from 'react';
import MissionProvider from './MissionTracker';
import SceneControllerV6 from './SceneControllerV6';
import CosmicBackgroundSystemV6 from './CosmicBackgroundSystemV6';

const LayoutWrapper = ({ children }) => {
  return (
    <MissionProvider>
      <SceneControllerV6>
        <div className="min-h-screen bg-curious-dark-900 overflow-x-hidden text-white">
          {/* Background System */}
          <CosmicBackgroundSystemV6 />
          
          {/* Planet Lighting Effect - Atmospheric illumination around planet area */}
          <div
            className="fixed z-[11] w-[100vw] h-[300vh] pointer-events-none"
            style={{
              top: '0',
              left: '0',
              background: 'radial-gradient(ellipse 65% 60% at 75% 45%, transparent 5%, rgba(255,0,0,0.3) 25%, rgba(255,0,0,0.6) 45%, rgba(255,0,0,0.8) 65%, rgba(255,0,0,0.95) 80%)'
            }}
          />
          
          {/* Main content container - elevated to z-[50] per plan */}
          <main className="relative z-[50]">
            {children}
          </main>
        </div>
      </SceneControllerV6>
    </MissionProvider>
  );
};

export default LayoutWrapper; 