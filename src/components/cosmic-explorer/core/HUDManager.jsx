/**
 * HUDManager.jsx
 * Component for managing HUD visibility and positions
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import HUD components
import HUDSelector from './HUDSelector';
import PerformanceMetricsHUD from '../huds/PerformanceMetricsHUD';
import CameraInfoHUD from '../huds/CameraInfoHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_hud_manager',
  ui: 'UI5',
  type: 'controller',
  doc: 'contract_hud_manager.md'
};

// Default HUD positions
const DEFAULT_POSITIONS = {
  selector: { x: 20, y: 80 },
  performance: { x: 20, y: 220 },
  camera: { x: 320, y: 80 }
};

// HUD definitions for different modes
const DEBUG_MODE_HUDS = [
  {
    id: 'performance',
    name: 'Performance Metrics',
    description: 'FPS, memory usage, and render statistics',
    component: PerformanceMetricsHUD,
    defaultPosition: { x: 20, y: 220 }
  },
  {
    id: 'camera',
    name: 'Camera Info',
    description: 'Camera position, rotation, and scene parameters',
    component: CameraInfoHUD,
    defaultPosition: { x: 320, y: 80 }
  },
  // These would be implemented later
  {
    id: 'particles',
    name: 'Particle Visualizer',
    description: 'Visualize particle systems and distribution',
    available: false
  },
  {
    id: 'webgl',
    name: 'WebGL Pipeline',
    description: 'WebGL render pipeline and shader analysis',
    available: false
  },
  {
    id: 'scene',
    name: 'Scene Graph',
    description: 'Scene hierarchy visualization',
    available: false
  },
  {
    id: 'shader',
    name: 'Shader Inspector',
    description: 'View and analyze shader code',
    available: false
  }
];

const DEV_MODE_HUDS = [
  {
    id: 'console',
    name: 'Console Logger',
    description: 'Debug console output and events',
    available: false
  },
  {
    id: 'shaderLab',
    name: 'Shader Lab',
    description: 'Real-time GLSL editing with live preview',
    available: false
  },
  {
    id: 'timeline',
    name: 'Animation Timeline',
    description: 'Keyframe-based animation control',
    available: false
  },
  {
    id: 'particleDesigner',
    name: 'Particle Designer',
    description: 'Advanced particle system configuration',
    available: false
  },
  {
    id: 'inspector',
    name: 'Component Inspector',
    description: 'View and modify all objects',
    available: false
  },
  {
    id: 'profiler',
    name: 'Rendering Profiler',
    description: 'Detailed performance analysis',
    available: false
  }
];

/**
 * Get available HUDs for the current mode
 */
const getAvailableHudsForMode = (mode) => {
  switch(mode) {
    case 'DEBUG':
      return DEBUG_MODE_HUDS;
    case 'DEV':
      return DEV_MODE_HUDS;
    default:
      return [];
  }
};

/**
 * HUDManager component
 * Manages which HUDs are displayed and coordinates positions
 */
const HUDManager = ({
  activeMode,
  visualParams,
  cameraPosition,
  cameraRotation
}) => {
  // State for tracking active HUDs and their positions
  const [activeHUDs, setActiveHUDs] = useState(['selector']);
  const [hudPositions, setHudPositions] = useState(DEFAULT_POSITIONS);
  const [showSelector, setShowSelector] = useState(true);
  
  // Get available HUDs for the current mode
  const availableHUDs = getAvailableHudsForMode(activeMode);
  
  // Handle HUD toggle
  const handleToggleHUD = (newActiveHUDs) => {
    // Always keep the selector in the list if it's visible
    const updatedHUDs = showSelector 
      ? Array.from(new Set([...newActiveHUDs, 'selector']))
      : newActiveHUDs;
      
    setActiveHUDs(updatedHUDs);
    
    // Save to localStorage with mode prefix
    localStorage.setItem(`cosmic_explorer_${activeMode.toLowerCase()}_huds`, JSON.stringify(updatedHUDs));
  };
  
  // Handle position update for a specific HUD
  const handlePositionChange = (hudId, position) => {
    setHudPositions(prev => ({
      ...prev,
      [hudId]: position
    }));
    
    // Save to localStorage with mode prefix
    localStorage.setItem(`cosmic_explorer_${activeMode.toLowerCase()}_positions`, JSON.stringify({
      ...hudPositions,
      [hudId]: position
    }));
  };
  
  // Toggle the selector HUD
  const toggleSelector = () => {
    const newShowSelector = !showSelector;
    setShowSelector(newShowSelector);
    
    // Update active HUDs list
    if (newShowSelector) {
      if (!activeHUDs.includes('selector')) {
        setActiveHUDs(prev => [...prev, 'selector']);
      }
    } else {
      setActiveHUDs(prev => prev.filter(id => id !== 'selector'));
    }
  };
  
  // Load saved state from localStorage when mode changes
  useEffect(() => {
    try {
      // Reset active HUDs for the new mode
      setActiveHUDs(['selector']);
      
      // Load active HUDs for this mode
      const savedActiveHUDs = localStorage.getItem(`cosmic_explorer_${activeMode.toLowerCase()}_huds`);
      if (savedActiveHUDs) {
        const parsedHUDs = JSON.parse(savedActiveHUDs);
        setActiveHUDs(parsedHUDs);
        setShowSelector(parsedHUDs.includes('selector'));
      }
      
      // Load HUD positions for this mode
      const savedPositions = localStorage.getItem(`cosmic_explorer_${activeMode.toLowerCase()}_positions`);
      if (savedPositions) {
        setHudPositions(prev => ({
          ...prev,
          ...JSON.parse(savedPositions)
        }));
      }
    } catch (error) {
      console.error(`Error loading ${activeMode} HUD state from localStorage:`, error);
    }
  }, [activeMode]);
  
  // Toggle HUDs with keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle selector with ` (backtick/tilde key)
      if (e.key === '`') {
        toggleSelector();
      }
      
      // Quick toggles for specific HUDs with Alt+number
      if (e.altKey) {
        if (e.key === '1') {
          handleToggleHUD(
            activeHUDs.includes('performance') 
              ? activeHUDs.filter(id => id !== 'performance')
              : [...activeHUDs, 'performance']
          );
        }
        if (e.key === '2') {
          handleToggleHUD(
            activeHUDs.includes('camera') 
              ? activeHUDs.filter(id => id !== 'camera')
              : [...activeHUDs, 'camera']
          );
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeHUDs]);
  
  // Only show HUDs in DEBUG or DEV mode
  if (activeMode !== 'DEBUG' && activeMode !== 'DEV') {
    return null;
  }
  
  // Find implemented HUDs for the current mode
  const implementedHUDs = availableHUDs.filter(hud => hud.available !== false);
  
  return (
    <div className="hud-manager">
      {/* Main HUD Selector */}
      {activeHUDs.includes('selector') && (
        <HUDSelector
          initialPosition={hudPositions.selector || DEFAULT_POSITIONS.selector}
          onPositionChange={(pos) => handlePositionChange('selector', pos)}
          onClose={toggleSelector}
          activeHUDs={activeHUDs}
          onToggleHUD={handleToggleHUD}
          availableHUDs={availableHUDs.map(h => ({
            id: h.id,
            name: h.name,
            description: h.description,
            icon: h.icon || '📊',
            available: h.available !== false
          }))}
          currentMode={activeMode}
        />
      )}
      
      {/* Render active HUDs */}
      {activeMode === 'DEBUG' && (
        <>
          {/* Performance Metrics HUD */}
          {activeHUDs.includes('performance') && (
            <PerformanceMetricsHUD
              initialPosition={hudPositions.performance || DEFAULT_POSITIONS.performance}
              onPositionChange={(pos) => handlePositionChange('performance', pos)}
              onClose={() => handleToggleHUD(activeHUDs.filter(id => id !== 'performance'))}
            />
          )}
          
          {/* Camera Info HUD */}
          {activeHUDs.includes('camera') && (
            <CameraInfoHUD
              initialPosition={hudPositions.camera || DEFAULT_POSITIONS.camera}
              onPositionChange={(pos) => handlePositionChange('camera', pos)}
              onClose={() => handleToggleHUD(activeHUDs.filter(id => id !== 'camera'))}
              cameraPosition={cameraPosition}
              cameraRotation={cameraRotation}
              visualParams={visualParams}
            />
          )}
        </>
      )}
      
      {activeMode === 'DEV' && (
        /* DEV mode HUDs would be rendered here once implemented */
        <div className="coming-soon-message">
          <p>DEV Mode HUDs coming soon!</p>
          <p className="subtext">This mode will include: Console Logger, Shader Lab, Timeline Editor, and more.</p>
        </div>
      )}
      
      {/* HUD Toggle Button (shown when selector is hidden) */}
      {!activeHUDs.includes('selector') && (
        <div className="hud-toggle-button" onClick={toggleSelector}>
          <span className="hud-toggle-icon">HUD</span>
        </div>
      )}
      
      {/* Help tooltip */}
      <div className="hud-help-tooltip">
        Press <kbd>`</kbd> to toggle HUD selector | <kbd>Alt+1</kbd> for Performance | <kbd>Alt+2</kbd> for Camera
      </div>
      
      <style jsx>{`
        .hud-manager {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }
        
        .hud-toggle-button {
          position: fixed;
          bottom: 100px;
          right: 20px;
          background: rgba(40, 40, 60, 0.8);
          border: 1px solid rgba(70, 80, 180, 0.4);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(5px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          font-size: 11px;
          pointer-events: auto;
          transition: all 0.2s;
          z-index: 1001;
        }
        
        .hud-toggle-button:hover {
          background: rgba(60, 70, 140, 0.8);
          transform: scale(1.1);
        }
        
        .hud-toggle-icon {
          font-weight: bold;
          font-family: monospace;
        }
        
        .hud-help-tooltip {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(30, 30, 40, 0.8);
          color: rgba(255, 255, 255, 0.7);
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          pointer-events: none;
          backdrop-filter: blur(5px);
          transition: opacity 0.3s;
          opacity: 0.7;
        }
        
        .hud-help-tooltip:hover {
          opacity: 0.2;
        }
        
        kbd {
          background: rgba(60, 60, 70, 0.8);
          border: 1px solid rgba(100, 100, 120, 0.4);
          border-radius: 3px;
          padding: 1px 4px;
          font-family: monospace;
          font-size: 11px;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }
        
        .coming-soon-message {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(40, 40, 60, 0.8);
          border: 1px solid rgba(70, 80, 180, 0.4);
          color: white;
          padding: 20px 30px;
          border-radius: 8px;
          text-align: center;
          backdrop-filter: blur(8px);
          pointer-events: auto;
          z-index: 1001;
          font-size: 16px;
        }
        
        .coming-soon-message .subtext {
          margin-top: 8px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

HUDManager.propTypes = {
  activeMode: PropTypes.string.isRequired,
  visualParams: PropTypes.object,
  cameraPosition: PropTypes.object,
  cameraRotation: PropTypes.object
};

export default HUDManager; 