import NebulaBase from './NebulaBase';
import CometSystem from './CometSystem';
import CosmicParticles from './CosmicParticles';

export default function SceneBackdrop({ progress }) {
  // Debug log
  console.log("🌌 SceneBackdrop rendering with progress:", progress);
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Nebula base layer - radial background glow */}
      <NebulaBase hue={220} opacity={0.3} />
      
      {/* Cosmic particles - subtle floating particles */}
      <CosmicParticles count={30} opacity={0.08} scale={1.2} />
      
      {/* Comet system */}
      <CometSystem active />
    </div>
  );
} 