import React, { useState, useEffect, useRef } from 'react';
import DormantScene from './scenes/DormantScene';
import AwakeningScene from './scenes/AwakeningScene';
import CosmicRevealScene from './scenes/CosmicRevealScene';
import CosmicFlightScene from './scenes/CosmicFlightScene';
import SunApproachScene from './scenes/SunApproachScene';
import SunLandingScene from './scenes/SunLandingScene';
import ColorOverlay from './ColorOverlay';
import SceneBackdrop from './visual/SceneBackdrop';

// Define scenes with their scroll ranges
const SCENES = [
  { key: 'dormant', range: [0.0, 0.1], Component: DormantScene },
  { key: 'awakening', range: [0.1, 0.3], Component: AwakeningScene },
  { key: 'cosmicReveal', range: [0.3, 0.5], Component: CosmicRevealScene },
  { key: 'cosmicFlight', range: [0.5, 0.7], Component: CosmicFlightScene },
  { key: 'sunApproach', range: [0.7, 0.85], Component: SunApproachScene },
  { key: 'sunLanding', range: [0.85, 1.0], Component: SunLandingScene },
];

export default function CosmicJourneyController() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [validSceneIndex, setValidSceneIndex] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress (0-1)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);

      // Find current scene based on scroll position
      const currentScene = SCENES.findIndex(({ range }) =>
        progress >= range[0] && progress < range[1]
      );
      
      // Use last scene as fallback if no match
      const idx = currentScene !== -1 ? currentScene : SCENES.length - 1;
      setValidSceneIndex(idx);
      
      // Calculate progress within the current scene (0-1)
      const { range } = SCENES[idx];
      const sceneProgressValue = (progress - range[0]) / (range[1] - range[0]);
      setSceneProgress(Math.max(0, Math.min(1, sceneProgressValue)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debug overlay for development
  const DebugOverlay = () => (
    <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
      <div className="mb-1">Scroll: {Math.round(scrollProgress * 100)}%</div>
      <div className="mb-1">Scene: <span className="text-green-400">{SCENES[validSceneIndex].key}</span></div>
      <div className="mb-1">Progress: {Math.round(sceneProgress * 100)}%</div>
      <div className="text-xs text-gray-400 mt-2">Scroll to explore scenes</div>
    </div>
  );

  return (
    <div className="w-full text-white">
      {/* Global color overlay */}
      <ColorOverlay />
      
      {/* Container for all scenes */}
      <div className="relative">
        {/* Fixed container for scene visibility control */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {SCENES.map(({ key, Component }, index) => (
            <div
              key={key}
              style={{
                opacity: validSceneIndex === index ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                position: 'absolute',
                inset: 0,
                zIndex: validSceneIndex === index ? 1 : 0,
              }}
            >
              <Component progress={sceneProgress} />
            </div>
          ))}
        </div>
        
        {/* Global scene backdrop with all visual effects */}
        <SceneBackdrop progress={scrollProgress} />
        
        {/* Debug overlay */}
        <DebugOverlay />
        
        {/* Spacer elements to create scroll height */}
        <div className="pointer-events-none">
          {SCENES.map((scene, i) => (
            <section
              key={i}
              className="h-screen w-full"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 