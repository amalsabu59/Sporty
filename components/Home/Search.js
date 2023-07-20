import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Search = ({ placeholder }) => {
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="gray" style={styles.iconLeft} />
        <TextInput style={styles.input} placeholder="Search Products" />
        <Pressable
          // onPress={startSpeechToText}
          style={({ pressed }) => pressed && styles.micIconContainer}
        >
          <Icon name="mic" size={20} color="gray" style={styles.iconRight} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    // borderWidth: 1,
    backgroundColor: "#F9F9F9",
    width: "80%",
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  iconLeft: {
    marginRight: 10,
  },
  micIconContainer: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(40, 180, 70, 0.55)",
    borderRadius: 50,
  },
  iconRight: {
    // marginLeft: 10,
  },
  input: {
    flex: 1,
  },
});

export default Search;
