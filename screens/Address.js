import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddressCard from "../components/Address/AddressCard";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../redux/slices/addressSlice";
import axios from ".././axios";
import RazorpayCheckout from "react-native-razorpay";
import { addOrders } from "../redux/slices/ordersSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useToast } from "react-native-toast-notifications";
import { clearCart } from "../redux/slices/cartSlice";
function Address({ route }) {
  const routeParams = route.params;
  const cartId = routeParams?.cartId;
  const isReordering = routeParams?.isReordering;
  const amountPaid = routeParams?.amountPaid;
  const showCheckoutButton = routeParams?.showCheckout;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cartStore = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.address.status);
  const toast = useToast();
  const totalAmount =
    cartStore?.reduce(
      (acc, item) => acc + item.details?.price * item.quantity,
      0
    ) ||
    amountPaid ||
    0;
  useEffect(() => {
    dispatch(getAddresses(user._id));
  }, []);

  const addressStore = useSelector((state) => state.address);

  const paymentHandler = async () => {
    if (!addressStore.selectedAddress) {
      return toast.show("Select An Address !", {
        type: "danger",
      });
    }
    //Order Api: Call POST api with body like (username, id, price etc) to create an Order and use order_id in below options object

    const { data } = await axios.post(`payment/orders`, {
      amount: "1000",
      userId: user._id,
    });

    // const response = await .....

    let options = {
      description: "Credits towards consultation",
      // image: imgURL, //require('../../images.png')
      currency: "INR", //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
      key: "rzp_test_7dO6FjFjKBG768",
      amount: totalAmount.toFixed(0) * 100,
      name: "Sporty",
      order_id: "", //Replace this with an order_id(response.data.orderId) created using Orders API.
      prefill: {
        email: `${user.email}` || "",
        contact: `${user.phone}` || "",
        name: `${user.name}` || "",
      }, //if prefill is not provided then on razorpay screen it has to be manually entered.
      theme: { color: "#28B446" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        dispatch(
          addOrders({
            isReordering: isReordering,
            cartIdForReordering: cartId,
            userId: user._id,
            addressId: addressStore.selectedAddress,
            paymentStatus: "captured",
            amountPaid: totalAmount.toFixed(0),
            paymentId: data.razorpay_payment_id,
          })
        );
        dispatch(clearCart());
        navigation.navigate("Success");
        // handle success

        console.log(`Success: ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };

  if (loading === "loading") {
    return <LoadingOverlay />;
  }
  return (
    <View>
      {addressStore?.addresses?.map((item) => {
        return <AddressCard {...item} key={item._id} />;
      })}
      {/* Plus button */}
      <TouchableOpacity
        style={styles.plusButtonContainer}
        onPress={() =>
          navigation.navigate("Shipping Address", { isNewAddress: true })
        }
      >
        <View style={styles.plusButton}>
          <Text style={styles.plusButtonText}>+</Text>
        </View>
      </TouchableOpacity>
      {showCheckoutButton && (
        <View style={{ margin: 32 }}>
          <CustomButton text="Checkout" onPress={() => paymentHandler()} />
        </View>
      )}
    </View>
  );
}
export default Address;

const styles = StyleSheet.create({
  plusButtonContainer: {
    padding: 16,
    alignItems: "flex-end", // Add this to center the plus button horizontally
    justifyContent: "flex-end", // Add this to center the plus button vertically
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#28B446",
    justifyContent: "center",
    alignItems: "center",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.22))", // CSS filter for drop shadow
  },
  plusButtonText: {
    color: "#FFF",
    fontSize: 20,
    lineHeight: 32,
  },
});
