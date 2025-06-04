import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useScene } from '../scene/SceneControllerV6';
import { useMission } from '../mission/MissionTracker';
import {
  Mesh,
  MeshPhysicalMaterial,
  Vector2,
  LinearMipmapLinearFilter,
  LinearMipmapNearestFilter,
  BackSide,
  AdditiveBlending,
  DoubleSide
} from 'three';

interface AegisPlanet3DProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}

const AegisPlanet3DV6: React.FC<AegisPlanet3DProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.001
}) => {
  const planetRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const { deviceCapabilities, phase } = useScene();
  const { updateSubtaskStatus } = useMission();

  // Load textures based on performance tier
  const textureQuality = deviceCapabilities.performanceTier === 'high' ? '2k' : '1k';
  const texturePath = `/textures/planet_${textureQuality}`;
  
  const [
    diffuseMap,
    normalMap,
    specularMap,
    atmosphereMap
  ] = useTexture([
    `${texturePath}_diffuse.jpg`,
    `${texturePath}_normal.jpg`,
    `${texturePath}_specular.jpg`,
    `${texturePath}_atmosphere.jpg`
  ]);

  // Optimize texture settings
  useEffect(() => {
    const textures = [diffuseMap, normalMap, specularMap, atmosphereMap];
    textures.forEach(texture => {
      texture.anisotropy = deviceCapabilities.performanceTier === 'high' ? 16 : 8;
      texture.minFilter = deviceCapabilities.performanceTier === 'high' 
        ? LinearMipmapLinearFilter 
        : LinearMipmapNearestFilter;
    });

    // Mark texture loading as complete
    updateSubtaskStatus('tile-c', 'c2', true);
  }, [diffuseMap, normalMap, specularMap, atmosphereMap, deviceCapabilities, updateSubtaskStatus]);

  // Animation and rotation
  useFrame((state, delta) => {
    if (!planetRef.current || !atmosphereRef.current) return;

    // Rotate planet
    planetRef.current.rotation.y += rotationSpeed * delta;

    // Animate atmosphere
    const time = state.clock.getElapsedTime();
    const atmosphereMaterial = atmosphereRef.current.material as MeshPhysicalMaterial;
    atmosphereMaterial.opacity = 0.6 + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group position={position} scale={scale}>
      {/* Planet mesh */}
      <mesh ref={planetRef} castShadow receiveShadow>
        <sphereGeometry 
          args={[1, 
            deviceCapabilities.performanceTier === 'high' ? 64 : 32, 
            deviceCapabilities.performanceTier === 'high' ? 64 : 32
          ]} 
        />
        <meshPhysicalMaterial
          map={diffuseMap}
          normalMap={normalMap}
          normalScale={new Vector2(0.2, 0.2)}
          roughnessMap={specularMap}
          metalness={0.5}
          roughness={0.7}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Atmosphere mesh */}
      <mesh ref={atmosphereRef} scale={1.05}>
        <sphereGeometry 
          args={[1, 
            deviceCapabilities.performanceTier === 'high' ? 32 : 16, 
            deviceCapabilities.performanceTier === 'high' ? 32 : 16
          ]} 
        />
        <meshPhysicalMaterial
          map={atmosphereMap}
          transparent
          opacity={0.6}
          depthWrite={false}
          side={BackSide}
          blending={AdditiveBlending}
          metalness={0}
          roughness={1}
        />
      </mesh>

      {/* Orbital ring */}
      {deviceCapabilities.performanceTier !== 'low' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.3, 64]} />
          <meshBasicMaterial
            color="#6366f1"
            transparent
            opacity={0.3}
            side={DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default AegisPlanet3DV6; 