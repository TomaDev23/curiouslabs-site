# MissionAtomic Component Contract

## 📋 Component Details
- **File Path**: `src/components/atomic/MissionAtomic.jsx`
- **Component Name**: `MissionAtomic`
- **Version**: 1.0.0
- **Type**: Atomic, Self-Contained

## 📘 Metadata
```js
export const metadata = {
  id: 'mission_atomic',
  scs: 'SCS-ATOMIC-VISUAL',
  type: 'atomic',
  doc: 'contract_mission_atomic.md'
};
```

## 🧩 Component Structure
The MissionAtomic component displays the company's mission statement in an Eclipse-style layout with numbered mission points. It features a black circular element with the mission statement positioned at the bottom left, while mission points with large numbered indicators are arranged in an alternating pattern on the right side of the screen.

## 📦 Props
This component does not accept any props as it is fully self-contained.

## 🎨 Visual Strategy

### Layout
- **Eclipse**: Black circular element positioned at bottom-left with mission statement inside
- **Mission Points**: Right-aligned content with alternating layout pattern and large numbered indicators
- **Decorative Elements**: Metadata text, badges, and icons positioned strategically for visual interest
- **Mobile Adaptation**: Adjusted layout for smaller screens with stacked elements and simplified positioning

### Color Scheme
- **Background**: Dark background (`bg-curious-dark-900`) with cosmic nebula effects
- **Eclipse**: Black circular gradient with subtle edge fading
- **Text**: White text with opacity variations for hierarchy
- **Accents**: Subtle purple and blue gradients in nebula effects

### Cosmic Effects
- **Nebula Gradients**: Multiple overlapping radial gradients with varying opacity
- **Glow Effects**: Blurred layers around the eclipse for a subtle glow
- **Crescent Shadow**: Internal shadow for depth within the eclipse

## 🔄 Animation Strategy
- **Section Reveal**: Fade and slide up animation on scroll
- **Mission Points**: Staggered reveal with sequential timing
- **Eclipse**: Subtle scale and fade animation
- **Reduced Motion**: Respects user's motion preferences by detecting `prefers-reduced-motion`
- **Duration Reduction**: Following animation schema v1.5, timing is reduced by 10-20% from original

## 📱 Responsive Behavior
- **Desktop**: Full layout with Eclipse at bottom left and mission points on the right
- **Mobile**: Stacked layout with simplified positioning and adjusted sizing
- **Breakpoint**: 768px (md) for layout switching
- **Responsive Detection**: Self-contained using useState and window resize listener

## 🔐 Implementation Notes
- Fully self-contained with no external dependencies beyond React and Framer Motion
- Internal state management for responsive behavior
- Respects user preferences for reduced motion
- All cosmic effects implemented with CSS only
- Z-index management for proper layering of elements

## 🔍 Visual Nuances
- Multiple overlapping nebula effects create depth and cosmic atmosphere
- Eclipse has multiple layers of glow and shadow for realistic effect
- Mission point numbers use large font size with reduced opacity for visual impact
- Decorative elements add context and visual interest without overwhelming the content

## 🚀 Future Enhancements
- Optional interactive elements for mission points
- Enhanced particle effects for cosmic background
- Transition animations between mission points
- Data-driven mission points for easier content updates

## ✅ LEGIT Compliance
- Follows atomic component structure
- Self-contained with no external dependencies
- Maintains responsive design principles
- Handles animations respecting user preferences
- Properly documented with this contract 