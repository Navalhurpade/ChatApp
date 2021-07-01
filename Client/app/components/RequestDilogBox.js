import React, { useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import Color from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./AppButton";

function RequestDilogBox({ data, onPress }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {data && (
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.container}
        >
          <MaterialCommunityIcons
            color="white"
            name="account-circle-outline"
            size={30}
          />
        </TouchableOpacity>
      )}
      <Modal animationType="fade" transparent visible={isVisible}>
        <View style={styles.modal}>
          {data &&
            data.map((req) => (
              <View key={req._id} style={styles.reqCard}>
                <MaterialCommunityIcons
                  size={50}
                  name="account-circle-outline"
                />
                <Text style={styles.name}>{req.name}</Text>
                <Text>{req.phoneNo}</Text>
                <View style={styles.btnBox}>
                  <AppButton
                    style={styles.btn}
                    title="Accept"
                    backgroundColor="green"
                    onPress={() => onPress(true, req._id)}
                  />
                  <AppButton
                    backgroundColor="red"
                    style={styles.btn}
                    title="Delete"
                    onPress={() => onPress(false, req._id)}
                  />
                </View>
              </View>
            ))}

          <Text
            onPress={() => setIsVisible(false)}
            style={{ color: Color.softBlue }}
          >
            Close
          </Text>
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
    top: 10,
    right: 50,
  },
  modal: {
    backgroundColor: Color.lightGray,
    flex: -1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60%",
    borderRadius: 10,
    elevation: 50,
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  reqCard: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBox: {
    marginTop: 10,
    flexDirection: "row",
  },
  btn: {
    margin: 10,
  },
});

export default RequestDilogBox;
