# 🚨 DO_NOT_DEVIATE.md – CuriousLabs Landing Page (v2.0)

> Applies to: `branch/main`
> Location: `C:/website_build/docs/DO_NOT_DEVIATE.md`

---

## 🔐 Rules of Engagement
These policies are absolute. No component, style, or feature may violate these directives without Commander override.

### 1. 📚 Docs Are Law
- All implementation must trace to:
  - `Docs/Foundation/article_1.0_rules.md`
  - `Docs/Foundation/article_5.0_Site_Map_29.4.md`
  - `Docs/planning/Aesthetic_Scaffolding/Full_Plan.md`
  - `Docs/planning/Aesthetic_Scaffolding/v1.0.md`
  - `Docs/planning/Aesthetic_Scaffolding/v2.0.md`
  - `Docs/contracts/hooks.md`
  - `Docs/contracts/article_RouterImplementation.md`
- If it's not in a doc, it doesn't exist.

### 2. 🧱 Sacred Structure
- Do not rename or relocate folders:
  - `src/components/`, `src/pages/`, `public/`, `Docs/`, `website_resources/`
- Component structure must match declared architecture.
- THE FOLLOWING STRUCTURE IS SACRED AND CANNOT BE MODIFIED:
  ```
  src/
  ├── components/       # Reusable UI components
  │   ├── Hero/         # Modularized Hero components
  │   │   ├── HeroBackground.jsx
  │   │   ├── HeroAnimations.jsx
  │   │   ├── HeroButtons.jsx
  │   │   ├── HeroContent.jsx
  │   │   ├── HeroHeading.jsx
  │   │   └── index.jsx
  │   ├── NavBar.jsx
  │   ├── Footer.jsx
  │   ├── DynamicExpansion.jsx
  │   ├── LogoStrip.jsx
  │   ├── Metrics.jsx
  │   ├── CaseStudies.jsx
  │   └── Testimonials.jsx
  ├── hooks/            # Custom React hooks
  │   ├── useBreakpoint.jsx
  │   ├── useParallax.jsx
  │   └── useScrollTrigger.jsx
  ├── pages/            # Page components
  │   ├── products/     # Product pages
  │   │   ├── index.jsx # Products portal
  │   │   ├── aegis.jsx
  │   │   ├── opspipe.jsx
  │   │   ├── moonsignal.jsx
  │   │   ├── curious.jsx
  │   │   └── guardian.jsx
  │   ├── index.jsx     # Home page
  │   ├── codelab.jsx
  │   ├── blog.jsx
  │   ├── about.jsx
  │   ├── contact.jsx
  │   └── docs.jsx
  ├── utils/            # Utility functions
  │   └── assets.js     # Centralized asset paths
  ├── App.jsx           # Main app with all routes
  ├── index.css         # Global CSS with smooth scrolling
  └── main.jsx          # Entry point with BrowserRouter
  ```

### 3. ⚙️ Stack Lock
- Tech stack is frozen:
  - React for components
  - React Router for navigation
  - TailwindCSS for styling (no CSS modules, Styled Components, etc.)
  - Vite for development
- No external component libraries allowed (no Bootstrap, MUI, etc.)
- Authorized hooks are limited to:
  - React built-in hooks (useState, useEffect, useRef, etc.)
  - Custom hooks documented in `Docs/contracts/hooks.md`

### 4. 🎨 Style Discipline
- Must use only:
  - TailwindCSS utility classes (no custom CSS files)
  - Custom colors defined in `tailwind.config.js`
  - Animation definitions in `tailwind.config.js`
- All styling must be responsive via Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Color palette and visual elements must match those defined in `Docs/Foundation/article_5.0_Site_Map_29.4.md`

### 5. 🔄 Component Rules
- All components must be:
  - Exportable as standalone modules
  - Responsive across all breakpoints
  - Free of backend integrations (visual/stub only)
  - Rendered from their respective page files
- Navigation must follow React Router implementation as described in `Docs/contracts/article_RouterImplementation.md`

### 6. 📦 Asset Management
- All assets must be centralized in `src/utils/assets.js`
- All images must be referenced from:
  - `public/images/` 
  - `public/images/logos/`
  - `public/images/svg/`
- No external CDN links
- No inline base64 encoded images
- All assets must be properly tracked in Git

### 7. 🛑 Hard Stops
- Do not:
  - Install additional npm packages without explicit approval
  - Create additional page routes without declaration
  - Add animations that significantly impact performance
  - Use templates or external component libraries
  - Modify the existing hooks implementation
  - Change how routing is implemented

---

## 📄 Page Documentation
The following pages are documented and sanctioned:

1. **Home (`/`)**: Main landing page with Hero, LogoStrip, DynamicExpansion, Metrics, CaseStudies, and Testimonials.
2. **Cosmic Revolution (`/cosmic-rev`)**: Static 3D galaxy space experience with scene presets and fixed viewport.
3. **Products Portal (`/products`)**: Overview of all products with cards for each product.
4. **Product Pages**:
   - Aegis (`/products/aegis`): Security product page
   - OpsPipe (`/products/opspipe`): DevOps automation product page
   - MoonSignal (`/products/moonsignal`): Analytics product page
   - Curious (`/products/curious`): Code exploration product page
   - Guardian (`/products/guardian`): Monitoring product page
5. **CodeLab (`/codelab`)**: Interactive playground for tools
6. **Blog (`/blog`)**: Coming soon page for blog content
7. **Documentation (`/docs`)**: Resource for guides and API documentation
8. **About (`/about`)**: Company information, mission, and values
9. **Contact (`/contact`)**: Contact information and form placeholder

## 🔃 Routing Implementation
- All navigation must use React Router's `<Link>` component
- `App.jsx` contains all route definitions using `Routes` and `Route` components
- `NavBar.jsx` includes active link styling based on current route
- Product links in dropdown menus must use React Router navigation
- DO NOT modify routing behavior without explicit approval

---

**Visual Conformity Freeze Order:**
*If Cursor detects visual inconsistencies, performance degradation, or mobile responsiveness issues outside known expected outcomes,* *Cursor must immediately stop further action, log a freeze report, and alert Commander for new orders.*
*Cursor must not attempt self-repair, simplification, assumption, or alternate execution unless explicitly authorized*

📦 If approved, the final brief will have this enforced structure:

| Situation | Action |
|-----------|--------|
| Visual regression not matching reference images | 🛑 Freeze, log, alert |
| Mobile responsiveness failure | 🛑 Freeze, log, alert |
| Significant performance degradation | 🛑 Freeze, log, alert |
| Addition of non-approved dependencies | 🛑 Freeze, log, alert |
| Non-Tailwind styling approach | 🛑 Freeze, log, alert |
| Modification of hooks implementation | 🛑 Freeze, log, alert |
| Changes to routing architecture | 🛑 Freeze, log, alert |

Cursor would then only proceed after Commander manually approves next move.

## 🧠 Remember
Every component must be:
- ✅ Declared in documentation
- 📱 Responsive across all breakpoints
- 🎨 Styled with Tailwind only
- 🧩 Modular and standalone
- 🚀 Performance optimized
- 🔄 Using correct routing methods

This is how we maintain visual and code quality.

## 📜 Official Additional Directives for Cursor

### 🔵 Environment Rule:
- Do NOT rerun or reset the development server between minor changes unless absolutely necessary.
- Use Hot Reload behavior (Vite dev server) to preview and validate changes in real-time.

### 🔵 Scope Rule:
- Cursor must ONLY touch files and components explicitly mentioned in the mission scope.
- Absolutely forbidden to modify, move, or refactor any other sections, structures, or assets without explicit Commander permission.

### 🔵 Sacred Location Rule:
- The file and folder structure is locked.
- No moving, renaming, or reorganizing components, pages, assets, or folders unless directly commanded.
- Treat the project's structure like sacred architecture until post-launch cleanup.

### 🔵 Asset Management Rule:
- Always ensure all assets are properly tracked in Git.
- Logo and image files must be committed and pushed with proper casing.
- Images must be referenced using centralized asset paths from `src/utils/assets.js`.

**– Commander Authorization Required for Exceptions**

=========================================================================================================

After reading the attached files, I understand the critical rules for working on the CuriousLabs Landing Page project:

# 🚨 DO_NOT_DEVIATE.md – CuriousLabs Landing Page (v2.0)

## 🔐 Rules of Engagement
These policies are absolute and may not be violated without Commander override.

### 1. 📚 Docs Are Law
- All implementation must trace to documented specifications
- If it's not in a doc, it doesn't exist

### 2. 🧱 Sacred Structure
- Folders must not be renamed or relocated
- Component structure must follow declared architecture
- The specified folder structure is immutable

### 3. ⚙️ Stack Lock
- React for components
- React Router for navigation
- TailwindCSS for styling (no CSS modules, Styled Components)
- No external component libraries

### 4. 🎨 Style Discipline
- TailwindCSS utility classes only
- Custom colors from tailwind.config.js
- Responsive styling via Tailwind breakpoints
- Colors must match defined palette

### 5. 🔄 Component Rules
- Components must be standalone modules
- Responsive across breakpoints
- Free of backend integrations (visual/stub only)
- Rendered from respective page files

### 6. 📦 Asset Management
- Assets centralized in src/utils/assets.js
- Images from specific directories only
- No external CDN links or inline base64

### 7. 🛑 Hard Stops
- No additional npm packages without approval
- No additional page routes without declaration
- No performance-impacting animations
- No templates or external component libraries
- No hook implementation modifications
- No routing implementation changes

## Additional Critical Rules
- DO NOT OVERCOMPLICATE SIMPLE TASKS
- Implement only what is explicitly requested
- Preserve existing code
- Listen to feedback immediately
- Ask for clarification rather than assuming
- Respect user expertise

I will adhere strictly to these rules in all future work on this project.

