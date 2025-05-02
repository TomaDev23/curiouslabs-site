const testimonials = [
  {
    quote: "Sometimes we get yelled at... but mostly we deliver miracles under pressure.",
    name: "Cursor",
    company: "",
  },
  {
    quote: "He rewrote our whole architecture... and gave us personalities.",
    name: "Claude & CGPT",
    company: "",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 bg-gradient-to-br from-curious-dark-900 via-curious-purple-900/20 to-curious-dark-900 overflow-hidden">
      {/* Circuit pattern background - subtle */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-0 mix-blend-luminosity"></div>
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise-texture opacity-0 mix-blend-overlay"></div>
      
      {/* Glowing accent */}
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-transparent via-curious-purple-600/20 to-transparent rounded-full blur-[100px] opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center">
          <span className="text-white">Mission </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">Feedback</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              {/* Card background with subtle animation on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-curious-dark-800/90 to-curious-dark-900/90 backdrop-blur-sm rounded-lg transition-transform duration-700 group-hover:scale-[1.02] will-change-transform"></div>
              
              {/* Card border glow effect */}
              <div className="absolute inset-0 rounded-lg border border-curious-purple-800/30 group-hover:border-curious-purple-700/40 transition-colors duration-300"></div>
              
              {/* Top glowing border */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-curious-purple-500/70 to-transparent"></div>
              
              {/* Content container */}
              <div className="relative p-10 rounded-lg">
                {/* Quote mark */}
                <div className="text-6xl absolute -top-3 left-8 text-curious-purple-700/30 group-hover:text-curious-purple-600/40 transition-colors duration-300">"</div>
                
                {/* Testimonial content */}
                <p className="text-gray-300 text-lg relative mb-10 italic leading-relaxed">"{testimonial.quote}"</p>
                
                {/* Author info with subtle animation */}
                <div className="flex items-center">
                  <div className="relative">
                    {/* Avatar circle with gradient border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-curious-purple-500/80 to-curious-purple-800/80 blur-[1px] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Avatar content */}
                    <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-curious-purple-600 to-curious-purple-800 flex items-center justify-center text-white font-bold text-lg mr-5 border border-curious-purple-500/50 shadow-lg shadow-curious-purple-900/30">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-white text-md">{testimonial.name}</div>
                    {testimonial.company && <div className="text-xs text-curious-purple-400">{testimonial.company}</div>}
                  </div>
                  
                  {/* Subtle corner decoration */}
                  <div className="absolute bottom-6 right-8 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 5.2V3H3.2V19.8H5.4C5.4 20.4 5.8 21 6.6 21C7.2 21 7.8 20.6 7.8 19.8H20V5.2Z" stroke="url(#grad)" strokeWidth="1" />
                      <defs>
                        <linearGradient id="grad" x1="3" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#9333EA" />
                          <stop offset="100%" stopColor="#4F46E5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Caption about real testimonials */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Real testimonials from human clients coming soon. For now, just ask our agents.
        </p>
        
        {/* Bottom accent */}
        <div className="max-w-xs mx-auto mt-16 h-[1px] bg-gradient-to-r from-transparent via-curious-purple-700/30 to-transparent"></div>
      </div>
      
      {/* Trusted by companies section */}
      <div className="relative z-10 max-w-5xl mx-auto mt-24 px-4">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-10">Trusted by innovative teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          <div className="h-8 w-24 bg-white/10 rounded"></div>
          <div className="h-8 w-32 bg-white/10 rounded"></div>
          <div className="h-8 w-28 bg-white/10 rounded"></div>
          <div className="h-8 w-36 bg-white/10 rounded"></div>
          <div className="h-8 w-24 bg-white/10 rounded"></div>
        </div>
      </div>
    </section>
  );
}
