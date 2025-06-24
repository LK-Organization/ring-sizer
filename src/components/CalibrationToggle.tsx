import React from 'react';
import { CreditCard, Ruler, Coins } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../hooks/useLanguage';

interface CalibrationToggleProps {
  language: Language;
  activeMethod: 'card' | 'ruler' | 'coin';
  onMethodChange: (method: 'card' | 'ruler' | 'coin') => void;
}

export const CalibrationToggle: React.FC<CalibrationToggleProps> = ({
  language,
  activeMethod,
  onMethodChange,
}) => {
  const t = translations[language];
  const isRTL = language === 'ar';

  return (
    <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-lg mb-6">
      <button
        className={`p-3 border-none rounded-md cursor-pointer flex items-center justify-center gap-2 text-sm transition-all duration-200 ${
          activeMethod === 'card'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'bg-transparent text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => onMethodChange('card')}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <CreditCard size={20} />
        <span>{t.useCard}</span>
      </button>
      <button
        className={`p-3 border-none rounded-md cursor-pointer flex items-center justify-center gap-2 text-sm transition-all duration-200 ${
          activeMethod === 'ruler'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'bg-transparent text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => onMethodChange('ruler')}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <Ruler size={20} />
        <span>{t.useRuler}</span>
      </button>
      <button
        className={`p-3 border-none rounded-md cursor-pointer flex items-center justify-center gap-2 text-sm transition-all duration-200 ${
          activeMethod === 'coin'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'bg-transparent text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => onMethodChange('coin')}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <Coins size={20} />
        <span>{t.useCoin}</span>
      </button>
    </div>
  );
};