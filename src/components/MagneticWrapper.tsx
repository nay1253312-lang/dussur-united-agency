import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface MagneticWrapperProps {
  children: React.ReactElement;
  range?: number; // Distance threshold to attract
  strength?: number; // How much the button translates (0.1 - 0.5)
}

export default function MagneticWrapper({ children, range = 35, strength = 0.35 }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Set up spring physics for ultra-smooth buttery transition
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const mX = useSpring(0, springConfig);
  const mY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    
    // Relative coordinates to element center
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    
    // If we're hovering within our bounding area
    mX.set(x * strength);
    mY.set(y * strength);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mX.set(0);
    mY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mX,
        y: mY,
      }}
      className="inline-block relative"
    >
      {/* Visual background ripple aura when hovered */}
      {isHovered && (
        <motion.div
          layoutId="nav-bg-aura"
          className="absolute -inset-x-3 -inset-y-2.5 bg-gradient-to-r from-[#C85A17]/10 to-[#FFD000]/10 border border-[#FFD000]/5 rounded-xl -z-10 blur-[1px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        />
      )}
      {children}
    </motion.div>
  );
}
