import { startFPSMonitoring } from './performanceMonitor';

/**
 * Initialize performance monitoring for the application
 * Sets up FPS monitoring and registers with the app
 * Should be called once during app initialization
 */
const initializePerformance = () => {
  if (typeof window === 'undefined') return;
  
  // Start FPS monitoring
  startFPSMonitoring();
  
  // Add performance observer for long tasks if available
  if (typeof PerformanceObserver !== 'undefined') {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        });
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task observation not supported', e);
    }
  }
  
  // Set up layout shift monitoring
  if (typeof PerformanceObserver !== 'undefined') {
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let cumulativeLayoutShift = 0;
        
        entries.forEach((entry) => {
          // Only include shifts without user input and within 500ms of load
          if (!entry.hadRecentInput) {
            cumulativeLayoutShift += entry.value;
          }
        });
        
        if (cumulativeLayoutShift > 0.1 && process.env.NODE_ENV === 'development') {
          console.warn(`[Performance] High Cumulative Layout Shift detected: ${cumulativeLayoutShift.toFixed(3)}`);
        }
      });
      
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Layout shift observation not supported', e);
    }
  }
  
  // Initialize paint timing observation
  if (typeof PerformanceObserver !== 'undefined') {
    try {
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          const metricName = entry.name === 'first-paint' ? 'FP' : 'FCP';
          const time = Math.round(entry.startTime);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Performance] ${metricName}: ${time}ms`);
          }
        });
      });
      
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('Paint timing observation not supported', e);
    }
  }
  
  // Report performance information when the page is unloaded
  window.addEventListener('unload', () => {
    // This could send analytics in the future, but we're just logging for now
    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance] Page unloaded, performance data collected');
    }
  });
  
  console.log('[Performance] Monitoring initialized');
};

export default initializePerformance; 