import { Link } from 'react-router-dom';

export default function HeroMain() {
  return (
    <section className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#1a1a2e] via-[#28293d] to-[#1a1a2e] overflow-hidden">
      {/* Left Side - Text */}
      <div className="w-full md:w-1/2 text-center md:text-left z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">CuriousLabs</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Building intelligent solutions for tomorrow's challenges — where code meets imagination.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <Link to="/products" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-md transition-all duration-300">
            Explore Our Solutions
          </Link>
          <Link to="/contact" className="border border-purple-500 text-white hover:bg-purple-500/20 font-medium py-3 px-6 rounded-md transition-all duration-300">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative">
        <div className="relative w-80 h-80 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute w-60 h-60 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-5xl">🔬</span>
        </div>
      </div>

      {/* Background Floating Code Effects (Optional) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-700 to-transparent opacity-10 blur-2xl animate-spin-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-blue-700 to-transparent opacity-10 blur-2xl animate-spin-slower" />
      </div>
    </section>
  );
} 