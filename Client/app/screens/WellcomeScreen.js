import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import Color from "../config/colors";

function WellcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppButton
        title="Login"
        onPress={() => navigation.navigate("LoginScreen")}
      />
      <AppButton
        title="Register"
        onPress={() => navigation.navigate("RegisterScreen")}
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
