import { Text, View } from "react-native";
import CartProductDetails from "../components/Cart/CartProductDetails";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";

function Cart() {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const userStore = useSelector((state) => state.user);
  const cartStore = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCartItems(userStore?.currentUser?._id));
  }, [userStore?.currentUser?._id]);

  const totalAmount =
    cartStore?.reduce((acc, item) => acc + item.details.price, 0) || 0;
  return (
    <View style={styles.root}>
      <View style={[styles.cartDetails]}>
        <FlatList
          data={cartStore}
          renderItem={({ item }) => (
            <CartProductDetails
              title={item.details.title}
              price={item.details.price}
              quantity={item.quantity}
              imageUri={item.details.img[0]}
              id={item.details._id}
            />
          )}
          keyExtractor={(item) => item.details._id}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.totalAmountLabel}>Total amount</Text>
        <Text style={styles.totalAmountPrice}>{totalAmount} $</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Checkout"
          onPress={() => navigation.navigate("Shipping Addresses")}
        />
      </View>
    </View>
  );
}
export default Cart;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 28,
    // justifyContent: "space-between",
  },
  cartDetails: {
    width: "100%",
    height: "75%",
    marginBottom: "10%",
    // backgroundColor: "red",
  },
  buttonContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    marginTop: 5,
  },
  textWrapper: {
    marginTop: 1,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  totalAmountLabel: {
    fontFamily: "sans-serif",
    color: "#9B9B9B",
    fontWeight: 400,
    fontSize: 14,
  },
  totalAmountPrice: {
    fontFamily: "sans-serif",
    color: "#1A1A1A",
    fontWeight: "bold",
    fontSize: 14,
  },
});
