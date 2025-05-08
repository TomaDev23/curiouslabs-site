## 🧠 Mission Simulation: Promote Cosmic V4 to Home Route + Final Route Audit

### 📊 Current State Audit

I've analyzed the routing system for the CuriousLabs website.

### Target Files:
- Source: `src/App.jsx` - Contains all route definitions
- Source: `src/components/NavBar.jsx` - Contains navigation links including "/v4" reference

### Key Requirements:
- Promote `/v4` (DevV4CosmicPage) to be the main homepage at `/`
- Preserve the legacy homepage as a backup at `/legacy-home`
- Update any navigation links that reference `/v4`
- Verify all routes are properly defined and lazy-loaded

## 🛠️ Execution Plan

### Step 1: Modify App.jsx to promote v4 to homepage
```powershell
code src/App.jsx
```
- Add new route for "/" using DevV4CosmicPage with Suspense fallback
- Comment out the old Home route
- Add a new `/legacy-home` route that renders the old Home component
- Ensure all route definitions remain intact

### Step 2: Update any navigation references to "/v4"
```powershell
code src/components/NavBar.jsx
```
- Change any `/v4` links to reference `/legacy-home` instead
- Ensure development mode preview links are updated correctly

### Step 3: Verify all routes are properly configured
```powershell
npm run dev
```
- Verify the following routes:
  - `/` - Should now load DevV4CosmicPage
  - `/legacy-home` - Should load the original homepage
  - `/v4` - Should still work for backward compatibility
  - Other critical routes: `/products`, `/about`, `/contact`, etc.

### Step 4: Build and preview test
```powershell
npm run build
npm run preview
```
- Verify the site loads correctly at `/`
- Confirm no routing errors, blank pages, or console errors
- Verify navigation works to all key sections

## ✅ Success Criteria
- [ ] DevV4CosmicPage loads as the default homepage at `/`
- [ ] Legacy homepage is accessible at `/legacy-home`
- [ ] All navigation links properly updated to reference correct routes
- [ ] No 404 or blank pages when accessing any route
- [ ] All major routes still exist and render correctly
- [ ] All pages are properly lazy-loaded with Suspense
