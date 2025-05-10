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
  const [gpuStats, setGpuStats] = useState({
    usage: 0,
    temperature: 0,
    vram: 0
  });
  const [systemStats, setSystemStats] = useState({
    cpuUsage: 0,
    cpuTemp: 0,
    ramUsage: 0,
    totalRam: 16
  });
  const [perfHistory, setPerfHistory] = useState({
    fps: Array(30).fill(0),
    memory: Array(30).fill(0)
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
        const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        setFps(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        
        // Get memory usage (if available)
        let currentMemory = 0;
        if (window.performance && window.performance.memory) {
          currentMemory = Math.round(window.performance.memory.usedJSHeapSize / 1048576); // Convert to MB
          setMemory(currentMemory);
        }
        
        // Update history for charts
        setPerfHistory(prev => ({
          fps: [...prev.fps.slice(1), currentFps],
          memory: [...prev.memory.slice(1), currentMemory]
        }));
        
        // Simulate render stats (in a real implementation, these would come from WebGL)
        setRenderStats({
          calls: Math.round(10 + Math.random() * 20),
          triangles: Math.round(10000 + Math.random() * 5000),
          points: Math.round(20000 + Math.random() * 10000),
        });
        
        // Simulate GPU stats (in a real implementation, these would come from WebGL or system API)
        setGpuStats({
          usage: Math.round(50 + Math.random() * 30),
          temperature: Math.round(60 + Math.random() * 15),
          vram: Math.round(1000 + Math.random() * 500)
        });
        
        // Simulate system stats
        setSystemStats({
          cpuUsage: Math.round(30 + Math.random() * 40),
          cpuTemp: Math.round(45 + Math.random() * 15),
          ramUsage: Math.round(8 + Math.random() * 4),
          totalRam: 16
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
  
  // Calculate maximum height for mini charts
  const maxFps = Math.max(...perfHistory.fps, 60);
  
  return (
    <DraggableHUD
      title="Performance Metrics"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={450}
    >
      <div className="metrics-container">
        <div className="metrics-grid">
          {/* Left Column */}
          <div className="metrics-column">
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

            {/* System Stats */}
            <div className="metric-group">
              <div className="metric-group-title">System</div>
              
              <div className="metric-row">
                <div className="metric-label">CPU Usage</div>
                <div className="metric-value">
                  <span className="value">{systemStats.cpuUsage}</span>
                  <span className="unit">%</span>
                </div>
                <div className="horizontal-bar">
                  <div className="bar-fill cpu-bar" style={{ width: `${systemStats.cpuUsage}%` }}></div>
                </div>
              </div>
              
              <div className="metric-row">
                <div className="metric-label">CPU Temp</div>
                <div className="metric-value">
                  <span className="value">{systemStats.cpuTemp}</span>
                  <span className="unit">°C</span>
                </div>
              </div>
              
              <div className="metric-row">
                <div className="metric-label">RAM Usage</div>
                <div className="metric-value">
                  <span className="value">{systemStats.ramUsage}</span>
                  <span className="unit">/{systemStats.totalRam} GB</span>
                </div>
                <div className="horizontal-bar">
                  <div className="bar-fill ram-bar" style={{ width: `${(systemStats.ramUsage / systemStats.totalRam) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="metrics-column">
            {/* GPU Stats */}
            <div className="metric-group">
              <div className="metric-group-title">GPU</div>
              
              <div className="metric-row">
                <div className="metric-label">GPU Usage</div>
                <div className="metric-value">
                  <span className="value">{gpuStats.usage}</span>
                  <span className="unit">%</span>
                </div>
                <div className="horizontal-bar">
                  <div className="bar-fill gpu-bar" style={{ width: `${gpuStats.usage}%` }}></div>
                </div>
              </div>
              
              <div className="metric-row">
                <div className="metric-label">GPU Temp</div>
                <div className="metric-value">
                  <span className="value">{gpuStats.temperature}</span>
                  <span className="unit">°C</span>
                </div>
              </div>
              
              <div className="metric-row">
                <div className="metric-label">VRAM</div>
                <div className="metric-value">
                  <span className="value">{gpuStats.vram}</span>
                  <span className="unit">MB</span>
                </div>
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
        </div>

        {/* FPS History Chart - Full Width */}
        <div className="history-chart">
          <div className="chart-title">FPS History</div>
          <div className="chart-container">
            {perfHistory.fps.map((value, index) => (
              <div 
                key={index} 
                className="chart-bar" 
                style={{ 
                  height: `${Math.max(1, (value / maxFps) * 100)}%`,
                  backgroundColor: value < 30 ? '#ff9933' : value < 15 ? '#ff3333' : '#44aaff' 
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .metrics-container {
          font-family: monospace;
          font-size: 12px;
          width: 100%;
        }
        
        .metrics-grid {
          display: flex;
          gap: 20px;
        }
        
        .metrics-column {
          flex: 1;
        }
        
        .metric-row {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          position: relative;
          flex-wrap: wrap;
        }
        
        .metric-label {
          width: 80px;
          color: #aaa;
          flex-shrink: 0;
        }
        
        .metric-value {
          min-width: 60px;
          text-align: right;
          padding-right: 4px;
          flex-shrink: 0;
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
        
        .horizontal-bar {
          flex-grow: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-left: 8px;
        }
        
        .bar-fill {
          height: 100%;
          transition: width 0.2s;
          border-radius: 3px;
        }
        
        .cpu-bar {
          background: linear-gradient(90deg, #4488ff, #44aaff);
        }
        
        .gpu-bar {
          background: linear-gradient(90deg, #44ffaa, #44ff44);
        }
        
        .ram-bar {
          background: linear-gradient(90deg, #ff8844, #ffaa44);
        }
        
        .history-chart {
          margin-top: 16px;
          margin-bottom: 8px;
          height: 40px;
        }
        
        .chart-title {
          color: #aaa;
          font-size: 11px;
          margin-bottom: 4px;
        }
        
        .chart-container {
          display: flex;
          align-items: flex-end;
          height: 20px;
          gap: 1px;
          background: rgba(20, 20, 30, 0.3);
          border-radius: 3px;
          padding: 2px;
        }
        
        .chart-bar {
          flex: 1;
          min-width: 2px;
          border-radius: 1px 1px 0 0;
        }
        
        .metric-group {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 12px;
          padding-top: 8px;
        }
        
        .metric-group-title {
          color: #7388ff;
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