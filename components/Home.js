import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ContactForm from './AddContact';
import { getContacts } from '../db/dbCreate';

const defaultContacts =[
    {id: 1, firstName: 'Jane', name: 'Doe', nickname: 'JD', phone: '0444 111 222', email: 'jane@abc.com'},
    {id: 2, firstName: 'John', name: 'Doe', nickname: 'Johnny', phone: '0444 111 333', email: 'john@abc.com'},
  ];

const ContactList = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState(defaultContacts);
  const [showAddModal, setShowAddModal] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const db = await connectToDatabase();
        const fetchedContacts = await getContacts(db);
        setContacts(...defaultContacts, ...fetchedContacts);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const closeModals = () => {
    setShowAddModal(false);
  };

  const handleAddContact = (newContact) => {
    console.log('Adding new contact:', newContact); 
    setContacts([...contacts, { id: Date.now(), ...newContact }]);
    setShowAddModal(false);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactContainer}>
     <View style={styles.row}>
    <Pressable onPress={() => navigation.navigate('View', { title: `${item.firstName} ${item.name}`, 
      phone: item.phone, 
      email: item.email, 
      alias: item.nickname })}> 
        <Text style={styles.h4}>{item.firstName} {item.name} </Text>
    </Pressable>    
        <Pressable style={styles.binIcon} onPress={() => deleteContact(item.id)}>
          <Ionicons name="trash" size={28} color="red" />
        </Pressable>
      </View>
      <View style={styles.phoneBox}>
        <Ionicons name="call-outline" size={28} color="#fff" style={styles.phoneIcon} />
        <Text style={styles.h5}>{item.phone}</Text>
      </View>
     </View> 
  )

  return (
    <View style={styles.container}>
    <Pressable style={styles.plusIcon} onPress={() => setShowAddModal(true)}>
        <Ionicons
          name="add-outline"
          size={28}
          color='#fff'
          />
      </Pressable>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={contacts}
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
    backgroundColor: '#36454F',
    paddingTop: 20,
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
    color: '#ddd',
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
    backgroundColor: '#455463', 
  },
  phoneIcon: {
    marginRight: 10, 
  },
  binIcon: {
     textAlign: 'right',
  },
  plusIcon: {
    position: 'left',
    top: 20,
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

export default ContactList;
