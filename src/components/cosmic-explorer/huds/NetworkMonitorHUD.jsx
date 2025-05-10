/**
 * NetworkMonitorHUD.jsx
 * Component for monitoring network activity and API calls
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_network_monitor_hud',
  ui: 'UI5',
  type: 'monitoring',
  doc: 'contract_network_monitor_hud.md'
};

// Demo network requests
const DEMO_REQUESTS = [
  {
    id: 'req_001',
    url: 'https://api.cosmicexplorer.io/assets/galaxy-textures',
    method: 'GET',
    status: 200,
    size: 2457856,
    time: 230,
    timestamp: Date.now() - 15000,
    type: 'textures/jpg',
    initiator: 'GalaxyLoader.js:124'
  },
  {
    id: 'req_002',
    url: 'https://api.cosmicexplorer.io/scenes/cosmic-journey',
    method: 'GET',
    status: 200,
    size: 128540,
    time: 78,
    timestamp: Date.now() - 12000,
    type: 'application/json',
    initiator: 'SceneManager.js:55'
  },
  {
    id: 'req_003',
    url: 'https://api.cosmicexplorer.io/shaders/nebula',
    method: 'GET',
    status: 200,
    size: 15240,
    time: 45,
    timestamp: Date.now() - 9000,
    type: 'text/plain',
    initiator: 'ShaderLoader.js:22'
  },
  {
    id: 'req_004',
    url: 'https://api.cosmicexplorer.io/analytics/session',
    method: 'POST',
    status: 201,
    size: 780,
    time: 120,
    timestamp: Date.now() - 6000,
    type: 'application/json',
    initiator: 'AnalyticsService.js:87'
  },
  {
    id: 'req_005',
    url: 'https://api.cosmicexplorer.io/user/preferences',
    method: 'PUT',
    status: 200,
    size: 540,
    time: 110,
    timestamp: Date.now() - 3000,
    type: 'application/json',
    initiator: 'UserService.js:143'
  }
];

// Random demo data for network speed
const generateNetworkSpeed = () => {
  return {
    download: Math.floor(Math.random() * 10) + 5, // 5-15 MB/s
    upload: Math.floor(Math.random() * 3) + 1, // 1-4 MB/s
    latency: Math.floor(Math.random() * 30) + 20 // 20-50ms
  };
};

/**
 * Format size in bytes to human readable format
 */
const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Format relative time
 */
const formatRelativeTime = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
};

/**
 * RequestRow component
 */
const RequestRow = ({ request, onClick, isSelected }) => {
  return (
    <div 
      className={`request-row ${isSelected ? 'selected' : ''} ${request.status >= 400 ? 'error' : ''}`}
      onClick={() => onClick(request.id)}
    >
      <div className="request-method" data-method={request.method}>
        {request.method}
      </div>
      
      <div className="request-url" title={request.url}>
        {request.url.replace(/^https?:\/\/api\.cosmicexplorer\.io\//i, '')}
      </div>
      
      <div className="request-status" data-status={request.status >= 400 ? 'error' : 'success'}>
        {request.status}
      </div>
      
      <div className="request-size">
        {formatSize(request.size)}
      </div>
      
      <div className="request-time" data-speed={request.time > 200 ? 'slow' : request.time > 100 ? 'medium' : 'fast'}>
        {request.time} ms
      </div>
      
      <style jsx>{`
        .request-row {
          display: grid;
          grid-template-columns: 65px 1fr 50px 70px 60px;
          gap: 8px;
          padding: 6px 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          font-size: 12px;
          align-items: center;
        }
        
        .request-row:hover {
          background: rgba(70, 80, 110, 0.3);
        }
        
        .request-row.selected {
          background: rgba(60, 90, 150, 0.3);
        }
        
        .request-row.error {
          background: rgba(110, 40, 40, 0.2);
        }
        
        .request-method {
          font-weight: 500;
          padding: 2px 4px;
          border-radius: 3px;
          text-align: center;
          font-size: 11px;
        }
        
        .request-method[data-method="GET"] {
          background: rgba(40, 120, 80, 0.3);
          color: #7effcb;
        }
        
        .request-method[data-method="POST"] {
          background: rgba(100, 80, 180, 0.3);
          color: #b4a6ff;
        }
        
        .request-method[data-method="PUT"] {
          background: rgba(180, 120, 40, 0.3);
          color: #ffd280;
        }
        
        .request-method[data-method="DELETE"] {
          background: rgba(180, 40, 40, 0.3);
          color: #ff8080;
        }
        
        .request-url {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .request-status {
          text-align: center;
        }
        
        .request-status[data-status="error"] {
          color: #ff6060;
        }
        
        .request-status[data-status="success"] {
          color: #60d060;
        }
        
        .request-size {
          text-align: right;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .request-time {
          text-align: right;
        }
        
        .request-time[data-speed="fast"] {
          color: #60d060;
        }
        
        .request-time[data-speed="medium"] {
          color: #d0d060;
        }
        
        .request-time[data-speed="slow"] {
          color: #d06060;
        }
      `}</style>
    </div>
  );
};

/**
 * NetworkMonitorHUD component
 */
const NetworkMonitorHUD = ({
  initialPosition,
  onPositionChange,
  onClose,
  visualParams
}) => {
  const [networkSpeed, setNetworkSpeed] = useState(generateNetworkSpeed());
  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [activeTab, setActiveTab] = useState('requests');
  const [filter, setFilter] = useState('');
  
  // Find selected request
  const selectedRequest = requests.find(req => req.id === selectedRequestId);
  
  // Generate simulated network metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkSpeed(generateNetworkSpeed());
      
      // Simulate new request coming in occasionally
      if (Math.random() > 0.7) {
        const methodTypes = ['GET', 'POST', 'PUT', 'DELETE'];
        const endpoints = [
          'assets/star-particles',
          'scenes/animation-data',
          'user/session',
          'analytics/events',
          'shaders/atmosphere',
          'physics/gravity-simulation'
        ];
        
        const newRequest = {
          id: `req_${Date.now()}`,
          url: `https://api.cosmicexplorer.io/${endpoints[Math.floor(Math.random() * endpoints.length)]}`,
          method: methodTypes[Math.floor(Math.random() * methodTypes.length)],
          status: Math.random() > 0.9 ? 404 : 200,
          size: Math.floor(Math.random() * 500000) + 1000,
          time: Math.floor(Math.random() * 300) + 30,
          timestamp: Date.now(),
          type: Math.random() > 0.5 ? 'application/json' : 'textures/jpg',
          initiator: 'DynamicLoader.js:87'
        };
        
        setRequests(prev => [newRequest, ...prev].slice(0, 20));
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Filter requests
  const filteredRequests = filter 
    ? requests.filter(req => 
        req.url.toLowerCase().includes(filter.toLowerCase()) || 
        req.method.toLowerCase().includes(filter.toLowerCase()) ||
        req.status.toString().includes(filter)
      )
    : requests;
  
  // Calculate total data transferred
  const totalDataTransferred = requests.reduce((total, req) => total + req.size, 0);
  
  // Calculate average response time
  const averageResponseTime = requests.length 
    ? Math.round(requests.reduce((total, req) => total + req.time, 0) / requests.length)
    : 0;
  
  return (
    <DraggableHUD
      title="Network Monitor"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={600}
      className="network-monitor-hud"
    >
      <div className="hud-content">
        {/* Network speed metrics */}
        <div className="network-metrics">
          <div className="metric">
            <div className="metric-label">Download</div>
            <div className="metric-value">{networkSpeed.download} MB/s</div>
          </div>
          
          <div className="metric">
            <div className="metric-label">Upload</div>
            <div className="metric-value">{networkSpeed.upload} MB/s</div>
          </div>
          
          <div className="metric">
            <div className="metric-label">Latency</div>
            <div className="metric-value">{networkSpeed.latency} ms</div>
          </div>
          
          <div className="metric">
            <div className="metric-label">Requests</div>
            <div className="metric-value">{requests.length}</div>
          </div>
          
          <div className="metric">
            <div className="metric-label">Data</div>
            <div className="metric-value">{formatSize(totalDataTransferred)}</div>
          </div>
          
          <div className="metric">
            <div className="metric-label">Avg Time</div>
            <div className="metric-value">{averageResponseTime} ms</div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Requests
          </button>
          
          <button 
            className={`tab ${activeTab === 'websockets' ? 'active' : ''}`}
            onClick={() => setActiveTab('websockets')}
          >
            WebSockets
          </button>
          
          <button 
            className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            Analysis
          </button>
        </div>
        
        {/* Filter input */}
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter requests..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input"
          />
          
          {filter && (
            <button className="clear-filter" onClick={() => setFilter('')}>×</button>
          )}
          
          <div className="results-count">
            {filteredRequests.length} of {requests.length}
          </div>
          
          <button className="clear-all" onClick={() => setRequests([])}>
            Clear All
          </button>
        </div>
        
        {/* Request list */}
        {activeTab === 'requests' && (
          <div className="requests-list">
            {/* Header row */}
            <div className="list-header">
              <div className="header-method">Method</div>
              <div className="header-url">URL</div>
              <div className="header-status">Status</div>
              <div className="header-size">Size</div>
              <div className="header-time">Time</div>
            </div>
            
            {/* List of requests */}
            <div className="list-body">
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <RequestRow 
                    key={request.id} 
                    request={request}
                    onClick={setSelectedRequestId}
                    isSelected={selectedRequestId === request.id}
                  />
                ))
              ) : (
                <div className="no-requests">
                  No requests to display
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* WebSockets tab */}
        {activeTab === 'websockets' && (
          <div className="websockets-tab">
            <div className="coming-soon">
              <div className="icon">🔌</div>
              <h3>WebSocket Monitoring</h3>
              <p>Real-time WebSocket connection monitoring coming soon</p>
            </div>
          </div>
        )}
        
        {/* Analysis tab */}
        {activeTab === 'analysis' && (
          <div className="analysis-tab">
            <div className="charts-grid">
              <div className="chart-container">
                <div className="chart-title">Request Methods</div>
                <div className="pie-chart">
                  <div className="pie-slice" style={{ 
                    '--percent': '65%', 
                    '--color': 'rgba(40, 120, 80, 0.7)' 
                  }}>65%</div>
                  <div className="pie-slice" style={{ 
                    '--percent': '20%', 
                    '--color': 'rgba(100, 80, 180, 0.7)' 
                  }}>20%</div>
                  <div className="pie-slice" style={{ 
                    '--percent': '15%', 
                    '--color': 'rgba(180, 120, 40, 0.7)' 
                  }}>15%</div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ background: 'rgba(40, 120, 80, 0.7)' }}></div>
                    <div className="legend-label">GET</div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ background: 'rgba(100, 80, 180, 0.7)' }}></div>
                    <div className="legend-label">POST</div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ background: 'rgba(180, 120, 40, 0.7)' }}></div>
                    <div className="legend-label">PUT</div>
                  </div>
                </div>
              </div>
              
              <div className="chart-container">
                <div className="chart-title">Response Times</div>
                <div className="bar-chart">
                  <div className="bar-container">
                    <div className="bar-label">assets</div>
                    <div className="bar" style={{ height: '80%', background: 'rgba(100, 150, 220, 0.7)' }}></div>
                    <div className="bar-value">230ms</div>
                  </div>
                  <div className="bar-container">
                    <div className="bar-label">scenes</div>
                    <div className="bar" style={{ height: '35%', background: 'rgba(100, 150, 220, 0.7)' }}></div>
                    <div className="bar-value">78ms</div>
                  </div>
                  <div className="bar-container">
                    <div className="bar-label">shaders</div>
                    <div className="bar" style={{ height: '25%', background: 'rgba(100, 150, 220, 0.7)' }}></div>
                    <div className="bar-value">45ms</div>
                  </div>
                  <div className="bar-container">
                    <div className="bar-label">analytics</div>
                    <div className="bar" style={{ height: '50%', background: 'rgba(100, 150, 220, 0.7)' }}></div>
                    <div className="bar-value">120ms</div>
                  </div>
                  <div className="bar-container">
                    <div className="bar-label">user</div>
                    <div className="bar" style={{ height: '45%', background: 'rgba(100, 150, 220, 0.7)' }}></div>
                    <div className="bar-value">110ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Request details */}
        {selectedRequest && (
          <div className="request-details">
            <div className="details-header">
              <h3 className="details-title">Request Details</h3>
              <button className="close-details" onClick={() => setSelectedRequestId(null)}>×</button>
            </div>
            
            <div className="details-content">
              <div className="detail-row">
                <div className="detail-label">URL</div>
                <div className="detail-value url">{selectedRequest.url}</div>
              </div>
              
              <div className="detail-grid">
                <div className="detail-row">
                  <div className="detail-label">Method</div>
                  <div className="detail-value method" data-method={selectedRequest.method}>{selectedRequest.method}</div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">Status</div>
                  <div className="detail-value status" data-status={selectedRequest.status >= 400 ? 'error' : 'success'}>
                    {selectedRequest.status}
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">Time</div>
                  <div className="detail-value">{selectedRequest.time} ms</div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">Size</div>
                  <div className="detail-value">{formatSize(selectedRequest.size)}</div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">Type</div>
                  <div className="detail-value">{selectedRequest.type}</div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">Timestamp</div>
                  <div className="detail-value" title={new Date(selectedRequest.timestamp).toLocaleString()}>
                    {formatRelativeTime(selectedRequest.timestamp)}
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">Initiator</div>
                  <div className="detail-value initiator">{selectedRequest.initiator}</div>
                </div>
              </div>
              
              <div className="actions">
                <button className="action-button">Copy URL</button>
                <button className="action-button">Replay</button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .hud-content {
          padding: 10px;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 600px;
          overflow: hidden;
        }
        
        .network-metrics {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .metric {
          background: rgba(40, 45, 60, 0.5);
          padding: 8px;
          border-radius: 4px;
          text-align: center;
        }
        
        .metric-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }
        
        .metric-value {
          font-size: 14px;
          font-weight: 500;
        }
        
        .tabs {
          display: flex;
          gap: 2px;
          margin-bottom: 5px;
        }
        
        .tab {
          background: rgba(40, 45, 60, 0.5);
          border: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 6px 12px;
          border-radius: 4px 4px 0 0;
          font-size: 12px;
          cursor: pointer;
        }
        
        .tab.active {
          background: rgba(60, 80, 120, 0.6);
          color: white;
        }
        
        .tab:hover:not(.active) {
          background: rgba(50, 55, 70, 0.6);
        }
        
        .filter-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 5px;
        }
        
        .filter-input {
          flex: 1;
          background: rgba(30, 35, 50, 0.6);
          border: 1px solid rgba(80, 90, 120, 0.4);
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .clear-filter {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          cursor: pointer;
          padding: 0;
          margin-left: -30px;
          width: 20px;
        }
        
        .results-count {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .clear-all {
          background: rgba(80, 40, 40, 0.5);
          border: none;
          color: rgba(255, 255, 255, 0.8);
          padding: 4px 8px;
          border-radius: 3px;
          font-size: 11px;
          cursor: pointer;
        }
        
        .clear-all:hover {
          background: rgba(100, 50, 50, 0.6);
        }
        
        .requests-list {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
          border: 1px solid rgba(80, 90, 120, 0.3);
          border-radius: 4px;
        }
        
        .list-header {
          display: grid;
          grid-template-columns: 65px 1fr 50px 70px 60px;
          gap: 8px;
          padding: 8px;
          background: rgba(40, 45, 60, 0.7);
          border-bottom: 1px solid rgba(80, 90, 120, 0.3);
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .header-size, .header-time {
          text-align: right;
        }
        
        .header-status {
          text-align: center;
        }
        
        .list-body {
          overflow-y: auto;
          flex: 1;
          max-height: 250px;
        }
        
        .no-requests {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 150px;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
        }
        
        .request-details {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 10px;
          padding-top: 10px;
        }
        
        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .details-title {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
        }
        
        .close-details {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 18px;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
        }
        
        .detail-row {
          display: flex;
          margin-bottom: 6px;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px 20px;
          margin: 10px 0;
        }
        
        .detail-label {
          width: 80px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
        }
        
        .detail-value {
          flex: 1;
          font-size: 12px;
        }
        
        .detail-value.url {
          word-break: break-all;
        }
        
        .detail-value.method {
          font-weight: 500;
        }
        
        .detail-value.method[data-method="GET"] {
          color: #7effcb;
        }
        
        .detail-value.method[data-method="POST"] {
          color: #b4a6ff;
        }
        
        .detail-value.method[data-method="PUT"] {
          color: #ffd280;
        }
        
        .detail-value.method[data-method="DELETE"] {
          color: #ff8080;
        }
        
        .detail-value.status[data-status="error"] {
          color: #ff6060;
        }
        
        .detail-value.status[data-status="success"] {
          color: #60d060;
        }
        
        .detail-value.initiator {
          font-family: monospace;
          background: rgba(40, 45, 60, 0.6);
          padding: 2px 6px;
          border-radius: 3px;
        }
        
        .actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 10px;
        }
        
        .action-button {
          background: rgba(60, 80, 120, 0.5);
          border: 1px solid rgba(100, 120, 180, 0.3);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }
        
        .action-button:hover {
          background: rgba(70, 90, 140, 0.6);
        }
        
        .websockets-tab, .analysis-tab {
          border: 1px solid rgba(80, 90, 120, 0.3);
          border-radius: 4px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .coming-soon {
          text-align: center;
          padding: 30px;
        }
        
        .coming-soon .icon {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        .coming-soon h3 {
          margin: 0 0 10px 0;
          font-weight: 500;
        }
        
        .coming-soon p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }
        
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          padding: 15px;
        }
        
        .chart-container {
          background: rgba(30, 35, 50, 0.6);
          border-radius: 4px;
          padding: 10px;
        }
        
        .chart-title {
          text-align: center;
          font-size: 13px;
          margin-bottom: 15px;
          font-weight: 500;
        }
        
        .pie-chart {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #222;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .pie-slice {
          position: absolute;
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%);
          background: var(--color);
          transform: rotate(calc(var(--start-angle, 0deg) + 90deg));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        }
        
        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
        }
        
        .legend-color {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }
        
        .bar-chart {
          display: flex;
          height: 120px;
          justify-content: space-between;
          align-items: flex-end;
          gap: 5px;
          padding: 0 10px;
        }
        
        .bar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        
        .bar-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 5px;
        }
        
        .bar {
          width: 100%;
          border-radius: 2px 2px 0 0;
        }
        
        .bar-value {
          font-size: 10px;
          margin-bottom: 5px;
        }
      `}</style>
    </DraggableHUD>
  );
};

NetworkMonitorHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  onPositionChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  visualParams: PropTypes.object
};

export default NetworkMonitorHUD; 