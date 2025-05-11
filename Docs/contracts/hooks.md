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

---

*This document will be updated as new hooks are added to the codebase.* 