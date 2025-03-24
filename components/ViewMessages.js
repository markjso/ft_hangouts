import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useContext } from 'react';
import { useMessages } from '../context/MessagesContext';
import ColorContext from '../context/ColorContext';
import LanguageContext from '../context/LanguageContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import en from '../language/en.json';
import fr from '../language/fr.json';

const MessagesList = () => {
  const { language } = useContext(LanguageContext);
  const navigation = useNavigation(); 
  const locale = language === "en" ? en : fr;
  const {color} = useContext(ColorContext);
  const { messages, fetchAllMessages } = useMessages();

   useFocusEffect(
    useCallback(() => {
      fetchAllMessages();
    }, [])
  );

  useEffect(() => {
    console.log("Messages in component:", messages);
  }, [messages]);

  const groupMessages = messages.reduce((acc, msg) => {
    const { receiverId, content } = msg;
    if (!acc[receiverId]) {
      acc[receiverId] = [];
    }
    acc[receiverId].push({ ...msg, truncatedContent: content.substring(0, 50) + '...' });
    return acc;
  }, {});

  const groupedMessagesArray = Object.keys(groupMessages).map(receiverId => {
    const userMessages = groupMessages[receiverId];
    const latestMessage = userMessages[userMessages.length - 1];
     console.log(`Original timestamp for receiverId ${receiverId}:`, latestMessage.timestamp);
    const myDate = new Date(latestMessage.timestamp);
    const newDate = myDate.toLocaleTimeString(undefined, {timeStyle:'short'});
   
    console.log(`Converted date for receiverId ${receiverId}:`, myDate);
    return { ...latestMessage, messages: userMessages, newDate };
  });

  const renderItem = ({ item }) => (
  <View style={styles.messageContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('MessageUser', {title: `${item.firstName} ${item.name}`, id: item.receiverId })}>
      <View style={styles.row}>
        <Text style={styles.h4}>{item.firstName} {item.name}</Text>
        <Text style={styles.timestamp}>{item.newDate}</Text>
      </View>
      <Text style={styles.messagePreview}>{item.truncatedContent}</Text>
    </TouchableOpacity>
  </View>
);

return (
    <View style={styles.container}>
        <Text style={styles.title}>{locale.MessageList.title}</Text>
        <FlatList
          data={groupedMessagesArray}
          keyExtractor={(item) => item.receiverId ? item.receiverId.toString() : ''}
          renderItem={renderItem}
          />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454F',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    top: 10, 
    marginBottom: 20, 
  },
  h4: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginBottom: 20, 
    paddingTop: 20,
    paddingLeft: 40,
    maxWidth: '90%',
  },
  timestamp: {
    fontSize: 14,
    textAlign: 'right',
    color: '#fff',
  },
  messagePreview: {
    fontSize: 18,
    color: '#fff',
    marginTop: 2,
    paddingBottom: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
});

export default MessagesList;
