import React from 'react';
import { useHUDContext } from './HUDHub';
import withDraggable from './DraggableHOC';
import { AdvancedControlPanel } from '../layouts/AdvancedControlPanel';

// LEGIT compliance metadata
export const metadata = {
  id: 'dev_controls_wrapper',
  scs: 'SCS-DEBUG-OVERLAY',
  type: 'utility',
  doc: 'contract_dev_controls_wrapper.md'
};

/**
 * Wrapper for AdvancedControlPanel to integrate with the HUD system
 * 
 * @param {Object} props - Component props including all props needed for AdvancedControlPanel
 * @returns {React.ReactElement|null} The AdvancedControlPanel component or null if hidden
 */
function DevControlsWrapper(props) {
  // Use HUD context for visibility control
  const { hudVisibility } = useHUDContext();
  const isVisible = hudVisibility['hud_5'] !== false; // Default to visible if not set
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-red-900/90 rounded-lg shadow-lg">
      <div className="draggable-handle flex justify-between items-center p-2 border-b border-red-700">
        <span className="font-bold text-white">HUD 5: Dev Controls</span>
      </div>
      
      <AdvancedControlPanel {...props} />
    </div>
  );
}

// Export the draggable version of the component
export default withDraggable(DevControlsWrapper, {
  defaultPosition: { x: window.innerWidth - 340, y: 70 },
  zIndex: 9000
});