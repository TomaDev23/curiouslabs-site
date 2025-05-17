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
 * @param {boolean} smoothFade - Whether to use extra smooth fading
 * @returns {number} Opacity value between 0 and 1
 */
export function getDissolveOpacity(scrollProgress, sceneStart, sceneEnd, fadeZone, smoothFade = false) {
  // Calculate effective boundaries with fade zones
  const fadeInStart = Math.max(0, sceneStart - fadeZone);
  const fadeInEnd = sceneStart + (fadeZone * (smoothFade ? 0.2 : 0.1));
  const fadeOutStart = sceneEnd - (fadeZone * (smoothFade ? 0.2 : 0.1));
  const fadeOutEnd = Math.min(1, sceneEnd + fadeZone);

  // Before fade in or after fade out
  if (scrollProgress <= fadeInStart || scrollProgress >= fadeOutEnd) {
    return 0;
  }

  // Full opacity between fade zones
  if (scrollProgress >= fadeInEnd && scrollProgress <= fadeOutStart) {
    return 1;
  }

  // Fade in
  if (scrollProgress < fadeInEnd) {
    const progress = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
    return smoothFade ? cubicEaseInOut(progress) : progress;
  }

  // Fade out
  const progress = 1 - (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
  return smoothFade ? cubicEaseInOut(progress) : progress;
}

/**
 * Calculates z-index for proper scene layering
 * @param {number} opacity - Current scene opacity
 * @param {number} baseZIndex - Base z-index for the scene
 * @returns {number} Z-index value
 */
export function getDissolveZIndex(opacity, baseZIndex) {
  return opacity > 0.1 ? baseZIndex : baseZIndex - 1;
}

/**
 * Generates optimized CSS for fade transitions
 * @param {number} opacity - Current scene opacity
 * @returns {string} CSS class name for fade blend mode
 */
export function getFadeBlendClass(opacity) {
  if (opacity <= 0) return 'hidden';
  if (opacity >= 1) return 'visible';
  return 'fade-blend';
} 