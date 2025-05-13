import { useMemo } from 'react';

export const metadata = {
  id: 'use_scene_type_from_scroll',
  scs: 'SCS-SCENE-CONTROL-001',
  type: 'hook',
  doc: 'LEGIT_contract_sceneTypeController.md'
};

export default function useSceneTypeFromScroll(scrollProgress) {
  return useMemo(() => {
    if (scrollProgress < 0.2) return 'dormant';
    if (scrollProgress < 0.4) return 'awakening';
    if (scrollProgress < 0.6) return 'cosmicReveal';
    return 'cosmicFlight';
  }, [scrollProgress]);
} 