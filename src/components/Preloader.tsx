/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const savedLang = typeof window !== 'undefined' ? (localStorage.getItem('dussur_lang') || 'ar') : 'ar';
  const isAr = savedLang === 'ar';

  const texts = isAr ? [
    "نصيغ الأفكار بوضوح",
    "نربط الطموح بالواقع",
    "نحكم الأساسات لنبني المستقبل",
    "هنا، دُسُر.. حيث يكتمل الإتقان"
  ] : [
    "Formulating ideas with absolute clarity",
    "Linking ambitions to corporate realities",
    "Governing foundations to build the future",
    "Here, Dussur.. where mastery is completed"
  ];

  useEffect(() => {
    // Dynamic cinematic timer for staggered words
    const timers: NodeJS.Timeout[] = [];
    
    texts.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setCurrentStep(index);
        }, index * 1400) // Staggered steps
      );
    });

    // Timed fade out after terms complete
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 800); // Wait for fade out animation
    }, texts.length * 1400 + 1200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#080809] z-[9999] flex flex-col justify-center items-center px-6 overflow-hidden select-none"
        >
          {/* Subtle cosmic starry backdrop overlay directly in preloader */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,90,23,0.05)_0%,transparent_60%)] pointer-events-none" />

          <div className="max-w-2xl text-center flex flex-col items-center gap-6 z-10">
            {/* Animated Text Phrases */}
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="text-2xl md:text-3xl font-semibold tracking-wide"
                >
                  {currentStep === 3 ? (
                    isAr ? (
                      <span>
                        هنا، <span className="text-[#FFD000] text-shadow-glow">دُسُر..</span> حيث <span className="text-[#FFD000]">يكتمل الإتقان</span>
                      </span>
                    ) : (
                      <span>
                        Here, <span className="text-[#FFD000] text-shadow-glow">Dussur..</span> where <span className="text-[#FFD000]">mastery is completed</span>
                      </span>
                    )
                  ) : (
                    <span className="text-[#FFF6CD]/95">{texts[currentStep]}</span>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Glowing Dussur Vector Logo Icon (Animates sequentially as text advances, completing precisely at the final statement) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: currentStep === 3 ? 1.05 : 0.95,
                filter: currentStep === 3 
                  ? "drop-shadow(0 0 40px rgba(255,208,0,0.5))" 
                  : "drop-shadow(0 0 15px rgba(255,208,0,0.15))" 
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 relative w-64 h-36 flex items-center justify-center overflow-visible"
            >
              {/* Luxury gold expanding energy rings upon completion */}
              {currentStep === 3 && (
                <>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute w-44 h-44 border border-[#FFD000]/30 rounded-full blur-xs pointer-events-none"
                  />
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1.8, opacity: [0, 0.15, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                    className="absolute w-44 h-44 border border-[#C85A17]/20 rounded-full blur-sm pointer-events-none"
                  />
                </>
              )}
              
              {/* Interactive SVG Drawing Paths */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1024 576" 
                className="w-full h-full max-w-xs object-contain overflow-visible"
              >
                <g>
                  {/* First Premium Golden Path */}
                  <motion.path
                    d="M 415.800781 84.332031 C 419.496094 83.652344 426.609375 84.179688 430.71875 84.160156 L 471.121094 84.125 C 485.109375 84.132812 501.890625 83.570312 515.476562 84.796875 C 560.226562 88.84375 599.972656 108.253906 632.34375 139.136719 C 670.320312 175.152344 692.449219 224.769531 693.875 277.085938 C 695.039062 330.644531 674.730469 382.441406 637.476562 420.941406 C 606.921875 452.78125 564.558594 474.144531 520.535156 478.917969 C 508.921875 480.175781 496.320312 480.023438 484.59375 480.007812 L 450.25 480.015625 L 378.523438 479.980469 C 363.09375 479.945312 346.972656 479.667969 331.582031 479.976562 C 331.421875 471.296875 331.574219 462.121094 331.597656 453.402344 C 346.074219 452.953125 363.164062 453.332031 377.855469 453.34375 L 461.390625 453.351562 L 490.277344 453.351562 C 503.875 453.339844 513.636719 453.527344 527.234375 451.046875 C 550.457031 446.859375 572.539062 437.820312 592.03125 424.523438 C 629.984375 398.515625 656.164062 358.605469 664.917969 313.441406 C 671.234375 279.875 667.515625 243.34375 653.480469 212.109375 C 651.839844 208.453125 648.484375 201 646.324219 197.839844 C 639.453125 184.007812 625.695312 167.601562 614.71875 156.910156 C 587.539062 130.496094 552.304688 113.933594 514.625 109.851562 C 501.316406 108.519531 484.804688 108.976562 471.132812 109.003906 C 454.503906 109.035156 437.382812 108.761719 420.792969 109.019531 C 402.894531 109.128906 385.820312 116.5625 373.539062 129.582031 C 352.300781 151.699219 351.347656 184.101562 369.101562 208.609375 C 379.800781 223.132812 396.097656 232.507812 414.03125 234.457031 C 420.375 235.121094 431.605469 234.796875 438.246094 234.792969 L 477.355469 234.785156 C 486.253906 234.769531 501.574219 234.179688 509.667969 236.152344 C 516.757812 237.882812 523.257812 241.484375 528.484375 246.578125 C 547.453125 265.046875 544.976562 299.265625 522.59375 313.894531 C 509.433594 322.5 499.46875 321.1875 484.550781 321.175781 L 453.011719 321.160156 L 331.574219 321.175781 C 331.515625 312.542969 331.539062 303.910156 331.632812 295.28125 L 445.925781 295.273438 L 480.632812 295.265625 C 487.046875 295.28125 493.765625 295.394531 500.164062 295.214844 C 504.910156 295.085938 508.691406 292.964844 511.804688 289.394531 C 514.851562 285.832031 516.355469 281.207031 515.996094 276.53125 C 515.496094 269.707031 510.765625 262.703125 504.371094 260.980469 C 499.160156 259.578125 486.535156 260.195312 480.738281 260.195312 L 440.375 260.191406 C 432.535156 260.199219 421.691406 260.53125 414.15625 259.929688 C 395.261719 258.347656 377.363281 250.78125 363.058594 238.335938 C 313.75 195.53125 323.882812 120.796875 382.5625 92.945312 C 393.296875 87.847656 403.945312 85.132812 415.800781 84.332031 Z M 415.800781 84.332031"
                    initial={{ pathLength: 0, fill: "rgba(255, 208, 0, 0)", stroke: "#FFD000", strokeWidth: 1.5 }}
                    animate={{
                      pathLength: currentStep === 0 ? 0.25 : currentStep === 1 ? 0.50 : currentStep === 2 ? 0.75 : 1.0,
                      fill: currentStep === 3 ? "rgba(255, 208, 0, 1)" : "rgba(255, 208, 0, 0)",
                      stroke: currentStep === 3 ? "rgba(255, 208, 0, 0)" : "rgba(255, 208, 0, 1)"
                    }}
                    transition={{
                      pathLength: { duration: 1.2, ease: "easeInOut" },
                      fill: { duration: 0.9, delay: currentStep === 3 ? 0.35 : 0, ease: "easeIn" },
                      stroke: { duration: 0.8 }
                    }}
                  />

                  {/* Second Premium Golden Path */}
                  <motion.path
                    d="M 417.550781 134.410156 C 418.652344 134.253906 420.152344 134.164062 421.269531 134.164062 C 438.554688 134.199219 455.894531 134.066406 473.175781 134.140625 C 486.058594 134.195312 499.914062 133.679688 512.652344 134.867188 C 546.246094 137.992188 576.152344 152.507812 600.210938 175.921875 C 627.21875 202.367188 642.710938 238.398438 643.320312 276.195312 C 644.285156 352.257812 589.082031 418.242188 512.261719 425.433594 C 502.472656 426.351562 492.050781 426 482.199219 425.957031 L 442.675781 425.941406 L 359.167969 426.039062 C 349.925781 426.070312 340.90625 425.808594 331.566406 425.929688 C 331.511719 418.207031 331.28125 407.175781 331.753906 399.65625 C 342.433594 399.417969 353.832031 399.625 364.5625 399.582031 L 462.089844 399.507812 L 490.648438 399.507812 C 499.808594 399.507812 508.183594 399.648438 517.265625 398.246094 C 530.78125 398.246094 543.800781 391.449219 555.722656 384.707031 C 583.820312 368.960938 604.484375 342.660156 613.132812 311.632812 C 629.246094 252.699219 600.246094 190.539062 542.9375 167.84375 C 537.144531 165.550781 531.566406 163.964844 525.554688 162.335938 C 508.003906 157.941406 488.410156 159.585938 470.4375 159.355469 C 463.460938 159.265625 456.433594 159.300781 449.453125 159.285156 L 430.488281 159.261719 C 424.324219 159.257812 415.960938 158.300781 411.261719 162.902344 C 408.867188 165.292969 407.5 168.523438 407.457031 171.90625 C 407.417969 178.394531 412.546875 183.914062 418.859375 184.097656 C 424.820312 184.269531 430.996094 184.210938 436.953125 184.207031 L 479.511719 184.167969 C 491.886719 184.160156 504.859375 183.605469 516.972656 186.015625 C 534.828125 189.519531 551.261719 198.207031 564.214844 210.992188 C 582.035156 228.773438 592.09375 252.882812 592.1875 278.054688 C 592.324219 302.886719 582.65625 326.769531 565.285156 344.515625 C 552.398438 357.59375 538.167969 366.195312 520.277344 370.9375 C 508.023438 374.183594 494.613281 373.441406 481.886719 373.445312 L 447.789062 373.445312 L 331.558594 373.460938 L 331.597656 347.082031 L 442.628906 347.140625 L 481.203125 347.136719 C 488.480469 347.144531 496.808594 347.304688 504.011719 346.960938 C 521.160156 346.140625 539.140625 336.207031 550.371094 323.261719 C 562.28125 309.421875 568.132812 291.375 566.609375 273.175781 C 565.628906 259.386719 560.613281 246.191406 552.179688 235.234375 C 542.667969 222.957031 527.980469 213.96875 512.835938 210.742188 C 504.109375 208.882812 491.332031 209.546875 481.945312 209.550781 L 435.976562 209.550781 C 428.515625 209.558594 418.285156 209.898438 411.308594 208.3125 C 405.308594 206.925781 399.742188 204.078125 395.101562 200.027344 C 387.539062 193.476562 382.960938 184.136719 382.417969 174.144531 C 381.824219 164.113281 385.210938 154.25 391.839844 146.695312 C 398.414062 139.3125 407.679688 134.886719 417.550781 134.410156 Z M 417.550781 134.410156"
                    initial={{ pathLength: 0, fill: "rgba(255, 208, 0, 0)", stroke: "#FFD000", strokeWidth: 1.5 }}
                    animate={{
                      pathLength: currentStep === 0 ? 0.25 : currentStep === 1 ? 0.50 : currentStep === 2 ? 0.75 : 1.0,
                      fill: currentStep === 3 ? "rgba(255, 208, 0, 1)" : "rgba(255, 208, 0, 0)",
                      stroke: currentStep === 3 ? "rgba(255, 208, 0, 0)" : "rgba(255, 208, 0, 1)"
                    }}
                    transition={{
                      pathLength: { duration: 1.2, ease: "easeInOut" },
                      fill: { duration: 0.9, delay: currentStep === 3 ? 0.35 : 0, ease: "easeIn" },
                      stroke: { duration: 0.8 }
                    }}
                  />
                </g>
              </svg>
            </motion.div>

            {/* Glowing hint indicators */}
            <div className="flex gap-2.5 mt-10 justify-center">
              {texts.map((_, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: currentStep === index ? 1.3 : 1,
                    backgroundColor: currentStep === index ? "#FFD000" : "rgba(255,246,205,0.15)",
                    boxShadow: currentStep === index ? "0 0 10px #FFD000" : "none"
                  }}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
