/**
 * @component AegisPlanet3DV6
 * @description Enhanced 3D Earth implementation with atmospheric effects and orbital rings
 * 
 * @metadata
 * @version 1.1.0
 * @author CuriousLabs
 * @legit true - AegisPlanet3DV6 passes LEGIT protocol
 */

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useScene } from './SceneControllerV6';
import * as THREE from 'three';

// Texture paths based on performance tier
const TEXTURE_PATHS = {
  earth: '/assets/images/planets/4k/earthmap1k_LE_upscale_balanced_x4.jpg',
  bump: '/assets/images/planets/4k/earthbump1k_LE_upscale_balanced_x4.jpg',
  clouds: '/assets/images/planets/4k/earthcloudmap_LE_upscale_balanced_x4.jpg'
};

// Atmosphere shader
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 color;
  uniform vec3 viewPosition;
  uniform float atmosphereIntensity;
  uniform float time;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vec3 worldViewDir = normalize(viewPosition - vWorldPosition);
    
    // Base atmosphere glow
    float intensity = pow(0.7 - dot(vNormal, worldViewDir), 2.0);
    
    // Inner glow
    float innerGlow = pow(dot(vNormal, worldViewDir), 4.0);
    
    // Pulse effect
    float pulse = sin(time * 0.5) * 0.5 + 0.5;
    
    // Rim lighting
    float rim = 1.0 - max(dot(worldViewDir, vNormal), 0.0);
    rim = pow(rim, 4.0);
    
    // Combine effects
    float finalIntensity = (intensity + innerGlow * 0.3 + rim * 0.2) * atmosphereIntensity;
    finalIntensity *= mix(0.8, 1.2, pulse);
    
    gl_FragColor = vec4(color, finalIntensity);
  }
`;

const AegisPlanet3DV6 = ({
  radius = 1,
  rotationSpeed = 0.001,
  cloudSpeed = 0.0005,
  atmosphereColor = new THREE.Color(0xffffff),
  position = [0, 0, 0]
}) => {
  const { deviceCapabilities, scenePhase } = useScene();
  const { camera, clock } = useThree();
  
  // Refs for animation
  const planetRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();
  const ringsRef = useRef();

  // Performance-based texture quality
  const textureQuality = useMemo(() => {
    switch(deviceCapabilities.performanceTier) {
      case 'high': return 1;    // Full resolution
      case 'medium': return 0.5; // Half resolution
      case 'low': return 0.25;  // Quarter resolution
      default: return 0.125;    // Eighth resolution
    }
  }, [deviceCapabilities.performanceTier]);

  // Load and process textures
  const [earthTexture, bumpTexture, cloudTexture] = useLoader(THREE.TextureLoader, [
    TEXTURE_PATHS.earth,
    TEXTURE_PATHS.bump,
    TEXTURE_PATHS.clouds
  ]);

  // Configure textures
  useEffect(() => {
    [earthTexture, bumpTexture, cloudTexture].forEach(texture => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 4;
      
      // Adjust texture size based on performance tier
      if (textureQuality < 1) {
        const newWidth = Math.floor(texture.image.width * textureQuality);
        const newHeight = Math.floor(texture.image.height * textureQuality);
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(texture.image, 0, 0, newWidth, newHeight);
        texture.image = canvas;
        texture.needsUpdate = true;
      }
    });
  }, [earthTexture, bumpTexture, cloudTexture, textureQuality]);

  // Create atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: atmosphereColor },
        viewPosition: { value: camera.position },
        atmosphereIntensity: { value: 1.0 },
        time: { value: 0 }
      },
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [atmosphereColor, camera.position]);

  // Animation loop
  useFrame((state, delta) => {
    if (scenePhase === 'void') return;

    // Update planet rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed * delta;
    }

    // Update clouds rotation (slightly faster than planet)
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += (rotationSpeed + cloudSpeed) * delta;
    }

    // Update atmosphere
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += rotationSpeed * 0.5 * delta;
      atmosphereMaterial.uniforms.viewPosition.value.copy(camera.position);
      atmosphereMaterial.uniforms.time.value = clock.getElapsedTime();
      
      // Phase-based atmosphere intensity
      const intensity = scenePhase === 'activation' ? 1.0 : 0.5;
      atmosphereMaterial.uniforms.atmosphereIntensity.value = intensity;
    }

    // Update rings
    if (ringsRef.current) {
      ringsRef.current.rotation.z += rotationSpeed * 0.2 * delta;
    }
  });

  // Scale animation based on scene phase
  const scale = useMemo(() => {
    switch(scenePhase) {
      case 'void': return 0.8;
      case 'emergence': return 0.9;
      case 'activation': return 1;
      default: return 1;
    }
  }, [scenePhase]);

  return (
    <group position={position} scale={scale}>
      {/* Planet mesh */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          roughness={0.7}
          metalness={0.3}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Removed atmosphere completely */}
      {/* 
      <mesh ref={atmosphereRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>
      */}

      {/* Orbital rings */}
      <group ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
        {/* Main ring */}
        <mesh>
          <ringGeometry args={[radius * 1.4, radius * 1.6, 128]} />
          <meshBasicMaterial
            color="white"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Secondary ring */}
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <ringGeometry args={[radius * 1.5, radius * 1.65, 128]} />
          <meshBasicMaterial
            color="white"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
};

export default AegisPlanet3DV6;