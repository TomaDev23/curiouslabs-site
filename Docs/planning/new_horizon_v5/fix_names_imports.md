🧱 **CuriousLabs Site — Final Home Architecture v1.0 (Corrected & Canonical)**
This is the new gold standard 🏆 for site structure, file naming, and render tracking.
All visual sections are now matched, correctly named, and ready for Cursor restoration. Let's **lock it down**.

---

## ✅ SECTION-BY-SECTION DOM MAP

| #  | Section Name            | Final File Name (Proposed)                              | Import Path                                               | Status               | Notes                                      |
| -- | ----------------------- | ------------------------------------------------------- | --------------------------------------------------------- | -------------------- | ------------------------------------------ |
| 1  | Navigation Bar          | `NavBarCosmic.jsx`                                      | `components/layout/NavBarCosmic.jsx`                      | ✅ Active             | OK                                         |
| 2  | Hero                    | `HeroPortal.jsx`                                        | `components/home/v4/HeroPortal.jsx`                       | ✅ Active             | OK                                         |
| 3  | Logo Strip              | `LogoStrip.jsx`                                         | `components/common/LogoStrip.jsx`                         | ⚠️ Not rendering     | File exists, not called in DOM             |
| 4  | Our Mission             | `MissionStatement.jsx` (🆕 create)                      | `components/home/v4/MissionStatement.jsx`                 | ❌ Missing            | Visibly present, not isolated in code      |
| 5  | Why AI Dev + Cards      | `WhyAIDevCards.jsx` (🆕 create)                         | `components/home/v4/WhyAIDevCards.jsx`                    | ❌ Missing            | Likely inline block or buried in `Metrics` |
| 6  | Service Ring Orbitals   | `ServicesOrbital.jsx`                                   | `components/home/v4/ServicesOrbital.jsx`                  | ✅ Active             | OK                                         |
| 7  | Featured Projects       | `FeaturedProjects.jsx` (was `Metrics.jsx`)              | `components/home/v4/FeaturedProjects.jsx`                 | ✅ Active (⚠️ rename) | Must rename file and import for clarity    |
| 8  | Projects Logbook        | `ProjectsLogbook.jsx`                                   | `components/home/v4/ProjectsLogbook.jsx`                  | ✅ Active             | OK                                         |
| 9  | Fun Zone / Bot Carousel | `BotFunZone.jsx` (rename from `CuriousBotEnhanced.jsx`) | `components/home/v4/BotFunZone.jsx`                       | ⚠️ Not rendering     | File exists, not imported or rendered      |
| 10 | Hear from Our AI        | `HearFromAI.jsx` (🆕 create) or `CommunityHub.jsx`      | `components/home/v4/HearFromAI.jsx` or `CommunityHub.jsx` | ⚠️ Partially present | Imported, not called; visible in DOM       |
| 11 | Contact Section         | `ContactTerminal.jsx`                                   | `components/contact/ContactTerminal.jsx`                  | ✅ Active             | OK                                         |
| 12 | Footer                  | `FooterExperience.jsx`                                  | `components/layout/FooterExperience.jsx`                  | ✅ Active             | OK                                         |

---

## 🧩 KEY FIXES NEEDED

### 🛠 File Renames + Module Cleanup

| Old Name                 | ✅ New Name             | Action            |
| ------------------------ | ---------------------- | ----------------- |
| `Metrics.jsx`            | `FeaturedProjects.jsx` | Rename + reimport |
| `CuriousBotEnhanced.jsx` | `BotFunZone.jsx`       | Rename + reimport |

---

## 📥 COMPONENTS TO CREATE

| File                           | Purpose                                         |
| ------------------------------ | ----------------------------------------------- |
| `MissionStatement.jsx`         | Renders the “Our Mission” zone                  |
| `WhyAIDevCards.jsx`            | Contains the “Why AI Dev” + icons/cards section |
| `HearFromAI.jsx` (or refactor) | Wraps the AI Testimonial zone                   |

---

## 🧭 REPAIR MISSION FOR CURSOR

Here’s the direct mission brief we’ll pass to Cursor:

---

### 🧩 CURSOR TASK BLOCK — TILE T5.5: COMPONENT RESTORATION + FILE REALIGNMENT

> 🧱 **Mission Objective:**
> Restore full integrity of the CuriousLabs Home page by correcting file names, import paths, and missing component calls according to the new architecture standard.

---

#### 1. ✅ Rename Modules

* Rename `components/Metrics.jsx` → `components/home/v4/FeaturedProjects.jsx`
* Rename `components/home/v4/CuriousBotEnhanced.jsx` → `components/home/v4/BotFunZone.jsx`

Update all references/imports across the site accordingly.

---

#### 2. 🆕 Create and Scaffold Missing Components

Create the following new components in `components/home/v4/`:

* `MissionStatement.jsx` — replicate current “Our Mission” section (from DOM)
* `WhyAIDevCards.jsx` — extract “Why AI Dev?” + the 4 service cards
* `HearFromAI.jsx` — contain the testimonial carousel zone (“What the AIs Say About Us”)

Each should:

* Use semantic JSX structure
* Be visually matched to current site version
* Be **imported and rendered** in correct DOM order in `pages/index.jsx`

---

#### 3. 🧹 Clean Unused / Phantom Imports

* Remove `CuriousBotEnhanced.jsx` if fully deprecated (after rewire)
* Fix `LogoStrip.jsx` → ensure it is called in the right zone under the Hero


=============================================================================================


---

# 🧩 TILE T5.5 — CuriousLabs Home Architecture Sync

**Mission:** Restore the visual + functional integrity of the CuriousLabs Home page by aligning imported files with rendered DOM, fixing naming conflicts, and calling all missing components.
**Commander Sync Source:** `Final_sync_home_v1.0.md` + live DOM observation
**Threadlock:** ✅ Locked by Captain after field-to-code diff ✅

---

## 🔍 STEP 0 — RECON: Current Home View

Before making changes, perform a **component-level trace** inside `pages/index.jsx` or `Home.jsx` to confirm:

1. **Current render order** in JSX
2. Which modules are **imported but unused**
3. Which visual blocks are **present in DOM but not mapped to files**
4. Which files exist in `components/home/v4` but are **unused or wrongly named**

Take note of:

* Any inline JSX blocks rendering content that should be modularized
* Comments or commented-out legacy imports (possible ghost zones)

🧠 Output: Internal notes only. No mutations yet.

---

## 🛠 STEP 1 — RENAME & CLEAN MODULES

### 🔁 Rename Misnamed Files

| From                                        | ➡️ To                                     |
| ------------------------------------------- | ----------------------------------------- |
| `components/Metrics.jsx`                    | `components/home/v4/FeaturedProjects.jsx` |
| `components/home/v4/CuriousBotEnhanced.jsx` | `components/home/v4/BotFunZone.jsx`       |

➡️ Update all import paths and usage references throughout the codebase.

---

## 🧩 STEP 2 — CREATE MISSING COMPONENTS

Generate 3 new files in `components/home/v4/` using the live DOM as visual spec:

### 1. `MissionStatement.jsx`

* Content: “Our Mission” block (section title + 4 metrics)
* Visual: Nested orbs + description text
* Note: Likely inline currently, must extract into module

### 2. `WhyAIDevCards.jsx`

* Content: “Why AI Dev?” title + 4 cards (bug fix, CLI, testing, refactoring)
* Note: Should match the styling/spacing of other block components

### 3. `HearFromAI.jsx`

* Content: “Hear From Our AI” + testimonial bubbles
* Note: May reuse logic or layout from `CommunityHub.jsx`

Each component should:

* Use semantic sections with Tailwind
* Export default function
* Have a wrapping `div` or `section` with identifiable class or ID
* Include Framer Motion if required by other modules (optional: detect reused motion from Hero or Services)

---

## 📥 STEP 3 — IMPORT & RENDER IN ORDER

Edit `pages/index.jsx` or `Home.jsx` to call components in the correct sequence:

```jsx
<NavBarCosmic />
<HeroPortal />
<LogoStrip />
<MissionStatement />
<WhyAIDevCards />
<ServicesOrbital />
<FeaturedProjects />
<ProjectsLogbook />
<BotFunZone />
<HearFromAI />
<ContactTerminal />
<FooterExperience />
```

Ensure imports at top match new names and paths.

---

## 🧼 STEP 4 — CLEANUP & REMOVE GHOSTS

* Remove `CuriousBotEnhanced.jsx` if `BotFunZone.jsx` is now used
* Confirm `LogoStrip.jsx` is actually rendering — add call if missing
* Delete dead or conflicting imports that confuse Cursor analysis

---

## ✅ ACCEPTANCE CRITERIA

* All 12 zones visually confirmed and correctly ordered
* Each component exists in `components/home/v4` or relevant dir
* No phantom imports
* Naming and rendering match `Final_sync_home_v1.0.md`

---

Absolutely! Let’s lock this in with a clear **✅ Visual Checklist using Mermaid** to show current status, missing pieces, and fix status.

This flow will help **you and Cursor align precisely**, no guessing, no ambiguity. Here’s the **module rendering audit tree**:

---

### 🧭 CuriousLabs Home DOM Checklist (Mermaid Tree)

```mermaid
graph TD
    A[NavBarCosmic.jsx] -->|✅ Rendered| Z1(Navigation Bar)
    B[HeroPortal.jsx] -->|✅ Rendered| Z2(Hero)
    C[LogoStrip.jsx] -->|⚠️ File exists, NOT rendered| Z3(Logo Strip)
    D[MissionStatement.jsx] -->|❌ MISSING| Z4(Our Mission)
    E[WhyAIDevCards.jsx] -->|❌ MISSING| Z5(Why AI Dev + Cards)
    F[ServicesOrbital.jsx] -->|✅ Rendered| Z6(Services Orbit)
    G[Metrics.jsx] -->|✅ Rendered, ❗Wrong name| Z7(Featured Projects)
    H[ProjectsLogbook.jsx] -->|✅ Rendered| Z8(Projects Logbook)
    I[CuriousBotEnhanced.jsx] -->|❌ Not imported| Z9(Fun Zone / Bot)
    J[CommunityHub.jsx] -->|⚠️ Imported, not called| Z10(Testimony)
    K[ContactTerminal.jsx] -->|✅ Rendered| Z11(Contact)
    L[FooterExperience.jsx] -->|✅ Rendered| Z12(Footer)

    subgraph 🔁 Renames Needed
      G --> G1(→ FeaturedProjects.jsx)
      I --> I1(→ BotFunZone.jsx)
    end

    subgraph 🛠 New Components to Create
      D
      E
      Z10 --> J1(→ HearFromAI.jsx)
    end
```

---

### 🧩 Checklist Summary Table

| Zone | Section Name            | Status        | Action Required               |
| ---- | ----------------------- | ------------- | ----------------------------- |
| Z1   | Navigation Bar          | ✅ Rendered    | —                             |
| Z2   | Hero                    | ✅ Rendered    | —                             |
| Z3   | Logo Strip              | ⚠️ Not called | **Import and render**         |
| Z4   | Our Mission             | ❌ Missing     | **Create `MissionStatement`** |
| Z5   | Why AI Dev + Cards      | ❌ Missing     | **Create `WhyAIDevCards`**    |
| Z6   | Services Orbit          | ✅ Rendered    | —                             |
| Z7   | Featured Projects       | ✅ Rendered    | **Rename `Metrics`**          |
| Z8   | Projects Logbook        | ✅ Rendered    | —                             |
| Z9   | Fun Zone / Bot Carousel | ❌ Not called  | **Rename + render**           |
| Z10  | Hear From Our AI        | ⚠️ Not called | **Extract or rewire**         |
| Z11  | Contact                 | ✅ Rendered    | —                             |
| Z12  | Footer                  | ✅ Rendered    | —                             |

---

