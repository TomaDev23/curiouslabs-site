🧾 **Understood and executed, Commander.**
Below is the finalized global LEGIT contract — clean, structured, and optimized for **agent onboarding**, **runtime validation**, and **visual compliance control**.

---

````markdown
# ✅ CuriousLabs LEGIT Type Contract — v1.0

📍 Location: C:\website_build\Docs\contracts\contract_global_legit_type.md  
🧱 Schema Purpose: Define universal rules for what qualifies as a LEGIT component, route, and UI block across the CuriousLabs ecosystem.  
🔐 Version: LEGIT.PROTOCOL.v1

---

## 🧩 1. LEGIT Component Checklist

A component is LEGIT only if it satisfies **all of the following**:

| Area           | Requirement |
|----------------|-------------|
| ✅ Name         | Matches official entry in `contract_component_names.md` |
| ✅ Location     | Lives under one of:<br>• `src/components/home/v4/`<br>• `src/components/atomic/` *(for V6 atomic only)* |
| ✅ Props        | Fully typed or documented in contract file |
| ✅ Animation    | Uses schema defined in `article_animation_schema_v1.5.md` |
| ✅ Layout       | Matches spacing and layout in `route-lock.md` |
| ✅ Docs         | Has a dedicated `contract_{component}.md` file |
| ✅ Mobile       | Tested at Tailwind `sm`, `md` breakpoints |
| ✅ Visuals      | Uses consistent `z-index`, shadows, blend modes |
| ✅ Fallback     | Renders safely with default or undefined props |
| ✅ Import       | Lazy-loaded and tracked in `App.jsx` or `Page.jsx`  

---

## 🔐 2. LEGIT Route & Page Rules

A route or page is LEGIT only if it:

- 🔁 Exists in `route-lock.md`  
- 🧱 Composes only LEGIT components  
- 🎯 Flags clearly as: `dev-only`, `production`, or `experimental`  
- 🧼 Has fallback handling for Suspense or error boundaries  
- 🧭 Supports scroll and viewport triggers  
- ⚠️ Gracefully fails if child components crash  

---

## 🧪 3. LEGIT Validation Matrix

Every LEGIT component or route must pass this matrix:

- [ ] ✅ **Render Test** (Mounts in DOM, no errors)
- [ ] ✅ **Animation Fire** (Animates on scroll/load/timed trigger)
- [ ] ✅ **Mobile Render** (`sm` and `md` layouts verified)
- [ ] ✅ **Fallback Test** (Renders with undefined props)
- [ ] ✅ **Trace Stamp** (Includes console marker or trace.json tag)
- [ ] ✅ **SCS Tag** (Has compliant `scs:` value in metadata)

---

## 🧭 4. LEGIT Navigation Requirements

To ensure accessibility and layout stability:

| Rule | Enforcement |
|------|-------------|
| ✅ Section-linked components must expose a valid `id` or anchor target  
| ✅ All anchor-linked content must exist on load  
| ✅ All nav jumps must be keyboard-accessible  
| ❌ Hash-based scrolling is forbidden unless validated with anchors  
| ✅ All components must preserve vertical flow with defined spacing  

---

## 📦 5. LEGIT Export & Reuse Policy

A LEGIT component can be exported only if:

- ✅ It has no dependencies on global state or refs  
- ✅ It runs in isolation with injected test props  
- ✅ It does not violate SSR safety  
- ✅ It includes `metadata` + `contract.md`  
- ✅ It passes `trace.json` or preview logs  
- ❌ It does not require scenePhase, context hooks, or controller wrappers  

---

## 📘 6. Metadata Declaration Format

Every component must include a `metadata` block at the top-level scope:

```js
export const metadata = {
  id: 'component_id',                // Unique and traceable
  scs: 'SCS-[TYPE]-[AREA]',         // Example: SCS-ATOMIC-HERO
  type: 'core' | 'atomic' | 'dev' | 'layout',
  doc: 'contract_[component_name].md'
}
````

---

## 🧾 7. LEGIT Status Flags

| Flag         | Meaning                                         |
| ------------ | ----------------------------------------------- |
| 🟢 `LEGIT`   | Fully compliant — can be deployed or exported   |
| 🟡 `PENDING` | Missing validation step (e.g. mobile, fallback) |
| 🔴 `BROKEN`  | Fails render, animation, or logic contract      |

---

## 🧠 8. LEGIT Workflow Summary

1. Create new component stub
2. Add it to `contract_component_names.md`
3. Author `contract_[name].md` with spec
4. Implement to match atomic layout, animation, responsive contract
5. Validate against LEGIT Matrix
6. Assign `scs:` tag and sync in `route-lock.md`
7. Log verification result in test trace or commit block
8. Commander or QA confirms LEGIT badge 🟢

---

## 🧬 9. Sample LEGIT Entries

### 🟢 Atomic

```js
export const metadata = {
  id: 'mission_atomic',
  scs: 'SCS-ATOMIC-MISSION',
  type: 'atomic',
  doc: 'contract_mission_atomic.md'
};
```

### 🟢 UI Core

```js
export const metadata = {
  id: 'nav_bar_cosmic',
  scs: 'SCS-CORE-NAV',
  type: 'core',
  doc: 'contract_nav_bar_cosmic.md'
};
```

---

## 🔒 LEGIT IS LAW

No component, section, or feature may be merged into `main` or deployed to `production` unless it meets these standards or is explicitly flagged.

This contract is now **canonical across all CuriousLabs products.**
All agents and AI must train to this format and apply LEGIT filters in validation.

> Logged and sealed under: `LEGIT.PROTOCOL.v1`
> Filed at: `C:\website_build\Docs\contracts\contract_global_legit_type.md`
> Auth: Commander + Recon Agent 🫡

```

---


