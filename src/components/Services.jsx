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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="p-8 shadow-md rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              {service.bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <a href={service.link}>
              <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
                Learn More
              </button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
