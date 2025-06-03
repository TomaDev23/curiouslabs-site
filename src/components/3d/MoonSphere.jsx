/**
 * @component MoonSphere
 * @description Cinematic moon with directional lighting, glow, and distant appearance
 * 
 * @metadata
 * @version 2.0.0 - Enhanced with anomaly support
 * @author CuriousLabs
 * @legit true - MoonSphere passes LEGIT protocol
 */

import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import MoonLighting from './MoonLighting';

// Scene setup for the 3D moon with cinematic lighting
const MoonScene = ({ debugPhase, anomalyMode }) => {
  const moonRef = useRef();
  
  // Slow rotation animation
  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.0005; // Very slow rotation
    }
  });

  // Load texture maps
  const moonTexture = useLoader(TextureLoader, '/assets/images/planets/4k/moonmap2k.jpg');
  const moonBumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/moonbump2k.jpg');
  
  // Fix texture quality and prevent stretching
  // Set proper anisotropic filtering (helps with texture detail at angles)
  moonTexture.anisotropy = 16;
  moonBumpMap.anisotropy = 16;
  
  // Enable mipmapping to preserve detail at different zoom levels
  moonTexture.generateMipmaps = true;
  moonBumpMap.generateMipmaps = true;
  
  // Set proper texture filters
  moonTexture.minFilter = THREE.LinearMipmapLinearFilter; // Trilinear filtering for distant views
  moonTexture.magFilter = THREE.LinearFilter; // Linear filtering for close-up views
  moonBumpMap.minFilter = THREE.LinearMipmapLinearFilter;
  moonBumpMap.magFilter = THREE.LinearFilter;
  
  // Set proper wrapping mode to prevent texture stretching at edges
  moonTexture.wrapS = THREE.ClampToEdgeWrapping;
  moonTexture.wrapT = THREE.ClampToEdgeWrapping;
  moonBumpMap.wrapS = THREE.ClampToEdgeWrapping;
  moonBumpMap.wrapT = THREE.ClampToEdgeWrapping;
  
  // Apply texture scaling to imply distance - FIXED: same for all modes
  moonTexture.repeat.set(0.65, 0.65);
  moonTexture.offset.set(0.175, 0.175);
  
  // Apply same scaling to bump map - FIXED: same for all modes
  moonBumpMap.repeat.set(0.65, 0.65);
  moonBumpMap.offset.set(0.175, 0.175);
  
  // Check if supermoon mode is active for enhanced material
  const isSupermoon = anomalyMode === 'supermoon';
  
  return (
    <>
      {/* ONLY our dynamic lighting - no other lights */}
      <MoonLighting debugPhase={debugPhase} anomalyMode={anomalyMode} />
      
      {/* Soft atmospheric haze - restores the gentle glow */}
      <Sphere args={[4.25, 32, 32]}>
        <meshBasicMaterial
          color={isSupermoon ? "#fff2d6" : "#ffffff"}
          transparent
          opacity={isSupermoon ? 0.08 : 0.04}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Clean moon sphere with soft surface - Using icosahedron geometry to prevent pole stretching */}
      <mesh ref={moonRef} receiveShadow castShadow>
        <icosahedronGeometry args={[4.16, 8]} /> {/* Better texture distribution than sphere */}
        <meshStandardMaterial 
          map={moonTexture}
          bumpMap={moonBumpMap}
          bumpScale={0.015}
          color={isSupermoon ? "#f8e0b0" : "#f5f5f5"}
          metalness={isSupermoon ? 0.15 : 0.1}
          roughness={isSupermoon ? 0.65 : 0.7}
          emissive={isSupermoon ? "#ffd280" : "#f4f1e0"}
          emissiveIntensity={isSupermoon ? 0.12 : 0.04}
          // Additional material properties to prevent texture stretching
          flatShading={false}
          dithering={true}
        />
      </mesh>
      
      {/* Invisible interaction sphere only */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial 
          transparent 
          opacity={0} 
        />
      </mesh>
    </>
  );
};

// Texture preloader component
const TexturePreloader = () => {
  useLoader(TextureLoader, '/assets/images/planets/4k/moonmap2k.jpg');
  useLoader(TextureLoader, '/assets/images/planets/4k/moonbump2k.jpg');
  return null;
};

// WebGL support check utility
const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Main MoonSphere component
const MoonSphere = ({ 
  className = "", 
  fallbackToEclipse = false, 
  showDebugHUD = true,
  debugPhase = null, // Phase override
  anomalyMode = null // Visual anomaly mode
}) => {
  // WebGL detection happens inside the component
  const [supportsWebGL, setSupportsWebGL] = React.useState(true);
  const [internalDebugPhase, setInternalDebugPhase] = React.useState(null); // Internal state for debug HUD
  const [webglError, setWebglError] = React.useState(false);
  const [cameraPosition] = React.useState([0, 0, 25]); // Fixed camera position
  const [cameraFOV, setCameraFOV] = React.useState(25); // Control zoom with FOV instead of position
  const [prevAnomalyMode, setPrevAnomalyMode] = React.useState(null); // Track anomaly mode changes
  const animationRef = React.useRef(null); // Reference for animation frame
  
  // Refs for tracking state changes to minimize logging
  const prevPosRef = React.useRef(cameraPosition);
  const prevFOVRef = React.useRef(cameraFOV);
  const hasLoggedDebugPhaseRef = React.useRef(false);
  const prevAnomalyRef = React.useRef(null);
  
  // Use external phase if provided, otherwise use internal
  const activeDebugPhase = debugPhase !== null ? debugPhase : internalDebugPhase;
  
  React.useEffect(() => {
    setSupportsWebGL(checkWebGLSupport());
  }, []);

  // Log camera FOV changes for debugging only in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Only log significant camera changes, not every small update
      if (Math.abs(prevFOVRef.current - cameraFOV) > 1) {
        console.log('🎥 Camera FOV updated:', cameraFOV);
        prevFOVRef.current = cameraFOV;
      }
    }
  }, [cameraFOV]);
  
  // Cleanup animation frames on unmount or component changes
  React.useEffect(() => {
    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);
  
  // Handle camera zoom effect for supermoon using FOV instead of position
  React.useEffect(() => {
    // Only trigger effect when anomaly mode changes
    if (anomalyMode !== prevAnomalyMode) {
      setPrevAnomalyMode(anomalyMode);
      
      // Cancel any existing animation
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Cinematic zoom when supermoon is activated - using FOV
      if (anomalyMode === 'supermoon') {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔍 SUPERMOON ZOOM: Starting cinematic camera zoom');
        }
        
        // Starting FOV
        const startFOV = 25;
        // Target FOV - smaller for zoom effect (but not too extreme)
        const targetFOV = 19;
        // Animation duration in ms
        const duration = 1800;
        // Starting time
        const startTime = performance.now();
        
        // Animate the camera FOV
        const animateZoom = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
          const easedProgress = easeOutCubic(progress);
          
          // Calculate new FOV
          const newFOV = startFOV - (startFOV - targetFOV) * easedProgress;
          
          // Reduce logging - only log at 25%, 50%, 75% and 100%
          if (process.env.NODE_ENV === 'development' && 
              (progress >= 1 || Math.abs(Math.round(progress * 4) / 4 - progress) < 0.01)) {
            console.log(`🔍 ZOOM: ${(progress * 100).toFixed(0)}% complete, FOV=${newFOV.toFixed(1)}`);
          }
          
          setCameraFOV(newFOV);
          
          if (progress < 1) {
            animationRef.current = window.requestAnimationFrame(animateZoom);
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.log('🔍 SUPERMOON ZOOM: Cinematic zoom complete');
            }
            animationRef.current = null;
          }
        };
        
        // Start animation
        animationRef.current = window.requestAnimationFrame(animateZoom);
      } 
      // Reset camera when supermoon is deactivated - using FOV
      else if (prevAnomalyMode === 'supermoon') {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔍 SUPERMOON ZOOM: Resetting camera zoom');
        }
        
        // Starting FOV
        const startFOV = cameraFOV;
        // Target FOV - reset to original
        const targetFOV = 25;
        // Animation duration in ms
        const duration = 1500;
        // Starting time
        const startTime = performance.now();
        
        // Animate the camera FOV back
        const animateZoomOut = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
          const easedProgress = easeOutCubic(progress);
          
          // Calculate new FOV
          const newFOV = startFOV + (targetFOV - startFOV) * easedProgress;
          
          // Reduce logging - only log at 25%, 50%, 75% and 100%
          if (process.env.NODE_ENV === 'development' && 
              (progress >= 1 || Math.abs(Math.round(progress * 4) / 4 - progress) < 0.01)) {
            console.log(`🔍 ZOOM OUT: ${(progress * 100).toFixed(0)}% complete, FOV=${newFOV.toFixed(1)}`);
          }
          
          setCameraFOV(newFOV);
          
          if (progress < 1) {
            animationRef.current = window.requestAnimationFrame(animateZoomOut);
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.log('🔍 SUPERMOON ZOOM: Camera reset complete');
            }
            animationRef.current = null;
          }
        };
        
        // Start animation
        animationRef.current = window.requestAnimationFrame(animateZoomOut);
      }
    }
  }, [anomalyMode, prevAnomalyMode, cameraFOV]);
  
  // Enhanced logging for phase and anomaly mode changes, but limited
  React.useEffect(() => {
    // Only log in development and only on real changes
    if (process.env.NODE_ENV === 'development') {
      // Debug phase changes
      if (debugPhase !== null) {
        if (!hasLoggedDebugPhaseRef.current) {
          console.log(`🎛️ EXTERNAL MOON CONTROL: Phase set to ${debugPhase.toFixed(1)}`);
          hasLoggedDebugPhaseRef.current = true;
        }
      }
      
      // Anomaly mode changes
      if (anomalyMode) {
        if (prevAnomalyRef.current !== anomalyMode) {
          console.log(`🔮 MOON ANOMALY MODE: ${anomalyMode}`);
          prevAnomalyRef.current = anomalyMode;
        }
      }
    }
  }, [debugPhase, anomalyMode]);
  
  // WORKING NATIVE DOM HUD - Direct document.body mount (only for internal control)
  React.useEffect(() => {
    if (!showDebugHUD || debugPhase !== null) return; // Skip HUD if externally controlled
    
    const phases = [
      { name: '🔄 Auto', value: null },
      { name: '🌑 New', value: 0.0 },
      { name: '🌒 Crescent', value: 0.15 },
      { name: '🌓 Quarter', value: 0.28 },
      { name: '🌔 Gibbous', value: 0.4 },
      { name: '🌕 Full', value: 0.5 },
      { name: '🌖 Waning', value: 0.6 },
      { name: '🌗 Last', value: 0.72 },
      { name: '🌘 Dark', value: 0.85 }
    ];
    
    // Create HUD container
    const hudContainer = document.createElement('div');
    hudContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 999999;
      background: rgba(0,0,0,0.9);
      padding: 16px;
      border-radius: 12px;
      border: 2px solid #333;
      color: white;
      font-size: 14px;
      font-family: monospace;
    `;
    
    // Create title
    const title = document.createElement('div');
    title.innerHTML = '🌙 MOON PHASE CONTROL';
    title.style.cssText = `
      margin-bottom: 12px;
      font-weight: bold;
      color: white;
    `;
    hudContainer.appendChild(title);
    
    // Create button grid
    const buttonGrid = document.createElement('div');
    buttonGrid.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
    `;
    
    phases.forEach(phase => {
      const button = document.createElement('button');
      button.innerHTML = phase.name;
      button.style.cssText = `
        background: ${internalDebugPhase === phase.value ? '#444' : '#222'};
        color: white;
        border: ${internalDebugPhase === phase.value ? '2px solid #666' : '2px solid #444'};
        padding: 8px 6px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 11px;
        font-weight: bold;
        white-space: nowrap;
        transition: all 0.2s;
      `;
      
      button.addEventListener('click', () => {
        console.log(`🚀 PHASE SELECTED: ${phase.name} (${phase.value})`);
        setInternalDebugPhase(phase.value); // This updates React state and moon lighting
        
        // Update visual selection
        buttonGrid.querySelectorAll('button').forEach(btn => {
          btn.style.background = '#222';
          btn.style.border = '2px solid #444';
        });
        button.style.background = '#444';
        button.style.border = '2px solid #666';
      });
      
      buttonGrid.appendChild(button);
    });
    
    hudContainer.appendChild(buttonGrid);
    
    // Status display
    const status = document.createElement('div');
    status.innerHTML = `Current: ${internalDebugPhase === null ? 'Auto' : internalDebugPhase}`;
    status.style.cssText = `
      margin-top: 8px;
      font-size: 10px;
      opacity: 0.7;
    `;
    hudContainer.appendChild(status);
    
    document.body.appendChild(hudContainer);
    
    return () => {
      if (document.body.contains(hudContainer)) {
        document.body.removeChild(hudContainer);
      }
    };
  }, [showDebugHUD, debugPhase, internalDebugPhase]);

  // WebGL error handler
  const handleWebGLError = React.useCallback(() => {
    console.warn('🚨 WebGL context lost - switching to fallback');
    setWebglError(true);
  }, []);
  
  // Fallback to CSS eclipse if needed
  if (fallbackToEclipse || !supportsWebGL || webglError) {
    return (
      <>
        {/* HUD OUTSIDE of any Canvas container */}
        {showDebugHUD && debugPhase === null && (
          <SimpleMoonHUD 
            currentPhase={internalDebugPhase}
            onPhaseChange={setInternalDebugPhase}
          />
        )}
        
        <div 
          className={`relative rounded-full flex items-center justify-center ${className}`}
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, rgba(20,20,20,1) 40%, rgba(20,20,20,0.5) 70%, rgba(0,0,0,0) 100%)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 80% 20%, rgba(0,0,0,0.35) 0%, transparent 50%)',
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }}
          ></div>
        </div>
      </>
    );
  }
  
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas 
        camera={{ 
          position: cameraPosition, 
          fov: cameraFOV,
          near: 1, // Adjusted near plane to prevent clipping
          far: 1000,
          zoom: 1.0, // Ensure zoom is fixed at 1.0
          aspect: 1 // Fixed aspect ratio for the circular viewport
        }} 
        orthographic={false} // Using perspective camera
        frameloop="always"
        dpr={[1, 2]}
        gl={{ 
          antialias: true, // Enable antialiasing
          alpha: true, // Enable alpha for transparent background
          preserveDrawingBuffer: true // Required for screenshot capture
        }}
        onCreated={({ gl, camera }) => {
          gl.domElement.addEventListener('webglcontextlost', handleWebGLError);
          
          // Enable high-quality rendering settings
          gl.physicallyCorrectLights = true;
          
          // Force camera to adopt initial position and FOV
          camera.position.set(...cameraPosition);
          camera.fov = cameraFOV;
          camera.updateProjectionMatrix();
          
          if (process.env.NODE_ENV === 'development') {
            console.log('🎥 Camera initialized:', { position: cameraPosition, fov: cameraFOV });
          }
        }}
      >
        <React.Suspense fallback={null}>
          <TexturePreloader />
          <CameraUpdater fov={cameraFOV} />
          <MoonScene debugPhase={activeDebugPhase} anomalyMode={anomalyMode} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

// Helper component to ensure camera updates properly
const CameraUpdater = ({ fov }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (camera) {
      camera.fov = fov;
      // Always maintain fixed position and aspect
      camera.aspect = 1; // Important for circular viewport
      camera.zoom = 1.0;
      camera.updateProjectionMatrix();
    }
  }, [camera, fov]);
  
  return null;
};

// Simple Working HUD Component
const SimpleMoonHUD = ({ currentPhase, onPhaseChange }) => {
  const phases = [
    { name: '🔄 Auto', value: null },
    { name: '🌑 New', value: 0.0 },
    { name: '🌒 Crescent', value: 0.15 },
    { name: '🌓 Quarter', value: 0.28 },
    { name: '🌔 Gibbous', value: 0.4 },
    { name: '🌕 Full', value: 0.5 },
    { name: '🌖 Waning', value: 0.6 },
    { name: '🌗 Last', value: 0.72 },
    { name: '🌘 Dark', value: 0.85 }
  ];

  const handleClick = (phase) => {
    console.log(`🚀 CLICKED: ${phase.name} (${phase.value})`);
    onPhaseChange(phase.value);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 999999,
      background: 'rgba(0,0,0,0.9)',
      padding: '16px',
      borderRadius: '12px',
      border: '2px solid #333',
      color: 'white',
      fontSize: '14px',
      fontFamily: 'monospace',
      pointerEvents: 'auto',
      userSelect: 'none'
    }}>
      <div style={{ marginBottom: '12px', fontWeight: 'bold', color: '#fff' }}>
        🌙 MOON PHASE CONTROL
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
        {phases.map(phase => (
          <button
            key={phase.name}
            onClick={() => handleClick(phase)}
            style={{
              background: currentPhase === phase.value ? '#444' : '#222',
              color: 'white',
              border: currentPhase === phase.value ? '2px solid #666' : '2px solid #444',
              padding: '8px 6px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {phase.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.7 }}>
        Current: {currentPhase === null ? 'Auto' : currentPhase}
      </div>
    </div>
  );
};

export default MoonSphere; 