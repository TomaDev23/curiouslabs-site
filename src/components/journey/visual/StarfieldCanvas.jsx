import React, { useRef, useEffect, useState } from 'react';

/**
 * StarfieldCanvas - Optimized star field renderer with high-DPI support
 * Internal component metadata - not exported to prevent Fast Refresh issues
 */
const metadata = {
  id: 'starfield_canvas',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_cosmic_backdrop.md'
};

/**
 * StarfieldCanvas - Optimized star field renderer with high-DPI support
 * 
 * @param {object} props
 * @param {number} props.opacity - Overall opacity of the starfield (0-1)
 * @param {number} props.density - Number of stars to render
 * @param {number} props.fps - Target frames per second for throttling
 * @param {string} props.baseColor - Base color for stars (CSS color)
 * @param {boolean} props.breathing - Whether to animate stars with breathing effect
 * @param {string} props.className - Additional CSS classes
 */
export default function StarfieldCanvas({ 
  opacity = 1, 
  density = 100,
  fps = 30,
  baseColor = "#ffffff",
  breathing = false,
  className = ""
}) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const [colorConfig] = useState(() => parseColor(baseColor));
  
  // Parse CSS color string into RGB components
  function parseColor(color) {
    // Default to white if color parsing fails
    let r = 255, g = 255, b = 255;
    
    // Handle hex colors
    if (color.startsWith('#')) {
      if (color.length === 4) {
        r = parseInt(color[1] + color[1], 16);
        g = parseInt(color[2] + color[2], 16);
        b = parseInt(color[3] + color[3], 16);
      } else {
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
      }
    }
    // Add support for hsl colors
    else if (color.startsWith('hsl')) {
      const match = color.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
      if (match) {
        const h = parseInt(match[1]) / 360;
        const s = parseInt(match[2]) / 100;
        const l = parseInt(match[3]) / 100;
        
        // Convert HSL to RGB
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // Achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };
          
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }
        
        return { 
          r: Math.round(r * 255), 
          g: Math.round(g * 255), 
          b: Math.round(b * 255) 
        };
      }
    }
    
    return { r, g, b };
  }
  
  // Main canvas rendering effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle canvas resizing with devicePixelRatio
    const handleResize = () => {
      // Get parent element size for full coverage
      const parentWidth = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      const parentHeight = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      
      // Set display size (CSS)
      canvas.style.width = `${parentWidth}px`;
      canvas.style.height = `${parentHeight}px`;
      
      // Set actual canvas size in pixels (rendered pixels)
      canvas.width = parentWidth * dpr;
      canvas.height = parentHeight * dpr;
      
      // Scale drawing operations
      ctx.scale(dpr, dpr);
    };
    
    // Generate stars with properties
    const generateStars = () => {
      // Get dimensions from canvas
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Calculate actual star count based on density and screen size
      const starCount = Math.floor(density * (width * height) / (1920 * 1080));
      
      return Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        // Normal star size
        size: Math.random() * 2 + 0.5,
        // Normal opacity range
        baseOpacity: Math.random() * 0.5 + 0.3,
        // For breathing effect, give each star a random phase
        phase: Math.random() * Math.PI * 2,
        // Different flicker speeds for more natural effect
        flickerSpeed: 0.5 + Math.random() * 1.5
      }));
    };
    
    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const stars = generateStars();
    
    // Animation function with throttling
    const animate = (timestamp) => {
      // Throttle to target FPS
      const frameInterval = 1000 / fps;
      if (timestamp - lastFrameTimeRef.current < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Update time reference for throttling
      lastFrameTimeRef.current = timestamp - 
        ((timestamp - lastFrameTimeRef.current) % frameInterval);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Draw each star
      stars.forEach(star => {
        let finalOpacity = star.baseOpacity;
        
        // Apply breathing effect if enabled
        if (breathing) {
          // Gentle breathing effect
          const breathFactor = 0.9 + 0.1 * Math.sin(
            (timestamp * 0.0005 * star.flickerSpeed) + star.phase
          );
          finalOpacity *= breathFactor;
        }
        
        // Apply global opacity
        finalOpacity *= opacity;
        
        // Skip rendering nearly invisible stars
        if (finalOpacity < 0.01) return;
        
        // Set star color with parsed base color
        const { r, g, b } = colorConfig;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
        
        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow for larger stars
        if (star.size > 1.2 && finalOpacity > 0.5) {
          ctx.shadowBlur = star.size * 2;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity, density, fps, colorConfig, breathing]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`${className}`}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    />
  );
} 