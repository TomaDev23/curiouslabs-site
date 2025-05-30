/**
 * @component AegisPlanet3DV6 - DEPRECATED
 * @status COMMENTED OUT - Replaced by EarthSphere.jsx
 * @replacement src/components/atomic/Planetary/EarthSphere.jsx
 * @date_deprecated Phase 2 - Option B Implementation
 * @reason Performance optimization and consistency with Moon rendering system
 * 
 * @preservation_note
 * This file is preserved for potential future reference or rollback.
 * The complex atmosphere and cloud systems may be useful for future enhancements.
 * 
 * @migration_path
 * Old: <AegisPlanet3DV6 />
 * New: <EarthSphere scaleFactor={1} rotationY={null} />
 */

/*
// ORIGINAL IMPLEMENTATION - COMMENTED OUT FOR PRESERVATION

import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import { TextureLoader, ShaderMaterial, Vector3 } from 'three';
import * as THREE from 'three';

// Custom atmosphere shader - COMPLEX IMPLEMENTATION
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 glowColor;
  uniform float intensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    float glow = dot(vNormal, vec3(0.0, 0.0, 1.0));
    glow = pow(glow, 2.0);
    gl_FragColor = vec4(glowColor, glow * intensity);
  }
`;

// Planet component with complex rendering
const Planet = ({ scenePhase = 0, scaleFactor = 1 }) => {
  const planetRef = useRef();
  const atmosphereRef = useRef();
  const cloudsRef = useRef();
  const ringsRef = useRef();
  
  // Load multiple texture maps
  const earthTexture = useLoader(TextureLoader, '/assets/images/planets/4k/earthmap2k.jpg');
  const earthBumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/earthbump2k.jpg');
  const earthSpecularMap = useLoader(TextureLoader, '/assets/images/planets/4k/earthspec2k.jpg');
  const cloudTexture = useLoader(TextureLoader, '/assets/images/planets/4k/earthcloudmap.jpg');
  
  // Custom atmosphere material
  const atmosphereMaterial = useMemo(() => new ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    uniforms: {
      glowColor: { value: new Vector3(0.3, 0.6, 1.0) },
      intensity: { value: 0.8 }
    },
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending
  }), []);
  
  // Animation loop with complex phase-based updates
  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001;
      
      // Phase-based transformations
      const phaseRotation = scenePhase * 0.1;
      planetRef.current.rotation.x = Math.sin(phaseRotation) * 0.1;
      planetRef.current.rotation.z = Math.cos(phaseRotation) * 0.05;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0008;
    }
    
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005;
    }
    
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.002;
    }
  });
  
  return (
    <group scale={scaleFactor}>
      // Complex lighting setup
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#4a90e2" />
      
      // Orbital rings
      <mesh ref={ringsRef}>
        <torusGeometry args={[6, 0.1, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      
      // Atmosphere layer
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[4.3, 64, 64]} />
        <primitive object={atmosphereMaterial} />
      </mesh>
      
      // Cloud layer
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[4.18, 64, 64]} />
        <meshLambertMaterial 
          map={cloudTexture}
          transparent
          opacity={0.4}
          alphaMap={cloudTexture}
        />
      </mesh>
      
      // Main planet
      <mesh ref={planetRef}>
        <sphereGeometry args={[4.16, 64, 64]} />
        <meshPhongMaterial 
          map={earthTexture}
          bumpMap={earthBumpMap}
          bumpScale={0.05}
          specularMap={earthSpecularMap}
          shininess={100}
        />
      </mesh>
    </group>
  );
};

// Main component with performance detection
const AegisPlanet3DV6 = ({ 
  className = "",
  scenePhase = 0,
  scaleFactor = 1
}) => {
  const [performanceMode, setPerformanceMode] = React.useState('high');
  
  // Performance detection
  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    
    if (!gl) {
      setPerformanceMode('fallback');
      return;
    }
    
    const renderer = gl.getParameter(gl.RENDERER);
    if (renderer && renderer.toLowerCase().includes('software')) {
      setPerformanceMode('low');
    }
  }, []);
  
  if (performanceMode === 'fallback') {
    return (
      <div className={`relative rounded-full ${className}`}>
        <div 
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, #4a90e2 0%, #1e3a8a 100%)',
            borderRadius: '50%'
          }}
        />
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <React.Suspense fallback={null}>
          <Planet 
            scenePhase={scenePhase} 
            scaleFactor={scaleFactor}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default AegisPlanet3DV6;

// END ORIGINAL IMPLEMENTATION
*/

// REPLACEMENT NOTICE
console.warn('AegisPlanet3DV6 has been deprecated. Use EarthSphere from src/components/atomic/Planetary/EarthSphere.jsx instead.');

// Temporary export to prevent import errors during transition
const DeprecatedAegisPlanet3DV6 = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      background: '#1a1a2e',
      color: '#ff6b6b',
      fontSize: '12px',
      textAlign: 'center',
      padding: '20px'
    }}>
      AegisPlanet3DV6 Deprecated<br/>
      Use EarthSphere instead
    </div>
  );
};

export default DeprecatedAegisPlanet3DV6;