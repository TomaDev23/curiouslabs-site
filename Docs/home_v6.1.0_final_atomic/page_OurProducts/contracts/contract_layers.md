# Visual Layers & Z-Index Contract
**Version:** 6.1.0 - "AEGIS-Integrated Layering System"  
**Component:** `HorizontalProductScrollV6`  
**Status:** ✅ LEGIT  
**Last Updated:** December 2024  

---

## **Overview**
Comprehensive visual layering system for the three-page horizontal scroll experience. Ensures proper stacking order, prevents z-index conflicts, and maintains visual hierarchy across AEGIS, Products, and Services pages.

---

## **Global Z-Index Hierarchy**

### **System Layers (0-10)**
```
z-0   → Background gradients, base environments
z-1   → Nebula effects, atmospheric layers  
z-2   → Particles, stars, cosmic debris
z-5   → ThoughtTrails Canvas layer, special content
z-10  → Main content containers, card backgrounds
```

### **Interactive Layers (15-30)**
```
z-15  → Interactive content, enhanced elements
z-20  → Secondary navigation, floating UI
z-30  → Primary navigation, pagination dots
```

### **Overlay Layers (50+)**
```
z-50  → Debug overlay, development tools
z-100 → Modal overlays, critical system messages
```

---

## **Page-Specific Layer Structures**

### **AEGIS Page (Index 0)**
```
Background Environment (z-0)
├── Base gradient: linear-gradient cosmic theme
├── Grid overlay: perspective-corrected cosmic grid (opacity-20)
└── Dynamic noise texture (opacity-10, mix-blend-overlay)

Atmospheric Effects (z-1)
├── Nebula layer 1: lime/cyan radial gradients (blur-40px)
└── Nebula layer 2: secondary atmospheric effects (blur-60px)

Particle Systems (z-2)
├── Static particles: 15 floating orbs with glow
├── Data streams: 5 animated vertical streams
└── Cosmic orbs: 8 floating animated elements

Content Layer (z-10)
├── Left column: Main AEGIS content
├── Right column: AegisCore visualization
└── Feature cards: 4 architecture highlights

AegisCore Visualization (z-15)
├── Central core planet with pulse effects
├── Orbital rings: 3 animated dashed circles
├── Product nodes: 4 orbiting elements
└── Data flow particles: Dynamic orbital particles
```

### **Products Page (Index 1)**
```
Background Environment (z-0)
├── Enhanced gradient: purple/magenta cosmic theme
├── Hexagonal grid: animated stroke patterns
└── Floating geometric shapes: 6 rotating elements

Atmospheric Effects (z-1)
├── Color-shifting nebula effects
└── Dynamic background position animation

Particle Systems (z-2)
├── Floating cosmic orbs: size/color randomized
└── Grid pattern animations: hexagonal SVG

ThoughtTrails Layer (z-5)
├── Canvas container: [data-thought-trails-layer="true"]
├── Comet trails: organic movement patterns
├── Spark effects: emanating particles
└── Dynamic glow effects: accent color synchronized

Content Structure (z-10)
├── Left panel: ProductInfoPanel (AEGIS MasterCard)
├── Main grid: ProductGrid container
├── Featured card: Large product display
├── Supporting cards: 3 contextual arrows
└── Metrics panel: Performance data display

Enhanced Interactions (z-15)
├── Card hover effects: scale and glow animations
├── Arrow animations: pointing left toward featured
└── Color synchronization: accent color propagation
```

### **Services Page (Index 2)**
```
Background Environment (z-0)
├── Orange/cosmic gradient theme
├── Perspective grid: horizontal/vertical SVG lines
└── Enhanced noise texture overlay

Atmospheric Effects (z-1)
├── Orange-themed nebula: multiple elliptical gradients
├── Animated cosmic nexus: central focal point
└── Dynamic scale/position animations

Particle Systems (z-2)
├── Cosmic particles: 15 elements with orange theme
├── Shooting stars: 3 diagonal trajectory animations
└── Floating orbs: 8 animated cosmic elements

Typography Layer (z-10)
├── Ghost text background: subtle depth layer (opacity-5)
├── Main typewriter text: animated character reveal
├── Floating context words: "Innovation", "Ethics", etc.
└── Interactive cursor: animated blinking indicator

UI Elements (z-20)
├── Phase indicator: top-left stellar status
├── Progress visualization: bottom-center arc
├── Skip hints: keyboard interaction prompts
└── Stellar activation hints: Enter key prompts

Stellar Message (z-50)
├── StellarMessageComponent: full-screen overlay
├── Breathing effects: cosmic expansion/contraction
└── Dissolution sequence: transcendence animations
```

---

## **Component-Level Z-Index Management**

### **EnhancedProductCard (Products Page)**
```
Card Background (relative)
├── Backdrop blur container
├── Noise texture overlay (opacity-15)
└── Hover glow effects (group-hover)

Content Layer (z-10)
├── Product icon: centered illustration
├── Title and summary: accent color themed
├── Feature list: bullet points with dots
└── Footer controls: view buttons and hints

Animation Layers
├── Hover scale: transform-based (no z-index)
├── Color transitions: background/border changes
└── Motion effects: framer-motion animations
```

### **AegisCore Visualization**
```
Core Planet (relative)
├── Surface details: multiple gradient overlays
├── Energy hotspots: 3 pulsing elements
├── Core glow: animated pulse effects
└── Surface rings: nested border elements

Orbital System (absolute positioning)
├── Pulse waves: expanding rings from core
├── Orbital rings: 3 rotatingdashed circles
├── Product nodes: 4 positioned elements
└── Connection lines: conditional hover effects

Particle Effects (absolute positioning)
├── Dynamic particles: orbital movement
├── Static particles: 8 positioned elements
└── Animation overlays: CSS keyframe effects
```

---

## **Layer Interaction Rules**

### **Event Propagation**
```javascript
// ThoughtTrails (z-5) - pointer-events: none
// Allows click-through to cards below

// Cards (z-10) - cursor: pointer  
// Captures click events for navigation

// UI Elements (z-20+) - pointer-events: auto
// Always interactive, highest priority
```

### **Color Synchronization**
```javascript
// Products Page: Accent color propagation
updateAccentColor → {
  ThoughtTrails: Canvas color update,
  Cards: Border/glow color update,  
  Metrics: Data point color update
}
```

### **Animation Coordination**
```javascript
// Page transitions affect all layers
horizontalPageChange → {
  ThoughtTrails: Activate/deactivate,
  Particles: Show/hide based on page,
  Content: Slide transition coordination
}
```

---

## **Performance Considerations**

### **Layer Optimization**
- **Backdrop Blur:** Limited to essential elements (cards, panels)
- **Particle Count:** Capped per page (15 particles maximum)
- **Animation Cleanup:** Proper disposal on page transitions
- **Canvas Management:** ThoughtTrails only active on Products page

### **Memory Management**
- **Component Unmounting:** Clear intervals and event listeners
- **Animation Disposal:** Cancel requestAnimationFrame loops
- **Event Cleanup:** Remove window event listeners
- **State Reset:** Clear dynamic particle arrays

---

## **Debug & Development**

### **Debug Mode Features (z-50)**
```javascript
// Ctrl+D activation
Debug Overlay → {
  Grid visualization: 12-column layout overlay,
  Z-index labels: Element stacking indicators,
  State display: Current page and scroll lock status,
  Performance metrics: Frame rate and memory usage
}
```

### **Visual Testing**
- **Layer Separation:** Each z-index level visually distinct
- **Click Targeting:** Proper event handling through layers
- **Animation Sync:** Coordinated transitions across layers
- **Color Consistency:** Accent color propagation verification

---

## **Responsive Behavior**

### **Breakpoint Adaptations**
```css
/* Mobile: Simplified layer structure */
@media (max-width: 768px) {
  .particle-systems { display: none; }
  .background-complexity { reduced; }
  .animation-intensity { lowered; }
}

/* Large screens: Enhanced effects */
@media (min-width: 1920px) {
  .particle-count { increased; }
  .glow-effects { enhanced; }
  .grid-density { higher; }
}
```

---

## **Contract Validation**

### **Layer Integrity Checks**
- [ ] No z-index conflicts between pages
- [ ] Click events reach intended targets
- [ ] Visual hierarchy maintained across breakpoints
- [ ] Animation performance stays above 60fps
- [ ] Memory usage remains stable during navigation

### **Cross-Page Consistency**
- [ ] Background themes differentiated but cohesive
- [ ] Particle systems scale appropriately
- [ ] UI elements maintain consistent positioning
- [ ] Debug overlay functions across all pages

---

## **Maintenance Guidelines**

### **Safe Z-Index Ranges**
- **0-10:** Background and atmospheric layers
- **15-30:** Interactive content and navigation
- **50+:** Overlays and system-level elements

### **Adding New Layers**
1. **Identify appropriate z-index range**
2. **Test interaction with existing layers**
3. **Verify click event propagation**
4. **Update this contract documentation**

### **Performance Monitoring**
- **Layer Count:** Keep total under 20 per page
- **Animation Load:** Monitor frame rate impact
- **Memory Usage:** Track particle system overhead
- **Event Listeners:** Audit and cleanup regularly

---

**Contract Approved:** ✅  
**Implementation Status:** COMPLETE  
**Next Review:** Upon layer system modifications or performance issues
