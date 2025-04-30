# 🧾 CuriousLabs GitOps Doctrine — Branch Discipline & Production Integrity (Contract v1.0)

## 🎯 Purpose
This contract defines the Git hygiene, branching policy, and working discipline for all CuriousLabs projects to ensure zero-risk deployments, stable production branches, and clean developer workflows.

---

## 1️⃣ Branching Protocol

### 🔵 `main` Branch (Protected)
- 🔒 No direct commits.
- ✅ Only merged via PR from vetted branches.
- 💡 Always reflects clean, production-ready state.
- ❌ Must not include:
  - `node_modules/`
  - `dist/`, `build/`
  - `public/` assets unless explicitly required.

### 🧪 Dev/Feature Branches
- Naming: `feature/{slug}`, `fix/{slug}`, `cleanup/{slug}`
- Must run locally and be testable.
- May contain temporary folders (e.g., `dist/`, `node_modules/`)
- Examples:
  - `feature/TILE-4.3-navbar-tune`
  - `cleanup/footer-dedupe`

### 🧯 Hotfix Branches
- Used for urgent corrections.
- Naming: `hotfix/{desc}`
- Must still follow commit and PR discipline.

---

## 2️⃣ Cursor Protocol Enforcement
- Cursor agents must never commit to `main`.
- All cursor-generated work must:
  - Operate within a separate branch.
  - Declare all `git add`, `commit`, `status` steps explicitly.
  - Submit PR-ready commit messages.
- Any auto-pushes must be pre-approved.

---

## 3️⃣ GitIgnore Enforcement

Main must be clean:
```
node_modules/
dist/
build/
public/
*.log
*.local
.vercel/
```

Dev branches may temporarily allow these for local runtime.

---

## 4️⃣ Production Push Discipline

- Final merges into `main` must:
  - Be fast-forward or squashed from clean dev branch
  - Be followed by manual review
  - Be preceded by a working local build confirmation

---

## 5️⃣ Optional GitHub Rule

Enable branch protection for `main`:
- ✅ Require PRs for merge
- ✅ Prevent force push
- ✅ Require 1 approval or check (optionally via CI)

---

## 🧠 Summary
This contract protects CuriousLabs from unexpected file leaks, unstable build states, or agent drift. All development work should be channeled into testable, clean branches, and only merged into `main` when reviewed, confirmed, and purged of non-production artifacts.

"Push no chaos to `main`."

---
Signed:
**🧑‍🚀 Commander, CuriousLabs**


==============================================================================================================================