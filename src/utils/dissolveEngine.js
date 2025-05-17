/**
 * Dissolve Engine - Calculates smooth opacity transitions between scenes
 * with configurable fade zones and transition curves.
 */

/**
 * Enhanced dissolve engine with cubic easing and z-index management
 * LEGIT Contract: SCS0 - Scene Transition Management
 */

/**
 * Cubic easing function for smooth transitions
 * @param {number} t - Input value (0-1)
 * @returns {number} Eased value
 */
function cubicEaseInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculates opacity value for scene transitions with configurable smoothing
 * @param {number} scrollProgress - Current scroll position (0-1)
 * @param {number} sceneStart - Scene start point (0-1)
 * @param {number} sceneEnd - Scene end point (0-1)
 * @param {number} fadeZone - Size of fade zone (0-1)
 * @param {Object} options - Additional options for fine-tuning
 * @returns {number} Opacity value between 0 and 1
 */
export function getDissolveOpacity(scrollProgress, sceneStart, sceneEnd, fadeZone, options = {}) {
  const {
    smoothFade = true,
    fadeInBuffer = 0.02,
    fadeOutBuffer = 0.02,
    easeIntensity = 1.5
  } = options;

  // Calculate effective boundaries with fade zones
  const fadeInStart = Math.max(0, sceneStart - fadeZone);
  const fadeInEnd = sceneStart + (fadeZone * fadeInBuffer);
  const fadeOutStart = sceneEnd - (fadeZone * fadeOutBuffer);
  const fadeOutEnd = Math.min(1, sceneEnd + fadeZone);

  // Early exit for out-of-range values
  if (scrollProgress <= fadeInStart) return 0;
  if (scrollProgress >= fadeOutEnd) return 0;

  // Full opacity between fade zones
  if (scrollProgress >= fadeInEnd && scrollProgress <= fadeOutStart) {
    return 1;
  }

  // Calculate fade-in
  if (scrollProgress < fadeInEnd) {
    const progress = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
    const easedProgress = smoothFade ? cubicEaseInOut(progress) : progress;
    return Math.max(0, Math.min(1, Math.pow(easedProgress, easeIntensity)));
  }

  // Calculate fade-out
  const progress = 1 - ((scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart));
  const easedProgress = smoothFade ? cubicEaseInOut(progress) : progress;
  return Math.max(0, Math.min(1, Math.pow(easedProgress, easeIntensity)));
}

/**
 * Calculates z-index for proper scene layering
 * @param {number} opacity - Current scene opacity
 * @param {number} baseZIndex - Base z-index for the scene
 * @returns {number} Z-index value
 */
export function getDissolveZIndex(opacity, baseZIndex) {
  return Math.round(opacity > 0.1 ? baseZIndex : baseZIndex - 1);
}

/**
 * Generates optimized CSS for fade transitions
 * @returns {string} CSS class name for fade blend mode
 */
export function getFadeBlendClass() {
  return `
    .scene-layer {
      position: absolute;
      inset: 0;
      will-change: opacity, transform;
      backface-visibility: hidden;
      transform-style: preserve-3d;
      contain: paint;
    }
  `;
} 