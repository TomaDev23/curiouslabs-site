# Celestial Hooks Contract

**LEGIT Contract Version: 1.0.0**  
**Component ID:** `celestial_hooks`  
**SCS:** `SCS3`  
**Type:** `hooks`  
**Last Updated:** [Current Date]

## Overview

This document defines the React hooks used for celestial body components, including parallax effects, performance optimizations, and scene transitions.

## Hook: `useCelestialParallax`

### Purpose

Calculates position offsets for celestial bodies based on scroll position, creating parallax effects that vary by scene.

### Import

```javascript
import { useCelestialParallax } from './hooks/useCelestialParallax';
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `factor` | number | No | 1 | Intensity of parallax effect |
| `style` | string | No | '3d' | Style of parallax ('3d' or 'dripping') |
| `scene` | string | No | 'dormant' | Current scene context |

### Return Value

```typescript
interface CelestialParallaxReturn {
  position: {
    x: number; // Pixel offset for x-axis
    y: number; // Pixel offset for y-axis
  };
  ref: React.RefObject<HTMLElement>; // Reference to attach to the element
  scrollProgress: number; // Normalized scroll position (0-1)
}
```

### Scene-Specific Behavior

#### Dormant Scene

- Subtle movement
- X-axis: `scrollY * factor * 0.05`
- Y-axis: `scrollY * factor * 0.03`

#### Awakening Scene

- Moderate movement
- X-axis: `scrollY * factor * 0.08`
- Y-axis: `scrollY * factor * 0.2`

#### Cosmic Reveal Scene

- Strong movement with style variations
- 3D style:
  - X-axis: `scrollY * factor * 0.15`
  - Y-axis: `scrollY * factor * 0.8`
- Dripping style:
  - X-axis: `scrollY * factor * 0.1`
  - Y-axis: `scrollY * factor * 0.8`

#### Cosmic Flight Scene

- Maximum movement with style variations
- 3D style:
  - X-axis: `scrollY * factor * 0.12`
  - Y-axis: `scrollY * factor * 0.5`
- Dripping style:
  - X-axis: `scrollY * factor * 0.1`
  - Y-axis: `scrollY * factor * 0.8`

### Dependencies

- `useParallax`: Core hook for scroll position tracking
- `useScrollProgress`: Hook for normalized scroll progress

### Example Usage

```jsx
const { position, ref, scrollProgress } = useCelestialParallax(
  0.8, // factor
  '3d', // style
  'cosmicReveal' // scene
);

// Apply position to element
<div 
  ref={ref}
  style={{
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`
  }}
>
  {/* Content */}
</div>
```

## Hook: `useCelestialPerformance`

### Purpose

Provides performance-related utilities and device capability detection for celestial components.

### Import

```javascript
import { useCelestialPerformance } from './hooks/useCelestialPerformance';
```

### Return Value

```typescript
interface CelestialPerformanceReturn {
  shouldRender: boolean; // Whether the component should render based on performance
  isLowPerfDevice: boolean; // Whether the device has limited performance capabilities
}
```

### Example Usage

```jsx
const { shouldRender, isLowPerfDevice } = useCelestialPerformance();

// Apply performance optimizations
useEffect(() => {
  if (isLowPerfDevice) {
    // Reduce effects, animations, etc.
  }
}, [isLowPerfDevice]);

// Conditional rendering
if (!shouldRender) return null;
```

## Integration Requirements

1. Hooks must be used within React functional components
2. Performance optimizations must be applied when indicated by `useCelestialPerformance`
3. Position calculations must follow the scene-specific formulas
4. Hooks must handle edge cases (e.g., undefined parameters)

## Performance Considerations

- Position calculations should be memoized when possible
- Effect dependencies must be properly specified to avoid unnecessary recalculations
- DOM manipulations should be minimized

## Compliance Requirements

1. All hooks must maintain LEGIT metadata
2. Hooks must handle all specified scene types
3. Position calculations must match the specified formulas
4. Performance optimizations must be applied as specified 