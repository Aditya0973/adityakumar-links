import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, Globe, ArrowUpRight, MessageSquare } from 'lucide-react';
import type { LinkItem } from '../types';
import { playFigmaClick, playHoverTick } from '../utils/soundEffects';
import { PortfolioAnim } from './card-animations/PortfolioAnim';
import { StudioAnim } from './card-animations/StudioAnim';
import { BehanceAnim } from './card-animations/BehanceAnim';
import { GithubAnim } from './card-animations/GithubAnim';
import { LinkedinAnim } from './card-animations/LinkedinAnim';

interface LinkCardProps {
  link: LinkItem;
  index: number;
  viewMode?: 'grid' | 'feed';
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, index, viewMode = 'grid' }) => {
  const getIcon = () => {
    switch (link.iconName) {
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'code':
        return <Code className="w-4 h-4" />;
      case 'palette':
        return (
          // Exact Behance SVG from user file
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const renderLiveAnimation = () => {
    switch (link.id) {
      case 'portfolio':
        return <PortfolioAnim />;
      case 'studio':
        return <StudioAnim />;
      case 'behance':
        return <BehanceAnim />;
      case 'github':
        return <GithubAnim />;
      case 'linkedin':
        return <LinkedinAnim />;
      default:
        return null;
    }
  };

  // Grid layout span for 5 cards in Bento Grid
  const getGridSpan = () => {
    if (viewMode !== 'grid') return 'w-full mb-6';
    if (link.id === 'portfolio' || link.id === 'studio') {
      return 'col-span-1 md:col-span-6 w-full';
    }
    return 'col-span-1 md:col-span-6 lg:col-span-4 w-full';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`relative group select-none flex flex-col ${getGridSpan()}`}
      onMouseEnter={() => {
        playHoverTick();
      }}
    >
      {/* Main Neo-Brutalist Card Frame */}
      <div className="relative w-full h-full rounded-2xl bg-white border-2 border-[#1E1E1E] transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-brutal hover:shadow-brutal-xl hover:-translate-y-1">
        {/* Top Section */}
        <div className="flex flex-col">
          {/* Card Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#FFFEFA] border-b-2 border-[#1E1E1E]">
            {/* Category Tag */}
            <div className="flex items-center gap-2">
              <div
                className="p-1.5 rounded-lg border border-[#1E1E1E] text-white flex items-center justify-center shadow-brutal-sm"
                style={{ backgroundColor: link.accentColor }}
              >
                {getIcon()}
              </div>
              <span className="text-[11px] font-mono font-bold tracking-wide uppercase text-[#1E1E1E]/80">
                {link.category}
              </span>
            </div>

            {/* Right Badge */}
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#1E1E1E] shadow-brutal-sm ${link.badgeColor}`}>
              {link.badge}
            </div>
          </div>

          {/* Card Body Content */}
          <div className="p-4 flex flex-col gap-2.5">
            {/* Title & Subtitle */}
            <div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-[#1E1E1E] flex items-center justify-between group-hover:text-[#FD601A] transition-colors">
                <span>{link.title}</span>
                <ArrowUpRight className="w-4 h-4 text-[#1E1E1E] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#FD601A] transition-transform duration-200" />
              </h3>
              <p className="text-[11px] font-mono text-[#1E1E1E]/60 font-semibold mt-0.5">
                {link.subtitle}
              </p>
            </div>

            {/* Senior Designer Humor Description - Zero Emojis */}
            <div className="bg-[#FAF8F2] p-2.5 rounded-xl border border-[#1E1E1E]/20 text-xs text-[#1E1E1E]/85 leading-relaxed font-sans font-medium min-h-[52px] flex items-start gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#FD601A] shrink-0 mt-0.5" />
              <span>{link.humorDesc}</span>
            </div>

            {/* Live Interactive Micro-Game Animation Container */}
            <div className="w-full my-1">
              {renderLiveAnimation()}
            </div>
          </div>
        </div>

        {/* Footer Tags & CTA Link - Structured 2-tier layout */}
        <div className="p-4 pt-0 mt-auto">
          <div className="flex flex-col gap-2 pt-2 border-t border-[#1E1E1E]/10">
            {/* Row 1: Tag Pills */}
            <div className="flex flex-wrap items-center gap-1">
              {link.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 bg-[#FAF8F2] border border-[#1E1E1E]/20 rounded text-[9px] font-mono font-bold text-[#1E1E1E]/75"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Row 2: Full Width Clean Action Button with Single Arrow */}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playFigmaClick()}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1E1E1E] text-white text-xs font-heading font-black hover:bg-[#FD601A] transition-all shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span>Explore {link.title} ↗</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
