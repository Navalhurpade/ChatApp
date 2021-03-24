import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../config/colors";
import Screen from "./Screen";

function UserCard({
  name = "Naval Hurpade",
  lastMessage = "Hey I'm using Wechat",
  date = "12/03/2021",
}) {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.img}>
          <MaterialCommunityIcons color="blue" size={35} name="account" />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.message}>{lastMessage}</Text>
        </View>
        <View style={styles.date}>
          <Text>{date}</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.lightGray,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  subContainer: {
    paddingHorizontal: 13,
    flex: 1,
  },
  name: {
    fontSize: 18,
    paddingBottom: 5,
    fontWeight: "300",
  },
  message: {
    fontWeight: "100",
    color: Color.grey,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserCard;
