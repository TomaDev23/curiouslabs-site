
**FINAL PLAN**

# 🛠️ TILE T2.6.8 Implementation Plan: Cosmic Awakening Full Scene Layout

## 🔍 Analysis and Confirmation

I've carefully analyzed both Claude plan files and the existing implementation, along with the LEGIT contract requirements. I understand this task requires implementing the remaining scenes and scroll director exactly as described in Claude's plans, without modifying any live routes or introducing new patterns.

### Core Understanding:
- We've already implemented the first two scenes (DormantScene and AwakeningScene)
- We need to add the remaining four scenes following Claude's exact implementation
- We must implement the scroll-based CosmicJourneyController with progress tracking
- All code should follow the structure and logic specified in Claude's plans
- This is isolated to the `/background-awakening` route
- No new dependencies or patterns should be introduced

## 📋 LEGIT Compliance Check

Per the LEGIT contract requirements, our implementation will ensure:

1. **✅ Name**: Components will follow the naming conventions already established
2. **✅ Location**: All components will be properly located in `src/components/journey/`
3. **✅ Props**: All components will accept and properly handle the specified props
4. **✅ Animation**: Will use standard techniques as outlined in the plan
5. **✅ Layout**: Components will follow the spacing and layout described in the plans
6. **✅ Fallback**: Components will render safely with default props
7. **✅ Mobile**: Implementation will be responsive across breakpoints

## 📑 Implementation Plan

### 1. Create Remaining Scene Components

#### A. CosmicRevealScene.jsx
```jsx
import React from 'react';
import RobotCharacter from '../visual/RobotCharacter';

export default function CosmicRevealScene({ progress = 0 }) {
  // Dynamic starfield properties based on progress
  const starOpacity = 0.6 + progress * 0.4;
  
  // Colors intensify with progress
  const colorIntensity = progress * 0.8;
  
  return (
    <section className="h-screen bg-black relative flex items-center justify-center">
      {/* Robot with full-power eye beam */}
      <RobotCharacter eyeOn={true} focusBeam={true} />
      
      {/* Nebula colors intensify */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-[10%] w-[80%] h-[60%] rounded-full blur-3xl"
          style={{ 
            background: `radial-gradient(circle, rgba(139, 92, 246, ${0.1 + colorIntensity * 0.3}) 0%, transparent 70%)`,
            transform: `scale(${1 + progress * 0.5})`
          }}
        />
        <div 
          className="absolute bottom-[20%] right-[5%] w-[60%] h-[50%] rounded-full blur-3xl"
          style={{ 
            background: `radial-gradient(circle, rgba(59, 130, 246, ${0.1 + colorIntensity * 0.2}) 0%, transparent 70%)`,
            transform: `scale(${1 + progress * 0.3})`
          }}
        />
      </div>
      
      {/* Starfield overlay with dynamic opacity */}
      <div 
        className="absolute inset-0 bg-[url('/images/stars.png')] bg-repeat opacity-0"
        style={{ opacity: starOpacity }}
      />
    </section>
  );
}
```

#### B. CosmicFlightScene.jsx
```jsx
import React from 'react';

export default function CosmicFlightScene({ progress = 0 }) {
  // Dynamic motion properties
  const flightProperties = {
    speed: 0.5 + progress * 2.5,
    streakLength: 10 + progress * 90,
    warpEffect: progress > 0.6
  };
  
  return (
    <section className="h-screen bg-[#090014] relative">
      {/* Star streaks effect - simplified for initial implementation */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: '2px',
              height: `${5 + progress * flightProperties.streakLength}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.7,
              transform: `rotate(${90 + (Math.random() * 20 - 10)}deg)`,
              transition: 'height 0.5s ease-out'
            }}
          />
        ))}
      </div>
      
      {/* Warp effect tunnel - only appears later in the scene */}
      {flightProperties.warpEffect && (
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ 
            opacity: Math.min(1, (progress - 0.6) * 2.5)
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-500/30 via-purple-500/20 to-transparent rounded-full scale-0 animate-pulse-slow" />
        </div>
      )}
      
      {/* Nebula colors blur and streak */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 blur-3xl"
          style={{ 
            background: `linear-gradient(135deg, 
              rgba(139, 92, 246, ${0.1 + progress * 0.2}) 0%, 
              rgba(59, 130, 246, ${0.1 + progress * 0.3}) 50%, 
              rgba(16, 185, 129, ${0.1 + progress * 0.2}) 100%)`,
            transform: `translateY(${progress * -20}%)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      </div>
    </section>
  );
}
```

#### C. SunApproachScene.jsx
```jsx
import React from 'react';

export default function SunApproachScene({ progress = 0 }) {
  // Sun properties
  const sunReveal = {
    size: 20 + progress * 200, // grows as we approach
    opacity: Math.min(1, progress * 2),
    brightness: 0.3 + progress * 0.7,
    flares: progress > 0.3
  };
  
  return (
    <section className="h-screen bg-[#0a0718] relative">
      {/* Sun emerging from bottom of screen */}
      <div 
        className="absolute bottom-0 left-1/2 rounded-full"
        style={{ 
          width: `${sunReveal.size}vh`,
          height: `${sunReveal.size}vh`,
          opacity: sunReveal.opacity,
          background: `radial-gradient(circle, rgba(252, 211, 77, 1) 0%, rgba(239, 68, 68, 0.8) 60%, rgba(190, 24, 93, 0.1) 100%)`,
          boxShadow: `0 0 ${30 + progress * 100}px ${15 + progress * 50}px rgba(252, 211, 77, ${0.3 + progress * 0.5})`,
          transform: `translate(-50%, ${100 - progress * 90}%)` // Rises up
        }}
      />
      
      {/* Sun flares - only appear late in the approach */}
      {sunReveal.flares && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Main energy flares */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const length = 30 + Math.random() * 20;
            
            return (
              <div 
                key={i}
                className="absolute bottom-0 left-1/2 origin-bottom blur-lg"
                style={{
                  width: '4px',
                  height: `${length + progress * 50}vh`,
                  background: 'linear-gradient(to top, rgba(252, 211, 77, 0.8) 0%, rgba(239, 68, 68, 0.4) 50%, transparent 100%)',
                  transform: `translate(-50%, 0) rotate(${angle}rad)`,
                  opacity: 0.4 + Math.random() * 0.6 * progress
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Scene warming - color overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `linear-gradient(to top, rgba(252, 211, 77, ${progress * 0.2}) 0%, rgba(239, 68, 68, ${progress * 0.1}) 50%, transparent 100%)`,
        }}
      />
    </section>
  );
}
```

#### D. SunLandingScene.jsx
```jsx
import React from 'react';

export default function SunLandingScene({ progress = 0 }) {
  return (
    <section className="h-screen bg-[#0a0718] relative">
      {/* Massive sun filling most of the screen */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(circle at bottom center, 
            rgba(252, 211, 77, 1) 0%, 
            rgba(239, 68, 68, 0.8) 30%, 
            rgba(190, 24, 93, 0.4) 65%, 
            rgba(88, 28, 135, 0.2) 85%, 
            rgba(30, 41, 59, 0) 100%)`,
        }}
      />
      
      {/* Solar flares and prominences */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large prominences */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 72) * (Math.PI / 180);
          const size = 30 + Math.random() * 40;
          const intensity = 0.3 + progress * 0.7;
          
          return (
            <div 
              key={i}
              className="absolute top-[90%] left-1/2 origin-bottom blur-lg"
              style={{
                width: `${size * intensity}vh`,
                height: `${size * 1.5 * intensity}vh`,
                background: 'radial-gradient(ellipse at bottom, rgba(252, 211, 77, 0.8) 0%, rgba(239, 68, 68, 0.6) 40%, transparent 80%)',
                transform: `translate(-50%, 0) rotate(${angle}rad)`,
                opacity: 0.6 + Math.random() * 0.4 * intensity,
              }}
            />
          );
        })}
      </div>
      
      {/* Text reveal - key message fades in */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: Math.pow(progress, 2) }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
            CuriousLabs
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-shadow-md">
            Illuminating the frontiers of AI development
          </p>
        </div>
      </div>
    </section>
  );
}
```

### 2. Update RobotCharacter Component to Support Focus Beam

```jsx
import React from 'react';

export default function RobotCharacter({ eyeOn = false, flicker = false, focusBeam = false }) {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {/* Using microscope emoji as placeholder for robot */}
      <div className="text-9xl">🔬</div>
      
      {/* Eye glow */}
      <div
        className={`absolute top-[35%] left-[52%] w-[20px] h-[20px] rounded-full transition-opacity duration-300
          ${eyeOn ? 'bg-cyan-400' : 'bg-transparent'} 
          ${flicker ? 'animate-pulse' : ''}`}
      />
      
      {/* Focus beam - only appears when activated */}
      {focusBeam && (
        <div className="absolute top-[35%] left-[52%] w-1 bg-sky-400/60 h-[100vh] transform rotate-2 origin-top animate-pulse-slow" />
      )}
    </div>
  );
}
```

### 3. Create Enhanced CosmicJourneyController with Scroll Tracking

```jsx
import React, { useState, useEffect } from 'react';
import DormantScene from './scenes/DormantScene';
import AwakeningScene from './scenes/AwakeningScene';
import CosmicRevealScene from './scenes/CosmicRevealScene';
import CosmicFlightScene from './scenes/CosmicFlightScene';
import SunApproachScene from './scenes/SunApproachScene';
import SunLandingScene from './scenes/SunLandingScene';

export default function CosmicJourneyController() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState('dormant');
  const [sceneProgress, setSceneProgress] = useState(0);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
      
      // Determine current scene based on scroll ranges
      if (progress < 0.1) {
        setCurrentScene('dormant');
        setSceneProgress(progress / 0.1);
      } else if (progress < 0.3) {
        setCurrentScene('awakening');
        setSceneProgress((progress - 0.1) / 0.2);
      } else if (progress < 0.5) {
        setCurrentScene('cosmicReveal');
        setSceneProgress((progress - 0.3) / 0.2);
      } else if (progress < 0.7) {
        setCurrentScene('cosmicFlight');
        setSceneProgress((progress - 0.5) / 0.2);
      } else if (progress < 0.85) {
        setCurrentScene('sunApproach');
        setSceneProgress((progress - 0.7) / 0.15);
      } else {
        setCurrentScene('sunLanding');
        setSceneProgress((progress - 0.85) / 0.15);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Debug overlay for development
  const DebugOverlay = () => (
    <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
      <div className="mb-1">Scroll: {Math.round(scrollProgress * 100)}%</div>
      <div className="mb-1">Scene: <span className="text-green-400">{currentScene}</span></div>
      <div className="mb-1">Progress: {Math.round(sceneProgress * 100)}%</div>
    </div>
  );
  
  return (
    <div className="w-full text-white">
      {/* Create scroll container with appropriate height */}
      <div className="relative min-h-[600vh]">
        {/* Fixed container for scenes */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* One div for each scene, opacity controlled by transitions */}
          <div style={{ opacity: currentScene === 'dormant' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <DormantScene />
          </div>
          
          <div style={{ opacity: currentScene === 'awakening' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <AwakeningScene progress={sceneProgress} />
          </div>
          
          <div style={{ opacity: currentScene === 'cosmicReveal' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <CosmicRevealScene progress={sceneProgress} />
          </div>
          
          <div style={{ opacity: currentScene === 'cosmicFlight' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <CosmicFlightScene progress={sceneProgress} />
          </div>
          
          <div style={{ opacity: currentScene === 'sunApproach' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <SunApproachScene progress={sceneProgress} />
          </div>
          
          <div style={{ opacity: currentScene === 'sunLanding' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <SunLandingScene progress={sceneProgress} />
          </div>
        </div>
        
        {/* Debug overlay */}
        <DebugOverlay />
        
        {/* Content sections to create scroll space */}
        <div className="pointer-events-none">
          <section className="h-screen"></section>
          <section className="h-screen"></section>
          <section className="h-screen"></section>
          <section className="h-screen"></section>
          <section className="h-screen"></section>
          <section className="h-screen"></section>
        </div>
      </div>
    </div>
  );
}
```

### 4. Update the background_awakening.jsx to Support Animation

```jsx
import React from 'react';
import CosmicJourneyController from '../components/journey/CosmicJourneyController';

export default function BackgroundAwakeningPage() {
  // Page metadata
  const metadata = {
    id: 'background_awakening',
    title: 'Cosmic Journey - Scroll Awakening',
    description: 'A scroll-driven cinematic experience',
  };

  return <CosmicJourneyController />;
}

// Attach metadata to the component
BackgroundAwakeningPage.metadata = {
  id: 'background_awakening',
  title: 'Cosmic Journey - Scroll Awakening',
  description: 'A scroll-driven cinematic experience',
};
```

## 📋 Animation Requirements

To support the animations specified in Claude's plan, I'll need to add a pulse-slow animation to tailwind.config.js:

```js
// Modify tailwind.config.js to add the required animations
module.exports = {
  // ...existing config
  theme: {
    extend: {
      // ...existing extensions
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  }
}
```

## 🧪 Implementation Process

1. Start by updating the RobotCharacter component to add focusBeam support
2. Create all four missing scene components in `src/components/journey/scenes/`
3. Implement the enhanced CosmicJourneyController
4. Verify the animation styles in tailwind.config.js
5. Test the complete implementation

## ⚠️ Potential Issues & Mitigations

1. **Missing Assets**: For any missing image assets, we'll use CSS gradients as placeholders
2. **Performance**: The animations might be resource-intensive, so we'll keep them lightweight initially
3. **Transitions**: We'll ensure smooth transitions between scenes with proper opacity handling
4. **Mobile Responsiveness**: Ensure all components scale properly on different devices

## 🎯 Exit Criteria

- Route `/background-awakening` works with full scroll implementation
- All six scenes are correctly rendered in a scrollable layout
- Transitions between scenes work based on scroll position
- Robot character displays all states (off, flickering, beam)
- Visual effects (starfield, sun, etc.) appear and transition correctly
- Debug overlay shows current scene and progress information
- Implementation adheres to LEGIT principles

I'm ready to proceed with implementing TILE T2.6.



===========================================================================================================================

*PLANNING ONLY SKIP READING*

# 🛠️ TILE T2.6.8 Implementation Plan: Cosmic Awakening Full Scene Layout

## 🔍 Analysis and Confirmation

I've carefully analyzed both Claude plan files and the existing implementation, along with the LEGIT contract requirements. I understand this task requires implementing the remaining scenes and scroll director exactly as described in Claude's plans, without modifying any live routes or introducing new patterns.

### Core Understanding:
- We've already implemented the first two scenes (DormantScene and AwakeningScene)
- We need to add the remaining four scenes following Claude's exact implementation
- We must implement the scroll-based CosmicJourneyController with progress tracking
- All code should follow the structure and logic specified in Claude's plans
- This is isolated to the `/background-awakening` route
- No new dependencies or patterns should be introduced

## 📋 LEGIT Compliance Check

Per the LEGIT contract requirements, our implementation will ensure:

1. **✅ Name**: Components will follow the naming conventions already established
2. **✅ Location**: All components will be properly located in `src/components/journey/`
3. **✅ Props**: All components will accept and properly handle the specified props
4. **✅ Animation**: Will use standard techniques as outlined in the plan
5. **✅ Layout**: Components will follow the spacing and layout described in the plans
6. **✅ Fallback**: Components will render safely with default props
7. **✅ Mobile**: Implementation will be responsive across breakpoints

## 📑 Implementation Plan

### 1. Create Remaining Scene Components

#### A. CosmicRevealScene.jsx
```jsx
import React from 'react';
import RobotCharacter from '../visual/RobotCharacter';

export default function CosmicRevealScene({ progress = 0 }) {
  // Dynamic starfield properties based on progress
  const starOpacity = 0.6 + progress * 0.4;
  
  // Colors intensify with progress
  const colorIntensity = progress * 0.8;
  
  return (
    <section className="h-screen bg-black relative flex items-center justify-center">
      {/* Robot with full-power eye beam */}
      <RobotCharacter eyeOn={true} focusBeam={true} />
      
      {/* Nebula colors intensify */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-[10%] w-[80%] h-[60%] rounded-full blur-3xl"
          style={{ 
            background: `radial-gradient(circle, rgba(139, 92, 246, ${0.1 + colorIntensity * 0.3}) 0%, transparent 70%)`,
            transform: `scale(${1 + progress * 0.5})`
          }}
        />
        <div 
          className="absolute bottom-[20%] right-[5%] w-[60%] h-[50%] rounded-full blur-3xl"
          style={{ 
            background: `radial-gradient(circle, rgba(59, 130, 246, ${0.1 + colorIntensity * 0.2}) 0%, transparent 70%)`,
            transform: `scale(${1 + progress * 0.3})`
          }}
        />
      </div>
      
      {/* Starfield overlay with dynamic opacity */}
      <div 
        className="absolute inset-0 bg-[url('/images/stars.png')] bg-repeat opacity-0"
        style={{ opacity: starOpacity }}
      />
    </section>
  );
}
```

#### B. CosmicFlightScene.jsx
```jsx
import React from 'react';

export default function CosmicFlightScene({ progress = 0 }) {
  // Dynamic motion properties
  const flightProperties = {
    speed: 0.5 + progress * 2.5,
    streakLength: 10 + progress * 90,
    warpEffect: progress > 0.6
  };
  
  return (
    <section className="h-screen bg-[#090014] relative">
      {/* Star streaks effect - simplified for initial implementation */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: '2px',
              height: `${5 + progress * flightProperties.streakLength}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.7,
              transform: `rotate(${90 + (Math.random() * 20 - 10)}deg)`,
              transition: 'height 0.5s ease-out'
            }}
          />
        ))}
      </div>
      
      {/* Warp effect tunnel - only appears later in the scene */}
      {flightProperties.warpEffect && (
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ 
            opacity: Math.min(1, (progress - 0.6) * 2.5)
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-500/30 via-purple-500/20 to-transparent rounded-full scale-0 animate-pulse-slow" />
        </div>
      )}
      
      {/* Nebula colors blur and streak */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 blur-3xl"
          style={{ 
            background: `linear-gradient(135deg, 
              rgba(139, 92, 246, ${0.1 + progress * 0.2}) 0%, 
              rgba(59, 130, 246, ${0.1 + progress * 0.3}) 50%, 
              rgba(16, 185, 129, ${0.1 + progress * 0.2}) 100%)`,
            transform: `translateY(${progress * -20}%)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      </div>
    </section>
  );
}
```

#### C. SunApproachScene.jsx
```jsx
import React from 'react';

export default function SunApproachScene({ progress = 0 }) {
  // Sun properties
  const sunReveal = {
    size: 20 + progress * 200, // grows as we approach
    opacity: Math.min(1, progress * 2),
    brightness: 0.3 + progress * 0.7,
    flares: progress > 0.3
  };
  
  return (
    <section className="h-screen bg-[#0a0718] relative">
      {/* Sun emerging from bottom of screen */}
      <div 
        className="absolute bottom-0 left-1/2 rounded-full"
        style={{ 
          width: `${sunReveal.size}vh`,
          height: `${sunReveal.size}vh`,
          opacity: sunReveal.opacity,
          background: `radial-gradient(circle, rgba(252, 211, 77, 1) 0%, rgba(239, 68, 68, 0.8) 60%, rgba(190, 24, 93, 0.1) 100%)`,
          boxShadow: `0 0 ${30 + progress * 100}px ${15 + progress * 50}px rgba(252, 211, 77, ${0.3 + progress * 0.5})`,
          transform: `translate(-50%, ${100 - progress * 90}%)` // Rises up
        }}
      />
      
      {/* Sun flares - only appear late in the approach */}
      {sunReveal.flares && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Main energy flares */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const length = 30 + Math.random() * 20;
            
            return (
              <div 
                key={i}
                className="absolute bottom-0 left-1/2 origin-bottom blur-lg"
                style={{
                  width: '4px',
                  height: `${length + progress * 50}vh`,
                  background: 'linear-gradient(to top, rgba(252, 211, 77, 0.8) 0%, rgba(239, 68, 68, 0.4) 50%, transparent 100%)',
                  transform: `translate(-50%, 0) rotate(${angle}rad)`,
                  opacity: 0.4 + Math.random() * 0.6 * progress
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Scene warming - color overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `linear-gradient(to top, rgba(252, 211, 77, ${progress * 0.2}) 0%, rgba(239, 68, 68, ${progress * 0.1}) 50%, transparent 100%)`,
        }}
      />
    </section>
  );
}
```

#### D. SunLandingScene.jsx
```jsx
import React from 'react';

export default function SunLandingScene({ progress = 0 }) {
  return (
    <section className="h-screen bg-[#0a0718] relative">
      {/* Massive sun filling most of the screen */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(circle at bottom center, 
            rgba(252, 211, 77, 1) 0%, 
            rgba(239, 68, 68, 0.8) 30%, 
            rgba(190, 24, 93, 0.4) 65%, 
            rgba(88, 28, 135, 0.2) 85%, 
            rgba(30, 41, 59, 0) 100%)`,
        }}
      />
      
      {/* Solar flares and prominences */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large prominences */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 72) * (Math.PI / 180);
          const size = 30 + Math.random() * 40;
          const intensity = 0.3 + progress * 0.7;
          
          return (
            <div 
              key={i}
              className="absolute top-[90%] left-1/2 origin-bottom blur-lg"
              style={{
                width: `${size * intensity}vh`,
                height: `${size * 1.5 * intensity}vh`,
                background: 'radial-gradient(ellipse at bottom, rgba(252, 211, 77, 0.8) 0%, rgba(239, 68, 68, 0.6) 40%, transparent 80%)',
                transform: `translate(-50%, 0) rotate(${angle}rad)`,
                opacity: 0.6 + Math.random() * 0.4 * intensity,
              }}
            />
          );
        })}
      </div>
      
      {/* Text reveal - key message fades in */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: Math.pow(progress, 2) }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
            CuriousLabs
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-shadow-md">
            Illuminating the frontiers of AI development
          </p>
        </div>
      </div>
    </section>
  );
}
```

### 2. Update RobotCharacter Component to Support Focus Beam

```jsx
import React from 'react';

export default function RobotCharacter({ eyeOn = false, flicker = false, focusBeam = false }) {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {/* Using microscope emoji as placeholder for robot */}
      <div className="text-9xl">🔬</div>
      
      {/* Eye glow */}
      <div
        className={`absolute top-[35%] left-[52%] w-[20px] h-[20px] rounded-full transition-opacity duration-300
          ${eyeOn ? 'bg-cyan-400' : 'bg-transparent'} 
          ${flicker ? 'animate-pulse' : ''}`}
      />
      
      {/* Focus beam - only appears when activated */}
      {focusBeam && (
        <div className="absolute top-[35%] left-[52%] w-1 bg-sky-400/60 h-[100vh] transform rotate-2 origin-top animate-pulse-slow" />
      )}
    </div>
  );
}
```

### 3. Create Enhanced CosmicJourneyController with Scroll Tracking

```jsx
import React, { useState, useEffect } from 'react';
import DormantScene from './scenes/DormantScene';
import AwakeningScene from './scenes/AwakeningScene';
import CosmicRevealScene from './scenes/CosmicRevealScene';
import CosmicFlightScene from './scenes/CosmicFlightScene';
import SunApproachScene from './scenes/SunApproachScene';
import SunLandingScene from './scenes/SunLandingScene';

export default function CosmicJourneyController() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState('dormant');
  const [sceneProgress, setSceneProgress] = useState(0);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
      
      // Determine current scene based on scroll ranges
      if (progress < 0.1) {
        setCurrentScene('dormant');
        setSceneProgress(progress / 0.1);
      } else if (progress < 0.3) {
        setCurrentScene('awakening');
        setSceneProgress((progress - 0.1) / 0.2);
      } else if (progress < 0.5) {
        setCurrentScene('cosmicReveal');
        setSceneProgress((progress - 0.3) / 0.2);
      } else if (progress < 0.7) {
        setCurrentScene('cosmicFlight');
        setSceneProgress((progress - 0.5) / 0.2);
      } else if (progress < 0.85) {
        setCurrentScene('sunApproach');
        setSceneProgress((progress - 0.7) / 0.15);
      } else {
        setCurrentScene('sunLanding');
        setSceneProgress((progress - 0.85) / 0.15);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Debug overlay for development
  const DebugOverlay = () => (
    <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
      <div className="mb-1">Scroll: {Math.round(scrollProgress * 100)}%</div>
      <div className="mb-1">Scene: <span className="text-green-400">{currentScene}</span></div>
      <div className="mb-1">Progress: {Math.round(sceneProgress * 100)}%</div>
    </div>
  );
  
  return (
    <div className="w-full text-white">
      {/* Create scroll container with appropriate height */}
      <div className="relative min-h-[600vh]">
        {/* Fixed container for scenes */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* One div for each scene, opacity controlled by transitions */}
          <div style={{ opacity: currentScene === 'dormant' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <DormantScene />
          </div>
          
          <div style={{ opacity: currentScene === 'awakening' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <AwakeningScene progress={sceneProgress} />
          </div>
          
          <div style={{ opacity: currentScene === 'cosmicReveal' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <CosmicRevealScene progress={sceneProgress} />
          </div>
          
          <div style={{ opacity: currentScene === 'cosmicFlight' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <CosmicFlightScene progress={sceneProgress} />
          </div>
          
          <div style={{ opacity: currentScene === 'sunApproach' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <SunApproachScene progress={sceneProgress} />
          </div>
          
          <div style={{ opacity: currentScene === 'sunLanding' ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            <SunLandingScene progress={sceneProgress} />
          </div>
        </div>
        
        {/* Debug overlay */}
        <DebugOverlay />
        
        {/* Content sections to create scroll space */}
        <div className="pointer-events-none">
          <section className="h-screen"></section>
          <section className="h-screen"></section>
          <section className="h-screen"></section>
          <section className="h-screen"></section>
          <section className="h-screen"></section>
          <section className="h-screen"></section>
        </div>
      </div>
    </div>
  );
}
```

### 4. Update the background_awakening.jsx to Support Animation

```jsx
import React from 'react';
import CosmicJourneyController from '../components/journey/CosmicJourneyController';

export default function BackgroundAwakeningPage() {
  // Page metadata
  const metadata = {
    id: 'background_awakening',
    title: 'Cosmic Journey - Scroll Awakening',
    description: 'A scroll-driven cinematic experience',
  };

  return <CosmicJourneyController />;
}

// Attach metadata to the component
BackgroundAwakeningPage.metadata = {
  id: 'background_awakening',
  title: 'Cosmic Journey - Scroll Awakening',
  description: 'A scroll-driven cinematic experience',
};
```

## 📋 Animation Requirements

To support the animations specified in Claude's plan, I'll need to add a pulse-slow animation to tailwind.config.js:

```js
// Modify tailwind.config.js to add the required animations
module.exports = {
  // ...existing config
  theme: {
    extend: {
      // ...existing extensions
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  }
}
```

## 🧪 Implementation Process

1. Start by updating the RobotCharacter component to add focusBeam support
2. Create all four missing scene components in `src/components/journey/scenes/`
3. Implement the enhanced CosmicJourneyController
4. Verify the animation styles in tailwind.config.js
5. Test the complete implementation

## ⚠️ Potential Issues & Mitigations

1. **Missing Assets**: For any missing image assets, we'll use CSS gradients as placeholders
2. **Performance**: The animations might be resource-intensive, so we'll keep them lightweight initially
3. **Transitions**: We'll ensure smooth transitions between scenes with proper opacity handling
4. **Mobile Responsiveness**: Ensure all components scale properly on different devices

## 🎯 Exit Criteria

- Route `/background-awakening` works with full scroll implementation
- All six scenes are correctly rendered in a scrollable layout
- Transitions between scenes work based on scroll position
- Robot character displays all states (off, flickering, beam)
- Visual effects (starfield, sun, etc.) appear and transition correctly
- Debug overlay shows current scene and progress information
- Implementation adheres to LEGIT principles

I'm ready to proceed with implementing TILE T2.6.
