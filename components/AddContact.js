import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, SafeAreaView, } from 'react-native';
import ColorContext from '../context/ColorContext';
import LanguageContext from '../context/LanguageContext';
import en from '../language/en.json';
import fr from '../language/fr.json';
import { addContact, updateContact } from '../db/dbCreate';

const ContactForm = ({ onSubmit, onClose, initialContact = null }) => {
  const [firstName, setFirstName] = useState(initialContact?.firstName || '');
  const [name, setName] = useState(initialContact?.name || '');
  const [nickname, setNickname] = useState(initialContact?.nickname || '');
  const [phone, setPhone] = useState(initialContact?.phone || '');
  const [email, setEmail] = useState(initialContact?.email || '');
  const {color} = useContext(ColorContext);
  const { language } = useContext(LanguageContext);
  const locale = language === "fr" ? en : fr;

    const handleSubmit = () => {
    const contactData = { firstName, name, nickname, phone, email };
    if (initialContact) {
      updateContact(contactData); 
    } else {
      addContact(contactData); 
    }
    onSubmit(contactData); 
    setFirstName("");
    setName("");
    setNickname("");
    setPhone("");
    setEmail("");
    onClose();
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>{initialContact ? "Edit Contact" : locale.AddContact.title}</Text>
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
};

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
    marginBottom: 2, // Space between each input
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