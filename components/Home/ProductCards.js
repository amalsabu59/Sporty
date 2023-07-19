import React from "react";
import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const ProductCard = ({ products }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product1.png")}
            resizeMode="contain"
            style={styles.image}
          />

          <Text style={styles.productNameText}>Nike Zoom Mercurial Vapor</Text>
          <Text style={styles.descriptionText}>
            Custom Men’s Training shoes
          </Text>
          <Text style={styles.priceText}>$120</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.productNameText}>Nike Zoom Mercurial Vapor</Text>
          <Text style={styles.descriptionText}>
            Custom Men’s Training shoes
          </Text>
          <Text style={styles.priceText}>$120</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.productNameText}>Nike Zoom Mercurial Vapor</Text>
          <Text style={styles.descriptionText}>
            Custom Men’s Training shoes
          </Text>
          <Text style={styles.priceText}>$120</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product1.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.productNameText}>Nike Zoom Mercurial Vapor</Text>
          <Text style={styles.descriptionText}>
            Custom Men’s Training shoes
          </Text>
          <Text style={styles.priceText}>$120</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product1.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.productNameText}>Nike Zoom Mercurial Vapor</Text>
          <Text style={styles.descriptionText}>
            Custom Men’s Training shoes
          </Text>
          <Text style={styles.priceText}>$120</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/product.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.productNameText}>Nike Zoom Mercurial Vapor</Text>
          <Text style={styles.descriptionText}>
            Custom Men’s Training shoes
          </Text>
          <Text style={styles.priceText}>$120</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
    flexWrap: "wrap",
  },
  card: {
    borderRadius: 8,
    marginBottom: "18%",
    backgroundColor: "#F2F2F2",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    width: "45%",
    height: "45%",
    aspectRatio: 1, // Maintain a square shape
  },
  imageContainer: {
    // width:
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  productNameText: {
    marginTop: 5,
    color: "#000000",
    fontFamily: "sans-serif",
    fontSize: RFValue(11),
    fontWeight: "500",
  },
  descriptionText: {
    color: "#A9A9A9",
    fontFamily: "sans-serif",
    fontSize: RFValue(10),
    fontWeight: "400",
  },
  priceText: {
    color: "#28B446",
    fontFamily: "sans-serif",
    fontSize: RFValue(13),
    fontWeight: "700",
  },
});

export default ProductCard;
