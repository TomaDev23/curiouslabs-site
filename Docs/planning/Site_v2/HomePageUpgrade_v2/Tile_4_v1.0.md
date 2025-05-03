
# 🧠 CURSOR TASK BLOCK — TILE 4: Interactive Scroll Sync

## 🔎 Current State Analysis
We need to add scroll-triggered animations to several components in the `src/components/home/v4/` directory. These components will need to be wrapped in `motion.section` elements with specific animation properties.

## 📋 Implementation Plan

### Step 1: Update AboutMission.jsx
```powershell
# Read AboutMission.jsx
$aboutMissionPath = "src/components/home/v4/AboutMission.jsx"
$aboutMissionContent = Get-Content -Path $aboutMissionPath -Raw

# Update component to add scroll animations
$updatedAboutMission = $aboutMissionContent -replace 
    '<section\s+className="([^"]*)"', 
    '<motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="$1 pt-32 pb-32"'

# Update closing tag
$updatedAboutMission = $updatedAboutMission -replace '</section>', '</motion.section>'

# Write changes back to file
Set-Content -Path $aboutMissionPath -Value $updatedAboutMission
```

### Step 2: Update ServicesOrbital.jsx
```powershell
# Read ServicesOrbital.jsx
$servicesOrbitalPath = "src/components/home/v4/ServicesOrbital.jsx"
$servicesOrbitalContent = Get-Content -Path $servicesOrbitalPath -Raw

# Update component to add scroll animations
$updatedServicesOrbital = $servicesOrbitalContent -replace 
    '<section\s+className="([^"]*)"', 
    '<motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="$1 pb-32"'

# Update closing tag
$updatedServicesOrbital = $updatedServicesOrbital -replace '</section>', '</motion.section>'

# Write changes back to file
Set-Content -Path $servicesOrbitalPath -Value $updatedServicesOrbital
```

### Step 3: Update ProjectsLogbook.jsx
```powershell
# Read ProjectsLogbook.jsx
$projectsLogbookPath = "src/components/home/v4/ProjectsLogbook.jsx"
$projectsLogbookContent = Get-Content -Path $projectsLogbookPath -Raw

# Update section wrapper
$updatedProjectsLogbook = $projectsLogbookContent -replace 
    '<section\s+className="([^"]*)"', 
    '<motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="$1 pt-32 pb-32"'

# Update closing section tag
$updatedProjectsLogbook = $updatedProjectsLogbook -replace '</section>', '</motion.section>'

# Add staggered animations to project cards
$updatedProjectsLogbook = $updatedProjectsLogbook -replace 
    '(<div(\s+)className="project-card[^>]*>)',
    '<motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: ${cardIndex} * 0.1 }}
      viewport={{ once: true }}$2className="project-card'

# Update closing div tags for cards
$updatedProjectsLogbook = $updatedProjectsLogbook -replace '(</div>)(\s*)(</div>)(\s*)(</div>)(\s*)(<!-- End project card -->)', '</motion.div>$2</div>$4</div>$6<!-- End project card -->'

# Write changes back to file
Set-Content -Path $projectsLogbookPath -Value $updatedProjectsLogbook
```

### Step 4: Update CommunityHub.jsx
```powershell
# Read CommunityHub.jsx
$communityHubPath = "src/components/home/v4/CommunityHub.jsx"
$communityHubContent = Get-Content -Path $communityHubPath -Raw

# Update section wrapper
$updatedCommunityHub = $communityHubContent -replace 
    '<section\s+className="([^"]*)"', 
    '<motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="$1"'

# Update closing section tag
$updatedCommunityHub = $updatedCommunityHub -replace '</section>', '</motion.section>'

# Add animation to trending post feed
$updatedCommunityHub = $updatedCommunityHub -replace 
    '(<div(\s+)className="trending-posts[^>]*>)',
    '<motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}$2className="trending-posts'

# Update closing div tag for feed
$updatedCommunityHub = $updatedCommunityHub -replace '(</div>)(\s*)(<!-- End trending posts -->)', '</motion.div>$2<!-- End trending posts -->'

# Write changes back to file
Set-Content -Path $communityHubPath -Value $updatedCommunityHub
```

### Step 5: Update ContactTerminal.jsx
```powershell
# Read ContactTerminal.jsx
$contactTerminalPath = "src/components/home/v4/ContactTerminal.jsx"
$contactTerminalContent = Get-Content -Path $contactTerminalPath -Raw

# Update section wrapper
$updatedContactTerminal = $contactTerminalContent -replace 
    '<section\s+className="([^"]*)"', 
    '<motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="$1 pb-40"'

# Update closing section tag
$updatedContactTerminal = $updatedContactTerminal -replace '</section>', '</motion.section>'

# Add animation to CTA block
$updatedContactTerminal = $updatedContactTerminal -replace 
    '(<div(\s+)className="cta-block[^>]*>)',
    '<motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}$2className="cta-block'

# Update closing div tag for CTA block
$updatedContactTerminal = $updatedContactTerminal -replace '(</div>)(\s*)(<!-- End CTA block -->)', '</motion.div>$2<!-- End CTA block -->'

# Write changes back to file
Set-Content -Path $contactTerminalPath -Value $updatedContactTerminal
```

## 🔧 Technical Requirements

1. AboutMission.jsx
   - Wrap in motion.section
   - Add entry animation: opacity 0→1, y 40→0
   - Add pt-32 pb-32 spacing

2. ServicesOrbital.jsx
   - Ensure content doesn't jump with proper animation
   - Add same motion.section wrapper and animations
   - Add pb-32 spacing

3. ProjectsLogbook.jsx
   - Wrap in motion.section
   - Add staggered card animations with delays (0.1, 0.2, 0.3)
   - Add pt-32 pb-32 spacing

4. CommunityHub.jsx
   - Animate trending post feed
   - Use motion.div with opacity/y float
   - Ensure layout remains responsive

5. ContactTerminal.jsx
   - Add CTA block animation
   - Add pb-40 to bottom for elegant page end
   - Wrap in motion.section

## 🧪 Validation Plan
1. Run the development server to test animations
2. Scroll through page to verify smooth entry animations
3. Confirm animations only trigger once with viewport={{ once: true }}
4. Verify spacing between sections
5. Check responsive behavior across breakpoints

## 📝 Final Verification Steps
```powershell
# Start dev server to test
cd C:/website_build
npm run dev

# Visit in browser
Start-Process "http://localhost:5182/dev/v4-cosmic"

# Validate all requirements:
# 1. Clean section reveals
# 2. Orbit and cards animate in without jitter
# 3. No visual stutter between blocks
# 4. Proper spacing between sections
```

This plan strictly follows the TILE 4 requirements, touching only the specified files and implementing scroll-triggered animations with the correct parameters for each component.



✅ The plan is **technically sufficient** to hand off to Cursor **as-is** — all paths, rules, and scoped targets are clearly defined. However, for *maximum precision* and **bulletproof Cursor behavior**, here’s the **ideal final prep**:

---

# 🧠 CURSOR TASK BLOCK — TILE 4: Interactive Scroll Sync

### 🔒 Directives

* ❗ Use PowerShell-safe commands only (no `&&`)
* 🧾 Only touch the following files:

  * `src/components/home/v4/AboutMission.jsx`
  * `src/components/home/v4/ServicesOrbital.jsx`
  * `src/components/home/v4/ProjectsLogbook.jsx`
  * `src/components/home/v4/CommunityHub.jsx`
  * `src/components/home/v4/ContactTerminal.jsx`
* 💄 TailwindCSS only — no external styling or class imports
* 🧠 Do not modify `HeroPortal.jsx` or `SpaceCanvas.jsx` (TILE 3 is sealed)
* 🛑 No edits to `/src/pages/` or routing logic
* 🔍 Animations must use `motion.section` wrappers (Framer Motion)
* 🔁 Use `viewport={{ once: true }}` to avoid animation replay

---

### 🎯 Goals Per Component

#### `AboutMission.jsx`

* Wrap in `motion.section`
* Entry: `initial={{ opacity: 0, y: 40 }}` ➝ `whileInView={{ opacity: 1, y: 0 }}`
* Transition: `duration: 0.6`
* Add `pt-32 pb-32` for breathing

---

#### `ServicesOrbital.jsx`

* Ensure orbit model doesn't jump or get cut off
* Wrap text+model in `motion.section`
* Add same entry animation + `pb-32` spacing

---

#### `ProjectsLogbook.jsx`

* Wrap section in `motion.section`
* Each card: `motion.div` with staggered delays:

  * Card 1: `delay: 0.1`
  * Card 2: `delay: 0.2`
  * Card 3: `delay: 0.3`
* Add `pt-32 pb-32`

---

#### `CommunityHub.jsx`

* Animate trending post feed entry
* Use `motion.div` with opacity/y float
* Maintain layout snap across breakpoints

---

#### `ContactTerminal.jsx`

* Wrap CTA block in `motion.section`
* Entry fade with `y: 30` and `opacity: 0 ➝ 1`
* Add final `pb-40` to end page elegantly

---

### ✅ Post-Mission Checks

```powershell
npm run dev
Start-Process "http://localhost:5182/dev/v4-cosmic"
```

* Scroll top-to-bottom, validate:

  * Clean section reveals
  * Orbit and cards animate in without jitter
  * No visual stutter between blocks

---

💥 **This block is fully Cursor-ready.**
You can copy-paste this entire block as the execution task and it's locked.
Shall I do that now and wrap it under TILE 4.0 Mission Start?
