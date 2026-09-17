import { useState } from 'react';
import { Header } from './components/Header';
import { SkillCloud } from './components/SkillCloud';
import { LinkCard } from './components/LinkCard';
import { ResumeCard } from './components/ResumeCard';
import { Footer } from './components/Footer';
import { DraggableStickers } from './components/DraggableStickers';
import { ShareModal } from './components/ShareModal';
import { CanvasPainter } from './components/CanvasPainter';
import { linksData } from './data/links';
import { toggleSound, isSoundEnabled } from './utils/soundEffects';

export function App() {
  const [soundEnabled, setSoundEnabled] = useState(isSoundEnabled());
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('grid');
  const [isPaintMode, setIsPaintMode] = useState(false);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundEnabled(newState);
  };

  const handleViewModeToggle = () => {
    setViewMode((prev) => (prev === 'grid' ? 'feed' : 'grid'));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FFFCF3] text-[#1E1E1E] transition-colors duration-300">
      {/* Interactive Background Canvas Painter */}
      <CanvasPainter
        isPaintMode={isPaintMode}
        onClose={() => setIsPaintMode(false)}
      />

      {/* Background Dots Overlay */}
      <div className="absolute inset-0 bg-dots-pattern opacity-60 pointer-events-none z-[1]" />

      {/* Funky Background Ambient Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Top Left Organic Orange Blob */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FD601A]/10 blur-3xl" />
        {/* Middle Right Blue Blob */}
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-[#2B66FF]/10 blur-3xl" />
        {/* Bottom Left Purple Blob */}
        <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
      </div>

      {/* Floating Canvas Draggable Stickers (Desktop / Tablet) */}
      <DraggableStickers />

      {/* Main Content Container */}
      <div
        className={`relative z-10 mx-auto px-3 sm:px-6 transition-all duration-300 ${
          viewMode === 'grid' ? 'max-w-5xl' : 'max-w-xl'
        }`}
      >
        {/* Header Section */}
        <Header
          onShareClick={() => setIsShareOpen(true)}
          soundEnabled={soundEnabled}
          onSoundToggle={handleSoundToggle}
          viewMode={viewMode}
          onViewModeToggle={handleViewModeToggle}
          isPaintMode={isPaintMode}
          onPaintToggle={() => setIsPaintMode(!isPaintMode)}
        />

        {/* Dynamic Looping Skills Pills */}
        <SkillCloud />

        {/* Main 5 Link Cards Section */}
        <main
          className={`w-full mb-6 ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch'
              : 'flex flex-col items-center'
          }`}
        >
          {linksData.map((link, index) => (
            <LinkCard
              key={link.id}
              link={link}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </main>

        {/* Dedicated Compact Resume Card */}
        <ResumeCard />

        {/* Footer */}
        <Footer />
      </div>

      {/* Share / Copy Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}

export default App;
