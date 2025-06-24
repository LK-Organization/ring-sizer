import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../hooks/useLanguage';

interface CoinCalibrationProps {
  language: Language;
  onCalibrate: (coinDiameter: number) => void;
}

export const CoinCalibration: React.FC<CoinCalibrationProps> = ({
  language,
  onCalibrate,
}) => {
  const [coinDiameter, setCoinDiameter] = useState(100);
  const t = translations[language];
  const isRTL = language === 'ar';

  const handleConfirm = () => {
    onCalibrate(coinDiameter);
  };

  return (
    <div className="flex flex-col gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4">
        <Coins size={32} className="text-[#D4AF37]" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t.coinCalibration}</h3>
          <p className="text-gray-600 text-sm">{t.coinCalibrationDesc}</p>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center">
        <div 
          className="bg-yellow-50 relative border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-gray-400 text-sm font-light"
          style={{ 
            width: `${coinDiameter}px`, 
            height: `${coinDiameter}px`,
            minWidth: '60px',
            minHeight: '60px'
          }}
        >
          {/* Crosshairs for alignment */}
          <div className="absolute w-px h-full bg-gray-400 opacity-50"></div>
          <div className="absolute w-full h-px bg-gray-400 opacity-50"></div>
          
          <span className="bg-white px-2 py-1 rounded text-xs shadow-sm z-10">
            {t.placeCoinHere}
          </span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
          <span>{t.adjustCoinSize}</span>
          <span>{t.diameter}: {coinDiameter}px</span>
        </div>
        <input
          type="range"
          min="50"
          max="200"
          value={coinDiameter}
          onChange={(e) => setCoinDiameter(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
      </div>

      <ol className={`list-decimal ${isRTL ? 'list-inside pr-4' : 'list-inside pl-4'} text-gray-600 text-sm space-y-2`}>
        {t.instructions.coin.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>

      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-800">
        {t.tips.coin}
      </div>

      <button
        onClick={handleConfirm}
        className="w-full p-3 bg-[#D4AF37] text-white border-none rounded-md font-medium cursor-pointer transition-colors duration-200 hover:bg-[#c19b2b]"
      >
        {t.confirmCalibration}
      </button>
    </div>
  );
};