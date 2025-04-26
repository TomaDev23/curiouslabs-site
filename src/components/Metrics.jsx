const metrics = [
  { label: "AI Tiles Shipped", value: "22+" },
  { label: "Test Pass Rate", value: "100%" },
  { label: "CLI Logs Delivered", value: "100%" },
  { label: "Documented Fixes", value: "Every Mission" },
];

export default function Metrics() {
  return (
    <section className="py-24 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
          Mission <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">Metrics</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="relative bg-gradient-to-br from-curious-dark-700 to-curious-dark-800 p-8 rounded-lg border border-curious-purple-900/50 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-curious-purple-600/20 to-curious-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">
                  {metric.value}
                </span>
              </div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider relative">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
