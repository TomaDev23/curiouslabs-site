/**
 * deviceDetection.js
 * Utility functions for device capability detection and performance optimization
 * LEGIT-compliant utilities for Animation Schema v1.5
 */

/**
 * Detect if the current device is a mobile or tablet
 * @returns {boolean} True if mobile/tablet, false if desktop
 */
export const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Detect if the user prefers reduced motion
 * @returns {boolean} True if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get device memory if available (Chrome only)
 * @returns {number} Device memory in GB or null if not available
 */
export const getDeviceMemory = () => {
  if (typeof navigator === 'undefined' || !navigator.deviceMemory) {
    return null;
  }
  
  return navigator.deviceMemory;
};

/**
 * Calculate device performance tier
 * Returns a value from 1-5:
 * 1: Low-end mobile, limited animation support
 * 2: Mid-tier mobile, basic animations
 * 3: High-end mobile / low-end desktop
 * 4: Mid-tier desktop
 * 5: High-end desktop
 * 
 * @returns {number} Device performance tier (1-5)
 */
export const getDevicePerformanceTier = () => {
  // Start with a baseline score
  let score = 3;
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return score;
  
  // Mobile devices start with a lower baseline
  if (isMobileDevice()) {
    score -= 1;
  }
  
  // Check for reduced motion preference
  if (prefersReducedMotion()) {
    score -= 1;
  }
  
  // Check device memory (Chrome only)
  const memory = getDeviceMemory();
  if (memory !== null) {
    if (memory <= 2) {
      score -= 1;
    } else if (memory >= 8) {
      score += 1;
    }
  }
  
  // Check if device has a high pixel density (retina/high-DPI)
  if (window.devicePixelRatio > 2) {
    score -= 1; // High-DPI displays require more GPU power
  }
  
  // Check for hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency) {
    if (navigator.hardwareConcurrency <= 2) {
      score -= 1;
    } else if (navigator.hardwareConcurrency >= 8) {
      score += 1;
    }
  }
  
  // Ensure score is within bounds
  return Math.max(1, Math.min(5, score));
};

/**
 * Get the recommended particle count based on device tier
 * @param {number} baseCount - The base particle count for tier 3 devices
 * @returns {number} Adjusted particle count
 */
export const getOptimalParticleCount = (baseCount) => {
  const tier = getDevicePerformanceTier();
  const factors = [0.2, 0.4, 0.7, 1.0, 1.3];
  
  return Math.floor(baseCount * factors[tier - 1]);
};

/**
 * Check if a specific visual effect should be enabled
 * @param {string} effectType - Type of effect ('blur', 'particles', etc.)
 * @returns {boolean} Whether the effect should be enabled
 */
export const shouldEnableEffect = (effectType) => {
  const tier = getDevicePerformanceTier();
  
  switch (effectType) {
    case 'blur':
      return tier >= 3;
    case 'particles':
      return tier >= 2;
    case 'parallax':
      return tier >= 2 && !prefersReducedMotion();
    case 'advanced_lighting':
      return tier >= 4;
    case 'complex_gradients':
      return tier >= 3;
    case 'shadow_effects':
      return tier >= 3;
    default:
      return true; // Enable by default
  }
};

/**
 * Get the optimal visual configuration based on device capabilities
 * @returns {Object} Configuration object with recommended settings
 */
export const getOptimalVisualConfig = () => {
  const tier = getDevicePerformanceTier();
  const isMobile = isMobileDevice();
  
  return {
    // Star field configuration
    stars: {
      count: getOptimalParticleCount(isMobile ? 1500 : 3000),
      useGlow: tier >= 3,
      useShimmer: tier >= 2,
      maxSize: 1.0 + (tier * 0.3)
    },
    
    // Particle effects
    particles: {
      enabled: tier >= 2,
      count: getOptimalParticleCount(isMobile ? 50 : 250),
      useTrails: tier >= 3
    },
    
    // Visual effects
    effects: {
      useBlur: shouldEnableEffect('blur'),
      useParallax: shouldEnableEffect('parallax'),
      parallaxStrength: Math.min(1.0, tier * 0.2),
      useShadows: shouldEnableEffect('shadow_effects')
    },
    
    // Animation timing (conforms to AnimationSchema v1.5)
    timing: {
      transitionSpeed: 1.0 - ((5 - tier) * 0.15), // 0.4 to 1.0 multiplier
      useFrameSkip: tier < 3
    }
  };
};

export default {
  isMobileDevice,
  prefersReducedMotion,
  getDevicePerformanceTier,
  getOptimalParticleCount,
  shouldEnableEffect,
  getOptimalVisualConfig
}; 