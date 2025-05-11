# 🔐 Welcome, Agent: CuriousLabs Enterprise System

📍 Location: `Docs/contracts/article_Welcome_agent.md`  
🧱 Purpose: Authoritative onboarding reference for AI assistants working with the CuriousLabs platform
🔒 Status: **LEGIT CERTIFIED**
📆 Version: 1.0.0

---

## 🌟 Enterprise Declaration

You are now interfacing with an **Enterprise-Grade Production System**. The CuriousLabs platform represents a complex, multi-layered architecture with strict compliance requirements, separation of concerns, and carefully engineered systems. This is not a casual project - it is a professional, commercial platform with established patterns and protocols.

**Every action you take must be performed with:**
- Utmost respect for existing architecture
- Careful attention to layering and separation of concerns 
- Perfect adherence to established contracts
- Zero tolerance for shortcuts or non-compliant implementations

The system's complexity requires thoughtful, measured responses rather than quick solutions that might compromise its integrity.

---

## 🔒 Core Behavior Rules and Limitations

As an agent operating within this system, you MUST:

1. **Never modify core architecture** without explicit authorization
2. **Always respect layer boundaries** and z-index constraints
3. **Never introduce unauthorized components** or dependencies
4. **Always follow LEGIT certification** requirements for any new code
5. **Never bypass HUDManager** for HUD management
6. **Always maintain proper content layering** in the z-index system
7. **Never introduce conflicting styles** that break layout integrity
8. **Always check existing implementations** before suggesting new patterns
9. **Never suggest direct DOM manipulation** outside established patterns
10. **Always use established hooks** rather than creating duplicates

**Critical Limitations:**
- You may NOT modify routes without explicit permission
- You may NOT change z-index ranges for any layer
- You may NOT implement HUDs outside the HUD layer
- You may NOT use non-Tailwind styling approaches
- You may NOT modify ScrollDebugOverlay z-index below 120
- You may NOT introduce components that break LEGIT compliance

---

## ⚖️ LEGIT Compliance Requirements

### The LEGIT Principle

**L**egacy compatible  
**E**fficient rendering  
**G**lobal responsive design  
**I**nteractive without blocking  
**T**ransparent operations

**ALL** components, modifications, and additions to the system MUST be LEGIT certified:

1. Every file must include a standardized metadata block:
```jsx
export const metadata = {
  id: 'component_id',          // Following naming convention
  scs: 'SCS-COMPONENT-TYPE',   // Security compliance tag
  type: 'development|ui|core',  // Component type
  doc: 'contract_component_name.md' // Reference to contract
};
```

2. Every component must have adequate documentation
3. Every component must respect its assigned layer
4. Every component must be properly responsive
5. Every component must handle its own state appropriately
6. Every proposal must reference the relevant contract

**No exceptions will be made.** A component that is not LEGIT compliant cannot be accepted into the system.

---

## 📚 Contract of Contracts

The following contracts form the authoritative reference for all system operations:

### Core System Contracts

| Contract | Purpose | Key Areas |
|----------|---------|-----------|
| **contract_control_layers.md** | Defines the z-index layer system | Layer boundaries, component placement, z-index ranges |
| **route-lock.md** | Authoritative route configuration | URL paths, component mapping, lazy loading |
| **contract_huds_rules.md** | Rules for HUD implementation | HUD management, positioning, categories |
| **contract_section_registry.md** | Section management | Page sections, visibility, positioning |
| **contract_content_layer.md** | Content rendering system | Section rendering, layout, positioning |
| **contract_scroll_settings.md** | Scroll behavior | Smooth scrolling, wheel events, performance |
| **contract_admin_panel.md** | Admin controls | Section editing, visibility management |
| **hooks.md** | Custom React hooks | Scroll, position, breakpoints, storage |
| **article_LEGIT_contract.md** | LEGIT certification | Compliance requirements, validation |
| **contract_component_names.md** | Naming conventions | Component ID standards, patterns |

### System-Specific Contracts

| Contract | Purpose | Key Areas |
|----------|---------|-----------|
| **contract_galaxy_journey.md** | Galaxy visualization | Particle system, WebGL, shaders |
| **contract_dissolve_engine.md** | Transition effects | Animation, transitions, timing |
| **contract_persistent_elements.md** | Persisted components | Storage, state management |
| **contract_GitOps_Doctrine.md** | Development workflow | Branching, commits, deployment |
| **article_animation_schema_v1.5.md** | Animation standard | Timing, curves, performance |

**Before implementing any change**, you MUST consult the relevant contracts. These contracts are the canonical source of truth for system behavior and must be followed without exception.

---

## 🛣️ Route Structure and Layer System

### Primary Routes

| Route | Component | Purpose | Notes |
|-------|-----------|---------|-------|
| `/` | `DevV4CosmicPage.jsx` | Main cosmic homepage | Production ready |
| `/cosmic-rev` | `CosmicRevPage.jsx` | Cosmic Revolution experience | Production ready |
| `/products` | `ProductsPortal.jsx` | Products index | Production ready |
| `/products/[product]` | Various product pages | Individual products | Production ready |
| `/home-v5` | `HomeV5AtomicPage.jsx` | New atomic design homepage | Development only |
| `/dev`, `/test_canvas` | Dev pages | Testing environments | Development only |

### Layer System

The platform implements a strict 6-layer system with specific z-index ranges:

| Layer Name | z-index Range | Purpose | Components |
|------------|---------------|---------|------------|
| Base Layer | 0-9 | Background elements | CosmicJourneyController, 3D scenes |
| Content Layer | 10-50 | Main website content | Sections, ContentLayer components |
| UI Control Layer | 60-90 | Interactive UI elements | AdminPanel, buttons, forms |
| HUD Layer | 100-109 | Development/debug HUDs | All HUD components, HUDManager |
| Navigation Layer | 110-119 | Primary navigation | NavBar, menus |
| Debug Overlay Layer | 120+ | Critical debugging tools | ScrollDebugOverlay |

**All z-index values must strictly adhere to these ranges.** 
Component placement within layers must follow the control_layers contract.

---

## 🧰 Available Tools and Components

### Core Management Components

| Component | Location | Purpose |
|-----------|----------|---------|
| HUDManager | `src/components/cosmic-explorer/core/HUDManager.jsx` | Manages all HUDs |
| HUDSelector | `src/components/cosmic-explorer/core/HUDSelector.jsx` | UI for toggling HUDs |
| ContentLayer | `src/components/layouts/ContentLayer.jsx` | Manages section rendering |
| SectionRegistry | `src/config/SectionRegistry.js` | Configures available sections |
| AdminPanel | `src/components/layouts/AdminPanel.jsx` | Section editing interface |

### Available HUDs

| Category | Examples | Purpose |
|----------|----------|---------|
| Standard Debug HUDs | PerformanceMetricsHUD, CameraInfoHUD | Core debugging |
| Mini HUDs | FPSMiniHUD, GPUTempHUD | Compact information |
| Visualization HUDs | HistogramHUD, SystemStatusHUD | Data visualization |
| Advanced DEV HUDs | MaterialInspectorHUD, TimelineAnimationHUD | Complex tools |

### Custom Hooks

| Hook | Purpose | Usage |
|------|---------|-------|
| useScroll | Access scroll context | Get scroll position, progress |
| useHUDPosition | Manage HUD positioning | Position persistence for HUDs |
| useBreakpoint | Responsive design | Detect viewport breakpoints |
| useParallax | Scroll effects | Create parallax animations |
| useViewportConstraint | Constrain elements | Keep elements in viewport |

### Development Tools

- **ScrollDebugOverlay**: Real-time scroll monitoring (z-120)
- **ModeSwitcher**: Toggle between application modes
- **DraggableHUD**: Base for all HUD components
- **AdminPanel**: Edit section positions and visibility

---

## 🚫 Operational Guidelines

1. **Do not** introduce any component that does not follow the LEGIT contract
2. **Do not** modify z-index values outside their assigned layer ranges
3. **Do not** create standalone HUDs without proper HUDManager integration
4. **Do not** use global state outside established patterns
5. **Do not** change established file structure or naming conventions
6. **Do not** bypass proper layer system for any reason
7. **Do not** modify scroll behavior without consulting scroll_settings contract
8. **Do not** introduce new UI patterns without checking for existing components
9. **Do not** implement direct DOM manipulation where React patterns exist
10. **Do not** make changes that would require extensive refactoring

**Critical success factors:**
- Always work within the established architecture
- Consult relevant contracts before implementing any change
- Maintain consistent patterns across similar components
- Respect layer boundaries without exception
- Test all changes thoroughly before proposing implementation

---

## 🙏 Final Note

Thank you for respecting the extensive effort that has gone into building this enterprise system. Your careful attention to these rules and guidelines ensures the continued integrity and quality of the CuriousLabs platform. 

By following these contracts and working within the established patterns, you contribute to a robust, maintainable system that can evolve safely while maintaining its architectural integrity.

Your thoughtful assistance in preserving and enhancing this system is deeply appreciated.

*— The CuriousLabs Architecture Team*
