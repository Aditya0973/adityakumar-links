import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, ArrowUp, Sparkles } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { playPop, playSuccess } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const [coffeeCount, setCoffeeCount] = useState(3);

  const handleCoffeeClick = () => {
    setCoffeeCount((prev) => prev + 1);
    playPop();
    if ((coffeeCount + 1) % 5 === 0) {
      triggerConfetti();
      playSuccess();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playPop();
  };

  return (
    <footer className="w-full max-w-xl mx-auto px-4 pt-4 pb-12 text-center select-none">
      {/* Interactive Coffee Easter Egg */}
      <div className="mb-6 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCoffeeClick}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1E1E1E] shadow-brutal-sm text-xs font-heading font-black text-[#1E1E1E] hover:bg-[#FFFBEB] transition-colors"
        >
          <Coffee className="w-4 h-4 text-[#F59E0B]" />
          <span>Fueled by {coffeeCount} coffees today</span>
          <span className="text-[10px] bg-[#F59E0B]/20 text-[#B45309] px-1.5 py-0.2 rounded font-mono">+1</span>
        </motion.button>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-3 mb-4 opacity-40">
        <span className="w-12 h-0.5 bg-[#1E1E1E]" />
        <Sparkles className="w-3.5 h-3.5 text-[#FD601A]" />
        <span className="w-12 h-0.5 bg-[#1E1E1E]" />
      </div>

      {/* Signature Text */}
      <p className="text-xs text-[#1E1E1E]/70 font-semibold mb-2 font-sans">
        Crafted with <span className="text-[#FD601A] font-bold">Figma</span>, <span className="text-[#8B5CF6] font-bold">React</span> &amp; <span className="text-[#2B66FF] font-bold">Framer Motion</span>
      </p>
      
      <p className="text-[11px] font-mono text-[#1E1E1E]/50 mb-6">
        &copy; {new Date().getFullYear()} Aditya Kumar &bull; All pixels intentionally placed.
      </p>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-[#1E1E1E] bg-white text-xs font-mono font-bold shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-[#1E1E1E]"
      >
        <ArrowUp className="w-3.5 h-3.5" />
        <span>Back to Top</span>
      </button>
    </footer>
  );
};
