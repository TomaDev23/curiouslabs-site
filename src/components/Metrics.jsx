import { metrics } from "../data/metrics";

export default function Metrics() {
  return (
    <section id="metrics" className="relative py-24 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900 overflow-hidden">
      {/* Circuit pattern background - subtle */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-0 mix-blend-luminosity"></div>
      
      {/* Subtle gradient accents */}
      <div className="absolute -left-40 top-1/4 w-[400px] h-[400px] bg-gradient-to-br from-curious-purple-800/20 to-transparent rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute -right-40 bottom-1/4 w-[400px] h-[400px] bg-gradient-to-br from-curious-blue-800/20 to-transparent rounded-full blur-[120px] opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          <span className="text-white">Mission </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">Metrics</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              {/* Card background with subtle animation on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-curious-dark-700 to-curious-dark-800 rounded-lg transition-transform duration-700 group-hover:scale-[1.02] will-change-transform"></div>
              
              {/* Card border glow effect */}
              <div className="absolute inset-0 rounded-lg border border-curious-purple-900/30 group-hover:border-curious-purple-700/50 transition-colors duration-300"></div>
              
              {/* Top accent glow */}
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-curious-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content container */}
              <div className="relative p-6 rounded-lg">
                {/* Background highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-curious-purple-600/5 to-curious-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                
                {/* Metric value */}
                <div className="text-3xl md:text-4xl font-bold mb-3 relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-300 to-curious-blue-300 group-hover:from-curious-purple-200 group-hover:to-curious-blue-200 transition-colors duration-300">
                    {metric.value}
                  </span>
                  
                  {/* Subtle glow behind text */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-gradient-to-r from-curious-purple-600/10 to-curious-blue-600/10 filter blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Metric label */}
                <div className="text-gray-400 text-xs font-medium uppercase tracking-wider relative">
                  {metric.label}
                </div>
                
                {/* Invisible spacer for hover target */}
                <div className="h-2"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Subtle bottom accent line */}
        <div className="max-w-xs mx-auto mt-16 h-[1px] bg-gradient-to-r from-transparent via-curious-purple-700/30 to-transparent"></div>
      </div>
    </section>
  );
}
