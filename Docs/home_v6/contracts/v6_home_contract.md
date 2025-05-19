# 📄 CuriousLabs V6 Home Page Contract

📍 Location: `Docs/home_v6/contracts/v6_home_contract.md`  
🧱 Purpose: Define the structure, components, and architecture of the V6 Home Page
📆 Version: 1.0.0
🔒 Status: **LEGIT CERTIFIED**

---

## 📋 Page Overview

The V6 Home Page is a modern, scroll-driven experience featuring Z-pattern layouts and cosmic-themed visuals. The page combines a cosmic background system with interactive sections and animated components that create an immersive user experience.

---

## 🌟 Core Architecture

### Main Page Component

| Property | Value |
|----------|-------|
| **Component Name** | `V6HomePage` |
| **File Path** | `src/pages/v6_home.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |

### Layer System (Z-index hierarchy)

| Layer Name | Z-index Range | Purpose | Key Components |
|------------|---------------|---------|----------------|
| Base Layer | 0-9 | Background elements | CosmicBackgroundSystemV6, StarfieldCanvas |
| Content Layer | 10-50 | Main website content | HeroSequenceV6, ServiceOrbital, etc. |
| UI Control Layer | 60-90 | Interactive UI elements | Interactive buttons, controls |
| HUD Layer | 100-109 | Development/debug HUDs | Debug components |
| Navigation Layer | 110-119 | Primary navigation | NavBarCosmic |
| Debug Overlay Layer | 120+ | Critical debugging tools | ScrollDebugOverlay |

---

## 📦 Core Components

### Scene Controller

| Property | Value |
|----------|-------|
| **Component Name** | `SceneControllerV6` |
| **File Path** | `src/components/home/v6/SceneControllerV6.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Manages scene phases, device capabilities, and animation states |
| **Props** | `children` |
| **Responsibilities** | Provides context for all child components via `SceneContext` |
| **Context Values** | scenePhase, deviceCapabilities, scrollPosition, horizontalScroll, advancePhase, setPhase |
| **Phases** | VOID, EMERGENCE, ACTIVATION |

### Layout Wrapper

| Property | Value |
|----------|-------|
| **Component Name** | `LayoutWrapper` |
| **File Path** | `src/components/home/v6/LayoutWrapper.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Provides base layout container for all page content |
| **Props** | `children` |
| **Responsibilities** | Maintains consistent page structure and spacing |

### Cosmic Background System

| Property | Value |
|----------|-------|
| **Component Name** | `CosmicBackgroundSystemV6` |
| **File Path** | `src/components/home/v6/CosmicBackgroundSystemV6.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Manages all background layers including starfield, grid, and nebula effects |
| **Dependencies** | `StarfieldCanvasV6`, `GridOverlayV6` |
| **Responsibilities** | Applies opacity transitions based on scenePhase, adapts to device capabilities |
| **Z-Index** | 0-9 (Base Layer) |

---

## 🧩 Section Components

### Hero Section

| Property | Value |
|----------|-------|
| **Component Name** | `HeroSequenceV6` |
| **File Path** | `src/components/home/v6/HeroSequenceV6.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Main hero section with scroll-triggered animations following Z-pattern layout |
| **Dependencies** | `PlanetRevealTrack`, `TextRevealBlock` |
| **Layout Structure** | Z-pattern with bottom-left header, left-side text, right-side planet |
| **Animation Phases** | void → emergence → activation → complete |
| **Props** | None |
| **Z-Index** | 10-30 (Content Layer) |

#### Hero Subcomponents

| Component | File Path | Purpose |
|-----------|-----------|---------|
| `PlanetRevealTrack` | `src/components/home/v6/components/PlanetRevealTrack.jsx` | Handles planet growth and orbit animations |
| `TextRevealBlock` | `src/components/home/v6/components/TextRevealBlock.jsx` | Text reveal animation with character-by-character animation |
| `AegisPlanetV6` | `src/components/home/v6/AegisPlanetV6.jsx` | 3D Earth planet with adaptive implementation |

### Services Section

| Property | Value |
|----------|-------|
| **Component Name** | `ServicesOrbital` |
| **File Path** | `src/components/home/v6/ServicesOrbital.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Displays services in an orbital card arrangement |
| **Dependencies** | `PillNav` |
| **Layout Structure** | Central orbital system with rotating cards |
| **Props** | None |
| **Z-Index** | 10-30 (Content Layer) |

### Product Showcase

| Property | Value |
|----------|-------|
| **Component Name** | `HorizontalProductScrollV6` |
| **File Path** | `src/components/home/v6/HorizontalProductScrollV6.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Horizontal scrolling showcase of products |
| **Dependencies** | None |
| **Layout Structure** | Horizontal scroll container with product cards |
| **Props** | None |
| **Z-Index** | 10-30 (Content Layer) |

### Process Section

| Property | Value |
|----------|-------|
| **Component Name** | `ProcessCards` |
| **File Path** | `src/components/home/v6/ProcessCards.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Displays development process in card format |
| **Dependencies** | None |
| **Layout Structure** | Grid-based card layout with step numbers |
| **Props** | None |
| **Z-Index** | 10-30 (Content Layer) |

### Contact Section

| Property | Value |
|----------|-------|
| **Component Name** | `ContactTerminal` |
| **File Path** | `src/components/home/v6/ContactTerminal.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Terminal-style contact form |
| **Dependencies** | None |
| **Layout Structure** | Terminal window with form fields |
| **Props** | None |
| **Z-Index** | 10-30 (Content Layer) |

---

## 🎨 Visual Components

### Navigation

| Property | Value |
|----------|-------|
| **Component Name** | `NavBarCosmic` |
| **File Path** | `src/components/home/v6/NavBarCosmic.jsx` |
| **LEGIT Status** | ✅ CERTIFIED |
| **Purpose** | Main navigation bar with cosmic styling |
| **Dependencies** | None |
| **Z-Index** | 110-119 (Navigation Layer) |

### Background Elements

| Component | File Path | Purpose |
|-----------|-----------|---------|
| `StarfieldCanvasV6` | `src/components/home/v6/StarfieldCanvasV6.jsx` | Creates starfield background with twinkling effects |
| `GridOverlayV6` | `src/components/home/v6/GridOverlayV6.jsx` | Provides grid pattern overlay for depth |
| `ParallaxStarfield` | `src/components/home/v6/ParallaxStarfield.jsx` | Creates parallax star movement on scroll |

### Supporting Components

| Component | File Path | Purpose |
|-----------|-----------|---------|
| `PillNav` | `src/components/home/v6/PillNav.jsx` | Pill-shaped navigation elements |
| `MissionTracker` | `src/components/home/v6/MissionTracker.jsx` | Tracks implementation progress |

---

## 🌌 Scene Phases and Animation

### Scene Phases

| Phase | Description | Visual State |
|-------|-------------|-------------|
| `void` | Initial state | Elements hidden or minimized |
| `emergence` | Beginning of animation | Elements start to appear/grow |
| `activation` | Full animation | Elements reach full size/visibility |
| `complete` | Final state | All animations complete, scroll enabled |

### Animation Sequence

1. **Initial Load**:
   - Scene phase set to `void`
   - Scroll locked
   - Background visible with minimal stars

2. **First Scroll**:
   - Triggers transition to `emergence` phase
   - Planet begins growing from 0 scale
   - Text begins character-by-character animation

3. **Emergence to Activation**:
   - Planet continues growing
   - Orbit rings begin to appear
   - Text animation completes

4. **Activation to Complete**:
   - All elements reach final state
   - Orbit rings fully visible
   - Scroll hint appears
   - Scroll unlocked for page exploration

---

## 🔍 Implementation Requirements

### Planet Implementation

- 3D Earth visualization with adaptive performance
- Orbital rings around the planet with correct positioning
- Proper placement in right side of Z-pattern layout
- Animation states: hidden → growing → complete

### Text Implementation

- Character-by-character animation for header text
- Paragraph and button reveal animations
- Proper placement in left side of Z-pattern layout
- Animation states tied to scene phases

### Layout Requirements

- Z-pattern layout with:
  - Header text at bottom-left
  - Main heading and text on left side
  - Planet visualization on right side
  - Scroll hint at bottom-right

### Animation Requirements

- Smooth transitions between phases
- Performant animations that don't block the main thread
- Respect user preferences for reduced motion
- Appropriate timing for all elements

---

## 📋 Component Structure

```
V6HomePage (src/pages/v6_home.jsx)
├── SceneControllerV6 (src/components/home/v6/SceneControllerV6.jsx)
│   └── LayoutWrapper (src/components/home/v6/LayoutWrapper.jsx)
│       ├── CosmicBackgroundSystemV6 (src/components/home/v6/CosmicBackgroundSystemV6.jsx)
│       │   ├── StarfieldCanvasV6 (src/components/home/v6/StarfieldCanvasV6.jsx)
│       │   └── GridOverlayV6 (src/components/home/v6/GridOverlayV6.jsx)
│       ├── NavBarCosmic (src/components/home/v6/NavBarCosmic.jsx)
│       ├── HeroSequenceV6 (src/components/home/v6/HeroSequenceV6.jsx)
│       │   ├── PlanetRevealTrack (src/components/home/v6/components/PlanetRevealTrack.jsx)
│       │   │   └── AegisPlanetV6 (src/components/home/v6/AegisPlanetV6.jsx)
│       │   └── TextRevealBlock (src/components/home/v6/components/TextRevealBlock.jsx)
│       ├── ServicesOrbital (src/components/home/v6/ServicesOrbital.jsx)
│       │   └── PillNav (src/components/home/v6/PillNav.jsx)
│       ├── HorizontalProductScrollV6 (src/components/home/v6/HorizontalProductScrollV6.jsx)
│       ├── ProcessCards (src/components/home/v6/ProcessCards.jsx)
│       └── ContactTerminal (src/components/home/v6/ContactTerminal.jsx)
```

---

## 🚀 Mission Tracker

| Tile ID | Description | Component | Status |
|---------|-------------|-----------|--------|
| TILE_A | Core Foundation | SceneControllerV6, LayoutWrapper | ✅ Complete |
| TILE_B | Background System | CosmicBackgroundSystemV6 | ✅ Complete |
| TILE_C | Hero Elements | HeroSequenceV6 | ✅ Complete |
| TILE_D | Product Showcase | HorizontalProductScrollV6 | ✅ Complete |
| TILE_E | Services Section | ServicesOrbital | 🔄 In Progress |
| TILE_F | Process Section | ProcessCards | 🔄 In Progress |
| TILE_G | Contact Section | ContactTerminal | 🔄 In Progress |

---

## 📐 Z-Pattern Layout Specification

The Z-pattern layout follows a diagonal flow from top-left to bottom-right:

```
┌────────────────────────────────────────────────────┐
│                                                    │
│                                    ┌─────────────┐ │
│                                    │             │ │
│                                    │   Planet    │ │
│                                    │             │ │
│ ┌───────────────┐                  └─────────────┘ │
│ │               │                                  │
│ │     Text      │                                  │
│ │               │                                  │
│ └───────────────┘                                  │
│                                                    │
│ ┌────────────┐                    ┌─────────────┐ │
│ │            │                    │             │ │
│ │   Header   │                    │ Scroll Hint │ │
│ │            │                    │             │ │
│ └────────────┘                    └─────────────┘ │
│                                                    │
└────────────────────────────────────────────────────┘
```

## 🧪 Testing Requirements

- Visual testing across all scene phases
- Performance testing on low-end devices
- Animation smoothness verification
- Correct Z-pattern layout at all viewport sizes
- Proper scene phase transitions on scroll

---

*This contract is the authoritative reference for the V6 Home Page implementation. All components must adhere to the structure, layout, and animation requirements defined herein.*

*— CuriousLabs Architecture Team* 