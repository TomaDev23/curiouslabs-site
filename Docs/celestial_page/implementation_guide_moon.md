# Moon Component Implementation Guide

**LEGIT Contract Version: 1.0.0**  
**Component ID:** `moon`  
**SCS:** `SCS3`  
**Type:** `visual`  
**Last Updated:** [Current Date]

## Overview

This guide provides step-by-step instructions for implementing the Moon component according to the LEGIT contract specifications. The Moon component is a key celestial body in the cosmic journey experience, featuring realistic lunar surface rendering and support for combined parallax effects.

## Implementation Steps

### Step 1: Create the Component File Structure

Create the following file:
```
src/components/journey/celestial/bodies/Moon.jsx
```

### Step 2: Implement the Base Component

The Moon component should follow the structure below:

```jsx
import React, { useEffect, useState } from 'react';
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'moon',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body_moon.md'
};

export default function Moon({ 
  size = 80, 
  position = { x: 50, y: 30 }, 
  sceneType = 'dormant',
  parallaxFactor = 1.2,
  parallaxStyle = 'combined',
  ...props 
}) {
  // Component implementation
}
```

### Step 3: Add Scene-Specific Styling

Implement scene-specific styling according to the contract:

```jsx
// Scene-specific styling
const [sceneStyles, setSceneStyles] = useState({
  opacity: 0.9,
  scale: 1.0,
  glowIntensity: 0.4,
  glowColor: "rgba(200, 200, 220, 0.4)"
});

// Update styles based on scene
useEffect(() => {
  switch(sceneType) {
    case 'dormant':
      setSceneStyles({
        opacity: 0.9,
        scale: 1.0,
        glowIntensity: 0.4,
        glowColor: "rgba(200, 200, 220, 0.4)"
      });
      break;
    case 'awakening':
      setSceneStyles({
        opacity: 1.0,
        scale: 1.05,
        glowIntensity: 0.5,
        glowColor: "rgba(210, 210, 230, 0.5)"
      });
      break;
    case 'cosmicReveal':
      setSceneStyles({
        opacity: 1.0,
        scale: 1.1,
        glowIntensity: 0.7,
        glowColor: "rgba(220, 220, 240, 0.6)"
      });
      break;
    case 'cosmicFlight':
      setSceneStyles({
        opacity: 1.0,
        scale: 1.2,
        glowIntensity: 0.9,
        glowColor: "rgba(230, 230, 255, 0.7)"
      });
      break;
    default:
      setSceneStyles({
        opacity: 0.9,
        scale: 1.0,
        glowIntensity: 0.4,
        glowColor: "rgba(200, 200, 220, 0.4)"
      });
  }
}, [sceneType]);
```

### Step 4: Calculate Size and Glow Properties

```jsx
// Calculate actual size based on scene scale
const actualSize = size * sceneStyles.scale;
const glowSize = actualSize * 0.3 * sceneStyles.glowIntensity * 2;
```

### Step 5: Implement the Render Function

```jsx
return (
  <CelestialBody
    size={actualSize}
    position={position}
    glowColor={sceneStyles.glowColor}
    glowSize={glowSize}
    zIndex={20}
    parallaxFactor={parallaxFactor}
    parallaxStyle={parallaxStyle}
    style={{ 
      visibility: 'visible', 
      opacity: sceneStyles.opacity,
      transition: 'opacity 0.5s ease, transform 0.5s ease'
    }}
    sceneType={sceneType}
    {...props}
  >
    {/* Base lunar surface with grayscale gradient */}
    <div 
      className="absolute inset-0 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(230,230,230,1) 0%, rgba(190,190,190,1) 50%, rgba(160,160,160,1) 100%)',
        transition: 'all 0.5s ease'
      }}
    ></div>
    
    {/* Crater features with darker patches */}
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
    
    {/* Optional terminator (day/night boundary) */}
    <div 
      className="absolute inset-0 rounded-full overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, transparent 65%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.4) 100%)',
        filter: 'blur(15px)',
        transition: 'all 0.5s ease'
      }}
    ></div>
    
    {/* Scene-specific effects */}
    {(sceneType === 'cosmicReveal' || sceneType === 'cosmicFlight') && (
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(220,220,240,${sceneType === 'cosmicFlight' ? 0.4 : 0.2}) 0%, rgba(220,220,240,0) 60%)`,
          opacity: sceneType === 'cosmicFlight' ? 0.8 : 0.4,
          transition: 'all 0.8s ease'
        }}
      ></div>
    )}
  </CelestialBody>
);
```

## Step 6: Add Performance Optimizations

Ensure the Moon component works with the `useCelestialPerformance` hook by leveraging the parent `CelestialBody` component's performance optimizations.

## Step 7: Test in Development Route

Test the Moon component using the `/dev/combined-parallax-test` route as specified in the contract.

### Testing with Combined Parallax Test Route

1. Start the development server:
   ```
   npm run dev
   ```

2. Navigate to the combined parallax test route:
   ```
   http://localhost:5173/dev/combined-parallax-test
   ```

3. Verify that the Moon component is rendering correctly with the following checks:
   - The Moon is visible in the scene
   - The Moon responds to mouse movement with parallax effects
   - The Moon responds to scroll position changes
   - The Moon's appearance changes based on the current scene
   - The Moon maintains proper z-indexing (z-index: 20)

4. Test different parallax styles:
   - Use the "Toggle Effect" button to switch between '3d' and 'dripping' parallax styles
   - Observe how the Moon's movement pattern changes with each style

5. Test scene transitions:
   - Scroll down the page to trigger scene transitions
   - Verify that the Moon's appearance updates according to the scene specifications
   - Check that transitions between scenes are smooth

### Expected Behavior

- **Dormant Scene**: Moon appears with subtle glow and minimal parallax effect
- **Awakening Scene**: Moon becomes more visible with increased glow and parallax movement
- **Cosmic Reveal Scene**: Moon has strong glow effect and full parallax with 3D style
- **Cosmic Flight Scene**: Moon has maximum intensity with enhanced effects

## Integration with CelestialController

To use the Moon component with the CelestialController:

```jsx
import { CelestialController } from 'components/celestial/CelestialController';
import { Moon } from 'components/celestial/Moon';

function MoonScene() {
  const celestialController = useCelestialController();
  
  useEffect(() => {
    const moonId = celestialController.registerMoon({
      name: 'Moon',
      size: { width: 120, height: 120 },
      position: { x: 75, y: 25, z: 3 },
      sceneType: 'dormant',
      parallaxFactor: 0.05,
      parallaxStyle: 'combined'
    });
    
    // Scene transition on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      if (scrollY > viewportHeight * 0.3) {
        celestialController.updateCelestialScene(moonId, 'awakening');
      }
      
      if (scrollY > viewportHeight * 0.6) {
        celestialController.updateCelestialScene(moonId, 'cosmicReveal');
      }
      
      if (scrollY > viewportHeight * 0.9) {
        celestialController.updateCelestialScene(moonId, 'cosmicFlight');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      celestialController.unregisterCelestial(moonId);
    };
  }, [celestialController]);
  
  return (
    <div className="moon-scene">
      <Moon id="moon-primary" />
      {/* Other components */}
    </div>
  );
}
```

## Parallax Configuration

The Moon component supports three parallax styles:

1. **Combined Parallax**: Uses both mouse movement and scroll position
   ```jsx
   <Moon parallaxStyle="combined" parallaxFactor={1.2} />
   ```

2. **3D Parallax**: Primarily scroll-based with subtle mouse influence
   ```jsx
   <Moon parallaxStyle="3d" parallaxFactor={1.0} />
   ```

3. **Dripping Parallax**: Vertical movement with subtle horizontal shifts
   ```jsx
   <Moon parallaxStyle="dripping" parallaxFactor={0.8} />
   ```

## Scene-Specific Styling Reference

| Scene | Opacity | Scale | Glow Intensity | Glow Color |
|-------|---------|-------|----------------|------------|
| dormant | 0.9 | 1.0 | 0.4 | rgba(200, 200, 220, 0.4) |
| awakening | 1.0 | 1.05 | 0.5 | rgba(210, 210, 230, 0.5) |
| cosmicReveal | 1.0 | 1.1 | 0.7 | rgba(220, 220, 240, 0.6) |
| cosmicFlight | 1.0 | 1.2 | 0.9 | rgba(230, 230, 255, 0.7) |

## Compliance Checklist

- [ ] Implemented with correct LEGIT metadata
- [ ] Supports all required scene types
- [ ] Implements proper visual elements (base, craters, terminator)
- [ ] Supports combined parallax effects
- [ ] Handles performance optimizations
- [ ] Maintains proper z-indexing (z-index: 20)
- [ ] Implements proper transitions between states
- [ ] Works with CelestialController 