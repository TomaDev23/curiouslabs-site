


---

## 🧠 **Analysis of Current Homepage (dev_v4_cosmic.jsx)**

The `dev_v4_cosmic.jsx` file (mapped to `/`) contains the following components, which we’ll import into the new `/home-v5` page:

### **Components Available for Import**
- **Eagerly Loaded**:
  1. `NavBar` (from `../components/NavBar`)
  2. `HeroPortal` (from `../components/home/v4/HeroPortal`)
  3. `SectionHeader` (from `../components/ui/SectionHeader.jsx`)
  4. `SectionAnchor` (from `../components/ui/SectionAnchor`)
  5. `ParticleField` (from `../components/ui/ParticleField`)
  6. `CosmicHUD` (from `../components/ui/CosmicHUD`)
  7. `ScrollToTop` (from `../components/ScrollToTop`)

- **Lazy Loaded**:
  8. `LogoStrip` (from `../components/LogoStrip`)
  9. `MissionStatement` (from `../components/home/v4/MissionStatement`)
  10. `WhyAIDevCards` (from `../components/home/v4/WhyAIDevCards`)
  11. `ServicesFloatLayer` (from `../components/home/ServicesFloatLayer`)
  12. `FeaturedProjects` (from `../components/home/v4/FeaturedProjects`)
  13. `ServicesOrbital` (from `../components/home/v4/ServicesOrbital`)
  14. `ProjectsLogbook` (from `../components/home/v4/ProjectsLogbook`)
  15. `CommunityHub` (from `../components/home/v4/CommunityHub`)
  16. `HearFromAI` (from `../components/home/v4/HearFromAI`)
  17. `ContactTerminal` (from `../components/home/v4/ContactTerminal`)
  18. `BotFunZone` (from `../components/home/v4/BotFunZone`)
  19. `FooterExperience` (from `../components/home/v4/FooterExperience`)

### **Page Order**
- 180vh spacer (for cosmic scenes)
- Hero Section (`HeroPortal`)
- About Section (`MissionStatement`)
- Agent-Powered Development (`WhyAIDevCards`)
- Services (`ServicesOrbital`)
- Projects (`FeaturedProjects`)
- Projects Logbook (`ProjectsLogbook`)
- Community Hub (`CommunityHub`)
- AI Testimonials (`HearFromAI`)
- Contact Terminal (`ContactTerminal`)
- Footer (`FooterExperience`)

For now, we’re only tasked with importing `NavBar` and `FooterExperience` into the new `/home-v5` page, with a simple black static background.

---

## 🚀 **Cursor Mission: TILE v5.0.A – Rebuild Home V5 with v4 NavBar and Footer**

### 🔰 **Objective**
Set up the `/home-v5` route with `HomeV5AtomicPage`, create a layout wrapper (`AtomicPageFrame`), and import `NavBar` (from `../components/NavBar`) and `FooterExperience` (from `../components/home/v4/FooterExperience`) from the current homepage. Use a simple black static background, and defer all other components (including cosmic backgrounds) until later phases.

---

## 🧩 **Tiled Tasks**

### **Tile 0.0: Create HomeV5AtomicPage**
Set up the new page at `/home-v5`.

**File**: `src/pages/HomeV5AtomicPage.jsx`
```jsx
import { Suspense } from 'react';
import { AtomicPageFrame } from '../components/layouts/AtomicPageFrame';
import Loading from '../components/Loading';

const metadata = {
  id: 'home_v5_atomic_page',
  scs: 'SCS-HOME-V5',
  type: 'page',
  doc: 'contract_home_v5_atomic.md'
};

export default function HomeV5AtomicPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AtomicPageFrame />
    </Suspense>
  );
}


===========================================================================================================================


# Component Modules in the Current Homepage (dev_v4_cosmic.jsx)

## Eagerly Loaded Components (Imported Directly)
1. **NavBar** - from `../components/NavBar`
2. **HeroPortal** - from `../components/home/v4/HeroPortal`
3. **SectionHeader** - from `../components/ui/SectionHeader.jsx`
4. **SectionAnchor** - from `../components/ui/SectionAnchor`
5. **ParticleField** - from `../components/ui/ParticleField`
6. **CosmicHUD** - from `../components/ui/CosmicHUD`
7. **ScrollToTop** - from `../components/ScrollToTop`

## Lazy Loaded Components (Using React.lazy)
8. **LogoStrip** - from `../components/LogoStrip`
9. **MissionStatement** - from `../components/home/v4/MissionStatement`
10. **WhyAIDevCards** - from `../components/home/v4/WhyAIDevCards`
11. **ServicesFloatLayer** - from `../components/home/ServicesFloatLayer`
12. **FeaturedProjects** - from `../components/home/v4/FeaturedProjects`
13. **ServicesOrbital** - from `../components/home/v4/ServicesOrbital`
14. **ProjectsLogbook** - from `../components/home/v4/ProjectsLogbook`
15. **CommunityHub** - from `../components/home/v4/CommunityHub`
16. **HearFromAI** - from `../components/home/v4/HearFromAI`
17. **ContactTerminal** - from `../components/home/v4/ContactTerminal`
18. **BotFunZone** - from `../components/home/v4/BotFunZone`
19. **FooterExperience** - from `../components/home/v4/FooterExperience`

## Displayed in Order on the Page
1. 180vh spacer (for cosmic scene alignment)
2. Hero Section (HeroPortal)
3. About Section (MissionStatement)
4. Agent-Powered Development (WhyAIDevCards)
5. Services (ServicesOrbital)
6. Projects (FeaturedProjects)
7. Projects Logbook (ProjectsLogbook)
8. Community Hub (CommunityHub)
9. AI Testimonials (HearFromAI)
10. Contact Terminal (ContactTerminal)
11. Footer (FooterExperience)

All components are organized with corresponding section references and animations using framer-motion and various hooks.
