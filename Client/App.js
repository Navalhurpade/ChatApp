import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import { isUserLogedin } from "./app/api/Authstorage";
import AuthContext from "./app/components/AuthContext";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const [user, setUser] = useState();

  const restoretoken = async () => {
    const foundUser = await isUserLogedin();
    if (foundUser) {
      setUser(foundUser);
    }
  };

  useEffect(() => {
    restoretoken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {!user ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
