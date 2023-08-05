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
        maxLength={40}
        inputValue={formData.name || ""}
      />
      <LabeledTextInput
        label="Address"
        name="address"
        maxLength={40}
        inputValue={formData.address || ""}
      />
      <LabeledTextInput
        label="City"
        name="city"
        maxLength={30}
        inputValue={formData.city || ""}
      />
      <LabeledTextInput
        label="State/Province/Region"
        name="state"
        maxLength={30}
        inputValue={formData.state || ""}
      />
      <LabeledTextInput
        label="Zip Code"
        name="zipcode"
        maxLength={15}
        inputValue={formData.zipcode || ""}
      />
      <LabeledTextInput
        label="Phone"
        name="phone"
        inputValue={formData.phone || ""}
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
