/**
 * HUDSelector.jsx
 * Component for selecting which HUDs to display
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_hud_selector',
  ui: 'UI5',
  type: 'control',
  doc: 'contract_hud_selector.md'
};

// Default available HUDs for DEBUG mode
const DEFAULT_DEBUG_HUDS = [
  {
    id: 'performance',
    name: 'Performance Metrics',
    description: 'FPS, memory usage, and render statistics',
    available: true,
    icon: '📊'
  },
  {
    id: 'camera',
    name: 'Camera Info',
    description: 'Camera position, rotation, and scene parameters',
    available: true,
    icon: '🎥'
  },
  {
    id: 'webgl',
    name: 'WebGL Pipeline',
    description: 'WebGL render pipeline and shader analysis',
    available: true,
    icon: '🔍'
  },
  {
    id: 'scene',
    name: 'Scene Graph',
    description: 'Scene hierarchy visualization',
    available: true,
    icon: '🌳'
  },
  {
    id: 'shader',
    name: 'Shader Inspector',
    description: 'View and analyze shader code',
    available: true,
    icon: '⚙️'
  },
  // Mini HUDs
  {
    id: 'fpsCounter',
    name: 'FPS Counter',
    description: 'Compact FPS display with alerts',
    icon: '🔢',
    available: true,
    category: 'mini'
  },
  {
    id: 'gpuTemp',
    name: 'GPU Temperature',
    description: 'GPU temperature and usage monitor',
    icon: '🌡️',
    available: true,
    category: 'mini'
  },
  {
    id: 'memoryUsage',
    name: 'Memory Usage',
    description: 'RAM and VRAM usage monitor',
    icon: '📊',
    available: true,
    category: 'mini'
  },
  {
    id: 'audioSpectrum',
    name: 'Audio Spectrum',
    description: 'Audio visualization with spectrum analyzer',
    icon: '🔊',
    available: true,
    category: 'mini'
  },
  // Visualization HUDs
  {
    id: 'histogram',
    name: 'Histogram',
    description: 'Data distribution visualization',
    icon: '📉',
    available: true,
    category: 'visualization'
  },
  {
    id: 'systemStatus',
    name: 'System Status',
    description: 'Monitor component health and status',
    icon: '🔍',
    available: true,
    category: 'visualization'
  },
  // Advanced HUDs
  {
    id: 'timelineAnimation',
    name: 'Timeline Animation',
    description: 'Control and edit animations with keyframes',
    icon: '⏱️',
    available: true,
    category: 'advanced'
  },
  {
    id: 'networkMonitor',
    name: 'Network Monitor',
    description: 'Monitor API calls and network performance',
    icon: '📡',
    available: true,
    category: 'advanced'
  }
];

// Default available HUDs for DEV mode
const DEFAULT_DEV_HUDS = [
  {
    id: 'consoleLogger',
    name: 'Console & Logger',
    description: 'Interactive console with logging capabilities',
    available: true,
    icon: '💻'
  },
  {
    id: 'shaderLab',
    name: 'Shader Lab',
    description: 'Real-time GLSL editing with live preview',
    available: true,
    icon: '🔆'
  },
  {
    id: 'particleDesigner',
    name: 'Particle Designer',
    description: 'Advanced particle system configuration',
    available: true,
    icon: '✨'
  },
  {
    id: 'componentInspector',
    name: 'Component Inspector',
    description: 'View and modify all objects',
    available: true,
    icon: '🔧'
  },
  {
    id: 'profiler',
    name: 'Rendering Profiler',
    description: 'Detailed performance analysis',
    available: true,
    icon: '📈'
  },
  {
    id: 'particles',
    name: 'Particle Visualizer',
    description: 'Visualize particle systems and distribution',
    available: true,
    icon: '✨',
    category: 'visualization'
  },
  {
    id: 'materialInspector',
    name: 'Material Inspector',
    description: 'View and edit material properties',
    icon: '🎨',
    available: true,
    category: 'advanced'
  },
  {
    id: 'scrollPosition',
    name: 'Scroll Position',
    description: 'Track scroll position and section visibility',
    icon: '📜',
    available: true,
    category: 'mini'
  },
  {
    id: 'routeNavigator',
    name: 'Route Navigator',
    description: 'Visualize and navigate application routes',
    icon: '🧭',
    available: true,
    category: 'visualization'
  }
];

/**
 * HUDSelector component
 * Allows users to select which HUDs to display
 */
const HUDSelector = ({
  mode = 'DEBUG',
  activeHUDs = [],
  onToggleHUD,
  visualParams,
  isEmbedded = true // Flag to determine if embedded in ModeSwitcher
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [internalActiveHUDs, setInternalActiveHUDs] = useState(activeHUDs);
  
  // Choose HUD list based on mode
  const availableHUDs = mode === 'DEBUG' ? DEFAULT_DEBUG_HUDS : DEFAULT_DEV_HUDS;
  
  // Update internal state when activeHUDs prop changes
  useEffect(() => {
    setInternalActiveHUDs(activeHUDs);
  }, [activeHUDs]);
  
  // Filter HUDs based on search term
  const filteredHUDs = availableHUDs.filter(hud => 
    hud.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hud.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle HUD toggle
  const handleToggleHUD = (hudId) => {
    const isActive = internalActiveHUDs.includes(hudId);
    const newActiveHUDs = isActive
      ? internalActiveHUDs.filter(id => id !== hudId)
      : [...internalActiveHUDs, hudId];
    
    setInternalActiveHUDs(newActiveHUDs);
    
    if (onToggleHUD) {
      onToggleHUD(newActiveHUDs);
    }
    
    // Also save to localStorage for persistence
    try {
      localStorage.setItem(`cosmic_explorer_${mode.toLowerCase()}_huds`, JSON.stringify(newActiveHUDs));
    } catch (error) {
      console.error('Error saving HUD state to localStorage:', error);
    }
  };
  
  return (
    <div className="hud-selector-panel">
      <div className="hud-selector-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search HUDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="hud-count">
          {internalActiveHUDs.filter(id => id !== 'selector').length}/{availableHUDs.filter(h => h.available).length}
        </div>
      </div>
      
      <div className="hud-grid">
        {filteredHUDs.map(hud => (
          <div 
            key={hud.id}
            className={`hud-item ${internalActiveHUDs.includes(hud.id) ? 'active' : ''} ${!hud.available ? 'disabled' : ''}`}
            onClick={() => hud.available && handleToggleHUD(hud.id)}
          >
            <div className="hud-icon">{hud.icon}</div>
            <div className="hud-details">
              <div className="hud-name">{hud.name}</div>
              <div className="hud-description">{hud.description}</div>
              {!hud.available && <div className="hud-status">Coming soon</div>}
            </div>
            <div className="hud-toggle">
              {hud.available ? (internalActiveHUDs.includes(hud.id) ? '✓' : '○') : '•'}
            </div>
          </div>
        ))}
        
        {filteredHUDs.length === 0 && (
          <div className="no-results">
            No HUDs match your search
          </div>
        )}
      </div>
      
      <style jsx>{`
        .hud-selector-panel {
          padding: 4px;
          color: white;
          font-size: 12px;
        }
        
        .hud-selector-header {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .search-container {
          flex: 1;
        }
        
        .search-input {
          width: 100%;
          background: rgba(30, 30, 40, 0.5);
          border: 1px solid rgba(80, 80, 100, 0.5);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
        }
        
        .hud-count {
          background: rgba(40, 40, 60, 0.5);
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.8);
          white-space: nowrap;
        }
        
        .hud-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          max-height: 160px;
          overflow-y: auto;
        }
        
        .hud-item {
          display: flex;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
          background: rgba(40, 40, 60, 0.3);
          align-items: center;
          transition: background 0.2s;
        }
        
        .hud-item:hover {
          background: rgba(50, 50, 70, 0.4);
        }
        
        .hud-item.active {
          background: rgba(60, 80, 180, 0.3);
          border-left: 2px solid rgba(80, 120, 255, 0.8);
        }
        
        .hud-item.disabled {
          opacity: 0.5;
          cursor: default;
        }
        
        .hud-icon {
          margin-right: 6px;
          font-size: 14px;
          width: 20px;
          text-align: center;
        }
        
        .hud-details {
          flex: 1;
          min-width: 0;
        }
        
        .hud-name {
          font-weight: 500;
          font-size: 11px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .hud-description {
          font-size: 9px;
          color: #aaa;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .hud-status {
          font-size: 9px;
          color: #ffaa44;
          margin-top: 2px;
        }
        
        .hud-toggle {
          margin-left: 4px;
          width: 16px;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .no-results {
          grid-column: span 2;
          text-align: center;
          padding: 12px;
          color: #aaa;
          font-size: 11px;
        }
      `}</style>
    </div>
  );
};

HUDSelector.propTypes = {
  mode: PropTypes.string,
  activeHUDs: PropTypes.arrayOf(PropTypes.string),
  onToggleHUD: PropTypes.func,
  visualParams: PropTypes.object,
  isEmbedded: PropTypes.bool
};

export default HUDSelector; 