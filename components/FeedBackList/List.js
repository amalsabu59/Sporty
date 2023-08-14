import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { setSelectedProductId } from "../../redux/slices/ordersSlice";
import { useDispatch } from "react-redux";

function List({ product, selectedProductId }) {
  const dispatch = useDispatch();
  //   function handleNavigateToProductDetails() {
  //     navigation.navigate("ProductDetails", { id: id });
  //   }

  const isSelected = selectedProductId === product.id;
  return (
    <TouchableOpacity
      key={product.id}
      style={[styles.root]}
      onPress={() => {
        dispatch(setSelectedProductId(product.id));
        //   handleNavigateToProductDetails(product.id);
      }}
    >
      <View
        style={[
          styles.container,
          isSelected && styles.selectedContainer,
          isSelected && styles.selectedMargin,
        ]}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: product.img[0],
            }}
            style={styles.image}
            resizeMode="center"
          />
        </View>
        <View style={styles.detailsWrapper}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.sizeText}>Size: L</Text>
          <View style={styles.buttonAndPriceContainer}>
            <View>
              <Text style={styles.price}>{product.price} ₹</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 104,
    marginTop: 8,
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 18,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 4,
  },
  selectedContainer: {
    borderColor: "#28B446",
    borderWidth: 1,
  },
  selectedMargin: {
    // margin: -2, // Counteract the border width to ensure the selected margin aligns with the border
  },
  imageWrapper: {
    borderRadius: 8, // Border radius for the image wrapper
    overflow: "hidden", // To clip the image inside the wrapper
    width: 95, // Width of the image wrapper (adjust as needed)
    height: 90, // Height of the image wrapper (adjust as needed)
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

export default List;
