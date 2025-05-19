import React, { useState, useEffect, createContext, useContext } from 'react';
import withDraggable from './DraggableHOC';

// LEGIT compliance metadata
export const metadata = {
  id: 'hud_hub',
  scs: 'SCS-DEBUG',
  type: 'utility',
  doc: 'contract_hud_hub.md'
};

// Define the HUDs array with specific information
export const HUDs = [
  { id: 'hud_1', name: 'Scroll Debug', color: 'bg-red-500', number: 1 },
  { id: 'hud_9', name: 'Scene Debug', color: 'bg-green-700', number: 2 }, // Button 2 controls HUD 9
  { id: 'hud_3', name: 'FPS Monitor', color: 'bg-purple-800', number: 3 },
  { id: 'hud_4', name: 'VH Markers', color: 'bg-orange-700', number: 4 },
  { id: 'hud_5', name: 'Dev Controls', color: 'bg-red-900', number: 5 },
  { id: 'hud_6', name: 'Scene Progress', color: 'bg-green-800', number: 6 },
  // Placeholders for future HUDs
  { id: 'hud_7', name: 'Placeholder 7', color: 'bg-gray-700', number: 7, disabled: true },
  { id: 'hud_8', name: 'Placeholder 8', color: 'bg-gray-700', number: 8, disabled: true },
  { id: 'hud_future', name: 'Future HUD', color: 'bg-gray-700', number: 9, disabled: true }, // Disabled button 9
];

// Create context
export const HUDContext = createContext();

/**
 * HUD Provider Component
 * Manages visibility state for all HUDs
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Provider with children
 */
export function HUDProvider({ children }) {
  // Initialize with default visibility (all invisible)
  const [hudVisibility, setHudVisibility] = useState(() => {
    // Default all HUDs to invisible
    const defaultVisibility = {};
    HUDs.forEach(hud => {
      defaultVisibility[hud.id] = false;
    });
    return defaultVisibility;
  });
  
  // Clear localStorage on first mount to reset any problematic state
  useEffect(() => {
    try {
      // Clear both positions and visibility
      localStorage.removeItem('draggable_HUDHub_position');
      localStorage.removeItem('hudVisibility');
      console.log('Cleared HUD state from localStorage');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, []);
  
  // Only load visibility state from localStorage in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      try {
        const savedVisibility = localStorage.getItem('hudVisibility');
        if (savedVisibility) {
          const parsed = JSON.parse(savedVisibility);
          if (parsed && typeof parsed === 'object') {
            // Ensure all HUDs start invisible regardless of saved state
            const resetVisibility = {};
            Object.keys(parsed).forEach(key => {
              resetVisibility[key] = false;
            });
            setHudVisibility(prev => ({
              ...prev,
              ...resetVisibility
            }));
            console.log('Reset all HUDs to invisible');
          }
        }
      } catch (error) {
        console.error('Error loading HUD visibility:', error);
      }
    }
  }, []);
  
  // Save visibility state changes to localStorage only in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      try {
        localStorage.setItem('hudVisibility', JSON.stringify(hudVisibility));
        console.log('Saved HUD visibility to localStorage:', hudVisibility);
      } catch (error) {
        console.error('Error saving HUD visibility:', error);
      }
    }
  }, [hudVisibility]);
  
  // Function to set a HUD's visibility with error handling
  const setHUDVisibility = (hudId, isVisible) => {
    try {
      if (!hudId) throw new Error('Missing hudId');
      
      // Only allow visibility changes in development
      if (process.env.NODE_ENV !== 'development') {
        console.log('HUD visibility changes disabled in production');
        return;
      }
      
      setHudVisibility(prev => {
        const newState = {
          ...prev,
          [hudId]: isVisible
        };
        return newState;
      });
    } catch (error) {
      console.error(`Error setting visibility for ${hudId}:`, error);
    }
  };
  
  return (
    <HUDContext.Provider value={{ hudVisibility, setHUDVisibility }}>
      {children}
    </HUDContext.Provider>
  );
}

// Custom hook to use the HUD context
export const useHUDContext = () => useContext(HUDContext);

/**
 * HUD Hub Component
 * UI for controlling HUD visibility
 * 
 * @returns {React.ReactElement} HUD Hub UI
 */
function HUDHub() {
  const [expanded, setExpanded] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const { hudVisibility, setHUDVisibility } = useHUDContext();
  
  // No pulsing effect anymore
  
  // Toggle function for individual HUDs
  const toggleHUDVisibility = (hudId) => {
    try {
      console.log(`Starting toggle for ${hudId}`);
      
      // Get current state with proper defaulting if undefined
      const currentState = hudVisibility[hudId] === true;
      
      // Set to the opposite with explicit boolean values
      setHUDVisibility(hudId, !currentState);
      
      // Special case for button 2 (HUD 9) - dispatch custom event for SceneBoundaryDebug9
      const hudConfig = HUDs.find(hud => hud.id === hudId);
      console.log(`HUD config for ${hudId}:`, hudConfig);
      
      if (hudConfig?.number === 2) {
        console.log('Detected button 2 - special handling for SceneBoundaryDebug');
        
        // Force update visibility for hud_9 directly
        console.log(`Setting visibility for hud_9 to ${!currentState}`);
        setHUDVisibility('hud_9', !currentState);
        
        // Dispatch event for HUD ATOMIC 2 (legacy support)
        try {
          const event = new Event('toggleHudAtomic2');
          window.dispatchEvent(event);
          console.log('Dispatched toggleHudAtomic2 event for backward compatibility');
        } catch (eventError) {
          console.error('Error dispatching event:', eventError);
        }
      }
      
      // Log for debugging
      console.log(`Completed toggle for ${hudId} from ${currentState} to ${!currentState}`);
    } catch (error) {
      console.error(`Error in toggleHUDVisibility for ${hudId}:`, error);
    }
  };
  
  // Toggle all HUDs at once
  const toggleAllHUDs = () => {
    try {
      // Check if all enabled HUDs are visible
      const enabledHUDs = HUDs.filter(hud => !hud.disabled);
      const allOn = enabledHUDs.every(hud => hudVisibility[hud.id] !== false);
      
      // Set all HUDs to the opposite of the current state
      HUDs.forEach(hud => {
        if (!hud.disabled) {
          setHUDVisibility(hud.id, !allOn);
        }
      });
      
      console.log(`Toggling all HUDs to ${!allOn}`);
    } catch (error) {
      console.error('Error toggling all HUDs:', error);
    }
  };
  
  // Reset all positions
  const resetAllPositions = () => {
    try {
      if (window.confirm('Reset all HUD positions to default?')) {
        console.log('Resetting all HUD positions to default...');
        
        // Define all possible position storage keys
        const positionKeys = [
          'draggable_ScrollDebugOverlayContent_position',
          'draggable_SceneBoundaryDebugContent_position',
          'draggable_FPSMeterContent_position',
          'draggable_VHMarkersContent_position',
          'draggable_AdvancedControlPanel_position',
          'draggable_advanced_control_panel_position',
          'draggable_SceneDebugOverlayContent_position',
          'draggable_HUDHub_position',
          // Add keys with explicit storage keys
          'scene_boundary_debug_hud2',
          'scene_boundary_debug_hud9'
        ];
        
        // Clear all position storage
        positionKeys.forEach(key => {
          try {
            localStorage.removeItem(key);
            console.log(`Cleared position storage for ${key}`);
          } catch (err) {
            console.warn(`Failed to clear position for ${key}:`, err);
          }
        });
        
        // Also clear any keys that match the draggable pattern
        Object.keys(localStorage).forEach(key => {
          if (key.includes('draggable_') && key.includes('_position')) {
            try {
              localStorage.removeItem(key);
              console.log(`Cleared additional position storage for ${key}`);
            } catch (err) {
              console.warn(`Failed to clear position for ${key}:`, err);
            }
          }
        });
        
        // Reload to apply changes
        window.location.reload();
      }
    } catch (error) {
      console.error('Error resetting positions:', error);
      alert('Failed to reset positions. Please try again.');
    }
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };
  
  return (
    <div
      className={`fixed rounded-lg ${expanded ? 'bg-gray-900/90 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.7)]' : 'shadow-lg'} transition-all duration-300 ease-in-out`}
    >
      {expanded ? (
        <div className="p-3">
          <div className="flex justify-between items-center mb-3 border-b border-purple-500 pb-2">
            <h3 className="text-purple-300 font-bold">HUD Control Hub</h3>
            <button 
              className="text-white hover:text-purple-300 transition-colors"
              onClick={toggleExpanded}
            >
              ✖
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {HUDs.map((hud) => {
              const isActive = hudVisibility[hud.id] !== false; // Default to true if not set
              
              return (
                <button
                  key={hud.id}
                  className={`w-16 h-16 rounded border-2 flex flex-col items-center justify-center 
                    ${isActive 
                      ? `${hud.color} ${hud.number <= 9 ? 'border-white/80' : 'border-gray-600'} text-white shadow-inner` 
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                    } transition-all`}
                  onClick={() => toggleHUDVisibility(hud.id)}
                  disabled={hud.disabled === true}
                  title={hud.disabled ? `${hud.name} (Coming Soon)` : hud.name}
                >
                  <div className="text-lg font-bold mb-1">{hud.number}</div>
                  <div className="text-[8px] max-w-full px-1 truncate">{hud.name}</div>
                </button>
              );
            })}
          </div>
          
          <div className="mt-3 pt-2 border-t border-purple-500 grid grid-cols-2 gap-2">
            <button
              className="bg-purple-700 hover:bg-purple-600 text-white py-1 px-2 rounded text-sm"
              onClick={toggleAllHUDs}
            >
              Toggle All
            </button>
            <button
              className="bg-red-700 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
              onClick={resetAllPositions}
            >
              Reset Positions
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="relative draggable-handle w-12 h-12 cursor-move flex items-center justify-center bg-purple-700 hover:bg-purple-600 text-white rounded-lg"
        >
          {/* Invisible drag areas in the corners */}
          <div className="absolute left-0 top-0 w-3 h-3" />
          <div className="absolute right-0 top-0 w-3 h-3" />
          <div className="absolute left-0 bottom-0 w-3 h-3" />
          <div className="absolute right-0 bottom-0 w-3 h-3" />
          
          {/* Clickable button in the center */}
          <button
            className="w-8 h-8 flex items-center justify-center text-xl font-bold"
            onClick={toggleExpanded}
            data-no-drag="true"
          >
            &#x1F527;
          </button>
        </div>
      )}
    </div>
  );
}

// Default position in the top-left corner
export default withDraggable(HUDHub, { 
  defaultPosition: { x: 20, y: 20 },
  zIndex: 9999
}); 