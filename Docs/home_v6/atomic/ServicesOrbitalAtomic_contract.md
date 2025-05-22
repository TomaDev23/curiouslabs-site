# ServicesOrbitalAtomic Component Contract

## Component Details
- **File Path**: `src/components/atomic/ServicesOrbitalAtomic.jsx`
- **Component Name**: ServicesOrbitalAtomic
- **Version**: 1.0.0
- **Type**: Atomic

## Metadata
```js
export const metadata = {
  id: 'services_orbital_atomic',
  scs: 'SCS-SERVICE-COSMIC',
  type: 'atomic',
  doc: 'contract_services_orbital_atomic.md'
};
```

## Component Structure
ServicesOrbitalAtomic is a fully self-contained component that displays a cosmic-themed services section. It features a central cosmic core, orbital rings that rotate in space, and service cards that auto-rotate. The component includes a navigation system to manually select services and animated transitions between each service.

## Props
This component does not accept any props, as it is fully self-contained with internal data and state management.

## Internal Data
The component includes a self-contained array of services with the following structure:
```js
const SERVICES = [
  {
    id: 'ai',
    title: 'AI Development',
    description: 'Advanced artificial intelligence solutions with multi-agent systems, LLMs, and knowledge graph integration.',
    color: '#84cc16',
    gradient: 'from-lime-500/20 to-emerald-700/20',
    orbitColor: 'bg-lime-400'
  },
  // Additional services...
];
```

## Visual Strategy

### Layout
- **Overall Structure**: A full-height section with a cosmic background, orbital rings, and a two-column content layout on desktop (single column on mobile)
- **Service Cards**: Positioned in the left column with animated transitions
- **Navigation Pills**: Positioned in the right column for service selection
- **Orbital Elements**: Concentric circular rings that rotate around a central core
- **Service Nodes**: Small colored dots positioned around the orbital paths

### Color Scheme
- **Background**: Dark cosmic gradient (from curious-dark-900 to black)
- **Service-Specific Colors**: Each service has its own color palette:
  - AI Development: Lime/Emerald
  - Product Launches: Teal/Cyan
  - SaaS Platforms: Purple/Violet
  - Consulting: Amber/Orange

### Cosmic Effects
- **Central Core**: Pulsating glow that changes color based on the active service
- **Orbital Rings**: Thin, slowly rotating circles with service-specific colors
- **Background**: Dark cosmic gradient with subtle opacity variations

## Animation Strategy

### Section Animations
- **Entry Animation**: Fade-in with staggered children
- **Content Animations**: Staggered reveal of header, service cards, and navigation

### Service Transitions
- **Card Transitions**: AnimatePresence with exit/enter animations for smooth transitions
- **Color Transitions**: Smooth color transitions for orbital rings and central core
- **Auto-Rotation**: Services automatically rotate every 5 seconds (unless hovering or reduced motion is preferred)

### Interactive Elements
- **Navigation Pills**: Hover effect (slight x-axis movement) and active state indication
- **Service Nodes**: Pulse animation for the active service node

### Reduced Motion Support
- **Detection**: Uses `prefers-reduced-motion` media query
- **Adaptations**: 
  - Shorter duration transitions
  - Disabled orbital rotation
  - Simplified animations

## Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Layout Changes
- **Desktop**: Two-column layout with service cards on left, navigation on right
- **Mobile**: Single-column layout with service cards above navigation
- **Orbital Sizes**: Smaller on mobile devices
- **Service Nodes**: Only visible on non-mobile devices

## Implementation Notes

### State Management
- **Active Index**: Tracks the currently displayed service
- **Responsive States**: Tracks device size (mobile, tablet)
- **Motion Preference**: Tracks user's reduced motion preference
- **Hover State**: Tracks if the user is hovering (to pause auto-rotation)

### Auto-Rotation System
- **Interval**: 5 seconds between service changes
- **Pausing**: Pauses when user hovers or has reduced motion preference
- **Reset**: Auto-rotation resumes when user stops hovering

### Accessibility Considerations
- **ARIA Attributes**: 
  - `aria-label` on the section
  - `aria-pressed` on navigation buttons
- **Motion Control**: Respects user's motion preferences
- **Focus Management**: Interactive elements are properly focusable
- **Keyboard Navigation**: Navigation buttons can be activated with keyboard

### Performance Optimizations
- **Animation Throttling**: Reduced animation complexity on mobile
- **Conditional Rendering**: Some visual elements only render on larger screens
- **Transition Management**: Simplified transitions for reduced motion

## LEGIT Compliance

### Self-Contained Design
- ✅ Contains all necessary data internally
- ✅ Independent responsive state management
- ✅ No external dependencies (beyond React and Framer Motion)

### Responsive Behavior
- ✅ Adapts layout for mobile and desktop
- ✅ Resizes orbital elements appropriately
- ✅ Adjusts visual complexity based on screen size

### Animation Control
- ✅ Respects reduced motion preferences
- ✅ Provides appropriate animation alternatives
- ✅ Manages animation performance

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA attributes for interactive elements
- ✅ Keyboard navigation support
- ✅ Focus management

### Documentation
- ✅ Complete component contract
- ✅ Visual strategy documentation
- ✅ Animation specifications
- ✅ Responsive behavior notes

## Future Enhancements
1. **External Data Source**: Option to accept services data as props
2. **Custom Animation Controls**: Props to control animation speeds and behaviors
3. **Additional Interaction Modes**: Click-to-zoom on service nodes
4. **Performance Tier Detection**: Adapt animation complexity based on device capabilities
5. **Theme Integration**: Connect to a global theme system 