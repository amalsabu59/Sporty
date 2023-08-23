import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import LabeledTextInput from "./LabeledTextInput";
import { useDispatch, useSelector } from "react-redux";
import { createFormData } from "../../redux/slices/addressSlice";

function InputForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.address.formData.values);
  const handleChangeText = (text, name) => {
    dispatch(createFormData({ [name]: text }));
  };
  return (
    <View style={styles.container}>
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Full name*"
        name="name"
        maxLength={40}
        inputValue={formData.name || ""}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Address*"
        name="address"
        maxLength={40}
        inputValue={formData.address || ""}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="City*"
        name="city"
        maxLength={30}
        inputValue={formData.city || ""}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="State/Province/Region*"
        name="state"
        maxLength={30}
        inputValue={formData.state || ""}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Zip Code*"
        name="zipcode"
        maxLength={15}
        inputValue={formData.zipcode || ""}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Phone*"
        name="phone"
        inputValue={formData?.phone?.toString() || ""}
        inputMode={"tel"}
        maxLength={10}
      />

      {/* <LabeledTextInput label="Email" placeholder="Enter your email" /> */}
      {/* Add more LabeledTextInput components for other fields */}
    </View>
  );
}

export default InputForm;
const styles = StyleSheet.create({
  container: {
    // flex: 3,
    display: "flex",
    justifyContent: "center",
    padding: 20,
    justifyContent: "center",
  },
});
