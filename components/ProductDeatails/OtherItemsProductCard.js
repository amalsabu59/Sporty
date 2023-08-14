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

const OtherItemsProductCard = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const loading = useSelector((state) => state.products.status);
  const products = useSelector((state) => state.products.products);
  const navigation = useNavigation();

  const handleOnPress = (id) => {
    navigation.navigate("ProductDetails", { id });
  };

  if (loading === "loading") {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>You can also like this</Text>
      <ScrollView
        style={styles.container}
        horizontal
        contentContainerStyle={styles.horizontalScrollContainer}
      >
        {products &&
          products.map((product) => (
            <Pressable
              key={product._id}
              style={styles.card}
              android_ripple
              onPress={() => handleOnPress(product._id)}
            >
              {/* <View style={styles.card}> */}
              <Image
                source={{ uri: product.img[0] }}
                resizeMode="contain"
                style={styles.image}
              />
              {/* </View> */}
              <View style={styles.textContainer}>
                <Text style={styles.productNameText}>{product.title}</Text>
                <Text style={styles.descriptionText}>{product.desc}</Text>
                <Text style={styles.priceText}>₹ {product?.price}</Text>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 20,
  },

  container: {
    flexDirection: "row",
    // paddingHorizontal: 16,
  },
  horizontalScrollContainer: {
    alignItems: "center",
  },
  card: {
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#F2F2F2",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    width: 200, // Adjust as needed
    aspectRatio: 1,
  },
  textContainer: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "60%",
    borderRadius: 8,
  },
  heading: {
    margin: 5,
    color: "#000000",
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: "bold",
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

export default OtherItemsProductCard;
