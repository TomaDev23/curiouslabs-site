import { useLocalStorage } from '../../../hooks/useLocalStorage';

// LEGIT compliance metadata
export const metadata = {
  id: 'scene_fader_hud_v5',
  scs: 'SCS-HOME-V5',
  type: 'hud',
  doc: 'contract_scene_fader_hud.md'
};

export default function SceneFaderHUD() {
  const [opacity, setOpacity] = useLocalStorage('scene_fader_opacity', 0.4);
  const [color, setColor] = useLocalStorage('scene_fader_color', 'purple');

  return (
    <div className="fixed top-24 right-4 z-[101] bg-gray-900/90 border border-gray-700 rounded-lg p-4 text-white shadow-lg w-[260px]">
      <div className="text-sm mb-2 font-bold">Scene Fader HUD</div>
      <label className="text-xs">Overlay Opacity</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={opacity}
        onChange={(e) => setOpacity(parseFloat(e.target.value))}
        className="w-full mb-3"
      />
      <label className="text-xs">Overlay Color</label>
      <div className="flex gap-2 mt-1">
        {['purple', 'blue', 'gold', 'none'].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`px-2 py-1 text-xs rounded ${
              color === c ? 'bg-white text-black' : 'bg-gray-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
} 