# ✅ CuriousLabs LEGIT Contract — Planet Components

📍 Location: `Docs/contracts/Solar_System/contract_planet_components.md`  
🧱 Schema Purpose: Define the structure, behavior, and requirements for individual planet components used in the Planet Sandbox.
🔐 LEGIT: **CERTIFIED**
📆 Last Updated: [Current Date]

---

## 🧩 1. Component Overview

This contract defines the specific requirements for each planet component in the Planet Sandbox. Each planet component must follow these specifications while maintaining its unique characteristics.

---

## 🔐 2. Base Planet Component Requirements

All planet components must implement:

- Three.js mesh with appropriate geometry
- Texture loading with useLoader
- Rotation animation via useFrame
- Proper material properties with specular and shininess
- Click event handling for selection
- LEGIT metadata

---

## 🌍 3. Earth Component

**ID**: `earth_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-EARTH`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/EarthSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 1)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: `earthmap1k_LE_upscale_balanced_x4.jpg`
- Bump map: `earthbump1k_LE_upscale_balanced_x4.jpg`
- Cloud layer: `earthcloudmap_LE_upscale_balanced_x4.jpg`
- Rotation speed: 0.001 rad/frame
- Cloud layer rotation: 0.0005 rad/frame

**Material Properties**:
- Surface: MeshPhongMaterial with bumpScale: 0.05
- Clouds: MeshStandardMaterial with transparent: true, opacity: 0.4

---

## 🌕 4. Moon Component

**ID**: `moon_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-MOON`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/MoonSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 0.27)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: `moonmap2k.jpg`
- Bump map: `moonbump2k.jpg`
- Rotation speed: 0.0005 rad/frame
- Orbit around Earth: 0.002 rad/frame at distance of 2 units

**Material Properties**:
- MeshPhongMaterial with bumpScale: 0.02
- Lower shininess: 5

---

## 🔴 5. Mars Component

**ID**: `mars_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-MARS`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/MarsSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 0.53)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: `mars_surface_4k.jpg`
- Bump map: `mars_bump_4k.jpg`
- Rotation speed: 0.0009 rad/frame

**Material Properties**:
- MeshPhongMaterial with bumpScale: 0.1
- Higher specular intensity for polar ice caps

---

## 💛 6. Venus Component

**ID**: `venus_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-VENUS`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/VenusSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 0.95)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: `venusmap_LE_upscale_balanced_x4.jpg`
- Bump map: `venusbump_LE_upscale_balanced_x4.jpg`
- Rotation speed: 0.0003 rad/frame (slower than Earth)

**Material Properties**:
- MeshPhongMaterial with bumpScale: 0.05
- Higher shininess: 30
- Slight yellow tint to atmosphere

---

## 🟠 7. Jupiter Component

**ID**: `jupiter_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-JUPITER`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/JupiterSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 11.2)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: `jupiter2_4k.jpg`
- Rotation speed: 0.002 rad/frame (faster than Earth)
- Great Red Spot highlight

**Material Properties**:
- MeshStandardMaterial with roughness: 1.0, metalness: 0.0
- No bump map required due to visible cloud patterns

---

## 🪐 8. Saturn Component

**ID**: `saturn_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-SATURN`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/SaturnSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 9.45)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: `saturnmap_LE_upscale_balanced_x4.jpg`
- Ring texture: `saturnringcolor.jpg`
- Rotation speed: 0.0018 rad/frame (faster than Earth)
- Ring system: Flat disc geometry with transparency

**Material Properties**:
- Planet: MeshStandardMaterial with roughness: 1.0, metalness: 0.0
- Rings: MeshStandardMaterial with transparent: true, opacity: 0.9, side: DoubleSide

---

## 🔵 9. Uranus Component

**ID**: `uranus_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-URANUS`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/UranusSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 4.0)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: `uranusmap_LE_upscale_balanced_x4.jpg`
- Ring texture: `uranusringcolour_LE_upscale_balanced_x4.jpg`
- Rotation speed: 0.001 rad/frame
- Ring system: White-bluish with cosmic dust particles
- Axial tilt: 97.77 degrees

**Material Properties**:
- Planet: MeshStandardMaterial with roughness: 0.8, metalness: 0.2
- Rings: MeshStandardMaterial with transparent: true, opacity: 0.7, side: DoubleSide

---

## 🔷 10. Neptune Component

**ID**: `neptune_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-NEPTUNE`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/NeptuneSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 3.88)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: Custom blue gradient with cloud patterns
- Rotation speed: 0.0011 rad/frame
- Dark side with shadow effect
- Thin ring of dusty material

**Material Properties**:
- MeshPhongMaterial with custom shader for cloud movement
- Emissive blue glow for atmosphere

---

## ⚪ 11. Pluto Component (Optional)

**ID**: `pluto_sphere_3d`  
**SCS**: `SCS-BODY-SPHERE-PLUTO`  
**Type**: `three-mesh`  
**Path**: `src/components/journey/celestial/bodies/PlutoSphere.jsx`

**Required Props**:
- `position`: Array [x, y, z]
- `radius`: Number (default: 0.18)
- `rotation`: Array [x, y, z]

**Specific Features**:
- Surface texture: `plutomap2k.jpg`
- Bump map: `plutobump2k.jpg`
- Rotation speed: 0.0002 rad/frame (very slow)

**Material Properties**:
- MeshPhongMaterial with bumpScale: 0.02
- Low shininess: 2

---

## ✨ 12. Stars Component

**ID**: `stars_field_3d`  
**SCS**: `SCS-ENVIRONMENT-STARS`  
**Type**: `three-points`  
**Path**: `src/components/journey/celestial/environment/Stars.jsx`

**Required Props**:
- `count`: Number (default: 5000)
- `radius`: Number (default: 100)

**Specific Features**:
- Random distribution of points within sphere
- Slow rotation on X and Y axes (0.0001 rad/frame)
- Varying star sizes (0.1 to 0.5)

**Material Properties**:
- PointsMaterial with size attenuation
- White color with slight blue tint
- Vertex colors for varying star brightness

---

## 🔒 13. LEGIT Compliance Requirements

All planet components must:

- Include proper metadata blocks with id, scs tag, type, and doc reference
- Follow consistent naming conventions
- Have well-structured props with defaults
- Implement proper error handling
- Include documentation references to this contract

---

## 🧠 14. Governance

This contract is governed by the CuriousLabs LEGIT Protocol v1.0 and is a subcontract of the main Planet Sandbox contract. All components must comply with the requirements specified in this contract.

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.PLANET-COMPONENTS.v1` 