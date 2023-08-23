import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { login } from "../redux/slices/loginSlice";
function OtpVerification({ route }) {
  // const loginFrom = route.params.loginFrom;
  const loginFrom = useSelector((state) => state.user.loginFrom);

  const [inputOtp, setInputOtp] = useState([]);
  const otpInputRefs = useRef([]);
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userStore = useSelector((state) => state.user);
  const verifiedPhone = userStore?.currentUser?.phone;
  const otp = userStore?.otpForVerification;

  const focusNextInput = (index) => {
    if (otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index) => {
    if (otpInputRefs.current[index - 1]) {
      otpInputRefs.current[index - 1].focus();
    }
  };
  const handleBackspace = (index) => {
    if (inputOtp.length > 0) {
      setInputOtp((prev) => {
        const updatedOtp = [...prev];
        updatedOtp.pop(); // Remove the last entered digit
        return updatedOtp;
      });
      focusPrevInput(index);
    }
  };
  const handleVerifyCode = () => {
    if (parseInt(inputOtp?.join(""), 10) !== Number(otp)) {
      toast.show("Verification Failed !", {
        type: "danger",
      });
      return;
    }
    dispatch(login({ phone: verifiedPhone }));
    console.log("userStore.userAccountStatus", userStore.existingUser);
    if (userStore.existingUser) {
      navigation.navigate(loginFrom);
    } else {
      navigation.navigate("afterVerification", { loginFrom });
    }
  };
  return (
    <View style={styles.root}>
      <Text style={styles.headingText}>OTP Verification</Text>
      <Text style={styles.description}>
        Enter the verification code we just sent to your number +91-
        {verifiedPhone}.
      </Text>
      <View style={styles.otpContainer}>
        {[...Array(4)].map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (otpInputRefs.current[index] = ref)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => {
              if (text.length === 1) {
                focusNextInput(index);
              } else if (text.length === 0) {
                handleBackspace(index);
              }
              setInputOtp((prev) => {
                const updatedOtp = [...prev];
                updatedOtp[index] = text;
                return updatedOtp;
              });
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
          onPress={() => {
            handleVerifyCode();
          }}
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
