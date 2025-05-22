# Enhanced Products Page - "Bento Elevation" Layout

Looking at your current ProductsPage, here are the specific upgrades to transform it into a more sophisticated, modern product showcase:

## 1. Enhanced Background & Layout Structure

Replace your current ProductsPage background and layout with this enhanced version:

```jsx
const ProductsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient with more depth */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, rgba(162, 52, 179, 0.4) 75%, rgba(186, 86, 16, 0.3) 100%)',
          }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'] 
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000">
            {/* Hexagonal grid pattern */}
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 12 }).map((_, col) => {
                const x = col * 80 + (row % 2) * 40;
                const y = row * 70;
                return (
                  <motion.polygon
                    key={`hex-${row}-${col}`}
                    points={`${x},${y+20} ${x+20},${y} ${x+40},${y} ${x+60},${y+20} ${x+40},${y+40} ${x+20},${y+40}`}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                    animate={{
                      strokeOpacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                );
              })
            )}
          </svg>
        </div>
        
        {/* Floating geometric shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute w-16 h-16 border border-purple-400/20 rotate-45"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced Nebula Effects */}
      <motion.div
        className="absolute inset-0 z-1"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(162, 52, 179, 0.3) 0%, rgba(186, 86, 16, 0.2) 50%, transparent 70%)',
          filter: 'blur(45px)',
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Main Content Area with Enhanced Layout */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-6 h-full flex items-center">
        <div className="w-full grid grid-cols-12 gap-8 h-5/6">
          
          {/* Left Panel - Enhanced Info Section */}
          <div className="col-span-4 flex flex-col justify-center space-y-6">
            <ProductInfoPanel activeProduct={OPS_BENTO_ITEMS[activeIndex]} />
          </div>
          
          {/* Right Panel - Enhanced Product Grid */}
          <div className="col-span-8 relative">
            <ProductGrid 
              activeIndex={activeIndex} 
              setActiveIndex={setActiveIndex}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
            
            {/* Connection Lines Between Cards */}
            <ProductConnections activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};
```

## 2. Enhanced Product Info Panel

Replace your current left panel with this more sophisticated version:

```jsx
const ProductInfoPanel = ({ activeProduct }) => (
  <div className="h-full relative">
    {/* Main info card */}
    <motion.div 
      className="backdrop-blur-xl bg-slate-900/40 rounded-2xl border border-white/20 p-8 h-full relative overflow-hidden"
      style={{
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05)'
      }}
      layoutId="info-panel"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${activeProduct.accentColor}40 0%, transparent 50%)`,
            backgroundSize: '100px 100px',
          }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'] 
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with animated accent */}
        <div className="space-y-4 mb-8">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: activeProduct.accentColor }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-mono uppercase tracking-wider text-white/60">
              Product Ecosystem
            </span>
          </motion.div>
          
          <motion.h3
            className="text-4xl font-bold"
            style={{ 
              background: `linear-gradient(135deg, ${activeProduct.accentColor} 0%, #22d3ee 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            key={activeProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our<br />Products
          </motion.h3>
        </div>

        {/* Dynamic description based on active product */}
        <motion.div 
          className="space-y-4 flex-1"
          key={activeProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white/80 text-sm leading-relaxed">
            Each system is a star in our galaxy — unique, powerful, and built to orbit around you.
          </p>
          
          {/* Active product highlight */}
          <div className="p-4 rounded-xl backdrop-blur-sm border border-white/10 bg-white/5">
            <h4 
              className="font-semibold text-lg mb-2"
              style={{ color: activeProduct.accentColor }}
            >
              {activeProduct.title}
            </h4>
            <p className="text-white/70 text-sm mb-3">{activeProduct.summary}</p>
            <p className="text-white/60 text-xs italic">{activeProduct.tagline}</p>
          </div>

          {/* Core principles */}
          <div className="space-y-3 mt-6">
            {[
              'A shared AI core with emotional, operational, and creative agents',
              'Interfaces that protect — never replace — human judgment',
              'Bot-to-dashboard architecture, built for real-world workflows'
            ].map((principle, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div 
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: activeProduct.accentColor }}
                />
                <span className="text-white/80 text-sm leading-relaxed">{principle}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.button
          className="w-full mt-8 px-6 py-3 rounded-xl font-medium text-white text-sm relative overflow-hidden group"
          style={{ backgroundColor: activeProduct.accentColor }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Explore {activeProduct.title}</span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </div>
    </motion.div>
  </div>
);
```

## 3. Enhanced Product Grid with Asymmetric Layout

Replace your current grid with this more sophisticated version:

```jsx
const ProductGrid = ({ activeIndex, setActiveIndex, hoveredCard, setHoveredCard }) => {
  return (
    <div className="relative h-full w-full">
      {/* Asymmetric grid layout */}
      <div className="grid grid-cols-6 grid-rows-4 gap-4 h-full">
        
        {/* Featured Card (Large) */}
        <motion.div 
          className="col-span-4 row-span-3"
          layoutId={`card-${activeIndex}`}
        >
          <EnhancedProductCard 
            item={OPS_BENTO_ITEMS[activeIndex]} 
            isActive={true}
            isFeatured={true}
            onHover={() => setHoveredCard(activeIndex)}
            onLeave={() => setHoveredCard(null)}
          />
        </motion.div>
        
        {/* Supporting Cards (Small) */}
        <div className="col-span-2 row-span-4 space-y-4">
          {OPS_BENTO_ITEMS.filter((_, i) => i !== activeIndex).slice(0, 3).map((item, index) => {
            const originalIndex = OPS_BENTO_ITEMS.findIndex(p => p.id === item.id);
            return (
              <motion.div 
                key={item.id}
                className="h-32"
                onClick={() => setActiveIndex(originalIndex)}
                layoutId={`card-${originalIndex}`}
              >
                <EnhancedProductCard 
                  item={item} 
                  isActive={false}
                  isFeatured={false}
                  isHovered={hoveredCard === originalIndex}
                  onHover={() => setHoveredCard(originalIndex)}
                  onLeave={() => setHoveredCard(null)}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Stats/Metrics Panel */}
        <motion.div 
          className="col-span-4 row-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ProductMetrics activeProduct={OPS_BENTO_ITEMS[activeIndex]} />
        </motion.div>
      </div>
    </div>
  );
};
```

## 4. Enhanced Product Card Component

Replace your current BentoItem with this more sophisticated version:

```jsx
const EnhancedProductCard = ({ item, isActive, isFeatured, isHovered, onHover, onLeave }) => {
  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm border cursor-pointer group"
      style={{
        background: isFeatured 
          ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7), ${item.accentColor}20)`
          : 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
        borderColor: isActive ? `${item.accentColor}aa` : 'rgba(255,255,255,0.2)',
        boxShadow: isActive || isHovered
          ? `0 0 30px ${item.accentColor}40, inset 0 0 20px rgba(255,255,255,0.1)`
          : 'inset 0 0 5px rgba(255,255,255,0.05)',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: isFeatured ? 1.02 : 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product-specific background effects */}
      <ProductBackgroundEffect item={item} isActive={isActive} isFeatured={isFeatured} />
      
      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-3">
          {/* Product icon/visualization */}
          <ProductIcon item={item} isFeatured={isFeatured} />
          
          <div>
            <h3
              className={`font-bold uppercase tracking-wide mb-2 ${isFeatured ? 'text-2xl' : 'text-lg'}`}
              style={{ color: item.accentColor, textShadow: `0 0 10px ${item.accentColor}60` }}
            >
              {item.title}
            </h3>
            <p className={`font-medium text-white/80 ${isFeatured ? 'text-base' : 'text-sm'}`}>
              {item.summary}
            </p>
          </div>
        </div>

        {/* Features - only show in featured mode */}
        {isFeatured && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 my-4"
          >
            {item.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: item.accentColor }}
                />
                <span className="text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <div className="space-y-3">
          {isFeatured && (
            <p className="text-sm italic text-white/60">{item.tagline}</p>
          )}
          
          {/* Interaction hint */}
          <div className="flex items-center justify-between">
            <span className={`font-mono uppercase tracking-wider text-white/40 ${isFeatured ? 'text-xs' : 'text-xs'}`}>
              {isFeatured ? 'Featured' : 'View'}
            </span>
            <motion.div
              className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: item.accentColor }}
            >
              <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
```

## 5. Product-Specific Background Effects

Add this component for unique visual elements per product:

```jsx
const ProductBackgroundEffect = ({ item, isActive, isFeatured }) => {
  const getProductEffect = () => {
    switch (item.title) {
      case 'OPSPipe':
        return (
          <div className="absolute inset-0 opacity-20">
            {/* Document flow animation */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-1 bg-lime-400/60 rounded"
                style={{
                  top: `${20 + i * 15}%`,
                  left: '10%'
                }}
                animate={{
                  x: [0, 100, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        );
      
      case 'MoonSignal':
        return (
          <div className="absolute inset-0 opacity-20">
            {/* Signal waves */}
            <svg className="absolute inset-0 w-full h-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.circle
                  key={i}
                  cx="80%"
                  cy="20%"
                  r={10 + i * 15}
                  fill="none"
                  stroke="#d946ef"
                  strokeWidth="1"
                  animate={{
                    r: [10 + i * 15, 30 + i * 15, 10 + i * 15],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </svg>
          </div>
        );
      
      case 'Guardian':
        return (
          <div className="absolute inset-0 opacity-20">
            {/* Shield effect */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-purple-400 rounded-lg"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity
              }}
            />
          </div>
        );
      
      case 'Curious':
        return (
          <div className="absolute inset-0 opacity-20">
            {/* Conversation bubbles */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-lime-400 rounded-full"
                style={{
                  top: `${30 + i * 20}%`,
                  right: `${20 + i * 10}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return getProductEffect();
};
```

## 6. Product Metrics Panel

Add this new component for the bottom stats section:

```jsx
const ProductMetrics = ({ activeProduct }) => {
  const metrics = {
    'OPSPipe': [
      { label: 'Automation Rate', value: '94%', trend: '+12%' },
      { label: 'Processing Speed', value: '2.3s', trend: '-0.4s' },
      { label: 'Accuracy', value: '99.7%', trend: '+0.3%' }
    ],
    'Guardian': [
      { label: 'Screen Time Reduced', value: '67%', trend: '+23%' },
      { label: 'Creative Sessions', value: '1.2k', trend: '+340' },
      { label: 'Parent Satisfaction', value: '96%', trend: '+8%' }
    ],
    'MoonSignal': [
      { label: 'Signal Accuracy', value: '87%', trend: '+15%' },
      { label: 'Execution Time', value: '0.8s', trend: '-0.2s' },
      { label: 'Risk Mitigation', value: '91%', trend: '+7%' }
    ],
    'Curious': [
      { label: 'Response Quality', value: '93%', trend: '+11%' },
      { label: 'Context Retention', value: '89%', trend: '+14%' },
      { label: 'User Engagement', value: '92%', trend: '+18%' }
    ]
  };

  const productMetrics = metrics[activeProduct.title] || metrics['OPSPipe'];

  return (
    <motion.div 
      className="backdrop-blur-sm bg-slate-900/30 rounded-xl border border-white/10 p-4 h-full"
      key={activeProduct.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: activeProduct.accentColor }}
          />
          <span className="text-sm font-mono text-white/60 uppercase tracking-wider">
            Live Metrics
          </span>
        </div>
        
        <div className="flex space-x-8">
          {productMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-lg font-bold"
                style={{ color: activeProduct.accentColor }}
              >
                {metric.value}
              </div>
              <div className="text-xs text-white/60">{metric.label}</div>
              <div className="text-xs text-green-400">{metric.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
```

## Usage Instructions

1. **Replace the entire ProductsPage component** with the enhanced version
2. **Add all the new sub-components** (ProductInfoPanel, ProductGrid, EnhancedProductCard, etc.)
3. **Update the OPS_BENTO_ITEMS data** if needed to match any new fields
4. **Test the interactions** - the asymmetric layout should work with your existing state management

This creates a much more sophisticated and modern product showcase with:
- Asymmetric bento grid layout with featured product
- Product-specific visual effects and animations  
- Enhanced typography and spacing
- Live metrics display
- Better visual hierarchy and information architecture
- Smooth transitions between products

The result will be a premium, engaging product showcase that tells the story of your ecosystem much more effectively.