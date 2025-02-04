import { createContext, useState, useEffect } from 'react';
import {
  connectToDatabase,
  createTables,
  getSingleUserPreference,
} from "../db/dbCreate";

const defaultLanguageContext = {
  language: "fr",
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
    console.error("Error fetching language from database:", error);
    return "en"; 
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr");

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

const handleChangeLanguage = async (newLanguage) => {
    try {
      setLanguage(newLanguage); // Update the state
      const db = await connectToDatabase();
      await updateSingleUserPreference(db, "languagePreference", newLanguage); // Save to the database
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

return (
    <LanguageContext.Provider value={{ language, setLanguage, handleChangeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;