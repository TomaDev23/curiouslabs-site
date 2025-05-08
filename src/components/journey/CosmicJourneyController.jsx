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

// LEGIT-compliant metadata
const metadata = {
  id: 'cosmic_journey_controller',
  scs: 'SCS0',
  type: 'controller',
  doc: 'contract_cosmic_controller.md'
};

// Define scenes with their scroll ranges
const SCENES = [
  { key: 'dormant', range: [0.0, 0.1], Component: DormantScene },
  { key: 'awakening', range: [0.1, 0.3], Component: AwakeningScene },
  { key: 'cosmicReveal', range: [0.3, 0.5], Component: CosmicRevealScene },
  { key: 'cosmicFlight', range: [0.5, 0.7], Component: CosmicFlightScene },
  { key: 'sunApproach', range: [0.7, 0.85], Component: SunApproachScene },
  { key: 'sunLanding', range: [0.85, 1.0], Component: SunLandingScene },
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
  
  // Global particle configuration for visual effects
  const [globalParticleConfig, setGlobalParticleConfig] = useState({
    density: 115,   // Number of particles
    speed: 1,       // Animation speed multiplier
    fps: 15,        // Target FPS for throttling
    hue: 0,         // Base color hue (using white stars now)
    glow: 0.8       // Glow intensity (0-1)
  });
  
  // Store last scroll position to prevent unnecessary updates
  const lastScrollPosRef = useRef(0);
  
  // Handle scroll events with efficiency optimizations
  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll calculations
      if (Math.abs(window.scrollY - lastScrollPosRef.current) < 5) return;
      lastScrollPosRef.current = window.scrollY;
      
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
      
      // Update particle configuration based on current scene
      const sceneKey = SCENES[idx].key;
      switch(sceneKey) {
        case 'dormant':
          setGlobalParticleConfig({
            density: 115,  // Increased for better visibility
            speed: 1,
            fps: 15,      // Higher FPS for smoother animation
            hue: 0,       // White stars (hue doesn't matter)
            glow: 0.8     // Enhanced glow
          });
          break;
        case 'awakening':
          setGlobalParticleConfig({
            density: 95,   // Increased for better visibility
            speed: 1,
            fps: 10,
            hue: 0,        // White stars
            glow: 0.8      // Enhanced glow
          });
          break;
        case 'cosmicReveal':
          setGlobalParticleConfig({
            density: 20,
            speed: 1,
            fps: 10,
            hue: 0,        // White stars
            glow: 0.8      // Enhanced glow
          });
          break;
        case 'cosmicFlight':
          setGlobalParticleConfig({
            density: 40,
            speed: 3,
            fps: 30,       // High FPS for fast movement
            hue: 0,        // White stars
            glow: 0.8      // Enhanced glow
          });
          break;
        case 'sunApproach':
          setGlobalParticleConfig({
            density: 30,
            speed: 1,
            fps: 5,
            hue: 0,        // White stars
            glow: 0.9      // Enhanced glow
          });
          break;
        case 'sunLanding':
          setGlobalParticleConfig({
            density: 30,
            speed: 2,
            fps: 30,
            hue: 0,        // White stars
            glow: 1.0      // Maximum glow
          });
          break;
        default:
          // Default configuration
          setGlobalParticleConfig({
            density: 115,
            speed: 1,
            fps: 15,
            hue: 0,
            glow: 0.8
          });
      }
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
      <div className="mb-1">Scroll: {Math.round(scrollProgress * 100)}%</div>
      <div className="mb-1">Scene: <span className="text-green-400">{SCENES[validSceneIndex].key}</span></div>
      <div className="mb-1">Progress: {Math.round(sceneProgress * 100)}%</div>
      <div className="mb-1">Particles: {globalParticleConfig.density} @ {globalParticleConfig.fps}fps</div>
      <div className="text-xs text-gray-400 mt-2">Scroll to explore scenes</div>
      <div className="text-xs text-gray-400">Press F to toggle FPS meter</div>
    </div>
  );

  // Get current scene information
  const currentScene = SCENES[validSceneIndex].key;

  // Calculate positions for parallax effect
  // These functions create the "fixed in space" effect by calculating
  // transforms based on scroll position
  const getConstellation1Position = () => {
    // Start at center of viewport at 25% scroll (end of awakening scene)
    // Move up and off screen by 45% scroll (middle of cosmic reveal)
    // This creates a parallax effect that makes it seem "fixed" in space
    const yPos = 50 - ((scrollProgress - 0.25) / 0.2) * 100;
    return {
      top: `${yPos}%`,
    };
  };

  const getConstellation2Position = () => {
    // Start at bottom of viewport at 55% scroll (start of cosmic flight) 
    // End at top of viewport at 70% scroll (before sun approach)
    const yPos = 100 - ((scrollProgress - 0.55) / 0.15) * 110;
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
        <div className="fixed inset-0 z-0 overflow-hidden">
          {SCENES.map(({ key, Component }, index) => (
            <div
              key={key}
              style={{
                opacity: validSceneIndex === index ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out', // Smoother transitions
                position: 'absolute',
                inset: 0,
                zIndex: validSceneIndex === index ? 1 : 0,
              }}
            >
              <Component 
                progress={sceneProgress}
                particleConfig={globalParticleConfig}
              />
            </div>
          ))}
        </div>
        
        {/* Global scene backdrop with all visual effects */}
        <SceneBackdrop progress={scrollProgress} />
        
        {/* Fixed constellation layer that spans across scenes */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          {/* First constellation (appears during Awakening/Cosmic Reveal) - LEFT SIDE */}
          <div 
            className="fixed left-0 w-1/2 h-full"
            style={{
              visibility: (scrollProgress >= 0.25 && scrollProgress <= 0.45) ? 'visible' : 'hidden',
              ...getConstellation1Position(),
            }}
          >
            <ConstellationGlow 
              fps={30}
              layer="A"
              position="center"
            />
          </div>
          
          {/* Second constellation (appears during Cosmic Flight) - RIGHT SIDE */}
          <div 
            className="fixed right-0 w-1/2 h-full"
            style={{
              visibility: (scrollProgress >= 0.55 && scrollProgress <= 0.70) ? 'visible' : 'hidden',
              ...getConstellation2Position(),
            }}
          >
            <ConstellationGlow 
              fps={30}
              layer="B"
              position="center"
              rotation={15} // Apply a slight rotation
            />
          </div>
        </div>
        
        {/* Debug overlay */}
        {isDev && <DebugOverlay />}
        
        {/* FPS Meter (dev mode only, can toggle with F key) */}
        {isDev && showFpsMeter && <FPSMeter />}
        
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