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
    <section id="case-studies" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {caseStudies.map((study, index) => (
          <div key={index} className="border rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-2">{study.title}</h3>
            <p className="text-gray-600 text-sm mb-2"><strong>Problem:</strong> {study.problem}</p>
            <p className="text-gray-600 text-sm mb-4"><strong>Solution:</strong> {study.solution}</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              View Case
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
