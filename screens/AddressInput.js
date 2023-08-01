import { Text, View } from "react-native";
import InputForm from "../components/Address/InputForm";
import CustomButton from "../components/UI/CustomButton";

function AddressInput() {
  return (
    <View>
      <InputForm />
      <View style={{ margin: 32 }}>
        <CustomButton text="Save Address" />
      </View>
    </View>
  );
}

export default AddressInput;
