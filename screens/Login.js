import React, { useState } from "react";
import { Image, Pressable, TextInput } from "react-native";
import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import GoogleSignInButton from "../components/UI/GoogleSignInButton";
import { useNavigation } from "@react-navigation/native";

const Login = ({ onRequestClose }) => {
  const navigation = useNavigation();
  const handleContinueHandler = () => {
    console.log("ented otp continue...");
    onRequestClose();
    navigation.navigate("OtpVerification");
  };
  return (
    <View style={styles.root}>
      <View style={styles.imageAndIconContainer}>
        <Image
          width={118}
          height={62}
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/b9c9/b32d/891be5420a8424325ffbb8b722d18f1f?Expires=1690761600&Signature=an7wDmr2UZRvqL1Fl1aAbeOZzBkwysbZIiSexhi4LZcllnXTPIvMhzcdM9dDCdKFlcGrVwianR~Y0U0eqQB06T1HDh77pcuaYDAGW1G8MRIlfiBjKYt3vem4zLKvKlU7nbyhV0lFNSnN8NQHxJkChvqzJFIcygA927uIOGt1XWmdOZJky4bFTRyQHVVoOD8gFgXyp0atMV5p276Tz-LcOOpuSH~mOw5cHkGVwNnxYN2ZbNMcIkdp0mu-vEQgEfqcReZ~2qNd11gVLVwSuEaGJBuzMQT8nqCcp0NgyTTWq4xvld9S5VI8ZN4hqddzaMmQb1d47ENo4S8i3CNqcRFYCQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          }}
        />
        <Pressable style={styles.iconContainer} onPress={onRequestClose}>
          <Ionicons name="close" size={24} color={"gray"} />
        </Pressable>
      </View>
      <Text style={styles.loginOrSignUpText}>
        Login <Text style={{ color: "#A9A9A9" }}>or</Text> Signup
      </Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="    +91 Mobile Number *" />
      </View>
      <Text style={styles.disclamerText}>
        I agree to the <Text style={{ color: "#28B446" }}>terms </Text>and{" "}
        <Text style={{ color: "#28B446" }}>conditions</Text> as set out by the
        user agreement.{" "}
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={handleContinueHandler} />
      </View>
      <Text style={styles.orText}>OR</Text>
      <View style={styles.buttonContainer}>
        <GoogleSignInButton />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    margin: 24,
  },
  imageAndIconContainer: {
    // marginHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    marginTop: "7%",
  },
  loginOrSignUpText: {
    fontFamily: "sans-serif",
    fontWeight: 400,
    marginTop: 14,
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 14,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    flexShrink: 0,
    borderColor: "gray",
    borderWidth: 1,
    fontFamily: "sans-serif",
    fontSize: 12,
    padding: 10,
  },
  disclamerText: {
    fontFamily: "sans-serif",
    fontWeight: 400,
    color: "#A9A9A9",
    marginTop: 9,
    fontSize: 12,
    lineHeight: 18,
  },
  buttonContainer: {
    marginTop: 14,
    // width: "80%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  orText: {
    marginTop: 15,
    marginRight: "auto",
    fontSize: 15,
    marginLeft: "auto",
    fontFamily: "sans-serif",
    fontWeight: 400,
    color: "#A9A9A9",
  },
});
