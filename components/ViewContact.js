import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable , Modal} from 'react-native';
import ContactForm from './AddContact';
import en from '../language/en.json';
import fr from '../language/fr.json';
import LanguageContext from '../context/LanguageContext';


const ViewContact = ({route, navigation}) => {
  const { firstName, name, nickname, phone, email, title } = route.params || {};
  const [showEditModal, setShowEditModal] = useState(false);
  const { language } = useContext(LanguageContext);
  const locale = language === "fr" ? en : fr;

  return ( 
    <View style={styles.container}>
      <Pressable style={styles.skillsLink} onPress={() => setShowEditModal(true)}>
        <Text style={styles.link}>{locale.View.editLink} ></Text>
      </Pressable>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>{locale.View.nickname}</Text>
        <Text style={styles.h5}>{nickname}</Text>
      </View>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>{locale.View.phone}</Text>
        <Text style={styles.h5}>{phone}</Text>
      </View>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>{locale.View.email}</Text>
        <Text style={styles.h5}>{email}</Text>
      </View>
     <Pressable style={styles.phoneBox} onPress={() => navigation.navigate('Messages', { title: `${firstName} ${name}`})}>
        <Text style = {styles.h6}>{locale.View.send}</Text>
      </Pressable>
      <Modal 
        visible={showEditModal} 
        animationType="slide" 
        transparent={false}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
            <ContactForm
              initialContact={{ firstName, name, nickname, phone, email, title }}
              onSubmit={() => setShowEditModal(false)}
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