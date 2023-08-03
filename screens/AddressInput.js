import { Text, View } from "react-native";
import InputForm from "../components/Address/InputForm";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch } from "react-redux";
import { clearFormData } from "../redux/slices/addressSlice";
import { useEffect } from "react";

function AddressInput({ route }) {
  const isNewAddress = route.params?.isNewAddress || false;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isNewAddress) {
      dispatch(clearFormData());
    }
  }, [isNewAddress]);
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
