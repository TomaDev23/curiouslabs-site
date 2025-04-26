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
    <section className="py-24 bg-curious-dark-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">
            Elite AI
          </span>{" "}
          Code Operations
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 bg-gradient-to-br from-curious-dark-700 to-curious-dark-900 rounded-lg shadow-lg border border-curious-purple-900/30 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-curious-purple-700/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-curious-purple-400">{service.title}</h3>
              <ul className="space-y-3 text-gray-300 mb-8">
                {service.bullets.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2 text-curious-purple-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={service.link}>
                <button className="w-full bg-gradient-to-r from-curious-purple-600 to-curious-blue-600 text-white px-6 py-3 rounded hover:shadow-lg hover:shadow-curious-purple-700/30 transition-all">
                  Learn More
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
