# 🧠 CuriousLabs Git Doctrine – Branch Discipline & Deployment Strategy

## 🎯 Purpose
To enforce clean separation between development and deployment environments. This doctrine ensures:
- `main` remains a **pure, deploy-only branch**
- `dev` holds all **local build tools, runtime folders, and WIP components**
- Every change to `main` is intentional, tested, and layered

---

## 🧱 Branch Roles

### 🔐 `main` – Deploy-Only Branch
**Purpose:**
- This is the version Vercel deploys.
- It should never be run or built locally.

**Characteristics:**
- No `node_modules/`, `dist/`, `.vercel/`, `.DS_Store`, or runtime-only folders
- No `.vercelignore` file
- No temporary assets or test code
- No experimental components
- Only source files, config files, SVGs, and declared assets

**Allowed Files:**
- `src/`
- `public/images/` and `/logos/`
- `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- `.gitignore` (but not `.vercelignore`)
- Design-complete, tested components

**Forbidden in `main`:**
- Anything not essential to clean deployment
- Placeholder content
- Dev-only experiments

### 🛠️ `dev` – Development Workspace
**Purpose:**
- All visual design, component development, testing, and local work happen here

**Characteristics:**
- `node_modules/`, `.vercel/`, `dist/` are present (but ignored via `.gitignore`)
- All components and design changes are created and validated here
- You only push to `main` when a section is **visually complete and deploy-ready**

**Tools:**
- `.gitignore` enforces hygiene
- Optional `.vercelignore` may exist (local use only, not to be pushed)
- `npm run dev` and `npm run build` are used only here

---

## 🔄 Flow: `dev → main`

### ✅ When to Push to Main
Only push from `dev → main` when:
- The section is fully designed and implemented (e.g. Hero, LogoStrip, Footer)
- You’ve tested local build on `dev`
- You’ve confirmed no runtime folders are included

### 🧼 Steps to Push
```bash
# While on dev
npm run build    # Confirm it builds

# Manually copy ONLY final assets/code to main
# Switch to main
git checkout main

# Copy in only finalized components and assets
# Add, commit, and push cleanly

git add .
git commit -m "TILE 4.X: Finalize [component] design – deploy-ready"
git push origin main
```

---

## 🚫 Forbidden Practices
- Never develop or test directly in `main`
- Never commit `node_modules/`, `.vercel/`, or build artifacts
- Never push `.vercelignore` to main
- Never merge `dev` into `main` automatically — all transfers must be clean, controlled, manual

---

## 📦 Deployment Summary
| Branch | Purpose           | Buildable | Deployable | Has Runtime | Allowed to Push to Vercel |
|--------|--------------------|-----------|------------|-------------|----------------------------|
| main   | Deploy only        | ❌        | ✅         | ❌          | ✅                         |
| dev    | Development branch | ✅        | ❌         | ✅          | ❌                         |

---

## 🧠 Remember
> CuriousLabs isn’t just a site — it’s a **deploy pipeline with discipline.**
> `main` is your polished façade. `dev` is your lab. Treat them accordingly.

