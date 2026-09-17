import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Dice5 } from 'lucide-react';
import { playFigmaClick, playPop } from '../../utils/soundEffects';

const corporateBuzzwords = [
  'Synergizing AI Paradigms',
  'Disrupting Agile Silos',
  'Pioneering 100x UX Value',
  'Hyper-Scaling Design Systems',
  'Driving Strategic Roadmaps',
];

export const LinkedinAnim: React.FC = () => {
  const [endorseCount, setEndorseCount] = useState(842);
  const [buzzwordIdx, setBuzzwordIdx] = useState(0);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; x: number }[]>([]);

  const handleEndorse = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playPop();
    setEndorseCount((prev) => prev + 1);

    const newParticle = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 50,
    };

    setFloatingParticles((prev) => [...prev.slice(-6), newParticle]);
  };

  const handleRollJargon = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playFigmaClick();
    setBuzzwordIdx((prev) => (prev + 1) % corporateBuzzwords.length);
  };

  return (
    <div className="relative w-full h-28 bg-[#0A66C2]/10 rounded-xl border border-[#0A66C2]/30 p-2.5 overflow-hidden flex flex-col justify-between select-none">
      {/* Jargon / Corporate Status */}
      <div className="relative z-10 flex items-center justify-between text-left">
        <div className="text-[10px] font-bold text-[#0A66C2] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] animate-pulse" />
          <span>Strategic Mode</span>
        </div>
        <button
          onClick={handleRollJargon}
          className="text-[9px] text-[#0A66C2] font-bold bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors"
          title="Roll new corporate phrase"
        >
          <Dice5 className="w-3 h-3" />
          <span>Roll Jargon</span>
        </button>
      </div>

      {/* Quote display */}
      <div className="relative z-10 py-0.5">
        <p className="text-[10px] font-mono text-[#1E1E1E]/80 truncate">
          &ldquo;{corporateBuzzwords[buzzwordIdx]}&rdquo;
        </p>
      </div>

      {/* Interactive Endorse Button */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-[#0A66C2]/20">
        <span className="text-[9px] text-[#0A66C2]/70 font-mono">Endorse Aditya</span>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleEndorse}
            className="px-2.5 py-1 rounded-lg bg-[#0A66C2] text-white font-bold text-[10px] shadow-brutal-sm flex items-center gap-1.5 hover:bg-[#004182] transition-colors"
          >
            <ThumbsUp className="w-3 h-3" />
            <span>Endorse</span>
            <span className="bg-white/20 px-1 rounded text-[9px] font-mono">
              {endorseCount}
            </span>
          </motion.button>

          {/* Floating Endorsements */}
          <AnimatePresence>
            {floatingParticles.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, y: 0, x: item.x, scale: 0.8 }}
                animate={{ opacity: 0, y: -35, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute pointer-events-none text-xs text-[#0A66C2] font-black left-1/2 -top-2"
              >
                <ThumbsUp className="w-4 h-4 fill-current" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
