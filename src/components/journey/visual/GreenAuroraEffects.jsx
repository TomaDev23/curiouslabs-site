import React from 'react';

// Green aurora effects for the cosmic flight scene
export default function GreenAuroraEffects() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 15 }}>
      {/* Top aurora glow */}
      <div 
        className="absolute top-0 left-0 w-full h-1/3"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(120, 255, 200, 0.4), rgba(100, 220, 180, 0.25) 40%, rgba(80, 180, 150, 0.15) 70%, transparent)',
          filter: 'blur(30px)',
          opacity: 0.8,
          transform: 'translateY(-20%) scale(1.2)',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Bottom aurora glow */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/3"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(120, 255, 200, 0.4), rgba(100, 220, 180, 0.25) 40%, rgba(80, 180, 150, 0.15) 70%, transparent)',
          filter: 'blur(30px)',
          opacity: 0.8,
          transform: 'translateY(20%) scale(1.2)',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Left aurora streak */}
      <div 
        className="absolute left-0 top-0 h-full w-1/3"
        style={{
          background: 'linear-gradient(to bottom right, rgba(120, 255, 200, 0.3), rgba(100, 220, 180, 0.2) 40%, rgba(80, 180, 150, 0.1) 70%, transparent)',
          filter: 'blur(35px)',
          opacity: 0.7,
          transform: 'rotate(-15deg) translateX(-20%)',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Right aurora streak */}
      <div 
        className="absolute right-0 top-0 h-full w-1/3"
        style={{
          background: 'linear-gradient(to bottom left, rgba(120, 255, 200, 0.3), rgba(100, 220, 180, 0.2) 40%, rgba(80, 180, 150, 0.1) 70%, transparent)',
          filter: 'blur(35px)',
          opacity: 0.7,
          transform: 'rotate(15deg) translateX(20%)',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Central energy core glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '30vw',
          height: '30vw',
          background: 'radial-gradient(circle, rgba(150, 255, 220, 0.2) 0%, rgba(120, 220, 200, 0.15) 40%, rgba(100, 180, 160, 0.1) 70%, transparent 100%)',
          filter: 'blur(40px)',
          opacity: 0.6,
          mixBlendMode: 'screen',
          animation: 'pulseCore 15s infinite alternate ease-in-out',
        }}
      />
      
      {/* Add keyframes for core pulsing */}
      <style jsx>{`
        @keyframes pulseCore {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
} 