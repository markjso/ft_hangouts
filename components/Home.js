import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactForm from './AddContact';

/**
 * @typedef {Object} Contact
 * @property {number} [id]
 * @property {string} firstName
 * @property {string} name
 * @property {string} nickname
 * @property {string} phone
 * @property {string} email
 */

/**
 * @param {Object} props
 * @param {Contact[]} props.dbContacts
 * @param {React.Dispatch<React.SetStateAction<Contact[]>>} props.setdbContacts
 */

const ContactList = ({ db, dbContacts, setdbContacts }) => {
  const [contacts, setContacts] = useState([
    {id: 1, firstName: 'Jane', name: 'Doe', nickname: 'JD', phone: '0444 111 222', email: 'jane@abc.com'},
    {id: 2, firstName: 'John', name: 'Doe', nickname: 'Johnny', phone: '0444 111 333', email: 'john@abc.com'},
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const closeModals = () => {
    setShowAddModal(false);
    setSelectedContact(null);
  };

   const handleAddContact = (newContact) => {
    setContacts([...contacts, { id: Date.now(), ...newContact }]);
    setdbContacts([...dbContacts, newContact]);
    Alert.alert('Home Contact added successfully');
    setShowAddModal(false);
  };
 
  const deleteContact = (id) => {
    setdbContacts(dbContacts.filter(contact => contact.id !== id));
  };

  const combineContacts = [...contacts, ...dbContacts];

  const renderItem = ({ item }) => (
    <View style={styles.contactContainer}>
      <View style={styles.row}>
        <Text style={styles.h4}>{item.firstName} {item.name}</Text>
        <Pressable style={styles.binIcon} onPress={() => deleteContact(item.id)}>
          <Icon name="trash" size={28} color="red" />
        </Pressable>
      </View>
      <View style={styles.phoneBox}>
        <Icon name="phone" size={28} color="#fff" style={styles.phoneIcon} />
        <Text style={styles.h5}>{item.phone}</Text>
      </View>
     </View> 
  )

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
      <FlatList
        data={combineContacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        />
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModals}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
           <ContactForm db={db} onSubmit={handleAddContact} onClose={closeModals} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    backgroundColor: '#36454F',
    paddingTop: 40,
    paddingLeft: 40,
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
    position: 'center',
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
