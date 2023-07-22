import { Text, View } from "react-native";
import CartProductDetails from "../components/Cart/CartProductDetails";
import { StyleSheet } from "react-native";

function Cart() {
  return (
    <View style={styles.root}>
      <CartProductDetails />
    </View>
  );
}
export default Cart;

const styles = StyleSheet.create({
  root: {
    margin: 28,
  },
});
