import React, { useState, useEffect, useRef, useMemo } from 'react';
import DormantScene from './scenes/DormantScene';
import AwakeningScene from './scenes/AwakeningScene';
import CosmicRevealScene from './scenes/CosmicRevealScene';
import CosmicFlightScene from './scenes/CosmicFlightScene';
import SunApproachScene from './scenes/SunApproachScene';
import SunLandingScene from './scenes/SunLandingScene';
import ColorOverlay from './ColorOverlay';
import SceneBackdrop from './visual/SceneBackdrop';
import FPSMeter from './debug/FPSMeter';
import ConstellationGlow from './visual/ConstellationGlow';
import SceneBoundaryDebug from './debug/SceneBoundaryDebug';
import { useParticlePerformanceConfig } from './hooks/useParticlePerformanceConfig';
import { useSceneVisibility } from './hooks/useSceneVisibility';

// LEGIT-compliant metadata
const metadata = {
  id: 'cosmic_journey_controller',
  scs: 'SCS0',
  type: 'controller',
  doc: 'contract_cosmic_controller.md'
};

// Define scenes with their scroll ranges
const SCENES = [
  { key: 'dormant', range: [0.0, 0.05], Component: DormantScene, transitionDuration: 1.0 },
  { key: 'awakening', range: [0.05, 0.15], Component: AwakeningScene, transitionDuration: 1.0 },
  { key: 'cosmicReveal', range: [0.15, 0.3], Component: CosmicRevealScene, transitionDuration: 0.8 },
  { key: 'cosmicFlight', range: [0.3, 0.8], Component: CosmicFlightScene, transitionDuration: 0.6 },
  { key: 'sunApproach', range: [0.8, 0.9], Component: SunApproachScene, transitionDuration: 1.0 },
  { key: 'sunLanding', range: [0.9, 1.0], Component: SunLandingScene, transitionDuration: 1.0 },
];

// Development environment detection
const isDev = process.env.NODE_ENV === 'development' || 
              window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1';

export default function CosmicJourneyController() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [validSceneIndex, setValidSceneIndex] = useState(0);
  const [showFpsMeter, setShowFpsMeter] = useState(true); // Start visible in dev mode
  
  // Check if device is mobile
  const isMobile = useRef(window.innerWidth <= 768);
  
  // Current scene key
  const currentSceneKey = SCENES[validSceneIndex]?.key || '';
  
  // Use our custom hook for performance-optimized particle config
  const globalParticleConfig = useParticlePerformanceConfig(currentSceneKey);
  
  // Use our custom hook for scene visibility management
  const visibleScenes = useSceneVisibility(SCENES, scrollProgress, validSceneIndex);
  
  // Store last scroll position to prevent unnecessary updates
  const lastScrollPosRef = useRef(0);
  
  // Handle scroll events with efficiency optimizations
  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll calculations with improved mobile handling
      const minScrollDelta = isMobile.current ? 10 : 5;
      if (Math.abs(window.scrollY - lastScrollPosRef.current) < minScrollDelta) return;
      lastScrollPosRef.current = window.scrollY;
      
      // Calculate overall scroll progress (0-1)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      // Clamp progress between 0-1 to prevent jitter
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
  
  // Toggle FPS meter with F key (dev only)
  useEffect(() => {
    if (!isDev) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        setShowFpsMeter(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debug overlay for development
  const DebugOverlay = () => (
    <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
      <div className="mb-1">Scroll: {Math.round(scrollProgress * 100)}% ({Math.round(scrollProgress * 700)}vh)</div>
      <div className="mb-1">Scene: <span className="text-green-400">{SCENES[validSceneIndex].key}</span></div>
      <div className="mb-1">Progress: {Math.round(sceneProgress * 100)}%</div>
      <div className="mb-1">Particles: {globalParticleConfig.density} @ {globalParticleConfig.fps}fps</div>
      <div className="text-xs text-gray-400 mt-2">Scroll to explore scenes</div>
      <div className="text-xs text-gray-400">Press F to toggle FPS meter</div>
      <div className="text-xs text-gray-400">Press V to toggle VH values</div>
      <div className="text-xs text-gray-400">Press M to toggle VH markers</div>
    </div>
  );

  // Get current scene information
  const currentScene = SCENES[validSceneIndex].key;

  // Calculate positions for parallax effect
  // These functions create the "fixed in space" effect by calculating
  // transforms based on scroll position
  const getConstellation1Position = () => {
    // Start at center of viewport at 15% scroll (105vh - Ursa Minor appearance)
    // Move up and off screen by 30% scroll (210vh - Ursa Minor disappearance)
    const yPos = 50 - ((scrollProgress - 0.15) / 0.15) * 100;
    return {
      top: `${yPos}%`,
    };
  };

  const getConstellation2Position = () => {
    // Start at bottom of viewport at 40% scroll (280vh - Orion appearance) 
    // End at top of viewport at 60% scroll (420vh - Orion disappearance)
    const yPos = 100 - ((scrollProgress - 0.4) / 0.2) * 110;
    return {
      top: `${yPos}%`,
    };
  };

  return (
    <div className="w-full text-white">
      {/* Global color overlay */}
      <ColorOverlay />
      
      {/* Container for all scenes */}
      <div className="relative">
        {/* Fixed container for scene visibility control */}
        <div 
          className="fixed inset-0 z-0 overflow-hidden"
          style={{ 
            willChange: 'transform',
            contain: 'strict'  // Containment for rendering optimization
          }}
        >
          {SCENES.map(({ key, Component, transitionDuration }, index) => (
            <div
              key={key}
              style={{
                opacity: validSceneIndex === index ? 1 : 0,
                transition: `opacity ${transitionDuration}s ease-in-out`, // Variable transitions
                position: 'absolute',
                inset: 0,
                zIndex: validSceneIndex === index ? 1 : 0,
                display: visibleScenes.includes(key) ? 'block' : 'none', // Only render visible scenes
              }}
            >
              {visibleScenes.includes(key) && (
                <Component 
                  progress={sceneProgress}
                  particleConfig={globalParticleConfig}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Global scene backdrop with all visual effects */}
        <SceneBackdrop progress={scrollProgress} />
        
        {/* Fixed constellation layer that spans across scenes */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          {/* First constellation (appears during CosmicRevealScene) - LEFT SIDE */}
          <div 
            className="fixed left-0 w-1/2 h-full"
            data-constellation-id="ursa"
            style={{
              visibility: (scrollProgress >= 0.15 && scrollProgress <= 0.3) ? 'visible' : 'hidden',
              ...getConstellation1Position(),
            }}
          >
            <ConstellationGlow 
              fps={30}
              layer="A"
              type="ursaMinor"
              opacity={(scrollProgress >= 0.15 && scrollProgress <= 0.3) 
                ? Math.min(1, (scrollProgress - 0.15) * 5)
                : 0
              }
            />
          </div>
          
          {/* Second constellation (appears during CosmicFlightScene) - RIGHT SIDE */}
          <div 
            className="fixed right-0 w-1/2 h-full"
            data-constellation-id="orion"
            style={{
              visibility: (scrollProgress >= 0.4 && scrollProgress <= 0.6) ? 'visible' : 'hidden',
              ...getConstellation2Position(),
            }}
          >
            <ConstellationGlow 
              fps={30}
              layer="B"
              type="orion"
              opacity={(scrollProgress >= 0.4 && scrollProgress <= 0.6) 
                ? Math.min(1, (scrollProgress - 0.4) * 5)
                : 0
              }
            />
          </div>
        </div>
        
        {/* Debug components for development only */}
        {isDev && showFpsMeter && <FPSMeter />}
        {isDev && <DebugOverlay />}
        {isDev && <SceneBoundaryDebug scenes={SCENES} scrollProgress={scrollProgress} />}
        
        {/* Spacer elements to create scroll height - now 7 sections for 700vh */}
        <div className="pointer-events-none">
          {/* Create 7 sections instead of 6 to match 700vh height */}
          {Array.from({ length: 7 }).map((_, i) => (
            <section
              key={i}
              data-scroll-zone={i}
              className="h-screen w-full"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            />
          ))}
        </div>
        
        {/* VH Markers for debugging (toggleable) */}
        {isDev && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[100, 200, 300, 400, 500, 600].map((vh) => (
              <div 
                key={vh}
                data-vh-marker
                className="absolute left-0 w-full border-t border-dashed border-blue-500/30"
                style={{ 
                  top: `${vh}vh`,
                  display: 'block'
                }}
              >
                <span className="bg-black/70 text-blue-400 px-2 py-1 text-xs rounded">
                  {vh}vh
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 