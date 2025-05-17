/**
 * Dissolve Engine - Calculates smooth opacity transitions between scenes
 * 
 * This utility helps create cinematic, overlapping scene transitions instead of
 * discrete scene changes. It handles fade-in and fade-out calculations to enable
 * multiple scenes to be visible simultaneously during transitions.
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
const cubicEaseInOut = (t) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Calculates smooth opacity value for scene transitions
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @param {number} sceneStart - Scene start point (0-1)
 * @param {number} sceneEnd - Scene end point (0-1)
 * @param {number} fadeZone - Size of the fade zone (0-1)
 * @returns {number} Opacity value between 0 and 1
 */
export function getDissolveOpacity(scrollProgress, sceneStart, sceneEnd, fadeZone) {
  // Calculate effective boundaries with fade zones
  const fadeInStart = Math.max(0, sceneStart - fadeZone);
  const fadeInEnd = sceneStart + (fadeZone * 0.1); // Small buffer for initial fade
  const fadeOutStart = sceneEnd - (fadeZone * 0.1); // Small buffer for final fade
  const fadeOutEnd = Math.min(1, sceneEnd + fadeZone);

  // Guarantee 0 opacity outside effective range
  if (scrollProgress <= fadeInStart || scrollProgress >= fadeOutEnd) {
    return 0;
  }

  // Full opacity in main scene range
  if (scrollProgress >= fadeInEnd && scrollProgress <= fadeOutStart) {
    return 1;
  }

  // Calculate fade-in opacity
  if (scrollProgress > fadeInStart && scrollProgress < fadeInEnd) {
    const progress = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
    return cubicEaseInOut(progress);
  }

  // Calculate fade-out opacity
  if (scrollProgress > fadeOutStart && scrollProgress < fadeOutEnd) {
    const progress = 1 - ((scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart));
    return cubicEaseInOut(progress);
  }

  return 0;
}

/**
 * Calculates z-index for proper scene layering
 * @param {number} opacity - Current scene opacity (0-1)
 * @param {number} baseZIndex - Base z-index for the scene
 * @returns {number} Calculated z-index
 */
export function getDissolveZIndex(opacity, baseZIndex) {
  return Math.round(baseZIndex + (opacity * 10));
}

/**
 * Generates optimized CSS for fade transitions
 * @returns {string} CSS class definition
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
      transition: opacity 0.1s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
  `;
} 