/**
 * @metadata
 * @component AegisPlanet3DV6
 * @description 3D implementation of the AEGIS planet using React Three Fiber
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';
import { MeshDistortMaterial, Sphere, OrbitControls, Environment } from '@react-three/drei';
import { useScene } from './SceneControllerV6';

// The actual 3D planet mesh
const PlanetMesh = ({ phase }) => {
  const meshRef = useRef();
  const { performanceTier } = useScene().deviceCapabilities;
  
  // Calculate mesh detail based on performance tier
  const getDetail = () => {
    switch (performanceTier) {
      case 'high':
        return 64;
      case 'medium':
        return 32;
      default:
        return 16;
    }
  };
  
  // Animation springs for scale and distortion
  const { scale } = useSpring({
    scale: phase === 'void' ? 0.1 : phase === 'emergence' ? 0.7 : 1,
    config: config.gentle
  });
  
  const { distort } = useSpring({
    distort: phase === 'void' ? 0 : phase === 'emergence' ? 0.2 : 0.4,
    config: config.gentle
  });
  
  // Subtle continuous rotation
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotate slower for emergence phase
    const rotationSpeed = phase === 'void' ? 0 : phase === 'emergence' ? 0.001 : 0.002;
    meshRef.current.rotation.y += rotationSpeed;
    
    // Optional distortion animation for high-performance devices
    if (performanceTier === 'high' && phase === 'activation') {
      meshRef.current.material.distort = 0.3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  
  return (
    <animated.group scale={scale}>
      {/* Main planet sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, getDetail(), getDetail()]} />
        <MeshDistortMaterial
          color="#2563eb"
          envMapIntensity={1.2}
          clearcoat={performanceTier === 'high' ? 1 : 0.5}
          clearcoatRoughness={0.4}
          metalness={0.8}
          roughness={0.2}
          distort={distort}
        />
      </mesh>
      
      {/* Atmospheric glow */}
      <Sphere args={[2.1, 30, 30]} scale={1.1}>
        <meshBasicMaterial
          color="#84cc16"
          transparent
          opacity={0.15}
        />
      </Sphere>
      
      {/* Orbital rings - only in activation phase */}
      {phase === 'activation' && (
        <group>
          <Ring radius={2.6} thickness={0.02} color="#84cc16" opacity={0.2} />
          <Ring radius={3.2} thickness={0.015} color="#2563eb" opacity={0.15} />
          <Ring radius={3.8} thickness={0.01} color="#7e22ce" opacity={0.1} />
        </group>
      )}
    </animated.group>
  );
};

// Helper component for orbital rings
const Ring = ({ radius, thickness, color, opacity }) => {
  const ringRef = useRef();
  
  useFrame(() => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = Math.PI / 4;
    ringRef.current.rotation.y += 0.001;
  });
  
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, thickness, 16, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

// Scene setup with proper lighting and camera
const SceneSetup = ({ children }) => {
  const { camera } = useThree();
  const { performanceTier } = useScene().deviceCapabilities;
  
  // Set initial camera position
  useEffect(() => {
    camera.position.z = 6;
  }, [camera]);
  
  return (
    <>
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Environment for reflections - only for high performance */}
      {performanceTier === 'high' && <Environment preset="city" />}
      
      {/* Scene content */}
      {children}
      
      {/* Subtle orbit controls - disabled for production */}
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
    </>
  );
};

// Main 3D component
const AegisPlanet3DV6 = ({ phase }) => {
  return (
    <div className="w-[300px] h-[300px]">
      <Canvas>
        <SceneSetup>
          <PlanetMesh phase={phase} />
        </SceneSetup>
      </Canvas>
    </div>
  );
};

export default AegisPlanet3DV6;