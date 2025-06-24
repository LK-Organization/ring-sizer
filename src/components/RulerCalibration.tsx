import React, { useState, useEffect } from 'react';
import { Ruler } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../hooks/useLanguage';

interface RulerCalibrationProps {
  language: Language;
  onCalibrate: (rulerWidth: number) => void;
}

export const RulerCalibration: React.FC<RulerCalibrationProps> = ({
  language,
  onCalibrate,
}) => {
  const [rulerWidth, setRulerWidth] = useState(200);
  const t = translations[language];
  const isRTL = language === 'ar';

  const handleConfirm = () => {
    onCalibrate(rulerWidth);
  };

  const renderRulerMarks = () => {
    const marks = [];
    for (let i = 0; i <= 50; i++) {
      const isMainMark = i % 10 === 0;
      const isMidMark = i % 5 === 0;
      
      marks.push(
        <div
          key={i}
          className="absolute bg-black"
          style={{
            left: `${(i / 50) * 100}%`,
            width: '1px',
            height: isMainMark ? '100%' : isMidMark ? '75%' : '50%',
          }}
        >
          {isMainMark && (
            <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs">
              {(i / 10) * 5}cm
            </span>
          )}
        </div>
      );
    }
    return marks;
  };

  return (
    <div className="flex flex-col gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4">
        <Ruler size={32} className="text-[#D4AF37]" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t.rulerCalibration}</h3>
          <p className="text-gray-600 text-sm">{t.rulerCalibrationDesc}</p>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 overflow-x-auto">
        <div 
          className="h-16 relative bg-gray-100 min-w-48"
          style={{ width: `${rulerWidth}px` }}
        >
          {renderRulerMarks()}
        </div>
      </div>

      <div className="my-4">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
          <span>{t.adjustRulerWidth}</span>
          <span>{t.width}: {rulerWidth}px</span>
        </div>
        <input
          type="range"
          min="100"
          max="400"
          value={rulerWidth}
          onChange={(e) => setRulerWidth(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
      </div>

      <ol className={`list-decimal ${isRTL ? 'list-inside pr-4' : 'list-inside pl-4'} text-gray-600 text-sm space-y-2`}>
        {t.instructions.ruler.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>

      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-800">
        {t.tips.ruler}
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