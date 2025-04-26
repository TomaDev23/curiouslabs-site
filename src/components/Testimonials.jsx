const testimonials = [
  {
    quote: "CuriousLabs saved us weeks of debugging — a real tactical advantage.",
    name: "Alex R.",
    company: "Indie SaaS Founder",
  },
  {
    quote: "The trace logs alone are worth it. Complete operational clarity.",
    name: "Maya T.",
    company: "Startup CTO",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-curious-dark-900 via-curious-purple-900/50 to-curious-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
          Mission <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">Feedback</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-curious-dark-800/90 to-curious-dark-900/90 backdrop-blur-sm p-8 md:p-10 rounded-lg border border-curious-purple-800/30 shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-curious-purple-500 to-curious-purple-700"></div>
              <div className="text-5xl absolute -top-2 left-6 text-curious-purple-700/30">"</div>
              
              <p className="text-gray-300 text-lg relative mb-8 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-curious-purple-600 to-curious-purple-800 flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-xs text-curious-purple-400">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
