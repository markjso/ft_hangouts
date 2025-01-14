import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactForm from './AddContact';

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const closeModals = () => {
    setShowAddModal(false);
    setSelectedContact(null); 
  };

   const handleAddContact = (newContact) => {
    setContacts([...contacts, { id: Date.now(), ...newContact }]);
    setShowAddModal(false);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <View style={styles.container}>
    <Pressable style={styles.plusIcon} onPress={() => setShowAddModal(true)}>
        <Icon
          name="plus"
          size={28}
          color='#fff'
          />
      </Pressable>
      <Text style={styles.title}>Contacts</Text>
      <View style={styles.contactContainer}>
        <View style={styles.row}>
        <Text style={styles.h4}>Jane Doe</Text>
        <Pressable style={styles.binIcon} onPress={deleteContact}>
        <Icon
          name="trash"
          size={28}
          color="red"
          />
          </Pressable>
          </View>
        <View style={styles.phoneBox}>
          <Icon 
            name="phone"
            size={28}
            color="#fff" 
            style={styles.phoneIcon}
          />
          <Text style={styles.h5}>0444 111 222</Text>
        </View>
      </View>
      <View style={styles.contactContainer}>
      <View style={styles.row}>
        <Text style={styles.h4}>John Doe</Text>
        <Icon
          name="trash"
          size={28}
          color="red"
          style={styles.binIcon}
          />
          </View>
        <View style={styles.phoneBox}>
          <Icon 
            name="phone"
            size={28}
            color="#fff" 
            style={styles.phoneIcon}
          />
          <Text style={styles.h5}>0444 222 333</Text>
        </View>
      </View>
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModals}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
           <ContactForm onSubmit={handleAddContact} onClose={closeModals} />
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
    backgroundColor: '#2C3E50', 
  },
  phoneIcon: {
    marginRight: 10, 
  },
  binIcon: {
     textAlign: 'right',
  },
  plusIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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

export default ContactList;
