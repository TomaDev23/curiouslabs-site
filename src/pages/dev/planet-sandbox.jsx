import React, { useState, useRef, useEffect, useMemo, useCallback, Suspense, lazy } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Helmet } from 'react-helmet-async';
import { TextureLoader, Color } from 'three';
import { useControls, folder } from 'leva';
import CameraInfoHUD from '../../components/hud/CameraInfoHUD';

// Import planet components
import MarsSphere from '../../components/journey/celestial/bodies/MarsSphere';
import JupiterSphere from '../../components/journey/celestial/bodies/JupiterSphere';
import PlutoSphere from '../../components/journey/celestial/bodies/PlutoSphere';
import SaturnSphere from '../../components/journey/celestial/bodies/SaturnSphere';
import UranusSphere from '../../components/journey/celestial/bodies/UranusSphere';
import VenusSphere from '../../components/journey/celestial/bodies/VenusSphere';
import MoonSphere from '../../components/journey/celestial/bodies/MoonSphere';
// import EarthSphere from '../../components/journey/celestial/bodies/EarthSphere';

// Lazy load EarthSphere for performance optimization
const EarthSphere = lazy(() => import('../../components/journey/celestial/bodies/EarthSphere'));

// Import HUD component
import PlanetSelectorHUD from '../../components/hud/PlanetSelectorHUD';
// Import StarField components for nebula
import StarField from '../../components/journey/celestial/environment/StarField';
// Import Camera HUD

// Import CameraController from our new component file
import CameraController from '../../components/controllers/CameraController';

console.log('[DEBUG] Planet-sandbox page loaded');

// Sun component with simple design
function SunSphere({ position = [0, 0, 0], radius = 4 }) {
  const sunRef = useRef();
  const sunTexture = useLoader(TextureLoader, '/assets/images/planets/4k/sunmap_LE_upscale_balanced_x4.jpg');
  
  // Simple rotation
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={position}>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial 
          map={sunTexture}
          emissive={new Color('#ffcc55')}
          emissiveIntensity={1.5}
        />
      </mesh>
      
      {/* Point light from the sun */}
      <pointLight
        color="#ffcc55"
        intensity={5}
        distance={400}
        decay={0.5}
      />
    </group>
  );
}

// Rotating camera component for auto-rotation when orbit controls are disabled
function RotatingCamera({ isRotating }) {
  const cameraRef = useRef();
  
  useFrame(() => {
    if (isRotating && cameraRef.current) {
      cameraRef.current.rotation.y += 0.001;
    }
  });
  
  return <group ref={cameraRef} />;
}

// Planet positions - defined at top level so it can be used by multiple components
const planetPositions = {
  sun: [0, 0, 0],         // Sun at center
  earth: [-125, 20, -175], // Earth brought closer (half original distance)
  moon: [-122.5, 20.25, -175], // Moon relative to new Earth position
  venus: [-45, -3, 15],   // Further left from current position
  mars: [65, 4, -28],     // Further right from current position
  pluto: [-15, -10, -65], // Move pluto further back for better visibility
  uranus: [45, -15, -25], // Move uranus more to the right
  saturn: [-75, 12, -65], // Move saturn further left
  jupiter: [15, 25, -85], // Keep jupiter position but slightly higher
  nebula: [250, 40, 350]  // Nebula far away in the opposite direction from Earth
};

// Solar System component to display all planets together
function SolarSystem({ onPlanetClick }) {
  // Using planet positions defined at top level
  
  // Scale factors for planets to show relative sizes
  const planetScales = {
    sun: 7.0,      // Distant sun
    earth: 1.5,    // Earth is our reference size
    moon: 0.4,     // Moon relative to Earth
    venus: 1.3,    // Similar to Earth
    mars: 0.9,     // Smaller than Earth
    pluto: 0.5,    // Increased from 0.25 to be more visible
    uranus: 2.2,   // Gas giant
    saturn: 2.8,   // Gas giant with rings
    jupiter: 3.5,  // Largest planet
    nebula: 30     // Large nebula
  };

  // Moon orbit animation
  const moonOrbitRef = useRef();
  useFrame(() => {
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Sun - now at center */}
      <group position={planetPositions.sun}>
        <mesh onClick={() => onPlanetClick('sun')}>
          <sphereGeometry args={[planetScales.sun, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <SunSphere radius={planetScales.sun} />
      </group>
      
      {/* Earth - now far away */}
      <group position={planetPositions.earth}>
        <mesh onClick={() => onPlanetClick('earth')}>
          <sphereGeometry args={[planetScales.earth, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <React.Suspense fallback={
          <mesh>
            <sphereGeometry args={[planetScales.earth, 32, 32]} />
            <meshStandardMaterial color="#4a90e2" opacity={0.6} transparent />
          </mesh>
        }>
          <EarthSphere radius={planetScales.earth} />
        </React.Suspense>
      </group>
      
      {/* Moon orbiting Earth */}
      <group position={planetPositions.earth}>
        <group ref={moonOrbitRef} rotation={[0, 0, 0]}>
          <group position={[5, 0.5, 0]}>
            <mesh onClick={() => onPlanetClick('moon')}>
              <sphereGeometry args={[planetScales.moon, 32, 32]} />
              <meshBasicMaterial opacity={0} transparent />
            </mesh>
            <MoonSphere radius={planetScales.moon} />
          </group>
        </group>
      </group>
      
      {/* Venus */}
      <group position={planetPositions.venus}>
        <mesh onClick={() => onPlanetClick('venus')}>
          <sphereGeometry args={[planetScales.venus, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <VenusSphere radius={planetScales.venus} />
      </group>
      
      {/* Mars */}
      <group position={planetPositions.mars}>
        <mesh onClick={() => onPlanetClick('mars')}>
          <sphereGeometry args={[planetScales.mars, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <MarsSphere radius={planetScales.mars} />
      </group>
      
      {/* Pluto */}
      <group position={planetPositions.pluto}>
        <mesh onClick={() => onPlanetClick('pluto')}>
          <sphereGeometry args={[planetScales.pluto, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <PlutoSphere radius={planetScales.pluto} />
      </group>
      
      {/* Uranus */}
      <group position={planetPositions.uranus}>
        <mesh onClick={() => onPlanetClick('uranus')}>
          <sphereGeometry args={[planetScales.uranus, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <UranusSphere radius={planetScales.uranus} />
      </group>
      
      {/* Saturn */}
      <group position={planetPositions.saturn}>
        <mesh onClick={() => onPlanetClick('saturn')}>
          <sphereGeometry args={[planetScales.saturn + 1, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <SaturnSphere radius={planetScales.saturn} />
      </group>
      
      {/* Jupiter */}
      <group position={planetPositions.jupiter}>
        <mesh onClick={() => onPlanetClick('jupiter')}>
          <sphereGeometry args={[planetScales.jupiter, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <JupiterSphere radius={planetScales.jupiter} />
      </group>
      
      {/* Restore the distant nebula group in SolarSystem */}
      <group position={planetPositions.nebula}>
        <mesh onClick={() => onPlanetClick('nebula')}>
          <sphereGeometry args={[25, 32, 32]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <ParticleNebula scale={1.5} />
      </group>
    </group>
  );
}

// Particle Nebula component using the existing StarField nebula
function ParticleNebula({ position = [0, 0, 0], scale = 1 }) {
  const nebulaRef = useRef();
  
  // Simple rotation
  useFrame(() => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group position={position} ref={nebulaRef} scale={scale}>
      {/* Use only the nebula part of StarField */}
      <StarField 
        includeNebula={true}
        includeCosmicDust={false}
        includeStars={false}
        starCount={0}
        nebulaParticleCount={8000}
        cosmicDustCount={0}
        rotationSpeed={0.05}
        baseOpacity={0.8}
        starDensity={0}
        cosmicIntensity={0.9}
        baseSize={3}
        renderOrder={1}
      />
      
      {/* Point light from the nebula */}
      <pointLight
        color="#8a2be2"
        intensity={2}
        distance={200}
        decay={1}
      />
    </group>
  );
}

// Camera controller definition is now imported from the separate file
// function CameraController({ ... }) { ... } - This is now removed

export default function PlanetSandboxPage({ backgroundComponent }) {
  console.log('[DEBUG] Rendering PlanetSandboxPage');
  
  // Planet selection state
  const [selectedPlanet, setSelectedPlanet] = useState('sun'); // Default to sun now
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'solar-system'
  const [zoomTarget, setZoomTarget] = useState('none');
  
  // Camera state for HUD control
  const [cameraFOV, setCameraFOV] = useState(50);
  const [showCameraHUD, setShowCameraHUD] = useState(false);
  
  // Advanced camera control state
  const [cameraMode, setCameraMode] = useState('overview'); // 'overview' or 'orbit'
  const [targetObject, setTargetObject] = useState(null);
  const [cameraSettings, setCameraSettings] = useState({
    distance: 50,
    height: 20,
    fov: 50,
    tilt: 0,
    damping: 0.05,
    orbitSpeed: 0.03 // Changed from 0.1 to 0.05 for slower default orbit
  });
  
  // Camera positions for single planet view
  const planetCameraPositions = {
    sun: [0, 0, 20],      // Adjusted for sun at center
    earth: [0, 0, 5],     // Adjusted for earth far away
    moon: [0, 0, 2],      // Adjusted for moon
    venus: [0.3, 0.3, 3.8],
    mars: [0.2, 0.3, 3],
    pluto: [0.1, 0.1, 2],
    uranus: [1, 0.5, 7],
    saturn: [1.5, 0.8, 9],
    jupiter: [2, 1, 10],
    nebula: [0, 0, 60]
  };
  
  // Planet-specific lighting settings
  const planetLighting = {
    sun: { ambient: 0.2, intensity: 0.5, color: '#ffcc55' },
    earth: { ambient: 0.3, intensity: 1.0, color: '#ffffff' },
    moon: { ambient: 0.2, intensity: 1.2, color: '#ffffee' },
    venus: { ambient: 0.35, intensity: 1.2, color: '#ffffdd' },
    mars: { ambient: 0.25, intensity: 1.1, color: '#ffeecc' },
    pluto: { ambient: 0.4, intensity: 0.7, color: '#f0f0ff' },
    uranus: { ambient: 0.3, intensity: 0.8, color: '#e0f0ff' },
    saturn: { ambient: 0.25, intensity: 0.85, color: '#fff8e0' },
    jupiter: { ambient: 0.2, intensity: 0.9, color: '#ffffee' },
    nebula: { ambient: 0.4, intensity: 0.6, color: '#c8a2ff' }
  };
  
  // Lighting state
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [sunIntensity, setSunIntensity] = useState(1.0);
  const [sunColor, setSunColor] = useState('#ffffff');
  const [directionalPos] = useState([10, 10, 10]);
  
  // Controls state
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  
  // Planet components mapping with custom rotations
  const planetComponents = {
    sun: <SunSphere position={[0, 0, 0]} radius={7} />,
    earth: <EarthSphere radius={1.5} />,
    mars: <MarsSphere position={[0, 0, 0]} radius={0.9} />,
    jupiter: <JupiterSphere position={[0, 0, 0]} radius={3.5} />,
    pluto: <PlutoSphere position={[0, 0, 0]} radius={0.5} />,
    saturn: <SaturnSphere position={[0, 0, 0]} radius={2.8} />,
    uranus: (
      <group rotation={[0, 0, Math.PI / 6]}>
        <UranusSphere position={[0, 0, 0]} radius={2.2} />
      </group>
    ),
    venus: <VenusSphere position={[0, 0, 0]} radius={1.3} />,
    moon: <MoonSphere position={[0, 0, 0]} radius={0.4} />,
    nebula: <ParticleNebula scale={1.5} />
  };
  
  // Planet information
  const planetInfo = {
    sun: {
      name: "Sun",
      diameter: "1,392,700 km",
      features: "Main-sequence G-type star at the center of our solar system, generating heat and light through nuclear fusion."
    },
    earth: {
      name: "Earth",
      diameter: "12,742 km",
      features: "Our home planet with diverse ecosystems, vast oceans, and a protective atmosphere that supports life."
    },
    mars: {
      name: "Mars",
      diameter: "6,779 km",
      features: "Red planet with polar ice caps and Olympus Mons, the largest volcano in the solar system."
    },
    jupiter: {
      name: "Jupiter",
      diameter: "139,820 km",
      features: "Gas giant with a Great Red Spot and over 79 moons."
    },
    pluto: {
      name: "Pluto",
      diameter: "2,377 km",
      features: "Dwarf planet with a heart-shaped region called Tombaugh Regio."
    },
    saturn: {
      name: "Saturn",
      diameter: "116,460 km",
      features: "Gas giant known for its prominent ring system."
    },
    uranus: {
      name: "Uranus",
      diameter: "50,724 km",
      features: "Ice giant with a unique sideways rotation and faint rings."
    },
    venus: {
      name: "Venus",
      diameter: "12,104 km",
      features: "Rocky planet with dense atmosphere and surface temperatures hot enough to melt lead."
    },
    moon: {
      name: "Moon",
      diameter: "3,474 km",
      features: "Earth's only natural satellite with a heavily cratered surface and dark maria (seas) of ancient volcanic flows."
    },
    nebula: {
      name: "Cosmic Nebula",
      diameter: "~100 light years",
      features: "A vast cloud of gas and dust in space, glowing with vibrant colors due to ionization from nearby stars."
    }
  };

  // Zoom presets
  const ZOOM_PRESETS = {
    wide: { fov: 70, distance: 70, height: 30 },
    medium: { fov: 50, distance: 40, height: 15 },
    close: { fov: 35, distance: 15, height: 5 }
  };
  
  // Planet-specific camera settings to use when a planet is selected
  const planetCameraSettings = {
    sun: { distance: 30, height: 10, fov: 60 },
    earth: { distance: 15, height: 5, fov: 45 },
    moon: { distance: 5, height: 2, fov: 40 },
    venus: { distance: 15, height: 5, fov: 45 },
    mars: { distance: 15, height: 5, fov: 45 },
    jupiter: { distance: 25, height: 8, fov: 55 },
    saturn: { distance: 25, height: 8, fov: 55 },
    uranus: { distance: 20, height: 6, fov: 50 },
    pluto: { distance: 10, height: 3, fov: 40 },
    nebula: { distance: 100, height: 20, fov: 70 }
  };
  
  // Function to apply zoom presets
  const applyZoomPreset = (presetName) => {
    const preset = ZOOM_PRESETS[presetName];
    if (preset) {
      console.log(`Applying zoom preset: ${presetName}`, preset);
      
      // Make sure we're in orbit mode with a target
      if (cameraMode !== 'orbit') {
        console.log('Switching to orbit mode for zoom preset');
        setCameraMode('orbit');
      }
      
      // Set a default target if none exists
      if (!targetObject) {
        const defaultTarget = 'sun';
        console.log(`Setting default target: ${defaultTarget}`);
        setTargetObject(defaultTarget);
      }
      
      // Update settings with the preset values
      const newSettings = {
        ...cameraSettings,
        fov: preset.fov,
        distance: preset.distance,
        height: preset.height
      };
      
      console.log('New camera settings:', newSettings);
      setCameraSettings(newSettings);
      setCameraFOV(preset.fov);
    }
  };

  // Handle planet click in solar system view - completely rewritten
  const handlePlanetClick = (planet) => {
    console.log(`Planet clicked: ${planet}`);
    
    if (viewMode === 'solar-system') {
      // Update zoom target
      setZoomTarget(planet);
      
      // Set the target object
      setTargetObject(planet);
      
      // Get planet-specific camera settings
      const settings = planetCameraSettings[planet] || { distance: 20, height: 5, fov: 50 };
      
      // Update camera settings
      const newSettings = {
        ...cameraSettings,
        distance: settings.distance,
        height: settings.height,
        fov: settings.fov
      };
      
      // Switch to orbit mode to enable proper controls
      setCameraMode('orbit');
      
      // Apply settings
      console.log('Applying settings for planet:', planet, newSettings);
      setCameraSettings(newSettings);
      setCameraFOV(settings.fov);
    } else {
      // In single planet view, just change the selected planet
      setSelectedPlanet(planet);
    }
  };
  
  // Update lighting based on selected planet in single view
  useEffect(() => {
    if (viewMode === 'single' && planetLighting[selectedPlanet]) {
      const lighting = planetLighting[selectedPlanet];
      setAmbientIntensity(lighting.ambient);
      setSunIntensity(lighting.intensity);
      setSunColor(lighting.color);
    }
  }, [selectedPlanet, viewMode]);
  
  // Toggle camera HUD
  const toggleCameraHUD = () => {
    const newVisibility = !showCameraHUD;
    setShowCameraHUD(newVisibility);
    
    if (newVisibility) {
      // When enabling the HUD, sync the camera state with the current target
      if (targetObject) {
        // If a target is already set, ensure we're in orbit mode
        setCameraMode('orbit');
      } else if (zoomTarget && zoomTarget !== 'none') {
        // If a zoom target is set but no target object, initialize with the zoom target
        setTargetObject(zoomTarget);
        setCameraMode('orbit');
      } else {
        // Default to overview mode with no specific target
        setCameraMode('overview');
        setTargetObject(null);
      }
    }
  };
  
  // Handler for camera mode change
  const handleCameraModeChange = (mode) => {
    console.log(`Changing camera mode to: ${mode}`);
    setCameraMode(mode);
    
    if (mode === 'overview') {
      // Reset target object when switching to overview mode
      setTargetObject(null);
      setZoomTarget('none');
      
      // Reset camera to default position focused on sun
      const newSettings = {
        ...cameraSettings,
        distance: 50,
        height: 20, 
        fov: 50,
        tilt: 0
      };
      setCameraSettings(newSettings);
      setCameraFOV(50);
      
      console.log('Reset to overview mode with settings:', newSettings);
    } else if (mode === 'orbit' && !targetObject) {
      // Set a default target object if none is selected
      const defaultTarget = 'sun';
      setTargetObject(defaultTarget);
      setZoomTarget(defaultTarget);
      
      // Apply default settings for sun
      const settings = planetCameraSettings['sun'];
      const newSettings = {
        ...cameraSettings,
        distance: settings.distance,
        height: settings.height,
        fov: settings.fov
      };
      setCameraSettings(newSettings);
      setCameraFOV(settings.fov);
      
      console.log('Set default orbit target to sun with settings:', newSettings);
    } else if (mode === 'cinematic') {
      // Reset target object when entering cinematic mode
      setTargetObject(null);
      console.log('Entering cinematic mode');
    } else if (mode === 'cinematic-orbit') {
      // For cinematic orbit, we need a target object
      if (!targetObject && planetNames.length > 0) {
        const defaultTarget = planetNames.includes('earth') ? 'earth' : planetNames[0];
        setTargetObject(defaultTarget);
        setZoomTarget(defaultTarget);
        console.log(`Set cinematic orbit target to ${defaultTarget}`);
      }
    }
  };
  
  // Function to start cinematic mode
  const startCinematicMode = () => {
    // Start the cinematic tour
    setCameraMode('cinematic');
    console.log("Starting cinematic tour");
  };

  // Function to start cinematic orbit mode
  const startCinematicOrbit = () => {
    // Need a target object for cinematic orbit
    if (!targetObject && planetNames.length > 0) {
      const defaultTarget = planetNames.includes('earth') ? 'earth' : planetNames[0];
      setTargetObject(defaultTarget);
    }
    
    setCameraMode('cinematic-orbit');
    console.log("Starting cinematic orbit mode");
  };
  
  // Handler for target object change
  const handleTargetObjectChange = (target) => {
    setTargetObject(target || null);
    
    // If target is selected, switch to orbit mode
    if (target) {
      setCameraMode('orbit');
    }
  };
  
  // Handler for camera settings change
  const handleCameraSettingsChange = (newSettings) => {
    setCameraSettings(newSettings);
    
    // Update FOV to keep them in sync
    if (newSettings.fov !== cameraFOV) {
      setCameraFOV(newSettings.fov);
    }
  };
  
  // Get list of planet names for dropdown
  const planetNames = useMemo(() => {
    return Object.keys(planetInfo);
  }, [planetInfo]);
  
  return (
    <div className="min-h-screen relative bg-black">
      <Helmet>
        <title>Planet Sandbox | Cosmic Journey</title>
      </Helmet>
      
      {/* Fixed background with Three.js Canvas */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Canvas 
          gl={{ preserveDrawingBuffer: true }} 
          camera={{ 
            position: viewMode === 'single' ? planetCameraPositions[selectedPlanet] : [0, 20, 50], 
            fov: cameraFOV,
            near: 0.1,
            far: 1000
          }}
        >
          {/* Background stars - render first */}
          {backgroundComponent}
          
          {/* Scene lighting */}
          <ambientLight intensity={ambientIntensity} />
          <directionalLight 
            position={directionalPos} 
            intensity={sunIntensity} 
            color={sunColor} 
          />
          
          {/* Camera controller for HUD-driven camera - only in solar system view */}
          {viewMode === 'solar-system' && (
            <CameraController 
              key="solar-system-camera"
              cameraMode={cameraMode}
              targetObject={targetObject}
              cameraSettings={cameraSettings}
              objectPositions={planetPositions}
            />
          )}
          
          {/* Display either single planet or solar system based on view mode */}
          {viewMode === 'single' ? (
            <>
              {planetComponents[selectedPlanet]}
              {orbitEnabled && (
                <OrbitControls 
                  key="single-planet-controls"
                  enablePan={false} 
                  autoRotate={autoRotate} 
                  autoRotateSpeed={0.5} 
                />
              )}
            </>
          ) : (
            <>
              <SolarSystem onPlanetClick={handlePlanetClick} />
            </>
          )}
        </Canvas>
      </div>
      
      {/* Camera Info HUD (only shown in solar system view) */}
      {viewMode === 'solar-system' && showCameraHUD && (
        <CameraInfoHUD 
          cameraPosition={planetCameraPositions[selectedPlanet]}
          cameraTarget={planetPositions[selectedPlanet]}
          fov={cameraFOV}
          onUpdatePosition={(pos) => {}}
          onUpdateTarget={(target) => {}}
          onUpdateFOV={setCameraFOV}
          onClose={() => setShowCameraHUD(false)}
          
          // Advanced camera controls
          cameraMode={cameraMode}
          targetObject={targetObject}
          cameraSettings={cameraSettings}
          onCameraModeChange={handleCameraModeChange}
          onTargetObjectChange={handleTargetObjectChange}
          onCameraSettingsChange={handleCameraSettingsChange}
          planetList={planetNames}
          
          // Zoom presets and cinematic mode
          onApplyZoomPreset={applyZoomPreset}
          onStartCinematic={startCinematicMode}
          onStartCinematicOrbit={startCinematicOrbit}
        />
      )}
      
      {/* Planet Selector HUD - only shown in single view mode */}
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
      
      {/* Controls panel */}
      <div className="fixed top-4 left-4 bg-black/70 text-white p-4 z-50 rounded-lg shadow-lg">
        <div className="text-lg font-bold mb-2">View Controls</div>
        <div className="space-y-3">
          {/* View mode selector */}
          <div>
            <label className="block text-sm mb-1">View Mode</label>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setViewMode('single');
                  
                  // Reset camera related states when switching to single planet view
                  setShowCameraHUD(false);
                  setCameraMode('overview');
                  setTargetObject(null);
                  setCameraFOV(50);
                  setCameraSettings({
                    distance: 50,
                    height: 20,
                    fov: 50,
                    tilt: 0,
                    damping: 0.05,
                    orbitSpeed: 0.03
                  });
                }}
                className={`px-3 py-1 text-sm rounded ${viewMode === 'single' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Single Planet
              </button>
              <button 
                onClick={() => {
                  setViewMode('solar-system');
                  setZoomTarget('none');
                  
                  // Initialize camera settings for solar system view
                  setCameraFOV(50);
                  setTargetObject(null);
                }}
                className={`px-3 py-1 text-sm rounded ${viewMode === 'solar-system' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Solar System
              </button>
            </div>
          </div>
          
          {/* Camera HUD toggle - only for solar system view */}
          {viewMode === 'solar-system' && (
            <div className="space-y-2">
              <button 
                onClick={toggleCameraHUD}
                className={`px-3 py-1 text-sm rounded ${showCameraHUD ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                {showCameraHUD ? 'Hide Camera Controls' : 'Show Camera Controls'}
              </button>
              
              {/* Camera Mode controls */}
              {showCameraHUD && (
                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">Camera Mode</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleCameraModeChange('overview')}
                      className={`px-3 py-1 text-sm rounded ${cameraMode === 'overview' ? 'bg-blue-600' : 'bg-gray-700'}`}
                    >
                      Overview
                    </button>
                    <button 
                      onClick={() => handleCameraModeChange('orbit')}
                      className={`px-3 py-1 text-sm rounded ${cameraMode === 'orbit' ? 'bg-blue-600' : 'bg-gray-700'}`}
                    >
                      Orbit
                    </button>
                  </div>
                </div>
              )}
              
              {/* Target Selection - only when in orbit mode */}
              {showCameraHUD && cameraMode === 'orbit' && (
                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">Target Object</div>
                  <select
                    className="w-full bg-gray-700 text-white px-2 py-1 rounded text-sm"
                    value={targetObject || ''}
                    onChange={(e) => handleTargetObjectChange(e.target.value)}
                  >
                    <option value="">None</option>
                    {planetNames.map((planet) => (
                      <option key={planet} value={planet}>
                        {planet.charAt(0).toUpperCase() + planet.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
          
          {/* Controls for single planet view */}
          {viewMode === 'single' && (
            <>
              <div>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={orbitEnabled} 
                    onChange={() => setOrbitEnabled(!orbitEnabled)}
                    className="mr-2"
                  />
                  Enable Orbit Controls
                </label>
              </div>
              {orbitEnabled && (
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={autoRotate} 
                      onChange={() => setAutoRotate(!autoRotate)}
                      className="mr-2"
                    />
                    Auto-Rotate Camera
                  </label>
                </div>
              )}
            </>
          )}
          
          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={showInfo} 
                onChange={() => setShowInfo(!showInfo)}
                className="mr-2"
              />
              Show Planet Info
            </label>
          </div>
          <div className="mt-1">
            <button 
              onClick={() => {
                const link = document.createElement('a');
                const canvas = document.querySelector('canvas');
                link.download = viewMode === 'single' 
                  ? `${selectedPlanet}-render.png` 
                  : 'solar-system-render.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
              }}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-sm rounded"
            >
              Take Screenshot
            </button>
          </div>
        </div>
      </div>
      
      {/* Planet information panel */}
      {showInfo && viewMode === 'single' && (
        <div className="fixed bottom-4 left-4 bg-black/70 text-white p-4 z-50 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">{planetInfo[selectedPlanet].name}</h2>
          <div className="text-sm space-y-1">
            <div><span className="font-bold">Diameter:</span> {planetInfo[selectedPlanet].diameter}</div>
            <div><span className="font-bold">Features:</span> {planetInfo[selectedPlanet].features}</div>
          </div>
        </div>
      )}
      
      {/* Zoom target selector for solar system view */}
      {viewMode === 'solar-system' && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-4 z-50 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2 text-center">Zoom Target</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => {
                setZoomTarget('none');
                setTargetObject(null);
                setCameraMode('overview');
              }}
              className={`px-3 py-1 rounded text-sm ${zoomTarget === 'none' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Overview
            </button>
            {Object.keys(planetInfo).map(planet => (
              <button 
                key={planet}
                onClick={() => handlePlanetClick(planet)}
                className={`px-3 py-1 rounded text-sm ${zoomTarget === planet ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {planetInfo[planet].name}
              </button>
            ))}
          </div>
          <div className="mt-3 text-center text-xs opacity-70">
            Click on any planet to zoom in, or use the buttons above
          </div>
        </div>
      )}
      
      {/* Info panel for solar system view */}
      {showInfo && viewMode === 'solar-system' && zoomTarget !== 'none' && (
        <div className="fixed bottom-24 right-4 bg-black/70 text-white p-4 z-50 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">{planetInfo[zoomTarget].name}</h2>
          <div className="text-sm space-y-1">
            <div><span className="font-bold">Diameter:</span> {planetInfo[zoomTarget].diameter}</div>
            <div><span className="font-bold">Features:</span> {planetInfo[zoomTarget].features}</div>
          </div>
        </div>
      )}
      
      {/* Camera auto-rotation when orbit controls are disabled */}
      {!orbitEnabled && viewMode === 'single' && <RotatingCamera isRotating={true} />}
    </div>
  );
} 