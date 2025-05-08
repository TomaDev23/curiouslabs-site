

# 🛠️ TILE T2.6.7 Implementation Plan: Scroll Awakening System

## 🔍 In-Depth Simulation and Analysis

After reviewing TILE T2.6.7 for the Scroll Awakening implementation, I've analyzed how to properly execute this within the project's constraints. This tile requires building the first two scenes of a scroll-driven cinematic background experience, completely isolated in a dedicated route.

### Core Components Required:

1. **Page Route**: `/background-awakening` entry point
2. **Controller Component**: `CosmicJourneyController.jsx` to manage scenes
3. **Scene Components**: `DormantScene.jsx` and `AwakeningScene.jsx`
4. **Visual Asset**: `RobotCharacter.jsx` with eye animation capabilities

### LEGIT & Rules Enforcement Considerations:

1. **📚 Docs Are Law**:
   - Implementation follows the exact component structure specified in scene_1_2.md
   - No additional functionality beyond what's documented

2. **🧱 Sacred Structure**:
   - New components will be placed in the approved directory hierarchy
   - No modification to existing structure outside the scope

3. **⚙️ Stack Lock**:
   - Using only React and TailwindCSS as specified
   - No additional libraries except those already in the project

4. **🎨 Style Discipline**:
   - All styling will use TailwindCSS utility classes only
   - No custom CSS files will be created
   - Responsive design principles will be maintained

5. **🔄 Component Rules**:
   - Components will be modular and standalone
   - No backend integration, purely visual components
   - Proper rendering hierarchy will be maintained

6. **📦 Asset Management**:
   - Robot image will reference from public directory
   - No external CDN links or inline base64 encoding

7. **🛑 Hard Stops**:
   - No additional npm packages will be installed
   - Performance will be prioritized with minimal animations

## 📋 Implementation Plan

### 1. Directory Structure Setup
First, I'll create the required directory structure to house our new components:

```
src/
├── pages/
│   └── background_awakening.jsx             // Entry route
├── components/
│   └── journey/
│       ├── CosmicJourneyController.jsx      // Scroll controller
│       ├── scenes/
│       │   ├── DormantScene.jsx             // Scene 1
│       │   ├── AwakeningScene.jsx           // Scene 2
│       └── visual/
│           └── RobotCharacter.jsx           // Robot with eye animation
```

### 2. Route Implementation
Create the page component that will serve as our isolated route:

```jsx
// src/pages/background_awakening.jsx
import React from 'react';
import CosmicJourneyController from '../components/journey/CosmicJourneyController';

export default function BackgroundAwakeningPage() {
  return <CosmicJourneyController />;
}
```

### 3. Journey Controller
Implement the controller component that will manage scenes:

```jsx
// src/components/journey/CosmicJourneyController.jsx
import React from 'react';
import DormantScene from './scenes/DormantScene';
import AwakeningScene from './scenes/AwakeningScene';

export default function CosmicJourneyController() {
  return (
    <div className="w-full min-h-screen text-white scroll-smooth">
      <DormantScene />
      <AwakeningScene />
    </div>
  );
}
```

### 4. Scene Components
Create the two scene components with their distinct visual characteristics:

```jsx
// src/components/journey/scenes/DormantScene.jsx
import React from 'react';
import RobotCharacter from '../visual/RobotCharacter';

export default function DormantScene() {
  return (
    <section className="h-screen bg-black flex items-center justify-center">
      <RobotCharacter eyeOn={false} />
    </section>
  );
}
```

```jsx
// src/components/journey/scenes/AwakeningScene.jsx
import React from 'react';
import RobotCharacter from '../visual/RobotCharacter';

export default function AwakeningScene() {
  return (
    <section className="h-screen bg-black relative flex items-center justify-center">
      <RobotCharacter eyeOn={true} flicker />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black opacity-20 pointer-events-none" />
    </section>
  );
}
```

### 5. Robot Character Component
Implement the robot character with eye animation capabilities:

```jsx
// src/components/journey/visual/RobotCharacter.jsx
import React from 'react';
import robotImg from '/images/robot.png'; // Will verify correct path

export default function RobotCharacter({ eyeOn = false, flicker = false }) {
  return (
    <div className="relative w-[300px] h-[300px]">
      <img src={robotImg} alt="Robot Character" className="w-full h-full object-contain" />
      <div
        className={`absolute top-[35%] left-[45%] w-[30px] h-[30px] rounded-full ${
          eyeOn ? 'bg-cyan-400' : 'bg-gray-800'
        } ${flicker ? 'animate-pulse' : ''}`}
      />
    </div>
  );
}
```

### 6. Route Registration
Verify that we can add the new route to App.jsx:

```jsx
// In App.jsx, add the new route
<Route path="/background-awakening" element={
  <Suspense fallback={<LoadingFallback />}>
    <BackgroundAwakeningPage />
  </Suspense>
} />
```

## 🧪 Testing Plan

1. Verify directory structure is created correctly
2. Confirm page loads at `/background-awakening`
3. Validate the DormantScene appears with robot (eyes off)
4. Scroll down and verify AwakeningScene with flickering eyes
5. Confirm no impact to existing routes or components

## ⚠️ Potential Issues & Mitigations

1. **Robot Image**: If robot.png is not available, we'll need to check available assets or create a placeholder.
2. **Tailwind Animation**: May need to ensure animations are properly defined in tailwind.config.js.
3. **Performance**: Will monitor for any performance issues during implementation.

## 🎯 Exit Criteria

- Route `/background-awakening` works and is accessible
- Both scenes are correctly rendered in a scrollable layout
- Robot appears with eyes off in Scene 1
- Robot appears with flickering eyes in Scene 2
- Purple gradient background appears in the Awakening scene
- No existing pages or components are modified beyond the implementation scope

This implementation plan adheres to all LEGIT principles and DO_NOT_DEVIATE rules, focusing exclusively on the atomic creation of the specified components without impacting the rest of the application.



===========================================================================================================================

🧠 Crystal clear, Commander:
We're building this **atomically**, scene by scene, inside a **dedicated `/background-awakening` route**, far away from any homepage or `/v4`.

Once it’s visually locked, **we’ll import it into `/v4` manually** — no touchy-touchy on live routes.

---

# 🛠️ CURSOR TASK: TILE T2.6.7 – Begin Scroll Awakening

## 🎯 Objective:

Build the **first two scenes** of your scroll-driven cinematic background:

1. **DormantScene** — black screen, robot asleep
2. **AwakeningScene** — eyes flicker, stars fade in

Use a scroll-based layout, modular scene files, and a controller component to eventually manage all zones.

---

## 📁 Files to Create

```
src/
├── pages/
│   └── background_awakening.jsx             🧭 Entry route
├── components/
│   └── journey/
│       ├── CosmicJourneyController.jsx      🧠 Scroll controller
│       ├── scenes/
│       │   ├── DormantScene.jsx             🌑 Scene 1
│       │   ├── AwakeningScene.jsx           ✨ Scene 2
│       └── visual/
│           └── RobotCharacter.jsx           🤖 Robot image with eye flicker
```

---

## 🧱 Implementation Plan

### 🔲 `/background-awakening`

```jsx
import CosmicJourneyController from '../components/journey/CosmicJourneyController';

export default function BackgroundAwakeningPage() {
  return <CosmicJourneyController />;
}
```

---

### 🔲 `CosmicJourneyController.jsx`

* Full page scrollable div
* Renders `DormantScene` and `AwakeningScene` stacked vertically (100vh each)
* Scroll-linked effect logic will be added later

---

### 🔲 `DormantScene.jsx`

* Black background
* `RobotCharacter` with eyes off

```jsx
export default function DormantScene() {
  return (
    <section className="h-screen bg-black flex items-center justify-center">
      <RobotCharacter eyeOn={false} />
    </section>
  );
}
```

---

### 🔲 `AwakeningScene.jsx`

* Same layout
* `RobotCharacter` with animated eye flicker
* Stars fade in using low-opacity `SpaceCanvas` or radial gradient placeholder

```jsx
export default function AwakeningScene() {
  return (
    <section className="h-screen bg-black relative flex items-center justify-center">
      <RobotCharacter eyeOn={true} flicker />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black opacity-20 pointer-events-none" />
    </section>
  );
}
```

---

### 🔲 `RobotCharacter.jsx`

* Takes `eyeOn` and `flicker` props
* Loads image (use your microscope or robot)
* Adds flicker animation (CSS keyframes or tailwind)

---

## ✅ Exit Criteria

* Route `/background-awakening` works
* Renders both scenes in scrollable layout
* Robot appears off in Scene 1, wakes up in Scene 2
* Basic fade/animation logic working visually
* No homepage touched. Fully atomic.

--
====================================================================================================================

🛠️ **TILE T2.6.7 — DEPLOYMENT AUTHORIZED**
Commander has confirmed mission go. Proceeding with Cursor task for:

> **Scroll Awakening Init**
> Scene 1: DormantRobot
> Scene 2: AwakeningSequence
> Full route: `/background-awakening`
> Fully atomic. Homepage untouched. Modularized.

---

## ✅ CURSOR TASK SUMMARY — TILE T2.6.7

### 🧱 Files to Create

```
src/
├── pages/
│   └── background_awakening.jsx
├── components/
│   └── journey/
│       ├── CosmicJourneyController.jsx
│       ├── scenes/
│       │   ├── DormantScene.jsx
│       │   ├── AwakeningScene.jsx
│       └── visual/
│           └── RobotCharacter.jsx
```

---

## 📄 background\_awakening.jsx

```jsx
import React from 'react';
import CosmicJourneyController from '../components/journey/CosmicJourneyController';

export default function BackgroundAwakeningPage() {
  return <CosmicJourneyController />;
}
```

---

## 📄 CosmicJourneyController.jsx

```jsx
import React from 'react';
import DormantScene from './scenes/DormantScene';
import AwakeningScene from './scenes/AwakeningScene';

export default function CosmicJourneyController() {
  return (
    <div className="w-full min-h-screen text-white scroll-smooth">
      <DormantScene />
      <AwakeningScene />
    </div>
  );
}
```

---

## 📄 DormantScene.jsx

```jsx
import React from 'react';
import RobotCharacter from '../visual/RobotCharacter';

export default function DormantScene() {
  return (
    <section className="h-screen bg-black flex items-center justify-center">
      <RobotCharacter eyeOn={false} />
    </section>
  );
}
```

---

## 📄 AwakeningScene.jsx

```jsx
import React from 'react';
import RobotCharacter from '../visual/RobotCharacter';

export default function AwakeningScene() {
  return (
    <section className="h-screen bg-black relative flex items-center justify-center">
      <RobotCharacter eyeOn={true} flicker />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black opacity-20 pointer-events-none" />
    </section>
  );
}
```

---

## 📄 RobotCharacter.jsx

```jsx
import React from 'react';
import clsx from 'clsx';
import robotImg from '/images/hero_robot.png'; // Replace with your asset

export default function RobotCharacter({ eyeOn = false, flicker = false }) {
  return (
    <div className="relative w-[300px] h-[300px]">
      <img src={robotImg} alt="Robot Character" className="w-full h-full object-contain" />
      <div
        className={clsx(
          'absolute top-[35%] left-[45%] w-[30px] h-[30px] rounded-full',
          eyeOn ? 'bg-cyan-400' : 'bg-gray-800',
          flicker && 'animate-pulse'
        )}
      />
    </div>
  );
}
```

---

### 🧪 Result

Visit `http://localhost:5173/background-awakening` to see:

* 🔲 Scene 1: Robot silent, eyes off
* 🔲 Scroll down → Scene 2: Eyes flicker on, stars begin to glow
* ✅ No home integration yet — atomic route
* ✅ Modular files, scalable scenes

---

📦 Ready for Cursor.
Mission: **TILE T2.6.7 – Scene 1 & 2 Scroll Base Init**
Deploy.
