import React, { useMemo, useRef } from 'react';
import { 
  BufferGeometry, 
  BufferAttribute, 
  PointsMaterial, 
  AdditiveBlending,
  ShaderMaterial
} from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * StarField - Enhanced implementation of a star field with twinkling effects, optional nebula,
 * and cosmic dust particles for depth and immersion
 * 
 * @id cosmic_starfield_r3f
 * @scs SCS-ENVIRONMENT-STARS
 * @type shader-layer
 * @doc Docs/contracts/Solar_System/contract_planet_components.md
 */
export default function StarField({ 
  starCount = 1200,
  nebulaParticleCount = 8000,
  cosmicDustCount = 5000,
  includeNebula = false,
  includeCosmicDust = true,
  rotationSpeed = 0.1,
  radius = 300,
  baseOpacity = 0.8,
  starDensity = 0.95,
  cosmicIntensity = 0.7,
  baseSize = 2.5,
  renderOrder = -1,
  visible = true
}) {
  // Group ref for overall rotation
  const groupRef = useRef();
  
  // Create star vertices with useMemo
  const stars = useMemo(() => {
    // Star geometry and attributes
    const geometry = new BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    // Create stars with cosmic-rev distribution and colors
    for (let i = 0; i < starCount; i++) {
      // Position stars in a sphere (from cosmic-rev)
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      // Star colors - mostly white with hints of blue and purple (from cosmic-rev)
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
      
      // Star sizes (from cosmic-rev)
      sizes[i] = (0.5 + Math.random() * 1.5) * (Math.random() > 0.95 ? 3 : 1);
    }
    
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    
    return { geometry, positions, colors, sizes };
  }, [starCount, radius]);
  
  // Create nebula particles with useMemo
  const nebula = useMemo(() => {
    if (!includeNebula) return null;
    
    const geometry = new BufferGeometry();
    const positions = new Float32Array(nebulaParticleCount * 3);
    const colors = new Float32Array(nebulaParticleCount * 3);
    const sizes = new Float32Array(nebulaParticleCount);
    const angles = new Float32Array(nebulaParticleCount);
    
    // Create a spiral galaxy shape (from cosmic-rev)
    for (let i = 0; i < nebulaParticleCount; i++) {
      // Galaxy spiral logic
      const armAngle = Math.random() * Math.PI * 2;
      const arm = Math.floor(Math.random() * 2); // 2 arms
      const armOffset = arm * Math.PI;
      
      const radiusScale = 0.5 + Math.random() * 0.5;
      const rad = Math.pow(Math.random(), 0.5) * 25 * radiusScale;
      const spinAngle = rad * 0.3 + armOffset + armAngle;
      
      const x = Math.cos(spinAngle) * rad;
      const y = (Math.random() - 0.5) * 2 * rad * 0.15;
      const z = Math.sin(spinAngle) * rad;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color logic from cosmic-rev
      const positionAngle = Math.atan2(z, x);
      const normalizedAngle = (positionAngle + Math.PI) / (Math.PI * 2);
      
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
    
    return { geometry, positions, colors, sizes, angles };
  }, [includeNebula, nebulaParticleCount]);
  
  // Create cosmic dust particles with useMemo
  const cosmicDust = useMemo(() => {
    if (!includeCosmicDust) return null;
    
    const geometry = new BufferGeometry();
    const positions = new Float32Array(cosmicDustCount * 3);
    const colors = new Float32Array(cosmicDustCount * 3);
    const sizes = new Float32Array(cosmicDustCount);
    
    // Create cosmic dust particles in a spherical shell
    for (let i = 0; i < cosmicDustCount; i++) {
      // Position dust in a spherical shell (now 375-600 units for 50% more coverage)
      const dustRadius = 375 + Math.random() * 225;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = dustRadius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dustRadius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dustRadius * Math.cos(phi);
      
      // Dust colors - 50% white, 50% cosmic colors
      const colorType = Math.random();
      
      if (colorType < 0.5) {
        // White/neutral for 50% of particles
        const whiteTint = 0.90 + Math.random() * 0.15; // Slightly brighter
        colors[i * 3] = whiteTint;
        colors[i * 3 + 1] = whiteTint;
        colors[i * 3 + 2] = whiteTint;
      } else if (colorType < 0.65) {
        // Blue tint
        colors[i * 3] = 0.5 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      } else if (colorType < 0.8) {
        // Purple/pink tint
        colors[i * 3] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
      } else if (colorType < 0.9) {
        // Yellow/orange tint
        colors[i * 3] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.4 + Math.random() * 0.2;
      } else {
        // Cyan/teal tint
        colors[i * 3] = 0.4 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      }
      
      // Particle sizes - now larger for visibility
      sizes[i] = 1.2 + Math.random() * 3.0;
    }
    
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    
    return { geometry, positions, colors, sizes };
  }, [includeCosmicDust, cosmicDustCount]);
  
  // Star shader material
  const starMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 }
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
      blending: AdditiveBlending,
      depthWrite: false
    });
  }, []);
  
  // Nebula shader material
  const nebulaMaterial = useMemo(() => {
    if (!includeNebula) return null;
    
    return new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 },
        progress: { value: cosmicIntensity }
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
          float rotationSpeed = 0.05;
          float rotation = time * rotationSpeed;
          float xNew = pos.x * cos(rotation) - pos.z * sin(rotation);
          float zNew = pos.x * sin(rotation) + pos.z * cos(rotation);
          pos.x = xNew;
          pos.z = zNew;
          
          // Add wavy motion
          float waveFreq = 0.3;
          float waveHeight = 0.5;
          pos.y += sin(time * 0.3 + dist * waveFreq) * waveHeight;
          
          // Add particle pulsing based on progress
          float pulse = 1.0 + sin(time * 0.8 + dist * 0.1) * 0.2;
          
          // Transform and project
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Set particle size with pulse effect
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
  }, [includeNebula, cosmicIntensity]);
  
  // Cosmic dust shader material
  const cosmicDustMaterial = useMemo(() => {
    if (!includeCosmicDust) return null;
    
    return new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 }
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
          
          // Subtle shimmer effect
          float shimmer = sin(time * 0.5 + position.x * 0.02 + position.y * 0.02 + position.z * 0.02) * 0.3 + 0.7;
          
          gl_PointSize = size * pixelRatio * shimmer;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Soft circular particles with glow
          vec2 uv = gl_PointCoord.xy - 0.5;
          float radius = length(uv);
          
          // Soft edge falloff
          float alpha = smoothstep(0.5, 0.1, radius);
          
          // Add subtle glow
          float glow = smoothstep(1.0, 0.1, radius);
          alpha = max(alpha, glow * 0.15);
          
          // Set to appropriate opacity for atmospheric effect
          gl_FragColor = vec4(vColor, alpha * 0.5);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    });
  }, [includeCosmicDust]);
  
  // References for animation
  const starPointsRef = useRef();
  const nebulaPointsRef = useRef();
  const cosmicDustRef = useRef();
  
  // Animation for twinkling and rotation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Update star material time uniform
    if (starPointsRef.current && starMaterial) {
      starMaterial.uniforms.time.value = time;
    }
    
    // Update nebula material time uniform
    if (nebulaPointsRef.current && nebulaMaterial) {
      nebulaMaterial.uniforms.time.value = time;
    }
    
    // Update cosmic dust material time uniform
    if (cosmicDustRef.current && cosmicDustMaterial) {
      cosmicDustMaterial.uniforms.time.value = time;
    }
    
    // Rotate entire group slowly
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0001 * rotationSpeed;
      groupRef.current.rotation.x += 0.00005 * rotationSpeed;
    }
  });
  
  if (!visible) return null;
  
  return (
    <group ref={groupRef} renderOrder={renderOrder}>
      {/* Cosmic dust layer - render first (furthest back) */}
      {includeCosmicDust && cosmicDust && (
        <points ref={cosmicDustRef} renderOrder={-10}>
          <primitive object={cosmicDust.geometry} attach="geometry" />
          <primitive object={cosmicDustMaterial} attach="material" />
        </points>
      )}
      
      {/* Stars */}
      <points ref={starPointsRef} renderOrder={-5}>
        <primitive object={stars.geometry} attach="geometry" />
        <primitive object={starMaterial} attach="material" />
      </points>
      
      {/* Nebula particles */}
      {includeNebula && nebula && (
        <points ref={nebulaPointsRef} renderOrder={-3}>
          <primitive object={nebula.geometry} attach="geometry" />
          <primitive object={nebulaMaterial} attach="material" />
        </points>
      )}
    </group>
  );
} 