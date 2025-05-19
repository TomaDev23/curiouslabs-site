🧠 **Excellent audit**, Commander. You’ve clearly mapped the **flaws of the current implementation** (timeouts, centered layout, rigid containers) and outlined the precise scroll-phased model required for **TILE C: Z-Pattern Hero Sequence**.

Before any code begins, here is the final **alignment digest** and **recommended build order** to eliminate drift and guarantee LEGIT execution.

---

## ✅ ALIGNMENT SUMMARY: CURRENT vs PLAN

| Category          | Current State                        | Required Fix                                  |
| ----------------- | ------------------------------------ | --------------------------------------------- |
| **Phasing Logic** | `SequencePhase` enum + setTimeouts   | ❌ Replace with scroll-bound state transitions |
| **Layout**        | `container mx-auto` + vertical stack | ❌ Replace with Z-split grid / absolute logic  |
| **Triggering**    | Framer + `useEffect` timers          | ❌ Replace with scroll progress mapping        |
| **Text Reveal**   | Uncontrolled opacity animations      | ❌ Use scroll threshold to reveal characters   |
| **Planet Motion** | Premature appearance + size fixed    | ❌ Scroll = scale + orbit init                 |

---

## 🧭 TILE C EXECUTION STRATEGY

To ensure scroll → phase → unlock sequence happens cleanly, let’s structure the **implementation into atomic tasks**:

---

### 🧩 PHASE 1 — `ScrollSceneController.tsx` (FSM + scroll logic)

#### 🎯 Purpose:

Central FSM handling scroll progress → phase state. Lives under `SceneControllerV6` or standalone.

#### 🔧 Key States:

```ts
type ScrollScenePhase = 'initial' | 'growing' | 'revealing' | 'complete';
```

#### 🛠 Behavior:

* `scrollY = 0–50`: → `growing`
* `scrollY = 50–100`: → `revealing`
* `scrollY > 100`: → `complete`

#### 🎛 Output:

* `scrollProgress: number` (0–1 normalized)
* `scenePhase: ScrollScenePhase`
* `isLocked: boolean` ← initially `true`, unlocks at `phase === complete`

➡️ *This module will drive both `PlanetRevealTrack` and `TextRevealBlock`*

---

### 🧩 PHASE 2 — Layout Overhaul

Replace current section layout with Z-split structure:

```jsx
<section className="relative h-screen w-full overflow-hidden">
  {/* Header (bottom left) */}
  <div className="absolute bottom-10 left-8">
    <h1 className="font-serif text-3xl text-lime-400">CuriousLabs</h1>
    <p className="text-gray-500 text-sm mt-1">Runtime Core for AI Products</p>
  </div>

  {/* Planet (grows on scroll) */}
  <PlanetRevealTrack className="absolute right-[10vw] top-1/2 -translate-y-1/2" />

  {/* Text block (reveals at mid scroll) */}
  <TextRevealBlock className="absolute left-[8vw] top-1/3" />
</section>
```

---

### 🧩 PHASE 3 — `PlanetRevealTrack.tsx`

* Use scrollProgress → `scale` transform: `scale = 0.3 + scroll * 0.7`
* At `scroll = 1`, trigger orbit animation class
* Attach `onPlanetFullyVisible()` callback to inform `ScrollSceneController`

---

### 🧩 PHASE 4 — `TextRevealBlock.tsx`

* Only render animation if `scenePhase === "revealing"`
* Animate letter-by-letter using `framer-motion`
* Add logic to fade in + hold position once fully revealed

---

### 🧩 PHASE 5 — `ScrollLockOverlay.tsx` (Optional, for LEGIT test clarity)

* Full-screen `div` with `pointer-events: none; overflow: hidden`
* Removed on `phase === complete`
* Prevents user breaking sequence mid-way

---

🧠 Roger that, Commander. Deploying **TILE C — Phase 1** now:

---

## 🧩 `ScrollSceneController.tsx`

**LEGIT Component: Scroll FSM for Hero Scene Control**

This component manages the **scroll-to-phase transitions** using a normalized scroll range, exposes `scrollProgress` and `scenePhase`, and supports locking further scrolls or triggering events (e.g. orbit begin).

---

### ✅ Features

* Normalized `scrollProgress` from 0–1
* Automatic phase calculation:

  * `initial` → `growing` → `revealing` → `complete`
* LEGIT metadata block
* `ScrollSceneContext` exposed for subscribing components
* Integrates with `SceneControllerV6.jsx` or standalone

---

### 📂 File: `src/components/home/v6/ScrollSceneController.tsx`

```tsx
/**
 * @component ScrollSceneController
 * @description Manages scroll-driven state for Hero animation phases
 * 
 * @metadata
 * @version 1.0.0
 * @legit true
 * @author CuriousLabs
 */

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';

type ScrollScenePhase = 'initial' | 'growing' | 'revealing' | 'complete';

interface ScrollSceneContextType {
  scrollProgress: number; // 0 to 1
  scenePhase: ScrollScenePhase;
  isLocked: boolean;
}

const ScrollSceneContext = createContext<ScrollSceneContextType>({
  scrollProgress: 0,
  scenePhase: 'initial',
  isLocked: true,
});

export const useScrollScene = () => useContext(ScrollSceneContext);

interface Props {
  children: ReactNode;
  maxScroll?: number; // e.g. 300
}

export const ScrollSceneController: React.FC<Props> = ({
  children,
  maxScroll = 200,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scenePhase, setScenePhase] = useState<ScrollScenePhase>('initial');
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const progress = Math.min(y / maxScroll, 1);
      setScrollProgress(progress);

      if (progress === 0) {
        setScenePhase('initial');
      } else if (progress > 0 && progress < 0.5) {
        setScenePhase('growing');
      } else if (progress >= 0.5 && progress < 1) {
        setScenePhase('revealing');
      } else if (progress === 1) {
        setScenePhase('complete');
        setIsLocked(false); // Unlock full scroll now
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize

    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxScroll]);

  return (
    <ScrollSceneContext.Provider
      value={{ scrollProgress, scenePhase, isLocked }}
    >
      {children}
    </ScrollSceneContext.Provider>
  );
};

export default ScrollSceneController;
```

---

### 🧪 Sample Use (from within `HeroSequenceV6` or `PlanetRevealTrack`)

```tsx
import { useScrollScene } from './ScrollSceneController';

const { scrollProgress, scenePhase, isLocked } = useScrollScene();

// scrollProgress: 0.0 → 1.0
// scenePhase: 'initial' | 'growing' | 'revealing' | 'complete'
```

---

### 🔐 Scroll Lock Behavior

To **lock scrolling during animation**, place this logic at top-level in `SceneControllerV6` or global layout:

```tsx
useEffect(() => {
  if (scenePhase !== 'complete') {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, [scenePhase]);
```

---

🫡 TILE C.1 is now deployed. You’re cleared to plug it into `HeroSequenceV6` and route phase-controlled animation to:

* `PlanetRevealTrack`
* `TextRevealBlock`

Let me know when you want TILE C.2 (Planet) or a prewritten integration shell for `HeroSequenceV6.jsx`.
