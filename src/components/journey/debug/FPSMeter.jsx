import { useState, useEffect, useRef } from 'react';

// Internal metadata for LEGIT compliance
export const metadata = {
  id: 'fps_meter',
  scs: 'SCS-DEBUG',
  type: 'debug',
  doc: 'contract_cosmic_debug.md'
};

export default function FPSMeter() {
  const [fps, setFps] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsHistoryRef = useRef([]);
  
  // Color coding based on performance thresholds
  const getFpsColor = (fps) => {
    if (fps >= 50) return '#4ade80'; // green-400
    if (fps >= 30) return '#facc15'; // yellow-400
    return '#f87171'; // red-400
  };

  useEffect(() => {
    const updateFps = () => {
      frameCountRef.current += 1;
      const now = performance.now();
      const delta = now - lastTimeRef.current;

      if (delta >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / delta);
        setFps(currentFps);
        
        // Update average FPS
        fpsHistoryRef.current.push(currentFps);
        if (fpsHistoryRef.current.length > 60) { // Track 60 frames for a more stable average
          fpsHistoryRef.current.shift();
        }
        
        const sum = fpsHistoryRef.current.reduce((a, b) => a + b, 0);
        setAvgFps(Math.round(sum / fpsHistoryRef.current.length));
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      requestAnimationFrame(updateFps);
    };

    const rafId = requestAnimationFrame(updateFps);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      right: '16px',
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: 'monospace',
      userSelect: 'none',
      pointerEvents: 'none'
    }}>
      <div style={{ color: getFpsColor(fps) }}>
        FPS: {fps}
      </div>
      <div style={{ color: '#60a5fa' }}>
        AVG: {avgFps}
      </div>
      <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>
        DEV MODE
      </div>
    </div>
  );
} 