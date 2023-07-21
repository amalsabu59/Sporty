import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import CustomButton from "../components/UI/CustomButton";

function OtpVerification() {
  const [inputOtp, setInputOtp] = useState([]);
  const otpInputRefs = Array(4)
    .fill()
    .map(() => useRef(null));

  console.log(typeof inputOtp);
  const focusNextInput = (index) => {
    if (index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.headingText}>OTP Verification</Text>
      <Text style={styles.description}>
        Enter the verification code we just sent to your number +233 *******53.
      </Text>
      <View style={styles.otpContainer}>
        {[...Array(4)].map((_, index) => (
          <TextInput
            key={index}
            ref={otpInputRefs[index]}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => {
              if (text.length === 1) {
                focusNextInput(index);
              }
              setInputOtp((prev) => [...prev, text]);
            }}
          />
        ))}
      </View>
      <Text style={[styles.description, { marginTop: 28 }]}>
        Didn’t receive code? <Text style={{ color: "#28B446" }}>Resend</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Verify"
          buttonColor={
            inputOtp.length > 3 ? undefined : "rgba(128, 128, 127, 0.35)"
          }
          buttonTextColor={inputOtp.length > 3 ? undefined : "#80807F"}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 16,
    marginHorizontal: 34,
  },
  headingText: {
    fontFamily: "sans-serif",
    color: "#1E232C",
    fontSize: 30,
    fontWeight: "400",
  },
  description: {
    marginTop: 10,
    fontFamily: "sans-serif",
    color: "#80807F",
    fontSize: 14,
    fontWeight: "400",
  },
  otpContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },
  otpInput: {
    backgroundColor: "rgba(217, 217, 217, 0.20)",
    width: 46,
    height: 50,
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#D9D9D9",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 50,
  },
});

export default OtpVerification;
