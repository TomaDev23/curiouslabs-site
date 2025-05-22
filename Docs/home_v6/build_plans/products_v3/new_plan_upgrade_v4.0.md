
# OpsBentoCluster Enhancement Plan

Based on your requirements, I'll outline a detailed strategy to transform the OpsBentoCluster from a grid to an interactive carousel that matches the screenshot:

## 1. Core Carousel Implementation with Framer Motion

```jsx
// Add state for the active card and carousel position
const [activeIndex, setActiveIndex] = useState(0);
const [carouselX, setCarouselX] = useState(0);
const carouselRef = useRef(null);

// Auto-rotation effect
useEffect(() => {
  if (prefersReducedMotion) return;
  
  const rotationInterval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % OPS_BENTO_ITEMS.length);
  }, 8000); // Subtle rotation every 8 seconds
  
  return () => clearInterval(rotationInterval);
}, [prefersReducedMotion]);
```

## 2. Fix Flip Animation

The current flip implementation has issues with the back face direction. We need to adjust the transforms:

```jsx
// Flip animation variants - fix the mirroring issue
const flipVariants = {
  front: { 
    rotateY: 0,
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  back: { 
    rotateY: 180,
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
};

// For the back face container (fix the double flip issue)
<div
  className="absolute inset-0 p-6 sm:p-8 flex flex-col items-center justify-center"
  style={{ 
    backfaceVisibility: 'hidden', 
    transform: 'rotateY(180deg)',
    // This ensures text reads correctly on the back
    transformStyle: 'preserve-3d'
  }}
>
  {/* Back content */}
</div>
```

## 3. Replace Grid with Carousel Structure

```jsx
<motion.div 
  ref={carouselRef}
  className="flex space-x-4 sm:space-x-6 overflow-x-hidden"
  drag="x"
  dragConstraints={{ left: -(OPS_BENTO_ITEMS.length - 1) * 320, right: 0 }}
  dragElastic={0.1}
  animate={{ x: -activeIndex * 320 }}
  transition={{ type: 'spring', damping: 20 }}
  onDragEnd={(_, info) => {
    // Handle drag to navigate
    const threshold = 100;
    const direction = info.offset.x < -threshold ? 1 : info.offset.x > threshold ? -1 : 0;
    if (direction) {
      const newIndex = Math.max(0, Math.min(OPS_BENTO_ITEMS.length - 1, activeIndex + direction));
      setActiveIndex(newIndex);
    }
  }}
>
  {OPS_BENTO_ITEMS.map((item, index) => (
    <BentoItem
      key={item.id}
      item={item}
      className="flex-shrink-0 w-72 sm:w-80"
      interactive
      isActive={index === activeIndex}
      onClick={() => setActiveIndex(index)}
    />
  ))}
</motion.div>
```

## 4. Add Pagination Indicators

```jsx
<div className="flex justify-center mt-6">
  {OPS_BENTO_ITEMS.map((_, index) => (
    <motion.button
      key={index}
      className="w-3 h-3 mx-1 rounded-full bg-white/20"
      animate={{
        scale: activeIndex === index ? 1.2 : 1,
        backgroundColor: activeIndex === index 
          ? OPS_BENTO_ITEMS[activeIndex].accentColor 
          : 'rgba(255,255,255,0.2)',
      }}
      onClick={() => setActiveIndex(index)}
      aria-label={`Go to product ${index + 1}`}
    />
  ))}
</div>
```

## 5. Add Product Details Panel

```jsx
const ActiveProductDetail = ({ product }) => {
  return (
    <motion.div
      className="hidden lg:block w-1/3 p-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      key={product.id} // Force re-render on product change
      transition={{ duration: 0.4 }}
    >
      <div className="text-xs uppercase tracking-wider text-white/50 mb-2">
        {product.id === 1 ? 'OPERATIONS SYSTEM' : 
         product.id === 2 ? 'AI COMPANION' :
         product.id === 3 ? 'TRADING & SIGNALS' : 'RELATIONAL AI'}
      </div>
      
      <h3 
        className="text-4xl font-bold mb-4"
        style={{ color: product.accentColor }}
      >
        {product.title}
      </h3>
      
      <p className="text-white/80 mb-6">
        {product.backContent}
      </p>
      
      <ul className="space-y-2 mb-8">
        {product.features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <span 
              className="w-2 h-2 rounded-full mr-3"
              style={{ backgroundColor: product.accentColor }}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <motion.button
        className="px-6 py-3 rounded-full font-medium"
        style={{ backgroundColor: product.accentColor }}
        whileHover={{ scale: 1.05 }}
      >
        Learn More
      </motion.button>
    </motion.div>
  );
};
```

## 6. Responsive Layout Structure

```jsx
// Main container structure
<section className={`w-full py-12 sm:py-16 ${className}`}>
  {/* Header stays the same */}
  
  <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
    {/* Carousel container - takes full width on mobile, 2/3 on desktop */}
    <div className="w-full lg:w-2/3">
      {/* Carousel implementation */}
    </div>
    
    {/* Detail panel - hidden on mobile */}
    <ActiveProductDetail product={OPS_BENTO_ITEMS[activeIndex]} />
  </div>
  
  {/* Pagination dots */}
</section>
```

## 7. Mobile Optimization

```jsx
// Responsive styling
<div className="w-full overflow-hidden">
  {/* On mobile: Stack cards vertically */}
  <div className="lg:hidden">
    {OPS_BENTO_ITEMS.map((item, index) => (
      <motion.div 
        key={item.id}
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <BentoItem item={item} interactive onClick={() => setActiveIndex(index)} />
      </motion.div>
    ))}
  </div>
  
  {/* On desktop: Horizontal carousel */}
  <div className="hidden lg:block">{/* Carousel implementation */}</div>
</div>
```

## Additional Recommendations:

1. **Performance Optimization**:
   - Use `layoutId` from Framer Motion for smooth transitions between states
   - Implement `React.memo` for the BentoItem component to prevent unnecessary re-renders

2. **Accessibility Improvements**:
   - Add keyboard navigation (arrow keys) for the carousel
   - Ensure proper focus management when cards change
   - Add proper ARIA labels for interactive elements

3. **Visual Enhancements**:
   - Add a subtle parallax effect to the background based on scroll position
   - Implement a "peek" effect where you can slightly see the next card
   - Add subtle motion to the inactive cards to keep the display dynamic

Would you like me to proceed with implementing these changes to the OpsBentoCluster component?
