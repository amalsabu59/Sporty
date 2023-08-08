import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";

function DetailedOrder({ title, price, quantity, imageUri }) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsWrapper}>
          <Text style={styles.productTitle}>{title}</Text>
          <Text style={styles.sizeText}>Size: L</Text>
          <View style={styles.buttonAndPriceContainer}>
            <View>
              <Text style={styles.price}>{price} ₹</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 104,
    marginTop: 16,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 4,
  },
  imageWrapper: {
    borderRadius: 8, // Border radius for the image wrapper
    overflow: "hidden", // To clip the image inside the wrapper
    width: 95, // Width of the image wrapper (adjust as needed)
    height: 104, // Height of the image wrapper (adjust as needed)
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsWrapper: {
    margin: 8, // Adjust the spacing between image and text to your preference
    width: "65%", // Adjust the spacing between
  },
  productTitle: {
    fontFamily: "sans-serif",
    color: "#1A1A1A",
    fontWeight: 400,
    fontSize: 14,
  },
  sizeText: {
    fontFamily: "sans-serif",
    color: "#9B9B9B",
    fontWeight: 400,
    fontSize: 11,
  },
  buttonAndPriceContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: "100%",
    height: "60%",
    // backgroundColor: "red",
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18, // Half of the height to create a circular button
    backgroundColor: "var(--white, #FFF)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.20)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4, // For Android shadow
  },
  buttonText: {
    fontSize: 18,
    color: "#9B9B9B",
  },
  price: {
    textAlign: "right",
    fontFamily: "sans-serif",
    color: "#1A1A1A",
    fontWeight: "bold",

    fontSize: 14,
  },
});

export default DetailedOrder;
