import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

// Metadata for the component
const metadata = {
  id: 'mouse_parallax_test_page',
  scs: 'SCS-DEV-MOUSE-PARALLAX',
  type: 'dev',
  doc: 'dev_testing.md'
};

// Mouse parallax hook
const useMouseParallax = (sensitivity = 0.05, easing = 0.1) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to center of screen
      const x = (e.clientX - window.innerWidth / 2) * sensitivity;
      const y = (e.clientY - window.innerHeight / 2) * sensitivity;
      
      setTarget({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Apply easing for smooth movement
      setPosition(prev => ({
        x: prev.x + (target.x - prev.x) * easing,
        y: prev.y + (target.y - prev.y) * easing
      }));
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [sensitivity, easing, target]);

  return position;
};

// Background layer component with mouse parallax
const ParallaxBackground = ({ 
  imageUrl = '/images/space-bg.jpg', 
  sensitivity = 0.02,
  depth = 1,
  className = ''
}) => {
  const position = useMouseParallax(sensitivity);
  
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translate3d(${position.x * depth}px, ${position.y * depth}px, 0)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    />
  );
};

// Moon component with parallax effect
const ParallaxMoon = ({ sensitivity = 0.05, depth = 2 }) => {
  const position = useMouseParallax(sensitivity);
  
  return (
    <div 
      className="absolute w-64 h-64 rounded-full bg-gray-200"
      style={{
        top: '30%',
        left: '50%',
        marginLeft: '-8rem',
        boxShadow: '0 0 60px 20px rgba(255, 255, 255, 0.4)',
        transform: `translate3d(${position.x * depth}px, ${position.y * depth}px, 0)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Moon craters */}
      <div className="absolute w-12 h-12 rounded-full bg-gray-300 opacity-70" style={{ top: '30%', left: '20%' }} />
      <div className="absolute w-8 h-8 rounded-full bg-gray-300 opacity-70" style={{ top: '50%', left: '60%' }} />
      <div className="absolute w-16 h-16 rounded-full bg-gray-300 opacity-70" style={{ top: '70%', left: '40%' }} />
    </div>
  );
};

// Stars component with parallax effect
const ParallaxStars = ({ count = 100, sensitivity = 0.01, depth = 0.5 }) => {
  const position = useMouseParallax(sensitivity);
  const stars = useRef(Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.7 + 0.3
  }))).current;
  
  return (
    <div 
      className="absolute inset-0"
      style={{
        transform: `translate3d(${position.x * depth}px, ${position.y * depth}px, 0)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {stars.map((star, index) => (
        <div 
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
};

// Debug panel component
const DebugPanel = ({ position, settings, setSettings }) => {
  return (
    <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
      <div className="mb-1">Mouse X: {position.x.toFixed(2)}px</div>
      <div className="mb-1">Mouse Y: {position.y.toFixed(2)}px</div>
      <div className="mt-3 mb-1">Settings:</div>
      <div className="mb-1">
        Background Sensitivity: 
        <input 
          type="range" 
          min="0.005" 
          max="0.05" 
          step="0.005" 
          value={settings.bgSensitivity} 
          onChange={(e) => setSettings({...settings, bgSensitivity: parseFloat(e.target.value)})}
          className="ml-2 w-24"
        />
        {settings.bgSensitivity}
      </div>
      <div className="mb-1">
        Moon Sensitivity: 
        <input 
          type="range" 
          min="0.01" 
          max="0.1" 
          step="0.01" 
          value={settings.moonSensitivity} 
          onChange={(e) => setSettings({...settings, moonSensitivity: parseFloat(e.target.value)})}
          className="ml-2 w-24"
        />
        {settings.moonSensitivity}
      </div>
      <div className="mb-1">
        Stars Sensitivity: 
        <input 
          type="range" 
          min="0.005" 
          max="0.05" 
          step="0.005" 
          value={settings.starsSensitivity} 
          onChange={(e) => setSettings({...settings, starsSensitivity: parseFloat(e.target.value)})}
          className="ml-2 w-24"
        />
        {settings.starsSensitivity}
      </div>
      <div className="mb-1">
        <label>
          <input 
            type="checkbox" 
            checked={settings.showDebug} 
            onChange={(e) => setSettings({...settings, showDebug: e.target.checked})}
            className="mr-2"
          />
          Show Debug
        </label>
      </div>
    </div>
  );
};

// Main test page component
export default function MouseParallaxTestPage() {
  const [settings, setSettings] = useState({
    bgSensitivity: 0.02,
    moonSensitivity: 0.05,
    starsSensitivity: 0.01,
    showDebug: true
  });
  
  const position = useMouseParallax(0.05);

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Mouse Parallax Test</title>
      </Helmet>
      
      {/* Parallax background layers */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#090014]">
        <ParallaxBackground 
          imageUrl="/images/space-bg.jpg" 
          sensitivity={settings.bgSensitivity} 
          depth={1}
          className="opacity-30"
        />
        <ParallaxStars 
          count={200} 
          sensitivity={settings.starsSensitivity} 
          depth={0.5} 
        />
        <ParallaxMoon 
          sensitivity={settings.moonSensitivity} 
          depth={2} 
        />
      </div>
      
      {/* Debug panel */}
      {settings.showDebug && (
        <DebugPanel 
          position={position} 
          settings={settings} 
          setSettings={setSettings} 
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Mouse Parallax Test</h1>
        </div>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Dormant Scene</h2>
            <p className="mb-4">
              This is a test implementation of the mouse-based parallax effect for the Dormant scene.
              Move your mouse to see the parallax effect in action.
            </p>
            <p>
              The background, stars, and moon move at different speeds based on their depth, creating a sense of 3D space.
            </p>
          </div>
        </div>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Implementation Details</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Custom useMouseParallax hook with easing</li>
              <li>Multiple layers with different sensitivity values</li>
              <li>Performance optimizations with will-change and backface-visibility</li>
              <li>Smooth transitions between mouse positions</li>
              <li>Proper cleanup on unmount</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 