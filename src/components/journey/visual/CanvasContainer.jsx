import React, { useEffect, useRef } from 'react';
import { optimizeCanvas } from '../../../utils/canvasUtils';

/**
 * High-performance canvas container with optimized rendering
 * Implements LEGIT-compliant canvas management
 */
export default function CanvasContainer({
  className = '',
  style = {},
  onSetup = null,
  onResize = null,
  onCleanup = null,
  blendMode = 'normal',
  zIndex = 0,
  visible = true
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Canvas setup and optimization
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;

    // Get and optimize context
    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    
    if (!ctx) {
      console.warn('CanvasContainer: Failed to get 2D context');
      return;
    }

    contextRef.current = ctx;

    // Setup ResizeObserver for dynamic sizing
    resizeObserverRef.current = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) return;

      const dpr = window.devicePixelRatio || 1;
      
      // Update canvas dimensions
      canvas.width = entry.contentRect.width * dpr;
      canvas.height = entry.contentRect.height * dpr;
      
      // Optimize canvas after resize
      optimizeCanvas(canvas, ctx);

      // Call resize callback if provided
      if (onResize) {
        onResize(canvas, ctx, dpr);
      }
    });

    // Start observing container
    resizeObserverRef.current.observe(container);

    // Initial optimization
    optimizeCanvas(canvas, ctx);

    // Call setup callback if provided
    if (onSetup) {
      onSetup(canvas, ctx, window.devicePixelRatio || 1);
    }

    // Cleanup function
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (onCleanup) {
        onCleanup(canvas, ctx);
      }
    };
  }, [onSetup, onResize, onCleanup]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{ 
        pointerEvents: 'none',
        zIndex,
        ...style
      }}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          display: 'block',
          visibility: visible ? 'visible' : 'hidden',
          mixBlendMode: blendMode,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
} 