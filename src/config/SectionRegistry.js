import HeroPortal from '../components/home/v4/HeroPortal';
import MissionStatement from '../components/home/v4/MissionStatement';
import WhyAIDevCards from '../components/home/v4/WhyAIDevCards';
import ServicesOrbital from '../components/home/v4/ServicesOrbital';
import ProjectsLogbook from '../components/home/v4/ProjectsLogbook';
import CommunityHub from '../components/home/v4/CommunityHub';
import HearFromAI from '../components/home/v4/HearFromAI';
import ContactTerminal from '../components/home/v4/ContactTerminal';

// LEGIT metadata for this registry
export const metadata = {
  id: 'section_registry',
  scs: 'SCS-ATOMIC-REGISTRY',
  type: 'config',
  doc: 'contract_section_registry.md'
};

/**
 * Home-v5 Section Configuration
 * Defines each section component, position, and props
 * Following the tile layout defined in Plan_v1.0.md
 */
export const HOME_V5_SECTIONS = [
  {
    id: 'hero_portal',
    position: 100,
    component: HeroPortal,
    props: {}
  },
  {
    id: 'mission_statement',
    position: 180,
    component: MissionStatement,
    props: {}
  },
  {
    id: 'why_ai_cards', 
    position: 300,
    component: WhyAIDevCards,
    props: {}
  },
  {
    id: 'service_ring',
    position: 370,
    component: ServicesOrbital,
    props: {}
  },
  {
    id: 'project_gallery',
    position: 450,
    component: ProjectsLogbook,
    props: {}
  },
  {
    id: 'community_hub',
    position: 470,
    component: CommunityHub,
    props: {}
  },
  {
    id: 'ai_testimonials',
    position: 590,
    component: HearFromAI,
    props: {}
  },
  {
    id: 'contact_terminal',
    position: 700,
    component: ContactTerminal,
    props: {}
  }
];

/**
 * Section Registry for ContentLayer
 * Maps section IDs to their component implementations
 */
export const SectionRegistry = {
  hero_portal: HeroPortal,
  mission_statement: MissionStatement,
  why_ai_cards: WhyAIDevCards,
  service_ring: ServicesOrbital,
  project_gallery: ProjectsLogbook,
  community_hub: CommunityHub,
  ai_testimonials: HearFromAI,
  contact_terminal: ContactTerminal
}; 