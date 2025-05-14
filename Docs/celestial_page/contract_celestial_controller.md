# CelestialController Contract

## Supported Celestial Bodies

### Mars
// ... existing Mars content ...

### Moon
The Moon component represents Earth's natural satellite with realistic surface features and crater details. It supports:

- Combined parallax effects (mouse + scroll)
- Scene-based styling and animations
- Realistic crater rendering
- Dynamic glow effects

#### Moon Configuration

```jsx
{
  id: 'moon-primary',
  type: 'moon',
  name: 'Moon',
  size: {
    width: 120,
    height: 120,
  },
  position: {
    x: 75,
    y: 25,
    z: 3
  },
  sceneType: 'dormant',
  parallaxFactor: 0.05,
  parallaxStyle: 'combined',
  features: {
    craters: true,
    glow: true,
    terminator: true
  }
}
```

## Scene Management

// ... existing scene management content ...

### Moon Scene Types

| Scene | Description | Visual Changes |
|-------|-------------|---------------|
| dormant | Default state, minimal movement | Subtle glow, minimal parallax |
| awakening | Begins to respond to user | Increased glow, more parallax movement |
| cosmicReveal | Fully visible and interactive | Maximum glow, full parallax effect |
| cosmicFlight | Special animation state | Enhanced glow, orbital movement pattern |

## Parallax Styles

// ... existing parallax styles ...

### Combined Parallax

The Combined Parallax style merges both mouse movement and scroll position to create a more immersive effect:

```jsx
// Moon with combined parallax
<CelestialBody
  {...moonConfig}
  parallaxStyle="combined"
  mouseInfluence={0.05}
  scrollInfluence={0.1}
/>
```

This style is particularly effective for the Moon component, creating a sense of depth as users both scroll and move their mouse.

## Controller Methods

// ... existing controller methods ...

### registerMoon

```jsx
/**
 * Register a Moon instance with the controller
 * @param {Object} moonConfig - Configuration for the Moon
 * @returns {String} - ID of the registered Moon
 */
registerMoon(moonConfig)
```

Example usage:

```jsx
const moonId = celestialController.registerMoon({
  name: 'Moon',
  size: { width: 120, height: 120 },
  position: { x: 75, y: 25, z: 3 },
  sceneType: 'dormant',
  parallaxFactor: 0.05,
  parallaxStyle: 'combined'
});
```

## Integration Examples

// ... existing integration examples ...

### Moon Integration

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

## Performance Considerations

// ... existing performance content ...

## Testing Routes

// ... existing testing routes ...

### Moon Test Route

The Moon component can be tested at `/dev/combined-parallax-test`, which demonstrates:

- Combined parallax effects (mouse + scroll)
- Scene transitions based on scroll position
- Performance monitoring
- Debug information display

## LEGIT Compliance

// ... existing LEGIT compliance content ... 