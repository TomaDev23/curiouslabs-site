
<thinking>
After carefully reviewing the provided files, including the critical rules and guidelines, here is my analysis and plan for executing the jitter reduction phases:

Key Rules to Follow:
- Only implement what is explicitly requested in each phase
- Preserve existing code structure and architecture 
- Make minimal changes necessary to achieve each phase's goal
- Respect the existing asset management system and path references
- Adhere strictly to the documented tech stack and styling approach
- Do not add any enhancements or changes beyond the phase scope
- Analyze code thoroughly before making edits
- Request clarification if any part of a phase is unclear
- Stop and reassess immediately if user provides negative feedback

Phase Execution Plan:

Phase 1: Lock Animation Timings
- Standardize duration, delay, ease across all animated components 
- Use exact transition config provided, no variations
- Apply to HeroPortal, ServicesOrbital, Metrics, ProjectsLogbook
- Do not touch any other props, styles or logic

Phase 2: Breakpoint Refactor  
- Create useIsMobile hook in specified location
- Replace direct window.innerWidth usage with useIsMobile 
- Refactor ParticleField, SpaceCanvas, ServicesOrbital, HeroPortal
- Do not change any component's layout, order or non-breakpoint logic

Phase 3: Animation Sync & Stagger Unification
- Create animationTiming.js with provided config
- Replace hardcoded animation values with config references
- Eliminate randomized durations/delays 
- Ensure mobile and desktop have smooth, synced animations
- Do not change any animation types, styles or variants

Phase 4: Environmental Blur & GPU Load Harmonization  
- Create blurConfig.js utility with provided constants
- Refactor SpaceCanvas, HeroPortal, Metrics, ServicesOrbital
- Replace responsive blur Tailwind classes with blurConfig references
- Ensure glow/ambient effects use GPU-safe blur on mobile
- Do not modify any colors, opacities, layer order or non-blur styles

Validation & Tracking:
- After each phase, run Lighthouse audits on /test_canvas and / 
- Verify no layout shifts, repaint jitter or animation desyncs
- Ensure no unintended visual changes occurred
- Update documentation with each phase's changes
- Commit with descriptive message after each phase

If any step fails validation or receives negative user feedback, I will stop immediately, report the issue, and await further instructions. I will not attempt to self-correct or deviate from the explicit scope.

Please let me know if you would like me to proceed with this phased execution plan while adhering strictly to the provided rules and constraints.
</thinking>

Search files...
<search_quality_reflection>
The search results provide a good overview of the jitter reduction plan and its phases, including key details like:

- The specific components and files that need to be modified in each phase
- The types of changes needed (e.g. standardizing animation timings, refactoring breakpoint logic)
- Validation steps to confirm the fixes worked as intended
- Important rules and constraints to follow during implementation

It also covers some important meta aspects like:

- Simulating the changes first before making any actual code edits
- Stopping immediately if any step fails validation or gets negative user feedback
- Updating documentation after each phase
- Committing changes with descriptive messages

However, to fully map out an actionable plan, I think some additional information could still be helpful:

- The exact code changes needed in each target file (e.g. what CSS properties to modify)
- How to batch the edits to minimize iterations while still allowing frequent validation
- More specifics on the types of documentation updates required
- Clearer guidance on how to handle potential conflicts between the phases

So while this provides a solid foundation, I would probably do a bit more targeted searching and code analysis before finalizing a step-by-step execution plan. The overall phased approach seems sound, but ironing out those implementation details will be important.
</search_quality_reflection>

<search_quality_score>4</search_quality_score>

Search files...
<search_quality_reflection>
The additional search results provide more of the specific details needed to finalize a comprehensive execution plan for the jitter reduction phases. Key additions include:

- Exact code changes to make in each target file, like the CSS properties to modify for animation timings and the JSX structure to use for adding Suspense boundaries
- Suggestions for how to batch the edits, like doing typography changes first, then background optimizations
- More specifics on documentation, like updating the Site Map and including descriptive commit messages
- Guidance on handling potential conflicts, such as ensuring typography changes don't break animations and testing background optimizations with text overlays to verify readability

With these extra implementation details, I feel I now have enough context to put together a solid step-by-step plan that covers all the key aspects - the technical changes to make, the order to make them in, how to validate and document each phase, and how to mitigate risks.

The only piece I might still be missing is an estimate of how long each phase/batch of changes might take. But I could probably come up with rough timelines based on the scope of edits needed in each phase.

Overall, between the original search and these additional targeted results, I believe I have a sufficiently comprehensive view of the work required to smoothly execute this jitter reduction initiative while adhering to all the project constraints and best practices. The phased approach, validation steps, and risk mitigation strategies give me confidence it can be done in a controlled, incremental way.
</search_quality_reflection>

<search_quality_score>5</search_quality_score>

<result>
After thoroughly analyzing the jitter reduction plan, relevant files, and project rules, here is my comprehensive simulation and execution plan:

# 🎯 Jitter Reduction Execution Plan

## 🔒 Strict Adherence to Rules
- No deviations from documented specs
- Preserve existing code structure 
- Make minimal changes to achieve each phase's goal
- Use only approved tech stack and styling
- No enhancements beyond explicit scope
- Thoroughly analyze code before editing
- Stop and report immediately if any issues arise

## 📋 Phase Details & Simulation

### 🎨 Phase 1: Lock Animation Timings
- Standardize `duration`, `delay`, `ease` across all animated components 
- Use exact transition config provided
- Apply to `HeroPortal`, `ServicesOrbital`, `Metrics`, `ProjectsLogbook`
- No changes to other props, styles or logic

#### Key Code Changes
```js
// Standardize everywhere 
transition={{
  duration: 0.3,
  delay: 0.1,  
  ease: 'easeOut'
}}
```

### 🌐 Phase 2: Breakpoint Refactor
- Create `useIsMobile` hook in `src/hooks/useIsMobile.js`
- Replace direct `window.innerWidth` usage with `useIsMobile` 
- Refactor `ParticleField`, `SpaceCanvas`, `ServicesOrbital`, `HeroPortal`
- No changes to layout, order or non-breakpoint logic

#### Key Code Changes  
```js
// useIsMobile.js
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update(); // Initial
    window.addEventListener('resize', update); 
    return () => window.removeEventListener('resize', update);
  }, []);

  return isMobile;
};
```

### 🎬 Phase 3: Animation Sync
- Create `animationTiming.js` with provided config
- Replace hardcoded animation values with config references
- Eliminate randomized durations/delays 
- Ensure smooth, synced animations on all devices
- No changes to animation types, styles or variants

#### Key Code Changes
```js
// animationTiming.js
export const ANIMATION_CONFIG = {
  duration: 0.35,
  delay: 0.05,
  staggerChildren: 0.1,
  mobileStagger: 0.05  
};
```

### 🖌️ Phase 4: Blur & GPU Optimization
- Create `blurConfig.js` utility with provided constants
- Refactor `SpaceCanvas`, `HeroPortal`, `Metrics`, `ServicesOrbital` 
- Replace responsive blur classes with `blurConfig` references
- Ensure GPU-safe effects on mobile
- No changes to colors, opacities, layer order or non-blur styles

#### Key Code Changes
```js
// blurConfig.js
export const BLUR_CONFIG = {
  default: 'blur-md',
  soft: 'blur-sm',
  strong: 'blur-xl',
  gpuSafeMobile: 'blur-sm md:blur-md'
};
```

## 📋 Execution & Validation Plan

1. Implement Phase 1 (Animation Timings)
   - Commit with descriptive message
   - Run Lighthouse audits on `/test_canvas` and `/`
   - Verify no animation desyncs or visual changes
   - Update Site Map and other relevant docs

2. Implement Phase 2 (Breakpoint Refactor) 
   - Commit with descriptive message
   - Run Lighthouse audits on `/test_canvas` and `/`
   - Verify no layout shifts or responsiveness issues
   - Update Site Map and other relevant docs

3. Implement Phase 3 (Animation Sync)
   - Commit with descriptive message 
   - Run Lighthouse audits on `/test_canvas` and `/`
   - Verify smooth, synced animations on all devices
   - Update Site Map and other relevant docs

4. Implement Phase 4 (Blur & GPU Optimization)
   - Commit with descriptive message
   - Run Lighthouse audits on `/test_canvas` and `/` 
   - Verify no visual changes or performance regressions
   - Update Site Map and other relevant docs

5. Final Validation
   - Thorough manual testing of all modified components
   - Verify no unintended visual changes
   - Confirm Lighthouse scores remain stable
   - Get final approval from project lead

## ⚠️ Risk Mitigation
- Test typography changes don't break animations
- Verify background optimizations maintain readability 
- Ensure Suspense boundaries don't conflict with motion wrappers
- Avoid re-render loops from visibility triggers

## ⏰ Estimated Timeline
- Phase 1 (Animation Timings): 1-2 days
- Phase 2 (Breakpoint Refactor): 2-3 days 
- Phase 3 (Animation Sync): 1-2 days
- Phase 4 (Blur & GPU Optimization): 2-3 days
- Final Validation & Approval: 1 day

Total: 7-11 days

Please let me know if you would like me to proceed with executing this plan, or if you need any clarifications or adjustments before we begin. I'm confident that by following this phased approach, adhering to the project rules, and validating thoroughly, we can smoothly resolve the jitter issues and optimize the site's performance.
</result>


====================================================================================================================

**Plans by phase**

🧠 **Full diagnosis received, Commander. Here’s the strategic distillation — followed by a precision counteroffensive.**

---

## 🧩 TILE 6.2.D.V — **Jitter Isolation: Strategic Debrief & Action Plan**

### 🎯 **Root Cause Summary (Digest)**

| 🔍 Source                                            | ⚠️ Impact                                                |
| ---------------------------------------------------- | -------------------------------------------------------- |
| `isMobile` conditionals during render                | ❌ Triggers **recalculations** + re-renders per frame     |
| `useBreakpoint()` per component                      | ❌ Desyncs state + spawns **multiple event listeners**    |
| Tailwind blur/opacity differences across breakpoints | ⚠️ Triggers **layout shifts** and GPU churn              |
| Animation duration differences (mobile/desktop)      | ⚠️ Creates **stagger jitter** and motion race conditions |
| Particle and canvas re-generation based on media     | ❌ Causes **DOM jumps** and GPU re-paints                 |

---

## 🧠 TL;DR: Jitter isn’t from a *bug*. It’s death-by-a-thousand-reflows caused by **too many smart render-time conditionals**.

They interact *slightly differently* across components, triggering race conditions, layout shifts, and canvas repaints.

---

## 🔧 Recommended Countermeasures (Route of Attack)

### 🛡️ Phase 1: Core Safeguard – *Lock Animation Timings*

**🧬 Objective**: Unify `duration` and `delay` across breakpoints. No dynamic variance.
🔧 Change:

```js
// Standardize everywhere (example)
transition={{
  duration: 0.3,
  delay: 0.1,
  ease: 'easeOut'
}}
```

---

### 🌐 Phase 2: Breakpoint Refactor – *Centralize Screen Detection*

**🎯 Objective**: Use a **single shared context** (or top-level hook) for `isMobile`
⛔️ Do not compute window width *inside* each component
✅ Instead: compute it **once** and pass down (or wrap in context)

---

### 🧼 Phase 3: Blur Rebalance – *Reduce Tailwind Blur Shifts*

**🎯 Objective**: Eliminate major blur differences like `blur-sm` vs `blur-[80px]`
✅ Use fixed blur on mobile, *or* only adjust via class without transition
✅ Alternatively: **fade out** complex blur layers on mobile

---

### 🔃 Phase 4: Particle + Canvas Isolation

**🎯 Objective**: Prevent dynamic particle generation on render
✅ Generate on mount only, not per render
✅ Use stable `useMemo()` values with `[]` deps, or defer to layout effect once

---

### 🧪 Phase 5: Re-run `/test_canvas` With These Fixes

To verify each fix cleanly, we run:

* `/test_canvas` baseline test after each phase
* Real route (`/`) post-phase validation

---

## ✅ Immediate Actions

=====================================================================================================================

**phase 1**

Roger that, Commander. Here’s your ✨ **Phase 1: Lock Animation Timings Plan** — the gentlest, cleanest, most surgical fix we can apply now to **neutralize jitter at the animation level**, without touching layout, visuals, or interactivity.

---

# 🛡️ TILE 6.2.D.V.1 — **Animation Timing Unification (Phase 1)**

## 🎯 Objective

Eliminate **jitter caused by dynamic animation timing** by **standardizing `duration`, `delay`, and `ease`** across all animated components — **no more random or responsive values**.

This is a precision fix. It affects only how smoothly animations play out, not **what** or **how much** is animated.

---

## 📦 Target Components

We'll patch the following known motion-heavy files:

* `HeroPortal.jsx`
* `ServicesOrbital.jsx`
* `Metrics.jsx`
* `ProjectsLogbook.jsx`
* (optional) `SpaceCanvas.jsx` floating particles if any `framer-motion` transitions exist there

---

## ✅ Standard Timing Spec

We'll apply this **unified animation config**:

```js
transition={{
  duration: 0.3,
  delay: 0.1,
  ease: 'easeOut'
}}
```

If the component is staggered (e.g. cards in a group), we’ll use:

```js
transition={{
  staggerChildren: 0.1
}}
```

> ❌ No `isMobile` conditionals
> ❌ No `Math.random()` for delays
> ✅ Clean, synced animation flow

---

## 🧪 Before & After Simulation

### ❌ Before (jittery)

```js
transition={{
  duration: isMobile ? 1.2 + Math.random() * 1.8 : 1.5 + Math.random() * 2.5,
  delay: isMobile ? Math.random() * 0.5 : Math.random() * 1
}}
```

### ✅ After (smooth)

```js
transition={{
  duration: 0.3,
  delay: 0.1,
  ease: 'easeOut'
}}
```

---

## 🛠️ Cursor Task Block

Here's the full mission block for Cursor to execute:

---

### 🧩 CURSOR MISSION: TILE 6.2.D.V.1 – Animation Timing Unification

**Target Files:**

* `src/components/home/v4/HeroPortal.jsx`
* `src/components/home/v4/ServicesOrbital.jsx`
* `src/components/Metrics.jsx`
* `src/components/home/v4/ProjectsLogbook.jsx`
* (Optional) `src/components/home/v4/SpaceCanvas.jsx` if `motion.div` exists

**Instructions:**

1. 🔍 Locate all `transition={}` blocks in framer-motion components.
2. ✅ Replace all timing configs with:

```js
transition={{
  duration: 0.3,
  delay: 0.1,
  ease: 'easeOut'
}}
```

3. ✅ For `staggerChildren`, set:

```js
transition={{
  staggerChildren: 0.1
}}
```

4. ❌ Remove all `Math.random()` or `isMobile` logic in timing.
5. 🧼 Do **not** touch layout, classNames, or animation content.
6. ✅ Validate that all changes are limited to `transition` properties only.

---

========================================================================================================================

💥 Confirmed: Phase 1 (TILE 6.2.D.V.1) locked timing. Now we go deeper — time for **Phase 2**, the *hidden cost killer*: **Break Responsive Render Loops**.

---

# 🔧 TILE 6.2.D.V.2 — Responsive Logic Extraction

## 🎯 Objective

Eliminate re-render jitter caused by **inline mobile breakpoints**, `window.innerWidth` checks, and dynamic re-calculations on every render. Instead, **memoize + isolate once**, then inject clean results.

This prevents:

* 🌀 Particle regen loops
* 💣 Layout thrashing from dynamic DOM recalculations
* 🧠 Conflicting "isMobile" logic across components

---

## 👇 What We're Fixing

### 1. ❌ Inline Breakpoint Checks (Problematic)

```js
const isMobile = isClient && window.innerWidth < 768;
const starCount = isMobile ? 120 : 250;
```

**Why it hurts:** This logic runs during render, causing *frame lag*, even inside `useEffect` or `useMemo` if not wrapped properly.

---

## ✅ New Pattern: Use `useMemoBreakpoint()`

We'll create a **shared hook** to memoize the `isMobile` boolean **only once**:

### 📁 `src/hooks/useIsMobile.js`

```js
import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };
    update(); // Initial
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return isMobile;
};
```

Now all responsive components will import this:

```js
import { useIsMobile } from '@/hooks/useIsMobile';
const isMobile = useIsMobile();
```

---

## 📦 Target Components

We’ll refactor the following files:

* `src/components/ui/ParticleField.jsx`
* `src/components/home/v4/SpaceCanvas.jsx`
* `src/components/home/v4/ServicesOrbital.jsx`
* `src/components/home/v4/HeroPortal.jsx`

Remove:

* `window.innerWidth` calls
* Conditional animation timing
* Media query logic embedded inside component render

---

## 🛠️ Cursor Task Block

---

### 🧩 CURSOR MISSION: TILE 6.2.D.V.2 – Responsive Logic Isolation

**Create New Hook:**
📁 `src/hooks/useIsMobile.js`

```js
import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return isMobile;
};
```

---

**Refactor the following components:**

* `ParticleField.jsx`
* `SpaceCanvas.jsx`
* `ServicesOrbital.jsx`
* `HeroPortal.jsx`

**Instructions:**

1. 🔥 Remove any inline `window.innerWidth`, `matchMedia`, or direct screen size checks.
2. 📦 Replace with:

```js
import { useIsMobile } from '@/hooks/useIsMobile';
const isMobile = useIsMobile();
```

3. ✅ Use `isMobile` for all conditional rendering or particle count decisions.
4. 🧼 Avoid duplicate listeners — only use this hook.

---

Once this phase is done, we’ll rerun `/test_canvas` and `/` route to confirm performance lift and layout integrity.

💫 **Phase Confirmed:** Here's your next execution block — clean, scoped, and ready to ship.

---

# 🧩 TILE 6.2.D.V.2 — Responsive Logic Isolation

**🔍 Phase Objective:** Refactor all direct `window.innerWidth` logic into a **unified hook** to eliminate render-triggered jitter and layout thrashing.

---

## ✅ Deliverables

### 1. **Create Shared Hook**

📄 `src/hooks/useIsMobile.js`

```js
import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };
    update(); // Initial
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return isMobile;
};
```

---

### 2. **Refactor All Usage Sites**

#### 🔁 Replace all `window.innerWidth` or direct screen size checks in:

* `src/components/ui/ParticleField.jsx`
* `src/components/home/v4/SpaceCanvas.jsx`
* `src/components/home/v4/ServicesOrbital.jsx`
* `src/components/home/v4/HeroPortal.jsx`

#### ✅ Use the hook like this:

```js
import { useIsMobile } from '@/hooks/useIsMobile';
const isMobile = useIsMobile();
```

Apply `isMobile` in place of any screen-width-dependent logic for:

* Particle count
* Star generation
* Animation speed/duration
* Responsive visibility toggles

---

## 🚫 Do NOT

* ❌ Leave any `window.innerWidth` checks behind
* ❌ Recreate the listener inside components
* ❌ Modify layout or component order

This is *only* about standardizing screen size detection.

---

## 🧪 Validation After Implementation

1. Reload `/test_canvas`
2. Reload `/`
3. Confirm no visible jitter or animation desync
4. Confirm blur effects and particle density behave correctly on mobile vs desktop
5. Lighthouse score must remain stable

---

## 🟢 STATUS: PHASE 2 READY FOR EXECUTION

Cursor, proceed with TILE 6.2.D.V.2 and return once complete.


========================================================================================================================

🎯 **Roger that, Commander — launching Phase 3 cleanly and precisely.** This step narrows in on the *animation timing and sequencing race conditions* we've identified as jitter triggers.

---

# 🧩 TILE 6.2.D.V.3 — Animation Sync & Stagger Unification

**🧠 Phase Objective:** Standardize all animation timing, delay, and stagger values across components to prevent desynchronized transitions and race conditions — especially on mobile.

---

## 🔍 Target Problem

We're currently using:

* Randomized `delay` and `duration` values (e.g. `Math.random() * 1`)
* Conditional values per device (`isMobile ? x : y`)
* Inconsistent `staggerChildren` configs across components

This causes:

* Colliding animations across different components
* Irregular perception of smoothness
* Micro-jitters as layout shifts and paints collide

---

## ✅ Execution Plan

### 1. **Create Shared Animation Config File**

📄 `src/utils/animationTiming.js`

```js
export const ANIMATION_CONFIG = {
  duration: 0.35,
  delay: 0.05,
  staggerChildren: 0.1,
  mobileStagger: 0.05
};
```

---

### 2. **Refactor Animation Variants**

#### Apply to:

* `HeroPortal.jsx`
* `ServicesOrbital.jsx`
* `Metrics.jsx`
* `ProjectsLogbook.jsx`

#### Example Fix:

```js
import { ANIMATION_CONFIG } from '@/utils/animationTiming';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration,
      staggerChildren: isMobile ? ANIMATION_CONFIG.mobileStagger : ANIMATION_CONFIG.staggerChildren
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: ANIMATION_CONFIG.duration }
  }
};
```

#### Replace any raw random durations like this:

```js
transition={{ duration: ANIMATION_CONFIG.duration, delay: ANIMATION_CONFIG.delay }}
```

---

### 3. **Eliminate Animation Race Conditions**

* Remove all `Math.random()` usage from `duration` or `delay`
* Use the shared config for all animated components
* If unique timing needed (e.g., intro), handle via prop injection, not hardcoded branches

---

## 🧪 Validation Steps

1. 🔁 Reload `/` and `/test_canvas`
2. 📹 Use Chrome Performance tab — confirm consistent animation frames
3. ✅ Ensure all animated elements enter in harmony (not staggered awkwardly)
4. 📱 Confirm mobile and desktop both have smooth fade+lift sequences

---

## 📦 Cursor Mission Block

> **TILE 6.2.D.V.3 — ANIMATION SYNC UNIFICATION**

**Scope:**

* Create `animationTiming.js`
* Refactor variants + transitions in:

  * `HeroPortal.jsx`
  * `ServicesOrbital.jsx`
  * `Metrics.jsx`
  * `ProjectsLogbook.jsx`
* Remove all `Math.random()` usage for animation timing
* Apply consistent `duration`, `delay`, and `staggerChildren`

**DO NOT:**

* Change layout
* Adjust visual design
* Introduce new animation types

🎯 Focus purely on timing harmony and standardization.
Cursor, proceed when ready and return with report.



========================================================================================================================

🔥 Let's move to **Phase 4** — the final pass to stabilize all environmental triggers that could cause repaints or layout instability!

---

# 🧩 TILE 6.2.D.V.4 — Environmental Blur & GPU Load Harmonization

**🎯 Phase Goal:** Normalize GPU-heavy elements like blur effects and backdrop filters across all components and breakpoints — to avoid layout thrashing or paint jitter, especially on mobile.

---

## 🔍 Problem Overview

Recent audits revealed:

* **Responsive blur intensities** (`blur-sm` vs `blur-[80px]`)
* **Mobile-specific opacity/blur shifts** in `SpaceCanvas`, `HeroPortal`, `Metrics`
* These cause GPU overdraw + inconsistent frame times

---

## ✅ Execution Plan

### 1. **Audit High-Impact Blur Elements**

Target files:

* `SpaceCanvas.jsx` — cosmic blobs, star fields
* `HeroPortal.jsx` — intro glow/flare zones
* `Metrics.jsx` — background nebula
* `ServicesOrbital.jsx` — inner ambient effects

### 2. **Create Unified Utility for Blur Classes**

📄 `src/utils/blurConfig.js`

```js
export const BLUR_CONFIG = {
  default: 'blur-md',
  soft: 'blur-sm',
  strong: 'blur-xl',
  gpuSafeMobile: 'blur-sm md:blur-md'
};
```

Use like:

```jsx
<div className={`absolute ... ${BLUR_CONFIG.gpuSafeMobile}`}></div>
```

### 3. **Refactor Tailwind Classes to Avoid Transition Jumps**

Avoid:

```html
<div className="blur-sm md:blur-[80px] opacity-20 md:opacity-40">
```

Replace with:

```jsx
<div className={`opacity-20 md:opacity-30 ${BLUR_CONFIG.gpuSafeMobile}`} />
```

This prevents dramatic blur recalculations on breakpoint switch, which can cause layout thrashing.

---

## 🧪 Validation Checklist

| ✅ Check           | Description                                         |
| ----------------- | --------------------------------------------------- |
| GPU Overdraw      | Reduced on mobile (check via DevTools → Layers tab) |
| Paint Stability   | No visual flashing or repaint jitter                |
| Consistent Blur   | Components use shared `BLUR_CONFIG` utility         |
| Mobile Smoothness | No stutter when scrolling or loading                |

---

## 📦 Cursor Mission Block

> **TILE 6.2.D.V.4 — GPU-SAFE BLUR + BACKDROP STABILIZATION**

**Scope:**

* Create `blurConfig.js` in `utils/`
* Refactor blur-related Tailwind classes in:

  * `SpaceCanvas.jsx`
  * `HeroPortal.jsx`
  * `Metrics.jsx`
  * `ServicesOrbital.jsx`
* Replace responsive blur classes with GPU-safe utility constants
* Ensure all glow zones, ambient gradients, and nebula layers follow new config

🧠 *This phase is about controlling GPU pressure — not about visuals. Make no design changes. Only refactor blur and filter class logic for runtime stability.*

Cursor, you're green-lit to begin 🟢 — report back with stability results.


========================================================================================================================

========================================================================================================================