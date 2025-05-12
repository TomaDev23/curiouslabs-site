Let’s carefully rebuild the Home V5 homepage at the /home-v5 route, ensuring we follow the correct approach this time. Since you had to revert the previous changes due to Cursor pulling the wrong items, we’ll start fresh, focusing on precision and awareness. We’ll use the provided Route Lock and Routing & Layout Contract to understand the current structure, and the dev_v4_cosmic.jsx file to identify the components we need to import from the / homepage. First, we’ll update the Route Lock document to reflect the new /home-v5 route, then proceed with importing the correct components into the new page, starting with NavBar and FooterExperience from home/v4.
🧩 Step 1: Update Route Lock Document
The current Route Lock and Routing & Layout Contract outline the production routes, with / mapped to DevV4CosmicPage as the official homepage. The /home-v5 route doesn’t exist yet, and we need to add it as a dev-only route for staging the new homepage rebuild. We’ll update the contract to lock in this change, ensuring compliance with CuriousLabs’ routing laws.
Updated Route Lock Document
File: Docs/contracts/route-lock.md
md
# 🧭 Routing & Layout Contract — CuriousLabs (v1.1)

📍 Path: `C:\website_build\Docs\contracts\route-lock.md`  
🔒 Status: **LOCKED**

---

## 🌐 PRIMARY ROUTES (Production-Ready)

| Route        | Component File                    | Mount Type | Notes                          |
|--------------|-----------------------------------|------------|--------------------------------|
| `/`          | `DevV4CosmicPage.jsx`             | ✅ Prod     | Cosmic homepage (v6.6)         |
| `/products`  | `ProductsPortal.jsx`              | ✅ Prod     | Index route for all products   |
| `/products/aegis`     | `Aegis.jsx`              | ✅ Prod     | Aegis product page             |
| `/products/opspipe`   | `OpsPipe.jsx`            | ✅ Prod     | OpsPipe product page           |
| `/products/moonsignal`| `MoonSignal.jsx`         | ✅ Prod     | MoonSignal product page        |
| `/products/curious`   | `Curious.jsx`            | ✅ Prod     | Curious app page               |
| `/products/guardian`  | `Guardian.jsx`           | ✅ Prod     | Guardian product page          |
| `/codelab`    | `CodeLab.jsx`                    | ✅ Prod     | CodeOps service landing page   |
| `/tools`      | `Tools.jsx`                      | ✅ Prod     | Utilities & microtools page    |
| `/docs`       | `Documentation.jsx`              | ✅ Prod     | Developer documentation        |
| `/blog`       | `Blog.jsx`                       | ✅ Prod     | Blog hub                       |
| `/about`      | `About.jsx`                      | ✅ Prod     | About CuriousLabs              |
| `/contact`    | `Contact.jsx`                    | ✅ Prod     | Contact + inquiry form         |
| `/404`        | `NotFound.jsx`                   | ✅ Prod     | Custom 404                     |

---

## 🔁 SPECIAL & FALLBACK ROUTES

| Route         | Component File              | Tag      | Purpose                            |
|---------------|-----------------------------|----------|------------------------------------|
| `/legacy`     | `Home.jsx`                  | 🔁 Fallback | Old homepage / solar system (easter egg) |
| `/safe`       | `SafeV4CosmicPage.jsx`      | 🛡️ Safety | Minimal fallback render page       |

---

## ⚠️ DEV-ONLY ROUTES

| Route          | Component File             | Tag       | Usage                              |
|----------------|----------------------------|-----------|------------------------------------|
| `/dev`         | `DevPage.jsx`              | 🧪 Dev     | General developer testing page     |
| `/dev_v4_cosmic`| `DevV4CosmicPage.jsx`     | 🧪 Dev     | Primary staging page (now `/`)     |
| `/test_canvas` | `TestCanvasPage.jsx`       | 🧪 Dev     | Visual isolation route (for debug) |
| `/home-v5`     | `HomeV5AtomicPage.jsx`     | 🧪 Dev     | Staging for homepage rebuild (v5)  |

> 🧼 All dev-only routes **must be removed before production tag v1.0.0**

---

## 🛠️ LAZY IMPORTS — src/App.jsx

Each route uses `React.lazy()` to reduce bundle size:

```js
const ProductsPortal       = lazy(() => import('./pages/products/index.jsx'));
const Aegis                = lazy(() => import('./pages/products/aegis.jsx'));
const OpsPipe             = lazy(() => import('./pages/products/opspipe.jsx'));
const MoonSignal          = lazy(() => import('./pages/products/moonsignal.jsx'));
const Curious             = lazy(() => import('./pages/products/curious.jsx'));
const Guardian            = lazy(() => import('./pages/products/guardian.jsx'));
const Tools               = lazy(() => import('./pages/tools.jsx'));
const CodeLab             = lazy(() => import('./pages/codelab.jsx'));
const Blog                = lazy(() => import('./pages/blog.jsx'));
const About               = lazy(() => import('./pages/about.jsx'));
const Contact             = lazy(() => import('./pages/contact.jsx'));
const Documentation       = lazy(() => import('./pages/docs.jsx'));
const NotFound            = lazy(() => import('./pages/404.jsx'));
const UniverseExperience  = lazy(() => import('./pages/UniverseExperience.jsx'));
const DevPage             = lazy(() => import('./pages/dev.jsx'));
const DevV4CosmicPage     = lazy(() => import('./pages/dev_v4_cosmic.jsx'));
const SafeV4CosmicPage    = lazy(() => import('./pages/safe_v4_cosmic.jsx'));
const TestCanvasPage      = lazy(() => import('./pages/test_canvas.jsx'));
const HomeV5AtomicPage    = lazy(() => import('./pages/HomeV5AtomicPage.jsx'));
🔐 Route Lock: CuriousLabs Homepage Structure
Main Route
/ → DevV4CosmicPage
Status: ✅ Official Homepage
Promoted manually on May 09, 2025
Legacy Routes
/legacy-home → Home
Preserved as historical backup
/v4, /dev/v4-cosmic → Duplicate, not used in prod
Should be removed unless used for testing
Dev Routes
/home-v5 → HomeV5AtomicPage
Purpose: Staging area for homepage rebuild (v5)
Status: 🧪 Dev-only, to be promoted to / after validation
Do Not:
Revert to Home on /.
Mount multiple pages to /.
Reintroduce animation-heavy layouts on non-cosmic versions.
Confirmation Logs
Verified live at: https://curiouslabs-site.vercel.app/
Current DOM node count: 1,800–2,200
Lighthouse Mobile: 91
Desktop: 94
This route config is now locked as LAW.

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
Tile 0.1: Create AtomicPageFrame with v4 Imports
Create the layout wrapper, importing NavBar and FooterExperience from their respective locations in the current homepage structure.
File: src/components/layouts/AtomicPageFrame.jsx
jsx
import { NavBar } from '../NavBar';
import { FooterExperience } from '../home/v4/FooterExperience';

const metadata = {
  id: 'atomic_page_frame',
  scs: 'SCS-ATOMIC-FRAME',
  type: 'layout',
  doc: 'contract_atomic_page_frame.md'
};

export function AtomicPageFrame() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      <NavBar />
      <main className="space-y-32 px-6 pt-12">
        {/* Simple black static background, no content yet */}
        <div className="h-screen" /> {/* Spacer to ensure page height */}
      </main>
      <FooterExperience />
    </div>
  );
}
Tile 0.2: Create Loading Component
Ensure the Loading component exists for Suspense fallback (it was mentioned in the previous report, so we’ll create it if it doesn’t exist).
File: src/components/Loading.jsx
jsx
const metadata = {
  id: 'loading',
  scs: 'SCS-LOADING',
  type: 'utility',
  doc: 'contract_loading.md'
};

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
      <p>Loading...</p>
    </div>
  );
}
Tile 0.3: Update App.jsx with /home-v5 Route
Add the /home-v5 route to App.jsx, ensuring it’s lazy-loaded.
File: src/App.jsx
jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

const ProductsPortal = lazy(() => import('./pages/products/index.jsx'));
const Aegis = lazy(() => import('./pages/products/aegis.jsx'));
const OpsPipe = lazy(() => import('./pages/products/opspipe.jsx'));
const MoonSignal = lazy(() => import('./pages/products/moonsignal.jsx'));
const Curious = lazy(() => import('./pages/products/curious.jsx'));
const Guardian = lazy(() => import('./pages/products/guardian.jsx'));
const Tools = lazy(() => import('./pages/tools.jsx'));
const CodeLab = lazy(() => import('./pages/codelab.jsx'));
const Blog = lazy(() => import('./pages/blog.jsx'));
const About = lazy(() => import('./pages/about.jsx'));
const Contact = lazy(() => import('./pages/contact.jsx'));
const Documentation = lazy(() => import('./pages/docs.jsx'));
const NotFound = lazy(() => import('./pages/404.jsx'));
const UniverseExperience = lazy(() => import('./pages/UniverseExperience.jsx'));
const DevPage = lazy(() => import('./pages/dev.jsx'));
const DevV4CosmicPage = lazy(() => import('./pages/dev_v4_cosmic.jsx'));
const SafeV4CosmicPage = lazy(() => import('./pages/safe_v4_cosmic.jsx'));
const TestCanvasPage = lazy(() => import('./pages/test_canvas.jsx'));
const HomeV5AtomicPage = lazy(() => import('./pages/HomeV5AtomicPage.jsx'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<Loading />}> <DevV4CosmicPage /> </Suspense>} />
      <Route path="/products" element={<Suspense fallback={<Loading />}> <ProductsPortal /> </Suspense>} />
      <Route path="/products/aegis" element={<Suspense fallback={<Loading />}> <Aegis /> </Suspense>} />
      <Route path="/products/opspipe" element={<Suspense fallback={<Loading />}> <OpsPipe /> </Suspense>} />
      <Route path="/products/moonsignal" element={<Suspense fallback={<Loading />}> <MoonSignal /> </Suspense>} />
      <Route path="/products/curious" element={<Suspense fallback={<Loading />}> <Curious /> </Suspense>} />
      <Route path="/products/guardian" element={<Suspense fallback={<Loading />}> <Guardian /> </Suspense>} />
      <Route path="/codelab" element={<Suspense fallback={<Loading />}> <CodeLab /> </Suspense>} />
      <Route path="/tools" element={<Suspense fallback={<Loading />}> <Tools /> </Suspense>} />
      <Route path="/docs" element={<Suspense fallback={<Loading />}> <Documentation /> </Suspense>} />
      <Route path="/blog" element={<Suspense fallback={<Loading />}> <Blog /> </Suspense>} />
      <Route path="/about" element={<Suspense fallback={<Loading />}> <About /> </Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<Loading />}> <Contact /> </Suspense>} />
      <Route path="/404" element={<Suspense fallback={<Loading />}> <NotFound /> </Suspense>} />
      <Route path="/legacy" element={<Suspense fallback={<Loading />}> <UniverseExperience /> </Suspense>} />
      <Route path="/safe" element={<Suspense fallback={<Loading />}> <SafeV4CosmicPage /> </Suspense>} />
      <Route path="/dev" element={<Suspense fallback={<Loading />}> <DevPage /> </Suspense>} />
      <Route path="/dev_v4_cosmic" element={<Suspense fallback={<Loading />}> <DevV4CosmicPage /> </Suspense>} />
      <Route path="/test_canvas" element={<Suspense fallback={<Loading />}> <TestCanvasPage /> </Suspense>} />
      <Route path="/home-v5" element={<Suspense fallback={<Loading />}> <HomeV5AtomicPage /> </Suspense>} />
    </Routes>
  );
}


- Updated route-lock.md to include /home-v5 as dev-only route
- Created HomeV5AtomicPage.jsx for /home-v5 route
- Added AtomicPageFrame.jsx with imports of NavBar and FooterExperience from v4
- Created Loading.jsx for Suspense fallback
- Updated App.jsx with lazy-loaded /home-v5 route
- Ensured simple black static background with min-h-screen
- Maintained LEGIT compliance by reusing production components"

# Push
git push origin main
🛠️ Notes
LEGIT Compliance: We’re using production-ready NavBar and FooterExperience from dev_v4_cosmic.jsx, which are already LEGIT-compliant (SCS-tagged, tested in production).
Black Background: The page uses a simple black static background (bg-black) with a spacer to maintain height.
No Duplication: We’re importing existing components, avoiding any redundancy.
Next Steps: We can proceed with importing additional components (e.g., MissionStatement, ServicesOrbital) into AtomicPageFrame, or integrate cosmic backgrounds when ready.
🚀 Confirmation
This mission is carefully crafted and good to go. It aligns with the Route Lock contract, reuses the correct NavBar and FooterExperience from dev_v4_cosmic.jsx, and sets up a clean foundation at /home-v5 with a black static background.
Shall I execute this Cursor Mission, or do you have any adjustments? 🚀