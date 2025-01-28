import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { addContact,  } from '../db/dbCreate';

const ContactForm = ({ onSubmit, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

    const handleSubmit = () => {
    const newContact = { firstName, name, nickname, phone, email };
    console.log('New contact:', newContact); // Log the new contact
    addContact(newContact);
    onSubmit(newContact); // Ensure onSubmit is called
    setFirstName("");
    setName("");
    setNickname("");
    setPhone("");
    setEmail("");
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            required
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={name}
            onChangeText={setName}
            required
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Enter Alias"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            type="tel"
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            required
          />
        </View>
        <View style={styles.row}>
          <TextInput
            type="email"
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Contact</Text>
        </Pressable>
         <Pressable style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 20
	},
	input: {
		width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
	},
  row: {
    width: '100%',
    marginBottom: 15, // Space between each input
  },
  button: {
    backgroundColor: '#007AFF', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactForm;