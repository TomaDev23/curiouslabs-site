# Custom React Hooks

📍 Location: Docs/contracts/hooks.md  
🧱 Purpose: Document custom React hooks across the CuriousLabs platform
🔒 Status: **CURRENT**

This document provides documentation for the custom React hooks used in the CuriousLabs website.

## Table of Contents

- [useBreakpoint](#usebreakpoint)
- [useParallax](#useparallax)
- [useScrollTrigger](#usescrolltrigger)
- [useScroll](#usescroll)
- [useHUDPosition](#usehudposition)
- [useViewportConstraint](#useviewportconstraint)
- [useLocalStorage](#uselocalstorage)
- [useCelestialParallax](#usecelestialparallax)
- [useCelestialPerformance](#usecelestialperformance)
- [useCombinedParallax](#usecombinedparallax)

## useBreakpoint

A hook for detecting the current breakpoint based on screen size.

### Usage

```jsx
import useBreakpoint from '../hooks/useBreakpoint';

function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

### Returns

An object containing boolean values for different breakpoints:

- `isMobile`: `true` when viewport width is less than 768px
- `isTablet`: `true` when viewport width is between 768px and 1024px
- `isDesktop`: `true` when viewport width is greater than 1024px

## useParallax

A hook for creating parallax scroll effects on elements.

### Usage

```jsx
import useParallax from '../hooks/useParallax';

function ParallaxElement() {
  const ref = useRef(null);
  const { y } = useParallax(ref, 0.5); // 0.5 is the speed factor
  
  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${y}px)` }}
    >
      Parallax Element
    </div>
  );
}
```

### Parameters

- `ref`: A reference to the DOM element
- `speed`: (optional) Speed factor for the parallax effect. Defaults to 0.2
  - Values > 0: Element moves slower than scroll speed (traditional parallax)
  - Values < 0: Element moves in the opposite direction of scroll

### Returns

An object containing:

- `y`: The calculated Y offset based on scroll position and speed factor

## useScrollTrigger

A hook for triggering effects based on scroll position.

### Usage

```jsx
import useScrollTrigger from '../hooks/useScrollTrigger';

function ScrollTriggeredComponent() {
  const { triggered, progress } = useScrollTrigger({
    threshold: 0.3, // Trigger when element is 30% in view
    rootMargin: '0px',
  });
  
  return (
    <div className={`fade-in ${triggered ? 'visible' : 'hidden'}`}>
      Content that fades in when scrolled to
      <div style={{ width: `${progress * 100}%` }}>Progress bar</div>
    </div>
  );
}
```

### Parameters

An options object with:

- `threshold`: (optional) A number between 0 and 1 indicating how much of the element needs to be visible to trigger. Defaults to 0.1
- `rootMargin`: (optional) Margin around the root element. Defaults to '0px'
- `triggerOnce`: (optional) If `true`, the trigger fires only once. Defaults to `false`

### Returns

An object containing:

- `triggered`: Boolean indicating if the scroll position has passed the threshold
- `progress`: Number between 0 and 1 indicating how far the element is in the viewport
- `element`: A ref object to attach to the element you want to observe

## useScroll

A hook for accessing the global scroll context and smooth scroll values.

### Usage

```jsx
import { useScroll } from '../context/ScrollContext';

function ScrollAwareComponent() {
  const { 
    scrollY, 
    scrollProgress, 
    activeSection,
    isAtTop,
    isAtBottom
  } = useScroll();
  
  return (
    <div>
      <p>Scroll position: {scrollY}px</p>
      <p>Scroll progress: {(scrollProgress * 100).toFixed(2)}%</p>
      <p>Active section: {activeSection}</p>
      {isAtTop && <p>At the top!</p>}
      {isAtBottom && <p>At the bottom!</p>}
    </div>
  );
}
```

### Returns

An object containing:

- `scrollY`: Current scroll position in pixels
- `scrollProgress`: Scroll progress from 0 to 1 (0 = top, 1 = bottom)
- `activeSection`: ID of the currently active section
- `isAtTop`: Boolean indicating if at the top of the page
- `isAtBottom`: Boolean indicating if at the bottom of the page
- `sections`: Array of section IDs being tracked
- `registerSection`: Function to register a new section
- `unregisterSection`: Function to unregister a section

## useHUDPosition

A hook for managing HUD component positioning with persistence.

### Usage

```jsx
import useHUDPosition from '../hooks/useHUDPosition';

function MyHUD({ initialPosition, onPositionChange, id }) {
  const { position, handleDrag } = useHUDPosition({
    id,
    initialPosition,
    onPositionChange,
    storageKey: 'cosmic_explorer_debug_positions'
  });
  
  return (
    <DraggableHUD
      position={position}
      onDrag={handleDrag}
    >
      {/* HUD content */}
    </DraggableHUD>
  );
}
```

### Parameters

An options object with:

- `id`: Unique identifier for the HUD
- `initialPosition`: Initial position object with x and y coordinates
- `onPositionChange`: Callback function when position changes
- `storageKey`: (optional) localStorage key for position persistence

### Returns

An object containing:

- `position`: Current position object with x and y coordinates
- `handleDrag`: Function to handle drag events
- `resetPosition`: Function to reset to the initial position

## useViewportConstraint

A hook for constraining elements within the viewport.

### Usage

```jsx
import useViewportConstraint from '../hooks/useViewportConstraint';

function ConstrainedElement() {
  const ref = useRef(null);
  const { constrain } = useViewportConstraint(ref, { padding: 10 });
  
  // Call constrain() after any position change
  const handlePositionChange = (newPos) => {
    setPosition(constrain(newPos));
  };
  
  return (
    <div ref={ref} style={{ position: 'absolute', left, top }}>
      Content that stays in viewport
    </div>
  );
}
```

### Parameters

- `ref`: Reference to the DOM element to constrain
- `options`: (optional) Configuration object
  - `padding`: Padding from viewport edges (default: 0)
  - `allowPartial`: Allow element to be partially visible (default: true)

### Returns

An object containing:

- `constrain`: Function that takes a position and returns a constrained position
- `isConstrained`: Boolean indicating if the element is currently being constrained

## useLocalStorage

A hook for persisting state in localStorage.

### Usage

```jsx
import useLocalStorage from '../hooks/useLocalStorage';

function PersistentPreferences() {
  const [theme, setTheme] = useLocalStorage('app_theme', 'dark');
  
  return (
    <div>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

### Parameters

- `key`: localStorage key to use
- `initialValue`: Default value if no value exists in localStorage

### Returns

An array containing:

- State value from localStorage (or initialValue if not found)
- Setter function that updates both state and localStorage

## useCelestialParallax

A hook for creating scene-specific parallax effects for celestial bodies based on scroll position.

### Usage

```jsx
import { useCelestialParallax } from '../components/journey/celestial/hooks/useCelestialParallax';

function MarsComponent() {
  const { position } = useCelestialParallax(
    0.8,          // parallax factor
    '3d',         // parallax style
    'cosmicReveal' // scene type
  );
  
  return (
    <div
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
      }}
    >
      Mars Planet
    </div>
  );
}
```

### Parameters

- `factor`: (number) Intensity of parallax effect. Default: 1
- `style`: (string) Style of parallax effect ('3d' or 'dripping'). Default: '3d'
- `scene`: (string) Current scene context ('dormant', 'awakening', 'cosmicReveal', 'cosmicFlight'). Default: 'dormant'

### Returns

An object containing:

- `position`: Object with x and y coordinates for positioning
- `ref`: React ref object to attach to the element
- `scrollProgress`: Normalized scroll progress (0-1)

### Scene-Specific Behavior

#### Dormant Scene
- X-axis: `scrollY * factor * 0.05`
- Y-axis: `scrollY * factor * 0.03`

#### Awakening Scene
- X-axis: `scrollY * factor * 0.08`
- Y-axis: `scrollY * factor * 0.2`

#### Cosmic Reveal Scene (3D style)
- X-axis: `scrollY * factor * 0.15`
- Y-axis: `scrollY * factor * 0.8`

#### Cosmic Flight Scene (3D style)
- X-axis: `scrollY * factor * 0.12`
- Y-axis: `scrollY * factor * 0.5`

## useCelestialPerformance

A hook for optimizing celestial body rendering based on device capabilities.

### Usage

```jsx
import { useCelestialPerformance } from '../components/journey/celestial/hooks/useCelestialPerformance';

function CelestialBody() {
  const { shouldRender, isLowPerfDevice } = useCelestialPerformance();
  
  useEffect(() => {
    if (isLowPerfDevice) {
      // Apply performance optimizations
      // - Reduce effects
      // - Simplify animations
      // - Disable certain features
    }
  }, [isLowPerfDevice]);
  
  if (!shouldRender) {
    return null; // Don't render on very low-end devices
  }
  
  return (
    <div className={isLowPerfDevice ? 'low-perf-mode' : ''}>
      Celestial Body Content
    </div>
  );
}
```

### Returns

An object containing:

- `shouldRender`: Boolean indicating if the component should render based on performance capabilities
- `isLowPerfDevice`: Boolean indicating if the device has limited performance capabilities

### Performance Detection

The hook uses several factors to determine device capabilities:

- Device memory (if available via navigator.deviceMemory)
- Hardware concurrency (number of logical processors)
- User agent string (for identifying mobile devices)
- Previous rendering performance metrics

## useCombinedParallax

A hook that combines both mouse movement and scroll position for enhanced parallax effects.

### Usage

```jsx
import { useCombinedParallax } from '../hooks/useCombinedParallax';

function MoonComponent() {
  const { position, mousePosition } = useCombinedParallax({
    mouseInfluence: 0.05,
    scrollInfluence: 0.1,
    depth: 2
  });
  
  return (
    <div
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
      }}
    >
      Moon Component
      <div className="debug-info">
        Mouse: {mousePosition.x.toFixed(0)}, {mousePosition.y.toFixed(0)}
      </div>
    </div>
  );
}
```

### Parameters

An options object with:

- `mouseInfluence`: (number) How much mouse movement affects position. Default: 0.05
- `scrollInfluence`: (number) How much scroll affects position. Default: 0.1
- `depth`: (number) Simulated depth factor for 3D-like movement. Default: 1
- `smoothing`: (number) Movement smoothing factor (0-1). Default: 0.2
- `bounds`: (object) Movement constraints. Default: { x: 100, y: 100 }

### Returns

An object containing:

- `position`: Current calculated position with x and y coordinates
- `mousePosition`: Current mouse position relative to viewport center
- `scrollPosition`: Current normalized scroll position (0-1)
- `resetPosition`: Function to reset to initial position

### Implementation Details

The hook combines two types of input:

1. **Mouse tracking**: Calculates position offset based on mouse coordinates relative to the center of the viewport
2. **Scroll tracking**: Adds vertical offset based on scroll position

The formula for position calculation is:

```javascript
x = (mouseX - centerX) * mouseInfluence * depth
y = (mouseY - centerY) * mouseInfluence * depth + scrollY * scrollInfluence
```

Where:
- `mouseX/Y` is the current mouse position
- `centerX/Y` is the center of the viewport
- `scrollY` is the current scroll position
- `mouseInfluence`, `scrollInfluence`, and `depth` are the parameters

### Example with Multiple Elements

```jsx
function ParallaxScene() {
  // Different parameters create layered depth effect
  const foreground = useCombinedParallax({ mouseInfluence: 0.08, depth: 3 });
  const midground = useCombinedParallax({ mouseInfluence: 0.05, depth: 2 });
  const background = useCombinedParallax({ mouseInfluence: 0.02, depth: 1 });
  
  return (
    <div className="scene">
      <div 
        className="layer background" 
        style={{ transform: `translate3d(${background.position.x}px, ${background.position.y}px, 0)` }}
      ></div>
      <div 
        className="layer midground" 
        style={{ transform: `translate3d(${midground.position.x}px, ${midground.position.y}px, 0)` }}
      ></div>
      <div 
        className="layer foreground" 
        style={{ transform: `translate3d(${foreground.position.x}px, ${foreground.position.y}px, 0)` }}
      ></div>
    </div>
  );
}
```

---

*This document will be updated as new hooks are added to the codebase.* 