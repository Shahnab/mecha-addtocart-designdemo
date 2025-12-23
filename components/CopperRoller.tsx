import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface CopperRollerProps {
  y: MotionValue<number>;
  side?: 'left' | 'right';
}

export default function CopperRoller({ y, side = 'left' }: CopperRollerProps) {
  // Mechanical Mapping:
  // Map vertical tape scroll (y) to horizontal surface rotation (x)
  const surfacePos = useTransform(y, (latest) => `${latest * 0.6}px`);
  
  // Gear teeth position
  const gearPos = useTransform(y, (latest) => `${latest * 0.6}px`);
  
  // Dynamic Reflection: Simulates environment reflection moving across the cylindrical surface
  // Slower movement than surface to simulate environment being far away/static relative to rotation
  const reflectionPos = useTransform(y, (latest) => `${latest * 0.15}%`);

  // CSS Gradient Pattern for 3D Gear Teeth - Brightened for visibility
  const gearPattern = `
    repeating-linear-gradient(
      90deg,
      #1a1a1a 0px,
      #1a1a1a 1px,        /* Deep shadow start */
      #333333 1px,        /* Shadow edge */
      #525252 2px,        /* Face start (Lighter gray) */
      #9ca3af 3px,        /* Highlight center (Bright steel) */
      #525252 4px,        /* Face end */
      #333333 5px,        /* Shadow edge */
      #050505 5px,        /* Gap start (Dark for contrast) */
      #050505 6px         /* Gap end */
    )
  `;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center py-1">
      
      {/* === TOP BEARING BLOCK === */}
      <div className="w-[38px] h-[26px] bg-gradient-to-b from-[#d4d4d4] via-[#888] to-[#3a3a3a] rounded-[5px] 
                      shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.9),inset_0_-2px_3px_rgba(0,0,0,0.7)] 
                      z-10 relative flex items-center justify-center border border-[#2a2a2a] ring-1 ring-white/20">
         {/* Precision Alignment Marks */}
         <div className="absolute top-1 left-1 w-[3px] h-[1px] bg-red-500/60 shadow-[0_0_2px_rgba(239,68,68,0.8)]" />
         <div className="absolute top-1 right-1 w-[3px] h-[1px] bg-red-500/60 shadow-[0_0_2px_rgba(239,68,68,0.8)]" />
         
         {/* Machined Bolt Head - More detailed */}
         <div className="w-[20px] h-[14px] bg-gradient-to-br from-[#666] to-[#1a1a1a] rounded-[3px] shadow-[inset_0_2px_3px_rgba(0,0,0,1),0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center border border-black/80 ring-1 ring-white/10">
            <div className="w-[10px] h-[2px] bg-[#000] shadow-[0_1px_0_rgba(255,255,255,0.15)] opacity-90" />
            <div className="absolute w-[2px] h-[10px] bg-[#000] shadow-[0_1px_0_rgba(255,255,255,0.15)] opacity-90" />
         </div>
         
         {/* Oil Port */}
         <div className="absolute bottom-1 right-1.5 w-[3px] h-[3px] rounded-full bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(0,0,0,1)] border border-[#0a0a0a]" />
      </div>

      {/* === TENSION SPRING (Top) === */}
      <div className="relative w-[8px] h-[6px] flex items-center justify-center z-15 my-[1px]">
        {/* Coil segments */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-gradient-to-r from-[#555] via-[#888] to-[#555] shadow-[0_0.5px_1px_rgba(0,0,0,0.8)]" />
          ))}
        </div>
      </div>

      {/* === ROLLER ASSEMBLY === */}
      <div className="relative w-full flex-1 flex flex-col items-center -my-[5px] z-20 perspective-500">
         
         {/* --- TOP GEAR --- */}
         <div className="w-[58px] h-[22px] relative z-20 shrink-0 rounded-[3px] overflow-hidden shadow-[0_6px_14px_rgba(0,0,0,0.7)] border-y border-[#0a0a0a] ring-1 ring-white/5">
             <div className="absolute inset-0 bg-[#0f0f0f]" />
             
             {/* Teeth */}
             <motion.div 
                className="absolute inset-0 opacity-100"
                style={{ 
                    backgroundImage: gearPattern, 
                    backgroundPositionX: gearPos,
                    backgroundSize: 'auto 100%'
                }}
             />
             
             {/* Center Hub Line */}
             <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#1a1a1a] -translate-y-1/2 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
             
             {/* Precision Timing Marks */}
             <div className="absolute top-1/2 left-[10%] w-[1px] h-[3px] bg-white/30 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[30%] w-[1px] h-[3px] bg-white/30 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[50%] w-[1px] h-[4px] bg-white/40 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[70%] w-[1px] h-[3px] bg-white/30 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[90%] w-[1px] h-[3px] bg-white/30 -translate-y-1/2" />
             
             {/* Gear Lighting */}
             <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-black/70 pointer-events-none mix-blend-overlay" />
         </div>


         {/* --- COPPER CYLINDER BODY --- */}
         <div className="relative w-[50px] flex-1 overflow-hidden bg-[#3e1408] z-10 mx-auto shadow-[inset_12px_0_20px_rgba(0,0,0,0.95),inset_-12px_0_20px_rgba(0,0,0,0.95)] border-x border-[#1a0802]">
            
            {/* 1. Base Material: Improved Copper Gradient */}
            {/* Richer metallic tones: dark brown shadows -> bright copper midtones -> deep shadows */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#260e06] via-[#b85c36] to-[#260e06]"></div>
            
            {/* 2. Dynamic Environment Reflection (The "Sheen") */}
            {/* More complex environment map */}
            <motion.div 
                className="absolute inset-0 opacity-50 mix-blend-color-dodge"
                style={{
                    backgroundPositionX: reflectionPos,
                    backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 15%, rgba(200,225,255,0.2) 25%, transparent 40%, rgba(255,220,200,0.1) 60%, transparent 80%, rgba(255,255,255,0.15) 90%, transparent 100%)',
                    backgroundSize: '200% 100%'
                }}
            />

            {/* 3. Diamond Knurling Pattern (Deep Etch - Shadows) */}
            <motion.div 
              className="absolute inset-0 opacity-80 mix-blend-multiply"
              style={{
                  backgroundPositionX: surfacePos,
                  backgroundImage: `
                    repeating-linear-gradient(60deg, transparent, transparent 3px, #1a0500 3px, #1a0500 4px),
                    repeating-linear-gradient(-60deg, transparent, transparent 3px, #1a0500 3px, #1a0500 4px)
                  `,
              }}
            />
            
            {/* 4. Knurling Highlights (Specular Hits on Edges) */}
            {/* Using screen for metallic specular hits */}
            <motion.div 
              className="absolute inset-0 opacity-40 mix-blend-screen"
              style={{
                  backgroundPositionX: surfacePos,
                  backgroundImage: `
                    repeating-linear-gradient(60deg, transparent, transparent 3px, #ffcca0 3px, #ffcca0 3.5px),
                    repeating-linear-gradient(-60deg, transparent, transparent 3px, #ffcca0 3px, #ffcca0 3.5px)
                  `,
              }}
            />

            {/* 5. Surface Noise (Oxidation/Patina) */}
            {/* High contrast noise for gritty realism */}
            <div className="absolute inset-0 opacity-40 bg-noise mix-blend-overlay filter contrast-125 brightness-75" />
            
            {/* 6. Lathe/Machining Lines (Horizontal Micro-grooves) */}
            <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#3f1a0b_1px,#3f1a0b_2px)] mix-blend-multiply" />

             {/* 7. Vertical Micro-scratches (Brushed finish effect) */}
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,#fff_1px,#fff_3px)] mix-blend-overlay" />

            {/* 8. Static Specular Highlight (Main Light Source) */}
            {/* Soft, broad highlight */}
            <div className={`absolute inset-y-0 w-[24px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[6px] mix-blend-soft-light ${side === 'left' ? 'left-[20%]' : 'right-[20%]'}`} />
            
            {/* 9. Sharp Anisotropic Glare */}
            {/* The sharp white line typical of polished cylinders */}
            <div className={`absolute inset-y-0 w-[1px] bg-white/90 blur-[0.5px] mix-blend-overlay ${side === 'left' ? 'left-[26%]' : 'right-[26%]'}`} />
            
            {/* 10. Secondary Glare (Softer) */}
            <div className={`absolute inset-y-0 w-[6px] bg-[#ffdec0]/40 blur-[3px] mix-blend-color-dodge ${side === 'left' ? 'left-[24%]' : 'right-[24%]'}`} />

            {/* 11. Rim Light (Fresnel Edge Effect) */}
            <div className={`absolute inset-y-0 w-[4px] bg-[#ff8a50]/40 blur-[2px] ${side === 'left' ? 'right-0' : 'left-0'} mix-blend-screen`} />

            {/* 12. Heavy Cylindrical Shading (Edges) - Ambient Occlusion */}
            {/* Darkens the edges to sell the roundness */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.4)_15%,transparent_30%,transparent_70%,rgba(0,0,0,0.4)_85%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
         </div>


         {/* --- BOTTOM GEAR --- */}
         <div className="w-[58px] h-[22px] relative z-20 shrink-0 rounded-[3px] overflow-hidden shadow-[0_-6px_14px_rgba(0,0,0,0.7)] border-y border-[#0a0a0a] ring-1 ring-white/5">
             <div className="absolute inset-0 bg-[#0f0f0f]" />
             
             {/* Teeth */}
             <motion.div 
                className="absolute inset-0 opacity-100"
                style={{ 
                    backgroundImage: gearPattern, 
                    backgroundPositionX: gearPos, 
                    backgroundSize: 'auto 100%'
                }}
             />
             
             {/* Center Hub Line */}
             <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#1a1a1a] -translate-y-1/2 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
             
             {/* Precision Timing Marks */}
             <div className="absolute top-1/2 left-[10%] w-[1px] h-[3px] bg-white/30 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[30%] w-[1px] h-[3px] bg-white/30 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[50%] w-[1px] h-[4px] bg-white/40 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[70%] w-[1px] h-[3px] bg-white/30 -translate-y-1/2" />
             <div className="absolute top-1/2 left-[90%] w-[1px] h-[3px] bg-white/30 -translate-y-1/2" />
             
             {/* Shading */}
             <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-white/15 to-black/70 pointer-events-none mix-blend-overlay" />
         </div>

      </div>

      {/* === TENSION SPRING (Bottom) === */}
      <div className="relative w-[8px] h-[6px] flex items-center justify-center z-15 my-[1px]">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(4)].map((_, i) => (
            <div key={`bottom-${i}`} className="w-full h-[1px] bg-gradient-to-r from-[#555] via-[#888] to-[#555] shadow-[0_0.5px_1px_rgba(0,0,0,0.8)]" />
          ))}
        </div>
      </div>
      
      {/* === SIDE MICRO-GEARS (Additional mechanical detail) - Enhanced 3D Design === */}
      <motion.div 
        className="absolute top-[45%] -left-[4px] w-[10px] h-[10px] z-30"
        style={{ rotate: useTransform(y, (v) => v * -3) }}
      >
        {/* Main gear body with radial gradient for 3D effect */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #4a4a4a 40%, #2a2a2a 80%, #1a1a1a 100%)',
            boxShadow: `
              0 1.5px 3px rgba(0,0,0,0.95),
              inset 0 0.5px 1px rgba(255,255,255,0.4),
              inset 0 -1px 2px rgba(0,0,0,0.7)
            `
          }}
        >
          {/* Brushed metal texture */}
          <div className="absolute inset-0 rounded-full opacity-20 bg-noise mix-blend-overlay" />
          
          {/* Top highlight */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)'
            }}
          />
        </div>
        
        {/* Realistic gear teeth with trapezoid profile */}
        {[...Array(6)].map((_, i) => {
          const angle = i * 60;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: '1.2px',
                height: '2.5px',
                left: '50%',
                top: '0',
                transformOrigin: 'center 5px',
                transform: `translateX(-50%) rotate(${angle}deg)`,
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #5a5a5a 0%, #3a3a3a 50%, #1a1a1a 100%)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '-0.5px 0 0.5px rgba(0,0,0,0.8), 0.5px 0 0.5px rgba(255,255,255,0.2)'
                }}
              />
            </div>
          );
        })}
        
        {/* Center hub */}
        <div 
          className="absolute inset-[35%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #3a3a3a 0%, #1a1a1a 60%, #0a0a0a 100%)',
            boxShadow: 'inset 0 0.5px 1px rgba(0,0,0,1), 0 0.5px 1px rgba(255,255,255,0.1)'
          }}
        >
          {/* Center shaft hole */}
          <div 
            className="absolute inset-[30%] rounded-full bg-black"
            style={{
              boxShadow: 'inset 0 0.5px 1px rgba(0,0,0,1)'
            }}
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute top-[45%] -right-[4px] w-[10px] h-[10px] z-30"
        style={{ rotate: useTransform(y, (v) => v * 3) }}
      >
        {/* Main gear body with radial gradient for 3D effect */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #4a4a4a 40%, #2a2a2a 80%, #1a1a1a 100%)',
            boxShadow: `
              0 1.5px 3px rgba(0,0,0,0.95),
              inset 0 0.5px 1px rgba(255,255,255,0.4),
              inset 0 -1px 2px rgba(0,0,0,0.7)
            `
          }}
        >
          {/* Brushed metal texture */}
          <div className="absolute inset-0 rounded-full opacity-20 bg-noise mix-blend-overlay" />
          
          {/* Top highlight */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)'
            }}
          />
        </div>
        
        {/* Realistic gear teeth with trapezoid profile */}
        {[...Array(6)].map((_, i) => {
          const angle = i * 60;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: '1.2px',
                height: '2.5px',
                left: '50%',
                top: '0',
                transformOrigin: 'center 5px',
                transform: `translateX(-50%) rotate(${angle}deg)`,
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #5a5a5a 0%, #3a3a3a 50%, #1a1a1a 100%)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '-0.5px 0 0.5px rgba(0,0,0,0.8), 0.5px 0 0.5px rgba(255,255,255,0.2)'
                }}
              />
            </div>
          );
        })}
        
        {/* Center hub */}
        <div 
          className="absolute inset-[35%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #3a3a3a 0%, #1a1a1a 60%, #0a0a0a 100%)',
            boxShadow: 'inset 0 0.5px 1px rgba(0,0,0,1), 0 0.5px 1px rgba(255,255,255,0.1)'
          }}
        >
          {/* Center shaft hole */}
          <div 
            className="absolute inset-[30%] rounded-full bg-black"
            style={{
              boxShadow: 'inset 0 0.5px 1px rgba(0,0,0,1)'
            }}
          />
        </div>
      </motion.div>

      {/* === BOTTOM BEARING BLOCK === */}
      <div className="w-[38px] h-[26px] bg-gradient-to-t from-[#d4d4d4] via-[#888] to-[#3a3a3a] rounded-[5px] 
                      shadow-[0_-5px_10px_rgba(0,0,0,0.8),inset_0_-2px_2px_rgba(255,255,255,0.9),inset_0_2px_3px_rgba(0,0,0,0.7)] 
                      z-10 relative flex items-center justify-center border border-[#2a2a2a] ring-1 ring-white/20">
         {/* Precision Alignment Marks */}
         <div className="absolute bottom-1 left-1 w-[3px] h-[1px] bg-red-500/60 shadow-[0_0_2px_rgba(239,68,68,0.8)]" />
         <div className="absolute bottom-1 right-1 w-[3px] h-[1px] bg-red-500/60 shadow-[0_0_2px_rgba(239,68,68,0.8)]" />
         
         {/* Machined Bolt Head - More detailed */}
         <div className="w-[20px] h-[14px] bg-gradient-to-br from-[#666] to-[#1a1a1a] rounded-[3px] shadow-[inset_0_2px_3px_rgba(0,0,0,1),0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center border border-black/80 ring-1 ring-white/10">
            <div className="w-[10px] h-[2px] bg-[#000] shadow-[0_1px_0_rgba(255,255,255,0.15)] opacity-90" />
            <div className="absolute w-[2px] h-[10px] bg-[#000] shadow-[0_1px_0_rgba(255,255,255,0.15)] opacity-90" />
         </div>
         
         {/* Oil Port */}
         <div className="absolute top-1 left-1.5 w-[3px] h-[3px] rounded-full bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(0,0,0,1)] border border-[#0a0a0a]" />
      </div>
    </div>
  );
}