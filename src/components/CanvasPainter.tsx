import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Palette } from 'lucide-react';
import { playHoverTick, playFigmaClick, playPop } from '../utils/soundEffects';

interface CanvasPainterProps {
  isPaintMode: boolean;
  onClose: () => void;
}

const colorPalettes = [
  {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#FD601A', '#EC4899', '#F59E0B'],
    gradient: 'from-[#FD601A] via-[#EC4899] to-[#F59E0B]',
  },
  {
    id: 'cyber',
    name: 'Cyber',
    colors: ['#2B66FF', '#8B5CF6', '#06B6D4'],
    gradient: 'from-[#2B66FF] via-[#8B5CF6] to-[#06B6D4]',
  },
  {
    id: 'acid',
    name: 'Acid',
    colors: ['#84CC16', '#10B981', '#34D399'],
    gradient: 'from-[#84CC16] via-[#10B981] to-[#34D399]',
  },
];

export const CanvasPainter: React.FC<CanvasPainterProps> = ({ isPaintMode, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePaletteIdx, setActivePaletteIdx] = useState(0);
  const isDrawingRef = useRef(false);

  const activePalette = colorPalettes[activePaletteIdx];

  // Resize canvas to full window
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update cursor when paint mode changes
  useEffect(() => {
    if (isPaintMode) {
      document.body.style.cursor = 'crosshair';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isPaintMode]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playPop();
  };

  const drawSpray = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = activePalette.colors;
    const radius = 32;

    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * radius;
      const px = x + Math.cos(angle) * dist;
      const py = y + Math.sin(angle) * dist;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dotSize = Math.random() * 4 + 1.8;

      ctx.fillStyle = color;
      ctx.globalAlpha = Math.random() * 0.45 + 0.25;
      ctx.beginPath();
      ctx.arc(px, py, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Window-level mouse listeners when in paint mode
  useEffect(() => {
    if (!isPaintMode) return;

    const handleDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('.paint-toolbar-container')) {
        return;
      }

      isDrawingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      drawSpray(clientX, clientY);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      const target = e.target as HTMLElement;
      if (target && target.closest('.paint-toolbar-container')) {
        return;
      }
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      drawSpray(clientX, clientY);
    };

    const handleUp = () => {
      isDrawingRef.current = false;
    };

    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchstart', handleDown);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchstart', handleDown);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isPaintMode, activePaletteIdx]);

  return (
    <>
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Floating Paint Palette Toolbar (Vertical right dock on Mobile, Horizontal floating bar on Desktop) */}
      <AnimatePresence>
        {isPaintMode && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -10 }}
            className="paint-toolbar-container fixed top-16 right-2.5 sm:top-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto z-50 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 p-1.5 sm:px-3 sm:py-2 bg-white/95 backdrop-blur-md border-2 border-[#1E1E1E] shadow-brutal-lg rounded-2xl select-none"
          >
            {/* Header / Title */}
            <div className="flex items-center gap-1.5 px-1 sm:px-1.5 py-0.5 text-[11px] sm:text-xs font-heading font-black text-[#1E1E1E]">
              <Palette className="w-4 h-4 text-[#FD601A] shrink-0" />
              <span className="hidden sm:inline">Spray Paint</span>
            </div>

            <div className="hidden sm:block h-5 w-px bg-[#1E1E1E]/20" />
            <div className="block sm:hidden w-5 h-px bg-[#1E1E1E]/20" />

            {/* Palettes */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-1.5">
              {colorPalettes.map((pal, idx) => (
                <button
                  key={pal.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePaletteIdx(idx);
                    playHoverTick();
                  }}
                  title={`Select ${pal.name} Palette`}
                  className={`flex items-center gap-1.5 p-1.5 sm:px-2 sm:py-1 rounded-xl border-2 transition-all ${
                    activePaletteIdx === idx
                      ? 'border-[#1E1E1E] bg-[#FFEFE7] shadow-brutal-sm scale-105'
                      : 'border-transparent hover:border-[#1E1E1E]/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-tr ${pal.gradient} border border-black/20 shrink-0`} />
                  <span className="text-[10px] font-mono font-bold hidden md:inline">{pal.name}</span>
                </button>
              ))}
            </div>

            <div className="hidden sm:block h-5 w-px bg-[#1E1E1E]/20" />
            <div className="block sm:hidden w-5 h-px bg-[#1E1E1E]/20" />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearCanvas();
                }}
                title="Clear Paint Canvas"
                className="p-1.5 sm:p-2 rounded-xl bg-gray-100 border border-[#1E1E1E]/40 text-[#1E1E1E] hover:bg-red-50 hover:text-red-600 hover:border-red-400 active:scale-95 transition-all shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  playFigmaClick();
                }}
                title="Exit Paint Mode"
                className="p-1.5 sm:p-2 rounded-xl bg-[#FD601A] text-white border-2 border-[#1E1E1E] shadow-brutal-sm hover:bg-[#E24E0C] active:scale-95 transition-all font-bold"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
