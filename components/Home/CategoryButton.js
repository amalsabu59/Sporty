import React from "react";
import { View } from "react-native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function CategoryButton({ title, onPress, selected }) {
  console.log(title);
  return (
    <TouchableOpacity
      style={[selected ? styles.selectedButton : styles.button]}
      onPress={onPress}
    >
      <Text style={[selected ? styles.selectedButtonText : styles.buttonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CategoryButton;

const styles = StyleSheet.create({
  selectedButton: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    width: "auto",
    minWidth: "auto",
    maxWidth: 50,
    height: 18,
    // padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  button: {
    width: "auto",
    minWidth: 60,
    height: 20,
    // padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  selectedButtonText: {
    fontFamily: "sans-serif",
    alignItems: "center",
    justifyContent: "center",
    color: "#F9F9F9",
    fontSize: 12,
    fontWeight: 400,
    // fontWeight: "bold",
  },
  buttonText: {
    fontFamily: "sans-serif",
    alignItems: "center",
    justifyContent: "center",
    color: "#A9A9A9",
    fontSize: 12,
    fontWeight: 400,
    // fontWeight: "bold",
  },
});
