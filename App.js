import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useEffect } from "react";
import ContactForm from './components/AddContact';
import { ColorProvider } from './context/ColorContext';
import ContactList from './components/Home';
import ViewContact from './components/ViewContact';
import ChangeColor from './components/Customise';
import Messages from './components/Messages';
import { createTables, connectToDatabase } from './db/dbCreate';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#36454F',
    primary: '#00a8ff',
    card: 'red',
    text: '#fff',
    border: '#fff',
  },
};

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ContactsTab" 
      component={ContactsStack}
      options={{ title: 'Home', headerShown: false,
      tabBarActiveTintColor:"red",  
      tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color={"white"} />
          ),
          headerStyle: {
          backgroundColor: "red", 
        },
        headerTintColor: "#fff", 
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      />
      <Tab.Screen name="Customise" component={ChangeColor}
      options={{ title: 'Customise', 
      tabBarActiveTintColor:"red",  
      tabBarIcon: () => (
            <Ionicons name="settings-outline" size={24} color={"white"} />
          ),
          headerStyle: {
          backgroundColor: 'red', 
        },
        headerTintColor: "#fff", 
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }} />
      <Tab.Screen name="Messages" component={Messages}
      options={{ title: 'Messages', 
      tabBarActiveTintColor:"red",  
      tabBarIcon: () => (
            <Ionicons name="paper-plane-outline" size={24} color={"white"} />
          ),
          headerStyle: {
          backgroundColor: "red", 
        },
        headerTintColor: "#fff", 
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }} />
    </Tab.Navigator>
  );
}

function ContactsStack() {
  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'red'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
          name="Home"
          component={ContactList}
          options={{title: 'ft_hangouts', unmountOnBlur: true}}
          />
        <Stack.Screen
          name="Add Contact"
          component={ContactForm}
          />
        <Stack.Screen
          name="View"
          component={ViewContact}
          options={({ route }) => ({ title: route.params?.title })}
         />   
      </Stack.Navigator>
  );
}

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

const data = React.useContext(ColorProvider);
  React.useEffect(() => {
    if (data?.Colors)
      setTheme({
        ...MyTheme,
        colors: {
          ...MyTheme.colors,
          primary: data?.Colors,
          card: data?.Colors,
        },
      });
  }, [data?.Colors]);

return (
  <ColorProvider>
    <NavigationContainer theme={MyTheme}>
        < HomeTabs/>
    </NavigationContainer>
    </ColorProvider>
  );
}