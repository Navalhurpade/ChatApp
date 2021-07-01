import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";

function AppNavigator({}) {
  const StackNavigator = createStackNavigator();

  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="homeScreen" component={HomeScreen} />
      <StackNavigator.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </StackNavigator.Navigator>
  );
}

export default AppNavigator;
