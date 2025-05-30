# Scroll Animation Components

This document explains the scroll animation components created for the CuriousLabs website.

## Overview

We've created a set of scroll animation components that provide engaging, interactive experiences:

1. **Vertical Scroll Animation** - A 3D card that rotates and scales as the user scrolls.
2. **Horizontal Scroll Animation** - A side-scrolling page system with smooth transitions.
3. **Combined Scroll Animation** - A vertical scroll that transitions into horizontal scroll.

## Component Structure

### 1. Vertical Scroll Animation (`vertical-scroll-animation.jsx`)

A modified version of the container scroll animation that provides a 3D card effect with rotation and scaling.

```jsx
<VerticalScroll
  titleComponent={<YourTitleComponent />}
  onProgressChange={handleProgressChange}
>
  <YourContent />
</VerticalScroll>
```

### 2. Horizontal Scroll Animation (`horizontal-scroll-animation.jsx`)

A side-scrolling animation that shows multiple pages in sequence.

```jsx
<HorizontalScroll
  titleComponent={<YourTitleComponent />}
  pages={[<Page1 />, <Page2 />, <Page3 />]}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
/>
```

### 3. Combined Scroll Animation (`combined-scroll-animation.jsx`)

A hybrid component that starts with a vertical scroll animation and then transitions to a horizontal scroll.

```jsx
<CombinedScrollAnimation
  verticalTitle={<YourVerticalTitle />}
  verticalContent={<YourVerticalContent />}
  horizontalTitle={<YourHorizontalTitle />}
  pages={[<Page1 />, <Page2 />, <Page3 />]}
/>
```

## Demo Components

We've created several demo components to showcase these animations:

1. **HeroScrollDemo** - Demonstrates the vertical scroll animation.
2. **HorizontalScrollDemo** - Demonstrates the horizontal scroll animation.
3. **CombinedScrollDemo** - Demonstrates the combined vertical + horizontal animation.
4. **OurProductsScrollModified** - Integrates the combined animation with our products showcase.

## Integration with Existing Components

The `OurProductsScrollModified` component shows how to integrate these animations with existing content. It creates simplified versions of the AegisPage, ProductsPage, and ServicesPage components that work with the scroll animations.

## Testing

You can test these animations by:

1. Running the development server: `npm run dev`
2. Visiting: `http://localhost:3000/demo/scroll-test`

Alternatively, run the PowerShell script: `./test-animations.ps1`

## Implementation Details

- All animations use Framer Motion for smooth transitions
- Responsive design works on both desktop and mobile
- The components detect device capabilities and reduce motion when necessary
- Scroll progress is tracked and can trigger additional effects
- Page indicators show the current position in horizontal scroll