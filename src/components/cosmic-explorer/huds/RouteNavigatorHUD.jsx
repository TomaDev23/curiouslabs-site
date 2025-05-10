/**
 * RouteNavigatorHUD.jsx
 * Site routing visualization and navigation tool
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_route_navigator_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_route_navigator_hud.md'
};

/**
 * RouteNavigatorHUD component
 * Provides route visualization and navigation capabilities
 */
const RouteNavigatorHUD = ({
  initialPosition = { x: 500, y: 100 },
  onPositionChange,
  onClose
}) => {
  // Route state
  const [routes, setRoutes] = useState([]);
  const [currentRoute, setCurrentRoute] = useState('');
  const [queryParams, setQueryParams] = useState({});
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [expandedRoute, setExpandedRoute] = useState(null);
  
  // Route test params
  const [testRoute, setTestRoute] = useState('');
  const [testParams, setTestParams] = useState('');
  
  // Visualization options
  const [showHistory, setShowHistory] = useState(true);
  const [historyLimit, setHistoryLimit] = useState(5);
  
  // Mock route data for development - would be replaced with real route data
  const mockRoutes = [
    { 
      path: '/', 
      name: 'Home',
      component: 'HomeView',
      children: [],
      exact: true,
      params: []
    },
    { 
      path: '/explore', 
      name: 'Explore',
      component: 'ExploreView',
      children: [
        { path: '/explore/galaxies', name: 'Galaxies', component: 'GalaxiesView' },
        { path: '/explore/stars', name: 'Stars', component: 'StarsView' },
        { path: '/explore/planets', name: 'Planets', component: 'PlanetsView' }
      ],
      params: []
    },
    { 
      path: '/journey/:journeyId', 
      name: 'Cosmic Journey',
      component: 'JourneyView',
      children: [
        { path: '/journey/:journeyId/scene/:sceneIndex', name: 'Scene View', component: 'SceneView' }
      ],
      params: ['journeyId', 'sceneIndex']
    },
    { 
      path: '/settings', 
      name: 'Settings',
      component: 'SettingsView',
      children: [
        { path: '/settings/profile', name: 'Profile', component: 'ProfileView' },
        { path: '/settings/display', name: 'Display', component: 'DisplayView' },
        { path: '/settings/controls', name: 'Controls', component: 'ControlsView' }
      ],
      params: []
    },
    { 
      path: '/about', 
      name: 'About',
      component: 'AboutView',
      children: [],
      params: []
    },
    { 
      path: '/debug', 
      name: 'Debug',
      component: 'DebugView',
      children: [],
      params: []
    },
    { 
      path: '*', 
      name: 'Not Found',
      component: 'NotFoundView',
      children: [],
      params: []
    }
  ];
  
  // Effect to initialize routes
  useEffect(() => {
    setRoutes(mockRoutes);
    
    // Set initial route and query params based on current URL
    const updateFromCurrentLocation = () => {
      const location = window.location;
      setCurrentRoute(location.pathname);
      
      // Parse query params
      const queryObj = {};
      new URLSearchParams(location.search).forEach((value, key) => {
        queryObj[key] = value;
      });
      setQueryParams(queryObj);
      
      // Add to history
      setNavigationHistory(prev => {
        const newHistory = [
          ...prev,
          {
            path: location.pathname,
            search: location.search,
            timestamp: Date.now()
          }
        ];
        // Keep only the most recent entries based on historyLimit
        return newHistory.slice(-historyLimit);
      });
    };
    
    // Initialize from current location
    updateFromCurrentLocation();
    
    // Listen for route changes
    const handleRouteChange = () => {
      updateFromCurrentLocation();
    };
    
    // Monitor history state changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Try to hook into router navigation events if available
    // This is a simplified version - real implementation would need to adapt to the specific router
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      const result = originalPushState.apply(this, arguments);
      handleRouteChange();
      return result;
    };
    
    // Clean up
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
    };
  }, [historyLimit]);
  
  // Navigate to a route
  const navigateTo = useCallback((path, params = {}) => {
    // Build query string
    const queryString = Object.keys(params).length > 0
      ? '?' + Object.entries(params)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&')
      : '';
    
    // Update history (in a real implementation, this would use router navigation)
    window.history.pushState({}, '', path + queryString);
    
    // Update current route and params
    setCurrentRoute(path);
    setQueryParams(params);
    
    // Add to history
    setNavigationHistory(prev => {
      const newHistory = [
        ...prev,
        {
          path: path,
          search: queryString,
          timestamp: Date.now()
        }
      ];
      return newHistory.slice(-historyLimit);
    });
  }, [historyLimit]);
  
  // Handle test route navigation
  const handleTestNavigation = () => {
    // Parse test params
    const params = {};
    if (testParams) {
      testParams.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key && value) {
          params[key.trim()] = value.trim();
        }
      });
    }
    
    navigateTo(testRoute, params);
  };
  
  // Format timestamp for display
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  // Find route details by path
  const findRouteByPath = (path) => {
    // Remove query string if present
    const cleanPath = path.split('?')[0];
    
    // Try to find an exact match
    for (const route of routes) {
      if (route.path === cleanPath) {
        return route;
      }
      
      // Check children
      if (route.children) {
        for (const child of route.children) {
          if (child.path === cleanPath) {
            return child;
          }
        }
      }
    }
    
    // Handle dynamic routes with parameters
    for (const route of routes) {
      if (route.path.includes(':')) {
        const pathPattern = route.path.replace(/:[^/]+/g, '([^/]+)');
        const regex = new RegExp(`^${pathPattern}$`);
        if (regex.test(cleanPath)) {
          return route;
        }
      }
      
      // Check children with parameters
      if (route.children) {
        for (const child of route.children) {
          if (child.path.includes(':')) {
            const pathPattern = child.path.replace(/:[^/]+/g, '([^/]+)');
            const regex = new RegExp(`^${pathPattern}$`);
            if (regex.test(cleanPath)) {
              return child;
            }
          }
        }
      }
    }
    
    // Return the catch-all route if no match found
    return routes.find(r => r.path === '*');
  };
  
  // Extract params from path based on route pattern
  const extractRouteParams = (routePath, currentPath) => {
    const params = {};
    
    if (!routePath.includes(':')) {
      return params;
    }
    
    const routeParts = routePath.split('/');
    const pathParts = currentPath.split('/');
    
    routeParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.substring(1);
        params[paramName] = pathParts[index] || '';
      }
    });
    
    return params;
  };
  
  // Determine if a route is active (exact match or child route)
  const isRouteActive = (route) => {
    if (currentRoute === route.path) {
      return true;
    }
    
    // Check if this is a parent of the current route
    if (route.children && route.children.length > 0) {
      return route.children.some(child => currentRoute === child.path);
    }
    
    // Check if this is a dynamic route that matches current path
    if (route.path.includes(':')) {
      const pathPattern = route.path.replace(/:[^/]+/g, '([^/]+)');
      const regex = new RegExp(`^${pathPattern}$`);
      return regex.test(currentRoute);
    }
    
    return false;
  };
  
  // Toggle expanded route
  const toggleRouteExpand = (routePath) => {
    setExpandedRoute(expandedRoute === routePath ? null : routePath);
  };
  
  // Current route details
  const currentRouteDetails = findRouteByPath(currentRoute);
  const currentRouteParams = currentRouteDetails?.path.includes(':')
    ? extractRouteParams(currentRouteDetails.path, currentRoute)
    : {};
  
  return (
    <DraggableHUD
      title="Route Navigator"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={400}
      height={500}
      className="route-navigator-hud"
    >
      <div className="route-navigator-content">
        {/* Current route display */}
        <div className="current-route-section">
          <div className="section-title">Current Route</div>
          <div className="current-route">
            <div className="route-path">{currentRoute}</div>
            {Object.keys(queryParams).length > 0 && (
              <div className="query-params">
                <div className="params-label">Query Parameters:</div>
                <div className="params-list">
                  {Object.entries(queryParams).map(([key, value]) => (
                    <div key={key} className="param-item">
                      <span className="param-key">{key}:</span>
                      <span className="param-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {Object.keys(currentRouteParams).length > 0 && (
              <div className="route-params">
                <div className="params-label">Route Parameters:</div>
                <div className="params-list">
                  {Object.entries(currentRouteParams).map(([key, value]) => (
                    <div key={key} className="param-item">
                      <span className="param-key">{key}:</span>
                      <span className="param-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="route-component">
              Component: <span className="component-name">{currentRouteDetails?.component || 'Unknown'}</span>
            </div>
          </div>
        </div>
        
        {/* Routes list */}
        <div className="routes-section">
          <div className="section-title">Available Routes</div>
          <div className="routes-list">
            {routes.map(route => (
              <div key={route.path} className="route-item-container">
                <div 
                  className={`route-item ${isRouteActive(route) ? 'active' : ''}`}
                  onClick={() => navigateTo(route.path)}
                >
                  <div className="route-item-path">{route.path}</div>
                  <div className="route-item-name">{route.name}</div>
                  {route.children && route.children.length > 0 && (
                    <button 
                      className="expand-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRouteExpand(route.path);
                      }}
                    >
                      {expandedRoute === route.path ? '▼' : '►'}
                    </button>
                  )}
                </div>
                
                {/* Child routes */}
                {expandedRoute === route.path && route.children && route.children.length > 0 && (
                  <div className="child-routes">
                    {route.children.map(child => (
                      <div 
                        key={child.path}
                        className={`route-item child ${isRouteActive(child) ? 'active' : ''}`}
                        onClick={() => navigateTo(child.path)}
                      >
                        <div className="route-item-path">{child.path}</div>
                        <div className="route-item-name">{child.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation test */}
        <div className="nav-test-section">
          <div className="section-title">Test Navigation</div>
          <div className="test-inputs">
            <div className="input-group">
              <label>Route:</label>
              <input
                type="text"
                value={testRoute}
                onChange={(e) => setTestRoute(e.target.value)}
                placeholder="/path/to/route"
              />
            </div>
            <div className="input-group">
              <label>Params:</label>
              <input
                type="text"
                value={testParams}
                onChange={(e) => setTestParams(e.target.value)}
                placeholder="key1=value1&key2=value2"
              />
            </div>
            <button 
              className="nav-button"
              onClick={handleTestNavigation}
              disabled={!testRoute}
            >
              Navigate
            </button>
          </div>
        </div>
        
        {/* Navigation history */}
        {showHistory && (
          <div className="history-section">
            <div className="section-header">
              <div className="section-title">Navigation History</div>
              <div className="history-controls">
                <select 
                  value={historyLimit}
                  onChange={(e) => setHistoryLimit(Number(e.target.value))}
                >
                  <option value="5">5 entries</option>
                  <option value="10">10 entries</option>
                  <option value="20">20 entries</option>
                </select>
                <button 
                  className="history-toggle"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  Hide
                </button>
              </div>
            </div>
            <div className="history-list">
              {navigationHistory.length === 0 ? (
                <div className="empty-history">No navigation history yet</div>
              ) : (
                navigationHistory.map((entry, index) => (
                  <div 
                    key={index}
                    className="history-item"
                    onClick={() => navigateTo(entry.path, {})}
                  >
                    <div className="history-time">{formatTime(entry.timestamp)}</div>
                    <div className="history-path">{entry.path}{entry.search}</div>
                  </div>
                )).reverse()
              )}
            </div>
          </div>
        )}
        
        {!showHistory && (
          <button 
            className="history-show-button"
            onClick={() => setShowHistory(true)}
          >
            Show History
          </button>
        )}
      </div>
      
      <style jsx>{`
        .route-navigator-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 12px;
          padding: 0 8px 8px;
          overflow-y: auto;
        }
        
        .section-title {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 3px;
        }
        
        .current-route-section {
          background: rgba(40, 40, 60, 0.6);
          border-radius: 4px;
          padding: 8px;
        }
        
        .current-route {
          background: rgba(50, 50, 70, 0.4);
          border-radius: 4px;
          padding: 8px;
        }
        
        .route-path {
          font-family: monospace;
          font-size: 14px;
          color: rgba(128, 215, 255, 0.9);
          padding: 4px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
          margin-bottom: 6px;
        }
        
        .query-params, .route-params {
          margin-top: 8px;
          padding: 6px;
          background: rgba(30, 30, 40, 0.4);
          border-radius: 3px;
        }
        
        .params-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }
        
        .params-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .param-item {
          display: flex;
          font-family: monospace;
          font-size: 11px;
          background: rgba(40, 40, 60, 0.6);
          padding: 3px 6px;
          border-radius: 2px;
        }
        
        .param-key {
          color: rgba(255, 190, 130, 0.9);
          margin-right: 6px;
        }
        
        .param-value {
          color: rgba(130, 255, 130, 0.9);
        }
        
        .route-component {
          margin-top: 8px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .component-name {
          color: rgba(180, 180, 255, 0.9);
          font-family: monospace;
        }
        
        .routes-section {
          background: rgba(40, 40, 60, 0.6);
          border-radius: 4px;
          padding: 8px;
        }
        
        .routes-list {
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-right: 4px;
        }
        
        .route-item {
          display: flex;
          align-items: center;
          background: rgba(50, 50, 70, 0.4);
          padding: 6px 8px;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.2s;
          position: relative;
        }
        
        .route-item:hover {
          background: rgba(60, 60, 90, 0.5);
        }
        
        .route-item.active {
          background: rgba(60, 80, 180, 0.3);
          border-left: 2px solid rgba(100, 150, 255, 0.8);
        }
        
        .route-item.child {
          margin-left: 16px;
          padding: 4px 8px;
          background: rgba(40, 40, 60, 0.6);
        }
        
        .route-item-path {
          font-family: monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.9);
          flex: 1;
        }
        
        .route-item-name {
          font-size: 10px;
          color: rgba(180, 220, 255, 0.8);
          background: rgba(40, 60, 100, 0.3);
          padding: 2px 6px;
          border-radius: 3px;
          margin-left: 8px;
        }
        
        .expand-button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 10px;
          cursor: pointer;
          padding: 2px 4px;
          margin-left: 8px;
        }
        
        .expand-button:hover {
          color: rgba(255, 255, 255, 1);
        }
        
        .child-routes {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 2px;
          margin-bottom: 4px;
        }
        
        .nav-test-section {
          background: rgba(40, 40, 60, 0.6);
          border-radius: 4px;
          padding: 8px;
        }
        
        .test-inputs {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .input-group label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .input-group input {
          background: rgba(30, 30, 40, 0.7);
          border: 1px solid rgba(100, 100, 140, 0.3);
          padding: 5px 8px;
          border-radius: 3px;
          color: white;
          font-family: monospace;
          font-size: 11px;
        }
        
        .nav-button {
          background: rgba(60, 80, 180, 0.4);
          border: 1px solid rgba(100, 150, 255, 0.3);
          color: white;
          font-size: 12px;
          padding: 6px;
          border-radius: 3px;
          cursor: pointer;
          margin-top: 4px;
          transition: all 0.2s;
        }
        
        .nav-button:hover:not([disabled]) {
          background: rgba(70, 100, 200, 0.5);
        }
        
        .nav-button[disabled] {
          opacity: 0.5;
          cursor: default;
        }
        
        .history-section {
          background: rgba(40, 40, 60, 0.6);
          border-radius: 4px;
          padding: 8px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        
        .history-controls {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .history-controls select {
          background: rgba(30, 30, 40, 0.7);
          border: 1px solid rgba(100, 100, 140, 0.3);
          color: white;
          font-size: 10px;
          padding: 2px 4px;
          border-radius: 2px;
        }
        
        .history-toggle, .history-show-button {
          background: rgba(50, 50, 70, 0.4);
          border: 1px solid rgba(100, 100, 140, 0.3);
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 2px;
          cursor: pointer;
        }
        
        .history-show-button {
          align-self: center;
          padding: 4px 8px;
        }
        
        .history-list {
          max-height: 100px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .history-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(50, 50, 70, 0.4);
          padding: 4px 8px;
          border-radius: 3px;
          cursor: pointer;
        }
        
        .history-item:hover {
          background: rgba(60, 60, 90, 0.5);
        }
        
        .history-time {
          font-size: 10px;
          color: rgba(180, 180, 180, 0.8);
          white-space: nowrap;
        }
        
        .history-path {
          font-family: monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.9);
          text-overflow: ellipsis;
          overflow: hidden;
        }
        
        .empty-history {
          text-align: center;
          padding: 10px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          font-style: italic;
        }
      `}</style>
    </DraggableHUD>
  );
};

RouteNavigatorHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default RouteNavigatorHUD; 