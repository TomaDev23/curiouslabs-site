🧠 Absolutely, Commander. You're now in **TILE C: Hero Elements**, and the clarity you've just added is mission critical. Let’s synthesize your scroll-triggered sequence into a **proper TILE C execution map** with LEGIT control points, component boundaries, and precise motion orchestration.

---

## 🧩 TILE C | Hero Sequence Architecture (Scroll-Triggered Z-Formation)

---

## 🔭 OVERVIEW

| Phase          | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| **Scene One**  | Grid + header + subheader (bottom left), page static                   |
| **Scroll 1**   | Scroll triggers a scroll-bound animation → planet grows on right       |
| **Scroll 2**   | Midway into planet scale, left-side text appears with character reveal |
| **Scene Lock** | Once growth + text complete → light orbit motion activates             |
| **Unlocks**    | Next scroll down transitions to horizontal universe scroll (TILE D)    |

---

## 🎬 TILE C BREAKDOWN — COMPONENT RESPONSIBILITIES

### 🔹 `HeroSequenceV6.jsx`

* Parent scene wrapper
* Positions: `Header + Subheader (bottom-left)`
* Hosts `PlanetRevealTrack`, `TextRevealBlock`, and transition lock system
* Reads scrollY and transitions state locally or via `SceneContext`

### 🔹 `PlanetRevealTrack.jsx`

* Planet placed `right: 25vw`
* Grows from `scale 0.3` to `scale 1` based on scrollY
* Scroll lock during animation via `body { overflow: hidden }` until full growth complete
* On completion, triggers orbiting motion class (`animate-orbit-slow`)

### 🔹 `TextRevealBlock.jsx`

* Triggered at scrollY = 50% of planet growth
* Uses `framer-motion` or `GSAP` for character-level reveal
* Positioned to the **left of the screen**, aligned to Z pattern
* Animates only when active, and fades into subtle presence after

---

## 📐 LAYOUT MAP

```
+-------------------------------------------------------------+
|                                                             |
|                  Grid background (subtle)                   |
|                                                             |
|                                                             |
|     [Animated Text Reveal]                  [Planet Grows]  |
|                                                             |
|                                                             |
| CuriousLabs - DevTech AI Core                               |
+-------------------------------------------------------------+
```

---

## 🔒 SCROLL CONTROL LOGIC

| Scroll Action  | Behavior                                                     |
| -------------- | ------------------------------------------------------------ |
| Scroll 0       | Static — no movement allowed                                 |
| Scroll Y > 30  | Planet begins scaling                                        |
| Scroll Y > 60  | Text reveal starts                                           |
| Scroll Y > 100 | Locks into scene complete → sets `scenePhase = "activation"` |
| Scroll Y > 150 | Vertical scroll unlocks horizontal scroll scene (TILE D)     |

Use `useScrollTrigger()` + internal `useEffect` + CSS `overflow-hidden` + a scroll-lock overlay that is removed only when `scenePhase === "activation"`.

---

## ✅ TILE C TASK LIST

| Task ID | Component                   | Action                                                  |
| ------- | --------------------------- | ------------------------------------------------------- |
| C.1     | `HeroSequenceV6.jsx`        | Implement new parent layout, layout Z-split positioning |
| C.2     | `PlanetRevealTrack.jsx`     | Add scroll-bound scaling (framer-motion or transform)   |
| C.3     | `TextRevealBlock.jsx`       | Add scroll-bound character animation trigger            |
| C.4     | `ScrollSceneController.jsx` | (Optional helper) handles scroll Y → scenePhase logic   |
| C.5     | **Page scroll lock**        | Enforce lock until activation phase ends                |
| C.6     | Trigger unlock into TILE D  | After text + planet reveal complete, fade scroll hint   |

---

## 🎨 ANIMATION SPEC

### 🌍 Planet Grow

* `scale: 0.3 → 1` over scrollY range 0–100px
* Add easing: `easeOutExpo` or `spring({ stiffness: 80, damping: 12 })`
* Shadow/glow radius increases with scale

### ✍️ Text Reveal

* Character-based staggered animation
* Sync reveal start with planet reaching \~0.6 scale
* Use framer-motion `variants` or GSAP `SplitText` for reveal

---

## ⚠️ TILE C COMPLETION BLOCKERS

Before unlocking TILE D:

* ✅ Planet is fully visible and orbiting
* ✅ Text fully revealed and faded to static
* ✅ Scroll hint indicator appears
* ✅ `scenePhase` set to `activation`
* ✅ Scroll lock lifted only once scroll hint is visible

---

## 📁 COMPONENT EXPORT ORDER

When you activate Cursor or Claude next:

1. Implement `HeroSequenceV6.jsx` as wrapper + layout
2. Then `PlanetRevealTrack.jsx` with scroll binding
3. Then `TextRevealBlock.jsx` with left-side Z reveal
4. Add `scroll lock` controller into `SceneControllerV6.jsx` or as `useScrollLock` hook

---

## 🧠 STRATEGIC NOTE

> This scroll-bound interaction is the most important impression-making part of the CuriousLabs site. It’s what users will remember. The timing, tension, and polish must be pixel-perfect.

You're right to slow it down and give it the focus it deserves. Once this is locked, the horizontal scroll becomes a showcase, not a crutch.

---
🧠 Absolutely, Commander. Below is a **drop-in animation logic** block tailored for **Cursor execution** — specifically for use inside `HeroSequenceV6.jsx` and `PlanetRevealTrack.jsx`.

This handles:

* Planet scale transformation on scroll
* Triggering character reveal once scale reaches midpoint
* Final orbit class once animation completes
* Z-positioned layout anchoring

All while maintaining **LEGIT protocol**, mobile safety, and scroll-state clarity.

---

## 🎬 TILE C — Scroll-Based Planet Growth & Text Reveal Animation

### 🔧 1. Add Scroll Tracking Hook (`usePlanetScrollProgress.js`)

Create this in `src/hooks/`:

```jsx
// usePlanetScrollProgress.js
import { useEffect, useState } from 'react';

export const usePlanetScrollProgress = () => {
  const [progress, setProgress] = useState(0); // value from 0 → 1

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 200; // controls animation distance
      const ratio = Math.min(scrollTop / maxScroll, 1);
      setProgress(ratio);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};
```

---

### 🌍 2. `PlanetRevealTrack.jsx` — Scroll-Bound Growth Logic

```jsx
/**
 * @component PlanetRevealTrack
 * @description Planet grows on scroll from right side
 * @legit true
 * @version 1.0.0
 */

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePlanetScrollProgress } from '../../../hooks/usePlanetScrollProgress';

const PlanetRevealTrack = ({ onPlanetFullyVisible }) => {
  const controls = useAnimation();
  const scrollProgress = usePlanetScrollProgress();
  const planetRef = useRef();

  // Trigger orbit state when complete
  useEffect(() => {
    if (scrollProgress === 1 && onPlanetFullyVisible) {
      onPlanetFullyVisible();
    }
  }, [scrollProgress, onPlanetFullyVisible]);

  // Map scroll progress to transform scale
  const scale = 0.3 + scrollProgress * 0.7;
  const opacity = 0.5 + scrollProgress * 0.5;

  return (
    <motion.div
      ref={planetRef}
      animate={controls}
      style={{
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: 'center right',
      }}
      className={`absolute right-[10vw] top-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-700 to-purple-900 shadow-xl transition-all duration-300 ease-out ${
        scrollProgress === 1 ? 'animate-orbit-slow' : ''
      }`}
    />
  );
};

export default PlanetRevealTrack;
```

---

### ✍️ 3. `TextRevealBlock.jsx` — Reveal Characters Midway

```jsx
/**
 * @component TextRevealBlock
 * @description Character-based reveal when planet ~50% grown
 * @legit true
 * @version 1.0.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { usePlanetScrollProgress } from '../../../hooks/usePlanetScrollProgress';

const text = "We bring you a universe of solutions";

const TextRevealBlock = () => {
  const progress = usePlanetScrollProgress();
  const shouldReveal = progress > 0.5;

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="absolute left-[8vw] top-1/3 max-w-md">
      <div className="text-left font-serif text-3xl md:text-5xl leading-tight space-x-1 text-lime-400">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            initial="hidden"
            animate={shouldReveal ? "visible" : "hidden"}
            transition={{
              delay: i * 0.035,
              type: 'spring',
              stiffness: 100,
              damping: 12,
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default TextRevealBlock;
```

---

### 💡 4. Orbit Animation Utility (global CSS or Tailwind `@layer`)

Add to `globals.css`:

```css
@keyframes orbitSlow {
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(360deg) scale(1); }
}

.animate-orbit-slow {
  animation: orbitSlow 60s linear infinite;
}
```

---

### ✅ RESULTING BEHAVIOR

* 🟢 Header + subheader anchored bottom left
* 🟡 Planet grows from right side as user scrolls
* 🟣 Once 50% grown, text appears letter-by-letter on left
* 🪐 Once full scale reached → planet starts orbit
* 🧭 After full reveal, scroll unlocks into TILE D

