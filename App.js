import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from "react";
import ContactForm from './components/AddContact';
import ContactList from './components/Home';
import ViewContact from './components/ViewContact';
import { createTables, connectToDatabase } from './db/dbCreate';

const Stack = createNativeStackNavigator();

export default function App() {
  const loadData = useCallback(async () => {
  try {
    const db = await connectToDatabase()
    await createTables(db)
  } catch (error) {
    console.error(error)
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
          component={ContactList}
          options={{headerShown: false, unmountOnBlur: true}}
          />
        <Stack.Screen
          name="Add Contact"
          component={ContactForm}
          />
        <Stack.Screen
          name="View"
          component={ViewContact}
         />   
      </Stack.Navigator>
    </NavigationContainer>
  );
}