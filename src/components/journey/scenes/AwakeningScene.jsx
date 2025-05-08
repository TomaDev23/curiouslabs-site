import React from 'react';
import { clamp } from '../useScrollProgress';
import AwakeningBackdrop from '../visual/backdrops/AwakeningBackdrop';
import StarfieldCanvas from '../visual/StarfieldCanvas';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'awakening_scene',
  scs: 'SCS2',
  type: 'scene',
  doc: 'contract_cosmic_scene.md'
};

export default function AwakeningScene({ progress = 0, particleConfig = {} }) {
  const intensity = clamp(progress, 0, 1);
  
  // Calculate robot opacity - fully visible at start, fades out by end of scene
  const robotOpacity = 1 - intensity;
  
  // Determine if the robot's eye should be glowing (starts around 40% progress)
  const eyeGlowing = intensity > 0.4;
  
  // Use particle config from controller or defaults
  const { 
    density = 95, 
    fps = 10, 
    hue = 260,
    glow = 0.8
  } = particleConfig;
  
  // White stars with enhanced glow
  const starColorHue = "hsl(0, 0%, 100%)";
  
  // Nebula fade opacity increases with scene progress
  const nebulaOpacity = Math.min(1, intensity * 1.5); // Full opacity at ~67% progress
  
  return (
    <section className="h-screen w-screen relative overflow-hidden awakening-layer">
      {/* Scene backdrop with color transition and effects */}
      <div className="absolute inset-0 z-0">
        <AwakeningBackdrop progress={intensity} />
      </div>
      
      {/* Nebula aurora effect - fades in as scene progresses */}
      <div 
        className="absolute inset-0 nebula-fade z-20" 
        style={{ 
          opacity: nebulaOpacity,
          transform: `scale(${1 + intensity * 0.1})` // Subtle growth as scene progresses
        }}
      ></div>
      
      {/* Star Layer - now using absolute position within the scene */}
      <div className="absolute inset-0 z-40">
        <StarfieldCanvas
          opacity={1}
          density={density}
          fps={fps}
          baseColor={starColorHue}
          breathing={true}
          glow={glow}
        />
      </div>
      
      {/* Robot character - fades out as scene progresses */}
      <div 
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 z-50"
        style={{ opacity: robotOpacity }}
      >
        <div className="relative">
          <span className="text-8xl">🤖</span>
          
          {/* Eye glow effect */}
          {eyeGlowing && (
            <div 
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-4 h-4 rounded-full cosmic-pulse"
              style={{ 
                backgroundColor: 'rgba(0, 255, 255, 0.8)',
                boxShadow: '0 0 10px 5px rgba(0, 255, 255, 0.5)'
              }}
            />
          )}
        </div>
      </div>
      
      {/* Scene title for development */}
      <div className="absolute bottom-10 right-10 text-white text-2xl font-bold opacity-70 z-50">
        Scene: Awakening
      </div>
    </section>
  );
} 