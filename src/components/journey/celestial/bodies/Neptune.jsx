import React, { useEffect } from 'react';
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'neptune',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

// Add global keyframes
const injectStyles = () => {
  const styleId = 'neptune-keyframes';
  if (!document.getElementById(styleId)) {
    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.innerHTML = `
      @keyframes neptunePulse {
        0% { filter: brightness(1); }
        50% { filter: brightness(1.1); }
        100% { filter: brightness(1); }
      }
      
      @keyframes atmosphericWaves {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(styleTag);
  }
};

export default function Neptune({ size = 90, position = { x: 80, y: 30 }, ...props }) {
  // Inject keyframes on mount
  useEffect(() => {
    injectStyles();
    return () => {
      // Optional cleanup
      const styleTag = document.getElementById('neptune-keyframes');
      if (styleTag && document.head.contains(styleTag)) {
        document.head.removeChild(styleTag);
      }
    };
  }, []);

  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(100, 190, 255, 0.25)"
      glowSize={size * 0.3}
      {...props}
    >
      {/* Base planet with blue-green coloration */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(
              circle,
              rgba(100, 190, 255, 1) 0%,
              rgba(70, 160, 230, 1) 50%,
              rgba(40, 130, 200, 1) 100%
            )
          `,
          animation: 'neptunePulse 2s infinite ease-in-out',
        }}
      ></div>

      {/* Subtle atmospheric features */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            linear-gradient(
              0deg,
              transparent 29%,
              rgba(120, 200, 255, 0.1) 30%,
              transparent 31%,
              transparent 49%,
              rgba(120, 200, 255, 0.1) 50%,
              transparent 51%
            ),
            radial-gradient(
              circle at 70% 60%,
              rgba(255, 255, 255, 0.2) 0%,
              rgba(255, 255, 255, 0) 25%
            ),
            radial-gradient(
              circle at 30% 40%,
              rgba(150, 220, 255, 0.3) 0%,
              rgba(150, 220, 255, 0) 30%
            )
          `,
          animation: 'atmosphericWaves 10s infinite linear',
        }}
      ></div>
    </CelestialBody>
  );
} 