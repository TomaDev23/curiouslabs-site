# 🚨 DO_NOT_DEVIATE.md – CuriousLabs Landing Page

> Applies to: `branch/main`
> Location: `C:/website_build/docs/DO_NOT_DEVIATE.md`

---

## 🔐 Rules of Engagement
These policies are absolute. No component, style, or feature may violate these directives without Commander override.

### 1. 📚 Docs Are Law
- All implementation must trace to:
  - `Docs/Foundation/article_1.0_rules.md`
  - `Docs/planning/Aesthetic_Scaffolding/Full_Plan.md`
  - `Docs/planning/Aesthetic_Scaffolding/v1.0.md`
  - `Docs/planning/Aesthetic_Scaffolding/v2.0.md`
- If it's not in a doc, it doesn't exist.

### 2. 🧱 Sacred Structure
- Do not rename or relocate folders:
  - `src/components/`, `src/pages/`, `public/`, `Docs/`, `website_resources/`
- Component structure must match declared architecture.

### 3. ⚙️ Stack Lock
- Tech stack is frozen:
  - React for components
  - TailwindCSS for styling (no CSS modules, Styled Components, etc.)
  - Vite for development
- No external component libraries allowed (no Bootstrap, MUI, etc.)

### 4. 🎨 Style Discipline
- Must use only:
  - TailwindCSS utility classes (no custom CSS files)
  - Custom colors defined in `tailwind.config.js`
  - Animation definitions in `tailwind.config.js`
- All styling must be responsive via Tailwind breakpoints (`sm:`, `md:`, `lg:`)

### 5. 🔄 Component Rules
- All components must be:
  - Exportable as standalone modules
  - Responsive across all breakpoints
  - Free of backend integrations (visual/stub only)
  - Rendered from `src/pages/index.jsx`

### 6. 📦 Asset Management
- All images must be referenced from:
  - `public/` or `website_resources/`
- No external CDN links
- No inline base64 encoded images

### 7. 🛑 Hard Stops
- Do not:
  - Install additional npm packages without explicit approval
  - Create additional page routes without declaration
  - Add animations that significantly impact performance
  - Use templates or external component libraries

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

Cursor would then only proceed after Commander manually approves next move.

## 🧠 Remember
Every component must be:
- ✅ Declared in documentation
- 📱 Responsive across all breakpoints
- 🎨 Styled with Tailwind only
- 🧩 Modular and standalone
- 🚀 Performance optimized

This is how we maintain visual and code quality.

**– Commander Authorization Required for Exceptions**
