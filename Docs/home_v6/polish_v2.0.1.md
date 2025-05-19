# CuriousLabs V6 Implementation - Code Snippets

Here are code snippets for each enhancement area to help you implement them in Cursor:

## 1. Animation & Interaction Layer

### Hero Portal Entrance Animations
```jsx
// In HeroPortal.jsx
import React, { useEffect, useRef } from 'react';

const HeroPortal = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const sphereRef = useRef(null);
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      // Title animation
      if (titleRef.current) {
        titleRef.current.style.opacity = '0';
        titleRef.current.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          titleRef.current.style.transition = 'opacity 0.8s ease-out, transform 1s ease-out';
          titleRef.current.style.opacity = '1';
          titleRef.current.style.transform = 'translateY(0)';
        }, 300);
      }
      
      // Subtitle animation with delay
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '0';
        subtitleRef.current.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          subtitleRef.current.style.transition = 'opacity 0.8s ease-out, transform 1s ease-out';
          subtitleRef.current.style.opacity = '1';
          subtitleRef.current.style.transform = 'translateY(0)';
        }, 800);
      }
    }
  }, []);
  
  return (
    <section id="hero" className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <h1 ref={titleRef} className="font-serif text-5xl lg:text-7xl">
          Curious<span className="text-lime-400">Labs</span>
        </h1>
        <p ref={subtitleRef} className="text-xl lg:text-2xl mt-4">
          Transforming development through AI innovation and community collaboration
        </p>
      </div>
      {/* Rest of the component */}
    </section>
  );
};
```

### Floating Cosmic Sphere Animation
```jsx
// Add this CSS class to your styles or include it inline
const floatingAnimation = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
.floating {
  animation: float 6s ease-in-out infinite;
}
`;

// In your component JSX:
<div 
  ref={sphereRef} 
  className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 floating"
>
  {/* Sphere content */}
</div>

// Add style tag with keyframes
<style jsx>{floatingAnimation}</style>
```

## 2. Responsive Behavior Enhancement

### Improved Card Stacking for Mobile
```jsx
// In ServicesOrbital.jsx
const ServicesOrbital = () => {
  const { isMobile, isTablet } = useBreakpoint();
  
  return (
    <section id="services">
      <div className="flex flex-col md:flex-row">
        {/* Left side content */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          {/* Content here */}
        </div>
        
        {/* Service Cards - Mobile Optimized */}
        <div className="w-full md:w-1/2 relative">
          {services.map((service, index) => {
            // Calculate different offsets for mobile vs desktop
            const offset = isMobile 
              ? Math.abs(activeService - index) * 10 
              : Math.abs(activeService - index) * 20;
              
            const isActive = activeService === index;
            const isAfterActive = index > activeService;
            
            // Apply different transform for mobile
            const transform = isMobile
              ? `translateY(${isActive ? 0 : isAfterActive ? offset : -offset}px) scale(${isActive ? 1 : 0.95 - (Math.abs(activeService - index) * 0.02)})`
              : `translateY(${isActive ? 0 : isAfterActive ? offset : -offset}px) scale(${isActive ? 1 : 0.95})`;
            
            return (
              <div
                key={service.id}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform,
                  opacity: isActive ? 1 : 1 - Math.abs(activeService - index) * 0.2,
                  zIndex: isActive ? 10 : 10 - Math.abs(activeService - index)
                }}
              >
                {/* Card content */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
```

## 3. Visual Polish

### Starfield Background
```jsx
// In LayoutWrapper.jsx - Add starfield background
const StarfieldBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Static stars layer */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(1px 1px at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 0), radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.2) 1px, transparent 0), radial-gradient(1px 1px at 75% 75%, rgba(255, 255, 255, 0.2) 1px, transparent 0), radial-gradient(2px 2px at 20% 80%, rgba(255, 255, 255, 0.3) 1px, transparent 0)',
        backgroundSize: '100px 100px, 120px 120px, 70px 70px, 150px 150px'
      }} />
      
      {/* Subtle nebula layer */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.3) 0%, rgba(0, 0, 0, 0) 50%)',
        backgroundSize: '100% 100%'
      }} />
    </div>
  );
};

// Use in LayoutWrapper
return (
  <div className="min-h-screen bg-black text-white overflow-hidden">
    <StarfieldBackground />
    {/* Rest of your layout */}
  </div>
);
```

### Glowing Interactive Elements
```jsx
// CSS for glowing effect
const glowStyles = `
.glow-on-hover {
  position: relative;
  z-index: 1;
}

.glow-on-hover::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: inherit;
  background: linear-gradient(90deg, #4ade80, #22d3ee);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glow-on-hover:hover::after {
  opacity: 0.3;
  filter: blur(8px);
}
`;

// Apply to buttons
<button className="bg-lime-400 text-black px-4 py-2 rounded-full glow-on-hover">
  Explore Services
</button>

// Don't forget to include style tag with the CSS
<style jsx>{glowStyles}</style>
```

## 4. Service Selection Interaction

### Smooth Service Card Transitions
```jsx
// In ServicesOrbital.jsx
const [activeService, setActiveService] = useState(0);
const [transitioning, setTransitioning] = useState(false);

const handleServiceChange = (index) => {
  if (transitioning || index === activeService) return;
  
  setTransitioning(true);
  
  // First, start exit animation
  const cards = document.querySelectorAll('.service-card');
  cards[activeService].classList.add('service-exit');
  
  // After exit, change active and trigger entrance
  setTimeout(() => {
    setActiveService(index);
    setTimeout(() => {
      cards[index].classList.add('service-enter');
      setTimeout(() => {
        setTransitioning(false);
        cards[index].classList.remove('service-enter');
      }, 500);
    }, 50);
  }, 300);
};

// CSS for transitions
const cardTransitions = `
.service-card {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease;
}
.service-exit {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
.service-enter {
  animation: cardEnter 0.5s forwards cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes cardEnter {
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
`;
```

## 5. Process Section Enhancements

### Scroll-Triggered Animations
```jsx
// In ProcessCards.jsx
import { useInView } from 'react-intersection-observer';

const ProcessStep = ({ step, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
        step.color === 'lime' ? 'border-lime-400' : 
        step.color === 'yellow' ? 'border-yellow-400' : 
        step.color === 'blue' ? 'border-blue-400' : 'border-purple-400'
      }`}>
        <span className="font-serif text-xl">{step.number}</span>
      </div>
      <h3 className="text-xl mt-4">{step.title}</h3>
      <p className="text-gray-300 mt-2">{step.description}</p>
    </div>
  );
};
```

### Interactive Tooltips
```jsx
// In ProcessCards.jsx
const [activeTooltip, setActiveTooltip] = useState(null);

// Inside your JSX for each process step
<div 
  className="relative" 
  onMouseEnter={() => setActiveTooltip(step.id)}
  onMouseLeave={() => setActiveTooltip(null)}
>
  {/* Process step content */}
  
  {/* Tooltip */}
  {activeTooltip === step.id && (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-black bg-opacity-90 border border-gray-700 rounded text-sm w-48 z-10">
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-black border-t border-l border-gray-700"></div>
      <p>{step.tooltip}</p>
    </div>
  )}
</div>
```

## 6. Contact Form Functionality

### Form Validation
```jsx
// In ContactTerminal.jsx
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Invalid email format';
  }
  
  if (!formData.message.trim()) {
    newErrors.message = 'Message is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  setIsSubmitting(true);
  
  // Submit logic...
};

// In your input fields:
<div>
  <label htmlFor="name" className="block text-sm text-gray-400 mb-1">$ name:</label>
  <input
    type="text"
    id="name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    className={`w-full bg-black bg-opacity-50 border ${
      errors.name ? 'border-red-500' : 'border-gray-700'
    } rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400`}
  />
  {errors.name && (
    <p className="text-red-500 text-xs mt-1">Error: {errors.name}</p>
  )}
</div>
```

### Terminal Typing Effect
```jsx
// In ContactTerminal.jsx - Typing effect for terminal
const TerminalText = ({ text, delay = 0, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let isMounted = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If reduced motion is preferred, show the full text immediately
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }
    
    // Otherwise, animate character by character
    let i = 0;
    const timer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < text.length && isMounted) {
          setDisplayText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
      
      return () => clearInterval(typingInterval);
    }, delay);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [text, delay, speed]);
  
  return (
    <span>
      {displayText}
      {displayText.length < text.length && (
        <span className="animate-pulse">▋</span>
      )}
    </span>
  );
};

// Usage
<div className="font-mono text-lime-400">
  <TerminalText text="$ connecting_to_server..." delay={500} />
  <br />
  <TerminalText text="$ establishing_link..." delay={1500} />
  <br />
  <TerminalText text="$ ready_for_transmission" delay={2500} />
</div>
```

## 7. Background Enhancements

### Parallax Starfield Effect
```jsx
// In a new component: ParallaxStarfield.jsx
import React, { useEffect, useRef } from 'react';

const ParallaxStarfield = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
    
    // Initialize stars
    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 2,
          size: Math.random() * 2,
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get scroll position for parallax effect
      const scrollY = window.scrollY;
      
      // Draw stars with parallax effect
      stars.forEach(star => {
        const parallaxOffset = scrollY * star.z * 0.1;
        
        const y = (star.y + parallaxOffset) % canvas.height;
        
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Setup
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default ParallaxStarfield;
```

## 8. Easter Eggs & Special Features

### Hidden Dev HUD Toggle
```jsx
// In a new component: DevHUDEasterEgg.jsx
import { useState, useEffect } from 'react';

const DevHUDEasterEgg = () => {
  const [konami, setKonami] = useState([]);
  const [hudVisible, setHudVisible] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Add the key to the sequence
      const updatedKonami = [...konami, e.key];
      
      // Keep only the last 10 keys
      if (updatedKonami.length > 10) {
        updatedKonami.shift();
      }
      
      setKonami(updatedKonami);
      
      // Check if the sequence matches the Konami code
      if (JSON.stringify(updatedKonami) === JSON.stringify(konamiCode)) {
        setHudVisible(true);
        setKonami([]); // Reset after successful activation
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);
  
  const closeHUD = () => setHudVisible(false);
  
  if (!hudVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="max-w-4xl w-full bg-gray-900 border border-lime-500 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lime-400 text-2xl font-mono">DEV HUD ACTIVATED</h2>
          <button onClick={closeHUD} className="text-gray-400 hover:text-white">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* HUD panels go here */}
          <div className="bg-black p-4 rounded border border-gray-700">
            <h3 className="text-lime-400 text-sm font-mono mb-2">PERFORMANCE METRICS</h3>
            <div className="text-white text-sm">FPS: 60</div>
            <div className="text-white text-sm">Memory: 128MB</div>
            <div className="text-white text-sm">Render Time: 16ms</div>
          </div>
          
          <div className="bg-black p-4 rounded border border-gray-700">
            <h3 className="text-lime-400 text-sm font-mono mb-2">COMPONENT TREE</h3>
            <pre className="text-xs text-white overflow-auto max-h-32">
              LayoutWrapper
                ┣ NavBarCosmic
                ┣ HeroPortal
                ┣ ServicesOrbital
                ┣ ProcessCards
                ┗ ContactTerminal
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevHUDEasterEgg;
```

### Buzzing Satellites
```jsx
// In a new component: BuzzingSatellite.jsx
import { useState, useEffect, useRef } from 'react';

const BuzzingSatellite = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const satelliteRef = useRef(null);
  const isMoving = useRef(false);
  
  useEffect(() => {
    // Show satellite after a delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);
    
    // Track mouse position
    const handleMouseMove = (e) => {
      if (!isMoving.current) {
        isMoving.current = true;
        setTimeout(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          isMoving.current = false;
        }, 100); // Throttle updates
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  if (!visible) return null;
  
  // Calculate position with lag/follow effect
  const satelliteStyle = {
    position: 'fixed',
    left: mousePos.x + 30,
    top: mousePos.y - 30,
    transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
    pointerEvents: 'none',
    zIndex: 50
  };
  
  return (
    <div ref={satelliteRef} style={satelliteStyle}>
      <div className="relative">
        {/* Satellite dot */}
        <div className="w-4 h-4 rounded-full bg-lime-400 animate-pulse"></div>
        
        {/* Connection line */}
        <div 
          className="absolute top-1/2 right-full w-8 h-px bg-lime-400 opacity-50"
          style={{ transform: 'translateY(-50%)' }}
        ></div>
      </div>
    </div>
  );
};

export default BuzzingSatellite;
```

These code snippets should give you a great starting point for implementing each enhancement. You can adapt them to your specific needs and gradually build up the complexity of your CuriousLabs site.