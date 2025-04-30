# CuriousLabs Website Mission Handover

## Project Overview
This is a React-based corporate website for CuriousLabs built with Vite, React Router, and TailwindCSS. The project follows a strict architectural and component structure defined by "TILE" phases, with clear rules about component organization and rendering.

## Key Project Rules

1. **DO NOT DEVIATE from approved component structures**
   - Components must follow exact import/export patterns specified in mission documents
   - Homepage structure must strictly adhere to the TILE 4.1 contract

2. **Asset Path Discipline**
   - Logo files must be in `/public/images/`
   - Partner logos must be in `/public/images/logos/`
   - SVG rendering via central assets.js utility

3. **Navigation Architecture**
   - NavBar must be imported in index.jsx and remain sticky
   - Routing handled through App.jsx with React Router

4. **Component Modularity**
   - Homepage strictly renders only: NavBar, HeroMain, SolutionsPreview, FeedbackBlock, FooterMain
   - No inline layout/wrapper divs allowed in index.jsx

## Common Mistakes (Warning)

1. **Homepage Structure Drift**
   - Never add wrappers, main tags, or divs to index.jsx
   - Never import legacy Hero components (use HeroMain only)

2. **Broken Asset Paths**
   - Always ensure logo paths resolve against `/public/images/`
   - Never create placeholder images - use git history to restore original assets

3. **Execution Failures**
   - Never use concurrent delete/create operations for critical files
   - Always validate existence of components before importing them
   - Always verify paths before file operations

4. **GitOps Mistakes**
   - Never push directly to main without validation
   - Never commit partial or untested changes
   - Always run local verification before commit

## Recent Recovery Context

The project recently underwent TILE 4.2C recovery to fix:
1. Missing logo assets (restored from git history)
2. Re-adding NavBar to homepage
3. Enforcing strict component structure

The recovery followed a clean, incremental approach:
1. First restoring directories and assets
2. Then updating component imports
3. Finally testing and committing changes

## Current Status

- **Branch**: main (ahead of origin by multiple commits)
- **Current TILE**: 4.2C complete
- **Working State**: Stable, ready for next phase
- **Pending**: Final verification and new feature branch

## For New Agents

1. Always study the TILE documentation before making changes
2. Follow precise step-by-step plans with validation between steps
3. When in doubt, simulate operations before executing
4. Prefer relative file paths for component imports
5. Never modify files with "DO NOT MODIFY" comments

Remember: This project follows strict contracts and conventions - creative solutions should respect these boundaries absolutely. The guiding principle is: "Cursor does not think. Cursor enforces."
