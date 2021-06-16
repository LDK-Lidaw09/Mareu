import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import FormReu from './screens/AddReu';
import ListReu from './screens/ListReu';
import DetailReu from './screens/DetailReu';
//import EditReu from './screens/EditReu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default class App extends React.Component  {

  constructor(props){
    super(props);
    
    }

    render (){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="list des Reunions"
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
