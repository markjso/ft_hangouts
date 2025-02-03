import { createContext, useState, useEffect } from 'react';
import {
  connectToDatabase,
  createTables,
  getSingleUserPreference,
} from "../db/dbCreate";

const defaultLanguageContext = {
  language: "en",
  setLanguage: () => {},
}

const LanguageContext = createContext(defaultLanguageContext);

const getDatabaseLanguage = async (): Promise<string> => {
  try {
    const db = await connectToDatabase();
    await createTables(db); 
    const languagePreference = await getSingleUserPreference(db, "languagePreference");
    return languagePreference; 
  } catch (error) {
    console.error("Error fetching languate from database:", error);
    return "en"; 
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
  const fetchLanguage = async () => {
    try {
      const fetchedLanguage = await getDatabaseLanguage();
      setLanguage(fetchedLanguage);
    } catch (error) {
      console.error("Error fetching Language:", error); 
    }
  };

  fetchLanguage();
}, []);

return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
