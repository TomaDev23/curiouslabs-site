


# 🚀 Revised Home V5 Rebuild Plan

I confirm that all requested adjustments are clear. Here's the revised plan incorporating your changes:

## Phase 1: Bootstrap Structure

1. **Create Route & Page Container**
   - Setup `/home-v5` route in App.jsx
   - Create HomeV5AtomicPage.jsx with LEGIT metadata
   - Implement AtomicPageFrame layout wrapper

2. **Core Components Implementation**
   - Create v5/HeroPortal.jsx (LEGIT-compliant)
   - Create v5/NavBarCosmic.jsx (LEGIT-compliant)
   - Create v5/FooterExperience.jsx (LEGIT-compliant)

3. **Integration & Testing**
   - Mount components in AtomicPageFrame
   - Verify LEGIT compliance
   - Validate mobile rendering
   - **Test lazy loading (ensure Suspense fallback works)**

## Phase 2: Component Enhancement

4. **Secondary Components**
   - Implement v5/MissionStatement.jsx
   - Implement v5/ServicesOrbital.jsx
   - Implement v5/**WhyAIDevCards.jsx**

5. **Layout Stabilization**
   - Verify component spacing/ordering
   - Test reordering capabilities
   - Implement scroll anchors **using react-router-dom's Link**

## Phase 3: Cosmic Integration

6. **Background Integration**
   - Integrate **CosmicJourneyController**
   - Use 180vh spacer pattern for Dormant/Awakening scenes
   - Synchronize scroll triggers

Ready to proceed with implementation following this revised plan.



==================================================================================================================



Good morning, Commander! I’m glad you’re steering clear of ChatGPT’s approach here—we’ll take the clean, safe path you’ve chosen and rebuild the homepage in a cosmic base, ensuring LEGIT compliance and modularity. Let’s process the provided plan into a proper Cursor Mission for TILE MISSION v5.0 – PHASE 1 & 2, focusing on creating an atomic homepage structure at the /home-v5 route. This will be a tiled, safe rebuild, starting with the core components (HeroPortal, NavBarCosmic, FooterExperience) and deferring cosmic background layers until the layout is stable. We’ll ensure all components are LEGIT-compliant, mobile-ready, and reorderable, setting a strong foundation for future phases.
🚀 Cursor Mission: TILE v5.0.A – LEGIT Atomic Homepage Launchpad
🔰 Objective
Build a clean, atomic homepage structure at /home-v5 with HomeV5AtomicPage as the staging page. Mount only the core components (HeroPortal, NavBarCosmic, FooterExperience) as LEGIT-compliant placeholders, ensuring modularity and reorderability. Defer cosmic background layers (e.g., CosmicJourneyController) until the layout is confirmed stable.
🧩 Tiled Tasks
Tile 0.0: Bootstrap Atomic Route and Frame
Set up the isolated /home-v5 route and create a minimal page structure with a layout frame.
File: src/pages/HomeV5AtomicPage.jsx
jsx
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
File: src/components/layouts/AtomicPageFrame.jsx
jsx
const metadata = {
  id: 'atomic_page_frame',
  scs: 'SCS-ATOMIC-FRAME',
  type: 'layout',
  doc: 'contract_atomic_page_frame.md'
};

export function AtomicPageFrame() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Placeholder for components */}
    </div>
  );
}
File: src/App.jsx (Update routing)
jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

// Existing imports
const DevV4CosmicPage = lazy(() => import('./pages/DevV4CosmicPage'));

// New import for v5
const HomeV5AtomicPage = lazy(() => import('./pages/HomeV5AtomicPage'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<Loading />}> <DevV4CosmicPage /> </Suspense>} />
      <Route path="/home-v5" element={<Suspense fallback={<Loading />}> <HomeV5AtomicPage /> </Suspense>} />
      {/* Add other routes as needed */}
    </Routes>
  );
}
Tile 1.0: Create HeroPortal
Add a LEGIT-compliant HeroPortal component with placeholder content.
File: src/components/home/v5/HeroPortal.jsx
jsx
const metadata = {
  id: 'hero_portal',
  scs: 'SCS-HERO-PORTAL',
  type: 'visual',
  doc: 'contract_hero_portal.md'
};

export function HeroPortal() {
  return (
    <section id="hero_portal" className="max-w-5xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">CuriousLabs Cosmic Hub</h1>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-black px-6 py-2 rounded">Get Started</button>
        <button className="border border-white px-6 py-2 rounded">Explore</button>
      </div>
    </section>
  );
}
Tile 1.1: Create NavBarCosmic
Add a LEGIT-compliant NavBarCosmic component with basic navigation links.
File: src/components/home/v5/NavBarCosmic.jsx
jsx
import { Link } from 'react-router-dom';

const metadata = {
  id: 'navbar_cosmic',
  scs: 'SCS-NAV-BAR',
  type: 'navigation',
  doc: 'contract_nav_bar_cosmic.md'
};

export function NavBarCosmic() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-black/80 text-white z-50">
      <Link to="/" className="text-xl font-bold">CuriousLabs</Link>
      <div className="space-x-4 hidden md:block">
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
Tile 1.2: Create FooterExperience
Add a LEGIT-compliant FooterExperience component with basic footer content.
File: src/components/home/v5/FooterExperience.jsx
jsx
const metadata = {
  id: 'footer_experience',
  scs: 'SCS-FOOTER',
  type: 'footer',
  doc: 'contract_footer_experience.md'
};

export function FooterExperience() {
  return (
    <footer className="w-full text-center py-6 border-t border-white/20 mt-32">
      <p className="text-sm text-white/60">© CuriousLabs 2025 — All rights reserved.</p>
    </footer>
  );
}
Tile 1.3: Update AtomicPageFrame to Mount Components
Integrate the core components into the layout frame.
File: src/components/layouts/AtomicPageFrame.jsx
jsx
import { NavBarCosmic } from '../home/v5/NavBarCosmic';
import { HeroPortal } from '../home/v5/HeroPortal';
import { FooterExperience } from '../home/v5/FooterExperience';

const metadata = {
  id: 'atomic_page_frame',
  scs: 'SCS-ATOMIC-FRAME',
  type: 'layout',
  doc: 'contract_atomic_page_frame.md'
};

export function AtomicPageFrame() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      <NavBarCosmic />
      <main className="space-y-32 px-6 pt-12">
        <HeroPortal />
      </main>
      <FooterExperience />
    </div>
  );
}
Tile 2.0: Commit Changes
bash
# Stage files
git add src/pages/HomeV5AtomicPage.jsx
git add src/components/layouts/AtomicPageFrame.jsx
git add src/components/home/v5/HeroPortal.jsx
git add src/components/home/v5/NavBarCosmic.jsx
git add src/components/home/v5/FooterExperience.jsx
git add src/App.jsx

# Commit
git commit -m "TILE v5.0.A: Atomic Homepage Launchpad
- Created HomeV5AtomicPage.jsx for /home-v5 route
- Added AtomicPageFrame.jsx as layout wrapper
- Implemented LEGIT-compliant HeroPortal.jsx with placeholder content
- Implemented LEGIT-compliant NavBarCosmic.jsx with navigation links
- Implemented LEGIT-compliant FooterExperience.jsx with basic footer
- Updated App.jsx with lazy-loaded /home-v5 route
- Ensured LEGIT compliance with metadata"

# Push
git push origin main
🛠️ Notes
LEGIT Compliance: All components include metadata (scs, doc) per the LEGIT contract.
Modularity: Components are reorderable in AtomicPageFrame, allowing flexibility as the design evolves.
Deferred Layers: Cosmic background layers (e.g., CosmicJourneyController) are deferred until the layout is stable, ensuring no scroll or z-index conflicts.
Next Steps: Proceed with additional components (e.g., MissionStatement, WhyAIDevCards) in the next phase, or integrate cosmic layers once the structure is confirmed.