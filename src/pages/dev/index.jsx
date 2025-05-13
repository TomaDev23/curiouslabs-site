import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// Metadata for the component
const metadata = {
  id: 'dev_index_page',
  scs: 'SCS-DEV-INDEX',
  type: 'dev',
  doc: 'dev_testing.md'
};

// List of dev routes
const devRoutes = [
  {
    name: 'Parallax Test',
    path: '/dev/parallax-test',
    description: 'Test implementation of scroll-based parallax effect for the Cosmic Flight scene'
  },
  {
    name: 'Mouse Parallax Test',
    path: '/dev/mouse-parallax-test',
    description: 'Test implementation of mouse-based parallax effect for the Dormant scene'
  },
  {
    name: 'Combined Parallax Test',
    path: '/dev/combined-parallax-test',
    description: 'Test implementation of combined scroll and mouse parallax effects'
  }
];

export default function DevIndexPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Dev Routes</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Dev Routes</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {devRoutes.map((route) => (
            <Link 
              key={route.path} 
              to={route.path}
              className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{route.name}</h2>
                <p className="text-gray-300">{route.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 