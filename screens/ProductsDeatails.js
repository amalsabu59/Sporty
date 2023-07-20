import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ImageSwipe from "../components/ProductDeatails/ImageSwipe";
import Details from "../components/ProductDeatails/Details";

function ProductDetails() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://i.ibb.co/2MDRvRN/product2.png",
    "https://i.ibb.co/443Sqmt/product1.png",
    "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg",
    "https://i.ibb.co/2MDRvRN/product2.png",

    // Add more image URLs here
  ];
  const renderDots = () => {
    return images.map((_, index) => (
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
    <View style={styles.root}>
      <ImageSwipe
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        images={images}
      />
      <View style={styles.dotsContainer}>{renderDots()}</View>
      <Details />
    </View>
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
