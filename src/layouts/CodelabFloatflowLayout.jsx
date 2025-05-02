import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CodelabFloatflowLayout = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isLowPerf, setIsLowPerf] = useState(false);
  const canvasRef = useRef(null);
  
  // Simple device capability detection
  useEffect(() => {
    const detectLowPerf = () => {
      try {
        // Simple checks for low-performance conditions
        const isLowPerfDevice = 
          (window.innerWidth < 768) || 
          (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        
        setIsLowPerf(isLowPerfDevice);
      } catch (err) {
        // Fallback to false if detection fails
        setIsLowPerf(false);
      }
    };

    detectLowPerf();
    
    // Re-check on resize
    window.addEventListener('resize', detectLowPerf);
    return () => window.removeEventListener('resize', detectLowPerf);
  }, []);

  // Simplified animation flag
  const simplifiedAnimation = shouldReduceMotion || isLowPerf;

  // Matrix rain effect (simplified)
  useEffect(() => {
    if (simplifiedAnimation || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    
    // Initialize canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Fewer matrix characters for better performance
    const chars = '01アァカサタナハマヤャラワガザダバパ{}[]()<>/\\';
    const charArray = chars.split('');
    
    // Reduced density for performance
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize / 2);
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);
    
    const draw = () => {
      // Semi-transparent black for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw characters
      ctx.fillStyle = 'rgba(100, 100, 255, 0.15)';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Skip some columns for better performance
        if (i % 2 === 0 && Math.random() > 0.5) continue;
        
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(char, i * fontSize * 2, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i] += 0.05;
      }
      
      animationFrame = requestAnimationFrame(draw);
    };
    
    // Start animation
    animationFrame = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [simplifiedAnimation]);

  // Forward isLowPerf to children
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isLowPerf });
    }
    return child;
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 px-4 sm:px-8 md:px-16 xl:px-24 py-20 overflow-hidden"
    >
      {/* Background elements with simplified z-index structure */}
      {/* Matrix rain canvas */}
      {!simplifiedAnimation && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 opacity-20" 
          style={{ zIndex: 0 }}
        />
      )}
      
      {/* Primary nebula glow - static for low perf */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.15) 0%, rgba(30, 27, 75, 0.05) 70%)',
        }}
      />
      
      {/* Animated nebula - only if not simplified */}
      {!simplifiedAnimation && (
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            zIndex: 2,
            background: 'radial-gradient(ellipse at 30% 70%, rgba(192, 132, 252, 0.15) 0%, rgba(30, 27, 75, 0.01) 70%)',
          }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        />
      )}
      
      {/* Star background */}
      <div className="absolute inset-0 opacity-30" 
        style={{ 
          zIndex: 3,
          backgroundImage: "url(/images/stars.svg)",
          backgroundSize: "cover",
        }}
      />
      
      {/* Bottom glow gradient */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[20%]"
        style={{
          zIndex: 4,
          background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0) 0%, rgba(139, 92, 246, 0.05) 100%)',
        }}
      />
      
      {/* Content container */}
      <div className="space-y-12 max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {childrenWithProps}
      </div>
    </motion.section>
  );
};

export default CodelabFloatflowLayout; 