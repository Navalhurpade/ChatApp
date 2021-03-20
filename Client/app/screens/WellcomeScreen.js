import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { notifyUserJoined } from "../api/httpService";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Color from "../config/colors";

function WellcomeScreen({ navigation }) {
  const [user, setUser] = useState("");

  return (
    <View style={styles.container}>
      <Text>Enter Your Name To join the chat !</Text>
      <AppTextInput value={user} onChangeText={setUser} />
      <AppButton
        title="Join Now !"
        onPress={() => {
          notifyUserJoined(user);
          navigation.navigate("chatScreen", user);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,
  },
});

export default WellcomeScreen;
