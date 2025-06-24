import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../hooks/useLanguage';

interface CardCalibrationProps {
  language: Language;
  onCalibrate: (cardHeight: number) => void;
}

export const CardCalibration: React.FC<CardCalibrationProps> = ({
  language,
  onCalibrate,
}) => {
  const [cardHeight, setCardHeight] = useState(200);
  const t = translations[language];
  const isRTL = language === 'ar';

  const handleConfirm = () => {
    onCalibrate(cardHeight);
  };

  return (
    <div className="flex flex-col gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4">
        <CreditCard size={32} className="text-[#D4AF37]" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t.cardCalibration}</h3>
          <p className="text-gray-600 text-sm">{t.cardCalibrationDesc}</p>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div 
          className="bg-blue-50 relative w-full overflow-hidden flex items-center justify-center text-gray-400 text-xl font-light"
          style={{ height: `${cardHeight}px` }}
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-red-400 opacity-80"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-red-400 opacity-80"></div>
          <span>{t.placeCardHere}</span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
          <span>{t.adjustCardSize}</span>
          <span>{t.height}: {cardHeight}px</span>
        </div>
        <input
          type="range"
          min="100"
          max="400"
          value={cardHeight}
          onChange={(e) => setCardHeight(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
      </div>

      <ol className={`list-decimal ${isRTL ? 'list-inside pr-4' : 'list-inside pl-4'} text-gray-600 text-sm space-y-2`}>
        {t.instructions.card.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>

      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-800">
        {t.tips.calibration}
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