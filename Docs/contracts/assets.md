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