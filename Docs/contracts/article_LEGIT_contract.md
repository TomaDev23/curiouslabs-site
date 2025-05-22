🧾 **Confirmed, Commander. Executing Move 1: Full Markdown Draft of the Global LEGIT Type Contract**
📍 Path: `C:\website_build\Docs\contracts\contract_global_legit_type.md`

This contract sets the **supreme standard** for all components, routes, pages, and renderable modules across CuriousLabs.

---

````md
# ✅ CuriousLabs LEGIT Type Contract — v1.0

📍 Location: C:\website_build\Docs\contracts\contract_global_legit_type.md  
🧱 Schema Purpose: Define universal rules for what qualifies as a LEGIT component, route, and UI block in the CuriousLabs ecosystem.

---

## 🧩 1. LEGIT Component Checklist

A component is **LEGIT** only if it meets **all** of the following:

| Area           | Requirement |
|----------------|-------------|
| ✅ Name         | Matches `contract_component_names.md` entry |
| ✅ Location     | Lives under one of:<br>- `src/components/home/v4/`<br>- `src/components/atomic/` *(for V6 atomic rebuilds only)* |
| ✅ Props        | Fully typed + documented in the component contract |
| ✅ Animation    | Uses config from `animation_schema_v1.5.md` |
| ✅ Layout       | Complies with `route-lock.md` placement and Tailwind spacing |
| ✅ Docs         | Has standalone `contract_{key}.md` |
| ✅ Mobile       | Verified on mobile breakpoints (Tailwind `sm`, `md`) |
| ✅ Visuals      | Uses consistent z-index, shadows, blend modes |
| ✅ Fallback     | Renders safely with default props |
| ✅ Import       | Lazy-loaded + tracked in `App.jsx` or `Pages.jsx`

---

## 🔐 2. LEGIT Route & Page Contract

A **page or route** is LEGIT only if:

- 🔁 Declared in `route-lock.md`
- 🎯 Uses LEGIT components exclusively
- ⚠️ Flags dev-only, prod-only, or test via route annotations
- 🔄 Supports Suspense fallback
- 👁️ Scroll and viewport triggers function correctly
- 🧼 Fails gracefully if component errors occur

---

## 🧪 3. LEGIT Validation Matrix

Each LEGIT unit must pass:

- [ ] Render Test (DOM presence, no throw)
- [ ] Animation Fire (triggered on scroll/load)
- [ ] Mobile Render (sm and md views confirmed)
- [ ] Fallback Test (props undefined, no crash)
- [ ] Console Log Marker or `trace.json` stamp
- [ ] SCS Sync Tag (e.g. `SCS3`, `SCS5`)

---

## 🧭 4. LEGIT Navigation Rules

To protect smooth page experience:

- ✅ All components must use `id` or `key` for scroll linkage
- ✅ All nav-linked sections must render anchor target
- ✅ Links must support keyboard navigation
- ❌ No hardcoded hash jumps unless section exists
- ✅ Every DOM section must return valid layout spacing

---

## 📦 5. LEGIT Export & Fork Safety

Any LEGIT module may be:

- ⬇️ Exported for use under `/legacy`, `/embed`, or `/dev`
- 🧪 Run in isolation with dummy prop injection
- 🔗 Shared via iframe or Next.js dynamic import
- ❌ Cannot depend on global state or non-SSR-safe refs

---

## 📘 Metadata & Declaration

Each LEGIT component must declare metadata via:

```js
export const metadata = {
  id: 'component_id',          // Following naming convention
  scs: 'SCS-COMPONENT-TYPE',   // Security compliance tag
  type: 'development|ui|core|atomic',  // Component type ('atomic' for V6 atomic components)
  doc: 'contract_component_name.md' // Reference to contract
}
```

---

## 🔒 LEGIT Compliance Status Flags

| Flag         | Meaning                                 |
| ------------ | --------------------------------------- |
| 🟢 `LEGIT`   | Fully compliant, safe for public use    |
| 🟡 `PENDING` | Missing mobile or animation validation  |
| 🔴 `BROKEN`  | Violates core rules or has render error |

---

## 🧠 LEGIT Governance Flow

All new components must:

1. Clone `contract_component_names.md` template
2. Pass checklist above
3. Be added to `route-lock.md` if used
4. Undergo `manual confirm` via Commander or agent
5. Be marked 🟢 in SCS map and sync logs

---

## ✅ Example LEGIT Entry (Hero Portal)

* Name: HeroPortal
* ID: `hero_portal`
* Contract: `contract_hero_portal.md`
* Rendered in: `dev_v4_cosmic.jsx`
* Verified ✅: Animation, Mobile, Layout, Docs, Props

---

## ✅ Example LEGIT Entry (Atomic Component)

* Name: MissionAtomic
* ID: `mission_atomic`
* Contract: `contract_mission_atomic.md`
* Type: `atomic`
* Rendered in: `v6_atomic.jsx`
* Verified ✅: Animation, Mobile, Layout, Docs, Props

---

This schema is now canon. All component additions or edits must comply or be tagged for isolation.

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.v1`

```

---

