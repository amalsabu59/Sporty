import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const CartIcon = ({ cartItems = 2, color = "#A9A9A9" }) => {
  const cartStore = useSelector((state) => state.cart.cart);
  cartItems = cartStore.length;
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
      <View style={styles.cartContainer}>
        <Ionicons name="cart" size={24} color={color} style={styles.cartIcon} />
        {cartItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItems}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  cartContainer: {
    position: "relative",
  },
  cartIcon: {
    marginRight: 28,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: 20,
    backgroundColor: "#28B446",
    borderRadius: 12,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    // fontWeight: "bold",
  },
});
