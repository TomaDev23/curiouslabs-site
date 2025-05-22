# ✅ OpsBentoCluster LEGIT Contract — v1.1

📍 Location: `src/components/home/v6/ops/OpsBentoCluster.jsx`  
🧱 Purpose: Modern bento grid layout for OpsPipe feature visualization featuring an interactive UI with cosmic theme

---

## 🧩 Component Location Map

| Component | Location | Description |
|-----------|----------|-------------|
| `OpsBentoCluster` | `src/components/home/v6/ops/OpsBentoCluster.jsx` | Main carousel component |
| `BentoItem` | Inside `OpsBentoCluster.jsx` | Individual product cards |
| `ActiveProductDetail` | Inside `OpsBentoCluster.jsx` | "Our Products" panel (right side) |
| `AnimatedRunner` | Inside `OpsBentoCluster.jsx` | Cosmic background container |
| Product Data | Inside `src/components/home/v6/HorizontalProductScrollV6.jsx` | Product details including OpsPipe |
| OpsPipe Section | Inside `src/components/home/v6/ProductSectionV6.jsx` | Parent container for OpsPipe display |

---

## 📦 Integration Structure

The components are integrated as follows:

1. `ProductSectionV6.jsx` imports and renders `OpsBentoCluster` for the OpsPipe section
2. `OpsBentoCluster.jsx` contains the carousel and "Our Products" panel
3. `HorizontalProductScrollV6.jsx` contains the product data including OpsPipe details

---

## 🔄 Data Flow

- Product data originates in `HorizontalProductScrollV6.jsx`
- `ProductSectionV6.jsx` determines layout based on product ID
- When product ID is 'opspipe', it renders the `OpsBentoCluster` component
- `OpsBentoCluster` has its own internal data (`OPS_BENTO_ITEMS`) for the carousel items

---

## 🎨 Visual Style Guide

- **Color Palette**: Blues (#2563eb), cyans, and slate backgrounds
- **Borders**: 2px rounded-2xl with white/10 opacity
- **Glass Effect**: Multi-layered background with noise texture
- **Typography**: Consistent with global site typography
- **Spacing**: Gap-3 (sm), Gap-4 (md), Gap-6 (lg)

---

## 📐 Current Layout Structure

```
ProductSectionV6 (Parent Container)
├── OpsBentoCluster (When product.id === 'opspipe')
│   ├── AnimatedRunner (Cosmic background)
│   │   ├── Carousel with BentoItems (Left side)
│   │   └── ActiveProductDetail (Right side - "Our Products" panel)
│   └── Pagination indicators
└── Other product layouts (When product.id !== 'opspipe')
```

---

## 🧪 Props Interface

```tsx
interface OpsBentoClusterProps {
  /** Custom class name for the component */
  className?: string;
}

interface BentoItemProps {
  /** Item data object with title, description, etc. */
  item: OpsBentoItemType;
  /** Custom class name for positioning */
  className?: string;
  /** Whether item is interactive */
  interactive?: boolean;
}
```

---

## 🎭 Animation System

The component uses the following animation patterns:

1. **Entry Animation**: Staggered children reveal on scroll
2. **Hover Effects**: Scale up, border highlight, drop shadow
3. **Idle Animation**: Orbital rings rotate at different speeds
4. **Indicator Animations**: Progress bars that animate on hover

All animations respect `prefers-reduced-motion` settings.

---

## 📱 Responsive Behavior

| Breakpoint | Columns | Layout Changes |
|------------|---------|----------------|
| Default (Mobile) | 6-col | Compact layout, stacked items |
| sm (640px+) | 8-col | Show additional feature (#6), more spacing |
| md (768px+) | 12-col | Full layout with proper spans, larger visuals |

---

## 🚀 Usage Example

```jsx
import OpsBentoCluster from './ops/OpsBentoCluster';

// In ProductSectionV6.jsx
const LeftVisual = product.id === 'opspipe' ? (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="relative z-10 w-2/5 md:w-2/5 flex justify-start items-center"
  >
    <OpsBentoCluster className="transform scale-90 md:scale-100" />
  </motion.div>
) : (
  // Other product visualization
);
```

---

## 🛠️ Modification Guide

If edits are needed, please maintain:

1. The LEGIT metadata at the top of the file
2. The consistent structure of the BentoItem component
3. All accessibility attributes (roles, aria-labels)
4. Error boundary and fallback rendering
5. SCS5 tracking tags

---

## 🔒 SCS Compliance

This component is tagged with `SCS5` indicating it is:

- Fully production ready
- Visually compliant with design system
- Approved for all routes and uses
- Performance optimized

---

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.v1` 
Last updated: Current version 