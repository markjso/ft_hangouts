import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState, Alert } from "react";
import ContactForm from './components/AddContact';
import ContactList from './components/Home';
import { getContacts, connectToDatabase, Contact } from './db/dbCreate';

/**
 * @typedef {Object} Contact
 * @property {number} [id]
 * @property {string} firstName
 * @property {string} name
 * @property {string} nickname
 * @property {string} phone
 * @property {string} email
 */

const Stack = createNativeStackNavigator();

export default function App() {
  /** @type {[Contact[], React.Dispatch<React.SetStateAction<Contact[]>>]} */
  const [dbContacts, setdbContacts] = useState([]);
  const [db, setDb] = useState(null);

  const loadData = useCallback(async () => {
  try {
    const db = await connectToDatabase()
    setDb(db);
    await createTables(db)
    const dbContacts = await getContacts(db);
    setdbContacts(dbContacts);
     Alert.alert('Connected to database');
  } catch (error) {
    console.error(error)
    Alert.alert('Unable to connect to database');
  }
}, [])

useEffect(() => {
  loadData()
}, [loadData])

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{headerShown: false, unmountOnBlur: true}}
      >
        {props => <ContactList {...props} db={db} dbContacts={dbContacts} setdbContacts={setdbContacts} />}
      </Stack.Screen>
      <Stack.Screen
        name="Add Contact"
      >
      {props => <ContactForm {...props} db={db} />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

