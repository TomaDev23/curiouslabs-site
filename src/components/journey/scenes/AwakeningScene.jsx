import React from 'react';
import { clamp } from '../useScrollProgress';
import AwakeningBackdrop from '../visual/backdrops/AwakeningBackdrop';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'awakening_scene',
  scs: 'SCS2',
  type: 'scene',
  doc: 'contract_cosmic_scene.md'
};

export default function AwakeningScene({ progress = 0 }) {
  const intensity = clamp(progress, 0, 1);
  
  // Calculate robot opacity - fully visible at start, fades out by end of scene
  const robotOpacity = 1 - intensity;
  
  // Determine if the robot's eye should be glowing (starts around 40% progress)
  const eyeGlowing = intensity > 0.4;
  
  return (
    <section className="h-screen relative overflow-hidden">
      {/* Scene backdrop with color transition and effects */}
      <AwakeningBackdrop progress={intensity} />
      
      {/* Robot character - fades out as scene progresses */}
      <div 
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
        style={{ opacity: robotOpacity }}
      >
        <div className="relative">
          <span className="text-8xl">🤖</span>
          
          {/* Eye glow effect */}
          {eyeGlowing && (
            <div 
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-4 h-4 rounded-full animate-pulse"
              style={{ 
                backgroundColor: 'rgba(0, 255, 255, 0.8)',
                boxShadow: '0 0 10px 5px rgba(0, 255, 255, 0.5)'
              }}
            />
          )}
        </div>
      </div>
      
      {/* Scene title for development */}
      <div className="absolute bottom-10 right-10 text-white text-2xl font-bold opacity-70">
        Scene: Awakening
      </div>
    </section>
  );
} 