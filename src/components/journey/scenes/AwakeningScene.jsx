import React from 'react';
import { clamp } from '../useScrollProgress';
import AwakeningBackdrop from '../visual/backdrops/AwakeningBackdrop';

export default function AwakeningScene({ progress = 0 }) {
  const intensity = clamp(progress, 0, 1);
  
  // Calculate robot opacity - fully visible at start, fades out by end of scene
  const robotOpacity = 1 - intensity;
  
  // Determine if the robot's eye should be glowing (starts around 40% progress)
  const eyeGlowing = intensity > 0.4;
  
  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#1e293b] via-[#334155] to-[#475569]">
      {/* Scene backdrop with lavender glow and beams */}
      <AwakeningBackdrop progress={intensity} />
      
      {/* Robot character - fades out as scene progresses */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-500"
        style={{ opacity: robotOpacity }}
      >
        <div className="relative">
          <span className="text-[5rem]">🔬</span>
          
          {/* Eye glow effect */}
          {eyeGlowing && (
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse"
              style={{ 
                backgroundColor: 'rgba(0, 255, 255, 0.8)',
                boxShadow: '0 0 10px 5px rgba(0, 255, 255, 0.5)'
              }}
            />
          )}
        </div>
      </div>
      
      {/* Scene title */}
      <div className="absolute inset-x-0 bottom-20 flex justify-center">
        <h1 className="text-4xl font-bold text-white">Scene: Awakening</h1>
      </div>
    </section>
  );
} 