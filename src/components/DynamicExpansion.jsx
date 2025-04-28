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

export default function DynamicExpansion({ scrollProgress }) {
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
    // Ensure smoother fade-in with a lower multiplier for more gradual appearance
    return scrollProgress > threshold ? Math.min(1, (scrollProgress - threshold) * 2) : 0;
  };
  
  // Calculate transform for titles based on scroll position
  const calculateTransform = (threshold) => {
    // Smoother translation with less dramatic movement
    return scrollProgress > threshold 
      ? `translateY(${Math.max(0, 15 - ((scrollProgress - threshold) * 2) * 15)}px)` 
      : 'translateY(15px)';
  };
  
  // Function to calculate card visibility and position
  const calculateCardStyle = (scrollTrigger, animationMultiplier = 10) => {
    // Determine when card should start appearing - use lower values
    const startPoint = scrollTrigger * 0.5; // Lower the trigger thresholds by half
    
    // Ensure cards stay visible once they appear
    const hasAppeared = scrollProgress > startPoint;
    
    // Calculate card opacity based on scroll progress
    const opacity = hasAppeared 
      ? Math.min(1, (scrollProgress - startPoint) * animationMultiplier) 
      : 0;
    
    // Calculate vertical offset - moving up as scroll increases
    const translateY = hasAppeared 
      ? Math.max(0, 40 - ((scrollProgress - startPoint) * animationMultiplier * 100)) 
      : 40;
    
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.5s ease-out, transform 0.6s ease-out',
      willChange: 'opacity, transform'
    };
  };

  // Card component with optimized styling
  const Card = ({ children, scrollTrigger, columnSpan = 1 }) => {
    const style = calculateCardStyle(scrollTrigger);
    
    return (
      <div 
        className={`bg-[#312D4B] border border-[#473F7B]/60 rounded-xl shadow-xl overflow-hidden 
                   backdrop-blur-sm col-span-1 md:col-span-${columnSpan}
                   transition-all duration-500 ease-out`}
        style={style}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  };
  
  // Calculate title opacity and transform with persistence
  const calculateTitleStyle = (threshold) => {
    // Use lower threshold values for earlier appearance
    const adjustedThreshold = threshold * 0.5;
    
    const hasAppeared = scrollProgress > adjustedThreshold;
    const opacity = hasAppeared ? Math.min(1, (scrollProgress - adjustedThreshold) * 8) : 0;
    const transformY = hasAppeared 
      ? Math.max(0, 30 - ((scrollProgress - adjustedThreshold) * 15 * 10)) 
      : 30;
    
    return {
      opacity,
      transform: `translateY(${transformY}px)`,
      transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      willChange: 'opacity, transform'
    };
  };

  // Use title style calculations with earlier thresholds
  const title1Style = calculateTitleStyle(0.2);
  const title2Style = calculateTitleStyle(0.3);

  return (
    <section className="pt-32 pb-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* We Fix Broken Code Section with delayed appearance */}
        <div className="text-center mb-32">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
            style={{ 
              opacity: calculateOpacity(0.2),
              transform: calculateTransform(0.2),
              willChange: 'opacity, transform',
              transition: 'opacity 1s ease-out, transform 1s ease-out'
            }}
          >
            We Fix Broken Code
          </h2>
          <p 
            className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto"
            style={{ 
              opacity: calculateOpacity(0.25),
              transform: calculateTransform(0.25),
              willChange: 'opacity, transform',
              transition: 'opacity 1s ease-out, transform 1s ease-out'
            }}
          >
            Fast. Documented. Traceable.
          </p>
        </div>

        {/* First row - Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card scrollTrigger={0.25}>
            <h3 className="text-xl font-semibold text-indigo-300 mb-3">Chaotic Code Debt</h3>
            <p className="text-gray-300">
              Unstructured development leading to technical debt, bugs, and delayed releases. A disorganized approach to software engineering that creates long-term problems.
            </p>
          </Card>
          
          <Card scrollTrigger={0.25}>
            <h3 className="text-xl font-semibold text-indigo-300 mb-3">Error-Prone Processes</h3>
            <p className="text-gray-300">
              Manual deployments and lack of testing lead to frequent production issues and customer complaints. Without automated safeguards, risks multiply.
            </p>
          </Card>
        </div>
        
        {/* Second row - Centered card */}
        <div className="grid grid-cols-1 mb-6">
          <Card scrollTrigger={0.27} columnSpan={2}>
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Transformation Zone</h3>
            <p className="text-gray-300">
              The critical transition phase where teams adopt new practices, tools, and mindsets to bridge the gap between chaos and structure. This is where OpsPipe's guidance becomes most valuable.
            </p>
          </Card>
        </div>
        
        {/* Second Title - To Clarity */}
        <div 
          className="mb-16 mt-20 text-center"
          style={title2Style}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 tracking-tight">
            Engineering Excellence Achieved
          </h2>
          <p className="mt-2 text-xl text-blue-200/80">
            The outcome of systematic transformation
          </p>
        </div>
        
        {/* Third row - Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card scrollTrigger={0.29}>
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Clean Architecture</h3>
            <p className="text-gray-300">
              Well-structured, maintainable code with clear separation of concerns. Every component has a single responsibility, making the system more reliable and easier to extend.
            </p>
          </Card>
          
          <Card scrollTrigger={0.29}>
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Automated Pipelines</h3>
            <p className="text-gray-300">
              Continuous integration and delivery with comprehensive testing and validation gates. This automation ensures consistent quality and dramatically reduces deployment risks.
            </p>
          </Card>
        </div>
        
        {/* Fourth row - Centered card */}
        <div className="grid grid-cols-1">
          <Card scrollTrigger={0.31} columnSpan={2}>
            <h3 className="text-xl font-semibold text-cyan-300 mb-3">Predictable Delivery</h3>
            <p className="text-gray-300">
              Reliable release schedules with minimal disruption and maximum business value. Teams can now confidently commit to deadlines and deliver new features at a sustainable pace.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
} 