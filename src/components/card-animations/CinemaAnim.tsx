import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Ghost, Flame, Sparkles } from 'lucide-react';
import { playPop } from '../../utils/soundEffects';

const genres = [
  { name: 'Psychological Horror', icon: Ghost, color: 'text-red-400 bg-red-950/60 border-red-800/60' },
  { name: 'Dark Fantasy Anime', icon: Flame, color: 'text-purple-400 bg-purple-950/60 border-purple-800/60' },
  { name: 'Cyberpunk Thriller', icon: Sparkles, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60' },
];

export const CinemaAnim: React.FC = () => {
  const [activeGenreIdx, setActiveGenreIdx] = useState(0);
  const [flicker, setFlicker] = useState(false);

  const activeGenre = genres[activeGenreIdx];
  const IconComponent = activeGenre.icon;

  const handleNextGenre = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playPop();
    setFlicker(true);
    setTimeout(() => setFlicker(false), 200);
    setActiveGenreIdx((prev) => (prev + 1) % genres.length);
  };

  return (
    <div className="relative w-full h-28 bg-[#120808] rounded-xl border border-red-900/40 p-2.5 overflow-hidden flex flex-col justify-between font-mono select-none text-white">
      {/* Cinematic Top Bar */}
      <div className="flex items-center justify-between border-b border-red-950 pb-1 text-[10px]">
        <div className="flex items-center gap-1.5 text-red-400 font-bold">
          <Film className="w-3.5 h-3.5" />
          <span>Midnight Reel • 2:45 AM</span>
        </div>
        <span className="text-[9px] bg-red-950 px-1.5 py-0.5 rounded border border-red-800/50 text-red-300">
          REC ●
        </span>
      </div>

      {/* Center Reel Content with Horror/Anime flicker */}
      <div className="py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg border ${activeGenre.color} transition-all duration-150`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div>
            <div className={`text-xs font-bold font-sans transition-opacity ${flicker ? 'opacity-30' : 'opacity-100'}`}>
              {activeGenre.name}
            </div>
            <p className="text-[9px] text-gray-400">Cinematography &bull; Lore Analysis</p>
          </div>
        </div>

        {/* Change Reel Action */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNextGenre}
          className="px-2.5 py-1 rounded-lg bg-red-900/40 hover:bg-red-900/70 border border-red-700/60 text-[10px] font-bold text-red-200 transition-colors"
        >
          Next Reel ➔
        </motion.button>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between text-[9px] text-gray-500 pt-1 border-t border-red-950">
        <span className="text-red-400">Shonen &bull; A24 &bull; Psychological</span>
        <span className="text-gray-400">100% Immersive</span>
      </div>
    </div>
  );
};
