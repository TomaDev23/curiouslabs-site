# Mars Component Contract

**LEGIT Contract Version: 1.0.0**  
**Component ID:** `mars`  
**SCS:** `SCS3`  
**Type:** `visual`  
**Last Updated:** [Current Date]

## Overview

The Mars component renders a visually accurate representation of the planet Mars with dynamic styling based on scene context. It provides a responsive celestial body that changes appearance and behavior based on the current scene in the cosmic journey.

## Metadata

```javascript
export const metadata = {
  id: 'mars',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body_mars.md'
};
```

## Component Schema

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | number | No | 70 | Base size in pixels |
| `position` | object | No | `{ x: 30, y: 25 }` | Position as percentage of container |
| `sceneType` | string | No | 'dormant' | Current scene context |
| `parallaxFactor` | number | No | 1 | Intensity of parallax effect |
| `parallaxStyle` | string | No | '3d' | Style of parallax ('3d' or 'dripping') |

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

Mars must include:
1. Base planet with reddish-orange gradient
2. Surface features with darker patches/craters
3. Polar ice caps
4. Scene-specific glow effects

### Scene-Specific Styling

| Scene | Opacity | Scale | Glow Intensity | Glow Color |
|-------|---------|-------|----------------|------------|
| dormant | 1.0 | 1.0 | 0.5 | rgba(255, 140, 80, 0.5) |
| awakening | 1.0 | 1.1 | 0.6 | rgba(255, 160, 100, 0.6) |
| cosmicReveal | 1.0 | 1.2 | 0.8 | rgba(255, 180, 120, 0.7) |
| cosmicFlight | 1.0 | 1.3 | 1.0 | rgba(255, 200, 140, 0.8) |

## Z-Index and Layering

- Mars component: z-index 25
- Base planet layer: inset 0
- Surface features: inset 0
- Polar ice caps: positioned within planet
- Scene-specific effects: inset 0

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
- Must properly handle parallax effects via `useCelestialParallax` hook

## Example Usage

```jsx
import Mars from '../components/journey/celestial/bodies/Mars';

<Mars 
  size={200}
  position={{ x: 50, y: 40 }}
  sceneType="cosmicReveal"
  parallaxFactor={0.8}
  parallaxStyle="3d"
/>
```

## Testing Routes

The Mars component can be tested at `/dev/mars-test`, which provides a scrollable environment to test all scene transitions and parallax effects.

## Compliance Requirements

1. Must maintain LEGIT metadata
2. Must implement all required visual elements
3. Must respond to scene changes as specified
4. Must maintain proper z-indexing
5. Must implement proper transitions between states 