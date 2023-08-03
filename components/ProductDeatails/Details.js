import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomHalfModal from "../Modal/BottomHalfModal";
import { Button } from "react-native";
import Login from "../../screens/Login";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, openLoginModal } from "../../redux/slices/loginSlice";
import { addToCart } from "../../redux/slices/cartSlice";
function Details({ product }) {
  const [sizeSelected, setSizeSeleted] = useState("XL");

  const modalState = useSelector((state) => state.user.loginModal);
  const isCurrentUser = useSelector((state) => state.user.currentUser?._id);
  const cartStore = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const closeModal = () => {
    dispatch(closeLoginModal());
  };

  const formattedCart = {
    userId: isCurrentUser,
    products: [],
  };

  cartStore?.forEach((item) => {
    const formattedData = {
      productId: item.details._id,
      size: item.size,
      quantity: item.quantity,
    };
    formattedCart.products.push(formattedData);
  });

  const addtoCart = (id) => {
    if (!isCurrentUser) {
      dispatch(openLoginModal());
    } else {
      navigation.navigate("Cart");
      const foundCart = formattedCart.products.find(
        (product) => product.productId === id
      );

      if (foundCart) {
        foundCart.quantity += 1;
        foundCart.size = sizeSelected;
      } else {
        const product = {
          productId: id,
          size: sizeSelected,
          quantity: 1,
        };
        formattedCart.products.push(product);
      }
      dispatch(addToCart(formattedCart));
    }

    // console.log(formattedCart);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.productNameText}>{product.title}</Text>
      </View>
      <View>
        <Text style={styles.productDescriptionText}>{product.desc}</Text>
      </View>
      <Text style={styles.sizeAndPriceText}> Size</Text>
      <View style={styles.sizeAndPriceContainer}>
        {product.size.map((size, index) => (
          <TouchableOpacity
            style={styles.sizeSelection}
            key={index}
            onPress={() => setSizeSeleted(size)}
          >
            <View
              style={sizeSelected === size ? styles.selectedSize : styles.size}
            >
              <Text
                style={
                  sizeSelected === size
                    ? styles.selectedSizesText
                    : styles.sizesText
                }
              >
                {size}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sizeAndPriceText}> Price</Text>
      <Text style={styles.price}>{product.price} $</Text>
      <Text style={styles.priceDisclamer}> Price inclusive of all taxes</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addtoCart(product._id)}
        >
          <Ionicons name="cart" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Add To Bag</Text>
        </TouchableOpacity>
      </View>
      <BottomHalfModal visible={modalState} onRequestClose={closeModal}>
        <Login />
      </BottomHalfModal>
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,

    // flex: 1,
  },
  productNameText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: 400,
  },
  productDescriptionText: {
    fontFamily: "sans-serif",
    marginVertical: 5,
    fontSize: 14,
    fontWeight: 400,
    color: "#A9A9A9",
  },
  sizeAndPriceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    // marginVertical: 1,
  },
  sizeAndPriceText: {
    marginVertical: 8,
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: 600,
  },
  sizeSelection: {
    marginTop: 6,
  },
  selectedSize: {
    marginVertical: 6,
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: "#2B2A2A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  size: {
    marginVertical: 6,
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSizesText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#fff",
  },
  sizesText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#3C3C3C",
  },
  price: {
    // marginTop: 6,
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: 700,
  },
  priceDisclamer: {
    margin: 0,
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#A9A9A9",
  },
  buttonContainer: {
    margin: 16,
    // padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    width: 315,
    height: 48,
    padding: 10,
    paddingLeft: 86,
    paddingRight: 85,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "#28B446",
    borderRadius: 8,
    flexShrink: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  icon: {
    marginRight: 15,
  },
});
