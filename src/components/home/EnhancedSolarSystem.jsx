// 🛡️ STAR_LOCKED: Do not remove or alter – see STAR_LOCK_V1.md
import React, { useEffect, useRef, useState } from 'react';
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  AmbientLight, 
  PointLight, 
  SphereGeometry, 
  MeshStandardMaterial, 
  Mesh, 
  ShaderMaterial, 
  Color, 
  AdditiveBlending, 
  FrontSide, 
  ACESFilmicToneMapping, 
  EllipseCurve, 
  BufferGeometry, 
  BufferAttribute, 
  Points, 
  Group, 
  Vector3, 
  Float32BufferAttribute,
  TorusGeometry,
  MeshBasicMaterial,
  DoubleSide
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Import shader code
import sunVertexShader from '../../assets/shaders/solar/sun.vert?raw';
import sunFragmentShader from '../../assets/shaders/solar/sun.frag?raw';
import orbitVertexShader from '../../assets/shaders/solar/orbit.vert?raw';
import orbitFragmentShader from '../../assets/shaders/solar/orbit.frag?raw';
import starfieldVertexShader from '../../assets/shaders/solar/starfield.vert?raw';
import starfieldFragmentShader from '../../assets/shaders/solar/starfield.frag?raw';

/**
 * Enhanced 3D Solar System Component - Phase 2 Implementation
 * A fully interactive Three.js implementation with proper shaders and optimizations
 */
const EnhancedSolarSystem = ({ scrollProgress = 0, isLowPerf = false, isReducedMotion = false }) => {
  const mountRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // References to be used in cleanup
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameRef = useRef(null);
  
  // Main Three.js setup and animation effect
  useEffect(() => {
    // Skip if low performance mode is active or component isn't mounted
    if (!mountRef.current || isLowPerf) return;
    
    // Create scene
    const scene = new Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 40, 120);
    cameraRef.current = camera;
    
    // Renderer setup with optimizations
    const renderer = new WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.maxDistance = 200;
    controls.minDistance = 60;
    
    // Disable auto-rotation if reduced motion is preferred
    controls.autoRotate = !isReducedMotion;
    controls.autoRotateSpeed = isReducedMotion ? 0 : 0.2;
    
    controls.enableZoom = false; // Disable zooming for homepage experience
    controlsRef.current = controls;
    
    // Lights
    const ambientLight = new AmbientLight(0x222244, 0.7);
    scene.add(ambientLight);
    
    const centerLight = new PointLight(0xa855f7, 3, 120);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);
    
    // Central Sun - Solid core with a shader-based glow
    // 1. Create solid core with emissive material
    const sunCoreGeometry = new SphereGeometry(7, 32, 32);
    const sunCoreMaterial = new MeshStandardMaterial({
      emissive: 0xa855f7,
      emissiveIntensity: 1.5,
      color: 0xa855f7,
      roughness: 0.2,
      metalness: 0.8
    });
    const sunCore = new Mesh(sunCoreGeometry, sunCoreMaterial);
    scene.add(sunCore);
    
    // 2. Add glow effect with shader
    const sunGlowGeometry = new SphereGeometry(10, 32, 32);
    const sunGlowMaterial = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new Color(0xa855f7) }, // Purple
        uColor2: { value: new Color(0x6366f1) }  // Indigo
      },
      vertexShader: sunVertexShader,
      fragmentShader: sunFragmentShader,
      transparent: true,
      blending: AdditiveBlending,
      side: FrontSide,
      depthWrite: false,
    });
    const sunGlow = new Mesh(sunGlowGeometry, sunGlowMaterial);
    scene.add(sunGlow);
    
    // Planet data representing different services/tools
    const planets = [
      { name: "CodeLab", orbit: 30, size: 3.5, color: 0x6366f1, speed: 0.2, icon: "⚙️" },
      { name: "OpsPipe", orbit: 50, size: 4, color: 0x8b5cf6, speed: 0.15, icon: "🔄" },
      { name: "Guardian", orbit: 70, size: 3.5, color: 0xd946ef, speed: 0.1, icon: "🛡️" },
      { name: "MoonSignal", orbit: 90, size: 3, color: 0xf43f5e, speed: 0.08, icon: "📡" },
      { name: "Aegis", orbit: 110, size: 5, color: 0x0ea5e9, speed: 0.05, icon: "🌐" }
    ];
    
    // Create orbit paths with glow effect
    const createOrbitPath = (radius, color, opacity = 0.2, width = 1.0) => {
      const segments = 128;
      const orbitCurve = new EllipseCurve(
        0, 0,
        radius, radius,
        0, 2 * Math.PI,
        false,
        0
      );
      
      const orbitPoints = orbitCurve.getPoints(segments);
      const orbitGeometry = new BufferGeometry().setFromPoints(orbitPoints);
      
      // Add z-coordinate for proper 3D rendering
      const positions = orbitGeometry.attributes.position.array;
      const posArray = new Float32Array(segments * 3);
      
      for (let i = 0; i < segments; i++) {
        const i3 = i * 3;
        const i2 = i * 2;
        posArray[i3] = positions[i2];
        posArray[i3+1] = 0;
        posArray[i3+2] = positions[i2+1];
      }
      
      orbitGeometry.setAttribute('position', new BufferAttribute(posArray, 3));
      
      const orbitMaterial = new ShaderMaterial({
        uniforms: {
          uColor: { value: new Color(color) },
          uTime: { value: 0 },
          uOpacity: { value: opacity },
          uWidth: { value: width }
        },
        vertexShader: orbitVertexShader,
        fragmentShader: orbitFragmentShader,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
      });
      
      return new Points(orbitGeometry, orbitMaterial);
    };
    
    // Create orbit paths for each planet
    const orbitPaths = [];
    
    planets.forEach((planet, i) => {
      const orbitPath = createOrbitPath(
        planet.orbit, 
        planet.color, 
        0.4 - i * 0.05, 
        2 - i * 0.2
      );
      scene.add(orbitPath);
      orbitPaths.push(orbitPath);
    });
    
    // Create planetary objects with labels
    const planetObjects = [];
    const planetAngles = [];
    
    planets.forEach((planet, index) => {
      // Initialize random angle
      const initialAngle = Math.random() * Math.PI * 2;
      planetAngles.push(initialAngle);
      
      // Planet group to hold all components
      const planetGroup = new Group();
      
      // Planet geometry
      const planetGeometry = new SphereGeometry(planet.size, 24, 24);
      const planetMaterial = new MeshStandardMaterial({
        color: 0x222244,
        metalness: 0.9,
        roughness: 0.3,
        emissive: new Color(planet.color),
        emissiveIntensity: 0.4
      });
      
      const planetMesh = new Mesh(planetGeometry, planetMaterial);
      planetMesh.castShadow = true;
      planetMesh.receiveShadow = true;
      
      // Add ring to some planets
      const ringGeometry = new TorusGeometry(planet.size * 1.4, 0.2, 16, 100);
      const ringMaterial = new MeshBasicMaterial({
        color: new Color(planet.color),
        transparent: true,
        opacity: 0.6,
        side: DoubleSide
      });
      const ring = new Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      planetGroup.add(ring);
      
      // Calculate position based on orbit radius and angle
      const x = planet.orbit * Math.cos(initialAngle);
      const z = planet.orbit * Math.sin(initialAngle);
      
      // Add random Y offset for more dynamic look
      const y = (Math.random() - 0.5) * 10;
      
      planetGroup.position.set(x, y, z);
      scene.add(planetGroup);
      planetObjects.push(planetGroup);
    });
    
    // Create a starfield with custom shader
    const createStarField = (count, radius) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      
      for (let i = 0; i < count; i++) {
        // Random position in sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius + Math.random() * 50;
        
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        
        // Random color (bluish-white stars)
        const intensity = 0.5 + Math.random() * 0.5;
        colors[i * 3] = intensity * 0.8;
        colors[i * 3 + 1] = intensity * 0.9;
        colors[i * 3 + 2] = intensity;
        
        // Random size
        sizes[i] = Math.random() * 2 + 0.5;
      }
      
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.setAttribute('color', new BufferAttribute(colors, 3));
      geometry.setAttribute('size', new BufferAttribute(sizes, 1));
      
      const starMaterial = new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        },
        vertexShader: starfieldVertexShader,
        fragmentShader: starfieldFragmentShader,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
      });
      
      return new Points(geometry, starMaterial);
    };
    
    // Add starfields at different distances
    const starField1 = createStarField(800, 300);
    const starField2 = createStarField(1200, 500);
    scene.add(starField1);
    scene.add(starField2);
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      // Increment time for animations
      timeRef.current += isReducedMotion ? 0.002 : 0.01;
      
      // Apply scroll effect to camera position
      camera.position.y = 40 - scrollProgress * 20;
      camera.lookAt(0, 0, 0);
      
      // Update sun shader uniforms
      if (sunGlowMaterial.uniforms) {
        sunGlowMaterial.uniforms.uTime.value = timeRef.current;
      }
      
      // Rotate the sun - reduced or disabled for reduced motion preference
      if (!isReducedMotion) {
        sunCore.rotation.y += 0.003;
        sunGlow.rotation.y -= 0.002;
      } else {
        // Very slow rotation even with reduced motion for subtle movement
        sunCore.rotation.y += 0.0005;
        sunGlow.rotation.y -= 0.0003;
      }
      
      // Update orbit paths
      orbitPaths.forEach(path => {
        if (path.material && path.material.uniforms) {
          // Reduced animation speed for reduced motion preference
          path.material.uniforms.uTime.value = timeRef.current;
        }
      });
      
      // Update starfields
      if (starField1.material && starField1.material.uniforms) {
        // Reduced or normal animation speed
        const timeIncrement = isReducedMotion ? timeRef.current * 0.2 : timeRef.current;
        starField1.material.uniforms.uTime.value = timeIncrement;
        starField2.material.uniforms.uTime.value = timeIncrement;
      }
      
      // Update planet positions
      planetObjects.forEach((planet, i) => {
        // Update angle based on planet speed - slower for reduced motion
        const speedMultiplier = isReducedMotion ? 0.2 : 1.0;
        planetAngles[i] += planets[i].speed * 0.004 * speedMultiplier;
        
        // Calculate new position
        const x = planets[i].orbit * Math.cos(planetAngles[i]);
        const z = planets[i].orbit * Math.sin(planetAngles[i]);
        
        // Keep existing Y position with a slight oscillation
        const baseY = planet.position.y;
        // Reduce or eliminate oscillation for reduced motion
        const oscillationAmount = isReducedMotion ? 0.1 : 0.5;
        const y = baseY + Math.sin(timeRef.current * 2 + i) * oscillationAmount;
        
        // Update position
        planet.position.set(x, y, z);
        
        // Add slight rotation to planets - reduced for reduced motion preference
        const rotationSpeed = isReducedMotion ? 0.002 : 0.01;
        planet.rotation.y += rotationSpeed * (i % 2 === 0 ? 1 : -1);
      });
      
      // Update orbit controls
      controls.update();
      
      // Render scene
      renderer.render(scene, camera);
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    setIsInitialized(true);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Clean up Three.js resources
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      setIsInitialized(false);
    };
  }, [isLowPerf, isReducedMotion]); // Reinitialize when performance mode or reduced motion changes
  
  // Effect to update camera based on scroll
  useEffect(() => {
    if (cameraRef.current && isInitialized) {
      // Adjust camera position based on scroll
      cameraRef.current.position.y = 40 - scrollProgress * 20;
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [scrollProgress, isInitialized]);
  
  // Low performance fallback
  if (isLowPerf) {
    return (
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        style={{ opacity: 1 - (scrollProgress * 0.7) }}
      >
        <div className="absolute inset-0 opacity-20">
          {/* Static star field background */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>
        
        {/* Simple circular gradient for the "sun" */}
        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 animate-pulse" 
             style={{ boxShadow: '0 0 40px 10px rgba(168, 85, 247, 0.4)' }}
        />
        
        {/* Simplified circular "orbits" */}
        {[30, 50, 70, 90, 110].map((size, i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-purple-500/30"
            style={{ 
              width: `${size * 2}px`, 
              height: `${size * 2}px`,
              opacity: 0.3 - i * 0.05,
            }}
          />
        ))}
        
        {/* Simple planets */}
        {planets.map((planet, i) => {
          const angle = (i / planets.length) * Math.PI * 2;
          const x = planet.orbit * Math.cos(angle);
          const y = planet.orbit * Math.sin(angle);
          
          return (
            <div 
              key={i} 
              className="absolute rounded-full"
              style={{
                width: `${planet.size * 2}px`,
                height: `${planet.size * 2}px`,
                backgroundColor: `#${planet.color.toString(16).padStart(6, '0')}`,
                transform: `translate(${x}px, ${y}px)`,
                boxShadow: `0 0 10px 2px rgba(${planet.color & 0xFF}, ${(planet.color >> 8) & 0xFF}, ${(planet.color >> 16) & 0xFF}, 0.3)`,
              }}
            />
          );
        })}
      </div>
    );
  }
  
  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-10"
      style={{ opacity: 1 - (scrollProgress * 0.7) }}
    />
  );
};

export default EnhancedSolarSystem; 