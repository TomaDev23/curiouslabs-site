# ✅ CuriousLabs LEGIT Contract — Planet Sandbox

📍 Location: `Docs/contracts/Solar_System/contract_planet_sandbox.md`  
🧱 Schema Purpose: Define the structure, behavior, and requirements for the Planet Sandbox page and its components.
🔐 LEGIT: **CERTIFIED**
📆 Last Updated: [Current Date]

---

## 🧩 1. Component Overview

The Planet Sandbox is a comprehensive 3D visualization system for exploring celestial bodies with two primary viewing modes:

1. **Single Planet View**: Detailed examination of individual planets with interactive controls
2. **Solar System View**: A comprehensive view of all planets with Earth at the center

This contract defines the structure, behavior, and requirements for the Planet Sandbox page and its components.

---

## 🔐 2. Core Components

### 2.1 PlanetSandboxPage

**ID**: `planet_sandbox_page`  
**SCS**: `SCS-PAGE-INTERACTIVE`  
**Type**: `page`  
**Path**: `src/pages/dev/planet-sandbox.jsx`

**Required State**:
- `viewMode`: String ('single' or 'solar-system')
- `selectedPlanet`: String (planet identifier)
- `zoomTarget`: String (planet identifier or 'none')
- `ambientIntensity`: Number (0.0 to 1.0)
- `sunIntensity`: Number (0.0 to 2.0)
- `sunColor`: String (hex color)
- `orbitEnabled`: Boolean
- `autoRotate`: Boolean
- `showInfo`: Boolean

**Required Subcomponents**:
- Canvas with Three.js scene
- Planet sphere components
- SolarSystem component
- PlanetSelectorHUD
- Control panels
- Information panels

### 2.2 Planet Sphere Components

**Base ID**: `[planet]_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/[Planet]Sphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number
- `rotation`: Array [x, y, z]

**Required Features**:
- Texture loading with useLoader
- Rotation animation via useFrame
- Proper material properties
- LEGIT metadata

### 2.3 SolarSystem Component

**ID**: `solar_system_3d`  
**SCS**: `SCS-SYSTEM-COMPOSITE`  
**Type**: `three-group`

**Required Features**:
- Positioning of all planets in 3D space
- Camera movement between planets
- Planet selection via click events
- Moon orbit animation

### 2.4 PlanetSelectorHUD

**ID**: `planet_selector_hud`  
**SCS**: `SCS-HUD-CONTROL`  
**Type**: `hud`  
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

---

## 🧪 3. Technical Requirements

### 3.1 Rendering System

- Canvas must use `preserveDrawingBuffer: true` for screenshot capability
- Default camera position at `[0, 0, 3]` with 50° field of view
- Conditional rendering based on view mode

### 3.2 Lighting System

- Ambient light with adjustable intensity (default: 0.3)
- Directional light with adjustable intensity (default: 1.0) and color
- Light positioned at `[10, 10, 10]` to create realistic shadows

### 3.3 Camera Control Systems

- Single Planet View: OrbitControls for free movement
- Solar System View: Automatic camera movement between planets
- Smooth transitions using Vector3.lerp

### 3.4 Animation Systems

- Planet rotations: Each planet has its own rotation speed
- Moon orbit: 0.002 rad/frame around Earth
- Star field animation: 0.0001 rad/frame on X and Y axes

---

## 📦 4. Asset Requirements

All planets must use high-resolution 4K textures:

| Planet  | Surface Texture | Bump Map | Additional Maps |
|---------|----------------|----------|-----------------|
| Earth   | earthmap1k_LE_upscale_balanced_x4.jpg | earthbump1k_LE_upscale_balanced_x4.jpg | earthcloudmap_LE_upscale_balanced_x4.jpg |
| Moon    | moonmap2k.jpg | moonbump2k.jpg | - |
| Mars    | mars_surface_4k.jpg | mars_bump_4k.jpg | - |
| Venus   | venusmap_LE_upscale_balanced_x4.jpg | venusbump_LE_upscale_balanced_x4.jpg | - |
| Jupiter | jupiter2_4k.jpg | - | - |
| Saturn  | saturnmap_LE_upscale_balanced_x4.jpg | - | saturnringcolor.jpg |
| Uranus  | uranusmap_LE_upscale_balanced_x4.jpg | - | uranusringcolour_LE_upscale_balanced_x4.jpg |
| Pluto   | plutomap2k.jpg | plutobump2k.jpg | - |

---

## 🔄 5. Interaction Requirements

### 5.1 Single Planet View

- Selector dropdown to change planets
- Orbit controls to explore the planet
- Toggle for auto-rotation
- Lighting parameter adjustment via HUD

### 5.2 Solar System View

- Overview showing all planets with Earth at center
- Click any planet or use selector buttons to focus
- Information panel showing details of selected planet

### 5.3 Screenshot Capability

- "Take Screenshot" button downloads image
- Appropriate filename based on current view
- Works in both view modes

---

## 🧭 6. UI Components

### 6.1 Control Panel

- Located at top-left
- View mode toggle buttons
- Orbit controls toggle
- Auto-rotation toggle
- Info panel toggle
- Screenshot button

### 6.2 Planet Selector HUD

- Located at top-right in single view mode
- Dropdown for planet selection
- Sliders for ambient light intensity
- Sliders for sun light intensity
- Color picker for sun light

### 6.3 Zoom Target Selector

- Located at bottom-center in solar system view
- Buttons for each planet and overview
- Highlights currently selected planet

### 6.4 Information Panels

- Single view: Bottom-left
- Solar system view: Bottom-right (when planet selected)
- Shows planet name, diameter, and features

---

## 🔒 7. LEGIT Compliance Requirements

All components must:

- Include proper metadata blocks with id, scs tag, type, and doc reference
- Follow consistent naming conventions
- Have well-structured props with defaults
- Implement proper error handling
- Include documentation references

---

## 🧠 8. Governance

This contract is governed by the CuriousLabs LEGIT Protocol v1.0. All components, routes, and UI blocks must comply with the requirements specified in this contract.

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.PLANET-SANDBOX.v1` 