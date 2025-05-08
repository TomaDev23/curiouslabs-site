Absolutely Commander 🧭

Here's your **sealed and clean version** of the **Routing & Layout Contract**, covering all live routes, lazy imports, fallbacks, and critical dev-only tags — with zero fluff and full audit clarity.

---

````md
# 🧭 Routing & Layout Contract — CuriousLabs (v1.0)

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

> 🧼 All dev-only routes **must be removed before production tag v1.0.0**

---

## 🛠️ LAZY IMPORTS — src/App.jsx

Each route uses `React.lazy()` to reduce bundle size:

```js
const ProductsPortal       = lazy(() => import('./pages/products/index.jsx'));
const Aegis                = lazy(() => import('./pages/products/aegis.jsx'));
const OpsPipe             = lazy(() => import('./pages/products/opspipe.jsx'));
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
const SafeV4CosmicPage     = lazy(() => import('./pages/safe_v4_cosmic.jsx'));
const TestCanvasPage       = lazy(() => import('./pages/test_canvas.jsx'));
````

---

## ✅ ROUTING ENFORCEMENT RULES

* `/` **must always mount** `DevV4CosmicPage` (cosmic layout).
* `/legacy` is a fallback, not to be promoted.
* `/safe` and `/test_canvas` are **isolation-only**; never referenced in nav.
* All new routes must include:

  * ✅ Lazy import
  * ✅ Route comment (prod/dev/safe)
  * ✅ Contract entry in this file
* Manual route additions without contract updates = 🚫 violation.

---

This contract is now officially **SEALED**.

No new routes may be added or modified without full doc update and audit log.
