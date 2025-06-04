import React, { useRef, useEffect, useState } from 'react';
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  BufferGeometry, 
  BufferAttribute, 
  ShaderMaterial, 
  Points, 
  AdditiveBlending, 
  Color, 
  Vector3, 
  Group, 
  Mesh, 
  SphereGeometry, 
  MeshBasicMaterial, 
  PointsMaterial 
} from 'three';

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
    const scene = new Scene();
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    const renderer = new WebGLRenderer({ 
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
        starsRef.current.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      }
      
      if (galaxyRef.current) {
        galaxyRef.current.uniforms.uPixelRatio.value = renderer.getPixelRatio();
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
    const geometry = new BufferGeometry();
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
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    geometry.setAttribute('randomOffset', new BufferAttribute(randomOffsets, 1));
    geometry.setAttribute('distance', new BufferAttribute(starDistances, 1));
    
    // Create shader material for stars
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uScrollProgress: { value: 0 },
        uActiveScene: { value: 0 },
        uSceneProgress: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute float randomOffset;
        attribute float distance;
        
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uScrollProgress;
        uniform float uActiveScene;
        uniform float uSceneProgress;
        
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = color;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Calculate distance-based effects
          float distanceFactor = 1.0 - (distance - 80.0) / 40.0;
          distanceFactor = clamp(distanceFactor, 0.0, 1.0);
          
          // Twinkling effect
          float twinkle = sin(uTime * 2.0 + randomOffset * 10.0) * 0.5 + 0.5;
          twinkle = pow(twinkle, 3.0); // Make twinkling more dramatic
          
          // Scene-based intensity
          float sceneIntensity = 1.0;
          if (uActiveScene == 1.0) { // Awakening scene
            sceneIntensity = 0.7 + 0.3 * uSceneProgress;
          } else if (uActiveScene == 2.0) { // Journey scene
            sceneIntensity = 1.0 + 0.5 * sin(uTime * 0.5);
          } else if (uActiveScene == 3.0) { // Discovery scene
            sceneIntensity = 1.2 + 0.8 * twinkle;
          }
          
          // Final alpha calculation
          vAlpha = distanceFactor * twinkle * sceneIntensity * 0.8;
          
          // Size calculation
          float finalSize = size * uPixelRatio * (300.0 / -mvPosition.z);
          finalSize *= (0.8 + 0.4 * twinkle) * sceneIntensity;
          
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = finalSize;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          // Create circular star shape
          float distanceToCenter = length(gl_PointCoord - 0.5);
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Add some sparkle
          float sparkle = pow(alpha, 0.8);
          
          gl_FragColor = vec4(vColor, alpha * vAlpha * sparkle);
          
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    
    const stars = new Points(geometry, material);
    scene.add(stars);
    starsRef.current = { points: stars, material, geometry };
    
    console.log('Star field initialized with', count, 'stars');
  };
  
  // Initialize star dust - tiny particles to simulate Milky Way dust/haze
  const initializeStarDust = () => {
    if (!sceneRef.current || !rendererRef.current) return;
    
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    
    // Create star dust geometry
    const geometry = new BufferGeometry();
    const count = 1500; // Smaller particles for atmospheric effect
    
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
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    geometry.setAttribute('randomOffset', new BufferAttribute(randomOffsets, 1));
    geometry.setAttribute('layer', new BufferAttribute(layers, 1));
    
    // Create shader material for star dust
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uScrollProgress: { value: 0 },
        uActiveScene: { value: 0 },
        uSceneProgress: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute float randomOffset;
        attribute float layer;
        
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uScrollProgress;
        uniform float uActiveScene;
        uniform float uSceneProgress;
        
        varying vec3 vColor;
        varying float vAlpha;
        varying float vLayer;
        
        void main() {
          vColor = color;
          vLayer = layer;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Layer-based movement
          float layerSpeed = layer * 0.1;
          float movement = uTime * layerSpeed;
          
          // Gentle floating motion
          vec3 pos = position;
          pos.x += sin(movement + randomOffset) * 2.0;
          pos.y += cos(movement * 0.7 + randomOffset * 1.5) * 1.5;
          pos.z += sin(movement * 0.5 + randomOffset * 2.0) * 1.0;
          
          mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Scene-based effects
          float sceneAlpha = 1.0;
          if (uActiveScene == 1.0) { // Awakening
            sceneAlpha = 0.3 + 0.4 * uSceneProgress;
          } else if (uActiveScene == 2.0) { // Journey
            sceneAlpha = 0.7 + 0.3 * sin(uTime * 0.3);
          } else if (uActiveScene == 3.0) { // Discovery
            sceneAlpha = 0.9;
          }
          
          // Layer-based alpha (closer layers more visible)
          float layerAlpha = 1.0 - layer * 0.3;
          
          vAlpha = sceneAlpha * layerAlpha * 0.6;
          
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * uPixelRatio * (200.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vLayer;
        
        void main() {
          float distanceToCenter = length(gl_PointCoord - 0.5);
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Softer edges for dust
          alpha = pow(alpha, 1.5);
          
          gl_FragColor = vec4(vColor, alpha * vAlpha);
          
          if (gl_FragColor.a < 0.005) discard;
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    
    const starDust = new Points(geometry, material);
    scene.add(starDust);
    starDustRef.current = { points: starDust, material, geometry };
    
    console.log('Star dust initialized with', count, 'particles');
  };
  
  // Initialize galaxy effects - active in cosmic reveal and cosmic flight scenes
  const initializeGalaxyEffects = () => {
    if (!sceneRef.current || !rendererRef.current) return;
    
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    
    // Create galaxy particle geometry
    const geometry = new BufferGeometry();
    const count = 3000; // Dense galaxy effect
    
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
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    geometry.setAttribute('angle', new BufferAttribute(angles, 1));
    geometry.setAttribute('randomOffset', new BufferAttribute(randomOffsets, 1));
    geometry.setAttribute('formationData', new BufferAttribute(formationData, 1));
    geometry.setAttribute('explosionData', new BufferAttribute(explosionData, 1));
    
    // Create shader material for galaxy effects
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uScrollProgress: { value: 0 },
        uActiveScene: { value: 0 },
        uSceneProgress: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute float angle;
        attribute float randomOffset;
        attribute float formationData;
        attribute float explosionData;
        
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uScrollProgress;
        uniform float uActiveScene;
        uniform float uSceneProgress;
        
        varying vec3 vColor;
        varying float vAlpha;
        varying float vFormation;
        
        void main() {
          vColor = color;
          vFormation = formationData;
          
          vec3 pos = position;
          
          // Galaxy rotation
          float rotationSpeed = 0.1;
          float currentAngle = angle + uTime * rotationSpeed;
          
          // Spiral galaxy formation
          float spiralFactor = length(pos.xy) * 0.02;
          currentAngle += spiralFactor;
          
          // Apply rotation
          float cosAngle = cos(currentAngle);
          float sinAngle = sin(currentAngle);
          
          vec2 rotatedPos;
          rotatedPos.x = pos.x * cosAngle - pos.y * sinAngle;
          rotatedPos.y = pos.x * sinAngle + pos.y * cosAngle;
          
          pos.xy = rotatedPos;
          
          // Scene-specific effects
          if (uActiveScene == 3.0) { // Discovery scene - galaxy formation
            float formationProgress = uSceneProgress;
            
            // Particles move from explosion to formation
            vec3 explosionPos = pos * (2.0 + explosionData);
            pos = mix(explosionPos, pos, formationProgress);
            
            // Formation-based alpha
            vAlpha = formationProgress * (0.7 + 0.3 * formationData);
          } else {
            vAlpha = 0.4 + 0.3 * sin(uTime * 0.5 + randomOffset);
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * uPixelRatio * (400.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vFormation;
        
        void main() {
          float distanceToCenter = length(gl_PointCoord - 0.5);
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Galaxy core glow
          float coreGlow = 1.0 - smoothstep(0.0, 0.3, distanceToCenter);
          coreGlow = pow(coreGlow, 2.0);
          
          alpha = max(alpha * 0.7, coreGlow);
          
          gl_FragColor = vec4(vColor, alpha * vAlpha);
          
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    
    const galaxy = new Points(geometry, material);
    scene.add(galaxy);
    galaxyRef.current = { points: galaxy, material, geometry };
    
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
    starsRef.current.material.uniforms.uTime.value = time;
    
    // Apply smooth transitions for valid uniforms only
    const lerpFactor = 0.05;
    starsRef.current.material.uniforms.uScrollProgress.value += (scrollProgress - starsRef.current.material.uniforms.uScrollProgress.value) * lerpFactor;
    starsRef.current.material.uniforms.uActiveScene.value = activeScene === 'dormant' ? 0 : activeScene === 'awakening' ? 1 : activeScene === 'cosmicReveal' ? 2 : activeScene === 'cosmicFlight' ? 3 : 0;
    starsRef.current.material.uniforms.uSceneProgress.value += (sceneProgress - starsRef.current.material.uniforms.uSceneProgress.value) * lerpFactor;

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
  
  const updateStarDust = (time, delta) => {
    if (!starDustRef.current) return;
    
    // Update time uniform
    starDustRef.current.material.uniforms.uTime.value = time;
    
    // Apply smooth transitions for valid uniforms only
    const lerpFactor = 0.05;
    starDustRef.current.material.uniforms.uScrollProgress.value += (scrollProgress - starDustRef.current.material.uniforms.uScrollProgress.value) * lerpFactor;
    starDustRef.current.material.uniforms.uActiveScene.value = activeScene === 'dormant' ? 0 : activeScene === 'awakening' ? 1 : activeScene === 'cosmicReveal' ? 2 : activeScene === 'cosmicFlight' ? 3 : 0;
    starDustRef.current.material.uniforms.uSceneProgress.value += (sceneProgress - starDustRef.current.material.uniforms.uSceneProgress.value) * lerpFactor;
  };
  
  const updateGalaxyEffects = (time, delta) => {
    if (!galaxyRef.current) return;
    
    // Update time uniform
    galaxyRef.current.material.uniforms.uTime.value = time;
    
    // Apply smooth transitions for valid uniforms only
    const lerpFactor = 0.05;
    galaxyRef.current.material.uniforms.uScrollProgress.value += (scrollProgress - galaxyRef.current.material.uniforms.uScrollProgress.value) * lerpFactor;
    galaxyRef.current.material.uniforms.uActiveScene.value = activeScene === 'dormant' ? 0 : activeScene === 'awakening' ? 1 : activeScene === 'cosmicReveal' ? 2 : activeScene === 'cosmicFlight' ? 3 : 0;
    galaxyRef.current.material.uniforms.uSceneProgress.value += (sceneProgress - galaxyRef.current.material.uniforms.uSceneProgress.value) * lerpFactor;
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
      starsRef.current.material.dispose();
      sceneRef.current.remove(starsRef.current.points);
    }
    
    if (starDustRef.current) {
      starDustRef.current.geometry.dispose();
      starDustRef.current.material.dispose();
      sceneRef.current.remove(starDustRef.current.points);
    }
    
    if (galaxyRef.current) {
      galaxyRef.current.geometry.dispose();
      galaxyRef.current.material.dispose();
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