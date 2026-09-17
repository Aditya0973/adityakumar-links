import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Sparkles, Gamepad2, GraduationCap, Dumbbell, Undo2, Layout, Terminal, Move } from 'lucide-react';
import { playPop, playFigmaClick } from '../utils/soundEffects';

interface StickerDef {
  id: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  left: string;
  top: string;
  rotate: number;
}

// Exactly 7 stickers: Clean neo-brutalist draggable badges
const stickersList: StickerDef[] = [
  { id: 's1', text: 'Auto-Layout > Everything', icon: Layout, color: 'bg-[#FD601A] text-white', left: '2.5%', top: '15%', rotate: -8 },
  { id: 's2', text: 'B.Tech Graduate', icon: GraduationCap, color: 'bg-[#2B66FF] text-white', left: '80%', top: '16%', rotate: 6 },
  { id: 's3', text: 'Ctrl+Z is my therapist', icon: Undo2, color: 'bg-[#1E1E1E] text-white', left: '81%', top: '66%', rotate: -10 },
  { id: 's4', text: '100% Pixel Precision', icon: Sparkles, color: 'bg-[#8B5CF6] text-white', left: '2.5%', top: '68%', rotate: 10 },
  { id: 's5', text: 'coding is tuff', icon: Terminal, color: 'bg-[#F59E0B] text-[#1E1E1E]', left: '2.5%', top: '44%', rotate: -6 },
  { id: 's6', text: 'Gamer', icon: Gamepad2, color: 'bg-[#10B981] text-white', left: '83%', top: '44%', rotate: 8 },
  { id: 's7', text: 'Working Out', icon: Dumbbell, color: 'bg-[#EC4899] text-white', left: '2.5%', top: '29%', rotate: 5 },
];

export const DraggableStickers: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    playFigmaClick();
    setResetKey((prev) => prev + 1);
  };

  return (
    <div
      key={resetKey}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden hidden xl:block"
    >
      {/* Playful Looping Floating Hint Badge for PC View */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.9 }}
        animate={{
          opacity: [0, 1, 1, 0, 0],
          y: [-10, 0, 0, -10, -10],
          scale: [0.92, 1, 1, 0.92, 0.92],
        }}
        transition={{
          duration: 7,
          times: [0, 0.08, 0.55, 0.65, 1],
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border-2 border-[#1E1E1E] shadow-brutal-sm text-[11px] font-mono font-bold text-[#1E1E1E]"
      >
        <Move className="w-3.5 h-3.5 text-[#FD601A]" />
        <span>Grab & toss any sticker!</span>
      </motion.div>

      {/* Reset Floating Button at corner */}
      <button
        onClick={handleReset}
        title="Reset Sticker Positions"
        className="pointer-events-auto absolute bottom-4 right-4 px-2.5 py-1.5 rounded-xl bg-white border-2 border-[#1E1E1E] shadow-brutal-sm text-[11px] font-mono font-bold text-[#1E1E1E] flex items-center gap-1.5 hover:bg-[#FFEFE7] active:scale-95 transition-all group"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#FD601A] group-hover:-rotate-90 transition-transform duration-300" />
        <span>Reset Stickers</span>
      </button>

      {stickersList.map((sticker) => {
        const IconComponent = sticker.icon;
        return (
          <motion.div
            key={sticker.id}
            drag
            dragMomentum={true}
            dragElastic={0.08}
            dragTransition={{ power: 0.35, timeConstant: 220 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onDragStart={() => playPop()}
            style={{
              position: 'absolute',
              left: sticker.left,
              top: sticker.top,
              rotate: `${sticker.rotate}deg`,
            }}
            className={`pointer-events-auto select-none px-3.5 py-1.5 rounded-xl border-2 border-[#1E1E1E] shadow-brutal font-mono text-xs font-bold tracking-tight flex items-center gap-1.5 cursor-grab active:cursor-grabbing hover:shadow-brutal-lg transition-shadow ${sticker.color}`}
          >
            <IconComponent className="w-3.5 h-3.5 shrink-0" />
            <span>{sticker.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
};
