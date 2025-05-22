
# OpsBentoCluster Implementation Plan

## Current Issues vs. Reference Examples
After analyzing the examples closely, our implementation has these specific shortcomings:
- **Size**: Current grid is confined to a `max-w-md` constraint, making it ~30-40% smaller than examples
- **Layout**: Grid is too uniform with inadequate spacing between items
- **Visual Depth**: Missing the glass-like depth effects, rich gradients, and outer/inner glow seen in examples
- **Content Presentation**: Text and visual elements lack proper hierarchy and spacing

## Detailed Implementation Plan

### 1. Grid Layout & Structure

```jsx
// From (current)
<div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-md">
  <BentoItem item={OPS_BENTO_ITEMS[0]} className="col-span-1 md:col-span-2 row-span-2" />
  {/* other items with simple spans */}
</div>

// To (planned)
<div className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-6 w-full max-w-[720px]">
  {/* Main feature tile (large) */}
  <BentoItem 
    item={OPS_BENTO_ITEMS[0]} 
    className="col-span-4 md:col-span-7 row-span-4 md:row-span-5" 
  />
  
  {/* Feature tiles with varied spans */}
  <BentoItem item={OPS_BENTO_ITEMS[1]} className="col-span-2 md:col-span-5 row-span-2" />
  <BentoItem item={OPS_BENTO_ITEMS[2]} className="col-span-2 md:col-span-3 row-span-2" />
  <BentoItem item={OPS_BENTO_ITEMS[3]} className="col-span-3 md:col-span-5 row-span-2" />
  {/* etc. with more varied sizes */}
</div>
```

### 2. Visual Layer Implementation

#### Bento Item Base (Glass Effect)
```jsx
// Current (basic)
<motion.div
  style={{
    background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.2) 0%, rgba(14, 165, 233, 0.1) 100%)',
    boxShadow: '0 0 15px rgba(34, 211, 238, 0.1)',
  }}
/>

// Planned (rich multi-layer)
<motion.div className="relative rounded-2xl overflow-hidden">
  {/* Background base layer */}
  <div 
    className="absolute inset-0 z-0" 
    style={{
      background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.6) 0%, rgba(14, 165, 233, 0.2) 60%, rgba(139, 92, 246, 0.3) 100%)',
      opacity: 0.7,
    }}
  />
  
  {/* Noise texture overlay */}
  <div 
    className="absolute inset-0 z-0 opacity-20" 
    style={{ 
      backgroundImage: 'url("/assets/noise.png")',
      mixBlendMode: 'overlay',
    }}
  />
  
  {/* Inner highlight */}
  <div 
    className="absolute inset-0 z-0 opacity-30" 
    style={{
      background: 'linear-gradient(to bottom right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 20%, transparent 50%)',
    }}
  />
  
  {/* Glass border effect */}
  <div className="absolute inset-0 z-0 rounded-2xl border border-white/10" />
  
  {/* Content container */}
  <div className="relative z-10 p-5 h-full">
    {/* Content goes here */}
  </div>
</motion.div>
```

### 3. Specific Visual Features for Each Tile Type

#### Image Tile (Cosmic Canvas)
```jsx
// Instead of basic circular gradient
<div className="flex items-center justify-center">
  <div className="relative">
    {/* Base glow */}
    <div 
      className="absolute inset-0 blur-2xl opacity-60"
      style={{
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, rgba(14, 165, 233, 0.1) 70%)',
        transform: 'scale(1.5)',
      }}
    />
    
    {/* Main image or visualization */}
    <div className="relative w-32 h-32 md:w-48 md:h-48">
      <div className="absolute inset-0 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
        <Image 
          src="/assets/ops/cosmic-visualization.png" 
          alt="Cosmic data visualization"
          width={192}
          height={192}
          className="object-cover"
        />
      </div>
      
      {/* Orbital ring */}
      <div 
        className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-spin-slow"
        style={{ 
          width: '110%', 
          height: '110%', 
          left: '-5%', 
          top: '-5%' 
        }}
      />
    </div>
  </div>
</div>
```

#### Feature Tiles with Icons
```jsx
<div className="flex flex-col h-full">
  {/* Icon with glow */}
  <div className="mb-3">
    <div className="relative inline-block">
      <div className="absolute inset-0 blur-md opacity-70" 
        style={{ 
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, transparent 70%)',
          transform: 'scale(1.5)',
        }} 
      />
      <Icon 
        name={getIconForFeature(item.title)} 
        className="relative z-10 text-white h-7 w-7"
      />
    </div>
  </div>
  
  {/* Title with proper spacing */}
  <h3 className="font-medium text-white text-xl mb-2">{item.title}</h3>
  
  {/* Description with better opacity */}
  <p className="text-sm text-white/70 leading-relaxed">
    {item.description}
  </p>
</div>
```

### 4. Animation Implementation

#### Hover Animation
```jsx
// Current
whileHover={{ 
  scale: 1.05,
  transition: { duration: 0.3 },
}}

// Planned
whileHover={{ 
  scale: 1.03,
  boxShadow: `0 0 30px rgba(56, 189, 248, 0.4)`,
  transition: { 
    scale: { type: "spring", stiffness: 300, damping: 15 },
    boxShadow: { duration: 0.2 }
  },
}}
// With child animations in hover state
<motion.div
  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-300"
  initial={{ width: '30%', opacity: 0.5 }}
  whileHover={{ width: '100%', opacity: 1 }}
  transition={{ duration: 0.3 }}
/>
```

#### Staggered Entry Animation
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    } 
  }
};

// In the render:
<motion.div 
  className="grid grid-cols-12 gap-6" 
  variants={container}
  initial="hidden"
  animate="show"
>
  <motion.div variants={item} className="col-span-7 row-span-4">
    <BentoItem item={OPS_BENTO_ITEMS[0]} />
  </motion.div>
  {/* More items */}
</motion.div>
```

### 5. Icon & Asset Integration

Create icons for each feature:
```jsx
const featureIcons = {
  'Serverless Parsing': 'ServerlessIcon',
  'Built on FastAPI': 'ApiIcon',
  'AI-Driven Runtime': 'AiRuntimeIcon',
  'Human Dashboard': 'DashboardIcon',
  'Human in the Loop': 'HumanLoopIcon'
};

// Custom icon component
const Icon = ({ name, className }) => {
  switch (name) {
    case 'ServerlessIcon':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 4V20M18 10H6M18 16H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* More path details */}
        </svg>
      );
    case 'ApiIcon':
      // SVG for API icon
    // Other icon cases
  }
};
```

### 6. Responsive Behavior Implementation

```jsx
// Base grid layout with responsive adjustments
<div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
  {/* Different spans for different screen sizes */}
  <BentoItem 
    item={OPS_BENTO_ITEMS[0]} 
    className="col-span-6 sm:col-span-5 md:col-span-7 row-span-3 md:row-span-4" 
  />
  
  {/* Conditional rendering for smallest screens */}
  <BentoItem 
    item={OPS_BENTO_ITEMS[1]} 
    className="col-span-3 sm:col-span-3 md:col-span-5 row-span-2" 
  />
  
  {/* Hide some items on mobile */}
  <div className="hidden sm:block col-span-3 md:col-span-5 row-span-2">
    <BentoItem item={OPS_BENTO_ITEMS[5]} />
  </div>
</div>
```

## 7. Implementation Timeline

1. **Structure & Layout (Day 1)**
   - Rebuild grid container with proper grid-cols-12 system
   - Define responsive breakpoints and spans for all tiles
   - Set proper proportions and spacing

2. **Visual Layer Building (Day 1-2)**
   - Create multi-layer background with gradients, textures
   - Implement glass effect with proper blending modes
   - Build border highlighting and shadow effects

3. **Content & Components (Day 2)**
   - Design and implement icons for each feature
   - Optimize typography and text layout
   - Add visual elements like data visualizations

4. **Animations & Interactions (Day 3)**
   - Implement staggered entry animations
   - Create hover effects with proper transitions
   - Add idle animations (pulsing, subtle movements)

5. **Responsive Testing & Refinement (Day 3)**
   - Test across multiple viewport sizes
   - Optimize for mobile and tablet
   - Final visual polish and performance tuning

## File Structure Updates Needed

```
src/
  components/
    home/
      v6/
        ops/
          OpsBentoCluster.jsx      # Main component
          BentoItem.jsx            # Extracted component for reuse
          icons/                   # Icons for features
            ServerlessIcon.jsx
            ApiIcon.jsx
            # etc.
          utils/
            animations.js         # Animation variants and configs
            gradients.js          # Predefined gradients and effects
```

This implementation plan provides concrete details for transforming our current basic bento grid into a sophisticated, visually rich component that matches the modern aesthetics shown in the reference examples.


============================================================

# OpsBentoCluster Implementation Plan (LEGIT Compliant)

I've reviewed the implementation plan against the LEGIT contract requirements. Here's the updated plan that fully complies with the LEGIT standards:

## LEGIT Compliance Verification

| Area           | LEGIT Requirement | Implementation Plan Compliance |
|----------------|-------------------|-----------------------|
| ✅ Name         | Matches naming convention | `OpsBentoCluster` follows CamelCase component naming |
| ✅ Location     | Correct directory path | Will be placed in `src/components/home/v6/ops/` |
| ✅ Props        | Fully typed + documented | Will implement TypeScript interfaces with JSDoc comments |
| ✅ Animation    | Uses proper config | Will use Framer Motion with proper configuration |
| ✅ Layout       | Complies with spacing | Using Tailwind's grid system with proper spacing |
| ✅ Docs         | Has contract doc | Will add metadata with reference to contract doc |
| ✅ Mobile       | Verified breakpoints | Implementing responsive design across sm, md breakpoints |
| ✅ Visuals      | Consistent styling | Using consistent z-index, shadows, blend modes |
| ✅ Fallback     | Safe default rendering | Adding fallbacks for missing images or content |
| ✅ Import       | Proper loading | Will support lazy-loading |

## LEGIT-Compliant Implementation Details

### 1. Component Declaration with Metadata

```jsx
/**
 * @metadata
 * @component OpsBentoCluster
 * @description Modern bento grid layout for OpsPipe feature visualization
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 * @scs SCS5
 * @doc contract_ops_bento_cluster.md
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { OpsBentoItemType } from './types';
```

### 2. Type Safety with Interfaces

```typescript
// Add to types.ts or include in component file
export interface OpsBentoItemType {
  id: number;
  type: 'image' | 'text';
  title?: string;
  label?: string;
  description?: string;
  src?: string;
  icon?: string;
}

interface OpsBentoClusterProps {
  /** Custom class name for the component */
  className?: string;
  /** Optional callback for click events */
  onItemClick?: (item: OpsBentoItemType) => void;
}

interface BentoItemProps {
  /** Item data object */
  item: OpsBentoItemType;
  /** Custom class name for positioning */
  className?: string;
  /** Whether item is interactive */
  interactive?: boolean;
}
```

### 3. Animation System per LEGIT Standards

```jsx
// Use animation variants pattern from LEGIT contract
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    } 
  }
};

// Animation must fail gracefully as per LEGIT
const safeMotion = (useReducedMotion: boolean, variants: any) => {
  return useReducedMotion ? {} : variants;
};
```

### 4. Rendering with Suspense Support

```jsx
// Main component with suspense-friendly rendering
const OpsBentoCluster: React.FC<OpsBentoClusterProps> = ({ className = '', onItemClick }) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Fallback content if data doesn't load
  if (!OPS_BENTO_ITEMS || OPS_BENTO_ITEMS.length === 0) {
    return (
      <div className="min-h-[300px] flex justify-center items-center">
        <p className="text-white/70">Feature visualization loading...</p>
      </div>
    );
  }
  
  return (
    // Content here, properly configured for layout
  );
};

// Export metadata for LEGIT tracking
OpsBentoCluster.displayName = 'OpsBentoCluster';
export const metadata = {
  id: 'ops_bento_cluster',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_ops_bento_cluster.md'
};

export default OpsBentoCluster;
```

### 5. Layout Compliance & Responsive Design

```jsx
// LEGIT-compliant responsive layout
<motion.div 
  className={`${className} w-full max-w-[720px]`}
  variants={safeMotion(prefersReducedMotion, containerVariants)}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
    {/* Multiple breakpoint spans per LEGIT */}
    <motion.div 
      variants={safeMotion(prefersReducedMotion, itemVariants)}
      className="col-span-6 sm:col-span-5 md:col-span-7 row-span-3 md:row-span-4"
    >
      <BentoItem 
        item={OPS_BENTO_ITEMS[0]} 
        interactive={true}
      />
    </motion.div>
    
    {/* Properly handle mobile breakpoints with fallbacks */}
    {/* More items with responsive classes */}
  </div>
</motion.div>
```

### 6. Safe DOM Rendering & Accessibility

```jsx
// Ensuring LEGIT-compliant accessibility
const BentoItem: React.FC<BentoItemProps> = ({ item, className, interactive = false }) => {
  // LEGIT states tracking for render safety
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Error boundary protection
  if (hasError) {
    return (
      <div className={`${className} rounded-2xl bg-black/30 p-4`}>
        <p className="text-white/50 text-sm">Content unavailable</p>
      </div>
    );
  }
  
  return (
    <motion.div
      className={`${className} relative rounded-2xl overflow-hidden ${
        interactive ? 'cursor-pointer' : ''
      }`}
      whileHover={interactive ? { scale: 1.03 } : {}}
      onHoverStart={() => interactive && setIsHovered(true)}
      onHoverEnd={() => interactive && setIsHovered(false)}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={item.title || item.label}
    >
      {/* Multi-layer background with proper z-index and visual consistency */}
      {/* Content with fallbacks */}
    </motion.div>
  );
};
```

### 7. Implementation Timeline with LEGIT Validation

1. **Structure & Layout (Day 1)**
   - Build grid system with LEGIT mobile compliance
   - Set up TypeScript interfaces and prop validation
   - Test with dummy components to verify layout

2. **Visual Layer Building (Day 1-2)**
   - Create visual elements following LEGIT z-index standards
   - Implement glass effect with consistent blend modes
   - Add proper error states and fallbacks

3. **Animation & LEGIT Compliance (Day 2)**
   - Implement animations with reduced-motion support
   - Add `useReducedMotion` hook integration
   - Create entry animations with LEGIT-compliant triggers

4. **Accessibility & Testing (Day 3)**
   - Add ARIA attributes to all interactive elements
   - Test keyboard navigation
   - Verify tab order and focus states

5. **LEGIT Validation Matrix Testing (Day 3)**
   - Run manual tests for all LEGIT validation points
   - Verify against LEGIT checklist
   - Document component with contract reference

### 8. File Structure (LEGIT Compliant)

```
src/
  components/
    home/
      v6/
        ops/
          OpsBentoCluster.tsx       # Main component (LEGIT metadata)
          BentoItem.tsx             # Sub-component
          types.ts                  # TypeScript interfaces
          animations.ts             # Animation configs
          icons/                    # SVG icons for features
          contract_ops_bento_cluster.md  # LEGIT contract doc
```

## LEGIT Validation Matrix Checklist

- [ ] Render Test: Component renders with default props
- [ ] Animation Fire: Animations trigger on scroll/load
- [ ] Mobile Render: sm, md, and lg breakpoints verified
- [ ] Fallback Test: Component handles missing data gracefully
- [ ] Console Log: Component logs its render in development mode
- [ ] SCS Tag: Component has proper SCS5 tag

This implementation plan now fully complies with the LEGIT contract requirements, ensuring the OpsBentoCluster component will integrate properly with the existing architecture while providing the modern, sophisticated visual design requested.
