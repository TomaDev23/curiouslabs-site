Absolutely, Commander 💽✨
Here's the **finalized and production-ready** version of the **Component Contract Template**, named:

> `C:\website_build\Docs\contracts\contract_component_names.md`

This is **schema v1.0**, meant to be cloned for *each module* and stored as its own file (e.g., `contract_hero_portal.md`, `contract_testimonials_ai.md`).
It becomes the **canonical truth** per component — and eliminates confusion across renaming, animation sync, layout changes, and documentation.

---

```md
# 🧩 Component Contract Schema v1.0 — CuriousLabs

## 📁 File Path (Template)
`C:\website_build\Docs\contracts\contract_component_names.md`

---

## ⛳ Purpose

This contract defines the **standard structure** for documenting each renderable UI component used in the CuriousLabs front-end.  
It allows us to enforce naming, layout, animation, import, and render location consistently — across all tools, editors, agents, and future devs.

---

## 🧬 Template Usage

Clone this file for each component as:
```

C:\website\_build\Docs\contracts\contract\_{component\_key}.md

````

Where `component_key` = lowercase snake-style ID like:
- `hero_portal`
- `service_ring`
- `why_ai_cards`

---

## 📄 COMPONENT CONTRACT TEMPLATE

> 📝 Copy the block below into your new component’s contract file

---

# 🧩 Component Contract — {ComponentName}

## 🔖 ID
`{component_key}`  
> Unique short-form ID for tracking (e.g. `hero_portal`, `ai_testimonials`)

---

## 🧠 ROLE
> _1–2 sentence description of what this component does, visually and structurally_

---

## ⚙️ INPUTS (Props)
| Prop Name          | Type     | Required | Description                            |
|--------------------|----------|----------|----------------------------------------|
| `title`            | `string` | ✅        | Title displayed at top of section      |
| `items`            | `array`  | ❌        | Optional items or content blocks       |
| `animationConfig`  | `object` | ❌        | Optional override for motion behavior  |
| `viewportTrigger`  | `bool`   | ❌        | Whether to trigger on scroll           |

---

## 🧾 OUTPUT
- Returns JSX block wrapped in `<motion.div>` (if animated)
- Renders children, titles, cards, or callouts based on props
- May emit telemetry or scroll tracking

---

## 🎞️ ANIMATION CONTRACT

```js
// Default motion config
transition={{
  duration: 0.35,
  delay: 0.1,
  ease: 'easeOut'
}}

// If staggered:
variants={{
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1
    }
  }
}}
````

---

## 🧱 LAYOUT CONTRACT

* Width: `max-w-screen-xl` or `max-w-7xl`
* Padding: `px-6 md:px-12` or contextual
* Vertical rhythm: `space-y-10` for stacks
* Positioning: relative / absolute depending on bg canvas
* Background Layer: if shared, specify `SpaceCanvas`, `NebulaBackground`, etc.

---

## 🔄 RENDERING RULE

* Rendered in: `/pages/dev_v4_cosmic.jsx` or `Home.jsx`
* DOM Position: Zone #️⃣ — *{Fill from architecture map}*
* Imports:

```js
import {ComponentName} from '@/components/home/v4/ComponentName'
```

* Adjacent Components: *e.g. above Metrics, below Hero*

---

## 📦 FILES

* Component: `src/components/home/v4/{ComponentName}.jsx`
* Shared Assets: `public/images/{folder}`
* Styles: Tailwind-only (no external CSS unless noted)

---

## 📍 STATUS

* [ ] Implemented
* [ ] Mobile Tested
* [ ] Animation Verified
* [ ] Docs Completed

---

## 🔒 NOTES

> Custom logic, dependencies, or special usage notes

* *Shares layout utils with other v4 sections*
* *Do not alter animation timing without schema update*

```

---

✅ **This document is now finalized and ready for duplication per component.**  
You may now:

- 🧱 Generate 1 contract per rendered component  
- 🔁 Use this for sync with Claude, Cursor, or dev handoffs  
- 📐 Use it as source of truth for design audits

Shall I prepare the **first actual contract file** now (e.g., for `HeroPortal.jsx`)?
```
