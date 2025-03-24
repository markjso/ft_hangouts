import React, { createContext, useContext, useState } from "react";
import { addMessage, getMessages, getMessagesList } from "../db/dbCreate";
import { useSQLiteContext } from 'expo-sqlite';

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const db = useSQLiteContext();

  const fetchMessages = async (receiverId) => {
    try {
      const result = await getMessages(db, receiverId);
      setMessages(result);
      console.log('Messages fetched', result);
      } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const handleAddMessages = async (message) => {
      await addMessage(db, message.receiverId, message.content, message.isRecieved, message.timestamp);
      fetchMessages(message.receiverId);
      console.log('Message content is', message.content );
  };

  const fetchAllMessages = async () => {
    try {
      const result = await getMessagesList(db);
      setMessages(result);
      console.log("All Messages fetched", result);
      } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };
  
  return (
    <MessagesContext.Provider value={{ messages, addMessages: handleAddMessages, fetchMessages, fetchAllMessages}}>
      {children}
    </MessagesContext.Provider>
  );
};

const useMessages = () => useContext(MessagesContext);

export { MessagesProvider, useMessages };
