export default function LogoStrip() {
  const logos = [
    { src: "/images/logos/logo1.svg", alt: "Acme Corp" },
    { src: "/images/logos/logo2.svg", alt: "TechFirm" },
    { src: "/images/logos/logo3.svg", alt: "DevCo" },
    { src: "/images/logos/logo4.svg", alt: "AILabs" },
    { src: "/images/logos/logo5.svg", alt: "CircuitSoft" },
    { src: "/images/logos/logo6.svg", alt: "DataViz" },
  ];

  return (
    <section className="relative py-8 overflow-hidden bg-transparent">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-curious-dark-900/10 to-transparent"></div>
      
      {/* Subtle circuit pattern at low opacity */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.02] mix-blend-luminosity"></div>
      
      <div className="max-w-7xl mx-auto px-4 mb-1">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-6">
          Trusted by innovative teams
        </p>
      </div>
      
      {/* Container with overflow hidden */}
      <div className="relative overflow-hidden w-full">
        {/* The scrolling container - wider and with proper spacing */}
        <div className="animate-scroll flex items-center whitespace-nowrap">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div key={index} className="mx-8 flex-shrink-0 group">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-10 md:h-12 opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless looping */}
          {logos.map((logo, index) => (
            <div key={`dup-${index}`} className="mx-8 flex-shrink-0 group">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-10 md:h-12 opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          ))}
          
          {/* Third set to ensure no jumps during animation */}
          {logos.map((logo, index) => (
            <div key={`tri-${index}`} className="mx-8 flex-shrink-0 group">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-10 md:h-12 opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
