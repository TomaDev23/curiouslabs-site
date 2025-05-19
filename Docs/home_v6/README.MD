# 📄 Full CuriousLabs README.md (Reformatted)

# CuriousLabs Website

This repository contains the code for the CuriousLabs website, a modern web application built with React and Tailwind CSS.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Utilities](#utilities)
- [Contributing](#contributing)

## Overview

The CuriousLabs website showcases the company's AI products and services with a modern, responsive design. The site features smooth animations, interactive elements, and a consistent design language across all pages.

## Features

- Responsive design optimized for all device sizes
- Modern UI with animations and interactive elements
- React Router for seamless navigation
- Centralized asset management
- Custom hooks for scroll effects and responsiveness
- Modular component structure

## Installation

To install and set up the project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/curiouslabs-website.git

# Navigate to the project directory
cd curiouslabs-website

# Install dependencies
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the development server at http://localhost:5181 (or another port if 5181 is in use).

## Project Structure

```
/src
  /components       # Reusable UI components
    /Hero           # Modularized Hero components
  /hooks            # Custom React hooks
  /pages            # Page components
    /products       # Product pages
  /utils            # Utility functions
  index.jsx         # Application entry point
  App.jsx           # Main app component
  index.css         # Global styles
/public             # Static assets
  /images           # Images and SVGs
/scripts            # Helper scripts
```

## Utilities

### Product Page Generator

The project includes a script to generate new product pages with consistent styling:

```bash
node scripts/create-product-page.js
```

Follow the prompts to create a new product page with:
- Product name
- Description
- Up to 6 key features

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes thoroughly
4. Commit and push your changes
5. Create a pull request

## License

MIT

# CuriousLabs V6 Website 🚀

A cosmic-themed, highly interactive website implementation featuring advanced animations, parallax effects, and responsive design.

## 🌌 Core Features

### Visual Layers
- **Static Starfield**: CSS-based star patterns with shimmer effects
- **Parallax Stars**: Canvas-driven parallax effect on scroll
- **Grid Overlay**: Subtle grid pattern for depth
- **Reduced Motion Support**: All animations respect user preferences

### Components
1. **HeroPortal**
   - Split layout design
   - Floating cosmic sphere
   - Entrance animations
   - Responsive CTA

2. **ServicesOrbital**
   - Orbital card stack system
   - Auto-rotating cards
   - Mobile-optimized stacking
   - Interactive navigation pills

3. **NavBarCosmic**
   - Backdrop blur effect
   - Responsive navigation
   - Subtle hover effects
   - Mobile menu support

4. **ProcessCards**
   - Scroll-triggered animations
   - Step-by-step visualization
   - Interactive tooltips
   - Color-coded sections

5. **ContactTerminal**
   - Terminal-style interface
   - Form validation
   - Typing effects
   - Success animations

## 🛠️ Technical Implementation

### Performance Targets
- FPS: ≥55 desktop, ≥40 mobile
- CPU Usage: <3% for background effects
- Lighthouse Score: ≥90 mobile
- Zero motion violations

### Accessibility
- Reduced motion support
- ARIA labels
- Keyboard navigation
- Contrast ratios ≥4.5:1

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for older browsers
- Mobile-first responsive design

## 📦 Project Structure

```
src/
├── components/
│   └── home/
│       └── v6/
│           ├── HeroPortal.jsx
│           ├── LayoutWrapper.jsx
│           ├── NavBarCosmic.jsx
│           ├── ParallaxStarfield.jsx
│           ├── PillNav.jsx
│           ├── ProcessCards.jsx
│           ├── ServicesOrbital.jsx
│           ├── StarfieldBackground.jsx
│           └── ContactTerminal.jsx
├── hooks/
│   └── useBreakpoint.js
├── styles/
│   └── globals.css
└── pages/
    └── v6_home.jsx
```

## 🚀 Getting Started

1. **Installation**
   ```powershell
   npm install
   ```

2. **Development**
   ```powershell
   npm run dev
   ```

3. **Build**
   ```powershell
   npm run build
   ```

## 🎨 Design System

### Colors
- Primary: Lime (`#4ade80`)
- Secondary: Purple (`#a855f7`)
- Accent: Cyan (`#22d3ee`)
- Background: Black (`#000000`)

### Typography
- Headers: Serif font
- Body: Sans-serif
- Terminal: Monospace

### Animations
- Entrance: 0.8s ease-out
- Hover: 0.2s ease
- Transitions: 0.3s ease
- Parallax: Smooth scroll-based

## 📋 Development Guidelines

1. **Component Rules**
   - LEGIT protocol compliance required
   - Proper metadata documentation
   - Performance monitoring
   - Accessibility checks

2. **Animation Guidelines**
   - Must include reduced-motion alternatives
   - Performance-first approach
   - Smooth transitions
   - No jarring movements

3. **Responsive Design**
   - Mobile-first development
   - Breakpoint consistency
   - Touch-friendly interactions
   - Flexible layouts

## 🔒 LEGIT Protocol Requirements

All components must adhere to the LEGIT protocol:
- Documented metadata
- Performance benchmarks
- Accessibility compliance
- Responsive behavior
- Animation guidelines

## 🌟 Credits

Developed by CuriousLabs
Version: 1.0.0
License: Proprietary
