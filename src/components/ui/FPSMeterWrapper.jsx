import React from 'react';
import { useHUDContext } from './HUDHub';
import withDraggable from './DraggableHOC';
import FPSMeter from '../journey/debug/FPSMeter';

// LEGIT compliance metadata
export const metadata = {
  id: 'fps_meter_wrapper',
  scs: 'SCS-DEBUG-OVERLAY',
  type: 'utility',
  doc: 'contract_fps_meter_wrapper.md'
};

/**
 * Wrapper for FPSMeter to integrate with the HUD system
 * 
 * @returns {React.ReactElement|null} The FPSMeter component or null if hidden
 */
function FPSMeterWrapper() {
  // Use HUD context for visibility control
  const { hudVisibility } = useHUDContext();
  const isVisible = hudVisibility['hud_3'] !== false; // Default to visible if not set
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-purple-900/80 rounded-lg p-2 text-white text-xs font-mono backdrop-blur-sm border border-purple-700 shadow-xl">
      <div className="draggable-handle flex justify-between items-center mb-2 pb-1 border-b border-purple-600">
        <span className="font-bold text-white">HUD 3: FPS Monitor</span>
      </div>
      
      <FPSMeter />
    </div>
  );
}

// Export the draggable version of the component
export default withDraggable(FPSMeterWrapper, {
  defaultPosition: { x: 20, y: window.innerHeight - 150 },
  zIndex: 9000
});