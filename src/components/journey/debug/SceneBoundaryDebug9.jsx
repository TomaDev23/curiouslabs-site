import React, { useState, useEffect } from 'react';
import withDraggable from '../../../components/ui/DraggableHOC';
import { useHUDContext } from '../../../components/ui/HUDHub';

// LEGIT-compliant metadata
export const metadata = {
  id: 'scene_boundary_debug_v2',
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
 * Simple SceneBoundaryDebug9 Content Component
 * Simplified version to avoid issues
 */
function SceneBoundaryDebug9Content({ scenes = [], scrollProgress = 0 }) {
  // Basic state for the component
  const [showDetails, setShowDetails] = useState(true);
  
  // Use context with safe access
  const context = useHUDContext();
  const isVisible = context?.hudVisibility?.['hud_9'] === true;
  
  // Early return if not visible
  if (!isVisible) {
    return null;
  }
  
  // Use default scenes if none provided
  const usableScenes = (scenes && scenes.length > 0) ? scenes : DEFAULT_SCENES;
  
  // Find current scene
  const currentScene = usableScenes.find(
    scene => scrollProgress >= scene.range[0] && scrollProgress < scene.range[1]
  );
  
  const currentSceneKey = currentScene?.key || 'none';
  
  return (
    <div className="bg-gray-900/90 rounded-lg p-2 text-xs font-mono text-white backdrop-blur-sm border-2 border-purple-500 shadow-xl">
      <div className="flex justify-between items-center mb-1 draggable-handle">
        <h3 className="text-purple-300 font-bold text-xs">HUD 9: Scene Debug (v2)</h3>
        <button 
          onClick={() => setShowDetails(prev => !prev)} 
          className="text-gray-400 hover:text-white"
        >
          {showDetails ? '−' : '+'}
        </button>
      </div>
      
      {showDetails && (
        <>
          <div className="mb-2">
            <div className="text-gray-400">Scroll: {Math.round(scrollProgress * 100)}%</div>
            <div className="text-green-400">Current Scene: {currentSceneKey}</div>
          </div>
          
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {usableScenes.map(({ key, range }) => {
              const [start, end] = range;
              const isActive = scrollProgress >= start && scrollProgress < end;
              
              return (
                <div 
                  key={key}
                  className={`text-[10px] flex justify-between ${isActive ? 'text-green-400 font-bold' : 'text-gray-400'}`}
                >
                  <span>{key}</span>
                  <span>{Math.round(start * 100)}% - {Math.round(end * 100)}%</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// Create draggable version with specific storage key for position
const DraggableSceneBoundaryDebug9 = withDraggable(SceneBoundaryDebug9Content, {
  defaultPosition: { x: 380, y: 350 },
  zIndex: 105,
  storageId: 'scene_boundary_debug_hud9'
});

/**
 * SceneBoundaryDebug9 - Exports the draggable scene boundary debug component (v2)
 */
export default function SceneBoundaryDebug9(props) {
  try {
    return <DraggableSceneBoundaryDebug9 {...props} />;
  } catch (error) {
    console.error('[HUD9] Error rendering SceneBoundaryDebug9:', error);
    return null;
  }
} 