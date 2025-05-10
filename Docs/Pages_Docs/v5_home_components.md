# Cosmic Journey Page Structure & Architecture

## 🌌 Overview

The Cosmic Journey page is a scroll-driven experience built with multiple layered scenes that transition based on scroll position. The total page height spans 700vh (7 viewport heights), with scenes and visual elements orchestrated by the `CosmicJourneyController`.

## 🎮 Controller Architecture

**Central Controller:** `CosmicJourneyController.jsx`
- **Purpose:** Manages the entire cosmic journey experience
- **Responsibilities:**
  - Tracks scroll position and calculates progress (0-1)
  - Manages scene transitions and visibility
  - Controls particle configurations for each scene
  - Handles performance optimizations
  - Orchestrates global visual elements

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

## 📋 Scene Layer Structure

| Scene Name       | Scroll Range    | VH Range     | Key Components                           |
|------------------|-----------------|--------------|------------------------------------------|
| Dormant Scene    | 0.0 - 0.05      | 0vh - 35vh   | StarfieldCanvas, Background             |
| Awakening Scene  | 0.05 - 0.15     | 35vh - 105vh | StarfieldCanvas, Particles (awakening)  |
| Cosmic Reveal    | 0.15 - 0.3      | 105vh - 210vh| StarfieldCanvas, Ursa Minor Constellation |
| Cosmic Flight    | 0.3 - 0.8       | 210vh - 560vh| StarfieldCanvas, Orion Constellation, ParallaxSpeedDust |
| Sun Approach     | 0.8 - 0.9       | 560vh - 630vh| StarfieldCanvas, SunGlow                |
| Sun Landing      | 0.9 - 1.0       | 630vh - 700vh| StarfieldCanvas, SunFlare, LandingEffect|

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

## 🎨 Component Breakdown

### Scene Components
Each scene component is conditionally rendered based on scroll position and receives:
- `progress`: Progress within the scene (0-1)
- `particleConfig`: Scene-specific configuration for particles

### Global Components
- **GlobalParticleSystem**
  - Manages all Three.js particle effects
  - Creates optimized WebGL context
  - Renders stars, dust, galaxy effects
  
- **SceneBackdrop**
  - Provides backdrop visuals for all scenes
  - Handles color transitions between scenes
  
- **ColorOverlay**
  - Manages global color effects and transitions

## 🎬 Visual Components Library

| Component Name | File Path | Purpose | Key Properties |
|----------------|-----------|---------|----------------|
| **StarfieldCanvas** | `visual/StarfieldCanvas.jsx` | Creates dynamic star field with twinkling effect | `density`, `opacity`, `fps`, `baseColor`, `breathing`, `glow` |
| **ParallaxSpeedDust** | `visual/ParallaxSpeedDust.jsx` | Creates streaking particles with parallax effect | `opacity`, `speed`, `density`, `fps` |
| **ConstellationGlow** | `visual/ConstellationGlow.jsx` | Renders constellation star patterns with glow effect | `type`, `opacity`, `fps`, `layer` |
| **GreenAuroraEffects** | `visual/GreenAuroraEffects.jsx` | Creates aurora-like effects | `opacity`, `intensity` |
| **CosmicFlightBackdrop** | `visual/backdrops/CosmicFlightBackdrop.jsx` | Creates warp/flight tunnel effect | `progress` |
| **CosmicRevealBackdrop** | `visual/backdrops/CosmicRevealBackdrop.jsx` | Creates cosmic reveal backdrop | `progress` |
| **SceneBackdrop** | `visual/SceneBackdrop.jsx` | Global backdrop that spans all scenes | `progress` |
| **SunFlarePulse** | `visual/SunFlarePulse.jsx` | Creates pulsing sun effect | `scale`, `opacity`, `intensity` |
| **ColorOverlay** | `ColorOverlay.jsx` | Provides color transitions between scenes | N/A |

## 📝 LEGIT Compliance

All components in the Cosmic Journey adhere to the LEGIT (Layout Engine Governance & Integration Template) standards:

### Metadata Structure
```javascript
// LEGIT-compliant metadata
const metadata = {
  id: 'component_id',
  scs: 'SCS0',         // Scene Control Standard version
  type: 'component_type',
  doc: 'contract_doc.md'
};
```

### LEGIT Contract Requirements
1. **Documentation Reference**
   - Each component links to its contract document
   - References proper versioning in SCS field

2. **Rendering Compliance**
   - Scene rendering follows specified opacity transitions
   - Components respect z-index layering requirements
   - Proper containment for optimization (`contain: strict`)

3. **Animation Standards**
   - Scroll interpolation factor set to 0.09 for "boat in water" effect
   - Scene transitions use proper duration and easing
   - Animation frames properly canceled on component unmount

4. **Mobile Compliance**
   - Responsive design with mobile-specific configurations
   - Performance optimizations for touch devices

5. **Memory Management**
   - Resources properly disposed when scenes unmount
   - WebGL contexts managed efficiently
   - Event listeners cleaned up properly

## 🔩 Performance Optimization Hooks

### useParticlePerformanceConfig
```javascript
// src/components/journey/hooks/useParticlePerformanceConfig.js
```

This hook optimizes particle rendering settings per scene:

| Scene          | Desktop Settings | Mobile Settings |
|----------------|------------------|-----------------|
| dormant        | density: 115, fps: 15 | density: 100, fps: 12 |
| awakening      | density: 95, fps: 10  | density: 80, fps: 8   |
| cosmicReveal   | density: 20, fps: 10  | density: 15, fps: 8   |
| cosmicFlight   | density: 40, fps: 30  | density: 30, fps: 24  |
| sunApproach    | density: 150, fps: 15 | density: 120, fps: 12 |
| sunLanding     | density: 30, fps: 24  | density: 25, fps: 20  |

### useSceneVisibility
```javascript
// src/components/journey/hooks/useSceneVisibility.js
```

This hook optimizes memory usage by only rendering scenes that are near the current viewport:
- Keeps the current scene mounted
- Mounts scenes within 350vh of current position
- Unmounts distant scenes to reduce memory usage and improve performance

## 📱 Mobile Responsiveness

The Cosmic Journey adapts for mobile devices with:

1. **Device Detection**
   ```javascript
   const isMobile = useRef(window.innerWidth <= 768);
   ```

2. **Mobile-Optimized Particle Settings**
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

## 📐 Scene Configuration Reference

```javascript
const SCENES = [
  { key: 'dormant', range: [0.0, 0.05], Component: DormantScene, transitionDuration: 1.0, fadeZone: 0.01 },
  { key: 'awakening', range: [0.05, 0.15], Component: AwakeningScene, transitionDuration: 1.0, fadeZone: 0.015 },
  { key: 'cosmicReveal', range: [0.15, 0.3], Component: CosmicRevealScene, transitionDuration: 0.8, fadeZone: 0.015 },
  { key: 'cosmicFlight', range: [0.3, 0.8], Component: CosmicFlightScene, transitionDuration: 0.6, fadeZone: 0.015 },
  { key: 'sunApproach', range: [0.8, 0.9], Component: SunApproachScene, transitionDuration: 1.0, fadeZone: 0.015 },
  { key: 'sunLanding', range: [0.9, 1.0], Component: SunLandingScene, transitionDuration: 1.0, fadeZone: 0.01 },
];
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

- **Controller:** `src/components/journey/CosmicJourneyController.jsx`
- **Scene Components:** `src/components/journey/scenes/[SceneName].jsx`
- **Visual Components:** `src/components/journey/visual/`
- **Hooks:** `src/components/journey/hooks/`
- **Utilities:** `src/utils/dissolveEngine.js`

## 🐛 Common Issues & Solutions

- **Jittery Scrolling**: Check if interpolation factor (0.09) is correctly set
- **Visibility Issues**: Confirm scene range boundaries and fadeZone settings
- **Constellation Disappears**: Check visibility conditions and position calculations
- **High CPU Usage**: Verify particle density and FPS settings per scene
- **Memory Leaks**: Check for proper cleanup in scene components and particle systems

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
- **StarfieldCanvas:**
  - Density: 40 stars
  - FPS: 30 (higher for smooth motion)
  - Star streaking effect active
  - White stars with enhanced glow
- **CosmicFlightBackdrop:**
  - Warp tunnel effect with increasing intensity
  - Distortion field that intensifies with progress
- **ParallaxSpeedDust:**
  - Multiple layers of particles with varying speeds
  - Creates depth perception through parallax
  - Opacity: 0.8 * intensity
- **GreenAuroraEffects:**
  - Ethereal green energy wisps
  - Flowing movement patterns
- **Orion Constellation:**
  - Position: Right side of screen
  - Visibility: 0.4 - 0.85 scroll range
  - Movement: Bottom to top of viewport
- **Mint-colored Warp Trails:**
  - 8 horizontal trails with varying lengths
  - Subtle mint gradient (`hsl(160-174, 75-85%, 60-65%)`)
  - Animation: Linear movement at various speeds

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
