import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate, PanInfo, MotionValue } from 'framer-motion';
import CopperRoller from './CopperRoller';
import { ChevronUp, ChevronDown, LucideIcon } from 'lucide-react';

interface TapeSelectorProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

interface TapeItemProps {
  num: number;
  index: number;
  y: MotionValue<number>;
}

const ITEM_HEIGHT = 100; 

// Enhanced Photorealistic Screw Head
const Screw = ({ className, rotation = 45, type = 'steel' }: { className?: string, rotation?: number, type?: 'steel' | 'black' }) => (
  <div className={`absolute w-[5px] h-[5px] rounded-full flex items-center justify-center z-50 ${className} 
    ${type === 'steel' 
      ? 'bg-gradient-to-br from-[#f0f0f0] via-[#b0b5bd] to-[#5a6270] shadow-[0_0.04px_0.14px_rgba(0,0,0,0.8),0_0.03px_0.08px_rgba(0,0,0,0.5),inset_0_0.03px_0.08px_rgba(255,255,255,1),inset_0_-0.03px_0.08px_rgba(0,0,0,0.3)] ring-[0.02px] ring-black/60' 
      : 'bg-gradient-to-br from-[#4a4a52] to-[#0a0a0c] shadow-[0_0.03px_0.12px_rgba(0,0,0,0.9),inset_0_0.03px_0.08px_rgba(255,255,255,0.35)] ring-[0.02px] ring-black'}
  `}>
      <div className="w-full h-full rounded-full flex items-center justify-center opacity-95" style={{ transform: `rotate(${rotation}deg)` }}>
         {/* The Cross Indent */}
         <div className="relative w-[3px] h-[3px] rounded-full shadow-[inset_0.5px_0.5px_1px_rgba(0,0,0,1),inset_-0.2px_-0.2px_0.3px_rgba(255,255,255,0.2)]">
            <div className="absolute top-1/2 left-1/2 w-[100%] h-[0.7px] bg-gradient-to-r from-[#0a0a0a] via-[#050505] to-[#0a0a0a] -translate-x-1/2 -translate-y-1/2 shadow-[0_0.1px_0.2px_rgba(255,255,255,0.15)]" />
            <div className="absolute top-1/2 left-1/2 w-[100%] h-[0.7px] bg-gradient-to-r from-[#0a0a0a] via-[#050505] to-[#0a0a0a] -translate-x-1/2 -translate-y-1/2 rotate-90 shadow-[0_0.1px_0.2px_rgba(255,255,255,0.15)]" />
         </div>
      </div>
  </div>
);

// Small Mechanical Gear Component with Realistic 3D Teeth
const SmallGear = ({ className, rotation, size = 16 }: { className?: string, rotation: MotionValue<number>, size?: number }) => {
  const teethCount = size > 16 ? 10 : 8;
  const toothAngle = 360 / teethCount;
  
  return (
    <motion.div 
      className={`absolute ${className}`}
      style={{ rotate: rotation }}
    >
      {/* Outer ring with gear teeth cutouts */}
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        {/* Main gear body with enhanced 3D effect */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, #7a7a7a 0%, #5a5a5a 25%, #3a3a3a 60%, #1a1a1a 100%)`,
            boxShadow: `
              0 3px 6px rgba(0,0,0,0.9),
              0 1px 2px rgba(0,0,0,0.7),
              inset 0 1px 2px rgba(255,255,255,0.4),
              inset 0 -2px 3px rgba(0,0,0,0.6),
              inset -2px -2px 4px rgba(0,0,0,0.5)
            `
          }}
        >
          {/* Machined surface texture */}
          <div className="absolute inset-0 rounded-full opacity-30 bg-noise mix-blend-overlay" />
          
          {/* Circular brushed metal effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: `repeating-conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.1) 1deg, transparent 2deg)`
            }}
          />
          
          {/* Top highlight for 3D depth */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)`
            }}
          />
        </div>
        
        {/* Realistic gear teeth - positioned around perimeter */}
        {[...Array(teethCount)].map((_, i) => {
          const angle = i * toothAngle;
          const radius = size / 2;
          const toothHeight = size * 0.28; // Taller teeth
          const toothWidthTop = size * 0.15; // Wider at tip
          const toothWidthBase = size * 0.22; // Even wider at base
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: `${toothWidthBase}px`,
                height: `${toothHeight}px`,
                left: '50%',
                top: `-${toothHeight * 0.65}px`, // Position teeth extending outward
                transformOrigin: `center ${radius + toothHeight * 0.65}px`,
                transform: `translateX(-50%) rotate(${angle}deg)`,
              }}
            >
              {/* Tooth body with realistic involute-like profile */}
              <div 
                className="relative w-full h-full"
                style={{
                  background: `linear-gradient(to bottom, 
                    #7a7a7a 0%, 
                    #6a6a6a 15%,
                    #5a5a5a 35%, 
                    #4a4a4a 60%, 
                    #3a3a3a 85%,
                    #2a2a2a 100%
                  )`,
                  clipPath: `polygon(
                    ${(50 - (toothWidthTop/toothWidthBase * 50))}% 0%, 
                    ${(50 + (toothWidthTop/toothWidthBase * 50))}% 0%, 
                    95% 70%,
                    100% 85%,
                    100% 100%, 
                    0% 100%,
                    0% 85%,
                    5% 70%
                  )`,
                  boxShadow: `
                    -1px 0 2px rgba(0,0,0,0.9),
                    1px 0 2px rgba(0,0,0,0.9),
                    0 1px 2px rgba(0,0,0,0.8)
                  `,
                  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))'
                }}
              >
                {/* Left edge highlight (catching light) */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-[40%]"
                  style={{
                    background: 'linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                    clipPath: `polygon(
                      ${(50 - (toothWidthTop/toothWidthBase * 50))}% 0%, 
                      50% 0%, 
                      50% 70%,
                      5% 70%,
                      0% 85%,
                      0% 100%
                    )`
                  }}
                />
                
                {/* Right edge shadow */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-[40%]"
                  style={{
                    background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                    clipPath: `polygon(
                      50% 0%,
                      ${(50 + (toothWidthTop/toothWidthBase * 50))}% 0%, 
                      100% 85%,
                      100% 100%,
                      50% 100%,
                      50% 70%,
                      95% 70%
                    )`
                  }}
                />
                
                {/* Top edge chamfer highlight */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[20%]"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                    clipPath: `polygon(
                      ${(50 - (toothWidthTop/toothWidthBase * 50))}% 0%, 
                      ${(50 + (toothWidthTop/toothWidthBase * 50))}% 0%, 
                      80% 100%,
                      20% 100%
                    )`
                  }}
                />
                
                {/* Root fillet shadow */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[25%]"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          );
        })}
        
        {/* Center hub with detailed 3D effect */}
        <div 
          className="absolute rounded-full"
          style={{
            inset: `${size * 0.30}px`,
            background: `radial-gradient(circle at 35% 35%, #4a4a4a 0%, #2a2a2a 50%, #0a0a0a 100%)`,
            boxShadow: `
              inset 0 2px 4px rgba(0,0,0,0.95),
              inset 0 -1px 2px rgba(255,255,255,0.1),
              0 1px 2px rgba(255,255,255,0.15)
            `
          }}
        >
          {/* Hub rim */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.2)'
            }}
          />
          
          {/* Center shaft hole */}
          <div 
            className="absolute rounded-full bg-black"
            style={{
              inset: `${size * 0.08}px`,
              boxShadow: `
                inset 0 1px 2px rgba(0,0,0,1),
                inset 0 0 1px rgba(0,0,0,0.8)
              `
            }}
          />
          
          {/* Hub highlight */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)'
            }}
          />
        </div>
        
        {/* Outer edge bevel for depth */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.1), inset 0 0 3px rgba(0,0,0,0.5)'
          }}
        />
      </div>
    </motion.div>
  );
};

// Tension Spring Component
const TensionSpring = ({ className, vertical = false }: { className?: string, vertical?: boolean }) => (
  <div className={`absolute ${className} ${vertical ? 'flex flex-col' : 'flex flex-row'} items-center justify-between`}>
    {/* End caps */}
    <div className="w-[3px] h-[3px] rounded-full bg-gradient-to-br from-[#888] to-[#333] shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
    {/* Coil segments */}
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-[1px] flex-1`}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`${vertical ? 'w-full h-[2px]' : 'w-[2px] h-full'} bg-gradient-to-${vertical ? 'r' : 'b'} from-[#666] via-[#999] to-[#666] shadow-[0_0.5px_1px_rgba(0,0,0,0.6)]`} />
      ))}
    </div>
    <div className="w-[3px] h-[3px] rounded-full bg-gradient-to-br from-[#888] to-[#333] shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
  </div>
);

// Connecting Rod Component
const ConnectingRod = ({ className, width = 30, angle = 0 }: { className?: string, width?: number, angle?: number }) => (
  <div className={`absolute ${className}`} style={{ transform: `rotate(${angle}deg)` }}>
    <div 
      className="h-[3px] bg-gradient-to-r from-[#4a4a4a] via-[#6a6a6a] to-[#4a4a4a] shadow-[0_1px_2px_rgba(0,0,0,0.8),inset_0_0.5px_1px_rgba(255,255,255,0.2)] rounded-full"
      style={{ width: `${width}px` }}
    >
      {/* End pivots */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-gradient-to-br from-[#888] to-[#333] shadow-[0_1px_2px_rgba(0,0,0,0.9),inset_0_0.5px_1px_rgba(255,255,255,0.3)]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-gradient-to-br from-[#888] to-[#333] shadow-[0_1px_2px_rgba(0,0,0,0.9),inset_0_0.5px_1px_rgba(255,255,255,0.3)]" />
    </div>
  </div>
);

// Liquid Metal Button Component
const MechanicalButton = ({ 
  onClick, 
  disabled, 
  icon: Icon 
}: { 
  onClick: () => void; 
  disabled: boolean; 
  icon: LucideIcon;
}) => {
  
  const handlePress = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(25);
      } catch (e) {}
    }
    onClick();
  };

  return (
    <div className="relative w-[80px] h-[80px] flex items-center justify-center group/container">
        
        {/* Animated Liquid Metal Border - Appears on Hover/Active */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover/container:opacity-100 group-active/container:opacity-100 transition-opacity duration-700">
          {/* Base flowing metallic gradient - smooth chrome foundation */}
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'conic-gradient(from 0deg, #454b56 0deg, #525965 15deg, #606a78 30deg, #6e7a88 45deg, #7c8896 60deg, #8a95a3 75deg, #96a0ad 90deg, #9fa8b5 105deg, #96a0ad 120deg, #8a95a3 135deg, #7c8896 150deg, #6e7a88 165deg, #606a78 180deg, #525965 195deg, #454b56 210deg, #525965 225deg, #606a78 240deg, #6e7a88 255deg, #7c8896 270deg, #8a95a3 285deg, #96a0ad 300deg, #9fa8b5 315deg, #96a0ad 330deg, #8a95a3 345deg)',
                 animation: 'shimmerFlow 18s ease-in-out infinite'
               }}>
          </div>
          
          {/* Mercury flow layer 1 - main highlight with smooth transition */}
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'conic-gradient(from 0deg, transparent 0deg, transparent 162deg, rgba(110,125,155,0.25) 166deg, rgba(135,155,185,0.45) 170deg, rgba(165,185,215,0.65) 174deg, rgba(195,215,240,0.82) 177deg, rgba(220,235,250,0.93) 179deg, rgba(240,248,255,1) 180deg, rgba(250,253,255,1) 180.5deg, rgba(240,248,255,1) 181deg, rgba(220,235,250,0.93) 183deg, rgba(195,215,240,0.82) 185deg, rgba(165,185,215,0.65) 188deg, rgba(135,155,185,0.45) 192deg, rgba(110,125,155,0.25) 196deg, transparent 200deg)',
                 animation: 'spin 8s ease-in-out infinite'
               }}>
          </div>
          
          {/* Mercury flow layer 2 - counter-flowing shimmer */}
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'conic-gradient(from 90deg, transparent 0deg, transparent 342deg, rgba(120,140,170,0.35) 347deg, rgba(155,175,205,0.55) 351deg, rgba(190,210,235,0.75) 354deg, rgba(215,230,248,0.88) 356deg, rgba(235,245,255,0.96) 358deg, rgba(245,252,255,1) 0deg, rgba(235,245,255,0.96) 2deg, rgba(215,230,248,0.88) 4deg, rgba(190,210,235,0.75) 6deg, rgba(155,175,205,0.55) 9deg, rgba(120,140,170,0.35) 13deg, transparent 18deg)',
                 animation: 'spin 11s ease-in-out infinite reverse'
               }}>
          </div>
          
          {/* Fast flowing highlight streak - sharp metallic edge */}
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'conic-gradient(from 180deg, transparent 0deg, transparent 354deg, rgba(230,240,250,0.4) 356deg, rgba(245,250,255,0.7) 357.5deg, rgba(255,255,255,0.95) 359deg, rgba(255,255,255,1) 0deg, rgba(255,255,255,0.95) 1deg, rgba(245,250,255,0.7) 2.5deg, rgba(230,240,250,0.4) 4deg, transparent 6deg)',
                 animation: 'spin 6s linear infinite',
                 filter: 'blur(0.5px)'
               }}>
          </div>
          
          {/* Tertiary flow - adds depth and complexity */}
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'conic-gradient(from 270deg, transparent 0deg, transparent 267deg, rgba(140,160,190,0.3) 269deg, rgba(180,200,225,0.5) 271deg, rgba(210,225,245,0.7) 272.5deg, rgba(230,240,252,0.85) 274deg, transparent 276deg)',
                 animation: 'spin 14s ease-in-out infinite'
               }}>
          </div>
          
          {/* Chromatic dispersion - refined optical effect */}
          <div className="absolute inset-0 rounded-full opacity-50"
               style={{
                 background: 'conic-gradient(from 0deg, transparent 0deg, transparent 176.5deg, rgba(255,145,90,0.35) 177.5deg, rgba(255,180,130,0.22) 178.5deg, rgba(255,210,170,0.12) 179deg, transparent 179.5deg, rgba(170,210,255,0.12) 180.5deg, rgba(130,180,255,0.22) 181.5deg, rgba(90,145,255,0.35) 182.5deg, transparent 183.5deg, transparent 360deg)',
                 animation: 'spin 8s ease-in-out infinite'
               }}>
          </div>
          
          {/* Animated glow wash - pulsing depth */}
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'radial-gradient(circle, transparent 38%, rgba(185,205,235,0.12) 43%, rgba(165,190,225,0.2) 46%, rgba(145,175,215,0.18) 49%, transparent 54%)',
                 animation: 'pulse 4s ease-in-out infinite'
               }}>
          </div>
          
          {/* Surface ripple effect - organic movement */}
          <div className="absolute inset-0 rounded-full opacity-25"
               style={{
                 background: 'conic-gradient(from 0deg, rgba(255,255,255,0.12) 0deg, rgba(255,255,255,0.08) 15deg, transparent 25deg, rgba(255,255,255,0.06) 55deg, transparent 65deg, rgba(255,255,255,0.12) 90deg, rgba(255,255,255,0.08) 105deg, transparent 115deg, rgba(255,255,255,0.06) 145deg, transparent 155deg, rgba(255,255,255,0.12) 180deg, rgba(255,255,255,0.08) 195deg, transparent 205deg, rgba(255,255,255,0.06) 235deg, transparent 245deg, rgba(255,255,255,0.12) 270deg, rgba(255,255,255,0.08) 285deg, transparent 295deg, rgba(255,255,255,0.06) 325deg, transparent 335deg)',
                 animation: 'spin 22s linear infinite reverse'
               }}>
          </div>
          
          {/* Outer rim glow - subtle edge enhancement */}
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'radial-gradient(circle, transparent 46%, rgba(200,220,245,0.15) 48%, rgba(180,205,235,0.08) 49.5%, transparent 51%)',
                 animation: 'pulse 6s ease-in-out infinite'
               }}>
          </div>
        </div>
        
        {/* Static subtle border when idle */}
        <div className="absolute inset-0 rounded-full opacity-100 group-hover/container:opacity-0 transition-opacity duration-500"
             style={{
               background: 'linear-gradient(135deg, #9099a8 0%, #6a7280 25%, #4a5160 50%, #6a7280 75%, #9099a8 100%)'
             }}>
        </div>

        {/* Inner Dark Background */}
        <div className="absolute inset-[3px] rounded-full 
                        bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]
                        shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)]">
        </div>

        {/* Button Surface */}
        <button
          onClick={handlePress}
          disabled={disabled}
          className="relative w-[68px] h-[68px] rounded-full z-20
            bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f]
            shadow-[0_3px_0_#0a0a0a,0_5px_16px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.8)]
            active:translate-y-[3px]
            active:shadow-[0_0_0_#0a0a0a,0_2px_8px_rgba(0,0,0,0.4),inset_0_2px_8px_rgba(0,0,0,0.9)]
            hover:from-[#2f2f2f] hover:via-[#1f1f1f] hover:to-[#141414]
            focus:outline-none 
            focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black
            disabled:opacity-30 disabled:cursor-not-allowed 
            disabled:active:translate-y-0 
            disabled:active:shadow-[0_3px_0_#0a0a0a,0_5px_16px_rgba(0,0,0,0.6)]
            transition-all duration-100 ease-out
            flex items-center justify-center
            group/btn
            border-t border-white/5"
        >
            {/* Inner glow ring */}
            <div className="absolute inset-[6px] rounded-full 
                            bg-gradient-to-b from-[#222] to-transparent
                            shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.05)]
                            pointer-events-none">
            </div>
            
            {/* Center highlight spot */}
            <div className="absolute top-[15%] left-[30%] w-[40%] h-[30%] 
                            bg-gradient-to-br from-white/10 to-transparent 
                            rounded-full blur-xl pointer-events-none">
            </div>

            {/* Icon */}
            <Icon 
              className="relative text-[#e8e8e8] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] 
                         transition-all duration-150
                         group-hover/btn:text-[#ffffff] 
                         group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
                         group-active/btn:text-[#cccccc]
                         group-active/btn:translate-y-[1px]
                         z-10" 
              size={28} 
              strokeWidth={3} 
            />
        </button>
        
        {/* Outer glow on hover */}
        <div className="absolute inset-[-8px] rounded-full opacity-0 group-hover/container:opacity-100 
                        transition-opacity duration-300
                        bg-gradient-to-b from-white/5 to-transparent
                        blur-xl pointer-events-none">
        </div>
    </div>
  );
};

const TapeItem: React.FC<TapeItemProps> = ({ num, index, y }) => {
  const relativeY = useTransform(y, (latest) => latest + index * ITEM_HEIGHT);
  
  // 3D Cylinder Math
  const rotateX = useTransform(relativeY, [-ITEM_HEIGHT * 2, 0, ITEM_HEIGHT * 2], [70, 0, -70]);
  const z = useTransform(relativeY, [-ITEM_HEIGHT * 2, 0, ITEM_HEIGHT * 2], [-80, 0, -80]);
  const opacity = useTransform(relativeY, [-ITEM_HEIGHT * 1.5, 0, ITEM_HEIGHT * 1.5], [0, 1, 0]);
  const scale = useTransform(relativeY, [-ITEM_HEIGHT * 2, 0, ITEM_HEIGHT * 2], [0.85, 1, 0.85]);
  const brightness = useTransform(relativeY, [-ITEM_HEIGHT, 0, ITEM_HEIGHT], [0.5, 1, 0.5]);

  // Typography Styles
  const textColor = useTransform(relativeY, [-20, 0, 20], ["#444", "#000", "#444"]);
  const fontWeight = useTransform(relativeY, [-20, 0, 20], [400, 700, 400]);

  return (
    <motion.div 
        className="h-[100px] w-[90px] flex items-center justify-center absolute left-0 right-0 mx-auto"
        style={{ 
          y: relativeY,
          rotateX, 
          z, 
          opacity, 
          scale,
          filter: useTransform(brightness, b => `brightness(${b})`),
          transformStyle: "preserve-3d"
        }}
    >
       {/* Paper Tape Segment */}
       <div className="absolute inset-0 bg-[#f7f6f2] shadow-[inset_0_0_15px_rgba(0,0,0,0.06)] backface-hidden overflow-hidden rounded-[1px]">
          
          {/* --- TEXTURE LAYERS --- */}
          
          {/* 1. Base Noise (Grain) */}
          <div className="absolute inset-0 bg-noise opacity-[0.2] mix-blend-multiply contrast-150" />
          
          {/* 2. Paper Fibers (Subtle diagonal pattern) */}
          <div className="absolute inset-0 opacity-[0.1]" 
               style={{ 
                 backgroundImage: `repeating-linear-gradient(
                   45deg, 
                   transparent 0px, 
                   transparent 2px, 
                   #a19d96 2px, 
                   #a19d96 3px
                 )` 
               }} 
          />

          {/* 3. Random Blotches/Stains (Organic feel) */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#e6e2d8]/30 to-transparent mix-blend-multiply" />
          
          
          {/* --- EDGE FRAYING --- */}
          {/* Left Fray */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-r from-[#e0ddd5] to-transparent z-10" />
          <div className="absolute left-[1px] top-0 bottom-0 w-[1px] border-l border-dashed border-[#cdc9c0] opacity-60" />

          {/* Right Fray */}
          <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-l from-[#e0ddd5] to-transparent z-10" />
          <div className="absolute right-[1px] top-0 bottom-0 w-[1px] border-r border-dashed border-[#cdc9c0] opacity-60" />


          {/* --- CONTENT --- */}

          {/* Micro-ruling lines for scale reference */}
          <div className="absolute top-[10%] w-[3px] h-[1px] bg-[#666]/30 right-1.5" />
          <div className="absolute top-[20%] w-[3px] h-[1px] bg-[#666]/30 right-1.5" />
          <div className="absolute top-[30%] w-[3px] h-[1px] bg-[#666]/30 right-1.5" />
          <div className="absolute top-[40%] w-[3px] h-[1px] bg-[#666]/30 right-1.5" />
          <div className="absolute bottom-[10%] w-[3px] h-[1px] bg-[#666]/30 right-1.5" />
          <div className="absolute bottom-[20%] w-[3px] h-[1px] bg-[#666]/30 right-1.5" />
          <div className="absolute bottom-[30%] w-[3px] h-[1px] bg-[#666]/30 right-1.5" />
          <div className="absolute bottom-[40%] w-[3px] h-[1px] bg-[#666]/30 right-1.5" />

          {/* Divider Lines (Softened) */}
          <div className="absolute top-0 w-full h-[1px] bg-[#d1cec5]/60" />
          <div className="absolute bottom-0 w-full h-[1px] bg-[#d1cec5]/60" />
       </div>

       {/* The Number - Ink Bleed Effect */}
       <motion.span 
         style={{ 
             color: textColor, 
             fontWeight: fontWeight,
             textShadow: '0 0 1px rgba(0,0,0,0.1)' // Slight ink spread
         }}
         className="relative z-20 font-inter text-6xl tracking-tighter mix-blend-multiply opacity-90"
       >
         {num}
       </motion.span>
    </motion.div>
  );
};

export default function TapeSelector({ value, onChange, min = 1, max = 10 }: TapeSelectorProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Initial Value Setup
  const y = useMotionValue(-(value - min) * ITEM_HEIGHT);
  
  // Physics Spring
  const ySpring = useSpring(y, { 
    stiffness: 350, 
    damping: 35, 
    mass: 0.8 
  });

  useEffect(() => {
    if (!isDragging) {
      animate(y, -(value - min) * ITEM_HEIGHT, { type: "spring", stiffness: 350, damping: 35, mass: 0.8 });
    }
  }, [value, isDragging, min, y]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const currentY = y.get();
    const rawIndex = -currentY / ITEM_HEIGHT;
    let clampedIndex = Math.round(rawIndex);
    if (clampedIndex < 0) clampedIndex = 0;
    if (clampedIndex > max - min) clampedIndex = max - min;
    onChange(clampedIndex + min);
  };

  const increment = () => { if (value < max) onChange(value + 1); };
  const decrement = () => { if (value > min) onChange(value - 1); };

  return (
    <div className="flex items-center justify-center p-6 perspective-1000">
      
      {/* 
          MAIN CONTAINER (The High-End Housing) 
      */}
      <div className="relative h-[220px] pl-8 pr-8 rounded-[32px] flex items-center gap-8
                      bg-gradient-to-b from-[#3a3a3a] via-[#2e2e2e] to-[#252525]
                      shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_15px_30px_-10px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3)]
                      border border-[#4a4a4a]">
        
        {/* Housing Texture */}
        <div className="absolute inset-0 rounded-[32px] opacity-20 pointer-events-none bg-noise mix-blend-overlay" />
        
        {/* 
            === COMPONENT 1: MECHANICAL CORE (LEFT) === 
        */}
        <div className="relative w-[240px] h-[180px] bg-[#141414] rounded-[12px] 
                        shadow-[inset_0_3px_10px_rgba(0,0,0,1),0_5px_10px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.15)] 
                        flex items-center justify-between px-2 overflow-hidden shrink-0 z-10 border border-[#2a2a2a]">
            
            {/* Chassis Screws - Precisely positioned in corners */}
            <Screw className="top-[6px] right-[6px]" rotation={45} type="steel" />
            <Screw className="top-[6px] left-[6px]" rotation={135} type="steel" />
            <Screw className="bottom-[6px] right-[6px]" rotation={-45} type="steel" />
            <Screw className="bottom-[6px] left-[6px]" rotation={-135} type="steel" />

            <div className="absolute inset-0 bg-[#080808] opacity-100">
                <div className="absolute inset-0 bg-noise opacity-15" />
            </div>

            {/* === MECHANICAL LINKAGE SYSTEM === */}
            {/* Small rotating gears - left side */}
            <SmallGear 
              className="top-[25px] left-[64px] z-30" 
              rotation={useTransform(ySpring, (v) => v * -2)} 
              size={14} 
            />
            <SmallGear 
              className="top-[40px] left-[56px] z-30" 
              rotation={useTransform(ySpring, (v) => v * 2.5)} 
              size={18} 
            />
            <SmallGear 
              className="bottom-[40px] left-[56px] z-30" 
              rotation={useTransform(ySpring, (v) => v * -2.5)} 
              size={18} 
            />
            <SmallGear 
              className="bottom-[25px] left-[64px] z-30" 
              rotation={useTransform(ySpring, (v) => v * 2)} 
              size={14} 
            />
            
            {/* Small rotating gears - right side */}
            <SmallGear 
              className="top-[25px] right-[64px] z-30" 
              rotation={useTransform(ySpring, (v) => v * 2)} 
              size={14} 
            />
            <SmallGear 
              className="top-[40px] right-[56px] z-30" 
              rotation={useTransform(ySpring, (v) => v * -2.5)} 
              size={18} 
            />
            <SmallGear 
              className="bottom-[40px] right-[56px] z-30" 
              rotation={useTransform(ySpring, (v) => v * 2.5)} 
              size={18} 
            />
            <SmallGear 
              className="bottom-[25px] right-[64px] z-30" 
              rotation={useTransform(ySpring, (v) => v * -2)} 
              size={14} 
            />
            
            {/* Connecting rods - create linkage system */}
            <ConnectingRod className="top-[32px] left-[60px] z-25" width={25} angle={15} />
            <ConnectingRod className="top-[32px] right-[60px] z-25" width={25} angle={-15} />
            <ConnectingRod className="bottom-[32px] left-[60px] z-25" width={25} angle={-15} />
            <ConnectingRod className="bottom-[32px] right-[60px] z-25" width={25} angle={15} />
            
            {/* Vertical support springs */}
            <TensionSpring className="top-[50px] left-[48px] w-[3px] h-[30px] z-25" vertical={true} />
            <TensionSpring className="top-[50px] right-[48px] w-[3px] h-[30px] z-25" vertical={true} />

            {/* --- LEFT ROLLER --- */}
            <div className="relative z-20 h-[140px] w-[54px] -mr-4 filter drop-shadow-[4px_0_8px_rgba(0,0,0,0.8)]">
                <CopperRoller y={ySpring} side="left" />
            </div>

            {/* --- CENTER: THE LENS ASSEMBLY --- */}
            <div className="relative z-30 w-[120px] h-[130px] shrink-0">
                 
                 {/* 1. Metal Bezel Frame */}
                 <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-[#444]">
                    <div className="absolute inset-[1px] rounded-[15px] border border-white/5" />
                 </div>

                 {/* 2. Inner Lens Housing */}
                 <div className="absolute inset-[8px] rounded-[12px] bg-black shadow-[inset_0_3px_6px_rgba(0,0,0,1)] overflow-hidden">
                     
                     {/* 3. The Tape Container */}
                     <div className="absolute inset-0 [perspective:800px] flex items-center justify-center">
                        <div className="w-full h-full relative [transform-style:preserve-3d]">
                             {/* Tape Content */}
                             {Array.from({ length: max - min + 1 }).map((_, i) => {
                                const num = min + i;
                                return <TapeItem key={num} num={num} index={i} y={ySpring} />;
                            })}
                        </div>
                     </div>

                     {/* 4. Vignette */}
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)] pointer-events-none z-20" />
                     
                     {/* 5. Glass Lens Reflection */}
                     <div className="absolute inset-0 z-30 pointer-events-none rounded-[12px] ring-1 ring-white/10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay" />
                        <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-45 transform translate-y-12 blur-[2px]" />
                        <div className="absolute top-2 left-3 right-3 h-[15px] rounded-[50%] bg-gradient-to-b from-white/30 to-transparent blur-[6px]" />
                     </div>
                 </div>

                 <motion.div 
                    className="absolute inset-0 cursor-grab active:cursor-grabbing z-50"
                    style={{ y }} 
                    drag="y"
                    dragConstraints={{ top: -(max - min) * ITEM_HEIGHT, bottom: 0 }}
                    dragElastic={0.15}
                    dragMomentum={true}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                 />
            </div>

            {/* --- RIGHT ROLLER --- */}
            <div className="relative z-20 h-[140px] w-[54px] -ml-4 filter drop-shadow-[-4px_0_8px_rgba(0,0,0,0.8)]">
                <CopperRoller y={ySpring} side="right" />
            </div>
        </div>

        {/* 
            === COMPONENT 2: INDUSTRIAL BUTTONS (CENTER) === 
            Updated to use MechanicalButton
        */}
        <div className="flex flex-col gap-5 z-20 shrink-0">
             <MechanicalButton 
                onClick={decrement} 
                disabled={value <= min} 
                icon={ChevronUp} 
             />
             <MechanicalButton 
                onClick={increment} 
                disabled={value >= max} 
                icon={ChevronDown} 
             />
        </div>

        {/* 
            === COMPONENT 3: HEAVY METAL ACTION PLATE (RIGHT) === 
        */}
        <div className="relative w-[150px] h-[180px] bg-[#1e1e1e] rounded-[10px] 
                        shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_24px_rgba(0,0,0,0.25)] 
                        flex flex-col items-center justify-center border-t border-l border-white/10 border-b border-black z-20 shrink-0">
            
            {/* Dark Brushed Metal Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#000_2px,#000_3px)]" />
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_50%,rgba(0,0,0,0.3)_100%)]" />

            {/* Screws - Properly positioned at corners */}
            <Screw className="top-[8px] left-[8px] w-[4px] h-[4px]" rotation={45} type="steel" />
            <Screw className="top-[8px] right-[8px] w-[4px] h-[4px]" rotation={135} type="steel" />
            <Screw className="bottom-[8px] left-[8px] w-[4px] h-[4px]" rotation={-135} type="steel" />
            <Screw className="bottom-[8px] right-[8px] w-[4px] h-[4px]" rotation={-45} type="steel" />

            {/* Content */}
            <div className="flex flex-col items-center gap-1 z-10 w-full px-4">
                
                <div className="relative mb-3">
                   <span className="text-[10px] font-bold text-[#777] tracking-[0.25em] uppercase">Quantity</span>
                   <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[24px] h-[2px] bg-orange-600 rounded-full shadow-[0_0_8px_rgba(234,88,12,0.6)]" />
                </div>

                <div className="w-full h-[1px] bg-[#333] shadow-[0_1px_0_rgba(255,255,255,0.05)] mb-4" />

                <div className="flex flex-col items-center relative group cursor-pointer">
                    <span className="text-xl font-black text-[#d4d4d4] tracking-wider drop-shadow-md transition-colors group-hover:text-white">ADD TO</span>
                    <span className="text-4xl font-black text-orange-500 tracking-widest drop-shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all group-hover:drop-shadow-[0_0_30px_rgba(249,115,22,0.7)] group-hover:text-orange-400">CART</span>
                </div>
            </div>

            {/* LED Status Indicator - Precise placement */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
                <div className="w-[6px] h-[6px] rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(0,0,0,1)] border border-[#333]"></div>
                <div className="w-[8px] h-[8px] rounded-full bg-green-500 shadow-[0_0_6px_#22c55e,inset_0_-1px_2px_rgba(0,0,0,0.5)] border border-green-700 animate-pulse"></div>
            </div>
        </div>

      </div>
    </div>
  );
}