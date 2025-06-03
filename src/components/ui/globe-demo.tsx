"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy load the World component - only loads when actually needed
const World = lazy(() => import("./globe").then(module => ({ default: module.World })));

// Device capability detection hook
const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    isHighPerformance: true,
    isMobile: false,
    isLowMemory: false,
    prefersReducedMotion: false,
    canHandle3D: true
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isHighPerformance = window.innerWidth >= 1024 && !isMobile && !isLowMemory;
      const canHandle3D = !prefersReducedMotion;

      setCapabilities({
        isHighPerformance,
        isMobile,
        isLowMemory,
        prefersReducedMotion,
        canHandle3D
      });
    };

    checkCapabilities();
    window.addEventListener('resize', checkCapabilities);
    return () => window.removeEventListener('resize', checkCapabilities);
  }, []);

  return capabilities;
};

// Beautiful CSS fallback that matches the globe appearance
const GlobeFallback = ({ isLoading }: { isLoading?: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-96 h-96 rounded-full overflow-hidden">
      {/* Main globe sphere with country-like appearance */}
      <div 
        className="absolute inset-0 rounded-full border border-white/10"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(100, 149, 237, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(25, 25, 112, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #062056 0%, #1e1b4b 100%)
          `
        }}
      />
      
      {/* Atmosphere glow effect */}
      <div 
        className="absolute inset-[-4px] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
          filter: 'blur(8px)'
        }}
      />
      
      {/* Country-like landmass patterns */}
      <div className="absolute inset-0 rounded-full opacity-30">
        <div className="absolute top-1/4 left-1/3 w-16 h-8 bg-white/20 rounded-full transform rotate-12" />
        <div className="absolute top-1/2 right-1/4 w-12 h-6 bg-white/15 rounded-full transform -rotate-45" />
        <div className="absolute bottom-1/3 left-1/4 w-20 h-10 bg-white/25 rounded-full transform rotate-45" />
        <div className="absolute top-3/4 right-1/3 w-8 h-12 bg-white/20 rounded-full transform -rotate-12" />
        <div className="absolute top-1/6 right-1/2 w-6 h-4 bg-white/18 rounded-full transform rotate-30" />
        <div className="absolute bottom-1/4 right-1/5 w-10 h-6 bg-white/22 rounded-full transform -rotate-30" />
      </div>
      
      {/* Animated points that mimic the real globe points */}
      <div className="absolute inset-0 rounded-full">
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" 
             style={{ animationDuration: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse" 
             style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-purple-400 rounded-full animate-pulse" 
             style={{ animationDuration: '2.2s' }} />
      </div>
      
      {/* Subtle rotation animation */}
      <div 
        className="absolute inset-0 rounded-full animate-spin opacity-20"
        style={{ animationDuration: '20s' }}
      >
        <div className="absolute top-1/5 left-3/5 w-1 h-1 bg-cyan-300 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full" />
        <div className="absolute top-3/5 right-1/4 w-1 h-1 bg-indigo-300 rounded-full" />
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/60 text-sm font-space animate-pulse">
            Loading Globe...
          </div>
        </div>
      )}
    </div>
  </div>
);

export default function GlobeDemo() {
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [loadingStarted, setLoadingStarted] = useState(false);
  const capabilities = useDeviceCapabilities();

  // Intelligent loading strategy - loads during browser idle time
  useEffect(() => {
    if (!capabilities.canHandle3D) return;

    const loadGlobeWhenIdle = () => {
      setLoadingStarted(true);
      
      // Use requestIdleCallback for non-blocking load
      const idleCallback = (deadline: IdleDeadline) => {
        if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
          setShouldLoadGlobe(true);
          // Small delay for smooth transition
          setTimeout(() => setIsGlobeReady(true), 300);
        } else {
          // Retry if no idle time available
          requestIdleCallback(idleCallback, { timeout: 2000 });
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(idleCallback, { timeout: 1500 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          setShouldLoadGlobe(true);
          setTimeout(() => setIsGlobeReady(true), 300);
        }, 400);
      }
    };

    // Start loading after component mounts and settles
    const timer = setTimeout(loadGlobeWhenIdle, 150);
    return () => clearTimeout(timer);
  }, [capabilities.canHandle3D]);

  // Performance-optimized configuration based on device capabilities
  const globeConfig = {
    pointSize: capabilities.isMobile ? 2 : 4,
    globeColor: "#062056",
    showAtmosphere: !capabilities.isLowMemory,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: capabilities.isHighPerformance ? 0.1 : 0.05,
    shininess: 0.9,
    polygonColor: capabilities.isHighPerformance ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: capabilities.isMobile ? 1500 : 1000,
    arcLength: 0.9,
    rings: capabilities.isHighPerformance ? 1 : 0,
    maxRings: capabilities.isHighPerformance ? 3 : 1,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: capabilities.isMobile ? 0.3 : 0.5,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  
  // Optimized arc data - fewer arcs on mobile devices
  const fullSampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  // Adaptive arc count based on device performance
  const getOptimizedArcs = () => {
    if (capabilities.isLowMemory) return fullSampleArcs.slice(0, 3);
    if (capabilities.isMobile) return fullSampleArcs.slice(0, 6);
    return fullSampleArcs;
  };

  const sampleArcs = getOptimizedArcs();

  // Show fallback for reduced motion preference
  if (!capabilities.canHandle3D) {
    return (
      <div className="w-full h-screen relative">
        <div className="absolute w-full h-96 md:h-full">
          <GlobeFallback />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <div className="absolute w-full h-96 md:h-full">
        {shouldLoadGlobe && isGlobeReady ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Suspense fallback={<GlobeFallback isLoading />}>
              <World data={sampleArcs} globeConfig={globeConfig} />
            </Suspense>
          </motion.div>
        ) : (
          <GlobeFallback isLoading={loadingStarted} />
        )}
      </div>
    </div>
  );
} 