import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import OurProducts from '../components/home/v6/OurProducts';

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="py-6 px-4 flex justify-between items-center border-b border-white/10">
        <Link to="/" className="text-2xl font-bold">CuriousLabs</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link to="/our-products" className="hover:text-blue-400 transition-colors">Products</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
          <div className="text-center max-w-3xl">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Building the Future of AI
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Creating intelligent systems that transform how we work, learn, and connect.
            </motion.p>
            <motion.button 
              className="px-8 py-3 bg-blue-600 rounded-full text-white font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              Explore Our Work
            </motion.button>
          </div>
        </section>
        
        {/* Products Section - Using the new OurProducts component */}
        <OurProducts className="py-20" />
        
        {/* About Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Human-Centered</h3>
                <p className="text-gray-300">We design AI that works in harmony with human needs, values, and preferences.</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Cutting-Edge</h3>
                <p className="text-gray-300">Our systems leverage the latest advances in machine learning and cognitive science.</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Ethical Focus</h3>
                <p className="text-gray-300">We prioritize transparency, fairness, and user control in all our AI solutions.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-10 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-bold mb-4">CuriousLabs</div>
            <p className="text-gray-400 max-w-md">Building intelligent systems that extend human capability through thoughtful design and advanced AI.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>News</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>OpsPipe</li>
                <li>Guardian</li>
                <li>MoonSignal</li>
                <li>Curious</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Contact</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-gray-500">
          &copy; 2023 CuriousLabs. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout; 