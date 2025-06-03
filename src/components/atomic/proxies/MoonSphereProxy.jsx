/**
 * @component MoonSphereProxy
 * @description Runtime-loading proxy for MoonSphere with capability detection
 * 
 * @features
 * - Zero static Three.js imports
 * - Runtime-only loading via Function() evaluation
 * - Device capability detection
 * - Clean CSS fallback
 * - Preserves layout space
 */

import React, { useState, useEffect, Suspense } from 'react';

// Device capability detection hook
const use3DCapability = () => {
  const [capable, setCapable] = useState(false);
  
  useEffect(() => {
    const checkCapability = () => {
      // Check for URL parameter overrides
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('force2d') === 'true' || urlParams.get('perf') === 'true') {
        return false;
      }
      
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
      
      // Check WebGL support
      try {
        const canvas = document.createElement('canvas');
        const webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!webgl) return false;
      } catch (e) {
        return false;
      }
      
      // More permissive device checks for preview
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        return false;
      }
      
      // Allow tablets, only block mobile phones
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      const isMobilePhone = isMobile && !isTablet;
      if (isMobilePhone) return false;
      
      // Reduced CPU requirement
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 2) {
        return false;
      }
      
      // Allow 3G connections, only block very slow ones
      if (navigator.connection && navigator.connection.effectiveType) {
        const slowConnections = ['slow-2g', '2g'];
        if (slowConnections.includes(navigator.connection.effectiveType)) {
          return false;
        }
      }
      
      return true;
    };
    
    setCapable(checkCapability());
  }, []);
  
  return capable;
};

// CSS fallback component
const MoonFallback = ({ className = "" }) => (
  <div 
    className={`relative rounded-full flex items-center justify-center ${className}`}
    style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, rgba(60,60,60,0.8) 30%, rgba(40,40,40,0.6) 60%, rgba(20,20,20,0.3) 80%, transparent 100%)'
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 70% 30%, rgba(120,120,120,0.4) 0%, rgba(80,80,80,0.2) 40%, transparent 70%)',
        filter: 'blur(8px)',
        pointerEvents: 'none'
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: '60%',
        height: '60%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 80% 20%, rgba(0,0,0,0.6) 0%, transparent 50%)',
        filter: 'blur(12px)',
        pointerEvents: 'none'
      }}
    />
    <div className="text-white/40 text-xs absolute">Moon Fallback</div>
  </div>
);

// Main proxy component
const MoonSphereProxy = ({ 
  className = "", 
  enabled = null, // Allow override for dev/testing
  fallbackToEclipse = false,
  ...otherProps // ⭐ NEW: Forward all other props to MoonSphere
}) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const autoCapable = use3DCapability();
  const shouldLoad3D = enabled !== null ? enabled : autoCapable;
  
  useEffect(() => {
    if (!shouldLoad3D || Component || loading || error) return;
    
    setLoading(true);
    
    // Direct dynamic import that Vite can analyze
    import('../../3d/MoonSphere')
      .then((module) => {
        setComponent(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Failed to load MoonSphere:', err);
        setError(true);
        setLoading(false);
      });
  }, [shouldLoad3D, Component, loading, error]);
  
  // Show fallback if not capable, error, or explicitly requested
  if (!shouldLoad3D || error || fallbackToEclipse) {
    return <MoonFallback className={className} />;
  }
  
  // Show loading state
  if (loading || !Component) {
    return (
      <div className={`relative rounded-full flex items-center justify-center ${className}`}>
        <div className="text-white/40 text-xs">Loading Moon...</div>
      </div>
    );
  }
  
  // Render the actual 3D component with forwarded props
  return (
    <Suspense fallback={<div className="text-white/50">Loading Moon...</div>}>
      <Component 
        className={className} 
        fallbackToEclipse={fallbackToEclipse}
        {...otherProps}
      />
    </Suspense>
  );
};

export default MoonSphereProxy; 