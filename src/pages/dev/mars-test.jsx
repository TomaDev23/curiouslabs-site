import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MarsSphere from '../../components/journey/celestial/bodies/MarsSphere';
import MarsLightBoardHUD from '../../components/hud/MarsLightBoardHUD';
import { Helmet } from 'react-helmet-async';

console.log('[DEBUG] Mars-test page loaded');

// Mars component with rotation animation
function RotatingMars({ scene, ...props }) {
  const meshRef = useRef();
  
  // Different rotation speeds based on scene
  const getRotationSpeed = () => {
    switch(scene) {
      case 'dormant': return 0.001;
      case 'awakening': return 0.002;
      case 'cosmicReveal': return 0.003;
      case 'cosmicFlight': return 0.004;
      default: return 0.001;
    }
  };
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += getRotationSpeed();
    }
  });
  
  return (
    <group ref={meshRef}>
      <MarsSphere {...props} />
    </group>
  );
}

export default function MarsTestPage() {
  console.log('[DEBUG] Rendering MarsTestPage');
  
  const [currentScene, setCurrentScene] = useState('dormant');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [orbitEnabled, setOrbitEnabled] = useState(false);
  
  // Lighting state variables
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [sunIntensity, setSunIntensity] = useState(1.0);
  const [sunColor, setSunColor] = useState('#ffffff');
  const [directionalPos] = useState([10, 10, 10]);
  const [rimIntensity, setRimIntensity] = useState(0.5);
  const [rimColor, setRimColor] = useState('#ff7050');
  const [rimPos] = useState([-10, -10, -10]);
  
  // Scene detection based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) - windowHeight;
      
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollPosition(scrollProgress);
      
      if (scrollProgress < 0.25) {
        setCurrentScene('dormant');
      } else if (scrollProgress < 0.5) {
        setCurrentScene('awakening');
      } else if (scrollProgress < 0.75) {
        setCurrentScene('cosmicReveal');
      } else {
        setCurrentScene('cosmicFlight');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Update lighting based on scene
  useEffect(() => {
    // Update lighting based on scene
    switch(currentScene) {
      case 'dormant':
        setAmbientIntensity(0.2);
        setSunIntensity(0.8);
        setSunColor('#ffddbb');
        setRimIntensity(0.3);
        setRimColor('#ff6040');
        break;
      case 'awakening':
        setAmbientIntensity(0.25);
        setSunIntensity(1.0);
        setSunColor('#ffffff');
        setRimIntensity(0.5);
        setRimColor('#ff7050');
        break;
      case 'cosmicReveal':
        setAmbientIntensity(0.3);
        setSunIntensity(1.2);
        setSunColor('#ffffee');
        setRimIntensity(0.7);
        setRimColor('#ff9060');
        break;
      case 'cosmicFlight':
        setAmbientIntensity(0.4);
        setSunIntensity(1.5);
        setSunColor('#ffffdd');
        setRimIntensity(1.0);
        setRimColor('#ffaa70');
        break;
    }
  }, [currentScene]);
  
  return (
    <div className="min-h-[400vh] relative bg-black">
      <Helmet>
        <title>Mars Test | Cosmic Journey</title>
      </Helmet>
      
      {/* Fixed background with Three.js Canvas */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 0, 3], fov: 50 }}>
          {/* Scene lighting */}
          <ambientLight intensity={ambientIntensity} />
          <directionalLight 
            position={directionalPos} 
            intensity={sunIntensity} 
            color={sunColor} 
          />
          <pointLight 
            position={rimPos} 
            intensity={rimIntensity} 
            color={rimColor} 
          />
          
          {/* Mars sphere with rotation */}
          <RotatingMars 
            scene={currentScene}
            position={[0, 0, 0]} 
            radius={1} 
          />
          
          {/* Optional orbit controls */}
          {orbitEnabled && <OrbitControls enablePan={false} />}
        </Canvas>
      </div>
      
      {/* Content sections for scrolling */}
      <div className="relative z-10 pointer-events-none">
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Dormant Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Awakening Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Cosmic Reveal Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Cosmic Flight Scene</h1>
        </section>
      </div>
      
      {/* Mars LightBoard HUD */}
      <MarsLightBoardHUD
        ambientIntensity={ambientIntensity}
        setAmbientIntensity={setAmbientIntensity}
        sunIntensity={sunIntensity}
        setSunIntensity={setSunIntensity}
        sunColor={sunColor}
        setSunColor={setSunColor}
        rimIntensity={rimIntensity}
        setRimIntensity={setRimIntensity}
        rimColor={rimColor}
        setRimColor={setRimColor}
        scene={currentScene}
      />
      
      {/* Debug panel */}
      <div className="fixed top-4 left-4 bg-black/70 text-white p-4 z-50 rounded-lg shadow-lg">
        <div className="text-lg font-bold mb-2">Mars 3D Test Debug</div>
        <div>Scene: <span className="font-mono">{currentScene}</span></div>
        <div>Scroll: <span className="font-mono">{(scrollPosition * 100).toFixed(1)}%</span></div>
        <div className="mt-2">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={orbitEnabled} 
              onChange={() => setOrbitEnabled(!orbitEnabled)}
              className="mr-2"
            />
            Enable Orbit Controls
          </label>
        </div>
      </div>
    </div>
  );
} 