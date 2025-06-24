import React from 'react';
import { Circle, RectangleHorizontal } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../hooks/useLanguage';

interface MeasurementToggleProps {
  language: Language;
  activeMode: 'ring' | 'finger';
  onModeChange: (mode: 'ring' | 'finger') => void;
}

export const MeasurementToggle: React.FC<MeasurementToggleProps> = ({
  language,
  activeMode,
  onModeChange,
}) => {
  const t = translations[language];
  const isRTL = language === 'ar';

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{t.measurementMode}</h3>
      <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          className={`p-3 border-none rounded-md cursor-pointer flex items-center justify-center gap-2 text-sm transition-all duration-200 ${
            activeMode === 'ring'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'bg-transparent text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => onModeChange('ring')}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Circle size={20} />
          <span>{t.withRing}</span>
        </button>
        <button
          className={`p-3 border-none rounded-md cursor-pointer flex items-center justify-center gap-2 text-sm transition-all duration-200 ${
            activeMode === 'finger'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'bg-transparent text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => onModeChange('finger')}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <RectangleHorizontal size={20} />
          <span>{t.withFinger}</span>
        </button>
      </div>
    </div>
  );
};