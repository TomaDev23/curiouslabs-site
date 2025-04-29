import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/NavBar';
import HeroMain from '../components/HeroMain';
import SolutionsPreview from '../components/SolutionsPreview';
import FeedbackBlock from '../components/FeedbackBlock';
import FooterMain from '../components/FooterMain';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  // Ensure page starts at the top when loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E] overflow-hidden">
      <Helmet>
        <title>CuriousLabs Cambodia – Intelligent AI Solutions</title>
        <meta name="description" content="CuriousLabs builds intelligent AI products, automation systems, and creative solutions from Cambodia." />
        <meta property="og:title" content="CuriousLabs Cambodia" />
        <meta property="og:description" content="Elite AI tooling, CodeOps systems, and mission-grade automation." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/" />
      </Helmet>
      
      <NavBar />
      
      <main>
        <HeroMain />
        <SolutionsPreview />
        <FeedbackBlock />
      </main>
      
      <FooterMain />
      <ScrollToTop />
    </div>
  );
}
