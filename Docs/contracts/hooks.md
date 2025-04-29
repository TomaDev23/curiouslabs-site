# Custom React Hooks

This document provides documentation for the custom React hooks used in the CuriousLabs website.

## Table of Contents

- [useBreakpoint](#usebreakpoint)
- [useParallax](#useparallax)
- [useScrollTrigger](#usescrolltrigger)

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