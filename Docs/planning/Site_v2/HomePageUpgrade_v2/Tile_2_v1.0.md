🧠 Locking in — here’s the **Cursor Task Block for Step 1: Scroll + Animation Wiring**
Scope: apply Framer Motion scroll-entry effects to all key V4.0 components.

---

## 🧩 CURSOR TASK BLOCK — V4.0 Scroll + Animation Wiring

### 🎯 Objective

Wrap the content of each major section component in a `<motion.section>` element with scroll-triggered entry animation.

---

### ✅ Target Files

```txt
src/components/home/v4/
├─ HeroPortal.jsx
├─ AboutMission.jsx
├─ ServicesOrbital.jsx
├─ ProjectsLogbook.jsx
├─ CommunityHub.jsx
├─ AITestimonials.jsx
├─ ContactTerminal.jsx
```

---

### 🛠️ For Each File

1. **Import motion:**

```js
import { motion } from 'framer-motion'
```

2. **Wrap the main JSX block with:**

```jsx
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="min-h-screen py-32 px-4"
>
  {/* Original content */}
</motion.section>
```

3. **Ensure the outermost JSX element is this motion wrapper**
   If there's already a `<section>` or `<div>`, replace it — do **not nest** motion inside.

4. **Preserve existing content**
   Only wrap — no internal layout or style changes unless needed to fix rendering.

---

### ✅ Output Requirements

* All 7 components updated
* No scroll errors on `dev_v4_cosmic.jsx`
* Sections fade+rise on scroll into view
* Motion only triggers once per session (`viewport.once = true`)
* Tailwind layout is retained

---

Ready to execute.
Say `run it` when you’ve pasted into Cursor or need confirmation after it finishes.
