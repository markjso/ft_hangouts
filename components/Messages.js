import { View, TextInput, Text, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect, useContext } from 'react';
import { useMessages } from '../context/MessagesContext';
import ColorContext from '../context/ColorContext';
import LanguageContext from '../context/LanguageContext';
import en from '../language/en.json';
import fr from '../language/fr.json';

const Messages = ({ route, navigation }) => {
  const { receiverId, title } = route.params || {};
  console.log('id is: ', receiverId);
  const [content, setContent] = useState('');
  const { messages, addMessages, fetchMessages } = useMessages();
  const { language } = useContext(LanguageContext);
  const locale = language === 'en' ? en : fr;
  const {color} = useContext(ColorContext);

  useEffect(() => {
    if (receiverId)
    fetchMessages(receiverId);
  }, []);

  const handleSendMessage = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Message cannot be empty');
      return;
    }
    const newMessage = { 
      receiverId, 
      content: content, 
      isRecieved: false, 
      timestamp: Date.now(),
    };
    await addMessages(newMessage);
    setContent('');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={[styles.messageBox, { backgroundColor: color }]}>{item.content}</Text>
          </View>
        )}
        />
      <View style={styles.row}>  
        <View>
          <TextInput
            style={styles.input}
            placeholder="Text Message"
            value={content}
            onChangeText={setContent}
          />
          <Pressable onPress={handleSendMessage} style={styles.arrowIcon}>
          <Ionicons name="arrow-up-circle" size={28} color={color} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end', 
    justifyContent: 'center',
    backgroundColor: '#36454F',
    paddingTop: 20,
    paddingLeft: 40,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  messageBox: {
    fontSize: 18,
    padding: 10, 
    borderWidth: 1, 
    borderRadius: 10, 
    alignSelf: 'flex-end',
  },
  arrowIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -14 }],
  },
  input: {
    padding: 20,
    backgroundColor: '#fff',
    paddingRight: 40,
    borderRadius: 10,
	},  
   row: {
    width: '100%',
    marginBottom: 3,
  },
});

export default Messages;
