const metrics = [
  { label: "AI Tiles Shipped", value: "22+" },
  { label: "Test Pass Rate", value: "100%" },
  { label: "CLI Logs Delivered", value: "100%" },
  { label: "Documented Fixes", value: "Every Mission" },
];

export default function Metrics() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-purple-100 p-6 rounded-lg">
            <div className="text-3xl font-bold text-purple-700">{metric.value}</div>
            <div className="text-gray-600 mt-2 text-sm">{metric.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
