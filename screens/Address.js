import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddressCard from "../components/Address/AddressCard";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../redux/slices/addressSlice";
import axios from ".././axios";
import RazorpayCheckout from "react-native-razorpay";
function Address() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser._id);
  useEffect(() => {
    dispatch(getAddresses(userId));
  }, []);

  const addresses = useSelector((state) => state.address.addresses);

  const paymentHandler = async () => {
    //Order Api: Call POST api with body like (username, id, price etc) to create an Order and use order_id in below options object

    const { data } = await axios.post(`payment/orders`, { amount: 100 });
    // const response = await .....
    console.log(data);
    let options = {
      description: "Credits towards consultation",
      // image: imgURL, //require('../../images.png')
      currency: "INR", //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
      key: "rzp_test_7dO6FjFjKBG768",
      amount: "5000",
      name: "Sporty",
      order_id: "", //Replace this with an order_id(response.data.orderId) created using Orders API.
      prefill: {
        email: "hasan@example.com",
        contact: "9191919191",
        name: "Hasan",
      }, //if prefill is not provided then on razorpay screen it has to be manually entered.
      theme: { color: "#28B446" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.log(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View>
      {addresses?.map((item) => {
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
      <View style={{ margin: 32 }}>
        <CustomButton text="Checkout" onPress={() => paymentHandler()} />
      </View>
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
