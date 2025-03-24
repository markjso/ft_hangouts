import { SQLiteDatabase  } from 'expo-sqlite';
import { Contact } from './Contact.typing';

export const initialiseDB = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(`PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS UserPreferences (
          id INTEGER DEFAULT 1,
          colorPreference TEXT,
          languagePreference TEXT,
          PRIMARY KEY(id)
      );
    
     CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        name TEXT,
        nickname TEXT,
        phone TEXT,
        email TEXT
     );

    CREATE TABLE IF NOT EXISTS Messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      receiverId INTEGER,
      content TEXT,
      isReceived INTEGER CHECK (isReceived IN (0, 1)),
      timestamp INTEGER,
      FOREIGN KEY (receiverId) REFERENCES contacts(id) ON DELETE CASCADE
    );
  `);
  } catch (error) {  
    console.log("Error in connecting", error)
  }
    console.log("Tables created")
}

  export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
    try {
      const tableNames: string[] = []
      const results = await db.getAllAsync(
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
  
 export const removeTable = async (db: SQLiteDatabase) => {
    try {
      await db.execAsync(`DROP TABLE IF EXISTS Contacts
      DROP TABLE IF EXISTS UserPreferences`)
    } catch (error) {
      console.error(error)
      throw Error(`Failed to drop table`)
    }
  };
  
  export const addContact = async(db: SQLiteDatabase, contact: Contact): Promise<void> => {
      await db.runAsync( `
      INSERT INTO Contacts (firstName, name, nickname, phone, email)
      VALUES (?, ?, ?, ?, ?)
    `, [
      contact.firstName,
      contact.name,
      contact.nickname,
      contact.phone,
      contact.email,
    ]);  
  }
  
  export const getContacts = async(db: SQLiteDatabase): Promise<Contact[]> => {
      const result = await db.getAllAsync<Contact>("SELECT * FROM Contacts")
      return result
}
  
  export const updateContact = async (db: SQLiteDatabase, id: number, updatedContact: Contact
  ):Promise<void> => {
    await db.runAsync(
      `UPDATE Contacts
      SET firstName = ?, name = ?, nickname = ?, phone = ?, email = ?
      WHERE id = ?
    `, [
      updatedContact.firstName,
      updatedContact.name,
      updatedContact.nickname,
      updatedContact.phone,
      updatedContact.email,
      id,
    ])
      console.log("Contact updated")
  }

  export const addMessage = async (
    db: SQLiteDatabase,
    receiverId: number,
    content: string,
    isReceived: boolean,
    timestamp: number
    ) => {
      try {
      await db.runAsync( `
        INSERT INTO Messages (receiverId, content, isReceived, timestamp)
        VALUES (?, ?, ?, ?)
        `, [
          receiverId,
          content,
          isReceived ? 1 : 0,
          timestamp,
        ])
        console.log("Message added")
  } catch (error) {
    console.error("Failed to add message", error)
    throw Error("Failed to add message")
  }
    }

    export const getMessages = async (db: SQLiteDatabase, receiverId: number) => {
    try {
      const results = await db.getAllAsync(
        `SELECT content, isReceived, timestamp FROM messages WHERE receiverId = ? 
        ORDER BY timestamp ASC`,
        [receiverId]
      )

      const messages = []

      if (results.length > 0) {
        results.forEach(result => {
          messages.push(result)
        })
      } else {
        console.log('No results found')
      }

      return messages
    } catch (error) {
      console.error("Failed to fetch messages from database", error)
      throw Error("Failed to fetch messages from database")
    }
  }

  export const getMessagesList = async (db: SQLiteDatabase) => {
  try {
    const query = `
      SELECT messages.*, contacts.firstName, contacts.name, contacts.phone 
      FROM messages 
      JOIN contacts ON messages.receiverId = contacts.id 
      ORDER BY messages.timestamp ASC
    `;
    const results = await db.getAllAsync(query);
    console.log('All Results:', results);

    if (results.length > 0) {
      return results.map(result => ({
        id: result.id,
        receiverId: result.receiverId,
        content: result.content,
        isReceived: result.isReceived,
        timestamp: result.timestamp,
        firstName: result.firstName,
        name: result.name,
        phone: result.phone,
      }));
    } else {
      console.log('No results found');
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch all messages from database", error);
    throw Error("Failed to fetch all messages from database");
  }
};
  
  export const getSingleUserPreference = async (db: SQLiteDatabase, userPreference: string,
  ): Promise<string | null> => {
    const allowedPreferences = ["colorPreference","languagePreference"]
  if (!allowedPreferences.includes(userPreference)) {
    throw new Error("Invalid user preference")
  }
  try {
    const results = await db.getAllAsync(`SELECT ${userPreference} FROM UserPreferences WHERE id = 1`)
      if (results[0]?.rows?.length) {
        return results[0].rows.item(0)[userPreference]
      } else {
        return null
      }
      } catch (error) {
    console.error("Failed to get user preference from database", error)
    throw Error("Failed to get user preference from database")
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
  if (!allowedPreferences.includes(singleUserPreference)) {
    throw new Error("Invalid user preference")
  }
  try {
   await db.runAsync(`
        INSERT INTO UserPreferences (id, ${singleUserPreference})
        VALUES (1, ?)
        ON CONFLICT(id) DO UPDATE SET ${singleUserPreference} = ?
    `, [newValue, newValue])
      console.log("User preference updated")
  } catch (error) {
    console.error("Failed to update user preference", error)
    throw Error("Failed to update user preference")
    }
  }
  
  export const deleteContact = async (db: SQLiteDatabase, id: number ) => {
    try {
      await db.runAsync("DELETE FROM Contacts WHERE id =?", [id]);
    } catch (error) {
      console.error(error)
      throw Error("Failed to remove contact")
    }
  }

  
