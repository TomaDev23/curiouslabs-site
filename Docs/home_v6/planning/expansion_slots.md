# V6 Home Page Expansion Slots

This document tracks placeholder sections that have been added to the v6_home.jsx file for future content implementation.

## Current Placeholders

| Position | ID | Name | Status | Notes |
|---------|-----|------|--------|-------|
| After Hero | cosmic-lore | Cosmic Lore Panel | Placeholder with Background | Added as 100vh section with milkyway1.jpg background image |

## Placeholder Template

```jsx
<section className="min-h-screen flex items-center justify-center border-y border-dashed border-green-500">
  <h2 className="text-white text-xl font-mono">[INSERT: Section Name]</h2>
</section>
```

## Enhanced Image Background Template

```jsx
<section className="min-h-screen relative flex items-center justify-center border-y border-dashed border-green-500 overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: 'url("/path/to/image.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  ></div>
  
  {/* Overlay for better text readability */}
  <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
  
  {/* Placeholder Label */}
  <h2 className="text-white text-xl font-mono z-20 relative px-4 py-2 bg-black bg-opacity-50 rounded-lg border border-green-500">
    [INSERT: Section Name]
  </h2>
</section>
```

## Implementation Plan

When ready to implement a placeholder section:

1. Create the component in `src/components/home/v6/`
2. Replace the placeholder section with the actual component
3. Update the `V6_SECTIONS` array with the proper component reference
4. Update this document to mark the section as implemented

## Future Expansion Ideas

Potential sections to consider:

- **Orbit Map Deck**: Interactive visualization of planetary orbits
- **Experimental Zone A**: Showcase for experimental technologies
- **Research Lab Deck**: Display of ongoing research projects
- **Real-Time Dashboard**: Live data visualization
- **Data Network Overlay**: Network connection visualization

## Section Usage Guidelines

- Each section should maintain the min-h-screen height to preserve the overall layout
- Sections should be implemented one at a time to ensure proper integration
- Update the V6HUDSystem with each new section for proper scroll tracking
- Follow the Z-pattern layout principles established in the LEGIT contract
- Consider using background images that align with the cosmic theme 