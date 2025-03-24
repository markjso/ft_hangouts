import React, { useState, useEffect, createContext } from "react";
import { Colors } from "../components/Style/Color";
import { Alert } from "react-native";
import {  useSQLiteContext } from "expo-sqlite";
import {getSingleUserPreference, updateSingleUserPreference} from '../db/dbCreate';

const defaultColorContextValue = {
  color: Colors.primary,
  setColor: () => {},
};

const ColorContext = createContext(defaultColorContextValue);

export const ColorProvider = ({ children }) => {
  const db = useSQLiteContext();
  const [color, setColor] = useState(Colors.primary);

  useEffect(() => {
    const fetchColor = async () => {
      const fetchedColor = await getSingleUserPreference(db, "colorPreference")
      if (fetchedColor) {
        setColor(fetchedColor);
        console.log("color updated");
      }
    };
  fetchColor();
}, [db]);

  
  const handleSetColor = async (newColor) => {
    try {
      setColor(newColor);
      await updateSingleUserPreference(db, "colorPreference", newColor);
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
