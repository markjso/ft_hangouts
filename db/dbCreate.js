import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";

// Enable promise for SQLite
enablePromise(true)

export type Contact = {
  firstName: string,
  name: string,
  nickname: string,
  phone: string,
  email: string,
}

export const connectToDatabase = async () => {
  return openDatabase(
    { name: "fthangouts.db", location: "default" },
    () => {},
    (error) => {
      console.error(error)
      throw Error("Could not connect to database")
    }
  )
}

export const createTables = async (db: SQLiteDatabase) => {
  const userPreferencesQuery = `
    CREATE TABLE IF NOT EXISTS UserPreferences (
        id INTEGER DEFAULT 1,
        colorPreference TEXT,
        languagePreference TEXT,
        PRIMARY KEY(id)
    )
  `
  const contactsQuery = `
   CREATE TABLE IF NOT EXISTS Contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      name TEXT,
      nickname TEXT,
      phone TEXT,
      email TEXT
   )
  `
  try {
    await db.executeSql(userPreferencesQuery)
    await db.executeSql(contactsQuery)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to create tables`)
  }
}

export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = []
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name)
      }
    })
    return tableNames
  } catch (error) {
    console.error(error)
    throw Error("Failed to get table names from database")
  }
}

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`
  try {
    await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to drop table ${tableName}`)
  }
}

export const addContact = async (db: SQLiteDatabase, contact: Contact) => {
  const insertQuery = `
   INSERT INTO Contacts (firstName, name, nickname, phone, email)
   VALUES (?, ?, ?, ?, ?)
 `
  const values = [
    contact.firstName,
    contact.name,
    contact.nickname,
    contact.phone,
    contact.email,
  ]
  try {
    return db.executeSql(insertQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to add contact")
  }
}

export const getContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
  try {
    const contacts: Contact[] = []
    const results = await db.executeSql("SELECT * FROM Contacts")
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        contacts.push(result.rows.item(index))
      }
    })
    return contacts
  } catch (error) {
    console.error("Error fetching contacts from database:", error)
    throw Error("Failed to get Contacts from database")
  }
}

export const updateContact = async (
  db: SQLiteDatabase,
  updatedContact: Contact
) => {
  const updateQuery = `
    UPDATE Contacts
    SET firstName = ?, name = ?, nickname = ?, phone = ?, email = ?
    WHERE phone = ?
  `
  const values = [
    updatedContact.firstName,
    updatedContact.name,
    updatedContact.nickname,
    updatedContact.phone,
    updatedContact.email,
  ]
  try {
    return db.executeSql(updateQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to update contact")
  }
}

export const getSingleUserPreference = async (
  db: SQLiteDatabase,
  userPreference: string,
): Promise<string | null> => {
  const allowedPreferences = [
  "colorPreference",
  "languagePreference",
]
if (!allowedPreferences.includes(userPreference)) {
  throw new Error("Invalid user preference")
}
  const query = `SELECT ${userPreference} FROM UserPreferences WHERE id = 1`
  try {
    const results = await db.executeSql(query)
    if (results[0]?.rows?.length) {
      return results[0].rows.item(0)[userPreference]
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    throw Error(`Failed to get ${userPreference} from database`)
  }
}

type SingleUserPreference = "colorPreference" | "languagePreference"

// This function works for both inserting and updating one user preference
// It can be color preference or language preference
export const updateSingleUserPreference = async (
  db: SQLiteDatabase,
  singleUserPreference: SingleUserPreference,
  newValue: string
) => {
   const allowedPreferences = [
  "colorPreference",
  "languagePreference",
]
if (!allowedPreferences.includes(userPreference)) {
  throw new Error("Invalid user preference")
}
  const query = `
      INSERT INTO UserPreferences (id, ${singleUserPreference})
      VALUES (1, ?)
      ON CONFLICT(id) DO UPDATE SET ${singleUserPreference} = ?
  `
  try {
    return db.executeSql(query, [newValue, newValue])
  } catch (error) {
    console.error(error)
    throw Error(`Failed to update ${singleUserPreference}`)
  }
}

export const deleteContact = async (db: SQLiteDatabase, contact: Contact) => {
  const deleteQuery = `
    DELETE FROM Contacts
    WHERE name = ? AND phone = ? and email = ?
  `
  const values = [contact.name, contact.phone, contact.email]
  try {
    return db.executeSql(deleteQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to remove contact")
  }
}
