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

// Card component for cleaner code organization
const Card = ({ title, description, scrollProgress, scrollTrigger, position }) => {
  // Refined animation calculation with smoother transitions
  // Increase the threshold to ensure they appear exactly when needed
  const opacity = scrollProgress > scrollTrigger ? Math.min(1, (scrollProgress - scrollTrigger) * 15) : 0;
  const yOffset = scrollProgress > scrollTrigger ? Math.max(0, 18 - ((scrollProgress - scrollTrigger) * 15) * 18) : 18;
  
  // Determine dot positions based on card position
  let dotPositions = {
    topLeft: position === 'left' || position === 'center',
    topRight: position === 'right' || position === 'center',
    bottomLeft: position === 'left',
    bottomRight: position === 'right' || position === 'center'
  };
  
  return (
    <div 
      className={`relative bg-white/5 p-4 rounded-lg backdrop-blur-sm ${
        position === 'center' ? 'w-72 md:w-80' : 'w-full md:w-72'
      }`}
      style={{ 
        opacity, 
        transform: `translateY(${yOffset}px)`,
        willChange: 'opacity, transform'
      }}
    >
      {/* Decorative dots */}
      {dotPositions.topLeft && (
        <div className="absolute top-2 left-2 w-[4px] h-[4px] bg-white rounded-full blur-[1px] opacity-50"></div>
      )}
      {dotPositions.topRight && (
        <div className="absolute top-2 right-2 w-[4px] h-[4px] bg-white rounded-full blur-[1px] opacity-50"></div>
      )}
      {dotPositions.bottomLeft && (
        <div className="absolute bottom-2 left-2 w-[4px] h-[4px] bg-white rounded-full blur-[1px] opacity-45"></div>
      )}
      {dotPositions.bottomRight && (
        <div className="absolute bottom-2 right-2 w-[4px] h-[4px] bg-white rounded-full blur-[1px] opacity-40"></div>
      )}
      
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  );
};

export default function DynamicExpansion({ scrollProgress = 0 }) {
  // Calculate animation progress for different elements based on scroll position
  // Refined for smoother animations and proper timing
  const calculateOpacity = (threshold) => {
    return scrollProgress > threshold ? Math.min(1, (scrollProgress - threshold) * 6) : 0;
  };
  
  // Calculate transform for titles based on scroll position
  const calculateTransform = (threshold) => {
    return scrollProgress > threshold 
      ? `translateY(${Math.max(0, 30 - ((scrollProgress - threshold) * 6) * 30)}px)` 
      : 'translateY(30px)';
  };
  
  return (
    <section className="relative min-h-[130vh] flex flex-col items-center justify-start text-white px-6 overflow-hidden">
      {/* Simple background elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-0 mix-blend-luminosity"></div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-curious-purple-900/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Cards Cluster - Appears FIRST */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-4 md:gap-6 pt-4">
        {/* Row 1: Two cards side by side */}
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4">
          <Card 
            title="Rescue Systems" 
            description="Recover broken pipelines and workflows instantly." 
            scrollProgress={scrollProgress}
            scrollTrigger={0.01}  /* Start appearing after small amount of scroll */
            position="left"
          />
          <Card 
            title="Security Hardening" 
            description="Lock down critical ops and validate configs." 
            scrollProgress={scrollProgress}
            scrollTrigger={0.01}  /* Start appearing after small amount of scroll */
            position="right"
          />
        </div>
        
        {/* Row 2: One centered card */}
        <div className="flex justify-center">
          <Card 
            title="Automation Boost" 
            description="Accelerate pipelines, testing, and deployment flows." 
            scrollProgress={scrollProgress}
            scrollTrigger={0.03}  /* Slightly delayed appearance */
            position="center"
          />
        </div>
        
        {/* Row 3: Two cards side by side */}
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4">
          <Card 
            title="Documentation Engine" 
            description="Auto-generate real traceable logs with precision." 
            scrollProgress={scrollProgress}
            scrollTrigger={0.05}  /* Further delayed appearance */
            position="left"
          />
          <Card 
            title="Recovery Systems" 
            description="Instantly fallback and recover from critical errors." 
            scrollProgress={scrollProgress}
            scrollTrigger={0.05}  /* Further delayed appearance */
            position="right"
          />
        </div>
        
        {/* Row 4: One centered card */}
        <div className="flex justify-center">
          <Card 
            title="LEGIT Compliance" 
            description="Align code to contract-level legal and audit standards." 
            scrollProgress={scrollProgress}
            scrollTrigger={0.07}  /* Last to appear */
            position="center"
          />
        </div>
      </div>
      
      {/* Elite AI Code Operations Title */}
      <div className="relative z-10 max-w-4xl mx-auto pt-16 pb-8 text-center">
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
          style={{ 
            opacity: calculateOpacity(0.20),
            transform: calculateTransform(0.20),
            willChange: 'opacity, transform'
          }}
        >
          Elite AI Code Operations
        </h2>
      </div>
      
      {/* Title Section 1 - Appears AFTER cards */}
      <div className="relative z-10 max-w-4xl mx-auto pb-10 text-center">
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
          style={{ 
            opacity: calculateOpacity(0.30),
            transform: calculateTransform(0.30),
            willChange: 'opacity, transform'
          }}
        >
          CodeOps Redefined.
        </h2>
        
        <p 
          className="max-w-3xl mx-auto text-lg md:text-xl text-white/90"
          style={{ 
            opacity: calculateOpacity(0.35),
            transform: calculateTransform(0.35),
            willChange: 'opacity, transform'
          }}
        >
          Turning chaos into structured intelligence.
        </p>
      </div>
      
      {/* Visual separator - subtle line */}
      <div 
        className="w-24 h-[1px] bg-gradient-to-r from-transparent via-curious-purple-500/50 to-transparent mb-10"
        style={{ 
          opacity: calculateOpacity(0.40),
          transform: `scaleX(${scrollProgress > 0.40 ? Math.min(1, Math.max(0.3, (scrollProgress - 0.40) * 5)) : 0.3})`,
          willChange: 'opacity, transform'
        }}
      ></div>
      
      {/* Title Section 2 - Appears LAST */}
      <div className="relative z-10 max-w-4xl mx-auto pb-32 text-center">
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
          style={{ 
            opacity: calculateOpacity(0.50),
            transform: calculateTransform(0.50),
            willChange: 'opacity, transform'
          }}
        >
          From Chaos to Clarity.
        </h2>
        
        <p 
          className="max-w-3xl mx-auto text-lg md:text-xl text-white/90"
          style={{ 
            opacity: calculateOpacity(0.55),
            transform: calculateTransform(0.55),
            willChange: 'opacity, transform'
          }}
        >
          Seamless AI-powered workflows, fully traceable, LEGIT certified.
        </p>
      </div>
      
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-transparent z-10"></div>
    </section>
  );
} 