# ✅ CuriousLabs LEGIT Contract — Planet Sandbox UI Components

📍 Location: `Docs/contracts/Solar_System/contract_ui_components.md`  
🧱 Schema Purpose: Define the structure, behavior, and requirements for UI components used in the Planet Sandbox.
🔐 LEGIT: **CERTIFIED**
📆 Last Updated: [Current Date]

---

## 🧩 1. Component Overview

This contract defines the specific requirements for UI components in the Planet Sandbox. These components provide user interaction capabilities and information display for the 3D planet visualization system.

---

## 🔐 2. Core UI Component Requirements

All UI components must implement:

- Responsive design that works across device sizes
- Consistent styling with the overall application theme
- Accessibility features including keyboard navigation
- Clear visual feedback for interactive elements
- LEGIT metadata

---

## 🎮 3. Control Panel Component

**ID**: `planet_sandbox_control_panel`  
**SCS**: `SCS-UI-CONTROL-PANEL`  
**Type**: `ui-panel`  
**Path**: `src/components/ui/PlanetSandboxControls.jsx`

**Required Props**:
- `viewMode`: String ('single' or 'solar-system')
- `setViewMode`: Function
- `orbitEnabled`: Boolean
- `setOrbitEnabled`: Function
- `autoRotate`: Boolean
- `setAutoRotate`: Function
- `showInfo`: Boolean
- `setShowInfo`: Function
- `takeScreenshot`: Function

**Required Features**:
- View mode toggle buttons (Single/Solar System)
- Orbit controls toggle
- Auto-rotation toggle
- Info panel toggle
- Screenshot button

**Styling Requirements**:
- Position: Top-left corner
- Semi-transparent background
- Compact button layout
- Hover effects for buttons
- Active state indicators

**Accessibility**:
- ARIA labels for all controls
- Keyboard navigation support
- High contrast mode support

---

## 🌐 4. Planet Selector HUD Component

**ID**: `planet_selector_hud`  
**SCS**: `SCS-UI-SELECTOR-HUD`  
**Type**: `ui-selector`  
**Path**: `src/components/hud/PlanetSelectorHUD.jsx`

**Required Props**:
- `selectedPlanet`: String
- `setSelectedPlanet`: Function
- `ambientIntensity`: Number
- `setAmbientIntensity`: Function
- `sunIntensity`: Number
- `setSunIntensity`: Function
- `sunColor`: String
- `setSunColor`: Function
- `viewMode`: String

**Required Features**:
- Dropdown for planet selection
- Sliders for ambient light intensity
- Sliders for sun light intensity
- Color picker for sun light
- Conditional rendering based on view mode

**Styling Requirements**:
- Position: Top-right corner in single view mode
- Semi-transparent background
- Collapsible panel
- Labeled sliders with value display
- Color picker with preview

**Conditional Behavior**:
- Only visible in single planet view mode
- Collapsed by default on mobile devices

---

## 🔍 5. Zoom Target Selector Component

**ID**: `zoom_target_selector`  
**SCS**: `SCS-UI-ZOOM-SELECTOR`  
**Type**: `ui-buttons`  
**Path**: `src/components/ui/ZoomTargetSelector.jsx`

**Required Props**:
- `zoomTarget`: String
- `setZoomTarget`: Function
- `planetOptions`: Array of Objects
- `viewMode`: String

**Required Features**:
- Buttons for each planet and overview
- Highlights currently selected planet
- Conditional rendering based on view mode

**Styling Requirements**:
- Position: Bottom-center in solar system view
- Horizontal row of buttons
- Highlight effect for selected planet
- Planet icons or symbols
- Responsive layout that adjusts for screen size

**Conditional Behavior**:
- Only visible in solar system view mode
- Scrollable on smaller screens

---

## 📋 6. Information Panel Component

**ID**: `planet_info_panel`  
**SCS**: `SCS-UI-INFO-PANEL`  
**Type**: `ui-panel`  
**Path**: `src/components/ui/PlanetInfoPanel.jsx`

**Required Props**:
- `selectedPlanet`: String
- `planetData`: Object
- `showInfo`: Boolean
- `viewMode`: String

**Required Features**:
- Planet name and title
- Physical characteristics (diameter, mass)
- Interesting facts section
- Close button
- Conditional positioning based on view mode

**Styling Requirements**:
- Single view: Bottom-left
- Solar system view: Bottom-right (when planet selected)
- Semi-transparent background
- Scrollable content area
- Responsive width

**Content Requirements**:
- Accurate scientific data for each planet
- Consistent formatting across all planets
- At least 3 interesting facts per planet

---

## 📸 7. Screenshot Component

**ID**: `screenshot_component`  
**SCS**: `SCS-UI-SCREENSHOT`  
**Type**: `ui-utility`  
**Path**: `src/components/ui/ScreenshotUtil.jsx`

**Required Props**:
- `canvasRef`: Ref to Three.js canvas

**Required Features**:
- Function to capture current canvas state
- Generate appropriate filename based on view and planet
- Download image as PNG
- Success notification

**Technical Requirements**:
- Use html2canvas or similar library
- Maintain original canvas resolution
- Handle both view modes
- Proper error handling with user feedback

---

## 🎚️ 8. Lighting Controls Component

**ID**: `lighting_controls`  
**SCS**: `SCS-UI-LIGHTING-CONTROLS`  
**Type**: `ui-controls`  
**Path**: `src/components/ui/LightingControls.jsx`

**Required Props**:
- `ambientIntensity`: Number
- `setAmbientIntensity`: Function
- `sunIntensity`: Number
- `setSunIntensity`: Function
- `sunColor`: String
- `setSunColor`: Function

**Required Features**:
- Sliders for ambient light intensity (0.0 to 1.0)
- Sliders for sun light intensity (0.0 to 2.0)
- Color picker for sun light
- Reset to defaults button

**Styling Requirements**:
- Labeled sliders with value display
- Color picker with preview
- Compact layout
- Consistent with other UI components

---

## 🔄 9. Loading Indicator Component

**ID**: `planet_loading_indicator`  
**SCS**: `SCS-UI-LOADING`  
**Type**: `ui-feedback`  
**Path**: `src/components/ui/PlanetLoadingIndicator.jsx`

**Required Props**:
- `isLoading`: Boolean

**Required Features**:
- Animated loading spinner
- Loading status text
- Fade in/out transitions

**Styling Requirements**:
- Centered on screen
- Semi-transparent background overlay
- Consistent with application theme
- Responsive sizing

---

## 🚨 10. Error Boundary Component

**ID**: `planet_error_boundary`  
**SCS**: `SCS-UI-ERROR-BOUNDARY`  
**Type**: `ui-utility`  
**Path**: `src/components/ui/PlanetErrorBoundary.jsx`

**Required Features**:
- Catch and display rendering errors
- Fallback UI with error details
- Retry button
- Error logging

**Styling Requirements**:
- Clear error message
- Visually distinct from normal UI
- Non-blocking when possible

---

## 🔒 11. LEGIT Compliance Requirements

All UI components must:

- Include proper metadata blocks with id, scs tag, type, and doc reference
- Follow consistent naming conventions
- Have well-structured props with defaults
- Implement proper error handling
- Include documentation references to this contract
- Follow accessibility guidelines (WCAG 2.1 AA)

---

## 🧠 12. Governance

This contract is governed by the CuriousLabs LEGIT Protocol v1.0 and is a subcontract of the main Planet Sandbox contract. All UI components must comply with the requirements specified in this contract.

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.PLANET-UI-COMPONENTS.v1` 