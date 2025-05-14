# Celestial Bodies Integration Guide

**LEGIT Contract Version: 1.0.0**  
**Component ID:** `celestial_integration`  
**SCS:** `SCS3`  
**Type:** `guide`  
**Last Updated:** [Current Date]

## Overview

This guide provides step-by-step instructions for integrating celestial bodies into different views of the application. It covers best practices, common pitfalls, and testing procedures to ensure proper implementation.

## Integration Workflow

### Step 1: Import Required Components

```jsx
// Import the celestial body component
import Mars from '../components/journey/celestial/bodies/Mars';

// Import the controller
import CelestialController from '../components/journey/celestial/CelestialController';

// Import context if needed
import { CelestialContext } from '../components/journey/celestial/CelestialContext';
```

### Step 2: Define Celestial Body Configuration

```jsx
// Define configuration for celestial bodies
const celestialBodies = [
  { 
    id: 'mars', 
    component: Mars, 
    props: { 
      position: { x: 50, y: 40 }, 
      size: 200, 
      parallaxFactor: 0.8 
    } 
  },
  // Add more celestial bodies as needed
];
```

### Step 3: Set Up Scene Management

```jsx
// Set up state for scene management
const [currentScene, setCurrentScene] = useState('dormant');
const [parallaxStyle, setParallaxStyle] = useState('3d');

// Scene detection based on scroll or other triggers
useEffect(() => {
  const handleScroll = () => {
    const scrollProgress = calculateScrollProgress();
    
    if (scrollProgress < 0.25) {
      setCurrentScene('dormant');
    } else if (scrollProgress < 0.5) {
      setCurrentScene('awakening');
    } else if (scrollProgress < 0.75) {
      setCurrentScene('cosmicReveal');
    } else {
      setCurrentScene('cosmicFlight');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Step 4: Render the Celestial Controller

```jsx
// Render the controller with celestial bodies
<div className="celestial-container">
  <CelestialController
    celestialBodies={celestialBodies}
    currentScene={currentScene}
    useParallaxStyle={parallaxStyle}
  />
  
  {/* Your other content */}
</div>
```

## Integration Patterns

### Pattern 1: Fixed Background with Scrollable Content

```jsx
// Container setup
<div className="min-h-[400vh] relative">
  {/* Fixed background with celestial bodies */}
  <div className="fixed inset-0 z-0 overflow-hidden">
    <CelestialController
      celestialBodies={celestialBodies}
      currentScene={currentScene}
      useParallaxStyle={parallaxStyle}
    />
  </div>
  
  {/* Scrollable content */}
  <div className="relative z-10 pointer-events-none">
    {/* Content sections */}
  </div>
</div>
```

### Pattern 2: Specific Section Integration

```jsx
// Section with celestial bodies
<section className="relative h-screen overflow-hidden">
  {/* Celestial controller scoped to this section */}
  <CelestialController
    celestialBodies={celestialBodies}
    currentScene="cosmicReveal" // Fixed scene
    useParallaxStyle="3d"
  />
  
  {/* Section content */}
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

### Pattern 3: Interactive Celestial Bodies

```jsx
// State for interaction
const [activeBody, setActiveBody] = useState(null);

// Define interactive celestial bodies
const interactiveBodies = celestialBodies.map(body => ({
  ...body,
  props: {
    ...body.props,
    onClick: () => setActiveBody(body.id),
    className: activeBody === body.id ? 'active-body' : ''
  }
}));

// Render with interaction
<CelestialController
  celestialBodies={interactiveBodies}
  currentScene={currentScene}
  useParallaxStyle={parallaxStyle}
/>

// Display details for active body
{activeBody && (
  <div className="celestial-details">
    {/* Details for the selected celestial body */}
  </div>
)}
```

## Z-Index Management

Proper z-index management is crucial for layering celestial bodies with other content:

```css
/* Z-index hierarchy */
.celestial-container {
  z-index: 0;            /* Base layer */
}

.celestial-body {
  z-index: 10-30;        /* Varies by body */
}

.content-layer {
  z-index: 50;           /* Above celestial bodies */
}

.ui-elements {
  z-index: 100;          /* Always on top */
}
```

## Performance Optimization

### Technique 1: Conditional Rendering

```jsx
// Only render celestial bodies when in viewport
const { isInViewport } = useInViewport(containerRef);

return (
  <div ref={containerRef}>
    {isInViewport && (
      <CelestialController
        celestialBodies={celestialBodies}
        currentScene={currentScene}
        useParallaxStyle={parallaxStyle}
      />
    )}
  </div>
);
```

### Technique 2: Performance Mode

```jsx
// Apply performance mode based on device capabilities
const { isLowPerfDevice } = useCelestialPerformance();

const optimizedBodies = celestialBodies.map(body => ({
  ...body,
  props: {
    ...body.props,
    performanceMode: isLowPerfDevice
  }
}));
```

## Common Pitfalls

### Pitfall 1: Incorrect Z-Index

**Problem**: Celestial bodies appear behind or in front of wrong elements.

**Solution**: Follow the z-index hierarchy defined above and ensure all elements have the correct z-index values.

### Pitfall 2: Performance Issues

**Problem**: Parallax effects cause jank or poor performance.

**Solution**: Use the `useCelestialPerformance` hook to detect device capabilities and adjust effects accordingly.

### Pitfall 3: Positioning Problems

**Problem**: Celestial bodies appear in the wrong position or don't center properly.

**Solution**: Ensure the container has `position: relative` and the celestial body has proper transform centering:

```css
transform: translate3d(${parallaxPosition.x}px, ${parallaxPosition.y}px, 0) translate(-50%, -50%);
```

## Testing Procedures

### Visual Testing

1. Test all scene transitions
2. Verify correct positioning in different viewport sizes
3. Check z-index layering with other content
4. Verify parallax effects work as expected

### Performance Testing

1. Test on low-end devices
2. Monitor frame rate during scrolling
3. Check memory usage with multiple celestial bodies
4. Verify performance optimizations are applied correctly

### Browser Compatibility

Test in all supported browsers:
- Chrome
- Firefox
- Safari
- Edge

## Integration Checklist

- [ ] Celestial body components imported correctly
- [ ] CelestialController configured with proper bodies
- [ ] Scene transitions implemented
- [ ] Z-index hierarchy respected
- [ ] Performance optimizations applied
- [ ] Responsive behavior verified
- [ ] Tested in all target browsers
- [ ] Accessibility considerations addressed

## Troubleshooting

### Issue: Celestial bodies not visible

**Check**:
- Z-index values
- Container overflow settings
- Position values (should be percentages)
- Transform centering

### Issue: Parallax effect not working

**Check**:
- Scroll event listeners
- Parallax factor values
- Scene type configuration
- Browser compatibility 