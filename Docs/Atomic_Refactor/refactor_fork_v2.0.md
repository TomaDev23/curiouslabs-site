
# 🧠 Atomic Rebuild - ProcessCards Implementation Plan

## 📁 File Structure Changes

```
src/
├── components/
│   ├── atomic/               # New directory for atomic components
│   │   └── ProcessAtomic.jsx # New atomic process component
│   └── home/v6/              # Existing components (unchanged)
├── pages/
│   ├── v6_atomic.jsx         # New atomic page route (already created)
│   └── v6_home.jsx           # Existing page (unchanged)
└── Docs/
    └── home_v6/
        └── atomic/
            └── ProcessAtomic_contract.md  # Documentation for the atomic component
```

## 🔄 Implementation Steps

### 1. Create Directory Structure

```bash
# Create directories
mkdir -p src/components/atomic
mkdir -p Docs/home_v6/atomic

# Create files
touch src/components/atomic/ProcessAtomic.jsx
touch Docs/home_v6/atomic/ProcessAtomic_contract.md
```

### 2. Implementation of ProcessAtomic.jsx

```jsx
/**
 * @component ProcessAtomic
 * @description Atomic implementation of the process cards section
 * @version 1.0.0
 */

import React from 'react';
import { motion } from 'framer-motion';

// Self-contained data - no external imports
const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Plan',
    desc: 'Define the goal and map the system to achieve it.',
    color: 'text-lime-400',
    bgColor: 'bg-lime-400/10',
    borderColor: 'border-lime-400/30',
    shadowColor: 'shadow-lime-400/20',
  },
  {
    id: 2,
    title: 'Build',
    desc: 'Develop, test, and iterate until stable.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    shadowColor: 'shadow-blue-400/20',
  },
  {
    id: 3,
    title: 'Integrate',
    desc: 'Connect parts and begin first usage loops.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    shadowColor: 'shadow-cyan-400/20',
  },
  {
    id: 4,
    title: 'Deploy',
    desc: 'Launch confidently with visibility and fallback.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/30',
    shadowColor: 'shadow-pink-400/20',
  },
];

const ProcessAtomic = () => {
  // Self-contained responsive state
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Handle responsive behavior
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <section className="min-h-screen bg-curious-dark-900 py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Section background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-curious-dark-900 to-curious-dark-800 opacity-50"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A systematic approach to building sophisticated AI solutions that deliver real value.
          </p>
        </div>
        
        {/* Process steps - Z-pattern on desktop, stacked on mobile */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-12'}`}>
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              className={`
                p-6 rounded-xl backdrop-blur-sm border 
                ${step.borderColor} ${step.bgColor}
                transition-all duration-300 hover:scale-105
                ${step.shadowColor} shadow-lg
                ${!isMobile && index % 2 !== 0 ? 'justify-self-start' : ''}
                ${!isMobile && index % 2 === 0 ? 'justify-self-end' : ''}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={`text-3xl font-bold ${step.color}`}>
                  {step.id.toString().padStart(2, '0')}
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${step.color}`}>
                    {step.title}
                  </h3>
                  <p className="text-white/80">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Optional: Connection lines between cards on desktop */}
        {!isMobile && (
          <div className="absolute left-1/2 top-1/2 w-0.5 h-3/4 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-blue-500/20 via-cyan-400/20 to-pink-400/20 z-0"></div>
        )}
      </div>
    </section>
  );
};

export default ProcessAtomic;
```

### 3. Update Page Routing in v6_atomic.jsx

```jsx
/**
 * @page v6_atomic.jsx
 * @desc Atomic rebuild of CuriousLabs V6 homepage
 * @status Experimental – In development
 * @structure Flat scene-based components, no nested layout controllers
 * @source Forked from: v6_home.jsx
 */

import React from 'react';
import SceneControllerV6 from '../components/home/v6/SceneControllerV6';
import LayoutWrapper from '../components/home/v6/LayoutWrapper';
import CosmicBackgroundSystemV6 from '../components/home/v6/CosmicBackgroundSystemV6';
import NavBarCosmic from '../components/home/v6/NavBarCosmic';

// --- TEMPORARY: Scene imports will be replaced one by one ---
import HeroSequenceV6 from '../components/home/v6/HeroSequenceV6';
import HorizontalProductScrollV6 from '../components/home/v6/HorizontalProductScrollV6';
import ServicesOrbital from '../components/home/v6/ServicesOrbital';
// import ProcessCards from '../components/home/v6/ProcessCards'; // Removed

// --- ATOMIC: New atomic components ---
import ProcessAtomic from '../components/atomic/ProcessAtomic'; // Added

import ContactTerminal from '../components/home/v6/ContactTerminal';

const V6AtomicPage = () => {
  return (
    <SceneControllerV6>
      <LayoutWrapper>
        <CosmicBackgroundSystemV6 />
        <NavBarCosmic />

        {/* ATOMIC SCENES START HERE */}
        <HeroSequenceV6 />
        <HorizontalProductScrollV6 />
        <ServicesOrbital />
        <ProcessAtomic /> {/* Replaced ProcessCards with ProcessAtomic */}
        <ContactTerminal />
        {/* ATOMIC SCENES END */}

      </LayoutWrapper>
    </SceneControllerV6>
  );
};

export default V6AtomicPage;
```

### 4. Documentation in ProcessAtomic_contract.md

```markdown
# ProcessAtomic Component Contract

## 📋 Component Details
- **File Path**: `src/components/atomic/ProcessAtomic.jsx`
- **Component Name**: `ProcessAtomic`
- **Version**: 1.0.0
- **Type**: Atomic, Self-Contained

## 🧩 Component Structure
The ProcessAtomic component is a self-contained section displaying the company's process steps in a visually appealing layout.

## 📦 Props
This component does not accept any props as it is fully self-contained.

## 🎨 Color Strategy
Each process step has its own color theme:
- Plan: Lime (#84cc16)
- Build: Blue (#3b82f6)
- Integrate: Cyan (#22d3ee)
- Deploy: Pink (#d946ef)

Colors are applied to:
- Step numbers
- Step titles
- Card borders
- Card shadows

## 📐 Layout Notes
- **Desktop**: Z-pattern layout with even-numbered steps on the left and odd-numbered steps on the right
- **Mobile**: Stacked vertically for better readability
- **Responsive**: Breakpoint at 768px (md) for layout switching
- **Spacing**: Consistent padding and margins for visual balance

## 🔄 Animation Plan
- Simple entrance animations using Framer Motion
- Hover effects for cards using Tailwind transitions
- No scroll-triggered animations to keep the component self-contained
- Future enhancement: Optional intersection observer for scroll-triggered animations

## 🔗 Dependencies
- React
- Framer Motion (for basic animations)
- Tailwind CSS (for styling)

## 🧪 Future Improvements
- Add optional props for customizing colors and content
- Implement intersection observer for scroll-triggered animations
- Add more interactive elements like tooltips or expanded states
```

## 🚀 Final Execution Plan

1. **Create Directories**:
   ```bash
   mkdir -p src/components/atomic
   mkdir -p Docs/home_v6/atomic
   ```

2. **Create Component File**:
   ```bash
   touch src/components/atomic/ProcessAtomic.jsx
   ```

3. **Create Documentation**:
   ```bash
   touch Docs/home_v6/atomic/ProcessAtomic_contract.md
   ```

4. **Implement Component**: Add the code to ProcessAtomic.jsx as outlined above

5. **Update v6_atomic.jsx**: Replace the ProcessCards import with ProcessAtomic

6. **Test in Browser**: Ensure the component renders properly at all viewport sizes

7. **Validate Component**:
   - Verify it renders on all breakpoints
   - Confirm no console errors
   - Check that all four steps display correctly
   - Ensure no external scene references exist
   - Verify it visually replaces the old ProcessCards component

## 🔍 Expected Result

A clean, self-contained ProcessAtomic component that:
- Contains all its own data, logic, and styling
- Renders consistently across devices
- Maintains the visual identity of the original component
- Does not depend on global context or other components
- Provides a solid foundation for the atomic rebuild approach

This implementation will serve as a pattern for atomizing the remaining components, starting with the simplest ones and gradually tackling more complex sections like the product carousel.
