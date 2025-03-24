import React, { createContext, useContext, useState, useEffect } from "react";
import { getContacts, addContact, updateContact, deleteContact } from "../db/dbCreate";
import { Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const db = useSQLiteContext();

  const fetchContacts = async () => {
    try {
      const result = await getContacts(db);
      setContacts(result);
      console.log("Contacts fetched", result);
      } catch (error) {
      console.error('Failed to fetch contacts', error);
    }
  };

  const handleAddContact = async (contact) => {
      await addContact(db, contact);
      fetchContacts();
      Alert.alert("Contact added");
  };
  
   const handleEditContact = async (id: number, contact) => {
      await updateContact(db, id, contact);
      fetchContacts();
   }

  const handleDeleteContact = async (id: number) => {
        await deleteContact(db, id);
        fetchContacts();
        Alert.alert("Contact deleted");
}

  useEffect(() => {
      fetchContacts();
  }, []);

  return (
    <ContactsContext.Provider value={{ contacts, addContact: handleAddContact, updateContact: handleEditContact, deleteContact: handleDeleteContact, fetchContacts}}>
      {children}
    </ContactsContext.Provider>
  );
};

const useContacts = () => useContext(ContactsContext);

export { ContactsProvider, useContacts };

