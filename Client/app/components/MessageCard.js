import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Color from "../config/colors";

function MessegeCard({ messageData, userId }) {
  const { sender, text, sendAt } = messageData;
  let isSelf = sender === userId;

  console.log(messageData);

  return <Messege isSelf={isSelf} message={text} />;
}

const Messege = ({ message, isSelf }) => {
  return (
    <View
      style={[
        { alignItems: isSelf ? "flex-end" : "flex-start" },
        styles.container,
      ]}
    >
      {isSelf ? (
        <SendMessage text={message} />
      ) : (
        <RecivedMessage text={message} />
      )}
    </View>
  );
};

const Note = ({ note }) => {
  return (
    <View style={styles.noteContainer}>
      <View style={styles.noteSubContainer}>
        <Text style={styles.note}>{note}</Text>
      </View>
    </View>
  );
};

const SendMessage = ({ text }) => {
  return (
    <View style={[styles.sendMessage, styles.message]}>
      <Text style={{ color: Color.white }}> {text} </Text>
    </View>
  );
};

const RecivedMessage = ({ text }) => {
  return (
    <View style={[styles.recivedMessage, styles.message]}>
      <Text style={{ color: Color.black }}> {text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  message: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  noteContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  noteSubContainer: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    backgroundColor: Color.lightGray,
  },
  note: {
    color: Color.medium,
  },
  sendMessage: {
    borderTopEndRadius: 4,
    backgroundColor: Color.softBlue,
  },
  recivedMessage: {
    borderTopStartRadius: 1,
    backgroundColor: Color.lightGray,
  },
});

export default MessegeCard;
