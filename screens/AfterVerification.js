import { Text, TextInput } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../redux/slices/loginSlice";
import { useNavigation } from "@react-navigation/native";

function AfterVerification({ route }) {
  const [name, setName] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const loginFrom = useSelector((state) => state.user.loginFrom);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const loginFrom = route.params.loginFrom;
  // console.log(loginFrom);
  const updateNameHandler = () => {
    dispatch(updateUserName({ id: currentUser._id, name }));
    navigation.navigate(loginFrom);
  };
  return (
    <View style={styles.root}>
      <Text style={styles.welcomeText}>
        Welcome to <Text style={{ color: "#28B446" }}>Sporty</Text>
      </Text>
      <Text style={styles.inputLabel}>What should we call you ?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Type your name (optional)"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={updateNameHandler} />
      </View>
    </View>
  );
}
export default AfterVerification;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 46,
    marginTop: 15,
  },
  welcomeText: {
    fontFamily: "sans-serif",
    color: "#1E232C",
    fontSize: 29,
  },
  inputLabel: {
    fontFamily: "sans-serif",
    color: "#80807F",
    fontSize: 14,
    marginTop: 28,
  },
  inputContainer: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  input: {
    padding: 10,
    height: 40,
  },
  buttonContainer: {
    marginTop: 18,
  },
});
