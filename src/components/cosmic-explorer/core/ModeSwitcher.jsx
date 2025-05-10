/**
 * ModeSwitcher.jsx
 * Mode switching and submenu controller for the Cosmic Explorer
 * LEGIT compliance: UI5
 */
import React from 'react';
import PropTypes from 'prop-types';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_mode_switcher',
  ui: 'UI5',
  type: 'control',
  doc: 'contract_mode_switcher.md'
};

// Mode definitions
const MODES = {
  SHOW: {
    label: 'SHOW',
    description: 'Professional sequence visualization',
    shortcut: '1'
  },
  SANDBOX: {
    label: 'SANDBOX',
    description: 'Interactive parameter adjustment',
    shortcut: '2'
  },
  DEBUG: {
    label: 'DEBUG',
    description: 'Technical visualization tools',
    shortcut: '3'
  },
  DEV: {
    label: 'DEV',
    description: 'Advanced developer features',
    shortcut: '4'
  }
};

// Submenu tabs - only for SHOW and SANDBOX modes
const SUBMENU_TABS = [
  { id: 'scene', label: 'Scene', shortcut: '1' },
  { id: 'camera', label: 'Camera', shortcut: '2' },
  { id: 'visual', label: 'Visual', shortcut: '3' },
  { id: 'mode', label: 'Mode', shortcut: '4' }
];

/**
 * ModeSwitcher component
 * Provides UI for switching between different explorer modes
 */
const ModeSwitcher = ({ 
  currentMode, 
  onModeChange, 
  activeTab, 
  onTabChange,
  hudSelectorContent
}) => {
  // Determine if we should show submenu tabs (only for SHOW and SANDBOX modes)
  const showSubmenuTabs = currentMode === 'SHOW' || currentMode === 'SANDBOX';
  
  return (
    <div className="mode-switcher">
      {/* Main mode tabs at the top */}
      <div className="main-mode-container">
        <div className="main-mode-tabs">
          {Object.entries(MODES).map(([mode, info]) => (
            <button
              key={mode}
              className={`main-mode-tab ${currentMode === mode ? 'active' : ''}`}
              onClick={() => onModeChange(mode)}
            >
              {info.label}
              <span className="shortcut-hint">{info.shortcut}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Conditional submenu tabs */}
      {showSubmenuTabs && (
        <div className="submenu-container">
          <div className="submenu-tabs">
            {SUBMENU_TABS.map(tab => (
              <button
                key={tab.id}
                className={`submenu-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label} ({tab.shortcut})
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Mode features / HUD selector area */}
      <div className="mode-features">
        <div className="features-header">
          {currentMode === 'SHOW' && 'SHOW: Professional choreographed sequences'}
          {currentMode === 'SANDBOX' && 'SANDBOX: Interactive parameter adjustments'}
          {currentMode === 'DEBUG' && 'DEBUG: Technical visualization tools'}
          {currentMode === 'DEV' && 'DEV: Advanced developer features'}
        </div>
        
        {/* HUD Selector Content */}
        {(currentMode === 'DEBUG' || currentMode === 'DEV') && (
          <div className="hud-selector-container">
            {hudSelectorContent}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .mode-switcher {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        /* Main mode styles */
        .main-mode-container {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }
        
        .main-mode-tabs {
          display: flex;
          gap: 2px;
          background: rgba(20, 20, 30, 0.7);
          padding: 2px;
          border-radius: 6px;
        }
        
        .main-mode-tab {
          position: relative;
          background: rgba(40, 40, 60, 0.6);
          border: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .main-mode-tab:hover {
          background: rgba(60, 60, 80, 0.7);
          color: white;
        }
        
        .main-mode-tab.active {
          background: rgba(60, 80, 180, 0.7);
          color: white;
        }
        
        /* Submenu styles */
        .submenu-container {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }
        
        .submenu-tabs {
          display: flex;
          gap: 2px;
          background: rgba(20, 20, 30, 0.5);
          padding: 2px;
          border-radius: 6px;
        }
        
        .submenu-tab {
          background: rgba(40, 40, 60, 0.4);
          border: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 6px 12px;
          font-size: 13px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .submenu-tab:hover {
          background: rgba(60, 60, 80, 0.5);
          color: white;
        }
        
        .submenu-tab.active {
          background: rgba(60, 80, 180, 0.5);
          color: white;
        }
        
        /* Mode features styles */
        .mode-features {
          background: rgba(20, 20, 30, 0.7);
          border-radius: 6px;
          padding: 8px;
          margin-top: 5px;
        }
        
        .features-header {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          padding: 4px 8px;
          margin-bottom: 8px;
          border-left: 3px solid rgba(60, 80, 180, 0.7);
        }
        
        .hud-selector-container {
          margin-top: 5px;
        }
        
        /* Shortcut hints */
        .shortcut-hint {
          position: absolute;
          top: -8px;
          right: -2px;
          background: rgba(0, 0, 0, 0.6);
          color: rgba(255, 255, 255, 0.8);
          font-size: 9px;
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: normal;
        }
      `}</style>
    </div>
  );
};

ModeSwitcher.propTypes = {
  currentMode: PropTypes.string.isRequired,
  onModeChange: PropTypes.func.isRequired,
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func,
  hudSelectorContent: PropTypes.node
};

export default ModeSwitcher; 