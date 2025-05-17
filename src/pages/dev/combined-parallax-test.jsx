// 🛡️ STAR_LOCKED: Do not remove or alter – see STAR_LOCK_V1.md
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import CelestialController from '../../components/journey/celestial/CelestialController';
import Mars from '../../components/journey/celestial/bodies/Mars';
import Moon from '../../components/journey/celestial/bodies/Moon';
import Jupiter from '../../components/journey/celestial/bodies/Jupiter';
import Saturn from '../../components/journey/celestial/bodies/Saturn';
import Venus from '../../components/journey/celestial/bodies/Venus';
import Neptune from '../../components/journey/celestial/bodies/Neptune';
import Uranus from '../../components/journey/celestial/bodies/Uranus';

// Metadata for the component
const metadata = {
  id: 'combined_parallax_test_page',
  scs: 'SCS-DEV-COMBINED-PARALLAX',
  type: 'dev',
  doc: 'dev_testing.md'
};

// Log Mars component to verify it's imported correctly
console.log('Mars component imported:', Mars);
console.log('Mars metadata:', Mars.metadata);
console.log('Moon component imported:', Moon);
console.log('Moon metadata:', Moon.metadata);
console.log('Jupiter component imported:', Jupiter);
console.log('Jupiter metadata:', Jupiter.metadata);
console.log('Saturn component imported:', Saturn);
console.log('Saturn metadata:', Saturn.metadata);
console.log('Venus component imported:', Venus);
console.log('Venus metadata:', Venus.metadata);
console.log('Neptune component imported:', Neptune);
console.log('Neptune metadata:', Neptune.metadata);
console.log('Uranus component imported:', Uranus);
console.log('Uranus metadata:', Uranus.metadata);

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

// Scroll parallax hook
const useScrollParallax = (speed = 0.5) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY * speed;
};

// Combined parallax hook
const useCombinedParallax = (mouseSensitivity = 0.05, scrollSpeed = 0.5) => {
  const mousePosition = useMouseParallax(mouseSensitivity);
  const scrollOffset = useScrollParallax(scrollSpeed);
  
  return {
    x: mousePosition.x,
    y: mousePosition.y + scrollOffset
  };
};

// ParallaxSpeedDust component for creating streaking stars effect
const ParallaxSpeedDust = ({ opacity = 1, speed = 2, density = 100, fps = 30 }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size accounting for device pixel ratio
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    
    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    // Create particles
    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.width / dpr,
      y: Math.random() * canvas.height / dpr,
      z: Math.random() * 1000,
      length: Math.random() * 10 + 5,
      speed: (Math.random() * 0.5 + 0.5) * speed
    }));

    // Animation function
    const draw = (time) => {
      // Throttle based on FPS
      if (time - lastFrameTimeRef.current < 1000 / fps) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = time;

      // Clear with slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Update and draw particles
      particles.forEach(p => {
        // Update z-position (moving toward viewer)
        p.z -= p.speed * 5;
        
        // Reset if star passes viewer
        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * canvas.width / dpr;
          p.y = Math.random() * canvas.height / dpr;
        }
        
        // Project 3D position to 2D screen
        const cx = canvas.width / (2 * dpr);
        const cy = canvas.height / (2 * dpr);
        const perspective = 300;
        
        const scale = perspective / p.z;
        const x2d = (p.x - cx) * scale + cx;
        const y2d = (p.y - cy) * scale + cy;
        
        // Calculate star size based on z-position
        const size = Math.max(0.5, 3 * (1000 - p.z) / 1000);
        
        // Draw star streak
        const tailLength = Math.min(p.length, p.z / 10);
        
        // Calculate streak direction based on perspective
        const dx = x2d - cx;
        const dy = y2d - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
          const angle = Math.atan2(dy, dx);
          const targetX = x2d - Math.cos(angle) * tailLength * scale;
          const targetY = y2d - Math.sin(angle) * tailLength * scale;
          
          // Draw streak
          ctx.beginPath();
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(targetX, targetY);
          
          // Star color and style
          const brightness = Math.min(1, (1000 - p.z) / 600);
          ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * opacity})`;
          ctx.lineWidth = size;
          ctx.stroke();
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity, speed, density, fps]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full" 
      style={{ 
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }} 
    />
  );
};

// Stars component with parallax effect
const ParallaxStars = ({ mouseSensitivity = 0.01, scrollSpeed = 0.05 }) => {
  const position = useCombinedParallax(mouseSensitivity, scrollSpeed);
  const stars = useRef(Array.from({ length: 100 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.7 + 0.3
  }))).current;
  
  return (
    <div 
      className="absolute inset-0"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
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

// Draggable HUD component following HUD Rules
const DraggableHUD = ({ title, children, initialPosition, onClose }) => {
  const [position, setPosition] = useState(initialPosition || { x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const hudRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.hud-header')) {
      setIsDragging(true);
      const rect = hudRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={hudRef}
      className="fixed bg-black/70 rounded shadow-lg text-white font-mono text-xs z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: 'none',
        width: 'auto',
        maxWidth: '300px',
        willChange: 'transform',
        contain: 'content'
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        className="hud-header px-3 py-2 bg-gray-800 rounded-t flex justify-between items-center"
        style={{ cursor: 'grab' }}
      >
        <div className="font-semibold">{title}</div>
        <button 
          className="ml-2 px-2 hover:bg-red-600 rounded"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
};

// Debug panel component - now using DraggableHUD
const DebugPanel = ({ mousePosition, scrollY, settings, setSettings }) => {
  const [showHUD, setShowHUD] = useState(true);
  
  if (!showHUD) {
    return (
      <button 
        className="fixed top-4 left-4 z-50 bg-black/70 p-2 rounded text-xs text-white font-mono hover:bg-gray-700"
        onClick={() => setShowHUD(true)}
      >
        Show Debug
      </button>
    );
  }
  
  return (
    <DraggableHUD
      title="Parallax Debug"
      initialPosition={{ x: 20, y: 20 }}
      onClose={() => setShowHUD(false)}
    >
      <div className="mb-1">Mouse X: {mousePosition.x.toFixed(2)}px</div>
      <div className="mb-1">Mouse Y: {mousePosition.y.toFixed(2)}px</div>
      <div className="mb-1">Scroll Y: {scrollY.toFixed(2)}px</div>
      <div className="mt-3 mb-1">Settings:</div>
      <div className="mb-1">
        Moon Mouse Sensitivity: 
        <input 
          type="range" 
          min="0.01" 
          max="0.1" 
          step="0.01" 
          value={settings.moonMouseSensitivity} 
          onChange={(e) => setSettings({...settings, moonMouseSensitivity: parseFloat(e.target.value)})}
          className="ml-2 w-24"
        />
        {settings.moonMouseSensitivity}
      </div>
      <div className="mb-1">
        Moon Scroll Speed: 
        <input 
          type="range" 
          min="0.05" 
          max="0.5" 
          step="0.05" 
          value={settings.moonScrollSpeed} 
          onChange={(e) => setSettings({...settings, moonScrollSpeed: parseFloat(e.target.value)})}
          className="ml-2 w-24"
        />
        {settings.moonScrollSpeed}
      </div>
      <div className="mb-1">
        Stars Mouse Sensitivity: 
        <input 
          type="range" 
          min="0.005" 
          max="0.05" 
          step="0.005" 
          value={settings.starsMouseSensitivity} 
          onChange={(e) => setSettings({...settings, starsMouseSensitivity: parseFloat(e.target.value)})}
          className="ml-2 w-24"
        />
        {settings.starsMouseSensitivity}
      </div>
      <div className="mb-1">
        Stars Scroll Speed: 
        <input 
          type="range" 
          min="0.01" 
          max="0.2" 
          step="0.01" 
          value={settings.starsScrollSpeed} 
          onChange={(e) => setSettings({...settings, starsScrollSpeed: parseFloat(e.target.value)})}
          className="ml-2 w-24"
        />
        {settings.starsScrollSpeed}
      </div>
      <div className="mb-1">
        Dust Speed: 
        <input 
          type="range" 
          min="0.5" 
          max="5" 
          step="0.5" 
          value={settings.dustSpeed} 
          onChange={(e) => setSettings({...settings, dustSpeed: parseFloat(e.target.value)})}
          className="ml-2 w-24"
        />
        {settings.dustSpeed}
      </div>
    </DraggableHUD>
  );
};

// Scene selection component
const SceneSelector = ({ currentScene, setCurrentScene }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
      <div className="flex space-x-4">
        <button 
          className={`px-3 py-2 rounded ${currentScene === 'dormant' ? 'bg-blue-600' : 'bg-gray-800'}`}
          onClick={() => setCurrentScene('dormant')}
        >
          Dormant
        </button>
        <button 
          className={`px-3 py-2 rounded ${currentScene === 'awakening' ? 'bg-blue-600' : 'bg-gray-800'}`}
          onClick={() => setCurrentScene('awakening')}
        >
          Awakening
        </button>
        <button 
          className={`px-3 py-2 rounded ${currentScene === 'cosmicReveal' ? 'bg-blue-600' : 'bg-gray-800'}`}
          onClick={() => setCurrentScene('cosmicReveal')}
        >
          Cosmic Reveal
        </button>
        <button 
          className={`px-3 py-2 rounded ${currentScene === 'cosmicFlight' ? 'bg-blue-600' : 'bg-gray-800'}`}
          onClick={() => setCurrentScene('cosmicFlight')}
        >
          Cosmic Flight
        </button>
        <button 
          className={`px-3 py-2 rounded ${currentScene === 'combined' ? 'bg-blue-600' : 'bg-gray-800'}`}
          onClick={() => setCurrentScene('combined')}
        >
          Combined
        </button>
      </div>
    </div>
  );
};

// Scene debug HUD component
const SceneDebugHUD = ({ parallaxStyle, celestialBodies = [], scrollY = 0 }) => {
  return (
    <DraggableHUD title="Celestial System Debug" initialPosition={{ x: window.innerWidth - 320, y: 20 }}>
      <div className="text-gray-300 space-y-3 min-w-[300px]">
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Active Planets</div>
          <div className="text-green-400">{celestialBodies.length}</div>
        </div>
        
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Parallax Style</div>
          <div className="text-blue-400">{parallaxStyle}</div>
        </div>
        
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Scroll Y</div>
          <div className="text-blue-400">{scrollY}px</div>
        </div>
        
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Celestial Bodies</div>
          <div className="flex flex-wrap gap-2">
            {celestialBodies.map(body => (
              <div key={body.id} className="text-xs bg-gray-800 px-2 py-1 rounded">
                {body.id}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DraggableHUD>
  );
};

// Main test page component
export default function CombinedParallaxTestPage() {
  const [currentScene, setCurrentScene] = useState('cosmicReveal');
  const [settings, setSettings] = useState({
    starsMouseSensitivity: 0.03,
    starsScrollSpeed: 0.05,
    moonMouseSensitivity: 0.08,
    moonScrollSpeed: 0.12,
    dustSpeed: 3
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const [showSceneSelector, setShowSceneSelector] = useState(false);
  const [parallaxStyle, setParallaxStyle] = useState('combined');
  const [scrollY, setScrollY] = useState(0);
  
  // Scene detection based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Add celestialBodies array for Mars and Moon
  const celestialBodies = [
    { id: 'moon', component: Moon, props: { position: { x: 45, y: 25 }, size: 90, parallaxFactor: 1.2, parallaxStyle: 'combined' } },
    { id: 'mars', component: Mars, props: { position: { x: 60, y: 30 }, size: 100, parallaxFactor: 0.9 } },
    { id: 'jupiter', component: Jupiter, props: { position: { x: 30, y: 40 }, size: 160, parallaxFactor: 0.5 } },
    { id: 'saturn', component: Saturn, props: { position: { x: 20, y: 60 }, size: 180, parallaxFactor: 0.4 } },
    { id: 'venus', component: Venus, props: { position: { x: 70, y: 50 }, size: 80, parallaxFactor: 1.1 } },
    { id: 'neptune', component: Neptune, props: { position: { x: 55, y: 70 }, size: 110, parallaxFactor: 0.6 } },
    { id: 'uranus', component: Uranus, props: { position: { x: 80, y: 80 }, size: 100, parallaxFactor: 0.7 } }
  ];
  
  // Keep the rest of the component implementation
  const mousePosition = useMouseParallax(settings.moonMouseSensitivity);
  
  return (
    <div className="min-h-[400vh] relative">
      <Helmet>
        <title>Combined Parallax Test | Cosmic Journey</title>
      </Helmet>
      
      {/* Fixed background with z-0 */}
      <div className="fixed inset-0 z-0 bg-[#090014]">
        {/* Stars background */}
        <ParallaxStars 
          mouseSensitivity={settings.starsMouseSensitivity} 
          scrollSpeed={settings.starsScrollSpeed} 
        />
        
        {/* Speed dust effect */}
        <ParallaxSpeedDust 
          opacity={0.7} 
          speed={settings.dustSpeed} 
          density={100} 
          fps={30} 
        />
      </div>
      
      {/* Uncomment and update Mars container to include Moon */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <CelestialController
          celestialBodies={celestialBodies}
          currentScene="cosmicReveal"
          useParallaxStyle="combined"
        />
      </div>
      
      {/* Keep the rest of the JSX */}
      <div className="relative z-10">
        <section className="h-[100vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Dormant Scene</h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              Explore the celestial bodies in their dormant state.
              Scroll down to continue the cosmic journey.
            </p>
          </div>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Awakening Scene</h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              The celestial bodies begin to awaken as we venture deeper
              into the cosmic experience.
            </p>
          </div>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Cosmic Reveal Scene</h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              Experience the dynamic 3D space travel effect as the full
              majesty of the cosmos is revealed.
            </p>
          </div>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Cosmic Flight Scene</h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              Journey through the cosmos as celestial bodies drift by with
              the subtle dripping effect that enhances the sense of travel.
            </p>
          </div>
        </section>
      </div>
      
      {/* HUDs and controls */}
      {showSettings && (
        <DraggableHUD 
          title="Parallax Settings" 
          initialPosition={{ x: 20, y: 20 }}
          onClose={() => setShowSettings(false)}
        >
          <DebugPanel 
            mousePosition={mousePosition} 
            scrollY={scrollY}
            settings={settings}
            setSettings={setSettings}
          />
        </DraggableHUD>
      )}
      
      {showSceneSelector && (
        <DraggableHUD 
          title="Scene Selector" 
          initialPosition={{ x: 20, y: 220 }}
          onClose={() => setShowSceneSelector(false)}
        >
          <SceneSelector 
            currentScene={currentScene}
            setCurrentScene={setCurrentScene}
          />
        </DraggableHUD>
      )}
      
      {/* Replace simple debug display with SceneDebugHUD */}
      <SceneDebugHUD 
        parallaxStyle={parallaxStyle}
        celestialBodies={celestialBodies}
        scrollY={scrollY}
      />
      
      <div className="fixed bottom-4 right-4 flex gap-2">
        <button 
          className="bg-gray-800/80 text-gray-300 px-3 py-2 rounded-md text-sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? 'Hide' : 'Show'} Settings
        </button>
        <button 
          className="bg-gray-800/80 text-gray-300 px-3 py-2 rounded-md text-sm"
          onClick={() => setShowSceneSelector(!showSceneSelector)}
        >
          {showSceneSelector ? 'Hide' : 'Show'} Scene Selector
        </button>
      </div>
    </div>
  );
} 