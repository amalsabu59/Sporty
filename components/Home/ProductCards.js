import React from "react";
import { View, StyleSheet, Image } from "react-native";

const ProductCard = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product1.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product1.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  card: {
    borderRadius: 8,
    margin: 16,
    backgroundColor: "#F2F2F2",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    width: "40%",
    height: 183,
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default ProductCard;
