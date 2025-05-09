import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import useAnimationFrame from './hooks/useAnimationFrame';

// Import shaders
import galaxyVertexShader from './shaders/galaxy.vert';
import galaxyFragmentShader from './shaders/galaxy.frag';
import trailsVertexShader from './shaders/trails.vert';
import trailsFragmentShader from './shaders/trails.frag';
import starsVertexShader from './shaders/stars.vert';
import starsFragmentShader from './shaders/stars.frag';

// LEGIT metadata declaration
export const metadata = {
  id: 'galaxy_journey_renderer',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_galaxy_journey.md'
};

/**
 * GalaxyRenderer - Three.js implementation of the galaxy visualization
 * Handles all WebGL rendering for the galaxy journey experience
 * 
 * @param {Object} props
 * @param {number} props.width - Canvas width in pixels
 * @param {number} props.height - Canvas height in pixels
 * @param {Object} props.sceneData - Current scene information
 * @param {string} props.sceneData.scene - Active scene name
 * @param {number} props.sceneData.progress - Progress within current scene (0-1)
 * @param {boolean} props.sceneData.isExploding - Whether explosion effect is active
 * @param {number} props.sceneData.explosionProgress - Explosion effect progress (0-1)
 * @param {number} props.sceneData.scrollPosition - Current scroll position in vh
 * @param {number} props.scrollProgress - Overall scroll progress (0-1)
 * @param {Object} props.options - Optional visual parameters
 */
const GalaxyRenderer = ({
  width,
  height,
  sceneData,
  scrollProgress,
  options = {}
}) => {
  // Setup refs
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const galaxyRef = useRef(null);
  const trailsRef = useRef(null);
  const starsRef = useRef(null);
  const starContainerRef = useRef(null); // Added ref for star container
  
  const { scene, progress, isExploding, explosionProgress, scrollPosition } = sceneData;
  
  // Get device capability for performance adjustment
  const isMobile = useMemo(() => window.innerWidth < 768, []);
  const isLowPerfDevice = useMemo(() => {
    // Simple heuristic for lower end devices
    return (
      isMobile || 
      navigator.hardwareConcurrency <= 4 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }, [isMobile]);
  
  // Adjust particle counts based on device capability
  const particleCounts = useMemo(() => {
    const reduction = isLowPerfDevice ? 0.4 : 1.0;
    
    return {
      starCount: Math.floor((options.starCount || 3000) * reduction),
      galaxyCount: Math.floor((options.galaxyCount || 15000) * reduction),
      trailCount: Math.floor((options.trailCount || 5000) * reduction) 
    };
  }, [isLowPerfDevice, options]);
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;
    
    // Create renderer with proper settings for performance
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isLowPerfDevice, // Disable antialiasing on low-end devices
      alpha: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(width, height);
    const pixelRatio = Math.min(window.devicePixelRatio, isLowPerfDevice ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);
    rendererRef.current = renderer;
    
    // Initialize particle systems
    createStarField(pixelRatio);
    createGalaxy(pixelRatio);
    createTrails(pixelRatio);
    
    // Clean up on unmount
    return () => {
      disposeResources();
    };
  }, [width, height, isLowPerfDevice, particleCounts]);
  
  // Handle resize
  useEffect(() => {
    if (!cameraRef.current || !rendererRef.current) return;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    
    rendererRef.current.setSize(width, height);
  }, [width, height]);
  
  // Create star field (background stars)
  const createStarField = (pixelRatio) => {
    if (!sceneRef.current) return;
    
    const geometry = new THREE.BufferGeometry();
    const { starCount } = particleCounts;
    
    // Create arrays for attributes
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const randomOffsets = new Float32Array(starCount);
    
    // Initialize attributes - fixed background stars
    for (let i = 0; i < starCount; i++) {
      // Position (spherical distribution around origin)
      const radius = 100 + Math.random() * 100; // Large radius to create depth
      const theta = Math.random() * Math.PI * 2; // Around the sphere
      const phi = Math.acos(2 * Math.random() - 1); // Distribute evenly
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color (stars with slight color variation)
      const starType = Math.random();
      if (starType > 0.95) {
        // Blue-white stars (rare, bright)
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 1.0;
      } else if (starType > 0.9) {
        // Yellow stars
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      } else if (starType > 0.85) {
        // Red stars
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.5 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.5 + Math.random() * 0.2;
      } else {
        // White stars (most common)
        const brightness = 0.8 + Math.random() * 0.2;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness;
      }
      
      // Size - varied for stars
      // Some larger stars for visual interest
      const sizeRandom = Math.random();
      if (sizeRandom > 0.99) {
        // Very rare large stars (like 1%)
        sizes[i] = 3.0 + Math.random() * 2.0;
      } else if (sizeRandom > 0.95) {
        // Uncommon medium stars (like 4%)
        sizes[i] = 2.0 + Math.random();
      } else {
        // Most stars are small (95%)
        sizes[i] = 0.5 + Math.random() * 1.0; // Slightly larger to be more visible
      }
      
      // Random offset for twinkling
      randomOffsets[i] = Math.random() * 100;
    }
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 1));
    
    // Create material with custom shader for stars
    const material = new THREE.ShaderMaterial({
      vertexShader: starsVertexShader,
      fragmentShader: starsFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Create mesh and add to scene directly
    const stars = new THREE.Points(geometry, material);
    starsRef.current = stars;
    sceneRef.current.add(stars);
  };
  
  // Create galaxy particles
  const createGalaxy = (pixelRatio) => {
    if (!sceneRef.current) return;
    
    const geometry = new THREE.BufferGeometry();
    const { galaxyCount } = particleCounts;
    
    // Create arrays for attributes
    const positions = new Float32Array(galaxyCount * 3);
    const colors = new Float32Array(galaxyCount * 3);
    const sizes = new Float32Array(galaxyCount);
    const randomness = new Float32Array(galaxyCount * 3);
    const formationFactors = new Float32Array(galaxyCount);
    const explosionFactors = new Float32Array(galaxyCount);
    
    // Spiral galaxy parameters
    const arms = 2; // Number of spiral arms
    const armSpread = 0.4; // Spread of particles around arms
    const spiralTightness = 4.0; // How tight the spiral is
    
    // Initialize attributes
    for (let i = 0; i < galaxyCount; i++) {
      // Determine which arm this particle belongs to
      const armIndex = Math.floor(Math.random() * arms);
      const armAngle = (armIndex / arms) * Math.PI * 2;
      
      // Calculate radius (more particles in outer areas)
      const radius = Math.random() * 15;
      
      // Calculate angle based on radius and arm
      const spinAngle = radius * 0.5;
      const branchAngle = spinAngle + armAngle;
      
      // Base positions (perfect spiral)
      positions[i * 3] = Math.cos(branchAngle) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(branchAngle) * radius;
      
      // Add randomness to each particle position
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * armSpread;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * armSpread;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * armSpread;
      
      randomness[i * 3] = randomX;
      randomness[i * 3 + 1] = randomY;
      randomness[i * 3 + 2] = randomZ;
      
      // Color based on arm and distance from center
      const colorOptions = [
        new THREE.Color('#8e44ad'),  // Purple
        new THREE.Color('#2980b9'),  // Blue
        new THREE.Color('#f39c12'),  // Yellow
        new THREE.Color('#d35400')   // Orange
      ];
      
      const mixedColor = colorOptions[armIndex % colorOptions.length];
      const colorVariation = 0.3; // How much color can vary
      
      colors[i * 3] = mixedColor.r * (1 + (Math.random() - 0.5) * colorVariation);
      colors[i * 3 + 1] = mixedColor.g * (1 + (Math.random() - 0.5) * colorVariation);
      colors[i * 3 + 2] = mixedColor.b * (1 + (Math.random() - 0.5) * colorVariation);
      
      // Size
      sizes[i] = Math.random() * 1.5 + 0.5;
      
      // Formation factor (determines when this particle appears during formation)
      formationFactors[i] = Math.random();
      
      // Explosion factor (determines how much this particle moves during explosion)
      const distFromCenter = Math.sqrt(positions[i * 3]**2 + positions[i * 3 + 1]**2 + positions[i * 3 + 2]**2);
      explosionFactors[i] = Math.max(0.3, 1.0 - distFromCenter / 15);
    }
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));
    geometry.setAttribute('aFormationFactor', new THREE.BufferAttribute(formationFactors, 1));
    geometry.setAttribute('aExplosionFactor', new THREE.BufferAttribute(explosionFactors, 1));
    
    // Create material with custom shader
    const material = new THREE.ShaderMaterial({
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 15.0 },
        uPixelRatio: { value: pixelRatio },
        uCompactFactor: { value: 0.3 }, // How compact the galaxy is
        uFormationProgress: { value: 0.0 }, // Controls formation animation (0-1)
        uExplosionProgress: { value: 0.0 }, // Controls explosion animation (0-1)
        uDistanceFactor: { value: 40.0 }, // Controls z-distance
        uRotationSpeed: { value: 0.1 }, // Controls rotation speed
        uOpacity: { value: 0.6 }, // Controls overall opacity
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    
    // Create mesh and add to scene
    const galaxy = new THREE.Points(geometry, material);
    galaxyRef.current = galaxy;
    sceneRef.current.add(galaxy);
  };
  
  // Create trail particles
  const createTrails = (pixelRatio) => {
    if (!sceneRef.current) return;
    
    const geometry = new THREE.BufferGeometry();
    const { trailCount } = particleCounts;
    
    // Create arrays for attributes
    const positions = new Float32Array(trailCount * 3);
    const colors = new Float32Array(trailCount * 3);
    const sizes = new Float32Array(trailCount);
    const velocities = new Float32Array(trailCount * 3);
    
    // Initialize attributes
    for (let i = 0; i < trailCount; i++) {
      // Position (around viewer, but behind)
      const radius = Math.random() * 50 + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = -100 - Math.random() * 50; // Behind viewer
      
      // Color (blues for trails)
      colors[i * 3] = 0.2 + Math.random() * 0.2; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      
      // Size
      sizes[i] = 1.0 + Math.random() * 2.0;
      
      // Velocity vector (toward camera with slight spread)
      velocities[i * 3] = (Math.random() - 0.5) * 0.2; // X
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2; // Y
      velocities[i * 3 + 2] = Math.random() * 0.5 + 0.5;   // Z (mostly toward camera)
    }
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    
    // Create material with custom shader
    const material = new THREE.ShaderMaterial({
      vertexShader: trailsVertexShader,
      fragmentShader: trailsFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 30.0 },
        uPixelRatio: { value: pixelRatio },
        uTrailIntensity: { value: 0.0 } // Controls trail visibility
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    
    // Create mesh and add to scene
    const trails = new THREE.Points(geometry, material);
    trailsRef.current = trails;
    trails.visible = false; // Start invisible
    sceneRef.current.add(trails);
  };
  
  // Animation callback
  const animate = (deltaTime, time) => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Update galaxy based on scene
    updateSceneEffects(time, deltaTime);
    
    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };
  
  // Update scene effects based on current scene/scroll position
  const updateSceneEffects = (time, deltaTime) => {
    if (!galaxyRef.current || !trailsRef.current || !starsRef.current) return;
    
    // Galaxy updates
    const timeSeconds = time / 1000;
    
    // Update all shader uniforms
    // Galaxy uniforms
    if (galaxyRef.current.material.uniforms) {
      galaxyRef.current.material.uniforms.uTime.value = time;
    }
    
    // Trail uniforms
    if (trailsRef.current.material.uniforms) {
      trailsRef.current.material.uniforms.uTime.value = time;
    }
    
    // Star uniforms - update the time for twinkling effect
    if (starsRef.current.material.uniforms) {
      starsRef.current.material.uniforms.uTime.value = time;
    }
    
    // Target values based on current scene
    let targetOpacity = 0.6;
    let targetCompactFactor = 0.3;
    let targetFormationProgress = 0.0;
    let targetExplosionProgress = 0.0;
    let targetDistanceFactor = 40.0;
    let targetRotationSpeed = 0.0;
    let targetTrailIntensity = 0.0;
    
    // Scene-specific parameters
    switch (scene) {
      case 'dormant':
        // Small distant galaxy
        targetOpacity = 0.6 + progress * 0.2;
        targetCompactFactor = 0.3;
        targetFormationProgress = 0.0;
        targetDistanceFactor = 40.0 - progress * 10.0;
        targetRotationSpeed = 0.1 + progress * 0.2;
        targetTrailIntensity = 0;
        
        // Trails not visible
        trailsRef.current.visible = false;
        break;
        
      case 'awakening':
        // Galaxy approaches with trails appearing
        targetOpacity = 0.8 + progress * 0.2;
        targetCompactFactor = 0.3 + progress * 0.2;
        targetFormationProgress = progress * 0.3;
        targetDistanceFactor = 30.0 - progress * 30.0;
        targetRotationSpeed = 0.3 + progress * 0.7; // Faster rotation
        targetTrailIntensity = progress; // Trails appear
        
        // Make trails visible
        trailsRef.current.visible = true;
        break;
        
      case 'cosmicReveal':
        // Galaxy explodes and forms
        targetOpacity = 1.0;
        targetCompactFactor = 0.5 + progress * 0.5;
        targetFormationProgress = 0.3 + progress * 0.7;
        targetDistanceFactor = 0;
        
        // Explosion happens at 115-125vh
        if (isExploding) {
          // During explosion
          targetExplosionProgress = explosionProgress;
          targetRotationSpeed = 1.0 + explosionProgress * 2.0; // Rapid rotation
        } else if (explosionProgress >= 1) {
          // After explosion
          targetExplosionProgress = 1.0 - (progress - 0.2) * 1.25; // Fade out
          targetExplosionProgress = Math.max(0, targetExplosionProgress);
          targetRotationSpeed = 3.0 - (progress - 0.2) * 2.5; // Slow down
        } else {
          // Before explosion
          targetRotationSpeed = 1.0;
        }
        
        // Trails fade out as galaxy forms
        targetTrailIntensity = Math.max(0, 1.0 - progress);
        trailsRef.current.visible = targetTrailIntensity > 0.01;
        break;
        
      case 'cosmicFlight':
        // Stable galaxy with variations
        targetOpacity = 1.0;
        targetCompactFactor = 1.0;
        targetFormationProgress = 1.0;
        targetDistanceFactor = 0;
        
        // Cycle rotation speed for interest
        targetRotationSpeed = 0.5 + Math.sin(progress * Math.PI * 2) * 0.3;
        
        // Trails are gone
        targetTrailIntensity = 0;
        trailsRef.current.visible = false;
        break;
    }
    
    // Apply smooth transitions with linear interpolation
    const lerpFactor = 0.05;
    
    // Update galaxy uniforms
    if (galaxyRef.current.material.uniforms) {
      const uniforms = galaxyRef.current.material.uniforms;
      
      uniforms.uOpacity.value += (targetOpacity - uniforms.uOpacity.value) * lerpFactor;
      uniforms.uCompactFactor.value += (targetCompactFactor - uniforms.uCompactFactor.value) * lerpFactor;
      uniforms.uFormationProgress.value += (targetFormationProgress - uniforms.uFormationProgress.value) * lerpFactor;
      uniforms.uExplosionProgress.value += (targetExplosionProgress - uniforms.uExplosionProgress.value) * lerpFactor;
      uniforms.uDistanceFactor.value += (targetDistanceFactor - uniforms.uDistanceFactor.value) * lerpFactor;
      uniforms.uRotationSpeed.value += (targetRotationSpeed - uniforms.uRotationSpeed.value) * lerpFactor;
    }
    
    // Update trail uniforms
    if (trailsRef.current.material.uniforms && trailsRef.current.visible) {
      trailsRef.current.material.uniforms.uTrailIntensity.value += 
        (targetTrailIntensity - trailsRef.current.material.uniforms.uTrailIntensity.value) * lerpFactor;
    }
    
    // Update camera position for each scene
    if (cameraRef.current) {
      let cameraX = 0;
      let cameraY = 0;
      let cameraZ = 30;
      
      switch (scene) {
        case 'dormant':
          // Gentle floating camera
          cameraX = Math.sin(timeSeconds * 0.5) * 3;
          cameraY = Math.cos(timeSeconds * 0.3) * 2;
          cameraZ = 30;
          break;
          
        case 'awakening':
          // More dynamic movement
          cameraX = Math.sin(timeSeconds * 0.7) * 5 * progress;
          cameraY = Math.cos(timeSeconds * 0.5) * 3 * progress;
          cameraZ = 30 - progress * 5;
          break;
          
        case 'cosmicReveal':
          // Wider camera movement
          cameraX = Math.sin(timeSeconds * 0.3) * 8;
          cameraY = Math.cos(timeSeconds * 0.2) * 5;
          cameraZ = 25;
          
          // Camera shake during explosion
          if (isExploding) {
            const shakeIntensity = Math.sin(explosionProgress * Math.PI) * 2;
            cameraX += (Math.random() - 0.5) * shakeIntensity;
            cameraY += (Math.random() - 0.5) * shakeIntensity;
            cameraZ += (Math.random() - 0.5) * shakeIntensity;
          }
          break;
          
        case 'cosmicFlight':
          // Smooth orbital camera
          const circleRadius = 15 + Math.sin(progress * Math.PI * 2) * 5;
          const circleSpeed = 0.1 + Math.sin(progress * Math.PI) * 0.05;
          const circleAngle = timeSeconds * circleSpeed;
          
          cameraX = Math.sin(circleAngle) * circleRadius;
          cameraY = Math.cos(circleAngle) * circleRadius * 0.6;
          cameraZ = 20 + Math.sin(timeSeconds * 0.2) * 5;
          break;
      }
      
      // Apply camera position with smooth lerp
      cameraRef.current.position.x += (cameraX - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (cameraY - cameraRef.current.position.y) * 0.05;
      cameraRef.current.position.z += (cameraZ - cameraRef.current.position.z) * 0.05;
      
      // Always look at center
      cameraRef.current.lookAt(0, 0, 0);
    }
  };
  
  // Clean up Three.js resources
  const disposeResources = () => {
    // Dispose galaxy
    if (galaxyRef.current) {
      galaxyRef.current.geometry.dispose();
      galaxyRef.current.material.dispose();
      sceneRef.current?.remove(galaxyRef.current);
    }
    
    // Dispose trails
    if (trailsRef.current) {
      trailsRef.current.geometry.dispose();
      trailsRef.current.material.dispose();
      sceneRef.current?.remove(trailsRef.current);
    }
    
    // Dispose stars
    if (starsRef.current) {
      starsRef.current.geometry.dispose();
      starsRef.current.material.dispose();
      sceneRef.current?.remove(starsRef.current);
    }
    
    // Dispose renderer
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
  };
  
  // Start animation loop
  useAnimationFrame(animate, true, isLowPerfDevice ? 30 : 0); // Limit FPS on low-end devices
  
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  );
};

export default GalaxyRenderer; 