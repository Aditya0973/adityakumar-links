import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Layers, 
  Sparkles, 
  Boxes, 
  Clapperboard, 
  Lightbulb, 
  Code2, 
  Compass, 
  Box,
  Asterisk
} from 'lucide-react';
import { playHoverTick } from '../utils/soundEffects';

export const SkillCloud: React.FC = () => {
  const [typoText, setTypoText] = useState('T');
  const typoFull = 'Typography';

  const [interactionSwapped, setInteractionSwapped] = useState(false);
  const [logoAsterisk, setLogoAsterisk] = useState(false);
  const [vibeText, setVibeText] = useState('vibecoding');

  // Smooth typing loop
  useEffect(() => {
    let charIdx = 1;
    let forward = true;
    const interval = setInterval(() => {
      if (forward) {
        charIdx++;
        setTypoText(typoFull.slice(0, charIdx));
        if (charIdx >= typoFull.length) {
          forward = false;
        }
      } else {
        charIdx--;
        setTypoText(typoFull.slice(0, Math.max(1, charIdx)));
        if (charIdx <= 1) {
          forward = true;
        }
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Interaction design swap loop
  useEffect(() => {
    const interval = setInterval(() => {
      setInteractionSwapped((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Logo design asterisk toggle loop
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoAsterisk((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Vibecoding loop
  useEffect(() => {
    const phrases = ['vibecoding', '> code.vibe()', 'npm run vibe'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phrases.length;
      setVibeText(phrases[idx]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 mb-8 select-none">
      {/* Title */}
      <div className="flex items-center justify-center gap-2 mb-4 text-center">
        <h2 className="font-heading font-black text-xl sm:text-2xl text-[#1E1E1E]">
          Things I'm <span className="text-[#FD601A]">Good</span> At:
        </h2>
      </div>

      {/* Looping Animated Pills Container */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
        
        {/* 1. Typography: Smooth typewriter */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center justify-center min-w-[105px] h-9 px-3.5 rounded-full bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-black text-xs italic tracking-wider transition-all"
        >
          <span>{typoText}</span>
          <span className="w-1.5 h-3.5 bg-[#FD601A] ml-0.5 animate-pulse" />
        </motion.div>

        {/* 2. Color Theory: Exact Figma animation with color wave moving Left-to-Right and Right-to-Left */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="relative inline-flex items-center justify-center h-9 px-4 rounded-full border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-black text-xs overflow-hidden bg-[#1E1E1E]"
        >
          {/* Base Layer: Static Text in Orange */}
          <div className="relative z-0 flex items-center gap-1.5 text-[#FD601A]">
            <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black border border-[#FD601A] bg-[#FD601A] text-black">
              T
            </span>
            <span>Color Theory</span>
          </div>

          {/* Sliding Orange Wave Layer with Black Text (moving Left to Right then Right to Left) */}
          <motion.div
            animate={{
              clipPath: [
                'inset(0% 100% 0% 0%)',
                'inset(0% 0% 0% 0%)',
                'inset(0% 0% 0% 100%)',
                'inset(0% 0% 0% 0%)',
                'inset(0% 100% 0% 0%)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 z-10 flex items-center justify-center px-4 bg-[#FD601A] text-white"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black border border-white bg-white text-[#FD601A]">
                T
              </span>
              <span>Color Theory</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. User Research: Scanning magnifier */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-bold text-xs"
        >
          <motion.span
            animate={{ x: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <Search className="w-3.5 h-3.5 text-[#2B66FF]" />
          </motion.span>
          <span>User Research</span>
        </motion.div>

        {/* 4. Wireframing: Dashed blueprint border pulse */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#F0FDF4] text-[#1E1E1E] border-2 border-dashed border-[#10B981] shadow-brutal-sm font-heading font-bold text-xs"
        >
          <Compass className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Wireframing</span>
        </motion.div>

        {/* 5. Design Systems: Modular layer rotation */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-bold text-xs"
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          >
            <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </motion.span>
          <span>Design Systems</span>
        </motion.div>

        {/* 6. Iconography: Sparkle scaling */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-bold text-xs"
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          </motion.span>
          <span>Iconography</span>
        </motion.div>

        {/* 7. Interaction Design: Words swap / slide across */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#2B66FF] text-white border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-black text-xs overflow-hidden"
        >
          <Sparkles className="w-3 h-3 text-white" />
          <AnimatePresence mode="wait">
            <motion.span
              key={interactionSwapped ? 'swapped' : 'normal'}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {interactionSwapped ? 'Interaction Design' : 'Design Interaction'}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* 8. Logo Design: Asterisk icon appears in front with dark invert */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-black text-xs transition-all duration-300 ${
            logoAsterisk
              ? 'bg-[#1E1E1E] text-white shadow-brutal-orange'
              : 'bg-white text-[#1E1E1E]'
          }`}
        >
          <motion.span
            animate={{ rotate: logoAsterisk ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Asterisk className="w-3.5 h-3.5 text-[#FD601A]" />
          </motion.span>
          <span>Logo Design</span>
        </motion.div>

        {/* 9. 3D Modeling: 3D perspective depth & orange glow */}
        <motion.div
          animate={{
            boxShadow: [
              '2px 2px 0px #1E1E1E',
              '4px 4px 14px rgba(253, 96, 26, 0.6), 3px 3px 0px #1E1E1E',
              '2px 2px 0px #1E1E1E'
            ],
            y: [0, -2, 0]
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#1E1E1E] text-white border-2 border-[#1E1E1E] font-heading font-black text-xs"
        >
          <Box className="w-3.5 h-3.5 text-[#FD601A]" />
          <span>3D Modeling</span>
        </motion.div>

        {/* 10. Low-Poly Modeling: Faceted geometric cube */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-bold text-xs"
        >
          <Boxes className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Low-Poly Modeling</span>
        </motion.div>

        {/* 11. Scene Composition: Camera framing */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-bold text-xs"
        >
          <Clapperboard className="w-3.5 h-3.5 text-[#EC4899]" />
          <span>Scene Composition</span>
        </motion.div>

        {/* 12. Rendering: Glowing light ray */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] shadow-brutal-sm font-heading font-bold text-xs"
        >
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
          </motion.span>
          <span>Rendering</span>
        </motion.div>

        {/* 13. Vibecoding: Matrix typing neon pill */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onMouseEnter={playHoverTick}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#121820] text-[#34D399] border-2 border-[#34D399]/60 shadow-brutal-sm font-mono font-black text-xs"
        >
          <Code2 className="w-3.5 h-3.5 text-[#34D399]" />
          <span>{vibeText}</span>
        </motion.div>

      </div>
    </section>
  );
};
