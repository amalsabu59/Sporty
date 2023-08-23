import { useEffect } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/slices/ordersSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";

function Orders() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser._id);
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.status);

  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getOrders(userId));
  }, []);

  if (loading === "loading") {
    return <LoadingOverlay />;
  }

  const handleReorder = (cart) => {
    const totalAmount = orders;
    navigation.navigate("Shipping Addresses", {
      cartId: cart.cartId,
      amountPaid: cart.amountPaid,
      isReordering: true,
      showCheckout: true,
    });
  };
  return (
    <ScrollView style={styles.container}>
      {orders &&
        orders.map((item) => {
          return (
            <TouchableOpacity
              style={styles.card}
              key={item.orderDetails._id}
              onPress={() => navigation.navigate("Order Details", { item })}
            >
              <View style={styles.cardWrapper}>
                <View style={styles.orderIdAndDateWrapper}>
                  <View>
                    <Text style={styles.orderIdText}>
                      Order No: {item.orderDetails._id.substr(-8)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.smallHeader}>
                      {item.orderDetails.createdAt.split("T")[0]}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.smallHeader}>
                    Tracking number:{" "}
                    <Text style={{ color: "#222" }}>
                      {item.orderDetails.paymentId?.split("_")[1]}
                    </Text>
                  </Text>
                </View>
                <View style={styles.orderIdAndDateWrapper}>
                  <View>
                    <Text style={styles.smallHeader}>
                      Quantity:{" "}
                      <Text style={{ color: "#222" }}>
                        {" "}
                        {item.products.length}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.smallHeader}>
                      Total Amount:{" "}
                      <Text style={{ color: "#222", fontWeight: "bold" }}>
                        {" "}
                        {item.orderDetails.amountPaid} ₹
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={[styles.orderIdAndDateWrapper, { marginTop: 10 }]}>
                  <View>
                    <Text style={[styles.smallHeader, { color: "#1981C0" }]}>
                      Processing
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleReorder(item.orderDetails)}
                  >
                    <Text style={styles.buttonText}>Reorder</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}

export default Orders;
const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: 21,
    marginBottom: 16,
  },
  card: {
    marginBottom: 20,
    display: "flex",

    // flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
  },
  cardWrapper: {
    margin: 30,
  },
  orderIdAndDateWrapper: {
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Change this to "space-between"
  },
  orderIdText: {
    fontFamily: "sans-serif",
    textAlign: "center",
    fontFamily: "Microsoft Sans Serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20,
    color: "#222",
  },
  smallHeader: {
    color: "#9B9B9B",
    // textAlign: "right",
    fontFamily: "sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20 * 1.42857, // 142.857%
  },
  button: {
    width: 113,
    borderRadius: 24,
    backgroundColor: "#28B446",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20,
  },
});
