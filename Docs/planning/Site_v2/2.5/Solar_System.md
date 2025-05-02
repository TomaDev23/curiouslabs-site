
# 🛰️ TILE 2F.1: SOLAR SYSTEM 3D UPGRADE - SIMULATION & PLAN

## 📊 Current State Analysis

I've analyzed the requirements and source code for the SOLAR SYSTEM 3D UPGRADE task.

### Key Resources:
- Source file: `Docs/planning/Site_v2/2.5/Solar_System.md` (contains complete Three.js code)
- Target location: `src/components/Immersive3DSolarSystem.jsx`
- Required dependency: `three` (includes OrbitControls via import)

### Key Requirements:
- Create a new component with full Three.js implementation
- Set up proper imports for Three.js
- Handle potential issues with OrbitControls or texture loading
- Ensure proper cleanup to prevent memory leaks

## 🧠 Implementation Simulation

The provided code in `Solar_System.md` is a complete React component that uses Three.js to create an immersive 3D solar system. The component includes:

1. A central sun with shader-based glow effects
2. Orbital paths with custom shaders
3. Logo objects that orbit around the sun
4. Background starfields and nebula effects
5. Lens flare that follows the camera
6. Proper cleanup on component unmount
7. Loading indicator and interaction hints

The code is already in JSX format and includes all necessary Three.js setup, animation loop, and cleanup.

### Potential Implementation Challenges:
1. The code imports OrbitControls from Three.js using a relative path that may need adjustment
2. The lens flare uses an inline base64 texture that might need optimization
3. Ensuring Three.js is properly installed and compatible with the current build system

## 🛠️ Execution Plan

### Step 1: Install Three.js Dependency
```powershell
npm install three
```

### Step 2: Create Component File
Create a new file at `src/components/Immersive3DSolarSystem.jsx` and copy the entire code from `Solar_System.md`.

### Step 3: Verify Imports
Ensure the OrbitControls import is correctly formatted:
```jsx
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
```

### Step 4: Optimize Base64 Texture
For better performance, the base64 texture for lens flare could be extracted to an actual file, but this is optional and can be addressed later if needed.

### Step 5: Add to Target Page
Integrate the component into the target page (`/products` or relevant page) by importing and placing it:

```jsx
import Immersive3DSolarSystem from '../components/Immersive3DSolarSystem';

// Within page component return
<Immersive3DSolarSystem />
```

### Step 6: Test and Validate
Test the component to ensure:
- 3D scene renders correctly
- Animations work smoothly
- No console errors occur
- Component cleans up resources on unmount

### Step 7: Fallback Options
If issues arise:
- Verify Three.js version compatibility
- Check for bundler configuration issues with imports
- Consider creating simpler fallback version without advanced shader effects

## ✅ Validation Checklist

After implementation, validate:
- [ ] 3D scene renders without crash
- [ ] Logos orbit smoothly around the central sun
- [ ] Starfield and nebula effects are visible
- [ ] Lens flare tracks with camera movement
- [ ] Loading indicator appears and then fades out
- [ ] Component unmounts cleanly without memory leaks
- [ ] Interaction hint displays below the 3D canvas

## 🎯 Expected Outcome

The Immersive3DSolarSystem component should create a visually stunning, interactive 3D representation of a solar system with technology-themed orbiting logos. This will significantly enhance the visual appeal of the products page and provide users with an engaging way to explore the various services offered.

I'm ready to proceed with the implementation as outlined.



========================================================================================

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Immersive3DSolarSystem = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 120);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.maxDistance = 200;
    controls.minDistance = 60;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x222244, 0.7);
    scene.add(ambientLight);
    
    const centerLight = new THREE.PointLight(0xa855f7, 3, 120);
    centerLight.position.set(0, 0, 0);
    centerLight.castShadow = true;
    scene.add(centerLight);
    
    // Dynamic spotlight that follows camera
    const spotLight = new THREE.SpotLight(0x8844ff, 2);
    spotLight.position.set(50, 50, 50);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    spotLight.decay = 1.5;
    spotLight.distance = 180;
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    // Central Sun
    const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({
      emissive: 0xa855f7,
      emissiveIntensity: 1,
      color: 0xa855f7,
      roughness: 0.2,
      metalness: 0.8
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // Sun glow effect
    const sunGlowGeometry = new THREE.SphereGeometry(10, 32, 32);
    const sunGlowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xa855f7) },
        color2: { value: new THREE.Color(0x6366f1) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float intensity = 1.0 - length(vPosition) / 10.0;
          intensity = pow(intensity, 2.0);
          
          // Pulsating effect
          intensity *= 0.8 + 0.2 * sin(time * 2.0);
          
          vec3 color = mix(color1, color2, 0.5 + 0.5 * sin(time * 0.5));
          gl_FragColor = vec4(color, intensity * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    scene.add(sunGlow);
    
    // Orbit Paths - Using custom shader for glowing effect
    const createOrbitPath = (radius, color, opacity = 0.2, width = 1.0) => {
      const segments = 128;
      const orbitCurve = new THREE.EllipseCurve(
        0, 0,             // center
        radius, radius,    // xRadius, yRadius
        0, 2 * Math.PI,    // start angle, end angle
        false,             // clockwise
        0                  // rotation
      );
      
      const orbitPoints = orbitCurve.getPoints(segments);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      
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
      
      orbitGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const orbitMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(color) },
          time: { value: 0 },
          opacity: { value: opacity },
          width: { value: width }
        },
        vertexShader: `
          uniform float time;
          uniform float width;
          varying vec3 vPosition;
          
          void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = width * 2.0;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          uniform float opacity;
          varying vec3 vPosition;
          
          void main() {
            float intensity = 0.6 + 0.4 * sin(time * 2.0 + length(vPosition) * 0.2);
            gl_FragColor = vec4(color, opacity * intensity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      
      return new THREE.Points(orbitGeometry, orbitMaterial);
    };
    
    const orbitPaths = [];
    const orbitRadii = [30, 50, 70, 90];
    const orbitColors = [0xa855f7, 0x6366f1, 0x06b6d4, 0x34d399];
    
    orbitRadii.forEach((radius, i) => {
      const orbitPath = createOrbitPath(radius, orbitColors[i], 0.4 - i * 0.05, 2 - i * 0.3);
      scene.add(orbitPath);
      orbitPaths.push(orbitPath);
    });
    
    // Create a 3D object for logos with glow effect
    const createLogoObject = (position, size, color, text) => {
      const group = new THREE.Group();
      
      // Logo sphere
      const logoGeometry = new THREE.SphereGeometry(size, 24, 24);
      const logoMaterial = new THREE.MeshStandardMaterial({
        color: 0x222244,
        metalness: 0.9,
        roughness: 0.3,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.4
      });
      
      const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
      logoMesh.castShadow = true;
      logoMesh.receiveShadow = true;
      
      // Add text/icon using Canvas texture
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      
      // Fill with transparent background
      context.fillStyle = 'rgba(0,0,0,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw text
      context.fillStyle = '#ffffff';
      context.font = 'Bold 100px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width/2, canvas.height/2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      // Create icon plane that always faces camera
      const iconGeometry = new THREE.PlaneGeometry(size * 1.5, size * 1.5);
      const iconMesh = new THREE.Mesh(iconGeometry, textMaterial);
      iconMesh.position.z = size * 0.6;
      
      // Make a billboard effect (always face camera)
      iconMesh.onBeforeRender = function() {
        this.lookAt(camera.position);
      };
      
      // Glowing ring
      const ringGeometry = new THREE.TorusGeometry(size * 1.2, 0.2, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      
      group.add(logoMesh);
      group.add(iconMesh);
      group.add(ring);
      group.position.copy(position);
      
      return group;
    };
    
    // Logo definitions
    const logoData = [
      { text: '🐍', orbit: 0, angle: 0, size: 3.5, color: 0x3776AB },
      { text: '⚛️', orbit: 0, angle: 120, size: 3.5, color: 0x61DAFB },
      { text: 'JS', orbit: 0, angle: 240, size: 3.5, color: 0xF7DF1E },
      { text: '☁️', orbit: 1, angle: 60, size: 4, color: 0xFF9900 },
      { text: '🗄️', orbit: 1, angle: 180, size: 3.5, color: 0x4DB33D },
      { text: '🧠', orbit: 1, angle: 300, size: 4, color: 0xFF5A5F },
      { text: '📱', orbit: 2, angle: 30, size: 3.5, color: 0x3DDC84 },
      { text: '🔒', orbit: 2, angle: 150, size: 3.5, color: 0xFF5A5F },
      { text: '📊', orbit: 2, angle: 270, size: 3.5, color: 0x0095D6 },
      { text: '💻', orbit: 3, angle: 0, size: 3, color: 0x00ADD8 },
      { text: '⚙️', orbit: 3, angle: 90, size: 3, color: 0x4f5d95 },
      { text: '🔮', orbit: 3, angle: 180, size: 3, color: 0x9b30ff },
      { text: '🚀', orbit: 3, angle: 270, size: 3, color: 0xff5a20 }
    ];
    
    const logoObjects = [];
    const logoPositions = [];
    
    logoData.forEach(logo => {
      const radius = orbitRadii[logo.orbit];
      const angle = (logo.angle * Math.PI) / 180;
      
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      
      // Slightly randomize Y position for more interesting distribution
      const y = (Math.random() - 0.5) * 5;
      
      const position = new THREE.Vector3(x, y, z);
      logoPositions.push({ orbit: logo.orbit, angle, radius, speed: 0.2 - logo.orbit * 0.03 });
      
      const logoObject = createLogoObject(position, logo.size, logo.color, logo.text);
      scene.add(logoObject);
      logoObjects.push(logoObject);
    });
    
    // Particle systems for stars
    const createStarField = (count, radius) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      
      for (let i = 0; i < count; i++) {
        // Generate random position on a sphere
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);
        const r = radius * (0.8 + Math.random() * 0.3); // Vary radius slightly
        
        const i3 = i * 3;
        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
        
        // Random color between white and blue/purple
        const colorChoice = Math.random();
        if (colorChoice > 0.8) {
          // Blue star
          colors[i3] = 0.7;
          colors[i3 + 1] = 0.8;
          colors[i3 + 2] = 1.0;
        } else if (colorChoice > 0.6) {
          // Purple star
          colors[i3] = 0.8;
          colors[i3 + 1] = 0.7;
          colors[i3 + 2] = 1.0;
        } else {
          // White star
          colors[i3] = 0.9;
          colors[i3 + 1] = 0.9;
          colors[i3 + 2] = 1.0;
        }
        
        // Random sizes
        sizes[i] = Math.random() * 2 + 0.5;
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: window.devicePixelRatio }
        },
        vertexShader: `
          attribute float size;
          uniform float time;
          uniform float pixelRatio;
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Twinkle effect based on time and position
            float twinkle = 0.7 + 0.3 * sin(time + position.x * 10.0 + position.y * 5.0 + position.z * 7.0);
            
            gl_PointSize = size * pixelRatio * twinkle;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            // Creating a soft circular point
            float distance = length(gl_PointCoord - vec2(0.5, 0.5));
            if (distance > 0.5) discard;
            
            // Softer edges
            float opacity = 1.0 - smoothstep(0.3, 0.5, distance);
            gl_FragColor = vec4(vColor, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      
      return new THREE.Points(geometry, starMaterial);
    };
    
    // Create multiple starfields at different distances
    const starField1 = createStarField(800, 300);
    const starField2 = createStarField(1200, 500);
    scene.add(starField1);
    scene.add(starField2);
    
    // Nebula - Volumetric effect using multiple planes with noise textures
    const createNebula = (position, radius, color) => {
      const group = new THREE.Group();
      
      for (let i = 0; i < 8; i++) {
        // Create noise texture
        const texture = createNoiseTexture(color);
        
        // Create plane with noise texture
        const planeGeometry = new THREE.PlaneGeometry(radius * 2, radius * 2);
        const planeMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.04,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide
        });
        
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        
        // Rotate and position the plane
        plane.rotation.x = Math.random() * Math.PI;
        plane.rotation.y = Math.random() * Math.PI;
        plane.rotation.z = Math.random() * Math.PI;
        
        plane.position.set(
          position.x + (Math.random() - 0.5) * radius * 0.5,
          position.y + (Math.random() - 0.5) * radius * 0.5,
          position.z + (Math.random() - 0.5) * radius * 0.5
        );
        
        group.add(plane);
      }
      
      return group;
    };
    
    // Create noise texture for nebula
    const createNoiseTexture = (color) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      // Get color components
      const r = (color >> 16) & 255;
      const g = (color >> 8) & 255;
      const b = color & 255;
      
      // Create noise pattern
      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const data = imgData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvas.width;
        const y = Math.floor((i / 4) / canvas.width);
        
        // Perlin-like noise effect (simplified)
        let noise = Math.sin(x * 0.01) * Math.sin(y * 0.01) * 0.5 + 0.5;
        noise *= Math.sin(x * 0.02 + y * 0.03) * 0.5 + 0.5;
        noise *= Math.sin(y * 0.02 - x * 0.01) * 0.5 + 0.5;
        
        // Apply falloff from center
        const dx = x - canvas.width / 2;
        const dy = y - canvas.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const falloff = Math.max(0, 1 - distance / (canvas.width * 0.4));
        
        noise *= falloff * falloff;
        
        // Set color with noise as alpha
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = noise * 255;
      }
      
      ctx.putImageData(imgData, 0, 0);
      
      return new THREE.CanvasTexture(canvas);
    };
    
    // Add nebulae
    const nebula1 = createNebula(new THREE.Vector3(70, -20, 100), 80, 0x6366f1);
    const nebula2 = createNebula(new THREE.Vector3(-120, 30, -70), 100, 0xa855f7);
    scene.add(nebula1);
    scene.add(nebula2);
    
    // Lens flares
    const addLensFlare = () => {
      const textureLoader = new THREE.TextureLoader();
      const textureFlare = textureLoader.load('data:image/png;base64,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');
      
      // Lens flare with custom shader
      const lensFlare = new THREE.Mesh(
        new THREE.PlaneGeometry(120, 120),
        new THREE.ShaderMaterial({
          uniforms: {
            map: { value: textureFlare },
            screenPosition: { value: new THREE.Vector3() },
            time: { value: 0 },
            opacity: { value: 0.5 }
          },
          vertexShader: `
            varying vec2 vUv;
            
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D map;
            uniform vec3 screenPosition;
            uniform float time;
            uniform float opacity;
            varying vec2 vUv;
            
            void main() {
              vec2 uv = vUv;
              
              // Apply distortion
              uv.x += sin(uv.y * 10.0 + time * 0.5) * 0.01;
              uv.y += cos(uv.x * 10.0 + time * 0.5) * 0.01;
              
              vec4 color = texture2D(map, uv);
              color.a *= opacity;
              
              // Subtle color shifts
              color.r += sin(time * 0.2) * 0.05;
              color.b += cos(time * 0.3) * 0.05;
              
              gl_FragColor = color;
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthTest: false
        })
      );
      
      // Always face camera
      lensFlare.onBeforeRender = function() {
        // Update lens flare position based on sun position
        const sunScreenPosition = new THREE.Vector3();
        sun.updateMatrixWorld();
        sunScreenPosition.setFromMatrixPosition(sun.matrixWorld);
        sunScreenPosition.project(camera);
        
        this.material.uniforms.screenPosition.value.copy(sunScreenPosition);
        
        // Orient lens flare to always face camera
        this.lookAt(camera.position);
        
        // Position lens flare to track sun position
        const distance = camera.position.length() * 0.95;
        this.position.copy(camera.position).normalize().multiplyScalar(distance);
      };
      
      scene.add(lensFlare);
      return lensFlare;
    };
    
    const lensFlare = addLensFlare();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Loading indicator
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Update shader materials
      sunGlowMaterial.uniforms.time.value = time;
      
      orbitPaths.forEach(path => {
        path.material.uniforms.time.value = time;
      });
      
      if (lensFlare) {
        lensFlare.material.uniforms.time.value = time;
      }
      
      // Star twinkling
      if (starField1.material.uniforms) {
        starField1.material.uniforms.time.value = time;
        starField2.material.uniforms.time.value = time;
      }
      
      // Orbit logos
      logoObjects.forEach((logo, i) => {
        const logoPos = logoPositions[i];
        logoPos.angle += logoPos.speed * 0.004; // Adjust speed
        
        const x = logoPos.radius * Math.cos(logoPos.angle);
        const z = logoPos.radius * Math.sin(logoPos.angle);
        
        // Keep existing Y position
        const y = logo.position.y;
        
        logo.position.set(x, y, z);
        
        // Add some oscillation in y axis
        logo.position.y = y + Math.sin(time * 2 + i) * 0.5;
        
        // Rotate logo object itself
        logo.rotation.y += 0.002 * (i % 2 === 0 ? 1 : -1);
      });
      
      // Slightly rotate nebulae
      nebula1.rotation.y += 0.0003;
      nebula2.rotation.y -= 0.0002;
      
      // Update orbit controls
      controls.update();
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      
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
    };
  }, []);
  
  return (
    <div className="relative w-full">
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-purple-500 font-bold">Loading 3D Experience...</div>
        </div>
      )}
      
      {/* 3D container */}
      <div 
        ref={mountRef} 
        className="w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden"
      />
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs sm:text-sm opacity-80 bg-gray-900/50 px-3 py-1 rounded-full pointer-events-none">
        Click and drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default Immersive3DSolarSystem;