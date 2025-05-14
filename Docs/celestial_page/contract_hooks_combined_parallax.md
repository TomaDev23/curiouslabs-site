# useCombinedParallax Hook Contract

**Version:** 1.0.0  
**Component ID:** HOOK-COMBINED-PARALLAX-001  
**Last Updated:** 2023-07-15

## Overview

The `useCombinedParallax` hook provides a unified approach to parallax effects by combining both mouse movement and scroll position tracking. This creates a more immersive and dynamic experience for celestial bodies and other elements that need responsive positioning based on user interaction.

## Metadata

```javascript
export const metadata = {
  id: 'useCombinedParallax',
  type: 'hook',
  category: 'interaction',
  version: '1.0.0',
  documentation: '/docs/celestial_page/contract_hooks_combined_parallax.md'
};
```

## Hook Interface

```typescript
interface CombinedParallaxOptions {
  mouseInfluence?: number;  // How much mouse movement affects position (0-1)
  scrollInfluence?: number; // How much scroll affects position (0-1)
  depth?: number;           // Depth factor for parallax effect
  smoothing?: number;       // Smoothing factor for transitions (0-1)
  bounds?: {                // Optional bounds for position
    x: { min: number, max: number },
    y: { min: number, max: number }
  };
  initialPosition?: { x: number, y: number }; // Starting position
  disableX?: boolean;       // Disable horizontal movement
  disableY?: boolean;       // Disable vertical movement
}

interface CombinedParallaxReturn {
  position: { x: number, y: number };  // Combined position offset
  mousePosition: { x: number, y: number }; // Current mouse position
  scrollPosition: number;              // Current scroll position
  resetPosition: () => void;           // Function to reset position
  setPosition: (pos: { x: number, y: number }) => void; // Set position manually
}

function useCombinedParallax(options?: CombinedParallaxOptions): CombinedParallaxReturn;
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| mouseInfluence | number | No | 0.05 | Factor determining how much mouse movement affects position (0-1) |
| scrollInfluence | number | No | 0.1 | Factor determining how much scroll affects position (0-1) |
| depth | number | No | 1 | Depth factor that amplifies the parallax effect |
| smoothing | number | No | 0.2 | Smoothing factor for transitions (0-1), higher = smoother but slower |
| bounds | object | No | undefined | Optional min/max boundaries for x and y position |
| initialPosition | object | No | { x: 0, y: 0 } | Starting position for the element |
| disableX | boolean | No | false | When true, disables horizontal movement |
| disableY | boolean | No | false | When true, disables vertical movement |

## Return Value

| Property | Type | Description |
|----------|------|-------------|
| position | { x: number, y: number } | The calculated position offset based on mouse and scroll |
| mousePosition | { x: number, y: number } | Current tracked mouse position |
| scrollPosition | number | Current tracked scroll position |
| resetPosition | () => void | Function to reset position to initial values |
| setPosition | (pos: { x: number, y: number }) => void | Function to manually set position |

## Implementation Requirements

1. **Mouse Tracking**
   - Track mouse position relative to viewport center
   - Apply smoothing for natural movement
   - Handle mouse leaving viewport gracefully

2. **Scroll Tracking**
   - Track scroll position as percentage of document height
   - Apply configured influence factor
   - Handle scroll events efficiently with throttling

3. **Position Calculation**
   - Combine mouse and scroll influences based on configured factors
   - Apply depth factor to control intensity
   - Respect bounds if provided
   - Apply smoothing for transitions

4. **Performance Optimization**
   - Use requestAnimationFrame for smooth updates
   - Implement cleanup on component unmount
   - Throttle event listeners appropriately
   - Minimize re-renders with useMemo/useCallback

## Usage Examples

### Basic Usage

```jsx
import { useCombinedParallax } from 'hooks/useCombinedParallax';

function MoonComponent() {
  const { position } = useCombinedParallax({
    mouseInfluence: 0.05,
    scrollInfluence: 0.1,
    depth: 2
  });

  return (
    <div 
      className="moon"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <img src="/assets/celestial/moon_base.webp" alt="Moon" />
    </div>
  );
}
```

### With Bounds and Smoothing

```jsx
function BoundedMoon() {
  const { position } = useCombinedParallax({
    mouseInfluence: 0.08,
    scrollInfluence: 0.15,
    depth: 1.5,
    smoothing: 0.4,
    bounds: {
      x: { min: -50, max: 50 },
      y: { min: -30, max: 70 }
    }
  });

  return (
    <div 
      className="moon-bounded"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <img src="/assets/celestial/moon_base.webp" alt="Moon" />
    </div>
  );
}
```

### Multiple Layers for Depth

```jsx
function ParallaxScene() {
  const background = useCombinedParallax({ depth: 2, mouseInfluence: 0.02, scrollInfluence: 0.05 });
  const midground = useCombinedParallax({ depth: 1, mouseInfluence: 0.04, scrollInfluence: 0.1 });
  const foreground = useCombinedParallax({ depth: 0.5, mouseInfluence: 0.06, scrollInfluence: 0.15 });
  
  return (
    <div className="parallax-scene">
      <div className="layer background" style={{
        transform: `translate3d(${background.position.x}px, ${background.position.y}px, 0)`
      }}>
        <div className="stars"></div>
      </div>
      <div className="layer midground" style={{
        transform: `translate3d(${midground.position.x}px, ${midground.position.y}px, 0)`
      }}>
        <div className="moon"></div>
      </div>
      <div className="layer foreground" style={{
        transform: `translate3d(${foreground.position.x}px, ${foreground.position.y}px, 0)`
      }}>
        <div className="clouds"></div>
      </div>
    </div>
  );
}
```

### Vertical-Only Parallax

```jsx
function VerticalParallax() {
  const { position } = useCombinedParallax({
    mouseInfluence: 0.05,
    scrollInfluence: 0.2,
    depth: 1.5,
    disableX: true // Only move vertically
  });

  return (
    <div 
      style={{
        transform: `translateY(${position.y}px)`,
      }}
    >
      Vertical Only
    </div>
  );
}
```

## Integration with Celestial Bodies

The `useCombinedParallax` hook is specifically designed to work with celestial bodies in the CuriousLabs website. For optimal integration:

1. Use with `CelestialBody` wrapper component:
```jsx
<CelestialBody
  id="moon-primary"
  parallaxStyle="combined"
  mouseInfluence={0.05}
  scrollInfluence={0.1}
>
  <Moon />
</CelestialBody>
```

2. Register with the `CelestialController`:
```jsx
const moonId = celestialController.registerMoon({
  // other config
  parallaxStyle: 'combined',
  mouseInfluence: 0.05,
  scrollInfluence: 0.1
});
```

## Performance Considerations

- **Throttle Events**: Mouse and scroll events are throttled internally to prevent performance issues
- **Cleanup**: Event listeners are properly removed on component unmount
- **Optimized Calculations**: Position calculations are optimized to minimize CPU usage
- **Conditional Rendering**: Consider using the hook only for visible elements

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | Full | Tested on v90+ |
| Firefox | Full | Tested on v88+ |
| Safari | Full | Tested on v14+ |
| Edge | Full | Tested on v90+ |
| IE | None | Not supported |

## Accessibility

- The hook does not affect keyboard navigation
- Visual effects are subtle enough to not cause motion sickness
- For users with `prefers-reduced-motion` enabled, the effect is automatically disabled

## Testing

The hook can be tested in the `/dev/combined-parallax-test` route, which provides:
- Visual feedback on position values
- Performance monitoring
- Different configuration options to test

## LEGIT Compliance

This hook adheres to the LEGIT standards with:
- **L**ow latency implementation using requestAnimationFrame and efficient calculations
- **E**fficient memory usage with proper cleanup and minimal state
- **G**raceful degradation for devices without mouse movement or with reduced motion preferences
- **I**ntuitive behavior that matches user expectations for parallax effects
- **T**estable with clear inputs and outputs and dedicated test route