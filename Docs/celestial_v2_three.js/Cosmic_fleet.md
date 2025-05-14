

# Planet Fleet Implementation Plan

Based on the `TILE-COSMIC.4K-FLEET` mission document, I'll create a comprehensive plan to implement high-resolution 3D planets with a unified selector interface. Here's my execution plan:

## 1. Overview

I'll create 5 new planet sphere components using Three.js and React Three Fiber, along with a new planet sandbox page with a selector HUD. This will allow for easy visualization and comparison of all celestial bodies with high-resolution 4K textures.

## 2. Components to Create

### Planet Sphere Components
1. **JupiterSphere.jsx** - Gas giant with surface texture
2. **PlutoSphere.jsx** - Dwarf planet with surface and bump maps
3. **SaturnSphere.jsx** - Gas giant with rings
4. **UranusSphere.jsx** - Ice giant with faint rings
5. **VenusSphere.jsx** - Rocky planet with surface and bump maps

### Additional Components
1. **PlanetSelectorHUD.jsx** - Floating HUD for selecting planets
2. **planet-sandbox.jsx** - New route page for testing all planets

## 3. Implementation Details

### Planet Sphere Components
Each component will follow the MarsSphere pattern:
- Use `useLoader` from `@react-three/fiber` to load textures
- Apply proper material properties
- Include LEGIT metadata blocks
- Handle special cases like rings for Saturn and Uranus

### PlanetSelectorHUD Component
- Create a floating panel with dropdown selector
- Pass planet selection state to parent component
- Include lighting controls similar to MarsLightBoardHUD

### Planet Sandbox Page
- Create a new route at `/dev/planet-sandbox`
- Include Canvas with preserveDrawingBuffer for screenshots
- Dynamically render the selected planet
- Reuse lighting system from Mars test page

## 4. Technical Approach

### For Basic Planets (Jupiter, Venus, Pluto)
```jsx
function PlanetSphere({ position = [0, 0, 0], radius = 1 }) {
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/[planet]map_4k.jpg');
  const bumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/[planet]bump_4k.jpg');

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={surfaceMap}
        bumpMap={bumpMap}
        bumpScale={0.03}
      />
    </mesh>
  );
}
```

### For Ringed Planets (Saturn, Uranus)
```jsx
function RingedPlanetSphere({ position = [0, 0, 0], radius = 1 }) {
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/[planet]map_4k.jpg');
  const ringMap = useLoader(TextureLoader, '/assets/images/planets/4k/[planet]ringcolor.jpg');

  return (
    <group position={position}>
      {/* Planet sphere */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={surfaceMap} />
      </mesh>
      
      {/* Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 1.4, radius * 2.2, 64]} />
        <meshStandardMaterial 
          map={ringMap}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}
```

### Planet Selector Implementation
```jsx
const [selectedPlanet, setSelectedPlanet] = useState('mars');

const planetComponents = {
  mars: <MarsSphere />,
  jupiter: <JupiterSphere />,
  pluto: <PlutoSphere />,
  saturn: <SaturnSphere />,
  uranus: <UranusSphere />,
  venus: <VenusSphere />
};

// In render:
{planetComponents[selectedPlanet]}
```

## 5. Step-by-Step Implementation Plan

### Step 1: Create Planet Components
1. Create JupiterSphere.jsx component
2. Create PlutoSphere.jsx component
3. Create SaturnSphere.jsx component with ring
4. Create UranusSphere.jsx component with ring
5. Create VenusSphere.jsx component

### Step 2: Create PlanetSelectorHUD
1. Create PlanetSelectorHUD.jsx component
2. Implement planet selection dropdown
3. Add optional lighting controls

### Step 3: Create Planet Sandbox Page
1. Create planet-sandbox.jsx page
2. Set up Canvas with proper lighting
3. Implement planet selection state
4. Mount PlanetSelectorHUD
5. Add debug panel and controls

### Step 4: Testing and Validation
1. Test each planet component individually
2. Verify texture loading and rendering
3. Test planet switching functionality
4. Validate screenshot capability

## 6. Detailed Component Specifications

### JupiterSphere.jsx
- Surface texture: `/assets/images/planets/4k/jupiter2_4k.jpg`
- No bump map
- Add subtle rotation animation

### PlutoSphere.jsx
- Surface texture: `/assets/images/planets/4k/plutomap2k.jpg`
- Bump map: `/assets/images/planets/4k/plutobump2k.jpg`
- Slower rotation speed

### SaturnSphere.jsx
- Surface texture: `/assets/images/planets/4k/saturnmap_LE_upscale_balanced_x4.jpg`
- Ring textures:
  - `/assets/images/planets/4k/saturnringcolor.jpg`
  - Optional: `/assets/images/planets/4k/saturnringpattern.gif`
- Implement as separate geometries

### UranusSphere.jsx
- Surface texture: `/assets/images/planets/4k/uranusmap_LE_upscale_balanced_x4.jpg`
- Ring texture: `/assets/images/planets/4k/uranusringcolour_LE_upscale_balanced_x4.jpg`
- Implement tilted axis (97° tilt)

### VenusSphere.jsx
- Surface texture: `/assets/images/planets/4k/venusmap_LE_upscale_balanced_x4.jpg`
- Bump map: `/assets/images/planets/4k/venusbump_LE_upscale_balanced_x4.jpg`
- Add atmospheric glow effect

## 7. Completion Criteria

- ✅ All 5 new planet components created and working
- ✅ Each component properly loads and applies textures
- ✅ Ringed planets correctly display ring geometries
- ✅ PlanetSelectorHUD allows switching between planets
- ✅ Planet sandbox page correctly renders all planets
- ✅ Screenshots work via preserveDrawingBuffer
- ✅ All components have proper LEGIT metadata

This implementation will provide a comprehensive showcase of all celestial bodies with high-resolution textures and proper 3D rendering.


=======================================================================================================================



// 🧱 TILE-COSMIC.4K-FLEET — Execution Plan for Cursor
// Mission: Import and deploy 4K-upscaled textures for all major celestial bodies
// Route: /dev/planet-sandbox
// HUD: PlanetSelectorHUD.jsx

/**
 * PLANET TEXTURE MAP
 * Each entry defines surface texture, bump map (optional), and ring maps (optional)
 */
const planetTextures = {
  jupiter: {
    surface: '/assets/images/planets/4k/jupiter2_4k.jpg',
    bump: null,
    rings: null
  },
  pluto: {
    surface: '/assets/images/planets/4k/plutomap2k.jpg',
    bump: '/assets/images/planets/4k/plutobump2k.jpg',
    rings: null
  },
  saturn: {
    surface: '/assets/images/planets/4k/saturnmap_LE_upscale_balanced_x4.jpg',
    bump: null,
    rings: [
      '/assets/images/planets/4k/saturnringcolor.jpg',
      '/assets/images/planets/4k/saturnringpattern.gif' // Optional alpha effect
    ]
  },
  uranus: {
    surface: '/assets/images/planets/4k/uranusmap_LE_upscale_balanced_x4.jpg',
    bump: null,
    rings: ['/assets/images/planets/4k/uranusringcolour_LE_upscale_balanced_x4.jpg']
  },
  venus: {
    surface: '/assets/images/planets/4k/venusmap_LE_upscale_balanced_x4.jpg',
    bump: '/assets/images/planets/4k/venusbump_LE_upscale_balanced_x4.jpg',
    rings: null
  }
};

/**
 * TASKS
 */
// 1. Create new components in /bodies:
//    - JupiterSphere.jsx
//    - PlutoSphere.jsx
//    - SaturnSphere.jsx (with ring mesh)
//    - UranusSphere.jsx (with faint ring)
//    - VenusSphere.jsx
//    Use MarsSphere as template. Inject LEGIT metadata.

// 2. Create new route: /dev/planet-sandbox
//    - Uses <Canvas> with preserveDrawingBuffer: true
//    - Mounts current <Planet /> based on selector
//    - Imports all sphere components

// 3. Create PlanetSelectorHUD.jsx in /hud
//    - Floating panel with planet dropdown
//    - Updates active planet via state

// 4. Connect HUD → test route
//    - Provide live dropdown for planet control
//    - Optional: add preset lighting buttons

// 5. Test each component
//    - Check texture load + bump map (if any)
//    - Check rings appear + fade with lighting (if any)
//    - Check screenshot safety

// 6. Document in LEGIT_contract_planetTextureMap.md

export default planetTextures;


🧠 **Understood, Commander — we’re now entering full-scale celestial deployment.**
You’ve delivered a full **fleet of upgraded planetary textures** — let’s break this down into an elite, repeatable expansion mission.

---

## 🚀 MISSION BRIEF: `TILE-COSMIC.4K-FLEET`

> **Objective:** Upgrade and render Jupiter, Pluto, Saturn, Uranus, and Venus with new ultra-HD assets — and mount them all on a **single selector-enabled HUD test page**.

---

### 📁 Assets Received

| Planet  | Surface                 | Bump                    | Ring(s)                                          |
| ------- | ----------------------- | ----------------------- | ------------------------------------------------ |
| Jupiter | ✅ `jupiter2_4k.jpg`     | ❌                       | —                                                |
| Pluto   | ✅ `plutomap2k.jpg`      | ✅ `plutobump2k.jpg`     | —                                                |
| Saturn  | ✅ `saturnmap_LE_4x.jpg` | ❌                       | ✅ `saturnringcolor.jpg`, `saturnringpattern.gif` |
| Uranus  | ✅ `uranusmap_LE_4x.jpg` | ❌                       | ✅ `uranusringcolour_LE_4x.jpg`                   |
| Venus   | ✅ `venusmap_LE_4x.jpg`  | ✅ `venusbump_LE_4x.jpg` | —                                                |

---

## 🧱 TASK STRUCTURE

### ✅ 1. COMPONENT FILES

Each planet gets its own reusable component in:

```
src/components/journey/celestial/bodies/
- JupiterSphere.jsx
- PlutoSphere.jsx
- SaturnSphere.jsx
- UranusSphere.jsx
- VenusSphere.jsx
```

Each follows the MarsSphere pattern using `@react-three/fiber` and `useLoader`.

---

### ✅ 2. NEW PAGE: `/dev/planet-sandbox`

Create a new route:

```
src/pages/dev/planet-sandbox.jsx
```

This page includes:

* Canvas with lighting (reuse Mars lighting rig)
* HUD Selector panel with dropdown or tabs to choose planet
* Dynamic import + mount of selected planet component

Example state logic:

```js
const [planet, setPlanet] = useState('mars');

const planetMap = {
  mars: <MarsSphere />,
  jupiter: <JupiterSphere />,
  pluto: <PlutoSphere />,
  saturn: <SaturnSphere />,
  uranus: <UranusSphere />,
  venus: <VenusSphere />
};
```

---

### ✅ 3. HUD: `PlanetSelectorHUD.jsx`

Create:

```bash
src/components/hud/PlanetSelectorHUD.jsx
```

Simple UI with:

* Dropdown menu or toggle buttons for planet
* Scene + lighting preset hooks (if needed later)

---

### ✅ 4. LEGIT COMPLIANCE

Each Sphere component must include:

```js
export const metadata = {
  id: 'venus_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};
```

---

### ✅ 5. Fallbacks for Missing Data

* **No bump map?** Omit bumpMap line
* **Ring planets?** Mount ring geometry in same component, use texture
* **GIF ring texture (Saturn)?** Can use `texture.repeat` with alpha or convert to PNG for cleaner load

---

## 🎛️ Completion Criteria

| Objective                                   | Status             |
| ------------------------------------------- | ------------------ |
| 6 HD planet components                      | ⏳                  |
| Unified test page with selector HUD         | ⏳                  |
| LEGIT metadata blocks                       | ⏳                  |
| Scene renders all planets cleanly           | ⏳                  |
| Light rig compatible                        | ⏳                  |
| Screenshot-safe via `preserveDrawingBuffer` | ✅ Reuse Mars setup |

---

