import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Bug, GitCommit, ArrowUpRight } from 'lucide-react';
import { playFigmaClick, playPop, playSuccess } from '../../utils/soundEffects';

interface FloatingXP {
  id: number;
  text: string;
}

export const GithubAnim: React.FC = () => {
  const [activeColumn, setActiveColumn] = useState(0);
  const [minedScore, setMinedScore] = useState(140);
  const [bugsSmashed, setBugsSmashed] = useState(12);
  const [floatingTexts, setFloatingTexts] = useState<FloatingXP[]>([]);
  const [userClickedCells, setUserClickedCells] = useState<{ [key: string]: boolean }>({});

  const columns = 14;
  const rows = 4;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColumn((prev) => (prev + 1) % columns);
    }, 350);
    return () => clearInterval(interval);
  }, [columns]);

  const handleCellClick = (cIdx: number, rIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const key = `${cIdx}-${rIdx}`;
    setUserClickedCells((prev) => ({ ...prev, [key]: true }));

    const isBug = (cIdx + rIdx) % 3 === 0;

    if (isBug) {
      setBugsSmashed((prev) => prev + 1);
      setMinedScore((prev) => prev + 50);
      playSuccess();
    } else {
      setMinedScore((prev) => prev + 10);
      playPop();
    }

    const newXP: FloatingXP = {
      id: Date.now() + Math.random(),
      text: isBug ? 'Bug Fixed +50 XP' : '+10 XP',
    };

    setFloatingTexts((prev) => [...prev.slice(-3), newXP]);
  };

  const handlePushCommit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playFigmaClick();
    setMinedScore((prev) => prev + 100);
    setUserClickedCells({});
  };

  const getCellColor = (col: number, row: number) => {
    const key = `${col}-${row}`;
    if (userClickedCells[key]) return 'bg-[#39D353] ring-1 ring-white';
    const seed = (col * 7 + row * 13) % 10;
    if (seed < 2) return 'bg-[#161B22] hover:bg-[#006D32]';
    if (seed < 5) return 'bg-[#0E4429] hover:bg-[#26A641]';
    if (seed < 7) return 'bg-[#006D32] hover:bg-[#39D353]';
    if (seed < 9) return 'bg-[#26A641] hover:bg-[#39D353]';
    return 'bg-[#39D353]';
  };

  return (
    <div className="relative w-full h-28 bg-[#0D1117] rounded-xl border border-[#30363D] p-2.5 overflow-hidden flex flex-col justify-between font-mono select-none text-white">
      {/* Top Header & Gamer Score */}
      <div className="flex items-center justify-between text-[10px] pb-1 border-b border-[#21262D]">
        <div className="flex items-center gap-1.5 text-[#7EE787] font-semibold">
          <GitCommit className="w-3.5 h-3.5" />
          <span>Commit Miner</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#E3B341] font-bold flex items-center gap-0.5">
            <Zap className="w-3 h-3 text-[#E3B341]" />
            <span>{minedScore} XP</span>
          </span>
          <span className="text-[#F85149] text-[9px] bg-[#21262D] px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Bug className="w-2.5 h-2.5 text-[#F85149]" />
            <span>{bugsSmashed} Bugs</span>
          </span>
        </div>
      </div>

      {/* Interactive Contribution Matrix */}
      <div className="flex items-center justify-between gap-1 py-1 overflow-x-auto">
        {Array.from({ length: columns }).map((_, cIdx) => (
          <div key={cIdx} className="flex flex-col gap-1">
            {Array.from({ length: rows }).map((_, rIdx) => {
              const isColActive = activeColumn === cIdx;
              const colorClass = getCellColor(cIdx, rIdx);
              return (
                <motion.button
                  key={rIdx}
                  onClick={(e) => handleCellClick(cIdx, rIdx, e)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: isColActive ? [1, 1.25, 1] : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`w-2.5 h-2.5 rounded-sm ${colorClass} transition-colors cursor-pointer`}
                  title="Click to mine commit XP!"
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Action Prompt */}
      <div className="flex items-center justify-between text-[9px] text-[#8B949E] pt-1 border-t border-[#21262D]">
        <span className="text-[#58A6FF] truncate max-w-[170px]">$ git commit -m "push"</span>
        <button
          onClick={handlePushCommit}
          className="text-[#39D353] hover:underline font-bold flex items-center gap-0.5"
        >
          <span>[ Push +100XP ]</span>
          <ArrowUpRight className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Floating XP Notifications */}
      <AnimatePresence>
        {floatingTexts.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -25, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-2 right-4 text-[10px] font-bold text-[#39D353] pointer-events-none bg-black/90 px-2 py-0.5 rounded border border-[#39D353]/40"
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
