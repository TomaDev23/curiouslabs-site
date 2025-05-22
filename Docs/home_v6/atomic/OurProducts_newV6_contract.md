# OurProducts_newV6 Component Contract

## 📋 Component Details
- **File Path**: `src/components/atomic/OurProducts_newV6.jsx`
- **Component Name**: `OurProducts_newV6`
- **Version**: 1.0.0
- **Type**: Atomic, Self-Contained
- **Status**: Implemented

## 📘 Metadata
```js
export const metadata = {
  id: 'our_products_new_v6',
  scs: 'SCS-ATOMIC-VISUAL',
  type: 'atomic',
  doc: 'contract_our_products_new_v6.md'
};
```

## 🧩 Component Structure
The OurProducts_newV6 component is a horizontal scrolling product showcase with three distinct pages. It features a scroll-locking mechanism that hijacks the native scroll behavior to create a horizontal paging experience. The component includes interactive pagination, animations, and a final transition that releases the scroll lock to allow the user to continue down the page.

## 📦 Props
This component accepts the following props:
- `className` (optional): Additional CSS classes to apply to the component's root element. Default: `''`.

## 🎨 Visual Strategy

### Layout
- **Height**: 100vh (fullscreen)
- **Width**: 300vw (three pages side by side)
- **Page Structure**: Three full-width pages with different content:
  1. AEGIS Runtime product page
  2. Products showcase (OpsBentoCluster placeholder)
  3. Services transition page

### Animation Elements
- **Page Transitions**: Smooth horizontal sliding between pages
- **Text Reveals**: Staggered appearance of text elements
- **Background Effects**: Subtle cosmic background with animated particles
- **Pagination**: Interactive dots that show current page position

### Color Scheme
- **AEGIS**: Lime green (#84cc16) with cyan accents
- **Pagination**: Purple (#d946ef) for active state
- **Text**: White with varied opacity levels
- **Background**: Dark with subtle cosmic texture

## 🔄 Interaction Strategy

### Scroll Behavior
- **Scroll Hijacking**: Overrides native scroll to control horizontal movement
- **Paging**: Mouse wheel or touch swipe to navigate between pages
- **Scroll Lock**: Prevents vertical scrolling until reaching the final page
- **Lock Release**: Automatically releases scroll lock after viewing the third page

### Navigation Controls
- **Pagination Dots**: Visual indication of current page with interactive feedback
- **Scroll Direction**: Supports both forward and backward navigation

## 📱 Responsive Behavior
- **Mobile Support**: Adapts text size and layout for smaller screens
- **Touch Events**: Handles touch navigation for mobile devices
- **Media Queries**: Breakpoints at sm (640px) and md (768px)
- **Reduced Motion**: Detects and respects user's reduced motion preference

## 🧠 Implementation Notes
- Uses a custom hook (`useReducedMotion`) to detect motion preferences
- Implements wheel and touch event listeners with proper cleanup
- Uses Framer Motion for animations with appropriate variants
- Includes nested components for each page to maintain organization
- OpsBentoCluster is currently a placeholder to be implemented later

## ✅ LEGIT Compliance
- **Self-Contained**: Includes all necessary logic and data internally
- **Animation Control**: Respects reduced motion preferences
- **Responsive Design**: Adapts to different screen sizes
- **Documentation**: Complete contract documentation
- **Metadata**: Proper metadata block included 