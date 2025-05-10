/**
 * SystemStatusHUD.jsx
 * System component status visualization
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_system_status_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_system_status_hud.md'
};

/**
 * SystemStatusHUD component
 * Visualizes system component status and health
 */
const SystemStatusHUD = ({
  initialPosition = { x: 20, y: 400 },
  onPositionChange,
  onClose
}) => {
  // System components with status (mocked data)
  const [systemComponents, setSystemComponents] = useState({
    renderer: {
      name: 'Rendering Pipeline',
      status: 'healthy', // healthy, warning, error, inactive
      uptime: 1243,
      subComponents: {
        webgl: {
          name: 'WebGL Engine',
          status: 'healthy',
          metrics: { fps: 60, drawCalls: 156 }
        },
        materials: {
          name: 'Material System',
          status: 'healthy',
          metrics: { active: 24, cached: 42 }
        },
        geometry: {
          name: 'Geometry Manager',
          status: 'warning',
          metrics: { vertices: '2.4M', indices: '3.2M' },
          message: 'High vertex count'
        }
      }
    },
    physics: {
      name: 'Physics Engine',
      status: 'healthy',
      uptime: 1242,
      subComponents: {
        collision: {
          name: 'Collision Detection',
          status: 'healthy',
          metrics: { checks: 1240, active: 86 }
        },
        dynamics: {
          name: 'Dynamics Solver',
          status: 'healthy',
          metrics: { bodies: 24, constraints: 16 }
        }
      }
    },
    assets: {
      name: 'Asset Manager',
      status: 'healthy',
      uptime: 1243,
      subComponents: {
        textures: {
          name: 'Texture Cache',
          status: 'healthy',
          metrics: { loaded: 48, pending: 0 }
        },
        models: {
          name: 'Model Cache',
          status: 'healthy',
          metrics: { loaded: 12, pending: 0 }
        },
        sounds: {
          name: 'Audio Cache',
          status: 'warning',
          metrics: { loaded: 8, pending: 3 },
          message: 'Pending audio assets'
        }
      }
    },
    input: {
      name: 'Input System',
      status: 'healthy',
      uptime: 1243,
      subComponents: {
        keyboard: {
          name: 'Keyboard Handler',
          status: 'healthy',
          metrics: { events: 86, listeners: 12 }
        },
        mouse: {
          name: 'Mouse Handler',
          status: 'healthy',
          metrics: { events: 124, listeners: 8 }
        },
        touch: {
          name: 'Touch Handler',
          status: 'inactive',
          metrics: { events: 0, listeners: 4 }
        }
      }
    },
    network: {
      name: 'Network Services',
      status: 'error',
      uptime: 850,
      message: 'Connection timeout',
      subComponents: {
        api: {
          name: 'API Service',
          status: 'error',
          metrics: { requests: 24, failed: 8 },
          message: 'Timeout'
        },
        assets: {
          name: 'Asset Downloader',
          status: 'warning',
          metrics: { downloaded: 44, pending: 6 },
          message: 'Slow download speed'
        },
        websocket: {
          name: 'WebSocket',
          status: 'error',
          metrics: { reconnects: 3, messages: 0 },
          message: 'Connection lost'
        }
      }
    }
  });
  
  // Display settings
  const [expandedSections, setExpandedSections] = useState(['renderer']);
  const [showMetrics, setShowMetrics] = useState(true);
  const [refreshRate, setRefreshRate] = useState(2000);
  const [viewMode, setViewMode] = useState('hierarchical'); // hierarchical, list
  
  // Mock system component updates for demo
  useEffect(() => {
    const simulateStatusChanges = () => {
      // Clone the state for modification
      const updatedComponents = JSON.parse(JSON.stringify(systemComponents));
      
      // Randomly update some metrics and statuses
      const randomUpdate = () => {
        // Network status changes
        if (Math.random() < 0.3) {
          const networkStatus = ['error', 'warning', 'healthy'][Math.floor(Math.random() * 3)];
          updatedComponents.network.status = networkStatus;
          
          // Propagate to subcomponents
          if (networkStatus === 'error') {
            updatedComponents.network.message = 'Connection timeout';
            updatedComponents.network.subComponents.api.status = 'error';
            updatedComponents.network.subComponents.api.message = 'Timeout';
            updatedComponents.network.subComponents.websocket.status = 'error';
            updatedComponents.network.subComponents.websocket.message = 'Connection lost';
          } else if (networkStatus === 'warning') {
            updatedComponents.network.message = 'High latency';
            updatedComponents.network.subComponents.api.status = 'warning';
            updatedComponents.network.subComponents.api.message = 'Slow response';
            updatedComponents.network.subComponents.websocket.status = 'warning';
            updatedComponents.network.subComponents.websocket.message = 'Packet loss';
          } else {
            updatedComponents.network.message = null;
            updatedComponents.network.subComponents.api.status = 'healthy';
            updatedComponents.network.subComponents.api.message = null;
            updatedComponents.network.subComponents.websocket.status = 'healthy';
            updatedComponents.network.subComponents.websocket.message = null;
          }
        }
        
        // Renderer FPS changes
        if (Math.random() < 0.5) {
          const fps = Math.floor(50 + Math.random() * 20);
          updatedComponents.renderer.subComponents.webgl.metrics.fps = fps;
          
          if (fps < 55) {
            updatedComponents.renderer.subComponents.webgl.status = 'warning';
            updatedComponents.renderer.status = 'warning';
          } else {
            updatedComponents.renderer.subComponents.webgl.status = 'healthy';
            
            // Check if we need to keep renderer in warning state due to geometry
            if (updatedComponents.renderer.subComponents.geometry.status !== 'warning') {
              updatedComponents.renderer.status = 'healthy';
            }
          }
        }
        
        // Physics load changes
        if (Math.random() < 0.3) {
          const bodies = Math.floor(20 + Math.random() * 10);
          updatedComponents.physics.subComponents.dynamics.metrics.bodies = bodies;
          
          if (bodies > 26) {
            updatedComponents.physics.subComponents.dynamics.status = 'warning';
            updatedComponents.physics.subComponents.dynamics.message = 'High body count';
            updatedComponents.physics.status = 'warning';
          } else {
            updatedComponents.physics.subComponents.dynamics.status = 'healthy';
            updatedComponents.physics.subComponents.dynamics.message = null;
            updatedComponents.physics.status = 'healthy';
          }
        }
        
        // Update uptimes
        Object.keys(updatedComponents).forEach(key => {
          if (updatedComponents[key].uptime) {
            updatedComponents[key].uptime += refreshRate / 1000;
          }
        });
      };
      
      randomUpdate();
      setSystemComponents(updatedComponents);
    };
    
    // Set up interval for data updates
    const intervalId = setInterval(simulateStatusChanges, refreshRate);
    
    return () => clearInterval(intervalId);
  }, [systemComponents, refreshRate]);
  
  // Format uptime from seconds to readable format
  const formatUptime = (seconds) => {
    if (!seconds && seconds !== 0) return 'N/A';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };
  
  // Get CSS classes based on status
  const getStatusClass = (status) => {
    switch (status) {
      case 'healthy': return 'status-healthy';
      case 'warning': return 'status-warning';
      case 'error': return 'status-error';
      case 'inactive': return 'status-inactive';
      default: return '';
    }
  };
  
  // Toggle section expansion
  const toggleSection = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };
  
  // Count issues by severity
  const countIssues = () => {
    let errors = 0;
    let warnings = 0;
    
    // Helper function to recursively count issues
    const countComponentIssues = (component) => {
      if (component.status === 'error') errors++;
      if (component.status === 'warning') warnings++;
      
      if (component.subComponents) {
        Object.values(component.subComponents).forEach(countComponentIssues);
      }
    };
    
    // Count issues in all root components
    Object.values(systemComponents).forEach(countComponentIssues);
    
    return { errors, warnings };
  };
  
  const { errors, warnings } = countIssues();
  
  // Render a component and its subcomponents
  const renderComponent = (key, component, depth = 0) => {
    const isExpanded = expandedSections.includes(key);
    const hasSubComponents = component.subComponents && Object.keys(component.subComponents).length > 0;
    const paddingLeft = depth * 16;
    
    return (
      <div key={key} className="component-item">
        <div 
          className={`component-header ${getStatusClass(component.status)}`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          {/* Expand/collapse button */}
          {hasSubComponents && (
            <button 
              className={`expand-button ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleSection(key)}
            >
              {isExpanded ? '▼' : '►'}
            </button>
          )}
          
          {/* Status indicator */}
          <div className={`status-indicator ${getStatusClass(component.status)}`}></div>
          
          {/* Component name */}
          <div className="component-name">{component.name}</div>
          
          {/* Component message (if any) */}
          {component.message && (
            <div className="component-message">{component.message}</div>
          )}
          
          {/* Metrics (if enabled) */}
          {showMetrics && component.metrics && (
            <div className="metrics-container">
              {Object.entries(component.metrics).map(([key, value]) => (
                <div key={key} className="metric-item">
                  <span className="metric-key">{key}:</span>
                  <span className="metric-value">{value}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Uptime (if available) */}
          {component.uptime && (
            <div className="uptime">{formatUptime(component.uptime)}</div>
          )}
        </div>
        
        {/* Render subcomponents if expanded */}
        {isExpanded && hasSubComponents && (
          <div className="subcomponents">
            {Object.entries(component.subComponents).map(([subKey, subComponent]) => 
              renderComponent(`${key}.${subKey}`, subComponent, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };
  
  // Render components based on view mode
  const renderComponents = () => {
    if (viewMode === 'hierarchical') {
      return Object.entries(systemComponents).map(([key, component]) => 
        renderComponent(key, component)
      );
    } else {
      // Flatten the hierarchy for list view
      const flatList = [];
      
      const flattenComponents = (key, component, parentKeys = []) => {
        const fullKey = [...parentKeys, key].join('.');
        flatList.push({ key: fullKey, component });
        
        if (component.subComponents) {
          Object.entries(component.subComponents).forEach(([subKey, subComponent]) => 
            flattenComponents(subKey, subComponent, [...parentKeys, key])
          );
        }
      };
      
      Object.entries(systemComponents).forEach(([key, component]) => 
        flattenComponents(key, component)
      );
      
      return flatList.map(item => (
        <div key={item.key} className={`list-item ${getStatusClass(item.component.status)}`}>
          <div className={`status-indicator ${getStatusClass(item.component.status)}`}></div>
          <div className="component-name">{item.component.name}</div>
          {item.component.message && (
            <div className="component-message">{item.component.message}</div>
          )}
        </div>
      ));
    }
  };
  
  return (
    <DraggableHUD
      title="System Status"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={380}
      height={450}
      className="system-status-hud"
    >
      <div className="system-status-content">
        {/* Status summary */}
        <div className="status-summary">
          <div className={`summary-item ${errors > 0 ? 'has-issues' : ''}`}>
            <div className="summary-count">{errors}</div>
            <div className="summary-label">Errors</div>
          </div>
          <div className={`summary-item ${warnings > 0 ? 'has-issues' : ''}`}>
            <div className="summary-count">{warnings}</div>
            <div className="summary-label">Warnings</div>
          </div>
          <div className="summary-item">
            <div className="summary-count">
              {Object.keys(systemComponents).length}
            </div>
            <div className="summary-label">Systems</div>
          </div>
          <div className="controls">
            <button 
              className={`control-button ${showMetrics ? 'active' : ''}`}
              onClick={() => setShowMetrics(!showMetrics)}
              title="Toggle metrics display"
            >
              {showMetrics ? 'Hide Metrics' : 'Show Metrics'}
            </button>
            <select
              className="refresh-select"
              value={refreshRate}
              onChange={(e) => setRefreshRate(Number(e.target.value))}
              title="Update frequency"
            >
              <option value="1000">Fast (1s)</option>
              <option value="2000">Normal (2s)</option>
              <option value="5000">Slow (5s)</option>
            </select>
            <select
              className="view-select"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              title="View mode"
            >
              <option value="hierarchical">Tree</option>
              <option value="list">List</option>
            </select>
          </div>
        </div>
        
        {/* Components list */}
        <div className="components-container">
          {renderComponents()}
        </div>
      </div>
      
      <style jsx>{`
        .system-status-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 8px;
          padding: 0 6px;
        }
        
        .status-summary {
          display: flex;
          gap: 8px;
          padding: 8px;
          background: rgba(30, 30, 40, 0.6);
          border-radius: 4px;
          flex-wrap: wrap;
        }
        
        .summary-item {
          flex: 1;
          min-width: 80px;
          text-align: center;
          background: rgba(40, 40, 60, 0.4);
          border-radius: 4px;
          padding: 8px 4px;
        }
        
        .summary-count {
          font-size: 18px;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .summary-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 2px;
        }
        
        .has-issues.summary-item {
          background: rgba(60, 40, 40, 0.5);
        }
        
        .has-issues .summary-count {
          color: rgba(255, 180, 180, 0.9);
        }
        
        .controls {
          display: flex;
          gap: 6px;
          flex-basis: 100%;
          margin-top: 8px;
        }
        
        .control-button {
          flex: 1;
          background: rgba(40, 45, 60, 0.4);
          border: 1px solid rgba(100, 100, 140, 0.3);
          color: rgba(255, 255, 255, 0.8);
          font-size: 10px;
          padding: 3px 0;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .control-button:hover {
          background: rgba(50, 55, 75, 0.6);
        }
        
        .control-button.active {
          background: rgba(60, 100, 160, 0.4);
          border-color: rgba(120, 160, 240, 0.4);
        }
        
        .refresh-select, .view-select {
          background: rgba(40, 45, 60, 0.4);
          border: 1px solid rgba(100, 100, 140, 0.3);
          color: rgba(255, 255, 255, 0.8);
          font-size: 10px;
          padding: 3px 6px;
          border-radius: 3px;
          outline: none;
        }
        
        .components-container {
          flex-grow: 1;
          overflow-y: auto;
          background: rgba(30, 30, 40, 0.6);
          border-radius: 4px;
          padding: 6px;
        }
        
        .component-item {
          margin-bottom: 2px;
        }
        
        .component-header {
          display: flex;
          align-items: center;
          padding: 6px 8px;
          border-radius: 4px;
          background: rgba(40, 40, 60, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .expand-button {
          background: none;
          border: none;
          color: rgba(200, 200, 255, 0.6);
          font-size: 9px;
          cursor: pointer;
          padding: 0;
          margin-right: 4px;
          width: 14px;
          text-align: center;
        }
        
        .expand-button:hover {
          color: rgba(255, 255, 255, 0.9);
        }
        
        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .component-name {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.9);
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .component-message {
          font-size: 9px;
          margin-left: 8px;
          padding: 1px 4px;
          border-radius: 2px;
          background: rgba(0, 0, 0, 0.2);
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .metrics-container {
          display: flex;
          margin-left: 8px;
          gap: 8px;
        }
        
        .metric-item {
          font-size: 9px;
          color: rgba(200, 200, 255, 0.8);
          background: rgba(30, 30, 50, 0.5);
          padding: 1px 4px;
          border-radius: 2px;
        }
        
        .metric-key {
          color: rgba(180, 180, 220, 0.7);
          margin-right: 2px;
        }
        
        .uptime {
          font-size: 9px;
          color: rgba(170, 255, 170, 0.8);
          margin-left: 8px;
        }
        
        .subcomponents {
          margin-left: 16px;
        }
        
        .list-item {
          display: flex;
          align-items: center;
          padding: 6px 8px;
          border-radius: 4px;
          background: rgba(40, 40, 60, 0.4);
          margin-bottom: 2px;
        }
        
        /* Status colors */
        .status-healthy {
          border-left: 2px solid rgba(100, 220, 100, 0.7);
        }
        
        .status-healthy .status-indicator {
          background: rgba(100, 220, 100, 0.7);
          box-shadow: 0 0 6px rgba(100, 220, 100, 0.7);
        }
        
        .status-warning {
          border-left: 2px solid rgba(220, 180, 60, 0.7);
        }
        
        .status-warning .status-indicator {
          background: rgba(220, 180, 60, 0.7);
          box-shadow: 0 0 6px rgba(220, 180, 60, 0.7);
        }
        
        .status-warning .component-message {
          color: rgba(255, 220, 100, 0.9);
        }
        
        .status-error {
          border-left: 2px solid rgba(220, 60, 60, 0.7);
          background: rgba(60, 30, 30, 0.4);
        }
        
        .status-error .status-indicator {
          background: rgba(220, 60, 60, 0.7);
          box-shadow: 0 0 6px rgba(220, 60, 60, 0.7);
        }
        
        .status-error .component-message {
          color: rgba(255, 150, 150, 0.9);
          background: rgba(60, 20, 20, 0.4);
        }
        
        .status-inactive {
          border-left: 2px solid rgba(150, 150, 150, 0.5);
          opacity: 0.7;
        }
        
        .status-inactive .status-indicator {
          background: rgba(150, 150, 150, 0.5);
        }
      `}</style>
    </DraggableHUD>
  );
};

SystemStatusHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default SystemStatusHUD; 