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
  
  // Define styles object to avoid jsx attribute warning
  const styles = {
    modeSwitcher: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    mainModeContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px'
    },
    mainModeTabs: {
      display: 'flex',
      gap: '2px',
      background: 'rgba(20, 20, 30, 0.7)',
      padding: '2px',
      borderRadius: '6px'
    },
    mainModeTab: {
      position: 'relative',
      background: 'rgba(40, 40, 60, 0.6)',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.7)',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    mainModeTabActive: {
      background: 'rgba(60, 80, 180, 0.7)',
      color: 'white'
    },
    submenuContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px'
    },
    submenuTabs: {
      display: 'flex',
      gap: '2px',
      background: 'rgba(20, 20, 30, 0.5)',
      padding: '2px',
      borderRadius: '6px'
    },
    submenuTab: {
      background: 'rgba(40, 40, 60, 0.4)',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.7)',
      padding: '6px 12px',
      fontSize: '13px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    submenuTabActive: {
      background: 'rgba(60, 80, 180, 0.5)',
      color: 'white'
    },
    modeFeatures: {
      background: 'rgba(20, 20, 30, 0.7)',
      borderRadius: '6px',
      padding: '8px',
      marginTop: '5px'
    },
    featuresHeader: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '14px',
      padding: '4px 8px',
      marginBottom: '8px',
      borderLeft: '3px solid rgba(60, 80, 180, 0.7)'
    },
    hudSelectorContainer: {
      marginTop: '5px'
    },
    shortcutHint: {
      position: 'absolute',
      top: '-8px',
      right: '-2px',
      background: 'rgba(0, 0, 0, 0.6)',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '9px',
      padding: '1px 4px',
      borderRadius: '3px',
      fontWeight: 'normal'
    }
  };
  
  return (
    <div style={styles.modeSwitcher}>
      {/* Main mode tabs at the top */}
      <div style={styles.mainModeContainer}>
        <div style={styles.mainModeTabs}>
          {Object.entries(MODES).map(([mode, info]) => (
            <button
              key={mode}
              style={{
                ...styles.mainModeTab,
                ...(currentMode === mode ? styles.mainModeTabActive : {})
              }}
              onClick={() => onModeChange(mode)}
              onMouseEnter={(e) => {
                if (currentMode !== mode) {
                  e.target.style.background = 'rgba(60, 60, 80, 0.7)';
                  e.target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (currentMode !== mode) {
                  e.target.style.background = 'rgba(40, 40, 60, 0.6)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                }
              }}
            >
              {info.label}
              <span style={styles.shortcutHint}>{info.shortcut}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Conditional submenu tabs */}
      {showSubmenuTabs && (
        <div style={styles.submenuContainer}>
          <div style={styles.submenuTabs}>
            {SUBMENU_TABS.map(tab => (
              <button
                key={tab.id}
                style={{
                  ...styles.submenuTab,
                  ...(activeTab === tab.id ? styles.submenuTabActive : {})
                }}
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'rgba(60, 60, 80, 0.5)';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'rgba(40, 40, 60, 0.4)';
                    e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                  }
                }}
              >
                {tab.label} ({tab.shortcut})
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Mode features / HUD selector area */}
      <div style={styles.modeFeatures}>
        <div style={styles.featuresHeader}>
          {currentMode === 'SHOW' && 'SHOW: Professional choreographed sequences'}
          {currentMode === 'SANDBOX' && 'SANDBOX: Interactive parameter adjustments'}
          {currentMode === 'DEBUG' && 'DEBUG: Technical visualization tools'}
          {currentMode === 'DEV' && 'DEV: Advanced developer features'}
        </div>
        
        {/* HUD Selector Content */}
        {(currentMode === 'DEBUG' || currentMode === 'DEV') && (
          <div style={styles.hudSelectorContainer}>
            {hudSelectorContent}
          </div>
        )}
      </div>
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