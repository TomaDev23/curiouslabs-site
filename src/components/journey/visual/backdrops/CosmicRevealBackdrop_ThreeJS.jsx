import React, { useRef, useEffect } from 'react';
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
  Mesh, 
  SphereGeometry, 
  MeshBasicMaterial,
  PointLight,
  Group
} from 'three';

// Metadata for LEGIT compliance
const metadata = {
  id: 'cosmic_reveal_backdrop_threejs',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_cosmic_backdrop.md'
};

export default function CosmicRevealBackdropThreeJS({ progress = 0 }) {
  const containerRef = useRef(null);
  
  // Set up and animate Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30; // Closer to make particles more visible
    
    // Renderer
    const renderer = new WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Nebula particles function - Create first for better z-ordering
    const createNebula = () => {
      const geometry = new BufferGeometry();
      const count = 15000; // More particles
      
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const angles = new Float32Array(count);
      
      // Create a spiral galaxy shape
      for (let i = 0; i < count; i++) {
        // Galaxy spiral logic
        const armAngle = Math.random() * Math.PI * 2;
        const arm = Math.floor(Math.random() * 2); // 2 arms
        const armOffset = arm * Math.PI;
        
        const radiusScale = 0.5 + Math.random() * 0.5; // Scale radius variance
        const radius = Math.pow(Math.random(), 0.5) * 25 * radiusScale; // Smaller radius to be more visible
        const spinAngle = radius * 0.3 + armOffset + armAngle; // Spiral spin
        
        const x = Math.cos(spinAngle) * radius;
        const y = (Math.random() - 0.5) * 2 * radius * 0.15; // Flatten in y
        const z = Math.sin(spinAngle) * radius;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        // Color - blue to purple to pink based on position in galaxy
        const positionAngle = Math.atan2(z, x);
        const normalizedAngle = (positionAngle + Math.PI) / (Math.PI * 2); // 0 to 1
        
        let r, g, b;
        
        // Create a gradient around the spiral - BRIGHTER colors
        if (normalizedAngle < 0.2) {
          // Blue to purple transition
          const t = normalizedAngle / 0.2;
          r = 0.3 + t * 0.4;
          g = 0.5 + t * 0.1;
          b = 1.0;
        } else if (normalizedAngle < 0.5) {
          // Purple to pink
          const t = (normalizedAngle - 0.2) / 0.3;
          r = 0.7 + t * 0.3;
          g = 0.2 + t * 0.2;
          b = 1.0 - t * 0.2;
        } else if (normalizedAngle < 0.8) {
          // Pink to orange
          const t = (normalizedAngle - 0.5) / 0.3;
          r = 1.0;
          g = 0.4 + t * 0.4;
          b = 0.8 - t * 0.5;
        } else {
          // Orange to blue
          const t = (normalizedAngle - 0.8) / 0.2;
          r = 1.0 - t * 0.7;
          g = 0.8 - t * 0.3;
          b = 0.3 + t * 0.7;
        }
        
        // Brighten center particles
        const distanceFromCenter = Math.sqrt(x*x + z*z);
        if (distanceFromCenter < 10) {
          const brightnessFactor = 1.0 - distanceFromCenter / 10;
          r = Math.min(1.0, r + brightnessFactor * 0.5);
          g = Math.min(1.0, g + brightnessFactor * 0.5);
          b = Math.min(1.0, b + brightnessFactor * 0.5);
        }
        
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
        
        // Size based on position - LARGER particles overall
        const sizeVariation = Math.max(0.5, 1.0 - (distanceFromCenter / 25));
        sizes[i] = (1.0 + Math.random() * 2.0) * sizeVariation * 3;
        
        // Random angles for rotation
        angles[i] = Math.random() * Math.PI * 2;
      }
      
      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.setAttribute('color', new BufferAttribute(colors, 3));
      geometry.setAttribute('size', new BufferAttribute(sizes, 1));
      geometry.setAttribute('angle', new BufferAttribute(angles, 1));
      
      // Nebula particle material
      const material = new ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: renderer.getPixelRatio() },
          progress: { value: Math.max(0.3, progress) } // Minimum visibility
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          attribute float angle;
          uniform float time;
          uniform float pixelRatio;
          uniform float progress;
          varying vec3 vColor;
          varying float vAngle;
          varying float vProgress;
          
          void main() {
            vColor = color;
            vAngle = angle;
            vProgress = progress;
            
            // Add slight movement to particles
            vec3 pos = position;
            float dist = length(pos.xz);
            
            // Make galaxy rotate
            float rotationSpeed = 0.1;
            float rotation = time * rotationSpeed;
            float xNew = pos.x * cos(rotation) - pos.z * sin(rotation);
            float zNew = pos.x * sin(rotation) + pos.z * cos(rotation);
            pos.x = xNew;
            pos.z = zNew;
            
            // Add wavy motion
            float waveFreq = 2.0;
            float waveHeight = 0.7;
            pos.y += sin(time * 0.5 + dist * waveFreq) * waveHeight;
            
            // Add particle pulsing based on progress
            float pulse = 1.0 + sin(time * 2.0 + dist * 0.2) * 0.3;
            
            // Transform and project
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Set particle size with pulse effect - LARGER
            gl_PointSize = size * pixelRatio * pulse * (0.7 + progress * 0.5);
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAngle;
          varying float vProgress;
          
          void main() {
            // Calculate distance from center for round particles
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            
            // Soften the edge
            float alpha = smoothstep(0.5, 0.3, dist);
            
            // Add glow
            float glow = 1.0 - smoothstep(0.3, 0.8, dist);
            alpha = max(alpha, glow * 0.8);
            
            // Apply color with alpha - Always visible
            gl_FragColor = vec4(vColor, alpha * max(0.6, vProgress));
            
            // Discard outside the circle
            if (dist > 0.5) discard;
          }
        `,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false
      });
      
      const nebula = new Points(geometry, material);
      scene.add(nebula);
      
      return { nebula, material };
    };
    
    // Create star field
    const createStars = () => {
      const starCount = 8000; // Many stars
      const starGeometry = new BufferGeometry();
      
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      
      for (let i = 0; i < starCount; i++) {
        // Random position in sphere
        const radius = 150 + Math.random() * 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Star colors - white to blue-white spectrum
        const temp = 0.8 + Math.random() * 0.2;
        colors[i * 3] = temp;
        colors[i * 3 + 1] = temp;
        colors[i * 3 + 2] = 1.0;
        
        // Random star sizes with more variance
        sizes[i] = 0.5 + Math.random() * 1.5;
      }
      
      starGeometry.setAttribute('position', new BufferAttribute(positions, 3));
      starGeometry.setAttribute('color', new BufferAttribute(colors, 3));
      starGeometry.setAttribute('size', new BufferAttribute(sizes, 1));
      
      const starMaterial = new ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: renderer.getPixelRatio() }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          uniform float time;
          uniform float pixelRatio;
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            
            // Add subtle twinkling by varying size
            float twinkle = 1.0 + 0.3 * sin(time * 3.0 + position.x * 0.01);
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = size * pixelRatio * twinkle;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            
            float alpha = smoothstep(0.5, 0.1, dist);
            gl_FragColor = vec4(vColor, alpha);
            
            if (dist > 0.5) discard;
          }
        `,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false
      });
      
      const stars = new Points(starGeometry, starMaterial);
      scene.add(stars);
      
      return { stars, material: starMaterial };
    };
    
    // Galaxy core - bright center
    const createGalaxyCore = () => {
      const coreGeometry = new SphereGeometry(1.5, 32, 32);
      
      function createGlowTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(150, 100, 255, 0.8)');
        gradient.addColorStop(0.7, 'rgba(100, 50, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        
        return canvas;
      }
      
      const coreMaterial = new MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      
      const core = new Mesh(coreGeometry, coreMaterial);
      scene.add(core);
      
      // Add glow around core
      const glowGeometry = new SphereGeometry(3, 32, 32);
      const glowMaterial = new MeshBasicMaterial({
        color: 0x8844ff,
        transparent: true,
        opacity: 0.3
      });
      
      const glow = new Mesh(glowGeometry, glowMaterial);
      scene.add(glow);
      
      return { core, glow };
    };
    
    // Create all effects
    const nebulaData = createNebula();
    const starData = createStars();
    const coreData = createGalaxyCore();
    
    // Central bright point light
    const centerLight = new PointLight(0x8844ff, 2, 100);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);
    
    // Animation loop
    const animate = function() {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Update materials
      if (nebulaData.material) {
        nebulaData.material.uniforms.time.value = time;
        nebulaData.material.uniforms.progress.value = Math.max(0.3, progress);
      }
      
      if (starData.material) {
        starData.material.uniforms.time.value = time;
      }
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      nebulaData.nebula.geometry.dispose();
      nebulaData.material.dispose();
      starData.stars.geometry.dispose();
      starData.material.dispose();
      coreData.core.geometry.dispose();
      coreData.core.material.dispose();
      glow.geometry.dispose();
      glow.material.dispose();
      renderer.dispose();
      
      cancelAnimationFrame(animate);
    };
  }, []);
  
  // Update effect when progress changes
  useEffect(() => {
    // This will be handled by shader uniforms inside the main effect
  }, [progress]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full"
      style={{ 
        opacity: 1, // Always visible
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
} 