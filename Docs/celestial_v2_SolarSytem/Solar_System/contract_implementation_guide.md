# 📘 Planet Sandbox Implementation Guide

📍 Location: `Docs/contracts/Solar_System/contract_implementation_guide.md`  
🧱 Purpose: Provide detailed instructions for implementing the Planet Sandbox system according to LEGIT contracts.
📆 Last Updated: [Current Date]

---

## 🚀 1. Introduction

This guide provides step-by-step instructions for implementing the Planet Sandbox system according to the LEGIT contracts. The implementation follows a component-based architecture with Three.js for 3D rendering and React for UI components.

---

## 📋 2. Prerequisites

Before starting implementation, ensure you have:

- Node.js 16+ and npm/yarn installed
- Three.js and React knowledge
- Access to the required texture assets
- Understanding of the LEGIT contract system

Required dependencies:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.152.0",
    "@react-three/fiber": "^8.12.0",
    "@react-three/drei": "^9.65.3"
  }
}
```

---

## 🏗️ 3. Project Structure

Follow this folder structure for the Planet Sandbox implementation:

```
src/
├── pages/
│   └── dev/
│       └── planet-sandbox.jsx       # Main page component
├── components/
│   ├── journey/
│   │   └── celestial/
│   │       ├── bodies/              # Planet components
│   │       │   ├── EarthSphere.jsx
│   │       │   ├── MoonSphere.jsx
│   │       │   └── ...
│   │       └── environment/
│   │           └── Stars.jsx        # Star field component
│   ├── hud/
│   │   └── PlanetSelectorHUD.jsx    # Planet selection UI
│   └── ui/
│       ├── PlanetSandboxControls.jsx # Main controls
│       ├── ZoomTargetSelector.jsx    # Zoom target buttons
│       └── PlanetInfoPanel.jsx       # Information display
├── hooks/
│   └── useScreenshot.js             # Screenshot utility
└── utils/
    └── planetData.js                # Planet information
```

---

## 🧩 4. Implementation Steps

### 4.1. Set Up the Main Page Component

Create `src/pages/dev/planet-sandbox.jsx`:

```jsx
import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PlanetSandboxControls from '../../components/ui/PlanetSandboxControls';
import PlanetSelectorHUD from '../../components/hud/PlanetSelectorHUD';
import SolarSystem from '../../components/journey/celestial/SolarSystem';
import Stars from '../../components/journey/celestial/environment/Stars';
import { planetComponents } from '../../utils/planetData';

/**
 * @id planet_sandbox_page
 * @scs SCS-PAGE-INTERACTIVE
 * @type page
 * @doc Docs/contracts/Solar_System/contract_planet_sandbox.md
 */
const PlanetSandboxPage = () => {
  // State management according to contract
  const [viewMode, setViewMode] = useState('single');
  const [selectedPlanet, setSelectedPlanet] = useState('earth');
  const [zoomTarget, setZoomTarget] = useState('none');
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [sunIntensity, setSunIntensity] = useState(1.0);
  const [sunColor, setSunColor] = useState('#ffffff');
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  
  const canvasRef = useRef();
  const SelectedPlanetComponent = planetComponents[selectedPlanet];
  
  // Screenshot function
  const takeScreenshot = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `planet-sandbox-${viewMode === 'single' ? selectedPlanet : 'solar-system'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  return (
    <div className="planet-sandbox">
      <Canvas 
        ref={canvasRef}
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={sunIntensity} 
          color={sunColor} 
        />
        
        <Suspense fallback={null}>
          <Stars count={5000} radius={100} />
          
          {viewMode === 'single' ? (
            <>
              <SelectedPlanetComponent autoRotate={autoRotate} />
              {orbitEnabled && (
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate={false}
                />
              )}
            </>
          ) : (
            <SolarSystem 
              selectedPlanet={selectedPlanet}
              setSelectedPlanet={setSelectedPlanet}
              zoomTarget={zoomTarget}
              setZoomTarget={setZoomTarget}
            />
          )}
        </Suspense>
      </Canvas>
      
      <PlanetSandboxControls
        viewMode={viewMode}
        setViewMode={setViewMode}
        orbitEnabled={orbitEnabled}
        setOrbitEnabled={setOrbitEnabled}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        takeScreenshot={takeScreenshot}
      />
      
      {viewMode === 'single' && (
        <PlanetSelectorHUD
          selectedPlanet={selectedPlanet}
          setSelectedPlanet={setSelectedPlanet}
          ambientIntensity={ambientIntensity}
          setAmbientIntensity={setAmbientIntensity}
          sunIntensity={sunIntensity}
          setSunIntensity={setSunIntensity}
          sunColor={sunColor}
          setSunColor={setSunColor}
        />
      )}
    </div>
  );
};

export default PlanetSandboxPage;
```

### 4.2. Implement Planet Components

Create a base planet component template:

```jsx
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

/**
 * @id [planet]_sphere_3d
 * @scs SCS-BODY-SPHERE-[PLANET]
 * @type three-mesh
 * @doc Docs/contracts/Solar_System/contract_planet_components.md
 */
const PlanetSphere = ({ position = [0, 0, 0], radius = 1, autoRotate = true }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, '/textures/planets/[planet]map.jpg');
  const bumpMap = useLoader(TextureLoader, '/textures/planets/[planet]bump.jpg');
  
  useFrame(() => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Rotation speed as per contract
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 64, 32]} />
      <meshPhongMaterial 
        map={texture} 
        bumpMap={bumpMap}
        bumpScale={0.05}
        specular={new THREE.Color(0x333333)}
        shininess={15}
      />
    </mesh>
  );
};

export default PlanetSphere;
```

Customize this template for each planet according to the contract specifications.

### 4.3. Implement the Solar System Component

Create `src/components/journey/celestial/SolarSystem.jsx`:

```jsx
import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import EarthSphere from './bodies/EarthSphere';
import MoonSphere from './bodies/MoonSphere';
import MarsSphere from './bodies/MarsSphere';
import VenusSphere from './bodies/VenusSphere';
import JupiterSphere from './bodies/JupiterSphere';
import SaturnSphere from './bodies/SaturnSphere';
import UranusSphere from './bodies/UranusSphere';
import NeptuneSphere from './bodies/NeptuneSphere';

/**
 * @id solar_system_3d
 * @scs SCS-SYSTEM-COMPOSITE
 * @type three-group
 * @doc Docs/contracts/Solar_System/contract_planet_sandbox.md
 */
const SolarSystem = ({ selectedPlanet, setSelectedPlanet, zoomTarget }) => {
  const groupRef = useRef();
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3(0, 0, 15));
  const moonOrbitRef = useRef({ angle: 0 });
  
  // Planet positions according to contract
  const planetPositions = {
    earth: [0, 0, 0],
    moon: [2, 0, 0], // Will be updated in animation
    mars: [5, 0, 5],
    venus: [-4, 0, -2],
    jupiter: [15, 0, 15],
    saturn: [-18, 0, -10],
    uranus: [25, 0, 5],
    neptune: [-20, 0, -20]
  };
  
  // Handle planet selection
  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
  };
  
  // Camera movement
  useEffect(() => {
    if (zoomTarget === 'none') {
      targetPosition.current.set(0, 5, 20);
    } else {
      const pos = planetPositions[zoomTarget];
      targetPosition.current.set(pos[0], pos[1] + 2, pos[2] + 5);
    }
  }, [zoomTarget]);
  
  // Animation loop
  useFrame(() => {
    // Animate moon orbit
    moonOrbitRef.current.angle += 0.002;
    const moonX = Math.cos(moonOrbitRef.current.angle) * 2;
    const moonZ = Math.sin(moonOrbitRef.current.angle) * 2;
    planetPositions.moon = [moonX, 0, moonZ];
    
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <group ref={groupRef}>
      <EarthSphere 
        position={planetPositions.earth} 
        radius={1} 
        onClick={() => handlePlanetClick('earth')}
      />
      <MoonSphere 
        position={planetPositions.moon} 
        radius={0.27} 
        onClick={() => handlePlanetClick('moon')}
      />
      <MarsSphere 
        position={planetPositions.mars} 
        radius={0.53} 
        onClick={() => handlePlanetClick('mars')}
      />
      <VenusSphere 
        position={planetPositions.venus} 
        radius={0.95} 
        onClick={() => handlePlanetClick('venus')}
      />
      <JupiterSphere 
        position={planetPositions.jupiter} 
        radius={11.2} 
        onClick={() => handlePlanetClick('jupiter')}
      />
      <SaturnSphere 
        position={planetPositions.saturn} 
        radius={9.45} 
        onClick={() => handlePlanetClick('saturn')}
      />
      <UranusSphere 
        position={planetPositions.uranus} 
        radius={4.0} 
        onClick={() => handlePlanetClick('uranus')}
      />
      <NeptuneSphere 
        position={planetPositions.neptune} 
        radius={3.88} 
        onClick={() => handlePlanetClick('neptune')}
      />
    </group>
  );
};

export default SolarSystem;
```

### 4.4. Implement UI Components

Create the Planet Selector HUD:

```jsx
import React from 'react';

/**
 * @id planet_selector_hud
 * @scs SCS-UI-SELECTOR-HUD
 * @type ui-selector
 * @doc Docs/contracts/Solar_System/contract_ui_components.md
 */
const PlanetSelectorHUD = ({
  selectedPlanet,
  setSelectedPlanet,
  ambientIntensity,
  setAmbientIntensity,
  sunIntensity,
  setSunIntensity,
  sunColor,
  setSunColor
}) => {
  const planetOptions = [
    { id: 'earth', name: 'Earth' },
    { id: 'moon', name: 'Moon' },
    { id: 'mars', name: 'Mars' },
    { id: 'venus', name: 'Venus' },
    { id: 'jupiter', name: 'Jupiter' },
    { id: 'saturn', name: 'Saturn' },
    { id: 'uranus', name: 'Uranus' },
    { id: 'neptune', name: 'Neptune' }
  ];
  
  return (
    <div className="planet-selector-hud">
      <div className="selector-panel">
        <h3>Planet Selection</h3>
        <select 
          value={selectedPlanet}
          onChange={(e) => setSelectedPlanet(e.target.value)}
          aria-label="Select planet"
        >
          {planetOptions.map(planet => (
            <option key={planet.id} value={planet.id}>
              {planet.name}
            </option>
          ))}
        </select>
        
        <div className="lighting-controls">
          <h4>Lighting</h4>
          
          <div className="control-group">
            <label htmlFor="ambient-light">Ambient Light: {ambientIntensity.toFixed(2)}</label>
            <input
              id="ambient-light"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ambientIntensity}
              onChange={(e) => setAmbientIntensity(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="sun-intensity">Sun Intensity: {sunIntensity.toFixed(2)}</label>
            <input
              id="sun-intensity"
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={sunIntensity}
              onChange={(e) => setSunIntensity(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="sun-color">Sun Color:</label>
            <input
              id="sun-color"
              type="color"
              value={sunColor}
              onChange={(e) => setSunColor(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetSelectorHUD;
```

---

## 🎨 5. Styling Guidelines

Apply these styling principles to maintain consistency:

1. Use a dark theme for UI elements to enhance visibility of planets
2. Semi-transparent panels (rgba(0, 0, 0, 0.7)) for UI components
3. Consistent font family and sizing across all components
4. Highlight active elements with a consistent accent color (#3498db)
5. Ensure all interactive elements have hover and focus states

Example CSS for the Planet Selector HUD:

```css
.planet-selector-hud {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  color: white;
  padding: 15px;
  font-family: 'Arial', sans-serif;
}

.selector-panel h3 {
  margin-top: 0;
  font-size: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 8px;
}

.selector-panel select {
  width: 100%;
  padding: 8px;
  background-color: rgba(30, 30, 30, 0.8);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-bottom: 15px;
}

.control-group {
  margin-bottom: 12px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

.control-group input[type="range"] {
  width: 100%;
  background-color: rgba(30, 30, 30, 0.8);
}

.control-group input[type="color"] {
  width: 50px;
  height: 25px;
  border: none;
  background: none;
}
```

---

## 🔍 6. Testing and Validation

Follow these steps to test the implementation:

1. **Component Testing**:
   - Verify each planet renders correctly with textures
   - Test rotation animations for each planet
   - Ensure the Moon orbits Earth correctly

2. **Interaction Testing**:
   - Test planet selection in both view modes
   - Verify orbit controls work in single planet mode
   - Test camera transitions in solar system mode

3. **UI Testing**:
   - Verify all controls affect the scene as expected
   - Test responsive layout on different screen sizes
   - Ensure screenshot functionality works

4. **LEGIT Compliance**:
   - Validate all components against their contracts
   - Ensure proper metadata is included in each component
   - Verify all required features are implemented

---

## 🛠️ 7. Troubleshooting Common Issues

### Texture Loading Issues
- Ensure texture paths are correct
- Use `useLoader` with Suspense for proper loading
- Verify texture file formats are supported (jpg/png)

### Performance Issues
- Reduce geometry complexity for planets (lower segment count)
- Optimize star count for lower-end devices
- Use proper memoization for components that don't need to re-render

### Camera Control Issues
- Ensure OrbitControls are only active in single planet view
- Check for conflicts between automatic camera movement and controls
- Verify camera transition speed is appropriate

---

## 📚 8. References

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [LEGIT Contract System Documentation](https://docs/contracts/legit_protocol.md)
- [Planet Texture Resources](https://planetpixelemporium.com/planets.html)

---

## 🔄 9. Maintenance and Updates

To maintain the Planet Sandbox system:

1. Regularly update Three.js and React dependencies
2. Add new planets or celestial bodies as needed
3. Enhance visual effects with new shader techniques
4. Add educational features like planet information
5. Optimize for mobile devices with responsive UI

When making updates, ensure all changes comply with the LEGIT contracts and update the contracts if necessary.

---

🔐 This implementation guide complies with the CuriousLabs LEGIT Protocol v1.0 