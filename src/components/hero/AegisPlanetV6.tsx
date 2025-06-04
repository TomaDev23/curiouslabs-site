import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useScene } from '../scene/SceneControllerV6';
import AegisPlanet3DV6 from './AegisPlanet3DV6';
import { Vector3 } from 'three';

interface AegisPlanetProps {
  interactive?: boolean;
  scale?: number;
  className?: string;
}

const FallbackPlanet: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-800"
    style={{
      boxShadow: `
        0 0 60px rgba(99, 102, 241, 0.3),
        0 0 100px rgba(99, 102, 241, 0.2),
        0 0 160px rgba(99, 102, 241, 0.1)
      `
    }}
  >
    {/* Orbital Ring */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-indigo-500/20 rounded-full"
      style={{ transform: 'rotateX(75deg)' }}
    />
  </motion.div>
);

const LoadingPlanet: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      scale: [0.95, 1, 0.95]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-violet-800/50"
  />
);

const AegisPlanetV6: React.FC<AegisPlanetProps> = ({
  interactive = false,
  scale = 1,
  className = ""
}) => {
  const { deviceCapabilities, phase } = useScene();
  const canRender3D = deviceCapabilities.webgl2 || deviceCapabilities.webgl1;
  const shouldRender3D = canRender3D && deviceCapabilities.performanceTier !== 'low';

  // Camera settings based on device capabilities
  const cameraSettings = {
    fov: 45,
    position: shouldRender3D ? new Vector3(3, 1, 3) : new Vector3(2, 1, 2),
    near: 0.1,
    far: 1000
  };

  // Light settings based on performance tier
  const lightIntensity = deviceCapabilities.performanceTier === 'high' ? 1 : 0.8;
  const shadowMapSize = deviceCapabilities.performanceTier === 'high' ? 2048 : 1024;

  if (!shouldRender3D) {
    return (
      <div className={`relative ${className}`}>
        <FallbackPlanet />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas shadows>
        <Suspense fallback={<primitive object={<LoadingPlanet />} />}>
          {/* Camera */}
          <PerspectiveCamera makeDefault {...cameraSettings} />
          
          {/* Controls */}
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
              rotateSpeed={0.5}
            />
          )}

          {/* Lights */}
          <ambientLight intensity={lightIntensity * 0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={lightIntensity}
            castShadow={deviceCapabilities.performanceTier === 'high'}
            shadow-mapSize={[shadowMapSize, shadowMapSize]}
          />
          <pointLight
            position={[-5, -5, -5]}
            intensity={lightIntensity * 0.5}
            color="#6366f1"
          />

          {/* Planet */}
          <AegisPlanet3DV6 scale={scale} />

          {/* Environment */}
          {deviceCapabilities.performanceTier === 'high' && (
            <>
              <fog attach="fog" args={['#000000', 5, 15]} />
              <mesh position={[0, 0, -10]} scale={20}>
                <planeGeometry />
                <meshBasicMaterial color="#000000" />
              </mesh>
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AegisPlanetV6; 