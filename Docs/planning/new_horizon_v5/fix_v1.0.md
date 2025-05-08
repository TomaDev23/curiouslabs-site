
# Mission Recon: Site Component Structure Audit

I'll conduct a thorough recon of the component architecture to identify misalignments between the documented structure and actual codebase.

Ran tool
Let's examine the main home page file to understand the current component imports and structure:

Read file: src/pages/index.jsx
Let's look at the v4 cosmic home implementation since the requirements mention components in `home/v4`:

Read file: src/pages/dev_v4_cosmic.jsx
Let's look at the remaining part of that file:

Read file: src/pages/dev_v4_cosmic.jsx
Now let's check the structure of the components/home/v4 directory:

Ran tool
Let's check for the Metrics component:

Ran tool
Let's check the FeaturedProjects we're supposed to rename Metrics to:

Ran tool
Let's check the Metrics component content to understand what it does:

Read file: src/components/Metrics.jsx
Let's check the LogoStrip component:

Read file: src/components/LogoStrip.jsx
Let's check what ServicesFloatLayer does since that might be related to the missing WhyAIDevCards component:

Ran tool
Now let's check if we can find any CommunityHub and AITestimonials components:

Read file: src/components/home/v4/CommunityHub.jsx

Read file: src/components/home/v4/AITestimonials.jsx
Based on a comprehensive recon of the codebase, here are my findings regarding the current component architecture versus the requirements in the architecture sync document:

# Recon Report: Component Architecture Audit

## 1. Current State Assessment

I've thoroughly examined:
- `src/pages/index.jsx` - Main home page
- `src/pages/dev_v4_cosmic.jsx` - The development version with v4 components
- `src/components/home/v4/` directory - Where the cosmic components reside
- `src/components/` - Root components including Metrics and LogoStrip

### Structure Findings:

1. **Main Page Structure**
   - `src/pages/index.jsx` appears to use a completely different component structure from what's specified in the architecture sync document
   - The core route for development seems to be `src/pages/dev_v4_cosmic.jsx`, which uses many of the v4 components mentioned

2. **Component Existence and Status**

| Component | Status | Findings |
|-----------|--------|----------|
| NavBarCosmic.jsx | ✅ Exists | Located in src/components/home/v4/ |
| HeroPortal.jsx | ✅ Exists | Located in src/components/home/v4/ |
| LogoStrip.jsx | ✅ Exists but not rendered | Located in src/components/, not being used in dev_v4_cosmic.jsx |
| MissionStatement.jsx | ❌ Missing | Similar functionality may be in AboutMission.jsx |
| WhyAIDevCards.jsx | ❌ Missing | Similar functionality exists in ServicesFloatLayer.jsx |
| ServicesOrbital.jsx | ✅ Exists | Located in src/components/home/v4/ |
| Metrics.jsx | ✅ Exists but should be renamed | Located in src/components/, displays mission metrics |
| ProjectsLogbook.jsx | ✅ Exists | Located in src/components/home/v4/ |
| CuriousBotEnhanced.jsx | ✅ Exists, needs rename | Located in src/components/home/v4/ |
| CommunityHub.jsx/HearFromAI.jsx | ✅ Partially present | CommunityHub.jsx exists, AITestimonials.jsx is likely the HearFromAI component |
| ContactTerminal.jsx | ✅ Exists | Located in src/components/home/v4/ |
| FooterExperience.jsx | ✅ Exists | Located in src/components/home/v4/ |

3. **File Naming and Import Discrepancies**
   - `Metrics.jsx` appears to be the component that needs to be renamed to `FeaturedProjects.jsx`
   - `CuriousBotEnhanced.jsx` needs to be renamed to `BotFunZone.jsx`
   - The dev_v4_cosmic.jsx file imports both CommunityHub and AITestimonials - one of these may be the "HearFromAI" component

4. **Missing Components**
   - No `MissionStatement.jsx` - similar functionality may exist in `AboutMission.jsx`
   - No `WhyAIDevCards.jsx` - similar functionality exists in `ServicesFloatLayer.jsx`
   - No specific `HearFromAI.jsx` - but AITestimonials.jsx exists with similar functionality

## 2. Current vs. Required Structure Analysis

The key issues are:

1. **Naming Misalignment**: 
   - `Metrics.jsx` should be renamed to `FeaturedProjects.jsx` and moved to the correct location
   - `CuriousBotEnhanced.jsx` should be renamed to `BotFunZone.jsx`

2. **Missing Components**: 
   - `MissionStatement.jsx` needs to be created (could adapt from AboutMission.jsx)
   - `WhyAIDevCards.jsx` needs to be created (could adapt from ServicesFloatLayer.jsx)
   - `HearFromAI.jsx` needs to be created or adapted from AITestimonials.jsx

3. **Unused Components**:
   - `LogoStrip.jsx` exists but isn't being properly imported/rendered in the component hierarchy

4. **Component Order**: 
   - The current rendering order in dev_v4_cosmic.jsx doesn't match the requested order in the architecture document

## 3. Path Forward

Based on my analysis, here's the recommended plan:

1. **Rename existing components**:
   - Rename `src/components/Metrics.jsx` → `src/components/home/v4/FeaturedProjects.jsx`
   - Rename `src/components/home/v4/CuriousBotEnhanced.jsx` → `src/components/home/v4/BotFunZone.jsx`

2. **Create missing components**:
   - Create `src/components/home/v4/MissionStatement.jsx` (adapt from AboutMission.jsx)
   - Create `src/components/home/v4/WhyAIDevCards.jsx` (adapt from ServicesFloatLayer.jsx)
   - Evaluate whether AITestimonials.jsx should be renamed to HearFromAI.jsx or if a new component is needed

3. **Fix import/render issues**:
   - Ensure LogoStrip.jsx is imported and rendered in the correct location
   - Update all references to renamed components throughout the codebase

4. **Update component rendering order**:
   - Modify the component order in the main page to match the requested sequence

🌊 **Commander, I’ve plunged to full ocean-depth.**
Below is the **canon-correct mission block** for fixing the **CuriousLabs Home Page Architecture**, respecting all known project rules including `DO_NOT_DEVIATE.md`, `route-lock.md`, and architectural integrity.

---

## 🧩 TILE 6.6 — DOM Realignment & Component Sanity Pass

**Mission Name:** `V4_Cosmic_Restore_Order`
**Objective:** Fix architectural misalignments between live render, code structure, and module roles on the `/` homepage. Bring naming, imports, and hierarchy into sync with reality.

---

### ✅ PHASE 1: **Component Renames** (Safe Refactor Only)

> 🛡️ **RULES:** Preserve logic. Do **not** change behavior, layout, or animations. Only refactor for clarity and route alignment.

#### 🔁 Rename Components:

| From                     | ➡️ To                  | Location                                   |
| ------------------------ | ---------------------- | ------------------------------------------ |
| `Metrics.jsx`            | `FeaturedProjects.jsx` | `src/components/home/v4/` (move if needed) |
| `CuriousBotEnhanced.jsx` | `BotFunZone.jsx`       | `src/components/home/v4/`                  |

> 🔧 Also: update all import paths throughout project that reference the old names.

---

### 🧩 PHASE 2: **Missing Component Creation**

> 🛡️ **RULES:** Follow folder and naming standards. Use light adapt-only approach — no freestyle logic or unapproved styles.

#### 📦 Add These Modules:

| Component              | Template Source                       | File Location         |
| ---------------------- | ------------------------------------- | --------------------- |
| `MissionStatement.jsx` | `AboutMission.jsx` (adapt)            | `components/home/v4/` |
| `WhyAIDevCards.jsx`    | `ServicesFloatLayer.jsx` (adapt)      | `components/home/v4/` |
| `HearFromAI.jsx`       | `AITestimonials.jsx` (clone or alias) | `components/home/v4/` |

---

### 🔄 PHASE 3: **Page Import Fixes + Render Order**

> 🛡️ **RULES:** Match render order exactly. All imports must align with `route-lock.md`.

#### 🔁 Update in `src/pages/dev_v4_cosmic.jsx`:

```jsx
import NavBarCosmic from '@/components/home/v4/NavBarCosmic';
import HeroPortal from '@/components/home/v4/HeroPortal';
import LogoStrip from '@/components/common/LogoStrip';
import MissionStatement from '@/components/home/v4/MissionStatement';
import WhyAIDevCards from '@/components/home/v4/WhyAIDevCards';
import ServicesOrbital from '@/components/home/v4/ServicesOrbital';
import FeaturedProjects from '@/components/home/v4/FeaturedProjects';
import ProjectsLogbook from '@/components/home/v4/ProjectsLogbook';
import BotFunZone from '@/components/home/v4/BotFunZone';
import HearFromAI from '@/components/home/v4/HearFromAI';
import ContactTerminal from '@/components/home/v4/ContactTerminal';
import FooterExperience from '@/components/home/v4/FooterExperience';
```

#### ✅ DOM Render Sequence:

```jsx
<>
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
</>
```

---

### 📚 PHASE 4: **Documentation Alignment**

> 🛡️ **RULES:** These updates are required to maintain sync. No doc drift allowed.

Update the following files:

* `DO_NOT_DEVIATE.md`
* `article_5.0_Site_Map_HOME_6.5.md`
* `route-lock.md` (if any imports or routes change)

---

### 🛡️ MISSION RULES SNAPSHOT

* **No layout alterations** — strictly naming and render sync
* **No animation changes** — defer to `AnimationSchema.v1.5`
* **No functional refactors** — light wrappers only for new components
* **All imports must match render tree**
* **All docs must be synced after implementation**
* **All components live in `/home/v4` unless defined otherwise**
* **No Tailwind overrides or new style layers**

---

## ✅ MISSION STATUS: **READY FOR CURSOR EXECUTION**

Would you like this staged as a full Cursor task block now (`Cursor Block: TILE 6.6 – Cosmic Structure Repair`) or split into partials for safety?

