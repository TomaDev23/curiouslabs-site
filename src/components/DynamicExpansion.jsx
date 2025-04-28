import React, { useEffect, useState } from "react";

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

export default function DynamicExpansion({ scrollProgress = 0 }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initialize on component mount
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Adjust scroll triggers based on mobile/desktop
  const getScrollTrigger = (baseValue) => {
    return isMobile ? Math.max(0.01, baseValue - 0.02) : baseValue;
  };
  
  // Calculate animation progress for different elements based on scroll position
  const calculateOpacity = (threshold) => {
    return scrollProgress > threshold ? Math.min(1, (scrollProgress - threshold) * 6) : 0;
  };
  
  // Calculate transform for titles based on scroll position
  const calculateTransform = (threshold) => {
    return scrollProgress > threshold 
      ? `translateY(${Math.max(0, 30 - ((scrollProgress - threshold) * 6) * 30)}px)` 
      : 'translateY(30px)';
  };
  
  // Function to calculate card visibility and position
  const calculateCardStyle = (triggerPoint) => {
    const progress = Math.max(0, Math.min(1, (scrollProgress - triggerPoint) * 10));
    const yOffset = isMobile ? '10px' : '20px';
    
    return {
      opacity: progress,
      transform: `translateY(${progress > 0 ? '0px' : yOffset})`,
      willChange: 'opacity, transform',
      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
    };
  };

  // Card component with optimized styling
  const Card = ({ title, description, scrollTrigger }) => {
    const style = calculateCardStyle(scrollTrigger);
    
    return (
      <div
        className={`card bg-gradient-to-br from-dark-700 to-dark-900 
          ${isMobile ? 'p-4' : 'p-5'} 
          border border-curious-purple-900/30 rounded-lg`}
        style={style}
      >
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    );
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
      
      {/* We Fix Broken Code Section */}
      <div className="relative z-10 max-w-4xl mx-auto pt-8 pb-12 text-center">
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
          style={{ 
            opacity: calculateOpacity(0.05),
            transform: calculateTransform(0.05),
            willChange: 'opacity, transform'
          }}
        >
          We Fix Broken Code
        </h2>
        <p 
          className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto"
          style={{ 
            opacity: calculateOpacity(0.08),
            transform: calculateTransform(0.08),
            willChange: 'opacity, transform'
          }}
        >
          Fast. Documented. Traceable.
        </p>
      </div>
      
      {/* Cards Cluster - Updated to appear after 80-90% Hero scroll */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-4 md:gap-6 pt-4">
        {/* Row 1: Two cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card
            title="Code Analysis"
            description="Deep analysis of your codebase to identify patterns and opportunities."
            scrollTrigger={getScrollTrigger(0.08)}
          />
          <Card
            title="Pattern Recognition"
            description="Advanced algorithms to detect and categorize code patterns."
            scrollTrigger={getScrollTrigger(0.08)}
          />
        </div>
        
        {/* Row 2: One centered card */}
        <div className="flex justify-center mb-8">
          <Card
            title="Intelligent Transformation"
            description="Automated refactoring with human-like understanding."
            scrollTrigger={getScrollTrigger(0.12)}
          />
        </div>
        
        {/* Row 3: Two cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card
            title="Quality Assurance"
            description="Comprehensive testing and validation of transformed code."
            scrollTrigger={getScrollTrigger(0.16)}
          />
          <Card
            title="Performance Optimization"
            description="Enhanced code efficiency and maintainability."
            scrollTrigger={getScrollTrigger(0.16)}
          />
        </div>
        
        {/* Row 4: One centered card */}
        <div className="flex justify-center">
          <Card
            title="Continuous Improvement"
            description="Ongoing monitoring and optimization of your codebase."
            scrollTrigger={getScrollTrigger(0.20)}
          />
        </div>
      </div>
      
      {/* Title Section - From Chaos to Clarity */}
      <div className="relative z-10 max-w-4xl mx-auto pt-16 pb-10 text-center">
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
          style={{ 
            opacity: calculateOpacity(0.60),
            transform: calculateTransform(0.60),
            willChange: 'opacity, transform'
          }}
        >
          From Chaos to Clarity
        </h2>
        <p 
          className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto"
          style={{ 
            opacity: calculateOpacity(0.64),
            transform: calculateTransform(0.64),
            willChange: 'opacity, transform'
          }}
        >
          Seamless AI-powered workflows, fully traceable, LEGIT certified.
        </p>
      </div>
    </section>
  );
} 