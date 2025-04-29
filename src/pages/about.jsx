import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { IMAGES } from '../utils/assets';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E]">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">CuriousLabs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
            Building intelligent solutions for tomorrow's challenges
          </p>
          
          <div className="max-w-3xl mx-auto text-left">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-8">
              At CuriousLabs Cambodia, we're passionate about leveraging AI and machine learning 
              to create innovative solutions that solve real-world problems. Our team of experts 
              is dedicated to pushing the boundaries of what's possible.
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-300 mb-8">
              Founded in 2023, CuriousLabs began with a simple vision: to harness the power of 
              artificial intelligence to create positive change. Today, we're proud to offer a 
              suite of products that help businesses and individuals achieve their goals.
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[
                {
                  title: 'Innovation',
                  description: 'We embrace creativity and continuous improvement in everything we do.'
                },
                {
                  title: 'Excellence',
                  description: 'We strive for the highest quality in our products and services.'
                },
                {
                  title: 'Collaboration',
                  description: 'We believe the best solutions come from diverse teams working together.'
                },
                {
                  title: 'Integrity',
                  description: 'We maintain honesty and transparency in all our operations.'
                }
              ].map((value, index) => (
                <div key={index} className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-6 rounded-xl border border-purple-500/10">
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 