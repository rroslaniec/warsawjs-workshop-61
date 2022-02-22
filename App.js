import { StatusBar } from "expo-status-bar";
import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { Article } from "./screens/Article";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="Article"
            component={Article}
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden />
    </Fragment>
  );
}
