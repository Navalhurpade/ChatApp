import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../config/colors";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";

function FloatingAButton({ onPress }) {
  const [isVisible, setIsVisible] = useState(false);
  const [number, setNumber] = useState("");
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={styles.container}
      >
        <MaterialCommunityIcons color="white" name="plus" size={30} />
      </TouchableOpacity>
      <Modal style={styles.modalContainer} transparent visible={isVisible}>
        <View style={styles.modal}>
          <AppTextInput
            value={number}
            onChangeText={setNumber}
            placeholder="Enter Phone Number"
          />
          <AppButton
            onPress={() => onPress(number)}
            title="Add freind"
            backgroundColor="cyan"
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 60,
    position: "absolute",
    bottom: 80,
    right: 50,
  },
  modal: {
    backgroundColor: Color.lightGray,
    height: 200,
    width: "60%",
    alignSelf: "center",
    marginTop: "70%",
    borderRadius: 10,
    elevation: 50,
    padding: 10,
    paddingBottom: 0,
  },
  modalContainer: {},
});

export default FloatingAButton;
