# ProcessLegacyAtomic Component Contract

## Component Details
- **File Path**: `src/components/atomic/ProcessLegacyAtomic.jsx`
- **Component Name**: ProcessLegacyAtomic
- **Version**: 1.0.0
- **Type**: Atomic

## Metadata
```js
export const metadata = {
  id: 'process_legacy_atomic',
  scs: 'SCS-PROCESS-ORBITAL',
  type: 'atomic',
  doc: 'contract_process_legacy_atomic.md'
};
```

## Component Structure
ProcessLegacyAtomic is a fully self-contained component that displays the company's process steps in a visually engaging manner. It features a horizontal orbital layout on desktop with a curved dashed connector, and a vertical stacked layout on mobile with dashed vertical connectors. The component maintains the visual style of the original ProcessCards component while adding modern features like animation and accessibility improvements.

## Props
This component does not accept any props, as it is fully self-contained with internal data and state management.

## Internal Data
The component includes a self-contained array of process steps with the following structure:
```js
const PROCESS_STEPS = [
  {
    id: 'discover',
    number: '1,034',
    title: 'Discover',
    description: 'Brainwaves about space design—usually on the bus or in the shower.',
    color: 'lime'
  },
  // Additional steps...
];
```

## Visual Strategy

### Layout
- **Overall Structure**: A full-height section with centered content and orbital connection visualization
- **Desktop Layout**: Horizontal row of process step cards with a curved orbital connector
- **Mobile Layout**: Vertical stack of process cards with dashed line connectors
- **Card Design**: Centered content with circular number indicator at top and star accent

### Color Scheme
- **Background**: Dark background (bg-curious-dark-900)
- **Accent Colors**: Each step has its own color:
  - Discover: Lime/Green
  - Create: Yellow/Amber
  - Build: Blue/Indigo
  - Launch: Purple/Violet
- **Connector**: Multi-color gradient for the orbital connector

### Visual Elements
- **Circular Indicators**: Bordered circles containing step numbers
- **Star Accents**: Small star decoration on each circular indicator
- **Orbital Connector**: Curved dashed line with gradient coloring (desktop only)
- **Vertical Connectors**: Dashed vertical lines (mobile only)

## Animation Strategy

### Section Animations
- **Entry Animation**: Fade-in with staggered children
- **Content Animations**: Staggered reveal of header, step cards, and CTA

### Interactive Elements
- **Hover Effect**: Subtle scale increase on card hover
- **Transitions**: Smooth transitions for all interactive elements

### Reduced Motion Support
- **Detection**: Uses `prefers-reduced-motion` media query
- **Adaptations**: 
  - Shorter duration transitions
  - Disabled hover animations
  - Simplified entry animations

## Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
- **Desktop**: ≥ 768px

### Layout Changes
- **Desktop**: Horizontal row of cards with curved orbital connector
- **Mobile**: Vertical stack of cards with dashed vertical connectors
- **Spacing**: Adjusted for optimal viewing on different screen sizes

## Implementation Notes

### State Management
- **Responsive State**: Tracks device size for layout changes
- **Motion Preference**: Tracks user's reduced motion preference

### Color Management
- **Color Mapping**: Uses a color mapping system to generate consistent color classes
- **Gradient Creation**: Creates a multi-color gradient for the orbital connector

### Accessibility Considerations
- **ARIA Attributes**: 
  - `aria-label` on the section
  - `aria-hidden="true"` on decorative elements
  - `role="presentation"` on non-interactive visual elements
- **Motion Control**: Respects user's motion preferences
- **Keyboard Navigation**: Ensures all interactive elements are properly focusable
- **Semantic HTML**: Uses appropriate heading levels and meaningful text

## LEGIT Compliance

### Self-Contained Design
- ✅ Contains all necessary data internally
- ✅ Independent responsive state management
- ✅ No external dependencies (beyond React and Framer Motion)

### Responsive Behavior
- ✅ Adapts layout for mobile and desktop
- ✅ Uses appropriate spacing and sizing for different screen sizes
- ✅ Different connector visualizations based on screen size

### Animation Control
- ✅ Respects reduced motion preferences
- ✅ Provides appropriate animation alternatives
- ✅ Uses Framer Motion for consistent animation handling

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA attributes for interactive and decorative elements
- ✅ Keyboard navigation support
- ✅ Color contrast considerations

### Documentation
- ✅ Complete component contract
- ✅ Visual strategy documentation
- ✅ Animation specifications
- ✅ Responsive behavior notes

## Visual Comparison with Original
The ProcessLegacyAtomic component maintains the key visual elements of the original ProcessCards:
- Same color scheme and card design
- Identical orbital connector on desktop
- Same step data with unique numbering style
- Maintains the whimsical star accents and style
- Preserves the original curved orbital path design

## Future Enhancements
1. **External Data Source**: Option to accept process steps data as props
2. **Theme Integration**: Connect to a global theme system
3. **Animation Variants**: Additional animation options for different visual styles
4. **Interactive Features**: Optional click interactions for step details
5. **Progress Tracking**: Option to highlight current active step 