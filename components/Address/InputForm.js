import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import LabeledTextInput from "./LabeledTextInput";
import { useSelector } from "react-redux";

function InputForm() {
  const formData = useSelector((state) => state.address.formData.values);
  return (
    <View style={styles.container}>
      <LabeledTextInput
        label="Full name"
        name="name"
        inputValue={formData.name || ""}
      />
      <LabeledTextInput
        label="Address"
        name="address"
        inputValue={formData.address || ""}
      />
      <LabeledTextInput
        label="City"
        name="city"
        inputValue={formData.city || ""}
      />
      <LabeledTextInput
        label="State/Province/Region"
        name="state"
        inputValue={formData.state || ""}
      />
      <LabeledTextInput
        label="Zip Code"
        name="zipcode"
        inputValue={formData.zipcode || ""}
      />
      <LabeledTextInput
        label="Phone"
        name="phone"
        inputValue={formData.phone || ""}
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
