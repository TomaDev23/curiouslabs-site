/**
 * Performance Monitoring Initialization
 * Bootstraps all performance monitoring features when the application starts
 */

import { 
  startFPSMonitoring, 
  recordPageLoad 
} from './performanceMonitor';

/**
 * Initialize all performance monitoring features
 * Call this at app startup or page load
 */
function initializePerformanceFunc() {
  if (typeof window === 'undefined') return;
  
  // Start FPS monitoring
  startFPSMonitoring();
  
  // Record initial page load metrics
  if (typeof recordPageLoad === 'function') {
    recordPageLoad(window.location.pathname);
  }

  // Monitor route changes if using client-side routing
  if (typeof window !== 'undefined') {
    // Set up monitoring for long tasks
    setupLongTasksMonitoring();
    
    // Log performance info to console in development
    if (process.env.NODE_ENV === 'development') {
      logPerformanceInfo();
    }
  }
};

/**
 * Set up monitoring for long tasks that block the main thread
 */
function setupLongTasksMonitoring() {
  if (typeof PerformanceObserver !== 'undefined') {
    try {
      // Create observer for long tasks
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log long tasks in development
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        });
      });
      
      // Start observing long tasks
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('[Performance] Long tasks monitoring not supported', e);
    }
  }
}

/**
 * Log performance information to console in development mode
 */
function logPerformanceInfo() {
  // Log basic navigation timing
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    
    console.log(`[Performance] Page loaded in ${pageLoadTime}ms`);
    console.log(`[Performance] DOM ready in ${timing.domComplete - timing.domLoading}ms`);
    console.log(`[Performance] Network latency: ${timing.responseEnd - timing.requestStart}ms`);
  }
  
  // Report memory usage if available
  if (window.performance && window.performance.memory) {
    const memory = window.performance.memory;
    console.log(`[Performance] Memory usage: ${(memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)}MB / ${(memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2)}MB`);
  }
}

// Log initialization
console.log('[Performance] Monitoring initialized');

// Export both named and default export for compatibility
export const initializePerformance = initializePerformanceFunc;
export default initializePerformanceFunc; 