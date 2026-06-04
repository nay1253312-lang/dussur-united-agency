import React from 'react';
import { motion } from 'motion/react';

export default function GoldDustSeparator() {
  // Generate random coordinates and scales for 12 gold dust particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`, // concentrate particles in the center 60%
      top: `${-15 + Math.random() * 30}px`, // float slightly above or below the line
      size: 1 + Math.random() * 2.5,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      yTravel: -10 - Math.random() * 25,
      xTravel: -15 + Math.random() * 30,
      opacity: 0.3 + Math.random() * 0.6,
    }));
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-10 md:py-14 flex items-center justify-center overflow-visible select-none pointer-events-none">
      
      {/* 1. Underlying Horizon Fog Glow */}
      <div className="absolute w-[40%] h-[40px] bg-[radial-gradient(circle,rgba(200,90,23,0.04)_0%,transparent_70%)] blur-md z-0 pointer-events-none" />

      {/* 2. Left side horizontal gradient line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C85A17]/30 to-[#FFD000]/60" />
      
      {/* 3. Center Luxury Emblem Symbol (A mini premium node representing Dussur's rivets/stars) */}
      <div className="relative mx-4 flex items-center justify-center shrink-0 z-10 w-9 h-9">
        {/* Outermost rotating light ring */}
        <motion.div 
          className="absolute w-6 h-6 border border-[#FFD000]/25 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        {/* Diamond Core */}
        <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD000] shadow-[0_0_8px_#FFD000]" />
        {/* Top/Bottom/Left/Right needle flares */}
        <div className="absolute w-[1px] h-4 bg-gradient-to-b from-transparent via-[#FFD000] to-transparent" />
        <div className="absolute h-[1px] w-4 bg-gradient-to-r from-transparent via-[#FFD000] to-transparent" />
      </div>

      {/* 4. Right side horizontal gradient line */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C85A17]/30 to-[#FFD000]/60" />

      {/* 5. Floating Dust Particles Stack */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FFD000]/70"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 4px rgba(255, 208, 0, 0.6)',
          }}
          animate={{
            y: [0, p.yTravel, 0],
            x: [0, p.xTravel, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
