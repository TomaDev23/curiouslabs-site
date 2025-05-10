/**
 * PerformanceMetricsHUD.jsx
 * Performance monitoring HUD for debugging
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_performance_metrics_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_performance_metrics_hud.md'
};

/**
 * PerformanceMetricsHUD component
 * Displays FPS, memory usage, and render statistics
 */
const PerformanceMetricsHUD = ({
  initialPosition = { x: 20, y: 20 },
  onPositionChange,
  onClose
}) => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(0);
  const [renderStats, setRenderStats] = useState({
    calls: 0,
    triangles: 0,
    points: 0,
  });
  
  const lastTimeRef = useRef(performance.now());
  const frameCountRef = useRef(0);
  const animationFrameRef = useRef(null);
  
  // FPS Counter
  useEffect(() => {
    const updateFPS = () => {
      const now = performance.now();
      frameCountRef.current++;
      
      // Update FPS every second
      if (now - lastTimeRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current)));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        
        // Get memory usage (if available)
        if (window.performance && window.performance.memory) {
          setMemory(Math.round(window.performance.memory.usedJSHeapSize / 1048576)); // Convert to MB
        }
        
        // Simulate render stats (in a real implementation, these would come from WebGL)
        // In a real implementation, these would come from WebGL renderer or Three.js stats
        setRenderStats({
          calls: Math.round(10 + Math.random() * 20),
          triangles: Math.round(10000 + Math.random() * 5000),
          points: Math.round(20000 + Math.random() * 10000),
        });
      }
      
      animationFrameRef.current = requestAnimationFrame(updateFPS);
    };
    
    // Start the FPS counter
    animationFrameRef.current = requestAnimationFrame(updateFPS);
    
    // Clean up
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <DraggableHUD
      title="Performance Metrics"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={280}
    >
      <div className="metrics-container">
        {/* FPS Meter */}
        <div className="metric-row fps">
          <div className="metric-label">FPS</div>
          <div className="metric-value">
            <span className={`value ${fps < 30 ? 'warning' : fps < 15 ? 'danger' : ''}`}>
              {fps}
            </span>
          </div>
          <div className="metric-bar">
            <div className="metric-bar-fill" style={{ width: `${Math.min(100, fps)}%` }}></div>
          </div>
        </div>
        
        {/* Memory Usage */}
        <div className="metric-row">
          <div className="metric-label">Memory</div>
          <div className="metric-value">
            <span className="value">{memory}</span>
            <span className="unit">MB</span>
          </div>
        </div>
        
        {/* Render Stats */}
        <div className="metric-group">
          <div className="metric-group-title">Render Statistics</div>
          
          <div className="metric-row">
            <div className="metric-label">Draw Calls</div>
            <div className="metric-value">
              <span className="value">{renderStats.calls}</span>
            </div>
          </div>
          
          <div className="metric-row">
            <div className="metric-label">Triangles</div>
            <div className="metric-value">
              <span className="value">{formatNumber(renderStats.triangles)}</span>
            </div>
          </div>
          
          <div className="metric-row">
            <div className="metric-label">Points</div>
            <div className="metric-value">
              <span className="value">{formatNumber(renderStats.points)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .metrics-container {
          font-family: monospace;
          font-size: 12px;
          width: 100%;
        }
        
        .metric-row {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          position: relative;
        }
        
        .metric-label {
          width: 80px;
          color: #aaa;
        }
        
        .metric-value {
          min-width: 80px;
          text-align: right;
          padding-right: 4px;
        }
        
        .value {
          font-weight: bold;
          color: white;
        }
        
        .value.warning {
          color: #ffcc00;
        }
        
        .value.danger {
          color: #ff3333;
        }
        
        .unit {
          color: #888;
          margin-left: 4px;
          font-size: 10px;
        }
        
        .fps {
          margin-bottom: 12px;
        }
        
        .metric-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
          overflow: hidden;
        }
        
        .metric-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #4488ff, #44ccff);
          transition: width 0.2s;
        }
        
        .metric-group {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 12px;
          padding-top: 8px;
        }
        
        .metric-group-title {
          color: #aaa;
          font-size: 11px;
          margin-bottom: 8px;
          font-weight: bold;
        }
      `}</style>
    </DraggableHUD>
  );
};

PerformanceMetricsHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default PerformanceMetricsHUD; 