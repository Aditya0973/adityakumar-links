import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal, MoveVertical } from 'lucide-react';
import { playFigmaClick, playHoverTick } from '../../utils/soundEffects';

export const PortfolioAnim: React.FC = () => {
  const [curveMode, setCurveMode] = useState(0);
  const [t, setT] = useState(0);
  const [layoutMode, setLayoutMode] = useState<'row' | 'col'>('row');

  useEffect(() => {
    let frameId: number;
    const update = () => {
      setT((prev) => (prev + 0.03) % (Math.PI * 2));
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const curvePresets = [
    { cp1Offset: 14, cp2Offset: 14, label: 'Ease-Out' },
    { cp1Offset: 24, cp2Offset: -20, label: 'Spring S' },
    { cp1Offset: -15, cp2Offset: 25, label: 'Spline' },
  ];

  const currentPreset = curvePresets[curveMode % curvePresets.length];

  const p1x = 20;
  const p1y = 40 + Math.sin(t) * 6;
  const cp1x = 60;
  const cp1y = 20 + Math.sin(t + 1) * currentPreset.cp1Offset;
  const cp2x = 100;
  const cp2y = 60 + Math.cos(t + 2) * currentPreset.cp2Offset;
  const p2x = 140;
  const p2y = 40 + Math.cos(t) * 6;

  const handleMorph = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playFigmaClick();
    setCurveMode((prev) => prev + 1);
  };

  const handleLayoutToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playHoverTick();
    setLayoutMode((prev) => (prev === 'row' ? 'col' : 'row'));
  };

  return (
    <div className="relative w-full h-28 bg-[#FFFEFA] rounded-xl border border-[#1E1E1E]/20 p-2.5 overflow-hidden select-none flex items-center justify-between gap-2">
      {/* Background mini grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Vector Curve Canvas */}
      <div className="relative z-10 w-40 sm:w-48 h-20 flex items-center justify-center">
        <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
          {/* Tangent guide lines */}
          <line x1={p1x} y1={p1y} x2={cp1x} y2={cp1y} stroke="#FD601A" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
          <line x1={p2x} y1={p2y} x2={cp2x} y2={cp2y} stroke="#FD601A" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />

          {/* Smooth Bezier path */}
          <path
            d={`M ${p1x} ${p1y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2x} ${p2y}`}
            fill="none"
            stroke="#FD601A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Control point handles */}
          <circle cx={cp1x} cy={cp1y} r="3" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="1.5" />
          <circle cx={cp2x} cy={cp2y} r="3" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="1.5" />

          {/* Anchor Points */}
          <rect x={p1x - 3} y={p1y - 3} width="6" height="6" fill="#FD601A" stroke="#1E1E1E" strokeWidth="1" />
          <rect x={p2x - 3} y={p2y - 3} width="6" height="6" fill="#FD601A" stroke="#1E1E1E" strokeWidth="1" />

          {/* Animated Figma Cursor */}
          <g transform={`translate(${cp2x + Math.sin(t)*3}, ${cp2y - 4})`}>
            <polygon points="0,0 3,12 7,8 12,12 13,10 8,6 12,5" fill="#1E1E1E" />
            <rect x="14" y="6" width="38" height="14" rx="4" fill="#FD601A" />
            <text x="17" y="16" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Pen Tool</text>
          </g>
        </svg>
      </div>

      {/* Interactive Controls */}
      <div className="relative z-10 flex flex-col items-end gap-1.5 text-right">
        {/* Morph Spline Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleMorph}
          className="px-2 py-1 rounded-lg bg-[#FFEFE7] border border-[#FD601A] text-[10px] font-mono font-bold text-[#FD601A] flex items-center gap-1 shadow-sm hover:bg-[#FD601A] hover:text-white transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>Morph: {currentPreset.label}</span>
        </motion.button>

        {/* Auto-Layout Toggle */}
        <button
          onClick={handleLayoutToggle}
          className="px-2 py-1 rounded-lg bg-white border border-[#1E1E1E]/30 text-[10px] font-mono text-[#1E1E1E] flex items-center gap-1 hover:border-[#FD601A]"
        >
          {layoutMode === 'row' ? <MoveHorizontal className="w-3 h-3 text-[#10B981]" /> : <MoveVertical className="w-3 h-3 text-[#10B981]" />}
          <span>Flex: {layoutMode === 'row' ? 'Horizontal' : 'Vertical'}</span>
        </button>
      </div>
    </div>
  );
};
