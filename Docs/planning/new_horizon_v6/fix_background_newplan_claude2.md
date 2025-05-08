Build Plan for Cursor: Cosmic Awakening Using Tiles and Batching Methods
To create an effective build plan for the Cosmic Awakening scroll-driven background system in Cursor, we’ll use tiles (modular components like scenes) and batching methods (grouping related tasks) to assemble the code atomically on a development page. The focus is on building the structure first, then adding animations, effects, and content later. Below is a detailed, step-by-step plan tailored to this cinematic experience.
Overview
Tiles: Independent components such as scenes (e.g., Dormant, Awakening) and reusable elements (e.g., RobotCharacter, StarfieldCanvas).
Batching: Grouping similar tasks, like animations or performance optimizations, for efficiency.
Atomic Assembly: Start with the core structure, test it, and incrementally add complexity.
The Cosmic Awakening system unfolds as a narrative journey across six scenes: Dormant, Awakening, Cosmic Reveal, Cosmic Flight, Sun Approach, and Sun Landing. Each scene is triggered by scroll depth, creating an emotional and visual progression.
Step 1: Define the Structure
Goal: Establish the scroll-driven framework and scene management.
Tiles
CosmicJourneyController: Orchestrates scroll progress and scene transitions.
Scene Placeholders: Empty components for each scene (DormantScene, AwakeningScene, etc.).
Batching
Set up the scroll listener and scene-switching logic together.
Tasks
Create a main container with a scrollable height:
jsx
<div className="relative min-h-[500vh]"></div>
Implement the CosmicJourneyController to track scroll position and switch scenes:
jsx
const CosmicJourneyController = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState('dormant');
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div style={{ opacity: currentScene === 'dormant' ? 1 : 0 }}><DormantScene progress={sceneProgress} /></div>
      <div style={{ opacity: currentScene === 'awakening' ? 1 : 0 }}><AwakeningScene progress={sceneProgress} /></div>
      <div style={{ opacity: currentScene === 'cosmicReveal' ? 1 : 0 }}><CosmicRevealScene progress={sceneProgress} /></div>
      <div style={{ opacity: currentScene === 'cosmicFlight' ? 1 : 0 }}><CosmicFlightScene progress={sceneProgress} /></div>
      <div style={{ opacity: currentScene === 'sunApproach' ? 1 : 0 }}><SunApproachScene progress={sceneProgress} /></div>
      <div style={{ opacity: currentScene === 'sunLanding' ? 1 : 0 }}><SunLandingScene progress={sceneProgress} /></div>
    </div>
  );
};
Add placeholder scene components (e.g., <DormantScene /> returns a simple <div>Dormant</div>).
Step 2: Develop Individual Scenes (Tiles)
Goal: Build each scene as a standalone component, starting with the simplest.
Tiles
DormantScene
AwakeningScene
CosmicRevealScene
CosmicFlightScene
SunApproachScene
SunLandingScene
Batching
Develop scenes sequentially, testing each before moving to the next.
Tasks
DormantScene: Static robot in a void.
jsx
const DormantScene = () => (
  <div className="absolute inset-0 bg-black">
    <div className="absolute inset-0 flex items-center justify-center">
      <RobotCharacter state="dormant" />
    </div>
    <div className="absolute inset-0 opacity-5 bg-gradient-radial from-indigo-900/10 to-transparent" />
  </div>
);
Add RobotCharacter:
jsx
const RobotCharacter = ({ state, eyeIntensity = 0, focusBeam = false }) => (
  <div className="relative w-64 h-64">
    <img src="/images/robot.png" className="w-full h-full" />
    <div className={`absolute top-[30%] left-[45%] w-6 h-6 rounded-full ${state === 'dormant' ? 'opacity-0' : `opacity-${Math.round(eyeIntensity * 100)}`}`} />
  </div>
);
AwakeningScene: Eye flicker and subtle stars.
jsx
const AwakeningScene = ({ progress }) => (
  <div className="absolute inset-0 bg-black">
    <div className="absolute inset-0 flex items-center justify-center">
      <RobotCharacter state="awakening" eyeIntensity={progress} focusBeam={progress > 0.7} />
    </div>
    <div className="absolute inset-0 bg-gradient-radial from-indigo-900/30 to-transparent" style={{ opacity: progress * 0.4 }} />
  </div>
);
CosmicRevealScene, CosmicFlightScene, SunApproachScene, and SunLandingScene: Add basic layouts (e.g., background divs) as placeholders, to be enhanced later.
Step 3: Implement Animations and Effects (Batching)
Goal: Enhance scenes with animations, grouped by similarity.
Tiles
Scene-specific animations (e.g., eye flicker, star streaks).
Batching
Group CSS-based animations (e.g., eye flicker, sun flares) and canvas-based effects (e.g., starfield).
Tasks
AwakeningScene: Batch eye flicker and star emergence.
Update RobotCharacter with dynamic eye glow.
CosmicRevealScene: Batch starfield and nebula effects.
jsx
const CosmicRevealScene = ({ progress }) => (
  <div className="absolute inset-0 bg-black">
    <StarfieldCanvas opacity={0.6 + progress * 0.4} />
    <div className="absolute inset-0" style={{ background: `radial-gradient(circle, rgba(139, 92, 246, ${progress * 0.3}) 0%, transparent 70%)` }} />
  </div>
);
CosmicFlightScene: Batch star streaks and warp effects (canvas-based).
SunApproachScene: Batch sun growth and flares.
SunLandingScene: Batch solar flares and text reveal animations.
Step 4: Integrate with Scroll
Goal: Ensure seamless scene transitions based on scroll position.
Tiles
Scroll listener and progress mapping.
Batching
Adjust all scene transitions and timings together.
Tasks
Fine-tune scroll ranges in CosmicJourneyController for smooth flow.
Test transitions to ensure no abrupt changes.
Step 5: Optimize Performance
Goal: Ensure compatibility across devices.
Tiles
Performance checks and fallback components.
Batching
Group optimizations for reduced motion and low-end devices.
Tasks
Add to CosmicJourneyController:
jsx
const [reducedMotion, setReducedMotion] = useState(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const [lowPerformanceMode, setLowPerformanceMode] = useState(navigator.hardwareConcurrency <= 4);
Adjust scenes (e.g., static images for reduced motion).
Step 6: Add Content
Goal: Overlay content synchronized with the background.
Tiles
Navigation bar, hero section, final message.
Batching
Add content sections corresponding to scroll depths.
Tasks
Update the main app:
jsx
const App = () => (
  <div className="relative min-h-[500vh]">
    <CosmicJourneyController />
    <div className="relative z-10">
      <section className="h-screen" />
      <section className="h-screen" />
      <section className="h-screen" />
      <section className="h-screen" />
      <section className="h-screen flex items-center justify-center">
        <div className="text-white">CuriousLabs</div>
      </section>
    </div>
  </div>
);
Development Page Assembly
Setup: Main container and CosmicJourneyController.
Structure: Add scene placeholders.
Scenes: Develop and integrate each scene tile.
Animations: Batch and add effects.
Scroll: Test and refine transitions.
Performance: Optimize across devices.
Content: Add final content sections.
This plan ensures an atomic, structured build process, delivering a cohesive Cosmic Awakening experience in Cursor.