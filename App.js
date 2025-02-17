import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton } from '@react-navigation/elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useEffect, useContext } from "react";
import { Image, Alert, StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddContact from './components/AddContact';
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const {color} = useContext(ColorContext);
  const { language } = useContext(LanguageContext);
  const locale = language === "en" ? en : fr;

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
      options={{ title: locale.Customise.pageTitle, 
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
            title: "",
            headerRight: () => (
              <View style={styles.iconContainer}>
              <HeaderButton onPress={() => setLanguage('en')}>
                <Image source={require('./assets/english.png')} 
                style={styles.iconEn} 
                />
              </HeaderButton>
              <HeaderButton onPress={() => setLanguage('fr')}>
                <Image source={require('./assets/france.png')} 
                style={styles.iconFr} 
                />
              </HeaderButton>
              </View>
              
            ),
            }}
          />
        <Stack.Screen
          name="Add Contact"
          component={AddContact}
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

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  iconEn: {
    width: 40,
    height: 40,
  },
  iconFr: {
    width: 50,
    height: 50,
    marginHorizontal: -5,
    marginVertical: -10,
  }
});

export default function App() {
  const loadData = useCallback(async () => {
  try {
    const db = await connectToDatabase()
    await createTables(db)
  } catch (error) {
    Alert.alert("can't connect to db", error)
  }
}, [])

useEffect(() => {
  loadData()
}, [loadData])

return (
  <LanguageProvider>
    <ColorProvider>
    <SafeAreaProvider>
      <NavigationContainer>
          < HomeTabs/>
      </NavigationContainer>
      </SafeAreaProvider>
    </ColorProvider>
  </LanguageProvider>
  );
}
