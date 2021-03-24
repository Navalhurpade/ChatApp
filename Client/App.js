import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import { isUserLogedin } from "./app/api/Authstorage";
import AuthContext from "./app/components/AuthContext";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const [user, setUser] = useState();

  var count = 0;
  const restoretoken = async () => {
    count++;
    console.log(count);
    const foundUser = await isUserLogedin();
    if (foundUser) {
      setUser(foundUser);
      console.log("Updating user to !", foundUser);
    }
  };

  useEffect(() => {
    restoretoken();
  }, []);

  console.log("curent user in root is \n", user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {!user ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
