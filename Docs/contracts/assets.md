# Assets Management

This document provides documentation for the centralized assets management system used in the CuriousLabs website.

## Overview

The assets utility provides a centralized place to manage paths to images, SVGs, and other static assets used throughout the application. This approach has several benefits:

1. Makes it easy to update asset paths across the entire application
2. Prevents typos and path-related bugs
3. Simplifies asset organization and maintenance
4. Provides auto-completion in code editors

## Usage

Import the `IMAGES` object from the assets utility file:

```jsx
import { IMAGES } from '../utils/assets';

function MyComponent() {
  return (
    <div>
      <img src={IMAGES.LOGO} alt="CuriousLabs Logo" />
      <div style={{ backgroundImage: `url(${IMAGES.SVG.GRID_PATTERN})` }}></div>
    </div>
  );
}
```

## Available Assets

The assets utility exports the following objects:

### PATHS

Base paths for different asset types:

```js
export const PATHS = {
  IMAGES: '/images',
  SVG: '/images/svg',
  LOGOS: '/images/logos',
  ICONS: '/images/icons',
  PHOTOS: '/images/photos',
  CELESTIAL: '/images/celestial',
};
```

### IMAGES

Paths to specific images, organized by type:

```js
export const IMAGES = {
  // Main images
  LOGO: `${PATHS.IMAGES}/logo.svg`,
  HERO_BG: `${PATHS.IMAGES}/hero-bg.jpg`,
  
  // SVG assets
  SVG: {
    GRID_PATTERN: `${PATHS.SVG}/grid-pattern.svg`,
    CHAOTIC_CODE: `${PATHS.SVG}/chaotic-code-pattern.svg`,
    LEGIT_CODE: `${PATHS.SVG}/legit-code-pattern.svg`,
    WAVE: `${PATHS.SVG}/wave.svg`,
  },
  
  // Partner logos
  LOGOS: {
    PARTNER1: `${PATHS.LOGOS}/partner1.svg`,
    PARTNER2: `${PATHS.LOGOS}/partner2.svg`,
    // ... additional partner logos
  },
  
  // Icons used throughout the site
  ICONS: {
    CHECK: `${PATHS.ICONS}/check.svg`,
    ARROW: `${PATHS.ICONS}/arrow.svg`,
    // ... additional icons
  },
  
  // Celestial body assets
  CELESTIAL: {
    MARS_BASE: `${PATHS.CELESTIAL}/mars_base.webp`,
    MARS_NORMAL: `${PATHS.CELESTIAL}/mars_normal.webp`,
    MARS_SPECULAR: `${PATHS.CELESTIAL}/mars_specular.webp`,
    MARS_POLES: `${PATHS.CELESTIAL}/mars_poles.webp`,
    MOON_BASE: `${PATHS.CELESTIAL}/moon_base.webp`,
    MOON_NORMAL: `${PATHS.CELESTIAL}/moon_normal.webp`,
    MOON_CRATERS: `${PATHS.CELESTIAL}/moon_craters.webp`,
    // ... additional celestial assets
  },
};
```

## Adding New Assets

To add new assets to the system:

1. Place the new asset file in the appropriate directory in the `/public` folder
2. Add the path to the asset in the `assets.js` file
3. Use the new path in your components

## Best Practices

- Always use the centralized paths rather than hardcoding them
- Keep the assets organized in appropriate categories
- Use semantic naming for assets (e.g., `HERO_BG` instead of `IMAGE1`)
- When adding new assets, follow the existing naming conventions

## Example: Adding a New Icon

1. Add the icon file to `/public/images/icons/star.svg`
2. Update the assets.js file:

```js
export const IMAGES = {
  // ... existing assets
  
  ICONS: {
    CHECK: `${PATHS.ICONS}/check.svg`,
    ARROW: `${PATHS.ICONS}/arrow.svg`,
    STAR: `${PATHS.ICONS}/star.svg`, // New icon
  },
}
```

3. Use the icon in your component:

```jsx
import { IMAGES } from '../utils/assets';

function RatingComponent() {
  return (
    <div>
      <img src={IMAGES.ICONS.STAR} alt="Rating" />
    </div>
  );
}
```

## Celestial Assets

The celestial assets are used for planetary and space-related components in the cosmic journey experience.

### Mars Assets

Mars assets follow specific requirements defined in the `asset_requirements_celestial.md` document:

| Asset | Description | Resolution | Format |
|-------|-------------|------------|--------|
| `mars_base.webp` | Base color texture | 1024×1024px | WebP |
| `mars_normal.webp` | Surface normal map | 1024×1024px | WebP |
| `mars_specular.webp` | Specular highlights | 512×512px | WebP |
| `mars_poles.webp` | Polar ice caps | 256×256px | WebP |

### Moon Assets

Moon assets follow similar requirements:

| Asset | Description | Resolution | Format |
|-------|-------------|------------|--------|
| `moon_base.webp` | Base color texture | 1024×1024px | WebP |
| `moon_normal.webp` | Surface normal map | 1024×1024px | WebP |
| `moon_craters.webp` | Crater details | 512×512px | WebP |

### Usage Example

```jsx
import { IMAGES } from '../utils/assets';

function MarsWithTextures() {
  return (
    <div className="planet-container">
      <div 
        className="planet-base"
        style={{ backgroundImage: `url(${IMAGES.CELESTIAL.MARS_BASE})` }}
      ></div>
      <div 
        className="planet-details"
        style={{ backgroundImage: `url(${IMAGES.CELESTIAL.MARS_NORMAL})` }}
      ></div>
    </div>
  );
}

function MoonWithTextures() {
  return (
    <div className="moon-container">
      <div 
        className="moon-base"
        style={{ backgroundImage: `url(${IMAGES.CELESTIAL.MOON_BASE})` }}
      ></div>
      <div 
        className="moon-craters"
        style={{ backgroundImage: `url(${IMAGES.CELESTIAL.MOON_CRATERS})` }}
      ></div>
    </div>
  );
}
```

### CSS Implementation

For optimal performance, celestial bodies can be implemented using CSS gradients instead of images:

```jsx
function MarsCSSImplementation() {
  return (
    <div className="planet-container">
      <div 
        className="planet-base"
        style={{
          background: 'radial-gradient(circle, rgba(255,160,140,1) 0%, rgba(230,115,80,1) 50%, rgba(200,85,65,1) 100%)'
        }}
      ></div>
    </div>
  );
}

function MoonCSSImplementation() {
  return (
    <div className="moon-container">
      <div 
        className="moon-base"
        style={{
          background: 'radial-gradient(circle, rgba(230,230,230,1) 0%, rgba(190,190,190,1) 50%, rgba(160,160,160,1) 100%)'
        }}
      ></div>
      <div 
        className="moon-craters"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, rgba(100,100,100,0.4) 0%, rgba(100,100,100,0) 15%),
            radial-gradient(circle at 70% 30%, rgba(100,100,100,0.3) 0%, rgba(100,100,100,0) 10%),
            radial-gradient(circle at 45% 65%, rgba(100,100,100,0.4) 0%, rgba(100,100,100,0) 12%),
            radial-gradient(circle at 60% 75%, rgba(100,100,100,0.3) 0%, rgba(100,100,100,0) 8%)
          `
        }}
      ></div>
    </div>
  );
}
```