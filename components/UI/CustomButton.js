import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({
  text = "Continue",
  buttonColor,
  buttonTextColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        buttonColor ? { backgroundColor: buttonColor } : null,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          buttonTextColor ? { color: buttonTextColor } : null,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28B446",
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default CustomButton;
