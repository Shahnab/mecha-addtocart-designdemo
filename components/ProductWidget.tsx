import React, { useState } from 'react';
import TapeSelector from './TapeSelector';

export default function ProductWidget() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-300/20 rounded-full blur-[120px]" />
      </div>

      {/* Main Interaction Area - Scaled appropriately to fit */}
      <div className="relative z-20 scale-[1.8] md:scale-[2.2] origin-center filter drop-shadow-2xl p-4">
          <TapeSelector value={quantity} onChange={setQuantity} min={1} max={10} />
      </div>

    </div>
  );
}