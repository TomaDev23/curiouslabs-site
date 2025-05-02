import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function CodelabFloatflowLayout({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const [performanceWarnings, setPerformanceWarnings] = useState([]);
  
  // Check for reduced motion preference the classic way as fallback
  const [reducedMotionState, setReducedMotionState] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotionState(mediaQuery.matches);
    
    // Add listener for changes
    const handleChange = () => setReducedMotionState(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Get final reduced motion preference (from hook or state)
  const shouldReduceMotion = prefersReducedMotion || reducedMotionState;

  // Matrix-style code rain effect - light version
  useEffect(() => {
    if (shouldReduceMotion || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Setup canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix rain characters (mix of symbols, mostly programming-related)
    const chars = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥク{}[]()<>/\\';
    const charArray = chars.split('');
    
    // Column settings
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize rain drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    // Draw function for matrix rain
    function draw() {
      // Fade out previous frame with semi-transparent black
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Very subtle color for the matrix rain
      ctx.fillStyle = 'rgba(100, 100, 255, 0.1)';
      ctx.font = `${fontSize}px monospace`;
      
      // Draw each character in the rain
      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Reset drop when it reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Slow movement for subtlety
        drops[i] += 0.05;
      }
    }
    
    // Run animation at reasonable framerate
    const interval = setInterval(draw, 50);
    
    // Performance monitoring in development
    if (process.env.NODE_ENV === 'development') {
      const fps = { value: 0, frames: 0, lastTime: performance.now() };
      
      const checkPerformance = () => {
        const now = performance.now();
        fps.frames++;
        
        if (now >= fps.lastTime + 1000) {
          fps.value = Math.round((fps.frames * 1000) / (now - fps.lastTime));
          fps.frames = 0;
          fps.lastTime = now;
          
          // Log warning if FPS drops significantly
          if (fps.value < 30) {
            setPerformanceWarnings(prev => 
              [...prev, `Low FPS (${fps.value}) detected at ${new Date().toLocaleTimeString()}`]
            );
          }
        }
        
        requestAnimationFrame(checkPerformance);
      };
      
      requestAnimationFrame(checkPerformance);
    }
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [shouldReduceMotion]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative z-10 px-4 sm:px-8 md:px-16 xl:px-24 py-20 overflow-hidden"
    >
      {/* Matrix code rain canvas - very subtle background effect */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-30" 
        style={{ display: shouldReduceMotion ? 'none' : 'block' }}
      />
      
      {/* Multiple nebula layers with different animations for depth */}
      <motion.div 
        className="absolute inset-0 opacity-40 z-1"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.15) 0%, rgba(30, 27, 75, 0.05) 70%)',
        }}
        animate={shouldReduceMotion ? {} : { 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      />
      
      {/* Secondary nebula layer with offset animation */}
      <motion.div 
        className="absolute inset-0 opacity-30 z-2"
        style={{
          background: 'radial-gradient(ellipse at 30% 70%, rgba(192, 132, 252, 0.15) 0%, rgba(30, 27, 75, 0.01) 70%)',
        }}
        animate={shouldReduceMotion ? {} : { 
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Star particles effect */}
      <div className="absolute inset-0 z-3 opacity-30" 
        style={{ 
          backgroundImage: "url(/images/stars.svg)",
          backgroundSize: "cover",
        }}
      />
      
      {/* Content container with increased spacing for tiered effect */}
      <div className="space-y-12 max-w-7xl mx-auto relative z-20">{children}</div>
      
      {/* Bottom gradient that connects to next section - enhanced glow */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[30%] z-5"
        style={{
          background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0) 0%, rgba(139, 92, 246, 0.07) 100%)',
        }}
      />
      
      {/* Side gradients for enhanced depth perception */}
      <div 
        className="absolute top-[20%] left-0 w-[15%] h-[60%] z-4"
        style={{
          background: 'linear-gradient(to right, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0) 100%)',
        }}
      />
      <div 
        className="absolute top-[20%] right-0 w-[15%] h-[60%] z-4"
        style={{
          background: 'linear-gradient(to left, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0) 100%)',
        }}
      />
      
      {/* Performance warnings (development only) */}
      {process.env.NODE_ENV === 'development' && performanceWarnings.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-red-900/80 text-white p-2 text-xs rounded z-50 max-w-xs max-h-32 overflow-auto">
          <p className="font-bold mb-1">Performance Warnings:</p>
          <ul>
            {performanceWarnings.map((warning, i) => (
              <li key={i}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  );
} 