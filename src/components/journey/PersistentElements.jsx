import React, { useMemo } from 'react';

// LEGIT-compliant metadata
const metadata = {
  id: 'persistent_elements',
  scs: 'SCS0',
  type: 'visual',
  doc: 'contract_persistent_elements.md'
};

/**
 * PersistentElements - Provides visual continuity across scene transitions
 * 
 * This component renders elements that persist across multiple scenes, ensuring
 * smooth visual transitions that span scene boundaries. Positioned at z-20, it sits
 * between scenes (z-0/z-1) and constellations (z-30).
 * 
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @returns {React.ReactElement} Persistent visual elements
 */
export default function PersistentElements({ scrollProgress = 0 }) {
  // NebulaTrail opacity based on scroll position
  // Visible during CosmicReveal and CosmicFlight (0.15-0.8)
  const nebulaOpacity = useMemo(() => {
    if (scrollProgress < 0.13) return 0;
    if (scrollProgress > 0.82) return 0;
    
    // Fade in during early CosmicReveal
    if (scrollProgress >= 0.13 && scrollProgress < 0.18) {
      return (scrollProgress - 0.13) / 0.05;
    }
    
    // Full opacity during mid sections
    if (scrollProgress >= 0.18 && scrollProgress <= 0.75) {
      return 1;
    }
    
    // Fade out during late CosmicFlight
    return 1 - (scrollProgress - 0.75) / 0.07;
  }, [scrollProgress]);
  
  // Motion lines opacity and intensity
  // Present during CosmicFlight (0.3-0.8)
  const motionLinesOpacity = useMemo(() => {
    if (scrollProgress < 0.28) return 0;
    if (scrollProgress > 0.82) return 0;
    
    // Fade in during early CosmicFlight
    if (scrollProgress >= 0.28 && scrollProgress < 0.35) {
      return (scrollProgress - 0.28) / 0.07;
    }
    
    // Full opacity during mid section
    if (scrollProgress >= 0.35 && scrollProgress <= 0.75) {
      return 1;
    }
    
    // Fade out during late CosmicFlight
    return 1 - (scrollProgress - 0.75) / 0.07;
  }, [scrollProgress]);
  
  // Calculate color overlay values based on scroll position
  const overlayColor = useMemo(() => {
    // Start with deep blue in early scenes
    if (scrollProgress < 0.3) {
      return 'rgba(10, 20, 40, 0.4)';
    }
    
    // Transition to cosmic purple during flight
    if (scrollProgress < 0.6) {
      const progress = (scrollProgress - 0.3) / 0.3;
      return `rgba(${Math.floor(10 + progress * 30)}, ${Math.floor(20 + progress * 10)}, ${Math.floor(40 + progress * 30)}, 0.4)`;
    }
    
    // Transition to warm orange/yellow approaching sun
    if (scrollProgress < 0.85) {
      const progress = (scrollProgress - 0.6) / 0.25;
      return `rgba(${Math.floor(40 + progress * 60)}, ${Math.floor(30 + progress * 30)}, ${Math.floor(70 - progress * 40)}, 0.4)`;
    }
    
    // Bright yellow/white at sun landing
    const progress = (scrollProgress - 0.85) / 0.15;
    return `rgba(${Math.floor(100 + progress * 155)}, ${Math.floor(60 + progress * 195)}, ${Math.floor(30 + progress * 225)}, 0.4)`;
  }, [scrollProgress]);
  
  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {/* Nebula trail effect - spans across CosmicReveal and CosmicFlight */}
      {nebulaOpacity > 0 && (
        <div 
          className="absolute inset-0 opacity-60 mix-blend-screen"
          style={{ 
            opacity: nebulaOpacity * 0.6,
            background: 'radial-gradient(ellipse at center, rgba(130, 80, 170, 0.2) 0%, rgba(40, 20, 80, 0.1) 40%, rgba(10, 5, 20, 0) 80%)',
          }}
        />
      )}
      
      {/* Motion lines - visible during CosmicFlight */}
      {motionLinesOpacity > 0 && (
        <div className="absolute inset-0">
          <div 
            className="w-full h-full opacity-30 mix-blend-screen"
            style={{ 
              opacity: motionLinesOpacity * 0.3,
              backgroundImage: 'linear-gradient(to right, transparent 49.5%, rgba(255,255,255,0.2) 50%, transparent 50.5%)',
              backgroundSize: `${Math.max(4, 20 - scrollProgress * 15)}px 100%`,
              animation: 'motionLinesAnim 0.5s linear infinite',
            }}
          />
        </div>
      )}
      
      {/* Global color overlay - changes gradually based on scene */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{ 
          backgroundColor: overlayColor,
          transition: 'background-color 0.5s ease-out'
        }}
      />
    </div>
  );
} 