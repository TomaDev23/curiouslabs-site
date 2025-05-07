import React, { useEffect, useState } from 'react';
import SpaceCanvas from '../../components/visual/SpaceCanvas';
import ParticleField from '../../components/ui/ParticleField';

console.log("🚀 COMMANDER BACKGROUND GOING COSMIC");

const ZONE_CONFIG = [
  {
    id: 'hero',
    range: [0, 100],
    layers: [
      { type: 'canvas', component: <SpaceCanvas key="hero-canvas" /> },
      {
        type: 'radial-gradient',
        className:
          'absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#a855f7_0%,_transparent_70%)] opacity-40 mix-blend-screen',
      },
      { 
        type: 'gradient',
        className: 
          'absolute inset-0 bg-gradient-to-b from-violet-900/30 via-transparent to-transparent'
      },
      {
        type: 'gradient',
        style: {
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.3), transparent 60%)',
          mixBlendMode: 'screen',
        }
      },
    ],
  },
  {
    id: 'services',
    range: [90, 200],
    layers: [
      {
        type: 'gradient',
        className:
          'absolute inset-0 bg-gradient-to-b from-black via-indigo-900/30 to-blue-900/40',
      },
      {
        type: 'particles',
        props: { 
          density: 'high', 
          opacity: 0.7, 
          speed: 1.5,
          color: '#93c5fd'
        },
      },
      {
        type: 'gradient',
        style: {
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent 70%)',
          mixBlendMode: 'screen',
          opacity: 0.8
        }
      },
      {
        type: 'gradient',
        className:
          'absolute inset-0 bg-[conic-gradient(at_bottom_right,_#3b82f6,_#1e3a8a,_#000000,_#000000)] opacity-30 mix-blend-overlay',
      },
    ],
  },
  {
    id: 'community',
    range: [190, 300],
    layers: [
      {
        type: 'gradient',
        className:
          'absolute inset-0 bg-gradient-to-t from-yellow-600/30 via-amber-800/40 to-black',
      },
      {
        type: 'particles',
        props: { 
          density: 'medium', 
          yDirection: 'down', 
          opacity: 0.5,
          speed: 0.8,
          color: '#fbbf24'
        },
      },
      {
        type: 'gradient',
        style: {
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at bottom, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          opacity: 0.8
        }
      },
      {
        type: 'gradient',
        className:
          'absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-amber-700/30 to-transparent mix-blend-overlay',
      },
    ],
  },
];

export default function CommanderBackground({ children }) {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(1);
  const [activeZone, setActiveZone] = useState('hero');
  const [debug, setDebug] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setViewportHeight(window.innerHeight);

    handleResize(); // initialize on load
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Toggle debug mode with Ctrl+Shift+D
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollVh = scrollY / viewportHeight;
  
  // Update active zone for debug display
  useEffect(() => {
    ZONE_CONFIG.forEach(zone => {
      const [start, end] = zone.range;
      if (scrollVh >= start && scrollVh <= end) {
        setActiveZone(zone.id);
      }
    });
  }, [scrollVh]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Fixed Base Layer - Always Visible */}
      <div className="fixed inset-0 bg-black z-0"></div>
      
      {/* Layered Visual Zones */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {ZONE_CONFIG.map((zone) => {
          const [start, end] = zone.range;
          const isActive = scrollVh >= start && scrollVh <= end;
          
          // Calculate smooth fade in/out near zone boundaries
          let opacity = 0;
          if (scrollVh >= start && scrollVh <= end) {
            const fadeInRegion = 10; // vh units for fade in/out
            if (scrollVh < start + fadeInRegion) {
              opacity = (scrollVh - start) / fadeInRegion;
            } else if (scrollVh > end - fadeInRegion) {
              opacity = (end - scrollVh) / fadeInRegion;
            } else {
              opacity = 1;
            }
          }
          
          return (
            <div
              key={zone.id}
              data-zone={zone.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity }}
            >
              {zone.layers.map((layer, idx) => {
                if (layer.type === 'canvas') return layer.component;
                if (layer.type === 'particles')
                  return <ParticleField key={idx} {...layer.props} />;
                return <div key={idx} className={layer.className} style={layer.style} />;
              })}
            </div>
          );
        })}
      </div>

      {/* Debug Overlay */}
      {debug && (
        <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
          <div className="mb-1">ScrollY: {Math.round(scrollY)}px ({Math.round(scrollVh)}vh)</div>
          <div className="mb-1">Active Zone: <span className="text-green-400">{activeZone}</span></div>
          <div className="text-gray-400 text-[10px]">Press Ctrl+Shift+D to toggle debug</div>
        </div>
      )}

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
} 