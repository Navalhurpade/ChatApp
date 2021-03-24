import React, { useContext } from "react";
import { StyleSheet, Text, Alert } from "react-native";

import { Form, FormFeed, SubmitButon } from "../components/Forms";
import Screen from "../components/Screen";
import http from "../api/http";
import * as yup from "yup";
import { storeToken } from "../api/Authstorage";
import AuthContext from "../components/AuthContext";
import jwtDecode from "jwt-decode";

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

function LoginScreen({}) {
  const context = useContext(AuthContext);

  const handleLogin = async (UserDetails) => {
    console.log("Im geting fired !");
    try {
      const { data } = await http.post("/auth", {
        email: UserDetails.username,
        password: UserDetails.password,
      });
      if (data.error) {
        Alert.alert("Error", data.error);
        return;
      }

      await storeToken(data);

      const usersData = jwtDecode(data);

      context.setUser(usersData);
      console.log("seting user to\n", usersData);
      console.log("now user is ", context.user);
    } catch (error) {
      console.log("Error while loging user", error);
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Login to WeChat</Text>
      <Form
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <FormFeed name="username" placeholder="Email or Phone" />
        <FormFeed name="password" placeholder="password" secureTextEntry />
        <SubmitButon title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 40,
    fontWeight: "400",
  },
});

export default LoginScreen;
