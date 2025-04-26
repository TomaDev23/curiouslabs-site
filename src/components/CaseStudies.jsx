const caseStudies = [
  {
    title: "CLI Parser Repair",
    problem: "Broken OCR pipelines with async edge cases.",
    solution: "Dynamic agent fallback tree rebuilt with 100% test pass.",
  },
  {
    title: "Security Config Recovery",
    problem: "Leaking token through public headers.",
    solution: "Token rotation and HMAC guards implemented.",
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-16 bg-gradient-to-b from-curious-dark-800 to-curious-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Mission <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-blue-400 to-curious-purple-400">Logs</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Real-world code operations performed by our elite AI tactical teams.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-curious-dark-700 to-curious-dark-800 border border-curious-blue-900/30 rounded-lg overflow-hidden shadow-md group hover:shadow-lg hover:shadow-curious-blue-700/10 transition-all duration-300"
            >
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center mb-4">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-curious-blue-500 to-curious-blue-600 mr-3 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">{study.title}</h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="text-curious-blue-400 text-xs font-medium uppercase tracking-wider mb-1">Problem:</div>
                    <p className="text-gray-300 text-sm">{study.problem}</p>
                  </div>
                  
                  <div>
                    <div className="text-curious-blue-400 text-xs font-medium uppercase tracking-wider mb-1">Solution:</div>
                    <p className="text-gray-300 text-sm">{study.solution}</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-3 bg-curious-dark-900/50 border-t border-curious-blue-900/10">
                <button className="w-full bg-gradient-to-r from-curious-blue-600 to-curious-blue-700 text-white px-4 py-2 rounded group-hover:shadow-md group-hover:shadow-curious-blue-800/20 transition-all text-sm font-medium">
                  View Full Case
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
