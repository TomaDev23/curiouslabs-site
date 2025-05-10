import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30; // Closer to make particles more visible
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Nebula particles function - Create first for better z-ordering
    const createNebula = () => {
      const geometry = new THREE.BufferGeometry();
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
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('angle', new THREE.BufferAttribute(angles, 1));
      
      // Nebula particle material
      const material = new THREE.ShaderMaterial({
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
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      
      return { points: particles, uniforms: material.uniforms };
    };
    
    // Stars background
    const createStars = () => {
      const geometry = new THREE.BufferGeometry();
      const count = 2000;
      
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      
      // Create stars with varied positions, sizes and colors
      for (let i = 0; i < count; i++) {
        // Position stars in a sphere
        const radius = 80 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Star colors - mostly white with hints of blue and purple
        const colorChoice = Math.random();
        if (colorChoice > 0.8) {
          // Blue tint
          colors[i * 3] = 0.8;
          colors[i * 3 + 1] = 0.9;
          colors[i * 3 + 2] = 1.0;
        } else if (colorChoice > 0.6) {
          // Purple tint
          colors[i * 3] = 0.9;
          colors[i * 3 + 1] = 0.8;
          colors[i * 3 + 2] = 1.0;
        } else {
          // White to yellow-white
          const whiteTint = 0.9 + Math.random() * 0.1;
          colors[i * 3] = whiteTint;
          colors[i * 3 + 1] = whiteTint;
          colors[i * 3 + 2] = whiteTint;
        }
        
        // Star sizes
        sizes[i] = (0.5 + Math.random() * 1.5) * (Math.random() > 0.95 ? 3 : 1);
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Star material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          pixelRatio: { value: renderer.getPixelRatio() },
          time: { value: 0 }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float pixelRatio;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Twinkle effect
            float twinkle = sin(time * 2.0 + position.x * 0.1 + position.y * 0.1 + position.z * 0.1) * 0.5 + 0.5;
            
            gl_PointSize = size * pixelRatio * (1.0 + 0.3 * twinkle);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            // Crisp circle with soft edge
            vec2 uv = gl_PointCoord.xy - 0.5;
            float radius = length(uv);
            float alpha = 1.0 - smoothstep(0.4, 0.5, radius);
            
            // Add glow effect
            alpha = max(alpha, 1.0 - smoothstep(0.3, 1.0, radius) * 0.8);
            
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      const stars = new THREE.Points(geometry, material);
      scene.add(stars);
      
      return { points: stars, uniforms: material.uniforms };
    };
    
    // Add bright central galaxy core - NEW
    const createGalaxyCore = () => {
      // Create central glow
      const coreGeometry = new THREE.PlaneGeometry(20, 20);
      const coreTexture = new THREE.CanvasTexture(createGlowTexture());
      
      const coreMaterial = new THREE.MeshBasicMaterial({
        map: coreTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.8
      });
      
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      core.rotation.x = Math.PI / 2; // Face camera
      scene.add(core);
      
      return { mesh: core, texture: coreTexture };
    };
    
    // Create glow texture for galaxy core
    function createGlowTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      // Create radial gradient
      const gradient = ctx.createRadialGradient(
        128, 128, 0,   // Inner circle
        128, 128, 128  // Outer circle
      );
      
      // Add color stops for bright center
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(0.2, 'rgba(180, 180, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(100, 70, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(30, 20, 100, 0)');
      
      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      return canvas;
    }
    
    // Create visual elements in specific order for proper rendering
    const nebula = createNebula();
    const galaxyCore = createGalaxyCore();
    const stars = createStars();
    
    // Animation
    let time = 0;
    const animate = function() {
      const animationId = requestAnimationFrame(animate);
      time += 0.01;
      
      // Update uniforms
      stars.uniforms.time.value = time;
      nebula.uniforms.time.value = time;
      nebula.uniforms.progress.value = Math.max(0.3, progress); // Always some visibility
      
      // Make the galaxy core pulse
      const pulse = 1.0 + Math.sin(time * 1.5) * 0.2;
      galaxyCore.mesh.scale.set(pulse, pulse, 1);
      
      // Rotate entire scene slightly for movement
      scene.rotation.x = Math.sin(time * 0.05) * 0.05;
      scene.rotation.z = Math.sin(time * 0.03) * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Update uniforms
      stars.uniforms.pixelRatio.value = renderer.getPixelRatio();
      nebula.uniforms.pixelRatio.value = renderer.getPixelRatio();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      stars.points.geometry.dispose();
      stars.points.material.dispose();
      nebula.points.geometry.dispose();
      nebula.points.material.dispose();
      galaxyCore.texture.dispose();
      galaxyCore.mesh.geometry.dispose();
      galaxyCore.mesh.material.dispose();
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