import { useState, useEffect } from 'react';

export type Language = 'ar' | 'fr';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    // Check URL for language
    const path = window.location.pathname;
    if (path.endsWith('/fr')) {
      setLanguage('fr');
    } else {
      setLanguage('ar');
    }
  }, []);

  return { language, setLanguage };
};