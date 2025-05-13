import React, { useState, useEffect } from "react";
import Mars from '../../components/journey/celestial/bodies/Mars';
import CelestialController from '../../components/journey/celestial/CelestialController';
import { Helmet } from 'react-helmet-async';

console.log('[DEBUG] Mars-test page loaded');

export default function MarsTestPage() {
  console.log('[DEBUG] Rendering MarsTestPage');
  
  const [currentScene, setCurrentScene] = useState('dormant');
  const [parallaxStyle, setParallaxStyle] = useState('dripping');
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Define Mars for testing - adjusted position and size
  const celestialBodies = [
    { 
      id: 'mars', 
      component: Mars, 
      props: { 
        position: { x: 50, y: 40 }, // Centered horizontally, slightly above center vertically
        size: 200, // Larger size to be more visible
        parallaxFactor: 0.8 
      } 
    }
  ];
  
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
        setParallaxStyle('3d'); // Use 3D effect for cosmic reveal
      } else {
        setCurrentScene('cosmicFlight');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-[400vh] relative bg-black">
      <Helmet>
        <title>Mars Test | Cosmic Journey</title>
      </Helmet>
      
      {/* Fixed background with z-0 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* CelestialController with Mars */}
        <CelestialController
          celestialBodies={celestialBodies}
          currentScene={currentScene}
          useParallaxStyle={currentScene === 'cosmicReveal' ? '3d' : parallaxStyle}
        />
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
      
      {/* Debug panel */}
      <div className="fixed top-4 left-4 bg-black/70 text-white p-4 z-50 rounded-lg shadow-lg">
        <div className="text-lg font-bold mb-2">Mars Test Debug</div>
        <div>Scene: <span className="font-mono">{currentScene}</span></div>
        <div>Effect: <span className="font-mono">{parallaxStyle}</span></div>
        <div>Scroll: <span className="font-mono">{(scrollPosition * 100).toFixed(1)}%</span></div>
        <button 
          onClick={() => setParallaxStyle(parallaxStyle === '3d' ? 'dripping' : '3d')}
          className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-sm rounded"
        >
          Toggle Effect
        </button>
      </div>
    </div>
  );
} 