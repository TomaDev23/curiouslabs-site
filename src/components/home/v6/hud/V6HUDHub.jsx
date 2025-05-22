/**
 * @component V6HUDHub
 * @description Central hub for controlling V6 HUD visibility
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - V6HUDHub passes LEGIT protocol
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import withDraggable from './DraggableHOC';

// Create context for HUD visibility
export const V6HUDContext = createContext({
  hudVisibility: {},
  setHUDVisibility: () => {},
  toggleHUDVisibility: () => {}
});

// Define HUDs array with specific information
export const V6HUDs = [
  { id: 'hud_1', name: 'Section Control', color: 'bg-purple-600', number: 1 },
  { id: 'hud_2', name: 'Scroll Debug', color: 'bg-blue-600', number: 2 },
  { id: 'hud_3', name: 'Section Boundaries', color: 'bg-green-600', number: 3 },
  { id: 'hud_4', name: 'Performance', color: 'bg-yellow-600', number: 4, disabled: true },
  { id: 'hud_5', name: 'Future HUD', color: 'bg-gray-600', number: 5, disabled: true },
  { id: 'hud_6', name: 'Mission Tracker', color: 'bg-green-500', number: 6 }
];

/**
 * Custom hook to use the HUD context
 * @returns {Object} HUD context
 */
export const useV6HUDContext = () => useContext(V6HUDContext);

/**
 * V6HUD Provider Component
 * Manages visibility state for all HUDs
 * 
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components
 * @returns {React.ReactElement} Provider with children
 */
export function V6HUDProvider({ children }) {
  // Initialize with default visibility (all invisible)
  const [hudVisibility, setHudVisibility] = useState(() => {
    // Default all HUDs to invisible
    const defaultVisibility = {};
    V6HUDs.forEach(hud => {
      defaultVisibility[hud.id] = false;
    });
    return defaultVisibility;
  });

  // Load visibility state from localStorage on mount
  useEffect(() => {
    try {
      const savedVisibility = localStorage.getItem('v6_hud_visibility');
      if (savedVisibility) {
        const parsed = JSON.parse(savedVisibility);
        if (parsed && typeof parsed === 'object') {
          setHudVisibility(prev => ({
            ...prev,
            ...parsed
          }));
        }
      }
    } catch (error) {
      console.error('[V6HUDHub] Error loading HUD visibility:', error);
    }
  }, []);

  // Save visibility state to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('v6_hud_visibility', JSON.stringify(hudVisibility));
    } catch (error) {
      console.error('[V6HUDHub] Error saving HUD visibility:', error);
    }
  }, [hudVisibility]);

  // Function to set a HUD's visibility
  const setHUDVisibility = (hudId, isVisible) => {
    if (!hudId) return;
    
    setHudVisibility(prev => ({
      ...prev,
      [hudId]: isVisible
    }));
  };

  // Function to toggle a HUD's visibility
  const toggleHUDVisibility = (hudId) => {
    if (!hudId) return;
    
    setHudVisibility(prev => ({
      ...prev,
      [hudId]: !prev[hudId]
    }));
  };

  return (
    <V6HUDContext.Provider value={{ 
      hudVisibility, 
      setHUDVisibility, 
      toggleHUDVisibility 
    }}>
      {children}
    </V6HUDContext.Provider>
  );
}

/**
 * Inner content for the HUD Hub
 * @returns {React.ReactElement} HUD Hub UI
 */
function V6HUDHubContent() {
  const [expanded, setExpanded] = useState(false);
  const { hudVisibility, toggleHUDVisibility } = useV6HUDContext();

  // Toggle all HUDs at once
  const toggleAllHUDs = () => {
    // Check if all enabled HUDs are visible
    const enabledHUDs = V6HUDs.filter(hud => !hud.disabled);
    const allOn = enabledHUDs.every(hud => hudVisibility[hud.id]);
    
    // Set all HUDs to the opposite of current state
    V6HUDs.forEach(hud => {
      if (!hud.disabled) {
        toggleHUDVisibility(hud.id, !allOn);
      }
    });
  };

  // Reset all positions
  const resetAllPositions = () => {
    if (window.confirm('Reset all HUD positions to default?')) {
      // Get all keys in localStorage that match the v6_draggable pattern
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('v6_')) {
          localStorage.removeItem(key);
        }
      });
      
      // Reload to apply changes
      window.location.reload();
    }
  };

  // Toggle expansion
  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle HUD Hub with Ctrl+Alt+H
      if (e.ctrlKey && e.altKey && e.key === 'h') {
        toggleExpanded();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-gray-900/90 backdrop-blur-sm text-white rounded-lg border-2 border-purple-500 overflow-hidden">
      {/* Header - always visible and draggable */}
      <div className="draggable-handle flex items-center justify-between p-2 bg-purple-900 cursor-grab">
        <h3 className="text-xs font-bold">V6 HUD Hub</h3>
        <button
          onClick={toggleExpanded}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-purple-700"
        >
          {expanded ? '−' : '+'}
        </button>
      </div>
      
      {/* Body - only visible when expanded */}
      {expanded && (
        <div className="p-2">
          {/* HUD Toggles */}
          <div className="grid grid-cols-1 gap-2 mb-3">
            {V6HUDs.map(hud => (
              <button
                key={hud.id}
                onClick={() => !hud.disabled && toggleHUDVisibility(hud.id)}
                disabled={hud.disabled}
                className={`flex items-center px-2 py-1 rounded text-xs ${
                  hud.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : hudVisibility[hud.id]
                      ? `${hud.color} text-white`
                      : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-black/30 mr-2">
                  {hud.number}
                </span>
                {hud.name}
              </button>
            ))}
          </div>
          
          {/* Control Buttons */}
          <div className="flex justify-between">
            <button
              onClick={toggleAllHUDs}
              className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Toggle All
            </button>
            <button
              onClick={resetAllPositions}
              className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 rounded"
            >
              Reset Positions
            </button>
          </div>
          
          {/* Keyboard Shortcut Info */}
          <div className="mt-2 text-[10px] text-gray-400 text-center">
            Press <kbd className="px-1 py-0.5 bg-gray-800 rounded">Ctrl+Alt+H</kbd> to toggle
          </div>
        </div>
      )}
    </div>
  );
}

// Create draggable version
const DraggableV6HUDHub = withDraggable(V6HUDHubContent, {
  defaultPosition: { x: 20, y: 20 },
  zIndex: 10001,
  storageId: 'v6_hub_position'
});

/**
 * V6HUDHub - Main export
 * @returns {React.ReactElement} Draggable HUD Hub
 */
export default function V6HUDHub() {
  return <DraggableV6HUDHub />;
} 