import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, SafeAreaView, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ContactForm from './AddContact';
import en from '../language/en.json';
import fr from '../language/fr.json';
import LanguageContext from '../context/LanguageContext';
import ColorContext from '../context/ColorContext';
import { useContacts } from '../context/ContactContext';

const ContactsList = () => {
  const { contacts, deleteContact, fetchContacts, addContact } = useContacts();
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { language } = useContext(LanguageContext);
  const locale = language === "en" ? en : fr;
  const {color} = useContext(ColorContext);

  useEffect(() => {
    fetchContacts();
  }, []);

  const closeModals = () => {
    setShowAddModal(false);
    setCurrentId(null);
  };

  const handleAddContact = async (contact) => {
    console.log('current id is : ', currentId)
      if (currentId) {
        await updateContact(currentId, contact);
      } else {
        await addContact(contact);
      }
      fetchContacts();
      closeModals();
      Alert.alert("Contact added");
  };

  const removeContact = async (id) => {
        await deleteContact(id);
};

  const renderItem = ({ item }) => (
    <View style={styles.contactContainer}>
     <View style={styles.row}>
    <Pressable onPress={() => navigation.navigate('View', { title: `${item.firstName} ${item.name}`, 
      id: item.id,
      firstName: item.firstName,
      name: item.name,
      phone: item.phone, 
      email: item.email, 
      nickname: item.nickname })}> 
        <Text style={styles.h4}>{item.firstName} {item.name} </Text>
    </Pressable>    
        <Pressable style={styles.binIcon} onPress={() => removeContact(item.id)}>
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
      <Pressable style={styles.plusIcon} onPress={() =>{ 
        setCurrentId(null)
        setShowAddModal(true)
      }}>
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
            <ContactForm onSubmit={handleAddContact} onClose={closeModals} id={currentId} />
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
    fontSize: 24,
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

export default ContactsList;
