import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Volume2, VolumeX, Mail, Copy, Check, LayoutGrid, Rows, Palette, AlertTriangle } from 'lucide-react';
import { playFigmaClick, playPop, playSuccess } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface HeaderProps {
  onShareClick: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  viewMode: 'grid' | 'feed';
  onViewModeToggle: () => void;
  isPaintMode: boolean;
  onPaintToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onShareClick,
  soundEnabled,
  onSoundToggle,
  viewMode,
  onViewModeToggle,
  isPaintMode,
  onPaintToggle,
}) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [starColor, setStarColor] = useState<'orange' | 'black'>('black');
  const email = 'adityakumar4727@gmail.com';

  // Smooth color change for the asterisk star (without rotating)
  useEffect(() => {
    const interval = setInterval(() => {
      setStarColor((prev) => (prev === 'black' ? 'orange' : 'black'));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    playSuccess();
    triggerConfetti();
    setTimeout(() => setEmailCopied(false), 2500);
  };

  return (
    <header className="relative w-full flex flex-col items-center text-center pt-8 pb-4 px-2 select-none">
      {/* Top Floating Control Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 max-w-full">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border-2 border-[#1E1E1E] shadow-brutal-sm text-xs font-heading font-black text-[#1E1E1E] shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Open to Work</span>
        </div>

        {/* Action Quick Toggles */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Paint Mode Toggle Button */}
          <button
            onClick={() => {
              onPaintToggle();
              playFigmaClick();
            }}
            title={isPaintMode ? 'Exit Paint Mode' : 'Open Canvas Paintbrush'}
            className={`p-2 rounded-xl border-2 border-[#1E1E1E] shadow-brutal-sm text-xs font-heading font-black flex items-center gap-1.5 active:scale-95 transition-all ${
              isPaintMode
                ? 'bg-[#FD601A] text-white shadow-brutal-orange'
                : 'bg-white text-[#1E1E1E] hover:bg-[#FFEFE7]'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Paint</span>
          </button>

          {/* View Mode Toggle: Bento vs Feed */}
          <button
            onClick={() => {
              onViewModeToggle();
              playFigmaClick();
            }}
            title={viewMode === 'grid' ? 'Switch to Feed View' : 'Switch to Bento Grid View'}
            className="px-2.5 py-1.5 rounded-xl bg-white border-2 border-[#1E1E1E] shadow-brutal-sm text-xs font-heading font-black flex items-center gap-1.5 hover:bg-[#FFEFE7] active:scale-95 transition-all text-[#1E1E1E]"
          >
            {viewMode === 'grid' ? (
              <>
                <LayoutGrid className="w-4 h-4 text-[#FD601A]" />
                <span className="hidden sm:inline">Bento View</span>
              </>
            ) : (
              <>
                <Rows className="w-4 h-4 text-[#2B66FF]" />
                <span className="hidden sm:inline">Feed View</span>
              </>
            )}
          </button>

          {/* Sound FX Button */}
          <button
            onClick={() => {
              onSoundToggle();
              playPop();
            }}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            className="p-2 rounded-xl bg-white border-2 border-[#1E1E1E] shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:scale-95 text-[#1E1E1E]"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FD601A]" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>

          {/* Share Button */}
          <button
            onClick={() => {
              onShareClick();
              playPop();
            }}
            className="p-2 rounded-xl bg-[#FD601A] text-white border-2 border-[#1E1E1E] shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:scale-95 font-bold"
            title="Share Link Hub"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Funny Zooming Warning / Caution Hazard Banner */}
      <motion.div
        animate={{ scale: [1, 1.025, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FEF3C7] border-2 border-dashed border-[#F59E0B] shadow-brutal-sm text-[#92400E] font-heading font-black text-xs mb-6 max-w-xl mx-auto"
      >
        <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
        <span className="tracking-wide">
          CAUTION: THIS IS NOT MY PORTFOLIO • IT'S A LINKTREE FOR MY SITES
        </span>
      </motion.div>

      {/* Main Headline - Exact Figma SVG Starburst & Typography */}
      <div className="relative max-w-2xl mx-auto mb-4 flex flex-col items-center">
        {/* Line 1: Creative */}
        <div className="font-heading font-normal text-5xl sm:text-6xl md:text-7xl tracking-normal text-[#2D2F36] leading-none mb-1">
          Creative
        </div>

        {/* Line 2: PR [Exact SVG Starburst] DUCT */}
        <div className="font-heading font-black text-5xl sm:text-6xl md:text-8xl tracking-tight text-[#FD601A] leading-none flex items-center justify-center">
          <span>PR</span>
          
          {/* Exact SVG Starburst from Group 1.svg */}
          <div className="inline-flex items-center justify-center mx-1 sm:mx-2 select-none">
            <svg
              width="132"
              height="132"
              viewBox="0 0 132 132"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-colors duration-700"
              style={{ color: starColor === 'black' ? '#1E1E1E' : '#FD601A' }}
            >
              <rect x="48.5" width="35" height="132" rx="4" fill="currentColor" />
              <rect x="6.95654" y="31.7053" width="35" height="132" rx="4" transform="rotate(-45 6.95654 31.7053)" fill="currentColor" />
              <rect y="83.5" width="35" height="132" rx="4" transform="rotate(-90 0 83.5)" fill="currentColor" />
              <rect x="31.7051" y="125.043" width="35" height="132" rx="4" transform="rotate(-135 31.7051 125.043)" fill="currentColor" />
            </svg>
          </div>

          <span>DUCT</span>
        </div>

        {/* Line 3: DESIGNER. with solid orange period dot */}
        <div className="font-heading font-black text-5xl sm:text-6xl md:text-8xl tracking-tight text-[#1E1E1E] leading-none flex items-baseline justify-center">
          <span>DESIGNER</span>
          <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#FD601A] inline-block ml-1 sm:ml-2 mb-1" />
        </div>

        {/* Line 4: Mint Open to work badge directly underneath */}
        <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-[#1E1E1E]/80">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>Open to work</span>
        </div>
      </div>

      {/* Subheading */}
      <p className="max-w-lg mx-auto text-sm sm:text-base text-[#1E1E1E]/80 font-medium leading-relaxed mb-5 font-sans">
        Hi, I'm <strong className="text-[#FD601A] font-bold">Aditya Kumar</strong>. Crafting thoughtful products, high-octane brands, and pixel-precise interactive experiences for the digital world.
      </p>

      {/* Mail Me Pls & Copy Button - Side-by-side row on mobile and desktop */}
      <div className="flex items-center justify-center gap-2 mb-6 w-full max-w-md mx-auto">
        <motion.a
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          href={`mailto:${email}?subject=Hey%20Aditya!%20Let's%20Build%20Something%20Awesome`}
          onClick={() => playFigmaClick()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-2xl bg-[#FD601A] text-white font-heading font-black text-xs sm:text-sm border-2 border-[#1E1E1E] shadow-brutal hover:shadow-brutal-lg transition-all truncate"
        >
          <Mail className="w-4 h-4 shrink-0" />
          <span className="truncate">Mail me pls (I reply fast)</span>
        </motion.a>

        <button
          onClick={handleCopyEmail}
          title="Copy Email to Clipboard"
          className={`shrink-0 px-3 py-2.5 rounded-2xl border-2 border-[#1E1E1E] shadow-brutal-sm font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
            emailCopied
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-[#1E1E1E] hover:bg-[#FFF5F0]'
          }`}
        >
          {emailCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-[#FD601A]" />}
          <span className="font-mono text-xs hidden sm:inline">{emailCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </header>
  );
};
