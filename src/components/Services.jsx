const services = [
  {
    title: "Code Rescue",
    bullets: [
      "Fix failing tests",
      "Bug patches",
      "Traceable logs",
      "Documented fixes",
    ],
    link: "#case-studies",
  },
  {
    title: "Security Fix",
    bullets: [
      "Secure configs",
      "Token validation",
      "Auth patching",
      "LEGIT compliance",
    ],
    link: "#case-studies",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative pt-8 pb-20 bg-curious-dark-800 overflow-hidden">
      {/* Circuit pattern background - subtle */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-0 mix-blend-luminosity"></div>
      
      {/* Subtle accent glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-r from-transparent via-curious-purple-600/20 to-transparent rounded-full blur-[100px] opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">
            Elite AI
          </span>{" "}
          <span className="text-white">Code Operations</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden group"
            >
              {/* Card background with subtle animation on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-curious-dark-700 to-curious-dark-900 rounded-lg transition-transform duration-700 group-hover:scale-[1.02] will-change-transform"></div>
              
              {/* Card border glow effect */}
              <div className="absolute inset-0 rounded-lg border border-curious-purple-900/30 group-hover:border-curious-purple-700/40 transition-colors duration-300"></div>
              
              {/* Top edge glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-curious-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content container */}
              <div className="relative p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-curious-purple-400 to-curious-blue-400 rounded-full mr-4 group-hover:h-10 transition-all duration-300"></div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-300 to-curious-blue-300">{service.title}</h3>
                </div>
                
                <ul className="space-y-3 text-gray-300 mb-8 pl-2">
                  {service.bullets.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-3 text-curious-purple-500 text-lg leading-tight">•</span>
                      <span className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <a href={service.link} className="block w-full">
                  <button className="relative w-full overflow-hidden group/btn bg-gradient-to-r from-curious-purple-600 to-curious-blue-600 text-white px-6 py-3 rounded-md hover:shadow-lg hover:shadow-curious-purple-700/20 transition-all duration-300">
                    {/* Button glow overlay */}
                    <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"></div>
                    
                    {/* Button text with hover effect */}
                    <div className="relative z-10 group-hover/btn:-translate-y-1 transform transition-transform duration-300 font-medium">
                      Learn More
                    </div>
                    
                    {/* Button bottom glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
