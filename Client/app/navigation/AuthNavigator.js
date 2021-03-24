import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WellcomeScreen from "../screens/WellcomeScreen";

const AuthNavigator = () => {
  const Auth = createStackNavigator();
  return (
    <Auth.Navigator>
      <Auth.Screen name="WellcomeScreen" component={WellcomeScreen} />
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
    </Auth.Navigator>
  );
};

export default AuthNavigator;
