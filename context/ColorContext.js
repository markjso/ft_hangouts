import React, { useState, useEffect , createContext } from "react"
import { Colors } from "../components/Style/Color"
import {
  connectToDatabase,
  createTables,
  getSingleUserPreference,
} from "../db/dbCreate"

const defaultColorContextValue = {
  color: Colors.primary,
  setColor: () => {},
};

const ColorContext = createContext(defaultColorContextValue);

const getDatabaseColor = async (): Promise<string> => {
  const db = await connectToDatabase()
  await createTables(db)
  const colorPreference = await getSingleUserPreference(db, "colorPreference")
  return colorPreference || Colors.primary;
}

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState(Colors.primary);

  useEffect(() => {
    const fetchColor = async () => {
      const fetchedColor = await getDatabaseColor()
      setColor(fetchedColor)
    }

    fetchColor()
  }, [])

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  )
}

export default ColorContext;