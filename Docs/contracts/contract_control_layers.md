yu# ✅ CuriousLabs Control Layers Contract — v1.0

📍 Location: src/Docs/contracts/contract_control_layers.md  
🧱 Purpose: Define standardized layering system for separation of concerns across the CuriousLabs platform
🔒 Status: **LEGIT CERTIFIED**

---

## 🧩 1. Layer System Overview

The CuriousLabs platform implements a strict layering system using z-index values to maintain separation of concerns and ensure consistent rendering order across all pages. This contract defines the canonical layer structure and rules for component placement.

### 1.1 Layer Hierarchy (z-index ranges)

| Layer Name           | z-index Range | Purpose                                          | Managed By                       |
|----------------------|---------------|--------------------------------------------------|----------------------------------|
| Base Layer           | 0-9           | Background elements, 3D scenes, cosmic journeys  | SceneController                  |
| Content Layer        | 10-50         | Main website content sections                    | ContentLayer, SectionRegistry    |
| UI Control Layer     | 60-90         | Interactive controls, buttons, form elements     | UIController                     |
| HUD Layer            | 100-109       | Development and debugging HUDs                   | HUDManager                       |
| Navigation Layer     | 110-119       | NavBar, primary navigation, user journey controls| NavController                    |
| Debug Overlay Layer  | 120+          | Critical diagnostic overlays                     | SystemDebugController            |

### 1.2 LEGIT Layer Requirements

A component is properly layered only if it:

- ✅ Uses z-index values within its assigned layer range
- ✅ Renders in the correct stacking order relative to other components
- ✅ Maintains consistent z-index values across all pages
- ✅ Does not interfere with components in higher layers
- ✅ Properly handles focus management when overlapping other components
- ✅ Is managed by the appropriate controller for its layer
- ✅ Uses transparent backgrounds appropriately to show through to lower layers

---

## 🌐 2. Page-Specific Layer Implementation

### 2.1 /cosmic-rev Page Layer Structure

| Component                   | Layer               | z-index    | Notes                             |
|-----------------------------|---------------------|------------|-----------------------------------|
| CosmicJourneyController     | Base Layer          | 0          | Main cosmic background            |
| CosmicParticleSystem        | Base Layer          | 5          | Particle effects for cosmic scene |
| SectionComponents           | Content Layer       | 10-30      | Main content sections             |
| ContentControls             | UI Control Layer    | 60-80      | Interactive UI elements           |
| FPSMiniHUD                  | HUD Layer           | 100        | Performance mini HUD              |
| DebugHUDs                   | HUD Layer           | 101-105    | Various debugging HUDs            |
| HUDSelector                 | HUD Layer           | 106        | HUD control panel                 |
| NavBar                      | Navigation Layer    | 110        | Main navigation                   |
| ScrollDebugOverlay          | Debug Overlay Layer | 120        | Scroll position debugging         |
| ParallaxSpeedDust           | Content Layer       | z-20       | Persistent speed/motion effects (0.25-0.85) |

### 2.2 /home-v5 Page Layer Structure

| Component                   | Layer               | z-index    | Notes                             |
|-----------------------------|---------------------|------------|-----------------------------------|
| CosmicJourneyController     | Base Layer          | 0          | Cosmic background                 |
| ContentLayer                | Content Layer       | 10         | Container for all sections        |
| AtomicSections              | Content Layer       | 15-40      | Individual content sections       |
| AdminPanel                  | UI Control Layer    | 80         | Admin controls for section editing|
| DebugHUDs                   | HUD Layer           | 100-105    | Various debugging HUDs            |
| HUDSelector                 | HUD Layer           | 106        | HUD control panel                 |
| NavBar                      | Navigation Layer    | 110        | Main navigation                   |
| ScrollDebugOverlay          | Debug Overlay Layer | 120        | Scroll position debugging         |

---

## 🔐 3. Layer Management Rules

### 3.1 Element Containment Rules

1. **Base Layer Elements**
   - Must be contained within fixed position elements
   - Must support proper stacking with semi-transparent elements above
   - Must not capture pointer events intended for higher layers
   - Must provide renderless layout options for performance critical scenes
   - Must use optimized canvas container for all canvas elements
   - Must integrate with master animation loop
   - Must implement frame timing diagnostics

2. **Content Layer Elements**
   - Must be organized within the ContentLayer component
   - Must respect section hierarchy and relative positions
   - Must not have z-index conflicts within their section groups
   - Must remain navigable and accessible even when HUDs are active
   - Must use centralized scroll pipeline for animations
   - Must implement proper cleanup for performance monitoring

3. **UI Control Layer Elements**
   - Must use consistent z-index values for similar controls
   - Must properly handle focus states and keyboard navigation
   - Must respect the UI control hierarchy
   - Must not interfere with navigation elements
   - Must integrate with performance monitoring system

4. **HUD Layer Elements**
   - Must be managed exclusively by HUDManager
   - Must be implemented using the DraggableHUD base component
   - Must respect position persistence and layout rules
   - Must automatically adjust for viewport constraints
   - Must not block critical navigation elements
   - Must include performance monitoring HUDs when in development
   - Must respect frame timing thresholds

5. **Navigation Layer Elements**
   - Must always remain accessible and visible
   - Must use proper stacking to ensure they appear above other elements
   - Must handle focus management appropriately
   - Must remain functional regardless of scroll position
   - Must not impact scroll performance

6. **Debug Overlay Layer Elements**
   - Must be clearly visible above all other elements
   - Must provide methods to temporarily hide them if needed
   - Must not interfere with application functionality even when visible
   - Must include frame timing diagnostics
   - Must show performance metrics when enabled

### 3.2 Controller Responsibilities

1. **SceneController**
   - Manages all Base Layer elements
   - Controls 3D scene rendering and optimization
   - Handles camera and view perspectives
   - Implements master animation loop
   - Monitors frame timing and performance
   - Manages canvas optimization

2. **ContentLayer & SectionRegistry**
   - Manages all Content Layer elements
   - Controls section positioning and visibility
   - Handles section loading and unloading
   - Integrates with ScrollPipeline
   - Monitors scroll performance impact

3. **UIController**
   - Manages all UI Control Layer elements
   - Handles interactive element state
   - Controls form validation and submission

4. **HUDManager**
   - Manages all HUD Layer elements
   - Controls HUD visibility and positioning
   - Handles HUD state persistence

5. **NavController**
   - Manages all Navigation Layer elements
   - Controls routing and navigation state
   - Handles navigation animations and transitions

6. **SystemDebugController**
   - Manages all Debug Overlay Layer elements
   - Controls diagnostic tool visibility
   - Handles system-wide debug state

---

## 📌 4. Implementation References

### 4.1 Key Component Paths

```
Base Layer:
- src/components/journey/CosmicJourneyController.jsx
- src/components/particles/GlobalParticleSystem.jsx

Content Layer:
- src/components/layouts/ContentLayer.jsx
- src/config/SectionRegistry.js

UI Control Layer:
- src/components/layouts/AdminPanel.jsx
- src/components/ui/[various ui components]

HUD Layer:
- src/components/cosmic-explorer/core/HUDManager.jsx
- src/components/cosmic-explorer/core/HUDSelector.jsx
- src/components/cosmic-explorer/huds/[all HUD components]

Navigation Layer:
- src/components/NavBar.jsx
- src/components/nav/[navigation components]

Debug Overlay Layer:
- src/components/ui/ScrollDebugOverlay.jsx
```

### 4.2 CSS Implementation

All z-index values should be implemented using Tailwind classes:

```jsx
// Base Layer
<div className="z-0"> {/* Cosmic background */} </div>
<div className="z-5"> {/* Particle effects */} </div>

// Content Layer
<div className="z-10"> {/* Content container */} </div>
<div className="z-20"> {/* Content sections */} </div>

// UI Control Layer
<div className="z-60"> {/* UI controls */} </div>

// HUD Layer
<div className="z-100"> {/* HUDs */} </div>

// Navigation Layer
<div className="z-110"> {/* NavBar */} </div>

// Debug Overlay Layer
<div className="z-120"> {/* Debug overlays */} </div>
```

---

## ✅ 5. Layer Compliance Verification

| Area                       | Status    | Verification Method                    |
|----------------------------|-----------|---------------------------------------|
| Base Layer Elements        | 🟢 VERIFIED | Visual inspection, z-index audit     |
| Content Layer Elements     | 🟢 VERIFIED | Section position testing, z-index review |
| UI Control Layer Elements  | 🟢 VERIFIED | Interactive testing, focus management |
| HUD Layer Elements         | 🟢 VERIFIED | HUD position testing, z-index review |
| Navigation Layer Elements  | 🟢 VERIFIED | Navigation testing across viewport sizes |
| Debug Overlay Layer        | 🟢 VERIFIED | Visibility testing over all elements |

### 5.1 Known Issues and Resolutions

| Issue ID | Description | Status | Resolution |
|----------|------------|--------|------------|
| LAYER-001 | HUD z-index conflicts in /home-v5 | 🟢 RESOLVED | Increased ScrollDebugOverlay z-index to 120 |
| LAYER-002 | Content sections appearing above UI controls | 🟢 RESOLVED | Standardized ContentLayer z-index values |
| LAYER-003 | NavBar occasionally covered by HUDs | 🟢 RESOLVED | Set fixed z-index of 110 for NavBar |

---

## 🔄 6. Change Management

1. **Layer Structure Changes**
   - Must be approved by system architect
   - Must be documented in this contract
   - Must be tested across all affected pages
   - Must include backward compatibility considerations

2. **Z-index Range Modifications**
   - Must maintain clear separation between layers
   - Must be documented with rationale
   - Must update all affected components
   - Must verify no new conflicts are introduced

3. **Component Layer Reassignment**
   - Must document previous and new layer assignment
   - Must update component z-index values
   - Must verify proper rendering in new layer
   - Must test interactions with components in adjacent layers

---

## 🔐 Certification

This contract is now LEGIT certified and considered the canonical reference for layer management across the CuriousLabs platform.

Last updated: [Current Date]
Verified by: CuriousLabs System Architecture Team 