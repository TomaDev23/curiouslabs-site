/**
 * Centralized asset paths to prevent inconsistency across the site
 * Usage: import { IMAGES } from '../utils/assets';
 * Then: <img src={IMAGES.LOGO} alt="Logo" />
 */

// Base paths
export const PATHS = {
  IMAGES: '/images',
};

// Image assets
export const IMAGES = {
  LOGO: `${PATHS.IMAGES}/logo.svg`,
  SVG: {
    CHAOTIC_CODE: `${PATHS.IMAGES}/chaotic-code-pattern.svg`,
    LEGIT_CODE: `${PATHS.IMAGES}/legit-code-pattern.svg`,
    TRANSITION_CODE: `${PATHS.IMAGES}/transition-code-pattern.svg`,
  },
};

// Export a default object with all asset paths
export default {
  PATHS,
  IMAGES,
}; 