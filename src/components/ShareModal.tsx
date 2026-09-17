import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { playSuccess, playPop } from '../utils/soundEffects';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    triggerConfetti();
    playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1E1E]/60 backdrop-blur-sm select-none">
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative z-10 w-full max-w-md bg-[#FFFCF3] rounded-3xl border-3 border-[#1E1E1E] shadow-brutal-xl p-6 overflow-hidden"
          >
            {/* Top Close Button */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#1E1E1E]">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#FD601A] text-white">
                  <Share2 className="w-4 h-4" />
                </span>
                <h3 className="font-syne font-extrabold text-lg text-[#1E1E1E]">
                  Share Aditya's Hub
                </h3>
              </div>
              <button
                onClick={() => {
                  onClose();
                  playPop();
                }}
                className="p-1 rounded-lg border-2 border-[#1E1E1E] bg-white hover:bg-red-50 text-[#1E1E1E] shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Preview */}
            <div className="bg-white p-4 rounded-2xl border-2 border-[#1E1E1E] shadow-brutal-sm mb-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FD601A] text-white flex items-center justify-center font-syne font-black text-xl mx-auto mb-2 shadow-brutal-sm">
                AK
              </div>
              <h4 className="font-syne font-extrabold text-[#1E1E1E] text-base">
                Aditya Kumar
              </h4>
              <p className="text-xs text-[#1E1E1E]/70 font-medium">
                Creative Product Designer &bull; Portfolio &amp; Links
              </p>

              {/* Copy URL Box */}
              <div className="mt-4 flex items-center gap-2 bg-[#FAF8F2] p-2 rounded-xl border border-[#1E1E1E]/20">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? window.location.href : 'https://adityakumar.dev'}
                  className="w-full bg-transparent text-xs font-mono text-[#1E1E1E] outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-brutal-sm ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#FD601A] text-white hover:bg-[#E24E0C]'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Quick Share Links */}
            <div className="text-center">
              <p className="text-xs font-mono text-[#1E1E1E]/60 mb-2">
                ✨ Send directly to fellow designers &amp; recruiters
              </p>
              <div className="flex items-center justify-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out Aditya Kumar's Creative Product Designer link hub! ⚡")}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border-2 border-[#1E1E1E] bg-white hover:bg-black hover:text-white font-bold text-xs shadow-brutal-sm transition-all"
                >
                  𝕏 Post
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border-2 border-[#1E1E1E] bg-[#0A66C2] text-white font-bold text-xs shadow-brutal-sm hover:bg-[#004182] transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Check out Aditya Kumar's designer links: " + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border-2 border-[#1E1E1E] bg-[#25D366] text-white font-bold text-xs shadow-brutal-sm hover:bg-[#1EBE5D] transition-all"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
