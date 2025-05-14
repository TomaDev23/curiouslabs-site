# 🧭 CuriousLabs Project Orientation

📍 Location: src/Docs/Pages_Docs/Project_orientation.md  
🧱 Purpose: Provide comprehensive mapping of the CuriousLabs website architecture
📊 Status: **CURRENT** (as of most recent update)

---

## 📋 Table of Contents

1. [Project Architecture Overview](#project-architecture-overview)
2. [Route Structure](#route-structure)
3. [Page Organization](#page-organization)
4. [Layer System](#layer-system)
5. [Key Components](#key-components)
6. [HUD System](#hud-system)
7. [State Management](#state-management)
8. [Navigation Flow](#navigation-flow)
9. [File System Organization](#file-system-organization)
10. [Simplified Reference](#simplified-reference)
11. [Celestial Bodies System](#celestial-bodies-system)
12. [Planet Sandbox Contracts](#planet-sandbox-contracts)
13. [Diagnostic Reports](#diagnostic-reports)

---

## 🏗️ Project Architecture Overview

The CuriousLabs website is a React-based application with a component-driven architecture. It uses a modular approach with strict separation of concerns through a layered system. The application is organized around:

- **Routes**: URL paths that map to specific page components
- **Pages**: Full-page React components that compose the UI for each route
- **Sections**: Modular content blocks within pages
- **Components**: Reusable UI elements that build up the interface
- **Layers**: Z-index based visual stacking system to organize elements
- **HUDs**: Heads-Up Display components for development and debugging
- **Controllers**: Management components that handle specific concerns

The application follows the LEGIT certification system which enforces compliance with established standards for component naming, documentation, and implementation.

---

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
| `/products/curious` | `Curious.jsx` | Curious app product page |
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
| `/dev/mars-test` | `MarsTestPage.jsx` | Mars component testing with scene transitions |
| `/dev/combined-parallax-test` | `CombinedParallaxTest.jsx` | Parallax effects testing with Moon component |

---

## 📄 Page Organization

Pages in the CuriousLabs application are organized into several key categories:

### Main Content Pages

These pages provide primary content and feature specialized layouts:

- **Cosmic Homepage** (`DevV4CosmicPage.jsx`): Immersive 3D cosmic visualization with scroll-linked sections
- **Cosmic Revolution** (`CosmicRevDev.jsx`): Static 3D galaxy space experience with fixed viewport and scene presets
- **Product Pages** (`products/*.jsx`): Feature-focused pages with product specifications and demos
- **Content Pages** (`about.jsx`, `blog.jsx`, etc.): Information-focused pages with standard layouts

### Special Purpose Pages

These pages serve specific purposes beyond standard content:

- **Tool Pages** (`tools.jsx`, `codelab.jsx`): Interactive utility pages offering developer resources
- **Documentation** (`docs.jsx`): Technical documentation and reference materials
- **Contact** (`contact.jsx`): User interaction and form submission

### Development Pages

These pages exist specifically for development and testing:

- **Test Pages** (`dev.jsx`, `test_canvas.jsx`): Isolated component testing environments
- **Architecture Experiments** (`HomeV5AtomicPage.jsx`): New layout approaches being developed

---

## 🔢 Layer System

The CuriousLabs platform implements a strict z-index based layering system that maintains separation of concerns and ensures consistent rendering order.

### Layer Hierarchy

| Layer Name | z-index Range | Purpose | Controller |
|------------|---------------|---------|------------|
| Base Layer | 0-9 | Background elements, 3D scenes | SceneController |
| Content Layer | 10-50 | Main website content sections | ContentLayer, SectionRegistry |
| UI Control Layer | 60-90 | Interactive controls, buttons | UIController |
| HUD Layer | 100-109 | Development and debugging HUDs | HUDManager |
| Navigation Layer | 110-119 | NavBar, primary navigation | NavController |
| Debug Overlay Layer | 120+ | Critical diagnostic overlays | SystemDebugController |

### Key Implementation Notes

- Each layer has specific responsibility and is managed by dedicated controllers
- Elements within each layer must respect the z-index boundaries
- Navigation elements must always remain accessible at the highest layers
- HUDs and debug overlays occupy the highest z-indices for proper visibility
- The `/cosmic-rev` and `/home-v5` pages have specific layer implementations

### Layer Management

- Layer assignments are documented in the Control Layers Contract
- Z-index values are implemented using Tailwind classes (e.g., `z-10`, `z-110`)
- Controllers maintain responsibility for elements within their assigned layers
- Layer conflicts are tracked and resolved through the issue management system

---

## 🧩 Key Components

### Structural Components

- **NavBar**: Main navigation component, present on all pages
- **ContentLayer**: Container for all content sections
- **SectionRegistry**: Configuration system for section management
- **AtomicPageFrame**: Layout framework for atomic design pages
- **CosmicJourneyController**: 3D visualization environment
- **CelestialController**: Manager for celestial body components

### UI Components

- **HeroPortal**: Main hero section on homepage
- **ProductCard**: Product showcase component
- **FeatureShowcase**: Feature highlight component
- **FooterExperience**: Enhanced footer with interactive elements
- **NavMenu**: Navigation menu component
- **ScrollToTop**: Utility for page navigation
- **CelestialBody**: Base component for celestial bodies
- **Mars**: Mars planet component with scene transitions
- **Moon**: Moon celestial body with parallax effects

### Developer Tools

- **HUDManager**: Central controller for HUD components
- **HUDSelector**: Interface for toggling HUDs
- **DraggableHUD**: Base component for movable HUDs
- **ScrollDebugOverlay**: Scroll position debugging tool
- **AdminPanel**: Admin interface for section editing

### System Components

- **ModeSwitcher**: Toggle between application modes
- **RouteController**: Navigation state management
- **ErrorBoundary**: Error handling component
- **Suspense Fallbacks**: Loading state components

---

## 🎮 HUD System

The HUDs (Heads-Up Displays) system provides development, debugging, and visualization tools across the application.

### HUD Categories

| Category | Purpose | Example Components |
|----------|---------|-------------------|
| Standard Debug HUDs | Core debugging | PerformanceMetricsHUD, CameraInfoHUD |
| Mini HUDs | Compact utilities | FPSMiniHUD, GPUTempHUD |
| Visualization HUDs | Data visualization | HistogramHUD, SystemStatusHUD |
| Advanced DEV HUDs | Complex development tools | MaterialInspectorHUD, TimelineAnimationHUD |

### Major HUD Components

1. **Performance & System HUDs**:
   - PerformanceMetricsHUD: Monitor application performance
   - RenderingProfilerHUD: Advanced rendering analysis
   - SystemStatusHUD: System component health monitoring

2. **Development HUDs**:
   - ShaderInspectorHUD: Shader program inspection
   - MaterialInspectorHUD: Material property editing
   - TimelineAnimationHUD: Animation keyframe editor
   - NetworkMonitorHUD: API call monitoring

3. **Visualization HUDs**:
   - SceneGraphHUD: Scene hierarchy visualization
   - WebGLPipelineHUD: WebGL pipeline visualization
   - HistogramHUD: Data distribution visualization

4. **Mini HUDs**:
   - FPSMiniHUD: Compact FPS counter
   - GPUTempHUD: GPU temperature monitor
   - MemoryUsageHUD: Memory consumption tracking
   - AudioSpectrumHUD: Audio visualization

### HUD Management

The HUD system is controlled by:

- **HUDManager**: Central controller for HUD visibility and positioning
- **HUDSelector**: User interface for toggling HUDs
- **DraggableHUD**: Base component for all HUDs providing consistent behavior

HUDs are only available in DEBUG and DEV modes, with position persistence via localStorage.

---

## 🧠 State Management

### Application State

- **Context Providers**: React Context for shared state
- **LocalStorage**: Persistent settings and preferences
- **URL Parameters**: Route-specific state

### Key State Systems

1. **Scroll Context**
   - Tracks scroll position and active sections
   - Powers scroll-linked animations and transitions
   - Provides viewport metrics for responsive behavior

2. **Route System**
   - Manages current route and navigation state
   - Handles route parameters and queries
   - Controls route-specific behavior

3. **Mode System**
   - Controls application mode (PROD, DEBUG, DEV)
   - Enables/disables development features
   - Manages environment-specific behavior

4. **Section Registry**
   - Maintains section configuration and positions
   - Controls section visibility and ordering
   - Handles section editing and administration

---

## 🧭 Navigation Flow

### Primary Navigation

- **NavBar**: Main navigation present on all pages
- **Footer Navigation**: Secondary links in footer
- **Product Navigation**: Navigation between product pages
- **Section Navigation**: Within-page section links

### Navigation Patterns

1. **Main Routes**
   - Direct links from NavBar to primary sections
   - Clear hierarchy for product pages

2. **Cross-Linking**
   - Related content links between pages
   - Product cross-references

3. **Scroll Navigation**
   - Within-page section navigation
   - Scroll-to-section functionality
   - ScrollToTop utility

4. **Development Navigation**
   - Mode toggle for development tools
   - Debug route access

---

## 📁 File System Organization

### Core Structure

```
src/
├── components/       # UI components
│   ├── cosmic-explorer/  # Cosmic explorer components
│   │   ├── core/         # Core management
│   │   ├── huds/         # HUD components
│   │   └── ui/           # UI elements
│   ├── home/             # Homepage components
│   │   └── v4/           # v4 design system
│   ├── journey/          # Cosmic journey components
│   │   └── celestial/    # Celestial body components
│   │       ├── bodies/   # Planet components
│   │       ├── hooks/    # Celestial-specific hooks
│   │       └── utils/    # Utility functions
│   ├── layouts/          # Layout components
│   ├── nav/              # Navigation components
│   └── ui/               # General UI components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
│   ├── products/         # Product page components
│   └── dev/              # Development pages
├── utils/            # Utility functions
├── config/           # Configuration files
│   └── SectionRegistry.js  # Section registry
├── App.jsx           # Main application component
└── main.jsx          # Application entry point

Docs/
├── contracts/        # LEGIT contracts
├── Pages_Docs/       # Page documentation
├── celestial_page/   # Celestial bodies documentation
└── Dev_tools/        # Developer tools docs
```

### Component Organization Patterns

1. **Functional Grouping**
   - Components organized by function (e.g., navs, layouts)
   - Shared utilities grouped by purpose

2. **Version Organization**
   - Components versioned in directories (e.g., `home/v4/`)
   - Allows parallel development of new versions

3. **Feature Isolation**
   - Feature-specific components grouped together
   - Minimizes cross-dependencies

4. **Documentation Proximity**
   - Contracts and documentation near related code
   - Clear mapping between components and docs

---

## 🔍 Simplified Reference

### Core Routes

- `/` - Main homepage (cosmic visualization)
- `/cosmic-rev` - Cosmic Revolution experience
- `/products` - Products index
- `/products/[product-name]` - Individual product pages
- `/codelab`, `/tools`, `/docs` - Developer resources
- `/about`, `/contact`, `/blog` - Company information
- `/home-v5` - New homepage development
- `/dev/mars-test` - Mars component testing environment
- `/dev/combined-parallax-test` - Parallax effects and Moon testing

### Main Pages (Components)

- **DevV4CosmicPage** - Current homepage
- **CosmicRevDev** - Cosmic Revolution experience
- **ProductsPortal** - Products index page
- **HomeV5AtomicPage** - New atomic design homepage

### Layer System Quick Reference

- **z-0 to z-9**: Background, 3D scenes
- **z-10 to z-50**: Main content sections
- **z-60 to z-90**: UI controls, interactive elements
- **z-100 to z-109**: HUDs and debug tools
- **z-110 to z-119**: NavBar and main navigation
- **z-120+**: Critical debug overlays

### Key Controllers

- **HUDManager** - Controls debug/dev HUDs
- **ContentLayer** - Manages content sections
- **SceneController** - Manages 3D backgrounds
- **NavController** - Handles navigation

### Development Tools

- **HUDSelector** - Toggle different HUDs
- **AdminPanel** - Edit section positions
- **ScrollDebugOverlay** - Debug scroll position
- **Various HUDs** - Development and debugging tools

---

## 🪐 Celestial Bodies System

The Celestial Bodies system provides interactive planetary components for the cosmic journey experience.

### Key Components

- **CelestialController**: Manages all celestial bodies and scene transitions
- **CelestialBody**: Base component for all celestial bodies
- **Mars**: Mars planet implementation with scene-specific styling
- **Moon**: Moon implementation with crater details and glow effects
- **CelestialContext**: Context provider for celestial system state

### Custom Hooks

- **useCelestialParallax**: Calculates position offsets for parallax effects
- **useCelestialPerformance**: Provides performance optimizations for celestial rendering
- **useCombinedParallax**: Combines mouse and scroll-based parallax effects

### Scene Types

1. **dormant**: Initial state with subtle effects
2. **awakening**: Transitional state with increased visibility
3. **cosmicReveal**: Enhanced state with strong glow effects
4. **cosmicFlight**: Maximum intensity state with full effects

### Parallax Types

1. **Standard Parallax**: Scroll-based movement
2. **Mouse Parallax**: Position based on mouse coordinates
3. **Combined Parallax**: Hybrid approach using both scroll and mouse input

### Integration Patterns

- Fixed background with scrollable content
- Section-specific celestial bodies
- Interactive celestial bodies with click handlers
- Layered parallax effects for depth perception

### Documentation

Comprehensive documentation is available in the `Docs/celestial_page/` directory:
- Component contracts
- Integration guides
- Schema references
- Asset requirements
- Development routes

---

## 📜 Planet Sandbox Contracts

The Planet Sandbox system is defined by a set of LEGIT contracts that provide comprehensive specifications for implementation.

### Contract Structure

| Contract File | Purpose | Key Components |
|---------------|---------|----------------|
| `contract_planet_sandbox.md` | Main contract defining overall structure | PlanetSandboxPage, SolarSystem, rendering requirements |
| `contract_planet_components.md` | Planet-specific requirements | Base planet requirements, individual planet specifications |
| `contract_ui_components.md` | UI element specifications | Control Panel, Planet Selector HUD, Information Panel |
| `contract_implementation_guide.md` | Implementation instructions | Project structure, step-by-step guide, code examples |

### Key Features

- **Dual View Modes**: Single Planet View and Solar System View
- **Planet Components**: Earth, Moon, Mars, Venus, Jupiter, Saturn, Uranus, Neptune, and Pluto
- **Interactive Controls**: Zoom, rotate, pan, and planet selection
- **Information Display**: Planet data and educational content
- **Visual Effects**: Realistic materials, textures, atmospheres, and lighting

### Implementation Path

The contracts follow a hierarchical structure with the main contract (`contract_planet_sandbox.md`) referencing all subcontracts. Developers should:

1. Start with the main contract for overall understanding
2. Reference specific component contracts for detailed requirements
3. Follow the implementation guide for practical instructions
4. Validate against all contracts before deployment

### Integration Points

- Route: `/dev/planet-sandbox`
- Component: `PlanetSandboxPage`
- Related Systems: Celestial Bodies System, HUD System
- Documentation: `Docs/contracts/Solar_System/README.md`

---

# 🛡️ CuriousLabs Diagnostic Report

## Title: GPU Black Framebuffer Interference

---

## 📌 Summary

This report documents a confirmed system-level issue where PrintScreen and clipboard-based screenshots failed to capture WebGL-rendered scenes — even after navigating away from the source page or closing Chrome.

The issue was confirmed to be a GPU memory retention and framebuffer compositing failure triggered by an active WebGL render context.

---

## 🧠 Root Cause

| Layer                | Cause                                                                          |
| -------------------- | ------------------------------------------------------------------------------ |
| **GPU**              | VRAM framebuffer not releasing after heavy WebGL session                       |
| **Chrome**           | Persistent hardware-accelerated rendering of canvas layer                      |
| **OS (Windows)**     | System compositor failing to flush GPU layer into final framebuffer            |
| **Screenshot Layer** | `PrtScn` and clipboard tools accessing a black buffer instead of screen pixels |

---

## 🧪 Symptoms

* Screenshots taken using `PrtScn` or clipboard shortcuts appear completely black
* Issue persists even after navigating away or closing the browser tab
* Only a **system reboot** clears the issue and restores normal screenshot behavior
* WebGL render remains functional and visible during the session

---

## ✅ Confirmed Fix

* A **full reboot** clears the compositor and GPU VRAM stack, restoring screenshot functionality

---

## 🛠️ Preventive Measures

### 1. Use Snipping Tool or `Win + Shift + S`

These tools capture from a higher screen layer and bypass GPU framebuffer quirks

### 2. Add `preserveDrawingBuffer: true`

In Three.js Canvas config:

```jsx
<Canvas gl={{ preserveDrawingBuffer: true }} />
```

✅ Helps in many screenshot + `.toDataURL()` scenarios
❗ Not a guaranteed fix for all OS/GPU conditions

### 3. Minimize WebGL surfaces when not active

Unload or hide WebGL scenes to reduce GPU compositor lock risk

### 4. Use `.toDataURL()` capture utility

For export-safe rendering during dev, implement a capture button:

```js
canvas.toDataURL('image/png')
```

### 5. Disable Hardware Acceleration (dev only)

Temporarily disable via Chrome settings:
`chrome://settings/system` → Turn OFF "Use hardware acceleration"

---

## 🧬 CuriousLabs Protocol Log

* 🧠 Issue detected: Screenshot buffer showing black
* 🛠️ `preserveDrawingBuffer: true` applied
* ❌ Issue persisted
* 🧪 Reboot triggered → ✅ Issue resolved
* ✅ Screenshots now function across tools and clipboard

---

## 📂 File Location

Add this to:

```md
/Docs/system/gpu_black_framebuffer.md
```

Log as a Class-A Interference Incident under `Project_orientation.md`

---

*This document serves as the primary orientation reference for the CuriousLabs website project. It should be updated whenever significant architectural changes are made.* 