import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  sendMessage,
  waitForNewUser,
  waitformessage,
  waitForUserLeave,
} from "../api/httpService";
import AppButton from "../components/AppButton";
import MessegeCard from "../components/MessegeCard";
import Color from "../config/colors";
import AppTextInput from "./../components/AppTextInput";
const genrateUniqId = require("uuid/v4");

function HomeScreen({ route }) {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMasseges] = useState([]);
  const [newUsers, setNewUser] = useState([]);
  const [leavedUsers, setLeavedUsers] = useState([]);

  const user = route.params;

  useEffect(() => {
    //if Component is mounted
    let isMounted = true;

    //then wait for NewMesseges
    waitformessage((m) => {
      const allMesseges = [...messages, m];
      if (isMounted) setMasseges(allMesseges);
    });

    //and wait for new Users
    waitForNewUser((newUser) => {
      const note = `${newUser} joined the chat !`;
      const messageId = genrateUniqId();

      const allnewUsers = [
        ...messages,
        { isNote: true, note: note, _id: messageId },
      ];
      if (isMounted) setMasseges(allnewUsers);
    });

    //waiting for user-leave event
    waitForUserLeave((leftUsersName) => {
      const note = `${leftUsersName} Left the chat !`;
      const messageId = genrateUniqId();

      const allnewUsers = [
        ...messages,
        { isNote: true, note: note, _id: messageId },
      ];
      if (isMounted) setMasseges(allnewUsers);
    });

    //Cleaning up memmory if Copomponent is unmounted !
    return () => {
      isMounted = false;
    };
  });

  const handleMessageSend = () => {
    //if Input feed is empty return
    if (!messageInput) return;

    //Genrate uniq id for message
    const messageId = genrateUniqId();

    //Creating and storing Messege Object in app state
    setMasseges([
      ...messages,
      { message: messageInput, sender: user, _id: messageId },
    ]);

    //Sending Message data to server
    sendMessage(messageInput, messageId, user);

    //reseting Input feed
    setMessageInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((messageData) => (
          <MessegeCard
            key={messageData._id}
            user={user}
            messageData={messageData}
          />
        ))}
      </ScrollView>
      <AppTextInput
        placeholder="Type a message"
        value={messageInput}
        onChangeText={setMessageInput}
        icon="send"
        onSend={handleMessageSend}
      />
    </View>
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
