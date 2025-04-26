# CuriousLabs Website Build Training Guide

## 📘 Project Overview

CuriousLabs is a tactical AI CodeOps service lab requiring a modern, elegant, AI-native landing page built with React and TailwindCSS. This guide serves as a comprehensive reference for all future development sessions.

## 🔒 Core Development Rules

1. **Use TailwindCSS only** - No external UI libraries
2. **Components must match visual references**
3. **Visual-only implementations** - All logic (forms, data loaders) is stubbed
4. **Responsive, production-ready code**
5. **Update the Site Map document** after every implementation
6. **Track all changes** in the mission tracking document

## 🎨 Color System

### Primary Color Palette

| Color Name | Tailwind Class | Usage |
|------------|---------------|-------|
| Deep Black | `bg-deep-black` | Main background |
| Curious Dark | `curious-dark-900` through `curious-dark-700` | Backgrounds, cards, gradients |
| Curious Purple | `curious-purple-900` through `curious-purple-200` | Primary accent, buttons, glows |
| Curious Blue | `curious-blue-900` through `curious-blue-200` | Secondary accent, gradients |

### Gradient Combinations

| Gradient | Tailwind Class | Usage |
|----------|---------------|-------|
| Purple Button | `bg-gradient-to-r from-curious-purple-600 to-curious-purple-500` | Primary buttons |
| Text Gradient | `bg-gradient-to-r from-curious-purple-200 via-white to-curious-blue-200` | Hero headings |
| Section Heading | `bg-gradient-to-r from-curious-purple-400 to-curious-blue-400` | Section titles |
| Background Blob | `bg-gradient-to-br from-curious-purple-700/25 via-curious-purple-800/20 to-transparent` | Animated blobs |

### Opacity Standards

- **Background elements**: 2-7% (`opacity-[0.02]` to `opacity-[0.07]`)
- **Gradient blobs**: 35-45% (`opacity-35` to `opacity-45`)
- **Glow effects**: 60-80% (`opacity-60` to `opacity-80`)
- **UI elements**: 80-100% (`opacity-80` to `opacity-100`)

## 🖼️ Visual Assets

### Background Elements

- **Circuit Pattern**: `bg-circuit-pattern` - Technical grid pattern at low opacity
- **Noise Texture**: `bg-noise-texture` - Subtle grain texture for depth
- **Gradient Blobs**: Multiple animated colored elements for visual interest
- **Centerpiece Orb**: Multi-layered glowing effect for Hero section

### Logo Assets

- Location: `/public/images/logos/`
- Format: SVG for optimal loading
- Default style: Grayscale with hover color reveal

## 🧩 Component Structure

### Core Components

1. **NavBar.jsx** - Main navigation
2. **Hero.jsx** - Main hero section with glowing centerpiece
3. **LogoStrip.jsx** - Horizontally scrolling trust symbols
4. **Services.jsx** - Service offering cards
5. **Metrics.jsx** - Mission metrics display
6. **CaseStudies.jsx** - Project showcase
7. **Testimonials.jsx** - Client feedback
8. **ScrollReveal.jsx** - Animation wrapper for sections

### Component Architecture

- Each component is self-contained
- Follow unified styling patterns
- Maintain purple/blue theme consistency
- Use gradient accents for visual interest

## ✨ Animation System

### Standard Animations

| Animation | Tailwind Class | Purpose |
|-----------|---------------|---------|
| Float Slow | `animate-float-slow` | Gentle movement for background elements |
| Float | `animate-float` | Standard floating animation |
| Rotate Slow | `animate-rotate-slow` | Subtle rotation effect |
| Pulse Subtle | `animate-pulse-subtle` | Breathing effect for glow elements |
| Scroll | `animate-scroll` | Horizontal scrolling for LogoStrip |
| Fade In Up | `fade-in-up` | Reveal animation for sections |

### Animation Best Practices

1. **Performance optimization**:
   - Use `willChange: 'transform'` for GPU acceleration
   - Keep animations subtle and non-distracting
   - Limit animated elements in view

2. **Timing variations**:
   - Use `animationDelay` for organic movement
   - Vary animation speeds for depth perception
   - Keep scroll animations smooth and consistent

## 📚 Documentation Reference

### Key Documents

1. **Site Map** (`Docs/Foundation/article_5.0_Site_Map.md`):
   - **MUST BE UPDATED** after every component change
   - Visual references for layout
   - Component structure details
   - CSS class references

2. **Mission Tracking** (`Docs/planning/mission_tracking.md`):
   - Track TILE implementation status
   - Document technical notes and decisions
   - Record pending tasks and improvements

3. **DO_NOT_DEVIATE.md**:
   - Core project rules and constraints
   - Follow strictly for all implementations

### Documentation Update Checklist

After every implementation:

- [ ] Update Site Map with new components
- [ ] Update visual references
- [ ] Revise component interaction diagrams
- [ ] Update CSS class references
- [ ] Mark completed items in Mission Tracking
- [ ] Document any technical decisions or challenges

## 🏗️ Implementation Workflow

1. **Plan before coding**:
   - Review the visual references
   - Check Site Map for existing components
   - Plan integration with existing elements

2. **Component development**:
   - Create basic structure
   - Add styling with TailwindCSS
   - Implement animations
   - Test responsiveness

3. **Integration**:
   - Import component in `index.jsx`
   - Ensure proper spacing and layout
   - Test transitions between sections
   - Verify visual consistency

4. **Documentation**:
   - Update Site Map
   - Update Mission Tracking
   - Commit changes with descriptive message

## 🔍 Visual Quality Standards

1. **Purple theme consistency** across all elements
2. **Smooth transitions** between sections
3. **Technical aesthetic** with circuit patterns and glows
4. **Dynamic elements** with subtle animations
5. **Clear visual hierarchy** directing attention
6. **Responsive layout** that works on all devices

## 🚀 Performance Guidelines

1. **Minimize DOM elements**
2. **Optimize animations** for performance
3. **Use appropriate opacity** levels
4. **Implement hardware acceleration** for animations
5. **Keep gradients and blurs reasonable** in number and size
6. **Test on mobile** for performance issues

## ⚠️ Common Pitfalls to Avoid

1. **Overusing blur effects** - They can be performance-heavy
2. **Inconsistent spacing** - Follow the established patterns
3. **Too many animations** - Keep them subtle and purposeful
4. **Neglecting mobile views** - Always test responsiveness
5. **Straying from the color system** - Stick to defined palette
6. **Forgetting to update documentation** - Critical for consistency

## 🔮 Future Enhancement Roadmap

1. **TILE 3A** - Services & Case Studies Enhancement
2. **TILE 3B** - Metrics & Testimonials Enhancement
3. **Transitions Between Sections** - Improve scrolling experience
4. **Performance Optimizations** - For mobile devices
5. **Responsive Refinements** - Ensure consistent experience

By following this guide, you'll maintain the exceptional standard of work established in the CuriousLabs website build, ensuring visual consistency, optimal performance, and streamlined development for all future enhancements.
