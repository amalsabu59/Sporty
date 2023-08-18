import { ScrollView, Text, View } from "react-native";
import InputForm from "../components/Address/InputForm";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  clearFormData,
  updateAddress,
} from "../redux/slices/addressSlice";
import { useEffect } from "react";
import { useToast } from "react-native-toast-notifications";

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
  const toast = useToast();

  const saveAddressHandler = () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipcode ||
      !formData.phone
    )
      return toast.show("* fields are mandatory!", {
        type: "danger",
      });
    if (isNewAddress) {
      dispatch(addAddress({ formData, userId }));
    } else {
      dispatch(updateAddress({ formData, userId }));
    }
    navigation.goBack();
  };
  return (
    <ScrollView>
      <InputForm />
      <View style={{ margin: 32 }}>
        <CustomButton text="Save Address" onPress={saveAddressHandler} />
      </View>
    </ScrollView>
  );
}

export default AddressInput;
