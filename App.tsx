import React from 'react';
import ProductWidget from './components/ProductWidget';

export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#000000] bg-dots relative overflow-hidden">
      {/* Rotation Prompt - Only visible in portrait mode on mobile */}
      <div className="portrait:flex landscape:hidden absolute inset-0 z-50 bg-[#1e1e1e] flex-col items-center justify-center text-white p-8 md:hidden">
        <svg className="w-24 h-24 mb-6 animate-[spin_3s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <h2 className="text-2xl font-bold mb-3 tracking-wide">Rotate Your Device</h2>
        <p className="text-gray-400 text-center text-sm">Please rotate your device to landscape mode for the best experience</p>
      </div>

      {/* Ambient decorative blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/30 rounded-full blur-[100px] pointer-events-none" />
      
      <main className="relative z-10 w-full h-full landscape:flex landscape:items-center landscape:justify-center">
        <ProductWidget />
      </main>
      
      {/* Footer - Copyright & Visitor Counter */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-20">
        <div className="text-sm text-gray-500 mb-2">
          &copy; {new Date().getFullYear()}{' '}
          <a 
            href="https://www.linkedin.com/in/shahnabahmed/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-gray-600 hover:text-orange-500 transition-colors duration-300 pointer-events-auto"
          >
            Shahnab
          </a>
        </div>
        <div className="pointer-events-auto">
          <img 
            src="https://hits.sh/shahnab.github.io/mecha-addtocart-designdemo.svg?style=flat-square&label=VISITS&color=ea580c&labelColor=333333" 
            alt="Visitor Count"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}