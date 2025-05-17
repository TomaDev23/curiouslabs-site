// TILE-CAMERA.3 — Orbital Engine + Cinematic Zoom Control
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

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
  const cinematicStartPosRef = useRef(new THREE.Vector3());
  const cinematicStartLookAtRef = useRef(new THREE.Vector3());
  const cinematicStartFovRef = useRef(50);
  
  // Add target FOV reference for smooth transitions
  const targetFovRef = useRef(cameraSettings.fov);
  
  // Track previous state to detect changes
  const prevModeRef = useRef(cameraMode);
  const prevTargetRef = useRef(targetObject);
  const initializedRef = useRef(false);
  
  // Store camera distance from target to detect manual zoom
  const lastDistanceRef = useRef(cameraSettings.distance);
  const manualZoomRef = useRef(false);

  // Get target coordinates with a safety fallback
  const getTargetCoords = (id) => {
    if (!id || !objectPositions || !objectPositions[id]) {
      return [0, 0, 0]; // Default position if target not found
    }
    console.log(`Getting target coords for ${id}:`, objectPositions[id]);
    return objectPositions[id];
  };
  
  // Handle target or mode changes
  useEffect(() => {
    // Detect mode changes
    if (prevModeRef.current !== cameraMode) {
      console.log(`Camera mode changed from ${prevModeRef.current} to ${cameraMode}`);
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
      console.log(`Target object changed from ${prevTargetRef.current} to ${targetObject}`);
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
  }, [cameraMode, targetObject, objectPositions, cameraSettings.distance]);
  
  // Update camera settings whenever they change
  useEffect(() => {
    // Update target FOV immediately
    targetFovRef.current = cameraSettings.fov;
    
    // Make sure to update the actual camera
    camera.fov = cameraSettings.fov;
    camera.updateProjectionMatrix();
    
    console.log('Camera settings updated:', cameraSettings);
  }, [cameraSettings, camera]);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;
    
    // Skip updates if we're not in a valid mode or don't have proper targets
    if (!cameraMode || (cameraMode === 'orbit' && !targetObject)) return;
    
    // Use capped delta to avoid jumps on low frame rates
    const cappedDelta = Math.min(delta, 0.1);
    
    const target = getTargetCoords(targetObject);
    const d = cameraSettings.distance;
    const h = cameraSettings.height;
    const tiltRad = THREE.MathUtils.degToRad(cameraSettings.tilt);
    
    // Get the damping factor directly from settings
    const damping = cameraSettings.damping || 0.05;
    
    // Check if the user has manually zoomed
    if (cameraMode === 'orbit' && targetObject) {
      // Calculate current distance from camera to target
      const targetVector = new THREE.Vector3(...target);
      const currentDistance = camera.position.distanceTo(targetVector);
      
      // If the distance has changed significantly and not due to settings changes
      if (Math.abs(currentDistance - lastDistanceRef.current) > 0.5) {
        // Set the manual zoom flag
        manualZoomRef.current = true;
        lastDistanceRef.current = currentDistance;
      }
    }
    
    // Default overview position
    let desiredPos = new THREE.Vector3(0, 20, 50);

    if (cameraMode === 'orbit' && targetObject) {
      // Update orbit angle based on speed and delta time
      const orbitSpeed = Math.max(cameraSettings.orbitSpeed || 0.03, 0.01);
      angleRef.current += 0.03 * orbitSpeed * cappedDelta * 60;
      
      // Get target position
      const targetVector = new THREE.Vector3(...target);
      
      // Always update the controls target to point at the planet
      controlsRef.current.target.copy(targetVector);
      
      // If manual zoom is active, don't update the camera position automatically
      if (!manualZoomRef.current) {
        // Calculate orbital position using spherical coordinates
        desiredPos = new THREE.Vector3(
          target[0] + d * Math.cos(angleRef.current) * Math.cos(tiltRad),
          target[1] + h,
          target[2] + d * Math.sin(angleRef.current) * Math.cos(tiltRad)
        );
        
        // Apply direct lerp for movement
        camera.position.lerp(desiredPos, damping);
      } else {
        // Use a modified orbit that keeps the current distance but updates angle
        const currentDistance = camera.position.distanceTo(targetVector);
        
        // Calculate new position at current distance but updated angle
        desiredPos = new THREE.Vector3(
          target[0] + currentDistance * Math.cos(angleRef.current) * Math.cos(tiltRad),
          target[1] + h, // Keep the height setting
          target[2] + currentDistance * Math.sin(angleRef.current) * Math.cos(tiltRad)
        );
        
        // Apply direct lerp for movement
        camera.position.lerp(desiredPos, damping);
      }
    }
    else if (cameraMode === 'cinematic-orbit' && targetObject) {
      // Similar to orbit but with automatic FOV changes and height variations
      // Use a slower orbit speed for cinematic effect
      const orbitSpeed = Math.max(cameraSettings.orbitSpeed || 0.05, 0.01) * 0.3;
      angleRef.current += 0.05 * orbitSpeed * cappedDelta * 60;
      
      // Add slight vertical oscillation for cinematic effect
      const timeOffset = state.clock.elapsedTime * 0.2;
      const heightOffset = Math.sin(timeOffset) * 5;
      
      // Calculate orbital position with cinematic enhancements
      desiredPos = new THREE.Vector3(
        target[0] + d * Math.cos(angleRef.current) * Math.cos(tiltRad),
        target[1] + h + heightOffset,
        target[2] + d * Math.sin(angleRef.current) * Math.cos(tiltRad)
      );
      
      // Apply direct lerp for movement (slower for cinematic)
      camera.position.lerp(desiredPos, damping * 0.7);
      
      // Always look at target with smooth lerp
      const targetPos = new THREE.Vector3(...target);
      controlsRef.current.target.lerp(targetPos, damping * 0.7);
      
      // Slowly vary FOV for cinematic effect
      const targetFov = 50 + Math.sin(timeOffset * 0.5) * 5; // Oscillate between 45-55
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.02);
      camera.updateProjectionMatrix();
    }
    else if (cameraMode === 'cinematic') {
      // Update time
      cinematicTimeRef.current += cappedDelta;
      
      // Get current keyframe
      const currentFrame = CINEMATIC_PATHS[cinematicIndexRef.current];
      const duration = currentFrame.duration;
      
      // Calculate progress (0 to 1) with cubic easing
      const progress = Math.min(cinematicTimeRef.current / duration, 1);
      const easedProgress = cubicEaseInOut(progress);
      
      // If we need to initialize the start position
      if (progress === 0) {
        cinematicStartPosRef.current.copy(camera.position);
        cinematicStartLookAtRef.current.copy(controlsRef.current.target);
        cinematicStartFovRef.current = camera.fov;
      }
      
      // Interpolate position directly
      const targetPos = new THREE.Vector3(...currentFrame.position);
      camera.position.lerpVectors(
        cinematicStartPosRef.current,
        targetPos,
        easedProgress
      );
      
      // Interpolate look target directly
      const targetLookAt = new THREE.Vector3(...currentFrame.lookAt);
      controlsRef.current.target.lerpVectors(
        cinematicStartLookAtRef.current,
        targetLookAt,
        easedProgress
      );
      
      // Interpolate FOV
      camera.fov = THREE.MathUtils.lerp(
        cinematicStartFovRef.current,
        currentFrame.fov,
        easedProgress
      );
      camera.updateProjectionMatrix();
      
      // Move to next keyframe if current is complete
      if (progress >= 1) {
        cinematicTimeRef.current = 0;
        cinematicIndexRef.current = (cinematicIndexRef.current + 1) % CINEMATIC_PATHS.length;
      }
    }
    else {
      // Overview mode - smooth camera movement with damping
      camera.position.lerp(desiredPos, damping);
      
      // Look at center
      controlsRef.current.target.lerp(
        new THREE.Vector3(0, 0, 0), 
        damping
      );
    }
    
    // Apply FOV changes with damping if not in cinematic modes
    if (cameraMode !== 'cinematic' && cameraMode !== 'cinematic-orbit') {
      camera.fov = THREE.MathUtils.lerp(
        camera.fov,
        targetFovRef.current,
        damping * 2
      );
      camera.updateProjectionMatrix();
    }
    
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.2}
      enableRotate={false}
      enableZoom={true}
      enablePan={false}
      zoomSpeed={0.5}
      minDistance={1}
      maxDistance={200}
    />
  );
} 