import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function OrderInfo({ item }) {
  // const { address, city, state } = addresses;
  // console.log(address, city, state);
  const navigation = useNavigation();
  const handleReorder = () => {
    navigation.navigate("Shipping Addresses", {
      cartId: item.orderDetails.cartId,
      amountPaid: item.orderDetails.amountPaid,
      isReordering: true,
      showCheckout: true,
    });
  };

  console.log(item);
  return (
    <View style={styles.card}>
      <View style={styles.cardWrapper}>
        <View style={styles.heading}>
          <View>
            <Text style={styles.orderIdText}>Order Information</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ width: "45%" }}>
            <Text style={styles.smallHeader}>Shipping Address : </Text>
          </View>
          <View style={{ width: "65%" }}>
            <Text style={styles.smallHeader}>
              {item.address.address}, {item.address.city}, {item.address.state}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ width: "45%" }}>
            <Text style={styles.smallHeader}>payment ID: </Text>
          </View>
          <View style={{ width: "55%" }}>
            <Text style={styles.smallHeader}>
              {item.orderDetails.paymentId}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "#fff",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "black",
                shadowColor: "transparent",
              },
            ]}
            onPress={handleReorder}
          >
            <Text style={[styles.buttonText, { color: "#222" }]}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Select product", { products: item.products })
            }
          >
            <Text style={styles.buttonText}>Leave Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default OrderInfo;

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
  heading: {
    marginBottom: 10,
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
    lineHeight: 20, // 142.857%
  },
  button: {
    width: 140,
    height: 36,
    flexShrink: 0,
    borderRadius: 25,
    backgroundColor: "#DB3022", // You can change this to use a variable for color
    shadowColor: "rgba(211, 38, 38, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4, // For Android shadow
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white", // You can customize the text color
    // fontWeight: "bold",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
