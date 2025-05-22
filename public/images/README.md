# Background Assets for CuriousLabs Vite Build

This directory contains the background assets required for the CuriousLabs website.

## Generated Assets

### stars-bg.png / stars-bg.svg
- **Purpose**: Dark space background with stars and nebula effects
- **Usage**: Main cosmic background for the website
- **Details**: 
  - 2048x2048px resolution
  - Dark slate background (#0f172a)
  - White and cyan (#22d3ee) stars with glow effects
  - Subtle lime (#84cc16) and magenta (#d946ef) nebula clouds
  - Designed to be seamless (tileable)

### circuit-pattern.svg
- **Purpose**: Tech-themed circuit board pattern overlay
- **Usage**: Subtle technology-inspired background element
- **Details**:
  - Transparent background with thin circuit-like lines
  - Cyan (#22d3ee) and magenta (#d946ef) trace colors
  - Low opacity (0.3-0.5) for subtle effect
  - Small file size for fast loading

## Implementation Notes

These assets are referenced in `src/layouts/HomeFloatflowLayout.jsx` or related CSS files using paths like:
- `/images/stars-bg.png`
- `/images/circuit-pattern.svg`

For PNG assets, the SVG versions are provided as source files that should be rendered to optimized PNGs for production use.

## Colors

The assets use the CuriousLabs color palette:
- Dark slate: #0f172a
- Lime: #84cc16
- Cyan: #22d3ee
- Magenta: #d946ef 