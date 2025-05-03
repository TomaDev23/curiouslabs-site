// 🚨 Cursor Mission: TILE V4-HOME-RECON
// Description: Validate /dev/v4-cosmic homepage build vs full Claude plan
// Then import missing modules from live HOME to complete a full A-Z structure before routing

export const CURSOR_MISSION_V4_HOME_RECON = {
  id: "TILE_V4-HOME-RECON",
  status: "🟡 In Progress",

  objectives: [
    "✅ Deep recon of /dev/v4-cosmic/index.jsx",
    "✅ Compare all mounted modules vs original Claude plan (new_plan_v1.0.md)",
    "✅ Cross-check structure, ordering, transitions, and effects",
    "✅ List all missing or unused Claude blocks",
    "✅ Prepare for stitching in missing modules from current HOME (live build)"
  ],

  step_1: {
    label: "🧠 Parse Claude Plan",
    action: "Extract ordered section list from new_plan_v1.0.md for homepage",
    file: "Docs/planning/Site_v2/HomePageUpgrade_v2/new_plan_v1.0.md"
  },

  step_2: {
    label: "🔍 Deep Recon of v4-cosmic",
    action: "Audit /dev/v4-cosmic/index.jsx",
    tasks: [
      "Map currently mounted modules",
      "Cross-compare order and presence with Claude’s plan",
      "Note any style/effect/animation deviations",
      "Confirm which Claude components are present in /components/home/v4",
      "Flag commented or missing modules"
    ]
  },
,
    "❌ Do NOT modify modal logic or card internals",
    "✅ Focus purely on structure, validation, and full visual presence",
    "✅ Use only Tailwind + Framer Motion (no custom CSS)"
  ],

  completion_criteria: [
    "✅ All Claude sections verified as present or listed as missing",
    "✅ Imported SCS blocks cleanly mounted with minimal logic drift",
    "✅ Full scroll from top to bottom produces a coherent, full homepage",
    "✅ Animation readiness confirmed"
  ]
};


=========================================================================================================================


Absolutely. Here's your full mission statement, refined and presented with precision and mutual respect — clear to both **Commander** and **Cursor**, with zero ambiguity:

---

## 🧭 MISSION: V4-HOME-RECON

### 🎯 Mission Objective:

Conduct a **full structural recon** of the new `/dev/v4-cosmic` build by comparing it against the **original Claude plan** (`new_plan_v1.0.md`) — **module by module**, **transition by transition**, to verify integrity and completeness of the homepage build.

---

### 🔬 Scope of Work:

#### 1️⃣ Full Recon: `v4-cosmic/index.jsx` vs. `new_plan_v1.0.md`

* Parse the complete **Claude homepage blueprint** (`new_plan_v1.0.md`)
* Analyze the existing build at `/dev/v4-cosmic/index.jsx`
* Perform a **section-by-section** diff:

  * Which blocks are mounted?
  * Which are **missing**, **unwired**, or **incomplete**?
  * Are visual **transitions**, **ordering**, and **styling** aligned with the spec?

#### 2️⃣ Audit for Leftover Assets & Unused Modules

* Scan `components/home/v4` for:

  * Unmounted fragments
  * Commented-out components
  * Blocks referenced in Claude’s plan but not stitched into `index.jsx`

#### 3️⃣ Identify Non-Claude Additions We Want

* Log missing items that may not be part of Claude’s plan but are **required for completion**, such as:

  * The **footer**
  * Color boxes / metrics blocks
  * Grok-inspired modules we previously built

> 🎯 The purpose: zero in on *what’s missing*, *what’s mounted*, and *what still needs stitching* — no illusions, no drifting.

---

### 🛑 Out of Scope for This Mission:

> These will only occur **after** recon is complete:

* No routing edits
* No meta tags, modals, or scroll sync work
* No content edits or animation polishing
* No stitching of legacy modules (yet)

---

### 🗂 Reference Paths:

* 📍 Claude Master Plan:
  `C:/website_build/Docs/planning/Site_v2/HomePageUpgrade_v2/new_plan_v1.0.md`

* 📍 Target Build File:
  `/dev/v4-cosmic/index.jsx`

* 📍 Component Source Directory:
  `src/components/home/v4/`

* 🔗 Live Home Page for Contextual Orientation Only:
  [https://curiouslabs-site.vercel.app/](https://curiouslabs-site.vercel.app/)

---

### 🧠 Operator Clarification:

> The user already knows the big picture. This mission exists because **you don’t**.
> You must now catch up, compare, and report precisely what’s real, what’s not, and what’s next.

---

Would you like me to dispatch this mission to Cursor now?
