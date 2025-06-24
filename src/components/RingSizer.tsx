import React, { useState, useEffect } from 'react';
import { MeasurementToggle } from './MeasurementToggle';
import { translations } from '../translations';
import type { Language } from '../hooks/useLanguage';

interface RingSizerProps {
  language: Language;
  pixelsPerMM: number;
  onRecalibrate: () => void;
}

export const RingSizer: React.FC<RingSizerProps> = ({
  language,
  pixelsPerMM,
  onRecalibrate,
}) => {
  const [ringSize, setRingSize] = useState(15.0);
  const [measurementMode, setMeasurementMode] = useState<'ring' | 'finger'>('ring');
  const t = translations[language];
  const isRTL = language === 'ar';

  const ringDiameterPixels = ringSize * pixelsPerMM;
  const fingerHeightPixels = ringSize * pixelsPerMM;

  const handleSizeChange = (newSize: number) => {
    const clampedSize = Math.max(10, Math.min(30, newSize));
    setRingSize(clampedSize);
  };

  const decreaseSize = () => {
    handleSizeChange(ringSize - 0.1);
  };

  const increaseSize = () => {
    handleSizeChange(ringSize + 0.1);
  };

  return (
    <div className="flex flex-col gap-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <MeasurementToggle
        language={language}
        activeMode={measurementMode}
        onModeChange={setMeasurementMode}
      />

      <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center gap-4 min-h-80">
        {measurementMode === 'ring' ? (
          <div 
            className="relative border-2 border-[#D4AF37] rounded-full flex items-center justify-center bg-white bg-opacity-80 shadow-sm"
            style={{ 
              width: `${ringDiameterPixels}px`, 
              height: `${ringDiameterPixels}px`,
              minWidth: '60px',
              minHeight: '60px'
            }}
          >
            {/* Crosshairs */}
            <div className="absolute w-px h-full bg-black"></div>
            <div className="absolute w-full h-px bg-black"></div>
            
            {/* Size label */}
            <span className="bg-white px-2 py-1 rounded text-sm font-medium shadow-sm z-10">
              {ringSize.toFixed(1)} mm
            </span>
          </div>
        ) : (
          <div 
            className="relative border-2 border-[#D4AF37] rounded-md flex items-center justify-center bg-white bg-opacity-80 shadow-sm w-full"
            style={{ 
              height: `${fingerHeightPixels}px`,
              minHeight: '60px'
            }}
          >
            {/* Vertical center line */}
            <div className="absolute w-px h-full bg-black"></div>
            {/* Horizontal center line */}
            <div className="absolute w-full h-px bg-black"></div>
            
            {/* Size label */}
            <span className="bg-white px-2 py-1 rounded text-sm font-medium shadow-sm z-10">
              {ringSize.toFixed(1)} mm
            </span>
          </div>
        )}

        <div className="flex items-center gap-4 w-full max-w-xs">
          <button
            onClick={decreaseSize}
            className="w-8 h-8 border border-gray-300 bg-white rounded-md cursor-pointer flex items-center justify-center text-lg text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-800"
          >
            -
          </button>
          
          <input
            type="range"
            min="10"
            max="30"
            step="0.1"
            value={ringSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          
          <button
            onClick={increaseSize}
            className="w-8 h-8 border border-gray-300 bg-white rounded-md cursor-pointer flex items-center justify-center text-lg text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-800"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center text-gray-700">
          <span>{measurementMode === 'ring' ? t.ringSize : t.fingerSize}</span>
          <span className="font-medium">{ringSize.toFixed(1)} mm</span>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-800">
          {measurementMode === 'ring' ? t.tips.sizing : t.tips.fingerSizing}
        </div>

        <button
          onClick={onRecalibrate}
          className="w-full p-3 bg-transparent text-gray-600 border border-gray-300 rounded-md font-medium cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-800"
        >
          {t.recalibrate}
        </button>
      </div>
    </div>
  );
};