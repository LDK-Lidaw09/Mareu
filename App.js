import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import "react-native-gesture-handler";
import FormReu from "./screens/AddReu";
import ListReu from "./screens/ListReu";
import DetailReu from "./screens/DetailReu";
//import ReuList from './screens/ReuList';
//import EditReu from './screens/EditReu';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="liste des Reunions">
        <Stack.Screen
          name="liste des Reunions"
          component={ListReu}
          options={{
            headerStyle: {
              backgroundColor: "#3d84f5",
            },
            title: "Ma Reu",
            headerTintColor: "#fff",

            headerRight: (props) => (
              <Icon
                name="filter-list"
                type="material"
                color="white"
                style={{ width: 45 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="AddReu"
          component={FormReu}
          options={{ title: "Add Reunion" }}
        />

        <Stack.Screen
          name="ReunionDetail"
          component={DetailReu}
          options={{ title: "Reunion Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
