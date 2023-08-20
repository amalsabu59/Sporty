import { useEffect, useState } from "react";

import { Image } from "react-native";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { googleLogoUrl } from "../../utils/helper";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { closeLoginModal, login } from "../../redux/slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
// import React from "react";
//web
//366094365462-197oa06f3gvb7vc233snki83ktg9u94t.apps.googleusercontent.com
//android
// 366094365462-17ugb03j7qm7k9g1t42denlrjca6n91n.apps.googleusercontent.com
// const [userInfo, setUserInfo] = React.useState();

const GoogleSignInButton = ({
  text = "Sign in with Google",
  buttonColor,
  buttonTextColor,
}) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promtAsync] = Google.useAuthRequest({
    webClientId:
      "366094365462-197oa06f3gvb7vc233snki83ktg9u94t.apps.googleusercontent.com",
    androidClientId:
      "366094365462-17ugb03j7qm7k9g1t42denlrjca6n91n.apps.googleusercontent.com",
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    handleEffect();
    console.log("I fire once");
  }, [response]);

  async function handleEffect() {
    const user = await getLocalUser();

    if (!user) {
      if (response?.type === "success") {
        // console.log(response.authentication.accessToken);
        setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
        dispatch(closeLoginModal());
        // navigation.navigate("Cart");
      }
    } else {
      console.log("entering");
      dispatch(closeLoginModal());

      // dispatch(
      //   login({ email: user.email, name: user.given_name, isGoogleUser: true })
      // );
      setUserInfo(user);
      // console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@currentUser");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      console.log(user.email, user.given_name);
      await AsyncStorage.setItem(
        "@currentUser",
        JSON.stringify({ email: user.email, name: user.given_name })
      );

      dispatch(
        login({ email: user.email, name: user.given_name, isGoogleUser: true })
      );
      dispatch(closeLoginModal());
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };
  // const promtAsync = () => {};
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonColor ? { backgroundColor: buttonColor } : null,
      ]}
      onPress={() => promtAsync()}
    >
      <View style={styles.insideButtonContainer}>
        <Image
          source={require("../../assets/images/google.png")}
          width={25}
          height={25}
        />
        <Text
          style={[
            styles.buttonText,
            buttonTextColor ? { color: buttonTextColor } : null,
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 24,
    display: "flex",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#A9A9A9",
  },
  buttonText: {
    fontFamily: "sans-serif",
    color: "#1A1A1A",
    fontSize: 20,
    fontWeight: 400,
  },
  insideButtonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",

    // backgroundColor: "red",
  },
});

export default GoogleSignInButton;
