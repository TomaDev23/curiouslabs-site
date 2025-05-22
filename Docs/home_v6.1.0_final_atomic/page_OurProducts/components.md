# Component and Layer Structure in OurProducts_newV6

## Top-Level Component
- **HorizontalProductScrollV6** (main container)
  - z-index: Base container
  - Contains 3 full-screen pages in a horizontal scroll arrangement
  - Includes pagination dots (z-30)
  - Debug overlay (z-50) when triggered with Ctrl+D

## Page Components
1. **AegisPage**
   - Visual layers:
     - Background gradient (z-0)
     - Nebula effect (z-1)
     - Particles/stars (z-2)
     - Content container (z-10)
     - AEGIS floating logo (z-15)

2. **ProductsPage**
   - Visual layers:
     - Background gradient (z-0)
     - Nebula effect (z-1)
     - Particles/stars (z-2)
     - Carousel container (z-10)
     - Pagination dots (z-20)
     - BentoItem components inside carousel

3. **ServicesPage**
   - Visual layers:
     - Background gradient (z-0)
     - Nebula effect (z-1)
     - Particles/stars (z-2)
     - Text reveal content (z-10)

## Interactive Components
- **BentoItem** (product cards)
  - Visual layers:
    - Card background
    - Pulsating glow border (z-10)
    - Card content container (z-5)
    - Front side content (3D transformed)
    - Back side content (3D transformed)

## Utility Components
- **useReducedMotion** (hook for accessibility)
- **useDebugMode** (hook for visual debugging)

## Animation Variants
- pageVariants: Page transitions
- textVariants: Text reveal animations
- particleVariants: Particle animations
- shootingStarVariants: Shooting star animations
- nebulaVariants: Nebula background animations
- cardVariants: Card appearance/hover animations
- flipVariants: 3D card flip animations

## Data Structures
- **OPS_BENTO_ITEMS**: Array of product data objects with:
  - Product details (title, summary, features)
  - Visual styling (accentColor, illustrationSrc)
  - Content for front and back of cards

## Z-Index Hierarchy (lowest to highest)
1. Background elements (z-0)
2. Nebula effects (z-1)
3. Particles and stars (z-2)
4. Card internal elements (z-5)
5. Main content containers (z-10)
6. Interactive elements (z-15)
7. Secondary navigation (z-20)
8. Primary navigation (z-30)
9. Debug overlay (z-50)

This organized structure ensures proper stacking of visual elements, prevents z-index conflicts, and maintains appropriate layering for both 2D and 3D transformed elements throughout the component.
