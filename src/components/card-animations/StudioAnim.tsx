import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, Sparkles, Check, Rocket } from 'lucide-react';
import { playFigmaClick, playPop, playSuccess } from '../../utils/soundEffects';

const userProductNames = [
  { id: '1', name: 'commit', color: 'bg-emerald-600 text-white' },
  { id: '2', name: 'champione', color: 'bg-amber-600 text-white' },
  { id: '3', name: 'modyule', color: 'bg-purple-600 text-white' },
  { id: '4', name: 'cs studio', color: 'bg-blue-600 text-white' },
  { id: '5', name: 'craftnime', color: 'bg-pink-600 text-white' },
  { id: '6', name: 'abyss archive', color: 'bg-indigo-700 text-white' },
  { id: '7', name: 'nakastra', color: 'bg-orange-600 text-white' },
];

export const StudioAnim: React.FC = () => {
  const [productIdx, setProductIdx] = useState(0);
  const [isPacked, setIsPacked] = useState(false);
  const [isDrivingAway, setIsDrivingAway] = useState(false);
  const [truckKey, setTruckKey] = useState(0);
  const [shippedCount, setShippedCount] = useState(7);

  const currentProduct = userProductNames[productIdx % userProductNames.length];

  const handlePack = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isPacked || isDrivingAway) return;
    playPop();
    setIsPacked(true);
  };

  const handleShip = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isPacked || isDrivingAway) return;
    playFigmaClick();
    setIsDrivingAway(true);

    // After truck drives off screen, spawn a fresh new truck!
    setTimeout(() => {
      setShippedCount((prev) => prev + 1);
      playSuccess();
      setIsPacked(false);
      setIsDrivingAway(false);
      setProductIdx((prev) => (prev + 1) % userProductNames.length);
      setTruckKey((prev) => prev + 1);
    }, 1000);
  };

  return (
    <div className="relative w-full h-28 bg-[#18181B] rounded-xl border border-[#3F3F46] p-2.5 overflow-hidden flex flex-col justify-between font-mono select-none text-white">
      {/* Top Header - Zero Emojis */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-1 text-[10px]">
        <div className="flex items-center gap-1.5 text-[#A78BFA] font-bold">
          <Truck className="w-3.5 h-3.5" />
          <span>Product Logistics Sim</span>
        </div>
        <div className="flex items-center gap-1">
          <Rocket className="w-3 h-3 text-[#34D399]" />
          <span className="text-[#34D399] font-bold bg-[#27272A] px-1.5 py-0.2 rounded">
            {shippedCount} Shipped
          </span>
        </div>
      </div>

      {/* Main Shipping Stage */}
      <div className="relative w-full h-12 flex items-center justify-between px-1 overflow-hidden">
        {/* Product on Conveyor (Left) */}
        <div className="flex flex-col items-start z-10">
          <div className="text-[9px] text-gray-400 mb-0.5">Ready to pack:</div>
          <div className="flex items-center gap-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm font-sans ${currentProduct.color}`}>
              <Package className="w-3 h-3" />
              <span>{currentProduct.name}</span>
            </span>
          </div>
        </div>

        {/* Packing / Shipping Action */}
        <div className="z-10">
          {!isPacked ? (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePack}
              className="px-2 py-1 rounded bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-[10px] font-bold flex items-center gap-1 transition-colors shadow-sm"
            >
              <span>Pack Product</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleShip}
              disabled={isDrivingAway}
              className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white text-[10px] font-bold flex items-center gap-1.5 transition-colors shadow-sm animate-pulse"
            >
              <Rocket className="w-3 h-3" />
              <span>Ship Truck</span>
            </motion.button>
          )}
        </div>

        {/* Animated Truck (Right) */}
        <div className="relative w-28 h-full flex items-center justify-end overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={truckKey}
              initial={{ x: 60, opacity: 0 }}
              animate={{
                x: isDrivingAway ? 150 : 0,
                opacity: 1,
              }}
              transition={{
                duration: isDrivingAway ? 0.9 : 0.4,
                ease: isDrivingAway ? 'easeIn' : 'easeOut',
              }}
              className="relative flex items-center"
            >
              {/* Truck Body */}
              <div className="relative bg-[#27272A] border border-gray-600 rounded-lg p-1 flex items-center gap-1 shadow-md">
                {/* Truck Bed / Cargo */}
                <div className="w-10 h-7 bg-[#1E1E1E] rounded border border-dashed border-gray-500 flex items-center justify-center">
                  {isPacked ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[9px] bg-purple-500 text-white font-bold px-1 rounded flex items-center gap-0.5"
                    >
                      <Check className="w-2.5 h-2.5" />
                      <span>Loaded</span>
                    </motion.div>
                  ) : (
                    <span className="text-[8px] text-gray-500">Empty</span>
                  )}
                </div>

                {/* Truck Cabin */}
                <div className="w-6 h-7 bg-[#8B5CF6] rounded-r-md flex flex-col items-center justify-between p-0.5">
                  <div className="w-3.5 h-2 bg-cyan-200/80 rounded-sm mt-0.5" />
                  <div className="w-2 h-1 bg-yellow-400 rounded-full" />
                </div>
              </div>

              {/* Truck Wheels */}
              <div className="absolute -bottom-1 left-2 w-2.5 h-2.5 rounded-full bg-black border border-gray-400" />
              <div className="absolute -bottom-1 right-2 w-2.5 h-2.5 rounded-full bg-black border border-gray-400" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between text-[9px] text-[#71717A] pt-1 border-t border-[#27272A]">
        <span className="flex items-center gap-1 text-[#38BDF8]">
          <Sparkles className="w-2.5 h-2.5" />
          <span>Pack &amp; dispatch real digital products</span>
        </span>
        <span className="text-[#34D399] font-mono">Live on Vercel</span>
      </div>
    </div>
  );
};
