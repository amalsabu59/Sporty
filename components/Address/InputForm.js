import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import LabeledTextInput from "./LabeledTextInput";

function InputForm() {
  return (
    <View style={styles.container}>
      <LabeledTextInput label="Full name" placeholder="Name" />
      <LabeledTextInput label="Address" placeholder="Phone" />
      <LabeledTextInput label="City" placeholder="Phone" />
      <LabeledTextInput label="State/Province/Region" placeholder="Phone" />
      <LabeledTextInput label="Zip Code" placeholder="Phone" />
      <LabeledTextInput label="Country" placeholder="Phone" />

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
