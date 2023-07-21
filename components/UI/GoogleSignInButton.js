import React from "react";
import { Image } from "react-native";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { googleLogoUrl } from "../../utils/helper";

const GoogleSignInButton = ({
  text = "Sign in with Google",
  buttonColor,
  buttonTextColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonColor ? { backgroundColor: buttonColor } : null,
      ]}
    >
      <View style={styles.insideButtonContainer}>
        <Image source={{ uri: googleLogoUrl }} width={25} height={25} />
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
