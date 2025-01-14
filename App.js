import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from "react";
import ContactForm from './components/AddContact';
import ContactList from './components/Home';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

