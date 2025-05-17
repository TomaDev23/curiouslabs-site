/**
 * Centralized scroll pipeline for optimized scroll-based animations
 */

const subscribers = new Set();
let ticking = false;
let lastKnownScroll = 0;
let scheduledFrame = null;

// Normalized scroll progress calculation
const calculateScrollProgress = () => {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
};

// Optimized scroll event handler
const handleScroll = () => {
  lastKnownScroll = window.scrollY;
  
  if (!ticking) {
    ticking = true;
    scheduledFrame = requestAnimationFrame(() => {
      const progress = calculateScrollProgress();
      subscribers.forEach(callback => callback(progress));
      ticking = false;
    });
  }
};

// Public API
export const ScrollPipeline = {
  /**
   * Subscribe to scroll updates
   * @param {function(number)} callback - Function to receive scroll progress (0-1)
   * @returns {function} Cleanup function
   */
  subscribe(callback) {
    subscribers.add(callback);
    
    // Initial call with current scroll position
    callback(calculateScrollProgress());
    
    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        window.removeEventListener('scroll', handleScroll);
        if (scheduledFrame) {
          cancelAnimationFrame(scheduledFrame);
          scheduledFrame = null;
        }
      }
    };
  },

  /**
   * Initialize the scroll pipeline
   */
  init() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
  },

  /**
   * Clean up all subscriptions and events
   */
  cleanup() {
    subscribers.clear();
    window.removeEventListener('scroll', handleScroll);
    if (scheduledFrame) {
      cancelAnimationFrame(scheduledFrame);
      scheduledFrame = null;
    }
  }
}; 