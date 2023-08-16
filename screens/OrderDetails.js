import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import DetailedOrder from "../components/Orders/DetailedOrder";
import OrderInfo from "../components/Orders/OrderInfo";
function OrderDetails({ route }) {
  const item = route.params.item;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
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
          <View></View>
          <View style={styles.orderIdAndDateWrapper}>
            <View>
              <Text style={styles.smallHeader}>
                Quantity:{" "}
                <Text style={{ color: "#222" }}> {item.products?.length}</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.smallHeader}>
                Total Amount:{" "}
                <Text
                  style={{
                    color: "#222",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
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
          </View>
        </View>
        <View style={styles.productList}>
          {item.products.map((item) => {
            return (
              <DetailedOrder
                key={item.id}
                title={item.title}
                price={item?.price}
                quantity={item.quantity}
                imageUri={item.img[0]}
                id={item.id}
              />
            );
          })}
        </View>
      </View>
      <OrderInfo item={item} />
    </ScrollView>
  );
}

export default OrderDetails;

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
    marginTop: 20,
    marginHorizontal: 30,
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
  productList: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
});
