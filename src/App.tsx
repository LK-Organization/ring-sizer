import React, { useState, useEffect } from 'react';
import { CalibrationToggle } from './components/CalibrationToggle';
import { CardCalibration } from './components/CardCalibration';
import { RulerCalibration } from './components/RulerCalibration';
import { CoinCalibration } from './components/CoinCalibration';
import { RingSizer } from './components/RingSizer';
import { useLanguage } from './hooks/useLanguage';
import { translations } from './translations';

// Constants
const CREDIT_CARD_HEIGHT_MM = 53.98;
const RULER_REFERENCE_MM = 50; // 5cm reference
const ALGERIAN_DINAR_DIAMETER_MM = 26.50; // 10 Algerian dinar coin

type CalibrationMethod = 'card' | 'ruler' | 'coin';
type AppState = 'calibration' | 'ring-sizer';

function App() {
  const { language } = useLanguage();
  const [appState, setAppState] = useState<AppState>('calibration');
  const [calibrationMethod, setCalibrationMethod] = useState<CalibrationMethod>('card');
  const [pixelsPerMM, setPixelsPerMM] = useState(0);

  const t = translations[language];
  const isRTL = language === 'ar';

  // Load calibration from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('calibratedPixelsPerMM');
    if (stored) {
      const value = parseFloat(stored);
      if (!isNaN(value) && value > 0) {
        setPixelsPerMM(value);
        setAppState('ring-sizer');
      }
    }
  }, []);

  const handleCardCalibration = (cardHeightPixels: number) => {
    const ppmm = cardHeightPixels / CREDIT_CARD_HEIGHT_MM;
    setPixelsPerMM(ppmm);
    localStorage.setItem('calibratedPixelsPerMM', ppmm.toString());
    setAppState('ring-sizer');
  };

  const handleRulerCalibration = (rulerWidthPixels: number) => {
    const ppmm = rulerWidthPixels / RULER_REFERENCE_MM;
    setPixelsPerMM(ppmm);
    localStorage.setItem('calibratedPixelsPerMM', ppmm.toString());
    setAppState('ring-sizer');
  };

  const handleCoinCalibration = (coinDiameterPixels: number) => {
    const ppmm = coinDiameterPixels / ALGERIAN_DINAR_DIAMETER_MM;
    setPixelsPerMM(ppmm);
    localStorage.setItem('calibratedPixelsPerMM', ppmm.toString());
    setAppState('ring-sizer');
  };

  const handleRecalibrate = () => {
    setAppState('calibration');
    localStorage.removeItem('calibratedPixelsPerMM');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#f4f2eb' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">
            {t.title}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {t.subtitle}
          </p>

          {appState === 'calibration' && (
            <>
              <CalibrationToggle
                language={language}
                activeMethod={calibrationMethod}
                onMethodChange={setCalibrationMethod}
              />

              {calibrationMethod === 'card' && (
                <CardCalibration
                  language={language}
                  onCalibrate={handleCardCalibration}
                />
              )}

              {calibrationMethod === 'ruler' && (
                <RulerCalibration
                  language={language}
                  onCalibrate={handleRulerCalibration}
                />
              )}

              {calibrationMethod === 'coin' && (
                <CoinCalibration
                  language={language}
                  onCalibrate={handleCoinCalibration}
                />
              )}
            </>
          )}

          {appState === 'ring-sizer' && (
            <RingSizer
              language={language}
              pixelsPerMM={pixelsPerMM}
              onRecalibrate={handleRecalibrate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;