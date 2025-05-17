# HomeV5AtomicPage Architecture & Components

## 🌌 Overview

The HomeV5AtomicPage is a modern, scroll-driven experience built with a layered architecture. The page combines a cosmic journey background with content sections that can be positioned and customized through an advanced control system.

## 📦 Components and Imports

### Eagerly Loaded Components
1. `AtomicPageFrame` (from `src/components/layouts/AtomicPageFrame.jsx`)
2. `ContentLayer` (from `src/components/layouts/ContentLayer.jsx`)
3. `NavBar` (from `src/components/NavBar`)
4. `HUDSystem` (from `src/components/ui/HUDSystem.jsx`)
5. `SceneBoundaryDebug` (from `src/components/journey/debug/SceneBoundaryDebug.jsx`)
6. `CosmicJourneyController` (from `src/components/journey/CosmicJourneyController.jsx`)

### Lazy Loaded Section Components
7. `HeroPortal` (from `src/components/home/v5/HeroPortal`)
8. `MissionStatement` (from `src/components/home/v5/MissionStatement`)
9. `WhyAIDevCards` (from `src/components/home/v5/WhyAIDevCards`)
10. `ServicesFloatLayer` (from `src/components/home/v5/ServicesFloatLayer`)
11. `FeaturedProjects` (from `src/components/home/v5/FeaturedProjects`)
12. `ServicesOrbital` (from `src/components/home/v5/ServicesOrbital`)
13. `ProjectsLogbook` (from `src/components/home/v5/ProjectsLogbook`)
14. `CommunityHub` (from `src/components/home/v5/CommunityHub`)
15. `HearFromAI` (from `src/components/home/v5/HearFromAI`)
16. `ContactTerminal` (from `src/components/home/v5/ContactTerminal`)
17. `FooterExperience` (from `src/components/home/v5/FooterExperience`)

### Visual Components
18. `StarfieldCanvas` (from `src/components/visual/StarfieldCanvas.jsx`)
19. `ParallaxSpeedDust` (from `src/components/visual/ParallaxSpeedDust.jsx`)
    - Purpose: Creates depth-aware particle effects for cosmic flight
    - Props:
      - opacity: Controls overall visibility
      - speed: Base movement speed (minimum 0.8)
      - density: Minimum particle count (75)
      - fps: Animation frame rate
      - scrollProgress: For parallax calculations
    - Features:
      - Three depth bands (NEAR: 1.0, MID: 0.85, FAR: 0.65)
      - Persistent animation across 0.25-0.85 scroll range
      - Automatic particle recovery and initialization
      - Scroll-coupled movement with depth awareness
      - Breathing effect with customizable pulse
      - Guaranteed minimum particle density
      - Performance optimized animation state tracking
    - Animation Properties:
      - Base movement: Constant with depth-scaled speed
      - Particle length: 8-23px
      - Distribution: 150% canvas height
      - Phase: Random (0-2π)
      - Pulse speed: 0.5-1.5
      - Pulse strength: 0.15-0.35
20. `ConstellationGlow` (from `src/components/visual/ConstellationGlow.jsx`)
21. `GreenAuroraEffects` (from `src/components/visual/GreenAuroraEffects.jsx`)
22. `CosmicFlightBackdrop` (from `src/components/visual/backdrops/CosmicFlightBackdrop.jsx`)
23. `CosmicRevealBackdrop` (from `src/components/visual/backdrops/CosmicRevealBackdrop.jsx`)
24. `SceneBackdrop` (from `src/components/visual/SceneBackdrop.jsx`)
25. `SunFlarePulse` (from `src/components/visual/SunFlarePulse.jsx`)
26. `ColorOverlay` (from `src/components/ColorOverlay.jsx`)

### Page Order
- 700vh total height (for cosmic journey)
- Core frame (`AtomicPageFrame`)
- Content sections managed by `ContentLayer` based on positions in `SectionRegistry.js`
- Cosmic background managed by `CosmicJourneyController`

## 🔄 Layer System (Z-index hierarchy)

| Layer Name | Z-index Range | Purpose | Key Components |
|------------|---------------|---------|----------------|
| Base Layer | 0-9 | Background elements | CosmicJourneyController, 3D scenes |
| Content Layer | 10-50 | Main website content | Sections, ContentLayer components |
| UI Control Layer | 60-90 | Interactive UI elements | AdvancedControlPanel |
| HUD Layer | 100-109 | Development/debug HUDs | SceneBoundaryDebug, HUDSystem |
| Navigation Layer | 110-119 | Primary navigation | NavBar |
| Debug Overlay Layer | 120+ | Critical debugging tools | ScrollDebugOverlay |


## 🛣️ Route Structure

### Production Routes

| Route | Component File | Purpose |
|-------|---------------|---------|
| `/` | `DevV4CosmicPage.jsx` | Main homepage with cosmic visualization |
| `/cosmic-rev` | `CosmicRevDev.jsx` | Cosmic Revolution experience with static galaxy visualization |
| `/products` | `ProductsPortal.jsx` | Product index page |
| `/products/aegis` | `Aegis.jsx` | Aegis product page |
| `/products/opspipe` | `OpsPipe.jsx` | OpsPipe product page |
| `/products/moonsignal` | `MoonSignal.jsx` | MoonSignal product page |
| `/products/curious` | `Curious.jsx` | Curious app page |
| `/products/guardian` | `Guardian.jsx` | Guardian product page |
| `/codelab` | `CodeLab.jsx` | CodeOps service landing page |
| `/tools` | `Tools.jsx` | Utilities & microtools page |
| `/docs` | `Documentation.jsx` | Developer documentation |
| `/blog` | `Blog.jsx` | Blog hub |
| `/about` | `About.jsx` | About CuriousLabs |
| `/contact` | `Contact.jsx` | Contact + inquiry form |
| `/404` | `NotFound.jsx` | Custom 404 page |

### Special Routes

| Route | Component File | Purpose |
|-------|---------------|---------|
| `/legacy` | `Home.jsx` | Original homepage (easter egg) |
| `/safe` | `SafeV4CosmicPage.jsx` | Minimal fallback page |

### Development Routes

| Route | Component File | Purpose |
|-------|---------------|---------|
| `/dev` | `DevPage.jsx` | General development testing page |
| `/dev_v4_cosmic` | `DevV4CosmicPage.jsx` | Cosmic experience development (same as `/`) |
| `/test_canvas` | `TestCanvasPage.jsx` | Visual isolation route for debug |
| `/home-v5` | `HomeV5AtomicPage.jsx` | Atomic design homepage rebuild |

---

## 🧩 Core Components

### AtomicPageFrame
- **Purpose**: Main container for the entire page
- **Responsibilities**:
  - Manages section positions and visibility
  - Handles localStorage persistence
  - Provides keyboard shortcuts for admin controls
  - Coordinates the overall page structure
- **File Path**: `src/components/layouts/AtomicPageFrame.jsx`

### ContentLayer
- **Purpose**: Renders and manages page sections
- **Responsibilities**:
  - Positions sections based on vh units
  - Enables drag-and-drop section positioning in edit mode
  - Applies visibility filters based on hiddenSections array
- **File Path**: `src/components/layouts/ContentLayer.jsx`

### SectionRegistry
- **Purpose**: Defines available sections and their components
- **Responsibilities**:
  - Maps section IDs to component implementations
  - Configures default positions for sections
- **File Path**: `src/config/SectionRegistry.js`

### HUDSystem
- **Purpose**: Manages development HUDs
- **Responsibilities**:
  - Provides scroll and scene data to HUDs
  - Controls HUD visibility
- **File Path**: `src/components/ui/HUDSystem.jsx`

### SceneBoundaryDebug
- **Purpose**: Visualizes scene boundaries and scroll progress
- **Responsibilities**:
  - Shows scene transitions and boundaries
  - Displays current scroll position
- **File Path**: `src/components/journey/debug/SceneBoundaryDebug.jsx`

## 🛠️ Page Editing Mechanisms

### Section Position Editing
- **Toggle Edit Mode**: Via AdvancedControlPanel
- **Drag Sections**: When in edit mode, drag sections to new positions
- **Position Storage**: Saved in vh units to localStorage
- **Reset Option**: Reset to defaults via panel button

### Section Visibility Control
- **Toggle Visibility**: Show/hide individual sections
- **Bulk Actions**: Show/hide all sections with single buttons
- **Persistence**: Visibility state saved to localStorage

### Keyboard Shortcuts
- **Ctrl+Alt+P**: Toggle admin panel
- **Shift+H+1**: Toggle HUD ATOMIC 1 (admin panel)

## 📊 Data Flow

### Scroll Data
- Tracked in `HomeV5AtomicPage` via scroll event listener
- Passed to `AtomicPageFrame`, `SceneBoundaryDebug`, and `HUDSystem`
- Used to visualize current scroll position relative to scenes

### Scene Data
- Defined in `HomeV5AtomicPage` as `DEFAULT_SCENES`
- Each scene has a key, range (start/end points), transition duration, and fade zone
- Used for coordinating animations and transitions based on scroll position

### Section Configuration
- Defined in `SectionRegistry.js` as `HOME_V5_SECTIONS`
- Includes ID, position (in vh units), component reference, and props
- Can be modified at runtime and saved to localStorage

### State Persistence
- Section positions saved to localStorage under `home-v5-section-positions`
- Section visibility saved under `home-v5-section-visibility`
- Persisted across page reloads for consistent editing experience

# Cosmic Journey Page Structure & Architecture

## 🌌 Overview

The Cosmic Journey page is a scroll-driven experience built with multiple layered scenes that transition based on scroll position. The total page height spans 700vh (7 viewport heights), with scenes and visual elements orchestrated by the `CosmicJourneyController`.

I'll provide a comprehensive overview of the HomeV5AtomicPage structure, its layers, and the editing mechanisms:

## HomeV5AtomicPage Structure and Layers

### Core Layers (Z-index hierarchy)
1. **Base Layer (z-0)**
   - `CosmicJourneyController` - Provides the cosmic background animations
   - Positioned as fixed with `inset-0` to cover the entire viewport

2. **Content Layer (z-10 to z-50)**
   - Managed by `ContentLayer` component
   - Contains all section components positioned absolutely based on vh units
   - Sections are defined in `SectionRegistry.js` and positioned via `HOME_V5_SECTIONS` array

3. **UI Control Layer (z-60 to z-90)**
   - `AdvancedControlPanel` (wrapped by `PageDraggableAdvancedControlPanel`)
   - Allows for section management, visibility control, and position editing

4. **HUD Layer (z-100 to z-109)**
   - `SceneBoundaryDebug` - Visualizes scene boundaries and scroll position
   - Managed through `HUDSystem` and `HUDProvider`

5. **Navigation Layer (z-110 to z-119)**
   - `NavBar` - Main navigation component

6. **Debug Overlay Layer (z-120+)**
   - Development tools and critical debugging components

### Key Components

1. **AtomicPageFrame**
   - Main container for the entire page
   - Manages section positions, visibility, and edit mode
   - Handles localStorage persistence for section positions and visibility
   - Provides keyboard shortcuts for toggling admin panels and HUDs

2. **ContentLayer**
   - Renders sections based on their registered components and positions
   - Handles section dragging in edit mode
   - Applies visibility filters based on hiddenSections array

3. **SectionRegistry**
   - Defines available sections and their components
   - Maps section IDs to component implementations
   - Configures default positions for sections

4. **HUDSystem**
   - Manages development HUDs
   - Provides scroll and scene data to HUDs

5. **SceneBoundaryDebug**
   - Visualizes scene boundaries and scroll progress
   - Helps with development and debugging of scroll-based animations

### Page Editing Mechanisms

1. **Section Position Editing**
   - Toggle edit mode via `AdvancedControlPanel`
   - Drag sections to new positions when in edit mode
   - Positions are stored in vh units and saved to localStorage
   - Reset positions to defaults via panel button

2. **Section Visibility Control**
   - Toggle visibility of individual sections via panel
   - Show/hide all sections with single buttons
   - Visibility state saved to localStorage

3. **Keyboard Shortcuts**
   - `Ctrl+Alt+P` - Toggle admin panel
   - `Shift+H+1` - Toggle HUD ATOMIC 1 (admin panel)

4. **Scene Management**
   - Default scenes defined in `HomeV5AtomicPage.jsx`
   - Scene data passed to `SceneBoundaryDebug` and `HUDSystem`
   - Scroll progress tracked and used for scene transitions

### Data Flow

1. **Scroll Data**
   - Tracked in `HomeV5AtomicPage` via scroll event listener
   - Passed to `AtomicPageFrame`, `SceneBoundaryDebug`, and `HUDSystem`
   - Used to visualize current scroll position relative to scenes

2. **Scene Data**
   - Defined in `HomeV5AtomicPage` as `DEFAULT_SCENES`
   - Each scene has a key, range (start/end points), transition duration, and fade zone
   - Used for coordinating animations and transitions based on scroll position

3. **Section Configuration**
   - Defined in `SectionRegistry.js` as `HOME_V5_SECTIONS`
   - Includes ID, position (in vh units), component reference, and props
   - Can be modified at runtime and saved to localStorage

4. **State Persistence**
   - Section positions saved to localStorage under `home-v5-section-positions`
   - Section visibility saved under `home-v5-section-visibility`
   - Persisted across page reloads for consistent editing experience

This architecture provides a flexible, component-based approach to building and managing the page, with strong separation of concerns between layers and robust development tools for visual debugging and layout adjustment.


## 🎮 CosmicJourneyController

The `CosmicJourneyController` manages the cosmic background experience:

- **Purpose**: Orchestrates the cosmic journey background
- **Responsibilities**:
  - Tracks scroll position and calculates progress (0-1)
  - Manages scene transitions and visibility
  - Controls particle configurations for each scene
  - Handles performance optimizations
  - Orchestrates global visual elements
- **File Path**: `src/components/journey/CosmicJourneyController.jsx`

```ascii
┌──────────────────────────────────────────────────────────┐
│                 CosmicJourneyController                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐  ┌───────────────┐  ┌────────────────┐  │
│  │ Scroll      │  │ Scene         │  │ Performance    │  │
│  │ Management  │  │ Management    │  │ Optimization   │  │
│  └─────────────┘  └───────────────┘  └────────────────┘  │
│                                                          │
│  ┌─────────────┐  ┌───────────────┐  ┌────────────────┐  │
│  │ Global      │  │ Particle      │  │ Constellation  │  │
│  │ Elements    │  │ System        │  │ Management     │  │
│  └─────────────┘  └───────────────┘  └────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## 📋 Scene Structure

| Scene Name       | Scroll Range    | VH Range     | Key Components                           |
|------------------|-----------------|--------------|------------------------------------------|
| Dormant Scene    | 0.0 - 0.05      | 0vh - 35vh   | StarfieldCanvas, Background             |
| Awakening Scene  | 0.05 - 0.15     | 35vh - 105vh | StarfieldCanvas, Particles (awakening)  |
| Cosmic Reveal    | 0.15 - 0.3      | 105vh - 210vh| StarfieldCanvas, Ursa Minor Constellation |
| Cosmic Flight    | 0.3 - 0.8       | 210vh - 560vh| StarfieldCanvas, Orion Constellation, ParallaxSpeedDust |
| Sun Approach     | 0.8 - 0.9       | 560vh - 630vh| StarfieldCanvas, SunGlow                |
| Sun Landing      | 0.9 - 1.0       | 630vh - 700vh| StarfieldCanvas, SunFlare, LandingEffect|

## 📱 Mobile Responsiveness

The HomeV5AtomicPage adapts for mobile devices with:

1. **Device Detection**
   ```javascript
   const isMobile = useRef(window.innerWidth <= 768);
   ```

2. **Mobile-Optimized Settings**
   - Reduced particle density (20-30% fewer particles)
   - Lower FPS settings to preserve battery
   - Reduced visual effects intensity

3. **Touch Handling**
   - Touch events processed similarly to scroll events
   - Optimized performance for touch-based scrolling

4. **Responsive Visual Components**
   - Full-viewport experience on all devices
   - Constellation position adjustments for smaller screens

## ⚡ Performance Optimizations

The system includes several performance optimizations:

1. **Visibility Limiting**
   - Only renders active scenes (1-2 at transition boundaries)
   - Uses CSS `display: none` for inactive scenes

2. **Scroll Smoothing**
   - Uses requestAnimationFrame for smooth transitions
   - Applies interpolation factor (0.09) for premium feel

3. **GPU Optimizations**
   - Uses `will-change` and `contain: strict` for rendering
   - Optimizes Three.js particle systems with instancing

4. **FPS Management**
   - Dynamic FPS adjustment based on scroll speed
   - Lower FPS for static scenes, higher for dynamic scenes

## 🧪 Debug Utilities

Development environment includes:
- **FPSMeter**: Toggle with 'F' key
- **DebugOverlay**: Shows scroll position and scene information
- **SceneBoundaryDebug**: Visualizes scene boundaries
- **VH Markers**: Shows viewport height markers at 100vh intervals

## 📝 LEGIT Compliance

All components adhere to the LEGIT standards:

```javascript
// LEGIT-compliant metadata
export const metadata = {
  id: 'component_id',          // Following naming convention
  scs: 'SCS-COMPONENT-TYPE',   // Security compliance tag
  type: 'development|ui|core',  // Component type
  doc: 'contract_component_name.md' // Reference to contract
};
```

## 🔄 Lifecycle Flow

```ascii
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│ Page Load       │────►│ Controller Init  │────►│ Scene Setup        │
└─────────────────┘     └──────────────────┘     └────────────────────┘
                                │                           │
                                ▼                           ▼
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│ Cleanup         │◄────│ Scroll Handling  │◄────│ Animation Loop     │
└─────────────────┘     └──────────────────┘     └────────────────────┘
```

## 📁 Key File Paths

- **HomeV5AtomicPage**: `src/pages/HomeV5AtomicPage.jsx`
- **AtomicPageFrame**: `src/components/layouts/AtomicPageFrame.jsx`
- **ContentLayer**: `src/components/layouts/ContentLayer.jsx`
- **SectionRegistry**: `src/config/SectionRegistry.js`
- **CosmicJourneyController**: `src/components/journey/CosmicJourneyController.jsx`
- **SceneBoundaryDebug**: `src/components/journey/debug/SceneBoundaryDebug.jsx`
- **HUDSystem**: `src/components/ui/HUDSystem.jsx`

## 🐛 Common Issues & Solutions

| Issue | Symptoms | Solution |
|-------|----------|----------|
| **Jittery Scrolling** | Cosmic background elements jump during scroll | Increase `smoothFactor` in `useScrollSmoothing` hook (current: 0.09) |
| **Visibility Issues** | Components appear/disappear at wrong scroll positions | Check scene range configuration in `sceneConfig.js` |
| **Disappearing Constellations** | Constellations vanish unexpectedly | Verify z-index layering and check `ConstellationGlow` opacity settings |
| **High CPU Usage** | Page becomes sluggish, especially on mobile | Reduce FPS settings in `GlobalParticleSystem` or disable effects for mobile |
| **Memory Leaks** | Performance degrades over time | Ensure all animation loops are properly cleaned up in useEffect cleanup functions |
| **Mobile Responsiveness** | Elements positioned incorrectly on small screens | Check viewport calculations in `useViewportUnits` hook |

## 🧩 Visual Layer Stack

```ascii
Z-Index Layering (front to back):
┌────────────────────────────────────────────┐
│ z-50+ Debug Overlays (Development only)    │
├────────────────────────────────────────────┤
│ z-40  Warp Trails (Cosmic Flight only)     │
├────────────────────────────────────────────┤
│ z-30  Constellation Layer                  │
├────────────────────────────────────────────┤
│ z-20  Scene-specific Particle Effects      │
├────────────────────────────────────────────┤
│ z-10  Starfield Canvas                     │
├────────────────────────────────────────────┤
│ z-0   Scene Backdrop                       │
└────────────────────────────────────────────┘
```

## 🔄 Scroll Flow & Progress Calculation

```ascii
               ┌───────────────────────┐
 User Scrolls  │                       │
───────────────►  Raw Scroll Progress  │
               │                       │
               └──────────┬────────────┘
                          │
                          ▼
               ┌───────────────────────┐
               │                       │
               │  Interpolated Smooth  │◄──┐
               │  Scroll Progress      │   │
               │                       │   │ Interpolation Factor: 0.09
               └──────────┬────────────┘   │ ("boat in water" effect)
                          │                │
                          │                │
                          ▼                │
               ┌───────────────────────┐   │
               │                       │   │
               │  Animation Loop       │───┘
               │                       │
               └──────────┬────────────┘
                          │
                          ▼
        ┌────────────────────────────────┐
        │                                │
        │  Scene & Component Updates     │
        │                                │
        └────────────────────────────────┘
```

## 🌠 Constellation Management

Two constellations appear at specific scroll positions and move across the viewport:

1. **Ursa Minor**
   - **Visibility:** 0.15 - 0.64 (105vh - 448vh)
   - **Position:** Left side of screen
   - **Movement:** Starts centered, moves upward out of viewport
   - **Component:** `ConstellationGlow` with `type="ursaMinor"`

2. **Orion**
   - **Visibility:** 0.4 - 0.85 (280vh - 595vh)
   - **Position:** Right side of screen
   - **Movement:** Starts at bottom, moves to top of viewport
   - **Component:** `ConstellationGlow` with `type="orion"`

## 🎬 Visual Components Library

| Component Name | File Path | Purpose | Key Properties |
|----------------|-----------|---------|----------------|
| **StarfieldCanvas** | `visual/StarfieldCanvas.jsx` | Creates dynamic star field with twinkling effect | `density`, `opacity`, `fps`, `baseColor`, `breathing`, `glow` |
| **ParallaxSpeedDust** | `visual/ParallaxSpeedDust.jsx` | Creates depth-aware particle effects for cosmic flight | `opacity`, `speed`, `density`, `fps`, `scrollProgress` |
| **ConstellationGlow** | `visual/ConstellationGlow.jsx` | Renders constellation star patterns with glow effect | `type`, `opacity`, `fps`, `layer` |
| **GreenAuroraEffects** | `visual/GreenAuroraEffects.jsx` | Creates aurora-like effects | `opacity`, `intensity` |
| **CosmicFlightBackdrop** | `visual/backdrops/CosmicFlightBackdrop.jsx` | Creates warp/flight tunnel effect | `progress` |
| **CosmicRevealBackdrop** | `visual/backdrops/CosmicRevealBackdrop.jsx` | Creates cosmic reveal backdrop | `progress` |
| **SceneBackdrop** | `visual/SceneBackdrop.jsx` | Global backdrop that spans all scenes | `progress` |
| **SunFlarePulse** | `visual/SunFlarePulse.jsx` | Creates pulsing sun effect | `scale`, `opacity`, `intensity` |
| **ColorOverlay** | `ColorOverlay.jsx` | Provides color transitions between scenes | N/A |

## 📚 In-Depth Scene Breakdowns

### 1️⃣ Dormant Scene (0.0 - 0.05 / 0vh - 35vh)

**Theme:** Initial tranquil state before the cosmic awakening.

**Visuals & Components:**
- **Background:** Deep space black (`#000000`) with subtle dark blue gradient
- **StarfieldCanvas:** 
  - Density: 115 stars
  - FPS: 15
  - Color: Pure white stars with 0.8 glow intensity
  - Animation: Subtle twinkling effect (breathing: true)
  - Opacity: 0.4-0.6 (gradually increasing with progress)

**Layers (front to back):**
1. Subtle vignette overlay (radial gradient from transparent to rgba(0,0,0,0.3))
2. StarfieldCanvas (z-10)
3. Black background (z-0)

**Animation Details:**
- Stars slowly twinkle with randomized timing
- Star brightness follows subtle breathing pattern
- No major movement, just quiet anticipation

**Color Palette:**
- Background: `#000000` to `#050510` gradient
- Stars: White (`#FFFFFF`) with blue-tint glow
- Vignette: Black with 30% opacity at edges

**Technical Notes:**
- Minimal GPU usage (15 FPS cap)
- Optimization: Low particle count, stationary particles
- Purpose: Sets the stage for cosmic journey while being resource-light

### 2️⃣ Awakening Scene (0.05 - 0.15 / 35vh - 105vh)

**Theme:** The beginning of cosmic activation - stars intensify.

**Visuals & Components:**
- **StarfieldCanvas:** 
  - Density: 95 stars (increasing from dormant)
  - FPS: 10 (optimized for transition)
  - Animation: Increased twinkling speed and intensity
  - Blue shift: Stars begin shifting toward blue hues
- **Particles (Awakening):**
  - Slow-emerging blue particle clusters
  - Growing glow effect around particles

**Layers (front to back):**
1. Blue energy wisps (subtle, center-radiating)
2. Awakening particles (z-20)
3. StarfieldCanvas (z-10)
4. Deep space background (z-0)

**Animation Details:**
- Stars shift from white to blue-white
- Particle system begins with 0 opacity, increases to 0.7
- Energy wisps start barely visible, grow to 40% opacity
- Subtle camera shake effect (0.5% maximum displacement)

**Color Palette:**
- Background: Shifts from `#000000` to `#030318`
- Stars: `#FFFFFF` to `#E0E8FF` transition
- Energy wisps: `#4080FF` with 40% opacity
- Particles: `#80A0FF` with blue glow

**Technical Notes:**
- Transition scene - requires careful blending from dormant to reveal
- Uses subtle post-processing effects (bloom begins)
- Mobile optimization: Reduced wisp count by 40%

### 3️⃣ Cosmic Reveal Scene (0.15 - 0.3 / 105vh - 210vh)

**Theme:** The cosmic universe is unveiled with the appearance of Ursa Minor.

**Visuals & Components:**
- **StarfieldCanvas:**
  - Density: 20 (focus shifts to constellation)
  - FPS: 10
  - Star size: Increased by 20%
  - Glow intensity: 0.8
- **CosmicRevealBackdrop:**
  - Nebula-like effects beginning to form
  - Deep space textures with subtle color variations
- **Ursa Minor Constellation:**
  - Position: Left side of screen
  - Visibility: 0.15 - 0.64 scroll range
  - Movement: Begins centered, moves upward
  - Star Connection: Animated line connections

**Layers (front to back):**
1. Ursa Minor constellation (z-30)
2. Nebula effects (z-25)
3. StarfieldCanvas (z-10)
4. CosmicRevealBackdrop (z-0)

**Animation Details:**
- Constellation stars appear one by one (staggered by 200ms)
- Connection lines draw progressively (animated stroke-dasharray)
- Nebula wisps expand outward (scale transform)
- Background color shifts to deeper blues and purples

**Color Palette:**
- Background: Deep blue-purple gradient (`#0A0A24` to `#160A30`)
- Constellation: Bright blue-white stars (`#E0F0FF`)
- Connection lines: Cyan glow (`#40E0FF` with 60% opacity)
- Nebula: Purple and blue hues (`#4020A0`, `#2040C0`)

**Technical Notes:**
- Constellation uses SVG paths with masking techniques
- Nebula effects use fragment shaders for smooth color blending
- Optimization: Reduced background star count to focus on constellation

### 4️⃣ Cosmic Flight Scene (0.3 - 0.8 / 210vh - 560vh)

**Theme:** Main journey through space with warp speed effect and cosmic phenomena.

**Visuals & Components:**
- **ParallaxSpeedDust:**
  - Component: `ParallaxSpeedDust`
  - Z-index: 20
  - Scene Range: 0.25 - 0.85 (wider range for persistence)
  - Depth Bands:
    - NEAR: 1.0 (Full speed, highest opacity)
    - MID: 0.85
    - FAR: 0.65
  - Particle Properties:
    - Minimum Count: 75 particles
    - Base Speed: Minimum 0.8
    - Length: 8-23px
    - Distribution: 150% canvas height
    - Phase: Random (0-2π)
    - Pulse Speed: 0.5-1.5
    - Pulse Strength: 0.15-0.35
  - Animation Features:
    - Constant base movement
    - Scroll-coupled parallax
    - Breathing effect with pulse
    - Depth-aware rendering
  - Performance:
    - Cleanup on unmount
    - Proper animation state tracking
    - Visibility always maintained
  - Initialization:
    - Guaranteed minimum particle count
    - Automatic recovery from missing particles
    - Persistent animation state

**Layers (front to back):**
1. Warp trails (z-40)
2. Orion constellation (z-30)
3. ParallaxSpeedDust (z-20)
4. GreenAuroraEffects (z-15)
5. StarfieldCanvas (z-10)
6. CosmicFlightBackdrop (z-0)

**Animation Details:**
- Stars streak horizontally (transform and motion blur)
- Warp trails animate with keyframe animation (12-32s cycle)
- Dust particles move at 3x speed with layered parallax
- Aurora effects undulate with perlin noise displacement
- Constellation rises smoothly based on scroll progress

**Color Palette:**
- Background: Deep space to warp tunnel gradient (`#000010` to `#101840`)
- Stars: White streaks (`#FFFFFF` with motion blur)
- Warp trails: Mint green gradient (`hsla(160-174, 75-85%, 60-65%, 0.3-0.5)`)
- Aurora: Green ethereal glow (`#20D080` to `#20A060`)
- Speed dust: White to blue-white particles (`#FFFFFF` to `#E0E8FF`)
- Orion stars: Bright white-blue (`#E8F0FF`)

**Technical Notes:**
- Most GPU-intensive scene with highest FPS requirement
- Uses WebGL acceleration for particle systems
- Optimization: Variable FPS based on scroll velocity
- Mobile: Reduced trail count, particle density by 25%

### 5️⃣ Sun Approach Scene (0.8 - 0.9 / 560vh - 630vh)

**Theme:** Approaching the cosmic destination - a sun-like celestial body.

**Visuals & Components:**
- **StarfieldCanvas:**
  - Density: 150 stars (highest density)
  - FPS: 15
  - Star color: Shifting toward orange/yellow hues
- **SunGlow:**
  - Position: Center-bottom, rising
  - Scale: 0.3 + progress * 0.8
  - Opacity: 0.6 + progress * 0.4
  - Pulsing corona effect
- **AmbientLightOverlay:**
  - Warm light cast across the scene
  - Increases in intensity with progress

**Layers (front to back):**
1. Light rays (z-35)
2. Sun corona (z-30)
3. Sun core (z-25)
4. StarfieldCanvas (z-10)
5. Gradient background (z-0)

**Animation Details:**
- Sun rises from below viewport
- Corona pulses with 4-second cycle
- Light rays rotate slowly (2° per second)
- Stars begin to fade as sun brightness increases
- Background color warms gradually

**Color Palette:**
- Background: Deep blue to warm purple (`#101840` to `#301840`)
- Sun core: Bright yellow-orange (`#FFF0A0` to `#FFA040`)
- Corona: Orange-yellow gradient (`#FFC060` with feathered edge)
- Light rays: Yellow with 30% opacity (`#FFE080`)
- Stars: Yellow-white (`#FFFAF0`)

**Technical Notes:**
- Uses radial gradients with multiple layers for sun effect
- Light rays implemented with masked, rotating elements
- High star density but limited animation to balance performance

### 6️⃣ Sun Landing Scene (0.9 - 1.0 / 630vh - 700vh)

**Theme:** Final destination reached - intense solar energy engulfs the viewport.

**Visuals & Components:**
- **StarfieldCanvas:**
  - Density: 30 stars (reduced as sun dominates)
  - FPS: 24
  - Stars barely visible through intense light
- **SunFlarePulse:**
  - Intense solar surface with plasma details
  - Dynamic flare patterns that move across surface
  - Scale: Growing to fill viewport
- **LandingEffect:**
  - Blinding flash at completion
  - Color saturation shift

**Layers (front to back):**
1. Bright flash overlay (z-40)
2. Solar flares (z-35)
3. Sun surface details (z-30)
4. Plasma movement (z-25)
5. StarfieldCanvas (barely visible) (z-10)
6. Sun core (z-0)

**Animation Details:**
- Sun surface has procedural plasma movement
- Solar flares erupt randomly (3-5 per cycle)
- Final flash transition when reaching 100% scroll
- Color saturation increases to peak at journey end
- Subtle pulsing effect (1.5-second cycle)

**Color Palette:**
- Sun surface: Bright yellow-orange (`#FFF080` to `#FFA030`)
- Plasma details: Orange-red swirls (`#FF8030` to `#FF4020`)
- Solar flares: Bright yellow (`#FFFF80` with glow)
- Final flash: Pure white (`#FFFFFF`)
- Background: Orange-red gradient (`#FF8040` to `#FF2000`)

**Technical Notes:**
- Highest visual intensity with controlled performance cost
- Uses fragment shaders for plasma effect
- Final scene optimization: Limited animation frames
- Flash effect uses CSS transition for efficiency
