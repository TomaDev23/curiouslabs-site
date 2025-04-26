export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-gray-100 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          Fix your broken code. Fast. Documented. Traceable.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Elite AI CodeOps missions for founders and dev teams — powered by CuriousLabs.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="#contact">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700">
              Send First Mission
            </button>
          </a>
          <a href="#case-studies">
            <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-100">
              View Case Studies
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
