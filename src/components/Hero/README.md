# Hero Component

The Hero component uses a modular architecture for better maintainability and separation of concerns.

## Structure

The Hero component consists of the following subcomponents:

- **index.jsx**: The main container component that imports and composes all subcomponents
- **HeroHeading.jsx**: Contains the main heading with gradient styling
- **HeroContent.jsx**: Contains the descriptive paragraphs and layout for the hero section
- **HeroButtons.jsx**: Contains the call-to-action buttons

## Usage

To use the Hero component in a page:

```jsx
import Hero from '../components/Hero';

export default function MyPage() {
  return (
    <div>
      <Hero />
      {/* other content */}
    </div>
  );
}
```

## Customization

Each subcomponent can be modified independently:

- To change the heading text or styling, modify `HeroHeading.jsx`
- To update the descriptive text, modify `HeroContent.jsx`
- To change the button actions or styling, modify `HeroButtons.jsx`

## Styling

The component uses Tailwind CSS for styling. Main container styling is in `index.jsx`, while component-specific styling is in each subcomponent file. 