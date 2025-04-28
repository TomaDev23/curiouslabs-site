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
      {/* Enhanced gradient overlay with purple tint for better blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-curious-dark-900/10 to-transparent opacity-80"></div>
      
      {/* Subtle purple glow in the middle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[100px] bg-gradient-to-r from-transparent via-curious-purple-700/5 to-transparent rounded-full blur-[60px]"></div>
      
      {/* Very subtle circuit pattern */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-0 mix-blend-luminosity"></div>
      
      <div className="max-w-7xl mx-auto px-4 mb-0">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-4 opacity-70">
          Trusted by innovative teams
        </p>
      </div>
      
      {/* Container with overflow hidden and side fades */}
      <div className="relative overflow-hidden w-full">
        {/* Left fade for smooth edge transition */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-transparent to-transparent z-10"></div>
        
        {/* Right fade for smooth edge transition */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent via-transparent to-transparent z-10"></div>
        
        {/* The scrolling container */}
        <div className="animate-scroll flex items-center whitespace-nowrap py-2">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div key={index} className="mx-8 flex-shrink-0">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-10 md:h-12 opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless looping */}
          {logos.map((logo, index) => (
            <div key={`dup-${index}`} className="mx-8 flex-shrink-0">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-10 md:h-12 opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom fade for better fit with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-transparent to-transparent"></div>
    </section>
  );
}
