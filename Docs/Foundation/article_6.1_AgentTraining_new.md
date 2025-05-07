# Key Project Rules - LOCKED

After reading the provided files, I'm locking in these critical rules:

## 📘 DO_NOT_DEVIATE.md - Core Rules

1. **Documentation is Law**
   - All implementation must trace to documented specifications
   - If it's not in a doc, it doesn't exist

2. **Sacred Structure Must Be Preserved**
   - Folders must not be renamed or relocated
   - Component structure must follow declared architecture
   - The specified folder structure is immutable

3. **Stack Lock**
   - React for components
   - React Router for navigation
   - TailwindCSS for styling (no CSS modules, Styled Components)
   - No external component libraries

4. **Style Discipline**
   - TailwindCSS utility classes only
   - Custom colors from tailwind.config.js
   - Responsive styling via Tailwind breakpoints
   - Colors must match defined palette

5. **Component Rules**
   - Components must be standalone modules
   - Responsive across breakpoints
   - Free of backend integrations (visual/stub only)
   - Rendered from respective page files

6. **Asset Management**
   - Assets centralized in src/utils/assets.js
   - Images from specific directories only:
     - public/images/
     - public/images/logos/
     - public/images/svg/
   - No external CDN links or inline base64

7. **Hard Stops**
   - No additional npm packages without approval
   - No additional page routes without declaration
   - No performance-impacting animations
   - No templates or external component libraries
   - No hook implementation modifications
   - No routing implementation changes

## 🎨 CuriousLabs Visual Guidelines

1. **Color System**
   - Deep Black for main background
   - Curious Dark (700-900) for backgrounds, cards, gradients
   - Curious Purple (200-900) for primary accent, buttons, glows
   - Curious Blue (200-900) for secondary accent, gradients

2. **Visual Assets**
   - Circuit Pattern in low opacity
   - Noise Texture for depth
   - Gradient Blobs for visual interest
   - Logos in /public/images/logos/ as SVG format
   - Default style: Grayscale with hover color reveal

3. **Component Structure**
   - Core components: NavBar, Hero, LogoStrip, Services, etc.
   - Each component self-contained
   - Unified styling patterns
   - Consistent purple/blue theme

4. **Animation System**
   - Specific animation classes for different effects
   - Performance optimization with willChange: 'transform'
   - Subtle, non-distracting animations
   - Varied timing for depth perception

## 📄 Implementation Workflow

1. **Plan Before Coding**
   - Review visual references
   - Check Site Map for existing components
   - Plan integration with existing elements

2. **Component Development**
   - Structure -> Styling -> Animation -> Responsiveness

3. **Integration**
   - Ensure proper spacing and layout
   - Test transitions
   - Verify visual consistency

4. **Documentation**
   - Update Site Map
   - Update Mission Tracking
   - Descriptive commit messages

I lock these rules as my operational guidelines. I will:
- Follow the documented structure exactly
- Never modify core architecture
- Maintain the specified styling approach
- Respect the existing asset management system
- Only make changes explicitly requested
- Verify path references before any modifications
- Analyze existing code before making changes


**confirm you understand anything but that is ruining my work and is wasting time and resources**

I understand completely. Any deviation from the established rules wastes time and resources and ruins work that's already been done. 

To be clear:
- I will not create or modify files without explicit instructions
- I will respect the existing directory structure and asset locations
- I will not attempt to "fix" things based on assumptions
- I will analyze existing code thoroughly before suggesting any changes
- I will follow the exact path references already established in the codebase
- I will adhere strictly to the documentation and rules you've provided

My previous attempt at creating new SVG files and modifying components without proper understanding of the existing structure was incorrect and counterproductive. I commit to following your guidance precisely to avoid further wasted effort.


# CRITICAL RULE: DO NOT OVERCOMPLICATE SIMPLE TASKS

When a user requests a specific, targeted change:

1. **IMPLEMENT ONLY WHAT IS EXPLICITLY REQUESTED**
   - Do not add "improvements" or "enhancements" that weren't requested
   - Do not touch code unrelated to the specific request
   - Do not remove or replace existing functionality that works

2. **PRESERVE EXISTING CODE**
   - Assume the codebase is working as intended
   - Make minimal changes necessary to achieve the requested outcome
   - Never delete large sections of code without explicit permission

3. **LISTEN TO FEEDBACK IMMEDIATELY**
   - When the user says something isn't working, STOP and REASSESS
   - If the user reiterates their request, implement it EXACTLY as specified
   - Do not persist with a failed approach after receiving negative feedback

4. **WHEN IN DOUBT, ASK DON'T ASSUME**
   - Request clarification rather than guessing intent
   - Show proposed changes before implementing complex solutions
   - If the request seems simple, it probably is - don't overcomplicate it

5. **RESPECT USER EXPERTISE**
   - The user knows their project better than you do
   - When they provide a specific solution, implement it as specified
   - Don't substitute your judgment for the user's explicit instructions

**EXAMPLE OF FAILURE**: User repeatedly asks for a simple line to be added at the bottom of an image with specific styling. Instead of implementing this simple fix, the agent makes increasingly complex changes, removes working code, alters positioning, and introduces multiple issues while ignoring the straightforward solution provided by the user.


lets try again


you have mission and code resources. you dont need nothing but what i give, and you dont need to NOTHING beyond what i say. you caused me to reveret three sessions. this is waste of resources and my precious time. you understand that? you must stick to my plan, and when you have an issue you must freeze and ask what to do. i can solve any conflict with clear planning. you are not mission leader. you are a soldier in a squad. i am planning and in control of what to do when. you must follow the plan very very closely to avoid causing more damage and waste of resources!

read my rules file too

audit the plan, mark the code, simulate yourself using it to build a new atomic page. nothing but that. build it first, later we can do animations and details. you need to build it first and dont get lost on your way and do silly things like simplifying - does this project looks simple to you? its layerd carfully and you must work within it

planning in depth only go
