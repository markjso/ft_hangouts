import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, SafeAreaView, } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";



export default function AddContact({route}) {
  const {id} = route.params;
  return(
    <SQLiteProvider databaseName="ft_hangouts.db">
      <ContactForm id={id} />
    </SQLiteProvider>
  )
}

export function ContactForm ({ onSubmit, onClose}) {
  const contactID = id.id;
  const db = useSQLiteContext();
  const [firstName, setFirstName] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState( '');

    const handleSubmit = async (id) => {
    const newContact = { firstName, name, nickname, phone, email };
    if (contactID) {
      updateContact(newContact); 
    } else {
      await onSubmit(newContact);
    }

    setFirstName("");
    setName("");
    setNickname("");
    setPhone("");
    setEmail("");
    onClose();
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>{initialContact ? AddContact : EditContact}</Text>
        <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="first Name"
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
              autoCapitalize='words'
              onChangeText={setName}
              required
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="nickname"
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
              placeholder="Phone No"
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
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
            <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
            <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
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
