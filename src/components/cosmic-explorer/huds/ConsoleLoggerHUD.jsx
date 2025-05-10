/**
 * ConsoleLoggerHUD.jsx
 * Component for custom console logging and command execution
 * LEGIT compliance: UI5
 */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_console_logger_hud',
  ui: 'UI5',
  type: 'development',
  doc: 'contract_console_logger_hud.md'
};

// Example command history for autocomplete
const EXAMPLE_COMMANDS = [
  'help',
  'clear',
  'stats.showFPS()',
  'camera.position.set(0, 10, 20)',
  'scene.add(new THREE.PointLight())',
  'renderer.setPixelRatio(window.devicePixelRatio)',
  'galaxy.setParticleCount(50000)',
  'performance.mark("test-start")',
  'performance.measure("test", "test-start")',
  'console.log(renderer.info.render)',
  'toggleWireframe()',
  'exportScene("scene.json")'
];

// Message types and their styling
const MESSAGE_TYPES = {
  INFO: { icon: 'ℹ️', className: 'info', color: '#4a80f0' },
  WARNING: { icon: '⚠️', className: 'warning', color: '#f0a04a' },
  ERROR: { icon: '🛑', className: 'error', color: '#f04a4a' },
  SUCCESS: { icon: '✅', className: 'success', color: '#4af04a' },
  DEBUG: { icon: '🔍', className: 'debug', color: '#b04af0' },
  COMMAND: { icon: '>', className: 'command', color: '#f0f0f0' },
  RESULT: { icon: '←', className: 'result', color: '#a0c0e0' },
  PERFORMANCE: { icon: '⏱️', className: 'performance', color: '#f0d24a' }
};

/**
 * Demo messages for the console
 */
const DEMO_MESSAGES = [
  { 
    id: 'm1', 
    type: 'INFO', 
    content: 'Cosmic Galaxy Explorer initialized', 
    timestamp: new Date().getTime() - 50000 
  },
  { 
    id: 'm2', 
    type: 'DEBUG', 
    content: 'GPU Capabilities: WebGL 2.0, Max Textures: 16, Max Precision: highp', 
    timestamp: new Date().getTime() - 45000 
  },
  { 
    id: 'm3', 
    type: 'COMMAND', 
    content: 'galaxy.setParticleCount(50000)', 
    timestamp: new Date().getTime() - 40000 
  },
  { 
    id: 'm4', 
    type: 'RESULT', 
    content: 'Particle count updated. Memory usage: 24.5MB', 
    timestamp: new Date().getTime() - 39800 
  },
  { 
    id: 'm5', 
    type: 'PERFORMANCE', 
    content: 'Render time: 16.2ms, Update time: 3.4ms, Total: 19.6ms', 
    timestamp: new Date().getTime() - 30000 
  },
  { 
    id: 'm6', 
    type: 'WARNING', 
    content: 'Frame drop detected: 32fps (target 60fps)', 
    timestamp: new Date().getTime() - 25000 
  },
  { 
    id: 'm7', 
    type: 'COMMAND', 
    content: 'renderer.setPixelRatio(0.8)', 
    timestamp: new Date().getTime() - 20000 
  },
  { 
    id: 'm8', 
    type: 'SUCCESS', 
    content: 'Pixel ratio adjusted for performance', 
    timestamp: new Date().getTime() - 19800 
  },
  { 
    id: 'm9', 
    type: 'PERFORMANCE', 
    content: 'Render time improved: 12.8ms (↓3.4ms)', 
    timestamp: new Date().getTime() - 15000 
  },
  { 
    id: 'm10', 
    type: 'INFO', 
    content: 'WebSocket connected: api.cosmicexplorer.io', 
    timestamp: new Date().getTime() - 10000 
  },
  { 
    id: 'm11', 
    type: 'ERROR', 
    content: 'Failed to load texture: nebula_large.jpg (ERR_LARGE_ALLOCATION)', 
    timestamp: new Date().getTime() - 5000 
  },
  { 
    id: 'm12', 
    type: 'DEBUG', 
    content: 'Using fallback texture: nebula_medium.jpg, Size: 2048x2048', 
    timestamp: new Date().getTime() - 4500 
  }
];

/**
 * ConsoleMessage component to display a single console message
 */
const ConsoleMessage = ({ message }) => {
  const { type, content, timestamp } = message;
  const messageInfo = MESSAGE_TYPES[type];
  const formattedTime = new Date(timestamp).toLocaleTimeString();

  return (
    <div className={`console-message ${messageInfo.className}`}>
      <div className="message-timestamp">{formattedTime}</div>
      <div className="message-icon">{messageInfo.icon}</div>
      <div className="message-content" style={{ color: messageInfo.color }}>
        {content}
      </div>
    </div>
  );
};

/**
 * ConsoleLoggerHUD component
 */
const ConsoleLoggerHUD = ({
  initialPosition,
  onPositionChange,
  onClose,
  visualParams
}) => {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [activeTab, setActiveTab] = useState('console');
  const [performanceMarkers, setPerformanceMarkers] = useState([
    { name: 'app-start', timestamp: new Date().getTime() - 60000 },
    { name: 'scene-load', timestamp: new Date().getTime() - 55000 },
    { name: 'render-complete', timestamp: new Date().getTime() - 53000 }
  ]);
  const [performanceMeasures, setPerformanceMeasures] = useState([
    { name: 'startup-time', start: 'app-start', end: 'scene-load', duration: 5000 },
    { name: 'render-time', start: 'scene-load', end: 'render-complete', duration: 2000 }
  ]);
  
  const consoleEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Auto-scroll to latest message
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Add periodic demo messages
  useEffect(() => {
    const timer = setInterval(() => {
      const demoTypes = ['INFO', 'DEBUG', 'PERFORMANCE'];
      const randomType = demoTypes[Math.floor(Math.random() * demoTypes.length)];
      const demoContents = {
        INFO: [
          'Camera position updated',
          'Galaxy rotation speed: 0.05',
          'Scene object count: 52,431',
          'Memory allocation optimized'
        ],
        DEBUG: [
          'Shader compilation complete in 45ms',
          'Texture mipmap chains generated',
          'WebGL context attributes: antialias=true, depth=true',
          'Draw calls per frame: 23'
        ],
        PERFORMANCE: [
          'Galaxy update: 8.2ms',
          'Post-processing: 4.5ms',
          'Physics simulation: 12.3ms',
          'Memory usage: 258MB'
        ]
      };
      
      const randomContent = demoContents[randomType][Math.floor(Math.random() * demoContents[randomType].length)];
      
      setMessages(prev => [...prev, {
        id: `m${Date.now()}`,
        type: randomType,
        content: randomContent,
        timestamp: new Date().getTime()
      }]);
    }, 8000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle submit command
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add the command to the messages
    const commandMessage = {
      id: `cmd-${Date.now()}`,
      type: 'COMMAND',
      content: inputValue,
      timestamp: new Date().getTime()
    };
    
    setMessages(prev => [...prev, commandMessage]);
    
    // Add to command history
    setCommandHistory(prev => [inputValue, ...prev].slice(0, 50));
    
    // Process command and generate result
    let resultMessage;
    
    if (inputValue === 'clear') {
      // Special handling for clear command
      setMessages([]);
      resultMessage = null;
    } else if (inputValue === 'help') {
      // Help command
      resultMessage = {
        id: `res-${Date.now()}`,
        type: 'INFO',
        content: 'Available commands: clear, help, stats.showFPS(), camera.*, scene.*, renderer.*, galaxy.*',
        timestamp: new Date().getTime() + 10
      };
    } else if (inputValue.startsWith('performance.mark')) {
      // Handle performance marking
      const markerName = inputValue.match(/["'](.*?)["']/)?.[1] || 'unnamed-mark';
      setPerformanceMarkers(prev => [...prev, { name: markerName, timestamp: new Date().getTime() }]);
      resultMessage = {
        id: `res-${Date.now()}`,
        type: 'PERFORMANCE',
        content: `Performance mark created: ${markerName}`,
        timestamp: new Date().getTime() + 10
      };
    } else if (inputValue.startsWith('performance.measure')) {
      // Handle performance measuring
      const matches = inputValue.match(/["'](.*?)["'](?:,\s*["'](.*?)["'])?(?:,\s*["'](.*?)["'])?/);
      if (matches && matches.length >= 2) {
        const measureName = matches[1];
        const startMark = matches[2] || performanceMarkers[0]?.name;
        const endMark = matches[3] || 'now';
        
        const startTime = performanceMarkers.find(m => m.name === startMark)?.timestamp || new Date().getTime() - 1000;
        const endTime = endMark === 'now' ? new Date().getTime() : performanceMarkers.find(m => m.name === endMark)?.timestamp;
        
        if (startTime && endTime) {
          const duration = endTime - startTime;
          setPerformanceMeasures(prev => [...prev, { name: measureName, start: startMark, end: endMark, duration }]);
          resultMessage = {
            id: `res-${Date.now()}`,
            type: 'PERFORMANCE',
            content: `Performance measure: ${measureName} = ${duration}ms`,
            timestamp: new Date().getTime() + 10
          };
        } else {
          resultMessage = {
            id: `res-${Date.now()}`,
            type: 'ERROR',
            content: 'Performance measure failed: Invalid mark names',
            timestamp: new Date().getTime() + 10
          };
        }
      } else {
        resultMessage = {
          id: `res-${Date.now()}`,
          type: 'ERROR',
          content: 'Performance measure syntax error',
          timestamp: new Date().getTime() + 10
        };
      }
    } else {
      // Generic simulated command response
      const responseTypes = ['SUCCESS', 'RESULT', 'ERROR'];
      const responseWeights = [0.7, 0.2, 0.1]; // 70% success, 20% result, 10% error
      
      // Weighted random selection
      let random = Math.random();
      let typeIndex = 0;
      for (let i = 0; i < responseWeights.length; i++) {
        if (random < responseWeights[i]) {
          typeIndex = i;
          break;
        }
        random -= responseWeights[i];
      }
      
      const responseType = responseTypes[typeIndex];
      let content = '';
      
      if (responseType === 'ERROR') {
        const errors = [
          'Invalid method call',
          'Object not found in scene',
          'Parameter out of range',
          'Undefined property',
          'WebGL context error'
        ];
        content = errors[Math.floor(Math.random() * errors.length)];
      } else if (responseType === 'SUCCESS') {
        content = 'Command executed successfully';
      } else {
        // Generate a fake result based on the command
        if (inputValue.includes('get') || inputValue.includes('info') || inputValue.includes('stats')) {
          content = JSON.stringify({
            type: inputValue.includes('camera') ? 'PerspectiveCamera' : 'Object3D',
            id: Math.floor(Math.random() * 10000),
            properties: { visible: true, position: [Math.random() * 100, Math.random() * 100, Math.random() * 100] }
          });
        } else {
          content = 'Operation completed. Affected objects: ' + Math.floor(Math.random() * 10 + 1);
        }
      }
      
      resultMessage = {
        id: `res-${Date.now()}`,
        type: responseType,
        content,
        timestamp: new Date().getTime() + 10
      };
    }
    
    // Add result message
    if (resultMessage) {
      setMessages(prev => [...prev, resultMessage]);
    }
    
    // Reset input and suggestion
    setInputValue('');
    setSuggestion('');
    setHistoryIndex(-1);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Find autocomplete suggestion
    if (value) {
      const allCommands = [...EXAMPLE_COMMANDS, ...commandHistory];
      const match = allCommands.find(cmd => cmd.startsWith(value) && cmd !== value);
      setSuggestion(match || '');
    } else {
      setSuggestion('');
    }
  };
  
  // Handle keyboard navigation for history
  const handleKeyDown = (e) => {
    const commandsList = [...commandHistory];
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandsList.length - 1);
      setHistoryIndex(newIndex);
      if (commandsList[newIndex]) {
        setInputValue(commandsList[newIndex]);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex === -1) {
        setInputValue('');
      } else if (commandsList[newIndex]) {
        setInputValue(commandsList[newIndex]);
      }
      setSuggestion('');
    } else if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setInputValue(suggestion);
      setSuggestion('');
    }
  };
  
  // Filter messages based on selected type
  const filteredMessages = filterType === 'ALL' 
    ? messages 
    : messages.filter(message => message.type === filterType);
  
  return (
    <DraggableHUD
      title="Console & Logger"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={600}
      height={500}
    >
      <div className="console-logger-hud">
        <div className="console-tabs">
          <button 
            className={`tab-button ${activeTab === 'console' ? 'active' : ''}`}
            onClick={() => setActiveTab('console')}
          >
            Console
          </button>
          <button 
            className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
        </div>
        
        {activeTab === 'console' && (
          <>
            <div className="console-toolbar">
              <div className="message-filter">
                <label>Filter:</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="ALL">All Messages</option>
                  {Object.keys(MESSAGE_TYPES).map(type => (
                    <option key={type} value={type}>
                      {MESSAGE_TYPES[type].icon} {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <button 
                className="clear-button"
                onClick={() => setMessages([])}
              >
                Clear Console
              </button>
            </div>
            
            <div className="console-messages">
              {filteredMessages.map(message => (
                <ConsoleMessage key={message.id} message={message} />
              ))}
              <div ref={consoleEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="console-input-form">
              <div className="input-wrapper">
                <span className="input-prompt">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="console-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter command..."
                  autoComplete="off"
                  spellCheck="false"
                />
                {suggestion && (
                  <div className="suggestion">{suggestion}</div>
                )}
              </div>
              <button type="submit" className="run-button">
                Run
              </button>
            </form>
          </>
        )}
        
        {activeTab === 'performance' && (
          <div className="performance-tab">
            <div className="performance-section">
              <h3>Performance Markers</h3>
              <div className="performance-list">
                {performanceMarkers.map((marker, index) => (
                  <div key={index} className="performance-item">
                    <span className="marker-name">{marker.name}</span>
                    <span className="marker-time">{new Date(marker.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="performance-section">
              <h3>Performance Measures</h3>
              <div className="performance-list">
                {performanceMeasures.map((measure, index) => (
                  <div key={index} className="performance-item measure-item">
                    <div className="measure-header">
                      <span className="measure-name">{measure.name}</span>
                      <span className="measure-duration">{measure.duration.toFixed(2)}ms</span>
                    </div>
                    <div className="measure-details">
                      {measure.start} → {measure.end}
                    </div>
                    <div className="measure-bar-container">
                      <div 
                        className="measure-bar" 
                        style={{ width: `${Math.min(100, measure.duration / 50)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="performance-tip">
              <p>Tip: Use <code>performance.mark("name")</code> and <code>performance.measure("name", "startMark", "endMark")</code> to track performance.</p>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .console-logger-hud {
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: 'Roboto Mono', monospace;
          color: #e0e0e0;
          background: rgba(30, 34, 42, 0.8);
        }
        
        .console-tabs {
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
        
        .console-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: rgba(40, 44, 52, 0.6);
          border-bottom: 1px solid #3a3f4b;
        }
        
        .message-filter {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .filter-select {
          background: rgba(30, 34, 42, 0.8);
          border: 1px solid #3a3f4b;
          color: #e0e0e0;
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .clear-button {
          background: rgba(60, 70, 90, 0.6);
          border: 1px solid #4a5366;
          color: #e0e0e0;
          padding: 4px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .clear-button:hover {
          background: rgba(70, 80, 110, 0.8);
        }
        
        .console-messages {
          flex: 1;
          overflow-y: auto;
          padding: 8px 12px;
          background: rgba(25, 28, 34, 0.8);
        }
        
        .console-message {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
          padding: 4px 0;
          font-size: 13px;
          border-bottom: 1px solid rgba(58, 63, 75, 0.3);
        }
        
        .message-timestamp {
          font-size: 11px;
          color: #6d7891;
          margin-right: 8px;
          white-space: nowrap;
        }
        
        .message-icon {
          margin-right: 8px;
        }
        
        .message-content {
          flex: 1;
          word-break: break-word;
        }
        
        .console-input-form {
          display: flex;
          padding: 8px 12px;
          background: rgba(40, 44, 52, 0.6);
          border-top: 1px solid #3a3f4b;
        }
        
        .input-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          flex: 1;
          background: rgba(25, 28, 34, 0.8);
          border: 1px solid #3a3f4b;
          border-radius: 4px;
          padding: 0 8px;
          margin-right: 8px;
        }
        
        .input-prompt {
          color: #4a80f0;
          margin-right: 8px;
          font-weight: bold;
        }
        
        .console-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #e0e0e0;
          font-family: 'Roboto Mono', monospace;
          font-size: 13px;
          padding: 8px 0;
        }
        
        .suggestion {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          padding: 8px 0 8px 24px;
          color: rgba(120, 130, 160, 0.6);
          pointer-events: none;
          font-family: 'Roboto Mono', monospace;
          font-size: 13px;
        }
        
        .run-button {
          background: rgba(56, 139, 66, 0.6);
          border: 1px solid #4a9955;
          color: #e0e0e0;
          padding: 4px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .run-button:hover {
          background: rgba(66, 149, 76, 0.8);
        }
        
        /* Specific message type styling */
        .console-message.info .message-content {
          color: #4a80f0;
        }
        
        .console-message.warning .message-content {
          color: #f0a04a;
        }
        
        .console-message.error .message-content {
          color: #f04a4a;
        }
        
        .console-message.success .message-content {
          color: #4af04a;
        }
        
        .console-message.debug .message-content {
          color: #b04af0;
        }
        
        .console-message.command .message-content {
          color: #f0f0f0;
          font-weight: bold;
        }
        
        .console-message.result .message-content {
          color: #a0c0e0;
        }
        
        .console-message.performance .message-content {
          color: #f0d24a;
        }
        
        /* Performance Tab */
        .performance-tab {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }
        
        .performance-section {
          margin-bottom: 24px;
        }
        
        .performance-section h3 {
          margin-top: 0;
          margin-bottom: 12px;
          color: #a0c0e0;
          border-bottom: 1px solid rgba(58, 63, 75, 0.6);
          padding-bottom: 8px;
        }
        
        .performance-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .performance-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          background: rgba(40, 44, 52, 0.4);
          border-radius: 4px;
          font-size: 13px;
        }
        
        .marker-name {
          color: #4a80f0;
        }
        
        .marker-time {
          color: #a0a0a0;
          font-size: 12px;
        }
        
        .measure-item {
          flex-direction: column;
        }
        
        .measure-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        
        .measure-name {
          color: #f0d24a;
          font-weight: bold;
        }
        
        .measure-duration {
          color: #a0c0e0;
        }
        
        .measure-details {
          font-size: 12px;
          color: #8090a0;
          margin-bottom: 8px;
        }
        
        .measure-bar-container {
          width: 100%;
          height: 6px;
          background: rgba(30, 40, 60, 0.5);
          border-radius: 3px;
          overflow: hidden;
        }
        
        .measure-bar {
          height: 100%;
          background: linear-gradient(to right, #4a80f0, #f0d24a);
          border-radius: 3px;
        }
        
        .performance-tip {
          margin-top: 16px;
          padding: 12px;
          background: rgba(40, 60, 100, 0.2);
          border-radius: 4px;
          border-left: 3px solid #4a80f0;
        }
        
        .performance-tip p {
          margin: 0;
          font-size: 12px;
          color: #a0c0e0;
        }
        
        .performance-tip code {
          background: rgba(30, 40, 80, 0.4);
          padding: 2px 4px;
          border-radius: 3px;
          color: #f0d24a;
        }
      `}</style>
    </DraggableHUD>
  );
};

ConsoleLoggerHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  visualParams: PropTypes.object
};

ConsoleLoggerHUD.defaultProps = {
  initialPosition: { x: 50, y: 50 },
  onPositionChange: () => {},
  onClose: () => {},
  visualParams: {}
};

export default ConsoleLoggerHUD; 