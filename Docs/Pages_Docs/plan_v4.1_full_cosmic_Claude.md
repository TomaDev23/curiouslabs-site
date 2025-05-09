
# LEGIT-Compliant Galaxy Journey Implementation Plan

## Phase 1: LEGIT Foundation Setup (Week 1)

### TILE 1.1: Project Structure
- Create `/src/components/journey/visual/GalaxyJourney/` directory structure
- Implement LEGIT metadata declarations for all components
- Setup contract documentation in `/Docs/contracts/contract_galaxy_journey.md`

### TILE 1.2: Core Hooks with LEGIT Compliance
- Implement `useScroll.js` with SCS tagging
- Implement `useAnimationFrame.js` with fallback safety
- Document hooks in respective contract files

### TILE 1.3: Three.js Canvas Integration
- Create LEGIT-compliant renderer component
- Implement proper cleanup for SSR safety
- Add mobile breakpoint handling
- Include required metadata blocks

```jsx
export const metadata = {
  id: 'galaxy_journey_renderer',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_galaxy_journey_renderer.md'
}
```

## Phase 2: LEGIT Particle Systems (Week 2)

### TILE 2.1: Stars Background
- Implement star field with breakpoint responsiveness
- Create component contract documentation
- Add fallback rendering options
- Ensure z-index compliance with route-lock.md

### TILE 2.2: Galaxy Core System
- Implement LEGIT-compliant galaxy particles
- Follow animation_schema_v1.5.md for transitions
- Create proper suspense fallbacks
- Document all props and behaviors

### TILE 2.3: Trails Effect System
- Implement LEGIT-compliant trail particles
- Add mobile optimization variants
- Document performance considerations
- Ensure proper cleanup to prevent memory leaks

## Phase 3: LEGIT Shader Implementation (Week 3)

### TILE 3.1: Galaxy Vertex Shader
- Implement shader with proper documentation
- Add mobile-specific optimizations
- Create fallback mode for low-end devices
- Document in contract files

### TILE 3.2: Galaxy Fragment Shader
- Implement with consistent visual standards
- Document blend modes and z-index usage
- Create performance variant documentation
- Ensure visual consistency with design system

### TILE 3.3: Trails Shaders
- Implement with LEGIT animation triggers
- Document keyboard accessibility considerations
- Create contract for trail behavior
- Ensure SSR-safe implementation

## Phase 4: LEGIT Animation & Scene Transitions (Week 4)

### TILE 4.1: Scene Parameter Management
- Implement with SCS sync tagging
- Document transition behaviors in contract
- Ensure accessibility compliance
- Add animation fallbacks

### TILE 4.2: Camera Effects
- Create LEGIT-compliant camera controls
- Document in appropriate contract files
- Implement valid layout spacing
- Ensure graceful failure modes

### TILE 4.3: Sequence Timing
- Implement with scroll linkage via proper IDs
- Document timing specifications
- Create contract for timing behavior
- Ensure consistency with animation schema

## Phase 5: LEGIT Optimization & Integration (Week 5)

### TILE 5.1: Performance Optimization
- Implement LEGIT-compliant performance measures
- Document device capability detection
- Create optimization contract
- Implement console markers for monitoring

### TILE 5.2: Visual Refinement
- Ensure consistent visual language
- Document in design contract
- Verify on all breakpoints
- Add LEGIT compliance markers

### TILE 5.3: Main App Integration
- Add /cosmic-rev route to route-lock.md
- Implement correct page structure with proper IDs
- Document integration in contracts
- Ensure all components are properly imported/lazy-loaded

## Cosmic-Rev Page Implementation

```jsx
// src/pages/CosmicRevDev.jsx
import React, { Suspense } from 'react';
import { lazy } from 'react';

// Lazy-load LEGIT components
const GalaxyJourney = lazy(() => import('../components/journey/visual/GalaxyJourney'));

// LEGIT metadata declaration
export const metadata = {
  id: 'cosmic_rev_page',
  scs: 'SCS5',
  type: 'page',
  doc: 'contract_cosmic_rev_page.md'
}

const CosmicRevDev = () => {
  return (
    <div id="cosmic-rev-container" className="min-h-[550vh] relative">
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading Galaxy...</div>}>
        <GalaxyJourney />
      </Suspense>
      
      {/* Content sections with proper IDs for scroll linkage */}
      <section id="dormant-section" className="h-[50vh] relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white pt-24">Dormant Galaxy</h1>
        </div>
      </section>
      
      <section id="awakening-section" className="h-[50vh] relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white pt-24">Galaxy Awakening</h2>
        </div>
      </section>
      
      <section id="cosmic-reveal-section" className="h-[100vh] relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white pt-24">Cosmic Reveal</h2>
        </div>
      </section>
      
      <section id="cosmic-flight-section" className="h-[350vh] relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white pt-24">Cosmic Flight</h2>
        </div>
      </section>
    </div>
  );
};

export default CosmicRevDev;
```

## Route Integration

```jsx
// App.jsx (route addition)
<Route path="/cosmic-rev" element={
  <Suspense fallback={<div>Loading...</div>}>
    <CosmicRevDev />
  </Suspense>
} />
```

## Implementation Notes

1. **LEGIT Compliance Steps**:
   - All components will include required metadata blocks
   - Documentation contracts will be created for each component
   - Components will support fallback rendering and mobile breakpoints
   - All animations will follow the animation schema specified

2. **Development Validation Process**:
   - Render testing for each component
   - Animation trigger verification
   - Mobile rendering verification (sm and md views)
   - Fallback testing with undefined props
   - Console logging for performance monitoring
   - SCS sync tagging

3. **Performance Considerations**:
   - Implement device capability detection to adjust particle counts
   - Use frustum culling for off-screen optimization
   - Implement pixel ratio limiting for high-DPI displays
   - Ensure proper cleanup to prevent memory leaks
   - Document performance expectations in contracts

All components will be built following LEGIT standards and properly integrated into the `/cosmic-rev` page with appropriate route declaration.

===============================================================================================================================

# Galaxy Journey Implementation Plan

## Phase 1: Foundation Setup (Week 1)

### TILE 1.1: Project Structure
- Set up folder structure
- Create skeleton files
- Implement basic component interfaces

### TILE 1.2: Core Hooks
- Implement `useScroll.js` for tracking scroll position
- Implement `useAnimationFrame.js` for animation loop
- Setup scene initialization logic

### TILE 1.3: Three.js Canvas Integration
- Create renderer component with canvas
- Setup Three.js scene, camera, renderer
- Implement resize handlers
- Verify empty scene renders correctly

## Phase 2: Particle Systems (Week 2)

### TILE 2.1: Stars Background
- Implement basic star field (~2000 particles)
- Setup particle attributes and geometry
- Create simple fragment/vertex shaders for stars
- Test visual appearance

### TILE 2.2: Galaxy Core System
- Implement galaxy particle generation (~15,000 particles)
- Setup spiral arm distribution logic
- Configure particle attributes (position, color, size)
- Add formation and explosion factor attributes

### TILE 2.3: Trails Effect System
- Implement trail particles (~5,000 particles)
- Setup elongated particle rendering
- Create velocity-based animation
- Test trail visual appearance

## Phase 3: Shader Implementation (Week 3)

### TILE 3.1: Galaxy Vertex Shader
- Implement position calculations
- Add rotation and distance effects
- Setup formation and explosion transformations
- Configure point size and opacity calculations

### TILE 3.2: Galaxy Fragment Shader
- Implement circular particle rendering
- Add glow effects
- Setup alpha blending
- Test particle appearance

### TILE 3.3: Trails Shaders
- Implement trail vertex animation
- Add elongated particle rendering in fragment shader
- Configure trail transparency and color
- Test trail motion effects

## Phase 4: Animation & Scene Transitions (Week 4)

### TILE 4.1: Scene Parameter Management
- Implement scene detection based on scroll
- Setup scene-specific parameter configuration
- Implement parameter interpolation (lerp)
- Test basic transition between scenes

### TILE 4.2: Camera Effects
- Implement scene-specific camera movements
- Add gentle floating motion in dormant scene
- Configure dramatic sweeps during cosmic reveal
- Add explosion camera shake effect

### TILE 4.3: Sequence Timing
- Fine-tune transition timing
- Implement explosion effect at 115-125vh
- Configure formation progression
- Adjust trail appearance/disappearance timing

## Phase 5: Optimization & Integration (Week 5)

### TILE 5.1: Performance Optimization
- Implement frustum culling
- Add pixel ratio limiting
- Optimize shader calculations
- Test on lower-end devices

### TILE 5.2: Visual Refinement
- Fine-tune color schemes
- Adjust particle sizes and densities
- Refine glow and blend effects
- Polish camera movements

### TILE 5.3: Main App Integration
- Integrate with scroll container
- Add proper z-indexing with content
- Ensure proper rendering with other components
- Final testing across device types

## Implementation Notes

1. **Technology Stack**:
   - Three.js for WebGL rendering
   - React for component structure
   - Custom GLSL shaders for visual effects

2. **Key Technical Approaches**:
   - Use shader-based animation for optimal performance
   - Implement smooth parameter interpolation for transitions
   - Utilize attribute buffers for efficient particle management
   - Apply additive blending for glowing effects

3. **Performance Considerations**:
   - Limit visible particles based on device capability
   - Use frustum culling to avoid rendering off-screen particles
   - Implement pixel ratio limiting for high-DPI displays
   - Ensure proper cleanup to prevent memory leaks

4. **Development Strategy**:
   - Build incrementally with visible progress at each step
   - Test frequently on both high and low-end devices
   - Separate visual development from scroll integration
   - Use dev tools to monitor performance and memory usage

Would you like me to elaborate on any specific phase or tile for more detailed implementation guidance?



# Galaxy Journey Sequence - Complete Implementation

Let me break down this complex animation sequence into manageable pieces that won't overload Cursor. I'll structure it as separate files you can implement one by one.

## 1. First - Create Project Structure

```
src/
  components/
    GalaxyJourney/
      index.jsx              // Main component
      GalaxyRenderer.jsx     // Three.js scene
      shaders/
        galaxy.vert.js       // Galaxy vertex shader
        galaxy.frag.js       // Galaxy fragment shader
        trails.vert.js       // Trails vertex shader 
        trails.frag.js       // Trails fragment shader
      hooks/
        useScroll.js         // Scroll tracking
        useAnimationFrame.js // Animation loop
```

## 2. Main Component (index.jsx)

```jsx
import React, { useEffect, useRef, useState } from 'react';
import GalaxyRenderer from './GalaxyRenderer';
import useScroll from './hooks/useScroll';

const GalaxyJourney = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { scrollProgress, rawScroll } = useScroll();
  
  // Update canvas dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate active scene based on scroll position
  const getSceneData = () => {
    // Map scroll position (0-550vh) to scene transitions
    const totalHeight = 550; // vh units
    const scrollPosition = rawScroll / window.innerHeight * 100; // in vh
    
    let scene = 'dormant';
    let progress = 0;
    
    if (scrollPosition < 50) {
      // Small milky way (0-50vh)
      scene = 'dormant';
      progress = scrollPosition / 50;
    } else if (scrollPosition < 100) {
      // Swirl animation (50-100vh)
      scene = 'awakening';
      progress = (scrollPosition - 50) / 50;
    } else if (scrollPosition < 200) {
      // Explosion and stabilization (100-200vh)
      scene = 'cosmicReveal';
      progress = (scrollPosition - 100) / 100;
    } else if (scrollPosition <= 550) {
      // Play around (200-550vh)
      scene = 'cosmicFlight';
      progress = (scrollPosition - 200) / 350;
    }
    
    // Special flag for explosion effect at 120vh
    const isExploding = scrollPosition >= 115 && scrollPosition <= 125;
    const explosionProgress = isExploding ? 
      (scrollPosition - 115) / 10 : 
      (scrollPosition < 115 ? 0 : 1);
    
    return {
      scene,
      progress,
      isExploding,
      explosionProgress,
      scrollPosition
    };
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    >
      {dimensions.width > 0 && (
        <GalaxyRenderer 
          width={dimensions.width}
          height={dimensions.height}
          sceneData={getSceneData()}
          scrollProgress={scrollProgress}
        />
      )}
      
      {/* Invisible div to create scrollable space */}
      <div style={{ height: '550vh' }} />
    </div>
  );
};

export default GalaxyJourney;
```

## 3. Scroll Hook (hooks/useScroll.js)

```jsx
import { useState, useEffect } from 'react';

const useScroll = () => {
  const [scrollState, setScrollState] = useState({
    scrollProgress: 0,
    rawScroll: 0,
    direction: 'down',
    velocity: 0
  });
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTimestamp = performance.now();
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const timestamp = performance.now();
      const delta = scrollY - lastScrollY;
      const timeDelta = timestamp - lastTimestamp;
      
      // Calculate scroll height (document height minus viewport height)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate normalized scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, scrollY / scrollHeight));
      
      // Calculate scroll velocity
      const velocity = timeDelta > 0 ? delta / timeDelta : 0;
      
      // Determine scroll direction
      const direction = delta > 0 ? 'down' : delta < 0 ? 'up' : 'none';
      
      setScrollState({
        scrollProgress,
        rawScroll: scrollY,
        direction,
        velocity
      });
      
      lastScrollY = scrollY;
      lastTimestamp = timestamp;
    };
    
    // Initialize
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return scrollState;
};

export default useScroll;
```

## 4. Animation Hook (hooks/useAnimationFrame.js)

```jsx
import { useRef, useEffect } from 'react';

const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime, time);
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
};

export default useAnimationFrame;
```

## 5. Galaxy Renderer (GalaxyRenderer.jsx)

```jsx
import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import useAnimationFrame from './hooks/useAnimationFrame';

// Import shaders
import galaxyVertexShader from './shaders/galaxy.vert';
import galaxyFragmentShader from './shaders/galaxy.frag';
import trailsVertexShader from './shaders/trails.vert';
import trailsFragmentShader from './shaders/trails.frag';

const GalaxyRenderer = ({ width, height, sceneData, scrollProgress }) => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const galaxyRef = useRef();
  const trailsRef = useRef();
  const starsRef = useRef();
  
  const { scene, progress, isExploding, explosionProgress, scrollPosition } = sceneData;
  
  // Initialize Three.js scene
  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    
    // Create galaxy
    createGalaxy();
    
    // Create stars
    createStars();
    
    // Create trails
    createTrails();
    
    return () => {
      // Cleanup
      if (galaxyRef.current) {
        galaxyRef.current.geometry.dispose();
        galaxyRef.current.material.dispose();
      }
      
      if (trailsRef.current) {
        trailsRef.current.geometry.dispose();
        trailsRef.current.material.dispose();
      }
      
      if (starsRef.current) {
        starsRef.current.geometry.dispose();
        starsRef.current.material.dispose();
      }
      
      renderer.dispose();
    };
  }, [width, height]);
  
  // Create galaxy particles
  const createGalaxy = () => {
    // Galaxy geometry
    const geometry = new THREE.BufferGeometry();
    const galaxyCount = 15000;
    
    // Create arrays for attributes
    const positions = new Float32Array(galaxyCount * 3);
    const colors = new Float32Array(galaxyCount * 3);
    const scales = new Float32Array(galaxyCount * 1);
    const randomness = new Float32Array(galaxyCount * 3);
    const formationFactors = new Float32Array(galaxyCount);
    const explosionFactors = new Float32Array(galaxyCount);
    
    // Initialize attributes
    const colorOptions = [
      new THREE.Color('#8e44ad'),  // Purple
      new THREE.Color('#2980b9'),  // Blue
      new THREE.Color('#f39c12'),  // Yellow
      new THREE.Color('#d35400')   // Orange
    ];
    
    const arms = 2; // Number of spiral arms
    const armSpread = 0.4; // Spread of particles around arms
    const spiralTightness = 4.0; // How tight the spiral is
    
    for (let i = 0; i < galaxyCount; i++) {
      // Position
      const i3 = i * 3;
      
      // Determine which arm this particle belongs to
      const armIndex = Math.floor(Math.random() * arms);
      const armAngle = (armIndex / arms) * Math.PI * 2;
      
      // Calculate radius (more particles in outer areas)
      const radius = Math.random() * 15;
      
      // Calculate angle based on radius and arm
      const spinAngle = radius * 0.5;
      const branchAngle = spinAngle + armAngle;
      
      // Add randomness to each particle position
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * armSpread;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * armSpread;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * armSpread;
      
      randomness[i3] = randomX;
      randomness[i3 + 1] = randomY;
      randomness[i3 + 2] = randomZ;
      
      // Base positions (perfect spiral)
      positions[i3] = Math.cos(branchAngle) * radius;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = Math.sin(branchAngle) * radius;
      
      // Color
      const mixedColor = colorOptions[armIndex % colorOptions.length];
      const colorVariation = 0.3; // How much color can vary
      
      colors[i3] = mixedColor.r * (1 + (Math.random() - 0.5) * colorVariation);
      colors[i3 + 1] = mixedColor.g * (1 + (Math.random() - 0.5) * colorVariation);
      colors[i3 + 2] = mixedColor.b * (1 + (Math.random() - 0.5) * colorVariation);
      
      // Size
      scales[i] = Math.random() * 1.5 + 0.5;
      
      // Formation factor (determines when this particle appears during formation)
      formationFactors[i] = Math.random();
      
      // Explosion factor (determines how much this particle moves during explosion)
      const distFromCenter = Math.sqrt(positions[i3]**2 + positions[i3+1]**2 + positions[i3+2]**2);
      explosionFactors[i] = Math.max(0.3, 1.0 - distFromCenter / 15);
    }
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));
    geometry.setAttribute('aFormationFactor', new THREE.BufferAttribute(formationFactors, 1));
    geometry.setAttribute('aExplosionFactor', new THREE.BufferAttribute(explosionFactors, 1));
    
    // Create material with shaders
    const material = new THREE.ShaderMaterial({
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 15.0 * window.devicePixelRatio },
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
    
    // Create mesh
    const galaxy = new THREE.Points(geometry, material);
    galaxyRef.current = galaxy;
    
    // Add to scene
    sceneRef.current.add(galaxy);
  };
  
  // Create star particles (background)
  const createStars = () => {
    const geometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    
    const positions = new Float32Array(starsCount * 3);
    const scales = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount; i++) {
      // Random positions in a large sphere around camera
      const radius = 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random size
      scales[i] = Math.random() * 0.5 + 0.5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    
    const material = new THREE.ShaderMaterial({
      vertexShader: /* Simplified for now - will add later */`
        attribute float aScale;
        
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          gl_PointSize = aScale * 2.0;
        }
      `,
      fragmentShader: /* Simplified for now - will add later */`
        varying vec3 vPosition;
        
        void main() {
          float distToCenter = length(gl_PointCoord - 0.5);
          float alpha = 1.0 - smoothstep(0.4, 0.5, distToCenter);
          
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.5);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const stars = new THREE.Points(geometry, material);
    starsRef.current = stars;
    
    sceneRef.current.add(stars);
  };
  
  // Create trail particles (motion effect)
  const createTrails = () => {
    const geometry = new THREE.BufferGeometry();
    const trailCount = 5000;
    
    const positions = new Float32Array(trailCount * 3);
    const colors = new Float32Array(trailCount * 3);
    const scales = new Float32Array(trailCount);
    const velocities = new Float32Array(trailCount * 3);
    
    for (let i = 0; i < trailCount; i++) {
      // Initially position trails far away (they'll move in during animation)
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 100; // Behind camera
      
      // Create blue-cyan colors for trails
      colors[i * 3] = 0.1 + Math.random() * 0.1; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      
      // Random size
      scales[i] = Math.random() * 2.0 + 1.0;
      
      // Velocity (toward camera & center with slight spread)
      velocities[i * 3] = (Math.random() - 0.5) * 0.2;     // X
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2; // Y
      velocities[i * 3 + 2] = Math.random() * 0.5 + 0.5;   // Z
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    
    const material = new THREE.ShaderMaterial({
      vertexShader: trailsVertexShader,
      fragmentShader: trailsFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 30.0 * window.devicePixelRatio },
        uTrailIntensity: { value: 0.0 }, // Controls trail visibility
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    
    const trails = new THREE.Points(geometry, material);
    trailsRef.current = trails;
    trails.visible = false; // Start invisible
    
    sceneRef.current.add(trails);
  };
  
  // Animation update function
  const updateScene = useCallback((deltaTime, time) => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Update galaxy parameters based on scene and progress
    updateGalaxyParams(time);
    
    // Update camera
    updateCamera(time);
    
    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [scene, progress, isExploding, explosionProgress, scrollPosition]);
  
  // Update galaxy parameters
  const updateGalaxyParams = (time) => {
    if (!galaxyRef.current || !trailsRef.current) return;
    
    // Set time uniform for both shaders
    galaxyRef.current.material.uniforms.uTime.value = time * 0.001;
    if (trailsRef.current.material.uniforms.uTime) {
      trailsRef.current.material.uniforms.uTime.value = time * 0.001;
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
        break;
        
      case 'awakening':
        // Galaxy swirls and approaches
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
        
        // Explosion happens around 120vh (progress 0.2 in this scene)
        if (explosionProgress > 0 && explosionProgress < 1) {
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
        if (trailsRef.current.visible && progress > 0.1) {
          trailsRef.current.visible = false;
        }
        break;
    }
    
    // Apply smooth transitions with linear interpolation
    const lerpFactor = 0.05;
    
    // Galaxy uniforms
    galaxyRef.current.material.uniforms.uOpacity.value += 
      (targetOpacity - galaxyRef.current.material.uniforms.uOpacity.value) * lerpFactor;
      
    galaxyRef.current.material.uniforms.uCompactFactor.value += 
      (targetCompactFactor - galaxyRef.current.material.uniforms.uCompactFactor.value) * lerpFactor;
      
    galaxyRef.current.material.uniforms.uFormationProgress.value += 
      (targetFormationProgress - galaxyRef.current.material.uniforms.uFormationProgress.value) * lerpFactor;
      
    galaxyRef.current.material.uniforms.uExplosionProgress.value += 
      (targetExplosionProgress - galaxyRef.current.material.uniforms.uExplosionProgress.value) * lerpFactor;
      
    galaxyRef.current.material.uniforms.uDistanceFactor.value += 
      (targetDistanceFactor - galaxyRef.current.material.uniforms.uDistanceFactor.value) * lerpFactor;
      
    galaxyRef.current.material.uniforms.uRotationSpeed.value += 
      (targetRotationSpeed - galaxyRef.current.material.uniforms.uRotationSpeed.value) * lerpFactor;
    
    // Trail uniforms
    if (trailsRef.current.visible) {
      trailsRef.current.material.uniforms.uTrailIntensity.value += 
        (targetTrailIntensity - trailsRef.current.material.uniforms.uTrailIntensity.value) * lerpFactor;
    }
  };
  
  // Update camera position and rotation
  const updateCamera = (time) => {
    if (!cameraRef.current) return;
    
    const t = time * 0.0001;
    
    // Base camera position
    let cameraX = 0;
    let cameraY = 0;
    let cameraZ = 30;
    
    // Scene-specific camera movements
    switch (scene) {
      case 'dormant':
        // Gentle floating movement
        cameraX = Math.sin(t * 0.5) * 3;
        cameraY = Math.cos(t * 0.3) * 2;
        break;
        
      case 'awakening':
        // More dynamic movement
        cameraX = Math.sin(t * 1.0) * 5 * progress;
        cameraY = Math.cos(t * 0.7) * 3 * progress;
        break;
        
      case 'cosmicReveal':
        // Wide sweeping movement
        cameraX = Math.sin(t * 1.5) * 8;
        cameraY = Math.cos(t * 1.0) * 5;
        
        // Camera shake during explosion
        if (explosionProgress > 0 && explosionProgress < 1) {
          const shakeIntensity = Math.sin(explosionProgress * Math.PI) * 2;
          cameraX += (Math.random() - 0.5) * shakeIntensity;
          cameraY += (Math.random() - 0.5) * shakeIntensity;
          cameraZ += (Math.random() - 0.5) * shakeIntensity;
        }
        break;
        
      case 'cosmicFlight':
        // Smooth flowing movement
        cameraX = Math.sin(t * 0.2) * 10 + Math.sin(t * 0.7) * 3;
        cameraY = Math.cos(t * 0.3) * 7 + Math.cos(t * 0.5) * 2;
        
        // Circle around galaxy
        const circleRadius = 15 + Math.sin(progress * Math.PI * 2) * 5;
        const circleSpeed = 0.1 + Math.sin(progress * Math.PI) * 0.05;
        const circleAngle = t * circleSpeed;
        
        cameraX = Math.sin(circleAngle) * circleRadius;
        cameraY = Math.cos(circleAngle) * circleRadius * 0.6;
        cameraZ = 20 + Math.sin(t * 0.2) * 5;
        break;
    }
    
    // Apply camera position with smooth transitions
    cameraRef.current.position.x += (cameraX - cameraRef.current.position.x) * 0.05;
    cameraRef.current.position.y += (cameraY - cameraRef.current.position.y) * 0.05;
    cameraRef.current.position.z += (cameraZ - cameraRef.current.position.z) * 0.05;
    
    // Always look at center
    cameraRef.current.lookAt(0, 0, 0);
  };
  
  // Start animation loop
  useAnimationFrame(updateScene);
  
  // Handle resize
  useEffect(() => {
    if (rendererRef.current && cameraRef.current) {
      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [width, height]);
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default GalaxyRenderer;
```

## 6. Shaders - Galaxy Vertex Shader (shaders/galaxy.vert.js)

```js
export default `
attribute vec3 color;
attribute float aScale;
attribute vec3 aRandomness;
attribute float aFormationFactor;
attribute float aExplosionFactor;

uniform float uTime;
uniform float uSize;
uniform float uCompactFactor;
uniform float uFormationProgress;
uniform float uExplosionProgress;
uniform float uDistanceFactor;
uniform float uRotationSpeed;

varying vec3 vColor;
varying float vOpacity;

void main() {
  // Preserve original position
  vec3 originalPosition = position;
  
  // Calculate position with randomness based on formation progress
  vec3 randomPos = originalPosition + aRandomness * uFormationProgress;
  
  // Calculate compact position (small distant galaxy)
  vec3 compactPosition = originalPosition * uCompactFactor;
  
  // Calculate explosion effect
  float explosionStrength = uExplosionProgress * aExplosionFactor * 5.0;
  vec3 explosionPosition = randomPos * (1.0 + explosionStrength);
  
  // Interpolate between compact and full galaxy based on formation progress
  vec3 finalPosition = mix(compactPosition, explosionPosition, uFormationProgress);
  
  // Apply distance factor (z translation)
  finalPosition.z -= uDistanceFactor;
  
  // Apply rotation
  float angle = uTime * uRotationSpeed;
  mat3 rotationMatrix = mat3(
    cos(angle), 0.0, sin(angle),
    0.0, 1.0, 0.0,
    -sin(angle), 0.0, cos(angle)
  );
  finalPosition = rotationMatrix * finalPosition;
  
  // Pass position to model-view-projection matrices
  vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  
  // Point size based on scale and formation progress
  // Make distance stars smaller
  float sizeFactor = mix(0.3, 1.0, uFormationProgress);
  
  // Size decrease with distance
  float distance = length(viewPosition.xyz);
  float distanceScale = 1.0 / (1.0 + 0.05 * distance);
  
  // Size variation over time
  float sizeVariation = 1.0 + sin(uTime + aFormationFactor * 10.0) * 0.2;
  
  gl_PointSize = uSize * aScale * sizeFactor * distanceScale * sizeVariation;
  
  // Pass color to fragment shader
  vColor = color;
  
  // Fade in particles based on formation factor
  float formationVisibility = smoothstep(0.0, 0.2 + aFormationFactor * 0.8, uFormationProgress);
  
  // Overall opacity
  vOpacity = uOpacity * formationVisibility;
}
`;
```

## 7. Shaders - Galaxy Fragment Shader (shaders/galaxy.frag.js)

```js
export default `
varying vec3 vColor;
varying float vOpacity;

void main() {
  // Calculate distance from center of point (0.5, 0.5)
  float distanceToCenter = length(gl_PointCoord - 0.5);
  
  // Create circular shape with soft edges
  float alpha = smoothstep(0.5, 0.4, distanceToCenter);
  
  // Apply glow effect
  float glow = exp(-distanceToCenter * 5.0) * 0.3;
  
  // Mix base color with glow
  vec3 finalColor = vColor + glow;
  
  // Final color with opacity
  gl_FragColor = vec4(finalColor, alpha * vOpacity);
}
`;
```

## 8. Shaders - Trails Vertex Shader (shaders/trails.vert.js)

```js
export default `
attribute vec3 color;
attribute float aScale;
attribute vec3 aVelocity;

uniform float uTime;
uniform float uSize;
uniform float uTrailIntensity;

varying vec3 vColor;
varying float vOpacity;

void main() {
  // Use time and velocity to animate particles toward camera
  vec3 animatedPosition = position;
  animatedPosition += aVelocity * uTime * 20.0;
  
  // Reset particles that have moved too far
  if (animatedPosition.z > 30.0) {
    animatedPosition.z = -100.0 + mod(animatedPosition.z, 130.0);
  }
  
  // Transform position
  vec4 modelPosition = modelMatrix * vec4(animatedPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  
  // Base size
  float size = uSize * aScale;
  
  // Increase size of trails closer to camera
  float distance = length(viewPosition.xyz);
  float distanceScale = 1.0 / (1.0 + 0.05 * distance);
  
  gl_PointSize = size * distanceScale;
  
  // Pass color to fragment shader
  vColor = color;
  
  // Control trail opacity with uniform
  vOpacity = uTrailIntensity;
}
`;
```

## 9. Shaders - Trails Fragment Shader (shaders/trails.frag.js)

```js
export default `
varying vec3 vColor;
varying float vOpacity;

void main() {
  // Convert point coord to [-1, 1] range
  vec2 uv = 2.0 * gl_PointCoord - 1.0;
  
  // Elongate on Y axis for trail effect
  uv.y *= 3.0;
  
  // Calculate distance from center
  float distance = length(uv);
  
  // Create soft particle edge with trail effect
  float alpha = smoothstep(1.0, 0.0, distance) * vOpacity;
  
  // Apply glow
  float glow = exp(-distance * 2.0) * 0.4;
  vec3 finalColor = vColor + glow;
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;
```

## 10. Integration with Main App

Add the GalaxyJourney component to your main app, making sure it's positioned appropriately and your content has enough height:

```jsx
import React from 'react';
import GalaxyJourney from './components/GalaxyJourney';

const App = () => {
  return (
    <div className="relative">
      {/* Galaxy background */}
      <GalaxyJourney />
      
      {/* Your content */}
      <div className="relative z-10">
        {/* Your sections can go here */}
        <section className="h-screen flex items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Welcome to the Cosmos</h1>
        </section>
        
        {/* More sections... */}
        
        {/* Create sections to fill 550vh */}
      </div>
    </div>
  );
};

export default App;
```

## Implementation Strategy

To implement this without overwhelming Cursor:

1. **First create the basic structure**:
   - Set up GalaxyJourney folder structure
   - Create the main component and hooks

2. **Implement basic Three.js rendering**:
   - Set up the canvas, scene, camera, and renderer
   - Create a simple test mesh to make sure it works

3. **Add particle systems incrementally**:
   - First implement stars background
   - Then add galaxy particles
   - Finally add trail particles

4. **Implement shader files one by one**:
   - Start with simplified shaders
   - Gradually add more complex effects

5. **Connect to scroll events and animate**:
   - Implement scroll tracking
   - Add scene transitions

This approach should let you build the galaxy sequence incrementally without overloading Cursor.