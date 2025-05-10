/**
 * HUDSelector.jsx
 * Component for selecting which HUDs to display
 * LEGIT compliance: UI5
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_hud_selector',
  ui: 'UI5',
  type: 'control',
  doc: 'contract_hud_selector.md'
};

/**
 * HUDSelector component
 * Allows users to select which HUDs to display
 */
const HUDSelector = ({
  initialPosition = { x: 20, y: 80 },
  onPositionChange,
  onClose,
  activeHUDs = [],
  onToggleHUD,
  availableHUDs = [],
  currentMode = 'DEBUG'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter HUDs based on search term
  const filteredHUDs = availableHUDs.filter(hud => 
    hud.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hud.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle HUD toggle
  const handleToggleHUD = (hudId) => {
    if (onToggleHUD) {
      if (activeHUDs.includes(hudId)) {
        onToggleHUD(activeHUDs.filter(id => id !== hudId));
      } else {
        onToggleHUD([...activeHUDs, hudId]);
      }
    }
  };
  
  return (
    <DraggableHUD
      title={`${currentMode} Mode HUDs`}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={300}
    >
      <div className="hud-selector-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search HUDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="hud-list">
          {filteredHUDs.map(hud => (
            <div 
              key={hud.id}
              className={`hud-item ${activeHUDs.includes(hud.id) ? 'active' : ''} ${!hud.available ? 'disabled' : ''}`}
              onClick={() => hud.available && handleToggleHUD(hud.id)}
            >
              <div className="hud-icon">{hud.icon}</div>
              <div className="hud-details">
                <div className="hud-name">{hud.name}</div>
                <div className="hud-description">{hud.description}</div>
                {!hud.available && <div className="hud-status">Coming soon</div>}
              </div>
              <div className="hud-toggle">
                {hud.available ? (activeHUDs.includes(hud.id) ? '✓' : '○') : '•'}
              </div>
            </div>
          ))}
          
          {filteredHUDs.length === 0 && (
            <div className="no-results">
              No HUDs match your search
            </div>
          )}
        </div>
        
        <div className="hud-count">
          {activeHUDs.length} of {availableHUDs.filter(h => h.available).length} Available HUDs active
        </div>
      </div>
      
      <style jsx>{`
        .hud-selector-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .search-container {
          width: 100%;
        }
        
        .search-input {
          width: 100%;
          background: rgba(40, 40, 60, 0.6);
          border: 1px solid rgba(70, 80, 180, 0.4);
          border-radius: 4px;
          color: white;
          padding: 6px 10px;
          font-size: 13px;
          outline: none;
        }
        
        .search-input:focus {
          border-color: rgba(80, 100, 220, 0.8);
          background: rgba(40, 40, 60, 0.8);
        }
        
        .hud-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 300px;
          overflow-y: auto;
          padding-right: 4px;
        }
        
        .hud-list::-webkit-scrollbar {
          width: 6px;
        }
        
        .hud-list::-webkit-scrollbar-track {
          background: rgba(30, 30, 40, 0.4);
          border-radius: 3px;
        }
        
        .hud-list::-webkit-scrollbar-thumb {
          background: rgba(70, 80, 180, 0.4);
          border-radius: 3px;
        }
        
        .hud-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        
        .hud-item:hover:not(.disabled) {
          background: rgba(50, 50, 70, 0.4);
          border-color: rgba(70, 80, 180, 0.3);
        }
        
        .hud-item.active {
          background: rgba(60, 70, 140, 0.2);
          border-color: rgba(80, 100, 220, 0.5);
        }
        
        .hud-item.disabled {
          opacity: 0.6;
          cursor: default;
        }
        
        .hud-icon {
          font-size: 16px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hud-details {
          flex-grow: 1;
        }
        
        .hud-name {
          font-size: 13px;
          font-weight: 500;
          color: white;
        }
        
        .hud-description {
          font-size: 11px;
          color: #aaa;
          margin-top: 2px;
        }
        
        .hud-status {
          font-size: 10px;
          color: #ffaa44;
          margin-top: 2px;
          font-style: italic;
        }
        
        .hud-toggle {
          font-size: 14px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .hud-item.active .hud-toggle {
          color: #70b0ff;
        }
        
        .hud-item.disabled .hud-toggle {
          color: #777;
        }
        
        .no-results {
          padding: 20px;
          text-align: center;
          color: #888;
          font-style: italic;
        }
        
        .hud-count {
          font-size: 11px;
          color: #888;
          text-align: center;
          padding-top: 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </DraggableHUD>
  );
};

HUDSelector.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  activeHUDs: PropTypes.arrayOf(PropTypes.string),
  onToggleHUD: PropTypes.func,
  availableHUDs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string,
    available: PropTypes.bool
  })),
  currentMode: PropTypes.string
};

export default HUDSelector; 