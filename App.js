import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactsList from './components/Home';
import AddContact from './components/AddContact';
import ViewContact from './components/ViewContact';

const Stack = createNativeStackNavigator();


export default function App() {

return (
  <NavigationContainer>
    <Stack.Navigator
          screenOptions={{
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
        <Stack.Screen
          name="Home"
          component={ContactsList}
          />
        <Stack.Screen
        name="Add Contact"
        component={AddContact}
        />
        <Stack.Screen
          name="View"
          component={ViewContact}
          options={({ route }) => ({ title: route.params?.title })}
         />   
    </Stack.Navigator>
      </NavigationContainer>
  );
}
