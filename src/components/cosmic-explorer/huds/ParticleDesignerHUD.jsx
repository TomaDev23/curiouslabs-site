/**
 * ParticleDesignerHUD.jsx
 * Component for designing and configuring particle systems
 * LEGIT compliance: UI5
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_particle_designer_hud',
  ui: 'UI5',
  type: 'development',
  doc: 'contract_particle_designer_hud.md'
};

// Default particle system configuration
const DEFAULT_PARTICLE_CONFIG = {
  emitter: {
    type: 'point',
    position: { x: 0, y: 0, z: 0 },
    rate: 200,
    lifetime: 3,
    lifetimeVariance: 0.5,
    maxParticles: 5000,
    burst: false,
    burstCount: 1000
  },
  behavior: {
    velocity: { x: 0, y: 2, z: 0 },
    velocityVariance: { x: 1, y: 0.5, z: 1 },
    acceleration: { x: 0, y: -0.1, z: 0 },
    drag: 0.01,
    turbulence: 0.5,
    spin: 0,
    spinVariance: 0.2
  },
  appearance: {
    texture: 'particle01.png',
    color: '#ffffff',
    size: 1,
    sizeVariance: 0.2,
    endSize: 0.5,
    opacity: 1,
    endOpacity: 0,
    blending: 'additive',
    glow: true
  }
};

// Emitter types
const EMITTER_TYPES = [
  { id: 'point', name: 'Point', icon: '●' },
  { id: 'box', name: 'Box', icon: '■' },
  { id: 'sphere', name: 'Sphere', icon: '○' },
  { id: 'disc', name: 'Disc', icon: '◓' },
  { id: 'line', name: 'Line', icon: '─' }
];

// EmitterPanel component for configuring particle emitter properties
const EmitterPanel = ({ config, onChange }) => {
  const handleEmitterTypeChange = (type) => {
    onChange({
      ...config,
      type
    });
  };
  
  const handleValueChange = (property, value) => {
    onChange({
      ...config,
      [property]: value
    });
  };
  
  return (
    <div className="emitter-panel">
      <div className="panel-section">
        <h3>Emitter Type</h3>
        <div className="emitter-type-selector">
          {EMITTER_TYPES.map(type => (
            <button
              key={type.id}
              className={`type-button ${config.type === type.id ? 'active' : ''}`}
              onClick={() => handleEmitterTypeChange(type.id)}
              title={type.name}
            >
              <span className="type-icon">{type.icon}</span>
              <span className="type-name">{type.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Emission</h3>
        <div className="property-row">
          <label>Rate (particles/s)</label>
          <div className="input-group">
            <input
              type="range"
              min="1"
              max="1000"
              step="1"
              value={config.rate}
              onChange={(e) => handleValueChange('rate', parseInt(e.target.value))}
            />
            <input
              type="number"
              value={config.rate}
              onChange={(e) => handleValueChange('rate', parseInt(e.target.value))}
              min="1"
              max="1000"
              className="number-input"
            />
          </div>
        </div>
        
        <div className="property-row">
          <label>Max Particles</label>
          <div className="input-group">
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={config.maxParticles}
              onChange={(e) => handleValueChange('maxParticles', parseInt(e.target.value))}
            />
            <input
              type="number"
              value={config.maxParticles}
              onChange={(e) => handleValueChange('maxParticles', parseInt(e.target.value))}
              min="100"
              max="10000"
              step="100"
              className="number-input"
            />
          </div>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Lifetime</h3>
        <div className="property-row">
          <label>Particle Lifetime (s)</label>
          <div className="input-group">
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={config.lifetime}
              onChange={(e) => handleValueChange('lifetime', parseFloat(e.target.value))}
            />
            <input
              type="number"
              value={config.lifetime}
              onChange={(e) => handleValueChange('lifetime', parseFloat(e.target.value))}
              min="0.1"
              max="10"
              step="0.1"
              className="number-input"
            />
          </div>
        </div>
        
        <div className="property-row">
          <label>Lifetime Variance</label>
          <div className="input-group">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={config.lifetimeVariance}
              onChange={(e) => handleValueChange('lifetimeVariance', parseFloat(e.target.value))}
            />
            <input
              type="number"
              value={config.lifetimeVariance}
              onChange={(e) => handleValueChange('lifetimeVariance', parseFloat(e.target.value))}
              min="0"
              max="1"
              step="0.05"
              className="number-input"
            />
          </div>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Burst Mode</h3>
        <div className="property-row">
          <label>Emit as Burst</label>
          <input
            type="checkbox"
            checked={config.burst}
            onChange={(e) => handleValueChange('burst', e.target.checked)}
            className="checkbox-input"
          />
        </div>
        
        {config.burst && (
          <div className="property-row">
            <label>Burst Count</label>
            <div className="input-group">
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={config.burstCount}
                onChange={(e) => handleValueChange('burstCount', parseInt(e.target.value))}
              />
              <input
                type="number"
                value={config.burstCount}
                onChange={(e) => handleValueChange('burstCount', parseInt(e.target.value))}
                min="10"
                max="5000"
                step="10"
                className="number-input"
              />
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .emitter-panel {
          padding: 16px;
          overflow-y: auto;
          height: 100%;
        }
        
        .panel-section {
          margin-bottom: 24px;
          background: rgba(40, 44, 52, 0.4);
          border-radius: 6px;
          padding: 12px;
        }
        
        .panel-section h3 {
          margin-top: 0;
          margin-bottom: 12px;
          color: #a0c0e0;
          font-size: 14px;
          border-bottom: 1px solid rgba(60, 80, 120, 0.4);
          padding-bottom: 6px;
        }
        
        .emitter-type-selector {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .type-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px;
          background: rgba(50, 55, 65, 0.6);
          border: 1px solid #3a3f4b;
          border-radius: 4px;
          color: #d0d0d0;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .type-button:hover {
          background: rgba(60, 70, 90, 0.6);
        }
        
        .type-button.active {
          background: rgba(60, 100, 150, 0.4);
          border-color: #4a80f0;
        }
        
        .type-icon {
          font-size: 20px;
          margin-bottom: 4px;
        }
        
        .type-name {
          font-size: 12px;
        }
        
        .property-row {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .property-row label {
          flex: 1;
          font-size: 13px;
          color: #c0c0c0;
        }
        
        .input-group {
          flex: 2;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .input-group input[type="range"] {
          flex: 1;
          height: 4px;
          -webkit-appearance: none;
          background: rgba(40, 60, 100, 0.4);
          border-radius: 2px;
        }
        
        .input-group input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #4a80f0;
          cursor: pointer;
        }
        
        .number-input {
          width: 60px;
          padding: 4px;
          background: rgba(30, 34, 42, 0.8);
          border: 1px solid #3a3f4b;
          border-radius: 4px;
          color: #e0e0e0;
          font-family: 'Roboto Mono', monospace;
          font-size: 12px;
        }
        
        .checkbox-input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

/**
 * ParticleDesignerHUD component
 */
const ParticleDesignerHUD = ({
  initialPosition,
  onPositionChange,
  onClose,
  visualParams
}) => {
  const [activeTab, setActiveTab] = useState('emitter');
  const [particleConfig, setParticleConfig] = useState(DEFAULT_PARTICLE_CONFIG);
  
  const handleEmitterConfigChange = (emitterConfig) => {
    setParticleConfig({
      ...particleConfig,
      emitter: emitterConfig
    });
  };
  
  return (
    <DraggableHUD
      title="Particle Designer"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={700}
      height={600}
    >
      <div className="particle-designer-hud">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'emitter' ? 'active' : ''}`}
            onClick={() => setActiveTab('emitter')}
          >
            Emitter
          </button>
          <button 
            className={`tab-button ${activeTab === 'behavior' ? 'active' : ''}`}
            onClick={() => setActiveTab('behavior')}
          >
            Behavior
          </button>
          <button 
            className={`tab-button ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
          <button 
            className={`tab-button ${activeTab === 'presets' ? 'active' : ''}`}
            onClick={() => setActiveTab('presets')}
          >
            Presets
          </button>
        </div>
        
        <div className="content">
          {activeTab === 'emitter' ? (
            <EmitterPanel 
              config={particleConfig.emitter}
              onChange={handleEmitterConfigChange}
            />
          ) : (
            <div className="message">
              <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} panel coming soon!</p>
            </div>
          )}
        </div>
        
        <div className="preview-bar">
          <div className="preview-controls">
            <button className="preview-button">
              <span className="icon">▶</span> Preview
            </button>
            <button className="preview-button">
              <span className="icon">⟳</span> Reset
            </button>
          </div>
          <div className="status">
            <span className="status-item">Particles: {particleConfig.emitter.maxParticles}</span>
            <span className="status-item">Emitter: {particleConfig.emitter.type}</span>
            <span className="status-item">FPS: 60</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .particle-designer-hud {
          display: flex;
          flex-direction: column;
          height: 100%;
          color: #e0e0e0;
          background: rgba(30, 34, 42, 0.8);
        }
        
        .tabs {
          display: flex;
          background: rgba(35, 39, 47, 0.6);
          border-bottom: 1px solid #3a3f4b;
        }
        
        .tab-button {
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: #b0b0b0;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .tab-button:hover {
          background: rgba(60, 70, 90, 0.4);
          color: #e0e0e0;
        }
        
        .tab-button.active {
          background: rgba(60, 70, 90, 0.6);
          color: #e0e0e0;
          border-bottom: 2px solid #4a80f0;
        }
        
        .content {
          flex: 1;
          overflow: hidden;
        }
        
        .message {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          color: #a0a0a0;
        }
        
        .preview-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: rgba(30, 35, 45, 0.8);
          border-top: 1px solid #3a3f4b;
        }
        
        .preview-controls {
          display: flex;
          gap: 8px;
        }
        
        .preview-button {
          display: flex;
          align-items: center;
          padding: 6px 10px;
          background: rgba(50, 60, 90, 0.6);
          border: 1px solid #4a5366;
          border-radius: 4px;
          color: #e0e0e0;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .preview-button:hover {
          background: rgba(60, 70, 110, 0.8);
        }
        
        .icon {
          margin-right: 4px;
        }
        
        .status {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #a0a0a0;
        }
        
        .status-item {
          padding: 2px 6px;
          background: rgba(40, 45, 60, 0.6);
          border-radius: 4px;
        }
      `}</style>
    </DraggableHUD>
  );
};

ParticleDesignerHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  visualParams: PropTypes.object
};

ParticleDesignerHUD.defaultProps = {
  initialPosition: { x: 50, y: 50 },
  onPositionChange: () => {},
  onClose: () => {},
  visualParams: {}
};

export default ParticleDesignerHUD; 