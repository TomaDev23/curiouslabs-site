export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-curious-dark-900/90 via-curious-dark-800/80 to-curious-dark-900/90 py-32 overflow-hidden">
      {/* Circuit pattern background - subtle */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.05] mix-blend-luminosity"></div>
      
      {/* Glowing centerpiece orb - reduced intensity by only 10% */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-transparent via-curious-purple-600/27 to-transparent rounded-full blur-[80px] opacity-65 animate-pulse-subtle"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[120px] bg-gradient-to-r from-transparent via-white/9 to-transparent rounded-full blur-[40px] opacity-55"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[8px] bg-gradient-to-r from-transparent via-curious-purple-400/70 to-transparent rounded-full blur-[2px] opacity-75"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 px-4">
          <span className="inline-block pb-4 bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-200 via-white to-curious-blue-200">
            Fix your broken code.
          </span>
          <span className="block mt-6 text-white">Fast. Documented. Traceable.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Elite AI CodeOps missions for founders and dev teams — powered by CuriousLabs.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="#contact">
            <button className="relative group bg-gradient-to-r from-curious-purple-600 to-curious-purple-500 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 overflow-hidden">
              {/* Button glow overlay */}
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              {/* Button hover effect */}
              <div className="relative z-10 group-hover:-translate-y-1 transform transition-transform duration-300">
                Send First Mission
              </div>
              
              {/* Button bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </a>
          <a href="#case-studies">
            <button className="relative group border-2 border-curious-purple-500 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 overflow-hidden">
              {/* Button hover backdrop */}
              <div className="absolute inset-0 w-full h-full bg-curious-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button hover effect */}
              <div className="relative z-10 group-hover:-translate-y-1 transform transition-transform duration-300">
                View Case Studies
              </div>
              
              {/* Button bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-curious-purple-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
