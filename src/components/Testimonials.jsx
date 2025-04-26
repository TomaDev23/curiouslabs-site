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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
            <div className="text-sm font-bold text-purple-700">{testimonial.name}</div>
            <div className="text-xs text-gray-500">{testimonial.company}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
