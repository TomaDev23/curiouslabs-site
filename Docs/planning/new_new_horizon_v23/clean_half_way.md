**Acknowledged, Commander.**

## 🔖 TILE B.SND.1 — Scroll Sim + Visual Test Ground

### 🛰️ **Cursor Simulation & Work Plan**

---

### **1. Recon: Current State**

- `/background-sandbox` currently mounts `JourneyV2` (not a true visual sandbox).
- No scroll simulation, no scene switching, no HUD, and no enforced CuriousLabs color theory.
- Backdrop components (`*Backdrop.jsx`) may not all accept a `progress` prop or be ready for dynamic mounting.

---

### **2. Work Plan Simulation**

#### **Step 1: Simulated Scroll Progress**
- Add local `progress` state (0–1 float).
- Use a scrollable container or `onWheel`/touch events to update `progress`.
- Clamp and debounce updates for smoothness.
- Pass `progress` as a prop to the active backdrop.

#### **Step 2: Scene Selection UI**
- Add a `<select>` or button group for:
  - DormantBackdrop
  - AwakeningBackdrop
  - CosmicRevealBackdrop
  - CosmicFlightBackdrop
- Store `activeScene` in state.
- Dynamically mount the selected backdrop, passing `progress`.

#### **Step 3: Color Theory Patch**
- For each backdrop:
  - Replace inline/JS radial gradients with Tailwind `bg-gradient-to-tr`, `from-slate-900 via-indigo-900 to-purple-800`, etc.
  - Add Tailwind `blur`, `opacity`, and `shadow` classes for glow.
  - Remove any legacy color clashes or hardcoded backgrounds.

#### **Step 4: Developer HUD**
- Add a fixed, bottom-right HUD:
  - Shows current `progress` (as %)
  - Shows active backdrop name
  - Toggles for visual effects (blur, aurora, nebula) if relevant
- Style with Tailwind for minimal, semi-transparent look.

#### **Step 5: Cleanup & Compliance**
- Ensure no references to `test_canvas.jsx`.
- Confirm `/background-sandbox` route is clean and LEGIT-compliant.
- All code must follow LEGIT contract: metadata, fallback, mobile, etc.

---

### **3. Simulation: User Flow**

- User lands on `/background-sandbox`.
- Sees a dropdown or buttons to select a scene.
- Scrolls (or drags) to simulate progress; visuals update in real time.
- Can toggle visual effects via HUD.
- Visuals match or exceed CuriousLabs homepage polish.

---

### **4. Acceptance Criteria**

- Route builds and loads with no errors.
- Scene is switchable via UI.
- Scroll progress is smooth and reactive.
- Visuals are on-brand and high quality.
- HUD is present and functional.

---

**Commander, this is the full work plan for TILE B.SND.1.**  
Ready for your go/no-go to execute, or to review/modify the plan before Cursor proceeds.
