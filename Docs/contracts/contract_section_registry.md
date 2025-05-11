# ✅ SectionRegistry LEGIT Contract — v1.1

📍 Location: src/config/SectionRegistry.js  
🧱 Purpose: Define and manage available sections across page types with consistent layer management
🔒 Status: **LEGIT CERTIFIED**
📆 Last Updated: [Current Date]

---

## 🔐 SectionRegistry Definition

The SectionRegistry is a centralized configuration system that:

- Defines all available sections and their metadata
- Maps section IDs to corresponding React components
- Controls section availability, positioning, and ordering
- Maintains consistency across different page types
- Ensures sections respect the layer system requirements
- Provides section visibility management

## 📦 Registry Data Structure

```js
// Section Registry Format
export const SectionRegistry = {
  // Section ID maps to configuration object
  'section_id': {
    component: SectionComponent,        // React component to render
    name: 'Section Display Name',       // Human-readable name
    description: 'Section description',  // Brief description of purpose
    available: true,                    // Whether available for selection
    defaultProps: {},                   // Default props for component
    layerType: 'content',               // Which layer system it belongs to
    zIndexRange: [10, 30]               // min/max z-index values allowed
  }
};

// Default configurations for pages
export const HOME_V5_SECTIONS = [
  { id: 'section_id', position: 100 },
  // Additional sections with positions...
];

export const COSMIC_REV_SECTIONS = [
  { id: 'section_id', position: 100 },
  // Additional sections with positions...
];
```

## 🔢 Layer System Integration

The SectionRegistry enforces layer system compliance for all sections:

| Layer | z-index Range | SectionRegistry Role |
|-------|---------------|----------------------|
| Content Layer | 10-50 | Ensures sections use appropriate z-indices |
| UI Control Layer | 60-90 | Controls UI elements for section management |

Each section entry includes:
- `layerType`: Designates which layer the section belongs to
- `zIndexRange`: Defines allowed z-index range for internal elements
- Validation logic to ensure layer system compliance

## 🔄 Page-Specific Implementations

### Cosmic-Rev Page Integration

- Sections are scroll-linked with 3D background elements
- Positions are defined relative to cosmic journey animations
- Section visibility keyed to scroll position

```js
export const COSMIC_REV_SECTIONS = [
  { id: 'hero_portal', position: 0 },
  { id: 'cosmic_journey', position: 100 },
  { id: 'product_showcase', position: 250 },
  // Additional cosmic sections...
];
```

### Home-V5 Page Integration

- Sections are independently positioned in viewport height units
- Section positions can be dynamically adjusted via AdminPanel
- Section visibility can be toggled via configuration

```js
export const HOME_V5_SECTIONS = [
  { id: 'hero_portal', position: 0 },
  { id: 'company_mission', position: 100 },
  { id: 'feature_showcase', position: 200 },
  // Additional home-v5 sections...
];
```

## 📋 Registry Management API

```js
// Get a section component by ID
SectionRegistry.getComponent('section_id');

// Get all available sections
SectionRegistry.getAvailableSections();

// Get default section positions for a specific page
SectionRegistry.getDefaultPositions('home-v5');

// Check if section ID is valid
SectionRegistry.isValidSection('section_id');

// Get section metadata
SectionRegistry.getSectionMetadata('section_id');
```

## 🔍 Visibility Management

The SectionRegistry now works with visibility management:

```js
// Get visible sections (filtering hidden sections)
SectionRegistry.getVisibleSections(allSections, hiddenSections);

// Check if a section is visible
SectionRegistry.isSectionVisible('section_id', hiddenSections);

// Get default visibility settings
SectionRegistry.getDefaultVisibility();
```

## 🔒 LEGIT Compliance Status: 🟢 LEGIT

- ✅ Fully documented with standardized format
- ✅ Uses proper naming conventions for sections
- ✅ Maintains consistent component associations
- ✅ Provides comprehensive section management
- ✅ Ensures layer system compliance
- ✅ Supports multiple page types
- ✅ Implements visibility management

## 🧪 Validation Requirements

For a section to be valid in the registry:

- Must have a unique ID following naming conventions
- Must reference a React component that exists
- Must include all required metadata
- Must specify appropriate layer type and z-index range
- Must have valid description and name values
- Must respect layer system boundaries
- Must handle visibility state appropriately

---

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.v1` 