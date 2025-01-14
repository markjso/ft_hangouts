import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert, Pressable } from 'react-native';
import ContactForm from './AddContact';

const ViewContact = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

   const openEditModal = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setSelectedContact(null); 
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.skillsLink} onPress={() => openEditModal(contact)}>
        <Text style={styles.link}>Edit ></Text>
      </Pressable>
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModals}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ContactForm
              contact={selectedContact}
              onSubmit={handleEditContact}
              onClose={closeModals}
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
    alignItems: 'center',
    backgroundColor: '#36454F',
    paddingTop: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    marginBottom: 20, 
  },
  h4: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5, 
  },
  h5: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 10, 
  },
  contactContainer: {
    marginBottom: 20, 
    width: '80%', 
  },
  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#fff', 
    borderRadius: 8, 
    backgroundColor: '#2C3E50', 
  },
  phoneIcon: {
    marginRight: 10, 
  },
  plusIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#36454F',
  },
  modalContainer: { 
    width: '80%', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 8,
  },
});

export default ViewContact;