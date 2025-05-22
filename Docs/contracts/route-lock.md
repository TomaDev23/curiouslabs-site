# 🧭 Routing & Layout Contract — CuriousLabs (v1.2)

📍 Path: `C:\website_build\Docs\contracts\route-lock.md`  
🔒 Status: **LOCKED**
🔐 LEGIT: **CERTIFIED**
📆 Last Updated: [Current Date]

---

## 🌐 PRIMARY ROUTES (Production-Ready)

| Route        | Component File                    | Mount Type | Notes                          |
|--------------|-----------------------------------|------------|--------------------------------|
| `/`          | `DevV4CosmicPage.jsx`             | ✅ Prod     | Cosmic homepage (v6.6)         |
| `/cosmic-rev`| `CosmicRevDev.jsx`               | ✅ Prod     | Cosmic Revolution experience   |
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
| `/v6_atomic`   | `V6AtomicPage.jsx`         | 🧪 Dev     | Atomic rebuild of v6 homepage      |
| `/dev/mars-test`| `MarsTestPage.jsx`        | 🧪 Dev     | Mars component testing environment |
| `/dev/combined-parallax-test` | `CombinedParallaxTest.jsx` | 🧪 Dev | Parallax effects with Moon testing |

> 🧼 All dev-only routes **must be removed before production tag v1.0.0**

---

## 🔐 Route Lock: CuriousLabs Homepage Structure

### Main Route
- `/` → `DevV4CosmicPage`
  - Status: ✅ Official Homepage
  - Promotion Date: May 09, 2025

### Legacy Routes
- `/legacy-home` → `Home`
  - Preserved as historical backup
- `/v4`, `/dev/v4-cosmic` → Duplicate, not used in prod
  - Should be removed unless used for testing

### Development Routes
- `/home-v5` → `HomeV5AtomicPage`
  - Purpose: Staging area for homepage rebuild (v5)
  - Status: Dev-only, to be promoted to `/` after validation

### Prohibited Actions
- Do not revert to `Home` on `/`
- Do not mount multiple pages to `/`
- Do not reintroduce animation-heavy layouts on non-cosmic versions

### Verification Details
- Verified live at: https://curiouslabs-site.vercel.app/
- Current DOM node count: 1,800–2,200
- Lighthouse Mobile: 91
- Desktop: 94

---

## 🛠️ LAZY IMPORTS — src/App.jsx

Each route uses `React.lazy()` to reduce bundle size:

```js
const ProductsPortal       = lazy(() => import('./pages/products/index.jsx'));
const Aegis                = lazy(() => import('./pages/products/aegis.jsx'));
const OpsPipe              = lazy(() => import('./pages/products/opspipe.jsx'));
const MoonSignal           = lazy(() => import('./pages/products/moonsignal.jsx'));
const Curious              = lazy(() => import('./pages/products/curious.jsx'));
const Guardian             = lazy(() => import('./pages/products/guardian.jsx'));
const Tools                = lazy(() => import('./pages/tools.jsx'));
const CodeLab              = lazy(() => import('./pages/codelab.jsx'));
const Blog                 = lazy(() => import('./pages/blog.jsx'));
const About                = lazy(() => import('./pages/about.jsx'));
const Contact              = lazy(() => import('./pages/contact.jsx'));
const Documentation        = lazy(() => import('./pages/docs.jsx'));
const NotFound             = lazy(() => import('./pages/404.jsx'));
const UniverseExperience   = lazy(() => import('./pages/UniverseExperience.jsx'));
const DevPage              = lazy(() => import('./pages/dev.jsx'));
const DevV4CosmicPage      = lazy(() => import('./pages/dev_v4_cosmic.jsx'));
const CosmicRevDev         = lazy(() => import('./pages/CosmicRevDev.jsx'));
const SafeV4CosmicPage     = lazy(() => import('./pages/safe_v4_cosmic.jsx'));
const TestCanvasPage       = lazy(() => import('./pages/test_canvas.jsx'));
const HomeV5AtomicPage     = lazy(() => import('./pages/HomeV5AtomicPage.jsx'));
const MarsTestPage         = lazy(() => import('./pages/dev/mars-test.jsx'));
const CombinedParallaxTest = lazy(() => import('./pages/dev/combined-parallax-test.jsx'));
```

## 📋 Integration Requirements

1. **Component Requirements**
   - Each page component must be a valid React component
   - Must support Suspense with appropriate fallback
   - Must handle its own internal routing parameters
   - Must comply with layer system requirements

2. **Performance Requirements**
   - Must use lazy loading as shown above
   - Should support code splitting where appropriate
   - Should implement effective caching strategies
   - Must implement responsive loading states

3. **Integration with Layer System**
   - All pages must respect the z-index layer system
   - Navigation elements must remain accessible (z-110+)
   - HUDs must be properly positioned within the HUD layer (z-100-109)
   - Content must remain within the Content layer (z-10-50)

4. **LEGIT Compliance**
   - Each page must include proper LEGIT metadata
   - Must follow component naming conventions
   - Must provide appropriate documentation
   - Must support all required breakpoints

---

This route configuration is now locked as LAW and serves as the canonical reference for all application routing.
