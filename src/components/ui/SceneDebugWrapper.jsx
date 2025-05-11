import React from 'react';
import { useHUDContext } from './HUDHub';
import withDraggable from './DraggableHOC';
import SceneBoundaryDebug from '../journey/debug/SceneBoundaryDebug';

// LEGIT compliance metadata
export const metadata = {
  id: 'scene_debug_wrapper',
  scs: 'SCS-DEBUG-OVERLAY',
  type: 'utility',
  doc: 'contract_scene_debug_wrapper.md'
};

/**
 * Wrapper for SceneBoundaryDebug to integrate with the HUD system
 * 
 * @param {Object} props - Component props
 * @param {Array} props.scenes - Array of scene objects
 * @param {number} props.scrollProgress - Current scroll progress (0-1)
 * @returns {React.ReactElement|null} The SceneBoundaryDebug component or null if hidden
 */
function SceneDebugWrapper({ scenes, scrollProgress }) {
  // Use HUD context for visibility control
  const { hudVisibility } = useHUDContext();
  const isVisible = hudVisibility['hud_2'] !== false; // Default to visible if not set
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-green-700/90 rounded-lg p-2 shadow-lg">
      <div className="draggable-handle flex justify-between items-center mb-2 pb-1 border-b border-green-600">
        <span className="font-bold text-white">HUD 2: Scene Debug</span>
      </div>
      
      <SceneBoundaryDebug scenes={scenes} scrollProgress={scrollProgress} />
    </div>
  );
}

// Export the draggable version of the component
export default withDraggable(SceneDebugWrapper, {
  defaultPosition: { x: 20, y: 400 },  // Positioned much lower to avoid navbar
  zIndex: 9999  // Higher z-index to ensure it's visible above all content
});