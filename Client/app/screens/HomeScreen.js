import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { removeToken } from "../api/Authstorage";
import http from "../api/http";
import { waitForLetestData, notifyUserJoined } from "../api/httpService";
import AppButton from "../components/AppButton";
import AuthContext from "../components/AuthContext";
import FloatingAButton from "../components/FloatingAButton";
import Screen from "../components/Screen";
import Color from "../config/colors";
import UserCard from "./../components/UserCard";

function HomeScreen({}) {
  const [messages, setMasseges] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    notifyUserJoined(context.user);
    waitForLetestData((data) => {
      console.log("Got letest data ", data);
      context.setUser(data);
    });
  }, []);

  const handleAddFreinds = async (number) => {
    try {
      console.log(context);
      const responce = await http.put("/request", {
        phoneNo: number,
        myId: context.user._id,
      });
      if (responce.data.error) {
        Alert.alert(responce.data.error);
      }
      Alert.alert(responce.data.info);
    } catch (error) {
      console.log("Error !", error);
    }
  };

  return (
    <Screen style={styles.container}>
      {context.user.freinds.map((usr) => (
        <UserCard key={usr} lastMessage="hey" name="naval" date="4/56/7678" />
      ))}
      <FloatingAButton onPress={handleAddFreinds} />
      <AppButton
        title="logout"
        onPress={async () => {
          await removeToken("x-auth-key");
          context.setUser(null);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    flex: 1,
  },
  userContainer: {
    padding: 5,
    backgroundColor: Color.lightGray,
    alignItems: "center",
  },
  newUser: {
    color: Color.black,
  },
});

export default HomeScreen;
