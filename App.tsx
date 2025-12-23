import React from 'react';
import ProductWidget from './components/ProductWidget';

export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#eaeaea] bg-dots relative">
      {/* Ambient decorative blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/30 rounded-full blur-[100px] pointer-events-none" />
      
      <main className="relative z-10 w-full h-full">
        <ProductWidget />
      </main>
      
      {/* Footer Text */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-gray-400 text-sm font-medium tracking-wide pointer-events-none">
        Interactive UI Concept
      </div>
    </div>
  );
}