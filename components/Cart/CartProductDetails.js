import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

function CartProductDetails({ id, imageUri, title, quantity, price }) {
  const userId = useSelector((state) => state.user.currentUser?._id);
  const cartStore = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const formattedCart = {
    userId: userId,
    products: [],
  };

  cartStore?.forEach((item) => {
    const formattedData = {
      productId: item.details?._id,
      size: item.size,
      quantity: item.quantity,
    };
    formattedCart.products.push(formattedData);
  });

  const changeQuantity = (id, type) => {
    const foundCart = formattedCart.products.find(
      (product) => product.productId === id
    );

    if (foundCart && type === "add") {
      foundCart.quantity += 1;
    }
    if (foundCart && type === "remove") {
      if (foundCart.quantity > 1) {
        foundCart.quantity -= 1;
      } else {
        // If quantity is 1 and type is "remove", remove the item from the formattedCart.products array
        formattedCart.products = formattedCart.products.filter(
          (product) => product.productId !== id
        );
      }
    }
    // formattedCart.products.push(product);
    dispatch(addToCart(formattedCart));
  };

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
            <TouchableOpacity
              style={styles.button}
              onPress={() => changeQuantity(id, "remove")}
            >
              <Ionicons name="remove" size={24} color="#9B9B9B" />
            </TouchableOpacity>
            <Text style={styles.productTitle}> {quantity}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => changeQuantity(id, "add")}
            >
              <Ionicons name="add" size={24} color="#9B9B9B" />
            </TouchableOpacity>
            <View>
              <Text style={styles.price}>{price}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CartProductDetails;

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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    fontFamily: "sans-serif",
    color: "#1A1A1A",
    fontWeight: "bold",

    fontSize: 14,
  },
});
