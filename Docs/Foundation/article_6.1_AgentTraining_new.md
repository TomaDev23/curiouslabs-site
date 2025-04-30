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
