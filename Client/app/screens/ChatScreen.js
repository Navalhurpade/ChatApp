import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { sendMessage } from "./../api/httpService";
import Color from "../config/colors";
import AuthContext from "../components/AuthContext";
import MessegeCard from "../components/MessageCard";

function ChatScreen({ navigation, route }) {
  const [messageInput, setMessageInpute] = useState("");

  const { user } = useContext(AuthContext);
  const {
    freind: { name },
    conversation: { participents, conversations, _id: conversationId },
  } = route.params;

  const [chats, setChats] = useState(conversations);

  useEffect(() => {}, [chats]);

  const handleMessageSend = () => {
    sendMessage(messageInput, conversationId, user._id);
    setChats([
      ...chats,
      {
        text: messageInput,
        sender: user._id,
        reciver: participents.filter((p) => p._id != user._id)[0]._id,
        sendAt: Date.now(),
      },
    ]);
    setMessageInpute("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={Color.grey}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <MaterialCommunityIcons
          name="account-circle"
          color={Color.primary}
          size={57}
          style={{ paddingLeft: 20 }}
        />
        <View style={{ paddingLeft: 6, flex: 1 }}>
          <Text style={styles.name}> {name} </Text>
          <Text style={{ color: Color.grey }}> Online </Text>
        </View>
        <MaterialCommunityIcons
          name="phone-outline"
          color={Color.grey}
          size={40}
          style={{ paddingLeft: 20 }}
        />
      </View>

      <ScrollView style={styles.messegeContainer}>
        {chats.map((messageData) => (
          <MessegeCard
            key={messageData._id}
            messageData={messageData}
            userId={user._id}
          />
        ))}
      </ScrollView>

      <View style={styles.feedArea}>
        <MaterialCommunityIcons
          style={{ paddingTop: 10 }}
          name="emoticon-happy-outline"
          size={35}
          color={Color.grey}
        />
        <TextInput
          onChangeText={setMessageInpute}
          value={messageInput}
          placeholder="Type a message"
          style={styles.inpute}
        />
        <View style={styles.circle}>
          <MaterialCommunityIcons
            onPress={handleMessageSend}
            name="send"
            size={30}
            color="white"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightGray,
  },
  header: {
    flexDirection: "row",
    elevation: 30,
    height: 115,
    backgroundColor: Color.lightGray,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 0,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  messegeContainer: {
    flex: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: "white",
  },
  feedArea: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Color.lightGray,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  inpute: {
    flex: 1,
    paddingHorizontal: 20,
  },
  circle: {
    height: 55,
    width: 55,
    borderRadius: 50,
    backgroundColor: Color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;
