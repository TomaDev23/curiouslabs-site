/**
 * RenderingProfilerHUD.jsx
 * Component for analyzing rendering performance and optimizations
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_rendering_profiler_hud',
  ui: 'UI5',
  type: 'development',
  doc: 'contract_rendering_profiler_hud.md'
};

// Mock render statistics for demo
const MOCK_RENDER_STATS = {
  fps: 60,
  frameTime: 16.7,
  drawCalls: 124,
  triangles: 2145763,
  instances: 52358,
  textures: {
    count: 27,
    memory: 182.5, // MB
    formats: {
      RGB: 9,
      RGBA: 14,
      DEPTH: 1,
      FLOAT: 3
    }
  },
  buffers: {
    count: 42,
    memory: 87.3, // MB
    types: {
      VERTEX: 18,
      INDEX: 18,
      UNIFORM: 6
    }
  },
  shaders: {
    count: 12,
    compileTime: 230.4, // ms
    types: {
      VERTEX: 6,
      FRAGMENT: 6
    }
  },
  gpu: {
    utilization: 68, // %
    memory: {
      total: 8192, // MB
      used: 2048, // MB
    },
    vendor: 'NVIDIA',
    renderer: 'RTX 3080'
  },
  timings: {
    update: 2.3, // ms
    render: 8.6, // ms
    postprocess: 3.4, // ms
    physics: 1.2, // ms
    other: 1.2 // ms
  },
  memory: {
    js: 134.7, // MB
    gpu: 846.2 // MB
  }
};

// Frame time history
const generateFrameTimeHistory = () => {
  const history = [];
  let baseTime = 16.7; // Target 60 FPS
  
  for (let i = 0; i < 120; i++) {
    // Add some realistic variation
    const variation = Math.random() * 3 - 1.5;
    
    // Every ~20 frames add a spike
    const spike = i % 20 === 0 ? Math.random() * 10 : 0;
    
    history.push(Math.max(0, baseTime + variation + spike));
  }
  
  return history;
};

/**
 * FrameTimeChart component
 */
const FrameTimeChart = ({ frameTimeHistory }) => {
  const canvasRef = useRef(null);
  const maxFrameTime = Math.max(...frameTimeHistory) * 1.1; // Add 10% margin
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw background grid
    ctx.strokeStyle = 'rgba(60, 80, 120, 0.2)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines (every 10ms)
    for (let ms = 0; ms <= maxFrameTime; ms += 10) {
      const y = height - (ms / maxFrameTime) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      
      // Label grid lines
      if (ms > 0) {
        ctx.fillStyle = 'rgba(150, 170, 220, 0.5)';
        ctx.font = '9px monospace';
        ctx.fillText(`${ms}ms`, 2, y - 2);
      }
    }
    
    // Frame time thresholds
    const goodThreshold = 16.7; // 60fps
    const okThreshold = 33.3; // 30fps
    
    // Draw frame time threshold lines
    // 60 FPS line (16.7ms)
    const goodY = height - (goodThreshold / maxFrameTime) * height;
    ctx.strokeStyle = 'rgba(50, 200, 70, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, goodY);
    ctx.lineTo(width, goodY);
    ctx.stroke();
    
    // 30 FPS line (33.3ms)
    const okY = height - (okThreshold / maxFrameTime) * height;
    ctx.strokeStyle = 'rgba(230, 160, 50, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, okY);
    ctx.lineTo(width, okY);
    ctx.stroke();
    
    // Draw frame times
    const barWidth = width / frameTimeHistory.length;
    
    for (let i = 0; i < frameTimeHistory.length; i++) {
      const frameTime = frameTimeHistory[i];
      const x = i * barWidth;
      const barHeight = (frameTime / maxFrameTime) * height;
      
      // Color based on performance
      if (frameTime < goodThreshold) {
        ctx.fillStyle = 'rgba(50, 200, 70, 0.6)';
      } else if (frameTime < okThreshold) {
        ctx.fillStyle = 'rgba(230, 160, 50, 0.6)';
      } else {
        ctx.fillStyle = 'rgba(230, 60, 60, 0.6)';
      }
      
      ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
    }
    
    // Draw labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '9px monospace';
    ctx.fillText('60 FPS', width - 35, goodY - 2);
    ctx.fillText('30 FPS', width - 35, okY - 2);
  }, [frameTimeHistory, maxFrameTime]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={480} 
      height={120} 
      className="frame-time-chart"
    />
  );
};

/**
 * StatRow component for displaying performance statistics
 */
const StatRow = ({ label, value, unit, color, percentage, critical, warning }) => {
  const statClass = critical ? 'critical' : warning ? 'warning' : '';
  
  return (
    <div className={`stat-row ${statClass}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">
        {value}
        {unit && <span className="stat-unit">{unit}</span>}
        {percentage !== undefined && (
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: color || (critical ? '#e74c3c' : warning ? '#f39c12' : '#3498db')
              }}
            />
          </div>
        )}
      </span>
      
      <style jsx>{`
        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px 0;
          border-bottom: 1px solid rgba(60, 80, 120, 0.2);
        }
        
        .stat-row.critical {
          color: #e74c3c;
        }
        
        .stat-row.warning {
          color: #f39c12;
        }
        
        .stat-label {
          font-size: 12px;
        }
        
        .stat-value {
          font-family: 'Roboto Mono', monospace;
          font-size: 12px;
          display: flex;
          align-items: center;
        }
        
        .stat-unit {
          color: rgba(255, 255, 255, 0.5);
          font-size: 10px;
          margin-left: 2px;
        }
        
        .stat-bar-container {
          width: 60px;
          height: 4px;
          background: rgba(60, 80, 120, 0.2);
          margin-left: 8px;
          border-radius: 2px;
          overflow: hidden;
        }
        
        .stat-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

/**
 * PieChart component for visualizing time breakdown
 */
const PieChart = ({ segments }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 * 0.8;
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.clearRect(0, 0, width, height);
    
    // Calculate total value
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);
    let startAngle = -Math.PI / 2; // Start from top
    
    // Draw segments
    segments.forEach(segment => {
      const segmentAngle = (segment.value / total) * (Math.PI * 2);
      const endAngle = startAngle + segmentAngle;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = segment.color;
      ctx.fill();
      
      startAngle = endAngle;
    });
    
    // Draw center hole for donut chart
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(30, 34, 42, 0.8)';
    ctx.fill();
    
    // Draw total in center
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${total.toFixed(1)}ms`, centerX, centerY);
  }, [segments]);
  
  return (
    <div className="pie-chart-container">
      <canvas ref={canvasRef} width={100} height={100} />
      
      <div className="legend">
        {segments.map((segment, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: segment.color }} />
            <div className="legend-text">
              <div className="legend-label">{segment.name}</div>
              <div className="legend-value">{segment.value.toFixed(1)}ms</div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .pie-chart-container {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }
        
        .legend {
          margin-left: 10px;
          flex: 1;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }
        
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          margin-right: 6px;
        }
        
        .legend-text {
          font-size: 11px;
          display: flex;
          align-items: baseline;
        }
        
        .legend-label {
          margin-right: 5px;
        }
        
        .legend-value {
          color: rgba(255, 255, 255, 0.6);
          font-size: 10px;
          font-family: 'Roboto Mono', monospace;
        }
      `}</style>
    </div>
  );
};

/**
 * RenderingProfilerHUD component
 */
const RenderingProfilerHUD = ({
  initialPosition,
  onPositionChange,
  onClose,
  visualParams
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(MOCK_RENDER_STATS);
  const [recording, setRecording] = useState(false);
  const [frameTimeHistory, setFrameTimeHistory] = useState(generateFrameTimeHistory());
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingTimerRef = useRef(null);
  
  // Simulate real-time updates
  useEffect(() => {
    const updateStats = () => {
      setStats(prevStats => {
        // Vary FPS slightly for realism
        const fpsVariation = Math.random() * 3 - 1.5;
        const newFps = Math.max(30, Math.min(65, prevStats.fps + fpsVariation));
        const newFrameTime = 1000 / newFps;
        
        // Update frame time history
        if (recording) {
          setFrameTimeHistory(prev => [...prev.slice(1), newFrameTime]);
        }
        
        // Randomize some values for simulation
        return {
          ...prevStats,
          fps: newFps,
          frameTime: newFrameTime,
          drawCalls: prevStats.drawCalls + Math.floor(Math.random() * 5) - 2,
          gpu: {
            ...prevStats.gpu,
            utilization: Math.max(30, Math.min(99, prevStats.gpu.utilization + Math.floor(Math.random() * 5) - 2))
          },
          timings: {
            update: Math.max(0.5, Math.min(5, prevStats.timings.update + (Math.random() * 0.4 - 0.2))),
            render: Math.max(3, Math.min(15, prevStats.timings.render + (Math.random() * 0.6 - 0.3))),
            postprocess: Math.max(1, Math.min(7, prevStats.timings.postprocess + (Math.random() * 0.4 - 0.2))),
            physics: Math.max(0.2, Math.min(3, prevStats.timings.physics + (Math.random() * 0.3 - 0.15))),
            other: Math.max(0.2, Math.min(3, prevStats.timings.other + (Math.random() * 0.3 - 0.15)))
          }
        };
      });
    };
    
    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, [recording]);
  
  // Handle recording timer
  useEffect(() => {
    if (recording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 0.1);
      }, 100);
    } else {
      clearInterval(recordingTimerRef.current);
    }
    
    return () => clearInterval(recordingTimerRef.current);
  }, [recording]);
  
  // Start/stop recording
  const toggleRecording = () => {
    if (!recording) {
      // Start new recording
      setFrameTimeHistory(Array(120).fill(stats.frameTime));
      setRecordingDuration(0);
    }
    
    setRecording(!recording);
  };
  
  // Clear recording data
  const clearRecording = () => {
    setFrameTimeHistory(Array(120).fill(stats.frameTime));
    setRecordingDuration(0);
  };
  
  // Time segments for pie chart
  const timeSegments = [
    { name: 'Render', value: stats.timings.render, color: '#3498db' },
    { name: 'Post-process', value: stats.timings.postprocess, color: '#9b59b6' },
    { name: 'Update', value: stats.timings.update, color: '#2ecc71' },
    { name: 'Physics', value: stats.timings.physics, color: '#e74c3c' },
    { name: 'Other', value: stats.timings.other, color: '#f39c12' }
  ];
  
  // Determine if we have any performance issues
  const hasCriticalIssues = 
    stats.frameTime > 33.3 || // Less than 30 FPS
    stats.gpu.utilization > 95 ||
    stats.gpu.memory.used / stats.gpu.memory.total > 0.9;
  
  const hasWarningIssues =
    stats.frameTime > 16.7 || // Less than 60 FPS
    stats.gpu.utilization > 80 ||
    stats.gpu.memory.used / stats.gpu.memory.total > 0.7 ||
    stats.drawCalls > 200;
  
  return (
    <DraggableHUD
      title="Rendering Profiler"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={500}
      height={450}
    >
      <div className="rendering-profiler-hud">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'frame' ? 'active' : ''}`}
            onClick={() => setActiveTab('frame')}
          >
            Frame Analysis
          </button>
          <button 
            className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button 
            className={`tab-button ${activeTab === 'gpu' ? 'active' : ''}`}
            onClick={() => setActiveTab('gpu')}
          >
            GPU
          </button>
        </div>
        
        <div className="status-bar">
          <div className={`status-indicator ${hasCriticalIssues ? 'critical' : hasWarningIssues ? 'warning' : 'good'}`}>
            {hasCriticalIssues ? 'Critical Performance Issues' : hasWarningIssues ? 'Performance Warnings' : 'Performance Good'}
          </div>
          <div className="fps-counter">
            {stats.fps.toFixed(1)} FPS
          </div>
        </div>
        
        <div className="content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="chart-section">
                <div className="section-header">
                  <h3>Frame Time History</h3>
                  <div className="recording-controls">
                    <button 
                      className={`record-button ${recording ? 'recording' : ''}`}
                      onClick={toggleRecording}
                    >
                      {recording ? '⏹ Stop' : '⏺ Record'}
                    </button>
                    {recording && (
                      <span className="recording-time">{recordingDuration.toFixed(1)}s</span>
                    )}
                    <button 
                      className="clear-button"
                      onClick={clearRecording}
                      disabled={recording}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                
                <FrameTimeChart frameTimeHistory={frameTimeHistory} />
              </div>
              
              <div className="stats-grid">
                <div className="stats-column">
                  <h3>Frame Statistics</h3>
                  <StatRow 
                    label="Frame Time" 
                    value={stats.frameTime.toFixed(2)} 
                    unit="ms"
                    critical={stats.frameTime > 33.3}
                    warning={stats.frameTime > 16.7}
                  />
                  <StatRow 
                    label="FPS" 
                    value={stats.fps.toFixed(1)}
                    critical={stats.fps < 30}
                    warning={stats.fps < 60} 
                  />
                  <StatRow 
                    label="Draw Calls" 
                    value={stats.drawCalls}
                    warning={stats.drawCalls > 200}
                  />
                  <StatRow 
                    label="Triangles" 
                    value={(stats.triangles / 1000).toFixed(1)}
                    unit="K"
                  />
                  <StatRow 
                    label="Instances" 
                    value={(stats.instances / 1000).toFixed(1)}
                    unit="K"
                  />
                </div>
                
                <div className="stats-column">
                  <h3>Memory</h3>
                  <StatRow 
                    label="GPU Memory" 
                    value={(stats.gpu.memory.used / 1024).toFixed(1)} 
                    unit="GB"
                    percentage={(stats.gpu.memory.used / stats.gpu.memory.total) * 100}
                    critical={stats.gpu.memory.used / stats.gpu.memory.total > 0.9}
                    warning={stats.gpu.memory.used / stats.gpu.memory.total > 0.7}
                  />
                  <StatRow 
                    label="JS Heap" 
                    value={stats.memory.js.toFixed(1)} 
                    unit="MB"
                  />
                  <StatRow 
                    label="Textures" 
                    value={stats.textures.memory.toFixed(1)} 
                    unit="MB"
                  />
                  <StatRow 
                    label="Buffers" 
                    value={stats.buffers.memory.toFixed(1)} 
                    unit="MB"
                  />
                  <StatRow 
                    label="GPU Utilization" 
                    value={stats.gpu.utilization.toFixed(0)} 
                    unit="%"
                    percentage={stats.gpu.utilization}
                    critical={stats.gpu.utilization > 95}
                    warning={stats.gpu.utilization > 80}
                  />
                </div>
              </div>
              
              <div className="timing-section">
                <h3>Frame Breakdown</h3>
                <PieChart segments={timeSegments} />
              </div>
            </div>
          )}
          
          {activeTab === 'frame' && (
            <div className="frame-tab">
              <p className="placeholder-message">
                Frame Analysis coming soon!
              </p>
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="resources-tab">
              <p className="placeholder-message">
                Resources panel coming soon!
              </p>
            </div>
          )}
          
          {activeTab === 'gpu' && (
            <div className="gpu-tab">
              <p className="placeholder-message">
                GPU panel coming soon!
              </p>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .rendering-profiler-hud {
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
        
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 10px;
          background: rgba(40, 44, 52, 0.6);
          border-bottom: 1px solid #3a3f4b;
          font-size: 12px;
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
        }
        
        .status-indicator::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
        }
        
        .status-indicator.good::before {
          background-color: #2ecc71;
        }
        
        .status-indicator.warning::before {
          background-color: #f39c12;
        }
        
        .status-indicator.critical::before {
          background-color: #e74c3c;
          box-shadow: 0 0 5px #e74c3c;
          animation: pulse 2s infinite;
        }
        
        .fps-counter {
          font-family: 'Roboto Mono', monospace;
          background: rgba(50, 60, 80, 0.4);
          padding: 2px 6px;
          border-radius: 3px;
        }
        
        .content {
          flex: 1;
          overflow: auto;
          padding: 10px;
        }
        
        .chart-section {
          margin-bottom: 16px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .section-header h3 {
          margin: 0;
          font-size: 14px;
          font-weight: normal;
          color: #a0c0e0;
        }
        
        .recording-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }
        
        .record-button {
          background: rgba(60, 70, 90, 0.6);
          border: 1px solid #4a5366;
          color: #e0e0e0;
          padding: 2px 8px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        }
        
        .record-button.recording {
          background: rgba(200, 60, 60, 0.4);
          border-color: rgba(230, 70, 70, 0.6);
        }
        
        .recording-time {
          font-family: 'Roboto Mono', monospace;
          color: rgba(230, 70, 70, 0.9);
        }
        
        .clear-button {
          background: rgba(50, 55, 70, 0.4);
          border: 1px solid #3a3f4b;
          color: #b0b0b0;
          padding: 2px 8px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        }
        
        .clear-button:disabled {
          opacity: 0.5;
          cursor: default;
        }
        
        .stats-grid {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .stats-column {
          flex: 1;
          background: rgba(40, 44, 52, 0.4);
          border-radius: 4px;
          padding: 10px;
        }
        
        .stats-column h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          font-weight: normal;
          color: #a0c0e0;
          border-bottom: 1px solid rgba(60, 80, 120, 0.3);
          padding-bottom: 6px;
        }
        
        .timing-section {
          background: rgba(40, 44, 52, 0.4);
          border-radius: 4px;
          padding: 10px;
        }
        
        .timing-section h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          font-weight: normal;
          color: #a0c0e0;
          border-bottom: 1px solid rgba(60, 80, 120, 0.3);
          padding-bottom: 6px;
        }
        
        .placeholder-message {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #8090a0;
          font-style: italic;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 5px #e74c3c; }
          50% { box-shadow: 0 0 10px #e74c3c; }
          100% { box-shadow: 0 0 5px #e74c3c; }
        }
        
        .frame-time-chart {
          width: 100%;
          height: 120px;
          background-color: rgba(35, 39, 47, 0.6);
          border-radius: 4px;
        }
      `}</style>
    </DraggableHUD>
  );
};

RenderingProfilerHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  visualParams: PropTypes.object
};

RenderingProfilerHUD.defaultProps = {
  initialPosition: { x: 50, y: 50 },
  onPositionChange: () => {},
  onClose: () => {},
  visualParams: {}
};

export default RenderingProfilerHUD; 