# ContactTerminalAtomic Component Contract

## Component Details
- **File Path**: `src/components/atomic/ContactTerminalAtomic.jsx`
- **Component Name**: ContactTerminalAtomic
- **Version**: 1.0.0
- **Type**: Atomic

## Metadata
```js
export const metadata = {
  id: 'contact_terminal_atomic',
  scs: 'SCS-TERMINAL-UI',
  type: 'atomic',
  doc: 'contract_contact_terminal_atomic.md'
};
```

## Component Structure
ContactTerminalAtomic is a fully self-contained component that combines contact information display and a contact form in a terminal-inspired interface. It features a tabbed interface with two modes: "contact_info" for displaying contact details and "contact_init" for the contact form. The component has a two-column layout on desktop (terminal interface on left, cosmic visualization on right) and a single-column layout on mobile. It includes typing animations for terminal text, animated responses, and a blinking cursor effect, all while respecting user's motion preferences.

## Props
This component does not accept any props, as it is fully self-contained with internal data and state management.

## Internal Data
The component maintains several internal states:
- Responsive state (`isMobile`)
- Animation states (`typedText`, `typingComplete`)
- Accessibility preference (`prefersReducedMotion`)
- UI state (`activeTab`)
- Form data (`formData` with name, email, project, message fields)

## Visual Strategy

### Layout
- **Overall Structure**: Two-column layout on desktop, single-column on mobile
- **Left Column**: Terminal interface with tabs for contact information and contact form
- **Right Column**: Cosmic visualization (hidden on mobile)
- **Terminal Design**: Dark background with window controls, monospace font, command-line styling
- **Tab Interface**: Tabbed navigation between contact info and contact form modes

### Color Scheme
- **Background**: Dark background (bg-curious-dark-900)
- **Terminal Text**: Lime green (text-lime-400) for commands and prompts
- **Content Text**: White and gray for information
- **Accent Elements**: Subtle lime glow effects and highlights
- **Terminal Window**: Classic red, yellow, green control dots
- **Submit Button**: Lime green with black text

### Visual Elements
- **Terminal Window**: Header with control dots and command line
- **Terminal Prompt**: Command prompt with blinking cursor
- **Contact Information**: Email, Discord, and GitHub links with terminal-style formatting
- **Form Inputs**: Name, email, project type, and message fields with terminal styling
- **Cosmic Visualization**: Rounded terminal globe with orbital rings (desktop only)
- **Terminal Glow**: Subtle lime glow effect around the terminal window

## Animation Strategy

### Text Animations
- **Typing Effect**: Character-by-character typing of the initial prompt
- **Reveal Animation**: Fade-in of contact information after typing completes
- **Cursor Blinking**: Animated cursor pulse effect
- **Tab Transitions**: Smooth transitions between contact info and form tabs

### Interactive Elements
- **Link Highlighting**: Hover effect on clickable links
- **Tab Selection**: Active tab highlighting and styling
- **Form Inputs**: Focus states with lime accents
- **Submit Button**: Hover and focus states
- **Terminal Globe**: Subtle animation effects on the visualization

### Reduced Motion Support
- **Detection**: Uses `prefers-reduced-motion` media query
- **Adaptations**: 
  - Skips typing animation
  - Shows content immediately
  - Maintains essential visual elements

## Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
- **Desktop**: ≥ 768px

### Layout Changes
- **Desktop**: Two-column layout with visualization
- **Mobile**: Single-column layout, visualization hidden
- **Spacing**: Adjusted padding and margins for optimal viewing on different screen sizes

## Implementation Notes

### State Management
- **Responsive State**: Internal state tracks device size for layout changes
- **Animation State**: Manages typing animation and reveal sequences
- **Tab State**: Manages which tab is currently active
- **Form State**: Tracks form input values
- **Motion Preference**: Adapts animations based on user preferences

### Form Handling
- **Input Management**: Controlled inputs for name, email, project type, and message
- **Form Submission**: Placeholder submission handler
- **Project Types**: Predefined list of project types for the dropdown

### Animation Logic
- **Typing Animation**: Character-by-character reveal with setInterval
- **Sequential Animations**: Staged appearance of elements with delayed animations
- **Conditional Rendering**: Elements appear only after previous animations complete

### Accessibility Considerations
- **ARIA Attributes**: 
  - `aria-labelledby` for section labeling
  - `aria-label` for links
  - `aria-hidden="true"` on decorative elements
  - `aria-selected` for tab state
  - `role="tab"` for tab buttons
- **Motion Control**: Respects user's motion preferences
- **Keyboard Navigation**: Ensures all interactive elements are properly focusable
- **Semantic HTML**: Uses appropriate heading levels, labels, and semantic structure

## LEGIT Compliance

### Self-Contained Design
- ✅ Contains all necessary data internally
- ✅ Independent responsive state management
- ✅ No external dependencies or hooks
- ✅ Complete form handling logic

### Responsive Behavior
- ✅ Adapts layout for mobile and desktop
- ✅ Conditionally renders visualization based on screen size
- ✅ Maintains readability across all screen sizes
- ✅ Form elements properly resize for all viewports

### Animation Control
- ✅ Respects reduced motion preferences
- ✅ Provides appropriate animation alternatives
- ✅ Uses efficient animation techniques
- ✅ Smooth transitions between tabs

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA attributes for interactive and decorative elements
- ✅ Keyboard navigation support
- ✅ Color contrast considerations
- ✅ Properly labeled form elements

### Documentation
- ✅ Complete component contract
- ✅ Visual strategy documentation
- ✅ Animation specifications
- ✅ Responsive behavior notes
- ✅ Form handling documentation

## Visual Comparison with Original
The ContactTerminalAtomic component maintains all the key visual elements of the original ContactTerminal:
- Same terminal-inspired interface with control dots
- Identical form fields (name, email, project type, message)
- Same submit button styling and interaction
- Similar cosmic visualization with orbital rings
- Consistent use of lime green terminal text
- Identical monospace font and command-line aesthetic

The component enhances the original with:
- Tabbed interface to toggle between contact info and form
- Typing animations and sequential reveals
- Improved accessibility and keyboard navigation
- Reduced motion support
- Self-contained state management

## Future Enhancements
1. **Interactive Commands**: Add the ability to type commands that reveal different information
2. **Theme Customization**: Support for different terminal color schemes
3. **Form Validation**: Client-side validation with terminal-style error messages
4. **Form Submission Handling**: Integration with backend services
5. **Success/Error States**: Terminal-style responses for form submission results
6. **Animation Options**: Additional animation styles for terminal interactions
7. **Social Media Integration**: Expanded contact options with social media links 