/**
 * HistogramHUD.jsx
 * Data distribution visualization with histogram
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_histogram_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_histogram_hud.md'
};

/**
 * HistogramHUD component
 * Visualizes data distribution with configurable histogram
 */
const HistogramHUD = ({
  initialPosition = { x: 20, y: 200 },
  onPositionChange,
  onClose,
  dataSource = 'memory' // 'memory', 'performance', 'network', 'custom'
}) => {
  // Main state
  const [histogramData, setHistogramData] = useState([]);
  const [statistics, setStatistics] = useState({
    min: 0,
    max: 0,
    mean: 0,
    median: 0,
    stdDev: 0,
    count: 0
  });
  const [dataConfig, setDataConfig] = useState({
    source: dataSource,
    buckets: 20,
    updateInterval: 1000,
    valueKey: 'value',
    timeWindow: 60 // seconds of data to keep
  });
  const [isRecording, setIsRecording] = useState(true);
  const [colorScheme, setColorScheme] = useState('blue');
  const [viewMode, setViewMode] = useState('histogram'); // 'histogram', 'line', 'both'
  
  // References
  const canvasRef = useRef(null);
  const historyRef = useRef([]);
  const timerRef = useRef(null);
  
  // Mock data generators - in a real implementation these would be replaced with actual data sources
  const generateMockData = () => {
    switch(dataConfig.source) {
      case 'memory':
        return {
          timestamp: Date.now(),
          value: 100 + Math.random() * 100 * (0.8 + 0.4 * Math.sin(Date.now() / 10000))
        };
      case 'performance':
        return {
          timestamp: Date.now(),
          value: 16.67 + (Math.random() * 20 - 10) * (1 + 0.5 * Math.sin(Date.now() / 5000))
        };
      case 'network':
        return {
          timestamp: Date.now(),
          value: Math.max(0, 50 + Math.random() * 200 * (0.5 + Math.sin(Date.now() / 15000)))
        };
      case 'custom':
      default:
        return {
          timestamp: Date.now(),
          value: Math.random() * 100
        };
    }
  };
  
  // Calculate statistics from data
  const calculateStatistics = (data) => {
    if (!data.length) {
      return {
        min: 0,
        max: 0,
        mean: 0,
        median: 0,
        stdDev: 0,
        count: 0
      };
    }
    
    const values = data.map(item => item.value).sort((a, b) => a - b);
    const min = values[0];
    const max = values[values.length - 1];
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    
    // Calculate median
    const mid = Math.floor(values.length / 2);
    const median = values.length % 2 === 0
      ? (values[mid - 1] + values[mid]) / 2
      : values[mid];
    
    // Calculate standard deviation
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
    const stdDev = Math.sqrt(variance);
    
    return {
      min,
      max,
      mean,
      median,
      stdDev,
      count: values.length
    };
  };
  
  // Create histogram buckets from data
  const createHistogram = (data, bucketCount) => {
    if (!data.length) return [];
    
    const values = data.map(item => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const bucketSize = range / bucketCount;
    
    // Initialize buckets
    const buckets = Array(bucketCount).fill(0);
    
    // Count values in each bucket
    values.forEach(value => {
      if (value === max) {
        buckets[bucketCount - 1]++;
      } else {
        const bucketIndex = Math.floor((value - min) / bucketSize);
        buckets[bucketIndex]++;
      }
    });
    
    // Create histogram data with bucket info
    return buckets.map((count, i) => {
      const bucketStart = min + i * bucketSize;
      const bucketEnd = bucketStart + bucketSize;
      
      return {
        start: bucketStart,
        end: bucketEnd,
        count,
        percentage: (count / data.length) * 100
      };
    });
  };
  
  // Data collection effect
  useEffect(() => {
    if (!isRecording) return;
    
    const collectData = () => {
      const newDataPoint = generateMockData();
      const now = Date.now();
      const timeWindowMs = dataConfig.timeWindow * 1000;
      
      historyRef.current = [
        ...historyRef.current.filter(item => now - item.timestamp < timeWindowMs),
        newDataPoint
      ];
      
      const stats = calculateStatistics(historyRef.current);
      setStatistics(stats);
      
      const histogram = createHistogram(historyRef.current, dataConfig.buckets);
      setHistogramData(histogram);
    };
    
    // Initial data collection
    collectData();
    
    // Set up interval for data collection
    timerRef.current = setInterval(collectData, dataConfig.updateInterval);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, dataConfig]);
  
  // Canvas rendering effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (histogramData.length === 0) {
      // Draw empty state
      ctx.fillStyle = 'rgba(150, 150, 150, 0.2)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', width / 2, height / 2);
      return;
    }
    
    // Calculate the max count for scaling
    const maxCount = Math.max(...histogramData.map(bucket => bucket.count));
    
    // Draw histogram
    if (viewMode === 'histogram' || viewMode === 'both') {
      const barWidth = width / histogramData.length;
      
      histogramData.forEach((bucket, i) => {
        const barHeight = (bucket.count / maxCount) * height;
        const x = i * barWidth;
        const y = height - barHeight;
        
        // Get color based on color scheme and value
        let gradient;
        const normalizedValue = (bucket.start - statistics.min) / (statistics.max - statistics.min);
        
        if (colorScheme === 'blue') {
          gradient = ctx.createLinearGradient(0, y, 0, height);
          gradient.addColorStop(0, `rgba(50, 150, 255, ${0.5 + 0.5 * normalizedValue})`);
          gradient.addColorStop(1, 'rgba(30, 70, 150, 0.2)');
        } else if (colorScheme === 'heat') {
          gradient = ctx.createLinearGradient(0, y, 0, height);
          const hue = 240 - normalizedValue * 240; // Blue (240) to Red (0)
          gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.7)`);
          gradient.addColorStop(1, `hsla(${hue}, 100%, 20%, 0.2)`);
        } else if (colorScheme === 'rainbow') {
          const hue = i / histogramData.length * 360;
          gradient = ctx.createLinearGradient(0, y, 0, height);
          gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.7)`);
          gradient.addColorStop(1, `hsla(${hue}, 100%, 20%, 0.2)`);
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 1, barHeight);
        
        // Draw border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.strokeRect(x, y, barWidth - 1, barHeight);
      });
    }
    
    // Draw line representation
    if (viewMode === 'line' || viewMode === 'both') {
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      histogramData.forEach((bucket, i) => {
        const x = (i + 0.5) * (width / histogramData.length);
        const y = height - (bucket.count / maxCount) * height;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      // Complete the path to the bottom
      ctx.lineTo(width, height);
      ctx.closePath();
      
      // Fill with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      
      if (colorScheme === 'blue') {
        gradient.addColorStop(0, 'rgba(50, 150, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(30, 70, 150, 0.1)');
      } else if (colorScheme === 'heat') {
        gradient.addColorStop(0, 'rgba(255, 50, 50, 0.5)');
        gradient.addColorStop(1, 'rgba(150, 30, 30, 0.1)');
      } else if (colorScheme === 'rainbow') {
        gradient.addColorStop(0, 'rgba(255, 150, 50, 0.5)');
        gradient.addColorStop(1, 'rgba(50, 50, 150, 0.1)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw the line
      ctx.beginPath();
      
      histogramData.forEach((bucket, i) => {
        const x = (i + 0.5) * (width / histogramData.length);
        const y = height - (bucket.count / maxCount) * height;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      if (colorScheme === 'blue') {
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.8)';
      } else if (colorScheme === 'heat') {
        ctx.strokeStyle = 'rgba(255, 100, 100, 0.8)';
      } else if (colorScheme === 'rainbow') {
        ctx.strokeStyle = 'rgba(255, 200, 100, 0.8)';
      }
      
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Draw statistics lines
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    
    // Mean line
    const meanY = height - ((statistics.mean - statistics.min) / (statistics.max - statistics.min)) * height;
    ctx.beginPath();
    ctx.moveTo(0, meanY);
    ctx.lineTo(width, meanY);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    
    // Median line
    const medianY = height - ((statistics.median - statistics.min) / (statistics.max - statistics.min)) * height;
    ctx.beginPath();
    ctx.moveTo(0, medianY);
    ctx.lineTo(width, medianY);
    ctx.strokeStyle = 'rgba(255, 200, 100, 0.7)';
    ctx.stroke();
    
    // Reset line style
    ctx.setLineDash([]);
    
    // Draw labels
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.textAlign = 'left';
    
    // Min/max labels
    ctx.fillText(`Max: ${statistics.max.toFixed(1)}`, 5, 12);
    ctx.fillText(`Min: ${statistics.min.toFixed(1)}`, 5, height - 5);
    
    // Mean/median labels
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(`Mean: ${statistics.mean.toFixed(1)}`, width - 5, meanY - 3);
    ctx.fillStyle = 'rgba(255, 200, 100, 0.7)';
    ctx.fillText(`Median: ${statistics.median.toFixed(1)}`, width - 5, medianY + 12);
  }, [histogramData, viewMode, colorScheme, statistics]);
  
  // Format number for display
  const formatNumber = (num, precision = 1) => {
    return typeof num === 'number' ? num.toFixed(precision) : 'N/A';
  };
  
  // Get descriptive source name
  const getSourceName = () => {
    switch(dataConfig.source) {
      case 'memory': return 'Memory Usage (MB)';
      case 'performance': return 'Frame Time (ms)';
      case 'network': return 'Network Latency (ms)';
      case 'custom': return 'Custom Data';
      default: return dataConfig.source;
    }
  };
  
  return (
    <DraggableHUD
      title={`Histogram - ${getSourceName()}`}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={300}
      height={400}
      className="histogram-hud"
    >
      <div className="histogram-content">
        {/* Controls */}
        <div className="controls-row">
          <div className="control-group">
            <label>Source</label>
            <select 
              value={dataConfig.source} 
              onChange={(e) => setDataConfig({...dataConfig, source: e.target.value})}
              className="control-select"
            >
              <option value="memory">Memory</option>
              <option value="performance">Performance</option>
              <option value="network">Network</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Buckets</label>
            <select 
              value={dataConfig.buckets} 
              onChange={(e) => setDataConfig({...dataConfig, buckets: Number(e.target.value)})}
              className="control-select"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Display</label>
            <select 
              value={viewMode} 
              onChange={(e) => setViewMode(e.target.value)}
              className="control-select"
            >
              <option value="histogram">Histogram</option>
              <option value="line">Line</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>
        
        <div className="controls-row">
          <div className="control-group">
            <label>Window</label>
            <select 
              value={dataConfig.timeWindow} 
              onChange={(e) => setDataConfig({...dataConfig, timeWindow: Number(e.target.value)})}
              className="control-select"
            >
              <option value="10">10s</option>
              <option value="30">30s</option>
              <option value="60">1m</option>
              <option value="300">5m</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Colors</label>
            <select 
              value={colorScheme} 
              onChange={(e) => setColorScheme(e.target.value)}
              className="control-select"
            >
              <option value="blue">Blue</option>
              <option value="heat">Heat</option>
              <option value="rainbow">Rainbow</option>
            </select>
          </div>
          
          <div className="control-group record-control">
            <button 
              className={`record-button ${isRecording ? 'recording' : ''}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? '■ Stop' : '● Record'}
            </button>
          </div>
        </div>
        
        {/* Visualization */}
        <div className="visualization-container">
          <canvas
            ref={canvasRef}
            width="280"
            height="200"
            className="histogram-canvas"
          ></canvas>
        </div>
        
        {/* Statistics */}
        <div className="statistics-container">
          <div className="statistics-title">Distribution Statistics</div>
          
          <div className="statistics-grid">
            <div className="statistic">
              <div className="statistic-label">Sample Count</div>
              <div className="statistic-value">{statistics.count}</div>
            </div>
            
            <div className="statistic">
              <div className="statistic-label">Range</div>
              <div className="statistic-value">
                {formatNumber(statistics.max - statistics.min)}
              </div>
            </div>
            
            <div className="statistic">
              <div className="statistic-label">Mean</div>
              <div className="statistic-value">{formatNumber(statistics.mean)}</div>
            </div>
            
            <div className="statistic">
              <div className="statistic-label">Median</div>
              <div className="statistic-value">{formatNumber(statistics.median)}</div>
            </div>
            
            <div className="statistic">
              <div className="statistic-label">Min</div>
              <div className="statistic-value">{formatNumber(statistics.min)}</div>
            </div>
            
            <div className="statistic">
              <div className="statistic-label">Max</div>
              <div className="statistic-value">{formatNumber(statistics.max)}</div>
            </div>
            
            <div className="statistic">
              <div className="statistic-label">Std Dev</div>
              <div className="statistic-value">{formatNumber(statistics.stdDev)}</div>
            </div>
            
            <div className="statistic">
              <div className="statistic-label">Update Rate</div>
              <div className="statistic-value">
                {(1000 / dataConfig.updateInterval).toFixed(1)}/s
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .histogram-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 8px;
          padding: 0 6px;
        }
        
        .controls-row {
          display: flex;
          gap: 8px;
        }
        
        .control-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }
        
        .control-group label {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .control-select {
          background: rgba(40, 40, 60, 0.6);
          border: 1px solid rgba(100, 100, 140, 0.3);
          color: rgba(255, 255, 255, 0.9);
          font-size: 10px;
          padding: 2px 4px;
          border-radius: 2px;
          outline: none;
        }
        
        .control-select:focus {
          border-color: rgba(100, 150, 255, 0.5);
        }
        
        .record-control {
          display: flex;
          align-items: flex-end;
        }
        
        .record-button {
          background: rgba(60, 60, 80, 0.4);
          border: 1px solid rgba(100, 100, 140, 0.3);
          color: rgba(255, 255, 255, 0.9);
          font-size: 10px;
          padding: 2px 0;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .record-button:hover {
          background: rgba(70, 70, 100, 0.6);
        }
        
        .record-button.recording {
          background: rgba(200, 60, 60, 0.3);
          border-color: rgba(255, 100, 100, 0.5);
          color: rgba(255, 200, 200, 0.9);
        }
        
        .visualization-container {
          background: rgba(20, 20, 30, 0.6);
          border-radius: 4px;
          flex-grow: 1;
          padding: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        
        .histogram-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .statistics-container {
          background: rgba(30, 30, 45, 0.6);
          border-radius: 4px;
          padding: 8px;
        }
        
        .statistics-title {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 6px;
          text-align: center;
        }
        
        .statistics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        
        .statistic {
          background: rgba(40, 40, 60, 0.4);
          border-radius: 3px;
          padding: 4px;
        }
        
        .statistic-label {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .statistic-value {
          font-family: monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </DraggableHUD>
  );
};

HistogramHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  dataSource: PropTypes.oneOf(['memory', 'performance', 'network', 'custom'])
};

export default HistogramHUD; 