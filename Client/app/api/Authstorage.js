import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const xAuthToken = "x-auth-token";

export const storeToken = async (value) => {
  try {
    await SecureStore.setItemAsync(xAuthToken, value);
    console.log("\nStoring Token !");
  } catch (error) {
    console.log("got " + value + " for storing !");
    console.log("Error while storing this token", error);
  }
};

export const getToken = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) return value;
    console.log("No Value Found For " + key);
    return;
  } catch (error) {
    console.log("error while geting token", error);
  }
};

export const removeToken = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("token removed !");
  } catch (error) {
    console.log("error while removing token " + key);
  }
};

export const isUserLogedin = async () => {
  try {
    const token = await getToken(xAuthToken);
    if (token) {
      const userdata = jwtDecode(token);
      console.log("found user !", userdata);
      return userdata;
    }
    console.log("No user found !");
    return null;
  } catch (error) {
    console.log("isUserloging feiled !\n", error);
  }
};
