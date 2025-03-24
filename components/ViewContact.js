import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable , Modal} from 'react-native';
import ContactForm from './AddContact';
import en from '../language/en.json';
import fr from '../language/fr.json';
import LanguageContext from '../context/LanguageContext';
import { useContacts } from '../context/ContactContext';

const ViewContact = ({ route, navigation }) => {
  const { id } = route.params || {};
  const { fetchContacts, contacts } = useContacts();
  const [contact, setContact] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const { language } = useContext(LanguageContext);
  const locale = language === "en" ? en : fr;

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const updatedContact = contacts.find(c => c.id === id);
    if (updatedContact) {
      setContact(updatedContact);
    }
  }, [contacts, id]);

  const handleModalClose = () => {
    setShowEditModal(false);
    fetchContacts();
  };
 
  return ( 
    <View style={styles.container}>
      <Pressable style={styles.skillsLink} onPress={() => setShowEditModal(true)}>
        <Text style={styles.link}>{locale.View.editLink} ></Text>
      </Pressable>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>{locale.View.nickname}</Text>
        <Text style={styles.h5}>{contact.nickname}</Text>
      </View>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>{locale.View.phone}</Text>
        <Text style={styles.h5}>{contact.phone}</Text>
      </View>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>{locale.View.email}</Text>
        <Text style={styles.h5}>{contact.email}</Text>
      </View>
     <Pressable style={styles.phoneBox} onPress={() => navigation.navigate('MessageUser', { receiverId: id, title: `${contact.firstName} ${contact.name}`})}>
        <Text style = {styles.h6}>{locale.View.send}</Text>
      </Pressable>
      <Modal 
        visible={showEditModal} 
        animationType="slide" 
        transparent={false}
        onRequestClose={() => setShowEditModal(false)}
        >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
            <ContactForm
              id={id}
              existingContact={contact}
              onSubmit={handleModalClose}
              onClose={() => setShowEditModal(false)}
            />
            </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454F',
    paddingTop: 40,
    paddingLeft: 40,
  },
  h6: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5, 
  },
  h5: {
    fontSize: 18,
    color: '#ddd',
    marginLeft: 10, 
  },
  phoneBox: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '80%',
    padding: 5, 
    borderWidth: 1, 
    borderColor: '#fff',
    backgroundColor: '#455463',
    borderRadius: 8, 
    marginBottom: 10
  },
  link: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'right',
  },
  skillsLink: {
    position: 'absolute',
    top: 10,
    right: 20,
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


export default ViewContact;
