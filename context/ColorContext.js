import React, { useState, useEffect, createContext } from "react";
import { Colors } from "../components/Style/Color";
import { Alert } from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

export default function GetColor({route}) {
  const {id} = route.params;
  return(
    <SQLiteProvider databaseName="ft_hangouts.db">
            <GetDatabaseColor id={id}/>
        </SQLiteProvider>
  );
}


const initialiseTable = async (db) => {
    try {
        await db.execAsync(
          `
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS UserPreferences (
          id INTEGER DEFAULT 1,
          colorPreference TEXT,
          languagePreference TEXT,
          PRIMARY KEY(id));
          `
        );
    console.log("Database connected");
    } catch (error) {
        console.log("Error in connecting: ", error);
    }
};

// Default context value
const defaultColorContextValue = {
  color: Colors.primary,
  setColor: () => {},
};

const ColorContext = createContext(defaultColorContextValue);

// Fetch colorPreference from the database or fallback to default
const GetDatabaseColor = async (): Promise<string> => {
  try {
    const db = await connectToDatabase();
    await initialiseTable(db); 
    const colorPreference = await getSingleUserPreference(db, "colorPreference");
    return colorPreference || Colors.primary; 
  } catch (error) {
    console.error("Error fetching color from database:", error);
    return Colors.primary; 
  }
};

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState(Colors.primary);

  useEffect(() => {
  async function fetchColor(){
    try {
      const fetchedColor = await db.getFirstAsync(
        "SELECT color FROM UserPreferences WHERE id = 1, colorPreference, values (1, ?)"
      );
      const results = await db.executeSql(query)
      if (results[0]?.rows?.length) {
        return results[0].rows.item(0)[fetchedColor]
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      throw Error("Failed to get color from database");
    }
  }

  useEffect(() =>{
  fetchColor();
}, []);

  const handleSetColor = async (newColor) => {
    try {
      setColor(newColor);
      const db = useSQLiteContext();
      const result = await db.runAsync(
        "UPDATE UserPreferences id WHERE id = 1, colorPreference = ?", [id, newColor]); 
      Alert.alert("color saved");
    } catch (error) {
      console.error("Error updating color in database:", error);
    }
  };

  return (
    <ColorContext.Provider value={{ color, setColor: handleSetColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
