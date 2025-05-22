# Enhanced AEGIS Page - Modern UI Upgrade

Looking at your current AEGIS page, here are the specific upgrades to make it more modern and visually compelling. I'll give you targeted snippets to replace or enhance what you have:

## 1. Enhanced Background System

Replace your current background section with this more sophisticated version:

```jsx
// Replace the existing background divs in AegisPage with this enhanced version
{/* Enhanced Cosmic Background with Grid */}
<div className="absolute inset-0 z-0">
  {/* Base gradient */}
  <motion.div
    className="absolute inset-0"
    style={{
      background: 'linear-gradient(135deg, #060b14 0%, #0a1120 30%, #131c2f 60%, rgba(98, 153, 16, 0.15) 100%)',
    }}
  />
  
  {/* Perspective Grid */}
  <div className="absolute inset-0 opacity-20">
    <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="absolute inset-0">
      {/* Horizontal grid lines with perspective */}
      {Array.from({ length: 20 }).map((_, i) => (
        <path 
          key={`h-${i}`} 
          d={`M 0,${500 + (i - 10) * 50} Q 500,${480 + (i - 10) * 55} 1000,${500 + (i - 10) * 50}`} 
          stroke="#84cc16" 
          strokeOpacity="0.3" 
          strokeWidth="0.5" 
          fill="none" 
        />
      ))}
      
      {/* Vertical grid lines with perspective */}
      {Array.from({ length: 20 }).map((_, i) => (
        <path 
          key={`v-${i}`} 
          d={`M ${(i) * 50},0 Q ${(i) * 50 + Math.sin(i) * 10},500 ${(i) * 50},1000`} 
          stroke="#84cc16" 
          strokeOpacity="0.2" 
          strokeWidth="0.5" 
          fill="none" 
        />
      ))}
    </svg>
  </div>
  
  {/* Dynamic noise texture */}
  <div 
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
      mixBlendMode: 'overlay'
    }}
  />
</div>

{/* Enhanced Nebula Effect with Multiple Layers */}
<motion.div
  className="absolute inset-0 z-1"
  style={{
    background: 'radial-gradient(ellipse at 25% 40%, rgba(98, 153, 16, 0.25) 0%, rgba(98, 153, 16, 0.1) 40%, transparent 70%)',
    filter: 'blur(40px)',
  }}
  animate={{ 
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.5, 0.3],
    x: [0, 20, 0],
    y: [0, -10, 0]
  }}
  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
/>

<motion.div
  className="absolute inset-0 z-1"
  style={{
    background: 'radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.08) 35%, transparent 60%)',
    filter: 'blur(60px)',
  }}
  animate={{ 
    scale: [1.1, 1, 1.1],
    opacity: [0.2, 0.4, 0.2],
    x: [0, -15, 0],
    y: [0, 15, 0]
  }}
  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
/>
```

## 2. Enhanced Content Layout

Replace your current content div with this more structured layout:

```jsx
{/* Enhanced Content Layout */}
<div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 h-full flex items-center">
  <div className="grid grid-cols-12 gap-8 w-full">
    
    {/* Left Column - Main Content */}
    <div className="col-span-12 lg:col-span-7 space-y-8">
      
      {/* Header Section with Enhanced Typography */}
      <div className="space-y-4">
        <motion.div
          className="inline-flex items-center space-x-3 mb-4"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className="w-3 h-3 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-lime-400/80 text-sm font-mono uppercase tracking-wider">Core Runtime</span>
        </motion.div>
        
        <motion.h2
          className="text-5xl lg:text-7xl font-bold uppercase tracking-tight leading-none"
          style={{ 
            background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 50%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(132, 204, 22, 0.5)'
          }}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          AEGIS<br />
          <span className="text-white/90 text-4xl lg:text-5xl normal-case">Runtime</span>
        </motion.h2>
        
        <motion.p
          className="text-xl lg:text-2xl font-medium text-white/80 max-w-lg leading-relaxed"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          The smart core powering everything we build.
        </motion.p>
      </div>

      {/* Tagline with Enhanced Styling */}
      <motion.div
        className="relative"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-lime-400 rounded-full" />
        <h3 className="text-3xl lg:text-4xl font-semibold text-cyan-400 leading-tight">
          Adaptive. Auditable. Alive.
        </h3>
        <p className="text-lg text-white/70 mt-3 max-w-lg leading-relaxed">
          AEGIS is the thinking engine behind CuriousLabs — a precision system built to orchestrate AI, logic, and control across all products.
        </p>
      </motion.div>

      {/* Enhanced Feature Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        {[
          { 
            title: 'Multi-Agent Architecture', 
            desc: 'Real AI agents in parallel with roles, memory, and autonomy',
            icon: '🤖'
          },
          { 
            title: 'State Machine Control', 
            desc: 'Central mission engine governing every command',
            icon: '⚙️'
          },
          { 
            title: 'Audit-First Protocol', 
            desc: 'Complete logs, metrics, and traces for every execution',
            icon: '📊'
          },
          { 
            title: 'Modular & Scalable', 
            desc: 'Inject only what you need, scale sideways not up',
            icon: '🔧'
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="group relative p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-lime-400/30 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.4))',
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 20px rgba(132, 204, 22, 0.2)'
            }}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Right Column - AEGIS Core Visualization */}
    <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
      <AegisCore />
    </div>
  </div>
</div>
```

## 3. AEGIS Core Visualization Component

Add this new component to replace the simple logo:

```jsx
// Add this as a new component within your file
const AegisCore = () => {
  return (
    <div className="relative w-80 h-80">
      {/* Core Planet */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #84cc16, #65a30d, #166534)',
          boxShadow: '0 0 50px rgba(132, 204, 22, 0.4), inset 0 0 50px rgba(0, 0, 0, 0.3)'
        }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Surface Details */}
        <div 
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0%, transparent 30%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.4) 0%, transparent 25%)',
          }}
        />
        
        {/* Core Pulse */}
        <motion.div
          className="absolute inset-8 rounded-full border-2 border-lime-200/50"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Orbital Rings */}
      {[1.2, 1.4, 1.6].map((scale, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full border border-lime-400/20"
          style={{ 
            transform: `scale(${scale})`,
            borderStyle: 'dashed',
            borderWidth: '1px'
          }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 30 + (index * 10), 
            repeat: Infinity, 
            ease: "linear",
            direction: index % 2 === 0 ? 'normal' : 'reverse'
          }}
        />
      ))}

      {/* Orbiting Nodes (representing products) */}
      {[
        { angle: 0, color: '#84cc16', label: 'Core' },
        { angle: 90, color: '#2563eb', label: 'Ops' },
        { angle: 180, color: '#d946ef', label: 'Signal' },
        { angle: 270, color: '#22d3ee', label: 'Guard' }
      ].map((node, index) => (
        <motion.div
          key={index}
          className="absolute w-4 h-4 rounded-full border-2 border-white/50"
          style={{
            backgroundColor: node.color,
            boxShadow: `0 0 10px ${node.color}`,
            left: '50%',
            top: '50%',
            marginLeft: '-8px',
            marginTop: '-8px',
          }}
          animate={{
            x: Math.cos((node.angle * Math.PI) / 180) * 180,
            y: Math.sin((node.angle * Math.PI) / 180) * 180,
            rotate: 360
          }}
          transition={{
            x: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 20, repeat: Infinity, ease: "linear" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        >
          {/* Node label */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <span className="text-xs text-white/60 font-mono">{node.label}</span>
          </div>
        </motion.div>
      ))}

      {/* Data Flow Particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`data-${i}`}
          className="absolute w-1 h-1 bg-lime-300 rounded-full"
          style={{
            left: '50%',
            top: '50%'
          }}
          animate={{
            x: [0, Math.cos((i * 45 * Math.PI) / 180) * 120, 0],
            y: [0, Math.sin((i * 45 * Math.PI) / 180) * 120, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
```

## 4. Enhanced Particle System

Replace your current particle system with this more sophisticated version:

```jsx
{/* Enhanced Particle System */}
{Array.from({ length: 15 }).map((_, i) => (
  <motion.div
    key={`particle-${i}`}
    className="absolute rounded-full"
    style={{ 
      width: Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      backgroundColor: i % 3 === 0 ? '#84cc16' : i % 3 === 1 ? '#22d3ee' : '#ffffff',
      top: `${Math.random() * 100}%`, 
      left: `${Math.random() * 100}%`,
      boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`
    }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.5, 1, 0.5],
      x: [0, Math.random() * 20 - 10, 0]
    }}
    transition={{
      duration: Math.random() * 4 + 3,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
      ease: "easeInOut"
    }}
  />
))}

{/* Data Stream Effects */}
{Array.from({ length: 5 }).map((_, i) => (
  <motion.div
    key={`stream-${i}`}
    className="absolute w-px h-20 bg-gradient-to-b from-lime-400 to-transparent"
    style={{
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
    }}
    animate={{
      y: ['100vh', '-20vh'],
      opacity: [0, 1, 0]
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      repeatDelay: Math.random() * 5,
      ease: "linear"
    }}
  />
))}
```

## Usage Instructions

1. **Replace the background section** in your current `AegisPage` component with the enhanced background system
2. **Replace the content layout** with the new grid-based structure  
3. **Add the `AegisCore` component** as a new component in your file
4. **Update the particle system** with the enhanced version
5. **Keep your existing text animations** - they work well with this enhanced layout

The result will be a much more visually sophisticated AEGIS page with:
- Professional grid system with perspective
- Dynamic AEGIS core visualization with orbiting product nodes
- Better typography hierarchy and spacing
- Enhanced particle effects and data streams
- Glassmorphism feature cards
- More engaging background effects

This maintains your atomic approach while significantly upgrading the visual impact and modern feel of the first scene.