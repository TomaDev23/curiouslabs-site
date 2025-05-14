# Celestial Hooks Contract

## useCombinedParallax

### Description
A specialized parallax hook that combines both mouse movement and scroll position to create dynamic parallax effects. This hook is particularly useful for celestial bodies that need to respond to both user scrolling and mouse movement, creating a more immersive experience.

### Usage Example
```jsx
import { useCombinedParallax } from 'hooks/useCombinedParallax';

function MoonComponent() {
  const { position, mousePosition } = useCombinedParallax({
    mouseInfluence: 0.05,
    scrollInfluence: 0.1,
    depth: 2,
    smoothing: 0.2
  });

  return (
    <div 
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      Moon
    </div>
  );
}
```

### Parameters
```typescript
interface CombinedParallaxOptions {
  mouseInfluence?: number;  // Default: 0.05 - How much mouse movement affects position
  scrollInfluence?: number; // Default: 0.1 - How much scroll affects position
  depth?: number;           // Default: 1 - Depth factor for parallax effect
  smoothing?: number;       // Default: 0.2 - Smoothing factor for transitions (0-1)
  bounds?: {                // Optional bounds for position
    x: { min: number, max: number },
    y: { min: number, max: number }
  };
}
```

### Returns
```typescript
{
  position: { x: number, y: number },  // Combined position offset
  mousePosition: { x: number, y: number }, // Current mouse position
  scrollPosition: number,              // Current scroll position
  resetPosition: () => void            // Function to reset position
}
```

### Implementation Details
The hook tracks both mouse movements across the screen and scroll position changes. It calculates the position based on:
- Mouse position relative to viewport center
- Scroll position relative to document height
- Configured influence factors for both inputs
- Depth factor to control intensity
- Smoothing factor for transitions

The position is calculated using the formula:
```
position.x = (mouseX - viewportWidth/2) * mouseInfluence * depth
position.y = (mouseY - viewportHeight/2) * mouseInfluence * depth + scrollY * scrollInfluence * depth
```

### Example with Multiple Elements
```jsx
function ParallaxScene() {
  const foreground = useCombinedParallax({ depth: 0.5, mouseInfluence: 0.03, scrollInfluence: 0.15 });
  const midground = useCombinedParallax({ depth: 1, mouseInfluence: 0.05, scrollInfluence: 0.1 });
  const background = useCombinedParallax({ depth: 2, mouseInfluence: 0.08, scrollInfluence: 0.05 });
  
  return (
    <div className="scene">
      <div className="layer background" style={{
        transform: `translate3d(${background.position.x}px, ${background.position.y}px, 0)`
      }}>
        <Moon />
      </div>
      <div className="layer midground" style={{
        transform: `translate3d(${midground.position.x}px, ${midground.position.y}px, 0)`
      }}>
        <Stars />
      </div>
      <div className="layer foreground" style={{
        transform: `translate3d(${foreground.position.x}px, ${foreground.position.y}px, 0)`
      }}>
        <Planets />
      </div>
    </div>
  );
}
```

### LEGIT Compliance
This hook adheres to the LEGIT standards with:
- **L**ow latency implementation using requestAnimationFrame
- **E**fficient memory usage with cleanup on unmount
- **G**raceful degradation for devices without mouse movement
- **I**ntuitive behavior that matches user expectations
- **T**estable with clear inputs and outputs

## useCelestialPerformance

// ... existing content ... 