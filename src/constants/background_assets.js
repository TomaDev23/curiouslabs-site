/**
 * Background Assets Registry
 * Maps each zone to an array of visual assets to display
 * @see article_8.1_background_manager_patch.md
 */

/**
 * Zone to background asset mapping
 * Each zone has an array of assets that will be rendered in order (bottom to top)
 * Assets must be registered and implemented in the BackgroundManager
 */
export const ZONE_BACKGROUND_MAP = {
  // Hero section - expanded with assets from HeroPortal
  hero: ['stars', 'radial_top_left', 'nebula_ambient', 'light_beams', 'spark_particles', 'noise_fade'],
  
  // Mission statement - deeper cosmic feel with ambient nebula
  mission: ['radial_bottom_right', 'nebula_ambient', 'noise_fade'],
  
  // Services section - central glow with spark particles
  services: ['nebula_center_glow', 'spark_particles'],
  
  // Projects section - grid-like structure with scroll-based color shift
  projects: ['light_grid', 'color_fade_scroll', 'grid_animator'],
  
  // AI Testimonials - violet sheen with typing bot particle effects
  testimonials: ['radial_violet_sheen', 'typing_bots'],
  
  // Footer section - quieter space with subtle blur effect
  footer: ['quiet_space_blur'],
};

/**
 * Asset configuration (placeholder)
 * Each asset can have specific configuration options
 */
export const ASSET_CONFIG = {
  // Starfield configuration
  stars: {
    density: 'medium',
    parallax: true,
    colorScheme: 'cosmic',
  },
  
  // Radial gradient configurations
  radial_top_left: {
    colors: ['purple-900/20', 'transparent'],
    position: 'top-left',
    size: 'lg',
  },
  
  radial_bottom_right: {
    colors: ['blue-900/20', 'transparent'],
    position: 'bottom-right',
    size: 'lg',
  },
  
  // Nebula effects
  nebula_ambient: {
    colors: ['purple-900/10', 'blue-900/5', 'transparent'],
    intensity: 'low',
    movement: 'slow',
  },
  
  nebula_center_glow: {
    colors: ['purple-900/20', 'blue-900/10', 'transparent'],
    intensity: 'medium',
    movement: 'slow',
    pulseRate: 8, // seconds per pulse cycle
    radiusMin: 0.9,
    radiusMax: 1.1,
  },
  
  // Particle effects
  spark_particles: {
    density: 'low',
    size: 'sm',
    speed: 'slow',
    count: 20,
    colors: ['purple-300', 'blue-400'],
    direction: 'down',
  },

  // Light beams (from HeroPortal)
  light_beams: {
    count: 3,
    colors: ['purple-500/15', 'blue-500/15', 'purple-400/10'],
    animation: 'pulse',
  },
  
  // Grid animator (for Projects section)
  grid_animator: {
    opacity: 0.1,
    horizontalScanSpeed: 8, // seconds for full scan
    verticalScanSpeed: 12, // seconds for full scan
    glowColor: 'blue-500/20',
    highlightColor: 'purple-500/20',
  },
  
  // Typing bots (for testimonials)
  typing_bots: {
    count: 12,
    color: 'purple-400/40',
    sizeBase: 1, // pixels
    durationRange: [1, 2.5], // seconds
    pattern: 'three-dots',
  },
  
  // Other assets with minimal configuration for now
  noise_fade: { opacity: 0.05 },
  light_grid: { intensity: 'low' },
  color_fade_scroll: { 
    scrollFactor: 0.4,
    colors: ['blue-500/10', 'purple-500/10'],
  },
  radial_violet_sheen: { intensity: 'medium' },
  quiet_space_blur: { intensity: 'low' },
};

/**
 * Layer assignment
 * Determines which rendering layer each asset belongs to
 */
export const ASSET_LAYERS = {
  stars: 1,
  radial_top_left: 2,
  radial_bottom_right: 2,
  nebula_ambient: 2,
  nebula_center_glow: 2,
  noise_fade: 3,
  spark_particles: 4,
  light_beams: 3,
  light_grid: 2,
  color_fade_scroll: 2,
  radial_violet_sheen: 2,
  typing_bots: 4,
  grid_animator: 3,
  quiet_space_blur: 2,
}; 