/**
 * Performance Monitor Utility
 * Tracks component rendering times, page load metrics, and provides insights
 * for performance optimization without impacting the user experience
 */

// Performance data storage
const performanceData = {
  componentRenderTimes: {},
  navigationTimes: {},
  interactionTimes: {},
  resourceLoadTimes: [],
  framesPerSecond: [],
  memoryUsage: [],
  longTasks: []
};

// Constants
const PERFORMANCE_THRESHOLD_RENDER = 50; // ms
const PERFORMANCE_THRESHOLD_LOAD = 200; // ms
const FPS_SAMPLE_SIZE = 10;

/**
 * Start tracking a component render
 * @param {string} componentName - The name of the component being rendered
 * @returns {number} Start time for the render
 */
export const startComponentRender = (componentName) => {
  if (!componentName) return 0;
  return performance.now();
};

/**
 * End tracking a component render and store metrics
 * @param {string} componentName - The name of the component being rendered
 * @param {number} startTime - The start time returned from startComponentRender
 */
export const endComponentRender = (componentName, startTime) => {
  if (!componentName || !startTime) return;
  
  const renderTime = performance.now() - startTime;
  
  // Initialize component data if it doesn't exist
  if (!performanceData.componentRenderTimes[componentName]) {
    performanceData.componentRenderTimes[componentName] = {
      count: 0,
      totalTime: 0,
      avgTime: 0,
      minTime: Number.MAX_SAFE_INTEGER,
      maxTime: 0,
      lastRenderTime: 0,
      slowRenders: 0
    };
  }
  
  const compData = performanceData.componentRenderTimes[componentName];
  
  // Update metrics
  compData.count++;
  compData.totalTime += renderTime;
  compData.avgTime = compData.totalTime / compData.count;
  compData.minTime = Math.min(compData.minTime, renderTime);
  compData.maxTime = Math.max(compData.maxTime, renderTime);
  compData.lastRenderTime = renderTime;
  
  // Track slow renders
  if (renderTime > PERFORMANCE_THRESHOLD_RENDER) {
    compData.slowRenders++;
    
    // Log slow renders in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Performance] Slow render for ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
  }
};

/**
 * Record page load performance
 * @param {string} path - The path that was loaded
 */
export const recordPageLoad = (path) => {
  if (!path || typeof window === 'undefined') return;
  
  // Use Navigation Timing API if available
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domReadyTime = timing.domComplete - timing.domLoading;
    const networkLatency = timing.responseEnd - timing.requestStart;
    
    performanceData.navigationTimes[path] = {
      loadTime,
      domReadyTime,
      networkLatency,
      timestamp: Date.now()
    };
    
    // Log slow page loads in development
    if (process.env.NODE_ENV === 'development' && loadTime > PERFORMANCE_THRESHOLD_LOAD) {
      console.warn(`[Performance] Slow page load for ${path}: ${loadTime}ms`);
    }
  }
  
  // Record resource load times if available
  if (window.performance && window.performance.getEntriesByType) {
    const resources = window.performance.getEntriesByType('resource');
    
    performanceData.resourceLoadTimes = resources.map(resource => ({
      name: resource.name,
      duration: resource.duration,
      size: resource.transferSize || 0,
      type: resource.initiatorType
    }));
  }
};

/**
 * Start monitoring frames per second
 * Call this on app initialization
 */
export const startFPSMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  let frameCount = 0;
  let lastTime = performance.now();
  const interval = 1000; // 1 second
  
  const countFrames = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= interval) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      performanceData.framesPerSecond.push({
        fps,
        timestamp: Date.now()
      });
      
      // Keep only the last N samples
      if (performanceData.framesPerSecond.length > FPS_SAMPLE_SIZE) {
        performanceData.framesPerSecond.shift();
      }
      
      // Log low FPS in development
      if (process.env.NODE_ENV === 'development' && fps < 30) {
        console.warn(`[Performance] Low FPS detected: ${fps}`);
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(countFrames);
  };
  
  requestAnimationFrame(countFrames);
};

/**
 * Get current performance data
 * @returns {Object} The current performance metrics
 */
export const getPerformanceData = () => {
  return { ...performanceData };
};

/**
 * Get performance recommendations based on collected data
 * @returns {Array} List of performance recommendations
 */
export const getPerformanceRecommendations = () => {
  const recommendations = [];
  
  // Check component render times
  Object.entries(performanceData.componentRenderTimes).forEach(([name, data]) => {
    if (data.avgTime > PERFORMANCE_THRESHOLD_RENDER) {
      recommendations.push({
        component: name,
        issue: 'Slow render times',
        metric: `${data.avgTime.toFixed(2)}ms average`,
        recommendation: 'Consider memoization or code splitting'
      });
    }
  });
  
  // Check resource load times
  const slowResources = performanceData.resourceLoadTimes
    .filter(r => r.duration > PERFORMANCE_THRESHOLD_LOAD)
    .slice(0, 5);
    
  if (slowResources.length > 0) {
    slowResources.forEach(resource => {
      recommendations.push({
        resource: resource.name,
        issue: 'Slow resource loading',
        metric: `${resource.duration.toFixed(2)}ms`,
        recommendation: 'Consider optimization, compression, or lazy loading'
      });
    });
  }
  
  // Check FPS
  const avgFps = performanceData.framesPerSecond.reduce((sum, data) => sum + data.fps, 0) / 
                (performanceData.framesPerSecond.length || 1);
  
  if (avgFps < 50) {
    recommendations.push({
      issue: 'Low frames per second',
      metric: `${avgFps.toFixed(1)} FPS average`,
      recommendation: 'Reduce animation complexity or optimize render cycles'
    });
  }
  
  return recommendations;
};

export default {
  startComponentRender,
  endComponentRender,
  recordPageLoad,
  startFPSMonitoring,
  getPerformanceData,
  getPerformanceRecommendations
}; 