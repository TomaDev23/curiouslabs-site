import React from "react";
import Hero from '../components/Hero';
import Services from '../components/Services';
import Metrics from '../components/Metrics';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Metrics />
      <CaseStudies />
      <Testimonials />
    </main>
  );
}
