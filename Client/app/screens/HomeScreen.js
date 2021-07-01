import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { removeToken } from "../api/Authstorage";
import http from "../api/http";
import {
  waitForLetestData,
  notifyUserJoined,
  fallbackToLogin,
} from "../api/httpService";
import AppButton from "../components/AppButton";
import AuthContext from "../components/AuthContext";
import FloatingAButton from "../components/FloatingAButton";
import Screen from "../components/Screen";
import Color from "../config/colors";
import UserCard from "./../components/UserCard";
import RequestDilogBox from "../components/RequestDilogBox";

function HomeScreen({ navigation }) {
  const usersDetail = useContext(AuthContext);
  const [data, setData] = useState({});
  const [conversations, setConversation] = useState([]);
  const [refreshing, setFreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    waitForLetestData((recivedData) => {
      console.log("Got letest data !", recivedData);
      if (isMounted) {
        setData(recivedData);
        console.log("Data is", data);
        recivedData.freinds.map((usr) => {
          const convObj = {
            freindId: usr.freind._id,
            name: usr.freind.name,
            chat: usr.conversation.conversations,
            chatId: usr.conversation._id,
          };
          const add = [...conversations, convObj];
          setConversation(add);
        });
      }
    });

    fallbackToLogin(() => {
      removeToken();
      usersDetail.setUser(null);
    });
    return () => {
      isMounted = false;
    };
  });

  useEffect(() => {
    notifyUserJoined(usersDetail.user._id);
  }, []);

  const handleAddFreinds = async (number) => {
    try {
      const {
        data: { error, info },
      } = await http.put("/request", {
        phoneNo: number,
        myId: usersDetail.user._id,
      });
      if (error) {
        Alert.alert("Sorry !", error);
      }
      Alert.alert("Ok !", info);
    } catch (err) {
      console.log("Error !", err);
    }
  };

  const handleFreindReq = async (isAcepted, reqUserId) => {
    try {
      const data = {
        myId: usersDetail.user._id,
        requestedUsersId: reqUserId,
        isAcepted: isAcepted,
      };
      const responce = await http.patch("/request/acepted", data);

      if (responce.body.error) {
        Alert.alert(responce.body.error);
        console.log("Error", responce.body);
      }
    } catch (error) {}
  };

  const { freinds, freindRequests } = data;

  return (
    <Screen style={styles.container}>
      <RequestDilogBox onPress={handleFreindReq} data={freindRequests} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={freinds}
          keyExtractor={(usr) => usr.freind._id}
          renderItem={(usr) => (
            <UserCard
              key={usr.freind._id}
              lastMessage="hey"
              name={usr.freind.name}
              date="4/56/7678"
              onPress={() => navigation.navigate("ChatScreen", usr)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {}}
        />
      </View>
      <FloatingAButton onPress={handleAddFreinds} />
      <AppButton
        title="logout"
        onPress={async () => {
          await removeToken("x-auth-key");
          usersDetail.setUser(null);
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
  request: {},
});

export default HomeScreen;
