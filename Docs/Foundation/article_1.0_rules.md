# 🧭 CuriousLabs Landing Page – Cursor Mission Context

> **⚠️ LEGACY DOCUMENT**: This is a historical document from early development. For current project information, please refer to the authoritative contracts in `Docs/contracts/`, particularly `route-lock.md` and `article_Welcome_agent.md`.

## 🎯 Mission Objective

Build a **modern, elegant, AI-native landing page** for **CuriousLabs**, an elite CodeOps service lab.  
The site will showcase:
- Services (AI-enhanced debugging, testing, security, docs)
- Real case logs (CLI + markdown)
- Mission intake form (submit error/test → return TILE)
- Visual identity aligned with hacker/elite/code lab aesthetics

Primary stack: **React + TailwindCSS**, built inside **Cursor** using image-to-code prompt engineering.

---

## ⚙️ Execution Rules (Do Not Deviate)

- ❌ **Do NOT** use templates or external component libraries (no Bootstrap, no MUI)
- ✅ **Use only TailwindCSS** utility classes (`text-5xl`, `bg-gradient-to-r`, etc.)
- ✅ Each section must be modular and exportable as a standalone component
- ✅ All mission logic (submissions, approvals) is **not active** — stubbed or visual only
- ✅ Buttons and forms must be styled and laid out, but do not need backend integration yet
- ❌ Do not add random animations, overlays, or illustrations without command
- ✅ Layout fidelity must be **as close as possible to the uploaded screenshots**
- ✅ Mobile responsiveness is required via Tailwind breakpoints (`sm:`, `md:`, etc.)
- ✅ File/folder structure must be clean and production-aligned:
  - `components/Hero.jsx`
  - `components/Services.jsx`
  - `components/Testimonials.jsx`
  - `pages/index.jsx`

---

## 📁 Reference Assets

- ✅ Uploaded UI screenshots (6 PNGs)
- ✅ MidJourney prompt packs for visual hero sections
- ✅ Service descriptions and mission logs (to be inserted later)
- 🧠 Tagline: _"You send a mess. I return a TILE."_

---

## 🔒 Scope Control

| Feature                  | Status       | Notes                          |
|--------------------------|--------------|--------------------------------|
| Hero + Tagline           | ✅ Required   | Primary branding section       |
| Services Grid            | ✅ Required   | Must match 2-column layout     |
| Logos / Partners Strip   | 🟢 Optional   | Use dummy logos for now        |
| Testimonials             | ✅ Required   | 3-card slider or static blocks |
| Mission Logs (Case MDs)  | 🟢 Stubbed    | Will be added post-build       |
| Form Submission Flow     | 🟢 Stub Only  | Structure only, no backend     |
| Responsive Layout        | ✅ Mandatory  | Mobile-first via Tailwind      |
| Code Clarity             | ✅ Required   | Must pass ESLint + be readable |

---

## 📦 Final Output

- All components rendered in Tailwind/React
- One scrollable landing page (can later be split into routes)
- `.md` version of this file included in `/docs/PRD_curiouslabs_landing.md`
- Screenshots archived in `/assets/ui_refs/`

---

## 📜 Last Directive

> Treat this site as **the external face of an elite tactical dev lab**.
> It must feel smart, clean, fast — like code that could write code.

End of Brief.



### Analysis Output Template
```
## 📊 Current State Audit

I've analyzed the requirements and resource files for [TILE].

### Target Files:
- Source: `[source_file_path]` 
- Test: `[test_file_path]` (to be created/modified)
- Contract: `[contract_file_path]` (to be created/modified)

### Key Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Coverage Requirements:
- Target: ≥[X]% coverage
- [Specific testing requirements]
```

## 🧠 Phase 2: Simulation

### Simulation Process
1. Draft implementation structure (method signatures, class relationships)
2. Outline test cases with expected behaviors
3. Identify potential implementation challenges
4. Create a contract draft if required

### Simulation Output Template
```
## 🧠 Mission Simulation

### Phase 1: [Component] Implementation
```python
# [Brief implementation snippet]
```

### Phase 2: Test Implementation
```python
# [Brief test snippet]
```

### Phase 3: [Additional phases as needed]
```

## ❓ Phase 3: Question Formulation

### Question Categories
1. **Implementation Clarity**: Questions about ambiguous requirements
2. **Integration Points**: Questions about how components interact
3. **Edge Cases**: Questions about handling exceptional scenarios
4. **Validation Criteria**: Questions about success verification

### Question Template
```
## ❓ Questions Before Execution

1. **[Category]**: [Specific question about implementation detail]?

2. **[Category]**: [Specific question about architecture]?

3. **[Category]**: [Specific question about validation]?
```

## 🛠️ Phase 4: Plan Presentation

### Plan Components
1. Detailed step-by-step implementation sequence
2. Tool commands with exact syntax
3. Verification points and test strategies
4. Success criteria with measurable outcomes

### Plan Template
```
## 🛠️ Execution Plan

### Step 1: [First implementation step]
```powershell
[Command with proper PowerShell syntax]
```

### Step 2: [Second implementation step]
```powershell
[Command with proper PowerShell syntax]
```

### Step [N]: Validation
```powershell
[Validation command]
```

## ✅ Success Criteria
- [ ] [Measurable criterion 1]
- [ ] [Measurable criterion 2]
- [ ] [Measurable criterion 3]