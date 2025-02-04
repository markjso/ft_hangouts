import React, { useState, useEffect, createContext } from "react";
import { Colors } from "../components/Style/Color";
import {
  connectToDatabase,
  createTables,
  getSingleUserPreference,
  updateSingleUserPreference,
} from "../db/dbCreate";

// Default context value
const defaultColorContextValue = {
  color: Colors.primary,
  setColor: () => {},
};

const ColorContext = createContext(defaultColorContextValue);

// Fetch colorPreference from the database or fallback to default
const getDatabaseColor = async (): Promise<string> => {
  try {
    const db = await connectToDatabase();
    await createTables(db); // Ensure tables are created
    const colorPreference = await getSingleUserPreference(db, "colorPreference");
    return colorPreference || Colors.primary; // Fallback to default color if null
  } catch (error) {
    console.error("Error fetching color from database:", error);
    return Colors.primary; // Fallback to default color on error
  }
};

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState(Colors.primary);

  useEffect(() => {
  const fetchColor = async () => {
    try {
      const fetchedColor = await getDatabaseColor();
      console.warn("Fetched colorPreference:", fetchedColor); // Log fetched color
      setColor(fetchedColor);
    } catch (error) {
      console.error("Error fetching colorPreference:", error); // Log errors
    }
  };

  fetchColor();
}, []);

  const handleSetColor = async (newColor) => {
    try {
      setColor(newColor); // Update the state
      const db = await connectToDatabase();
      await updateSingleUserPreference(db, "colorPreference", newColor); // Save to the database
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