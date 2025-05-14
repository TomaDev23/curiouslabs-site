# Celestial Asset Requirements

**LEGIT Contract Version: 1.0.0**  
**Component ID:** `celestial_assets`  
**SCS:** `SCS3`  
**Type:** `assets`  
**Last Updated:** [Current Date]

## Overview

This document defines the requirements for visual assets used in celestial body components. It covers specifications for textures, effects, colors, and performance optimizations to ensure consistent and efficient rendering across the application.

## General Asset Requirements

### Resolution and Size

- **Base Textures**: Minimum 512×512px, optimally 1024×1024px
- **Normal Maps**: Same resolution as base textures
- **Effect Overlays**: Minimum 256×256px
- **Maximum File Size**: 200KB per texture
- **Format**: WebP (primary), PNG (fallback)

### Performance Considerations

- All assets must be optimized for web delivery
- Use progressive loading where applicable
- Provide multiple resolutions for responsive design
- Total asset payload should not exceed 1MB per celestial body

## Mars-Specific Assets

### Required Textures

| Asset | Description | Resolution | Format | Size Limit |
|-------|-------------|------------|--------|------------|
| `mars_base.webp` | Base color texture | 1024×1024px | WebP | 100KB |
| `mars_normal.webp` | Surface normal map | 1024×1024px | WebP | 80KB |
| `mars_specular.webp` | Specular highlights | 512×512px | WebP | 50KB |
| `mars_clouds.webp` | Atmospheric effects | 512×512px | WebP | 40KB |
| `mars_poles.webp` | Polar ice caps | 256×256px | WebP | 30KB |

### Color Specifications

#### Base Colors

- **Primary Surface**: `#E05D35` (RGB: 224, 93, 53)
- **Dark Regions**: `#A0412D` (RGB: 160, 65, 45)
- **Bright Regions**: `#FFD2A1` (RGB: 255, 210, 161)
- **Polar Caps**: `#FFFFFF` (RGB: 255, 255, 255)

#### Glow Colors by Scene

| Scene | Color | Opacity | Blur Radius |
|-------|-------|---------|-------------|
| dormant | `#FF8C50` | 0.5 | 10px |
| awakening | `#FFA064` | 0.6 | 12px |
| cosmicReveal | `#FFB478` | 0.7 | 15px |
| cosmicFlight | `#FFC88C` | 0.8 | 20px |

### Gradient Specifications

#### Base Surface Gradient

```css
background: radial-gradient(
  circle,
  rgba(255, 160, 140, 1) 0%,
  rgba(230, 115, 80, 1) 50%,
  rgba(200, 85, 65, 1) 100%
);
```

#### Surface Features Gradient

```css
backgroundImage: `
  radial-gradient(circle at 25% 25%, rgba(180, 70, 60, 0.5) 0%, rgba(180, 70, 60, 0) 25%),
  radial-gradient(circle at 75% 30%, rgba(180, 70, 60, 0.5) 0%, rgba(180, 70, 60, 0) 20%),
  radial-gradient(circle at 35% 65%, rgba(180, 70, 60, 0.6) 0%, rgba(180, 70, 60, 0) 25%),
  radial-gradient(circle at 65% 70%, rgba(180, 70, 60, 0.4) 0%, rgba(180, 70, 60, 0) 15%)
`;
```

#### Polar Caps Gradient

```css
background: radial-gradient(
  ellipse at center,
  rgba(255, 255, 255, 0.7) 0%,
  rgba(255, 255, 255, 0) 70%
);
```

## CSS-Based Implementation

For optimal performance, Mars can be implemented using pure CSS gradients and effects:

```jsx
// Base planet with reddish-orange color
<div 
  className="absolute inset-0 rounded-full"
  style={{
    background: 'radial-gradient(circle, rgba(255,160,140,1) 0%, rgba(230,115,80,1) 50%, rgba(200,85,65,1) 100%)',
    transition: 'all 0.5s ease'
  }}
></div>

// Surface features with darker patches/craters
<div 
  className="absolute inset-0 rounded-full"
  style={{
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(180,70,60,0.5) 0%, rgba(180,70,60,0) 25%),
      radial-gradient(circle at 75% 30%, rgba(180,70,60,0.5) 0%, rgba(180,70,60,0) 20%),
      radial-gradient(circle at 35% 65%, rgba(180,70,60,0.6) 0%, rgba(180,70,60,0) 25%),
      radial-gradient(circle at 65% 70%, rgba(180,70,60,0.4) 0%, rgba(180,70,60,0) 15%)
    `,
    transition: 'all 0.5s ease'
  }}
></div>

// Polar ice caps
<div 
  className="absolute rounded-full overflow-hidden"
  style={{
    width: '80%',
    height: '30%',
    top: '5%',
    left: '10%',
    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
    transition: 'all 0.5s ease'
  }}
></div>
```

## Image-Based Implementation

For more detailed visuals, image-based assets can be used:

```jsx
// Base planet with texture
<div 
  className="absolute inset-0 rounded-full"
  style={{
    backgroundImage: 'url(/assets/celestial/mars_base.webp)',
    backgroundSize: 'cover',
    transition: 'all 0.5s ease'
  }}
></div>

// Normal map for surface details
<div 
  className="absolute inset-0 rounded-full"
  style={{
    backgroundImage: 'url(/assets/celestial/mars_normal.webp)',
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
    opacity: 0.7,
    transition: 'all 0.5s ease'
  }}
></div>
```

## Animation Requirements

### Rotation Animation

```css
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.mars-rotation {
  animation: rotate 120s linear infinite;
}
```

### Glow Animation

```css
@keyframes pulse {
  0% {
    box-shadow: 0 0 10px 5px rgba(255, 140, 80, 0.5);
  }
  50% {
    box-shadow: 0 0 15px 8px rgba(255, 140, 80, 0.6);
  }
  100% {
    box-shadow: 0 0 10px 5px rgba(255, 140, 80, 0.5);
  }
}

.mars-glow {
  animation: pulse 4s ease-in-out infinite;
}
```

## Responsive Design

Assets should adapt to different screen sizes:

| Screen Size | Asset Resolution | Size Multiplier |
|-------------|------------------|----------------|
| Mobile (<768px) | 512×512px | 0.7× |
| Tablet (768px-1024px) | 768×768px | 1.0× |
| Desktop (>1024px) | 1024×1024px | 1.2× |

## Performance Optimization Guidelines

### Image Optimization

- Use WebP format with fallback to PNG
- Apply appropriate compression (lossy for textures, lossless for normal maps)
- Implement lazy loading for off-screen assets
- Use responsive images with `srcset` for different device resolutions

### CSS Optimization

- Use hardware-accelerated properties (transform, opacity)
- Apply `will-change` property for elements with animations
- Use CSS variables for dynamic color changes
- Minimize repaints by grouping transitions

### JavaScript Optimization

- Use `requestAnimationFrame` for any JavaScript animations
- Throttle scroll event handlers
- Implement virtualization for multiple celestial bodies
- Use intersection observer for conditional rendering

## Asset Delivery Checklist

- [ ] All required textures provided in WebP format
- [ ] PNG fallbacks for browsers without WebP support
- [ ] Multiple resolutions for responsive design
- [ ] Optimized file sizes within specified limits
- [ ] Correct color profiles (sRGB)
- [ ] Transparent backgrounds where required
- [ ] Normal maps with correct orientation
- [ ] Animation keyframes defined
- [ ] CSS implementations provided

## Moon-Specific Assets

### Required Textures

| Asset | Description | Resolution | Format | Size Limit |
|-------|-------------|------------|--------|------------|
| `moon_base.webp` | Base lunar surface | 1024×1024px | WebP | 100KB |
| `moon_normal.webp` | Surface normal map | 1024×1024px | WebP | 80KB |
| `moon_craters.webp` | Crater details | 512×512px | WebP | 50KB |

### Color Specifications

#### Base Colors

- **Primary Surface**: `#E6E6E6` (RGB: 230, 230, 230)
- **Dark Regions**: `#A0A0A0` (RGB: 160, 160, 160)
- **Crater Shadows**: `#646464` (RGB: 100, 100, 100)

#### Glow Colors by Scene

| Scene | Color | Opacity | Blur Radius |
|-------|-------|---------|-------------|
| dormant | `#C8C8DC` | 0.4 | 8px |
| awakening | `#D2D2E6` | 0.5 | 10px |
| cosmicReveal | `#DCDCF0` | 0.6 | 12px |
| cosmicFlight | `#E6E6FF` | 0.7 | 15px |

### Gradient Specifications

#### Base Surface Gradient

```css
background: radial-gradient(
  circle,
  rgba(230, 230, 230, 1) 0%,
  rgba(190, 190, 190, 1) 50%,
  rgba(160, 160, 160, 1) 100%
);
```

#### Crater Features Gradient

```css
backgroundImage: `
  radial-gradient(circle at 30% 40%, rgba(100, 100, 100, 0.4) 0%, rgba(100, 100, 100, 0) 15%),
  radial-gradient(circle at 70% 30%, rgba(100, 100, 100, 0.3) 0%, rgba(100, 100, 100, 0) 10%),
  radial-gradient(circle at 45% 65%, rgba(100, 100, 100, 0.4) 0%, rgba(100, 100, 100, 0) 12%),
  radial-gradient(circle at 60% 75%, rgba(100, 100, 100, 0.3) 0%, rgba(100, 100, 100, 0) 8%)
`;
```

## CSS-Based Implementation

### Moon CSS Implementation

```jsx
// Base moon with grayscale gradient
<div 
  className="absolute inset-0 rounded-full"
  style={{
    background: 'radial-gradient(circle, rgba(230,230,230,1) 0%, rgba(190,190,190,1) 50%, rgba(160,160,160,1) 100%)',
    transition: 'all 0.5s ease'
  }}
></div>

// Crater features with darker patches
<div 
  className="absolute inset-0 rounded-full"
  style={{
    backgroundImage: `
      radial-gradient(circle at 30% 40%, rgba(100,100,100,0.4) 0%, rgba(100,100,100,0) 15%),
      radial-gradient(circle at 70% 30%, rgba(100,100,100,0.3) 0%, rgba(100,100,100,0) 10%),
      radial-gradient(circle at 45% 65%, rgba(100,100,100,0.4) 0%, rgba(100,100,100,0) 12%),
      radial-gradient(circle at 60% 75%, rgba(100,100,100,0.3) 0%, rgba(100,100,100,0) 8%)
    `,
    transition: 'all 0.5s ease'
  }}
></div>

// Optional terminator (day/night boundary)
<div 
  className="absolute inset-0 rounded-full overflow-hidden"
  style={{
    background: 'linear-gradient(90deg, transparent 65%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.4) 100%)',
    filter: 'blur(15px)',
    transition: 'all 0.5s ease'
  }}
></div>
```

## Image-Based Implementation

### Moon Image Implementation

```jsx
// Base moon with texture
<div 
  className="absolute inset-0 rounded-full"
  style={{
    backgroundImage: 'url(/assets/celestial/moon_base.webp)',
    backgroundSize: 'cover',
    transition: 'all 0.5s ease'
  }}
></div>

// Crater details
<div 
  className="absolute inset-0 rounded-full"
  style={{
    backgroundImage: 'url(/assets/celestial/moon_craters.webp)',
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
    opacity: 0.7,
    transition: 'all 0.5s ease'
  }}
></div>
```

## Animation Requirements

### Moon-Specific Animation

```css
@keyframes moonGlow {
  0% {
    box-shadow: 0 0 8px 4px rgba(200, 200, 220, 0.4);
  }
  50% {
    box-shadow: 0 0 12px 6px rgba(200, 200, 220, 0.5);
  }
  100% {
    box-shadow: 0 0 8px 4px rgba(200, 200, 220, 0.4);
  }
}

.moon-glow {
  animation: moonGlow 6s ease-in-out infinite;
}
```

## Responsive Design

Assets should adapt to different screen sizes:

| Screen Size | Asset Resolution | Size Multiplier |
|-------------|------------------|----------------|
| Mobile (<768px) | 512×512px | 0.7× |
| Tablet (768px-1024px) | 768×768px | 1.0× |
| Desktop (>1024px) | 1024×1024px | 1.2× |

## Performance Optimization Guidelines

### Image Optimization

- Use WebP format with fallback to PNG
- Apply appropriate compression (lossy for textures, lossless for normal maps)
- Implement lazy loading for off-screen assets
- Use responsive images with `srcset` for different device resolutions

### CSS Optimization

- Use hardware-accelerated properties (transform, opacity)
- Apply `will-change` property for elements with animations
- Use CSS variables for dynamic color changes
- Minimize repaints by grouping transitions

### JavaScript Optimization

- Use `requestAnimationFrame` for any JavaScript animations
- Throttle scroll event handlers
- Implement virtualization for multiple celestial bodies
- Use intersection observer for conditional rendering

## Asset Delivery Checklist

- [ ] All required textures provided in WebP format
- [ ] PNG fallbacks for browsers without WebP support
- [ ] Multiple resolutions for responsive design
- [ ] Optimized file sizes within specified limits
- [ ] Correct color profiles (sRGB)
- [ ] Transparent backgrounds where required
- [ ] Normal maps with correct orientation
- [ ] Animation keyframes defined
- [ ] CSS implementations provided 