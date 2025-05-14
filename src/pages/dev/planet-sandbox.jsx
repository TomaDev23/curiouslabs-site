import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Helmet } from 'react-helmet-async';
import * as THREE from 'three';
import { useControls, folder } from 'leva';
import ReactDOM from 'react-dom';

// Import planet components
import MarsSphere from '../../components/journey/celestial/bodies/MarsSphere';
import JupiterSphere from '../../components/journey/celestial/bodies/JupiterSphere';
import PlutoSphere from '../../components/journey/celestial/bodies/PlutoSphere';
import SaturnSphere from '../../components/journey/celestial/bodies/SaturnSphere';
import UranusSphere from '../../components/journey/celestial/bodies/UranusSphere';
import VenusSphere from '../../components/journey/celestial/bodies/VenusSphere';
import MoonSphere from '../../components/journey/celestial/bodies/MoonSphere';
import EarthSphere from '../../components/journey/celestial/bodies/EarthSphere';

// Import HUD component
import PlanetSelectorHUD from '../../components/hud/PlanetSelectorHUD';

console.log('[DEBUG] Planet-sandbox page loaded');

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

// Solar System component to display all planets together
function SolarSystem({ zoomTarget, onPlanetClick }) {
  // Positioning with Earth at center, Moon in orbit, and other planets spread out
  const planetPositions = {
    earth: [0, 0, 0],
    moon: [5, 0.5, 0],
    venus: [-10, -2, -12],
    mars: [14, 1, -8],
    pluto: [-18, 4, 16],
    uranus: [22, -5, 8],
    saturn: [-8, 8, 20],
    jupiter: [25, -3, -24]
  };

  // Scale factors for planets to show relative sizes
  const planetScales = {
    earth: 1.0,
    moon: 0.27,
    venus: 0.95,
    mars: 0.53,
    pluto: 0.18,
    uranus: 1.0,
    saturn: 1.2,
    jupiter: 1.5
  };

  // Camera control for zoom effect
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3());
  const currentPositionRef = useRef(new THREE.Vector3(0, 10, 30));
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  
  useEffect(() => {
    if (zoomTarget === 'none') {
      // Overview position
      targetRef.current.set(0, 10, 30);
      lookAtRef.current.set(0, 0, 0);
    } else {
      const position = planetPositions[zoomTarget];
      // Position camera at an angle to the planet for better view
      targetRef.current.set(
        position[0] - 2, 
        position[1] + 2, 
        position[2] + 5
      );
      // Look directly at the planet
      lookAtRef.current.set(position[0], position[1], position[2]);
    }
  }, [zoomTarget]);
  
  useFrame(() => {
    // Always use automatic camera movement - simpler and more reliable
    // Smoothly move camera to target position
    currentPositionRef.current.lerp(targetRef.current, 0.05);
    camera.position.copy(currentPositionRef.current);
    
    // Smoothly transition look-at point
    currentLookAtRef.current.lerp(lookAtRef.current, 0.05);
    camera.lookAt(currentLookAtRef.current);
  });

  // Moon orbit animation
  const moonOrbitRef = useRef();
  useFrame(() => {
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Earth at center */}
      <group position={planetPositions.earth} onClick={() => onPlanetClick('earth')}>
        <EarthSphere radius={planetScales.earth} />
      </group>
      
      {/* Moon orbiting Earth */}
      <group ref={moonOrbitRef} position={planetPositions.earth}>
        <group position={[5, 0.5, 0]} onClick={() => onPlanetClick('moon')}>
          <MoonSphere radius={planetScales.moon} />
        </group>
      </group>
      
      {/* Venus */}
      <group position={planetPositions.venus} onClick={() => onPlanetClick('venus')}>
        <VenusSphere radius={planetScales.venus} />
      </group>
      
      {/* Mars */}
      <group position={planetPositions.mars} onClick={() => onPlanetClick('mars')}>
        <MarsSphere radius={planetScales.mars} />
      </group>
      
      {/* Pluto */}
      <group position={planetPositions.pluto} onClick={() => onPlanetClick('pluto')}>
        <PlutoSphere radius={planetScales.pluto} />
      </group>
      
      {/* Uranus */}
      <group position={planetPositions.uranus} onClick={() => onPlanetClick('uranus')}>
        <UranusSphere radius={planetScales.uranus} />
      </group>
      
      {/* Saturn */}
      <group position={planetPositions.saturn} onClick={() => onPlanetClick('saturn')}>
        <SaturnSphere radius={planetScales.saturn} />
      </group>
      
      {/* Jupiter */}
      <group position={planetPositions.jupiter} onClick={() => onPlanetClick('jupiter')}>
        <JupiterSphere radius={planetScales.jupiter} />
      </group>
    </group>
  );
}

export default function PlanetSandboxPage() {
  console.log('[DEBUG] Rendering PlanetSandboxPage');
  
  // Planet selection state
  const [selectedPlanet, setSelectedPlanet] = useState('earth');
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'solar-system'
  const [zoomTarget, setZoomTarget] = useState('none');
  
  // Lighting state
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [sunIntensity, setSunIntensity] = useState(1.0);
  const [sunColor, setSunColor] = useState('#ffffff');
  const [directionalPos] = useState([10, 10, 10]);
  
  // Controls state
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  
  // Planet components mapping
  const planetComponents = {
    earth: <EarthSphere position={[0, 0, 0]} radius={1} />,
    mars: <MarsSphere position={[0, 0, 0]} radius={1} />,
    jupiter: <JupiterSphere position={[0, 0, 0]} radius={1} />,
    pluto: <PlutoSphere position={[0, 0, 0]} radius={1} />,
    saturn: <SaturnSphere position={[0, 0, 0]} radius={1} />,
    uranus: <UranusSphere position={[0, 0, 0]} radius={1} />,
    venus: <VenusSphere position={[0, 0, 0]} radius={1} />,
    moon: <MoonSphere position={[0, 0, 0]} radius={1} />
  };
  
  // Planet information
  const planetInfo = {
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
    }
  };

  // Handle planet click in solar system view
  const handlePlanetClick = (planet) => {
    setZoomTarget(planet);
  };
  
  return (
    <div className="min-h-screen relative bg-black">
      <Helmet>
        <title>Planet Sandbox | Cosmic Journey</title>
      </Helmet>
      
      {/* Fixed background with Three.js Canvas */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 0, 3], fov: 50 }}>
          {/* Scene lighting */}
          <ambientLight intensity={ambientIntensity} />
          <directionalLight 
            position={directionalPos} 
            intensity={sunIntensity} 
            color={sunColor} 
          />
          
          {/* Stars background */}
          <Stars />
          
          {/* Display either single planet or solar system based on view mode */}
          {viewMode === 'single' ? (
            planetComponents[selectedPlanet]
          ) : (
            <SolarSystem zoomTarget={zoomTarget} onPlanetClick={handlePlanetClick} />
          )}
          
          {/* Orbit controls - only for single planet view */}
          {orbitEnabled && viewMode === 'single' && (
            <OrbitControls 
              enablePan={false} 
              autoRotate={autoRotate} 
              autoRotateSpeed={0.5} 
            />
          )}
          
          {/* Camera auto-rotation when orbit controls are disabled */}
          {!orbitEnabled && viewMode === 'single' && <RotatingCamera isRotating={true} />}
        </Canvas>
      </div>
      
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
                onClick={() => setViewMode('single')}
                className={`px-3 py-1 text-sm rounded ${viewMode === 'single' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Single Planet
              </button>
              <button 
                onClick={() => {
                  setViewMode('solar-system');
                  setZoomTarget('none');
                }}
                className={`px-3 py-1 text-sm rounded ${viewMode === 'solar-system' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Solar System
              </button>
            </div>
          </div>
          
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
              onClick={() => setZoomTarget('none')}
              className={`px-3 py-1 rounded text-sm ${zoomTarget === 'none' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Overview
            </button>
            {Object.keys(planetInfo).map(planet => (
              <button 
                key={planet}
                onClick={() => setZoomTarget(planet)}
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
    </div>
  );
}

// Enhanced stars background with improved 3D distribution and effects
function Stars() {
  const starsRef = useRef();
  
  // Star field configuration controls with Leva
  const {
    starCount,
    starDensity,
    globalOpacity,
    cosmicIntensity,
    baseSize,
    twinkleSpeed,
    twinkleAmount,
    glowStrength,
    rotationSpeed,
    showStarsHUD
  } = useControls('Stars Settings', {
    showStarsHUD: { value: false, label: 'Show Stars HUD' },
    starCount: { value: 2500, min: 500, max: 5000, step: 100 },
    distribution: folder({
      starDensity: { value: 0.8, min: 0.1, max: 1.0, step: 0.05 },
      globalOpacity: { value: 0.4, min: 0.1, max: 1.0, step: 0.05 },
    }),
    appearance: folder({
      baseSize: { value: 1.5, min: 0.5, max: 3.0, step: 0.1 },
      cosmicIntensity: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
      glowStrength: { value: 0.8, min: 0.2, max: 1.0, step: 0.05 },
    }),
    animation: folder({
      twinkleSpeed: { value: 0.3, min: 0.01, max: 1.0, step: 0.01 },
      twinkleAmount: { value: 0.15, min: 0.01, max: 0.5, step: 0.01 },
      rotationSpeed: { value: 0.0001, min: 0, max: 0.001, step: 0.00001 },
    })
  }, { collapsed: true });
  
  // Generate star positions and attributes - recreate when starCount changes
  const [positions, colors, sizes, randomOffsets, starDistances, starTypes] = React.useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const randomOffsets = new Float32Array(starCount);
    const starDistances = new Float32Array(starCount);
    const starTypes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      // Create a more even 3D distribution using improved spherical mapping
      // This ensures stars are evenly distributed in all directions
      const radius = 80 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2; // Longitude (around the sphere)
      
      // Use a better distribution for phi to avoid clustering at poles
      // This creates a more uniform distribution across the entire sphere
      const u = Math.random() * 2 - 1; // Range from -1 to 1
      const phi = Math.acos(u); // Range from 0 to PI
      
      // Convert to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Calculate distance from center for later use in effects
      const distance = Math.sqrt(x*x + y*y + z*z);
      starDistances[i] = distance;
      
      // Star colors - Create different star types with more vibrant colors
      const starType = Math.random();
      starTypes[i] = starType; // Store star type for animation variation
      
      if (starType > 0.985) {
        // Bright blue-white stars (very rare, very bright)
        colors[i * 3] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.85 + Math.random() * 0.15;
        colors[i * 3 + 2] = 1.0;
        // Make these stars larger
        sizes[i] = 8.0 + Math.random() * 4.0;
      } else if (starType > 0.97) {
        // Bright yellow stars (rare, bright)
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.3;
        // Make these stars larger
        sizes[i] = 6.0 + Math.random() * 3.0;
      } else if (starType > 0.95) {
        // Red giants (rare)
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.2;
        // Make these stars larger
        sizes[i] = 5.0 + Math.random() * 3.0;
      } else if (starType > 0.9) {
        // Blue-white stars (hot, medium-sized)
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 1.0;
        sizes[i] = 2.5 + Math.random() * 1.5;
      } else if (starType > 0.8) {
        // Yellow-white stars (like our sun)
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
        sizes[i] = 2.0 + Math.random() * 1.0;
      } else if (starType > 0.7) {
        // Orange-reddish stars
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.5 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.3;
        sizes[i] = 1.8 + Math.random() * 0.8;
      } else {
        // White/silver stars (most common)
        const brightness = 0.8 + Math.random() * 0.2;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness;
        sizes[i] = 1.0 + Math.random() * 1.0;
      }
      
      // Random offset for twinkling effect
      randomOffsets[i] = Math.random() * 100;
    }
    
    return [positions, colors, sizes, randomOffsets, starDistances, starTypes];
  }, [starCount]); // Recreate when starCount changes
  
  // Create a reference for the shader material to update in animation
  const materialRef = useRef();
  
  // Add animation to stars with improved twinkling
  useFrame((state) => {
    if (starsRef.current && materialRef.current) {
      // Apply rotation to the entire star field
      starsRef.current.rotation.x += rotationSpeed;
      starsRef.current.rotation.y += rotationSpeed * 1.2;
      
      // Update time uniform for enhanced twinkling
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      
      // Update other uniforms from controls
      materialRef.current.uniforms.starDensity.value = starDensity;
      materialRef.current.uniforms.globalOpacity.value = globalOpacity;
      materialRef.current.uniforms.cosmicIntensity.value = cosmicIntensity;
      materialRef.current.uniforms.baseSize.value = baseSize;
      materialRef.current.uniforms.twinkleSpeed.value = twinkleSpeed;
      materialRef.current.uniforms.twinkleAmount.value = twinkleAmount;
      materialRef.current.uniforms.glowStrength.value = glowStrength;
    }
  });
  
  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starCount}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starCount}
            array={sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-randomOffset"
            count={starCount}
            array={randomOffsets}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-distance"
            count={starCount}
            array={starDistances}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-starType"
            count={starCount}
            array={starTypes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          attach="material"
          uniforms={{
            time: { value: 0 },
            pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 },
            globalOpacity: { value: globalOpacity },
            starDensity: { value: starDensity },
            cosmicIntensity: { value: cosmicIntensity },
            baseSize: { value: baseSize },
            twinkleSpeed: { value: twinkleSpeed },
            twinkleAmount: { value: twinkleAmount },
            glowStrength: { value: glowStrength }
          }}
          vertexShader={`
            attribute float size;
            attribute vec3 color;
            attribute float randomOffset;
            attribute float distance;
            attribute float starType;
            
            uniform float time;
            uniform float pixelRatio;
            uniform float globalOpacity;
            uniform float starDensity;
            uniform float cosmicIntensity;
            uniform float baseSize;
            uniform float twinkleSpeed;
            uniform float twinkleAmount;
            
            varying vec3 vColor;
            varying float vOpacity;
            varying float vBrightness;
            varying float vStarType;
            
            // A function to determine if a star should be visible based on density
            float isVisible(float index, float density) {
              // The higher the density, the more stars are visible
              return step(1.0 - density, fract(index * 0.1));
            }
            
            void main() {
              vColor = color;
              vStarType = starType;
              
              // Determine base visibility based on star density
              float visibility = isVisible(randomOffset, starDensity);
              
              // Calculate distance-based effects
              float distanceFactor = smoothstep(0.0, 100.0, distance);
              
              // Customize twinkling based on star type
              float twinkleSpeedFactor = 1.0;
              float twinkleAmountFactor = 1.0;
              
              // Brighter stars twinkle faster and more noticeably
              if (starType > 0.95) {
                twinkleSpeedFactor = 1.5;
                twinkleAmountFactor = 1.3;
              } else if (starType > 0.9) {
                twinkleSpeedFactor = 1.2;
                twinkleAmountFactor = 1.2;
              } else if (starType > 0.8) {
                twinkleSpeedFactor = 1.1;
                twinkleAmountFactor = 1.1;
              }
              
              // Enhanced twinkling effect with multiple frequencies
              float primaryTwinkle = sin(time * twinkleSpeed * twinkleSpeedFactor + randomOffset);
              float secondaryTwinkle = sin(time * twinkleSpeed * 0.5 * twinkleSpeedFactor + randomOffset * 1.3) * 0.5;
              float fastTwinkle = sin(time * twinkleSpeed * 2.0 * twinkleSpeedFactor + randomOffset * 0.7) * 0.2;
              
              // Combine twinkling effects for more natural variation
              float combinedTwinkle = mix(primaryTwinkle, secondaryTwinkle + fastTwinkle, 0.3);
              
              // Apply the twinkle effect with configurable intensity
              float twinkle = combinedTwinkle * twinkleAmount * twinkleAmountFactor + (1.0 - twinkleAmount * twinkleAmountFactor);
              
              // Store brightness for fragment shader
              vBrightness = twinkle;
              
              // Cosmic scene enhancement - stars move slightly
              vec3 modPosition = position;
              
              // Add subtle motion to stars based on their type
              float motionScale = (1.0 - distanceFactor) * cosmicIntensity * 0.1;
              
              // Brighter stars move more
              if (starType > 0.95) {
                motionScale *= 1.5;
              }
              
              // Different stars move at different speeds and patterns
              modPosition.x += sin(time * (0.03 + starType * 0.02) + randomOffset) * motionScale;
              modPosition.y += cos(time * (0.04 + starType * 0.01) + randomOffset * 1.4) * motionScale;
              
              // Transform and project
              vec4 mvPosition = modelViewMatrix * vec4(modPosition, 1.0);
              gl_Position = projectionMatrix * mvPosition;
              
              // Size calculation with enhanced twinkle effect
              float finalSize = size * baseSize * pixelRatio * twinkle;
              
              // Cosmic scenes make stars slightly larger
              finalSize *= (1.0 + cosmicIntensity * 0.5);
              
              // Set point size
              gl_PointSize = finalSize * visibility;
              
              // Calculate final opacity for fragment shader
              vOpacity = globalOpacity * visibility * (1.0 + cosmicIntensity * 0.5);
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            varying float vOpacity;
            varying float vBrightness;
            varying float vStarType;
            
            uniform float glowStrength;
            uniform float time;
            
            void main() {
              // Create circular points with soft edges
              vec2 uv = gl_PointCoord.xy - 0.5;
              float radius = length(uv);
              
              // Enhanced soft edge with brightness-based variation
              float softEdge = mix(0.3, 0.4, vBrightness);
              float alpha = smoothstep(0.5, softEdge, radius) * vOpacity;
              
              // Calculate brightness for glow effect
              float brightness = dot(vColor, vec3(0.299, 0.587, 0.114));
              
              // Add a more pronounced glow effect for brighter stars
              float glow = (1.0 - smoothstep(0.3, 1.0, radius) * 0.7);
              float glowIntensity = mix(glowStrength, 1.0, step(0.8, brightness));
              
              // Enhance glow for brighter stars
              if (vStarType > 0.95) {
                glowIntensity *= 1.3;
              }
              
              alpha = max(alpha, glow * vOpacity * glowIntensity * vBrightness);
              
              // Apply brightness variation to color for flashing effect
              vec3 finalColor = vColor * (0.8 + vBrightness * 0.4);
              
              // Add color variation for the brightest stars
              if (vStarType > 0.985) {
                // Blue-white stars can have subtle color shifts
                float colorShift = sin(time * 0.5) * 0.1;
                finalColor.b = min(1.0, finalColor.b + colorShift);
              } else if (vStarType > 0.97) {
                // Yellow stars can have subtle red/orange shifts
                float colorShift = sin(time * 0.3) * 0.1;
                finalColor.r = min(1.0, finalColor.r + colorShift);
              }
              
              // Output color with calculated alpha
              gl_FragColor = vec4(finalColor, alpha);
              
              // Discard fragments outside the radius to avoid rendering issues
              if (radius > 0.5) discard;
            }
          `}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Custom Stars HUD (only shown when enabled) - moved to React portal to avoid white screen */}
      {showStarsHUD && typeof document !== 'undefined' && document.body && 
        ReactDOM.createPortal(
          <div className="fixed top-4 right-4 bg-black/80 text-white p-4 z-90 rounded-lg shadow-lg w-64">
            <div className="text-lg font-bold mb-2">Stars Settings</div>
            <div className="space-y-2 text-sm">
              <div>
                <label className="block mb-1">Star Count: {starCount}</label>
                <div className="text-xs text-gray-400 mt-1">
                  Use the Leva panel for full controls
                </div>
              </div>
              <div>
                <label className="block mb-1">Twinkle Speed: {twinkleSpeed.toFixed(2)}</label>
                <div className="text-xs text-gray-400 mt-1">
                  Controls animation speed
                </div>
              </div>
              <div>
                <label className="block mb-1">Twinkle Amount: {twinkleAmount.toFixed(2)}</label>
                <div className="text-xs text-gray-400 mt-1">
                  Controls animation intensity
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </>
  );
} 