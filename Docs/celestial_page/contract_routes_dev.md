# Development Routes Contract

**LEGIT Contract Version: 1.0.0**  
**Component ID:** `dev_routes`  
**SCS:** `SCS3`  
**Type:** `routes`  
**Last Updated:** [Current Date]

## Overview

This document defines the development routes available for testing and validating celestial components and effects. These routes are not part of the production application but serve as isolated environments for component development and testing.

## Route: `/dev/mars-test`

### Purpose

Provides an isolated testing environment for the Mars component with scroll-based scene transitions and parallax effects.

### Component Hierarchy

```
MarsTestPage
├── CelestialController
│   └── Mars
│       └── CelestialBody
└── Debug Panel
```

### Props and State

| State Variable | Type | Default | Description |
|----------------|------|---------|-------------|
| `currentScene` | string | 'dormant' | Current scene context |
| `parallaxStyle` | string | 'dripping' | Style of parallax effect |
| `scrollPosition` | number | 0 | Normalized scroll position (0-1) |

### Celestial Bodies Configuration

```javascript
const celestialBodies = [
  { 
    id: 'mars', 
    component: Mars, 
    props: { 
      position: { x: 50, y: 40 }, 
      size: 200, 
      parallaxFactor: 0.8 
    } 
  }
];
```

### Scene Transitions

| Scroll Range | Scene | Effect |
|--------------|-------|--------|
| 0% - 25% | dormant | Default style |
| 25% - 50% | awakening | Enhanced glow |
| 50% - 75% | cosmicReveal | 3D effect |
| 75% - 100% | cosmicFlight | Maximum intensity |

### Debug Features

- Scene indicator
- Effect type indicator
- Scroll position percentage
- Effect toggle button

### Visual Structure

- Four full-height sections for different scenes
- Fixed background with Mars component
- Pointer-events disabled on content sections
- Debug panel in top-left corner

### Z-Index Structure

- Background: z-0
- Content sections: z-10
- Debug panel: z-50

## Route: `/dev/combined-parallax-test`

### Purpose

Provides a testing environment for combined parallax effects (mouse + scroll) with the Moon component.

### Component Hierarchy

```
CombinedParallaxTest
├── ParallaxContainer
│   ├── Moon
│   │   └── CelestialBody
│   └── ParallaxLayers
└── Debug Panel
```

### Props and State

| State Variable | Type | Default | Description |
|----------------|------|---------|-------------|
| `mousePosition` | object | `{ x: 0, y: 0 }` | Current mouse position |
| `scrollPosition` | number | 0 | Normalized scroll position (0-1) |
| `parallaxMode` | string | 'combined' | Current parallax mode |

### Celestial Bodies Configuration

```javascript
const celestialBodies = [
  { 
    id: 'moon', 
    component: Moon, 
    props: { 
      position: { x: 50, y: 40 }, 
      size: 180, 
      parallaxFactor: 1.2 
    } 
  }
];
```

### Parallax Modes

| Mode | Description |
|------|-------------|
| combined | Uses both mouse and scroll for parallax |
| mouse | Uses only mouse position for parallax |
| scroll | Uses only scroll position for parallax |

### Debug Features

- Mouse position coordinates
- Scroll position percentage
- Parallax mode selector
- Layer depth controls

### Visual Structure

- Full-height sections for scrolling
- Fixed background with Moon component
- Multiple parallax layers for depth effect
- Debug panel in top-right corner

### Z-Index Structure

- Background layers: z-0 to z-9
- Moon component: z-20
- Content sections: z-10
- Debug panel: z-50

## Route: `/dev/cosmic-journey`

### Purpose

Development environment for testing multiple celestial bodies in the cosmic journey experience.

### Component Hierarchy

```
CosmicJourneyPage
├── CosmicJourneyController
│   ├── CelestialController
│   │   ├── Mars
│   │   ├── Jupiter
│   │   └── Other planets
│   └── JourneyProgress
└── Debug Panel
```

### Props and State

Similar to `/dev/mars-test` but with additional controls for multiple celestial bodies and journey progression.

## Route: `/dev/parallax-test`

### Purpose

Testing environment for isolating and refining parallax effects.

### Component Hierarchy

```
ParallaxTestPage
├── ParallaxContainer
│   └── TestObject (configurable)
└── Controls
```

### Features

- Adjustable parallax factors
- Visual indicators for offset values
- Performance metrics

## Integration Requirements

1. All development routes must be accessible only in development mode
2. Routes must not interfere with production routing
3. Each route must include proper debug information
4. Routes must be responsive and work on all supported devices

## Access Pattern

Development routes follow the pattern `/dev/{component-name}-test` for consistency.

## Performance Considerations

- Development routes may include additional debugging that impacts performance
- Performance metrics should be available in the debug panel
- Console logging should be enabled for debugging purposes

## Security Considerations

- Development routes must not expose sensitive information
- Routes should be excluded from production builds
- Authentication may be required for certain development routes

## Compliance Requirements

1. All development routes must be documented
2. Routes must properly implement scene transitions
3. Debug panels must be consistent across routes
4. Routes must work with the Vite development server 