import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const EditContact = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            required
          />
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={name}
            onChangeText={setName}
            required
          />
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>Nickname</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Alias"
            value={nickname}
            onChangeText={setNickname}
            required
          />
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>Phone</Text>
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
        <Text style={styles.label}>Email</Text>
          <TextInput
            type="email"
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            required
          />
        </View>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
    alignItems: 'center',
    backgroundColor: '#36454F',
    paddingTop: 20,
	},
	input: {
		height: 40,
		width: 180,
		margin: 10,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderRadius: 10,
		textAlign: 'center',
	},
  label: {
    flex: 1,
    color: 'white',
    textAlign: 'left',
    fontSize: 19,
    paddingLeft: 20,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditContact;