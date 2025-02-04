import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton } from '@react-navigation/elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useEffect, useContext } from "react";
import { Image } from 'react-native';
import ContactForm from './components/AddContact';
import { ColorProvider} from './context/ColorContext';
import ContactList from './components/Home';
import ViewContact from './components/ViewContact';
import ChangeColor from './components/Customise';
import Messages from './components/Messages';
import ColorContext from './context/ColorContext';
import LanguageContext from './context/LanguageContext';
import { LanguageProvider} from './context/LanguageContext';
import en from './language/en.json';
import fr from './language/fr.json';
import { createTables, connectToDatabase } from './db/dbCreate';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const {color} = useContext(ColorContext);

  return (
    <Tab.Navigator>
      <Tab.Screen name="ContactsTab" 
      component={ContactsStack}
      options={{ title: 'Home', headerShown: false,
      headerStyle: {
          backgroundColor:color, 
        },
      tabBarActiveTintColor:color,  
      tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        headerTintColor: "#fff", 
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      />
      <Tab.Screen name="Customise" component={ChangeColor}
      options={{ title: 'Customise', 
      headerStyle: {
          backgroundColor:color, 
        },
      tabBarActiveTintColor:color,  
      tabBarIcon: () => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        headerTintColor: "#fff", 
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }} />
      <Tab.Screen name="Messages" component={Messages}
      options={{ title: 'Messages', 
      headerStyle: {
          backgroundColor:color, 
        },
      tabBarActiveTintColor:color,  
      tabBarIcon: () => (
            <Ionicons name="paper-plane-outline" size={24} color={color} />
          ),
        headerTintColor: "#fff", 
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }} />
    </Tab.Navigator>
  );
}

function ContactsStack() {
  const { color } = useContext(ColorContext);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: color},
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
          name="Home"
          component={ContactList}
          options={{
            headerRight: () => (
              <>
              <HeaderButton onPress={() => setLanguage('en')}></HeaderButton>
                <Image source={require('./assets/english.png')} 
                style={{width: 40, height: 40}} 
                />
              <HeaderButton onPress={() => setLanguage('fr')}></HeaderButton>
                <Image source={require('./assets/france.png')} 
                style={{width: 50, height: 50}} 
                />
              </>
            ),
            title: 'ft_hangouts', unmountOnBlur: true
            }}
          />
        <Stack.Screen
          name="Add Contact"
          component={ContactForm}
          options={{headerShown: false}}
          />
        <Stack.Screen
          name="View"
          component={ViewContact}
          options={({ route }) => ({ title: route.params?.title })}
         />   
         <Stack.Screen
          name="Messages"
          component={Messages}
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



return (
  <LanguageProvider>
    <ColorProvider>
      <NavigationContainer>
          < HomeTabs/>
      </NavigationContainer>
    </ColorProvider>
  </LanguageProvider>
  );
}