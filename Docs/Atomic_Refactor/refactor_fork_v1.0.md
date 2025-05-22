// FRESH ROUTE: /src/pages/v6_atomic.jsx

/**
 * @page v6_atomic.jsx
 * @desc Atomic rebuild of CuriousLabs V6 homepage
 * @status Experimental – In development
 * @structure Flat scene-based components, no nested layout controllers
 * @source Forked from: v6_home.jsx
 */

import React from 'react';
import SceneControllerV6 from '../components/home/v6/SceneControllerV6';
import LayoutWrapper from '../components/home/v6/LayoutWrapper';
import CosmicBackgroundSystemV6 from '../components/home/v6/CosmicBackgroundSystemV6';
import NavBarCosmic from '../components/home/v6/NavBarCosmic';

// --- TEMPORARY: Scene imports will be replaced one by one ---
import HeroSequenceV6 from '../components/home/v6/HeroSequenceV6';
import HorizontalProductScrollV6 from '../components/home/v6/HorizontalProductScrollV6';
import ServicesOrbital from '../components/home/v6/ServicesOrbital';
import ProcessCards from '../components/home/v6/ProcessCards';
import ContactTerminal from '../components/home/v6/ContactTerminal';

const V6AtomicPage = () => {
  return (
    <SceneControllerV6>
      <LayoutWrapper>
        <CosmicBackgroundSystemV6 />
        <NavBarCosmic />

        {/* ATOMIC SCENES START HERE */}
        <HeroSequenceV6 />
        <HorizontalProductScrollV6 />
        <ServicesOrbital />
        <ProcessCards />
        <ContactTerminal />
        {/* ATOMIC SCENES END */}

      </LayoutWrapper>
    </SceneControllerV6>
  );
};

export default V6AtomicPage;


Perfect. We're now entering **Atomic Rebuild Phase 1** with clarity and command. Here's your **Cursor Task #1** to begin the rebuild with the most surgical and contained unit: `ProcessCards`.

---

## 🧠 CURSOR TASK: Atomize ProcessCards Section

### 🎯 Objective

Rebuild the **ProcessCards** section as a **standalone atomic component**, located at:

```
src/components/atomic/ProcessAtomic.jsx
```

It must be **self-contained**, **editable**, and **free from global context reliance**.

---

### 📦 Implementation Details

**You are NOT allowed to:**

* Use `SceneControllerV6`, `scenePhase`, or any shared animation triggers
* Import wrappers from other folders
* Layer nested controllers

**You MUST:**

* Inline all layout logic, data, and styling within `ProcessAtomic.jsx`
* Use TailwindCSS for layout and responsiveness
* Use `framer-motion` (locally scoped) for any needed static animations (but keep it minimal for now)
* Ensure this component renders independently and is visually clean at `min-h-screen`

---

### 💡 Expected Output

The final `ProcessAtomic.jsx` must:

* ✅ Contain all **four process steps**, styled and spaced as in the original
* ✅ Respect a **Z-pattern** if on desktop, and **stack** vertically on mobile
* ✅ Contain its own heading (e.g., `"Our Process"`) and short description
* ✅ Use **accent colors per step** (refer to legacy)
* ✅ Not animate on scroll — just static layout and transitions

---

### 🔍 Dev Instructions

1. **Create new component:**

   ```bash
   touch src/components/atomic/ProcessAtomic.jsx
   ```

2. **Render it** in:

   ```jsx
   // src/pages/v6_atomic.jsx
   import ProcessAtomic from '@/components/atomic/ProcessAtomic';
   ...
   <ProcessAtomic />
   ```

3. **Use this stub as content starter:**

   ```js
   const PROCESS_STEPS = [
     {
       id: 1,
       title: 'Plan',
       desc: 'Define the goal and map the system to achieve it.',
       color: 'text-lime-400',
     },
     {
       id: 2,
       title: 'Build',
       desc: 'Develop, test, and iterate until stable.',
       color: 'text-blue-400',
     },
     {
       id: 3,
       title: 'Integrate',
       desc: 'Connect parts and begin first usage loops.',
       color: 'text-cyan-400',
     },
     {
       id: 4,
       title: 'Deploy',
       desc: 'Launch confidently with visibility and fallback.',
       color: 'text-pink-400',
     },
   ];
   ```

---

### ✅ Validation

Component is considered complete when:

* It renders properly on all breakpoints
* No console errors appear
* All four steps display with spacing, color, and text
* No external scene or phase references are present
* It replaces the old `ProcessCards` visually and structurally

---

### 📘 Docs

Save a companion doc as:

```
Docs/home_v6/atomic/ProcessAtomic_contract.md
```

Include:

* File path
* Component name
* Props used (if any)
* Color strategy
* Layout notes
* Future: animation plan hook

---

### 💬 Dev Command Summary

```bash
mkdir -p src/components/atomic
touch src/components/atomic/ProcessAtomic.jsx
```

Then build the full atomic version and mount it in `v6_atomic.jsx`.

---

🧩 This is **Tile 1** in the Atomic Rebuild Track. Once done, we’ll validate and proceed with the next one.

Ping me with the result or any issues in layout, structure, or z-index behavior. Let’s keep momentum.
