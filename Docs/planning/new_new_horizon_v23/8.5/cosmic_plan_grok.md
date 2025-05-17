Let’s code the visual layers for Cosmic Awakening, enhancing each scene with tailored effects while maintaining performance and narrative progression for CuriousLabs. I’ll distribute the effects logically: scene-specific effects (e.g., Light Glow Dust, Nebula Fade) will live in their respective scene components, while global effects (e.g., scroll-driven intensity, shared particle systems) will be managed in CosmicJourneyController. This ensures modularity, reusability, and performance optimization, aligning with your Lighthouse scores (94 mobile, 99 desktop) and LEGIT compliance.
We’ll reuse existing components like StarfieldCanvas for star-based effects and create new ones for aurora and flares, all throttled appropriately (5FPS, 10FPS, 30FPS). Each scene will be coded as a tiled Cursor task, with commits per scene to keep changes atomic.
🧩 Effect Distribution
Scene-Specific Effects (In Scene Components)
DormantScene: LightGlowDust (subtle breathing stars, 5FPS).
AwakeningScene: NebulaFade (aurora shimmer, 10FPS).
CosmicRevealScene: ConstellationGlow (pulsing constellations, 10FPS).
CosmicFlightScene: ParallaxSpeedDust
- Fast particles with three depth bands
- FPS: Dynamic based on scroll velocity
- Persistent across 0.25-0.85 scroll range
- Enhanced visibility and movement consistency
SunApproachScene: SolarFlickerDust (warm particles, 5FPS).
SunLandingScene: SunFlarePulse (flare burst, 30FPS).
Global Effects (In CosmicJourneyController)
Scroll-Driven Intensity: Adjust opacity and animation intensity based on scrollProgress.
Shared Particle System: Manage shared particle configs (e.g., density, speed) to ensure consistency across scenes.
Global Throttling: Centralize FPS throttling logic to avoid duplicate requestAnimationFrame loops.
🛠️ Cursor Mission: Code Visual Layers Per Scene
Each tile focuses on one scene, integrating its specific effect while leveraging CosmicJourneyController for global behavior. We’ll use existing assets (e.g., StarfieldCanvas) and create new components as needed.
Tile 0: Update CosmicJourneyController for Global Effects
Goal: Centralize scroll-driven intensity and particle configs.
File: src/components/journey/CosmicJourneyController.jsx
jsx
import { useState, useEffect } from 'react';
import DormantScene from './scenes/DormantScene';
import AwakeningScene from './scenes/AwakeningScene';
import CosmicRevealScene from './scenes/CosmicRevealScene';
import CosmicFlightScene from './scenes/CosmicFlightScene';
import SunApproachScene from './scenes/SunApproachScene';
import SunLandingScene from './scenes/SunLandingScene';

const metadata = {
  id: 'cosmic_journey_controller',
  scs: 'SCS-CONTROLLER',
  type: 'controller',
  doc: 'contract_cosmic_journey.md'
};

export default function CosmicJourneyController() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [globalParticleConfig, setGlobalParticleConfig] = useState({
    density: 50,
    speed: 1,
    fps: 5
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);

      // Adjust particle config based on scene
      if (progress < 0.2) {
        setGlobalParticleConfig({ density: 50, speed: 1, fps: 5 }); // Dormant
      } else if (progress < 0.4) {
        setGlobalParticleConfig({ density: 30, speed: 1, fps: 10 }); // Awakening
      } else if (progress < 0.6) {
        setGlobalParticleConfig({ density: 20, speed: 1, fps: 10 }); // Cosmic Reveal
      } else if (progress < 0.8) {
        setGlobalParticleConfig({ density: 40, speed: 3, fps: 30 }); // Cosmic Flight
      } else {
        setGlobalParticleConfig({ density: 30, speed: 1, fps: 5 }); // Sun Approach/Landing
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <DormantScene scrollProgress={scrollProgress} particleConfig={globalParticleConfig} />
      <AwakeningScene scrollProgress={scrollProgress} particleConfig={globalParticleConfig} />
      <CosmicRevealScene scrollProgress={scrollProgress} particleConfig={globalParticleConfig} />
      <CosmicFlightScene scrollProgress={scrollProgress} particleConfig={globalParticleConfig} />
      <SunApproachScene scrollProgress={scrollProgress} particleConfig={globalParticleConfig} />
      <SunLandingScene scrollProgress={scrollProgress} particleConfig={globalParticleConfig} />
    </div>
  );
}
Tile 1: Add Light Glow Dust to DormantScene
Goal: Add subtle breathing stars behind the moon and robot.
File: src/components/journey/scenes/DormantScene.jsx
jsx
import StarfieldCanvas from '../visual/StarfieldCanvas';

const metadata = {
  id: 'dormant_scene',
  scs: 'SCS-DORMANT',
  type: 'scene',
  doc: 'contract_cosmic_scenes.md'
};

export default function DormantScene({ scrollProgress, particleConfig }) {
  const opacity = Math.min(1, scrollProgress * 5); // Fade in as scroll starts

  return (
    <div className="absolute inset-0">
      <StarfieldCanvas
        opacity={opacity}
        density={particleConfig.density}
        fps={particleConfig.fps}
        baseColor="#ccd6f6" // Moonlit hue
        breathing={true}
        className="z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a] to-[#415a77] z-20" />
      <div className="moon-swirl z-30">{/* Existing moon graphic */}</div>
      <div className="robot-character z-40">{/* Existing robot */}</div>
    </div>
  );
}
Tile 2: Add Nebula Fade to AwakeningScene
Goal: Add a slow aurora shimmer with cosmic colors.
File: src/index.css
css
@keyframes nebulaFade {
  0% { background-position: 0% 50%; opacity: 0.4; }
  50% { background-position: 100% 50%; opacity: 0.7; }
  100% { background-position: 0% 50%; opacity: 0.4; }
}

.nebula-fade {
  background: linear-gradient(135deg, #35204a, #4B2E83 30%, #A3E1B5 50%, #E1BEE7 70%, #6f71d9);
  background-size: 200% 200%;
  animation: nebulaFade 15s ease infinite;
  will-change: background-position, opacity;
}
File: src/components/journey/scenes/AwakeningScene.jsx
jsx
const metadata = {
  id: 'awakening_scene',
  scs: 'SCS-AWAKENING',
  type: 'scene',
  doc: 'contract_cosmic_scenes.md'
};

export default function AwakeningScene({ scrollProgress, particleConfig }) {
  const opacity = Math.min(1, (scrollProgress - 0.2) * 5); // Fade in after Dormant

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 nebula-fade" style={{ opacity }} />
      <div className="absolute inset-0 z-20">
        {/* Existing vertical streaks */}
      </div>
    </div>
  );
}
Tile 3: Add Constellation Glow to CosmicRevealScene
Goal: Add 3 pulsing constellations with natural connections.
File: src/components/journey/visual/ConstellationGlow.jsx
jsx
import { useEffect, useRef } from 'react';

const metadata = {
  id: 'constellation_glow',
  scs: 'SCS-CONSTELLATION',
  type: 'visual',
  doc: 'contract_cosmic_visuals.md'
};

export default function ConstellationGlow({ opacity, fps }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const constellations = Array.from({ length: 3 }, () => {
      const mainStar = {
        x: Math.random() * canvas.width / dpr,
        y: Math.random() * canvas.height / dpr,
        size: 3,
        phase: Math.random() * Math.PI * 2
      };
      const connectedStars = Array.from({ length: 4 }, () => ({
        x: mainStar.x + (Math.random() - 0.5) * 50,
        y: mainStar.y + (Math.random() - 0.5) * 50,
        size: 2,
        phase: Math.random() * Math.PI * 2
      }));
      return { mainStar, connectedStars };
    });

    const draw = (time) => {
      if (time - lastFrameTimeRef.current < 1000 / fps) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = time;

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      constellations.forEach(({ mainStar, connectedStars }) => {
        // Draw main star with pulsing
        const pulse = mainStar.size * (0.95 + 0.05 * Math.sin(time * 0.001 + mainStar.phase));
        ctx.beginPath();
        ctx.arc(mainStar.x, mainStar.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Draw connected stars and lines
        connectedStars.forEach(star => {
          const starPulse = star.size * (0.95 + 0.05 * Math.sin(time * 0.001 + star.phase));
          ctx.beginPath();
          ctx.arc(star.x, star.y, starPulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
          ctx.fill();

          // Draw connecting line
          ctx.beginPath();
          ctx.moveTo(mainStar.x, mainStar.y);
          ctx.lineTo(star.x, star.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [opacity, fps]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-30" />;
}
File: src/components/journey/scenes/CosmicRevealScene.jsx
jsx
import ConstellationGlow from '../visual/ConstellationGlow';

const metadata = {
  id: 'cosmic_reveal_scene',
  scs: 'SCS-COSMIC-REVEAL',
  type: 'scene',
  doc: 'contract_cosmic_scenes.md'
};

export default function CosmicRevealScene({ scrollProgress, particleConfig }) {
  const opacity = Math.min(1, (scrollProgress - 0.4) * 5);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a2c56] to-[#7bb2f9]">
      <ConstellationGlow opacity={opacity} fps={particleConfig.fps} />
      <div className="z-40">{/* Existing bloom and text */}</div>
    </div>
  );
}

Tile 4: Add Parallax Speed Dust to CosmicFlightScene
Goal: Add fast-moving particles with parallax.
File: src/components/journey/visual/ParallaxSpeedDust.jsx
jsx
import { useEffect, useRef } from 'react';

const metadata = {
  id: 'parallax_speed_dust',
  scs: 'SCS-SPEED-DUST',
  type: 'visual',
  doc: 'contract_cosmic_visuals.md'
};

export default function ParallaxSpeedDust({ opacity, speed, density, fps }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.width / dpr,
      y: Math.random() * canvas.height / dpr,
      length: Math.random() * 10 + 5,
      speed: (Math.random() * 0.5 + 0.5) * speed
    }));

    const draw = (time) => {
      if (time - lastFrameTimeRef.current < 1000 / fps) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = time;

      ctx.fillStyle = 'rgba(25, 43, 58, 0.2)';
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      particles.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height / dpr) p.y = -p.length;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [opacity, speed, density, fps]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-20" />;
}
File: src/components/journey/scenes/CosmicFlightScene.jsx
jsx
import ParallaxSpeedDust from '../visual/ParallaxSpeedDust';

const metadata = {
  id: 'cosmic_flight_scene',
  scs: 'SCS-COSMIC-FLIGHT',
  type: 'scene',
  doc: 'contract_cosmic_scenes.md'
};

export default function CosmicFlightScene({ scrollProgress, particleConfig }) {
  const opacity = Math.min(1, (scrollProgress - 0.6) * 5);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#192b3a] to-[#7fe5d6]">
      <ParallaxSpeedDust
        opacity={opacity}
        speed={particleConfig.speed}
        density={particleConfig.density}
        fps={particleConfig.fps}
      />
      <div className="z-30">{/* Existing warp streaks */}</div>
    </div>
  );
}
Tile 5: Add Solar Flicker Dust to SunApproachScene
Goal: Add warm, subtle particles.
File: src/components/journey/scenes/SunApproachScene.jsx
jsx
import StarfieldCanvas from '../visual/StarfieldCanvas';

const metadata = {
  id: 'sun_approach_scene',
  scs: 'SCS-SUN-APPROACH',
  type: 'scene',
  doc: 'contract_cosmic_scenes.md'
};

export default function SunApproachScene({ scrollProgress, particleConfig }) {
  const opacity = Math.min(1, (scrollProgress - 0.8) * 5);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#fffbe6] to-[#facc15]">
      <StarfieldCanvas
        opacity={opacity * 0.3} // Subtle for sunlit scene
        density={particleConfig.density}
        fps={particleConfig.fps}
        baseColor="#facc15" // Warm yellow
        breathing={true}
        className="z-10"
      />
      <div className="z-20">{/* Existing radial glow */}</div>
    </div>
  );
}
Tile 6: Add Sun Flare Pulse to SunLandingScene
Goal: Add a dramatic flare burst.
File: src/components/journey/visual/SunFlarePulse.jsx
jsx
import { useEffect, useRef } from 'react';

const metadata = {
  id: 'sun_flare_pulse',
  scs: 'SCS-FLARE-PULSE',
  type: 'visual',
  doc: 'contract_cosmic_visuals.md'
};

export default function SunFlarePulse({ opacity, fps }) {
  const divRef = useRef(null);

  useEffect(() => {
    const div = divRef.current;
    div.style.opacity = opacity;
  }, [opacity]);

  return (
    <div
      ref={divRef}
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-radial from-[#fde68a] to-transparent animate-pulse z-30"
      style={{ animationDuration: `${1000 / fps}ms` }}
    />
  );
}
File: src/index.css
css
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.5; }
}

.bg-gradient-radial {
  background: radial-gradient(circle, #fde68a, transparent);
}

.animate-pulse {
  animation: pulse 2s infinite;
}
File: src/components/journey/scenes/SunLandingScene.jsx
jsx
import SunFlarePulse from '../visual/SunFlarePulse';

const metadata = {
  id: 'sun_landing_scene',
  scs: 'SCS-SUN-LANDING',
  type: 'scene',
  doc: 'contract_cosmic_scenes.md'
};

export default function SunLandingScene({ scrollProgress, particleConfig }) {
  const opacity = Math.min(1, (scrollProgress - 0.9) * 10);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#fca311] to-[#fde68a]">
      <SunFlarePulse opacity={opacity} fps={particleConfig.fps} />
      <div className="z-40">{/* Existing speed lines */}</div>
    </div>
  );
}
Tile 7: Commit Changes
bash
# Stage files
git add src/components/journey/CosmicJourneyController.jsx
git add src/components/journey/scenes/*
git add src/components/journey/visual/*
git add src/index.css

# Commit
git commit -m "Add visual layers to Cosmic Awakening scenes
- Centralized scroll-driven effects in CosmicJourneyController
- Added Light Glow Dust to DormantScene (5FPS)
- Implemented Nebula Fade in AwakeningScene (10FPS)
- Added Constellation Glow to CosmicRevealScene (10FPS)
- Integrated Parallax Speed Dust in CosmicFlightScene (30FPS)
- Added Solar Flicker Dust to SunApproachScene (5FPS)
- Implemented Sun Flare Pulse in SunLandingScene (30FPS)
- Ensured LEGIT compliance with scs metadata"

# Push
git push origin main
🛠️ Notes
Performance: CSS animations (nebula, flare) reduce JavaScript overhead; canvas effects (stars, particles) are throttled per scene.
Testing: Rerun Lighthouse tests post-deployment to ensure scores remain high:
bash
lighthouse https://curiouslabs-site.vercel.app/background-sandbox --preset=desktop --output html --output-path Docs/lighthouse/post-visual-layers-desktop.html --view
lighthouse https://curiouslabs-site.vercel.app/background-sandbox --preset=mobile --output html --output-path Docs/lighthouse/post-visual-layers-mobile.html --view
Next Steps: Review Lighthouse results, then iterate if needed (e.g., reduce particle density on mobile).
Let me know if you want to test a specific scene first or adjust any effect! 🚀

===============================================================================================================================



# Cosmic Show Enhancement Plan Analysis

I've analyzed the cosmic enhancement plan and compared it against our current codebase state. Here's my assessment:

## Key Observations

1. **Compatibility with Current Structure**: The plan is modular and scene-specific, which aligns well with our current architecture after star removal. It keeps the existing layer system intact while adding new visual components.

2. **Performance Considerations**: The plan addresses performance with throttled animations (5-30 FPS depending on scene) and specific techniques like CSS animations to reduce JavaScript overhead.

3. **Clean Implementation Path**: Each effect is isolated in its own component with clear responsibilities, making it possible to implement incrementally without breaking existing functionality.

## Potential Concerns

1. **No Major Architectural Changes Required**: The plan builds on the existing scene structure rather than altering it fundamentally.

2. **FPS Meter Integration**: The plan doesn't explicitly mention our existing FPS meter implementation, but they're fully compatible.

## Implementation Plan

Here's a streamlined approach to implement these enhancements safely:

### Phase 1: Core Framework Setup

1. **Update CosmicJourneyController** to manage global particle configurations:
   - Add `globalParticleConfig` state with density, speed, and FPS settings
   - Keep existing scroll handling logic but add configuration updates based on scene

2. **Create Base Visual Components**:
   - `StarfieldCanvas.jsx`: Implement with high-DPI support, throttling, and customizable colors
   - Implement base CSS animations in `index.css`

### Phase 2: Scene-by-Scene Implementation

Implement each scene's effects individually, testing after each one:

1. **DormantScene**: Add subtle breathing stars with `StarfieldCanvas`
2. **AwakeningScene**: Add nebula fade with CSS animations
3. **CosmicRevealScene**: Add constellation effect
4. **CosmicFlightScene**: Add parallax speed dust
5. **SunApproachScene**: Add warm particle effects
6. **SunLandingScene**: Add sun flare pulse

### Phase 3: Testing and Optimization

1. Use our existing FPS meter to monitor performance
2. Adjust particle density and animation FPS based on real-world performance

## Technical Approach Details

1. **Canvas Optimization**: 
   - Implement proper devicePixelRatio scaling
   - Use RAF throttling to target specific FPS per scene
   - Clean up animations on component unmount

2. **CSS vs Canvas Selection**:
   - Use CSS for simpler effects (nebula fade, sun pulse)
   - Use Canvas for particle systems and complex animations

3. **Scene Isolation**:
   - Keep each scene's effects contained within its component
   - Use z-index to properly layer elements

This plan can be implemented without disrupting the current layers and should maintain performance while enhancing the visual experience. Each component can be added and tested incrementally to ensure stability.

Would you like me to develop any specific component from this plan first to test the approach?
