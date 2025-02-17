import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, SafeAreaView, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import en from '../language/en.json';
import fr from '../language/fr.json';
import LanguageContext from '../context/LanguageContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import ContactForm from './AddContact';
import ColorContext from '../context/ColorContext';
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

const initialiseDB = async (db) => {
    try {
        await db.execAsync(
        `
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS contactsTable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        name TEXT,
        nickname,
        phone TEXT,
        email TEXT);
        `
        );
    console.log("Database connected");
    } catch (error) {
        console.log("Error in connecting: ", error);
    }
};

const defaultContacts = [
    {id: 1, firstName: 'Jane', name: 'Doe', nickname: 'JD', phone: '0444 111 222', email: 'jane@abc.com'},
    {id: 2, firstName: 'John', name: 'Doe', nickname: 'Johnny', phone: '0444 111 333', email: 'john@abc.com'},
  ];

  export default function ContactsList(){
    return (
      <SQLiteProvider databaseName="ft_hangouts.db" on onInit={initialiseDB}>
        <ListContacts />
      </SQLiteProvider>
    );
  }

const ListContacts = () => {
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const [contacts, setContacts] = useState(defaultContacts);
  const [showAddModal, setShowAddModal] = useState(false);
  const {color} = useContext(ColorContext);
  const { language } = useContext(LanguageContext);
  const locale = language === "en" ? en : fr;

  async function fetchContacts() {
    const result = await db.getAllAsync("SELECT * FROM contactsTable");
    setContacts(result);
    conole.log("Contacts fetched", result);
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const closeModals = () => {
    setShowAddModal(false);
  };

  const handleAddContact = async () => {
    await db.runAsync("INSERT into contactsTable (firstName, name, nickname, phone, email) values (?, ?, ?, ?, ?)", [firstName, name, nickname, phone, email]);
    setContacts((prevContacts) => [...prevContacts, savedContact]);
    setShowAddModal(false);
      Alert.alert("Contact added");
  }

  const handleDeleteContact = async (contactId: number) => {
    try {
        const db = await connectToDatabase();
        await deleteContact(db, contactId);
        setContacts(contacts.filter(contact => contact.id !== contactId));
    } catch (error) {
        console.error("Error deleting contact:", error);
    }
};

  const renderItem = ({ item }) => (
    <View style={styles.contactContainer}>
     <View style={styles.row}>
    <Pressable onPress={() => navigation.navigate('View', { title: `${item.firstName} ${item.name}`, 
      firstName: item.firstName,
      name: item.name,
      phone: item.phone, 
      email: item.email, 
      nickname: item.nickname })}> 
        <Text style={styles.h4}>{item.firstName} {item.name} </Text>
    </Pressable>    
        <Pressable style={styles.binIcon} onPress={() => handleDeleteContact(item.id)}>
          <Ionicons name="trash" size={28} color={color} />
        </Pressable>
      </View>
      <View style={styles.phoneBox}>
        <Ionicons name="call-outline" size={28} color="#fff" style={styles.phoneIcon} />
        <Text style={styles.h5}>{item.phone}</Text>
      </View>
     </View> 
  )

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.plusIcon} onPress={() => setShowAddModal(true)}>
          <Ionicons
            name="add-outline"
            size={28}
            color='#fff'
            />
        </Pressable>
        <Text style={styles.title}>{locale.Home.title}</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.phone.toString()}
          renderItem={renderItem}
          />
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={false}
          onRequestClose={closeModals}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
            <ContactForm onSubmit={handleAddContact} onClose={closeModals} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454F',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    top: 10, 
    marginBottom: 20, 
  },
  h4: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5, 
  },
  h5: {
    fontSize: 18,
    color: '#ddd',
    marginLeft: 10, 
  },
  contactContainer: {
    marginBottom: 20, 
    paddingTop: 20,
    paddingLeft: 40,
    width: '80%', 
  },
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#fff', 
    borderRadius: 8, 
    backgroundColor: '#455463', 
  },
  phoneIcon: {
    marginRight: 10, 
  },
  binIcon: {
     textAlign: 'right',
  },
  plusIcon: {
  position: 'absolute', 
  top: 10,             
  right: 10,          
  zIndex: 1,          
},
  modalOverlay: { 
    flex: 1, 
    backgroundColor: '#36454F',
  },
  modalContainer: { 
    width: '100%', 
    height: '100%',
    backgroundColor: '#36454F', 
    padding: 10, 
    borderRadius: 8,
  },
});

