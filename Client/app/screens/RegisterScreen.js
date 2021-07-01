import React from "react";
import { StyleSheet, Alert, Text } from "react-native";
import * as yup from "yup";

import Screen from "../components/Screen";
import { Form, FormFeed, SubmitButon } from "../components/Forms";
import http from "../api/http";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  phoneNo: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, "Phone Number must be 10 digits")
    .max(10, "Phone Number must be 10 digits"),
  password: yup.string().min(5).required(),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

const handleRegistration = async (usersDetails) => {
  delete usersDetails.ConfirmPassword;

  try {
    const { data } = await http.post("/auth/register", usersDetails);
    if (data) {
      if (data.error) {
        console.log(data.error);
        Alert.alert("Error", data.error);
        return;
      }
      console.log("\nRegister Success ! ", data);
      Alert.alert("Congrats", "Registration sucessfull !");
    }
  } catch (error) {
    console.log("Error !", error);
  }
};
function RegisterScreen({}) {
  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Register To WeChat</Text>
      <Form
        initialValues={{
          name: "",
          phoneNo: "",
          password: "",
          ConfirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegistration}
      >
        <FormFeed placeholder="Name" name="name" width="70%" />
        <FormFeed
          name="phoneNo"
          placeholder="Phone"
          keyboardType="number-pad"
          width="60%"
        />
        <FormFeed
          name="password"
          placeholder="Password"
          secureTextEntry
          width="75%"
        />
        <FormFeed
          name="ConfirmPassword"
          placeholder="Conform Password"
          secureTextEntry
          width="75%"
        />
        <SubmitButon title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  heading: {
    fontSize: 50,
    fontWeight: "400",
  },
});

export default RegisterScreen;
