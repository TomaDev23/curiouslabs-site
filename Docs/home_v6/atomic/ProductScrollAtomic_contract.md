# ProductScrollAtomic Component Contract

## 📋 Component Details
- **File Path**: `src/components/atomic/ProductScrollAtomic.jsx`
- **Component Name**: `ProductScrollAtomic`
- **Version**: 1.0.0
- **Type**: Atomic, Self-Contained

## 📘 Metadata
```js
export const metadata = {
  id: 'product_scroll_atomic',
  scs: 'SCS-ATOMIC-VISUAL',
  type: 'atomic',
  doc: 'contract_product_scroll_atomic.md'
};
```

## 🧩 Component Structure
The ProductScrollAtomic component is a self-contained horizontal product carousel with snap scrolling functionality. It displays a series of product cards that users can scroll through horizontally, with each product prominently featuring its name, description, features, and a call-to-action button. The component includes navigation dots and a product indicator for easy navigation.

## 📦 Props
This component does not accept any props as it is fully self-contained.

## 🎨 Visual Strategy

### Layout
- **Horizontal Scroll**: Full-width scroll container with snap points for each product
- **Product Cards**: Each card contains content on the left and a visual element on the right
- **Navigation**: Bottom-centered dots for quick navigation between products
- **Indicators**: Product count and current product name in bottom right
- **Mobile Adaptation**: Stacked layout with hidden visuals on mobile

### Color Scheme
- **Background**: Dark background with subtle gradient
- **Product Colors**: Each product has its own theme color:
  - AEGIS: Lime (`#84cc16`)
  - OpsPipe: Blue (`#2563eb`)
  - MoonSignal: Purple (`#7e22ce`)
  - Guardian: Teal (`#0d9488`)
- **Text**: White and light gray for readability
- **Accents**: Product-specific colors for headings, buttons, and visual elements

### Cosmic Effects
- **Nebula Background**: Subtle radial gradient based on product color
- **Glow Effects**: Text shadow and box shadow effects using product colors
- **Visual Element**: Simplified cosmic representation with radial gradients

## 🔄 Animation Strategy
- **Section Reveal**: Fade in animation when section comes into view
- **Content Animation**: Staggered reveal of title, description, and features
- **Product Transitions**: Smooth scrolling between products
- **Button Interactions**: Hover and tap animations for buttons
- **Reduced Motion**: Respects user's motion preferences
- **Duration Reduction**: Following animation schema v1.5, timing is reduced for better performance

## 📱 Responsive Behavior
- **Desktop**: Side-by-side layout with content on left, visual on right
- **Mobile**: Stacked layout with full-width content and hidden visuals
- **Breakpoint**: 768px (md) for layout switching
- **Scroll Behavior**: Touch-friendly snap scrolling works on all devices

## 🔐 Implementation Notes
- **Self-Contained Data**: All product information is stored within the component
- **Responsive Detection**: Uses internal state and window resize listener
- **Scroll Management**: Tracks scroll position to update current product index
- **Navigation System**: Programmatic scrolling through dot navigation
- **Performance Optimization**: Simplified visuals compared to original component
- **Accessibility**: Proper ARIA labels for navigation elements

## 🔍 Visual Nuances
- **Color Adaptation**: Helper function to adjust color brightness for gradients
- **Feature Bullets**: Consistent styling with colored dots
- **Visual Representations**: Simplified cosmic visuals with product-specific colors
- **Navigation Feedback**: Active dot takes on product color

## 🚀 Future Enhancements
- **Custom Product Icons**: Replace first letter with proper product icons/logos
- **Keyboard Navigation**: Add left/right arrow key support
- **Touch Gestures**: Enhance with swipe gesture detection
- **Advanced Animations**: Add optional parallax effects for product transitions
- **Data Externalization**: Option to accept product data as a prop

## ✅ LEGIT Compliance
- **Self-Contained**: No external dependencies beyond React and Framer Motion
- **Responsive Design**: Adapts to different screen sizes
- **Animation Handling**: Respects reduced motion preferences
- **Accessibility**: Proper ARIA attributes for navigation
- **Documentation**: Complete contract with implementation details 