import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, SafeAreaView, Alert } from 'react-native';
import LanguageContext from '../context/LanguageContext';
import en from '../language/en.json';
import fr from '../language/fr.json';
import ColorContext from '../context/ColorContext';
import { useContacts } from '../context/ContactContext';

const ContactForm = ({ id, existingContact, onSubmit, onClose }) => {
  console.log('contact: ', existingContact, 'id is: ', id);
  const { addContact, updateContact, fetchContacts } = useContacts();
  const [firstName, setFirstName] = useState(existingContact?.firstName || '');
  const [name, setName] = useState(existingContact?.name || '');
  const [nickname, setNickname] = useState(existingContact?.nickname || '');
  const [phone, setPhone] = useState(existingContact?.phone || '');
  const [email, setEmail] = useState(existingContact?.email || '');
  const { language } = useContext(LanguageContext);
  const locale = language === "en" ? en : fr;
  const { color } = useContext(ColorContext);

  const handleSubmit = async () => {
    if (!firstName || !name || !nickname || !phone || !email ) {
            Alert.alert('Error', 'All fields are required');
            return;
        }
    const newContact = { firstName, name, nickname, phone, email };
    if (id) {
      console.log('Updating contact with id:', id);
      await updateContact(id, newContact);
      fetchContacts();
    } else {
      await addContact(newContact);
    }
    onSubmit(); 
    onClose();
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{id ? locale.AddContact.editTitle : locale.AddContact.title}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={locale.AddContact.inputPlaceholders.firstName}
          value={firstName}
          onChangeText={setFirstName}
          required
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={locale.AddContact.inputPlaceholders.name}
          value={name}
          autoCapitalize='words'
          onChangeText={setName}
          required
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={locale.AddContact.inputPlaceholders.nickname}
          autoCapitalize='none'
          value={nickname}
          onChangeText={setNickname}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          type="tel"
          keyboardType='numeric'
          style={styles.input}
          placeholder={locale.AddContact.inputPlaceholders.phone}
          value={phone}
          onChangeText={setPhone}
          required
        />
      </View>
      <View style={styles.row}>
        <TextInput
          type="email"
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          placeholder={locale.AddContact.inputPlaceholders.email}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Pressable style={[styles.button, { backgroundColor: color }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{locale.AddContact.submitButton}</Text>
      </Pressable>
      <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onClose}>
        <Text style={styles.buttonText}>{locale.AddContact.cancelButton}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#36454F',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    top: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  row: {
    width: '100%',
    marginBottom: 2,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 10,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactForm;
