# Background System Legacy Snapshot (v1.0)

This document provides a comprehensive snapshot of the Background Manager system prior to the 3-Zone ReTheming implementation (T2.6.1).

## 1. Current Architecture Overview

The current background system implements a zone-based approach with the following key components:

- `BackgroundManager.jsx`: Central controller component that manages zone detection and asset rendering
- `background_assets.js`: Configuration file defining zone mappings and asset properties
- `SpaceCanvas.jsx`: Canvas-based starfield implementation
- Various render functions for specific effects (light beams, particles, etc.)

## 2. Zone Structure

The current system uses the following zone mapping:

```js
// Zone to background asset mapping
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
```

## 3. Asset Configuration

Each visual asset has specific configuration options:

```js
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
  
  // ...additional assets configuration
};
```

## 4. Rendering Approach

The system uses a component-based approach for rendering:

1. On scroll, the active zone is determined based on the current viewport position
2. Adjacent zones are identified for preloading
3. Assets from active and adjacent zones are rendered with appropriate transitions
4. Special effects like light beams and particles have dedicated render functions
5. A consistent noise overlay is applied across all zones

## 5. Performance Optimizations

The current implementation includes several performance optimizations:

- Conditional rendering of assets based on active zone
- Reduced motion support for users who prefer reduced animations
- Adjacent zone preloading for smoother transitions
- Passive scroll event listeners
- Layer-based rendering for optimal compositing

## 6. Accessibility Features

- Reduced motion mode that simplifies animations
- Keyboard shortcut for debug mode (Ctrl+Shift+B)
- SSR fallback for initial page load
- Non-interactive background layers (pointer-events: none)

## 7. Debug Capabilities

The system includes a comprehensive debug mode that visualizes:

- Current active zone
- Previous zone
- Adjacent zones
- Zone boundaries with visual indicators
- Asset count and reduced motion status

## 8. Known Limitations

- Some visual effects may cause performance issues on lower-end devices
- Occasional z-index conflicts with foreground content
- Limited mobile optimization for complex particle effects
- High GPU usage during zone transitions with multiple effects

This snapshot serves as a reference point for the background system before implementing the 3-Zone ReTheming Plan. 