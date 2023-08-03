import { Text, View } from "react-native";
import InputForm from "../components/Address/InputForm";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  clearFormData,
  updateAddress,
} from "../redux/slices/addressSlice";
import { useEffect } from "react";

function AddressInput({ route, navigation }) {
  const isNewAddress = route.params?.isNewAddress || false;
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.address.formData.values);
  const userId = useSelector((state) => state.user.currentUser._id);

  useEffect(() => {
    if (isNewAddress) {
      dispatch(clearFormData());
    }
  }, [isNewAddress]);

  const saveAddressHandler = () => {
    if (isNewAddress) {
      dispatch(addAddress({ formData, userId }));
    } else {
      dispatch(updateAddress({ formData, userId }));
    }
    navigation.goBack();
  };
  return (
    <View>
      <InputForm />
      <View style={{ margin: 32 }}>
        <CustomButton text="Save Address" onPress={saveAddressHandler} />
      </View>
    </View>
  );
}

export default AddressInput;
