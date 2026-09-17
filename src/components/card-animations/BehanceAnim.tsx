import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Box } from 'lucide-react';
import { playFigmaClick, playPop } from '../../utils/soundEffects';

const flavors = [
  { name: 'Berry Glaze', r: 236, g: 72, b: 153 },
  { name: 'Cyber Neon', r: 56, g: 189, b: 248 },
  { name: 'Matcha Mint', r: 52, g: 211, b: 153 },
  { name: 'Liquid Gold', r: 245, g: 158, b: 11 },
];

export const BehanceAnim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flavorIdx, setFlavorIdx] = useState(0);
  const [isWireframe, setIsWireframe] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeFlavor = flavors[flavorIdx];

  const handleNextFlavor = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playPop();
    setFlavorIdx((prev) => (prev + 1) % flavors.length);
  };

  const handleWireframeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playFigmaClick();
    setIsWireframe(!isWireframe);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angleA = 0;
    let angleB = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      const R1 = 18;
      const R2 = 34;
      const K2 = 120;
      const K1 = (width * K2 * 3) / (8 * (R1 + R2));

      // Constant steady, ultra-smooth rotation speed
      angleA += 0.015;
      angleB += 0.012;

      // Gentle, smoothed mouse tilt damping
      const cosA = Math.cos(angleA + mousePos.x * 0.005);
      const sinA = Math.sin(angleA + mousePos.x * 0.005);
      const cosB = Math.cos(angleB + mousePos.y * 0.005);
      const sinB = Math.sin(angleB + mousePos.y * 0.005);

      const stepTheta = isWireframe ? 0.38 : 0.28;
      const stepPhi = isWireframe ? 0.22 : 0.14;

      for (let theta = 0; theta < Math.PI * 2; theta += stepTheta) {
        const costheta = Math.cos(theta);
        const sintheta = Math.sin(theta);

        for (let phi = 0; phi < Math.PI * 2; phi += stepPhi) {
          const cosphi = Math.cos(phi);
          const sinphi = Math.sin(phi);

          const circlex = R2 + R1 * costheta;
          const circley = R1 * sintheta;

          const x = circlex * (cosB * cosphi + sinA * sinB * sinphi) - circley * cosA * sinB;
          const y = circlex * (sinB * cosphi - sinA * cosB * sinphi) + circley * cosA * cosB;
          const z = K2 + cosA * circlex * sinphi + circley * sinA;
          const ooz = 1 / z;

          const xp = Math.floor(centerX + K1 * ooz * x);
          const yp = Math.floor(centerY - K1 * ooz * y);

          const L = cosphi * costheta * sinB - cosA * costheta * sinphi - sinA * sintheta + cosB * (cosA * sintheta - costheta * sinA * sinphi);

          if (L > 0 || isWireframe) {
            const opacity = isWireframe ? 0.8 : Math.min(1, Math.max(0.2, (L / 1.4) + 0.15));
            ctx.fillStyle = `rgba(${activeFlavor.r}, ${activeFlavor.g}, ${activeFlavor.b}, ${opacity})`;
            ctx.beginPath();
            ctx.arc(xp, yp, isWireframe ? 1.2 : Math.max(1, 2.2 * ooz * 100), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [mousePos, activeFlavor, isWireframe]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.5,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.5,
    });
  };

  return (
    <div
      className="relative w-full h-28 bg-gradient-to-br from-[#240a34] to-[#120024] rounded-xl border border-[#EC4899]/30 p-2.5 overflow-hidden flex items-center justify-between gap-2 select-none"
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas */}
      <div className="relative z-10 w-28 h-24 flex items-center justify-center">
        <canvas ref={canvasRef} width={110} height={90} className="w-full h-full" />
      </div>

      {/* Interactive Controls */}
      <div className="relative z-10 flex flex-col items-end gap-1.5 text-right">
        {/* Flavor Switcher */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextFlavor}
          className="px-2.5 py-1 rounded-lg bg-[#EC4899]/20 border border-[#EC4899]/50 text-[10px] font-mono text-[#F472B6] font-bold flex items-center gap-1.5 hover:bg-[#EC4899]/40 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>{activeFlavor.name}</span>
        </motion.button>

        {/* Wireframe Switch */}
        <button
          onClick={handleWireframeToggle}
          className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold border transition-colors flex items-center gap-1 ${
            isWireframe
              ? 'bg-[#38BDF8] text-black border-[#38BDF8]'
              : 'bg-black/40 text-white/80 border-white/20 hover:border-white/50'
          }`}
        >
          <Box className="w-3 h-3" />
          <span>{isWireframe ? 'Wireframe: ON' : 'Solid Mesh'}</span>
        </button>
      </div>
    </div>
  );
};
