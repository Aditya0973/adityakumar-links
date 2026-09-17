import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { playFigmaClick, playSuccess } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

export const ResumeCard: React.FC = () => {
  const handleDownload = () => {
    playSuccess();
    triggerConfetti();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto mb-8 select-none"
    >
      <div className="relative rounded-2xl bg-[#FFFEFA] border-2 border-[#1E1E1E] shadow-brutal hover:shadow-brutal-lg transition-all p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Info */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#FD601A] text-white flex items-center justify-center border-2 border-[#1E1E1E] shadow-brutal-sm shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-base sm:text-lg text-[#1E1E1E]">
                Aditya Kumar — Resume
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 text-[10px] font-mono font-bold">
                2026 Edition
              </span>
            </div>
            <p className="text-xs text-[#1E1E1E]/70 font-medium mt-0.5 font-sans">
              Product Designer &bull; Case Studies, Design Systems, UX Strategy &amp; Fullstack
            </p>
          </div>
        </div>

        {/* Right 2 Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* View Resume (No Download) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playFigmaClick()}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-[#1E1E1E] border-2 border-[#1E1E1E] text-xs font-heading font-black shadow-brutal-sm hover:bg-[#FFEFE7] active:scale-95 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FD601A]" />
            <span>View Resume</span>
          </a>

          {/* Download PDF */}
          <a
            href="/resume.pdf"
            download="Resume_Aditya_Kumar_2026.pdf"
            onClick={handleDownload}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1E1E1E] text-white text-xs font-heading font-black shadow-brutal-sm hover:bg-[#FD601A] active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
};
