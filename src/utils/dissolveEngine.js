/**
 * Dissolve Engine - Calculates smooth opacity transitions between scenes
 * 
 * This utility helps create cinematic, overlapping scene transitions instead of
 * discrete scene changes. It handles fade-in and fade-out calculations to enable
 * multiple scenes to be visible simultaneously during transitions.
 */

/**
 * Calculates the opacity value for a scene based on scroll position
 * 
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @param {number} sceneStart - Scene start position (0-1)
 * @param {number} sceneEnd - Scene end position (0-1)
 * @param {number} fadeZone - Size of the fade zone (0-1)
 * @returns {number} - Opacity value (0-1)
 */
export const getDissolveOpacity = (scrollProgress, sceneStart, sceneEnd, fadeZone) => {
  // Early return cases for scenes completely outside view
  if (scrollProgress >= sceneEnd + fadeZone || scrollProgress <= sceneStart - fadeZone) {
    return 0;
  }
  
  // Scene is fully visible (non-fade zone)
  if (scrollProgress >= sceneStart && scrollProgress <= sceneEnd) {
    return 1;
  }
  
  // Fade-in zone calculation
  if (scrollProgress >= sceneStart - fadeZone && scrollProgress < sceneStart) {
    return (scrollProgress - (sceneStart - fadeZone)) / fadeZone;
  }
  
  // Fade-out zone calculation
  if (scrollProgress > sceneEnd && scrollProgress <= sceneEnd + fadeZone) {
    return 1 - (scrollProgress - sceneEnd) / fadeZone;
  }
  
  return 0; // Fallback
};

/**
 * Creates a CSS class for cross-fade effects
 * Compatible with browsers that don't support mix-blend-mode
 * 
 * @returns {string} - CSS class string for fade effects
 */
export const getFadeBlendClass = () => `
  .fade-blend {
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0));
    mask-image: linear-gradient(to top, black 70%, transparent 100%);
    -webkit-mask-image: linear-gradient(to top, black 70%, transparent 100%);
  }
`; 