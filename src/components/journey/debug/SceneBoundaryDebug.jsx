import React, { useState, useEffect } from 'react';
import withDraggable from '../../../components/ui/DraggableHOC';

// LEGIT-compliant metadata
export const metadata = {
  id: 'scene_boundary_debug',
  scs: 'SCS0',
  type: 'debug',
  doc: 'contract_debug_tools.md'
};

// Default scenes for fallback
const DEFAULT_SCENES = [
  { key: 'dormant', range: [0.0, 0.05], transitionDuration: 1.0, fadeZone: 0.01 }, 
  { key: 'awakening', range: [0.05, 0.15], transitionDuration: 1.0, fadeZone: 0.015 },
  { key: 'cosmicReveal', range: [0.15, 0.3], transitionDuration: 0.8, fadeZone: 0.015 },
  { key: 'cosmicFlight', range: [0.3, 0.8], transitionDuration: 0.6, fadeZone: 0.015 },
  { key: 'sunApproach', range: [0.8, 0.9], transitionDuration: 1.0, fadeZone: 0.015 },
  { key: 'sunLanding', range: [0.9, 1.0], transitionDuration: 1.0, fadeZone: 0.01 },
];

/**
 * SceneBoundaryDebug Content Component - Visualizes scene boundaries and scroll position
 * Will be wrapped with draggable HOC - Renamed to HUD ATOMIC 2
 */
function SceneBoundaryDebugContent({ scenes = [], scrollProgress = 0 }) {
  const [showVhValues, setShowVhValues] = useState(true);
  const [showDissolveZones, setShowDissolveZones] = useState(false);
  const [showTransitionTiming, setShowTransitionTiming] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastTransitionTime, setLastTransitionTime] = useState(null);
  const [currentSceneKey, setCurrentSceneKey] = useState('');
  const [isVisible, setIsVisible] = useState(false); // Start invisible by default
  
  // Use keyboard shortcut to toggle visibility (Shift+H+2)
  useEffect(() => {
    // Only enable in development mode
    if (process.env.NODE_ENV !== 'development') {
      setIsVisible(false);
      return;
    }

    const handleKeyDown = (e) => {
      // Check for Shift+H+2 combination
      if (e.shiftKey && e.key === 'H' && e.code === 'Digit2') {
        setIsVisible(prev => !prev);
        console.log('[HUD ATOMIC 2] Visibility toggled with keyboard shortcut');
      }
      
      // Only handle other shortcuts if visible
      if (isVisible) {
        if (e.key === 'v' || e.key === 'V') {
          setShowVhValues(prev => !prev);
        } else if (e.key === 'd' || e.key === 'D') {
          setShowDissolveZones(prev => !prev);
        } else if (e.key === 't' || e.key === 'T') {
          setShowTransitionTiming(prev => !prev);
        }
      }
    };
    
    // Listen for custom event from NavBar button
    const handleToggleHudAtomic2 = () => {
      setIsVisible(prev => !prev);
      console.log('[HUD ATOMIC 2] Visibility toggled from NavBar button');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggleHudAtomic2', handleToggleHudAtomic2);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggleHudAtomic2', handleToggleHudAtomic2);
    };
  }, [isVisible]);
  
  // Use default scenes if none provided
  const usableScenes = (scenes && scenes.length > 0) ? scenes : DEFAULT_SCENES;
  
  // Enhanced scene data with fade zones
  const scenesWithFadeZones = usableScenes.map(scene => ({
    ...scene,
    fadeZone: scene.fadeZone || (scene.key === 'dormant' || scene.key === 'sunLanding' ? 0.03 : 0.05)
  }));
  
  // Track scene transitions for timing display
  useEffect(() => {
    if (!isVisible) return;
    
    try {
    const currentScene = usableScenes.find(
      ({ range }) => scrollProgress >= range[0] && scrollProgress < range[1]
    );
    
    if (currentScene && currentScene.key !== currentSceneKey) {
      setLastTransitionTime(new Date());
      setCurrentSceneKey(currentScene.key);
    }
    } catch (error) {
      console.error('[HUD ATOMIC 2] Error tracking scene transitions:', error);
    }
  }, [scrollProgress, usableScenes, currentSceneKey, isVisible]);
  
  // Calculate the total height for vh calculations (700vh for AtomicPageFrame)
  const totalVhHeight = 700;
  
  // Early return if not visible - MOVED AFTER ALL HOOKS
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="bg-gray-900/90 rounded-lg p-2 text-xs font-mono text-white backdrop-blur-sm border-2 border-purple-500 shadow-xl">
      <div className="flex justify-between items-center mb-1 draggable-handle">
        <h3 className="text-purple-300 font-bold text-xs">HUD ATOMIC 2</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowVhValues(prev => !prev)} 
            className={`text-[10px] px-1.5 py-0.5 rounded ${showVhValues ? 'bg-purple-600' : 'bg-gray-700'}`}
          >
            VH
          </button>
          <button 
            onClick={() => setShowDissolveZones(prev => !prev)} 
            className={`text-[10px] px-1.5 py-0.5 rounded ${showDissolveZones ? 'bg-purple-600' : 'bg-gray-700'}`}
          >
            DZ
          </button>
          <button 
            onClick={() => setShowTransitionTiming(prev => !prev)} 
            className={`text-[10px] px-1.5 py-0.5 rounded ${showTransitionTiming ? 'bg-purple-600' : 'bg-gray-700'}`}
          >
            MS
          </button>
          <button 
            onClick={() => setIsExpanded(prev => !prev)} 
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <div className="text-xs mb-2">
            <div className="text-gray-400">Current: {Math.round(scrollProgress * 100)}%{showVhValues && ` (${Math.round(scrollProgress * totalVhHeight)}vh)`}</div>
          </div>
          
          <div className="relative h-64 w-6 bg-gray-800 rounded-full overflow-hidden mb-2">
            {/* Scene ranges visualization */}
            {scenesWithFadeZones.map(({ key, range, fadeZone }, i) => {
              const [start, end] = range;
              const height = (end - start) * 100;
              const top = start * 100;
              
              // Is the current scene active?
              const isActive = scrollProgress >= start && scrollProgress < end;
              
              return (
                <React.Fragment key={key}>
                  {/* Main scene range */}
                  <div 
                    className={`absolute left-0 w-full rounded-sm ${isActive ? 'bg-green-500' : 'bg-gray-600'}`}
                    style={{ 
                      height: `${height}%`, 
                      top: `${top}%`,
                    }}
                    title={`${key}: ${start * 100}% - ${end * 100}%`}
                  />
                  
                  {/* Fade zones (if enabled) */}
                  {showDissolveZones && (
                    <>
                      {/* Fade-in zone */}
                      <div 
                        className="absolute left-0 w-full rounded-sm bg-yellow-500/40"
                        style={{ 
                          height: `${fadeZone * 100}%`, 
                          top: `${(start - fadeZone) * 100}%`,
                        }}
                        title={`${key} fade-in: ${(start - fadeZone) * 100}% - ${start * 100}%`}
                      />
                      
                      {/* Fade-out zone */}
                      <div 
                        className="absolute left-0 w-full rounded-sm bg-yellow-500/40"
                        style={{ 
                          height: `${fadeZone * 100}%`, 
                          top: `${end * 100}%`,
                        }}
                        title={`${key} fade-out: ${end * 100}% - ${(end + fadeZone) * 100}%`}
                      />
                    </>
                  )}
                </React.Fragment>
              );
            })}
            
            {/* Current scroll position indicator */}
            <div 
              className="absolute left-0 w-full h-0.5 bg-white z-10"
              style={{ top: `${scrollProgress * 100}%` }}
            />
          </div>
          
          {/* Scene details list */}
          <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
            {scenesWithFadeZones.map(({ key, range, fadeZone, transitionDuration = 0.8 }, i) => {
              const [start, end] = range;
              const isActive = scrollProgress >= start && scrollProgress < end;
              const startVh = Math.round(start * totalVhHeight);
              const endVh = Math.round(end * totalVhHeight);
              const fadeInStartVh = Math.round((start - fadeZone) * totalVhHeight);
              const fadeOutEndVh = Math.round((end + fadeZone) * totalVhHeight);
              
              return (
                <div 
                  key={key}
                  className={`text-[10px] flex justify-between ${isActive ? 'text-green-400 font-bold' : 'text-gray-400'}`}
                >
                  <span>{key}</span>
                  <span>
                    {Math.round(start * 100)}% - {Math.round(end * 100)}%
                    {showVhValues && (
                      <span className="ml-1 text-blue-400">
                        ({startVh}vh - {endVh}vh)
                      </span>
                    )}
                    {showDissolveZones && (
                      <span className="ml-1 text-yellow-400">
                        [{fadeInStartVh}vh - {fadeOutEndVh}vh]
                      </span>
                    )}
                    {transitionDuration && (
                      <span className="ml-1 text-purple-400">
                        {transitionDuration}s
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Transition timing display */}
          {showTransitionTiming && lastTransitionTime && (
            <div className="mt-2 text-[10px] bg-purple-950/50 p-1 rounded">
              <div className="text-purple-300">Last transition: {currentSceneKey}</div>
              <div className="text-purple-300">
                Time: {lastTransitionTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })}
              </div>
              <div className="text-purple-300">
                MS since: {new Date() - lastTransitionTime}ms
              </div>
            </div>
          )}
          
          <div className="mt-2 text-[10px] text-gray-500">
            Press V to toggle VH values
            <br />
            Press D to toggle dissolve zones
            <br />
            Press T to toggle transition timing
            <br />
            Press Shift+H+2 to toggle visibility
          </div>
        </>
      )}
    </div>
  );
}

// Create draggable version with unique storage ID
const DraggableSceneBoundaryDebug = withDraggable(SceneBoundaryDebugContent, {
  defaultPosition: { x: 20, y: 350 },
  zIndex: 103, // Correct z-index for HUD layer
  storageId: 'scene_boundary_debug_atomic_2'
});

/**
 * SceneBoundaryDebug - Exports the draggable scene boundary debug component
 * Renamed to HUD ATOMIC 2 for the page layer
 */
export default function SceneBoundaryDebug(props) {
  try {
    return <DraggableSceneBoundaryDebug {...props} />;
  } catch (error) {
    console.error('[HUD ATOMIC 2] Error rendering:', error);
    // Return a visible error message instead of null
    return (
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        backgroundColor: 'rgba(255, 0, 0, 0.8)', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px', 
        fontSize: '12px',
        zIndex: 120 // Debug overlay layer
      }}>
        Error rendering HUD ATOMIC 2: {error?.message || 'Unknown error'}
      </div>
    );
  }
} 