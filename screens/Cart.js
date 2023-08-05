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
import Login from ".././screens/Login";
import BottomHalfModal from "../components/Modal/BottomHalfModal";
import { closeLoginModal, openLoginModal } from "../redux/slices/loginSlice";
import { useToast } from "react-native-toast-notifications";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function Cart() {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const userStore = useSelector((state) => state.user);
  const cartStore = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isCurrentUser = useSelector((state) => state.user.currentUser?._id);
  const toast = useToast();
  const loading = useSelector((state) => state.cart.status);

  useEffect(() => {
    dispatch(getCartItems(userStore?.currentUser?._id));

    if (!isCurrentUser) {
      dispatch(openLoginModal());
    }
  }, [userStore?.currentUser?._id]);

  const totalAmount =
    cartStore?.reduce(
      (acc, item) => acc + item.details.price * item.quantity,
      0
    ) || 0;
  const modalState = useSelector((state) => state.user.loginModal);

  const closeModal = () => {
    dispatch(closeLoginModal());
  };

  const checkoutHandler = () => {
    if (cartStore.length > 0) {
      navigation.navigate("Shipping Addresses");
    } else {
      return toast.show("No items found for checkout !", {
        type: "danger",
      });
    }
  };

  if (loading === "loading") {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.root}>
      <BottomHalfModal visible={modalState} onRequestClose={closeModal}>
        <Login />
      </BottomHalfModal>

      {cartStore?.length === 0 && (
        <Text style={styles.noItemFountText}>No Item Found</Text>
      )}
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
        <Text style={styles.totalAmountPrice}>{totalAmount.toFixed(0)} ₹</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="Checkout" onPress={checkoutHandler} />
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
  noItemFountText: {
    margin: 40,
    textAlign: "center",
    fontFamily: "sans-serif",
    color: "#1A1A1A",
    fontWeight: "bold",
    fontSize: 14,
  },
});
