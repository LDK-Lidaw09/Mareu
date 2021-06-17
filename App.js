import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import FormReu from './screens/AddReu';
import ListReu from './screens/ListReu';
import DetailReu from './screens/DetailReu';
//import EditReu from './screens/EditReu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Stack = createStackNavigator();
export default function App ()   {
    
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="liste des Reunions"
          component={ListReu}
          options={{ title: 'Ma Reu' }}
        />
        <Stack.Screen 
        name="AddReu" 
        component={FormReu}
        options={{ title: 'Add Reunion' }} />

        <Stack.Screen 
       name="ReunionDetail" 
       component={DetailReu} 
       options={{ title: 'Reunion Detail' }}
      />
      </Stack.Navigator>
      
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
