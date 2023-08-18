import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageSwipe from "../components/ProductDeatails/ImageSwipe";
import Details from "../components/ProductDeatails/Details";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import OtherItemsProductCard from "../components/ProductDeatails/OtherItemsProductCard";
function ProductDetails() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedProductId = useSelector(
    (state) => state.products.selectedProductId
  );
  const route = useRoute();
  const id = route.params?.id || selectedProductId;

  const products = useSelector((state) => state.products.products);
  const product = products.filter((product) => product._id === id)[0];

  const renderDots = () => {
    return product.img.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { backgroundColor: currentIndex === index ? "#1A1A1A" : "#C4C4C4" },
        ]}
      />
    ));
  };
  return (
    <ScrollView style={styles.root}>
      <ImageSwipe
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        images={product?.img}
      />
      <View style={styles.dotsContainer}>{renderDots()}</View>
      <Details product={product} />
      <OtherItemsProductCard />
    </ScrollView>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-between",
    // gap: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
    margin: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
