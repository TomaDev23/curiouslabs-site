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

---

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.v1` 