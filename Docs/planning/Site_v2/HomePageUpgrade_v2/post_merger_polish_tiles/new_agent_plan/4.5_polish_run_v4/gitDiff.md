S C:\website_build> git diff v4.0-stable-tile-T46C...HEAD
diff --git a/index.html b/index.html
index 41fcfc6..6bf7a86 100644
--- a/index.html
+++ b/index.html
@@ -8,9 +8,55 @@
     <meta name="referrer" content="strict-origin-when-cross-origin">
     <meta name="description" content="CuriousLabs is an AI-driven creative code lab. Explore automation tools, stunning design systems, and breakthrough digital engineering.">
     <title>CuriousLabs - AI CodeOps Service Lab</title>
+    
+    <!-- Preload critical assets -->
+    <link rel="preload" href="/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>
+    
+    <!-- Critical CSS for hero sections - inline for faster FCP -->
+    <style>
+      /* Critical CSS for initial paint */
+      :root {
+        --hero-gradient-from: rgba(124, 58, 237, 0.3);
+        --hero-gradient-via: rgba(31, 32, 64, 0.3);
+        --hero-gradient-to: rgba(0, 0, 0, 1);
+      }
+      body {
+        margin: 0;
+        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;     
+        overflow-x: hidden;
+        background-color: #0f172a;
+        color: #fff;
+      }
+      /* Optimize CLS by setting minimum height for hero section */
+      #root {
+        min-height: 100vh;
+      }
+      /* Placeholder styles for content before JS loads */
+      .hero-placeholder {
+        position: relative;
+        height: 100vh;
+        width: 100%;
+        display: flex;
+        align-items: center;
+        justify-content: center;
+        background: radial-gradient(ellipse at center, var(--hero-gradient-from), var(--hero-gradient-via), var(--hero-gradient-to));
+      }
+    </style>
+    
+    <!-- Preconnect to origins -->
+    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   </head>
   <body>
-    <div id="root"></div>
+    <div id="root">
+      <!-- Optional initial loading state to reduce CLS -->
+      <div class="hero-placeholder">
+        <svg width="80" height="80" viewBox="0 0 100 100" style="opacity: 0.8">
+          <circle cx="50" cy="50" r="40" stroke="rgba(139, 92, 246, 0.8)" stroke-width="8" fill="none" />     
+        </svg>
+      </div>
+    </div>
+    
+    <!-- Load the main script with high priority -->
     <script type="module" src="/src/main.jsx"></script>
   </body>
 </html>
diff --git a/src/components/home/v4/SpaceCanvas.jsx b/src/components/home/v4/SpaceCanvas.jsx
index 6e0a910..4a2acef 100644
--- a/src/components/home/v4/SpaceCanvas.jsx
+++ b/src/components/home/v4/SpaceCanvas.jsx
@@ -1,4 +1,4 @@
-import React, { useMemo, useEffect, useState } from 'react';
+import React, { useMemo, useEffect, useState, useRef } from 'react';
 import { motion } from 'framer-motion';
 import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
 import ErrorBoundary from '../../ui/ErrorBoundary';
@@ -6,10 +6,22 @@ import { startComponentRender, endComponentRender } from '../../../utils/perform
 import useAccessibilityCheck from '../../../hooks/useAccessibilityCheck';

 /**
- * SpaceCanvas - Enhanced space-themed background for cosmic components
- * Provides an extended starfield background with density gradients and animated nebula effects
+ * SpaceCanvas - Enhanced space-themed background using Canvas for performance
+ * Provides a starfield background with density gradients and animated nebula effects
+ * Canvas implementation drastically reduces DOM element count for better performance
+ * SSR-safe implementation with early return pattern for server rendering
  */
 const SpaceCanvas = () => {
+  // SSR guard - early return pattern
+  if (typeof window === 'undefined') {
+    return (
+      <div className="fixed inset-0 z-0 overflow-hidden bg-black">
+        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
+      </div>
+    );
+  }
+  
+  // Client-side only code below this point
   // Performance monitoring
   const renderStartTime = startComponentRender('SpaceCanvas');

@@ -19,46 +31,173 @@ const SpaceCanvas = () => {
     checkFocus: false, // No interactive elements
     checkAria: false  // No interactive elements
   });
+
+  // Canvas refs
+  const canvasRef = useRef(null);
+  const requestRef = useRef(null);
+  const [canvasInitialized, setCanvasInitialized] = useState(false);

-  // Create stars with density gradient (more at top, fewer at bottom)
+  // Handle resize
+  const handleResize = () => {
+    if (canvasRef.current) {
+      const canvas = canvasRef.current;
+      canvas.width = window.innerWidth;
+      canvas.height = window.innerHeight;
+      
+      // Trigger redraw after resize
+      if (canvasInitialized) {
+        renderStarfield();
+      }
+    }
+  };
+
+  // Create stars with density gradient (more at top, fewer at bottom) - now used for canvas
   const createStars = (count, densityFactor = 1) => {
-    return Array.from({ length: count }).map((_, i) => {
-      // Calculate vertical position - now contained within viewport height (0-100%)
+    return Array.from({ length: count }).map(() => {
+      // Calculate vertical position - contained within viewport height (0-100%)
       const verticalPosition = Math.random() * 100;

       return {
-        id: i,
         x: Math.random() * 100,
         y: verticalPosition,
         size: Math.random() * 2 + 1,
         opacity: Math.random() * 0.7 + 0.3 * densityFactor,
         animationDuration: Math.random() * 3 + 2,
-        delay: Math.random() * 2
+        twinklePhase: Math.random() * Math.PI * 2, // Random starting phase for twinkling
+        // Generate a random color with slight variations for stars
+        color: Math.random() > 0.8 
+          ? `rgba(${220 + Math.random() * 35}, ${220 + Math.random() * 35}, ${255}, 1)` 
+          : 'rgba(255, 255, 255, 1)'
       };
     });
   };

-  // Generate different star layers with increased density
-  const staticStars = useMemo(() => createStars(250, 1), []);
-  const animatedStars = useMemo(() => createStars(80, 1.2), []);
-  const distantStars = useMemo(() => createStars(150, 0.7), []);
+  // Generate different star layers - memoized
+  const stars = useMemo(() => {
+    const staticStars = createStars(250, 1);
+    const animatedStars = createStars(80, 1.2);
+    const distantStars = createStars(150, 0.7);
+    
+    return {
+      staticStars,
+      animatedStars,
+      distantStars
+    };
+  }, []);

-  // Generate floating particles
-  const floatingParticles = useMemo(() => 
-    Array.from({ length: 40 }).map((_, i) => ({
-      id: i,
-      size: Math.random() * 2 + 1,
-      x: Math.random() * 100,
-      y: Math.random() * 100, // Contained within viewport height
-      duration: 15 + Math.random() * 20,
-      delay: Math.random() * 10
-    })), 
-  []);
+  // Render the starfield on canvas
+  const renderStarfield = () => {
+    if (!canvasRef.current) return;
+    
+    const canvas = canvasRef.current;
+    const ctx = canvas.getContext('2d');
+    
+    // Clear canvas
+    ctx.clearRect(0, 0, canvas.width, canvas.height);
+    
+    // Calculate time for animations
+    const time = performance.now() * 0.001; // Convert to seconds
+    
+    // Render static stars
+    stars.staticStars.forEach(star => {
+      const x = (star.x / 100) * canvas.width;
+      const y = (star.y / 100) * canvas.height;
+      
+      ctx.beginPath();
+      ctx.fillStyle = star.color;
+      ctx.globalAlpha = star.opacity;
+      ctx.arc(x, y, star.size, 0, Math.PI * 2);
+      ctx.fill();
+      
+      // Add glow for larger stars
+      if (star.size > 1.8) {
+        const glow = ctx.createRadialGradient(
+          x, y, 0,
+          x, y, star.size * 4
+        );
+        glow.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
+        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
+        
+        ctx.beginPath();
+        ctx.fillStyle = glow;
+        ctx.globalAlpha = star.opacity * 0.5;
+        ctx.arc(x, y, star.size * 4, 0, Math.PI * 2);
+        ctx.fill();
+      }
+    });
+    
+    // Render distant stars
+    stars.distantStars.forEach(star => {
+      const x = (star.x / 100) * canvas.width;
+      const y = (star.y / 100) * canvas.height;
+      
+      ctx.beginPath();
+      ctx.fillStyle = star.color;
+      ctx.globalAlpha = star.opacity * 0.6;
+      ctx.arc(x, y, star.size * 0.6, 0, Math.PI * 2);
+      ctx.fill();
+    });
+    
+    // Render animated stars with twinkling
+    stars.animatedStars.forEach(star => {
+      const x = (star.x / 100) * canvas.width;
+      const y = (star.y / 100) * canvas.height;
+      
+      // Calculate twinkling effect
+      const twinkle = Math.sin(time * (1 / star.animationDuration) + star.twinklePhase);
+      const twinkleOpacity = star.opacity * 0.5 + (twinkle + 1) * 0.25 * star.opacity;
+      const twinkleSize = star.size * 1.2 * (1 + twinkle * 0.1);
+      
+      // Draw the star
+      ctx.beginPath();
+      ctx.fillStyle = star.color;
+      ctx.globalAlpha = twinkleOpacity;
+      ctx.arc(x, y, twinkleSize, 0, Math.PI * 2);
+      ctx.fill();
+      
+      // Add glow effect
+      const glowOpacity = 0.4 * ((twinkle + 1) * 0.5);
+      const glow = ctx.createRadialGradient(
+        x, y, 0,
+        x, y, star.size * 4
+      );
+      glow.addColorStop(0, `rgba(255, 255, 255, ${glowOpacity})`);
+      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
+      
+      ctx.beginPath();
+      ctx.fillStyle = glow;
+      ctx.globalAlpha = twinkleOpacity * 0.5;
+      ctx.arc(x, y, star.size * 4, 0, Math.PI * 2);
+      ctx.fill();
+    });
+    
+    // Request next frame for animation
+    requestRef.current = requestAnimationFrame(renderStarfield);
+  };

-  // Log render duration when component renders
+  // Initialize canvas on mount and handle cleanup
   useEffect(() => {
+    // Set up canvas
+    if (canvasRef.current) {
+      handleResize();
+      renderStarfield();
+      setCanvasInitialized(true);
+    }
+    
+    // Add resize listener
+    window.addEventListener('resize', handleResize);
+    
+    // Log render duration when component renders
     endComponentRender('SpaceCanvas', renderStartTime);
-  }, [renderStartTime]);
+    
+    // Cleanup
+    return () => {
+      window.removeEventListener('resize', handleResize);
+      if (requestRef.current) {
+        cancelAnimationFrame(requestRef.current);
+      }
+    };
+  }, [renderStartTime, stars]);

   return (
     <ErrorBoundary
@@ -69,75 +208,25 @@ const SpaceCanvas = () => {
         {/* Background gradient */}
         <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>

+        {/* Starfield canvas - single DOM element for all stars */}
+        <canvas 
+          ref={canvasRef}
+          className="fixed inset-0"
+          style={{ zIndex: 1 }}
+        />
+        
         {/* Cosmic noise overlay */}
         <CosmicNoiseOverlay opacity={0.03} blendMode="soft-light" />

-        {/* Static stars with density gradient - fixed to viewport */}
-        {staticStars.map((star) => (
-          <div
-            key={`static-star-${star.id}`}
-            className="fixed rounded-full bg-white"
-            style={{
-              width: `${star.size}px`,
-              height: `${star.size}px`,
-              top: `${star.y}%`,
-              left: `${star.x}%`,
-              opacity: star.opacity,
-              boxShadow: star.size > 1.8 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.4)` : 'none'
-            }}
-          />
-        ))}
-        
-        {/* Distant smaller stars - fixed to viewport */}
-        {distantStars.map((star) => (
-          <div
-            key={`distant-star-${star.id}`}
-            className="fixed rounded-full bg-white"
-            style={{
-              width: `${star.size * 0.6}px`,
-              height: `${star.size * 0.6}px`,
-              top: `${star.y}%`,
-              left: `${star.x}%`,
-              opacity: star.opacity * 0.6,
-            }}
-          />
-        ))}
-        
-        {/* Animated stars with enhanced twinkling effect - fixed to viewport */}
-        {animatedStars.map((star) => (
-          <motion.div
-            key={`animated-star-${star.id}`}
-            className="fixed rounded-full bg-white"
-            style={{
-              width: `${star.size * 1.2}px`,
-              height: `${star.size * 1.2}px`,
-              top: `${star.y}%`,
-              left: `${star.x}%`,
-              opacity: star.opacity * 0.5, // Start with lower opacity
-            }}
-            animate={{
-              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
-              scale: [1, 1.2, 1],
-              boxShadow: [
-                '0 0 0px rgba(255, 255, 255, 0)',
-                `0 0 ${star.size * 4}px rgba(255, 255, 255, 0.4)`,
-                '0 0 0px rgba(255, 255, 255, 0)'
-              ]
-            }}
-            transition={{
-              duration: star.animationDuration,
-              repeat: Infinity,
-              repeatType: "reverse",
-              ease: "easeInOut",
-              delay: star.delay
-            }}
-          />
-        ))}
-        
-        {/* Enhanced nebula effects - fixed to viewport */}
+        {/* Enhanced nebula effects - fixed to viewport 
+            These are kept as DOM elements because they use blur filters
+            that are more efficient with CSS than Canvas */}
         <motion.div
-          className="fixed top-1/4 left-1/3 w-2/3 h-2/3 rounded-full opacity-10 blur-[100px]"
-          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(30, 64, 175, 0.1) 50%, transparent 80%)' }}
+          className="fixed top-1/4 left-1/3 w-2/3 h-2/3 rounded-full opacity-10 blur-[100px] pointer-events-none"
+          style={{ 
+            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(30, 64, 175, 0.1) 50%, transparent 80%)',
+            zIndex: 2
+          }}
           animate={{
             opacity: [0.06, 0.1, 0.06],
             scale: [1, 1.05, 1],
@@ -146,8 +235,11 @@ const SpaceCanvas = () => {
         />

         <motion.div
-          className="fixed bottom-[40%] right-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-[80px]"
-          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(91, 33, 182, 0.1) 60%, transparent 80%)' }}
+          className="fixed bottom-[40%] right-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-[80px] pointer-events-none"
+          style={{ 
+            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(91, 33, 182, 0.1) 60%, transparent 80%)', 
+            zIndex: 2 
+          }}
           animate={{
             opacity: [0.06, 0.12, 0.06],
             scale: [1, 1.1, 1],
@@ -155,10 +247,12 @@ const SpaceCanvas = () => {
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
         />

-        {/* New nebula cloud for additional depth - fixed to viewport */}
         <motion.div
-          className="fixed top-[60%] left-1/5 w-1/3 h-1/3 rounded-full opacity-10 blur-[120px]"
-          style={{ background: 'radial-gradient(circle, rgba(216, 180, 254, 0.3) 0%, rgba(129, 140, 248, 0.1) 
60%, transparent 80%)' }}
+          className="fixed top-[60%] left-1/5 w-1/3 h-1/3 rounded-full opacity-10 blur-[120px] pointer-events-none"
+          style={{ 
+            background: 'radial-gradient(circle, rgba(216, 180, 254, 0.3) 0%, rgba(129, 140, 248, 0.1) 60%, transparent 80%)',
+            zIndex: 2
+          }}
           animate={{
             opacity: [0.05, 0.09, 0.05],
             scale: [1, 1.08, 1],
@@ -166,61 +260,11 @@ const SpaceCanvas = () => {
           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 8 }}
         />

-        {/* Floating particles - fixed to viewport */}
-        {floatingParticles.map((particle) => (
-          <motion.div
-            key={`floating-particle-${particle.id}`}
-            className="fixed rounded-full bg-purple-400/20"
-            style={{
-              width: `${particle.size}px`,
-              height: `${particle.size}px`,
-              left: `${particle.x}%`,
-              top: `${particle.y}%`,
-            }}
-            animate={{
-              y: [0, -20],
-              opacity: [0, 0.4, 0]
-            }}
-            transition={{
-              duration: particle.duration,
-              repeat: Infinity,
-              ease: "easeInOut",
-              delay: particle.delay
-            }}
-          />
-        ))}
-        
-        {/* Light beams - fixed to viewport */}
-        <motion.div 
-          className="fixed top-[10%] left-[20%] h-[600px] w-2 rotate-[30deg] blur-[30px] opacity-5"
-          style={{ 
-            background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0), rgba(139, 92, 246, 0.4), rgba(139, 
92, 246, 0))'
-          }}
-          animate={{ 
-            opacity: [0.03, 0.06, 0.03],
-            scale: [0.9, 1, 0.9]
-          }}
-          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
-        />
-        
-        <motion.div 
-          className="fixed top-[30%] right-[30%] h-[400px] w-1 rotate-[-20deg] blur-[20px] opacity-5"
-          style={{ 
-            background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0), rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0))'
-          }}
-          animate={{ 
-            opacity: [0.02, 0.05, 0.02],
-            scale: [0.9, 1.1, 0.9]
-          }}
-          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
-        />
-        
-        {/* Gradient overlay for content readability - this div remains on top of stars but below content */} 
-        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none"></div>
+        {/* Overlay gradient for fading to black at the bottom */}
+        <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent pointer-events-none" style={{ zIndex: 3 }}></div>
       </div>
     </ErrorBoundary>
   );
 };

-// Export without memo to ensure animations work properly
-export default SpaceCanvas; 
\ No newline at end of file
+export default React.memo(SpaceCanvas); 
\ No newline at end of file
diff --git a/src/components/ui/LoadingScreen.jsx b/src/components/ui/LoadingScreen.jsx
new file mode 100644
index 0000000..a61ee8b
--- /dev/null
+++ b/src/components/ui/LoadingScreen.jsx
@@ -0,0 +1,19 @@
+import React from 'react';
+
+/**
+ * LoadingScreen - Minimal loading indicator for SSR and suspense fallbacks
+ * Uses only CSS animations for SSR compatibility
+ * No client-side effects or window access
+ */
+function LoadingScreen() {
+  return (
+    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-900 to-black">
+      <div className="animate-spin h-12 w-12 rounded-full border-4 border-purple-400 border-t-transparent mb-4"></div>
+      <div className="text-purple-300 text-lg font-light animate-pulse">
+        Initializing Cosmic Interface...
+      </div>
+    </div>
+  );
+}
+
+export default LoadingScreen; 
\ No newline at end of file
diff --git a/src/components/ui/ParticleField.jsx b/src/components/ui/ParticleField.jsx
index 00d1a06..df9a73e 100644
--- a/src/components/ui/ParticleField.jsx
+++ b/src/components/ui/ParticleField.jsx
@@ -1,9 +1,10 @@
-import React, { useMemo } from 'react';
-import { motion } from 'framer-motion';
+import React, { useMemo, useRef, useEffect, useState } from 'react';
 import { useBreakpoint } from '../../hooks/useBreakpoint.js';

 /**
  * ParticleField - Creates ambient floating particles with random movement patterns
+ * Implemented with Canvas for improved performance and reduced DOM elements
+ * SSR-safe with early return pattern for server rendering
  *
  * @param {Object} props
  * @param {string} props.density - Particle density: 'low', 'medium', 'high'
@@ -15,9 +16,19 @@ const ParticleField = ({
   zIndex = 0,
   yDirection = 'up'
 }) => {
+  // SSR guard - early return pattern
+  if (typeof window === 'undefined') {
+    return null; // Return null during server-side rendering
+  }
+
+  // Client-side only code below this point
   const breakpoint = useBreakpoint();
   const isMobile = breakpoint === 'mobile';

+  const canvasRef = useRef(null);
+  const animationRef = useRef(null);
+  const [isVisible, setIsVisible] = useState(true);
+  
   // Determine number of particles based on density and device
   const getParticleCount = () => {
     const counts = {
@@ -29,91 +40,188 @@ const ParticleField = ({
   };

   // Calculate y-direction animation based on direction prop
-  const getYAnimation = (randomFactor) => {
-    if (yDirection === 'up') return [0, -30 * randomFactor];
-    if (yDirection === 'down') return [0, 30 * randomFactor];
+  const getYAnimation = (randomFactor, baseDirection) => {
+    if (baseDirection === 'up') return -30 * randomFactor;
+    if (baseDirection === 'down') return 30 * randomFactor;
     // For mixed, randomly choose up or down
-    return Math.random() > 0.5 ? [0, -30 * randomFactor] : [0, 30 * randomFactor];
+    return Math.random() > 0.5 ? -30 * randomFactor : 30 * randomFactor;
   };

-  // Memoize particles to prevent unnecessary re-renders
+  // Generate particles data - memoized
   const particles = useMemo(() => {
-    return Array.from({ length: getParticleCount() }).map((_, i) => {
+    return Array.from({ length: getParticleCount() }).map(() => {
       const randomFactor = Math.random() * 0.6 + 0.7; // 0.7 to 1.3
       const size = (Math.random() * 1.5 + 1) * (isMobile ? 0.8 : 1); // Slightly smaller on mobile
+      const particleYDirection = yDirection === 'mixed' 
+        ? (Math.random() > 0.5 ? 'up' : 'down')
+        : yDirection;

       return {
-        id: i,
         x: Math.random() * 100, // % position
         y: Math.random() * 100, // % position
+        originalY: Math.random() * 100, // Store original position for animation
         size,
-        yAnimation: getYAnimation(randomFactor),
-        duration: 10 + Math.random() * 15, // 10-25 seconds
-        delay: Math.random() * 5,
-        opacity: Math.random() * 0.4 + 0.1 // 0.1-0.5
+        speed: 10 + Math.random() * 15, // Movement speed (in seconds)
+        progress: Math.random(), // Animation progress
+        direction: particleYDirection,
+        randomFactor,
+        xOffset: (Math.random() - 0.5) * 20, // Horizontal drift
+        opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
+        color: Math.random() > 0.8 ? 'rgba(167, 139, 250, 0.3)' : 'rgba(139, 92, 246, 0.3)', // Purple tones  
       };
     });
   }, [density, isMobile, yDirection]);

+  // Generate bright particles data - memoized
+  const brightParticles = useMemo(() => {
+    return Array.from({ length: Math.floor(getParticleCount() / 6) }).map(() => {
+      const randomFactor = Math.random() * 0.5 + 0.8;
+      const particleYDirection = yDirection === 'mixed' 
+        ? (Math.random() > 0.5 ? 'up' : 'down')
+        : yDirection;
+      
+      return {
+        x: Math.random() * 100,
+        y: Math.random() * 100,
+        originalY: Math.random() * 100,
+        size: Math.random() * 2 + 1.5,
+        speed: 8 + Math.random() * 10,
+        progress: Math.random(),
+        direction: particleYDirection,
+        randomFactor,
+        xOffset: (Math.random() - 0.5) * 15,
+        opacity: 0.6,
+        color: 'rgba(96, 165, 250, 0.4)', // Blue tone
+      };
+    });
+  }, [density, yDirection]);
+  
+  // Handle canvas resize
+  const handleResize = () => {
+    if (canvasRef.current) {
+      const canvas = canvasRef.current;
+      canvas.width = window.innerWidth;
+      canvas.height = window.innerHeight;
+    }
+  };
+  
+  // Animation loop for Canvas rendering
+  const animate = () => {
+    if (!canvasRef.current || !isVisible) return;
+    
+    const canvas = canvasRef.current;
+    const ctx = canvas.getContext('2d');
+    const width = canvas.width;
+    const height = canvas.height;
+    
+    // Clear canvas
+    ctx.clearRect(0, 0, width, height);
+    
+    // Update and draw regular particles
+    particles.forEach(particle => {
+      // Update progress
+      particle.progress += 1 / (particle.speed * 60); // 60fps target
+      if (particle.progress >= 1) particle.progress = 0;
+      
+      // Calculate position
+      const yMove = getYAnimation(particle.randomFactor, particle.direction);
+      const currentY = particle.originalY + (yMove * particle.progress);
+      const currentX = particle.x + (particle.xOffset * particle.progress);
+      
+      // Calculate opacity based on animation curve
+      const opacityCurve = Math.sin(particle.progress * Math.PI);
+      const currentOpacity = particle.opacity * (0.5 + opacityCurve * 0.5);
+      
+      // Draw particle
+      const x = (currentX / 100) * width;
+      const y = (currentY / 100) * height;
+      
+      ctx.beginPath();
+      ctx.fillStyle = particle.color;
+      ctx.globalAlpha = currentOpacity;
+      ctx.arc(x, y, particle.size, 0, Math.PI * 2);
+      ctx.fill();
+    });
+    
+    // Update and draw bright particles
+    brightParticles.forEach(particle => {
+      // Update progress
+      particle.progress += 1 / (particle.speed * 60); // 60fps target
+      if (particle.progress >= 1) particle.progress = 0;
+      
+      // Calculate position
+      const yMove = getYAnimation(particle.randomFactor, particle.direction);
+      const currentY = particle.originalY + (yMove * particle.progress);
+      const currentX = particle.x + (particle.xOffset * particle.progress);
+      
+      // Calculate opacity and scale based on animation curve
+      const animCurve = Math.sin(particle.progress * Math.PI);
+      const currentOpacity = particle.opacity * (0.5 + animCurve * 0.5);
+      const currentScale = 1 + (animCurve * 0.3);
+      
+      // Draw particle
+      const x = (currentX / 100) * width;
+      const y = (currentY / 100) * height;
+      
+      ctx.beginPath();
+      ctx.fillStyle = particle.color;
+      ctx.globalAlpha = currentOpacity;
+      ctx.arc(x, y, particle.size * currentScale, 0, Math.PI * 2);
+      ctx.fill();
+    });
+    
+    // Continue animation loop
+    animationRef.current = requestAnimationFrame(animate);
+  };
+  
+  // Set up Intersection Observer to pause animations when not visible
+  useEffect(() => {
+    // Create observer to pause animation when not in viewport
+    const observer = new IntersectionObserver(
+      entries => {
+        setIsVisible(entries[0].isIntersecting);
+      },
+      { threshold: 0.1 }
+    );
+    
+    if (canvasRef.current) {
+      observer.observe(canvasRef.current);
+    }
+    
+    return () => {
+      if (canvasRef.current) {
+        observer.unobserve(canvasRef.current);
+      }
+    };
+  }, []);
+  
+  // Handle canvas setup, animation, and cleanup
+  useEffect(() => {
+    // Setup canvas
+    handleResize();
+    window.addEventListener('resize', handleResize);
+    
+    // Start animation if visible
+    if (isVisible) {
+      animate();
+    }
+    
+    // Cleanup
+    return () => {
+      window.removeEventListener('resize', handleResize);
+      if (animationRef.current) {
+        cancelAnimationFrame(animationRef.current);
+      }
+    };
+  }, [particles, brightParticles, isVisible]);
+  
   return (
-    <div 
+    <canvas 
+      ref={canvasRef}
       className="fixed inset-0 pointer-events-none"
       style={{ zIndex }}
-    >
-      {particles.map(particle => (
-        <motion.div
-          key={particle.id}
-          className="absolute rounded-full bg-purple-400/30"
-          style={{
-            left: `${particle.x}%`,
-            top: `${particle.y}%`,
-            width: `${particle.size}px`,
-            height: `${particle.size}px`,
-            opacity: particle.opacity
-          }}
-          animate={{
-            y: particle.yAnimation,
-            x: [0, (Math.random() - 0.5) * 20], // Slight horizontal drift
-            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
-          }}
-          transition={{
-            duration: particle.duration,
-            repeat: Infinity,
-            repeatType: "reverse",
-            ease: "easeInOut",
-            delay: particle.delay
-          }}
-        />
-      ))}
-      
-      {/* Add a few brighter particles for visual interest */}
-      {Array.from({ length: Math.floor(getParticleCount() / 6) }).map((_, i) => (
-        <motion.div
-          key={`bright-${i}`}
-          className="absolute rounded-full bg-blue-300/40"
-          style={{
-            left: `${Math.random() * 100}%`,
-            top: `${Math.random() * 100}%`,
-            width: `${Math.random() * 2 + 1.5}px`,
-            height: `${Math.random() * 2 + 1.5}px`,
-            opacity: 0.6
-          }}
-          animate={{
-            y: getYAnimation(Math.random() * 0.5 + 0.8),
-            opacity: [0.6, 0.3, 0.6],
-            scale: [1, 1.3, 1]
-          }}
-          transition={{
-            duration: 8 + Math.random() * 10,
-            repeat: Infinity,
-            repeatType: "reverse",
-            ease: "easeInOut",
-            delay: Math.random() * 5
-          }}
-        />
-      ))}
-    </div>
+    />
   );
 };

-export default ParticleField; 
\ No newline at end of file
+export default React.memo(ParticleField); 
\ No newline at end of file
diff --git a/src/hooks/useParallaxMotion.js b/src/hooks/useParallaxMotion.js
index 41e38d7..13eb8fb 100644
--- a/src/hooks/useParallaxMotion.js
+++ b/src/hooks/useParallaxMotion.js
@@ -3,6 +3,8 @@ import { useBreakpoint } from './useBreakpoint.js';

 /**
  * Custom hook for creating parallax motion effects based on scroll position
+ * SSR-safe implementation with proper client-side detection
+ * 
  * @param {Object} options - Configuration options for the parallax effect
  * @param {number} options.speed - Speed of the parallax effect (default: 0.5)
  * @param {boolean} options.horizontal - Whether to apply parallax horizontally (default: false)
@@ -25,18 +27,28 @@ export function useParallaxMotion({
   const [style, setStyle] = useState({});
   const frameRef = useRef(null);
   const elementRef = useRef(null);
-  const lastScrollY = useRef(window.scrollY);
+  
+  // SSR detection
+  const isClient = typeof window !== 'undefined';
+  
+  // Safe reference to scroll position - only set on client
+  const lastScrollY = useRef(isClient ? window.scrollY : 0);

   // Get current breakpoint
   const breakpoint = useBreakpoint();

-  // Check if user prefers reduced motion
-  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
+  // Check if user prefers reduced motion - only on client
+  const prefersReducedMotion = isClient ? 
+    window.matchMedia('(prefers-reduced-motion: reduce)').matches : 
+    false;

   // Disable on mobile and for users who prefer reduced motion
   const isDisabled = disabled || prefersReducedMotion || breakpoint === 'mobile';

   useEffect(() => {
+    // SSR guard - only run on client
+    if (!isClient) return;
+    
     if (isDisabled) {
       setStyle({});
       return;
@@ -98,7 +110,7 @@ export function useParallaxMotion({
       window.removeEventListener('scroll', handleScroll);
       window.removeEventListener('resize', handleResize);
     };
-  }, [speed, horizontal, reverse, isDisabled, xRange, yRange, easing]);
+  }, [speed, horizontal, reverse, isDisabled, xRange, yRange, easing, isClient]);

   return {
     style,
diff --git a/src/pages/dev_v4_cosmic.jsx b/src/pages/dev_v4_cosmic.jsx
index 9517b87..bee312b 100644
--- a/src/pages/dev_v4_cosmic.jsx
+++ b/src/pages/dev_v4_cosmic.jsx
@@ -1,34 +1,11 @@
-import React from 'react';
+import React, { lazy, Suspense } from 'react';
 import { motion } from 'framer-motion';
+import LoadingScreen from '../components/ui/LoadingScreen.jsx';

-// Import all v4 components
-import SpaceCanvas from '../components/home/v4/SpaceCanvas';
-import NavBarCosmic from '../components/home/v4/NavBarCosmic';
-import HeroPortal from '../components/home/v4/HeroPortal';
-import AboutMission from '../components/home/v4/AboutMission';
-import ServicesFloatLayer from '../components/home/ServicesFloatLayer';
-import ProjectsSection from '../components/home/ProjectsSection';
-import ServicesOrbital from '../components/home/v4/ServicesOrbital';
-import ProjectsLogbook from '../components/home/v4/ProjectsLogbook';
-import CommunityHub from '../components/home/v4/CommunityHub';
-import AITestimonials from '../components/home/v4/AITestimonials';
-import ContactTerminal from '../components/home/v4/ContactTerminal';
-import CuriousBotEnhanced from '../components/home/v4/CuriousBotEnhanced';
-import FooterExperience from '../components/home/v4/FooterExperience';
-
-// Import SectionHeader component
+// Import UI components directly - static, minimal
 import SectionHeader from '../components/ui/SectionHeader.jsx';
-
-// Import SectionAnchor for section IDs and scroll margins
 import SectionAnchor from '../components/ui/SectionAnchor';
-
-// Import ParticleField for floating particles
-import ParticleField from '../components/ui/ParticleField';
-
-// Import CosmicHUD for scroll position and section tracking
 import CosmicHUD from '../components/ui/CosmicHUD';
-
-// Import ScrollToTop component
 import ScrollToTop from '../components/ScrollToTop';

 // Import scroll utilities
@@ -43,13 +20,52 @@ import {
   childVariants
 } from '../utils/animation';

+// Lazy load visual components
+const SpaceCanvas = lazy(() => import('../components/home/v4/SpaceCanvas'));
+const NavBarCosmic = lazy(() => import('../components/home/v4/NavBarCosmic'));
+const HeroPortal = lazy(() => import('../components/home/v4/HeroPortal'));
+
+// Lazy load non-critical components for better initial load performance
+const AboutMission = lazy(() => import('../components/home/v4/AboutMission'));
+const ServicesFloatLayer = lazy(() => import('../components/home/ServicesFloatLayer'));
:
 // Import scroll utilities
@@ -43,13 +20,52 @@ import {
   childVariants
 } from '../utils/animation';

+// Lazy load visual components
+const SpaceCanvas = lazy(() => import('../components/home/v4/SpaceCanvas'));
+const NavBarCosmic = lazy(() => import('../components/home/v4/NavBarCosmic'));
+const HeroPortal = lazy(() => import('../components/home/v4/HeroPortal'));
+
+// Lazy load non-critical components for better initial load performance
+const AboutMission = lazy(() => import('../components/home/v4/AboutMission'));
+const ServicesFloatLayer = lazy(() => import('../components/home/ServicesFloatLayer'));
+const ProjectsSection = lazy(() => import('../components/home/ProjectsSection'));
+const ServicesOrbital = lazy(() => import('../components/home/v4/ServicesOrbital'));
+const ProjectsLogbook = lazy(() => import('../components/home/v4/ProjectsLogbook'));
+const CommunityHub = lazy(() => import('../components/home/v4/CommunityHub'));
+const AITestimonials = lazy(() => import('../components/home/v4/AITestimonials'));
+const ContactTerminal = lazy(() => import('../components/home/v4/ContactTerminal'));
+const CuriousBotEnhanced = lazy(() => import('../components/home/v4/CuriousBotEnhanced'));
+const FooterExperience = lazy(() => import('../components/home/v4/FooterExperience'));
+
+// Lazy load ParticleField (heavy animation component)
+const ParticleField = lazy(() => import('../components/ui/ParticleField'));
+
 /**
  * Dev page for testing all v4 components
  * Includes navigation to easily access different components
  * Merged with components from main homepage
  * Enhanced with cosmic theme elements and scroll synchronization
+ * Optimized for performance with lazy loading and SSR-safe patterns
  */
-const DevV4CosmicPage = () => {
+export default function DevV4CosmicPage() {
+  // SSR guard for smooth scrolling
+  React.useEffect(() => {
+    if (typeof window === 'undefined') return;
+    registerSmoothScrolling();
+  }, []);
+  
+  return (
+    <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-screen bg-black text-purple-400">🌀 Loading: Root Component</div>}>
+      <CosmicLayout />
+    </Suspense>
+  );
+}
+
+/**
+ * Main cosmic layout component
+ * Separated for clean Suspense wrapping
+ */
+function CosmicLayout() {
   const { activeSection } = useScroll();

   // Section reveal hooks for each section
@@ -62,30 +78,56 @@ const DevV4CosmicPage = () => {
   const { ref: testimonialsRef, isVisible: testimonialsVisible } = useSectionReveal();
   const { ref: contactRef, isVisible: contactVisible } = useSectionReveal();

-  // Register smooth scrolling for all hash links
-  React.useEffect(() => {
-    registerSmoothScrolling();
-  }, []);
-  
   return (
     <div className="min-h-screen relative bg-black text-white overflow-hidden">
       {/* Enhanced SpaceCanvas with fade to darker color */}
-      <SpaceCanvas />
+      <Suspense fallback={<div className="fixed inset-0 bg-black text-purple-400 flex items-center justify-center text-xl">🌀 Loading: SpaceCanvas</div>}>
+        <SpaceCanvas />
+      </Suspense>

-      {/* Add ParticleField component for floating particles - Medium density for main areas */}
-      <ParticleField density="medium" zIndex={2} />
+      {/* Add ParticleField component for floating particles */}
+      <Suspense fallback={<div className="fixed inset-0 pointer-events-none text-purple-400 flex items-center 
justify-center text-xl">🌀 Loading: ParticleField</div>}>
+        <ParticleField density="medium" zIndex={2} />
+      </Suspense>

-      {/* Extended gradient overlay for smoother transition from stars to dark background */}
-      <div className="absolute inset-0 pointer-events-none z-[1]">
-        {/* Start transparent at the top, gradually fade to dark at bottom */}
-        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0d0d12]" style={{ top: '150vh', height: '100vh' }}></div>
+      {/* Unified cosmic gradient background system */}
+      <div className="fixed inset-0 pointer-events-none z-[1]">
+        {/* Top hero area - fully transparent to show stars */}
+        <div className="absolute w-full h-screen bg-transparent"></div>
+        
+        {/* First transition layer - subtle cosmic purple glow */}
+        <div className="absolute w-full h-[150vh] bg-gradient-to-b from-transparent via-purple-900/5 to-indigo-900/10" 
+             style={{ top: '80vh' }}></div>
+        
+        {/* Middle transition - deep space feel */}
+        <div className="absolute w-full h-[200vh] bg-gradient-to-b from-transparent via-indigo-950/20 to-[#0d0d12]/60" 
+             style={{ top: '150vh' }}></div>
+        
+        {/* Bottom sections - full cosmic dark */}
+        <div className="absolute w-full h-[300vh] bg-gradient-to-b from-[#0d0d12]/60 via-[#0a0a12]/80 to-[#080810]" 
+             style={{ top: '300vh' }}></div>
+        
+        {/* Cosmic accent gradients - add ethereal glow */}
: // Import scroll utilities
@@ -43,13 +20,52 @@ import {
   childVariants
 } from '../utils/animation';

+// Lazy load visual components
+const SpaceCanvas = lazy(() => import('../components/home/v4/SpaceCanvas'));
+const NavBarCosmic = lazy(() => import('../components/home/v4/NavBarCosmic'));
+const HeroPortal = lazy(() => import('../components/home/v4/HeroPortal'));
+
+// Lazy load non-critical components for better initial load performance
+const AboutMission = lazy(() => import('../components/home/v4/AboutMission'));
+const ServicesFloatLayer = lazy(() => import('../components/home/ServicesFloatLayer'));
+const ProjectsSection = lazy(() => import('../components/home/ProjectsSection'));
+const ServicesOrbital = lazy(() => import('../components/home/v4/ServicesOrbital'));
+const ProjectsLogbook = lazy(() => import('../components/home/v4/ProjectsLogbook'));
+const CommunityHub = lazy(() => import('../components/home/v4/CommunityHub'));
+const AITestimonials = lazy(() => import('../components/home/v4/AITestimonials'));
+const ContactTerminal = lazy(() => import('../components/home/v4/ContactTerminal'));
+const CuriousBotEnhanced = lazy(() => import('../components/home/v4/CuriousBotEnhanced'));
+const FooterExperience = lazy(() => import('../components/home/v4/FooterExperience'));
+
+// Lazy load ParticleField (heavy animation component)
+const ParticleField = lazy(() => import('../components/ui/ParticleField'));
+
 /**
  * Dev page for testing all v4 components
  * Includes navigation to easily access different components
  * Merged with components from main homepage
  * Enhanced with cosmic theme elements and scroll synchronization
+ * Optimized for performance with lazy loading and SSR-safe patterns
  */
-const DevV4CosmicPage = () => {
+export default function DevV4CosmicPage() {
+  // SSR guard for smooth scrolling
+  React.useEffect(() => {
+    if (typeof window === 'undefined') return;
+    registerSmoothScrolling();
+  }, []);
+  
+  return (
+    <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-screen bg-black text-purple-400">🌀 Loading: Root Component</div>}>
+      <CosmicLayout />
+    </Suspense>
+  );
+}
+
+/**
+ * Main cosmic layout component
+ * Separated for clean Suspense wrapping
+ */
+function CosmicLayout() {
   const { activeSection } = useScroll();

   // Section reveal hooks for each section
@@ -62,30 +78,56 @@ const DevV4CosmicPage = () => {
   const { ref: testimonialsRef, isVisible: testimonialsVisible } = useSectionReveal();
   const { ref: contactRef, isVisible: contactVisible } = useSectionReveal();

-  // Register smooth scrolling for all hash links
-  React.useEffect(() => {
-    registerSmoothScrolling();
-  }, []);
-  
   return (
     <div className="min-h-screen relative bg-black text-white overflow-hidden">
       {/* Enhanced SpaceCanvas with fade to darker color */}
-      <SpaceCanvas />
+      <Suspense fallback={<div className="fixed inset-0 bg-black text-purple-400 flex items-center justify-center text-xl">🌀 Loading: SpaceCanvas</div>}>
+        <SpaceCanvas />
+      </Suspense>

-      {/* Add ParticleField component for floating particles - Medium density for main areas */}
-      <ParticleField density="medium" zIndex={2} />
+      {/* Add ParticleField component for floating particles */}
+      <Suspense fallback={<div className="fixed inset-0 pointer-events-none text-purple-400 flex items-center 
justify-center text-xl">🌀 Loading: ParticleField</div>}>
+        <ParticleField density="medium" zIndex={2} />
+      </Suspense>

-      {/* Extended gradient overlay for smoother transition from stars to dark background */}
-      <div className="absolute inset-0 pointer-events-none z-[1]">
-        {/* Start transparent at the top, gradually fade to dark at bottom */}
-        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0d0d12]" style={{ top: '150vh', height: '100vh' }}></div>
+      {/* Unified cosmic gradient background system */}
+      <div className="fixed inset-0 pointer-events-none z-[1]">
+        {/* Top hero area - fully transparent to show stars */}
+        <div className="absolute w-full h-screen bg-transparent"></div>
+        
+        {/* First transition layer - subtle cosmic purple glow */}
+        <div className="absolute w-full h-[150vh] bg-gradient-to-b from-transparent via-purple-900/5 to-indigo-900/10" 
+             style={{ top: '80vh' }}></div>
+        
+        {/* Middle transition - deep space feel */}
+        <div className="absolute w-full h-[200vh] bg-gradient-to-b from-transparent via-indigo-950/20 to-[#0d0d12]/60" 
+             style={{ top: '150vh' }}></div>
+        
+        {/* Bottom sections - full cosmic dark */}
+        <div className="absolute w-full h-[300vh] bg-gradient-to-b from-[#0d0d12]/60 via-[#0a0a12]/80 to-[#080810]" 
+             style={{ top: '300vh' }}></div>
+        
+        {/* Cosmic accent gradients - add ethereal glow */}
: