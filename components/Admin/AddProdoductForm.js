import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LabeledTextInput from "../Address/LabeledTextInput";
import { createFormData } from "../../redux/slices/productsSlice";

function AddProductForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.products.formData.values);
  const handleChangeText = (text, name) => {
    if (name === "size") {
      const sizeArray = text.split(",");
      dispatch(createFormData({ ...formData, [name]: sizeArray }));
    } else if (name === "categories") {
      const categoryArray = text.split(",");
      dispatch(createFormData({ ...formData, [name]: categoryArray }));
    } else {
      dispatch(createFormData({ ...formData, [name]: text }));
    }
  };

  return (
    <View style={styles.container}>
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Product Name*"
        name="title"
        inputValue={formData.title || ""}
        maxLength={20}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Description*"
        name="desc"
        maxLength={30}
        inputValue={formData.desc || ""}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Size*"
        name="size"
        maxLength={15}
        inputValue={formData.size.join(",") || ""}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Category*"
        name="categories"
        maxLength={30}
        inputValue={formData.categories.join(",") || ""}
      />
      <LabeledTextInput
        handleChangeText={handleChangeText}
        label="Price*"
        name="price"
        maxLength={7}
        inputMode={"tel"}
        inputValue={formData?.price.toString() || ""}
      />

      {/* <LabeledTextInput label="Email" placeholder="Enter your email" /> */}
      {/* Add more LabeledTextInput components for other fields */}
    </View>
  );
}

export default AddProductForm;
const styles = StyleSheet.create({
  container: {
    // flex: 3,
    display: "flex",
    justifyContent: "center",
    padding: 20,
    justifyContent: "center",
  },
});
