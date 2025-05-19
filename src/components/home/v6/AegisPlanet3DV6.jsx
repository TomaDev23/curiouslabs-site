/**
 * @component AegisPlanet3DV6
 * @description 3D planet implementation with atmospheric effects and orbital rings
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - AegisPlanet3DV6 passes LEGIT protocol
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScene } from './SceneControllerV6';
import * as THREE from 'three';

const AegisPlanet3DV6 = ({ 
  radius = 1,
  rotationSpeed = 0.001,
  atmosphereColor = new THREE.Color(0x84cc16), // Lime color
  position = [0, 0, 0]
}) => {
  const { deviceCapabilities, scenePhase } = useScene();
  const planetRef = useRef();
  const atmosphereRef = useRef();
  const ringsRef = useRef();
  
  // Create atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        color: { value: atmosphereColor },
        viewVector: { value: new THREE.Vector3() }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(color, intensity);
        }
      `
    });
  }, [atmosphereColor]);
  
  // Animation loop
  useFrame((state) => {
    if (planetRef.current && scenePhase !== 'void') {
      // Rotate planet
      planetRef.current.rotation.y += rotationSpeed;
      
      // Update atmosphere
      if (atmosphereRef.current) {
        atmosphereRef.current.rotation.y += rotationSpeed * 0.5;
      }
      
      // Update rings
      if (ringsRef.current) {
        ringsRef.current.rotation.z += rotationSpeed * 0.2;
      }
    }
  });
  
  return (
    <group position={position}>
      {/* Planet mesh */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color={new THREE.Color(0x2563eb)}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      
      {/* Atmosphere */}
      <mesh ref={atmosphereRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>
      
      {/* Orbital rings */}
      <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 1.4, radius * 1.6, 128]} />
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default AegisPlanet3DV6;