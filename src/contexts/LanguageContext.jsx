import { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/index.js';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children, initialLanguage = 'en' }) => {
  // Initialize with saved language or fallback to initialLanguage
  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage && ['en', 'th'].includes(savedLanguage)) ? savedLanguage : initialLanguage;
    }
    return initialLanguage;
  };

  const [language, setLanguage] = useState(getInitialLanguage);
  const [isReady, setIsReady] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const targetLanguage = getInitialLanguage();
    setLanguage(targetLanguage);
    
    // Ensure i18n is ready before changing language
    if (i18n.isInitialized) {
      i18n.changeLanguage(targetLanguage);
    } else {
      i18n.on('initialized', () => {
        i18n.changeLanguage(targetLanguage);
      });
    }
    
    // Update document language attribute
    document.documentElement.lang = targetLanguage;
    setIsReady(true);
  }, [initialLanguage]);

  const changeLanguage = (newLanguage) => {
    console.log('Changing language to:', newLanguage);
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).then(() => {
      console.log('Language changed successfully to:', newLanguage);
      console.log('Current i18n language:', i18n.language);
      // Force re-render after language change
      setForceUpdate(prev => prev + 1);
    });
    localStorage.setItem('language', newLanguage);
    
    // Update document language attribute
    document.documentElement.lang = newLanguage;
  };

  const value = {
    language,
    changeLanguage,
    t: i18n.t, // Translation function
    isReady,
    forceUpdate // Include forceUpdate to trigger re-renders
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
