import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Metadata for LEGIT compliance
const metadata = {
  id: 'global_particle_system',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_global_particles.md'
};

/**
 * GlobalParticleSystem - Manages shared Three.js particle effects across the entire cosmic journey
 * 
 * This component creates a single WebGL context that handles:
 * 1. A persistent star field that spans the entire journey (0-550vh)
 * 2. Scene-specific particle effects that activate at different scroll positions
 * 3. Smooth transitions between different visual states
 * 
 * @param {Object} props
 * @param {number} props.scrollProgress - Global scroll progress from 0 to 1
 * @param {string} props.activeScene - Current active scene key from the journey controller
 * @param {number} props.sceneProgress - Progress within the current scene from 0 to 1
 */
export default function GlobalParticleSystem({ 
  scrollProgress = 0,
  activeScene = 'dormant',
  sceneProgress = 0
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  const starsRef = useRef(null);
  const starDustRef = useRef(null);
  const galaxyRef = useRef(null);
  const cosmicEffectsRef = useRef(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    
    // Initialize particle systems
    initializeStarField();
    initializeStarDust();
    initializeGalaxyEffects();
    initializeCosmicEffects();
    
    // Handle resizing
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Update any size-dependent uniforms
      if (starsRef.current) {
        starsRef.current.uniforms.pixelRatio.value = renderer.getPixelRatio();
      }
      
      if (galaxyRef.current) {
        galaxyRef.current.uniforms.pixelRatio.value = renderer.getPixelRatio();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let lastTime = 0;
    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      
      const animationId = requestAnimationFrame(animate);
      
      // Update all particle systems
      updateStarField(time / 1000, delta);
      updateStarDust(time / 1000, delta);
      updateGalaxyEffects(time / 1000, delta);
      updateCosmicEffects(time / 1000, delta);
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate(0);
    setIsInitialized(true);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose all Three.js resources
      disposeResources();
    };
  }, []);
  
  // Initialize star field - spans entire journey
  const initializeStarField = () => {
    if (!sceneRef.current || !rendererRef.current) return;
    
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    
    // Create star field geometry
    const geometry = new THREE.BufferGeometry();
    const count = 2500; // A good balance between visual density and performance
    
    // Create arrays for star attributes
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randomOffsets = new Float32Array(count);
    const starDistances = new Float32Array(count);
    
    // Star distribution based on a spherical coordinate system
    // This creates a field of stars around the viewer
    for (let i = 0; i < count; i++) {
      // Use spherical distribution but with more stars toward the center of view
      const radius = 80 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2; // Around the sphere
      const phi = Math.acos(2 * Math.pow(Math.random(), 0.4) - 1); // Distribute with bias toward center
      
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
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 1));
    geometry.setAttribute('distance', new THREE.BufferAttribute(starDistances, 1));
    
    // Custom shader material for stars
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() },
        globalOpacity: { value: 0.4 }, // Increased from 0.2
        starDensity: { value: 0.8 },   // Increased from 0.7
        cosmicIntensity: { value: 0.1 }, // Increased from 0.0
        baseSize: { value: 1.5 }       // Increased from 1.0
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute float randomOffset;
        attribute float distance;
        
        uniform float time;
        uniform float pixelRatio;
        uniform float globalOpacity;
        uniform float starDensity;
        uniform float cosmicIntensity;
        uniform float baseSize;
        
        varying vec3 vColor;
        varying float vOpacity;
        
        // A function to determine if a star should be visible based on density
        float isVisible(float index, float density) {
          // The higher the density, the more stars are visible
          return step(1.0 - density, fract(index * 0.1));
        }
        
        void main() {
          vColor = color;
          
          // Determine base visibility based on star density
          float visibility = isVisible(randomOffset, starDensity);
          
          // Calculate distance-based effects
          float distanceFactor = smoothstep(0.0, 100.0, distance);
          
          // Almost static stars with just the tiniest hint of animation
          float twinkleSpeed = 0.02 + distanceFactor * 0.01; // Drastically reduced from 0.1
          float twinkleAmount = 0.03 + cosmicIntensity * 0.02; // Drastically reduced from 0.1
          
          // Use a combination of sine waves for extremely subtle breathing effect
          float primaryTwinkle = sin(time * twinkleSpeed + randomOffset);
          float secondaryTwinkle = sin(time * twinkleSpeed * 0.2 + randomOffset * 1.3) * 0.3; // Slowed secondary wave too
          float combinedTwinkle = mix(primaryTwinkle, secondaryTwinkle, 0.2);
          
          // Apply the twinkle effect with barely noticeable intensity
          float twinkle = combinedTwinkle * twinkleAmount + (1.0 - twinkleAmount);
          
          // Cosmic scene enhancement - stars move slightly
          vec3 modPosition = position;
          if (cosmicIntensity > 0.0) {
            // Add extremely subtle motion to closer stars in cosmic scenes
            float motionScale = (1.0 - distanceFactor) * cosmicIntensity * 0.05; // Reduced from 0.2
            modPosition.x += sin(time * 0.03 + randomOffset) * motionScale; // Slowed from 0.1
            modPosition.y += cos(time * 0.04 + randomOffset * 1.4) * motionScale; // Slowed from 0.15
          }
          
          // Transform and project
          vec4 mvPosition = modelViewMatrix * vec4(modPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size calculation with twinkle effect
          float finalSize = size * baseSize * pixelRatio * twinkle;
          
          // Cosmic scenes make stars slightly larger
          finalSize *= (1.0 + cosmicIntensity * 0.5); // Increased from 0.3
          
          // Set point size
          gl_PointSize = finalSize * visibility;
          
          // Calculate final opacity for fragment shader
          vOpacity = globalOpacity * visibility * (1.0 + cosmicIntensity * 0.5);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          // Create circular points with soft edges
          vec2 uv = gl_PointCoord.xy - 0.5;
          float radius = length(uv);
          float alpha = smoothstep(0.5, 0.3, radius) * vOpacity;
          
          // Add a more pronounced glow effect for brighter stars
          float glowStrength = dot(vColor, vec3(0.299, 0.587, 0.114)) > 0.8 ? 1.0 : 0.8;
          alpha = max(alpha, (1.0 - smoothstep(0.3, 1.0, radius) * 0.7) * vOpacity * glowStrength);
          
          // Output color with calculated alpha
          gl_FragColor = vec4(vColor, alpha);
          
          // Discard fragments outside the radius to avoid rendering issues
          if (radius > 0.5) discard;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Create points and add to scene
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
    
    // Store references for updates and cleanup
    starsRef.current = {
      points: stars,
      uniforms: material.uniforms,
      geometry: geometry
    };
    
    console.log('Star field initialized with', count, 'stars');
  };
  
  // Initialize star dust - tiny particles to simulate Milky Way dust/haze
  const initializeStarDust = () => {
    if (!sceneRef.current || !rendererRef.current) return;
    
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    
    // Create star dust geometry - many more tiny particles
    const geometry = new THREE.BufferGeometry();
    const count = 15000; // Much higher count for dust effect
    
    // Create arrays for star dust attributes
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randomOffsets = new Float32Array(count);
    const layers = new Float32Array(count); // Which layer the dust belongs to
    
    // Create several concentrated "clouds" of dust
    const cloudCenters = [
      { x: 0, y: 5, z: -10, radius: 40, color: { r: 0.7, g: 0.8, b: 1.0 } }, // Bluish cloud
      { x: -10, y: -3, z: -15, radius: 50, color: { r: 1.0, g: 0.9, b: 0.7 } }, // Yellowish cloud
      { x: 10, y: -8, z: -5, radius: 45, color: { r: 0.9, g: 0.7, b: 1.0 } }, // Purplish cloud
      { x: 5, y: 10, z: -8, radius: 60, color: { r: 0.7, g: 1.0, b: 0.9 } }, // Cyan cloud
    ];
    
    // Distribute particles in the "dust" clouds with some randomness
    for (let i = 0; i < count; i++) {
      // Decide which cloud this dust particle belongs to
      const cloudIndex = Math.floor(Math.pow(Math.random(), 2) * cloudCenters.length);
      const cloud = cloudCenters[cloudIndex];
      
      // Random distance from center with gaussian-like distribution
      const distance = Math.pow(Math.random(), 0.5) * cloud.radius;
      
      // Random direction (spherical coordinates)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Calculate position with some stretching to create a disk-like shape
      let x = distance * Math.sin(phi) * Math.cos(theta);
      let y = distance * Math.sin(phi) * Math.sin(theta) * 0.3; // Flatten in y
      let z = distance * Math.cos(phi);
      
      // Add cloud center position
      x += cloud.x;
      y += cloud.y;
      z += cloud.z;
      
      // Store position
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color - use cloud's base color with slight variations
      const colorVariation = 0.1;
      colors[i * 3] = cloud.color.r - colorVariation/2 + Math.random() * colorVariation;
      colors[i * 3 + 1] = cloud.color.g - colorVariation/2 + Math.random() * colorVariation;
      colors[i * 3 + 2] = cloud.color.b - colorVariation/2 + Math.random() * colorVariation;
      
      // Size - all very small
      sizes[i] = 0.5 + Math.random() * 0.8;
      
      // Random offset for animation
      randomOffsets[i] = Math.random() * 100;
      
      // Assign to one of three layers for depth effect
      layers[i] = Math.floor(Math.random() * 3);
    }
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 1));
    geometry.setAttribute('layer', new THREE.BufferAttribute(layers, 1));
    
    // Custom shader material for star dust
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() },
        globalOpacity: { value: 0.6 },
        baseSize: { value: 1.8 },
        cosmicIntensity: { value: 0.2 } // Controls intensity during cosmic scenes
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute float randomOffset;
        attribute float layer;
        
        uniform float time;
        uniform float pixelRatio;
        uniform float globalOpacity;
        uniform float baseSize;
        uniform float cosmicIntensity;
        
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          
          // Use layer for subtle depth movement
          float layerOffset = layer * 0.1;
          float layerSpeed = 0.05 + layer * 0.02;
          
          // Apply subtle motion based on layer
          vec3 modPosition = position;
          
          // Cosmic scene enhancement - more motion
          float motionIntensity = 0.1 + cosmicIntensity * 0.4;
          
          // Each layer moves differently
          if (layer < 1.0) {
            // Layer 0 - slowest, nearest
            modPosition.x += sin(time * layerSpeed + randomOffset) * motionIntensity * 0.5;
            modPosition.y += cos(time * layerSpeed * 0.7 + randomOffset) * motionIntensity * 0.3;
          } else if (layer < 2.0) {
            // Layer 1 - medium
            modPosition.x += sin(time * layerSpeed * 1.2 + randomOffset) * motionIntensity * 0.8;
            modPosition.y += cos(time * layerSpeed * 0.9 + randomOffset) * motionIntensity * 0.6;
          } else {
            // ISSUE: Stuttering layer - Layer 2 has the fastest movement which likely causes stuttering
            // Layer 2 - fastest, farthest
            modPosition.x += sin(time * layerSpeed * 1.5 + randomOffset) * motionIntensity * 1.0;
            modPosition.y += cos(time * layerSpeed * 1.1 + randomOffset) * motionIntensity * 0.8;
          }
          
          // Transform position
          vec4 mvPosition = modelViewMatrix * vec4(modPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size calculation based on cosmic intensity
          float sizeMultiplier = baseSize * (1.0 + cosmicIntensity * 0.5);
          gl_PointSize = size * sizeMultiplier * pixelRatio;
          
          // Opacity based on cosmic intensity
          vOpacity = globalOpacity * (0.3 + cosmicIntensity * 0.7);
          
          // Subtle shimmer effect
          float shimmer = sin(time * 0.3 + randomOffset * 10.0) * 0.1 + 0.9;
          vOpacity *= shimmer;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          // Create soft circular points for dust effect
          vec2 uv = gl_PointCoord.xy - 0.5;
          float radius = length(uv);
          
          // Soft edge
          float alpha = smoothstep(0.5, 0.3, radius) * vOpacity;
          
          // Output color with alpha
          gl_FragColor = vec4(vColor, alpha);
          
          // Discard fragments outside radius
          if (radius > 0.5) discard;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Create points and add to scene
    const starDust = new THREE.Points(geometry, material);
    scene.add(starDust);
    
    // Store reference
    starDustRef.current = {
      points: starDust,
      uniforms: material.uniforms,
      geometry: geometry
    };
    
    console.log('Star dust initialized with', count, 'particles');
  };
  
  // Initialize galaxy effects - active in cosmic reveal and cosmic flight scenes
  const initializeGalaxyEffects = () => {
    if (!sceneRef.current || !rendererRef.current) return;
    
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    
    // Create galaxy geometry
    const geometry = new THREE.BufferGeometry();
    const count = 15000; // High particle count for detailed galaxy
    
    // Create arrays for galaxy attributes
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const angles = new Float32Array(count);
    const randomOffsets = new Float32Array(count);
    
    // Parameters for formation effect
    const formationData = new Float32Array(count);
    const explosionData = new Float32Array(count);
    
    // Create spiral galaxy pattern with formation data
    for (let i = 0; i < count; i++) {
      // Galaxy arm parameters
      const armCount = 2; // Number of spiral arms
      const armIndex = Math.floor(Math.random() * armCount);
      const armOffset = (armIndex * Math.PI * 2) / armCount;
      
      // Distribute particles along spiral arms with randomness
      const radius = Math.pow(Math.random(), 0.5) * 25; // Concentrated toward center
      const spinAngle = radius * 0.75; // Spiral tightness
      const angle = armOffset + spinAngle + (Math.random() * 0.3); // Add some randomness
      
      // Add some thickness to the galaxy plane
      const height = (Math.random() - 0.5) * 2 * radius * 0.15; 
      
      // Calculate position
      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius;
      
      // Store position
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Store angle for animation
      angles[i] = angle;
      
      // Store random offset for variability
      randomOffsets[i] = Math.random() * 100;
      
      // Formation data - particles will expand outward during reveal
      // This controls how particles move from center to their final position
      formationData[i] = Math.random() * 0.5 + 0.5; // 0.5-1.0 randomized timing
      
      // Explosion data - how violently particles explode outward
      const distanceFromCenter = Math.sqrt(x*x + y*y + z*z);
      explosionData[i] = Math.max(0.1, 1.0 - (distanceFromCenter / 25)); // Center particles explode more
      
      // Color based on angle and distance
      let h, s, l; // hue, saturation, lightness
      
      // Angle-based color to create the spiral arm effect
      const normalizedAngle = (angle % (Math.PI * 2)) / (Math.PI * 2);
      
      if (normalizedAngle < 0.25) {
        // Blue to purple
        h = 0.6 + normalizedAngle * 0.2;
        s = 0.7;
        l = 0.6;
      } else if (normalizedAngle < 0.5) {
        // Purple to pink
        h = 0.8 + (normalizedAngle - 0.25) * 0.2;
        s = 0.8;
        l = 0.6;
      } else if (normalizedAngle < 0.75) {
        // Pink to orange/yellow
        h = 0.0 + (normalizedAngle - 0.5) * 0.2;
        s = 0.8;
        l = 0.6;
      } else {
        // Orange/yellow to blue
        h = 0.2 + (normalizedAngle - 0.75) * 0.4;
        s = 0.7;
        l = 0.6;
      }
      
      // Center is brighter
      if (distanceFromCenter < 5) {
        // Core is brighter and whiter
        l += (5 - distanceFromCenter) / 5 * 0.4;
        s -= (5 - distanceFromCenter) / 5 * 0.5;
      }
      
      // Convert HSL to RGB for Three.js
      const { r, g, b } = hslToRgb(h, s, l);
      
      // Store color
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
      
      // Size - vary based on position
      // Center particles are larger
      sizes[i] = Math.max(0.5, Math.min(3, (1 - distanceFromCenter / 25) * 3 + Math.random() * 0.5));
    }
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('angle', new THREE.BufferAttribute(angles, 1));
    geometry.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 1));
    geometry.setAttribute('formationData', new THREE.BufferAttribute(formationData, 1));
    geometry.setAttribute('explosionData', new THREE.BufferAttribute(explosionData, 1));
    
    // Galaxy shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() },
        globalOpacity: { value: 0.0 }, // Start invisible
        formationProgress: { value: 0.0 }, // 0-1 controls formation
        explosionProgress: { value: 0.0 }, // 0-1 controls explosion
        rotationSpeed: { value: 0.1 },
        colorShift: { value: 0.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute float angle;
        attribute float randomOffset;
        attribute float formationData;
        attribute float explosionData;
        
        uniform float time;
        uniform float pixelRatio;
        uniform float globalOpacity;
        uniform float formationProgress;
        uniform float explosionProgress;
        uniform float rotationSpeed;
        uniform float colorShift;
        
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          
          // Calculate final position with formation and explosion effects
          vec3 finalPosition = position;
          
          // Formation effect - particles start at center and move outward
          float formationFactor = smoothstep(0.0, formationData, formationProgress);
          
          // Explosion effect - particles explode outward based on explosion progress
          float explosionFactor = explosionProgress * explosionData * 5.0;
          
          // Combine effects
          vec3 modPosition = position * (formationFactor + explosionFactor);
          
          // Add rotation over time
          float rotationAngle = time * rotationSpeed;
          float xNew = modPosition.x * cos(rotationAngle) - modPosition.z * sin(rotationAngle);
          float zNew = modPosition.x * sin(rotationAngle) + modPosition.z * cos(rotationAngle);
          modPosition.x = xNew;
          modPosition.z = zNew;
          
          // Add subtle wave motion based on angle and time
          float waveIntensity = 0.3 * (1.0 - formationFactor); // Wave decreases as formation progresses
          modPosition.y += sin(time * 0.5 + angle * 3.0) * waveIntensity;
          
          // Transform and project
          vec4 mvPosition = modelViewMatrix * vec4(modPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size calculation with pulse effect
          float pulse = 1.0 + sin(time * 2.0 + randomOffset) * 0.2;
          float finalSize = size * (0.5 + formationFactor * 0.5) * pulse;
          
          // Explosion can make particles larger
          finalSize *= (1.0 + explosionProgress * explosionData * 0.5);
          
          gl_PointSize = finalSize * pixelRatio;
          
          // Opacity based on formation progress
          vOpacity = globalOpacity * formationFactor;
          
          // Add shimmer effect during formation
          float shimmer = 0.8 + sin(time * 3.0 + randomOffset * 10.0) * 0.2;
          vOpacity *= shimmer;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          // Create soft circular particles
          vec2 uv = gl_PointCoord.xy - 0.5;
          float radius = length(uv);
          
          // Soft edge
          float alpha = smoothstep(0.5, 0.3, radius) * vOpacity;
          
          // Add glow
          float glow = 1.0 - smoothstep(0.3, 0.8, radius);
          alpha = max(alpha, glow * 0.6 * vOpacity);
          
          // Output color with alpha
          gl_FragColor = vec4(vColor, alpha);
          
          // Discard fragments outside radius
          if (radius > 0.5) discard;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Create points and add to scene
    const galaxy = new THREE.Points(geometry, material);
    scene.add(galaxy);
    
    // Store reference
    galaxyRef.current = {
      points: galaxy,
      uniforms: material.uniforms,
      geometry: geometry
    };
    
    console.log('Galaxy initialized with', count, 'particles');
  };
  
  // Helper function to convert HSL to RGB (used for galaxy colors)
  const hslToRgb = (h, s, l) => {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return { r, g, b };
  };
  
  // Initialize cosmic effects - scene-specific particle effects
  const initializeCosmicEffects = () => {
    // To be implemented: Create scene-specific particle effects
    console.log('Initializing cosmic effects');
  };
  
  // Update functions for each particle system
  const updateStarField = (time, delta) => {
    if (!starsRef.current) return;
    
    // Update time uniform
    starsRef.current.uniforms.time.value = time;
    
    // Calculate star field configuration based on active scene
    let starOpacity = 0.4;  // Base opacity
    let starDensity = 0.5;  // Base density
    let cosmicIntensity = 0.1; // Reduced from 0.2 - Base cosmic effect intensity
    let baseSize = 1.5;     // Base size multiplier
    
    // Scene-specific settings
    switch (activeScene) {
      case 'dormant':
        // Minimal starfield but more visible
        starOpacity = 0.4 + (sceneProgress * 0.3);
        starDensity = 0.5 + (sceneProgress * 0.2);
        baseSize = 1.5;
        break;
        
      case 'awakening':
        // Stars become gradually more visible
        starOpacity = 0.7 + (sceneProgress * 0.3);
        starDensity = 0.7 + (sceneProgress * 0.3);
        cosmicIntensity = 0.1 + sceneProgress * 0.2; // Reduced from 0.2 + sceneProgress * 0.4
        baseSize = 1.8;
        break;
        
      case 'cosmicReveal':
        // Stars are prominent and have cosmic effects
        starOpacity = 0.9;
        starDensity = 0.9 + (sceneProgress * 0.1);
        cosmicIntensity = 0.2 + (sceneProgress * 0.2); // Reduced from 0.4 + (sceneProgress * 0.4)
        baseSize = 2.0 + (sceneProgress * 0.3);
        break;
        
      case 'cosmicFlight':
        // Full star field with maximum effects
        starOpacity = 1.0;
        starDensity = 1.0;
        cosmicIntensity = 0.4 + (sceneProgress * 0.1); // Reduced from 0.8 + (sceneProgress * 0.2)
        baseSize = 2.2;
        break;
        
      case 'sunApproach':
        // Stars start to fade as sun dominates
        starOpacity = 1.0 - (sceneProgress * 0.4);
        starDensity = 1.0;
        cosmicIntensity = 0.5 - (sceneProgress * 0.2); // Reduced from 1.0 - (sceneProgress * 0.4)
        baseSize = 2.0 - (sceneProgress * 0.3);
        break;
        
      case 'sunLanding':
        // Minimal stars as sun overwhelms
        starOpacity = 0.6 - (sceneProgress * 0.5);
        starDensity = 0.8 - (sceneProgress * 0.4);
        cosmicIntensity = 0.3 - (sceneProgress * 0.3); // Reduced from 0.5 - (sceneProgress * 0.5)
        baseSize = 1.5;
        break;
        
      default:
        break;
    }
    
    // Apply extremely smooth transitions to the uniforms
    const lerpFactor = 0.01; // Reduced from 0.03 for imperceptibly smooth transitions
    starsRef.current.uniforms.globalOpacity.value += (starOpacity - starsRef.current.uniforms.globalOpacity.value) * lerpFactor;
    starsRef.current.uniforms.starDensity.value += (starDensity - starsRef.current.uniforms.starDensity.value) * lerpFactor;
    starsRef.current.uniforms.cosmicIntensity.value += (cosmicIntensity - starsRef.current.uniforms.cosmicIntensity.value) * lerpFactor;
    starsRef.current.uniforms.baseSize.value += (baseSize - starsRef.current.uniforms.baseSize.value) * lerpFactor;
    
    // Camera effects based on global scroll - greatly reduced movement
    if (cameraRef.current) {
      // Almost imperceptible camera movement to enhance immersion
      cameraRef.current.position.x = Math.sin(time * 0.03) * 0.1;
      cameraRef.current.position.y = Math.cos(time * 0.04) * 0.1;
      
      // Add more dramatic camera effects during cosmic scenes
      if (activeScene === 'cosmicFlight' || activeScene === 'cosmicReveal') {
        const intensity = activeScene === 'cosmicFlight' ? 0.1 : 0.05;
        cameraRef.current.rotation.z = Math.sin(time * 0.03) * 0.01 * intensity;
      } else {
        // Reset rotation for other scenes
        cameraRef.current.rotation.z = 0;
      }
    }
  };
  
  // Update star dust (Milky Way effect)
  const updateStarDust = (time, delta) => {
    if (!starDustRef.current) return;
    
    // Update time uniform
    starDustRef.current.uniforms.time.value = time;
    
    // Calculate star dust configuration based on active scene
    let opacity = 0.3;
    let cosmicIntensity = 0.0;
    let baseSize = 1.0;
    
    // Scene-specific settings
    switch (activeScene) {
      case 'dormant':
        // Very minimal dust
        opacity = 0.3 + (sceneProgress * 0.2);
        cosmicIntensity = 0.2;
        break;
        
      case 'awakening':
        // Dust starts to form
        opacity = 0.15 + (sceneProgress * 0.2);
        cosmicIntensity = sceneProgress * 0.2;
        break;
        
      case 'cosmicReveal':
        // Dust becomes more visible
        opacity = 0.3 + (sceneProgress * 0.3);
        cosmicIntensity = 0.2 + (sceneProgress * 0.4);
        baseSize = 1.0 + (sceneProgress * 0.5);
        break;
        
      case 'cosmicFlight':
        // ISSUE: Stuttering layer - Full dust effect during flight with high cosmicIntensity
        // This scene has the highest motion intensity which likely contributes to stuttering
        opacity = 0.6 + (sceneProgress * 0.4);
        cosmicIntensity = 0.6 + (sceneProgress * 0.4);
        baseSize = 1.5 + (sceneProgress * 0.5);
        break;
        
      case 'sunApproach':
        // Dust fades as sun approaches
        opacity = 1.0 - (sceneProgress * 0.7);
        cosmicIntensity = 1.0 - (sceneProgress * 0.7);
        baseSize = 2.0 - (sceneProgress * 1.0);
        break;
        
      case 'sunLanding':
        // Minimal dust near sun
        opacity = 0.3 - (sceneProgress * 0.3);
        cosmicIntensity = 0.3 - (sceneProgress * 0.3);
        baseSize = 1.0;
        break;
        
      default:
        break;
    }
    
    // Apply smooth transitions
    const lerpFactor = 0.05;
    starDustRef.current.uniforms.globalOpacity.value += (opacity - starDustRef.current.uniforms.globalOpacity.value) * lerpFactor;
    starDustRef.current.uniforms.cosmicIntensity.value += (cosmicIntensity - starDustRef.current.uniforms.cosmicIntensity.value) * lerpFactor;
    starDustRef.current.uniforms.baseSize.value += (baseSize - starDustRef.current.uniforms.baseSize.value) * lerpFactor;
  };
  
  const updateGalaxyEffects = (time, delta) => {
    if (!galaxyRef.current) return;
    
    // Update time uniform
    galaxyRef.current.uniforms.time.value = time;
    
    // Calculate galaxy configuration based on active scene
    let opacity = 0.0;
    let formationProgress = 0.0;
    let explosionProgress = 0.0;
    let rotationSpeed = 0.1;
    let colorShift = 0.0;
    
    // Scene-specific settings
    switch (activeScene) {
      case 'dormant':
        // Galaxy not visible
        opacity = 0.0;
        break;
        
      case 'awakening':
        // Galaxy begins to form very slightly at end of scene
        opacity = Math.max(0, (sceneProgress - 0.7) * 0.3);
        formationProgress = Math.max(0, (sceneProgress - 0.8) * 0.5);
        break;
        
      case 'cosmicReveal':
        // Galaxy forms and explodes during reveal scene
        opacity = 0.3 + (sceneProgress * 0.7);
        formationProgress = 0.4 + (sceneProgress * 0.6);
        
        // Explosion happens in middle of scene
        if (sceneProgress < 0.5) {
          // Build up to explosion
          explosionProgress = sceneProgress * 0.4; // Gradual build-up
        } else {
          // Explosion occurs at 50% of the scene
          explosionProgress = 0.2 + (sceneProgress - 0.5) * 1.6; // Peaks at 100%
        }
        
        // Rotation speeds up during formation
        rotationSpeed = 0.1 + sceneProgress * 0.4;
        
        // Colors shift during reveal
        colorShift = sceneProgress * 0.3;
        break;
        
      case 'cosmicFlight':
        // Full galaxy visible during flight
        opacity = 1.0;
        formationProgress = 1.0;
        
        // Explosion fades after initial reveal
        explosionProgress = Math.max(0, 1.0 - sceneProgress * 0.5);
        
        // Rotation slows down during flight
        rotationSpeed = 0.5 - sceneProgress * 0.2;
        
        // Colors continue shifting slightly
        colorShift = 0.3 + sceneProgress * 0.1;
        break;
        
      case 'sunApproach':
        // Galaxy begins to fade as sun approaches
        opacity = 1.0 - (sceneProgress * 0.8);
        formationProgress = 1.0;
        
        // Rotation slows further
        rotationSpeed = 0.3 - sceneProgress * 0.2;
        
        // Colors shift toward yellow/orange
        colorShift = 0.4 + sceneProgress * 0.2;
        break;
        
      case 'sunLanding':
        // Galaxy almost invisible near sun
        opacity = 0.2 - (sceneProgress * 0.2);
        formationProgress = 1.0;
        
        // Minimal rotation
        rotationSpeed = 0.1;
        
        // Colors shift toward bright yellow
        colorShift = 0.6 + sceneProgress * 0.4;
        break;
        
      default:
        break;
    }
    
    // Apply smooth transitions
    const lerpFactor = 0.05;
    galaxyRef.current.uniforms.globalOpacity.value += (opacity - galaxyRef.current.uniforms.globalOpacity.value) * lerpFactor;
    galaxyRef.current.uniforms.formationProgress.value += (formationProgress - galaxyRef.current.uniforms.formationProgress.value) * lerpFactor;
    galaxyRef.current.uniforms.explosionProgress.value += (explosionProgress - galaxyRef.current.uniforms.explosionProgress.value) * lerpFactor;
    galaxyRef.current.uniforms.rotationSpeed.value += (rotationSpeed - galaxyRef.current.uniforms.rotationSpeed.value) * lerpFactor;
    galaxyRef.current.uniforms.colorShift.value += (colorShift - galaxyRef.current.uniforms.colorShift.value) * lerpFactor;
  };
  
  const updateCosmicEffects = (time, delta) => {
    // Update scene-specific effects based on active scene
    // Different effects for different scenes
  };
  
  // Dispose Three.js resources
  const disposeResources = () => {
    // Clean up all Three.js resources to prevent memory leaks
    if (starsRef.current) {
      starsRef.current.geometry.dispose();
      starsRef.current.points.material.dispose();
      sceneRef.current.remove(starsRef.current.points);
    }
    
    if (starDustRef.current) {
      starDustRef.current.geometry.dispose();
      starDustRef.current.points.material.dispose();
      sceneRef.current.remove(starDustRef.current.points);
    }
    
    if (galaxyRef.current) {
      galaxyRef.current.geometry.dispose();
      galaxyRef.current.points.material.dispose();
      sceneRef.current.remove(galaxyRef.current.points);
    }
    
    if (cosmicEffectsRef.current) {
      // Cosmic effects cleanup will be implemented when we add those effects
    }
    
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
  };
  
  // Update based on scroll position and active scene
  useEffect(() => {
    // This will update the particle systems based on scroll position and active scene
    console.log(`Scroll: ${scrollProgress}, Scene: ${activeScene}, Progress: ${sceneProgress}`);
    
    // Scene-specific configurations are handled in the update functions
  }, [scrollProgress, activeScene, sceneProgress]);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ 
        opacity: isInitialized ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
}

// Implementation plan:
// 1. Create this component and integrate it into the CosmicJourneyController ✓
// 2. Move the star field logic from individual scenes to this component ✓
// 3. Add the galaxy spiral effect for the cosmic reveal and flight scenes
// 4. Implement scene-specific particle effects
// 5. Optimize with instancing for high particle counts
// 6. Add smooth transitions between visual states 