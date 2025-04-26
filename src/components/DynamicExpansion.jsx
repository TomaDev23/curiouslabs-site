import React from "react";

// Define the service blobs data
const serviceBlobs = [
  {
    title: "Code Rescue",
    subtitle: "Repair broken pipelines, unlock frozen builds",
    animationType: "pulse",
    icon: "🛠️",
    color: "purple"
  },
  {
    title: "Security Hardening",
    subtitle: "Lock down your app & tokens",
    animationType: "glow",
    icon: "🔒",
    color: "blue"
  },
  {
    title: "Automation Boost",
    subtitle: "Tests, pipelines, and deployments",
    animationType: "rotate",
    icon: "⚙️",
    color: "purple"
  },
  {
    title: "Documentation Engine",
    subtitle: "Generate real traceable logs",
    animationType: "trail",
    icon: "📝",
    color: "blue"
  },
  {
    title: "Recovery Systems",
    subtitle: "Fallbacks, Guardrails, Failover design",
    animationType: "scale",
    icon: "🔄",
    color: "purple"
  },
  {
    title: "LEGIT Compliance",
    subtitle: "Elite contract-level code practices",
    animationType: "float",
    icon: "✓",
    color: "blue"
  }
];

// ServiceBlob sub-component
function ServiceBlob({ title, subtitle, animationType, delay, scrollProgress, icon, color }) {
  // Calculate offset based on scroll position for parallax effect
  const yOffset = -20 + scrollProgress * 40;
  const rotateOffset = (scrollProgress * 3) - 1.5; // Slight tilt effect
  
  // Determine color gradient based on prop
  const colorGradient = color === 'purple' 
    ? 'from-curious-purple-700/10 via-curious-purple-500/5 to-transparent' 
    : 'from-curious-blue-700/10 via-curious-blue-500/5 to-transparent';
  
  // Determine accent color based on prop
  const accentColor = color === 'purple'
    ? 'from-curious-purple-500 to-curious-purple-700'
    : 'from-curious-blue-500 to-curious-blue-700';
  
  return (
    <div 
      className={`relative group p-6 rounded-lg backdrop-blur-sm border border-curious-purple-900/30 
                bg-gradient-to-br from-deep-black/95 to-curious-dark-900/90
                hover:border-curious-purple-700/40 hover:shadow-lg hover:shadow-curious-purple-900/20
                transition-all duration-300 ${getAnimationClass(animationType)}`}
      style={{ 
        transform: `translateY(${yOffset}px) rotate(${rotateOffset}deg)`, 
        transitionDelay: `${delay}s`,
        willChange: 'transform, opacity, box-shadow'
      }}
    >
      {/* Technical circuit decoration in corner */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-20 bg-circuit-pattern rounded-br-lg"></div>
      
      {/* Icon with glow */}
      <div className="relative mb-4 flex items-start">
        <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br ${accentColor} mr-3 shadow-lg`}>
          <span className="text-white text-lg">{icon}</span>
          {/* Icon glow */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        
        {/* Blob Header with Glow Effect */}
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-white/95 transition-colors">{title}</h3>
          <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${accentColor} transition-all duration-500 mt-1`}></div>
        </div>
      </div>
      
      {/* Blob Content */}
      <p className="text-gray-300/90 text-sm leading-relaxed ml-[52px]">{subtitle}</p>
      
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${colorGradient} 
                    rounded-lg transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>
      
      {/* Bottom Accent Line - Reveals on Hover */}
      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      {/* Animation-specific elements */}
      {animationType === 'trail' && (
        <div className="absolute -right-1 top-1/2 w-10 h-2 bg-gradient-to-r from-curious-purple-500/0 to-curious-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  );
}

// Animation class utility
function getAnimationClass(type) {
  switch(type) {
    case 'pulse': return 'hover:animate-pulse-subtle';
    case 'glow': return 'hover:shadow-curious-purple-500/30 hover:shadow-lg';
    case 'rotate': return 'hover:rotate-1 transition-transform';
    case 'trail': return 'relative overflow-hidden';
    case 'scale': return 'hover:scale-[1.03] transition-transform';
    case 'float': return 'hover:-translate-y-1 transition-transform';
    default: return '';
  }
}

export default function DynamicExpansion({ scrollProgress = 0 }) {
  // Create parallax effect values
  const titleOffset = Math.min(20, scrollProgress * 40);
  const opacityFade = Math.min(1, scrollProgress * 3);
  
  // Calculate highlight beam position
  const beamPosition = 200 + (scrollProgress * 400); // Move from top to bottom as user scrolls
  
  return (
    <section className="relative min-h-[150vh] overflow-hidden bg-deep-black">
      {/* Background Layers (Messy to Clean) */}
      <div className="absolute inset-0 z-0">
        {/* Chaotic Code Layer (top) - more visible when scrollProgress is low */}
        <div 
          className="absolute inset-0 bg-chaotic-code-pattern mix-blend-luminosity"
          style={{ 
            opacity: Math.max(0.02, 0.15 - scrollProgress * 0.15),
            willChange: 'opacity'
          }}
        ></div>
        
        {/* Transition Layer (middle) - most visible when scrollProgress around 0.5 */}
        <div 
          className="absolute inset-0 bg-transition-pattern mix-blend-luminosity"
          style={{ 
            opacity: Math.max(0.02, 0.15 - Math.abs(scrollProgress - 0.5) * 0.2),
            willChange: 'opacity'
          }}
        ></div>
        
        {/* LEGIT Code Layer (bottom) - more visible when scrollProgress is high */}
        <div 
          className="absolute inset-0 bg-legit-code mix-blend-luminosity"
          style={{ 
            opacity: Math.min(0.15, scrollProgress * 0.15),
            willChange: 'opacity'
          }}
        ></div>
        
        {/* Highlight beam that moves down as you scroll */}
        <div 
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-curious-purple-500/50 to-transparent"
          style={{ 
            top: `${beamPosition}px`,
            opacity: Math.min(0.8, scrollProgress * 1.2),
            willChange: 'top, opacity'
          }}
        ></div>
        
        {/* Consistent Purple Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-curious-purple-900/10 via-curious-purple-900/5 to-transparent"></div>
      </div>
      
      {/* Section Header with parallax effect */}
      <div 
        className="relative z-10 pt-24 pb-8 px-4"
        style={{ 
          transform: `translateY(${titleOffset}px)`,
          opacity: 1 - (scrollProgress * 0.3), // Fade out slightly as user scrolls
          willChange: 'transform, opacity'
        }}
      >
        <h2 className="text-center text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">
          Code Operations
        </h2>
        <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">
          From chaos to clarity, our tactical AI teams transform broken code into LEGIT-compliant systems
        </p>
        
        {/* Technical decoration below title */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-curious-purple-500/50 to-curious-blue-500/50 mx-auto mt-6"></div>
        <div className="flex justify-center gap-1 mt-1">
          <div className="w-1 h-1 rounded-full bg-curious-purple-500/70"></div>
          <div className="w-1 h-1 rounded-full bg-curious-blue-500/70"></div>
          <div className="w-1 h-1 rounded-full bg-curious-purple-500/70"></div>
        </div>
      </div>
      
      {/* Service Info Blobs */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 py-16"
        style={{
          opacity: opacityFade,
          transform: `translateY(${Math.min(0, 50 - scrollProgress * 80)}px)`,
          willChange: 'transform, opacity'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceBlobs.map((blob, index) => (
            <ServiceBlob 
              key={index} 
              {...blob} 
              delay={index * 0.1} 
              scrollProgress={scrollProgress} 
            />
          ))}
        </div>
      </div>
      
      {/* Transformation indicator */}
      <div className="relative z-10 max-w-md mx-auto px-4 pb-16 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-curious-purple-500/30"></div>
          <span className="text-sm text-curious-purple-400/70">Transformation Complete</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-curious-purple-500/30 to-transparent"></div>
        </div>
      </div>
      
      {/* Bottom Transition Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-black to-transparent z-10"></div>
    </section>
  );
} 