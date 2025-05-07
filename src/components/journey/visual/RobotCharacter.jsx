import React from 'react';

export default function RobotCharacter({ eyeOn = true, flicker = false, focusBeam = false }) {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {/* Using microscope emoji as placeholder for robot */}
      <div className="text-9xl">🔬</div>
      
      {/* Eye glow */}
      <div
        className={`absolute top-[35%] left-[52%] w-[20px] h-[20px] rounded-full transition-opacity duration-300
          ${eyeOn ? 'bg-cyan-400' : 'bg-transparent'} 
          ${flicker ? 'animate-pulse' : (eyeOn ? 'animate-pulse-slow' : '')}`}
      />
      
      {/* Focus beam - only appears when activated */}
      {focusBeam && (
        <div className="absolute top-[35%] left-[52%] w-1 bg-sky-400/60 h-[70vh] transform rotate-2 origin-top animate-pulse-slow blur-sm" />
      )}
    </div>
  );
} 