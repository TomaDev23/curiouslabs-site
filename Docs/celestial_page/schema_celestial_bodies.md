# Celestial Bodies Schema Reference

**LEGIT Contract Version: 1.0.0**  
**Component ID:** `celestial_bodies_schema`  
**SCS:** `SCS3`  
**Type:** `schema`  
**Last Updated:** [Current Date]

## Overview

This document defines the schema for all celestial bodies in the cosmic journey, including their properties, visual requirements, and behavior patterns. It serves as a technical reference for implementing new celestial bodies and ensuring consistency across the system.

## Base Celestial Body Schema

All celestial bodies must implement this base schema:

```typescript
interface CelestialBodyBase {
  // Core properties
  id: string;                    // Unique identifier
  type: 'planet' | 'moon' | 'star' | 'asteroid' | 'comet';
  name: string;                  // Display name
  
  // Visual properties
  size: number;                  // Base size in pixels
  position: {                    // Position as percentage
    x: number;                   // 0-100% of container width
    y: number;                   // 0-100% of container height
  };
  zIndex: number;                // Z-index for layering
  
  // Parallax behavior
  parallaxFactor: number;        // Movement intensity (0-2)
  parallaxStyle: '3d' | 'dripping';
  
  // Scene-specific properties
  sceneStyles: {
    [key: string]: {             // Key is scene name
      opacity: number;           // 0-1
      scale: number;             // Relative to base size
      glowIntensity: number;     // 0-1
      glowColor: string;         // CSS color value
    }
  };
  
  // Optional properties
  rotation?: number;             // Degrees (0-360)
  orbitPath?: OrbitPath;         // Defined below
  moons?: CelestialBodyBase[];   // Child celestial bodies
}

interface OrbitPath {
  center: {                      // Orbit center point
    x: number;                   // Percentage of container
    y: number;                   // Percentage of container
  };
  radiusX: number;               // X-axis radius in pixels
  radiusY: number;               // Y-axis radius in pixels
  speed: number;                 // Orbit speed (degrees per second)
  startAngle: number;            // Initial position (degrees)
}
```

## Mars-Specific Schema

Mars implements the base schema with these specific requirements:

```typescript
interface MarsSchema extends CelestialBodyBase {
  id: 'mars';
  type: 'planet';
  name: 'Mars';
  
  // Visual layers (required)
  layers: {
    base: {                      // Base planet surface
      gradient: string[];        // CSS gradient colors
    };
    surface: {                   // Surface features
      features: SurfaceFeature[];
    };
    polarCaps: {                 // Ice caps
      north: PolarCapConfig;
      south: PolarCapConfig;
    };
    atmosphere?: {               // Optional atmosphere
      color: string;
      opacity: number;
    };
  };
  
  // Scene-specific properties (required values)
  sceneStyles: {
    dormant: {
      opacity: 1.0;
      scale: 1.0;
      glowIntensity: 0.5;
      glowColor: "rgba(255, 140, 80, 0.5)";
    };
    awakening: {
      opacity: 1.0;
      scale: 1.1;
      glowIntensity: 0.6;
      glowColor: "rgba(255, 160, 100, 0.6)";
    };
    cosmicReveal: {
      opacity: 1.0;
      scale: 1.2;
      glowIntensity: 0.8;
      glowColor: "rgba(255, 180, 120, 0.7)";
    };
    cosmicFlight: {
      opacity: 1.0;
      scale: 1.3;
      glowIntensity: 1.0;
      glowColor: "rgba(255, 200, 140, 0.8)";
    };
  };
}

interface SurfaceFeature {
  type: 'crater' | 'highland' | 'valley';
  position: {                    // Position within planet
    x: number;                   // Percentage (0-100)
    y: number;                   // Percentage (0-100)
  };
  size: number;                  // Percentage of planet size
  color: string;                 // CSS color value
  opacity: number;               // 0-1
}

interface PolarCapConfig {
  size: number;                  // Percentage of planet size
  position: {                    // Position within planet
    x: number;                   // Percentage (0-100)
    y: number;                   // Percentage (0-100)
  };
  opacity: number;               // 0-1
}
```

## Moon-Specific Schema

Moon implements the base schema with these specific requirements:

```typescript
interface MoonSchema extends CelestialBodyBase {
  id: 'moon';
  type: 'natural_satellite';
  name: 'Moon';
  
  // Visual layers (required)
  layers: {
    base: {                      // Base lunar surface
      gradient: string[];        // CSS gradient colors
    };
    surface: {                   // Surface features
      craters: CraterFeature[];
    };
    terminator?: {               // Day/night boundary
      position: number;          // Percentage (0-100)
      blur: number;              // Blur amount in pixels
    };
  };
  
  // Scene-specific properties (required values)
  sceneStyles: {
    dormant: {
      opacity: 0.9;
      scale: 1.0;
      glowIntensity: 0.4;
      glowColor: "rgba(200, 200, 220, 0.4)";
    };
    awakening: {
      opacity: 1.0;
      scale: 1.05;
      glowIntensity: 0.5;
      glowColor: "rgba(210, 210, 230, 0.5)";
    };
    cosmicReveal: {
      opacity: 1.0;
      scale: 1.1;
      glowIntensity: 0.7;
      glowColor: "rgba(220, 220, 240, 0.6)";
    };
    cosmicFlight: {
      opacity: 1.0;
      scale: 1.2;
      glowIntensity: 0.9;
      glowColor: "rgba(230, 230, 255, 0.7)";
    };
  };
  
  // Parallax configuration (required for Moon)
  parallaxConfig: {
    style: 'combined' | '3d' | 'dripping';
    mouseInfluence: number;      // 0-1 scale
    scrollInfluence: number;     // 0-1 scale
  };
}

interface CraterFeature {
  type: 'crater' | 'mare' | 'highland';
  position: {                    // Position within moon
    x: number;                   // Percentage (0-100)
    y: number;                   // Percentage (0-100)
  };
  size: number;                  // Percentage of moon size
  color: string;                 // CSS color value
  opacity: number;               // 0-1
  blur?: number;                 // Optional blur in pixels
}
```

## Implementation Reference

### Mars Implementation

```javascript
// Mars configuration object
const marsConfig = {
  id: 'mars',
  type: 'planet',
  name: 'Mars',
  size: 200,
  position: { x: 50, y: 40 },
  zIndex: 25,
  parallaxFactor: 0.8,
  parallaxStyle: '3d',
  
  layers: {
    base: {
      gradient: [
        'rgba(255,160,140,1) 0%', 
        'rgba(230,115,80,1) 50%', 
        'rgba(200,85,65,1) 100%'
      ]
    },
    surface: {
      features: [
        {
          type: 'crater',
          position: { x: 25, y: 25 },
          size: 25,
          color: 'rgba(180,70,60,0.5)',
          opacity: 0.5
        },
        // Additional features...
      ]
    },
    polarCaps: {
      north: {
        size: 30,
        position: { x: 50, y: 5 },
        opacity: 0.7
      },
      south: {
        size: 25,
        position: { x: 50, y: 95 },
        opacity: 0.6
      }
    }
  },
  
  sceneStyles: {
    dormant: {
      opacity: 1.0,
      scale: 1.0,
      glowIntensity: 0.5,
      glowColor: "rgba(255, 140, 80, 0.5)"
    },
    // Additional scenes...
  }
};
```

### Moon Implementation

```javascript
// Moon configuration object
const moonConfig = {
  id: 'moon',
  type: 'natural_satellite',
  name: 'Moon',
  size: 180,
  position: { x: 50, y: 40 },
  zIndex: 20,
  parallaxFactor: 1.2,
  parallaxStyle: 'combined',
  
  layers: {
    base: {
      gradient: [
        'rgba(230,230,230,1) 0%', 
        'rgba(190,190,190,1) 50%', 
        'rgba(160,160,160,1) 100%'
      ]
    },
    surface: {
      craters: [
        {
          type: 'crater',
          position: { x: 30, y: 40 },
          size: 15,
          color: 'rgba(100,100,100,0.4)',
          opacity: 0.4
        },
        {
          type: 'mare',
          position: { x: 60, y: 50 },
          size: 25,
          color: 'rgba(90,90,90,0.5)',
          opacity: 0.5
        },
        // Additional craters...
      ]
    },
    terminator: {
      position: 65,
      blur: 15
    }
  },
  
  sceneStyles: {
    dormant: {
      opacity: 0.9,
      scale: 1.0,
      glowIntensity: 0.4,
      glowColor: "rgba(200, 200, 220, 0.4)"
    },
    // Additional scenes...
  },
  
  parallaxConfig: {
    style: 'combined',
    mouseInfluence: 0.05,
    scrollInfluence: 0.1
  }
};
```

## Scene Transition Rules

Celestial bodies must follow these transition rules between scenes:

1. **Dormant → Awakening**: Subtle increase in size and glow intensity
2. **Awakening → Cosmic Reveal**: More pronounced increase with style changes
3. **Cosmic Reveal → Cosmic Flight**: Maximum intensity with enhanced effects

All transitions must use CSS transitions with appropriate duration and easing:

```css
transition: opacity 0.5s ease, transform 0.5s ease;
```

## Extension Points

When implementing new celestial bodies:

1. Create a new interface extending `CelestialBodyBase`
2. Define type-specific properties and layers
3. Implement required scene styles
4. Add to the `CelestialController` registry

## Performance Guidelines

1. Use CSS for visual effects when possible
2. Implement conditional rendering for complex effects
3. Use appropriate image formats for textures
4. Consider device capabilities via `useCelestialPerformance`

## Compliance Requirements

1. All celestial bodies must implement the base schema
2. Type-specific properties must be properly defined
3. Scene styles must include all required scenes
4. Visual layers must render in the correct order
5. Transitions must follow the specified rules 