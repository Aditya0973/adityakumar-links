import confetti from 'canvas-confetti';

export const triggerConfetti = (origin?: { x: number; y: number }) => {
  const count = 100;
  const defaults = {
    origin: origin || { y: 0.7 },
    colors: ['#FD601A', '#2B66FF', '#1E1E1E', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'],
    shapes: ['square', 'circle'] as ('square' | 'circle')[],
    ticks: 200,
    gravity: 1.2,
    scalar: 1.1,
    drift: 0,
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.4),
    spread: 60,
    startVelocity: 45,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.3),
    spread: 100,
    startVelocity: 55,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.3),
    spread: 120,
    startVelocity: 35,
    decay: 0.92,
  });
};
