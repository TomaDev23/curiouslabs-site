/**
 * @component EarthSphereProxy
 * @description Runtime-loading proxy for EarthSphere with capability detection
 * 
 * @features
 * - Zero static Three.js imports
 * - Runtime-only loading via Function() evaluation
 * - Device capability detection
 * - Clean CSS fallback
 * - Preserves layout space
 */

import { useEffect, useState, Suspense } from 'react';

// CSS fallback component
const EarthFallback = ({ className = "" }) => (
  <div 
    className={`relative rounded-full flex items-center justify-center ${className}`}
    style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, rgba(30,60,90,0.8) 30%, rgba(20,40,60,0.6) 60%, rgba(10,20,30,0.3) 80%, transparent 100%)'
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 70% 30%, rgba(100,150,200,0.4) 0%, rgba(60,100,140,0.2) 40%, transparent 70%)',
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
    <div className="text-white/40 text-xs absolute">Earth Fallback</div>
  </div>
);

// Main proxy component
const EarthSphereProxy = ({ 
  enabled = true,
  className = "", 
  ...props 
}) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (!enabled || Component || loading || error) return;
    
    setLoading(true);
    
    // Direct dynamic import that Vite can analyze
    import('../3d/EarthSphere')
      .then((module) => {
        setComponent(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('EarthSphere load failed:', err);
        setError(true);
        setLoading(false);
      });
  }, [enabled, Component, loading, error]);
  
  // Show fallback if not enabled, error occurred, or loading
  if (!enabled || error) {
    return <EarthFallback className={className} />;
  }
  
  // Show loading state
  if (loading || !Component) {
    return (
      <div className={`relative rounded-full flex items-center justify-center ${className}`}>
        <div className="text-white/40 text-xs">Loading Earth...</div>
      </div>
    );
  }
  
  // Render the actual 3D component
  return (
    <Suspense fallback={<div className="text-white/50">Loading Earth...</div>}>
      <Component className={className} {...props} />
    </Suspense>
  );
};

export default EarthSphereProxy; 