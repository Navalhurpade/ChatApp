import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

function AppNavigator({}) {
  const StackNavigator = createStackNavigator();

  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="chatScreen" component={HomeScreen} />
    </StackNavigator.Navigator>
  );
}

export default AppNavigator;
