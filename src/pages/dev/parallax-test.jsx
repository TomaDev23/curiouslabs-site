import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

// Metadata for the component
const metadata = {
  id: 'parallax_test_page',
  scs: 'SCS-DEV-PARALLAX',
  type: 'dev',
  doc: 'dev_testing.md'
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

// Main test page component
export default function ParallaxTestPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [debugInfo, setDebugInfo] = useState({
    scrollY: 0,
    scrollHeight: 0,
    windowHeight: 0
  });
  const [settings, setSettings] = useState({
    speed: 2,
    density: 100,
    fps: 30,
    showDebug: true
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
      
      setDebugInfo({
        scrollY: window.scrollY,
        scrollHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight,
        progress: progress.toFixed(3)
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Parallax Test Page</title>
      </Helmet>
      
      {/* Fixed background with parallax effect */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <ParallaxSpeedDust 
          opacity={1} 
          speed={settings.speed} 
          density={settings.density} 
          fps={settings.fps} 
        />
      </div>
      
      {/* Debug panel */}
      {settings.showDebug && (
        <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
          <div className="mb-1">Scroll: {debugInfo.progress * 100}%</div>
          <div className="mb-1">ScrollY: {debugInfo.scrollY}px</div>
          <div className="mb-1">ScrollHeight: {debugInfo.scrollHeight}px</div>
          <div className="mb-1">WindowHeight: {debugInfo.windowHeight}px</div>
          <div className="mt-3 mb-1">Settings:</div>
          <div className="mb-1">
            Speed: 
            <input 
              type="range" 
              min="0.5" 
              max="5" 
              step="0.5" 
              value={settings.speed} 
              onChange={(e) => setSettings({...settings, speed: parseFloat(e.target.value)})}
              className="ml-2 w-24"
            />
            {settings.speed}
          </div>
          <div className="mb-1">
            Density: 
            <input 
              type="range" 
              min="50" 
              max="300" 
              step="10" 
              value={settings.density} 
              onChange={(e) => setSettings({...settings, density: parseInt(e.target.value)})}
              className="ml-2 w-24"
            />
            {settings.density}
          </div>
          <div className="mb-1">
            FPS: 
            <input 
              type="range" 
              min="5" 
              max="60" 
              step="5" 
              value={settings.fps} 
              onChange={(e) => setSettings({...settings, fps: parseInt(e.target.value)})}
              className="ml-2 w-24"
            />
            {settings.fps}
          </div>
        </div>
      )}
      
      {/* Content for scrolling */}
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Parallax Test</h1>
        </div>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Cosmic Flight Scene</h2>
            <p className="mb-4">
              This is a test implementation of the parallax effect for the Cosmic Flight scene.
              Scroll to see the parallax effect in action.
            </p>
            <p>
              The stars move at different speeds based on their z-position, creating a sense of depth and movement.
            </p>
          </div>
        </div>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Implementation Details</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Canvas-based particle system</li>
              <li>3D perspective projection for depth</li>
              <li>FPS throttling for performance</li>
              <li>Dynamic star streaks based on movement</li>
              <li>Proper cleanup on unmount</li>
            </ul>
          </div>
        </div>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">End of Test</h2>
            <p>Scroll back up to continue testing</p>
          </div>
        </div>
      </div>
    </div>
  );
} 