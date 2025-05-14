# Moon Component Contract

**LEGIT Contract Version: 1.0.0**  
**Component ID:** `moon`  
**SCS:** `SCS3`  
**Type:** `visual`  
**Last Updated:** [Current Date]

## Overview

The Moon component renders a visually accurate representation of Earth's moon with dynamic styling and parallax effects. It provides a responsive celestial body that can be used in various cosmic scenes and supports combined parallax effects for enhanced depth perception.

## Metadata

```javascript
export const metadata = {
  id: 'moon',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body_moon.md'
};
```

## Component Schema

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | number | No | 80 | Base size in pixels |
| `position` | object | No | `{ x: 50, y: 30 }` | Position as percentage of container |
| `sceneType` | string | No | 'dormant' | Current scene context |
| `parallaxFactor` | number | No | 1.2 | Intensity of parallax effect |
| `parallaxStyle` | string | No | 'combined' | Style of parallax ('combined', '3d', 'dripping') |

### Position Object Schema

```typescript
interface Position {
  x: number; // Percentage of container width (0-100)
  y: number; // Percentage of container height (0-100)
}
```

### Scene Types

- `dormant`: Initial state, subtle effects
- `awakening`: Transitional state with increased visibility
- `cosmicReveal`: Enhanced state with strong glow
- `cosmicFlight`: Maximum intensity state

## Visual Requirements

### Base Appearance

Moon must include:
1. Base lunar surface with gray gradient
2. Crater details with darker patches
3. Subtle glow effect
4. Scene-specific lighting effects

### Scene-Specific Styling

| Scene | Opacity | Scale | Glow Intensity | Glow Color |
|-------|---------|-------|----------------|------------|
| dormant | 0.9 | 1.0 | 0.4 | rgba(200, 200, 220, 0.4) |
| awakening | 1.0 | 1.05 | 0.5 | rgba(210, 210, 230, 0.5) |
| cosmicReveal | 1.0 | 1.1 | 0.7 | rgba(220, 220, 240, 0.6) |
| cosmicFlight | 1.0 | 1.2 | 0.9 | rgba(230, 230, 255, 0.7) |

## Z-Index and Layering

- Moon component: z-index 20
- Base lunar surface: inset 0
- Crater details: inset 0
- Glow effect: box-shadow

## Animation and Transitions

- All visual changes must include transitions (opacity, transform)
- Default transition: 0.5s ease
- Glow effect transition: 0.8s ease

## Performance Requirements

- Must use CSS transitions instead of JavaScript animations where possible
- Should implement will-change for transform properties
- Must support low-performance mode via `useCelestialPerformance` hook

## Integration Requirements

- Must be wrapped in a `CelestialBody` component
- Must receive scene context from parent controller
- Must properly handle parallax effects via `useCombinedParallax` hook

## Example Usage

```jsx
import Moon from '../components/journey/celestial/bodies/Moon';

<Moon 
  size={180}
  position={{ x: 50, y: 40 }}
  sceneType="cosmicReveal"
  parallaxFactor={1.2}
  parallaxStyle="combined"
/>
```

## Testing Routes

The Moon component can be tested at `/dev/combined-parallax-test`, which provides an environment to test different parallax modes and scene transitions.

## Parallax Behavior

The Moon component supports three parallax styles:

1. **Combined Parallax**: Uses both mouse movement and scroll position
   - Mouse influence: Horizontal and vertical movement based on cursor position
   - Scroll influence: Additional vertical movement based on scroll position

2. **3D Parallax**: Primarily scroll-based with subtle mouse influence
   - Emphasizes depth perception through layered movement

3. **Dripping Parallax**: Vertical movement with subtle horizontal shifts
   - Creates a flowing, liquid-like movement pattern

## Compliance Requirements

1. Must maintain LEGIT metadata
2. Must implement all required visual elements
3. Must respond to scene changes as specified
4. Must maintain proper z-indexing
5. Must implement proper transitions between states
6. Must support all specified parallax styles 