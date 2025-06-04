// TILE-CAMERA.3 — Orbital Engine + Cinematic Zoom Control
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { Vector3, MathUtils } from 'three';

// Define cinematic camera paths
const CINEMATIC_PATHS = [
  { 
    position: [0, 50, 100], 
    lookAt: [0, 0, 0], 
    fov: 70,
    duration: 5 // seconds
  },
  { 
    position: [100, 20, -50], 
    lookAt: [0, 0, 0], 
    fov: 60,
    duration: 5 
  },
  { 
    position: [-80, 40, -80], 
    lookAt: [-250, 40, -350], // Earth position
    fov: 50,
    duration: 5 
  },
  { 
    position: [50, 10, 30], 
    lookAt: [15, 25, -85], // Jupiter position
    fov: 45,
    duration: 5 
  },
  { 
    position: [200, 60, 200], 
    lookAt: [250, 40, 350], // Nebula position
    fov: 65,
    duration: 5 
  }
];

// Helper function for cubic easing
const cubicEaseInOut = (t) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default function CameraController({
  cameraMode,
  targetObject,
  cameraSettings,
  objectPositions,
}) {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  
  // Add angle reference to track orbital position
  const angleRef = useRef(0);
  
  // Add state for cinematic mode
  const cinematicIndexRef = useRef(0);
  const cinematicTimeRef = useRef(0);
  const cinematicStartPosRef = useRef(new Vector3());
  const cinematicStartLookAtRef = useRef(new Vector3());
  const cinematicStartFovRef = useRef(50);
  
  // Add target FOV reference for smooth transitions
  const targetFovRef = useRef(cameraSettings?.fov || 50);
  
  // Track previous state to detect changes
  const prevModeRef = useRef(cameraMode);
  const prevTargetRef = useRef(targetObject);
  const initializedRef = useRef(false);
  
  // Store camera distance from target to detect manual zoom
  const lastDistanceRef = useRef(cameraSettings?.distance || 50);
  const manualZoomRef = useRef(false);

  // Get target coordinates with a safety fallback
  const getTargetCoords = (id) => {
    if (!id || !objectPositions || !objectPositions[id]) {
      return [0, 0, 0]; // Default position if target not found
    }
    return objectPositions[id];
  };
  
  // Handle target or mode changes
  useEffect(() => {
    if (!cameraSettings) return;
    
    // Detect mode changes
    if (prevModeRef.current !== cameraMode) {
      prevModeRef.current = cameraMode;
      
      // Reset cinematic sequence
      if (cameraMode === 'cinematic') {
        cinematicIndexRef.current = 0;
        cinematicTimeRef.current = 0;
      }
      
      // Reset manual zoom flag when mode changes
      manualZoomRef.current = false;
    }
    
    // Detect target changes
    if (prevTargetRef.current !== targetObject) {
      prevTargetRef.current = targetObject;
      
      // Reset angle on target change for better visual consistency
      if (targetObject) {
        angleRef.current = 0;
      }
      
      // Reset manual zoom flag when target changes
      manualZoomRef.current = false;
    }
    
    // Initialize controls target if not set
    if (controlsRef.current && !initializedRef.current) {
      if (targetObject) {
        const target = getTargetCoords(targetObject);
        controlsRef.current.target.set(...target);
      }
      initializedRef.current = true;
    }
    
    // Reset the last distance when settings change
    lastDistanceRef.current = cameraSettings.distance;
  }, [cameraMode, targetObject, objectPositions, cameraSettings]);
  
  // Update camera settings whenever they change
  useEffect(() => {
    if (!cameraSettings) return;
    
    // Update target FOV immediately
    targetFovRef.current = cameraSettings.fov;
    
    // Make sure to update the actual camera
    camera.fov = cameraSettings.fov;
    camera.updateProjectionMatrix();
  }, [cameraSettings, camera]);

  useFrame((state, delta) => {
    if (!controlsRef.current || !cameraSettings) return;
    
    // Skip updates if we're not in a valid mode
    if (!cameraMode) return;
    
    // Use capped delta to avoid jumps on low frame rates
    const cappedDelta = Math.min(delta, 0.1);
    
    const target = getTargetCoords(targetObject);
    const d = cameraSettings.distance || 50;
    const h = cameraSettings.height || 20;
    const tiltRad = MathUtils.degToRad(cameraSettings.tilt || 0);
    
    // Get the damping factor directly from settings
    const damping = cameraSettings.damping || 0.05;
    
    // Default overview position
    let desiredPos = new Vector3(0, 20, 50);

    if (cameraMode === 'orbit' && targetObject) {
      // Update orbit angle based on speed and delta time
      const orbitSpeed = Math.max(cameraSettings.orbitSpeed || 0.03, 0.01);
      angleRef.current += 0.03 * orbitSpeed * cappedDelta * 60;
      
      // Get target position
      const targetVector = new Vector3(...target);
      
      // Always update the controls target to point at the planet
      controlsRef.current.target.copy(targetVector);
      
      // Calculate orbital position using spherical coordinates
      desiredPos = new Vector3(
        target[0] + d * Math.cos(angleRef.current) * Math.cos(tiltRad),
        target[1] + h,
        target[2] + d * Math.sin(angleRef.current) * Math.cos(tiltRad)
      );
      
      // Apply direct lerp for movement
      camera.position.lerp(desiredPos, damping);
    } else if (cameraMode === 'overview') {
      // Set a fixed overview position
      camera.position.lerp(desiredPos, damping);
      controlsRef.current.target.set(0, 0, 0);
    } else if (cameraMode === 'free') {
      // Free camera mode - user has full control
      // Don't update camera position programmatically
      const targetFov = cameraSettings.fov;
      camera.fov = MathUtils.lerp(camera.fov, targetFov, 0.02);
      camera.updateProjectionMatrix();
    } else if (cameraMode === 'cinematic') {
      // Cinematic camera mode
      cinematicTimeRef.current += cappedDelta;
      
      const currentPath = CINEMATIC_PATHS[cinematicIndexRef.current];
      if (!currentPath) return;
      
      const progress = Math.min(cinematicTimeRef.current / currentPath.duration, 1);
      const easedProgress = cubicEaseInOut(progress);
      
      // Initialize start values on first frame of this path
      if (cinematicTimeRef.current === cappedDelta) {
        cinematicStartPosRef.current.copy(camera.position);
        cinematicStartLookAtRef.current.copy(controlsRef.current.target);
        cinematicStartFovRef.current = camera.fov;
      }
      
      // Interpolate position
      const targetPos = new Vector3(...currentPath.position);
      const currentPos = cinematicStartPosRef.current.clone().lerp(targetPos, easedProgress);
      camera.position.copy(currentPos);
      
      // Interpolate look-at target
      const targetLookAt = new Vector3(...currentPath.lookAt);
      const currentLookAt = cinematicStartLookAtRef.current.clone().lerp(targetLookAt, easedProgress);
      controlsRef.current.target.copy(currentLookAt);
      
      // Interpolate FOV
      camera.fov = MathUtils.lerp(
        cinematicStartFovRef.current,
        currentPath.fov,
        easedProgress
      );
      camera.updateProjectionMatrix();
      
      // Move to next path when current one completes
      if (progress >= 1) {
        cinematicIndexRef.current = (cinematicIndexRef.current + 1) % CINEMATIC_PATHS.length;
        cinematicTimeRef.current = 0;
      }
    }
    
    // Update controls
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping={true}
      dampingFactor={0.05}
      enableZoom={true}
      enableRotate={cameraMode === 'free'}
      enablePan={cameraMode === 'free'}
      minDistance={5}
      maxDistance={500}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
    />
  );
} 