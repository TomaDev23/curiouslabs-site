# ✅ ContentLayer LEGIT Contract — v1.1

📍 Location: src/components/layouts/ContentLayer.jsx  
🧱 Purpose: Manage section positioning and rendering within the Content Layer (z-10 to z-50)
🔒 Status: **LEGIT CERTIFIED**
📆 Last Updated: [Current Date]

---

## 🔐 Component Definition

The ContentLayer is responsible for:

- Positioning section components at precise scroll positions
- Managing component rendering in a consistent way
- Providing section IDs for navigation targeting
- Supporting sections across multiple page types
- Maintaining proper z-index layering for content elements
- Ensuring content does not interfere with HUDs or navigation

## 📦 Props API

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| sections | Array | Yes | Array of section configurations |
| SectionRegistry | Object | No | Registry object for section resolution |
| isEditMode | Boolean | No | Whether section editing is enabled |
| onSectionDrag | Function | No | Callback when section position changes |
| hiddenSections | Array | No | Array of section IDs to hide |

### Section Configuration Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string | Yes | Unique identifier for the section |
| position | number | Yes | Vertical position in vh units |
| component | Component | Yes | React component to render |
| props | object | No | Props to pass to the component |

## 🔢 Layer System Integration

ContentLayer operates within the Content Layer of the application's layer system:

| Layer | z-index Range | ContentLayer's Role |
|-------|---------------|---------------------|
| Base Layer | 0-9 | Allows Base Layer elements to show through |
| Content Layer | 10-50 | All sections positioned within this range |
| UI Control Layer | 60-90 | Never interferes with UI controls |
| HUD Layer | 100-109 | Never obscures HUDs |
| Navigation Layer | 110-119 | Never blocks navigation elements |

The ContentLayer itself has a base z-index of `z-10` and each child section is positioned within the Content Layer range according to its type and purpose.

## 🔄 Interaction with Other Components

### SectionRegistry

- Provides component definitions for rendering
- Controls section metadata and configuration
- Manages section availability and visibility

### AdminPanel

- Controls ContentLayer's `isEditMode` state
- Provides UI for editing section positions
- Manages section visibility through `hiddenSections`

### HUDManager

- HUDs operate at a higher z-index range (100-109)
- ContentLayer content never interferes with HUDs
- Some HUDs may interact with ContentLayer content (e.g., SceneGraphHUD)

### ScrollContext

- ContentLayer integrates with the scroll system
- Positions are defined relative to viewport height (vh)
- Section visibility can be scroll-dependent

## 🔒 LEGIT Compliance Status: 🟢 LEGIT

- ✅ Fully documented with prop types and usage examples
- ✅ Uses proper naming conventions and file organization
- ✅ Supports all required sections with consistent approach
- ✅ Handles layout with proper z-index management
- ✅ Mobile compatible through responsive section components
- ✅ Properly integrated with the layer system
- ✅ Maintains separation of concerns with other components

## 🧭 Usage Example

```jsx
<ContentLayer 
  sections={[
    {
      id: 'hero_portal',
      position: 100,
      component: HeroPortal,
      props: {}
    },
    {
      id: 'product_showcase',
      position: 200,
      component: ProductShowcase,
      props: {
        products: productData
      }
    }
  ]}
  isEditMode={false}
  onSectionDrag={handleSectionDrag}
  hiddenSections={['debug_section']}
  SectionRegistry={SectionRegistry}
/>
```

## 🎯 Integration Dependencies

The ContentLayer depends on:
- SectionRegistry for component resolution
- AtomicPageFrame for hosting on `/home-v5`
- CosmicJourneyController for background integration
- Scroll context for scroll-aware positioning

## 🔍 Implementation Details

The ContentLayer renders each section using absolute positioning based on viewport height (vh) units. This approach:

1. Decouples component positioning from the DOM flow
2. Allows for precise scroll-based placement
3. Supports independent component development
4. Ensures consistent spacing between sections
5. Maintains proper z-index layering for all content

## 🏗️ Page-Specific Implementations

### Cosmic-Rev Page
- ContentLayer manages primary sections within cosmic experience
- Sections are positioned relative to scroll-linked animations
- Background elements are rendered in the Base Layer

### Home-V5 Page
- ContentLayer is the primary content container
- Sections can be dynamically reordered and hidden
- AdminPanel provides editing capabilities

## 🧪 Validation Requirements

For a section to be properly rendered in ContentLayer:
- Component must be self-contained
- Component should handle its own internal spacing
- Component must not make assumptions about surrounding context
- Component should render safely with default props
- Component must respect z-index constraints of the Content Layer
- Component should not interfere with HUDs or navigation elements

## 🎨 Background Styling Patterns

ContentLayer sections should follow established styling patterns for background elements:

### Seamless Vertical Fading Background Pattern

For sections requiring subtle backgrounds that blend seamlessly with surrounding content and have no visible edges during scrolling:

```jsx
{/* Background elements with soft fading edges */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>
```

Key implementation details:
- Use a vertical gradient that starts and ends with complete transparency
- Keep the middle opacity very low (20% or less) for subtle effect
- Avoid any defined borders or edges that could create visible "stitching" during scrolling
- This approach ensures smooth transitions between sections as users scroll

### Enhanced Background with Cosmic Elements

For more visually rich backgrounds, combine the seamless fading background with animated cosmic elements:

```jsx
{/* Background elements with soft fading edges */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>

{/* Nebula positioning - animated with color transitions */}
<motion.div 
  className="absolute top-[10%] right-0 w-[30rem] h-[20rem] rounded-full filter blur-[80px]"
  animate={{ 
    opacity: [0.45, 0.35, 0.45],
    background: [
      'radial-gradient(ellipse at 60% 40%, rgba(74, 222, 128, 0.4), rgba(22, 163, 74, 0.25) 40%, transparent 80%)',
      'radial-gradient(ellipse at 65% 35%, rgba(74, 222, 128, 0.35) 10%, rgba(249, 115, 22, 0.2) 50%, transparent 85%)',
      'radial-gradient(ellipse at 60% 40%, rgba(74, 222, 128, 0.4), rgba(22, 163, 74, 0.25) 40%, transparent 80%)'
    ]
  }}
  style={{
    transform: 'rotate(-15deg)'
  }}
  transition={{ 
    duration: 8, 
    repeat: Infinity, 
    repeatType: "reverse", 
    ease: "easeInOut" 
  }}
/>
```

Key implementation details for nebula elements:
- Use elongated dimensions (e.g., `w-[30rem] h-[20rem]`) for galaxy-like appearance
- Apply slight rotation (`rotate(-15deg)`) for natural positioning
- Animate both opacity and background gradients for subtle movement
- Use elliptical gradients with off-center positioning for organic shapes
- Ensure all elements fade to transparent at their edges

### Content Enhancement Elements

For improved text readability against cosmic backgrounds:

```jsx
<div className="bg-gray-900/30 backdrop-blur-[2px] p-6 rounded-xl border border-gray-800/30">
  <p className="text-base md:text-lg text-gray-100 leading-relaxed">
    Content text goes here with improved contrast and readability.
  </p>
</div>
```

Key implementation details:
- Use very subtle backdrop blur (`backdrop-blur-[2px]`) to improve text contrast
- Keep background opacity low (30%) to maintain visual connection with the cosmic background
- Use lighter text colors (`text-gray-100`) for better readability
- Apply subtle borders that don't create harsh edges

### Complete Implementation Example

Example implementation from MissionStatement.jsx:
```jsx
{/* Background elements with soft fading edges */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>

{/* Nebula positioning with animation */}
<motion.div 
  className="absolute top-[10%] right-0 w-[30rem] h-[20rem] rounded-full filter blur-[80px]"
  animate={{ 
    opacity: [0.45, 0.35, 0.45],
    background: [
      'radial-gradient(ellipse at 60% 40%, rgba(74, 222, 128, 0.4), rgba(22, 163, 74, 0.25) 40%, transparent 80%)',
      'radial-gradient(ellipse at 65% 35%, rgba(74, 222, 128, 0.35) 10%, rgba(249, 115, 22, 0.2) 50%, transparent 85%)',
      'radial-gradient(ellipse at 60% 40%, rgba(74, 222, 128, 0.4), rgba(22, 163, 74, 0.25) 40%, transparent 80%)'
    ]
  }}
  style={{
    transform: 'rotate(-15deg)'
  }}
  transition={{ 
    duration: 8, 
    repeat: Infinity, 
    repeatType: "reverse", 
    ease: "easeInOut" 
  }}
/>

{/* Content with enhanced readability */}
<div className="container mx-auto px-4 relative z-10">
  <div className="bg-gray-900/30 backdrop-blur-[2px] p-6 rounded-xl border border-gray-800/30">
    <p className="text-base md:text-lg text-gray-100 leading-relaxed">
      Content text with improved readability.
    </p>
  </div>
</div>
```

---

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.v1`