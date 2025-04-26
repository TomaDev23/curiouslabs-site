export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-curious-dark-900 via-curious-purple-900 to-curious-dark-800 py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">
            Fix your broken code.
          </span>
          <span className="block mt-2">Fast. Documented. Traceable.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Elite AI CodeOps missions for founders and dev teams — powered by CuriousLabs.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="#contact">
            <button className="bg-gradient-to-r from-curious-purple-600 to-curious-purple-500 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg hover:shadow-curious-purple-700/30 transform transition-all hover:-translate-y-1 hover:scale-105">
              Send First Mission
            </button>
          </a>
          <a href="#case-studies">
            <button className="border-2 border-curious-purple-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-curious-purple-900/30 transform transition-all hover:-translate-y-1 hover:scale-105">
              View Case Studies
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
