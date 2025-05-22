I'll analyze the component heights and viewport positioning to map where each section lives in the viewport. Let me examine the code to determine this.

Search files...

Ran tool

Ran tool

Read file: src/components/home/v6/SceneControllerV6.jsx
# Viewport Composition Map for v6_atomic.jsx

Based on my analysis of the code, here's the viewport composition of the page sections:

## Overall Page Structure
The v6_atomic.jsx page uses a sequence of full-height (min-h-screen) components that stack vertically. Each component is designed to occupy approximately 100vh (one full viewport height) with some overlap between sections. The page uses SceneControllerV6 to manage scroll position and phase transitions.

## Section Viewport Positioning

1. **Introduction (HeroAtomic)**
   - **Viewport Range**: 0vh - 100vh
   - **CSS**: `min-h-screen` (100vh)
   - **Purpose**: Landing screen with hero animation
   - **Scroll Position**: Top of page

2. **Purpose (MissionAtomic)**
   - **Viewport Range**: 100vh - 200vh
   - **CSS**: `min-h-screen` (100vh)
   - **Purpose**: Eclipse-style mission statement
   - **Scroll Position**: Second screen

3. **Products (ProductScrollAtomic)**
   - **Viewport Range**: 200vh - 300vh
   - **CSS**: `min-h-screen` with internal `h-[70vh]` scroll container
   - **Purpose**: Horizontal product showcase
   - **Scroll Position**: Third screen

4. **Services (ServicesOrbitalAtomic)**
   - **Viewport Range**: 300vh - 400vh
   - **CSS**: `min-h-screen`
   - **Purpose**: Orbital service visualization
   - **Scroll Position**: Fourth screen

5. **Process (ProcessLegacyAtomic)**
   - **Viewport Range**: 400vh - 500vh
   - **CSS**: `min-h-screen`
   - **Purpose**: Process steps with orbital connections
   - **Scroll Position**: Fifth screen

6. **Contact (ContactTerminalAtomic)**
   - **Viewport Range**: 500vh - 600vh
   - **CSS**: `min-h-screen`
   - **Purpose**: Terminal-inspired contact section
   - **Scroll Position**: Sixth screen

## Key Implementation Notes

- Each component uses `min-h-screen` to ensure it takes at least one full viewport height
- The ProductScrollAtomic has an internal scroll container of 70vh height for the product cards
- The entire page spans approximately 600vh in total (six full viewport heights)
- The SceneControllerV6 manages scroll position tracking and phase transitions
- The components have padding (typically py-20 or py-24) to provide spacing within each viewport section
- On mobile devices, the components maintain their min-h-screen property but may have different internal layouts

This viewport composition creates a full-page scrolling experience where each major section occupies one complete viewport, allowing users to navigate through the content in distinct, screen-sized chunks.
