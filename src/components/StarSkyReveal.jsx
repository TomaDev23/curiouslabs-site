import React, { useEffect, useState } from 'react';
import { motion, useTransform } from 'framer-motion';

// This component creates a layered, parallax starfield with nebula effects
export const StarSkyReveal = ({ mouseX, mouseY, prefersReducedMotion = false, hasScrolledOnce = false }) => {
  // Determine if user prefers reduced motion
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  
  useEffect(() => {
    setReducedMotion(prefersReducedMotion);
  }, [prefersReducedMotion]);
  
  // Create parallax effect values with different intensities for each layer
  const farthestStarsX = useTransform(mouseX, [-500, 500], [-5, 5]);
  const farthestStarsY = useTransform(mouseY, [-500, 500], [-5, 5]);
  
  const midStarsX = useTransform(mouseX, [-500, 500], [-15, 15]);
  const midStarsY = useTransform(mouseY, [-500, 500], [-15, 15]);
  
  const nearStarsX = useTransform(mouseX, [-500, 500], [-30, 30]);
  const nearStarsY = useTransform(mouseY, [-500, 500], [-30, 30]);
  
  const nebulaX = useTransform(mouseX, [-500, 500], [-10, 10]);
  const nebulaY = useTransform(mouseY, [-500, 500], [-10, 10]);
  
  // Generate random stars pattern for each layer
  const generateStarsStyle = (density, size, color) => {
    let boxShadow = '';
    
    // Generate more stars when hasScrolledOnce is true
    const actualDensity = hasScrolledOnce ? density * 1.5 : density;
    
    for (let i = 0; i < actualDensity; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      boxShadow += `${x}px ${y}px ${size}px ${color},`;
    }
    
    // Remove the trailing comma
    return boxShadow.slice(0, -1);
  };
  
  // Different star layers with unique visual characteristics
  // Regenerate stars when hasScrolledOnce changes to create a transition effect
  const farthestStars = generateStarsStyle(400, hasScrolledOnce ? '1.2px' : '1px', 'rgba(255, 255, 255, 0.8)');
  const midStars = generateStarsStyle(200, hasScrolledOnce ? '1.8px' : '1.5px', 'rgba(255, 255, 255, 0.9)');
  const nearStars = generateStarsStyle(100, hasScrolledOnce ? '2.5px' : '2px', '#fff');
  
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Deepest background layer - fixed stars */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-40" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1a103d 0%, transparent 70%)',
          }} 
        />
      </div>
      
      {/* Farthest stars layer - slowest parallax */}
      <motion.div 
        className="absolute inset-0" 
        style={{ 
          x: reducedMotion ? 0 : farthestStarsX,
          y: reducedMotion ? 0 : farthestStarsY,
          boxShadow: farthestStars,
          position: 'absolute',
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={hasScrolledOnce ? { scale: [1, 1.1, 1] } : {}}
        transition={{
          duration: 2,
          ease: "easeOut"
        }}
      />
      
      {/* Medium distance stars layer - medium parallax */}
      <motion.div 
        className="absolute inset-0" 
        style={{ 
          x: reducedMotion ? 0 : midStarsX,
          y: reducedMotion ? 0 : midStarsY,
          boxShadow: midStars,
          position: 'absolute',
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={hasScrolledOnce ? { scale: [1, 1.15, 1] } : {}}
        transition={{
          duration: 2.2,
          ease: "easeOut"
        }}
      />
      
      {/* Nebula effect - enhanced when hasScrolledOnce is true */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          x: reducedMotion ? 0 : nebulaX,
          y: reducedMotion ? 0 : nebulaY
        }}
        animate={reducedMotion ? {} : {
          opacity: hasScrolledOnce ? [0.6, 0.8, 0.6] : [0.5, 0.7, 0.5],
          scale: hasScrolledOnce ? [1, 1.08, 1] : [1, 1.05, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="absolute -top-[30%] -left-[10%] w-[120%] h-[120%] opacity-20 rounded-full"
          style={{ 
            background: hasScrolledOnce 
              ? 'radial-gradient(ellipse at center, rgba(111, 25, 180, 0.6) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(111, 25, 180, 0.4) 0%, transparent 70%)',
          }} 
        />
        <div className="absolute top-[40%] -right-[20%] w-[70%] h-[80%] opacity-15 rounded-full"
          style={{ 
            background: hasScrolledOnce
              ? 'radial-gradient(ellipse at center, rgba(86, 11, 173, 0.5) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(86, 11, 173, 0.3) 0%, transparent 70%)',
          }} 
        />
      </motion.div>
      
      {/* Closest stars layer - fastest parallax */}
      <motion.div 
        className="absolute inset-0" 
        style={{ 
          x: reducedMotion ? 0 : nearStarsX,
          y: reducedMotion ? 0 : nearStarsY,
          boxShadow: nearStars,
          position: 'absolute',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={hasScrolledOnce ? { scale: [1, 1.2, 1] } : {}}
        transition={{
          duration: 2.5,
          ease: "easeOut"
        }}
      />
      
      {/* Foreground light flicker effect - enhanced when hasScrolledOnce is true */}
      {!reducedMotion && (
        <motion.div 
          className="absolute inset-0"
          animate={{
            opacity: hasScrolledOnce 
              ? [0, 0.08, 0, 0.1, 0]
              : [0, 0.05, 0, 0.07, 0],
          }}
          transition={{
            duration: hasScrolledOnce ? 3.5 : 4,
            times: [0, 0.2, 0.4, 0.6, 1],
            repeat: Infinity,
            repeatDelay: hasScrolledOnce ? 2 : 3
          }}
          style={{
            backgroundImage: 'linear-gradient(125deg, transparent 40%, rgba(255, 255, 255, 0.3) 45%, transparent 50%)',
            filter: 'blur(5px)'
          }}
        />
      )}
      
      {/* Comet streaks - only visible after scroll trigger */}
      {hasScrolledOnce && !reducedMotion && (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {Array.from({ length: 3 }).map((_, i) => {
            const top = Math.random() * 70 + 15;
            const left = Math.random() * 80 + 10;
            const angle = Math.random() * 60 - 30;
            
            return (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-r from-transparent via-white/70 to-transparent h-[1px] w-[100px]"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: `rotate(${angle}deg)`,
                  filter: 'blur(0.5px)'
                }}
                animate={{
                  x: ['-100px', '150vw']
                }}
                transition={{
                  duration: Math.random() * 2 + 3,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 10 + 5
                }}
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
}; 