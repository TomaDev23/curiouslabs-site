🟣 **CURSOR MISSION BLOCK: DEV.5 – Dev Page Cleanup & Navigation Refactor**
🎯 *Objective*: Clean up `/dev` route to serve as a modern **developer navigation hub**, isolating legacy test components and preserving only useful links for current development workflows.

---

## 🔧 Task: Refactor `/dev` Route Page

### 1. 🧹 Cleanup Legacy Mounts

**In `src/pages/dev/index.jsx`:**

* ✅ **Identify** all currently mounted components (e.g. `StaticGalaxy`, `HUDTester`, `DevTestPanel`, etc.)
* ✅ **Comment them out** using the following tag:

```jsx
{/* 🚫 LEGACY-MOUNTED: Do not delete without review. This block is no longer rendered. */}
```

> ⚠️ *Do NOT delete any of these components. They may still be referenced for HUD or layout planning.*

---

### 2. 🧭 Preserve Current Buttons

* Retain the **existing three buttons** in the hero section:

  * Scroll Parallax Test (`/dev/parallax-test`)
  * Mouse Parallax Test (`/dev/mouse-parallax-test`)
  * Combined Parallax Test (`/dev/combined-parallax-test`)

These are working as intended — no changes needed.

---

### 3. ➕ Add New Dev Navigation Buttons

Append the following three routes **to the button group**, using the **same component and style** as the original buttons:

| Label             | Route                 |
| ----------------- | --------------------- |
| Home v5 (Atomic)  | `/home-v5`            |
| Cosmic Revolution | `/cosmic-rev`         |
| Planet Sandbox    | `/dev/planet-sandbox` |

> 🧠 *Ensure proper internal `<Link to="...">` routing with full route paths.*

---

### 4. 📁 Optional Organization (if file is large)

If `index.jsx` is cluttered, **extract the button grid** into a new component:

```bash
src/components/dev/DevLinkHub.jsx
```

Keep structure simple and tailwind-based for reuse across staging routes.

---

## ✅ Acceptance Criteria

* [ ] All legacy components are commented out and clearly tagged
* [ ] Page renders only 6 dev buttons with proper links
* [ ] Buttons are styled and grouped consistently
* [ ] File builds clean (`npm run dev` passes)
* [ ] No functionality from the parallax test buttons is altered

---

## 📌 Reference Docs

* `/home-v5` → `HomeV5AtomicPage.jsx`
* `/cosmic-rev` → `CosmicRevDev.jsx`
* `/dev/planet-sandbox` → `PlanetSandboxPage.jsx`

---

💬 Commander confirms all elements. Begin execution now in branch:
`stars-cleaning-grounds` (already checked out and validated).

You’re greenlit to proceed, Cursor. 🛠️
