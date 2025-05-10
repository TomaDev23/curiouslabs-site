/**
 * ModeSwitcher.jsx
 * Simple mode switcher for the Cosmic Explorer
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
    description: 'Technical visualization overlays',
    shortcut: '3'
  },
  DEV: {
    label: 'DEV',
    description: 'Advanced developer tools',
    shortcut: '4'
  }
};

/**
 * ModeSwitcher component
 * Provides UI for switching between different explorer modes
 */
const ModeSwitcher = ({ currentMode, onModeChange }) => {
  return (
    <div className="mode-switcher">
      <div className="mode-tabs">
        {Object.entries(MODES).map(([mode, info]) => (
          <button
            key={mode}
            className={`mode-tab ${currentMode === mode ? 'active' : ''}`}
            onClick={() => onModeChange(mode)}
          >
            {info.label}
            <span className="shortcut-hint">{info.shortcut}</span>
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .mode-switcher {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .mode-tabs {
          display: flex;
          gap: 2px;
          background: rgba(20, 20, 30, 0.7);
          padding: 2px;
          border-radius: 6px;
        }
        
        .mode-tab {
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
        
        .mode-tab:hover {
          background: rgba(60, 60, 80, 0.7);
          color: white;
        }
        
        .mode-tab.active {
          background: rgba(60, 80, 180, 0.7);
          color: white;
        }
        
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
  onModeChange: PropTypes.func.isRequired
};

export default ModeSwitcher; 