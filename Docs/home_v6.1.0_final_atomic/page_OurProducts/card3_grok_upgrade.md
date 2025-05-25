Yo, bro! No worries, I got you—thanks for clarifying that this is for your site, not 21st.dev (we’ll save exporting for later). This StellarMessage animation is a stunning cosmic masterpiece, but it’s only showing the 3-4 main stages (materialization, constellation, breathing, dissolution) without the full, smooth animation flow you’re aiming for. The issue likely stems from the event-driven activation, phase transition hiccups, or subtle visual effects that make some stages hard to notice. Since you’re integrating this into your site, I’ll convert StellarMessage into a React component that auto-activates, fix the animation issues, and ensure it runs smoothly in your environment. I’ll also make it loop continuously (instead of stopping) for a more engaging effect on your site.
Problem Breakdown
You mentioned the animation only shows the “3-4 main stages,” suggesting:
Incomplete Animation: Some phases (e.g., breathing or dissolution) may be too subtle or skip quickly, making the animation feel incomplete.
Activation Issue: The horizontalPageChange event listener (expecting pageIndex === 2 and pageName === 'services') might not fire in your site’s context, preventing activate() from running consistently.
Phase Transitions: The AnimationPhaseManager might not reset properly, causing phases to stall or transition abruptly.
Visual Clarity: The breathing phase’s movement (moveAmount = 2) and pulsing (breathingIntensity = 0.4) are subtle, and dissolution’s spiral effect (distance = progress * progress * 150) may move particles off-screen too fast.
Performance: The PerformanceManager might reduce particles prematurely (currentFPS < 45), diminishing the effect.
Canvas Rendering: The canvas might not resize correctly or clear properly, causing visual glitches.
Strategy
To nail this on your site:
React Component: Wrap StellarMessage in a React component (StellarMessage.jsx) that auto-activates on mount, removing the horizontalPageChange dependency.
Loop Animation: Modify AnimationPhaseManager to loop back to materialization after dissolution, ensuring continuous animation.
Enhance Visuals:
Amplify breathing phase movement and pulsing for clearer visibility.
Adjust dissolution spiral to keep particles on-screen longer.
Robust Initialization: Ensure canvas resizes dynamically and initializes reliably with a debug rectangle to confirm rendering.
Disable Aggressive Optimization: Prevent PerformanceManager from reducing particles too early.
Debugging: Add console logs and a debug rectangle to track phase transitions and canvas rendering.
Site Integration: Provide a standalone StellarMessage.jsx and instructions to integrate it into your site (assuming a React-based site with Tailwind or similar CSS).
Assumptions
Environment: Your site uses React (based on your familiarity with JSX in ThoughtTrails). If it’s not React, let me know, and I’ll adapt it (e.g., vanilla JS or another framework).
Styling: You’re using Tailwind or a custom CSS setup similar to index.css from previous discussions (e.g., dark mode bg-background).
Trigger: You want the animation to run automatically on a specific page (e.g., services) without relying on horizontalPageChange.
Canvas Container: The animation should fill the viewport (as per width: 100vw; height: 100vh).
Updated StellarMessage.jsx
This converts StellarMessage into a React component, fixes animation issues, and ensures it loops seamlessly.
jsx
// @file src/components/StellarMessage.jsx
// @description A React component for a cosmic text animation with particle effects and constellation lines
// @version 1.0.0 - "Stellar Symphony"

import { useEffect, useRef } from "react";

class AnimationPhaseManager {
  constructor() {
    this.phases = {
      materialization: { duration: 3000, progress: 0 },
      constellation: { duration: 2500, progress: 0 },
      breathing: { duration: 4000, progress: 0 }, // Longer for visibility
      dissolution: { duration: 3000, progress: 0 }, // Slightly longer
    };
    this.currentPhase = "materialization";
    this.startTime = Date.now();
  }

  update() {
    const elapsed = Date.now() - this.startTime;
    const phase = this.phases[this.currentPhase];

    phase.progress = Math.min(elapsed / phase.duration, 1);

    if (phase.progress >= 1) {
      this.nextPhase();
    }

    return { phase: this.currentPhase, progress: phase.progress };
  }

  nextPhase() {
    const phaseOrder = ["materialization", "constellation", "breathing", "dissolution"];
    const currentIndex = phaseOrder.indexOf(this.currentPhase);

    if (currentIndex < phaseOrder.length - 1) {
      this.currentPhase = phaseOrder[currentIndex + 1];
    } else {
      // Loop back to materialization
      this.currentPhase = "materialization";
      console.log("🌌 Looping back to materialization");
    }
    this.phases[this.currentPhase].progress = 0;
    this.startTime = Date.now();
    console.log(`🌌 Phase transition: ${this.currentPhase} (${currentIndex + 2}/4)`);
  }
}

class StellarParticle {
  constructor(options) {
    this.x = options.startX || 0;
    this.y = options.startY || 0;
    this.targetX = options.targetX || 0;
    this.targetY = options.targetY || 0;
    this.char = options.char || "";
    this.word = options.word || "";
    this.isKeyWord = options.isKeyWord || false;
    this.opacity = 0;
    this.size = this.isKeyWord ? 3 : 2;
    this.startX = options.startX || 0;
    this.startY = options.startY || 0;
    this.glowIntensity = this.isKeyWord ? 10 : 4;
  }

  update(phase, progress) {
    if (phase === "materialization") {
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      this.x = this.startX + (this.targetX - this.startX) * easeProgress;
      this.y = this.startY + (this.targetY - this.startY) * easeProgress;
      this.opacity = easeProgress;
      this.size = (this.isKeyWord ? 3 : 2) * (0.5 + easeProgress * 0.5);
    } else if (phase === "constellation") {
      this.x = this.targetX;
      this.y = this.targetY;
      this.opacity = 1;
      this.size = this.isKeyWord ? 3 : 2;
    } else if (phase === "breathing") {
      const time = Date.now() * 0.004; // Faster breathing
      const pulse = Math.sin(time + this.targetX * 0.03) * 0.5 + 0.5;
      const moveAmount = 6; // More pronounced movement
      this.x = this.targetX + Math.sin(time + this.targetY * 0.02) * moveAmount;
      this.y = this.targetY + Math.cos(time + this.targetX * 0.02) * moveAmount;
      this.opacity = 0.7 + pulse * 0.3;
      this.size = (this.isKeyWord ? 3 : 2) * (0.8 + pulse * 0.4);
    } else if (phase === "dissolution") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const angle = Math.atan2(this.targetY - centerY, this.targetX - centerX);
      const spiralAngle = angle + progress * Math.PI; // Smoother spiral
      const distance = progress * 100; // Slower movement
      this.x = this.targetX + Math.cos(spiralAngle) * distance;
      this.y = this.targetY + Math.sin(spiralAngle) * distance;
      this.opacity = Math.max(0, 1 - progress);
      this.size = (this.isKeyWord ? 3 : 2) * (1 - progress * 0.3);
    }
  }

  draw(ctx) {
    if (this.opacity <= 0) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;

    if (this.isKeyWord && this.opacity > 0.3) {
      ctx.shadowBlur = this.glowIntensity;
      ctx.shadowColor = "#FF6B35";
    }

    ctx.fillStyle = this.isKeyWord ? "#FF6B35" : "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class ConstellationLine {
  constructor(startParticle, endParticle, concept) {
    this.start = startParticle;
    this.end = endParticle;
    this.concept = concept;
    this.opacity = 0;
    this.pulseOffset = Math.random() * Math.PI * 2;
  }

  draw(ctx, phase, progress) {
    if (this.opacity <= 0) return;

    ctx.save();

    if (phase === "breathing") {
      const time = Date.now() * 0.004;
      const pulse = Math.sin(time + this.pulseOffset) * 0.4 + 0.6;
      ctx.globalAlpha = this.opacity * pulse;
    } else {
      ctx.globalAlpha = this.opacity;
    }

    ctx.shadowBlur = 6;
    ctx.shadowColor = "#FF8C42";
    ctx.strokeStyle = "#FF8C42";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.restore();
  }
}

class StellarMessage {
  constructor() {
    this.containerId = "stellar-message-container";
    this.canvasId = "stellar-message-canvas";
    this.isActive = false;
    this.isInitialized = false;
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.constellations = [];
    this.keyWordMap = new Map();
    this.animationId = null;
  }

  init(container) {
    if (this.isInitialized) return;
    console.log("🌌 Initializing StellarMessage...");

    this.container = container;
    this.container.id = this.containerId;
    this.container.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10;
    `;

    this.canvas = document.createElement("canvas");
    this.canvas.id = this.canvasId;
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
    `;
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);

    this.setupEventListeners();
    this.isInitialized = true;
    this.activate();
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      if (this.isActive && this.canvas) {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.convertTextToParticles();
        this.createConstellations();
      }
    });
  }

  activate() {
    if (this.isActive) return;
    console.log("🌌 Activating Stellar Message...");

    this.isActive = true;
    this.container.style.opacity = "1";

    // Resize canvas
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;

    this.phaseManager = new AnimationPhaseManager();
    this.convertTextToParticles();
    this.createConstellations();
    this.startRenderLoop();

    // Debug: Draw a red rectangle for 3 seconds
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    this.ctx.fillRect(10, 10, 100, 100);
    setTimeout(() => this.ctx.clearRect(10, 10, 100, 100), 3000);
  }

  deactivate() {
    console.log("🌌 Deactivating StellarMessage...");
    this.stopRenderLoop();
    if (this.container) this.container.style.opacity = "0";
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.phaseManager = null;
    this.isActive = false;
  }

  destroy() {
    this.deactivate();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.isInitialized = false;
    console.log("🌌 StellarMessage destroyed");
  }

  convertTextToParticles() {
    console.log("🌌 Converting text to particles...");
    this.particles = [];
    this.keyWordMap.clear();

    const message = "We Care, We Create: Ethical, responsible products with humans at the core.";
    const keyWords = ["Care", "Create", "Ethical", "responsible", "humans", "core"];
    const lines = [
      "We Care, We Create: Ethical,",
      "responsible products with humans",
      "at the core.",
    ];

    const fontSize = 48;
    const lineHeight = fontSize * 1.4;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const startY = (canvasHeight - lines.length * lineHeight) / 2;

    this.ctx.font = `${fontSize}px Arial, sans-serif`;

    lines.forEach((line, lineIndex) => {
      const words = line.split(" ");
      const lineWidth = this.ctx.measureText(line).width;
      const startX = (canvasWidth - lineWidth) / 2;
      let currentX = startX;
      const currentY = startY + lineIndex * lineHeight;

      words.forEach((word) => {
        const cleanWord = word.replace(/[^\w]/g, "");
        const isKeyWord = keyWords.includes(cleanWord);
        const wordWidth = this.ctx.measureText(word).width;
        const particlesPerWord = Math.max(3, Math.floor(word.length * 0.8));
        const wordParticles = [];

        for (let i = 0; i < particlesPerWord; i++) {
          const particleX = currentX + (i * (wordWidth / particlesPerWord));
          const particleY = currentY;
          const angle = Math.random() * Math.PI * 2;
          const distance = 200 + Math.random() * 300;
          const randomStartX = particleX + Math.cos(angle) * distance;
          const randomStartY = particleY + Math.sin(angle) * distance;

          const particle = new StellarParticle({
            startX: randomStartX,
            startY: randomStartY,
            targetX: particleX,
            targetY: particleY,
            char: word[Math.floor((i * word.length) / particlesPerWord)] || word[0],
            word: cleanWord,
            isKeyWord: isKeyWord,
            size: isKeyWord ? 3 : 2,
          });

          this.particles.push(particle);
          wordParticles.push(particle);
        }

        if (isKeyWord && wordParticles.length > 0) {
          const centerParticle = wordParticles[Math.floor(wordParticles.length / 2)];
          this.keyWordMap.set(cleanWord, centerParticle);
          console.log(`🌌 Mapped key word: ${cleanWord} at (${centerParticle.targetX}, ${centerParticle.targetY})`);
        }

        currentX += wordWidth + this.ctx.measureText(" ").width;
      });
    });

    console.log(`✨ Created ${this.particles.length} particles`);
    console.log(`✨ Mapped ${this.keyWordMap.size} key words:`, Array.from(this.keyWordMap.keys()));
  }

  createConstellations() {
    console.log("🌌 Creating constellation connections...");
    this.constellations = [];

    const connections = [
      ["Care", "humans"],
      ["Create", "Ethical"],
      ["humans", "core"],
      ["responsible", "core"],
    ];

    connections.forEach(([word1, word2]) => {
      const particle1 = this.keyWordMap.get(word1);
      const particle2 = this.keyWordMap.get(word2);

      if (particle1 && particle2) {
        this.constellations.push(new ConstellationLine(particle1, particle2, `${word1}-${word2}`));
        console.log(`🌌 Created constellation: ${word1} → ${word2}`);
      } else {
        console.warn(`🌌 Could not create constellation: ${word1} → ${word2}`, {
          particle1: !!particle1,
          particle2: !!particle2,
        });
      }
    });

    console.log(`🌌 Created ${this.constellations.length} constellation lines`);
  }

  startRenderLoop() {
    if (this.animationId) cancelAnimationFrame(this.animationId);

    const render = (timestamp) => {
      if (!this.isActive || !this.phaseManager) {
        console.log("🌌 Render loop stopped - inactive or no phase manager");
        return;
      }

      const phaseData = this.phaseManager.update();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach((particle) => {
        particle.update(phaseData.phase, phaseData.progress);
        particle.draw(this.ctx);
      });

      this.drawConstellations(phaseData.phase, phaseData.progress);

      // Debug info
      this.ctx.fillStyle = "white";
      this.ctx.font = "14px monospace";
      this.ctx.fillText(`Phase: ${phaseData.phase} (${Math.round(phaseData.progress * 100)}%)`, 10, 20);

      this.animationId = requestAnimationFrame(render);
    };

    this.animationId = requestAnimationFrame(render);
    console.log("🌌 Render loop started");
  }

  stopRenderLoop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  drawConstellations(phase, progress) {
    if (phase === "constellation" || phase === "breathing") {
      this.constellations.forEach((line) => {
        if (phase === "constellation") {
          line.opacity = progress;
        } else if (phase === "breathing") {
          const time = Date.now() * 0.004;
          const pulse = Math.sin(time + line.pulseOffset) * 0.4 + 0.6;
          line.opacity = pulse;
        }
        line.draw(this.ctx, phase, progress);
      });
    } else if (phase === "dissolution") {
      this.constellations.forEach((line) => {
        line.opacity = Math.max(0, 1 - progress);
        line.draw(this.ctx, phase, progress);
      });
    }
  }
}

export const StellarMessageComponent = () => {
  const containerRef = useRef(null);
  const stellarRef = useRef(null);

  useEffect(() => {
    stellarRef.current = new StellarMessage();

    const initialize = () => {
      if (containerRef.current && !stellarRef.current.isInitialized) {
        stellarRef.current.init(containerRef.current);
        console.log("🌌 StellarMessage initialized with container");
        return true;
      } else if (!containerRef.current) {
        console.warn("🌌 Container ref not available, retrying...");
        return false;
      }
      return true;
    };

    if (!initialize()) {
      const timer = setInterval(() => {
        if (initialize()) clearInterval(timer);
      }, 100);
      return () => clearInterval(timer);
    }

    return () => {
      if (stellarRef.current) stellarRef.current.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black"
      style={{ position: "relative", overflow: "hidden" }}
    />
  );
};

export default StellarMessageComponent;
Key Changes and Fixes
React Component:
Created StellarMessageComponent that auto-activates on mount, removing the horizontalPageChange event dependency.
Used useRef for the container and StellarMessage instance, with retry logic to ensure initialization.
Added a fallback background (bg-gradient-to-br from-black via-gray-900 to-black) for a cosmic look, compatible with your site’s aesthetic.
Animation Looping:
Modified AnimationPhaseManager.nextPhase to loop back to materialization after dissolution, removing the isComplete flag and onComplete callback.
Extended breathing (4000ms) and dissolution (3000ms) durations for better visibility.
Enhanced Visuals:
Breathing Phase:
Increased moveAmount to 6 (from 2) for more noticeable particle movement.
Adjusted pulse to 0.5 + 0.5 (was 0.6 + 0.4) and time to 0.004 for stronger pulsing.
Boosted size range to 0.8 + pulse * 0.4 for more dramatic scaling.
Dissolution Phase:
Reduced distance to progress * 100 (from progress * progress * 150) for a slower spiral.
Changed spiralAngle to angle + progress * Math.PI for a smoother swirl.
Adjusted opacity to 1 - progress (from 1 - progress * progress) for a linear fade.
Canvas Robustness:
Set canvas dimensions using container.clientWidth and clientHeight instead of window.innerWidth/innerHeight for better container integration.
Added background: transparent to the canvas to ensure the background gradient shows through.
Included a debug rectangle (red, 3 seconds) to confirm canvas rendering.
Constellation Lines:
Increased lineWidth to 2 and shadowBlur to 6 for more prominent lines.
Adjusted pulse in breathing to 0.4 + 0.6 for stronger pulsing.
Performance:
Removed PerformanceManager to prevent particle reduction, as the animation is visually critical and modern browsers can handle ~100 particles.
Debugging:
Kept debug text (Phase: ${phase} (${progress}%)) with a larger font (14px) for clarity.
Added detailed console logs for initialization, phase transitions, and particle creation.
Integration Instructions
Assuming your site is a React app (e.g., Vite, Create React App, or Next.js):
Add the Component:
Save the code as src/components/StellarMessage.jsx.
Import and use it in your services page (or wherever you want the animation):
jsx
import StellarMessageComponent from "./components/StellarMessage";

function ServicesPage() {
  return (
    <div className="relative w-full h-screen">
      <StellarMessageComponent />
      {/* Other page content */}
    </div>
  );
}

export default ServicesPage;
Styling:
The component includes a default cosmic background (bg-gradient-to-br from-black via-gray-900 to-black). If your site uses Tailwind, ensure it’s configured (e.g., via tailwind.config.js).
If you’re not using Tailwind, replace the className with:
css
background: linear-gradient(135deg, #000000, #1a1a1a, #000000);
Adjust z-index: 10 in StellarMessage.init if the animation needs to layer differently with other content.
Testing Locally:
Run your site (npm run dev for Vite, npm start for CRA, npm run dev for Next.js).
Navigate to the page with StellarMessageComponent.
Open the browser console and look for:
“🌌 Initializing StellarMessage...”
“🌌 Created X particles”
“🌌 Phase transition: ...”
Check for a red rectangle in the top-left corner for 3 seconds, followed by particles forming the text.
Verify all phases:
Materialization: Particles converge to form text.
Constellation: Lines connect key words (e.g., Care → humans).
Breathing: Particles pulse and move subtly.
Dissolution: Particles spiral outward and fade, then loop back.
Debugging:
If the animation doesn’t start:
Check console for errors or warnings (e.g., “Container ref not available”).
Ensure the container has dimensions (inspect <div ref={containerRef}> for width and height).
If phases skip or look subtle:
Confirm phase transitions in the console (e.g., “Phase transition: breathing”).
Adjust moveAmount (breathing) or distance (dissolution) in StellarParticle.update.
If the canvas is blank:
Verify the red rectangle appears.
Inspect #stellar-message-container and canvas for opacity: 1 and non-zero dimensions.
Customizing:
Text: Modify message and lines in convertTextToParticles to change the displayed text.
Colors: Update #FF6B35 (key particles) and #FF8C42 (lines) in StellarParticle.draw and ConstellationLine.draw.
Timing: Adjust phases durations in AnimationPhaseManager (e.g., breathing: { duration: 5000 }).
Why Only 3-4 Stages Show
The original code:
Relied on horizontalPageChange, which might not fire, causing activate() to skip.
Had subtle breathing effects (moveAmount = 2, breathingIntensity = 0.4), making it hard to notice.
Used a fast dissolution spiral (progress * progress * 150), causing particles to vanish quickly.
Stopped after dissolution (isComplete = true), preventing looping.
The updated version:
Auto-activates via React useEffect.
Enhances breathing with stronger movement (moveAmount = 6) and pulsing.
Slows dissolution (distance = progress * 100) for a visible spiral.
Loops continuously for a dynamic effect.
If It’s Not React
If your site isn’t React-based:
Vanilla JS:
Use the original StellarMessage class (without the React wrapper).
Add to your HTML:
html
<div id="stellar-container"></div>
Initialize in a script:
js
import StellarMessage from "./StellarMessage.js";

const stellar = new StellarMessage();
stellar.init();
stellar.activate();
Ensure stellar-container has position: relative; width: 100vw; height: 100vh.
Other Frameworks:
Share your site’s framework (e.g., Vue, Svelte), and I’ll adapt the component.
Next Steps
Add StellarMessage.jsx to your React site and test it on the services page.
Check the console and screen for the red rectangle and animation phases.
If the animation still feels incomplete:
Share which phases are visible (e.g., “I see materialization and constellation, but breathing is weak”).
Provide console logs or a screenshot.
If you’re not using React, let me know your site’s setup (e.g., vanilla JS, WordPress).
For export to 21st.dev later, we can create a demo.tsx once this is nailed.
Let’s get those cosmic particles dancing across your site, bro! 🌌 Drop any errors, logs, or details about your site’s setup, and we’ll make this shine!