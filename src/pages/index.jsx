// DO NOT MODIFY THIS FILE WITHOUT COMMANDER APPROVAL — TILE 4.1
import NavBar from '@/components/NavBar';
import HeroMain from '@/components/HeroMain';
import MiniSystemLayout from '@/components/MiniSystemLayout';
import SolutionsPreview from '@/components/SolutionsPreview';
import FeedbackBlock from '@/components/FeedbackBlock';
import FooterMain from '@/components/FooterMain';
import ScrollCinematicOverlay from '@/components/ScrollCinematicOverlay.jsx';

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroMain />
      
      {/* Cinematic overlay that activates on scroll (positioned here to not interfere with layout) */}
      <ScrollCinematicOverlay />
      
      {/* Cosmic transition section - seamless connections */}
      <div className="bg-gradient-to-b from-[#1a1a2e] via-[#151B30] to-[#16213E] -mt-1">
        <MiniSystemLayout />
      </div>
      
      <SolutionsPreview />
      <FeedbackBlock />
      <FooterMain />
    </>
  );
} 