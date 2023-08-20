import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import LoadingOverlay from "../UI/LoadingOverlay";
const ProductCard = ({ products }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const loading = useSelector((state) => state.products.status);
  const navigation = useNavigation();
  function DescriptionContainer(text = "Custom Men’s Training shoes") {
    return (
      <>
        {windowWidth > 300 ? (
          <Text style={styles.descriptionText}>{text}</Text>
        ) : null}
      </>
    );
  }
  const handleOnPress = (id) => {
    navigation.navigate("ProductDetails", { id });
  };

  if (loading === "loading") {
    return <LoadingOverlay />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {products &&
          products.map((product) => {
            return (
              <Pressable
                key={product._id}
                style={styles.card}
                android_ripple
                onPress={() => handleOnPress(product._id)}
              >
                <Image
                  source={{ uri: product.img[0] }}
                  resizeMode="contain"
                  style={styles.image}
                />

                <Text style={styles.productNameText}>{product.title} </Text>
                {DescriptionContainer(product.desc)}
                <Text style={styles.priceText}>₹ {product?.price}</Text>
              </Pressable>
            );
          })}
      </View>
    </ScrollView>
  );
};
export default ProductCard;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    // gap: 10,
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
    width: "48%",
    height: "20%",
    aspectRatio: 1.1, // Maintain a square shape
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
