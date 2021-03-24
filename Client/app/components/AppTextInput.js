import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "./../config/styles";
import Color from "../config/colors";

function AppTextInput({ icon, placeholder, onSend, width, ...rest }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={[styles.container, { width: width }]}>
        <TextInput
          placeholder={placeholder}
          style={[defaultStyles.text, styles.textInput]}
          {...rest}
        />
      </View>
      {icon && (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            color={defaultStyles.Color.white}
            style={styles.icon}
            name={icon}
            onPress={onSend}
            size={25}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: defaultStyles.Color.lightGray,
    borderRadius: 25,
    flexDirection: "row",
  },
  iconContainer: {
    padding: 5,
    marginLeft: 13,
    backgroundColor: "#0883FB",
    borderRadius: 200,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
  },
  icon: {
    justifyContent: "flex-end",
  },
});

export default AppTextInput;
