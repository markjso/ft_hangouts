import { createContext, useState, useEffect } from 'react';
import {getSingleUserPreference, updateSingleUserPreference} from '../db/dbCreate';
import { useSQLiteContext } from 'expo-sqlite';

const defaultLanguageContext = {
  language: 'en',
  setLanguage: () => {},
}

const LanguageContext = createContext(defaultLanguageContext);

export const LanguageProvider = ({ children }) => {
  const db = useSQLiteContext();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
  const fetchLanguage = async () => {
      const languagePreference = await getSingleUserPreference(db, 'languagePreference')
      if (languagePreference) {
      setLanguage(languagePreference);
      console.log("language changed");
      }
  };
  fetchLanguage();
}, [db]);

const handleChangeLanguage = async (newLanguage) => {
      setLanguage(newLanguage); 
      await updateSingleUserPreference(db, 'languagePreference', newLanguage);
      console.log("Language updated to", newLanguage);
  };

return (
    <LanguageContext.Provider value={{ language, setLanguage, handleChangeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
