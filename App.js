import { useContext, useEffect } from 'react';
import { Button } from '@react-navigation/elements';
import {NavigationContainer,} from '@react-navigation/native';
import {useNavigation,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import ContactForm from './components/AddContact';
import ViewContact from './components/ViewContact';
import ChangeColor from './components/Customise';
import Messages from './components/Messages';
import ContactsList from './components/Home';
import { SQLiteProvider } from 'expo-sqlite';
import { initialiseDB } from './db/dbCreate';
import LanguageContext from './context/LanguageContext';
import { LanguageProvider } from './context/LanguageContext';
import ColorContext from './context/ColorContext';
import { ColorProvider} from './context/ColorContext';
import { ContactsProvider} from './context/ContactContext';
import { MessagesProvider } from './context/MessagesContext';
import MessagesList from './components/ViewMessages';
import AppBackgroundTime from './components/BackgroundTime';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const {color} = useContext(ColorContext);
  const navigation = useNavigation();
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
      <Tab.Screen name="MessageList" component={MessagesList}
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
          component={ContactsList}
          options={{
            headerRight: () => (
              <>
              <TouchableOpacity onPress={() => setLanguage('en')}>
                <Image source={require('./assets/english.png')} 
                style={{width: 40, height: 40}} 
                />
                </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage('fr')}>
                <Image source={require('./assets/france.png')} 
                style={{width: 50, height: 50}} 
                />
                </TouchableOpacity>
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
          name="MessageUser"
          component={Messages}
          options={({ route }) => ({ title: route.params?.title })}
          />
      </Stack.Navigator>
  );
}


const App= () => {
  return (
  <SQLiteProvider databaseName="ft_hangouts.db" onInit={initialiseDB}>
    <LanguageProvider>
      <ContactsProvider>
        <MessagesProvider>
          <ColorProvider>
            <NavigationContainer>
                <HomeTabs />
                <AppBackgroundTime />
            </NavigationContainer>
          </ColorProvider>
        </MessagesProvider>
      </ContactsProvider>
    </LanguageProvider>
  </SQLiteProvider>
  );
}

export default App;
