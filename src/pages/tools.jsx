import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer_legacy';
import ScrollToTop from '../components/ScrollToTop';

export default function Tools() {
  const tools = [
    {
      name: "SweepHammer",
      description: "Command-line utility for batch processing and automation tasks.",
      icon: "🔨",
      isAvailable: true,
      downloadLink: "#" // Placeholder
    },
    // Future tools will be added here
    {
      name: "Coming Soon",
      description: "New developer tools are in development.",
      icon: "⏳",
      isAvailable: false
    },
    {
      name: "Coming Soon",
      description: "New developer tools are in development.",
      icon: "⏳",
      isAvailable: false
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F172A] text-white">
      <Helmet>
        <title>Developer Tools | CuriousLabs</title>
        <meta name="description" content="Download CLI tools and utilities from CuriousLabs to enhance your development workflow." />
        <meta property="og:title" content="Developer Tools | CuriousLabs" />
        <meta property="og:description" content="Download CLI tools and utilities from CuriousLabs to enhance your development workflow." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/tools" />
      </Helmet>
      
      <NavBar />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl flex-grow">
        {/* Header Section */}
        <section className="mb-20 mt-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Developer Tools</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            CLI tools and utilities from CuriousLabs to enhance your development workflow.
          </p>
        </section>
        
        {/* Tools Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}

// Tool Card Component
function ToolCard({ tool }) {
  return (
    <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/30 transition-colors duration-300 flex flex-col h-full">
      <div className="mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-2xl mb-3">
          {tool.icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{tool.name}</h3>
        <p className="text-gray-400 mb-6 flex-grow">{tool.description}</p>
      </div>
      
      {tool.isAvailable ? (
        <div className="mt-auto">
          <a 
            href={tool.downloadLink} 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
          >
            Download
          </a>
        </div>
      ) : (
        <div className="mt-auto">
          <span className="inline-block bg-gray-800 text-gray-400 font-medium py-2 px-4 rounded-md cursor-not-allowed">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );
} 