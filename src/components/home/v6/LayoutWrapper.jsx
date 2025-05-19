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
          
          {/* Main content container */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </SceneControllerV6>
    </MissionProvider>
  );
};

export default LayoutWrapper; 