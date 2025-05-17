import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import DormantScene from './scenes/DormantScene';
import AwakeningScene from './scenes/AwakeningScene';
import CosmicRevealScene from './scenes/CosmicRevealScene';
import CosmicFlightScene from './scenes/CosmicFlightScene';
import SunApproachScene from './scenes/SunApproachScene';
import SunLandingScene from './scenes/SunLandingScene';
import ColorOverlay from './ColorOverlay';
import SceneBackdrop from './visual/SceneBackdrop';
import ConstellationGlow from './visual/ConstellationGlow';
import { useParticlePerformanceConfig } from './hooks/useParticlePerformanceConfig';
import { useSceneVisibility } from './hooks/useSceneVisibility';
import { getDissolveOpacity, getDissolveZIndex, getFadeBlendClass } from '../../utils/dissolveEngine';
import PersistentElements from './PersistentElements';
import GlobalParticleSystem from './visual/GlobalParticleSystem';
import withDraggable from '../../components/ui/DraggableHOC';
import { useHUDContext } from '../../components/ui/HUDHub';
import { ScrollPipeline } from '../../utils/scrollPipeline';
import { performanceMonitor, PERF_THRESHOLDS } from '../../utils/performanceMonitor';

// LEGIT-compliant metadata
const metadata = {
  id: 'cosmic_journey_controller',
  scs: 'SCS0',
  type: 'controller',
  doc: 'contract_cosmic_controller.md'
};

// Define scenes with their scroll ranges - aligned with saved section positions
const SCENES = [
  { key: 'dormant', range: [0.0, 0.08], Component: DormantScene, transitionDuration: 3.5, fadeZone: 0.05 },
  { key: 'awakening', range: [0.05, 0.15], Component: AwakeningScene, transitionDuration: 3.5, fadeZone: 0.05 },
  { key: 'cosmicReveal', range: [0.15, 0.30], Component: CosmicRevealScene, transitionDuration: 3.5, fadeZone: 0.05 },
  { key: 'cosmicFlight', range: [0.30, 0.75], Component: CosmicFlightScene, transitionDuration: 2.0, fadeZone: 0.04 },
  { key: 'sunApproach', range: [0.75, 0.89], Component: SunApproachScene, transitionDuration: 2.0, fadeZone: 0.04 },
  { key: 'sunLanding', range: [0.89, 1.0], Component: SunLandingScene, transitionDuration: 2.0, fadeZone: 0.04 }
];

// Development environment detection
const isDev = process.env.NODE_ENV === 'development' || 
              window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1';

// Debug overlay content component - will be wrapped with draggable HOC
const SceneDebugOverlayContent = ({ scrollProgress, currentSceneKey, sceneProgress }) => {
  // Check if hud is visible based on HUDContext
  const { hudVisibility } = useHUDContext?.() || { hudVisibility: {} };
  const isVisible = hudVisibility['hud_6'] !== false; // Using HUD 6 for Scene Progress
  
  // Log visibility state for debugging
  useEffect(() => {
    console.log('[HUD6] Visibility state:', isVisible, 'from context:', hudVisibility);
  }, [isVisible, hudVisibility]);
  
  // Early return if not visible based on HUD hub toggle
  if (!isVisible) return null;
  
  return (
    <div className="bg-gray-900/90 p-4 rounded-lg text-xs text-white font-mono border-2 border-purple-500 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <strong className="text-purple-300">HUD 6: Scene Progress</strong>
      </div>
      <div className="mb-1 text-lg">Scroll Progress: {(scrollProgress * 100).toFixed(2)}%</div>
      <div className="mb-1">Position: {window.scrollY}px / {document.documentElement.scrollHeight}px</div>
      <div className="mb-1">Current Scene: <span className="text-purple-400">{currentSceneKey}</span></div>
      <div className="mb-2">Scene Progress: {(isNaN(sceneProgress) ? 0 : sceneProgress * 100).toFixed(2)}%</div>
      
      <div className="text-xs mt-2 pt-2 border-t border-gray-700">
        {SCENES.map(scene => (
          <div key={scene.key} className="flex items-center mb-1">
            <div className={`w-2 h-2 rounded-full mr-2 ${currentSceneKey === scene.key ? 'bg-purple-500' : 'bg-gray-500'}`}></div>
            <div className={`${currentSceneKey === scene.key ? 'text-purple-400' : 'text-gray-400'}`}>
              {scene.key}: {scene.range[0] * 100}% - {scene.range[1] * 100}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Create draggable version with specific storage key for position
const DraggableSceneDebugOverlay = withDraggable(SceneDebugOverlayContent, {
  defaultPosition: { x: 380, y: 400 },  // Positioned far to the right and lower to avoid navbar and other components
  zIndex: 10000,  // Ensure it's in the global layer
  storageId: 'draggable_SceneDebugOverlayContent_position'
});

// New combined component that replaces the original DebugOverlay
export const SceneDebugOverlay = (props) => {
  console.log('[HUD6] SceneDebugOverlay rendering with draggable wrapper');
  return <DraggableSceneDebugOverlay {...props} />;
};

// Calculate which scenes should be visible based on scroll position and fade zones
const getVisibleScenes = (scrollProgress, scenes) => {
  return scenes.filter(scene => {
    const extendedFadeZone = scene.fadeZone * 1.5;
    const start = scene.range[0] - extendedFadeZone;
    const end = scene.range[1] + extendedFadeZone;
    
    // Special case for Dormant scene - always visible until fully faded
    if (scene.key === 'dormant') {
      return scrollProgress <= 0.15; // Keep mounted until awakening scene is fully established
    }
    
    // Special case for awakening - keep mounted longer
    if (scene.key === 'awakening') {
      return scrollProgress >= (start - 0.05) && scrollProgress <= (end + 0.05);
    }
    
    // Special case for scene transitions
    if (scene.key === 'cosmicReveal' && scrollProgress >= scene.range[1] - 0.02) {
      return true; // Keep visible slightly longer
    }
    if (scene.key === 'cosmicFlight' && scrollProgress <= scene.range[0] + 0.02) {
      return true; // Start mounting slightly earlier
    }
    
    // More generous mounting/unmounting
    return scrollProgress >= (start - 0.03) && scrollProgress <= (end + 0.03);
  });
};

// Performance monitoring constants
const FRAME_BUDGET = 16.67; // 60fps target
const WARN_THRESHOLD = FRAME_BUDGET * 1.5; // 150% of budget

export default function CosmicJourneyController({ children }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [validSceneIndex, setValidSceneIndex] = useState(0);
  const [performanceStats, setPerformanceStats] = useState(null);
  
  // Check if device is mobile
  const isMobile = useRef(window.innerWidth <= 768);
  
  // Current scene key
  const currentSceneKey = SCENES[validSceneIndex]?.key || '';
  
  // Use our custom hook for performance-optimized particle config
  const globalParticleConfig = useParticlePerformanceConfig(currentSceneKey);
  
  // Calculate scene opacities using enhanced dissolveEngine
  const sceneOpacities = useMemo(() => {
    return SCENES.map(scene => {
      // Special handling for dormant scene - extend into awakening scene
      if (scene.key === 'dormant') {
        if (scrollProgress <= 0.05) return 1; // Full opacity until awakening starts
        if (scrollProgress <= 0.15) { // Extended fade through awakening
          // Smooth fade out during overlap with awakening
          const fadeProgress = (scrollProgress - 0.05) / 0.10; // Extended fade duration
          return Math.cos(fadeProgress * Math.PI / 2); // Cosine easing for ultra-smooth fade
        }
        return 0;
      }

      // Calculate base opacity with scene-specific options
      const baseOpacity = getDissolveOpacity(
        scrollProgress,
        scene.range[0],
        scene.range[1],
        scene.fadeZone,
        {
          smoothFade: true,
          fadeInBuffer: scene.key === 'awakening' ? 0.05 : 0.02, // Longer fade-in for awakening
          fadeOutBuffer: scene.key === 'sunLanding' ? 0.03 : 0.02,
          easeIntensity: scene.key === 'cosmicFlight' ? 1.8 : 1.5
        }
      );

      // Special handling for awakening scene to complement dormant fade
      if (scene.key === 'awakening') {
        if (scrollProgress <= 0.05) return 0; // Start completely transparent
        if (scrollProgress <= 0.15) { // Extended fade-in to match dormant fade-out
          const fadeInProgress = (scrollProgress - 0.05) / 0.10;
          return Math.sin(fadeInProgress * Math.PI / 2); // Sine easing for complementary fade
        }
        // After 0.15, use the base opacity calculation
        return baseOpacity;
      }

      // Rest of the special transition handling
      if (scene.key === 'cosmicReveal' && scrollProgress >= scene.range[1] - 0.02) {
        const transitionProgress = (scrollProgress - (scene.range[1] - 0.02)) / 0.02;
        return baseOpacity * (1 - transitionProgress);
      }
      
      if (scene.key === 'cosmicFlight' && scrollProgress <= scene.range[0] + 0.02) {
        const transitionProgress = (scrollProgress - scene.range[0]) / 0.02;
        return baseOpacity * transitionProgress;
      }

      return baseOpacity;
    });
  }, [scrollProgress]);
  
  // Store last scroll position to prevent unnecessary updates
  const lastScrollPosRef = useRef(0);
  
  // Smooth scroll state with interpolation
  const targetScrollProgressRef = useRef(0);
  const smoothScrollProgressRef = useRef(0);
  const [smoothScrollProgress, setSmoothScrollProgress] = useState(0);
  const animationRef = useRef(null);
  
  // Animation system refs
  const effectRefs = useRef({
    particles: null,
    aurora: null,
    starfield: null
  });
  
  const lastFrameTime = useRef(0);
  const animationFrameId = useRef(null);
  const isAnimating = useRef(true);

  // Frame performance monitoring
  const monitorFramePerformance = useCallback((delta) => {
    if (delta > WARN_THRESHOLD) {
      console.warn(`Frame time exceeded budget: ${delta.toFixed(2)}ms`);
      // Log active effects for debugging
      Object.entries(effectRefs.current).forEach(([name, effect]) => {
        if (effect?.isActive) {
          console.log(`Active effect: ${name}`);
        }
      });
    }
  }, []);

  // Master animation loop
  const masterAnimationLoop = useCallback((timestamp) => {
    if (!isAnimating.current) return;

    // Calculate delta time
    const delta = lastFrameTime.current ? timestamp - lastFrameTime.current : 0;
    lastFrameTime.current = timestamp;

    // Monitor performance in development
    if (process.env.NODE_ENV === 'development') {
      monitorFramePerformance(delta);
    }

    // Update all effect systems
    const { particles, aurora, starfield } = effectRefs.current;
    
    if (particles?.update) {
      particles.update(delta, smoothScrollProgress);
    }
    if (aurora?.update) {
      aurora.update(delta, smoothScrollProgress);
    }
    if (starfield?.update) {
      starfield.update(delta, smoothScrollProgress);
    }

    // Schedule next frame
    animationFrameId.current = requestAnimationFrame(masterAnimationLoop);
  }, [smoothScrollProgress, monitorFramePerformance]);

  // Initialize and cleanup animation loop
  useEffect(() => {
    isAnimating.current = true;
    lastFrameTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(masterAnimationLoop);

    return () => {
      isAnimating.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [masterAnimationLoop]);

  // Effect registration function
  const registerEffect = useCallback((type, effectInstance) => {
    effectRefs.current[type] = effectInstance;
  }, []);

  // Handle scroll events with advanced smoothing and interpolation
  useEffect(() => {
    let animationFrameId = null;
    let pendingUpdate = false;
    
    // Animation loop for smooth interpolation
    const animateScroll = () => {
      // Interpolate the scroll value for ultra-smooth transitions
      const interpolationFactor = 0.09; // Matches contract_scroll_settings.md - creates "boat in water" effect
      
      // Calculate the smooth progress with interpolation
      const diff = targetScrollProgressRef.current - smoothScrollProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        smoothScrollProgressRef.current += diff * interpolationFactor;
        setSmoothScrollProgress(smoothScrollProgressRef.current);
        
        // Process scenes, constellations, and other scroll-dependent elements
        processScrollUpdate(smoothScrollProgressRef.current);
        
        // Continue the animation loop
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        // We're close enough to the target - snap to it and stop animating
        smoothScrollProgressRef.current = targetScrollProgressRef.current;
        setSmoothScrollProgress(smoothScrollProgressRef.current);
        processScrollUpdate(smoothScrollProgressRef.current);
        animationRef.current = null;
      }
    };
    
    // Process scroll updates separately from the animation loop
    const processScrollUpdate = (progress) => {
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
      
      // Update the actual scrollProgress state for components that need it
      setScrollProgress(progress);
    };
    
    // Efficiently handle scroll events
    const handleScroll = () => {
      if (!pendingUpdate) {
        pendingUpdate = true;
        
        // Use requestAnimationFrame to align with rendering
        animationFrameId = requestAnimationFrame(() => {
          // Calculate overall scroll progress (0-1)
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight <= 0) {
            pendingUpdate = false;
            return;
          }
          
          // Calculate raw scroll progress
          const rawProgress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
          
          // Update target scroll position
          targetScrollProgressRef.current = rawProgress;
          
          // Start animation loop if not already running
          if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animateScroll);
          }
          
          pendingUpdate = false;
        });
      }
    };
    
    // Initial setup - set both target and current to the same value
    const setInitialScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const initialProgress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      
      // Set both values to the same initial position to avoid initial animation
      targetScrollProgressRef.current = initialProgress;
      smoothScrollProgressRef.current = initialProgress;
      setSmoothScrollProgress(initialProgress);
      
      // Process the initial scroll position
      processScrollUpdate(initialProgress);
    };
    
    // Setup event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize values
    setInitialScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Get current scene information
  const currentScene = SCENES[validSceneIndex].key;

  // Calculate positions for parallax effect with ultra-smooth transitions
  const getConstellation1Position = () => {
    // Start at center of viewport at 15% scroll (105vh - Ursa Minor appearance)
    // Move up and off screen by 64% scroll (448vh - Extended disappearance)
    const progress = (smoothScrollProgress - 0.15) / 0.49; // Extended range to match 0.64 visibility 
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const yPos = 50 - clampedProgress * 150; // Use same movement approach as constellation 2
    
    return {
      top: `${yPos}%`,
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform, top',
      transition: 'none' // Use JS animation instead of CSS transition
    };
  };

  const getConstellation2Position = () => {
    // Start at bottom of viewport at 40% scroll (280vh - Orion appearance) 
    // End at top of viewport at 85% scroll (595vh - Orion complete disappearance)
    // Extended to ensure absolutely complete exit from viewport
    const progress = (smoothScrollProgress - 0.4) / 0.45; // Changed from 0.37 to 0.45 (0.85-0.4)
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Adjusted to ensure it fully leaves the viewport before being hidden
    // Start at 100% (bottom of screen) and move to -100% (completely off-screen at top)
    const yPos = 100 - clampedProgress * 200; // Changed from 150 to 200 for absolute complete exit
    
    return {
      top: `${yPos}%`,
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform, top',
      transition: 'none' // Use JS animation instead of CSS transition
    };
  };

  // Add fade blend styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = getFadeBlendClass();
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  // Get visible scenes
  const visibleScenes = useMemo(() => 
    getVisibleScenes(scrollProgress, SCENES),
    [scrollProgress]
  );

  // Performance monitoring
  const checkPerformance = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      const report = performanceMonitor.getReport(metadata.id);
      if (report) {
        setPerformanceStats(report);
        
        // Log performance issues to console
        if (!report.isHealthy) {
          console.warn('CosmicJourney Performance Report:', {
            ...report,
            threshold: PERF_THRESHOLDS.WARN,
            budget: PERF_THRESHOLDS.FRAME_BUDGET
          });
        }
      }
    }
  }, []);

  // Initialize ScrollPipeline and performance monitoring
  useEffect(() => {
    ScrollPipeline.init();
    const cleanup = ScrollPipeline.subscribe(setScrollProgress);
    
    // Setup performance check interval
    const perfInterval = setInterval(checkPerformance, 5000);
    
    return () => {
      cleanup();
      ScrollPipeline.cleanup();
      clearInterval(perfInterval);
      performanceMonitor.reset(metadata.id);
    };
  }, [checkPerformance]);

  return (
    <div className="w-full text-white">
      <GlobalParticleSystem 
        scrollProgress={scrollProgress} 
        activeScene={currentSceneKey}
        sceneProgress={sceneProgress}
      />
      
      <ColorOverlay />
      
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden">
          {SCENES.map(({ key, Component }, index) => {
            const isVisible = visibleScenes.includes(SCENES[index]);
            const opacity = sceneOpacities[index];
            const baseZIndex = index * 10;
            
            if (!isVisible) return null;
            
            return (
              <div
                key={key}
                style={{
                  opacity: Math.max(0, Math.min(1, opacity || 0)),
                  position: 'absolute',
                  inset: 0,
                  willChange: 'opacity, transform',
                  transform: 'translateZ(0)',
                  contain: 'paint layout',
                  zIndex: getDissolveZIndex(opacity, baseZIndex),
                  visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                  pointerEvents: opacity > 0.1 ? 'auto' : 'none'
                }}
                className="scene-layer"
              >
                <Component 
                  progress={sceneProgress}
                  scrollProgress={smoothScrollProgress}
                  particleConfig={globalParticleConfig}
                  onRegisterEffect={registerEffect}
                />
              </div>
            );
          })}
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
              visibility: (smoothScrollProgress >= 0.15 && smoothScrollProgress <= 0.64) ? 'visible' : 'hidden',
              ...getConstellation1Position(),
            }}
          >
            <ConstellationGlow 
              fps={60}
              layer="A"
              type="ursaMinor"
              opacity={(smoothScrollProgress >= 0.15 && smoothScrollProgress <= 0.64) 
                ? Math.min(1, (smoothScrollProgress - 0.15) * 5)
                : 0
              }
            />
          </div>
          
          {/* Second constellation (appears during CosmicFlightScene) - RIGHT SIDE */}
          <div 
            className="fixed right-0 w-1/2 h-full"
            data-constellation-id="orion"
            style={{
              visibility: (smoothScrollProgress >= 0.4 && smoothScrollProgress <= 0.85) ? 'visible' : 'hidden', // Extended to 0.85 (595vh)
              ...getConstellation2Position(),
            }}
          >
            <ConstellationGlow 
              fps={60}
              layer="B"
              type="orion"
              opacity={(smoothScrollProgress >= 0.4 && smoothScrollProgress <= 0.85) // Extended to 0.85 (595vh)
                ? Math.min(1, (smoothScrollProgress - 0.4) * 5)
                : 0
              }
            />
          </div>
        </div>
        
        {/* Debug components for development only */}
        {/* FPSMeter is now managed by HUDSystem */}
        {/* SceneDebugOverlay is now managed by HUDSystem */}
        
        {/* Mint-colored warp trails - only during CosmicFlight scene */}
        {currentSceneKey === 'cosmicFlight' && (
          <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
            {/* Generate 8 mint-colored trails with more natural distribution */}
            {Array.from({ length: 8 }).map((_, i) => {
              // More subtle mint colors with less variation
              const hue = 160 + (i * 2); 
              // More natural vertical distribution
              const verticalPos = 10 + (Math.pow(i, 1.2) * 8);
              return (
                <div 
                  key={i}
                  className="absolute h-[2px] left-0"
                  style={{
                    top: `${verticalPos}%`,
                    width: `${30 + (sceneProgress * 40)}%`, // Less extreme width change
                    height: `${1 + (i % 2) * 0.5}px`, // Thinner lines
                    background: `linear-gradient(to right, hsla(${hue}, 75%, 60%, 0), hsla(${hue}, 85%, 65%, 0.6) 50%, hsla(${hue}, 75%, 60%, 0))`, // More subtle
                    filter: 'blur(4px)',
                    opacity: 0.3 + (i % 3) * 0.08, // Lower overall opacity
                    transform: 'translateX(-100%)',
                    animation: `warpTrailMint ${12 + (i * 2.5)}s infinite linear`, // Slower, more varied speeds
                  }}
                />
              );
            })}
            
            <style jsx>{`
              @keyframes warpTrailMint {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100vw); }
              }
            `}</style>
          </div>
        )}
        
        {/* Spacer elements for scroll height */}
        <div className="pointer-events-none">
          {Array.from({ length: 7 }).map((_, i) => (
            <section
              key={i}
              data-scroll-zone={i}
              className="h-screen w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
} 